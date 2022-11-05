import { messagesDao } from "../controller/db.controller.js";

export default (io) => {
    io.on('connection', async function (socket) {

        const mssgs = await messagesDao.getAll()
        io.emit('server:mssg', mssgs)

        socket.on('client:mssg', async (data) =>{
            await messagesDao.add(data)
            const newMssg = await messagesDao.getAll()
            io.sockets.emit('server:mssg', newMssg)
        })
    })
}