import { addKeyword } from "@builderbot/bot";
import { formatCommands } from "../services/utils.js";

export const learnFlow = addKeyword("/aprender").addAnswer(
    formatCommands("*(👨‍💻En desarrollo...)* Opcion /aprender seleccionada"),
);
