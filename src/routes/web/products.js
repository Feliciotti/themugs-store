//Dependencies
import { Router } from 'express';
// Middleware
import { isAdmin, isAuthenticated } from '../middleware/index.js';
//js files
import {
    getProduct,
    postProduct,
    putProduct,
    delProduct,
    getById,
    postCart
} from '../../controller/index.js';

//-------------------------------------------------

const products = Router();

products.route('/products')
    .get(getProduct)
    .post(postCart)

products.route('/products/add', isAdmin)
    .post(isAdmin, postProduct )

products.route('/products/:id', isAdmin)
    .put(isAdmin, putProduct )
    .delete(isAdmin, delProduct )

products.route('/products/:id?')
    .get(isAuthenticated, getById)

export { products };