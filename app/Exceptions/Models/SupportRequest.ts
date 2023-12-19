import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from '../Models/User'

export default class SupportRequest extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public email: string

  @column()
  public support_message_title: string

  @column()
  public support_message_text: string

  @column()
  public file: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
