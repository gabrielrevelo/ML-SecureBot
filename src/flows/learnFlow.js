import { addKeyword } from "@builderbot/bot";
import { formatCommands } from "../services/utils.js";
import { newsFlow } from "./learnFlows/newsFlow.js";
import { quizFlow } from "./learnFlows/quizFlow.js";

export const learnFlow = addKeyword("/aprender")
    // TODO: Implementar la lógica del comando /aprender
        // Se esta realizando la logica de cada uno de los flujos de respuesta para
        // cada seccion del comando /aprender

        // TODO: Corregir url de la api news.

        // TODO: Corregir metodo de lectura de respuesta de usuario.
    .addAnswer(
        formatCommands(
            "*(👨‍💻Bienvenido a la sección de aprendizaje sobre ciberseguridad)*\n\n" +
            "Elige una de las siguientes opciones:\n" +
            "1️⃣ Noticias de ciberseguridad\n" +
            "2️⃣ Cuestionario de ciberseguridad"
        ),
        { capture: true }
    )
    .addAction(async (ctx, {gotoFlow, endFlow}) => {
        const userResponse = ctx.body.toLowerCase();

        switch(userResponse) {
            case '1':
                return gotoFlow(newsFlow);
            case '2':
                return gotoFlow(quizFlow);
            default:
                return endFlow("Opcion no valida, por favor selecciona 1 o 2.");
        }
    });