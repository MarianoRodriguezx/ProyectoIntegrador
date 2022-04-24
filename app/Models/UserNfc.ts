import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import user from './user'

export default class UserNfc extends BaseModel {
  static select(arg0: string) {
      throw new Error('Method not implemented.')
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  user_id: number

  @column()
  nfc: number

  @column()
  permiso: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> user, {
    foreignKey: 'user_id'
  })
  public User: BelongsTo<typeof user>
}
