const express=require("express");
const router=express.Router();
const pool=require("../pool");
//接口地址：
//http://127.0.0.1:3000/index/getIndexProducts
router.get("/get_IndexProducts",(req,res)=>{
   var sql="SELECT * FROM index_product";
   pool.query(sql,[],(err,result)=>{
       if(err) console.log(err);
       //res.send(result);
       res.writeHead(200,{
           "Content-Type":"application/json;charset=utf-8",
           "Access-Control-Allow-Origin":"*"
       })
       res.write(JSON.stringify(result));
       res.end();
   });
});

router.get("/get_IndexProducts_bottom",(req,res)=>{
    var sql="SELECT * FROM index_product_bottom";
    pool.query(sql,[],(err,result)=>{
        if(err) console.log(err);
        //res.send(result);
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        })
        res.write(JSON.stringify(result));
        res.end();
    });
 });
 
module.exports=router;