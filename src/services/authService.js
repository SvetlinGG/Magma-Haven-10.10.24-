import bcrypt from 'bcrypt';
import User from "../models/User.js";
import jwt from '../lib/jwt.js';

const authService = {
    async register(username, email, password, rePassword){
        const user = await User.findOne({ $or: [{ email }, { username }]});

        if(password !== rePassword){
            throw  new Error('Password miss-match!');
        }

        if (user){
            throw new Error('User already exists');
        }
        return User.create({
            username,
            password,
            email,
    });
    },
    async login(email, password){

        const user = await User.find({email});

        if(!user){
            throw new Error("Invalid user");
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid){
            throw new Error('Invalid password');
        }

        const payload = {
            _id: user._id,
            email,
            username: user.username,
        };
        const token = await jwt.sign(payload, process.env.JWT_SECRET);

        return token;
    }
    
};
export default authService;