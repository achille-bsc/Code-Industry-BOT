const { MessageEmbed, Permissions, MessageActionRow, MessageButton } = require('discord.js');
const { error } = require('../functions-handler/embeds');
const commandeFormat = 'bad-voc';
const COLOR = require('../dbs/color-embeds.json');
const bad_voc = require('../dbs/bad-voc.json');

const ALIAS = ['vocabulaire-interdit', 'voc-interdit'];

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
        const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';

        const embed = new MessageEmbed()
            .setTitle('Voullez-vous authoriser les mots interdits ?')
            .setDescription('Les mots authorisés ou non sont séléctionnés et gérés par les administrateurs du bot.')
            .addField('Liste des mots', 'La liste des mots n\'est pour le moment pas terminée et donc pas communiquée.')
            .addField('Authoriser', 'Les mots interdits sont authorisés.')
            .addField('Interdire', 'Les mots interdits sont interdits.')
            .setColor(colorC)
        ;

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('bad_words_alert_no')
                    .setLabel('Autoriser')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('bad_words_alert_yes')
                    .setLabel('Interdire')
                    .setStyle('DANGER'),
            )
        ;

        msg.channel.send({ embeds: [embed], components: [row] })
		
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};