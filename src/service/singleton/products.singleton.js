import { MongoService, FSservice } from '../index.js';

// ------- SINGLETON -------
let instance = null
// -------------------------

// ---------- COLLECTIONS NAME ASSIGNATIONS --------------

class ProductsMongo extends MongoService {
    constructor(){
        super('products')
    }

    static getInstance(){
        if(!instance){
            instance = new ProductsMongo
        }

        return instance
    }
}

class ProductsFS extends FSservice {
    constructor(){
        super('products')
    }

    static getInstance(){
        if(!instance){
            instance = new ProductsFS
        }

        return instance
    }
}

export { ProductsMongo, ProductsFS }