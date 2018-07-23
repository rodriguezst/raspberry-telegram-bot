//SETTINGS VAR
var token = 'my-telegram-bot-token'; //INSERT HERE YOUR AUTHENTICATION TOKEN PROVIDED BY @BotFather
var AUTHID = 'my-telegram-id'; //INSERT HERE YOUR UNIQUE ID, YOU CAN FIND IT STARTING THE BOT AND SENDING THE COMMAND /myid
var botname = 'my-bot-name'; //INSERT YOUR YOUR BOT NAME (OR WHAT YOU PREFERE)

var Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, { polling: true });

var sys = require('util'),
  exec = require('child_process').exec,
  child;


//console.log('Bot @'+botname+' - server started...');


//send("@"+botname+" is now up!", AUTHID); //THE BOT WILL SEND THIS MESSAGE AT THE START

//RUN CUSTOM SCRIPTS STORED IN scripts/ directory
//USAGE: "/run script_name" -> sh scripts/script_name.sh
bot.onText(/^\/run ([a-z_]+)$/, function(msg, match){
	var reply = "";
	if(msg.chat.id == AUTHID){
		command = "sh " + __dirname + "/scripts/" + match[1].replace(/[^a-z_]/gi, '') + ".sh";
		//send("Executing " + command, msg.chat.id);
		console.log(command);
		child = exec(command, function (error, stdout, stderr) {
			if (error !== null) {
				console.log('exec error: ' + error);
				reply = "Error: " + error;
				send(reply, msg.chat.id);
			} else {
				send(stdout, msg.chat.id);
			}
		});
	}
});

bot.onText(/^\/reboot$/, function(msg, match){
	var reply = "";
	if(msg.chat.id == AUTHID){
		send("Rebooting Raspberry Pi!", msg.chat.id);
		console.log("rebooting");

		setInterval(function(){child = exec("sudo reboot", function (error, stdout, stderr) {
				if (error !== null) {
					console.log('exec error: ' + error);
					reply = "Error: " + error;
					send(reply, msg.chat.id);
				}
			});
		},5000);
	}
});

bot.onText(/^\/myid$/, function(msg, match){
	send("Your unique ID is: "+msg.chat.id, msg.chat.id);
  send("Insert this in 'my-telegram-id' in your bot.js", msg.chat.id);
});

/* SEND FUNCTION */
function send(msg, id){
	console.log(id);
	bot.sendMessage(id, msg).then(function () {
			console.log(msg);
		});
}
