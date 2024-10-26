import { addKeyword } from "@builderbot/bot";
import { formatResponse } from "../services/utils.js";

export const helpFlow = addKeyword("/ayuda").addAnswer(
    formatResponse(
        [
            "¡Hola! Soy ML SecureBot, tu asistente especializado en ciberseguridad. 🔒 Estoy aquí para ayudarte con una variedad de temas relacionados con la seguridad en línea. Aquí te explico lo que puedo hacer:",
            "",
            "1. *Responder preguntas*: Puedes preguntarme sobre cualquier tema de ciberseguridad, como protección de datos, seguridad en redes, malware, phishing, y más. 🤔💡",
            "",
            "2. *Comandos especiales*:",
            "",
            "   • /validarurl - ¿Tienes dudas sobre un enlace? Yo lo reviso por ti y te digo si es seguro. 🔍🌐",
            "   • /ciberprueba - ¿Quieres poner a prueba tus conocimientos? Inicia este divertido test de ciberseguridad. 🎮📚",
            "   • /emergencia - ¿Necesitas ayuda urgente? Obtén el contacto directo con nuestro centro de asistencia para emergencias cibernéticas. 🚨📞",
            "",
            "3. *Consejos de seguridad*: Puedo proporcionarte recomendaciones prácticas para mejorar tu seguridad en línea. 💪",
            "",
            "4. *Explicaciones*: Si hay algún término o concepto de ciberseguridad que no entiendas, pídemelo y te lo explicaré de manera sencilla. 📘",
            "",
            "5. *Actualizaciones en tiempo real*: Emito alertas y noticias sobre las últimas amenazas y tendencias en ciberseguridad. 🆕",
            "",
            "Recuerda, estoy aquí para ayudarte a navegar de forma segura en el mundo digital. ¡No dudes en preguntarme lo que necesites! 😊",
            "",
            "Para volver a ver este mensaje en cualquier momento, solo escribe /ayuda."
        ].join("\n")
    )
);
