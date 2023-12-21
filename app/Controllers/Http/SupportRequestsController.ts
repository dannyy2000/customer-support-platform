import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SupportRequest from '../../Models/SupportRequest'
import User from '../../Models/User'
import CreateSupportRequestValidator from 'App/Validators/CreateSupportRequestValidator'
import Application from '@ioc:Adonis/Core/Application'
export default class SupportRequestsController {
  public async submitSupportRequest({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateSupportRequestValidator)
      const { first_name, last_name, email, support_message_title, support_message_text, file } =
        payload

      let user = await User.firstOrCreate(
        { email: email },
        { full_name: `${first_name} ${last_name}` }
      )

      const supportRequest = new SupportRequest()
      supportRequest.first_name = first_name
      supportRequest.last_name = last_name
      supportRequest.email = email
      supportRequest.support_message_title = support_message_title
      supportRequest.support_message_text = support_message_text

      if (!file?.isValid) {
        return file?.errors
      }

      await file.move(Application.tmpPath('uploads'), {
        overwrite: true,
      })

      supportRequest.file = file.fileName || ''

      await user.related('supportRequests').create(supportRequest.toJSON())

      response.status(201).json({ message: 'Support request submitted successfully' })
    } catch (error) {
      console.log(error)
      response.badRequest(error.messages)
    }
  }
}
