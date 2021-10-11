# Typing quirk translator

This is a simple bot to translate typing quirks to plain English, using [message commands](https://discord.com/developers/docs/interactions/application-commands#message-commands) and [Cloudflare Workers](https://workers.cloudflare.com/)!

Some of the code here is based on the [Activities](https://github.com/advaith1/activities/) bot.

To add it to your server, use this link: https://discord.com/api/oauth2/authorize?client_id=897201270534852638&scope=applications.commands  
It won't show up in the member list, which is normal! It'll still work.

## Privacy

This bot cannot read any messages except those on which the translate commands are used. No message data is ever stored.

## Running it yourself

Publish the source like you would any other worker, then sync the commands in `commands.json` to Discord however you like (a script is recommended, though something like Postman works just fine as well)

## License

Licensed under the BSD license. For more info, see LICENSE in the root directory.
