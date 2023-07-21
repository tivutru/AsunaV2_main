module.exports.config = {
    name: "check",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Hoàng Quân",
    description: "check tương tác",
    commandCategory: "Tiện ích",
    usages: "checktt",
    cooldowns: 5,
    dependencies: [
        "fs-extra"
    ]
}
const path = __dirname + '/count-by-thread/';
const groupFilePath = path + 'group.json';

// Biến lưu trữ số lượng tin nhắn của bot
const countMess = {};

module.exports.onLoad = () => {
    const fs = require('fs');
    if (!fs.existsSync(path) || !fs.statSync(path).isDirectory()) {
        fs.mkdirSync(path, { recursive: true });
    }

    // Tạo tệp group.json nếu chưa tồn tại
    if (!fs.existsSync(groupFilePath) || fs.statSync(groupFilePath).isDirectory()) {
        fs.writeFileSync(groupFilePath, JSON.stringify({}, null, 4));
    }
}

module.exports.event = function ({ event, api, client }) {
    const { threadID, senderID } = event;
    if (!client.allThread.some(tid => tid == threadID)) return;
    const fs = require('fs');
    const groupData = JSON.parse(fs.readFileSync(groupFilePath)) || {};

    // Tạo thread trong tệp group.json nếu chưa tồn tại
    if (!groupData.hasOwnProperty(threadID)) {
        groupData[threadID] = {};
    }

    // Tăng số lượng tin nhắn của người gửi lên 1
    groupData[threadID][senderID] = (groupData[threadID][senderID] || 0) + 1;

    // Ghi dữ liệu mới vào tệp group.json
    fs.writeFileSync(groupFilePath, JSON.stringify(groupData, null, 4));

    // Tăng số lượng tin nhắn của bot lên 1
    if (senderID === api.getCurrentUserID()) {
        countMess[threadID] = (countMess[threadID] || 0) + 1;
    }
}

module.exports.run = async function ({ api, event, args, Users }) {
    const fs = require('fs');
    const { messageID, threadID, senderID, mentions } = event;
    const groupData = JSON.parse(fs.readFileSync(groupFilePath)) || {};

    if (args.length == 0) {
        return api.sendMessage(`Bạn có thể dùng:\n/check user\n/check all\n/check xephang\nBạn muốn sử dụng tag nào?`, threadID, messageID);
    }

    var storage = [];
    var msg = '';
    const query = args[0] ? args[0].toLowerCase() : '';

    if (query === 'all') {
        // Kiểm tra nếu threadID không tồn tại trong tệp group.json
        if (!groupData.hasOwnProperty(threadID)) {
            // Tạo thread trong tệp group.json nếu chưa tồn tại
            groupData[threadID] = {};
        }

        // Lấy thông tin của từng người dùng trong nhóm từ groupData
        const allThread = await api.getThreadInfo(threadID) || { participantIDs: [] };
        for (const id of allThread.participantIDs) {
            if (!groupData[threadID].hasOwnProperty(id)) {
                groupData[threadID][id] = 0;
            }
            const userInfo = await Users.getInfo(id);
            storage.push({ id, name: userInfo.name, count: groupData[threadID][id] });
        }

        storage.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

        const itemsPerPage = 10; // Số người dùng hiển thị trên mỗi trang
        const totalPages = Math.ceil(storage.length / itemsPerPage);
        const page = parseInt(args[1]) || 1; // Trang hiện tại, mặc định là 1

        let count = (page - 1) * itemsPerPage + 1;
        msg += '===CHECKTT===\n';
        for (let i = (page - 1) * itemsPerPage; i < page * itemsPerPage && i < storage.length; i++) {
            const user = storage[i];
            msg += `${count++}. ${user.name} - ${user.count} tin nhắn\n`;
        }
        msg += `Trang ${page}/${totalPages}`;
    } else if (query === 'xephang') {
        let mem = Object.keys(groupData[threadID]);
        let rank = [];
        for (let id of mem) {
            rank.push({
                id: id,
                count: groupData[threadID][id],
                name: (await Users.getInfo(id)).name
            });
        }

        // Thêm thông tin của bot vào xếp hạng từ countMess
        rank.push({
            id: api.getCurrentUserID(),
            count: countMess[threadID] || 0,
            name: "💠Bot"
        });

        rank.sort((a, b) => b.count - a.count);

        msg += '===XẾP HẠNG===\n';
        for (let i = 0; i < rank.length; i++) {
            msg += `${i + 1}. ${rank[i].name}: ${rank[i].count} tin nhắn\n`;
        }
    } else if (query === 'user') {
        let userID = senderID;
        if (Object.keys(mentions).length > 0) {
            userID = mentions[0];
        }

        // Kiểm tra nếu threadID không tồn tại trong tệp group.json
        if (!groupData.hasOwnProperty(threadID)) {
            // Tạo thread trong tệp group.json nếu chưa tồn tại
            groupData[threadID] = {};
            msg += 'Nhóm trò chuyện không tồn tại trong tệp!';
        } else {
            // Tìm thông tin của người dùng có id là userID trong nhóm
            const count = groupData[threadID][userID];
            if (count === undefined) {
                msg += 'Người dùng không tồn tại trong nhóm!';
            } else {
                const userInfo = await Users.getInfo(userID);
                msg += `${userID == senderID ? '💠Bạn' : userInfo.name} có ${count} tin nhắn trong nhóm`;
            }
        }
    }

    api.sendMessage(msg, threadID);
    return;
}
