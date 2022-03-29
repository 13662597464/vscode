//mock数据模拟
import Mock from 'mockjs'

//图表数据
let list = []
export default {
  getStatisticalData: () => {
    for (let i = 0; i < 7; i++) {
      list.push(
        Mock.mock({
          苹果: Mock.Random.float(100, 8000, 0, 0)
        })
      )
    }
    return {
      code: 0,
      data: {
        videoData: [{
          name: '小米',
          value: 2999
        }]
      }
    }
  }
}