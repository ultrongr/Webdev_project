import session from 'express-session'
import dotenv from 'dotenv';
dotenv.config();

let recordSession = session({
    secret: process.env.SESSION_SECRET,
    
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
});

export default recordSession;
