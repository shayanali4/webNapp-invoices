import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Company from '../models/companyModel.js';


const serviceRouter = express.Router();

serviceRouter.post('/', expressAsyncHandler(async (req, res) => {

    const selectedCompany = await Company.findOne({ _id: req.body.companyId });
    const services = selectedCompany.servicesList;
    res.send({ services }); 
}));

serviceRouter.post('/create', expressAsyncHandler(async (req, res) => {
    const newService = {
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        price: req.body.price
    };

    let company = await Company.findOne({ _id: req.body.companyId });
    company.servicesList.push(newService);
    const createdService = await company.save();

    res.send({ createdService });  
}));

export default serviceRouter;