import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Company from '../models/companyModel.js';


const invoiceRouter = express.Router();

invoiceRouter.post('/', expressAsyncHandler(async (req, res) => {
    const selectedCompany = await Company.findOne({ _id: req.body.companyId });
    const invoices = selectedCompany.invoices;
    res.send(invoices); 
}));

invoiceRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdInvoices = await Company.insertMany(data.invoices);
    res.send({ createdInvoices });
    // const users = await User.find({});
    // res.send({ users });    
}));

invoiceRouter.post('/new', expressAsyncHandler(async (req, res) => {
    const invoiceNumber = `INV${Math.floor(1000 + Math.random() * 9000)}`;
    const newInvoice = {
        invoiceNumber: invoiceNumber,
        clientName: req.body.clientName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        ABN: req.body.ABN,
        // ListItems: req.body.listItems
    };
    // console.log(req.body)
    newInvoice.listItems = [...req.body.listItems];
    // console.log("new Invoice",newInvoice)
    let company = await Company.findOne({ _id: req.body.companyId });
    company.invoices.push(newInvoice);
    // company.invoices.listItems=req.body.listItems;
    // console.log("company",company)
    const createdInvoice = await company.save();

    const selectedInvoice = createdInvoice.invoices.filter(x => x.invoiceNumber === invoiceNumber);
    console.log(selectedInvoice[0])



    
    res.send( selectedInvoice[0] );  
}));

export default invoiceRouter;