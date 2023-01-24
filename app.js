const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

const mongoose = require('mongoose') // 引入mongoose
if (process.env.NODE_ENV !== 'production'){ // 若node環境變數非production 
  require('dotenv').config() // 引用dotenv使用.config()函數
}
mongoose.connect(process.env.MONGODB_URI) // 以mongoose建立連線

const db = mongoose.connection // 將連線狀況宣告為db
db.on('error',()=>{ // 若error產生
  console.log('mongodb error!')
})
db.once('open',()=>{ // 若成功連線
  console.log('mongodb connected!')
})

// 設定固定樣板
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定靜態資料來源
app.use(express.static('public'))

// 設定首頁渲染
app.get('/', (req, res) => {
  const restaurants = restaurantList.results
  res.render('index', { restaurant: restaurants })
})

// 設定餐廳詳細資料渲染
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(shop => shop.id === Number(req.params.id))
  res.render('show', { restaurant: restaurant })
})

// 設定搜尋結果渲染
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.replace(" ", "")
  const restaurant = restaurantList.results.filter(shop => {
    return shop.name.toLowerCase().includes(keyword.toLowerCase()) || shop.category.includes(keyword)
  })
  res.render('index', { restaurant: restaurant, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})