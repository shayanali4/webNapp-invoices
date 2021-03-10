import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    companyName: { type: String, unique:true },
    servicesList: [
        {
            shortDescription: { type: String},
            longDescription: { type: String },
            price: { type: Number }
        }
    ],
    users: [
        {
            userName: { type: String, unique:true },
            password: { type: String},
            status: {type: String},
        }
    ],
    clients: [
        {
            clientName: { type: String, unique:true },
            companyName: { type: String },
            email: { type: String },
            address: { type: String },
            phone: { type: Number },
            ABN: { type: Number },
        }
    ],
    invoices: [
        {
            clientName: { type: String },
            invoiceNumber: {type: String, unique:true},
            email: { type: String },
            address: { type: String },
            phone: { type: Number },
            ABN: { type: Number },
            totalAmount: {type: Number},
            paidAmount: {type: Number},
            balanceAmount: { type: Number },
            paymentList: [
                {
                    payValue: { type: Number, required: true},
                    payMethod: { type: String },
                    date: { type: String }
                }
            ],
            listItems: [
                {
                    shortDescription: { type: String, required: true},
                    longDescription: { type: String },
                    price: { type: Number }
                }
            ],
        }
    ],
    settings: {
        stripeKey: { type: String },
        emailTemplate: { type: String },
        smsTemplate: { type: String },
        invoiceFooter: { type: String },
    }
}, { 
    timestamps: true,
});

const Company = mongoose.model('Company', companySchema);
export default Company;