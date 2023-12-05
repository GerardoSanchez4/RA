const { response, request } = require("express")
const body = request.body
const Usuarios= require('../models/usuarios.js')

const usuariosGet=(req, res=response) => { // Corrección: usa this.app en lugar de app
    res.json({
        msg:'get API-Controlador'
    })
}
const usuariosPut=(req, res=response) => { // Corrección: usa this.app en lugar de app

    const{nombre,email}=req.body
    res.json({
        msg:'Put API-Controlador',
        nombre,
        email
    })
}
const bcrypt = require('bcryptjs'); // Importa bcryptjs

const usuariosPost = async (req, res = response) => {
    try {
        const { nombre, correo, password, rol } = req.body;

        // Encripta la contraseña
        const salt = bcrypt.genSaltSync(10);
        const passwordEncriptado = bcrypt.hashSync(password, salt);

        // Crea un nuevo usuario con la contraseña encriptada
        const usuario = new Usuarios({
            nombre,
            correo,
            password: passwordEncriptado,
            rol,
            
        });

        // Guarda el usuario en la base de datos
        await usuario.save();

        res.json({
            msg: 'Post API-Controlador',
            usuario,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error interno del servidor',
        });
    }
};


const usuariosDelete=(req, res=response) => { // Corrección: usa this.app en lugar de app
    res.json({
        msg:'Delete API-Controlador'
    })
}
const usuariosPatch=(req, res=response) => { // Corrección: usa this.app en lugar de app
    const{nombre,email}=req.body
    res.json({
        msg:'Patch API-Controlador',
        nombre,
        email
    })
}
module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}