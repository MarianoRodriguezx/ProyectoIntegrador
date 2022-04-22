import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import user from 'App/Models/user'
import UserRegisterValidator from 'App/Validators/UserRegisterValidator'

export default class AuthController {

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo para el registro de los usuarios en base a       |
    |  reglas de validacion.                                   |
    |----------------------------------------------------------|
    */

    public async registro({ request, response, auth }: HttpContextContract){
        try{
            const payload = await request.validate(UserRegisterValidator)

            const d = await user.create(payload)

            const token = await auth.use('api').attempt(d.email, payload.password)

            response.created({message: "Se creo el usuario correctamente", token: token})
        }
        catch(error){
            response.badRequest({message: "Verifica los datos enviados"})
        }
    }

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo para el logueo de los usuarios.                  |
    |----------------------------------------------------------|
    */

    public async login({ request, response, auth }: HttpContextContract){
        try{
            const email = request.input('email')
            const password = request.input('password')

            const token = await auth.use('api').attempt(email, password)
            response.ok({message: "Se inicio correctamente", token: token})

        }
        catch(error){
            response.badRequest('Invalid credentials')
        }
    }

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo para el logout de los usuarios.                  |
    |----------------------------------------------------------|
    */

    public async logout({ auth, response }: HttpContextContract){
        try{

            await auth.use('api').revoke()
            return {
                revoked: true
            }
        }
        catch(error){
            response.internalServerError({message: "Ocurrio un error"})
        }
    }

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo que regresa los datos de determinado usuario     |
    |  en base a el token recibido.                            |
    |----------------------------------------------------------|
    */

    public async userData({ auth, response }: HttpContextContract){
        try{
            response.ok({message: "consulta correcta", data: auth.user})
        }
        catch(error){
            response.badRequest({message: "ocurrio un error"})
        }
    }

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo que regresa los datos de todos los usuarios      |
    |                                                          |
    |----------------------------------------------------------|
    */

    public async usersData ({ response }: HttpContextContract){
        try{
            const users = await user.query().preload('Rol')

            response.ok({message: "Consulta Correcta", data: users})
        }
        catch(error){
            response.internalServerError({message: "Ocurrio un Error"})
        }
    }
}
