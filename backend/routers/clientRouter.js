import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Client from '../models/clientModel.js';
import data from '../data.js';
import Company from '../models/companyModel.js';


// // const clientRouter = express.Router();

// // clientRouter.get('/', expressAsyncHandler(async (req, res) => {
// //     const clients = await Client.find({});
// //     res.send({ clients });    
// // }));

// // clientRouter.get('/seed', expressAsyncHandler(async (req, res) => {
// //     const createdClients = await Client.insertMany(data.clients);
// //     res.send({ createdClients });
// // }));

// // clientRouter.post('/create', expressAsyncHandler(async (req, res) => {
// //     const newClient = new Client({
// //         clientName: req.body.clientName,
// //         companyName: req.body.companyName,
// //         email: req.body.email,
// //         phone: req.body.phone,
// //         address: req.body.address,
// //         ABN: req.body.ABN,
// //     });
// //     const createdClient = await Client.insertMany(newClient);
// //     res.send({ createdClient });  
// // }));


// // export default clientRouter;


// import express from 'express';
// import expressAsyncHandler from 'express-async-handler';
// import bcrypt from 'bcryptjs';
// import User from '../models/userModel.js';
// import data from '../data.js';
// import Client from '../models/ClientModel.js';


// const clientRouter = express.Router();

// clientRouter.get('/', expressAsyncHandler(async (req, res) => {
//     const clients = await Client.find({});
//     res.send({ clients });    
// }));

// // clientRouter.get('/seed', expressAsyncHandler(async (req, res) => {
// //     const createdUsers = await User.insertMany(data.users);
// //     res.send({ createdUsers });
// //     // const users = await User.find({});
// //     // res.send({ users });    
// // }));

// clientRouter.post('/create', expressAsyncHandler(async (req, res) => {
//     const newClient = new Client({
//         clientName: req.body.clientName,
//         companyName: req.body.companyName,
//         email: req.body.email,
//         phone: req.body.phone,
//         address: req.body.address,
//         ABN: req.body.ABN,
//     });
//     const createdClient = await Client.insertMany(newClient);
//     res.send({ createdClient });  
// }));


// export default clientRouter;

// import express from 'express';
// import expressAsyncHandler from 'express-async-handler';
// import Company from '../models/companyModel';


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