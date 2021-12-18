const { MessageEmbed, Permissions } = require('discord.js');
const { error } = require('../functions-handler/embeds');
const commandeFormat = 'bot';
const COLOR = require('../dbs/color-embeds.json');

const ALIAS = [];

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
		// executer le code
		
        const embed = new MessageEmbed()
            .setTitle('ℹ️ INFORMATIONS BOT ℹ️')
            .setDescription('Voici les informations du bot :')
            .setColor(COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8')
            .addField('Nom du bot', '```' + msg.client.user.username + '```', true)
            .addField('Créateur', '```' + msg.client.user.tag + '```', true)
            .addField('ID du bot', '```' + msg.client.user.id + '```', true)
            .addField('Version du bot', '```' + require('../package.json').version + '```', true)
            .addField('De nouvelle statistiques vont arriver sur le bot', 'Elles mettes juste un peut de temps car elles sont en cours de développement.')
        ;
        msg.reply({ embeds: [embed] });
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};