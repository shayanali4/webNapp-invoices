import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Company from '../models/companyModel.js';


const clientRouter = express.Router();

clientRouter.post('/', expressAsyncHandler(async (req, res) => {

    const selectedCompany = await Company.findOne({ _id: req.body.companyId });
    const clients = selectedCompany.clients;
    res.send({ clients }); 
}));

clientRouter.post('/create', expressAsyncHandler(async (req, res) => {
    const newClient = {
        clientName: req.body.clientName,
        companyName: req.body.companyName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        ABN: req.body.ABN,
    };

    let company = await Company.findOne({ _id: req.body.companyId });
    company.clients.push(newClient);
    const createdClient = await company.save();

    const selectedClient = createdClient.clients.filter(x => x.clientName === req.body.clientName);
    res.send({ selectedClient });  
}));

export default clientRouter;