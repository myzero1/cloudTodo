const db = wx.cloud.database()
const todos = db.collection('todos')

Page({
  onSubmit:function(event){
    todos.add({
      data:{
        title: event.detail.value.title
      }
    }).then(res => {
      wx.showToast({
        title: 'success',
        icon: 'success'
      })
    })
  }
})