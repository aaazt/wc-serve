 const express=require("express")
 const router=express.Router()
 const pool=require("../pool")

 router.get("/",(req,res)=>{
   var psid=req.query.psid;
    var output={product:{},pics:[],specs:[]};
    //var sql="SELECT * FROM product_details_pic where product_id=?";//查当前商品图片列表
    var sql="SELECT * FROM product_details_pic where psid=?"
    pool.query(sql,[psid],(err,result)=>{
     if(err) console.log(err);
      output.pics=result;
      res.writeHead(200,{
      "Content-Type":"application/json;charset=utf-8",
      "Access-Control-Allow-Origin":"*"
      })
      res.write(JSON.stringify(output));
     res.end();
   })
 })

 module.exports=router;


