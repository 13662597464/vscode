// 云函数入口文件
const cloud = require('wx-server-sdk')

var rp = require('request-promise');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return rp(`https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=${event.count}&page_start=${event.start}`)
  .then(function (res) {
    console.log(res)
        return res; 
  })
  .catch(function (err) {
    console.log(err)
  });
}