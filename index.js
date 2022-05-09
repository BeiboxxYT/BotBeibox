/*

- sasorizingod

ATT DA 2.5 ❗

+ BUTOES ✅
+ HEROKU ✅
+ CONSOLE NOVO ✅
+ MENU COM VERIFICADO ✅
+ VALEU GALERA ESPERO QUE GOSTEM ✅

// ❱❱ NODES MODULES ❰❰ */
const fs = require('fs') 
const { exec } = require('child_process')
const fetch = require('node-fetch')
const lolis = require('lolis.life')
const ffmpeg = require('fluent-ffmpeg')
const moment = require('moment-timezone')
const { removeBackgroundFromImageFile } = require('remove.bg')
const loli = new lolis()

//  ❱❱ ARQUIVOS SRC  ❰❰  
const setting = JSON.parse(fs.readFileSync('./src/dono.json'))
const welkom = JSON.parse(fs.readFileSync('./src/seguranca/welkom.json'))
const ban = JSON.parse(fs.readFileSync('./src/seguranca/banned.json')) 
const antilink = JSON.parse(fs.readFileSync('./src/seguranca/antilink.json'))
const { criador,figurinhas} = require('./src/seguranca/menu.js')

//  ❱❱ ARQUIVOS LIB ❰❰  
const { utils } = require('./arquivos/lib/utils')
const { webp2gifFile } = require("./arquivos/lib/gif.js")
const { recognize } = require('./arquivos/lib/ocr')
const { color, bgcolor } = require('./arquivos/lib/color')
const { fetchJson, fetchText } = require('./arquivos/lib/fetcher')
const { y2mateV, y2mateA } = require('./arquivos/lib/y2mate.js')

// ❱❱ FUNCOES // FUNCTIONS ❰❰  
const { getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./arquivos/lib/functions')

//  ❱❱ CONEXÃO DO WHATSAPP  ❰❰ 
const {WAConnection, MessageType , Presence , Mimetype, GroupSettingChange} = require('@adiwajshing/baileys')

// ❱❱  CONTATO DO DONO  ❰❰ 
const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n' 
            + 'FN:⸼ ࣪▪:SASORIZIN ׂ, ׅ∦⁩\n' // ❱❱ SEU NOME  ❰❰
            + 'ORG:©SASORIZIN ;\n' // ❱❱ NOME DO BOT ❰❰
            + 'TEL;type=CELL;type=VOICE;waid=5511978754479:+55 11 97875-4479\n'// ❱❱ SEU NÚMERO ❰❰
            + 'END:VCARD'
p = setting.p
blocked = []
tagBot = `*❱❱ ©SASORIZIN ❰❰*`

var { dono, dono2 ,nomeDonoh,nomeBot, grupoDono,  canalDono } = JSON.parse(fs.readFileSync('./src/dono.json'))

const nomeDono = nomeDonoh.toLowerCase();

//  ❱❱ FUNCTION HORAS  ❰❰  
function kyun(seconds){
  function pad(s){
return (s < 10 ? '0' : '') + s;
  }
var hours = Math.floor(seconds / (60*60));
var minutes = Math.floor(seconds % (60*60) / 60);
var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}
const time = moment.tz('America/Sao_Paulo').format('HH:mm:ss') 
const data = moment.tz('America/Sao_Paulo').format('DD/MM/YY')

//  ❱❱ CONEXÃO COM QRCODE ❰❰  
async function starts() {
const black = new WAConnection()
black.logger.level = 'warn'
console.log(banner.string)
black.on('qr', () => {
console.log(color('❱','white'), color('❗','red'), color('❰','white'), color(' Escaneie o QrCode Com o Celular Do Bot'))})
fs.existsSync('./BarBar.json') && black.loadAuthInfo('./BarBar.json')
black.on('connecting', () => {
start('2', ' ')})
black.on('open', () => {
  success('2', 'Bot do sasorizin bot Conectado ✅')})
black.sendMessage(`${dono}@s.whatsapp.net`,`OI SASORIZIN 😳`, MessageType.text)
await black.connect({timeoutMs: 30*1000})
fs.writeFileSync('./BarBar.json', JSON.stringify(black.base64EncodedAuthInfo(), null, '\t')) 

//  ❱❱  FUNÇÃO DO WELCOME / BEM VINDO  ❰❰  
	black.on('group-participants-update', async (anu) => {
if (!welkom.includes(anu.jid)) return
try {
const mdata = await black.groupMetadata(anu.jid)
console.log(anu) 

//  ❱❱ ENTROU NO GRUPO  ❰❰ 
if (anu.action == 'add') {
num = anu.participants[0]
try {
ppimg = await black.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
teks = `*❱❱❗ MEMBRO NOVO ❗❰❰*\n\n▻ @${num.split('@')[0]} Seja Bem Vindo  Ao Grupo ${groupName}\n\n*▻❗ Se Apresente Com :* \n\n▻ Foto : \n▻ Sexo :\n▻ Idade :\n▻ Nome :\n▻ Estado : \n\n*▻ Para As Regras Do Grupo :*\n\n▻ Digite :  Regras`
let buff = await getBuffer(ppimg)
black.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})

//  ❱❱ SAIU DO GRUPO  ❰❰  
} else if (anu.action == 'remove') {
num = anu.participants[0]
try {
ppimg = await black.getProfilePicture(`${num.split("@")[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
teks = `*❱❱ O Membro  @${num.split('@')[0]} Abandonou o Nosso Grupo 😖 ❰❰*`
let buff = await getBuffer(ppimg)
black.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
}
} catch (e) {
console.log('Error : %s', color(e, 'red'))}})

//  ❱❱ LISTA DE BLOQUEADOS ❰❰  
	black.on('CB:Blocklist', json => {
if (blocked.length > 2) return
for (let i of json[1].blocklist) {
blocked.push(i.replace('c.us','s.whatsapp.net'))}})
	
//  ❱❱ FUNCÃO DA BATERIA ❰❰  
black.on('CB:action,,battery', json => {
global.batteryLevelStr = json[2][0][1].value
global.batterylevel = parseInt(batteryLevelStr)
baterai = batterylevel
if (json[2][0][1].live == 'true') charging = true
if (json[2][0][1].live == 'false') charging = false})
global.p
global.batrei = global.batrei ? global.batrei : []
black.on('CB:action,,battery', json => {
const batteryLevelStr = json[2][0][1].value
const batterylevel = parseInt(batteryLevelStr)
global.batrei.push(batterylevel)}) 

//  ❱❱ TIME SLEEP ❰❰  
const sleep = async (ms) => {
return new Promise(resolve => setTimeout(resolve, ms))}
	    
//  ❱❱ LINGUAGEM ❰❰  
black.on('chat-update', async (mek) => {
try {
if (!mek.hasNewMessage) return
mek = mek.messages.all()[0]
if (!mek.message) return
if (mek.key && mek.key.remoteJid == 'status@broadcast') return
if (!mek.key.fromMe)
global.p
global.blocked 

//  ❱❱ CONSOLE TYPE ❰❰  
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const apiKey = setting.apiKey 
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType 
const type = Object.keys(mek.message)[0]
black.chatRead(from)

//  ❱❱ AUTO RESPONDER DO BLACK ❰❰  
selectedButton = (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : ''
body = (type === 'conversation' && mek.message.conversation.startsWith(p)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(p) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(p) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(p) ? mek.message.extendedTextMessage.text : (mek.message.listResponseMessage && mek.message.listResponseMessage.singleSelectReply.selectedRowId.startsWith(p) && mek.message.listResponseMessage.singleSelectReply.selectedRowId) ? mek.message.listResponseMessage.singleSelectReply.selectedRowId : (mek.message.buttonsResponseMessage && mek.message.buttonsResponseMessage.selectedButtonId.startsWith(p) && mek.message.buttonsResponseMessage.selectedButtonId) ? mek.message.buttonsResponseMessage.selectedButtonId : ''
budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : (type == 'buttonsMessage') && mek.message.buttonsMessage.text ? mek.message.buttonsMessage.text : ''

//  ❱❱ CONST DE STRING ❰❰  
const comando = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const totalchat = await black.chats.all()
const botNumber = black.user.jid 
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const isCmd = body.startsWith(p)
chats = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
const arg = chats.slice(command.length + 2, chats.length)

//  ❱❱ MENSSAGEM DO BLACK ❰❰  	
mess = {
plaz: `*❱❱‼ Modo certo : ${p}play rap goku black ‼❰❰*`,
banido: ' *❱❱ Você Está Banido, Não Pode Usar Comandos ❰❰*',
wait: '*❱❱ ⌛Aguarde...Estou fazendo ⌛❰❰*',
success: '*❱❱ 🏴‍☠️ Sucesso 🏴‍☠️❰❰*',
group: `*❱❱ ❕Esse Comando So Fuciona Em Grupo  ❕ ❰❰*\n\n*❱❱  :🏴‍☠️Grupo Ofical 🏴‍☠️ :❰❰*\n\n${grupoDono}`,
black:'*ESSE COMANDO N FUNCIONA COM QUEM TEM FIMOSE* 🤓*',
admin: '*❱❱  ❕ Comando So Para Administradores  ❕ ❰❰*',
Badmin: '*❱❱❗Não Sou  Administrador❗❰❰*'}

//  ❱❱ LINGUAGEM DE GRUPO ❰❰  
const isGroup = from.endsWith('@g.us')
const sender = isGroup ? mek.participant : mek.key.remoteJid
const groupMetadata = isGroup ? await black.groupMetadata(from): ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.jid : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const groupDesc = isGroup ? groupMetadata.desc : ''
const isGroupAdmins = groupAdmins.includes(sender) || false
const isWelkom = isGroup ? welkom.includes(from) : false
const isAntiLink = isGroup ? antilink.includes(from) : false
const isOwner = sender.includes(dono) ? sender.includes(dono):sender.includes(dono2)
const isBan = ban.includes(sender)
pushname = black.contacts[sender] != undefined ? black.contacts[sender].vname || black.contacts[sender].notify : undefined		

const tescuk = ["0@s.whatsapp.net"]
const q = args.join(' ')
const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))}

const enviar = (teks) => {
black.sendMessage(from, teks, text, {quoted:mek})}

const sendMess = (hehe, teks) => {
black.sendMessage(hehe, teks, text)}

const costum = (pesan, tipe, target, target2) => {
black.sendMessage(from, pesan, tipe, {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` }}})}

const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? black.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : black.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})}

