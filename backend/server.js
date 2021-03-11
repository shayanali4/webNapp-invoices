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
    console.log("shaheer")
    const email=req.body.email

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'usd',
        
        payment_method_types: ['card'],
      });    res.json({client_secret: paymentIntent});
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