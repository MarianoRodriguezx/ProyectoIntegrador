import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Configuracion from 'App/Models/ModelsMongoose/Configuracion'
//import Configuracion from 'App/Models/ModelsMongoose/Configuracion'

export default class ConfiguracionsController {

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo devuelve 10 registros de los datos de la tabla   |
    |   de los configuraciones que estan registrados en mongo. |
    |                                                          |
    |----------------------------------------------------------|
    */

    public async index({ response }: HttpContextContract)
    {
        //try{
            /* const data = await Configuracion.aggregate(
            [
                {
                    $sort: {
                        Fecha: -1
                    }
                }, 
                {
                    $limit: 10
                }
            ])
 */

            const data = await Configuracion.aggregate([
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
                }, {
                  '$project': {
                    'nombre': 1, 
                    'zonaSensor.name': 1
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
                    'name': 1, 
                    'nombre': 1
                  }
                }
              ])
              
            response.ok({message: "consulta correcta", data: data})
        /*}
        catch(error){
            response.internalServerError({message: "ocurrio un error", error})
        }*/
    }

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo devuelve 50 registros de los datos de la tabla   |
    |   de los configuraciones que estan registrados en mongo. |
    |                                                          |
    |----------------------------------------------------------|
    */

    public async indexExtendido({ response }: HttpContextContract)
    {
        try{
            const data = await Configuracion.aggregate(
            [
                {
                    $sort: {
                        Fecha: -1
                    }
                }, 
                {
                    $limit: 50
                }
            ])

            response.ok({message: "consulta correcta", data: data})
        }
        catch(error){
            response.internalServerError({message: "ocurrio un error", error})
        }
    }

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo que ingresa los registros de sensores en mongo   |
    |                                                          |
    |----------------------------------------------------------|
    */

    public async store({ request, response }: HttpContextContract)
    {
        //try{
            const data = request.all()

            var data2: any = []

            for (let i in data){
                data2.push(data[i])
            }

            await Configuracion.create(data2)

            response.ok({message: "Se insertó correctamente", data: data2})
        /*}
        catch(error){
            response.badRequest({message: "Ocurrió un error"})
        }*/
    }

    /*
    |----------------------------------------------------------|
    |                                                          |
    |  Metodo devuelve 10 registros de los datos de la tabla   |
    |   de los configuraciones que estan registrados en mongo. |
    |   en base a el ID enviado.                               |
    |----------------------------------------------------------|
    */

    public async show ({ params, response }: HttpContextContract)
    {
        try{
            const data = await Configuracion.aggregate(
            [
                {
                    $sort: {
                        Fecha: -1
                    }
                }, 
                {
                    $limit: 10
                },
                {
                    $match: {
                        SensorID: params.id
                    }
                }
            ])

            response.ok({message: "consulta correcta", data: data})
        }
        catch(error){
            response.internalServerError({message: "ocurrio un error", error})
        }
    }
}
