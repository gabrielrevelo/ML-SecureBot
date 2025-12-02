import { createBot, createProvider, createFlow } from "@builderbot/bot";
import { MemoryDB as Database } from "@builderbot/bot";
import { BaileysProvider as Provider } from "@builderbot/provider-baileys";
import { generalFlow } from "./flows/generalFlow.js";
import { helpFlow } from "./flows/helpFlow.js";
import { validateUrlFlow } from "./flows/validateUrlFlow.js";
import { configureMiddleware } from "./config/server/middleware.js";
import { configureContactRoutes } from "./routes/contactRoutes.js";
import { configureAlertRoutes } from "./routes/alertRoutes.js";
import { configureWhatsAppRoutes } from "./routes/whatsappRoutes.js";
import { connectDB } from "./services/dbService.js";
import { learnFlow } from './flows/learnFlow.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

export const sessionState = {
    isSessionReady: false
};

const main = async () => {
    await connectDB();

    const adapterFlow = createFlow([generalFlow, helpFlow, validateUrlFlow, learnFlow]);
    const adapterProvider = createProvider(Provider);
    const adapterDB = new Database();

    adapterProvider.on('ready', () => {
        sessionState.isSessionReady = true;
        console.log('✅ Sesión lista');
    });

    adapterProvider.on('close', () => {
        sessionState.isSessionReady = false;
        console.log('❌ Sesión cerrada');
    });

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    }, {
        queue: {
            timeout: 25000, // 25 segundos
            concurrencyLimit: 100 // 100 usuarios simultáneos - óptimo para 2GB RAM
        }
    });

    configureMiddleware(adapterProvider);
    configureContactRoutes(adapterProvider, handleCtx);
    configureAlertRoutes(adapterProvider, handleCtx);
    configureWhatsAppRoutes(adapterProvider);

    httpServer(+PORT);
};

main();
