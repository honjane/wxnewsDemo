// pages/list/list.js

var app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    list: [],
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false,
    header: '今日热闻',
    img:'http://tupian.enterdesk.com/uploadfile/2013/1230/20131230020714617.jpg',

  },
  bindViewTap(e) {
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  onReady () {
    wx.setNavigationBarTitle({
      title: '新闻快讯'
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let that = this
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/news/latest',
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        
        that.setData({
          banner: res.data.stories,
          list: [{ header: '今日热闻' }].concat(res.data.stories)
        })
      }
    })
    this.index = 1
  },
  loadMore(e) {
    if (this.data.list.length === 0) return
    var date = this.getNextDate()
    var that = this
    that.setData({ loading: true })
    wx.request({
      url: 'http://news.at.zhihu.com/api/4/news/before/' + (Number(utils.formatDate(date)) + 1),
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        that.setData({
          loading: false,
          list: that.data.list.concat([{ header: utils.formatDate(date, '-') }]).concat(res.data.stories)
        })
      }
    })
  },
  getNextDate() {
    const now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },

})