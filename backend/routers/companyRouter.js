import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Company from '../models/companyModel.js';


const companyRouter = express.Router();

companyRouter.get('/', expressAsyncHandler(async (req, res) => {
    const companies = await Company.find({});
    res.send({ companies });    
}));

companyRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const tempCompany = new Company({
        companyName: data.companies[0].companyName,
        servicesList: data.companies[0].servicesList,
        users: data.companies[0].users,
        clients: data.companies[0].clients,
        invoices: data.companies[0].invoices,

    });
    const createdCompanies = await tempCompany.save();
    res.send({ createdCompanies });
    // const users = await User.find({});
    // res.send({ users });    
}));

// invoiceRouter.post('/new', expressAsyncHandler(async (req, res) => {
//     const newInvoice = new Company({
//         clientName: req.body.clientName,
//         companyName: req.body.companyName,
//         email: req.body.email,
//         phone: req.body.phone,
//         address: req.body.address,
//         ABN: req.body.ABN,
//         servicesList: req.body.servicesList
//     });

//     const createdInvoice = await newInvoice.save();
//     console.log('createdInvoice console==>',createdInvoice)
//     res.send({ createdInvoice });  
// }));

export default companyRouter;