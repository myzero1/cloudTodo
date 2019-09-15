// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const todos = db.collection('todos')

// 云函数入口函数
exports.main = async (event, context) => {
  // 目标时区，东8区
  const targetTimezone = -8;
  // 当前时区与中时区时差，以min为维度
  const dif = new Date().getTimezoneOffset();
  // 本地时区时间 + 本地时区时差  = 中时区时间
  // 目标时区时间 + 目标时区时差 = 中时区时间
  // 目标时区时间 = 本地时区时间 + 本地时区时差 - 目标时区时差
  // 东8区时间
  let myDate = new Date().getTime() + dif * 60 * 1000 - (targetTimezone * 60 * 60 * 1000);
  myDate = new Date(myDate); 

  // console.log('new Date(east9time)', dif, new Date(east9time));

  // let myDate = new Date()
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