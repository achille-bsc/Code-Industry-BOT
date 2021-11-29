const commandeFormat = 'membercount';

module.exports.check = (args) => {
	return commandeFormat.split(' ')[0] == args[0];
};

/**
 *
 * @param {Discord.Message} msg
 */
module.exports.action = (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
		// executer le code
		if (msg.author.id !== '688098375697956905') return;
		let str = '';
		let serv = 0;
		msg.client.guilds.cache.map(guildss => {
			serv = serv + 1,
			str += 'Nom: **' + guildss.name + '**, Membres: **' + guildss.memberCount + '** ID: `' + guildss.id + '`\n';
		},
		);
		msg.reply('\n' + str + `\n\n__Je suis actuellement sur ** ${serv}** serveurs__`);
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};