const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db_validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', [
    check('limit', 'El Limite debe ser un número entero').not().isNumeric(),
    check('desde', 'El Desde debe ser un número entero').not().isNumeric(),
    check('hasta', 'El Hasta debe ser un número entero').not().isNumeric(),
], usuariosGet);
router.put('/:id',[
    check('id', 'No es un mongo ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos,
], usuariosPut);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 8 letras').isLength({ min: 8, }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRoleValido ),
    validarCampos,
],usuariosPost);
router.delete('/:id', [
    check('id', 'No es un mongo ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos,
], usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;