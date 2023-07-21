module.exports.config = {
    name: "tinder",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Hoàng  Quân",
    description: "xem info ",
    commandCategory: "game",
    usages: "tinder []",
    cooldowns: 5,
    info: [
        {
          key: 'Text',
          type: 'Văn Bản',
          example: 'tinder',
          code_by: `Code By Gia Quân`
        }
      ]
    };
    
    onload = ()=>{
        !global.client.tinder ? global.client.tinder = {} : ""
    }
    reaction = function({ event, api}){
        if(global.client.tinder[event.messageID]){
            console.log(global.client.tinder)
        }
        
    }
    module.exports.run = async function({ api, event, args }) {
        const fs = require("fs-extra");
        const path = require("path");
        const request = require("request");
        var allMems = Object.keys(global.data.users);
        var allmemNu = [], allmemNam = [], khac = [];
        for(let id of allMems){
            var gioitinh = global.data.users[id].sex;
            if(gioitinh == "Nam") allmemNam.push(id)
                else if(gioitinh == "Nữ") allmemNu.push(id)
                    else khac.push(id)
        }
        switch (event.args[0]){
            case "nam":{
                var random = Math.floor(Math.random()*allmemNam.length);
                var id = allmemNam[random];
                var data = global.data.users[allmemNam[random]];
                return request(encodeURI(`https://graph.facebook.com/${allmemNam[random]}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
                    .pipe(fs.createWriteStream(__dirname+'/1.png'))
                    .on('close',() => api.sendMessage({
                        body: `Bot trân trọng giới thiệu:\nTên: ${!data.name ? "Người Dùng Facebook" : data.name}\nChiều cao: ${!data.chieucao ? "ẩn" : data.chieucao},\nCân Nặng: ${!data.cannang ? "ẩn" : data.cannang},\nTình Trạng: ${!data.tinhtrang ? "ẩn" : data.tinhtrang},\nNơi Ở: ${!data.city ? "ẩn" : data.city},\nSở Thích: ${!data.sothich ? "ẩn" : data.sothich},\nLink: www.facebook.com/${id}`,
                        attachment: fs.createReadStream(__dirname + "/1.png")
                    },event.threadID,(error,info) => {
                        global.client.tinder[info.messageID] = id
                        fs.unlinkSync(__dirname + "/1.png")
                    },event.messageID));
                }
                break;
            case "nu":{
                var random = Math.floor(Math.random()*allmemNu.length);
                var id = allmemNu[random];
                var data = global.data.users[id];
                return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
                    .pipe(fs.createWriteStream(__dirname+'/1.png'))
                    .on('close',() => api.sendMessage({
                        body: `Bot trân trọng giới thiệu:\nTên: ${!data.name ? "Người Dùng Facebook" : data.name}\nChiều cao: ${!data.chieucao ? "ẩn" : data.chieucao},\nCân Nặng: ${!data.cannang ? "ẩn" : data.cannang},\nTình Trạng: ${!data.tinhtrang ? "ẩn" : data.tinhtrang},\nNơi Ở: ${!data.city ? "ẩn" : data.city},\nSở Thích: ${!data.sothich ? "ẩn" : data.sothich},\nLink: www.facebook.com/${id}`,
                        attachment: fs.createReadStream(__dirname + "/1.png")
                    },event.threadID,(error,info) => {
                        global.client.tinder[info.messageID] = id
                        fs.unlinkSync(__dirname + "/1.png")
                    },event.messageID));
                }
                break;
            case "set":{
                if(!event.args[1]) return api.sendMessage(`${global.config.prefix}tinder set chieucao/cannang/tinhtrang/noio/sothich`,event.threadID)
                switch (event.args[1]){
                    case "chieucao":{
                        if(!event.args[2]) return api.sendMessage(`ví dụ: ${global.config.prefix}tinder set chieucao 50cm`,event.threadID)
                        global.data.users[event.senderID].chieucao = (event.args.slice(2, event.args.length)).join(" ");
                        return api.sendMessage(`Đã set chiều cao của bạn là ${(event.args.slice(2, event.args.length)).join(" ")}`,event.threadID)
                    }
                    case "cannang":{
                        if(!event.args[2]) return api.sendMessage(`ví dụ: ${global.config.prefix}tinder set cannang 50kg`,event.threadID)
                        global.data.users[event.senderID].cannang = (event.args.slice(2, event.args.length)).join(" ");
                        return api.sendMessage(`Đã set cân nặng của bạn là ${(event.args.slice(2, event.args.length)).join(" ")}`,event.threadID)
                    }
                    case "tinhtrang":{
                        if(!event.args[2]) return api.sendMessage(`ví dụ: ${global.config.prefix}tinder set tinhtrang độc thân`,event.threadID)
                        global.data.users[event.senderID].tinhtrang = (event.args.slice(2, event.args.length)).join(" ");
                        return api.sendMessage(`Đã set tình trạng hôn nhân của bạn là ${(event.args.slice(2, event.args.length)).join(" ")}`,event.threadID)
                    }
                    case "noio":{
                        if(!event.args[2]) return api.sendMessage(`ví dụ: ${global.config.prefix}tinder set noio nam định`,event.threadID)
                        global.data.users[event.senderID].city = (event.args.slice(2, event.args.length)).join(" ");
                        return api.sendMessage(`Đã set nơi ở của bạn là ${(event.args.slice(2, event.args.length)).join(" ")}`,event.threadID)
                    }
                    case "sothich":{
                        if(!event.args[2]) return api.sendMessage(`ví dụ: ${global.config.prefix}tinder set sothich game, buscu`,event.threadID)
                        global.data.users[event.senderID].sothich = (event.args.slice(2, event.args.length)).join(" ");
                        return api.sendMessage(`Đã set sở thích của bạn là ${(event.args.slice(2, event.args.length)).join(" ")}`,event.threadID)
                    }
                    default:{
                        return api.sendMessage(`ví dụ: ${global.config.prefix}tinder set chieucao 50cm`,event.threadID)
                    }
                }
                break;

            }
            case "info":{
                var data = global.data.users[event.senderID];
                return request(encodeURI(`https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
                    .pipe(fs.createWriteStream(__dirname+'/1.png'))
                    .on('close',() => api.sendMessage({
                        body: `Thông tin của bạn:\nTên: ${!data.name ? "Người Dùng Facebook" : data.name}\nChiều cao: ${!data.chieucao ? "ẩn" : data.chieucao},\nCân Nặng: ${!data.cannang ? "ẩn" : data.cannang},\nTình Trạng: ${!data.tinhtrang ? "ẩn" : data.tinhtrang},\nNơi Ở: ${!data.city ? "ẩn" : data.city},\nSở Thích: ${!data.sothich ? "ẩn" : data.sothich}\n+Thay đổi thông tin ${global.config.prefix}tinder set chieucao/cannang/tinhtrang/noio/sothich\nẢnh hiện thị: `,
                        attachment: fs.createReadStream(__dirname + "/1.png")
                    },event.threadID, ()=>  fs.unlinkSync(__dirname + "/1.png")
                    ,event.messageID));
                break;
            }
            default:{
                if(!global.data.users[event.senderID]){
                    var random = Math.floor(Math.random()*khac.length);
                    var id = khac[random];
                    var data = global.data.users[id];
                    return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
                        .pipe(fs.createWriteStream(__dirname+'/1.png'))
                        .on('close',() => api.sendMessage({
                            body: `!!Bot không thấy giới tính của bạn\nBot đề xuất:\nTên: ${!data.name ? "Người Dùng Facebook" : data.name}\nChiều cao: ${!data.chieucao ? "ẩn" : data.chieucao},\nCân Nặng: ${!data.cannang ? "ẩn" : data.cannang},\nTình Trạng: ${!data.tinhtrang ? "ẩn" : data.tinhtrang},\nNơi Ở: ${!data.city ? "ẩn" : data.city},\nSở Thích: ${!data.sothich ? "ẩn" : data.sothich},\nLink: www.facebook.com/${id}`,
                            attachment: fs.createReadStream(__dirname + "/1.png")
                        },event.threadID,(error,info) => {
                            global.client.tinder[info.messageID] = id
                            fs.unlinkSync(__dirname + "/1.png")
                        },event.messageID));
                }else if(global.data.users[event.senderID].sex == "nam"){
                    var random = Math.floor(Math.random()*allmemNam.length);
                    var id = allmemNam[random];
                    var data = global.data.users[id];
                    return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
                        .pipe(fs.createWriteStream(__dirname+'/1.png'))
                        .on('close',() => api.sendMessage({
                            body: `Bot trân trọng gt:\nTên: ${!data.name ? "Người Dùng Facebook" : data.name}\nChiều cao: ${!data.chieucao ? "ẩn" : data.chieucao},\nCân Nặng: ${!data.cannang ? "ẩn" : data.cannang},\nTình Trạng: ${!data.tinhtrang ? "ẩn" : data.tinhtrang},\nNơi Ở: ${!data.city ? "ẩn" : data.city},\nSở Thích: ${!data.sothich ? "ẩn" : data.sothich},\nLink: www.facebook.com/${id}`,
                            attachment: fs.createReadStream(__dirname + "/1.png")
                        },event.threadID,(error,info) => {
                            global.client.tinder[info.messageID] = id
                            fs.unlinkSync(__dirname + "/1.png")
                        },event.messageID));
                }else{
                    var random = Math.floor(Math.random()*allmemNu.length);
                    var id = allmemNu[random];
                    var data = global.data.users[id];
                    return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
                        .pipe(fs.createWriteStream(__dirname+'/1.png'))
                        .on('close',() => api.sendMessage({
                            body: `Bot trân trọng gt:\nTên: ${!data.name ? "Người Dùng Facebook" : data.name}\nChiều cao: ${!data.chieucao ? "ẩn" : data.chieucao},\nCân Nặng: ${!data.cannang ? "ẩn" : data.cannang},\nTình Trạng: ${!data.tinhtrang ? "ẩn" : data.tinhtrang},\nNơi Ở: ${!data.city ? "ẩn" : data.city},\nSở Thích: ${!data.sothich ? "ẩn" : data.sothich},\nLink: www.facebook.com/${id}`,
                            attachment: fs.createReadStream(__dirname + "/1.png")
                        },event.threadID,(error,info) => {
                            global.client.tinder[info.messageID] = id
                            fs.unlinkSync(__dirname + "/1.png")
                        },event.messageID));
                }
            }
        }
               
    
}
