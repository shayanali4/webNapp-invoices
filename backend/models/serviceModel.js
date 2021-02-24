import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    shortDescription: { type: String, required: true, unique: true },
    longDescription: { type: String },
    price: { type: Number }
}, { 
    timestamps: true,
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;