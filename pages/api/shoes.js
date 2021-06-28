// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const SneaksAPI = require('sneaks-api')
const sneaks = new SneaksAPI()
// sneaks.getMostPopular(10, function (err, products) {
//   return res.status(200).json(products)
// })
export default function handler(req, res) {
  sneaks.getMostPopular(10, function (err, products) {
    res.status(200).json({
      name: 'nike',
      make: 'air force 1',
    })
  })
}
