import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: Number},
    ABN: {type: Number},
}, { 
    timestamps: true,
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;