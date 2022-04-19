import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ArduinoPorts from 'App/Models/ModelsMongoose/ArduinoPorts'

export default class ArduinoPortsController {
  public async index({ response }: HttpContextContract) {

    try{
      const data = await ArduinoPorts.find({})

      response.ok({message: "consulta correcta", data: data})
    }
    catch(error){
      response.internalServerError({message: "Ocurrio un error, ten buen dia", error: error})
    }

  }

  //public async create({}: HttpContextContract) {}

  public async store({ response, request }: HttpContextContract) {
    try{
      const data = request.all()

      var data2: any = []

      for (let i in data){
        data2.push(data[i])
      }

      
      await ArduinoPorts.insertMany(data2)

      response.ok({message: "Se inserto correctamente", data: data})
    }
    catch(error){
      response.badRequest({message: "Ocurrio un error, ten buen dia", error: error})

    }
  }

  public async show({}: HttpContextContract) {}

  //public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
