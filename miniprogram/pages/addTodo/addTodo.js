const db = wx.cloud.database()
const todos = db.collection('todos')

Page({
  data:{
    image:null
  },
  pageData:{
    locationObj:{}
  },
  selectImage:function(){
    wx.chooseImage({
      success: res => {
        console.log(res.tempFilePaths[0])

        wx.cloud.uploadFile({
          cloudPath:`${Math.floor(Math.random()*100000)}.png`,
          filePath: res.tempFilePaths[0]
        }).then(res => {
          console.log(res.fileID)

          this.setData({
            image:res.fileID
          })
        }).catch(err => {
          console.error(err)
        })
      }
    })
  },
  onSubmit:function(event){
    console.log(event.detail.formId)

    todos.add({
      data:{
        title: event.detail.value.title,
        image:this.data.image,
        location: this.pageData.locationObj
      }
    }).then(res => {
      wx.cloud.callFunction({
        name: 'msgMe',
        data: {
          formId: event.detail.formId,
          taskId:res._id
        }
      })

      wx.showToast({
        title: 'success',
        icon: 'success',
        success:res2 => {
          wx.redirectTo({
            url: `../todoInfo/todoInfo?id=${res._id}`,
          })
        }
      })
    })
  },
  chooseLocation:function(){
    wx.chooseLocation({
      success: res => {
        console.log(res)

        let locationObj = {
          latitude: res.latitude,
          longitude:res.longitude,
          name:res.name,
          address:res.address
        }

        this.pageData.locationObj = locationObj
      },
    })
  }
})