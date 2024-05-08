const { Client, GatewayIntentBits, ActivityType, TextChannel } = require('discord.js');
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a];
  }),
});
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('YaY Your Bot Status Changed✨');
});
app.listen(port, () => {
  console.log(`🔗 Listening to BRICE: http://localhost:${port}`);
  console.log(`🔗 Powered By BRICE`);
});


const statusMessages = [",💲AZURE STORE","✨CONFIVAEL","gg/azurestores"];


let currentIndex = 0;
const channelId = '';

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`\x1b[36m%s\x1b[0m`, `|    🐇 Logged in as ${client.user.tag}`);
    startStatusUpdateLoop(); // Inicia o loop de atualização do status após o login
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

function startStatusUpdateLoop() {
  updateStatusAndSendMessages(); // Atualiza o status e envia mensagens imediatamente após o login
  setInterval(updateStatusAndSendMessages, 10000); // Define um intervalo para atualizar o status e enviar mensagens a cada 10 segundos
}

function updateStatusAndSendMessages() {
  const currentStatus = statusMessages[currentIndex];
  const nextStatus = statusMessages[(currentIndex + 1) % statusMessages.length];

  client.user.setPresence({
    activities: [{ name: currentStatus, type: ActivityType.Custom}],
    status: 'dnd',
  });

  
  const textChannel = client.channels.cache.get(channelId);

  if (textChannel instanceof TextChannel) {
   
    textChannel.send(`Bot status is: ${currentStatus}`);
  } else {

  }

  currentIndex = (currentIndex + 1) % statusMessages.length;
}

client.once('ready', () => {
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✅ O bot está pronto como ${client.user.tag}`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✨CONFIVAEL`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ❤️AZURE STORE`);
  login();
});

// Comando para iniciar manualmente o loop de atualização do status
client.on('message', (message) => {
  if (message.content === '!startstatusloop') {
    startStatusUpdateLoop();
  }
});

login();
