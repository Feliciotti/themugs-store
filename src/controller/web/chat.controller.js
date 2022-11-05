import { User } from "../../models/index.js";

//--------------------------------------------------

async function renderChat(req, res ) {
    const userId = await req.user.id
    const user = await User.findOne({_id: userId}).lean()

    res.render('chat', { user })
}

export {
    renderChat
}