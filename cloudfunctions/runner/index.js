// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const todos = db.collection('todos')

// 云函数入口函数
exports.main = async (event, context) => {
  let myDate = new Date()
  let year = myDate.getFullYear()
  let month = myDate.getMonth() + 1
  let day = myDate.getDate()
  let minute = myDate.getMinutes()
  minute = minute > 10 ? minute : `0{hours}`
  let hours = myDate.getHours()
  hours = hours > 10 ? hours : `0${hours}`
  let time = `${year}-${month}-${day} ${hours}:${minute}`

  // 1.筛选所有未完成的数据【当前时间来筛选】
  let tasks = await todos.where({
    status:'in-progress',
    time:time,
  }).get()

  // 2.执行数据的提醒
  for(i=0;i<tasks.data.length;i++){
    await cloud.callFunction({
      name:'msgMe',
      data:{
        formId:tasks.data[i].formId,
        taskId: tasks.data[i]._id
      }
    })
  }

  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}