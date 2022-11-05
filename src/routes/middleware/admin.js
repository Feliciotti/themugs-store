const isAdmin = async (req, res, next) => {

    const user = req.user

    const usertomap = []
    usertomap.push(user)

    usertomap.role = usertomap.map(role => role.name)

    // console.log(user.role);
    
    if(usertomap.role != 'admin') return res.json({message: 'Regresa a la forma humilde que mereces!'})

    next()
}

export { isAdmin };