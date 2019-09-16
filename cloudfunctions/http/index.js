// 云函数入口文件
const cloud = require('wx-server-sdk')

const got = require('got'); //引用 got

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let getResponse = await got('httpbin.org/get') //get请求 用httpbin.org这个网址做测试 
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