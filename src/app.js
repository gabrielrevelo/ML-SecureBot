import { createBot, createProvider, createFlow } from "@builderbot/bot";
import { MemoryDB as Database } from "@builderbot/bot";
import { BaileysProvider as Provider } from "@builderbot/provider-baileys";
import { generalFlow } from "./flows/generalFlow.js";
import { helpFlow } from "./flows/helpFlow.js";
import { validateUrlFlow } from "./flows/validateUrlFlow.js";
import { configureMiddleware } from "./config/server/middleware.js";
import { configureContactRoutes } from "./routes/contactRoutes.js";
import { configureAlertRoutes } from "./routes/alertRoutes.js";
import { connectDB } from "./services/dbService.js";
import { learnFlow } from './flows/learnFlow.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

const main = async () => {
    await connectDB();

    const adapterFlow = createFlow([generalFlow, helpFlow, validateUrlFlow, learnFlow]);
    const adapterProvider = createProvider(Provider);
    const adapterDB = new Database();

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    configureMiddleware(adapterProvider);
    configureContactRoutes(adapterProvider, handleCtx);
    configureAlertRoutes(adapterProvider, handleCtx);

    httpServer(+PORT);
};

main();
