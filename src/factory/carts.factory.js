import { CartsFS, CartsMongo } from '../service/singleton/index.js';

class CartsFactory {
    static create(db){
        switch(db) {
            case 'mongo':
                return CartsMongo.getInstance()

            break;

            case 'files':
                return CartsFS.getInstance()
        }
    }
}

export { CartsFactory }