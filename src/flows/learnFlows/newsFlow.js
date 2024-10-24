import { addKeyword } from "@builderbot/bot";
import fetch from "node-fetch";

const getNews = async () => {
    const apiKey = '2fe30c8888474899b375390f3107f25d';
    // FIXME: Hace falta leer la documentacion correctamente para obtener una url que funcione
    // El ultimo error obtenido fue una bad request, se dio la palabra malware y un filtro general.
    const url = `https://newsapi.org/v2/top-headlines?&apiKey=${apiKey}`;
    // ESTA URL FUE DADA POR CHATGPT, NECESITA REVISION
    // const url = `https://newsapi.org/v2/everything?q=ciberseguridad&sortBy=publishedAt&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();

        if(!data.articles || data.articles.length === 0) {
            throw new Error("No se encontraron articulos validos.");
        }

        // Limite de noticias mostradas
        const articles = data.articles.slice(0,3); 
        return articles.map((article) => ({
            title: article.title || "Titulo no disponible...",
            url: article.url || "#",
            description: article.description || "Descripcion no disponible...",
        }));

    } catch (error) {
        console.error("Error al obtener las noticias. ", error);
        return [];
    }
};

export const newsFlow = addKeyword("/noticias")
    .addAnswer(
        "Estas son las noticias de ciberseguridad: ",
        async (_, { flowDynamic}) => {
            const news = await getNews();

            if(news.length === 0) {
                await flowDynamic("Lo siento, no pude encontrar las ultimas noticias.");
            }

            let newsText = "Ultimas noticias de ciberseguridad: \n";

            news.forEach((article, index) => {
                newsText += `*${index + 1}.* ${article.title}\n${article.description}\n[Leer mas](${article.url})\n\n`;
            });
            await flowDynamic(newsText);
        }
    );