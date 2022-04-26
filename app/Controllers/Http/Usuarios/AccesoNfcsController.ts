import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AccesoNfc from 'App/Models/AccesoNfc'
import UserNfc from 'App/Models/UserNfc'
import AccesoNfcStoreValidator from 'App/Validators/AccesoNfcStore'

export default class AccesoNfcsController {
    public async index({ response }: HttpContextContract)
    {
        try{
            const an = await AccesoNfc.query().preload('User2')

            response.ok({message: "Consulta correcta", data: an})
        }
        catch(error)
        {
            response.badRequest({message: "Ocurrio un error"})
        }
    }

    public async store({ request, response }: HttpContextContract)
    {
        try{
            //const payload = await request.validate(AccesoNfcStoreValidator)

            const permiso = await UserNfc.findOrFail(request.input('nfc'))

            if(permiso.permiso == false)
            {
                const data = {
                    usuario_id: request.input('usuario_id'),
                    nfc: request.input('nfc'),
                    estado: "DENEGADO"
                }

                await AccesoNfc.create(data)
            }

            else
            {
                const data = {
                    usuario_id: request.input('usuario_id'),
                    nfc: request.input('nfc'),
                    estado: "ENTRADA"
                }

                await AccesoNfc.create(data)
            }

            response.ok({message: "Se inserto Correcto"})

        }
        catch(error)
        {
            response.badRequest({message: "Error en los datos enviados"})
        }
    }

    public async cambiarEstado({ response, params }: HttpContextContract){
        try{
            const estado = await AccesoNfc.findOrFail(params.id)

            if(estado.estado=="ENTRADA")
            {
                estado.estado="SALIDA"
                response.ok({message: "Salida registrada"})
            }

            else
            {
                response.ok({message: "Usuario denegado"})
            }
        }
        catch(error)
        {
            response.badRequest({message: "Error en los datos enviados"})
        }
    }
}
