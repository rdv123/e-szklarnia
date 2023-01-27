const TelegramBot = require('node-telegram-bot-api');

const axios = require("axios"); 

const CronJob = require('cron').CronJob;

// Use this if the 4th param is default value(false)
// job.start()

// replace the value below with the Telegram token you receive from @BotFather
const token = 'dddddddddddd';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const job = new CronJob(
	
  "03 23 * * *",
	async function() {
		console.log('You will see this message every second 15');
    let price = await getPrice()

    console.log(price)
  
   
    const chatId = -1001708123510;

    try {
      await bot.sendMessage(chatId, `Всем доброго дня! Сегодня цена на PowerMax ${price}. Широкой дороги и удачного дня!`)
    } catch (error) {
      console.error(error);
      // Expected output: ReferenceError: nonExistentFunction is not defined
      // (Note: the exact output may be browser-dependent)
    }

   


	},
	null,
	true,
	'Europe/Warsaw'

);


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


