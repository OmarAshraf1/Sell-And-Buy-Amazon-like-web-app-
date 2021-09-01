
<template>
    
    <div id="div1">
        <h1>{{msg}} </h1>
        <form >
            <label class="labels" for="productname">Product name:</label><br>
            <input type="text" class="input" name="productname" v-model="productname" required><br>
            <label class="labels" for="img">Image url:</label><br>
            <input type="text" class="input" name="img" v-model="productimg" required><br>
            
            <label class="labels" for="quantity">Quantity:</label><br>
            <input type="text" class="input" name="quantity" v-model="quantity" required><br>
            <label class="labels" for="cost">Cost:</label><br>
            <input type="text" class="input" name="cost" v-model="cost" required><br>
            <label class="labels" for="description">Description:</label><br>
            <input type="text" class="input" name="description" v-model="description" required><br>
            
            <label class="labels" for="category ">Category name:</label><br>
            <select  v-model="category" name="Setting" id="categorymenu">
                <option value="" selected disabled hidden>Caregories</option> 
                <option value="Electronics">Electronics</option>
                <option value="Books">Books</option>
                <option value="Watches">Watches</option>
                <option value="Computers">Computers</option>
                <option value="Mobiles">Mobiles</option>
                <option value="Home appliances">Home appliances</option>
            
             </select>
        </form>
        <br>
        <button @click="sell()" id="sellutton">Sell product !</button>
       
         
    </div> 
</template>

<script>
import axios from 'axios'

export default {
  
    name: 'sellcomp',
    
 data: () =>{
     return {
         category:'',
         productname:'',
         quantity:'',
         description:'',
         cost: '' ,
         productimg:'',
          msg:'',
          selectedfile: '',
           path: '',
        
         
     }
 },

 methods:{
     /*
    imageselect(event){
        console.log(event) 
        this.selectedfile= event.target.files[0]
    },
    sendfile(){
        const formdata = new FormData()
        formdata.append('file',this.selectedfile)
        axios.post('http://localhost:8081/uploadphoto',formdata)
        .then(response =>{ 
            this.img = response.data.path
            
        });  

    },
    */
    sell(){
        
        this.information = {category:this.category,product:this.productname,quantity:this.quantity,description:this.description,productimg:this.productimg,cost:this.cost}
        axios.post("http://localhost:8081/sellproduct", this.information)
        .then(response =>{ 
          this.msg= response.data.messege
          console.log(this.msg)
          if(this.msg === 'done'){
              
             this.msg = 'Sold successfuly' 
          }
        });  
    }
 },
 
}
</script>

<style>
#img{
    
   object-fit: cover;
      object-fit: fill;
    width: 100px;
    height: 100px;
}
.input{
    width: 40%;
    height: 25px;
    border:2px solid cornflowerblue;
    border-radius: 6px;

}
.labels{
      font-weight: bold;
      font-size: 17.2px;
}
#sellutton{
     color: rgb(226, 223, 223);
  
  text-align: center;
    background-color: rgb(22, 73, 133);
  display: inline-block;
  font-size: 40px;
  border-radius: 25px;
  cursor: pointer;
  width: 260px;
}
#div{
    padding-left: 800px;
}
#categorymenu{
      background-color: cornflowerblue;
      width: 100px;
       border: 6px solid transparent;
}
</style>
