const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose') // 引入mongoose
const Restaurant = require('./models/Restaurant.js')

if (process.env.NODE_ENV !== 'production') { // 若node環境變數非production 
  require('dotenv').config() // 引用dotenv使用.config()函數
}

const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 以mongoose建立連線

const db = mongoose.connection // 將連線狀況宣告為db
db.on('error', () => { // 若error產生
  console.log('mongodb error!')
})
db.once('open', () => { // 若成功連線
  console.log('mongodb connected!')
})

// 設定固定樣板
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 設定靜態資料來源
app.use(express.static('public'))

// 設定body-parser
app.use(express.urlencoded({ extended: true }))

// 設定首頁渲染
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.log(error))
})

// 新增餐廳頁面
app.get('/new', (req, res) => {
  return res.render('new')
})

// 新增餐廳資料
app.post('/create', (req, res) => {
  const newRestaurant = req.body
  return Restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
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