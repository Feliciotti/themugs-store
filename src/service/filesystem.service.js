import { FileDao } from '../models/index.js';

class FSservice extends FileDao{
    constructor(e){
        super(e)
    }
    
    async getAll() {
        const array = await super.getAll()
        const parsedArray = JSON.parse(array);

        return parsedArray;
    };

    async add(e) {
        try {
            const array = await this.getAll();

            const lastAdded = array[array.length-1]
            e.id = lastAdded ? lastAdded.id + 1 : 1

            await super.save(e)

            return `${e.title}, con id: ${e.id}`

        } catch (error) {
            return error
        };
    };

    async getById(id){
        try{
            const product = await super.getById(id);

            return product

        }catch (error){
            throw new Error(error)
        }
    };

    async delete(id){
        try {
            await super.deleteById(id)

            return(`Deleted item under id: ${id}`)
            
        } catch (error){
            error
        }
    };

    async update(id, newData) {
        try {
            const updated = await super.updateById(id, newData)

            return updated;

        } catch (error) {
            return error;
        }
    }

    async deleteAll(){
        try {
            await super.delete()
        } catch (error) {
            throw new Error(error)
        };
    };
    
};

export { FSservice }