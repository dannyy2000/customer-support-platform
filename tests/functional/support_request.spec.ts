import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
// import SupportRequestsController from 'App/Controllers/Http/SupportRequestsController'
import { file } from '@ioc:Adonis/Core/Helpers'
import Drive from '@ioc:Adonis/Core/Drive'

test.group('Support request', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction('mysql')
    return () => Database.rollbackGlobalTransaction('mysql')
  })
  // Write your test here
  test('submit request', async ({ client, assert }) => {
    const fakeDrive = Drive.fake()

    const fakeAttachment = await file.generatePng('1mb')
    console.log('fake ', fakeAttachment)
    const response = await client
      .post('/submit_request')
      .field('first_name', 'Dan')
      .field('last_name', 'Tomiwa')
      .field('email', 'Dan@example.com')
      .field('support_message_title', 'Issue Title')
      .field('support_message_text', 'Description of the issue')
      .file('file', fakeAttachment.contents, { filename: fakeAttachment.name })

    response.assertStatus(201)
    assert.isTrue(await fakeDrive.exists(fakeAttachment.name))
    console.log(response.text())
  })
})
