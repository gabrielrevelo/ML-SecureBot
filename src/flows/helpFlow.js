import { addKeyword } from "@builderbot/bot";
import { formatCommands } from "../services/utils.js";

export const helpFlow = addKeyword("/ayuda").addAnswer(
    formatCommands(
        [
            "Además de poder ayudarte con tus dudas sobre ciberseguridad, tengo las siguientes funcionalidades:",
            "- /validarurl  para validar una URL",
            "- /aprender  para aprender sobre ciberseguridad",
        ].join("\n")
    )
);
