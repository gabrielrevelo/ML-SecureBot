import { addKeyword } from "@builderbot/bot";
import { formatCommands } from "../services/utils.js";

export const learnFlow = addKeyword("/aprender")
    // TODO: Implementar la lógica del comando /aprender
    .addAnswer(
        formatCommands("*(👨‍💻En desarrollo...)* Opción /aprender seleccionada"),
    );