//  ❱❱ SELO VERIFICADO ❰❰  	
var selo = `${Math.floor(Math.random() * 3)+1}`
const blx = {"key": {"fromMe": false,"participant":"0@s.whatsapp.net", "remoteJid": "5511978754479@g.us" }, "message": {orderMessage: {itemCount: 15,status: 4, thumbnail: fs.readFileSync(`./src/verificado/v` + selo + `.jpg`) ,message: `Nick : ${pushname}`,surface: 100, sellerJid: '0@s.whatsapp.net'}}}

//  ❱❱ TIPO MENSAGEM || CONSOLE ||  TERMUX ❰❰  
colors = ['red','white','black','blue','yellow','green','orange','purple','violet']
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

// ❱❱ COMANDO NO PV ❰❰  
if (!isGroup && isCmd) console.log( ' ╭▻ ❱❱ ', color('❗COMANDO NO PV❗','white'),'❰❰', '◅⏤⏤','\n','⏐▻',color('NICK :','purple'),color(pushname,'green'),'\n','⏐▻',color('COMANDO :','purple'),color(command,'green'),'\n','⏐▻',color('HORARIO :','purple'), color(time,'green'),'\n',`╰⏤⏤▻ ❱❱ ${nomeBot} ❰❰◅⏤⏤\n`)

// ❱❱ MENSAGEM NO  PV ❰❰  
if (!isGroup && !isCmd) console.log( ' ╭▻ ❱❱ ', color('❗MENSAGEM NO PV❗','white'),'❰❰', '◅⏤⏤','\n','⏐▻',color('NICK :','purple'),color(pushname,'green'),'\n','⏐▻',color('TIPO :','purple'),color('Mensagem','green'),'\n','⏐▻',color('HORARIO :','purple'), color(time,'green'),'\n',`╰⏤⏤▻ ❱❱ ${nomeBot} ❰❰◅⏤⏤\n`)

//  ❱❱ COMANDO EM GRUPO ❰❰  			
if (isCmd && isGroup) console.log( ' ╭▻ ❱❱ ', color('❗COMANDO EM GRUPO❗','white'),'❰❰', '◅⏤⏤','\n','⏐▻',color('❱ GRUPO :','purple'), color(groupName,'green'),'\n','⏐▻',color('❱ NICK :','purple'),color(pushname,'green'),'\n','⏐▻',color('❱ COMANDO :','purple'),color(command,'green'),'\n','⏐▻',color('❱ HORARIO :','purple'),color(time,'green'),'\n',`╰⏤⏤▻ ❱❱ ${nomeBot} ❰❰◅⏤⏤\n`)

//  ❱❱ MENSAGEN EM GRUPO ❰❰  			
if (!isCmd && isGroup) console.log( ' ╭▻ ❱❱ ', color('❗MENSAGEM EM GRUPO❗','white'),'❰❰', '◅⏤⏤','\n','⏐▻',color('❱ GRUPO :','purple'), color(groupName,'green'),'\n','⏐▻',color('❱ NICK :','purple'),color(pushname,'green'),'\n','⏐▻',color('❱ TIPO :','purple'),color('Mensagem ','green'),'\n','⏐▻',color('❱ HORARIO :','purple'),color(time,'green'),'\n',`╰⏤⏤▻ ❱❱ ${nomeBot} ❰❰◅⏤⏤\n`)

