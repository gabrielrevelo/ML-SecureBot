import { createBot, createProvider, createFlow } from "@builderbot/bot";
import { MemoryDB as Database } from "@builderbot/bot";
import { BaileysProvider as Provider } from "@builderbot/provider-baileys";
import { generalFlow } from "./flows/generalFlow.js";
import { helpFlow } from "./flows/helpFlow.js";
import { configureBotRoutes } from './routes/botRoutes.js';
import { validateUrlFlow } from "./flows/validateUrlFlow.js";

const PORT = process.env.PORT ?? 3000;

const main = async () => {
    const adapterFlow = createFlow([generalFlow, helpFlow, validateUrlFlow]);
    const adapterProvider = createProvider(Provider);
    const adapterDB = new Database();

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    configureBotRoutes(adapterProvider, handleCtx);
    httpServer(+PORT);
};

main();
