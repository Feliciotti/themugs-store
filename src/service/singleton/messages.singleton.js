import { MongoService, FSservice } from '../index.js';

// ------- SINGLETON -------
let instance = null
// -------------------------

// ---------- COLLECTIONS NAME ASSIGNATIONS --------------
class MessagesMongo extends MongoService {
    constructor(){
        super('messages')
    }

    static getInstance(){
        if(!instance){
            instance = new MessagesMongo
        }

        return instance
    }
}

class MessagesFS extends FSservice {
    constructor(){
        super('messages')
    }

    static getInstance(){
        if(!instance){
            instance = new MessagesFS
        }

        return instance
    }
}

export { MessagesMongo, MessagesFS }