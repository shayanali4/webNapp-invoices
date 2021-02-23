import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import Client from '../models/clientModel.js';
import data from '../data.js';


const clientRouter = express.Router();

clientRouter.get('/', expressAsyncHandler(async (req, res) => {
    // const createdUsers = await User.insertMany(data.users);
    // res.send({ createdUsers });
    const clients = await Client.find({});
    res.send({ clients });    
}));

clientRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdClients = await Client.insertMany(data.clients);
    res.send({ createdClients });
    // const clients = await Client.find({});
    // res.send({ clients });    
}));

clientRouter.post('/create', expressAsyncHandler(async (req, res) => {
    const newClient = new Client({
        clientName: req.body.clientName,
        companyName: req.body.companyName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        ABN: req.body.ABN,
    });
    const createdClient = await Client.insertMany(newClient);
    res.send({ createdClient });  
}));


export default clientRouter;