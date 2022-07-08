const { getFiles } = require('../util/getfiles');

module.exports = (bot, reload) => {
	const {client} = bot;

	let events = getFiles('./events/', '.js');

	if (events.legnth === 0){
		console.log('Sem eventos para carregar');
	}

	events.forEach((f, i) => {
		if (reload) 
			delete require.cache[require.resolve(`../events/${f}`)];
		const event = require(`../events/${f}`);
		client.events.set(event.name, event);

		if (!reload)
			console.log(`${i + 1}. ${f} carregado`);
	});

	if (!reload)
		initEvents(bot);
};

function triggerEventHandler(bot, event, ...args){
	const {client} = bot; 

	try {
		if (client.events.has(event))
			client.events.get(event).run(bot, ...args);
		else 
			throw new Error(`Evento ${event} nao existe`);
	}
	catch(err){
		console.error(err);
	}
}

function initEvents(bot) {
	const {client} = bot; 

	client.on('ready', () => {
		triggerEventHandler(bot, 'ready');
	});

	client.on('messageCreate', (message) => {
		triggerEventHandler(bot, 'messageCreate', message);
	});
}