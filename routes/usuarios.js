const { Router }    = require('express');
const { check }     = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db_validators');

const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares')

const router = Router();

router.get('/', [
    validarJWT,
    validarCampos,
],usuariosGet);

router.put('/:id',[
    check('id', 'No es un mongo ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos,
], usuariosPut);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 8 letras').isLength({ min: 8, }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRoleValido ),
    validarCampos,
],usuariosPost);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un mongo ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos,
], usuariosDelete);

router.patch('/', [
    validarJWT,
], usuariosPatch);

module.exports = router;