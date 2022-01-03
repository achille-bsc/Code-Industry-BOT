const { MessageEmbed, Permissions } = require('discord.js');

module.exports.check = (args) => {
	return (commandeFormat.split(' ')[0] == args[0] || ALIAS.includes(args[0]));
};

/**
 *
 * @param {Discord.Message} msg
 */

module.exports.action = async (msg, args) => {

};