import mongoose from 'mongoose';

const NewsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide your email.'],
        unique: true,
    },
}, { timestamps: true });

export default mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);
