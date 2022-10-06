const { response } = require("express");
const bcrypt = require('bcryptjs');

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");


const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - correo',
            });
        }
        // Si el usuario está activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - estado: false',
            });
        }
        // Verificar la contraseña
        const validaPassword = bcrypt.compareSync( password, usuario.password );
        if( !validaPassword ){
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - Contraseña',
            });
        }
        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador.',
        });
    }

}

module.exports = {
    login,
}