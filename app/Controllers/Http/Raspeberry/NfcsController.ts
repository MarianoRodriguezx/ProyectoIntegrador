import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import nfcs from 'App/Models/ModelsMongoose/nfcs'
//import NFCStoreValidator from 'App/Validators/Raspeberry/NFCStoreValidator'

export default class NfcsController {

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo que devuelve las NFC no asignadas en orden de    |
    |  fecha.                                                  |
    |----------------------------------------------------------|
    */

    public async index({ response }: HttpContextContract)
    {
        try
        {
            const data = await nfcs.aggregate([
                {
                    $sort: {

                        f_reg: -1

                    }
                }
            ])

            response.ok({message: "consulta correcta", data: data})
        }
        catch(error)
        {
            response.internalServerError({message: "ocurrio un error :c"})
        }
    }

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo que inserta la llave registrada de la tarjeta    |
    |  NFC y la fecha en mongo                                 |
    |----------------------------------------------------------|
    */

    public async store({ response, request }: HttpContextContract)
    {
        try
        {
            //const data = request.validate(NFCStoreValidator)
            const data = request.all()

            console.log(data)

            await nfcs.create(data)
            response.ok({message: "NFC guardado correctamente sin asignacion"})
        }
        catch(error)
        {
            response.badRequest({message: "verifica tus datos"})
        }
    }
}
