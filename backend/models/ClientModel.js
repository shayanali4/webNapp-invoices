import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
    clientName: { type: String },
    companyName: { type: String },
    email: { type: String },
    address: { type: String },
    phone: { type: Number},
    ABN: {type: Number},
}, { 
    timestamps: true,
});

const Client = mongoose.model('Client', clientSchema);
export default Client;