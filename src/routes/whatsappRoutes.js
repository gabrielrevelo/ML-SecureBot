import { sessionState } from '../app.js';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const QR_PATH = join(__dirname, '../../bot.qr.png');

export const configureWhatsAppRoutes = (provider) => {
    const server = provider?.server;
    if (!server) {
        console.warn('Provider server no inicializado aún');
        return;
    }

    server.get('/v1/whatsapp/session-status', (_req, res) => {
        try {
            const sock = provider?.vendor;
            const hasUser = !!sock?.user;
            const sessionActive = sessionState.isSessionReady && hasUser;
            const hasQR = existsSync(QR_PATH);

            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            });
            res.end(JSON.stringify({
                active: !!sessionActive,
                isReady: sessionState.isSessionReady,
                hasUser,
                hasQR,
                timestamp: new Date().toISOString(),
            }));
        } catch (error) {
            res.writeHead(500, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            });
            res.end(JSON.stringify({
                active: false,
                error: error?.message || 'Unknown error',
            }));
        }
    });

    // Endpoint para obtener el QR como imagen
    server.get('/v1/whatsapp/qr', async (_req, res) => {
        try {
            if (!existsSync(QR_PATH)) {
                res.writeHead(404, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                });
                res.end(JSON.stringify({
                    error: 'No hay QR disponible. La sesión puede estar activa o el QR aún no se ha generado.',
                }));
                return;
            }

            // Leer el archivo QR.png directamente
            const qrBuffer = await readFile(QR_PATH);
            const qrBase64 = `data:image/png;base64,${qrBuffer.toString('base64')}`;

            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            });
            res.end(JSON.stringify({
                qr: qrBase64,
                timestamp: new Date().toISOString(),
            }));
        } catch (error) {
            res.writeHead(500, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            });
            res.end(JSON.stringify({
                error: error?.message || 'Error al generar QR',
            }));
        }
    });
};