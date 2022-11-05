import { User, Role } from '../../models/index.js';
import { transporter, generateToken } from '../../libs/index.js';

// -------------------------------
let adminemail = process.env.NODEMAILER
let port = process.env.PORT

async function logupForm (req, res){
    await res.render('logup')
}

async function logup (req, res){
    const { name, lastname, email, password,
    passwordConfirm, age, address, phoneNumber, role } = req.body

    try {
        const emailUser = await User.findOne({email: email})

        let errors = []

        if (passwordConfirm !== password){
            errors.push({error: 'las contraseñas no coinciden'}),
            // console.log('las contraseñas no coinciden'),
            res.render('logup', { errors, name, lastname, email, password, age, address, phoneNumber })

        }else if(emailUser){
            errors.push({error: 'email ya registrado'}),
            // console.log('email ya registrado'),
            res.render('logup', { errors, name, lastname, email, password, age, address, phoneNumber })

        } else {
            //creating new user
            const newUser = new User({
                name,
                lastname,
                email,
                password,
                //path to img storage --src/public--
                img: req.file.path,
                age,
                address,
                phoneNumber,
                token: generateToken()
            })
    
            newUser.password = await newUser.encryptPassword(password)
    
            if (role){
                //searchs the role claimed by the new user and assigns to it
                const getRole = await Role.find({name: {$in: role} })
                newUser.role = getRole.map(role => role._id)
            } else {
                //if the new user doesn't claims a role, gets 'user' role by default
                const role = await Role.findOne({name: 'user'})
                newUser.role = [role._id]
            }
            
             // Saving user in mongodb
            await newUser.save()
            // console.log(newUser.email);
                try {
                    //mail for user to activate account
                    transporter.sendMail({
                        from: `'ecommerce', <${adminemail}>`,
                        to: newUser.email,
                        subject: 'Bienvenido a tienda ecommerce',
                        html: `
                            <h1>Activación de tu cuenta</h1>
                            <p>Para activar tu cuenta haz click
                                <a href='http://localhost:${port}/activate-account/${newUser.token}'>
                                    aquí
                                </a>
                            </p>
                        `
                    });

                     //mail for admin with the new user data
                    transporter.sendMail({
                        from: `'ecommerce', <${adminemail}>`,
                        to: adminemail,
                        subject: 'New user registered',
                        html: `
                            <h1>New user information</h1>
                            <ul>
                                <li>Name: ${name}</li>
                                <li>e-mail: ${email}</li>
                                <li>Phone number: ${phoneNumber}</li>
                                <li>Address: ${address}</li>
                                <li>Age: ${age}</li>
                                <li>Registed at: ${Date().toLocaleString()}</li>
                            </ul>
                        `
                    });
                    // console.log('sended');
                
                }catch(error){
                    console.log(error);
                }
            
                res.status(200).redirect('login')
        }

    } catch(error){
        res.json({error: error.message})
    }
}

//account validation
async function tokenConfirm(req, res) {
    const { token } = req.params

    try{
        const user = await User.findOne({token: token})

        if(!user) throw new Error('Invalid token'), res.status(404)

        user.tokenConfirm = true
        user.token = null

        await user.save()

        res.status(200).json('account activated')
    }catch (error) {
        res.json(error)
    }

};

// -------------------------------

export {
    tokenConfirm,
    logupForm,
    logup
}; // to index