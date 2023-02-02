const mongoose = require('mongoose')


if (process.env.NODE_ENV !== 'production') { // 若node環境變數非production 
  require('dotenv').config() // 引用dotenv使用.config()函數
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 以mongoose建立連線

const db = mongoose.connection // 將連線狀況宣告為db
db.on('error', () => { // 若error產生
  console.log('mongodb error!')
})
db.once('open', () => { // 若成功連線
  console.log('mongodb connected!')
})