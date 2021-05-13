import * as userService from "./../services/user.service";

//LOGICA CONTROL

export function register(request, response){
    let usuario = request.body

    userService.register(usuario)
    .then((usuarioGuardado) => {
        response.json(usuarioGuardado)
    }).catch((error) => {
        response.status(error.code).json(error)
    });
}