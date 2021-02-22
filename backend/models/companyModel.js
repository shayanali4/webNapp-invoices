import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    masterCompany: {type: String,},
    companyName: {type:String},
    companyPhone: {type:Number},
    companyEmail: {type:String, unique: true},
    companyAddress: { type: String },
    companyABN: {type: Number},
}, { 
    timestamps: true,
});

const Company = mongoose.model('Company', companySchema);
export default Company;