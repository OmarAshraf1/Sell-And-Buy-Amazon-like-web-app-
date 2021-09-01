
<template>
  
  <div class="parent">
  
    <div id="product">
        <img id="img" :src="product.imgpath"/>
        
      
      
    </div>
    <div id="container"> 
   
    <a class="text" >{{product.productname}}</a>
      <br>
      <a class="text">${{product.cost}}</a>
      <br>
      <a class="text">Seller: {{product.seller}}</a>
      
      <p class="text">About this product :</p>
      
      <p id="p1">{{product.description}}</p>
   </div>
  <div id="costdiv">
    <br>
    <br>
    <br>
    <img id="img2" @click="gotocart()"  :src="cartimg"/>
    <a id="a3"  @click="gotocart()">   Go to cart</a>
    <br>
    <br>
    <br>
    <a class="text">But it now!</a>
    <br>
    <br>
    <button id="cartbutton" @click="addtocart(product.productname,product.cost,product.imgpath)">Add to cart</button>
  </div>
   <div id="freq">
     <a id="afreq" @click="getfreq()">Frequently bought with this product: </a>
     
     <div  v-for="product in freq_bought_products" :key="product.adjacentproduct">
        <img id="imgfreq" @click="openproduct(product.adjacentproduct)"  :src="product.imgadj"/>
       
        
    </div>  
   </div>
     
    
   </div>
</template>

<script>
import axios from 'axios'
export default {
  
    name: 'productdetails',
    
 data: () =>{
     return {
       allowfreq:true ,
        msg:'',
        
        freq_bought_products:[] ,
        count: 0,
         page: '' ,
         product: {} ,
         cartimg: 'https://assets1.risnews.com/styles/content_sm/s3/2018-04/shopping-cart.png?itok=LUk_XbaE' ,
         img: 'https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png'
     }
 },
  
 mounted(){
      //when the page loads we call the api 
      //to get products details of the choosen product retrieved from database
      
        axios.post("http://localhost:8081/product/get_product_details")
        .then(response =>{ 
            this.product = response.data
        });  
        

  },
 methods:{
    addtocart(product_name,product_cost,product_imgpath){
          
       this.information = {name:product_name,cost:product_cost,img:product_imgpath}
        axios.post("http://localhost:8081/addcart", this.information)
        .then(response =>{ 
          
        });  
       
    },
    gotocart(){
        let routeData = this.$router.resolve('/cart');
        window.open(routeData.href, '_blank');
    },
    getfreq(){
      if(this.allowfreq){
        //get frequently bought products from database 
        //where they are represented as a graph
         this.information = {name:this.product.productname}
         axios.post("http://localhost:8081/get_freq_products", this.information)
         
        .then(response =>{ 
            if(response.data.length>0){
              for (var i = 0; i < response.data.length; i++){
                  if(i>=3){
                    break ;
                  }
                  this.count++ ;
                  var obj = response.data[i]
                  this.freq_bought_products.push(obj)
                } 
         }
        }); 
      }
       this.allowfreq = false   
    },
    //method to open freq product details
     openproduct(product_name){
        this.information = {product:product_name}
        axios.post("http://localhost:8081/openproduct", this.information)
        .then(response =>{ 
          this.msg= response.data.messege
          console.log(this.msg)
          if(this.msg === 'done'){
              //goto product details page
              let routeData = this.$router.resolve('/product_details');
              window.open(routeData.href, '_blank');
          }
        });  
        
      },
 }
}
</script>

<style>
#img{
   
   
   object-fit: cover;
      object-fit: fill;
    width: 700px;
    height: 500px;
    
}
#imgfreq{
  object-fit: cover;
      object-fit: fill;
     width: 100px;
    height: 100px;
    cursor: pointer;
}

#img2{
   
   padding-right: 10px;
   object-fit: cover;
      object-fit: fill;
    width: 50px;
    height: 50px;
    cursor: pointer;
}
#a3{
  cursor: pointer;
  font-size: 40px;
  text-decoration: underline

}
#settingmenu{
    cursor: pointer;
}

.parent {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr ;
  grid-template-rows: 1fr;
}
#freq{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
}
#container{
 
  border:0.5px solid grey;
}
#product{
    border:0.5px solid grey;

}
.text{
  font-size: 30px;
    text-decoration: underline
    
}
#cartbutton{
   color: rgb(226, 223, 223);
  
  text-align: center;
    background-color: rgb(22, 73, 133);
  display: inline-block;
  font-size: 40px;
  border-radius: 25px;
  cursor: pointer;
  width: 260px;
}
.p1{
   font-size: 28px;
}
#costdiv{
  border:0.5px solid grey;
}
#freq{
  border:0.5px solid grey;
}
#afreq{
      text-decoration: underline;
      cursor: pointer;
}

</style>
