const { Wechaty } = require('wechaty')
const WechatyFaceCartonPlugin = require('../src/index')
const name = 'wechat-carton'
const bot = new Wechaty({ name, puppet: 'wechaty-puppet-wechat' })

const processedMessage = {}

async function onMessage(msg) {
  try {
    console.log(`${msg?.payload?.roomId} : ${msg?.payload?.text} (${msg?.payload?.type})`)
  } catch (e) {
    console.log(e)
  }
}

bot.on('message', onMessage)

bot
  .use(
    WechatyFaceCartonPlugin({
      maxuser: 20, // 支持最多多少人进行对话，建议不要设置太多，否则占用内存会增加
      secretId: 'AKIDFMHzUmriLkvsb6OSIuJURAg3D8uTovoT', // 腾讯secretId
      secretKey: 'TlsnUxCE4h6LPIuISaVEl59wTkkUyC9q', // 腾讯secretKey
      allowUser: [], // 允许哪些好友使用人像漫画化功能，为空[]代表所有人开启
      allowRoom: ['1111111', '柴米油盐酱醋茶', '预约游戏 申请ر'], // 允许哪些群使用人像漫画化功能，为空[]代表不开启任何一个群
      quickModel: true, // 快速体验模式 默认关闭 开启后可直接生成二维码扫描体验，如果自己代码有登录逻辑可以不配置此项
      tipsword: '卡通', // 私聊发送消息，触发照片卡通化提示 如果直接发送图片，默认进入图片卡通化功能，不填则当用户初次发送文字消息时不做任何处理
      sendRoomList: ['@@a71111f5b3966f88241b9e9c3d333573a3f3204fd72bfd1a4efe69cd23096f1f', '@@772cf69adda62fd4cd7081a1066ab9a289f6fe51b0e201ec988dcf76f7a07883', '@@75fba4f85278bf484ae502bf095b3bf475fed60d669e5d4f777cd62c74c87bd5'],
      // sendRoomList: ['@@8d31f2c000feec045b8b83b0c01d4fe5a20b7ad5f55c43fceb810f5d0c94e43c', '@@92efd9a677dd10b714c114e56914e61b74eba0ed01bd16caddf73c9021f515f9', '@@16cf220811cffaef4bab6d360a87415e91b1dc0cc712551600b1f975c7791a3c'],
    })
  )
  .start()
  .catch((e) => console.error(e))
