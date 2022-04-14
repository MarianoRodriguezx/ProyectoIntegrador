import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import user from './user'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public rol: string

  @column()
  public valor: number

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=> user, {
    foreignKey: 'role_id',
    localKey: 'id'
  })
  public Rol: HasMany<typeof user>
}