//  ❱❱ USUARIO BLOQUEADO ❰❰
if (isCmd && isBan) {
enviar(mess.banido)
return console.log(color('*❱❱ ❗USUARIO BANIDO❗ ❰❰* ','\n',color('❱ NICK :','purple'),color(pushname,'green'),'\n',color('❱ COMANDO :','purple'),color(command,'green'),'\n',color('❱ HORARIO :','purple'),color(time,'green'),'\n'))}

// ❱❱ FUNCAO DE  ANTILINK  ❰❰
if (budy.match(/(https:\/\/chat.whatsapp.com)/gi) ||
(budy.includes("https://"))|| (budy.includes("http://")) ||
(budy.includes("//youtube")) || (budy.includes("TED ou PIX")) ||
(budy.includes("www.")) || (budy.includes("wa.me")) ||
(budy.includes("instagram")) || (budy.includes("tiktok")) || 
(budy.includes("s.kawai")) || (budy.includes(".com"))) {
if (!isGroup) return
if (!isAntiLink) return
if(isOwner) return (`*❱❱ Que Isso Mestre ?? ❰❰*`) 
if (isGroupAdmins) return enviar(`*❱❱❗ ${pushname} você é admin por isso não vou te banir ❗❰❰*`)
black.updatePresence(from, Presence.composing)
var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
enviar(`*❱❱❗  LINK  DETECTADO ❗ ❰❰*\n\n*❱❱ Membro ${pushname}  quebrou as regras do grupo por isso ele será expulso ❰❰*`)
setTimeout( () => {  
black.groupRemove(from, [Kick]).catch((e) => {enviar(`*ERROR:* ${e}`)}) 
}, 1000)
setTimeout( () => {
}, 0)
}

gravando = Presence.recording;
escrevendo = Presence.composing;
digitando = Presence.composing;
online = Presence.available;
pausar = Presence.paused
switch(command) {
/* ❱❱ COMANDOS COMEÇA A PARTIR DAQUI ❰❰

~> 

// ❱❱ MENU COM BOTAO ❰❰*/
case 'menuproibido':
enviar('*❱❱ Abrindo Menu.. ❰❰*')
buttons = [
  {buttonId: `${p}adm`,buttonText: {displayText: `${p} ADMIN ${p}`},type:1},
  {buttonId: `${p}stikk`,buttonText: {displayText: `${p}help ${p}`},type:1},
  {buttonId: `${p}criador`,buttonText: {displayText: `${p} CRIADOR ${p}`},type:1}
  ]
pastaFoto = (await black.prepareMessageMedia(fs.readFileSync(`./src/bot1.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./src/bot2.jpg`)})).imageMessage

textoVisivel = `Menu Aberto Por ${pushname}`

buttonsMessage = {
contentText: textoVisivel,
footerText: `${nomeBot}`, imageMessage: pastaFoto,
buttons: buttons,
headerType: 4
}
prep = await black.prepareMessageFromContent(from,{buttonsMessage},{quoted: blx})
black.relayWAMessage(prep)
break 
/* ❱❱ FIM DO MENU COM BOTAO  ❰❰

~>

// ❱❱ CEMECO DO BOTAO REGRAS ❰❰*/
case 'regras':
buttons = [
 {buttonId: `${p}nick`,buttonText: {displayText: `${p} NICK ${p}`},type:1}
,{buttonId: `${p}infobot`,buttonText: {displayText: `${p} INFOBOT ${p}`},type:1}
,{buttonId: `${p}perfil`,buttonText: {displayText: `${p} PERFIL ${p}`},type:1}
]
imageMsg = (await black.prepareMessageMedia(fs.readFileSync(`./src/bot2.jpg`), 'imageMessage',{thumbnail:null})).imageMessage

lzmodsdominabb = `
 ╭▻ *❱❱❗${groupName} ❗❰❰*
 ⏐▻ *Admin :* ${groupAdmins.length}
 ⏐▻ *Membros :* ${groupMembers.length}
 ╰⏤⏤▻ *❱❱ DESCRICAO ❰❰* ◅⏤⏤
 
 ${groupDesc}`

buttonsMessage = {
contentText: lzmodsdominabb,
footerText:`${nomeBot}`, imageMessage: imageMsg,
buttons: buttons,
headerType: 4
}
prep = await black.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
black.relayWAMessage(prep)
break

case 'perfil':
enviar('*❱❱ Enviando Perfil.... ❰❰*')
black.updatePresence(from,Presence.composing)
try {
ppimg = await black.getProfilePicture(`${sender.split('@')[0]}`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
blc = ` 
╭▻ *❱❱ ❗ PERFIL ❗ ❰❰*
⏐▻ Grupo : ${groupName}
⏐▻ Nick : ${pushname}
╰⏤⏤▻ *❱❱ ©${nomeBot} ❰❰* ◅⏤⏤`
monk = await getBuffer(ppimg)
black.sendMessage(from,monk,image,{quoted:blx,thumbnail:null,caption:blc})
break

case 'nukechats':
if (!isOwner) return enviar ('*ESSE COMANDO N FUNCIONA COM QUEM TEM FIMOSE* 🤓*')
anu = await black.chats.all()
list_chat = await black.chats.all()
for (let chat of list_chat) {
black.modifyChat(chat.jid, "delete", {includeStarred: false})
}
enviar("chats nukados por sasorizin ️")
break

case 'criador':
black.updatePresence(from, Presence.composing)
enviar(`❗INFO DO BOT❗`)
setTimeout( () => {
black.sendMessage(from,`≑ ⇢Dono: wa.me/${dono.split('@')[0]}`,text)
}, 1000)
setTimeout( () => {
black.sendMessage(from,`≑ ⇢Criador: wa.me/${dono2.split('@')[0]}`,text)
}, 1500)
setTimeout( () => {
black.sendMessage(from,`≑ ⇢Grupo: ${grupoDono}`,text)
}, 2000)
setTimeout( () => {
black.sendMessage(from,`≑ ⇢Canal: ${canalDono}`,text)
}, 2500)
break

case 'nick':
niki = {
text: `@${sender.split('@')[0]}`,
contextInfo: {mentionedJid:[sender]}}
black.sendMessage(from,niki,text,{quoted:mek})
break
/* ❱❱ FIM DO BOTAO REGRAS  ❰❰

~>

// ❱❱ COMECO DOS COMANDO DE ADMIN ❰❰*/
case 'menupribido1':
enviar('*❱❱ Abrindo Menu Admin.. ❰❰*')
buttons = [
  {buttonId: `${p}antilink`,buttonText: {displayText: `${p} ANTILINK ${p}`},type:1},
  {buttonId: `${p}welcome`,buttonText: {displayText: `${p} WELCOME ${p}`},type:1},
  {buttonId: `${p}marcar`,buttonText:{displayText: `${p} MARCAR ${p}`},type:1}
  ]
pastaFoto = (await black.prepareMessageMedia(fs.readFileSync(`./src/bot3.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./src/bot2.jpg`)})).imageMessage

textoVisivel = `Menu Dos Admins`

buttonsMessage = {
  contentText: textoVisivel,footerText: `${nomeBot}`, imageMessage: pastaFoto,buttons: buttons,headerType: 4
  }
prep = await black.prepareMessageFromContent(from,{buttonsMessage},{quoted: blx})
black.relayWAMessage(prep)
break

case 'spam':
if (!isGroupAdmins) return enviar ('🖐️só quem tem pau grande pode usar esse comando !')
if (!isGroup) return reply("\n\n  [black]  Esse comando só funciona em grupos.  \n\n")
// if (!isBotGroupAdmins)
black.groupSettingChange(from, GroupSettingChange.messageSend, true)
black.groupUpdateSubject(from, " .️‼️ SPAM AGORA ‼️.‼️‼️‼️‼️️ ")
var group = await black.groupMetadata(from)
var member = group["participants"]
var mem = []
member.map(async (adm) => {
mem.push(adm.id.replace("c.us", "s.whatsapp.net"));
})
var optionshidetag = {
text: ' ‼️ ATENÇÃO TODOS | FIQUEM ATIVOS | ATAQUE AGORA ‼️ ',
contextInfo: { mentionedJid: mem },
quoted: mek,
}
black.sendMessage(from, optionshidetag, text)
break;

case 'divulgacao':
if (!isGroupAdmins) return enviar ('🖐️só quem tem pau grande pode usar esse comando !')
if (!isGroup) return reply("\n\n  [black]  Esse comando só funciona em grupos.  \n\n")
// if (!isBotGroupAdmins)
black.groupSettingChange(from, GroupSettingChange.messageSend, true)
black.groupUpdateSubject(from, " .️‼🤪️ DIVULGAÇÃO AGORA 🤪‼️.‼️‼️‼️‼️‼️️ ")
var group = await black.groupMetadata(from)
var member = group["participants"]
var mem = []
member.map(async (adm) => {
mem.push(adm.id.replace("c.us", "s.whatsapp.net"));
})
var optionshidetag = {
text: ' ‼️ ATENÇÃO TODOS | FIQUEM ATIVOS | ATAQUE AGORA ‼️ ',
contextInfo: { mentionedJid: mem },
quoted: mek,
}
black.sendMessage(from, optionshidetag, text)
break;

case 'autospam':
enviar('*CARREGANDO MENU DE SPAM*‼️')
buttons = [
  {buttonId: `${p}spamenviar`,buttonText: {displayText: `X - ATK SPAM`,},type:1},
  {buttonId: `${p}atk`,buttonText: {displayText: ` X - ATK TRAVAS`,},type:1},
  {buttonId: `${p}alvo2`,buttonText: {displayText: ` X - PROXIMO ALVO/ACABOU`,},type:1},
  
  ]
pastaFoto = (await black.prepareMessageMedia(fs.readFileSync(`./src/bot1.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./src/bot2.jpg`)})).imageMessage

