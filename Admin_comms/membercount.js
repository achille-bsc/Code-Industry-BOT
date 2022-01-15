const { MessageEmbed } = require("discord.js");

const commandeFormat = 'membercount';
const COLOR = require('../dbs/color-embeds.json');

module.exports.check = (args, msg) => {
	return commandeFormat.split(' ')[0] == args[0];
};

/**
 *
 * @param {Discord.Message} msg
 */
module.exports.action = (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
        console.log(`[ADMIN][${commandeFormat}] => { ${msg.author.tag} (${msg.author.id}) }`)
		// executer le code
        const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		let str = '';
		let serv = 0;
        let members = 0;
		msg.client.guilds.cache.map(guildss => {
			serv = serv + 1,
            members = members + guildss.memberCount;
			str += 'Nom: **' + guildss.name + '**, Membres: **' + guildss.memberCount + '** ID: `' + guildss.id + '`\n';
		},
		);
        const embed = new MessageEmbed()
            .setTitle('📊 - MemberCount')
            .setDescription('\n' + str + `\n\n*Je suis actuellement sur ___**\`${serv}\`**___ serveurs*`)
            .addField('un total de ', members + ' membres')
            .addField('Un total de ', serv + ' serveurs')
            .setFooter('Réclamé par: ' + msg.author.username + '( ' + msg.author.id + ' )')
            .setColor(colorC)
        msg.author.send({ embeds: [embed] })
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};