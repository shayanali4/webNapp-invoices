import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const invoicesSchema = new mongoose.Schema({
    clientName: { type: String },
    companyName: { type: String },
    email: { type: String },
    address: { type: String },
    phone: { type: Number },
    ABN: { type: Number },
    servicesList: [Schema.Types.ObjectId],
    totalAmount: {type: Number},
    paidAmount: {type: Number},
    balanceAmount: {type: Number},
}, { 
    timestamps: true,
});

const Invoice = mongoose.model('Invoice', invoicesSchema);
export default Invoice;