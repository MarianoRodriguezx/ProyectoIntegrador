import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import RolStoreValidator from 'App/Validators/RolStoreValidator'

export default class RolesController {

    public async index({ response }: HttpContextContract){
        try{
            const roles = await Role.query().where('status', 1)

            response.ok({message: "Consulta Correcta", data: roles})
        }
        catch(error){
            response.internalServerError({message: "Ocurrio un Error"})
        }
    }

    public async store({ response, request }){
        try{

            const payload = await request.validate(RolStoreValidator)
            await Role.create(payload)
            response.created({message: "Se inserto el dato"})

        }
        catch(error){
            response.badRequest({message: "Verifica los datos enviados"})
        }
    }

    public async destroy({ params, response }){
        try{
            const rol = await Role.findOrFail(params.id)

            rol.delete()
            response.ok({message: "El dato fue eliminado"})
        }
        catch(error){
            response.notFound({message: "El dato no se encontro"})
        }
    }

    public async desactivar({ params, response }){
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
            response.notFound({message: "El dato no se encontro"})
        }
    }

    public async activar({ params, response }){
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
            response.notFound({message: "El dato no se encontro"})
        }
    }
}
