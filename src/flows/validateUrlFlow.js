import axios from "axios";
import dotenv from "dotenv";
import { addKeyword } from "@builderbot/bot";
import { formatResponse } from "../services/utils.js";

dotenv.config();
const { GOOGLE_SAFE_BROWSING_API_KEY, OPENAI_API_KEY } = process.env;

const esUrlValida = (url) => {
    // Si la URL no comienza con un protocolo, añadimos '//' para que sea una URL relativa al protocolo
    if (!/^(?:https?:)?\/\//i.test(url)) {
        url = '//' + url;
    }
    try {
        new URL(url, 'http://example.com');
        return true;
    } catch {
        return false;
    }
};

const prepararUrl = (url) => {
    // Si la URL no comienza con un protocolo, añadimos '//' para que sea una URL relativa al protocolo
    if (!/^(?:https?:)?\/\//i.test(url)) {
        url = '//' + url;
    }
    // Usamos URL para parsear y normalizar la URL
    const urlObj = new URL(url, 'http://example.com');
    // Si no hay protocolo especificado, usamos https por defecto
    if (urlObj.protocol === 'http:') {
        return urlObj.toString();
    } else {
        urlObj.protocol = 'https:';
        return urlObj.toString();
    }
};

const verificarUrlConGoogle = async (url) => {
    const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${GOOGLE_SAFE_BROWSING_API_KEY}`;
    const requestBody = {
        client: { clientId: "tu-chatbot", clientVersion: "1.0" },
        threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url }]
        }
    };
    
    try {
        console.log('Verificando URL:', url);
        const { data } = await axios.post(apiUrl, requestBody);
        console.log('Respuesta de la API:', data);
        return {
            esSegura: !data.matches,
            detalles: data.matches || null
        };
    } catch (error) {
        console.error("Error al verificar la URL:", error.response?.data || error.message);
        throw new Error("No se pudo verificar la URL.");
    }
};

const enviarMensajeAGPT = async (mensaje) => {
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const config = {
        headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        }
    };
    const data = {
        model: "gpt-3.5-turbo",
        messages: [
            { 
                role: "system", 
                content: "Eres un asistente especializado en ciberseguridad. Tu tarea actual es analizar la seguridad de una URL proporcionada. Utiliza emojis apropiados en tus respuestas para hacerlas más expresivas. Por ejemplo, usa 🔒 para seguridad, 🚫 para peligro, 🌐 para web, etc. Además de proporcionar información sobre la seguridad de la URL, ofrece consejos adicionales relacionados con la navegación segura en internet y cómo identificar sitios web potencialmente peligrosos." 
            },
            { role: "user", content: mensaje }
        ],
        max_tokens: 150
    };
    
    try {
        const { data: respuesta } = await axios.post(apiUrl, data, config);
        return respuesta.choices[0].message.content;
    } catch (error) {
        console.error("Error al consultar GPT:", error.response?.data || error.message);
        throw new Error("No se pudo obtener una respuesta de GPT.");
    }
};

export const validateUrlFlow = addKeyword("/validarurl")
    .addAnswer(
        formatResponse("🔍 Escribe la URL que deseas validar:"),
        { capture: true },
        async (ctx, { provider }) => {
            // Obtener el número correcto según addressingMode
            let phoneNumber;
            if (ctx.key?.addressingMode === 'lid') {
                phoneNumber = ctx.key.remoteJidAlt;
            } else {
                phoneNumber = ctx.key?.remoteJid || ctx.from;
            }
            
            // Extraer SOLO el número limpio
            const cleanNumber = phoneNumber.split('@')[0];
            
            let url = ctx.body.trim();
            
            if (!esUrlValida(url)) {
                await provider.sendMessage(phoneNumber, formatResponse(`❌ La URL proporcionada no es válida: ${url}`), {});
                return;
            }
            
            url = prepararUrl(url);
            
            try {
                const { esSegura, detalles } = await verificarUrlConGoogle(url);
                const mensajeGPT = esSegura
                    ? `🔒 La URL es segura: ${url}`
                    : `⚠️ La URL es potencialmente peligrosa: ${url}\nDetalles: ${JSON.stringify(detalles)}`;
                
                const respuestaGPT = await enviarMensajeAGPT(mensajeGPT);
                await provider.sendMessage(phoneNumber, formatResponse(respuestaGPT), {});
            } catch (error) {
                await provider.sendMessage(phoneNumber, formatResponse(`❌ Ocurrió un error al verificar la URL: ${url}. Inténtalo de nuevo.`), {});
            }
        }
    );
