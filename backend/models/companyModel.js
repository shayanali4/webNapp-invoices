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
            userName: { type: String },
            password: { type: String},
            status: {type: String},
        }
    ],
    clients: [
        {
            clientName: { type: String },
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
            clientName: { type: String },
            email: { type: String },
            address: { type: String },
            phone: { type: Number },
            ABN: { type: Number },
            listItems: [
                {
                    shortDescription: { type: String, required: true},
                    longDescription: { type: String },
                    price: { type: Number }
                }
            ],
        }
    ]
}, { 
    timestamps: true,
});

const Company = mongoose.model('Company', companySchema);
export default Company;