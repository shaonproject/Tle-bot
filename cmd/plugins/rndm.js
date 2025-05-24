const axios = require('axios');

module.exports = {
  config: {
    name: "random",
    prefix: true,
    aliases: ["rndm"],
    credits: "Nayan",
    permission: 0,
    description: "Fetch a random video based on a name",
    tags: ["fun", "media"],
  },
  start: async ({ event, api }) => {
    const chatId = event.msg.chat.id;
    const name = event.body.trim();

    
    if (!name) {
      return api.sendMessage(chatId, `❌ *Usage:* /rndm <name>\n\n📌 Replace <name> with a valid input.`, {
        parse_mode: 'Markdown',
      });
    }

    const kl = await axios.get('https://raw.githubusercontent.com/shaonproject/Shaon/main/api.json');
        const apis = kl.data.api;

    const apiUrl = `${apis}/video/random?name=${encodeURIComponent(name)}`;
    try {
      
      const response = await axios.get(apiUrl);
      const data = response.data;

      
      if (data.status && data.data) {
        const { cp, name: randomName, url } = data.data;

        await api.sendVideo(chatId, url, {
          caption: `🎉 *Random Video*\n\n📛 *Name:* ${randomName}\n📀 *Caption:* ${cp}`,
          parse_mode: 'Markdown',
        });
      } else {
        
        api.sendMessage(chatId, "❌ No random data found. Please try again later.");
      }
    } catch (error) {
      console.error('Error fetching random data:', error.message);
      api.sendMessage(chatId, "❌ Failed to fetch random data. Please try again later.");
    }
  },
};
