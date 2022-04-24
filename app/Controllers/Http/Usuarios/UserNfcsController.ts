import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserNfc from 'App/Models/UserNfc'

export default class UserNfcsController {

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo que regresa todas las relaciones de los          |
    |  usuarios con sus tarjetas NFC                           |
    |----------------------------------------------------------|
    */

    public async index({ response }: HttpContextContract){
        try{
            const data = await UserNfc.all()

            response.ok({message: "consulta correcta", data: data})
        }
        catch(error){
            response.internalServerError({message: "ocurrio un error"})
        }
    }

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo que ingresa todas las relaciones de los          |
    |  usuarios con sus tarjetas NFC                           |
    |----------------------------------------------------------|
    */

    public async store({ request, response }: HttpContextContract){
        try{
            await UserNfc.create(request.all())
            response.ok({message: "Insertado correctamente"})
        }
        catch(error){
            response.internalServerError({message: "ocurrio un error"})
        }
    }

    public async update({ response, params }: HttpContextContract){
        try{
            const uNfc = await UserNfc.findOrFail(params.id)

            uNfc.permiso = !uNfc.permiso

            uNfc.save()
             
            response.ok({message: "Actualizado correctamente"})
        }
        catch(error){
            response.internalServerError({message: "ocurrio un error"})
        }
    }

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo que regresa un true o false en base a si tiene   |
    |  permiso de ingreso, ademas regresa los datos de el      |
    |  usuario en base a el NFC enviado                        |
    |----------------------------------------------------------|
    */

    public async VerifyPermisy({ request, response }: HttpContextContract){
        try{
            const nfc = request.input('NFC')
            const dato = await UserNfc.query().preload('User').where('nfc', nfc).select('permiso', 'user_id')

            response.ok({message: "Consulta Correcta", data: dato})
        }
        catch(error){
            response.internalServerError({message: "ocurrio un error"})
        }
    }

    public async destroy({}: HttpContextContract){}

}
