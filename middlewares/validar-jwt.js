const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req, res = response, next) => {

    const token = req.header('sia-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la petición.'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        //Verificar si el usaurio está activo
        if( !usuario ){
            return res.status(401).json({
                msg: 'Token no valido. - UNEB'
            });
        }

        //Verificar si el usaurio está activo
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no valido. - UEF'
            });
        }

        req.usuario = usuario;

        next();
        
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no valido.'
        });
    }    

}

module.exports = {
    validarJWT,
}