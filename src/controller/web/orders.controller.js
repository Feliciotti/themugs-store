import { cartsDao, ordersDao } from '../db.controller.js';
import { transporter, client } from '../../libs/index.js';

async function postOrder(req, res){
    try {
        const { cart_id } = req.body
        const buyer = await req.user.email
        const buyerCart = await cartsDao.getById(cart_id)

        let buyerSelection = buyerCart.products.map(e => e.title)
        let status = 'generated'
        let allOrders = await ordersDao.getAll()

        const order_number = allOrders.length + 1

        const newOrder = {
            from: buyer,
            order_number: order_number,
            order: buyerSelection,
            at: Date().toLocaleString(),
            status: status
        }

        await ordersDao.add(newOrder)
            try {
                transporter.sendMail({
                    from: `'ecommerce', <${process.env.NODEMAILER}>`,
                    to: process.env.NODEMAILER,
                    subject: 'New order',
                    html: `
                        <h1>New order generated</h1>
                        <ul>
                            <li>From: ${buyer}</li>
                            <li>Purchased items: ${buyerSelection}</li>
                            <li>At: ${newOrder.at} </li>
                            <li>Phone number: ${req.user.phoneNumber}</li>
                            <li>Send to address: ${req.user.address}</li>
                        </ul>
                    `
                });
                console.log('sended');

                client.messages 
                    .create({ 
                        body: 'orden generada', 
                        from: 'whatsapp:+14155238886',       
                        to: `whatsapp:${req.user.phoneNumber}` 
                    }) 
                    .then(message => console.log(message.sid)) 
                    .done();
            
            }catch(error){
                console.log(error);
            }
 
        res.status(200).json('Orden generada')

    } catch (error) {
        res.json(error)
    }
};

async function getOrder (req, res) {
    try{
        const allOrders = await ordersDao.getAll()
        let userPurchases = await allOrders.filter(e => e.from == req.user.email)

        res.status(200).json(userPurchases)


    } catch (error){
        return error
    }
};

export {
    getOrder,
    postOrder
}