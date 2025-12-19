import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this client.'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    designation: {
        type: String,
        required: [true, 'Please provide a designation for this client.'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description/testimonial.'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide an image URL for this client.'],
    },
}, { timestamps: true });

export default mongoose.models.Client || mongoose.model('Client', ClientSchema);
