const verifyApiKey = (req, res, next) => {
    const providedApiKey = req.headers['x-api-key'];
    const apiKey = process.env.API_KEY;
    if (providedApiKey !== apiKey) {
        res.writeHead(403, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ status: "error", message: "Invalid API key" }));
    }
    next();
};

export const configureBotRoutes = (provider, handleCtx) => {
    provider.server.use(verifyApiKey);

    provider.server.post(
        "/v1/alert",
        handleCtx(async (bot, req, res) => {
            const { numbers, message, urlMedia } = req.body;
            for (const number of numbers) {
                await bot.sendMessage(number, message, { media: urlMedia ?? null });
            }
            return res.end("sended");
        })
    );

    provider.server.post(
        '/v1/register',
        handleCtx(async (bot, req, res) => {
            try {
                const { number, name } = req.body
                await bot.dispatch('EVENT_REGISTER', { from: number, name })
                return res.end('trigger')
            } catch (error) {
                console.log(error)
                return res.end(error)
            }
        }))

    provider.server.post(
        "/v1/samples",
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body;
            await bot.dispatch("SAMPLES", { from: number, name });
            return res.end("trigger");
        })
    );

    provider.server.post(
        "/v1/blacklist",
        handleCtx(async (bot, req, res) => {
            const { number, intent } = req.body;
            if (intent === "remove") bot.blacklist.remove(number);
            if (intent === "add") bot.blacklist.add(number);

            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ status: "ok", number, intent }));
        })
    );
};
