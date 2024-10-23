import { Router} from "express";
import authService from "../services/authService.js";
import { AUTH_COOKIE_NAME } from "../views/constants.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register', {title: 'Register Page'});
});

authController.post('/register', async (req, res)=> {
    const { email, password,rePassword, username} = req.body;

    try {
        await authService.register(username, email, password, rePassword);

        res.redirect('/auth/login');

    } catch (err) {
        
        res.render('auth/register', {title: 'Register Page', username, email});
    }
    
});

authController.get('/login', (req, res) => {
    res.render('auth/login', {title: 'Login Page'});
});

authController.post('/login',async  (req, res) => {
    const {email, password} = req.body;

    const token = await authService.login(email, password);

    res.cookie(AUTH_COOKIE_NAME, token);

    res.redirect('/');
})

export default authController;