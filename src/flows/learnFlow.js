import { addKeyword, EVENTS } from "@builderbot/bot";

export const learnFlow = addKeyword(EVENTS.ACTION).addAnswer(
    "Opcion 2 seleccionada (Aprender)"
);
