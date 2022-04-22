import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Configuracion from 'App/Models/ModelsMongoose/Configuracion'
//import Configuracion from 'App/Models/ModelsMongoose/Configuracion'

export default class ConfiguracionsController {
    public async index({ response }: HttpContextContract)
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
                }
            ])

            response.ok({message: "consulta correcta", data: data})
        }
        catch(error){
            response.internalServerError({message: "ocurrio un error", error})
        }
    }

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

    public async store({ request, response }: HttpContextContract)
    {
        try{
            const data = request.all()

            var data2: any = []

            for (let i in data){
                data2.push(data[i])
            }

            await Configuracion.create(data2)

            response.ok({message: "Se insertó correctamente", data: data2})
        }
        catch(error){
            response.badRequest({message: "Ocurrió un error"})
        }
    }

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
