import { addKeyword, EVENTS } from "@builderbot/bot";
import { getGptResponse } from '../services/gptService.js';
import { formatCommands } from '../services/utils.js';

export const generalFlow = addKeyword(EVENTS.WELCOME).addAction(
    async (ctx, { flowDynamic }) => {
        const userId = ctx.from;
        const userMessage = ctx.body;
        const gptResponse = await getGptResponse(ctx, userId, userMessage);
        await flowDynamic(formatCommands(gptResponse));
    }
);
