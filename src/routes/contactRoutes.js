import Contact from "../models/contact.js";

export const configureContactRoutes = (provider, handleCtx) => {
    provider.server.post(
        "/v1/contacts",
        handleCtx(
            async (bot, req, res) => {
                const { name, phone } = req.body;
                console.log("Creating contact:", name, phone);

                try {
                    const newContact = new Contact({ name, phone });
                    const savedContact = await newContact.save();

                    return res.json("Contact created", { contact: savedContact }, 201);
                } catch (error) {
                    console.error("Error creating contact:", error);
                    return res.error("Error creating contact", null, 500);
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
                    console.log("Contacts:", contacts);

                    return res.json("Contacts fetched", { contacts }, 200);
                } catch (error) {
                    console.error("Error fetching contacts:", error);
                    return res.error("Error fetching contacts", null, 500);
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
                    return res.json("Contact updated", { contact }, 200);
                } catch (error) {
                    console.error("Error updating contact:", error);
                    return res.error("Error updating contact", null, 500);
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
                        return res.error("Contact not found", null, 404);
                    }
                    return res.json("Contact deleted", { contact }, 200);
                } catch (error) {
                    console.error("Error deleting contact:", error);
                    return res.error("Error deleting contact", null, 500);
                }
            }
        )
    );
};