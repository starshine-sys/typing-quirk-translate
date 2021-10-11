import {
  MessageFlags,
  InteractionResponseType,
  APIApplicationCommandInteraction,
  APIInteractionResponse,
} from 'discord-api-types/v9'

export async function handleSlash(
  interaction: APIApplicationCommandInteraction,
): Promise<Response> {
  if (interaction.data.name !== 'translate')
    return respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content:
          'Click here to add the translate commands to your server: https://discord.com/api/oauth2/authorize?client_id=897201270534852638&scope=applications.commands\n\nCheck out the source, and report bugs, at <https://github.com/starshine-sys/typing-quirk-translate>',
        flags: MessageFlags.Ephemeral,
      },
    })

  // should never reach this (for now), this is just for a future command
  return new Response()
}

const respond = (response: APIInteractionResponse) =>
  new Response(JSON.stringify(response), {
    headers: { 'content-type': 'application/json' },
  })
