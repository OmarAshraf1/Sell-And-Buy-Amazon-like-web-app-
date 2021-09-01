
<template>
  
    <div class="row"> 
  
      
     
    <div class="column">
      
         <h1 id="h1">cart</h1> 
        <br>
        
        <div id="items"  v-for="product in cart" :key="product.name">
            <h1>{{msg}}</h1>
            <img id="img"   :src="product.img"/>
            <button id="delete" @click="deleteitem(product.name,product.cost)">Delete</button>
            <br>
            <a id="a2"  >{{product.name}}</a>
                <br>
                <a id="a1">${{product.cost}}</a>
        
        </div>
    </div>
    
    <div class="column">
        <h1>Buy</h1>
        <a id="abuy">Buy products</a>
        <br>
        <a id="abuy">Total cost: ${{totalcost}}</a> <br>
        <button id="buybutton" @click="buy()">Buy now</button>
    </div>  
    

  </div>
</template>

<script>
import axios from 'axios'


export default {
  
    name: 'cart',
    
 data: () =>{
     return {
         cart:[],
          msg:'',
          totalcost: 0
     }
 },

 methods:{
     //delete item from cart array in backend
     deleteitem(product,cost){
         this.totalcost -= parseInt(cost)
        this.information = {product:product}
        axios.post("http://localhost:8081/deleteitem", this.information)
        .then(response =>{ 
          //get the new cart from backend after removing the item
          if(response.data.length>=0){
              this.cart = []
              for (var i = 0; i < response.data.length; i++){
                  var obj = response.data[i]

                  this.cart.push(obj)
                } 
         }
        });  
     },
     buy(){
       const d = Date.now()
       this.information =  {date:d}
        axios.post("http://localhost:8081/buy",this.information)
        .then(response =>{ 
            this.msg = response.messege
        });  
        this.cart=[]
     }
 },
 mounted(){
      //when the page loads we call the api 
      //to get products in the cart to be bought
      
        axios.post("http://localhost:8081/get_cart")
        .then(response =>{ 
            if(response.data.length>0){
              for (var i = 0; i < response.data.length; i++){
                  var obj = response.data[i]
                 

                  this.totalcost +=parseInt(obj.cost) 
                  this.cart.push(obj)
                } 
         }
        });  
  },
 
}
</script>

<style>
.row {
  display: flex;
}
.column {
  flex: 50%;
  border:0.5px solid grey;
}
#items{
    
     border:0.7px solid grey;
}
#options{
    float: right;
    flex: 50%;
     border:0.5px solid grey;
}
#img{
    object-fit: cover;
    object-fit: fill;
    width: 500px;
    height: 300px;
    
}
#delete{
    font-size: 20px;
  border-radius: 25px;
  cursor: pointer;
 background-color: rgb(248, 55, 55);

}
#buybutton{
    font-size: 35px;
    width: 190px;
  border-radius: 25px;
  cursor: pointer;
 background-color: rgb(248, 55, 55);

}
#abought{
  font-size: 40px;
  text-decoration: underline

}
#abuy{
  font-size: 27px;
}

</style>
