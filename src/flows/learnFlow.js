import { addKeyword } from "@builderbot/bot";
import { getGptResponse } from "../services/gptService.js";
import { formatResponse } from "../services/utils.js";

export const learnFlow = addKeyword("/ciberprueba").addAction(
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
        
        const userMessage = ctx.body.trim();
        ctx.fromLearn = true;
        const gptResponse = await getGptResponse(ctx, cleanNumber, userMessage);
        await provider.sendMessage(phoneNumber, formatResponse(gptResponse), {});
    }
);
