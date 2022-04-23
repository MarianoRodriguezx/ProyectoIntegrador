import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sensores from 'App/Models/ModelsMongoose/Sensores'
import SensoresStoreValidator from 'App/Validators/Raspeberry/SensoresStoreValidator'

export default class SensoresController {

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo devuelve todos los datos de la tabla de los      |
    |  sensores que estan registrados en mongo.                |
    |----------------------------------------------------------|
    */

    public async index({ response }:HttpContextContract)
    {
        try{

            const data =  await Sensores.find({})

            response.ok({message: "consulta correcta", data: data})
        }
        catch(error){
            response.internalServerError({message: "ocurrio un error"})
        }
    }

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo que ingresa los datos a la tabla de los          |
    |  sensores en mongo.                                      |
    |----------------------------------------------------------|
    */

    public async store({ response, request }: HttpContextContract)
    {
        try{
            console.log(request.all())
            const data = await request.validate(SensoresStoreValidator)

            await Sensores.create(data)

            response.ok({message: "Se inserto correctamente"})
        }
        catch(error){
            response.badRequest({message: "error en los datos enviados"})
        }
    }

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo que elimina el sensor de la tabla en base        |
    |  a su id                                                 |
    |----------------------------------------------------------|
    */

    public async destroy({ params, response }: HttpContextContract){
        try{
            
            await Sensores.deleteOne({_id: params.id})
            response.ok({message: "El dato fue eliminado"})
        }
        catch(error){
            response.notFound({message: "El dato no se encontró"})
        }
    }

        /*
    |----------------------------------------------------------|
    |                                                          |
    |  Este comentario es una prueba de git pull               |
    |----------------------------------------------------------|
    */
}

