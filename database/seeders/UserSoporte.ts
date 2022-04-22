import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import user from 'App/Models/user'
import { datos } from '../../data/usuarios/userStatic'

export default class UserSoporteSeeder extends BaseSeeder {
  public async run () {
    await user.create(datos())
  }
}
