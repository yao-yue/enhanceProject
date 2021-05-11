// let a = [111,[23,111,4],['aa','bb',['ccc','aa']],66]

// function flattenArray(array) {
//     if(!Array.isArray(array)) return;
//     return array.reduce((acc, curr) => {
//         return acc.concat(Array.isArray(curr)? flattenArray(curr) : curr)
//     },[])
// }


// function unique(array) {
//     if(!Array.isArray(array) || array.length <= 1) return

//     var result = []
//     array.forEach(item => {
//         if(result.indexOf(item) === -1) {
//             result.push(item)
//         }
//     })
//     return result
// }
// console.log(unique(flattenArray(a)))

// function getMaxCommonDivisor(a,b) {
//     //数据校验
//     if(typeof a !== 'number' || typeof b !== 'number') return

//     if(b === 0) return a
//     return getMaxCommonDivisor(b, a % b)
// }

// //最大公倍数
// function getMinCommonMutiple(a, b) {
//     return a * b /getMaxCommonDivisor(a, b)
// }

// console.log(getMinCommonMutiple(6, 9))


// function sum(...args) {
//     let result = args.reduce((acc, cur) => {
//         return acc + cur
//     }, 0)
//     let add = function (...args) {    
//         return args.reduce((acc, cur) => {
//             return acc + cur
//         }, result)
//     };
//     return add
// }


// console.log(sum(1, 2, 3)(2))
// sum(1,2,3)(2).valueOf()

let article = `Every single time you access a website, you leave tracks. Tracks that others can access. If you don't like the idea, find out what software can help you cover them.
Anti Tracks
Anti Tracks is a complete solution to protect your privacy and enhance your PC performance. With a simple click Anti Tracks securely erase your internet tracks, computer activities and programs history information stored in many hidden files on your computer.Anti Tracks support Internet Explorer, AOL, Netscape/Mozilla and Opera browsers. It also include more than 85 free plug-ins to extend erasing features to support popular programs such as ACDSee, Acrobat Reader, KaZaA, PowerDVD, WinZip, iMesh, Winamp and much more. Also you can easily schedule erasing tasks at specific time intervals or at Windows stat-up/ shutdown.To ensure maximum privacy protection Anti Tracks implements the US Department of Defense DOD 5220.22-M, Gutmann and NSA secure erasing methods, making any erased files unrecoverable even when using advanced recovery tools.
Free Download: http://www.deprice.com/antitracks.htm
East-Tec Eraser
East-Tec Eraser goes beyond U.S. Department of Defense standards for the permanent erasure of digital information and easily removes every trace of sensitive data from your computer.
Completely destroy information stored without your knowledge or approval: Internet history, Web pages and pictures from sites visited on the Internet, unwanted cookies, chatroom conversations, deleted e-mail messages, temporary files, the Windows swap file, the Recycle Bin, previously deleted files, valuable corporate trade secrets, Business plans, personal files, photos or confidential letters, etc.East-Tec Eraser 2005 offers full support for popular browsers (Internet Explorer, Netscape Navigator, America Online, MSN Explorer, Opera), for Peer2Peer applications (Kazaa, Kazaa Lite, iMesh, Napster, Morpheus, Direct Connect, Limewire, Shareaza, etc.), and for other popular programs such as Windows Media Player, RealPlayer, Yahoo Messenger, ICQ, etc. Eraser has an intuitive interface and wizards that guide you through all the necessary steps needed to protect your privacy and sensitive information.Other features include support for custom privacy needs, user-defined erasure methods, command-line parameters, integration with Windows Explorer, and password protection.
Free Download: http://www.deprice.com/eastteceraserstandard.htm
Ghostsurf Platinum
GhostSurf Platinum ensures your safety online by providing an anonymous, encrypted Internet connection, and GhostSurf stops spyware, eliminates ads and erases your tracks. GhostSurf lets you customize your privacy level in real-time to suit your surfing needs. A variety of options enable you to block personal information, mask your IP address, route your data through anonymous hubs and even encrypt your Internet connection. GhostSurf's Privacy Control Center allows you to see and block every piece of data that your computer emits over the Internet, preventing even your Internet Service Provider (ISP) from creating a profile on you.
Free Download: http://www.deprice.com/ghostsurfplatinum.htm
CyberScrub Pro
Sensitive data can easily fall into the wrong hands. And because Windows is not capable of deleting information beyond recovery, you are at risk!
Passwords, financial documents, even those "about last night" e-mails are fair game for the IT professional, computer technician or hacker.
CyberScrub allows you to purge, wipe and erase data with methods that far exceed US Department of Defense standards for file deletion (DOD 5220.22).
CyberScrub Erases:
* Selected Files/Folders beyond recovery
* Cookies
* Cache (Temporary Internet Files)
* All traces of Peer2Peer activity (16 popular apps)
* website History
* Chat Room Conversations, Instant Messages
* Pictures viewed
* Email & "previously deleted files"
* Recycle Bin, Recent Documents
* Swap and other "locked" files that contain sensi`
function findMostWord(article) {

    // 合法性判断
    if (!article) return;
   
    // 参数处理  这里的trim只是去除前后的空格，单词不区分大小写，都是同一个单词
    article = article.trim().toLowerCase();
    let wordList = article.match(/[a-z]+/g),
     visited = [],
     maxNum = 0,
     maxWord = "";
   
    article = " " + wordList.join("  ") + " ";
    // 遍历判断单词出现次数
    wordList.forEach(function (item) {
     if (visited.indexOf(item) < 0) {
       let word = new RegExp(" " + item + " ", "g"),//这里只能这样弄了
         num = article.match(word).length;
   
       if (num > maxNum) {  //有最大的就更新
         maxNum = num;
         maxWord = item;
       }
     }
    });
    return maxWord + "  " + maxNum;
}


// 再写一遍
function findMostWord2(article) {
    //参数校验
    if(!article) return 
    //参数处理
    article = article.trim().toLowerCase()

    let wordList = article.match(/[a-z]+/g),
    maxNum = 0,
    visited = [],
    maxWord = ''

    article = ' ' + wordList.join(' ') + ' '
    wordList.forEach(item => {
        let rule = new RegExp(' ' + item + ' ', 'g')
        let num = article.match(rule).length

        if(num > maxNum) {
            maxNum = num;
            maxWord = item;
        }
    })
    return maxWord + '  ' + maxNum 
}

console.log(findMostWord(article))
console.log(findMostWord2(article))