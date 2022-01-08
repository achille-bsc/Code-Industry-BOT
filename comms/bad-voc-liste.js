const { MessageEmbed, Permissions, MessageActionRow, MessageButton } = require('discord.js');
const { error } = require('../functions-handler/embeds');
const commandeFormat = 'bad-words';
const COLOR = require('../dbs/color-embeds.json');
const bad_voc = require('../dbs/bad-voc.json');

const ALIAS = ['bad-voc-liste', 'bad-word', 'mots interdits', 'bannedword', 'badvocliste', 'badwords', 'badword', 'motsinterdits', 'filtre', 'baned-word', 'mots-bannis', 'motsbannis', 'mot-ban'];

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
        msg.delete();
        const embed = new MessageEmbed()
            .setTitle(`Liste des mots interdits par l'auto-modération`)
            .setDescription(`\`${bad_voc.voc.join('\` \`')}\``)
            .addField('Ajouter un mot', 'Pour proposer l\'ajout d\'un mot à l\'équipe du staff vous pouvez rejoindre celui-ci et nous en faire part dans une suggestion.')
            .setColor(colorC)
            .setTimestamp()
            .setFooter(`Demandé par ${msg.author.tag}`, msg.author.displayAvatarURL());
            
        ;
        msg.channel.send({ embeds: [embed] });
		
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};