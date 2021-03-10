import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import Company from '../models/companyModel.js';


const userRouter = express.Router();

userRouter.post('/', expressAsyncHandler(async (req, res) => {
    // const createdUsers = await User.insertMany(data.users);
    // res.send({ createdUsers });
    const users = await User.find({});
    res.send({ users });    
}));

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
    // const users = await User.find({});
    // res.send({ users });    
}));

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    console.log(req.body)
    const company = await Company.findOne({ users: { $elemMatch: { email: req.body.email } } });
    if (!company) {
        res.send({ message:'Invalid Email Address'})
    }
    const user = company.users.filter(x => x.email === req.body.email)
    if (user[0]) {
        // console.log("user", user[0].password);
        if (bcrypt.compareSync(req.body.password, user[0].password)) {
            res.send({
                _id: user[0]._id,
                companyId: company._id,
                email: user[0].email,
                status: user[0].status,
            });
        return;
        }
    }

    res.status(401).send({
        message: 'Invalid Passowrd'});
    })
);

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
//                 // token: generateToken(user),
//             });
//         return;
//         }
//     }
//     res.status(401).send({
//         message: 'Invalid User Name or password'});
//     })
// );


// userRouter.post('/register', expressAsyncHandler(async (req, res) => {
//     const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: bcrypt.hashSync(req.body.password, 8)
//     });
//     const createdUser = await user.save();
//     res.send({
//         _id: createdUser._id,
//         name: createdUser.name,
//         email: createdUser.email,
//         isAdmin: createdUser.isAdmin,
//         token: generateToken(createdUser),
//     });
// }));

export default userRouter;