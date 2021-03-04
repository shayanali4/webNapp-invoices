import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Company from '../models/companyModel.js';


const settingRouter = express.Router();

settingRouter.post('/', expressAsyncHandler(async (req, res) => {
    const selectedCompany = await Company.findOne({ _id: req.body.companyId });
    const settings = selectedCompany.settings;
    res.send( settings ); 
}));

settingRouter.post('/update', expressAsyncHandler(async (req, res) => {
    const newSettings = {
        stripeKey: req.body.stripeKey,
        invoiceFooter: req.body.invoiceFooter,
        emailTemplate: req.body.emailTemplate,
        smsTemplate: req.body.smsTemplate
    };

    let company = await Company.findOne({ _id: req.body.companyId });
    company.settings=newSettings;
    const updatedDetails = await company.save();
    const updatedSettings = updatedDetails.settings;
    res.send(updatedSettings);  
}));

export default settingRouter;