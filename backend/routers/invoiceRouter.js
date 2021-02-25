import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Invoice from '../models/invoiceModel.js';
import data from '../data.js';
import { generateToken } from '../utils.js';


const invoiceRouter = express.Router();

invoiceRouter.get('/', expressAsyncHandler(async (req, res) => {
    // const createdUsers = await User.insertMany(data.users);
    // res.send({ createdUsers });
    const invoices = await Invoice.find({});
    res.send({ invoices });    
}));

invoiceRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdInvoices = await Invoice.insertMany(data.invoices);
    res.send({ createdInvoices });
    // const users = await User.find({});
    // res.send({ users });    
}));

invoiceRouter.post('/new', expressAsyncHandler(async (req, res) => {
    const newInvoice = new Invoice({
        clientName: req.body.clientName,
        companyName: req.body.companyName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        ABN: req.body.ABN,
        servicesList: req.body.servicesList
    });

    const createdInvoice = await newInvoice.save();
    console.log('createdInvoice console==>',createdInvoice)
    res.send({ createdInvoice });  
}));

export default invoiceRouter;