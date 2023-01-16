const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

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