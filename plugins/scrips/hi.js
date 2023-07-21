module.exports.config = {
name: "hi",
version: "1.0.1",
hasPermssion: 0,
credits: "Gia Quân",// dã sửa thành cái đầu buồi
description: "hi",
commandCategory: "Không cần dấu lệnh",
usages: "noprefix",
cooldowns: 5,
info: [
        {
            key: 'Text',
            type: 'Văn Bản',
            example: 'hi',
            code_by: `Code By Gia Quân`
        }
    ]
};
module.exports.event = async function({ event, api, Users, client })  {
    const request = require('request');
     const axios = require(`axios`);
     const {threadID, senderID } = event;
     const nameUser = (await Users.getData(senderID)).name || (await Users.getInfo(senderID)).name;
     if ((event.body == "Hi") || (event.body == "hi") || (event.body == "Hello") || (event.body == "hello")|| (event.body == "Hii") || (event.body == "hii") || (event.body == "hai")|| (event.body == "Chào")  ) { return api.sendMessage({
   body: `🌈Chào bạn ${nameUser} chúc bạn một ngày vui vẻ nhé 😉❤️`,
   mentions: [
       {
       tag: nameUser,
       id: senderID
       }
       ]
   }, event.threadID, event.messagerID);
   }
   };
   
   
   module.exports.run = async ({ event, api, Currencies, args, utils }) => {
   
   
   api.sendMessage(`dùng cái đầu buồi địt mẹ mày`,event.threadID); /// điền cái buồi gì cũng đuơcj
   
   
   
   }
   