const jwt = require('jsonwebtoken')
const fs = require('fs')
const Mock = require('mockjs')
const multer = require('multer')
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    // console.log(file)
    let filename = file.originalname.split('.')
    cb(null, filename[0] + '-' + Date.now() + '.' + filename[1])
  }
})
let upload = multer({ storage: storage })
module.exports = function (app) {
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
  // upload 上传接口
  app.post('/dsp-creative/creative/upload', upload.single('file'), function (req, res) {
    res.send({
      'data': {
        'size': req.file.size,
        'value': req.file.path,
        'key': '2A36B67C6'
      },
      'status': 0
    })
  })
}
