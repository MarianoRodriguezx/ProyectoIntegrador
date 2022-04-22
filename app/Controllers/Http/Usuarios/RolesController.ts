import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import RolStoreValidator from 'App/Validators/RolStoreValidator'

export default class RolesController {

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo que regresa todos los roles en donde el valor    |
    |  de sus status sea Verdadero                             |
    |----------------------------------------------------------|
    */

    public async index({ response }: HttpContextContract){
        try{
            const roles = await Role.query().where('status', 1)

            response.ok({message: "Consulta Correcta", data: roles})
        }
        catch(error){
            response.internalServerError({message: "Ocurrio un Error"})
        }
    }

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo que ingresa los roles en siempre y cuando el     |
    |  validator este cumplido.                                |
    |----------------------------------------------------------|
    */

    public async store({ response, request }: HttpContextContract){
        try{

            const payload = await request.validate(RolStoreValidator)
            await Role.create(payload)
            response.created({message: "Se insertó el dato"})

        }
        catch(error){
            response.badRequest({message: "Verifica los datos enviados"})
        }
    }

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo que elimina el role en donde coincida su id.     |
    |----------------------------------------------------------|
    */

    public async destroy({ params, response }: HttpContextContract){
        try{
            const rol = await Role.findOrFail(params.id)

            rol.delete()
            response.ok({message: "El dato fue eliminado"})
        }
        catch(error){
            response.notFound({message: "El dato no se encontró"})
        }
    }

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo que desactiva el rol, cambiando su status a      |
    |  falso siempre y cuando este activo.                     |
    |----------------------------------------------------------|
    */

    public async desactivar({ params, response }: HttpContextContract){
        try{
            const rol = await Role.findOrFail(params.id)

            if(rol.status == false){
                response.notFound({message: "El dato no se encuentra activo"})
            }

            else{
                const des = false
                rol.status=des
                response.ok({message: "El dato fue desactivado"})
            }
        }
        catch(error){
            response.notFound({message: "El dato no se encontró"})
        }
    }

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo que activa el rol, cambiando su status a         |
    |  verdadero siempre y cuando este desactivado.            |
    |----------------------------------------------------------|
    */

    public async activar({ params, response }: HttpContextContract){
        try{
            const rol = await Role.findOrFail(params.id)

            if(rol.status == false){
                const des = true
                rol.status=des
                response.ok({message: "El dato fue activado"})
            }

            else{
                response.notFound({message: "El dato no se encuentra desactivado"})
            }
        }
        catch(error){
            response.notFound({message: "El dato no se encontró"})
        }
    }
}
