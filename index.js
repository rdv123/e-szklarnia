const TelegramBot = require('node-telegram-bot-api');

const axios = require("axios"); 

const CronJob = require('cron').CronJob;

// Use this if the 4th param is default value(false)
// job.start()

// replace the value below with the Telegram token you receive from @BotFather
const token = 'xxxxxxxxxxxx';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const job = new CronJob(
	
  "*/6000 * * * * *",
	async function() {
		console.log('You will see this message every second 15');
    let price = await getPrice()

    console.log(price)
  
   const chatId = 349046375;

   bot.sendMessage(chatId, `Всем доброго дня! Сегодня цена на PowerMax ${price}. Широкой дороги и удачного дня!`)





	},
	null,
	true,
	'America/Los_Angeles'

);
// job.start()

const getPrice = async()=>{
    const response = await axios.get('https://tool.orlen.pl/api/wholesalefuelprices')
    const data = response.data
    // console.log("dddddddddddddddd", data)

    const fuelPrice = data.filter((item)=>{
        return item.productName === 'ONEkodiesel'
        })[0].value
        let pricePM = fuelPrice/1000*1.23-0.05
        return pricePM.toFixed(2)
}


// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {

    bot.setMyCommands([
        { command: "/run", description: "Начальное приветствие" },
        { command: "/info", description: "Получить информацию о пользователе" },
        { command: "/price", description: "Получить информацию о пользователе" },
        { command: "/hi", description: "Получить информацию о пользователе" },
        { command: "/privet", description: "Получить информацию о пользователе" },
      ]);

  const chatId = msg.chat.id; // присвоить другой чат id
console.log("id chat", chatId)
  let text = msg.text

  if(text=="/run"){
    bot.sendMessage(chatId, 'Я запустился')
    return
  }
  if(text=='/price'){
    
    const price = await getPrice()
    console.log('price', price)
    bot.sendMessage(chatId, "Актуальная цена дизтоплива " + price)
    return
  }else{
    bot.sendMessage(chatId, 'Я не знаю такой команды');
    
  }

//   console.log(msg)


  // send a message to the chat acknowledging receipt of their message
  
});