function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  
const tmi = require('tmi.js'),
    { channel, username, password } = require('./settings.json');
const { join } = require('tmi.js/lib/commands');

//Passing Config File
config = require('./config.json')

const options = {
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity : {
        username,
        password
    },
    channels: channel
};

//Multi Channel Support
const client = new tmi.Client(options);
client.connect().catch(console.error);

var totalRaffle = 0;
var totalMessages = 0;
var totalUserRaffle =0;
var totalTicketsBought =0;
var totalGambled =0;
var totalnumGambles =0;

//User Information 
setInterval(() => {
console.log("\n"+"š¤ <---------------------------------------Raffle Bot Information---------------------------------------> š¤");
}, 1000 * 3 * 60);

setInterval(() => {
console.log('\x1b[32m'+"\nš© Auto-Gamble:",'\x1b[0m' + "You have gambled: š°  " + '\x1b[32m', totalnumGambles, '\x1b[0m' + "  š° times. You have won/lost a total of š° " + '\x1b[33m', totalGambled,'\x1b[0m' + " š° points.");
}, 1000 * 3 * 60);

setInterval(() => {
console.log('\x1b[36m'+"š¦ Auto-Ticket:", '\x1b[0m' + "You have used autoticket: šļø  " + '\x1b[33m', totalTicketsBought, '\x1b[0m' + " šļø   times.");
}, 1000 * 3 * 60);

setInterval (() => {
console.log('\x1b[31m'+"š„ Auto-Raffle:", '\x1b[0m' + "š® Streamers have started: š£  " + '\x1b[32m', totalUserRaffle, '\x1b[0m' + " š£ raffles and you have succesfully joined: š« " + '\x1b[33m', totalRaffle,'\x1b[0m' + " š« raffles.");
}, 1000 * 3 * 60);

setInterval(() => {
console.log('\x1b[34m'+"šŖ Total Messages:" + '\x1b[0m', "Messages that have been read since the session start: šØ  "+'\x1b[32m', totalMessages, '\x1b[0m' + "  šØ.");
}, 1000 * 3 * 60);

setInterval(() => {
console.log("\n" + "š¤ <-----------------------------------------End of Information-----------------------------------------> š¤"+"\n");
}, 1000 * 3 * 60);


//Auto-Gamble
setInterval(() => {
    console.log("\n<-----------------------------------------Gamble Information----------------------------------------->\n"); 
    for(var i = 0; i < channel.length; i++) {
     
     if(Math.random() < 0.5) {
     
     client.say(channel[i], config[channel[i].replace('#','')].autoGamble);
     console.log('\x1b[32m'+"Gamble Status:   āļø",'\x1b[0m')
    }
 }        
    console.log("\n<-----------------------------------------End of Information----------------------------------------->\n"); 
}, 1000 * 15 * 60);


//Connected 
client.on('connected', () => {
    
//Start Command (Optional)
    for(var i = 0; i < channel.length; i++){
        console.log('\x1b[32m'+ "Connection Status:   āļø",'\x1b[0m')
        client.say(channel[i], '');
    }
    }

);

//Reading Messages
client.on('message', (channel, user, message, self) => {



//Gamble UI
const gambleArray = message.split(" ");
let messageUsername = gambleArray[0];
let winLoss = gambleArray[1];
let points = gambleArray[2];


if (messageUsername.includes(username)){
var numPoints = Number(points);

if (winLoss == "won") {
    totalGambled = totalGambled + numPoints;
    totalnumGambles++;
}
else if (winLoss == "lost") {
    totalGambled = totalGambled - numPoints;
    totalnumGambles++;
}
}

//User Info
    if (message.includes("")) {
        totalMessages++;
    }


    if (message.includes("!raffle")) {
        totalUserRaffle++;
    }


//Anti Call Out    
    if (message.includes(username)) return;
    

    
//Autoticket Chance/UI
  
var autoticket = message.includes(`The Multi-Raffle has ended`);
    
    if(autoticket) {
        sleep(Math.floor(Math.random() * 10000) + 20000);
    
    if(Math.random() < 0.5) {
        
            client.say(channel, config[channel.replace('#', '')].autoTicket);
    
        totalTicketsBought++;
        }
    }
    
    
//You can't play yourself anymore 
    if(self) return;
    
    
//Auto !raffle/!join
    var check = message.includes("!raffle");
        if(check) {

    //Dynamic Delay
        sleep(Math.floor(Math.random() * 10000) + 5000);

        totalRaffle++;
       
            client.say(channel, config[channel.replace('#', '')].raffleCommand);
        
    }
  
 
    }


);

