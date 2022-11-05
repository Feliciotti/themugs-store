import fs from 'fs';
import { FilesystemDB } from '../../db/index.js';

class FileDao extends FilesystemDB {
    constructor(e) {
        super(e)
    };
    
    async getAll() {
        try {
            const array = await fs.promises.readFile(this.fileName, "utf-8");
            
            return array
    
        } catch (err) {
            if(err.code == 'ENOENT'){
                await fs.promises.writeFile(this.fileName, 
                JSON.stringify([], null, 2))
            };
            return err
        };
    };

    async save(e) {
        try {
            const array = await this.getAll();
            array.push(e);

            await fs.promises.writeFile(this.fileName, JSON.stringify(array, null, 2))

        } catch (error) {
            return error
        };
    };

    async getById(id){
        try{
            const array = await this.getAll();
            const result = array.find(product => product.id == id)
            return result
        }catch (error){
            throw new Error(error)
        }
    };

    async deleteById(id){
        try {
            const array = await this.getAll();  
            const index = array.findIndex(product => product.id == id);

            array.splice(index, 1)

            fs.promises.writeFile(this.fileName,
                JSON.stringify(array, null, 2),
                (err) => {err});
            
        } catch (error){
            error
        }
    };

    async updateById(id, newData) {
        try {
            const array = await this.getAll();
            const index = array.findIndex((e) => e.id == id);
            
            Object.keys(newData).forEach(key => {

                if (newData[key] === undefined) {

                    delete newData[key];

                }
            
            });
                    
            array[index] = { ...array[index], ...newData };
                    
            await fs.promises.writeFile(
                this.fileName,
                JSON.stringify(array, null, 2));

            return array[index];

        } catch (error) {
            return error;
        }
    }

    async delete(){
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(error)
        };
    };
    
};

export { FileDao }