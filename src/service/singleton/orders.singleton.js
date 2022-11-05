import { MongoService, FSservice } from '../index.js';

// ------- SINGLETON -------
let instance = null
// -------------------------

// ---------- COLLECTIONS NAME ASSIGNATIONS --------------
class OrdersMongo extends MongoService {
    constructor(){
        super('orders')
    }

    static getInstance(){
        if(!instance){
            instance = new OrdersMongo
        }

        return instance
    }
}

class OrdersFS extends FSservice {
    constructor(){
        super('orders')
    }

    static getInstance(){
        if(!instance){
            instance = new OrdersFS
        }

        return instance
    }
}

export { OrdersMongo, OrdersFS }