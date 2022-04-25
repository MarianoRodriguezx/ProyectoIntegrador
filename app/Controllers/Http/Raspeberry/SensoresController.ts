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

            const data =  await Sensores.aggregate([
                {
                  '$project': {
                    'nombre': 1, 
                    'zonaID': {
                      '$toObjectId': '$zona'
                    }
                  }
                }, {
                  '$lookup': {
                    'from': 'zones', 
                    'localField': 'zonaID', 
                    'foreignField': '_id', 
                    'as': 'zonaSensor'
                  }
                },
                {
                    '$addFields': {
                        'zona': 'zonaSensor.nombre'
                    }
                },
                 {
                  '$project': {
                    'nombre': 1, 
                    'zona': 1
                  }
                }, {
                  '$replaceRoot': {
                    'newRoot': {
                      '$mergeObjects': [
                        {
                          '$arrayElemAt': [
                            '$zonaSensor', 0
                          ]
                        }, '$$ROOT'
                      ]
                    }
                  }
                }, {
                  '$project': {
                    'zona': 1, 
                    'nombre': 1
                  }
                }
              ])

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

