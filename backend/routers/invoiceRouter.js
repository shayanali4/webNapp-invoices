import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Company from '../models/companyModel.js';


const invoiceRouter = express.Router();

invoiceRouter.post('/', expressAsyncHandler(async (req, res) => {
    const selectedCompany = await Company.findOne({ _id: req.body.companyId });
    const invoices = selectedCompany.invoices;
    res.send({ invoices }); 
}));

invoiceRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdInvoices = await Company.insertMany(data.invoices);
    res.send({ createdInvoices });
    // const users = await User.find({});
    // res.send({ users });    
}));

invoiceRouter.post('/new', expressAsyncHandler(async (req, res) => {
    const newInvoice = {
        clientName: req.body.clientName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        ABN: req.body.ABN,
        // ListItems: req.body.listItems
    };
    console.log(req.body)
    newInvoice.listItems = [...req.body.listItems];
    console.log(newInvoice)
    let company = await Company.findOne({ _id: req.body.companyId });
    company.invoices.push(newInvoice);
    // company.invoices.listItems=req.body.listItems;

    const createdInvoice = await company.save();

    const selectedInvoice = createdInvoice.invoices.filter(x => x.clientName === req.body.clientName);
    // console.log(selectedInvoice)



    
    res.send({ selectedInvoice });;  
}));

export default invoiceRouter;