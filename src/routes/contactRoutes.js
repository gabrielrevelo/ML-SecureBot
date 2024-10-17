import Contact from "../models/contact.js";

export const configureContactRoutes = (provider, handleCtx) => {
    provider.server.post(
        "/v1/contacts",
        handleCtx(
            async (bot, req, res) => {
                const { name, phone } = req.body;
                console.log("Creando contacto:", name, phone);

                try {
                    const newContact = new Contact({ name, phone });
                    const savedContact = await newContact.save();

                    return res.json("Contacto creado", { contact: savedContact }, 201);
                } catch (error) {
                    console.error("Error al crear contacto:", error);
                    return res.error("Error al crear contacto", null, 500);
                }
            }
        )
    );

    provider.server.get(
        "/v1/contacts",
        handleCtx(
            async (bot, req, res) => {
                try {
                    const contacts = await Contact.find();
                    console.log("Contactos:", contacts);

                    return res.json("Contactos obtenidos", { contacts }, 200);
                } catch (error) {
                    console.error("Error al obtener contactos:", error);
                    return res.error("Error al obtener contactos", null, 500);
                }
            }
        )
    );

    provider.server.put(
        "/v1/contacts/:id",
        handleCtx(
            async (bot, req, res) => {
                const { id } = req.params;
                const updates = req.body;

                try {
                    const contact = await Contact.findByIdAndUpdate(id, updates, { new: true });
                    return res.json("Contacto actualizado", { contact }, 200);
                } catch (error) {
                    console.error("Error al actualizar contacto:", error);
                    return res.error("Error al actualizar contacto", null, 500);
                }
            }
        )
    );

    provider.server.delete(
        "/v1/contacts/:id",
        handleCtx(
            async (bot, req, res) => {
                const { id } = req.params;

                try {
                    const contact = await Contact.findByIdAndDelete(id);
                    if (!contact) {
                        return res.error("Contacto no encontrado", null, 404);
                    }
                    return res.json("Contacto eliminado", { contact }, 200);
                } catch (error) {
                    console.error("Error al eliminar contacto:", error);
                    return res.error("Error al eliminar contacto", null, 500);
                }
            }
        )
    );
};