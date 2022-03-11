const jwt = require('jsonwebtoken')

const verificarToken = (req, res, next) => {
    const token = req.header('auth-token-jwt')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.SECRET_JWT)
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

module.exports = verificarToken;