import { files } from '../config/index.js'

class FilesystemDB {

    constructor(fileName){

        console.log(`${files.route}/${fileName}.json`);
        this.fileName = `${files.route}/${fileName}.json`;

    }

}

export { FilesystemDB }