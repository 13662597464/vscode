// pages/comment/comment.js
const db = wx.cloud.database(); //初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieInfo: null,
    content: '', //评价内容
    images: [], //上传的图片
    fileIds: []
  },

  onContentChange: function (e) {
    this.setData({
      content: e.detail
    })
  },
  uploadImage: function () {
    //选择图片
    let _this = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePath = res.tempFilePaths;
        _this.setData({
          images: _this.data.images.concat(tempFilePath)
        })
      }
    })
  },
  submit: function () {
    wx.showLoading({
      title: '提交中',
    })
    console.log(this.data.content)
    //上传图片到云存储
    let promiseArr = [];
    this.data.images.forEach(val => {
      promiseArr.push(new Promise((reslove, reject) => {
        let suffix = /\.\w+$/.exec(val)[0];
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime + suffix,
          filePath: val, // 文件路径
          success: res => {
            // get resource ID
            console.log(res.fileID)
            this.setData({
              fileIds: this.data.fileIds.concat(res.fileID)
            })
            reslove();
          },
          fail: err => {
            // handle error
          }
        })
      }));
    });
    Promise.all(promiseArr).then(res => {
      //插入数据
      db.collection('comment').add({
        data: {
          content: this.data.content,
          movieid: this.data.movieInfo.id,
          fileIds: this.data.fileIds
        }
      }).then(res => {
        console.log("成功")
        wx.hideLoading();
        wx.showToast({
          title: '评价成功',
        })
      }).catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: '评价失败',
        })
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movieInfo: JSON.parse(options.movieInfo)
    })
    console.log(this.data.movieInfo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})