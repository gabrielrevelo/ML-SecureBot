import { addKeyword } from "@builderbot/bot";
import axios from "axios";
import dotenv from "dotenv";
import { formatCommands } from "../services/utils.js";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const GOOGLE_SAFE_BROWSING_API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Función para validar la URL
const esUrlValida = (url) => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

// Función para verificar la URL con Google Safe Browsing
const verificarUrlConGoogle = async (url) => {
    const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${GOOGLE_SAFE_BROWSING_API_KEY}`;

    const requestBody = {
        client: {
            clientId: "tu-chatbot",
            clientVersion: "1.0"
        },
        threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url }]
        }
    };

    try {
        console.log('Verificando URL:', url);
        const response = await axios.post(apiUrl, requestBody);
        console.log('Respuesta de la API:', response.data);

        if (response.data.matches) {
            return {
                esSegura: false,
                detalles: response.data.matches
            };
        } else {
            return {
                esSegura: true,
                detalles: null
            };
        }
    } catch (error) {
        console.error("Error al verificar la URL:", error.response ? error.response.data : error.message);
        throw new Error("No se pudo verificar la URL.");
    }
};

// Función para enviar un mensaje a GPT
const enviarMensajeAGPT = async (mensaje) => {
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const headers = {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
    };

    const body = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: mensaje }],
        max_tokens: 150
    };

    try {
        const response = await axios.post(apiUrl, body, { headers });
        return response.data.choices[0].message.content; // Retorna la respuesta del modelo
    } catch (error) {
        console.error("Error al consultar GPT:", error.response ? error.response.data : error.message);
        throw new Error("No se pudo obtener una respuesta de GPT.");
    }
};

export const validateUrlFlow = addKeyword("/validarurl")
    .addAnswer(
        formatCommands("(👨‍💻En desarrollo...) Escribe la URL que deseas validar:"),
        { capture: true },
        async (ctx, { flowDynamic }) => {
            const url = ctx.body.trim();

            // Validar la URL antes de proceder
            if (!esUrlValida(url)) {
                await flowDynamic(formatCommands(`❌ La URL proporcionada no es válida: ${url}`));
                return;
            }

            try {
                // Llamada a la función para verificar la URL
                const resultado = await verificarUrlConGoogle(url);

                let mensajeGPT;

                if (resultado.esSegura) {
                    mensajeGPT = `La URL es segura: ${url}`;
                } else {
                    mensajeGPT = `⚠ La URL es potencialmente peligrosa: ${url}\nDetalles: ${JSON.stringify(resultado.detalles)}`;
                }

                // Llamada a GPT con el mensaje
                const respuestaGPT = await enviarMensajeAGPT(mensajeGPT);
                await flowDynamic(formatCommands(respuestaGPT));

            } catch (error) {
                await flowDynamic(formatCommands(`❌ Ocurrió un error al verificar la URL: ${url}. Inténtalo de nuevo.`));
            }
        }
    );
