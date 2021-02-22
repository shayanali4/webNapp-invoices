import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js'
import invoiceRouter from './routers/invoiceRouter.js';

dotenv.config();

const app = express();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://admin:admin123@cluster0.gwgp8.mongodb.net/MyAccounts?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use('/api/users', userRouter);
app.use('/api/invoices', invoiceRouter);

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