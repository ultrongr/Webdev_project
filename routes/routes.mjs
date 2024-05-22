import express from 'express';
const router = express.Router();

const recordCompanyController = await import('../controller/recordCompanyController.mjs');
const loginController = await import('../controller/login-controller.mjs');

router.get('/', recordCompanyController.home);
router.get('/contact', recordCompanyController.contact);

router.get('/login', recordCompanyController.login);
router.post('/login', loginController.doLogIn);
router.get('/register', recordCompanyController.register);
router.post('/register', loginController.doRegister);
router.get('/song-player/:songName', recordCompanyController.songPlayer);
router.get('/artist/:artistName', recordCompanyController.artist);
router.get('/artists', recordCompanyController.artists);

export default router;