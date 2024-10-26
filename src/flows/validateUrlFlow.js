import { addKeyword } from "@builderbot/bot";
import { formatResponse } from "../services/utils.js";

export const validateUrlFlow = addKeyword("/validarurl")
    .addAnswer(
        formatResponse("*(👨‍💻En desarrollo...)* Escribe la URL que deseas validar:"),
        { capture: true },
        async (ctx, { flowDynamic }) => {
            const url = ctx.body.trim();
            // TODO: Implementar la lógica del comando /validarurl
            await flowDynamic(
                formatResponse(`*(👨‍💻En desarrollo...)* La URL que deseas validar es: ${url}`)
            );
        }
    );