textoVisivel = `▪️Mᥱᥒᥙ | C᥆ᥒ᥉᥆ᥣᥱ▪️



  ♨️  .subir
  ~ Subir o chat.
  
  ♨️  .blockspam
  ~ Denuncia o contato da pessoa.

  ♨️  .hidetag [MSG]
  ~ Subir o chat.

  ♨️  .tm [MSG]
  ~ Mandar msg pra todas as conversas
  
  ♨️  .criador
  ~ contato do criador`

buttonsMessage = {
contentText: textoVisivel,
footerText: `${nomeBot}`, imageMessage: pastaFoto,
buttons: buttons,
headerType: 4
}
prep = await black.prepareMessageFromContent(from,{buttonsMessage},{quoted: blx})
black.relayWAMessage(prep)
break

case 'help':
enviar('MENU ADMINS ABRINDO AGUARDE...')
buttons = [
  {buttonId: `${p}autospam`,buttonText: {displayText: `${p} AUTOSPAM ${p}`},type:1},
  {buttonId: `${p}adm`,buttonText: {displayText: `${p} ADMINS ${p}`},type:1},
  {buttonId: `${p}teste2`,buttonText:{displayText: `${p} NOME GP ${p}`},type:1}
  ]
pastaFoto = (await black.prepareMessageMedia(fs.readFileSync(`./src/bot3.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./src/bot2.jpg`)})).imageMessage

textoVisivel = `Menu Dos Admins`

buttonsMessage = {
  contentText: textoVisivel,footerText: `${nomeBot}`, imageMessage: pastaFoto,buttons: buttons,headerType: 4
  }
prep = await black.prepareMessageFromContent(from,{buttonsMessage},{quoted: blx})
black.relayWAMessage(prep)
break

case 'delvip':
if (!isGroup) return enviar(mess.group)
if (!isOwner) return enviar(mess.black)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
pru = '.\n'
for (let _ of mentioned) {
pru += `@${_.split('@')[0]}\n`
}
premium.splice(`${mentioned}`)
fs.writeFileSync('./arquivos/database/vip.json', JSON.stringify(premium))
vip = `❎Lista vip limpa com sucesso❎`
mentions(`${vip}`, mentioned, true)   
break

case 'alvo2':
buttons = [
  {buttonId: `${p}cabo2`,buttonText: {displayText: `X - PROXIMO ALVO`,},type:1},
]
pastaFoto = (await black.prepareMessageMedia(fs.readFileSync(`./src/bot1.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./src/help.jpg`)})).imageMessage

textoVisivel = `\n\n[ ♨️ ] PRONTO VOCÊ MARCOU ATAQUE NO ${body.slice(7)}\n\nDESEJA DIZER AOS MEMBROS QUE TEM PROXIMO ALVO OU ACABOU?`

buttonsMessage = {
contentText: textoVisivel,
footerText: `${nomeBot}`, imageMessage: pastaFoto,
buttons: buttons,
headerType: 4
}
prep = await black.prepareMessageFromContent(from,{buttonsMessage},{quoted: blx})
black.relayWAMessage(prep)
break

case 'cabo2':
if (!isOwner) return enviar(mess.black)
anu = await black.chats.all()
bahh = black.chats.array.filter(v => v.jid.endsWith('g.us'))
bahhh = black.chats.array.filter(v => v.jid.endsWith('s.whatsapp.net'))
if (isMedia && !info.message.videoMessage || isQuotedImage) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.extendedTextMessage.contextInfo : info
buff = await black.downloadMediaMessage(encmedia)
for (i = 0; i < bahh.length; i++) {
black.sendMessage(bahh[i].jid, buff, image, {caption: `[ TRANSMIÇÃO DE MY DONO ]\n\n${body.slice(16)}`})
}
reply(`transmição foi enviada a ${bahh.length} grupos`)
} else {
for (i = 0; i < bahh.length; i++) {
sendMess(bahh[i].jid, `\n\n✅  •  ALVO DERRUBADO COM SUCESSO! NÓS É PICA SIM OU CLARO? VAMO Q VAMOOO  ✨🔥\n\n️`)
}
}
break

case 'blockspam':
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
black.blockUser(from, 'add')
black.blockUser(from, 'remove')
break

