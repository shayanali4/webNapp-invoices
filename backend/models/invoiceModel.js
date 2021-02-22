import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const invoicesSchema = new mongoose.Schema({
    invoiceNumber: {type: Number},
    invoiceUniqueCompanyNumber: { type: Number},
    customerDetails: {type: Schema.Types.ObjectId, ref: 'Customer'},
    companyDetails: {type: Schema.Types.ObjectId, ref: 'Company'},
    invoiceItems: {type: Schema.Types.ObjectId, ref: 'InvoiceItem'},
    totalAmount: {type: Number},
}, { 
    timestamps: true,
});

const Invoice = mongoose.model('Invoice', invoicesSchema);
export default Invoice;