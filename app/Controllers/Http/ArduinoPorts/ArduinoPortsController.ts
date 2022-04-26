import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ArduinoPorts from 'App/Models/ModelsMongoose/ArduinoPorts'

export default class ArduinoPortsController {

  /*
  |----------------------------------------------------------|
  |                                                          |
  |  Metodo devuelve todos los datos de la tabla de los      |
  |  puertos que estan en mongo.                             |
  |----------------------------------------------------------|
  */

  public async index({ response }: HttpContextContract) {

    try{
      const data = await ArduinoPorts.find({})

      response.ok({message: "consulta correcta", data: data})
    }
    catch(error){
      response.internalServerError({message: "Ocurrio un error, ten buen dia", error: error})
    }

  }

  /*
  |----------------------------------------------------------|
  |                                                          |
  |  Metodo para ingresar datos en la tabla de los puertos   |
  |  que estan en mongo en base a un arreglo que recibimos.  |
  |----------------------------------------------------------|
  */

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

  /*
  |----------------------------------------------------------|
  |                                                          |
  |  Metodo que cambia el campo "Usado" a true para indicar  |
  |  que este puerto esta ocupado.                           |
  |----------------------------------------------------------|
  */

  public async update({ response, params, request }: HttpContextContract) {
    try{
      const puerto = params.id
      
      await ArduinoPorts.updateMany({board: puerto}, {$set: {Usado: request.input('Usado')}})
      
    }
    catch(error){
      response.internalServerError({message: "Ocurrio un error, ten buen dia", error: error})
    }
  }

  public async destroy({}: HttpContextContract) {}
}
