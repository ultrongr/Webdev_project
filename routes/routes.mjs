import express from 'express';
const router = express.Router();

const recordCompanyController = await import('../controller/recordCompanyController.mjs');

router.get('/', recordCompanyController.home);
router.get('/contact', recordCompanyController.contact);
router.get('/login', recordCompanyController.login);
router.get('/song-player/:songName', recordCompanyController.songPlayer);

export default router;