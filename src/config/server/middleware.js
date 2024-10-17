export const configureMiddleware = (provider) => {
    provider.server.use((req, res, next) => {
        res.json = (message, data, status = 200) => {
            res.writeHead(status, { 'Content-Type': 'application/json' });
            const payload = { message };
            if (data !== undefined) {
                payload.data = data;
            }
            res.end(JSON.stringify(payload));
        };

        res.error = (message, data, status = 500) => {
            res.writeHead(status, { 'Content-Type': 'application/json' });
            const payload = { message };
            if (data !== undefined) {
                payload.data = data;
            }
            res.end(JSON.stringify(payload));
        };

        next();
    });
};