/** */
const express=require('express');
const bodyPaser=require('body-parser');
const session = require('express-session');
//引入解决跨域请求的东西
const cors=require('cors')

var app=express();

app.use(cors({
  origin:"http://localhost:8080",
  credentials:true
}))


app.listen(3000,()=>{
  console.log('服务器创建成功');
});


app.use(express.static('./public'));
app.use(session({
  secret: '128位随机字符串',
  resave: false,
  saveUninitialized: true,
}))
//使用body-parser中间件
app.use(bodyPaser.urlencoded({
  extended:false
}));

//导入user路由器模块
const user=require('./router/user.js');
const products=require('./router/products');



app.use('/user',user);//后面的user表示路由器，前面的/user表示要挂载的路径，访问时形式为/user/...如：
app.use('/products',products);