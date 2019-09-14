const db = wx.cloud.database()
const todos = db.collection('todos')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  pageData:{
    task:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.pageData.id = options.id

    todos.doc(options.id).get().then(res => {
      this.setData({
        task:res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
})