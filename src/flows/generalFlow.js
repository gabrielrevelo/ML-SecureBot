import { addKeyword, EVENTS } from "@builderbot/bot";
import { getGptResponse } from '../services/gptService.js';
import { formatResponse } from '../services/utils.js';
import { validateUrlFlow } from './validateUrlFlow.js';
import { learnFlow } from './learnFlow.js';

export const generalFlow = addKeyword(EVENTS.WELCOME).addAction(
    async (ctx, { provider, gotoFlow }) => {
        // Obtener el número correcto según addressingMode
        let phoneNumber;
        if (ctx.key?.addressingMode === 'lid') {
            // Si es lid, usa remoteJidAlt
            phoneNumber = ctx.key.remoteJidAlt;
        } else {
            // Si es pn, usa remoteJid
            phoneNumber = ctx.key?.remoteJid || ctx.from;
        }
        
        // Extraer SOLO el número limpio sin @s.whatsapp.net ni @lid
        const cleanNumber = phoneNumber.split('@')[0];
        
        const userMessage = ctx.body.trim();
        switch (userMessage) {
            case "/validarurl":
                return gotoFlow(validateUrlFlow);
            case "/ciberprueba":
                return gotoFlow(learnFlow);
            default:
                {
                    const gptResponse = await getGptResponse(ctx, cleanNumber, userMessage);
                    await provider.sendMessage(phoneNumber, formatResponse(gptResponse), {});
                }
        }
    }
);
