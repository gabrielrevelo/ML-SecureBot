import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    exclude: { type: Boolean, default: false },
    __v: { type: Number, select: false },
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
