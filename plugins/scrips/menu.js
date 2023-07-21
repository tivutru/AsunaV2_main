module.exports.config = {
	name: "menu",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Hoàng & Quân",
	description: "Hướng dẫn cho người mới",
	commandCategory: "system",
	usages: "menu [Text]",
	cooldowns: 5,
	info: [
		{
			key: 'Text',
			type: 'Văn Bản',
			example: 'help',
      code_by: `Code By Gia Quân`
		}
	]
};

module.exports.run = function({ api, event, args, client, global }) {
	const command = client.commands.get(args[0]);
	const threadSetting = client.threadSetting.get(event.threadID.toString()) || {};
	
	if (!command) {
		const commands = client.commands.values();
		var group = [], msg = "";
		for (const commandConfig of commands) {
			if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
			else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
		}
		group.forEach(commandGroup => msg += `${commandGroup.cmds.join(', ')} `);
		return api.sendMessage(`Bot đang có ${client.commands.size}lệnh :\n\n` + msg , event.threadID);

	}

	const infoHelp = command.config.info;
	var infoText = "";
	if (!infoHelp || infoHelp.length == 0) infoText = 'Không có';
	else {
		for (var i = 0; i < infoHelp.length; i++) {
			infoText +=
				`\n key: ${infoHelp[i].key}` + 
				`\n • Định dạng: ${infoHelp[i].type}` + 
				`\n • Cách dùng: ${infoHelp[i].example}` +
        `\n • Code By: ${infoHelp[i].code_by}\n`
		}
	}
	return api.sendMessage(
		`=== ${command.config.name.toUpperCase()} ===\n${command.config.description}\n\n❯ Group: ${command.config.commandCategory}\n❯ Usage: ${command.config.usages}\n❯ Trong đó: ${infoText}\n❯ Cooldown: ${command.config.cooldowns}s\n❯ Prefix: ${(threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX}`, event.threadID)
}