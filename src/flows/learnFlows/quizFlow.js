import { addKeyword } from "@builderbot/bot";

// Las preguntas, sus opciones y sus respuestas seran dadas en un diccionario
const quizQuestions = [
    {
        question: "Que es el pishing?",
        options: ["1. Un tipo de malware", "2. Un ataque de ingenieria social", "3. Un firewall"],
        correctAnswer: "2"
    },
    {
        question: "Cual es la funcion de un firewall",
        options: ["1. Monitorear el trafico de red", "2. Cifrar datos", "3. Atacar sistemas externos"],
        correctAnswer: "1"
    }
];

// Este metodo toma una sola pregunta al azar de todo el diccionario
const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * quizQuestions.length);
    return quizQuestions[randomIndex];
};

// TODO: Se han pusto algunas funciones para detectar errores
// Toca comprobar si funcionan y retornan un error distinto al especificado
// En el FIXME

export const quizFlow = addKeyword("/cuestionario")
    .addAnswer("Responde la siguiente pregunta: ", {capture: true}, async(_,{ flowDynamic, state }) => {
        const selectedQuestion = getRandomQuestion();

        let questionText = `${selectedQuestion.question}\n`;
        selectedQuestion.options.forEach(option => {
            questionText += `${option}\n`;
        });

        await state.update({ selectedQuestion: selectedQuestion });
        await flowDynamic(questionText);
    })
    .addAction(async (ctx, { flowDynamic, state }) => {
        const selectedQuestion = state.get('selectedQuestion');

        if (!ctx || !ctx.body) {
            await flowDynamic("Lo siento, no pude leer tu respuesta, por favor intenta de nuevo.");
            return;
        }
        const userAnswer = ctx.body.trim();
        
        if (userAnswer === selectedQuestion.correctAnswer) {
            await flowDynamic("¡Correcto!");
        } else {
            await flowDynamic(`Respuesta incorrecta. 😕 La respuesta correcta era: ${selectedQuestion.correctAnswer}`);
        }
    });
