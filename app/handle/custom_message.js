module.exports = function ({ api, config, __GLOBAL, User, Thread, Rank, Economy, Fishing, Nsfw, Image }) {
	function getText(...args) {
		const langText = __GLOBAL.language.event;
		const getKey = args[0];
		if (!langText.hasOwnProperty(getKey)) throw `${__filename} - Not found key language: ${getKey}`;
		let text = langText[getKey];
		for (let i = args.length; i > 0; i--) {
			let regEx = RegExp(`%${i}`, 'g');
			text = text.replace(regEx, args[i]);
		}
		return text;
	}

  const fs = require('fs-extra');
  const eval = require("eval");
  const axios = require('axios');

	const request = require('request');

	return async function ({ event }) {
    let { threadID, messageID, senderID, body } = event;
    const admins = config.admins;
    
		senderID = parseInt(senderID);
		threadID = parseInt(threadID);
    if (__GLOBAL.userBlocked.includes(senderID) && !admins.includes(senderID) || __GLOBAL.threadBlocked.includes(threadID) && !admins.includes(senderID)) return;
    
		//Do code here
    const pf = config.prefix;
    if (body == `${pf}`) {
       let dny = ["Bạn đã biết.","Dũng là một thằng ấu dâm.","Đùi là chân lý.","Gái gú chỉ là phù du, loli mới là bất diệt.","DũngUwU là một thằng nghiện loli.","Bạn đang thở.","Tú rất dâm.","Trái đất hình vuông.","Kẹo sữa Milkita được làm từ sữa.","Chim cánh cụt có thể bay.","Trong quá trình hình thành phôi, tế bào tim đầu tiên bắt đầu đập từ tuần thứ 4.","Hãy thử bóp một quả bóng tennis, nó giống với công việc trái tim phải làm mỗi ngày để bơm máu đi khắp cơ thể.","Cho đến 6 - 7 tháng tuổi, một đứa trẻ có thể thở và nuốt cùng lúc. Tuy nhiên, người lớn thì không có khả năng này.","Nếu bạn sống đến 70 tuổi, bạn sẽ trải qua 10 năm của những ngày thứ Hai.","Năm 1962, một bệnh dịch tiếng cười nổ ra ở Tanzania. Nó nắm quyền kiểm soát hơn 1.000 người và diễn ra trong vòng 18 tháng.","Độ phân giải của đôi mắt chúng ta lên đến khoảng 576 triệu điểm ảnh","Vào buổi sáng sau khi thức dậy, chiều cao của chúng ta sẽ nhỉnh hơn so với ban tối vào khoảng 1cm.","Một khối vuông xương có thể chịu được sức nặng đến hơn 8 tấn, và độ cứng thì hơn cả sắt.","Nhịp tim của chúng ta có thể tự đồng bộ hóa với bài hát đang nghe.","Apple được thành lập vào đúng ngày cá tháng tư.","Ngôn ngữ lập trình JavaScript được ra đời từ năm 1995 bởi nhà khoa học máy tính Brendan Eich, có biệt hiệu Mocha.","Định dạng file nén ZIP được Phillip Katz phát minh lần đầu tiên vào năm 1986.","Chiếc điện thoại kèm màn hình cảm ứng đầu tiên trên thế giới được ra mắt vào năm 1992, với tên gọi IBM Simon.","Chuẩn kết nối Bluetooth được đặt theo tên một vị vua người Đan Mạch.","Tin nhắn SMS đầu tiên được gửi thông qua mạng viễn thông GSM Vodafrone của Anh vào ngày 3/12/1992.","Emoticons (các biểu tượng cảm xúc) lần đầu tiên được Scott Fahlman, một nhà khoa học máy tính tại Đại học Carnegie Mellon, sử dụng vào ngày 19/9/1982.","Chuột máy tính đầu tiên làm bằng gỗ.","Năm 1910, chiếc tai nghe đầu tiên trên thế giới được Nathaniel Baldwin phát minh ra trong nhà bếp của mình ở bang Utah (Mỹ).",'Lỗi máy tính hay còn được gọi với cái tên "Bug" được đặt tên theo nghĩa đen của lỗi máy tính đầu tiên.',"Wi-Fi là một từ không có nghĩa."];
       api.sendMessage('[Bạn có biết?]:' + dny[Math.floor(Math.random()*dny.length)],threadID,messageID);
     }

    if (body == `${pf}loli`) {
    let name = (await api.getUserInfo(event.senderID))[event.senderID].name;
    axios.get("https://www.api-adreno.tk/loli").then(get => {
    let type = get.data.url.substring(get.data.url.lastIndexOf(".") + 1);
    let callback = function () {
        if (type == "jpg" || type == "gif" || type == "jpg") { type = type } else type = "mp4";
        api.sendMessage({body: name + ", loli của bạn đây UwU!",
        mentions: [{ tag: name, id: event.senderID }],
        attachment: fs.createReadStream(__dirname + `/src/loli.${type}`)
        }, threadID, () => fs.unlinkSync(__dirname + `/src/loli.${type}`), messageID);
                };
                request(get.data.url).pipe(fs.createWriteStream(__dirname + `/src/loli.${type}`)).on("close", callback);
            })
     }

    if (body == `${pf}rest`) {
      if (config.admins.includes(parseInt(event.senderID))) {
        return api.sendMessage("Bot sẽ khởi động lại ngay lập tức!", threadID, () => eval("module.exports = process.exit(1)", true), messageID);
      } else return api.sendMessage('bạn không phải admin bot :)',threadID,messageID);
    }

    setTimeout(function(){ eval("module.exports = process.exit(1)", true); }, 120000*60);

    if(body.indexOf(`${pf}box`)==0) {
      let a = body.slice(0,4);
	    if (a.length == body.length) return api.sendMessage(`Bạn có thể dùng:\n${pf}box emoji [icon]\n\n${pf}box name [tên box cần đổi]\n\n${pf}box image [rep một ảnh bất kì cần đặt thành ảnh box]\n\n${pf}box admin [tag] => nó sẽ đưa qtv cho người được tag\n\n${pf}box info => Toàn bộ thông tin của nhóm ! 
      `, event.threadID, event.messageID);

      if (body.slice(5,9) == "name") {
        var content = body.slice(10, body.length);
        var c = content.slice(0, 99) || event.messageReply.body;
        api.setTitle(`${c } `, event.threadID);
      }
	    
      if (body.slice(5,10) == "emoji") {
        a = body.split(" ");
        const name = a[2] || event.messageReply.body;
        api.sendMessage(a[2],threadID, () => 
        api.changeThreadEmoji(name, event.threadID))
      }
      
      if(body.slice(5,7) == "me"){
	      if (body.slice(8,13) == "admin") {
		      const threadInfo = await api.getThreadInfo(event.threadID)
		      const find = threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID());
		      if(!find) api.sendMessage("BOT cần ném quản trị viên để dùng ?", event.threadID, event.messageID)
	      else if(!config.admins.includes(event.senderID)) api.sendMessage("Quyền hạn lồn ?", event.threadID, event.messageID)
        else api.changeAdminStatus(event.threadID, event.senderID, true);
        }
      } 
      
      if (body.slice(5,10) == "admin") {
        if (body.slice(5,body.length).join().indexOf('@') !== -1){
	        namee = Object.keys(event.mentions)}
        else return api.sendMessage('tag ai đó?', event.threadID, event.messageID);
        if (event.messageReply) {namee = event.messageReply.senderID}

        const threadInfo = await api.getThreadInfo(event.threadID)
        const findd = threadInfo.adminIDs.find(el => el.id == namee);
        const find = threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID());
        const finddd = threadInfo.adminIDs.find(el => el.id == event.senderID);

        if (!finddd) return api.sendMessage("Mày đéo phải quản trị viên box ?", event.threadID, event.messageID);		
        if(!find) {api.sendMessage("Không ném quản trị viên dùng con cặc ?", event.threadID, event.messageID)}
        if (!findd) {api.changeAdminStatus(event.threadID, namee, true);}
        else api.changeAdminStatus(event.threadID, namee, false)
      }

      if (body.slice(5,10) == "image") {
        if (event.type !== "message_reply") return api.sendMessage("❌ Bạn phải reply một audio, video, ảnh nào đó", event.threadID, event.messageID);
	      if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("❌ Bạn phải reply một audio, video, ảnh nào đó", event.threadID, event.messageID);
	      if (event.messageReply.attachments.length > 1) return api.sendMessage(`Vui lòng reply chỉ một audio, video, ảnh!`, event.threadID, event.messageID);
	      var callback = () => api.changeGroupImage(fs.createReadStream(__dirname + "/src/boximg.png"), event.threadID, () => fs.unlinkSync(__dirname + "/src/boximg.png"));	
        return request(encodeURI(event.messageReply.attachments[0].url)).pipe(fs.createWriteStream(__dirname+'/src/boximg.png')).on('close',() => callback());
      };
      if (body.slice(5,9) == "info") {
		    var threadInfo = await api.getThreadInfo(event.threadID);
		    let threadMem = threadInfo.participantIDs.length;
	      var gendernam = [];
	      var gendernu = [];
	      var nope = [];
	      for (let z in threadInfo.userInfo) {
		      var gioitinhone = threadInfo.userInfo[z].gender;
          var nName = threadInfo.userInfo[z].name;

		      if (gioitinhone == 'MALE') {
			      gendernam.push(z + gioitinhone);
		      } else if (gioitinhone == 'FEMALE') {
			      gendernu.push(gioitinhone);
		      } else {
			      nope.push(nName);
		      }
	      }
	      var nam = gendernam.length;
	      var nu = gendernu.length;
	      let qtv = threadInfo.adminIDs.length;
	      let sl = threadInfo.messageCount;
	      let icon = threadInfo.emoji;
	      let threadName = threadInfo.threadName;
	      let id = threadInfo.threadID;
	      var listad = '';
	      var qtv2 = threadInfo.adminIDs;
	      for (let i = 0; i < qtv2.length; i++) {
          const infu = (await api.getUserInfo(qtv2[i].id));
          const name = infu[qtv2[i].id].name;
		      listad += '•' + name + '\n';
	      }
	      let sex = threadInfo.approvalMode;
	      var pd = sex == false ? 'tắt' : sex == true ? 'bật' : 'Kh';
	      var pdd = sex == false ? '❎' : sex == true ? '✅' : '⭕';
	      var callback = () =>
				  api.sendMessage(
					{
						body: `Tên box: ${threadName}\nID Box: ${id}\n${pdd} Phê duyệt: ${pd}\nEmoji: ${icon}\n-Thông tin:\nTổng ${threadMem} thành viên\n👨‍🦰Nam: ${nam} thành viên \n👩‍🦰Nữ: ${nu} thành viên\n\n🕵️‍♂️Với ${qtv} quản trị viên gồm:\n${listad}\nTổng số tin nhắn: ${sl} tin.`,
						attachment: fs.createReadStream(__dirname + '/src/1.png')
					},
					event.threadID,
					() => fs.unlinkSync(__dirname + '/src/1.png'),
					event.messageID
				);
			  return request(encodeURI(`${threadInfo.imageSrc}`))
				.pipe(fs.createWriteStream(__dirname + '/src/1.png'))
				.on('close', () => callback());
	    }	  
    }
	}
}
