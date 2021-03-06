const { Base64 } = require('js-base64')
const { bindingLineUserId, unlinkedLineUserId } = require('./user')

const handleMsg = {
  reply: (client, event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.resolve(null)
    }
    const echo = { type: 'text', text: `有笨蛋說：${event.message.text}` }
    client.replyMessage(event.replyToken, echo)
  },
  link: async (client, event) => {
    if (event.type !== 'message' || event.message.type !== 'text' || !event.message.text.includes('開始連動')) {
      return Promise.resolve(null)
    }
    const linkToken = await client.getLinkToken(event.source.userId)
    const echo = {
      type: 'flex',
      altText: '建喵 好嗨!',
      contents: {
        type: 'bubble',
        hero: {
          type: 'image',
          url: 'https://pdinfo.senao.com.tw/octopus/contents/9f1198e659a54416a343f9786a15699d.jpg',
          size: 'lg'
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '與 JM-Expense 連動',
              weight: 'bold',
              size: 'lg',
              align: 'center'
            },
            {
              type: 'box',
              layout: 'baseline',
              margin: 'md',
              contents: [
                {
                  type: 'text',
                  text: '在JM-Expense中登入帳號\n即可與你的LINE做連動',
                  size: 'sm',
                  color: '#0514f0',
                  margin: 'md',
                  align: 'center',
                  wrap: true
                }
              ]
            }
          ]
        },
        footer: {
          type: 'box',
          layout: 'vertical',
          spacing: 'sm',
          contents: [
            {
              type: 'button',
              style: 'link',
              height: 'sm',
              action: {
                type: 'uri',
                label: '前往JM-Expense',
                uri: `https://jm-expense-2022.firebaseapp.com/link?linkToken=${linkToken}`
              }
            }
          ],
          flex: 0
        },
        size: 'kilo',
        styles: {
          hero: {
            backgroundColor: '#98e3ed'
          }
        }
      }
    }
    client.replyMessage(event.replyToken, echo)
  },
  linked: async (client, event) => {
    if (event.type !== 'accountLink' || event.link.result !== 'ok') {
      return Promise.resolve(null)
    }
    // 修改 lineUserId
    const email = Base64.decode(event.link.nonce)
    const lineUserId = event.source.userId
    await bindingLineUserId({ email, lineUserId })
    // 傳送訊息
    const echo = {
      type: 'flex',
      altText: '笨建喵 好嗨!',
      contents: {
        type: 'bubble',
        hero: {
          type: 'image',
          aspectRatio: '4:3',
          url: 'https://i.imgur.com/thnpXTN.jpg',
          size: 'lg'
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '連動成功！',
              weight: 'bold',
              size: 'lg',
              align: 'center'
            },
            {
              type: 'box',
              layout: 'baseline',
              margin: 'md',
              contents: [
                {
                  type: 'text',
                  text: '你現在可以透過LINE來接收\nJM-Expense的通知訊息了！',
                  size: 'sm',
                  color: '#0514f0',
                  margin: 'md',
                  align: 'center',
                  wrap: true
                }
              ]
            }
          ]
        },
        size: 'kilo',
        styles: {
          hero: {
            backgroundColor: '#98e3ed'
          }
        }
      }
    }
    client.replyMessage(event.replyToken, echo)
  },
  unlinked: async (client, event) => {
    if (event.type !== 'message' || event.message.type !== 'text' || !event.message.text.includes('取消連動')) {
      return Promise.resolve(null)
    }
    // 修改 lineUserId
    const lineUserId = event.source.userId
    await unlinkedLineUserId({ lineUserId })
    // 傳送訊息
    const echo = {
      type: 'flex',
      altText: '笨建喵 好嗨!',
      contents: {
        type: 'bubble',
        hero: {
          type: 'image',
          aspectRatio: '4:3',
          url: 'https://i.imgur.com/thnpXTN.jpg',
          size: 'lg'
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '已取消連動！',
              weight: 'bold',
              size: 'lg',
              align: 'center'
            },
            {
              type: 'box',
              layout: 'baseline',
              margin: 'md',
              contents: [
                {
                  type: 'text',
                  text: '若想連動請說"開始連動"\n將會再次進行line連動！',
                  size: 'sm',
                  color: '#0514f0',
                  margin: 'md',
                  align: 'center',
                  wrap: true
                }
              ]
            }
          ]
        },
        size: 'kilo',
        styles: {
          hero: {
            backgroundColor: '#98e3ed'
          }
        }
      }
    }
    client.replyMessage(event.replyToken, echo)
  }
}

module.exports = handleMsg
