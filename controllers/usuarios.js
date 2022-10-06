const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

const usuariosGet = async (req, res = response) => {

    const { limit = 10, desde = 0, hasta = 0 } = req.query;
    const query = { estado: true, }

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limit)),
    ]);

    res.json({
        total,
        usuarios,
    })
};

const usuariosPost = async (req, res = response) => { // Creacion de usuario

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar en la base de datos
    await usuario.save();

    res.json({
        usuario,
    });
};

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos
    if( password ){
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario   = await Usuario.findByIdAndUpdate( id, resto, {new: true} );

    res.json({
        usuario  
    })
};

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario =  await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json({
        usuario
    })
};

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msj: "PATCH Api - Controlador"
    })
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}