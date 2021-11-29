const { Discord, Permissions, MessageEmbed, MessageCollector, channelMention } = require('discord.js');
const commandeFormat = 'welcome';
const fs = require('fs');
const { error } = require('console');
const moment = require('moment');
const welcome_db = require('../welcome.json');

module.exports.check = (args) => {
	return commandeFormat.split(' ')[0] == args[0];
};

/**
     *
     * @param {Discord.Message} msg
     */

module.exports.action = async (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
		// executer le code

		msg.reply('Dans quelle salon souhaitez-vous recevoir les messages de bienvenue ? ( veiullez mentionner le salon => \`#nom-du-channel\`');

		// utilisation du collector !

		const welcome = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 30000 });
		welcome.on('collect', msg => {
			if (msg.author.bot) return;
			const chan = msg.mentions.channels.first();
			if (!chan) return msg.reply('Vous devez mentionner un channel !');
			const channID = msg.mentions.channels.first().id;


			if (welcome_db['id'][msg.guild.id]) {
				delete (welcome_db[msg.guild.id]);

				welcome_db[msg.guild.id] = {};
				welcome_db[msg.guild.id] = {
					chanID,
				};
			}
			else {
				welcome_db[msg.guild.id] = {};
				welcome_db[msg.guild.id] = {
					chanID,
				};
			}
			fs.writeFileSync('./welcome.json', JSON.stringify(welcome_db));
			msg.channel.send({ content: 'Le salon de message de bienvenue à bien tété déffini !' });


			msg.delete();

			welcome.stop();
		});
	}
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};