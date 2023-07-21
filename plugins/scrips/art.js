module.exports.config = {
    name: "art",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Hoàng",
    description: "",
    commandCategory: "Game",
    usages: "[reply]",
    cooldowns: 5,
    dependencies: [
  "axios",
  ]
};

module.exports.run = async ({ api, event, args }) => {
     
const axios = require('axios');  
 const fs = require("fs-extra");
 link = await require("tinyurl").shorten( event.messageReply.attachments[0].url || args.join(" "));
        api.sendMessage("Đang vẽ ảnh của bạn...", event.threadID, event.messageID);
 let res = (await axios.get(encodeURI(`https://stingray-app-chpom.ondigitalocean.app/meitu-image-v2?url=${link}`))).data;
let pubg = (await axios.get(`${res.image}`, { responseType: "arraybuffer" } )).data;
      fs.writeFileSync( __dirname + "/cache/art.png", Buffer.from(pubg, "utf-8"));
       var msg = `
 Trạng Thái: ${res.message}
Thời Gian Làm: ${res.timeProcess}`
 api.sendMessage({body: msg ,attachment: fs.createReadStream(__dirname + `/cache/art.png`)}, event.threadID, event.messageID);
}

 