import { ProductsFS, ProductsMongo } from '../service/singleton/index.js';

class ProductsFactory {
    static create(db){
        switch(db) {
            case 'mongo':
                return ProductsMongo.getInstance()

            break;

            case 'files':
                return ProductsFS.getInstance()
        }
    }
}

export { ProductsFactory }