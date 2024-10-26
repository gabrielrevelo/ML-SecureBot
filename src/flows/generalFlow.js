import { addKeyword, EVENTS } from "@builderbot/bot";
import { getGptResponse } from '../services/gptService.js';
import { formatResponse } from '../services/utils.js';
import { validateUrlFlow } from './validateUrlFlow.js';
import { learnFlow } from './learnFlow.js';

export const generalFlow = addKeyword(EVENTS.WELCOME).addAction(
    async (ctx, { flowDynamic, gotoFlow }) => {
        const userMessage = ctx.body.trim();
        switch (userMessage) {
            case "/validarurl":
                return gotoFlow(validateUrlFlow);
            case "/ciberprueba":
                return gotoFlow(learnFlow);
            default:
                {
                    const userId = ctx.from;
                    const gptResponse = await getGptResponse(ctx, userId, userMessage);
                    await flowDynamic(formatResponse(gptResponse));
                }
        }
    }
);
