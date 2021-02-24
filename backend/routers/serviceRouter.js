import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Service from '../models/serviceModel.js';
import data from '../data.js';


const serviceRouter = express.Router();

serviceRouter.get('/', expressAsyncHandler(async (req, res) => {
    const services = await Service.find({});
    res.send({ services });    
}));

serviceRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdServices = await Service.insertMany(data.services);
    res.send({ createdServices });
}));

serviceRouter.post('/create', expressAsyncHandler(async (req, res) => {
    const newService = new Service({
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        price: req.body.price
    });
    const createdService = await Service.insertMany(newService);
    res.send({ createdService });  
}));

export default serviceRouter;