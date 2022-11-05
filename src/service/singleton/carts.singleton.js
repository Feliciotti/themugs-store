import { MongoService, FSservice } from '../index.js';

// ------- SINGLETON -------
let instance = null
// -------------------------

// ---------- COLLECTIONS NAME ASSIGNATIONS --------------
class CartsMongo extends MongoService {
    constructor(){
        super('carts')
    }

    static getInstance(){
        if(!instance){
            instance = new CartsMongo
        }

        return instance
    }
}

class CartsFS extends FSservice {
    constructor(){
        super('carts')
    }

    static getInstance(){
        if(!instance){
            instance = new CartsFS
        }

        return instance
    }
}

export { CartsMongo, CartsFS }