case 'teste2':
buttons = [
    {buttonId: `${p}spam`,buttonText: {displayText: `${p} X - MUDAR  NOME PARA SPAM AGORA ${p}`},type:1},
     {buttonId: `${p}divulgacao`,buttonText: {displayText: `${p} X - MUDAR NOME PARA DIVULGAÇÃO AGORA ${p}`},type:1},
  ]
pastaFoto = (await black.prepareMessageMedia(fs.readFileSync(`./src/bot1.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./src/bot2.jpg`)})).imageMessage

textoVisivel = `MENU NOMES`

buttonsMessage = {
contentText: textoVisivel,
footerText: `${nomeBot}`, imageMessage: pastaFoto,
buttons: buttons,
headerType: 4
}
prep = await black.prepareMessageFromContent(from,{buttonsMessage},{quoted: blx})
black.relayWAMessage(prep)
break

case 'removeu':
if (!isOwner) return enviar(mess.black)
anu = await black.chats.all()
bahh = black.chats.array.filter(v => v.jid.endsWith('g.us'))
bahhh = black.chats.array.filter(v => v.jid.endsWith('s.whatsapp.net'))
if (isMedia && !info.message.videoMessage || isQuotedImage) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.extendedTextMessage.contextInfo : info
buff = await black.downloadMediaMessage(encmedia)
for (i = 0; i < bahh.length; i++) {
black.sendMessage(bahh[i].jid, buff, image, {caption: `[ TRANSMIÇÃO DE MY DONO ]\n\n${body.slice(16)}`})
}
enviar(`transmição foi enviada a ${bahh.length} grupos`)
} else {
for (i = 0; i < bahh.length; i++) {
sendMess(bahh[i].jid, `removeu você`)
}
}
break;

case 'vip': // Menu de ajuda
black.sendMessage(from, `


  💠 𝐕𝐈𝐏 𝐃𝐎 𝐁𝐎𝐓 💠

∙SE CASO QUEIRA COMPRAR ESSE BOT : R$20,00

∙SE QUISER QUE EU FAÇA UM BOT PARA VC : R$30,00

∙MEU NUMERO SE QUISER COMPRAR ME CHAME↴

🔹 ️WA.me//5511978754479 

🔹️ WA.me//5521976114449

❖ PAGAMENTO VIA : PIX ❖

  `, MessageType.text)
break

case 'gxxgks':
case 'hzhs':
case 'ysyd':
case 'shsh':
case 'zydy': // Trocar a descrição do grupo para o de sua escolha
if (args.length < 1) return reply('\n\n Envie qual descrição você quer seguida do comando. !\n\n Exemplo: .descricao <DESC> \n\n')
if (!isGroup) return reply("\n  👑  SASORIZIN diz:  Esse comando só funciona em grupos! \n")
black.groupUpdateDescription(from, `${body.slice(11)}`)
break;

case 'atk':
if (!isOwner) return enviar(mess.black)
if (args.length < 1) return enviar('\n\n\nPR FAVOR INSIRA O NUMERO DO ALVO QUE QUER MARCAR SPAM\n\n\n\n\n.atk 559999\n\nNUMERO TUDO JUNTO SEM "-" "+"')
anu = await black.chats.all()
bahh = black.chats.array.filter(v => v.jid.endsWith('g.us'))
bahhh = black.chats.array.filter(v => v.jid.endsWith('s.whatsapp.net'))
if (isMedia && !info.message.videoMessage || isQuotedImage) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.extendedTextMessage.contextInfo : info
buff = await black.downloadMediaMessage(encmedia)
for (i = 0; i < bahh.length; i++) {
black.sendMessage(bahh[i].jid, buff, image, {caption: `[ TRANSMIÇÃO DE MY DONO ]\n\n${body.slice(16)}`})
}
enviar(`transmição foi enviada a ${bahh.length} grupos`)
} else {
for (i = 0; i < bahh.length; i++) {
sendMess(bahh[i].jid, `\n\n‼️♨️       ATAQUE de TRAVAS       ♨️‼️

  ♨️ ⟩⟩      BORA DERRUBAR ESSE RANDOLA TROPA, RAJEM NO MÍNIMO 1K DE TRAVAS NELE.      

  ⟠ 1️⃣.: api.whatsapp.com/send/?phone=${body.slice(5)}`)
}
}
case 'atk':
buttons = [
  {buttonId: `${p}removeu`,buttonText: {displayText: `ENVIAR "REMOVEU VOCÊ" EM TUDO `,},type:1},
]
pastaFoto = (await black.prepareMessageMedia(fs.readFileSync(`./src/bot1.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./src/bot2.jpg`)})).imageMessage

textoVisivel = `\n\n[ ♨️ ] PRONTO VOCÊ MARCOU NO: ${body.slice(12)}\n\n\nDESEJA CHAMAR A ATENÇÃO DOS MEMBROS? SE SIM CLIQUE NO BOTÃO ABAIXO PARA ENVIAR REMOVEU EM TODOS OS GRUPOS\n\n `

buttonsMessage = {
contentText: textoVisivel,
footerText: `${nomeBot}`, imageMessage: pastaFoto,
buttons: buttons,
headerType: 4
}
prep = await black.prepareMessageFromContent(from,{buttonsMessage},{quoted: blx})
black.relayWAMessage(prep)
break

case 'spamenviar':
if (!isOwner) return enviar(mess.black)
if (args.length < 1) return enviar('\n\n\nPR FAVOR INSIRA O NUMERO DO ALVO QUE QUER MARCAR SPAM\n\n\n\n\n.spamenviar 559999\n\nNUMERO TUDO JUNTO SEM "-" "+"')
anu = await black.chats.all()
bahh = black.chats.array.filter(v => v.jid.endsWith('g.us'))
bahhh = black.chats.array.filter(v => v.jid.endsWith('s.whatsapp.net'))
if (isMedia && !info.message.videoMessage || isQuotedImage) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.extendedTextMessage.contextInfo : info
buff = await black.downloadMediaMessage(encmedia)
for (i = 0; i < bahh.length; i++) {
black.sendMessage(bahh[i].jid, buff, image, {caption: `[ TRANSMIÇÃO DE MY DONO ]\n\n${body.slice(16)}`})
}
enviar(`transmição foi enviada a ${bahh.length} grupos`)
} else {
for (i = 0; i < bahh.length; i++) {
sendMess(bahh[i].jid, `\n\n‼️♨️       ATAQUE de DENUNCIA       ♨️‼️

  ✅ ⟩⟩      ENVIE UMA MENSAGEM PARA CADA ALVO, DENUNCIE SOMENTE 1 VEZ E DEPOIS DE BLOCK.      

  ⟠ 1️⃣.: api.whatsapp.com/send/?phone=${body.slice(12)}`)
}
}
case 'spammenu':
buttons = [
  {buttonId: `${p}removeu`,buttonText: {displayText: `ENVIAR "REMOVEU VOCÊ" EM TUDO `,},type:1},
]
pastaFoto = (await black.prepareMessageMedia(fs.readFileSync(`./src/bot1.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./src/bot2.jpg`)})).imageMessage

