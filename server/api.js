const jwt = require('jsonwebtoken')
const http = require('http')
const querystring = require('querystring')
const fs = require('fs')
const Mock = require('mockjs')
const _ = require('lodash')
function queryApi (url, methods, params) {
  return new Promise((resolve, reject) => {
    let data = ''
    const options = {
      hostname: 'http://locahost:9000',
      port: 80,
      path: url,
      method: methods,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }
    let request = http.request(options, response => {
      response.setEncoding('utf8')
      response.on('data', chunk => {
        data += chunk
      })
      response.on('end', () => {
        resolve(JSON.stringify(data))
      })
    })
    if (methods.toLowerCase() === 'post') {
      request.write(querystring.stringify(params))
    }
    request.end()
  })
}
module.exports = function (app) {
  // 注册接口
  // app.post('/user/register', function (req, res) {
  //   let user = fs.readFileSync('user.json', { encoding: 'utf-8' })
  //   user = JSON.parse(user)
  //   user.push(req.body)
  //   fs.writeFile('user.json', JSON.stringify(user), function () {
  //     res.end(
  //       JSON.stringify({
  //         success: 1,
  //         info: 'register success'
  //       })
  //     )
  //   })
  // })
  // login api
  app.post('/dsp-admin/user/login', function (req, res) {
    let user = fs.readFileSync(`${__dirname}/user.json`, { encoding: 'utf-8' })
    user = JSON.parse(user)
    let login = req.body
    let resInfo = {
      data: 'login failed',
      msg: '登录信息有误',
      status: 1
    }
    user.forEach(usr => {
      if (usr.username === login.username && usr.password === login.password) {
        resInfo.status = 0
        resInfo.data = 'login success'
        resInfo.msg = '登录成功'
        resInfo.user = {
          name: usr.username,
          time: new Date().toLocaleTimeString(),
          nickName: 'Jacky'
        }
      }
    })
    if (resInfo.status === 0) {
      resInfo.token = jwt.sign(login, '1511', {
        expiresIn: 60 * 60
      })
    }
    res.end(JSON.stringify(resInfo))
  })
  // home graph
  app.post('/dsp-report/index', function (req, res) {
    // let { startTime, endTime, dimLeft, dimRight } = req.body
    let Random = Mock.Random
    let mockData = Mock.mock({
      'status': 0,
      'data': {
        exposeNum: 10000, // 曝光量
        clickNum: 1000, // 点击量
        clickRate: 100, // 点击率
        clickPrice: 10000, // 点击均价
        cpmPrice: 200000, // 千次展示均价
        consumed: 1000, // 时间段消耗(单位分)
        [`dataY1|${req.body.count}`]: [() => Random.natural(1, 99999)],
        dataY2: [1100, 1382, 1325, 1600, 1600]
      }
    })
    res.send(mockData)
  })
}
