import { addKeyword } from "@builderbot/bot";
import { validateUrlFlow } from './validateUrlFlow.js';
import { learnFlow } from './learnFlow.js';
import { generalFlow } from './generalFlow.js';
import { formatCommands } from "../services/utils.js";

export const helpFlow = addKeyword("/ayuda").addAnswer(
    formatCommands(
        [
            "Ademas de poder ayudarte con tus dudas sobre ciberseguridad, tengo las siguientes funcionalidades:",
            "- /validarurl  para validar una URL",
            "- /aprender  para aprender sobre ciberseguridad",
            "- /volver  para volver a la conversación general"
        ].join("\n")),
    { capture: true },
    async (ctx, { gotoFlow, fallBack }) => {
        const userAnswer = ctx.body;
        switch (userAnswer) {
            case "/validarurl":
                return gotoFlow(validateUrlFlow);
            case "/aprender":
                return gotoFlow(learnFlow);
            case "/volver":
                ctx.fromReturn = true;
                return gotoFlow(generalFlow);
            default:
                return fallBack(
                    formatCommands("Por favor, selecciona una opción válida (1-2) o escribe /volver para regresar a la conversación general.")
                );
        }
    }
);