textoVisivel = `\n\n[ ♨️ ] PRONTO VOCÊ MARCOU NO: ${body.slice(12)}\n\n\nDESEJA CHAMAR A ATENÇÃO DOS MEMBROS? SE SIM CLIQUE NO BOTÃO ABAIXO PARA ENVIAR REMOVEU EM TODOS OS GRUPOS\n\n `

buttonsMessage = {
contentText: textoVisivel,
footerText: `${nomeBot}`, imageMessage: pastaFoto,
buttons: buttons,
headerType: 4
}
prep = await black.prepareMessageFromContent(from,{buttonsMessage},{quoted: blx})
black.relayWAMessage(prep)
break

case 'alvo1':
buttons = [
  {buttonId: `${p}cabo1`,buttonText: {displayText: `X - ENVIAR QUE O ATK DE ACABOU`,},type:1},
]
pastaFoto = (await black.prepareMessageMedia(fs.readFileSync(`./src/bot1.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./src/help.jpg`)})).imageMessage

textoVisivel = `\n\n[ ♨️ ] PRONTO VOCÊ MARCOU ATAQUE NO ${body.slice(7)}\n\nDESEJA DIZER AOS MEMBROS QUE O ATAQUE ACABOU?`

buttonsMessage = {
contentText: textoVisivel,
footerText: `${nomeBot}`, imageMessage: pastaFoto,
buttons: buttons,
headerType: 4
}
prep = await black.prepareMessageFromContent(from,{buttonsMessage},{quoted: blx})
black.relayWAMessage(prep)
break

case 'cabo1':
if (!isOwner) return enviar(mess.black)
anu = await black.chats.all()
bahh = black.chats.array.filter(v => v.jid.endsWith('g.us'))
bahhh = black.chats.array.filter(v => v.jid.endsWith('s.whatsapp.net'))
if (isMedia && !info.message.videoMessage || isQuotedImage) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.extendedTextMessage.contextInfo : info
buff = await black.downloadMediaMessage(encmedia)
for (i = 0; i < bahh.length; i++) {
black.sendMessage(bahh[i].jid, buff, image, {caption: `[ TRANSMIÇÃO DE MY DONO ]\n\n${body.slice(16)}`})
}
reply(`transmição foi enviada a ${bahh.length} grupos`)
} else {
for (i = 0; i < bahh.length; i++) {
sendMess(bahh[i].jid, `\n\n♨️  𐎟  BOA RAPAZIADA! O ATAQUE ACABOKKK🌟\n\n️`)
}
}
break

case 'cabo1':
if (!isOwner) return enviar(mess.black)
anu = await black.chats.all()
bahh = black.chats.array.filter(v => v.jid.endsWith('g.us'))
bahhh = black.chats.array.filter(v => v.jid.endsWith('s.whatsapp.net'))
if (isMedia && !info.message.videoMessage || isQuotedImage) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.extendedTextMessage.contextInfo : info
buff = await black.downloadMediaMessage(encmedia)
for (i = 0; i < bahh.length; i++) {
black.sendMessage(bahh[i].jid, buff, image, {caption: `[ TRANSMIÇÃO DE MY DONO ]\n\n${body.slice(16)}`})
}
reply(`transmição foi enviada a ${bahh.length} grupos`)
} else {
for (i = 0; i < bahh.length; i++) {
sendMess(bahh[i].jid, `\n\n♨️  𐎟  BOA RAPAZIADA! O ALVO FOI DERRUBADO COM SUCESSO!!  NÓS É PICA SIM OU CLARO? KKKKKKK  🌟\n\n️`)
}
}
break

case 'subir': // Subir o chat - Clear
if (!isGroupAdmins) return enviar ('🖐️só quem tem pau grande pode usar esse comando !')
black.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', MessageType.text)
black.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', MessageType.text)
black.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', MessageType.text)
black.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', MessageType.text)
black.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', MessageType.text)
black.sendMessage(from, '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', MessageType.text)
break;

case 'tm': 
case 'bc': 
if (!isOwner) return enviar ('*ESSE COMANDO N FUNCIONA COM QUEM TEM FIMOSE* 🤓*')
if (args.length < 1) return reply('\n\n  [SASORIZIN] Cade o texto?  \n\n')
anu = await black.chats.all()
if (isMedia && !mek.message.videoMessage || isQuotedImage) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
buff = await black.downloadMediaMessage(encmedia)
for (let _ of anu) {
black.sendMessage(_.jid, buff, image, {caption: `\n${body.slice(4)}\n`})
}
reply('\n  [ SASORIZIN ]  Enviado com sucesso.\n')
} else {
for (let _ of anu) {
sendMess(_.jid, `\n${body.slice(4)}\n`)
}
reply('\n  [ SASORIZIN ]  Enviado com sucesso.\n')
}
break;

case 'hidetag':
if (!isGroupAdmins) return enviar ('🖐️só quem tem pau grande pode usar esse comando !')
var value = args.join(" ")
var group = await black.groupMetadata(from)
var member = group["participants"]
var mem = []
member.map(async (adm) => {
mem.push(adm.id.replace("c.us", "s.whatsapp.net"));
})
var optionshidetag = {
   text: value,
   contextInfo: { mentionedJid: mem },
   quoted: mek,
}
black.sendMessage(from, optionshidetag, text)
break;

case 'tagall':
case 'tag all': // Marcar todos do grupo
if (!isGroupAdmins) return enviar ('🖐️só quem tem pau grande pode usar esse comando !')
if (!isGroup) return reply("\n  👑  SASORIZIN diz:  Esse comando só funciona em grupos! \n")
black.updatePresence(from, Presence.composing)
members_id = []
todos = (args.length > 1) ? body.slice(8).trim(): ''
todos += `\n\n[SASORIZIN_BOT] TOTAL DE MEMBROS > ${groupMembers.length} [SASORIZIN_BOT]\n\n`
for (let mem of groupMembers) {
todos += `> @${mem.jid.split('@')[0]}\n`
members_id.push(mem.jid)
}
mentions(' '+todos+' ', members_id, true)
break;

case 'link':
  try {
if (!isGroup) return enviar(mess.group)
if (!isGroupAdmins) return enviar(mess.admin)
if (!isBotGroupAdmins) return enviar(mess.Badmin)
if (args.length < 1) return enviar('*❱❱ Digite On para ativar  ❰❰*')
if (args[0] === 'on') {
if (isAntiLink) return enviar('*❱❱ Já está ativo ❰❰*')
antilink.push(from)
fs.writeFileSync('./src/seguranca/antilink.json', JSON.stringify(antilink))
enviar('*❱❱ ‼️ Ativado Com Sucesso ‼️ ❰❰*')
} else if (args[0] === 'off') {			
antilink.splice(from)
fs.writeFileSync('./src/seguranca/antilink.json', JSON.stringify(antilink))
enviar('*❱❱ ‼️ Desativado Com Sucesso ‼️ ❰❰*')
} else {
enviar('*❱❱ ‼️ On para ativar  :  Off para desativar ‼️ ❰❰*')
}
} catch {
 console.log(color('*❱❱ ERRO ❰❰*','red'))
 enviar('*❱❱ ❌ Deu erro : tente novamente ❌ ❰❰*')
}
break

