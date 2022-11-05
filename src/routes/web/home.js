import { Router } from 'express';

import { getUser } from '../../controller/index.js';
import { isAuthenticated } from '../middleware/index.js';

const home = Router();

home.route('/')
    .get((req, res) => {
        res.redirect('/home')
    });

home.route('/home')
    .get(isAuthenticated, getUser);

export { home }