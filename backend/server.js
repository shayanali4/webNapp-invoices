import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import userRouter from './routers/userRouter.js'
// import clientRouter from './routers/clientRouter.js'
import invoiceRouter from './routers/invoiceRouter.js';
import cors from 'cors';
import serviceRouter from './routers/serviceRouter.js';
import clientRouter from './routers/clientRouter.js';
import companyRouter from './routers/companyRouter.js';
import settingRouter from './routers/settingRouter.js';
import emailRouter from './routers/emailRouter.js';
import { createRequire } from 'module';
import Company from './models/companyModel.js';

const require = createRequire(import.meta.url);

dotenv.config();

const app = express();

app.use(cors()) // Use this after the variable declaration

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51ISxqYIPvcR2SEMAUeSmYsBKlaWyoLkP0po8RvipeKZFIuyczUVaeXZ7klvVIdLFzoUivZ2WP0MIH2BHdPLkQlzK00VILp2S8U');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://admin:admin123@cluster0.gwgp8.mongodb.net/MyAccounts?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(
    console.log("MongoDB Connected")
).catch((err) => {
    console.log("mongo error",err)
});

app.use('/api/users', userRouter);
app.use('/api/clients', clientRouter);
app.use('/api/services', serviceRouter);
app.use('/api/settings', settingRouter);
app.use('/api/invoices', invoiceRouter);
app.use('/api/companies', companyRouter);
app.use('/api/email', emailRouter);

app.post('/pay', async (req, res) => {
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.payAmount,
        currency: 'usd',
        payment_method_types: ['card'],
    });
    // console.log(paymentIntent)
    const utcSeconds = paymentIntent.created;
    let date = new Date(0); // The 0 there is the key, which sets the date to the epoch
    date.setUTCSeconds(utcSeconds);
    
    const paymentData = {
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        email: req.body.email,
        liveMode: paymentIntent.liveMode,
        _id: paymentIntent.id,
        date: date,
        isPaid: true
    };
    let company = await Company.findOne({ _id: req.body.companyId });
    let filteredIndex=company.invoices.findIndex(x => x._id == req.body._id);
    company.invoices[filteredIndex].stripePayment = paymentData;
    company.invoices[filteredIndex].paidAmount = paymentData.amount + req.body.paidAmount;
    company.invoices[filteredIndex].totalAmount = paymentData.amount + req.body.paidAmount;
    company.invoices[filteredIndex].balance =  0;
    const updatedCompany = await company.save();
    res.json({ client_secret: paymentData });
  });

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next)=> {
    res.status(500).send({message:err.message});
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});