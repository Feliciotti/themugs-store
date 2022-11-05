import { Router } from 'express';

import {
    getCart,
    postCart,
    deleteCart,
    getCartProducts,
    delCartProducts,
    postCartProducts
} from '../../controller/index.js';
import { isAuthenticated, isAdmin } from '../middleware/index.js'

//---------------------------------------

const cart = Router();

cart.route('/carrito')
    .get (isAuthenticated, isAdmin , getCart )
    .post(isAuthenticated, postCart );

cart.route('/carrito/:id')
    .delete(isAuthenticated, deleteCart );
    
cart.route('/carrito/:id/productos')
    .get(isAuthenticated, getCartProducts )
    .post(isAuthenticated, postCartProducts);

cart.route('/carrito/:id/productos/:id_prod')
    .delete(isAuthenticated, delCartProducts)

export { cart };