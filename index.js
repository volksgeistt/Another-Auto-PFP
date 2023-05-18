const { Client, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({ intents: 32767 });
const pfps = [];

const Database = require('@replit/database');
const db = new Database()

client.on('ready', () => {
  client.users.cache.forEach(user => {

    if (!user.bot) {
      const url = user.avatarURL();
      if(url) pfps.push(url);
    }
  });

  console.log(`[!]; Client Logged in as ${client.user.tag}\n[!]; Total PFPs: ${pfps.length}\n`);
  const channel = client.channels.cache.get('ENTER CHANNEL ID');

  let x = 0;
  setInterval(() => {
    if (channel) {
      const pfp = pfps[x];
      if (pfp) {
        const PFP = new MessageEmbed()
          .setImage(pfp)
          .setFooter({ text: 'NotYourFeniX' });

        channel.send({ embeds: [PFP] }); x+= 1;
        console.log('[!]; Sent ' + x + ' PFPs in #' + channel.name)
      }
    }
  }, 4999)
});


var x = 0;
const inter = [5500, 5300, 5987, 3344, 5882, 4995]
client.on('messageCreate', async (message) => {

  if (message.content.toLowerCase() === '-help') {
    const embed = new MessageEmbed()
      .setColor('PURPLE')
      .setThumbnail(client.user.avatarURL())
      .setDescription('`Add Your pfp channel id in line 18 and hit start.`')

    const InvMe = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('volksgeist')
        .setStyle('LINK')
        .setURL('https://discord.com/user/1082504765637931058')
    )

    message.channel.send({
      embeds: [embed],
      components: [InvMe]
    })
  }
});

client.on('rateLimit', () => {
  console.log('[!] Rate Limited')
})

client.login(process.env.token)
