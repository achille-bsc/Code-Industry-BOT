/*const { MessageEmbed, Permissions, MessageButton, MessageActionRow, InteractionCollector, Channel, ChannelManager } = require('discord.js');
const { error } = require('../functions-handler/embeds');
const commandeFormat = 'clearchannel';
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
/*module.exports.action = async (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
        const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		// executer le code
		if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || !msg.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return  embeds.erreur(msg, 'Vous n\'avez pas la permission d\'utiliser cette commande.');
        
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('clrchnnl-accept')
					.setLabel('Valider')
					.setStyle('SUCCESS'),
				)
		    .addComponents(
			new MessageButton()
				.setCustomId('clrchnnl-refuse')
				.setLabel('Annuler')
				.setStyle('DANGER'),
		    )
		;

		const embed_validation = new MessageEmbed()
		    .setColor(colorC)
		    .setTitle('Voullez-vous confirmer la réinitialisation de ce salon ?')
		    .setDescription('Cette oppération va supprimer ce salon puis en recréer un similaire')
		;
		
		msg.channel.send({ embeds: [embed_validation], components: [row] })

		const message = await msg.channel.send({ embeds: [embed], components: [row] })
			console.log(message.channel.id)

	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};
*/