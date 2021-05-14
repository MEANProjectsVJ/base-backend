import Validator from "validatorjs";

//Esta función está pensada para ejecutarse dentro de una PROMESA.
export const validarObjeto = function(objeto, reglas, funcionRechazo){
    //Validator.useLang('es');

    let validador = new Validator(objeto, reglas);

    if (validador.fails()) {
        funcionRechazo({
            code: 400,
            message: "The data you're trying to introduce is incorrect!"
        })
        return false;
    }
    return true;
}