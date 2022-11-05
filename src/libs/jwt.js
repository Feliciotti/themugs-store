import jwt from 'jsonwebtoken'

function generateToken(user) {
    const token = jwt.sign({id: user}, process.env.SECRET_JWT, {
        expiresIn: '1h'
    });

    return token;
};

export { generateToken }