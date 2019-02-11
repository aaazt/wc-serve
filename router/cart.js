const express=require("express")
const router=express.Router()
const pool=require("../pool")
router.get("/add",(req,res)=>{
    var psid=req.query.psid;
    var count=req.query.count;
    var uid=req.session.uid;
    pool.query("select * from product_cart_item where uid=? and psid=?",[uid,psid],(err,result)=>{
        if(err) console.log(err);
        if(result.length==0){//如果该用户购物车中无此条商品的购物记录，则在购物车中直接插入
            console.log(result)
            pool.query("insert into product_cart_item values(null,?,?,?,0)",[uid,psid,count],(err,result)=>{
                if(err) console.log(err);
                res.end();
            })
        }else{//如果该用户购物车中已有此条商品的购物记录，则将购物车中该商品的数量累加
            pool.query("update product_cart_item set count=count+? where uid=? and psid=?",[count,uid,psid],(err,result)=>{
                if(err) console.log(err);
                res.end();
            })
        }

    })
})
router.get("/items",(req,res)=>{
    var uid=req.session.uid;
    var sql="SELECT *,( select md from product_details_pic where psid=product_cart_item.psid) as md FROM product_cart_item where uid=?";
    pool.query(sql,[uid],(err,result)=>{
        if (err) throw err;
        res.writeHead(200);
        res.write(JSON.stringify(result))
        res.end();
    });
})
router.get("/update",(req,res)=>{
    var iid=req.query.iid;
    var count=req.query.count;
    if(count>0){
        var sql="update product_cart_item set count=? where iid=?"
        var data=[count,iid]
    
    }else{
        var sql="delete from product_cart_item where iid=?";
        var data=[iid]
    }
     pool.query(sql,data,(err,result)=>{
         if(err) console.log(err);
         res.end();
     })   
    
})
module.exports=router;