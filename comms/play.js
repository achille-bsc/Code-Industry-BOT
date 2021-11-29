const { MessageEmbed, MessageCollector } = require('discord.js');
const commandeFormat = 'play';
const { DiscordTogether } = require('discord-together');
const COLOR = require('../color-embeds.json');

module.exports.check = (args) => {
	return commandeFormat.split(' ')[0] == args[0];
};

/**
     *
     * @param {Discord.Message} msg
     */

module.exports.action = async (msg, args, client) => {
	if (commandeFormat.split(' ').length <= args.length) {
		// executer le code
		const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		client.discordTogether = new DiscordTogether(client);
		msg.delete();
		/* if (!msg.member.voice.channel) {
			const error_voice_chann = new MessageEmbed()
				.setTitle('Vous devez être dans un salon vocal pour lancer une activvitée !')
				.setFooter(msg.guild.name)
				.setColor(colorC);
			msg.channel.send({ embeds: [error_voice_chann] });
			return;
		}*/
		if (!args[1]) {
			const question = new MessageEmbed()
				.setTitle('Quelle jeu souhaitez-vous ouvrir ?')
				.setDescription(`Liste des jeux proposés par le bot :
                    > \`**youtube**\`
                    > \`**chess**\`
                    > \`**poker**\`
                    > \`**betrayal**\`
                    > \`**fishing**\`
                    > \`**lettertile**\``)
				.setColor(colorC);
			const send_question = await msg.channel.send({ embeds: [question] });
			const collector = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
			collector.on('collect', msgg => {
				if (msgg.author.bot) return;
				if (msgg.author.id !== msg.author.id) {
					return;
				}
				msgg.delete();
				if (msgg.content === 'youtube') {
					if (msg.member.voice.channel) {
						client.discordTogether.createTogetherCode(msg.member.voice.channel.id, 'youtube').then(async invite => {
							const link = new MessageEmbed()
								.setTitle('Jouer')
								.setURL(invite.code)
								.setColor(colorC);
							msg.channel.send({ embeds: [link] }).catch(error => {
								// Only log the error if it is not an Unknown Message error
								msg.reply(error);
							});
							return;
						});
					}
					send_question.delete();
					collector.stop();
				}
				else if (msgg.content === 'chess') {
					if (msg.member.voice.channel) {
						client.discordTogether.createTogetherCode(msg.member.voice.channel.id, 'chess').then(async invite => {
							const link = new MessageEmbed()
								.setTitle('Jouer')
								.setURL(invite.code)
								.setColor(colorC);
							msg.channel.send({ embeds: [link] }).catch(error => {
								// Only log the error if it is not an Unknown Message error
								msg.reply(error);
							});
							return;
						});
					}
					send_question.delete();
					collector.stop();
				}
				else if (msgg.content === 'poker') {
					if (msg.member.voice.channel) {
						client.discordTogether.createTogetherCode(msg.member.voice.channel.id, 'poker').then(async invite => {
							const link = new MessageEmbed()
								.setTitle('Jouer')
								.setURL(invite.code)
								.setColor(colorC);
							msg.channel.send({ embeds: [link] }).catch(error => {
								// Only log the error if it is not an Unknown Message error
								msg.reply(error);
							});
							return;
						});
					}
					send_question.delete();
					collector.stop();
				}
				else if (msgg.content === 'betrayal') {
					if (msg.member.voice.channel) {
						client.discordTogether.createTogetherCode(msg.member.voice.channel.id, 'betrayal').then(async invite => {
							const link = new MessageEmbed()
								.setTitle('Jouer')
								.setURL(invite.code)
								.setColor(colorC);
							msg.channel.send({ embeds: [link] }).catch(error => {
								// Only log the error if it is not an Unknown Message error
								msg.reply(error);
							});
							return;
						});
					}
					send_question.delete();
					collector.stop();
				}
				else if (msgg.content === 'fishing') {
					if (msg.member.voice.channel) {
						client.discordTogether.createTogetherCode(msg.member.voice.channel.id, 'fishing').then(async invite => {
							const link = new MessageEmbed()
								.setTitle('Jouer')
								.setURL(invite.code)
								.setColor(colorC);
							msg.channel.send({ embeds: [link] }).catch(error => {
								// Only log the error if it is not an Unknown Message error
								msg.reply(error);
							});
							return;
						});
					}
					send_question.delete();
					collector.stop();
				}
				else if (msgg.content === 'lettertile') {
					if (msg.member.voice.channel) {
						client.discordTogether.createTogetherCode(msg.member.voice.channel.id, 'lettertile').then(async invite => {
							const link = new MessageEmbed()
								.setTitle('Jouer')
								.setURL(invite.code)
								.setColor(colorC);
							msg.channel.send({ embeds: [link] }).catch(error => {
								// Only log the error if it is not an Unknown Message error
								msg.reply(error);
							});
							return;
						});
					}
					send_question.delete();
					collector.stop();
				}
				else {
					const errorr = new MessageEmbed()
						.setTitle('Erreur !')
						.setDescription(`Vous ne pouvez choisir uniquement parmis les choix indiqués ci-dessous :
                        > \`**youtube**\`
                        > \`**chess**\`
                        > \`**poker**\`
                        > \`**betrayal**\`
                        > \`**fishing**\`
                        > \`**lettertile**\``)
						.setColor('RED')
                    ;
					msgg.channel.send({ embeds: [errorr] }).catch(error => {
						// Only log the error if it is not an Unknown Message error
						msg.reply(error);
					});
				}

			});
		}
		if (args[1] === 'youtube') {
			if (msg.member.voice.channel) {
				client.discordTogether.createTogetherCode(msg.member.voice.channel.id, 'youtube').then(async invite => {
					const link = new MessageEmbed()
						.setTitle('Jouer')
						.setURL(invite.code)
						.setColor(colorC);
					msg.channel.send({ embeds: [link] });
					return;
				});
			}
		}
		if (args[1] === 'chess') {
			if (msg.member.voice.channel) {
				client.discordTogether.createTogetherCode(msg.member.voice.channel.id, 'chess').then(async invite => {
					const link = new MessageEmbed()
						.setTitle('Jouer')
						.setURL(invite.code)
						.setColor(colorC);
					msg.channel.send({ embeds: [link] });
					return;
				});
			}
		}
		if (args[1] === 'poker') {
			if (msg.member.voice.channel) {
				client.discordTogether.createTogetherCode(msg.member.voice.channel.id, 'poker').then(async invite => {
					const link = new MessageEmbed()
						.setTitle('Jouer')
						.setURL(invite.code)
						.setColor(colorC);
					msg.channel.send({ embeds: [link] });
					return;
				});
			}
		}
		if (args[1] === 'betrayal') {
			if (msg.member.voice.channel) {
				client.discordTogether.createTogetherCode(msg.member.voice.channel.id, 'betrayal').then(async invite => {
					const link = new MessageEmbed()
						.setTitle('Jouer')
						.setURL(invite.code)
						.setColor(colorC);
					msg.channel.send({ embeds: [link] });
					return;
				});
			}
		}
		if (args[1] === 'fishing') {
			if (msg.member.voice.channel) {
				client.discordTogether.createTogetherCode(msg.member.voice.channel.id, 'fishing').then(async invite => {
					const link = new MessageEmbed()
						.setTitle('Jouer')
						.setURL(invite.code)
						.setColor(colorC);
					msg.channel.send({ embeds: [link] });
					return;
				});
			}
		}
		if (args[1] === 'lettertile') {
			if (msg.member.voice.channel) {
				client.discordTogether.createTogetherCode(msg.member.voice.channel.id, 'lettertile').then(async invite => {
					const link = new MessageEmbed()
						.setTitle('Jouer')
						.setURL(invite.code)
						.setColor(colorC);
					msg.channel.send({ embeds: [link] });
					return;
				});
			}
		}
	}
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend :**```' + commandeFormat + '```**');
	}
};