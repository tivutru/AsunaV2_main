module.exports.config = {
    name: 'autosend',
    version: '10.02',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'Tự động gửi tin nhắn theo giờ đã cài!',
    commandCategory: 'admin',
    usages: '[]',
    cooldowns: 3
};
module.exports.event = async function({ api,event, client }){
const nam = [{
    timer: '20:41:00 PM',
    message: ['𝐂𝐡𝐮́𝐜 𝐦𝐨̣𝐢 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐧𝐠𝐮̉ 𝐧𝐠𝐨𝐧😴', '𝐊𝐡𝐮𝐲𝐚 𝐫𝐮̀𝐢 𝐧𝐠𝐮̉ 𝐧𝐠𝐨𝐧 𝐧𝐡𝐞́ 𝐜𝐚́𝐜 𝐛𝐚̣𝐧😇']
},
{
    timer: '1:00:00 PM',
    message: ['𝐂𝐡𝐮́𝐜 𝐦𝐨̣𝐢 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐛𝐮𝐨̂̉𝐢 𝐜𝐡𝐢𝐞̂̀𝐮 𝐯𝐮𝐢 𝐯𝐞̉🙌', '𝐂𝐡𝐮́𝐜 𝐦𝐨̣𝐢 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐛𝐮𝐨̂̉𝐢 𝐜𝐡𝐢𝐞̂̀𝐮 đ𝐚̂̀𝐲 𝐧𝐚̆𝐧𝐠 𝐥𝐮̛𝐨̛̣𝐧𝐠😼']
},
{
    timer: '6:00:00 AM',
    message: ['𝐂𝐡𝐮́𝐜 𝐦𝐨̣𝐢 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐛𝐮𝐨̂̉𝐢 𝐬𝐚́𝐧𝐠 𝐯𝐮𝐢 𝐯𝐞̉😉', '𝐁𝐮𝐨̂̉𝐢 𝐬𝐚́𝐧𝐠 đ𝐚̂̀𝐲 𝐧𝐚̆𝐧𝐠 𝐥𝐮̛𝐨̛̣𝐧𝐠 𝐧𝐡𝐚𝐚 𝐜𝐚́𝐜 𝐛𝐚̣𝐧😙', '𝐂𝐡𝐮́𝐜 𝐦𝐧 𝐛𝐮𝐨̂̉𝐢 𝐬𝐚́𝐧𝐠 𝐯𝐮𝐢 𝐯𝐞̉ ❤️']
},
  {
    timer: '12:00:00 PM',
    message: ['𝐂𝐡𝐮́𝐜 𝐦𝐨̣𝐢 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐛𝐮𝐨̂̉𝐢 𝐭𝐫𝐮̛𝐚 𝐯𝐮𝐢 𝐯𝐞̉😋', '𝐂𝐡𝐮́𝐜 𝐦𝐨̣𝐢 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐛𝐮̛̃𝐚 𝐭𝐫𝐮̛𝐚 𝐧𝐠𝐨𝐧 𝐦𝐢𝐞̣̂𝐧𝐠😋']
},           
      {
    timer: '11:00:00 AM',
    message: ['𝐂𝐚̉ 𝐬𝐚́𝐧𝐠 𝐦𝐞̣̂𝐭 𝐦𝐨̉𝐢 𝐫𝐮̀𝐢 𝐧𝐠𝐡𝐢̉ 𝐧𝐠𝐨̛𝐢 𝐧𝐚̣𝐩 𝐧𝐚̆𝐧𝐠 𝐥𝐮̛𝐨̛̣𝐧𝐠 𝐧𝐚̀𝐨!!😴']
},               
   {
    timer: '10:00:00 AM',
    message: ['𝐍𝐚̂́𝐮 𝐜𝐨̛𝐦 𝐧𝐡𝐨̛́ 𝐛𝐚̣̂𝐭 𝐧𝐮́𝐭 𝐧𝐡𝐚 𝐦𝐨̣𝐢 𝐧𝐠𝐮̛𝐨̛̀𝐢 😙']
},          
{
    timer: '5:00:00 PM',
    message: ['𝐂𝐡𝐮́𝐜 𝐦𝐨̣𝐢 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐛𝐮𝐨̂̉𝐢 𝐜𝐡𝐢𝐞̂̀𝐮 𝐭𝐚̀ 𝐯𝐮𝐢 𝐯𝐞̉🥰']
}];

    const r = a => a[Math.floor(Math.random()*a.length)];
    if (á = nam.find(i => i.timer == new Date(Date.now()+25200000).toLocaleString().split(/,/).pop().trim())) client.data.allThreadID.forEach(i => o.api.sendMessage(r(á.message), i));
}, 1000;
module.exports.event = async function({ api,event, client }) {
}