import { OrdersFS, OrdersMongo } from '../service/singleton/index.js';

class OrdersFactory {
    static create(db){
        switch(db) {
            case 'mongo':
                return OrdersMongo.getInstance()

            break;

            case 'files':
                return OrdersFS.getInstance()
        }
    }
}

export { OrdersFactory }