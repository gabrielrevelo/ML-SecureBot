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

                    if (phones) {
                        contacts = await Contact.find({ phone: { $in: phones } });
                    } else {
                        contacts = await Contact.find({ exclude: false });
                    }

                    for (const contact of contacts) {
                        await bot.sendMessage(contact.phone, message, { media: urlMedia ?? null });
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