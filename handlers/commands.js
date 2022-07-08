const fs = require('fs');

module.exports = (bot, reload) => {
	const {client} = bot; 

	fs.readdirSync('./commands/').forEach((c) => {
		if (reload)
			delete require.cache[require.resolve(`../commands/${c}`)];
		const command = require(`../commands/${c}`);
		client.commands.set(command.name, command);
	});
	console.log(`Carregados ${client.commands.size} comandos`);
};