case 'antilink':
buttons = [{buttonId: `${p}link on`,buttonText: {displayText: `${p} ATIVAR ${p}`},type:1},{buttonId: `${p}link off`,buttonText: {displayText: `${p} DESATIVAR ${p}`},type:1}]
imageMsg = (await black.prepareMessageMedia(fs.readFileSync(`./src/bot4.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./src/bot3.jpg`)})).imageMessage
lzmodsdominabb = "Escolha Uma Dessas Opcões"
buttonsMessage = {
contentText: lzmodsdominabb,
footerText: `${nomeBot}`, imageMessage: imageMsg,
buttons: buttons,
headerType: 4
}
prep = await black.prepareMessageFromContent(from,{buttonsMessage},{quoted: blx})
black.relayWAMessage(prep)
break

case "trancar":
case "lock":
case "fechargrupo": // O mesmo de trancar
if (!mek.key.fromMe && !isGroupAdmins) return enviar ("Somente administradores");
if (!isBotGroupAdmins) return enviar ("o BOT não é um administrador do grupo :(");
if (!isGroup) return;
 enviar(`\n  GRUPO FECHADO PARA SOMENTE ADMINISTRADORES FALAREM ✅ \n`);
black.groupSettingChange(from, GroupSettingChange.messageSend, true); 
break;

case "abrirgrupo":
case "destrancar":
case "unlock": // O mesmo de destrancar
if (!mek.key.fromMe && !isGroupAdmins) return enviar ("Somente administradores");
if (!isBotGroupAdmins) return enviar ("o BOT não é um administrador do grupo :(");
if (!isGroup) return;
enviar(`\n  GRUPO ABERTO PARA QUE TODOS POSSAM FALAR! ✅ \n`);
black.groupSettingChange(from, GroupSettingChange.messageSend, false);
break;

case 'serverinfo':
case 'server info':
case 'grupoinfo': 
case 'grupo info': // Ver as informações do grupo
black.updatePresence(from, Presence.composing)
ppUrl = await black.getProfilePicture(from) 
buffer = await getBuffer(ppUrl)
black.sendMessage(from, buffer, image, { thumbnail: null, caption: `\n\n - *NOME* : ${groupName}\n - *QUANTIDADE DE MEMBROS* : ${groupMembers.length}\n - *QUANTIDADE DE ADMS* : ${groupAdmins.length}\n\n`})
break;

case 'marcar': 
if (!isGroup) return enviar(mess.group)
if (!isGroupAdmins) return enviar(mess.admin)
members_id = []
teks = (args.length > 1) ? body.slice(8).trim() : ''
for (let mem of groupMembers) {
teks += `\n@${mem.jid.split('@')[0]}`
members_id.push(mem.jid)
}
mentions(teks, members_id, true)
break

case 'adm':
enviar('*❱❱ Abrindo Menu Admin.. ❰❰*')
buttons = [
  {buttonId: `${p}lock`,buttonText: {displayText: `${p} FECHAR GRUPO ${p}`},type:1},
  {buttonId: `${p}unlock`,buttonText: {displayText: `${p} ABRIR GRUPO ${p}`},type:1},
  {buttonId: `${p}menupribido1`,buttonText:{displayText: `${p} MAIS MENUS PARA ADMS ${p}`},type:1}
  ]
pastaFoto = (await black.prepareMessageMedia(fs.readFileSync(`./src/bot3.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./src/bot2.jpg`)})).imageMessage

textoVisivel = `Menu Dos Admins`

buttonsMessage = {
  contentText: textoVisivel,footerText: `${nomeBot}`, imageMessage: pastaFoto,buttons: buttons,headerType: 4
  }
prep = await black.prepareMessageFromContent(from,{buttonsMessage},{quoted: blx})
black.relayWAMessage(prep)
break

case 'welk':
  try {
if (!isGroup) return enviar(mess.group)
if (!isGroupAdmins) return enviar(mess.admin)
if (args.length < 1) return enviar('*❱❱ Digite On para ativar  ❰❰*')
if (args[0] === 'on') {
if (isWelkom) return enviar('já ativo hmm')
welkom.push(from)
fs.writeFileSync('./src/seguranca/welkom.json', JSON.stringify(welkom))
enviar('*❱❱ ‼️ Ativado Com Sucesso ‼️ ❰❰*')
} else if (args[0] === 'off') {
welkom.splice(from)
fs.writeFileSync('./src/seguranca/welkom.json', JSON.stringify(welkom))
enviar('*❱❱ ‼️ Desativado Com Sucesso ‼️ ❰❰*')
} else {
enviar('*❱❱ ‼️ On para ativar  :  Off para desativar ‼️ ❰❰*')
}
} catch {
 console.log(color('*❱❱ ERRO ❰❰*','red'))
 enviar('*❱❱ ❌ Deu erro : tente novamente ❌ ❰❰*')}
break

case 'welcome':
buttons = [{buttonId: `${p}welk on`,buttonText: {displayText: `${p} ATIVAR ${p}`},type:1},{buttonId: `${p}welk off`,buttonText: {displayText:`${p} DESATIVAR ${p}`},type:1}]
imageMsg = (await black.prepareMessageMedia(fs.readFileSync(`./src/bot1.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./src/bot4.jpg`)})).imageMessage
lzmodsdominabb = `Escolha Uma Dessas Opcões`
buttonsMessage = {
contentText: lzmodsdominabb,
footerText:`${nomeBot}`, imageMessage: imageMsg,
buttons: buttons,
headerType: 4
}
prep = await black.prepareMessageFromContent(from,{buttonsMessage},{quoted: blx})
black.relayWAMessage(prep)
break
/* ❱❱ FIM DE COMANDO ADMIN  ❰❰  

~>
 
❱❱ COMECO DE COMANDO DONO ❰❰ */
case 'npodecriado':
enviar('*❱❱ Abrindo Menu Do Criador.. ❰❰*')
buttons = [
  {buttonId: `${p}adm`,buttonText: {displayText: `${p} ADMIN ${p}`},type:1},
  {buttonId: `${p}stikk`,buttonText: {displayText: `${p} .help ${p}`},type:1},
  {buttonId: `${p}menu`,buttonText: {displayText: `${p} VOLTAR ${p}`},type:1}
  ]
pastaFoto = (await black.prepareMessageMedia(fs.readFileSync(`./src/bot2.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./src/bot1.jpg`)})).imageMessage

textoVisivel = criador(p)

buttonsMessage = {
contentText: textoVisivel,
footerText: `${nomeBot}`, imageMessage: pastaFoto,
buttons: buttons,
headerType: 4
}
prep = await black.prepareMessageFromContent(from,{buttonsMessage},{quoted: blx})
black.relayWAMessage(prep)
break

