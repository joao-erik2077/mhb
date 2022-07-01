const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client({
	intents: [
		'GUILDS',
		'GUILD_MESSAGES',
	],
});

client.on('ready', () => {
	console.log(`Logado como ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
	if (!message.author.bot) {
		message.reply('Bot funcionando!');
	}
});

// eslint-disable-next-line no-undef
client.login(process.env.TOKEN);