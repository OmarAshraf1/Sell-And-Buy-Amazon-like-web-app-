
<template>
  
   <div>
        <img id="imgset"  :src='img'/>
        <select @change="goto(page)" v-model="page" name="Setting" id="settingmenu">
            <option value="" selected disabled hidden>Setting</option> 
            <option value="ho">Home</option>
            <option value="sn">Sell now!</option>
            <option value="bh">My orders</option>
            <option value="lo">Log out</option>
        </select>
    
   </div> 
</template>

<script>
export default {
    name: 'setting',
 data: () =>{
     return {
         page: '' ,
         img: 'https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png'
     }
 },
 methods:{
     goto(arg){
         if(arg === "lo" ){
             this.$router.push('/login'); 
         }
         if(arg === "sn"){
             this.$router.push('/sell'); 
         }
         if(arg === "bh"){
             this.$router.push('/myorders'); 
         }
         if(arg === "ho"){
             this.$router.push('/categories'); 
         }
     }
 }
}
</script>

<style>
#imgset{
   padding-left: 1370px;
   object-fit: cover;
      object-fit: fill;
    cursor: pointer;
    height: 30px;
    width: 30px;
}
#settingmenu{
    cursor: pointer;
}

</style>
