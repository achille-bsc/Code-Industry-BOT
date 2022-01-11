const { MessageEmbed, Permissions, MessageButton, MessageActionRow, InteractionCollector, Channel, ChannelManager } = require('discord.js');
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
module.exports.action = async (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
        const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		// executer le code
		if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return embeds.erreur(msg, 'Vous n\'avez pas la permission d\'utiliser cette commande.');
        
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

        const embed = new MessageEmbed()
            .setColor(colorC)
            .setTitle('Voullez-vous confirmer la réinitialisation de ce channel ?')
            .setDescription('Cette oppération va supprimer ce salon puis en recréer un simulaire')
        ;
        
        const message = await msg.channel.send({ embeds: [embed], components: [row] })
                console.log(message.channel.id)

        const filter = m => m.content.includes('discord');
        const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });
// interaction collector in discordjs v13

        collector.on('collect', async interaction => {
            if(!interaction.isButton) return
            if(interaction.customID === 'clrchnnl-accept') {
                //delete channel

                msg.channel.delete(1000)
                const new_chann = msg.channel.clone(msg.channel.name)
                emebds.success(msg, 'Channel clonné avec succès !')
                new_chann.send({emebds: [accept_embed]})
            } else if(interaction.customID === 'clrchnnl-refuse') {
                //dont delete channel
                interaction.message.delete();
                emebds.cancel(msg)
            }
        })
		
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};