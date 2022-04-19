import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserNfc from 'App/Models/UserNfc'

export default class UserNfcsController {
    public async index({ response }: HttpContextContract){
        try{
            const data = await UserNfc.all()

            response.ok({message: "consulta correcta", data: data})
        }
        catch(error){
            response.internalServerError({message: "ocurrio un error"})
        }
    }

    public async store({ request, response }: HttpContextContract){
        try{
            await UserNfc.create(request.all())
            response.ok({message: "Insertado correctamente"})
        }
        catch(error){
            response.internalServerError({message: "ocurrio un error"})
        }
    }

    public async update({}: HttpContextContract){}

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
