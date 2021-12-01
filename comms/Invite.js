const { MessageEmbed } = require('discord.js');
const commandeFormat = 'invite';
const ALIAS = ['invite-bot', 'bot-invite'];
const COLOR = require('../dbs/color-embeds.json');

module.exports.check = (args) => {
	return (commandeFormat.split(' ')[0] == args[0] || ALIAS.includes(args[0]));
};

/**
     *
     * @param {Discord.Message} msg
     */

module.exports.action = async (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
		// executer le code
		msg.delete();
		const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		const exampleEmbed = new MessageEmbed()
			.setColor(colorC)
			.setTitle('Inviter le bot')
			.setURL('https://discord.com/oauth2/authorize?client_id=902293972091801620&scope=bot&permissions=8589934591');
		msg.channel.send({ embeds: [exampleEmbed] });
	}
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};