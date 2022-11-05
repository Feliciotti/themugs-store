import { productsDao } from '../db.controller.js';

// -------------------------------

async function getProduct(req, res) {
    const product = await productsDao.getAll()
    res.status(200).render('shopProducts', { product })
}

async function postProduct(req, res) {
    const { title, price, thumbnail, desc, stock } = req.body
    try {
        if (!title|| !price || !thumbnail || !desc || !stock) throw new Error('Completar todos los campos')
        let added = await productsDao.add({ title, price, thumbnail, desc, stock })
    
        res.status(201).send(`Agregado: ${added}`)

    } catch (error){
        res.json({error: error.message})
    }
}

async function putProduct(req, res){
    const { id } = req.params
    const {title, price, thumbnail, desc, stock} = req.body
    try {
        let productToUpdate = await productsDao.getById(id)
        if (!productToUpdate) throw new Error('cannot find product')

        const updated = await productsDao.update(id, {title, price, thumbnail, desc, stock})
        res.status(200).json(updated)

    } catch (error){
        res.json({error: error.message})
    }

}

async function delProduct(req, res){
    const {id} = req.params
    try {
        let productToDelete = await productsDao.getById(id)
        if(!productToDelete) throw new Error('cannot find product')
    
        const deleted = await productsDao.delete(id)
    
        res.send(deleted)

    } catch (error){
        res.json({error: error.message})
    }
}

async function getById(req, res){
    const { id } = req.params
    try {
        let product = await productsDao.getById(id)
        if(!product) throw new Error('cannot find product')
    
        res.status(200).send(product)

    } catch (error){
        res.json({error: error.message})
    }

}

// -------------------------------
export {
    getProduct,
    postProduct,
    putProduct,
    delProduct,
    getById
} // to index