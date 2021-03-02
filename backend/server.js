import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js'
// import clientRouter from './routers/clientRouter.js'
import invoiceRouter from './routers/invoiceRouter.js';
import cors from 'cors';
import serviceRouter from './routers/serviceRouter.js';
import clientRouter from './routers/clientRouter.js';
import companyRouter from './routers/companyRouter.js';

dotenv.config();

const app = express();
app.use(cors()) // Use this after the variable declaration
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
app.use('/api/invoices', invoiceRouter);
app.use('/api/companies', companyRouter);

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