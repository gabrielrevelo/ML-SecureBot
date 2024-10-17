import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
    message: { type: String, required: true },
    urlMedia: { type: String },
    phones: { type: [String] },
    sentAt: { type: Date, default: Date.now },
});

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;