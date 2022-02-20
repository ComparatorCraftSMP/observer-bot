//This logs all interactions
module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`At ${interaction.createdAt} \n${interaction.user.tag} in #${interaction.channel.name} triggered ${interaction.type}.  \n In guild ${interaction.guild.name}`);
	},
};
 
