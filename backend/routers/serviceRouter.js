import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Service from '../models/serviceModel.js';
import data from '../data.js';
import Company from '../models/companyModel.js';


const serviceRouter = express.Router();

serviceRouter.post('/', expressAsyncHandler(async (req, res) => {
    // const company = await Company.findOne({ users: { $elemMatch: { userName: req.body.userName } } });
    // const user = company.users.filter(x=>x.userName===req.body.userName)
    // res.send({ services });   
    const selectedCompany = await Company.findOne({ _id: req.body.companyId });
    const services = selectedCompany.servicesList;
    res.send({ services }); 
}));

// serviceRouter.get('/seed', expressAsyncHandler(async (req, res) => {
//     const createdServices = await Service.insertMany(data.services);
//     res.send({ createdServices });
// }));

serviceRouter.post('/create', expressAsyncHandler(async (req, res) => {
    const newService = {
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        price: req.body.price
    };

    // const createdService = await Company.update(
    //     { _id: req.body.companyId }, 
    //     { $push: newService }
    // );
    let company = await Company.findOne({ _id: req.body.companyId });
    company.servicesList.push(newService);
    const createdService = await company.save();
    // console.log(company);

    // const createdService = db.getCollection('companies').findOneAndUpdate(
    //     { "_id": "603dba1dfde3f92f184af393" },
    //     {
    //         $push: {
    //             servicesList: { shortDescription: "cat"}
    //         }
    //     }
    // );
    res.send({ createdService });  
}));

export default serviceRouter;