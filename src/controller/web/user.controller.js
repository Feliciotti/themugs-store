import { User } from "../../models/index.js";

// -------------------------------
async function getUser(req, res){
    const user = await req.user.name
    res.render('home', { user })
}

async function getProfile(req, res) {
    const userId = await req.user.id
    const user = await User.findOne({_id: userId}).lean()

    res.render('profile', { user })
}

// -------------------------------

export {
    getUser,
    getProfile
} //to index