import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import SupportRequest from '../Models/SupportRequest'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: Number

  @column()
  public email: String

  @column()
  public fullname: String

  @hasMany(() => SupportRequest)
  public supportRequests: HasMany<typeof SupportRequest>
}
