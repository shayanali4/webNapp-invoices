import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import data from '../data.js';
import { generateToken } from '../utils.js';


const userRouter = express.Router();

userRouter.get('/', expressAsyncHandler(async (req, res) => {
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
    const user = await User.findOne({ userName: req.body.userName });
    // console.log("user", user);
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                userName: user.userName,
                companyId: user.companyId,
                status: user.status,
                token: generateToken(user),
            });
        return;
        }
    }
    res.status(401).send({
        message: 'Invalid User Name or password'});
    })
);

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