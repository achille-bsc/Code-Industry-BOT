const { MessageEmbed } = require("discord.js");

const commandeFormat = "off [raison]";
const COLOR = require("../dbs/color-embeds.json");

module.exports.check = (args, msg) => {
  return commandeFormat.split(" ")[0] == args[0];
};

/**
 *
 * @param {Discord.Message} msg
 */
module.exports.action = async (msg, args) => {
  if (commandeFormat.split(" ").length <= args.length) {
    console.log(
      `[ADMIN][${commandeFormat}] => { ${msg.author.tag} (${msg.author.id}) }`
    );
    const raison = args.slice(1);
    console.log(`RAISON ${raison}`);
    // executer le code
    const embed = new MessageEmbed()
      .setColor("RED")
      .setThumbnail("")
      .setDescription(
        `Le bot viens d'être éteint par ${msg.author.tag}\n***raison:***\`${raison}\``
      )
      .setFooter("Code Industry")
      .setTimestamp();
    await msg.channel.send({ embeds: [embed] });
    const botmaster = client.members.cache.get('688098375697956905')
    await process.exit();
  } else {
    msg.reply(
      "Mauvaise commande, voila ce que j'attend **" + commandeFormat + "**"
    );
  }
};
