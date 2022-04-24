import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import nfcs from 'App/Models/ModelsMongoose/nfcs'
import UserNfc from 'App/Models/UserNfc'
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

            const llave = request.input('llave')

            const nfc = await nfcs.find({llave: llave}).count()

            const query = await Database.rawQuery("SELECT COUNT(nfc) as cuenta FROM `user_nfcs` WHERE nfc = ?", [llave])

            const nfc_mysql = query[0]
            const nfc_mysql2 = nfc_mysql[0]
            const nfc_mysql3 = nfc_mysql2["cuenta"]

            if(nfc == 0 && nfc_mysql3==0)
            {
                await nfcs.create(request.all())  
                response.created({caso: 1, descripcion: "La tarjeta NFC no existe en la bd, dato insertado"}) 
            }

            else if( nfc > 0 && nfc_mysql3==0)
            {
                
                response.ok({caso: 2, descripcion: "Existe en la tabla de raritos (TABLA DE NFC NO REGISTRADOS)"})
                

            }

            else if( nfc_mysql3 > 0 && nfc == 0 )
            {
                const permiso = await UserNfc.query().select('permiso').where('nfc', llave)
                const permiso2 = permiso[0]
                const permisoF = permiso2["permiso"]

                //return permisoF

                if(permisoF == true)
                {
                    const dato = await UserNfc.query().preload('User').where('nfc', llave).select('permiso', 'user_id')
                    response.ok({caso: 3,descripcion: "Esta en la tabla de usuarios y tiene permiso", data: dato})
                }
                else
                {
                    response.ok({caso: 4, descripcion: "Igual que el tres pero es un asesino por eso no tiene permiso"})
                }
            }

            else
            {
                response.conflict({message: "el dato esta en las dos tablas"})
            }

            

            //const data = request.validate(NFCStoreValidator)
            //const data = request.all()

            //console.log(data)

            //await nfcs.create(data)
            //response.ok({message: "NFC guardado correctamente sin asignacion"})
        }
        catch(error)
        {
            response.badRequest({message: "verifica tus datos"})
        }
    }

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Este comentario es una prueba de git pull               |
    |----------------------------------------------------------|
    */
}
