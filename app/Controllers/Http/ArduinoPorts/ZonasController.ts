import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Zona from 'App/Models/ModelsMongoose/Zona'

export default class ZonasController {

<<<<<<< HEAD
  /*
  |----------------------------------------------------------|
  |                                                          |
  |  Método devuelve todos los datos de la tabla de las      |
  |  zonas que están en mongo.                               |
  |----------------------------------------------------------|
  */
=======
    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo devuelve todos los datos de la tabla de las      |
    |  zonas que están en mongo.                               |
    |----------------------------------------------------------|
    */
>>>>>>> 0c87653469299cebb133ce981c1fa2f24b9c365b

    public async index({ response }: HttpContextContract){
        try{
            const data = await Zona.find({})

            response.ok({message: "consulta correcta", data: data})
        }
        catch(error){
            response.internalServerError({message: "Ocurrió un error, ten buen dia", error: error})
        }
    }

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Método que agrega una zona a Mongo.                     |
    |----------------------------------------------------------|
    */

    public async store({ response, request }: HttpContextContract){
        try{
            const nombre = request.input('nombre')

            await Zona.insertMany({name: nombre})

            response.ok({message: "Se agregó correctamente"})
        }
        catch(error){
            response.internalServerError({message: "Ocurrió un Error"})
        }
    }

    public async destroy({ }: HttpContextContract){}
}
