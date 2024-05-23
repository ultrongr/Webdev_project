import express from 'express';
import { login } from '../controller/recordCompanyController.mjs';
const router = express.Router();

const recordCompanyController = await import('../controller/recordCompanyController.mjs');
const loginController = await import('../controller/login-controller.mjs');

router.get('/', recordCompanyController.home);
router.get('/contact', recordCompanyController.contact);

router.get('/login', loginController.showLogInForm);
router.post('/login', loginController.doLogIn);
router.get('/register', loginController.showRegisterForm);
router.post('/register', loginController.doRegister);

router.get('/logout', loginController.doLogOut);

router.get('/song-player/:songName', recordCompanyController.songPlayer);
router.get('/artist/:artistName', recordCompanyController.artist);
router.get('/artists', recordCompanyController.artists);

router.get('/events', recordCompanyController.showFavouriteArtistsEvents);

export default router;