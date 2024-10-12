import { addKeyword, EVENTS } from "@builderbot/bot";
import { formatCommands } from "../services/utils";

export const learnFlow = addKeyword("/aprender").addAnswer(
    formatCommands("*(👨‍💻En desarrollo...)* Opcion /aprender seleccionada"),
);
