import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Zona from 'App/Models/ModelsMongoose/Zona'
import ZonaValidator from 'App/Validators/ZonaValidator'

export default class ZonasController {

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo devuelve todos los datos de la tabla de las      |
    |  zonas que están en mongo.                               |
    |----------------------------------------------------------|
    */


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
        //try{
            //const data = await request.validate
            const data = await request.validate(ZonaValidator)

            await Zona.insertMany({nombre: data.nombre})

            response.ok({message: "Se agregó correctamente"})
        /* }
        catch(error){
            response.internalServerError({message: "Ocurrió un Error"})
        } */
    }

    public async destroy({ params, response }: HttpContextContract){
        try{
            const zona = await Zona.deleteOne({_id: params.id})
            response.ok({message: "Se elimino correctamente", zona})
        }
        catch(error){
            response.internalServerError({message: "Ocurrió un Error"})
        }
    }
}
