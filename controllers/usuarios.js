const { response } = require('express');

const usuariosGet = (req, res = response) => {

    const { q, nombre, apikey, page = 1, limit = 10 } = req.query;

    res.json({
        ok: true,
        msj: "GET Api - Controlador",
        q, nombre, apikey, page, limit
    })
};

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        ok: true,
        msj: "POST Api - Controlador",
        nombre,
        edad,
    })
};

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        ok: true,
        msj: "PUT Api - Controlador",
        id,
    })
};

const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        msj: "DELETE Api - Controlador"
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