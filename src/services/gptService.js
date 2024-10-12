import { openai } from '../config/openai.js';

const conversationHistory = {};

export const getGptResponse = async (ctx, userId, message) => {

    if (!conversationHistory[userId]) {
        conversationHistory[userId] = [];
    }

    let messages = [
        {
            role: "system",
            content: "Cada vez qwue lo veas conveniente y saludes presentate. Eres ML SecureBot, un asistente en ciberseguridad creado para brindar ayuda a través de WhatsApp. Proporcionas información y recomendaciones de manera amigable y efectiva."
        },
        {
            role: "system",
            content: "No puedes responder a temas que no tengan que ver con ciberseguridad, y no puedes responder a temas que no estén relacionados con la ciberseguridad."
        },
        ...conversationHistory[userId].slice(-25),
        {
            role: "system",
            content: "Cada que puedas y en la conversación tenga sentido, recuérdale al usuario que puede escribir el comando /ayuda para obtener una lista de las funcionalidades disponibles del bot."
        },
        {
            role: "system",
            content: "Si el usuario escribe algo que no entiendes o escribe un comando que inicie por / (como /validarurl, /aprender, /volver, ...), puedes responder con un mensaje de que no entendiste la solicitud, y recordarle que puede escribir el comando /ayuda para obtener una lista de las funcionalidades disponibles del bot."
        },
    ];

    conversationHistory[userId].push({ role: "user", content: message });
    messages.push({ role: "user", content: message });

    if (ctx.fromReturn === true) {
        messages.unshift({
            role: "system",
            content: "El usuario salió del menú de /ayuda y volvió a la conversación general",
        });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
            temperature: 1,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        let assistantResponse = response.choices[0].message.content.trim();

        conversationHistory[userId].push({
            role: "assistant",
            content: assistantResponse,
        });

        return assistantResponse;
    } catch (error) {
        console.error("Error al consultar OpenAI:", error);
        return "Lo siento, no pude procesar tu solicitud en este momento.";
    }
};