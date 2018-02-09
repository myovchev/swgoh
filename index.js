const swgoh = require('swgoh').swgoh;

const username = process.env.SWGOH_USER;

if (!username) {
  console.log('USAGE: SWGOH_USER=your_swgohgg_username yarn start');
  process.exit();
}

swgoh.profile(username)
  .then((profile) => {
    const { guildUrl, guild } = profile;
    console.log(`Hi ${username}\nYour guild identified as: ${guild}\n`);
    return swgoh.guild(guildUrl);
  })
  .then((guild) => {
    console.log(`${Object.keys(guild).length} guild members found:\n`)
    console.log(Object.keys(guild).reduce((acc, i) => {
      const member = guild[i];
      acc += `\t${member.description} (${member.username})\n`;
      return acc;
    }, ''));
  });