case 'setprefix':
if (args.length < 1) return
if (!isOwner) return enviar(mess.black)
p = args[0]
setting.p = p
fs.writeFileSync('./src/dono.json', JSON.stringify(setting, null, '\t'))
enviar(`*❱❱ prefixo foi alterado com sucesso para : ${p} ❰❰*`)
break

case 'rename':
if(!isOwner) enviar(mess.black)
if (!isQuotedSticker) return enviar('*❱❱ So Figurinha🍃 ❰❰*')
encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
media = await black.downloadAndSaveMediaMessage(encmedia)
anu = args.join(' ').split('|')
satu = anu[0] !== '' ? anu[0] : `Base`
dua = typeof anu[1] !== 'undefined' ? anu[1] : `©SASORIZIN`
require('./arquivos/lib/fetcher.js').createExif(satu, dua)
require('./arquivos/lib/fetcher.js').modStick(media, black, mek, from)
break

case 'aviso':
if (!isOwner) return enviar(mess.black)
if (args.length < 1) return enviar('*❱❱ Mestre Oque Deseja Anúnciar? ❰❰*')
anu = await black.chats.all()
if (isMedia && !mek.message.videoMessage || isQuotedImage) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
buff = await black.downloadMediaMessage(encmedia)
} else {
 for (let _ of anu) {
sendMess(_.jid, `*❱❱ AVISO DO ${pushname} ❰❰*\n\n${body.slice(7)}`)
}
enviar('*❱❱ Transmissao enviada  ❰❰*')
}
break
/*❱❱ FIM DE COMANDO DONO  ❰❰  

~>

// ❱❱ COMECO DE COMANDO FIGURINHA  ❰❰ */
case 'stikk':
enviar('*❱❱ Abrindo Menu help.. ❰❰*')
buttons = [
  {buttonId: `${p}regras`,buttonText: {displayText: `${p} REGRAS ${p}`},type:1},
  {buttonId: `${p}menu`,buttonText: {displayText: `${p} VOLTAR ${p}`},type:1}
  ]
pastaFoto = (await black.prepareMessageMedia(fs.readFileSync(`./src/bot3.jpg`), 'imageMessage', {thumbnail: fs.readFileSync(`./src/bot2.jpg`)})).imageMessage

textoVisivel = figurinhas(p)

buttonsMessage = {
contentText: textoVisivel,
footerText: `${nomeBot}`, imageMessage: pastaFoto,
buttons: buttons,
headerType: 4
}
prep = await black.prepareMessageFromContent(from,{buttonsMessage},{quoted: blx})
black.relayWAMessage(prep)
break

case '⬇️⬇️⬇️⬇️':
if (args.length < 1) return enviar(`*❱❱ ERROR: ❰❰*\n\nModo Certo :  ${p +comando} ©SASORIZIN`)
try {
var chollotxt = body.slice(5).trim()
enviar(mess.wait)
url = encodeURI(`https://api.xteam.xyz/attp?file&text=${chollotxt}`)
textofigu = await getBuffer(url)
black.sendMessage(from, textofigu, HELP, { quoted: blx })
} catch (e) {
enviar("*❱❱ ERROR : Use Apenas Caracteres Alfanuméricos  ❰❰*")
}
break

case 'help':
if (!isQuotedSticker) return enviar('*❱❱ Mande Uma Figurinha ❰❰*')
enviar(mess.wait)
encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
media = await black.downloadAndSaveMediaMessage(encmedia)
ran = getRandom('.png')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) return enviar('*❱❱ Falha Ao Converter a Figurinha  Em Imagem ❰❰*')
buffer = fs.readFileSync(ran)
black.sendMessage(from, buffer, image, {quoted: blx,thumbnail:null,caption: `${tagBot}`})
fs.unlinkSync(ran)})
break

case 'f': case 'BOTE ESSE COMANDO PARA VER O COMANDO TODO': case 's': case 'st': case 'stk':
black.updatePresence(from,Presence.composing)
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
const media = await black.downloadAndSaveMediaMessage(encmedia)
rano = getRandom('.webp')
await ffmpeg(`./src/sticker/${media}`)
.input(media)
.on('start', function (cmd) {
console.log(`Started : ${cmd}`)})
.on('error', function (err) {
console.log(`Error : ${err}`)
exec(`webpmux -set exif ${addMetadata('Luffy', 'Bot')} ${rano} -o ${rano}`, async (error) => {
fs.unlinkSync(media)
enviar(mess.stick)})})
exec(`ffmpeg -i ${media} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 800:800 ${rano}`, (err) => {
fs.unlinkSync(media)
buffer = fs.readFileSync(rano)
black.sendMessage(from, buffer, HELP, {quoted: mek})
fs.unlinkSync(rano)})
} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
const media = await black.downloadAndSaveMediaMessage(encmedia)
rano = getRandom('.webp')
await ffmpeg(`./src/sticker/${media}`)
.inputFormat(media.split('.')[1])
.on('start', function (cmd) {
console.log(`Started : ${cmd}`)})
.on('error', function (err) {
console.log(`Error : ${err}`)
exec(`webpmux -set exif ${addMetadata('Luffy', 'Bot')} ${rano} -o ${rano}`, async (error) => {
fs.unlinkSync(media)
tipe = media.endsWith('.mp4') ? 'video' : 'gif'
enviar(`Falha na conversão de ${tipe} para HELP`)})})
exec(`ffmpeg -i ${media} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 200:200 ${rano}`, (err) => {
fs.unlinkSync(media)
buffer = fs.readFileSync(rano)
black.sendMessage(from, buffer, HELP, {quoted: mek})
fs.unlinkSync(rano)})
} else {
enviar(`Você precisa enviar ou marcar uma imagem ou vídeo com no máximo 10 segundos`)}
break 

// ❱❱  FIM DE TODOS COMANDOS  ❰❰ || ❱❱  FIM DE TODOS COMANDOS ❰❰
// ❱❱  FIM DE TODOS COMANDOS  ❰❰ || ❱❱  FIM DE TODOS COMANDOS ❰❰
// ❱❱  FIM DE TODOS COMANDOS  ❰❰ || ❱❱  FIM DE TODOS COMANDOS ❰❰

default:

//  ❱❱ RESPOSTA DE QUANDO USA SÓ O PREFIX ❰❰	
if (body == `${p}`)  {
if(isOwner) enviar (`*❱❱ Oi Mestre ❰❰*`) 
if(!isOwner) enviar(`*❱❱ Não Pertuba Man ❰❰*`)}

//  ❱❱ MENSAGEM DE ERRO DE COMANDO ❰❰  	
if(isCmd && comando) {
enviar(`*❱❱ Caro Usuario Esse Comando Não Existe , Basta Digitar: .help Para Todos Os Comandos ❰❰*`)}

// ❱❱ INTERACAO DE TEXTO ❰❰
if(budy == 'black' || budy == 'Black') {
if(isOwner) enviar('Estou Aqui😊')
if(!isOwner) enviar('éoq escória??')}}

} catch (e) { 
console.log('Error : %s', color(e, 'red'))}})}
starts()