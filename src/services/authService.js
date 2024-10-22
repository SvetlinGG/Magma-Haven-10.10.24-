import User from "../models/User.js";

const authService = {
    register(username, email, password, rePassword){
        const user = User.findOne({ $or: [{ email }, { username }]});

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
    }
};
export default authService;