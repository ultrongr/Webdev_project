import bcrypt from 'bcrypt'

import * as userModel from '../model/better-sqlite/record-model-better-sqlite.mjs';


export let showLogInForm = function (req, res) {
    res.render('login', {title: 'Login', message: req.params.message});
}


export let showRegisterForm = function (req, res) {
    res.render('register', {title: 'Register'});
}

export let doRegister = function (req, res) {
    try {
        const existingUser =  userModel.getUserByUsername(req.body.username);
        if (existingUser != undefined) {
            res.render('register', { message: 'This username is already in use!' });
            console.log('This username is already in use!');
            return;
        }
        if (req.body.password !== req.body.confirmPassword) {
            res.render('register', { message: 'Passwords do not match!' });
            console.log('Passwords do not match!');
            return;
        }

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
        const registrationResult =  userModel.registerUser(req.body.username, hashedPassword);
        if (registrationResult.message!== 'Registration successful!') {
            res.render('register', { message: registrationResult.message })
            console.log(registrationResult.message)
        }
        else {
            console.log('Registration successful!');
            console.log('Redirecting to home page');
            req.session.username = req.body.username;
            res.redirect('/');
        }
    } catch (error) {
        console.error('registration error: ' + error);
        res.render('register', { message: error });
    }
}

export let doLogIn = function (req, res) {
    try {
        const user =  userModel.getUserByUsername(req.body.username);
        if (user === undefined) {
            res.render('login', { message: 'Username not found!' });
            return;
        }

        if (bcrypt.compareSync(req.body.password, user.Hash_password)) {
            req.session.username = user.Username;
            res.redirect('/');
        } else {
            res.render('login', { message: 'Wrong password!' });
        }
    } catch (error) {
        console.error('login error: ' + error);
        res.render('login', { message: error });
    }
}

export let doLogOut = function (req, res) {
    console.log('Logging out!')
    req.session.destroy();
    
    res.redirect('/login');
}