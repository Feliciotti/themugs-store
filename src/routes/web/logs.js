import { Router } from "express";

import {
    login,
    logup,
    logout,
    loginPost,
    logupForm,
    loginError,
    tokenConfirm
} from '../../controller/index.js'
import multer from '../../libs/multer.js';

//---------------------------------------

const log = Router ()

log.route('/login')
    .get( login )
    .post( loginPost );

log.route('/login-error')
    .get( loginError );

log.route('/logup')
    .get( logupForm )
    .post(multer.single('img'), logup );

log.route('/logout')
    .get( logout )

log.route('/activate-account/:token')
    .get(tokenConfirm)

//---------------------------------------

export { log }