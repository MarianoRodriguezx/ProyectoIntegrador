import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import user from 'App/Models/user'
import UserRegisterValidator from 'App/Validators/UserRegisterValidator'

export default class AuthController {
    public async registro({ request, response }: HttpContextContract){
        try{
            const payload = await request.validate(UserRegisterValidator)

            await user.create(payload)
            response.created({message: "Se creo el usuario correctamente"})
        }
        catch(error){
            response.badRequest({message: "Verifica los datos enviados"})
        }
    }

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

    public async userData({ auth, response }: HttpContextContract){
        try{
            response.ok({message: "consulta correcta", data: auth.user})
        }
        catch(error){
            response.badRequest({message: "ocurrio un error"})
        }
    }
}
