const express = require('express')
const mysql = require('mysql')
const fileUpload = require('express-fileupload');
const bodyparser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { json } = require('express')
const app = express() ;
app.use(morgan('combine'))
app.use(bodyparser.json())
app.use(cors())
app.use(fileUpload());
//create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port:3300,
    database: "sellandbuy"
    
})
/*
db.connect((err) => {
    if(err){
        throw err 
    }
    console.log('mysql connected')
})
*/



app.listen(process.env.PORT || 8081)

//register connectios
var cart = []  //array of cart for current buying session
var username
app.post('/register',(req,res) => {
    user = req.body
      username = user.email
    
    //check if user already exists
    regfound = false 
    let sqlreg = 'select * from users'    
    db.query(sqlreg,(err,rows,result) => {
            if(err) throw err 
           
            for (let i = 0; i < rows.length; i++) {
                if(rows[i].email===user.email ){
                    regfound = true 
                }
            } 
           
            
    })
    var k=0
    while(k!=1000000){
        k++
    }
    if(regfound === false){
        let sql3 = 'insert into users (email,name,password) values (?,?,?)'    
        db.query(sql3,[user.email,user.username, user.password],(err,result) => {
            if(err) throw err 
            res.send({
        
                messeage: "done"
            }) 
    })
    }
    
   
})

//login connections

app.post('/login',(req,res) => {
    userloged = req.body
    username = userloged.email
    cart=[]   
    let sqllog = 'select email,password from users'    
    db.query(sqllog,(err,rows,result) => {
            if(err) throw err 
            found = false 
            for (let i = 0; i < rows.length; i++) {
                if(rows[i].email===userloged.email && rows[i].password === userloged.password ){
                    found = true 
                }
            } 
            if(found){
                res.send({
        
                    messeage: "helloooooo  " + userloged.email
                }) 
            }
            else{
                res.send({
        
                    messeage: 'Wrong email or password'
                }) 
            }
            
    })
   
})
//
//category connections 
category_products = []
var category = ''
app.post('/spec_category',(req,res) => {
    category = req.body.category
       
    let sql_category = 'select productname,cost,imgpath from products where category = ? '    
    db.query(sql_category,[category],(err,rows,result) => {
            if(err) throw err         
            category_products = [...rows] 
            res.send({
        
                messege: 'done'
            }) 
          
    })
   
})
//
//get products to be displayed
//
app.post('/get_products',(req,res) => {
   
    res.json(category_products) 
   
})
//
//search products 
//
products = []
app.post('/search',(req,res) => {
    product_search = req.body.product
       
    let sql_search = 'select productname,cost,imgpath from products where productname like ? and category = ? '    
    db.query(sql_search,['%' + product_search + '%',category],(err,rows,result) => {
            if(err) throw err         
            products = [...rows] 
            res.json(products) 
          
    })
   
})
//
//product details connections 
//
product_details = {}
app.post('/openproduct',(req,res) => {
    product_name = req.body.product
       
    let sql_product = 'select productname,cost,imgpath,seller,description,quantity from products where productname = ? '    
    db.query(sql_product,[product_name],(err,rows,result) => {
            if(err) throw err         
            product_details = rows[0]
            res.send({
        
                messege: 'done'
            }) 
          
    })
   
})
 
//
//get product details to be displayed
//
app.post('/product/get_product_details',(req,res) => {
   
    res.json(product_details) 
   
})

//
//cart push in connections 
//

app.post('/addcart',(req,res) => {
    currproduct = req.body
    cart.push(currproduct)
       
   
})
//
//get products in cart to be bought
//
app.post('/get_cart',(req,res) => {
   
    res.json(cart) 
   
})
    
//
//delete item from cart connections 
//

app.post('/deleteitem',(req,res) => {
    product_name = req.body.product
       
    for (let i = 0; i < cart.length; i++) {
        if(cart[i].name === product_name){
            cart.splice(i,1)
        }
    } 
    
    res.json(cart) 
})
//
//insert a new cart buy by the user
app.post('/buy',(req,res) => {
    //array to carry the required info to be inserted in the table
    //then represented as if it is a graph in database
    tempinfo = []
    //Build graph source and adjacent nodes
    
    for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < cart.length; j++) {
            if(i==j && cart.length > 1 ){
                continue;
            }
            tempobj = [cart[i].name,cart[j].name,username,cart[j].img,cart[i].img,req.body.date]
            tempinfo.push(tempobj)
        } 
    } 
    let sql4 = 'insert into buyhistory (product,adjacentproduct,buyer,imgadj,imgsrc,date) values ?'    
    db.query(sql4,[tempinfo],(err,result) => {
            if(err) throw err 
            cart = []
            res.send({
        
                messege: "Successfuly bought"
            }) 
    })
   
})
//
//get frequently bought together from database
app.post('/get_freq_products',(req,res) => {
    product = req.body.name
    tempfreqarray = []   
    
    let sql_freq = 'select adjacentproduct,imgadj from buyhistory where product = ? '    
    db.query(sql_freq,[product],(err,rows,result) => {
            if(err) throw err         
            
            for (let i = 0; i < rows.length; i++) {
                if(product === rows[i].adjacentproduct ){
                    continue; 
                }
                tempfreqarray.push(rows[i])
               
            } 

            res.json(tempfreqarray)
        
    })
   
   
})
//
//upload photo
//
/*
app.post('/uploadphoto',(req,res) => {
        // accessing the file
        const myFile = req.files.file;
       const name = myFile.name
        //  mv() method places the file inside public directory
        myFile.mv('D:/Projects/SellAndBuy/frontend/src/assets/'+name, function (err) {
            if (err) {
                console.log(err)
                return res.status(500).send({ msg: "Error occured" });
            }
            var i = 0 
            while(i != 1000000){
                i++
            }
            // returing the response with file path and name
            return res.json({name: myFile.name, path: 'file:///D:/Projects/SellAndBuy/frontend/src/assets/'+name});
        });  
        
    
 
})
*/
//
//sell product connections
app.post('/sellproduct',(req,res) => {
    obj = req.body
    ///set req obj to be the parameters for sql query
    sellobj = [[category=obj.category,productname=obj.product,seller=username,cost=obj.cost,quantity=obj.quantity,description=obj.description,imgpath=obj.productimg]]
    
    let sql5 = 'insert into products (category,productname,seller,cost,quantity,description,imgpath) values ?'    
     db.query(sql5,[sellobj],(err,result) => {
        if(err) throw err 
      
        res.send({
    
            messege: "done"
        }) 
    })
   
   
})
//
//get frequently bought together from database
app.post('/get_orders',(req,res) => {
    
    temporderarray = []   
    
    let sql_freq = 'select product,imgsrc,date from buyhistory where buyer like ? '
    db.query(sql_freq,[username],(err,rows,result) => {
            if(err) throw err         
            
            for (let i = 0; i < rows.length; i++) {
               
                temporderarray.push(rows[i])
               
            } 

            res.json(temporderarray)
        
    })
   
   
})