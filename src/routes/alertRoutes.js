import Alert from "../models/alert.js";
import Contact from "../models/contact.js";

export const configureAlertRoutes = (provider, handleCtx) => {
    provider.server.post(
        "/v1/alert",
        handleCtx(
            async (bot, req, res) => {
                const { message, urlMedia, phones } = req.body;

                try {
                    let contacts;

                    if (phones && Array.isArray(phones)) {
                        for (const phone of phones) {
                            try {
                                await bot.sendMessage(phone, message, { media: urlMedia ?? null });
                            } catch (sendError) {
                                console.error(`Error al enviar mensaje a ${phone}:`, sendError);
                            }
                        }
                    } else {
                        contacts = await Contact.find({ exclude: false });
                        for (const contact of contacts) {
                            try {
                                await bot.sendMessage(contact.phone, message, { media: urlMedia ?? null });
                            } catch (sendError) {
                                console.error(`Error al enviar mensaje a ${contact.phone}:`, sendError);
                            }
                        }
                    }

                    const newAlert = new Alert({ message, urlMedia, phones });
                    await newAlert.save();

                    return res.json("Alerta enviada", null, 200);
                } catch (error) {
                    console.error("Error al enviar la alerta:", error);
                    return res.error("Error al enviar la alerta", null, 500);
                }
            }
        )
    );
};
