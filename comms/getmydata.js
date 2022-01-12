const { MessageEmbed, Permissions, MessageButton, MessageActionRow, MessageCollector } = require('discord.js');
const { error } = require('../functions-handler/embeds');
const commandeFormat = 'getmydata';
const COLOR = require('../dbs/color-embeds.json');

const ALIAS = ['datas', 'getdata', 'gatdatas', 'get-data', 'get-datas'];

const emebds = require('../functions-handler/embeds');
const mess = require('../functions-handler/messages')

module.exports.check = (args) => {
	return (commandeFormat.split(' ')[0] == args[0] || ALIAS.includes(args[0]));
};

/**
 *
 * @param {Discord.Message} msg
 */
module.exports.action = async (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
        const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		// executer le code
        msg.delete();
		const embed = new MessageEmbed()
            .setColor(colorC)
            .setTitle('Vos informations')
            .setDescription(`**mention + tag**: <@${msg.author.id}>${msg.author.tag}
            **identifiant**: ${msg.author.id}
            **pseudo**: ${msg.author.username}
            **discriminateur**: ${msg.author.discriminator}
            **date de création du compte**: ${msg.author.createdAt}`)
        ;
        msg.author.send({ embeds: [embed] });
		
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};