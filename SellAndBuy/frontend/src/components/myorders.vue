
<template>
  
    <div class="row"> 
  
      
     
  
      
         <h1 id="h1">My orders</h1> 
        <br>
        
        <div id="items"  v-for="product in orders" :key="product.name">
            
            <img id="img" @click="openproduct(product.product)"  :src="product.imgsrc"/>
           
            <br>
            <a id="a2" @click="openproduct(product.product)" >{{product.product}}</a>
             <br>
            <a id="a2" >{{product.date}}</a>
             
        
        </div>
      <br> 
    
   
    

  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'myorders',
    
 data: () =>{
     return {
         orders:[],
          msg:'',
          date: ''
     }
 },

 methods:{
     
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
     
 },
 mounted(){
      //when the page loads we call the api 
      //to get orders 
      
        axios.post("http://localhost:8081/get_orders")
        .then(response =>{ 
            if(response.data.length>0){
              for (var i = 0; i < response.data.length; i++){
                  var d = parseInt(response.data[i].date);
                  var date = new Date(d);
                
                  response.data[i].date = date.toString();
                  var obj = response.data[i]

                  this.orders.push(obj)
                } 
         }
        });  
  },
 
}
</script>

<style>

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
    font-size: 30px;
  border-radius: 25px;
  cursor: pointer;
 background-color: rgb(248, 55, 55);

}
#abought{
  font-size: 40px;
  text-decoration: underline

}

</style>
