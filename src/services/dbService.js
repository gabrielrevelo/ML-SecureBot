import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);

        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('\nConectado a MongoDB\n');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);

        process.exit(1);
    }
};