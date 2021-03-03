import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Invoice from '../models/invoiceModel.js';
import data from '../data.js';
import { generateToken } from '../utils.js';
import Company from '../models/companyModel.js';


const invoiceRouter = express.Router();

invoiceRouter.get('/', expressAsyncHandler(async (req, res) => {
    const invoices = await Company.find({});
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
    newInvoice.listItems = [...req.body.listItems];
    console.log(req.body)
    let company = await Company.findOne({ _id: req.body.companyId });
    company.invoices.push(newInvoice);
    // company.invoices.listItems=req.body.listItems;
    // console.log(company)

    const createdInvoice = await company.save();

    const selectedInvoice = createdInvoice.clients.filter(x => x.companyName === req.body.companyName);
    res.send({ selectedInvoice }); ;  
}));

export default invoiceRouter;