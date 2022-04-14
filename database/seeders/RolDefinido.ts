import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import { datos } from '../../data/roles/rolData'


export default class RolDefinidoSeeder extends BaseSeeder {
  public async run () {
    await Role.create(datos())
  }
}
