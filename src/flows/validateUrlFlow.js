import { addKeyword, EVENTS } from "@builderbot/bot";

export const validateUrlFlow = addKeyword(EVENTS.ACTION).addAnswer(
    "Escribe la URL que deseas validar:",
    { capture: true },
    async (ctx, { flowDynamic }) => {
        const url = ctx.body.trim();
        // TODO: Validar la URL
        await flowDynamic(`La URL que deseas validar es: ${url}`);
    }
)

