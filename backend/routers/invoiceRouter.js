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

// userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
//     const user = await User.findOne({ userName: req.body.userName });
//     // console.log("user", user);
//     if (user) {
//         if (bcrypt.compareSync(req.body.password, user.password)) {
//             res.send({
//                 _id: user._id,
//                 userName: user.userName,
//                 companyId: user.companyId,
//                 status: user.status,
//                 token: generateToken(user),
//             });
//         return;
//         }
//     }
//     res.status(401).send({
//         message: 'Invalid User Name or password'});
//     })
// );

export default invoiceRouter;