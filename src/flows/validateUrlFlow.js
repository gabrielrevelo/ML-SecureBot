import { addKeyword } from "@builderbot/bot";
import { formatCommands } from "../services/utils.js";

export const validateUrlFlow = addKeyword("/validarurl")
    .addAnswer(
        formatCommands("*(👨‍💻En desarrollo...)* Escribe la URL que deseas validar:"),
        { capture: true },
        async (ctx, { flowDynamic }) => {
            const url = ctx.body.trim();
            // TODO: Implementar la lógica del comando /validarurl
            await flowDynamic(
                formatCommands(`*(👨‍💻En desarrollo...)* La URL que deseas validar es: ${url}`)
            );
        }
    );
