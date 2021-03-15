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
    let company = await Company.findOne({ _id: req.body.companyId });
    let companyName = company.companyName;
    const invoiceNumber = `INV${Math.floor(1000 + Math.random() * 9000)}`;
    const newInvoice = {
        invoiceNumber: invoiceNumber,
        clientName: req.body.clientName,
        companyName: companyName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        ABN: req.body.ABN,
        totalAmount: req.body.totalAmount,
        balanceAmount: req.body.balanceAmount,
        paidAmount: req.body.paidAmount,
        createdDate: req.body.createdDate
        // ListItems: req.body.listItems
    };
    // console.log(req.body)
    newInvoice.listItems = [...req.body.listItems];
    // console.log("new Invoice",newInvoice)
    company.invoices.push(newInvoice);
    // company.invoices.listItems=req.body.listItems;
    // console.log("company",company)
    const createdInvoice = await company.save();

    const selectedInvoice = createdInvoice.invoices.filter(x => x.invoiceNumber === invoiceNumber);
    console.log(selectedInvoice[0])



    
    res.send( selectedInvoice[0] );  
}));

invoiceRouter.post('/updatepayment', expressAsyncHandler(async (req, res) => {
    // const invoiceNumber = `INV${Math.floor(1000 + Math.random() * 9000)}`;
    const newPayment = {
        payValue: req.body.payValue,
        payDate: req.body.payDate,
        payMethod:req.body.payMethod
    };
    // newInvoice.listItems = [...req.body.listItems];
    // console.log("new Invoice",newInvoice)
    
    let company = await Company.findOne({ _id: req.body.companyId });    
    let filteredIndex=company.invoices.findIndex(x => x._id == req.body._id);
    company.invoices[filteredIndex].paymentList.push(newPayment);
    const updatedCompany = await company.save();
    console.log(updatedCompany.invoices[filteredIndex].paymentList)


    // company.invoices.listItems=req.body.listItems;
    console.log("company",company.invoices[filteredIndex])

    const selectedInvoice = updatedCompany.invoices.filter(x => x._id == req.body._id);
    console.log(selectedInvoice[0])



    
    res.send( selectedInvoice[0]);  
}));

export default invoiceRouter;