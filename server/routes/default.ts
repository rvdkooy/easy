import * as express from 'express';
import redirectIfNotLoggedIn from '../security/redirectIfNotLoggedIn';
const router = express.Router();

router.get(['/admin', '/admin/*'], redirectIfNotLoggedIn(), (req, res) => {
    res.render('admin', { title: 'Easy Admin' });
});

router.get('/login', (req, res, next) => {
    res.render('login', { title: 'Judgify login', layout: null });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/*', (req, res) => {
    res.render('index', { title: 'Easy' });
});

export default router;