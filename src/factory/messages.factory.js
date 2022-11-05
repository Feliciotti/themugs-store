import { MessagesMongo, MessagesFS } from '../service/singleton/index.js';

class MessagesFactory {
    static create(db){
        switch(db) {
            case 'mongo':
                return MessagesMongo.getInstance()

            break;

            case 'files':
                return MessagesFS.getInstance()
        }
    }
}

export { MessagesFactory }