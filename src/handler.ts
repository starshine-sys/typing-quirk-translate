/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { verifyKey } from 'discord-interactions'

import {
  InteractionType,
  MessageFlags,
  InteractionResponseType,
  APIApplicationCommandInteraction,
  APIMessageApplicationCommandInteractionDataResolved,
  APIInteractionResponse,
} from 'discord-api-types/v9'
import { APIPingInteraction } from 'discord-api-types/payloads/v9/_interactions/ping'

// import translators
import { handleSlash } from './handleSlash'
import { translateEnder } from './ender'
import { translateWingdings } from './wingdings'

export async function handleRequest(request: Request): Promise<Response> {
  if (
    !request.headers.get('X-Signature-Ed25519') ||
    !request.headers.get('X-Signature-Timestamp')
  )
    return Response.redirect('https://starshines.xyz')

  const valid = verifyKey(
    await request.clone().arrayBuffer(),
    request.headers.get('X-Signature-Ed25519')!,
    request.headers.get('X-Signature-Timestamp')!,
    publicKey,
  )
  if (!valid) return new Response('', { status: 401 })

  const interaction = (await request.json()) as
    | APIPingInteraction
    | APIApplicationCommandInteraction

  if (interaction.type === InteractionType.Ping)
    return respond({
      type: InteractionResponseType.Pong,
    })

  if (!interaction.data.resolved) return handleSlash(interaction)

  const data = interaction.data
    .resolved as APIMessageApplicationCommandInteractionDataResolved

  const msg = Object.values(data.messages)[0]

  if (!msg.content)
    return respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: "That message has no content, so you can't translate it.",
        flags: MessageFlags.Ephemeral,
      },
    })

  let s: string
  if (interaction.data.name.toLowerCase().includes('ender')) {
    s = translateEnder(msg.content)
  } else if (interaction.data.name.toLowerCase().includes('wingdings')) {
    s = translateWingdings(msg.content)
  } else {
    s = `Sorry, but "${interaction.data.name}" isn't a valid command. You're not supposed to see this, so please report this as a bug, over at https://github.com/starshine-sys/typing-quirk-translate.`
  }

  return respond({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: s,
      flags: MessageFlags.Ephemeral,
      allowed_mentions: { parse: [] },
    },
  })
}

const respond = (response: APIInteractionResponse) =>
  new Response(JSON.stringify(response), {
    headers: { 'content-type': 'application/json' },
  })
