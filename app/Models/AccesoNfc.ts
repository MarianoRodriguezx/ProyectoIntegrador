import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import user from './user'

export default class AccesoNfc extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public usuario_id: number

  @column()
  public nfc: string

  @column()
  public estado: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> user, {
    foreignKey: 'usuario_id'
  })
  public User2: BelongsTo<typeof user>
}
