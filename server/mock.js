const Mock = require('mockjs')
const {Random} = Mock
const fs = require('fs')
let res = Mock.mock({
  'success': 1,
  'info': '请求成功',
  'code': 1001,
  'list|8': [
    {
      'cataid': 1,
      'goodslist|6': [
        {
          'goods_name': () => Random.cword(2, 5),
          'detail': () => Random.cparagraph(),
          'discount_price': () => Random.natural(1, 99),
          'img': () => Random.image('800x800', Random.color(), '#FFF', 'png', '!')
        }
      ]
    }
  ]
})

fs.writeFileSync('meal.json', JSON.stringify(res))
