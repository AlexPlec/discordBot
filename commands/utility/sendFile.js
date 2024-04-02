const { SlashCommandBuilder } = require('discord.js');
const cron = require('node-cron');
const fs = require('node:fs');
const postsParametrs = require('../../postsParametrs');
const { testChannelId } = require('../../config.json');

let isTaskRunning = false;
let interactions;
let targetChannel;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('send-file')
    .setDescription('send files to channel'),
  async execute(interaction) {
    try {
     
      isTaskRunning = true;
      interactions = interaction;
      interactions.channel.id = testChannelId
      targetChannel = interactions.channel
      await interaction.deferReply({fetchReply: true}); // Defer initial response
      console.log('Successfully sent file!');
    } catch (error) {
      console.error('Error sending file:', error);
      await interaction.reply('Failed to send file!');
    }
  },
};

async function sendFiles(filesFolder, numberOfPosts, postInterval) {
  try {
    const files = fs.readdirSync(filesFolder);
    for (let i = 0; i < numberOfPosts; i++) {

      const filePath = `${filesFolder}/${files[i]}`;
      setTimeout(async () => {
        try {
          await targetChannel.send({ files: [filePath] }); // Send each file with followUp
          console.log(i);
        } catch (error) {
          console.error(`Error sending file: ${filePath}`, error);
          // sendMessage(errorMessage);
          return false;
        } finally {
          fs.unlink(filePath, (err) => {
            if (err) throw err;
          });
        }
      }, postInterval * i);

    }
  } catch (error) {
    console.error(`Error reading file list: ${error}`);
  }
};

function createPostIntervalInMs(start, end, numberOfPosts) {
  const durationInHours = Math.abs(start - end);
  return ((durationInHours * 60) / numberOfPosts) * 60 * 1000;
}

function createPostInterval() {
  for (let i = 0; i < postsParametrs.postsParametrs.length; i++) {
    postsParametrs.postsParametrs[i].forEach((range) => {
      if (range.message !== 'text') {
        range.postInterval = createPostIntervalInMs(range.start, range.end, range.numberOfPosts);
      }
    });
  }

};

createPostInterval();

cron.schedule('0 */1 * * *', async () => {
  if (isTaskRunning) {
    const currentHour = new Date().getHours();
    for (const range of postsParametrs.postsParametrs[0]) {
      if (currentHour >= range.start && currentHour <= range.end) {
        const { content, numberOfPosts, postInterval } = range;
        await sendFiles(content, numberOfPosts, postInterval); // Send files folder path
        break; // Exit after matching case
      }
    }
  } else {
    console.log('running a task every one minutes');
  }

});