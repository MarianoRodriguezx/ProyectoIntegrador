import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ArduinoPorts from 'App/Models/ModelsMongoose/ArduinoPorts'
import { datos } from '../../data/roles/pines'


export default class PortSeederSeeder extends BaseSeeder {
  public async run () {
    await ArduinoPorts.insertMany(datos())
  }
}
