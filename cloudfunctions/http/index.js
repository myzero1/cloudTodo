// 云函数入口文件
const cloud = require('wx-server-sdk')

const got = require('got'); //引用 got

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // let getResponse = await got('httpbin.org/get') //get请求 用httpbin.org这个网址做测试 
  let getResponse = await got('https://open.onebox.so.com/api/getkuaidi?callback=jQuery18301815113148843135_1568628700707&com=huitongkuaidi&nu=71763507299371&time=1568628942&token=4f701a3b3933f735d496536def991846&_=1568628942321')
  return getResponse.body

  let postResponse = await got('httpbin.org/post', {
    method: 'POST', //post请求
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ //把json数据（对象）解析成字符串
      title: "网址",
      value: 'anipc.com'
    })
  })
  return postResponse.body //返回数据
}