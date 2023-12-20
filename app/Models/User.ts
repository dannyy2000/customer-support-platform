import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import SupportRequest from './SupportRequest'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: Number

  @column()
  public email: String

  @column()
  public full_name: String

  @hasMany(() => SupportRequest, { foreignKey: 'user_id' })
  public supportRequests: HasMany<typeof SupportRequest>
}
