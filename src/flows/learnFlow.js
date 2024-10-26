import { addKeyword } from "@builderbot/bot";
import { getGptResponse } from "../services/gptService.js";
import { formatResponse } from "../services/utils.js";

export const learnFlow = addKeyword("/ciberprueba").addAction(
    async (ctx, { flowDynamic }) => {
        const userMessage = ctx.body.trim();
        const userId = ctx.from;
        ctx.fromLearn = true;
        const gptResponse = await getGptResponse(ctx, userId, userMessage);
        await flowDynamic(formatResponse(gptResponse));
    }
);
