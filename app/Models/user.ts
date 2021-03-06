import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import UserNfc from './UserNfc'
import AccesoNfc from './AccesoNfc'

export default class user extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public rol_id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: user) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @belongsTo(()=> Role, {
    foreignKey: 'rol_id'
  })
  public Rol: BelongsTo<typeof Role>

  @hasMany(()=> UserNfc, {
    foreignKey: 'user_id',
    localKey: 'id'
  })
  public User: HasMany<typeof UserNfc>

  @hasMany(()=> AccesoNfc, {
    foreignKey: 'usuario_id',
    localKey: 'id'
  })
  public User2: HasMany<typeof AccesoNfc>
}
