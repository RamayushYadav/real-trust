import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name.'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email.'],
    },
    mobile: {
        type: String,
        required: [true, 'Please provide your mobile number.'],
    },
    city: {
        type: String,
        required: [true, 'Please provide your city.'],
    },
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
