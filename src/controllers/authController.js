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
        const token = await authService.register(username, email, password, rePassword);
        
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true});
        res.redirect('/');

    } catch (err) {
        
        res.render('auth/register', {title: 'Register Page', username, email});
    }
    
});

authController.get('/login', (req, res) => {
    res.render('auth/login', {title: 'Login Page'});
});

authController.post('/login',async  (req, res) => {
    const {email, password} = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie(AUTH_COOKIE_NAME, token, {httpOnly: true});

        res.redirect('/');
        
    } catch (err) {
        res.render('auth/login', {title: 'Login Page', email });
    }

    
});

authController.get('logout', (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);

    res.redirect('/');
});

export default authController;