import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SupportRequest from '../../Models/SupportRequest'
import User from '../../Models/User'
import CreateSupportRequestValidator from 'App/Validators/CreateSupportRequestValidator'
export default class SupportRequestsController {
  public async submitSupportRequest({ request, response }: HttpContextContract) {
    try {
      const payload = request.validate()
      const { first_name, last_name, email, support_message_title, support_message_text, file } =
        request.all()

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
      supportRequest.file = file

      await user.related('supportRequests').create(supportRequest.toJSON())

      response.status(201).json({ message: 'Support request submitted successfully' })
    } catch (error) {
      console.log(error)
      response.badRequest(error.messages)
    }
  }
}
