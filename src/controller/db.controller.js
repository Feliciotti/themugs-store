import {
    ProductsFactory,
    CartsFactory,
    OrdersFactory,
    MessagesFactory
} from '../factory/index.factory.js';

//---- db assign ----
const DB = process.env.SELECTED_DB || 'mongo'

const productsDao = ProductsFactory.create(DB)
const cartsDao = CartsFactory.create(DB)
const ordersDao = OrdersFactory.create(DB)
const messagesDao = MessagesFactory.create(DB)

// -------------------------------
export { //to web/controllers
    productsDao,
    cartsDao,
    ordersDao,
    //to websockets client
    messagesDao
};