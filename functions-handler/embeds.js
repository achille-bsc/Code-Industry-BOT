const { MessageEmbed } = require("discord.js");

//export a function to be used in other files

  
  function embed(title, description, color, field) {
    return new MessageEmbed()
        .setTitle(title)
        .setDescription(description + '\n\n' + field)
        .setColor(color);
  };
  
  function erreur(message, error) {
    return message.channel.send( { embeds: [this.embed("❌ Une erreur est survenue ! ❌", error, "#DB0501", `__Si votre erreur persiste, vous pouvez contacter le [staff](https://discord.gg/tCmb8yGZYw) sur le serveur [support](https://discord.gg/tCmb8yGZYw)__`)] } );
  };
  
  function success(message, success) {
    return message.channel.send( { embeds: [this.embed("Succès ! 🎉", success, "GREEN", 'test')] });
  };
  function info(message, info) {
    return message.channel.send( { embeds: [this.embed("Information", info, "BLUE", 'test')] });
  };


module.exports = {embed, erreur, success, info}