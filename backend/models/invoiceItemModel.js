import mongoose from 'mongoose';

const invoiceItemSchema = new mongoose.Schema({
    description: {type:String},
    amount: {type:Number}
}, { 
    timestamps: true,
});

const InvoiceItem = mongoose.model('InvoiceItem', invoiceItemSchema);
export default InvoiceItem;