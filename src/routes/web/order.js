import { Router } from "express";

import {
    getOrder,
    postOrder
} from '../../controller/index.js'
import { isAuthenticated } from '../middleware/index.js'

//---------------------------------------

const order = Router();

order.route('/comprar')
    .post(isAuthenticated, postOrder)
    .get(isAuthenticated, getOrder);

export { order };