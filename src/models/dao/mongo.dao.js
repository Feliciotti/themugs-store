import { ObjectId } from 'mongodb'
import { MongoDB } from '../../db/index.js'

class MongoDao extends MongoDB {
    constructor(e){
        super(e)
    }

    async getAll() {
        try {
            const array = await this.collection.find().toArray()
            return array

        } catch (error) {

            throw new Error(error)        
        }
    }

    async save(e){
        try {
            await this.collection.insertOne(e)

        } catch (error) {
            throw new Error(error)
        }
    }

    async getById(id){
        try {
            const e = await this.collection.findOne({_id: ObjectId(id)})
            return e

        } catch (error) {
            return error
        }
    }

    async updateById(id, newData){
        try {
            Object.keys(newData).forEach(key => {

                if (newData[key] === undefined) {

                    delete newData[key];

                }
            
            });

            await this.collection.findOneAndUpdate({_id:ObjectId(id)}, {$set: newData});

        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteById(id){
        try {

            await this.collection.deleteOne({_id: ObjectId(id)})
            
        } catch (error) {
            throw new Error(error)
        }
    }
};

export { MongoDao }