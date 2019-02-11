const express=require("express")
const router=express.Router()
const pool=require("../pool")
router.get('/',(req,res)=>{
  var sql='SELECT nid,pid,pic,title,subtitle,nprice,oprice FROM wc_navpr';
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
});
//获取首页全部商品列表
router.get('/indexpro',(req,res)=>{
  var sql='SELECT nid,pid,pic,dpic,title,subtitle,nprice,oprice FROM wc_index';
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})

//获取首页轮播图列表
router.get('/banner',(req,res)=>{
  var sql='SELECT nid,pid,pic FROM wc_banner';
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})

//获取爱豆原款的数据
router.get('/adinfo',(req,res)=>{
  var sql='SELECT aid,apic,adesc,appic,atitle,asubtitle,anprice FROM wc_ad';
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})

//根据nid获取商品的详细信息
router.get('/getinfo',(req,res)=>{
  var $nid=req.query.nid;
  var sql='SELECT * FROM wc_details WHERE nid=?';
  pool.query(sql,[$nid],(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})

//根据nid获取商品的小图中图和详细信息图
router.get('/getpic',(req,res)=>{
  var $nid=req.query.nid;
  var sql='SELECT * FROM wc_detailspic WHERE nid=?';
  pool.query(sql,[$nid],(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})
//根据当前商品的id查询前后的6条数据
router.get('/sptj',(req,res)=>{
  var nid=req.query.nid;
  var sql='SELECT nid,pic,title,subtitle,nprice,oprice FROM wc_index WHERE nid<?+7 && nid>?';
  pool.query(sql,[nid,nid],(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})

//根据当前商品的id查询商品评论数据
router.get('/sppl',(req,res)=>{
  var nid=req.query.nid;
  var sql='SELECT * FROM wc_sppl WHERE nid=?';
  pool.query(sql,[nid],(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})


//获取搜索的商品结果
router.get('/search',(req,res)=>{
  var search=req.query.search;
  var sql=`SELECT nid,pid,pic,dpic,title,subtitle,nprice,oprice FROM wc_index where subtitle LIKE '%${search}%'`;
  pool.query(sql,[search],(err,result)=>{
    if(err) throw err;
    res.send(result)
  })
})


//根据用户id获取购物车数据
router.get('/cart',(req,res)=>{
  var nid=req.query.uid;
  var sql='SELECT * FROM wc_cart WHERE uid=?';
  pool.query(sql,[nid],(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})


//测试地址: http://localhost:3000/products?kwords=新季
/*router.get("/",(req,res)=>{
  var kwords=req.query.kwords;//"macbook i5 128g"
  //要回发客户端的支持分页的对象
  var output={ pageSize:16 } //每页16个商品
  output.pno=req.query.pno;
  var sql=`SELECT * FROM products_info where ps_bq like '%${kwords}%'`;
  pool.query(sql,[],(err,result)=>{
    if(err) console.log(err);
    output.count=result.length;//获得总记录数
    output.pageCount=Math.ceil(//计算总页数
      output.count/output.pageSize);
    output.products=//截取分页后的结果集
      result.slice(output.pno*16,output.pno*16+16);

    res.writeHead(200,{
      "Content-Type":"application/json;charset=utf-8",
      "Access-Control-Allow-Origin":"*"
    })
    res.write(JSON.stringify(output))
    res.end()
  })
  //测试地址... products?kwords=i5&pno=1
})*/

module.exports=router;