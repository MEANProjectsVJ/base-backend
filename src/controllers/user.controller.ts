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

export const login = (request, response) => {
    const userLogin = request.body

    userService.login(userLogin)
    .then((result) => {
        response.json(result)
    }).catch((err) => {
        console.log(err)
        response.status(err.code).json(err)
    });

}