import { productsDao, cartsDao } from '../db.controller.js';

// -------------------------------
async function getCart(req, res) {
    try {
        const carts = await cartsDao.getAll()
        res.status(200).json(carts)
    } catch (error) {
        res.json({error: error.message})
    }
}

async function postCart(req, res) {
    let { _id } = req.body
    const productFound = await productsDao.getById(_id)
    const cart = {}

    try {
        const setCart = obj => {
            const product = {
                id: obj._id,
                title: obj.title,
                price: obj.price,
                quantity: 1
            }

        }

        if(productFound){
            setCart(productFound)
        }

        console.log(cart);
        
        
        res.status(200).redirect('/products')
    } catch (error) {
        res.json({error: error.message})
    }
}

async function postCartProducts(req, res) {
    const { id } = req.params
    const { productId } = req.body

    try {
        const cart = await cartsDao.getById(id)

        const product = await productsDao.getById(productId)

        cart.products =  [...cart.products, product]

        const result = await cartsDao.update(id, cart);
        res.status(201).json(result);

    } catch (error) {
        res.json({error: error.message})
    }
}

async function deleteCart(req, res) {
    const { id } = req.params
    try {
        let cart = await cartsDao.getById(id)
        findCartError(cart)

        const deleted = await cartsDao.delete(id)
        res.send(deleted)
    } catch(error){
        res.json({error: error.message})
    }

}

async function getCartProducts(req, res) {
    const { id } = req.params
    try {
        const cartProducts = await cartsDao.getById(id)

        if(!cartProducts){
            res.status(404).json('cannot found cart')

        }else if(cartProducts.products.length == 0) {
            res.status(200).json('el carrito está vacío')

        } else {
            res.status(200).json(cartProducts.products)
        }

    } catch (error) {
        res.json({error: error.message})
    }
}

async function delCartProducts(req, res) {
    const { id } = req.params
    const { id_prod } = req.params

    try {

        const cart = await cartsDao.getById(id)
        const productsList = cart.products

        if(!cart) throw new Error ('cannot found cart')

        const toDelete = await productsList.findIndex(product => product._id == id_prod)
        if(!toDelete) throw new Error ('cannot found product')
        await productsList.splice(toDelete, 1)

        const result = await cartsDao.update(id, { products: productsList });

        res.status(201).json(result);

    } catch (error) {
        res.json({error: error.message})
    }
}


// -------------------------------
export { 
    getCart,
    postCart,
    deleteCart,
    getCartProducts,
    delCartProducts,
    postCartProducts
}; // to index