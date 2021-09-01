<template>
 <div id="container"> 
   
    
    <img id="img2" @click="gotocart()"  :src="cartimg"/>
    <input type="text" class="input" name="productname" @input="search" v-model="productname"  placeholder="Search products" required>
     <h1 >Products</h1> 
     
    <div class="category">
    <div id="categorycontainer" v-for="product in products" :key="product.productname">
      <img id="img" @click="open_product(product.productname)"  :src="product.imgpath"/>
      <br>
       <a id="a2" @click="open_product(product.productname)" >{{product.productname}}</a>
        <br>
        <a id="a1">${{product.cost}}</a>
        
   
    </div>  
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
export default {
   data() {
    return {
     products:[],
      msg:'',
      cartimg: 'https://assets1.risnews.com/styles/content_sm/s3/2018-04/shopping-cart.png?itok=LUk_XbaE' ,
      productname: '',
      tempproducts : []
      
    }
  },
  methods: {
    //send product name and open product in a new tab to view its details and buy it
      open_product(product_name){
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
      gotocart(){
        let routeData = this.$router.resolve('/cart');
        window.open(routeData.href, '_blank');
    },
    search(){
      if(this.productname === ''){
        this.products = [...this.tempproducts]
      }
      else{
          this.information = {product:this.productname}
        axios.post("http://localhost:8081/search", this.information)
        .then(response =>{ 
          this.products = []
         if(response.data.length>0){
              for (var i = 0; i < response.data.length; i++){
                  var obj = response.data[i]
                  this.products.push(obj)
                } 
         }
        });  
      }
      
    }
  },
 
  mounted(){
      //when the page loads we call the api 
      //to get products data of the special category retrieved from database
      
        axios.post("http://localhost:8081/get_products")
        .then(response =>{ 
         if(response.data.length>0){
              for (var i = 0; i < response.data.length; i++){
                  var obj = response.data[i]
                  this.products.push(obj)
                } 
                this.tempproducts = [...this.products]
         }
        });  
  }
}
</script>

<style>
#a1{
  text-decoration: underline;
  cursor: pointer;
}
#img{
    object-fit: cover;
      object-fit: fill;
    cursor: pointer;
    height: 250px;
    width: 450px;
   
}
#categorycontainer{
 
    border: 1.7px;
    border-style: solid;
}
.category{
    display: grid;
  
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
   
}
#container{
    background-color: darkkhaki;
}
#a2{
    font-size: 30px; 
    color:rgb(37, 115, 192);
    cursor: pointer;   
}
#a1{
    font-size: 22px; 
    color: rgb(227, 236, 248) ;
      
}
#h1{
    padding-right: 1400px;
}
#img2{
   
   padding-right: 1300px;
   object-fit: cover;
      object-fit: fill;
    width: 50px;
    height: 50px;
    cursor: pointer;
}
.input{
    width: 35%;
    height: 25px;
    border:2px solid cornflowerblue;
    border-radius: 6px;

}

</style>
