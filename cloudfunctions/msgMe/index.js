// 云函数入口文件
const cloud = require('wx-server-sdk')


const {
  WXMINIUser,
  WXMINIMessage
} = require('wx-js-utils');

const appId = 'wxbccc9631f0b48a45'; // 小程序 appId
const secret = '31d810903b2131d9f18e3848c8667f12'; // 小程序wx secret
const template_id = '3QcTb47G_R0IFb1yy5rbHpB8Kqrl3jGts7HVUS3mj8g'; // 小程序模板消息模板 id

cloud.init()

const db = cloud.database()
const todos = db.collection('todos')

// 云函数入口函数
exports.main = async (event, context) => {

  // PS : 参数与官方的对齐

  // 获取 access_token
  let wXMINIUser = new WXMINIUser({
    appId,
    secret
  });

  let access_token = await wXMINIUser.getAccessToken();

  const wxContext = cloud.getWXContext()

  let task = await todos.doc(event.taskId).get()

  const touser = wxContext.OPENID; // 小程序用户 openId，从用户端传过来，指明发送消息的用户
  const touser = task.data._openid;
  const form_id = event.formId; // 小程序表单的 form_id，或者是小程序微信支付的 prepay_id

  

  // 发送模板消息
  let wXMINIMessage = new WXMINIMessage();
  let result = await wXMINIMessage.sendMessage({
    access_token,
    touser,
    form_id,
    template_id,
    data: {
      keyword1: {
        value: task.data.title // keyword1 的值
      },
      keyword2: {
        value: task.data.title // keyword2 的值
      },
      keyword3: {
        value: task.data.title // keyword2 的值
      },
      keyword4: {
        value: task.data.location.address // keyword2 的值
      }
    },
    page: `pages/todoInfo/todoInfo?id=${task.data.title}` // 点击模板消息后，跳转的页面
  });

  return result
}