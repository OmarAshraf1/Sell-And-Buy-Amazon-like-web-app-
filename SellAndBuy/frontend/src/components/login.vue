<template>
  <div class="container">
      
       <h1>{{this.msg}}</h1>
    <div id="app" class="signup">
    </div>
    <template id="signup-form">
      
      <form id="signinform">

        <div class="form-group">
          <label for="email">Email</label>
          <input class="rectangle" type="text" v-model="email" placeholder="Example@yahoo.com" maxlength="65" required/><span id="goodmessages" v-show="msg4">{{ email1_msg }}</span><span id="badmessages" v-show="msg5">{{ email2_msg }}</span>
        </div>

        <div class="form-group">
          <label for="psw1">Password </label>
          <input class="rectangle" type="password" v-model="password" placeholder="Password"  required />
        </div>

        <br><br>

        <div class="form-group">
          <button class="button" @click="signin() ; gotocategory();">Sign In</button>
        </div>

        <div class="form-group">
        <a id="a" @click=gotosignup()>Create a New Account</a>
        </div>
        </form>

      
    </template>
  
</div>
</template>

<script>
import axios from 'axios'

export default {
  
  name: 'login',
     data() {
    return {
      information:[],
      email: '',
      msg: '',
      password: '',
     
      
    }
  },
  methods: {
    
   signin(){ //from vue to express
      this.information = {email:this.email, password:this.password}
        axios.post("http://localhost:8081/login", this.information)
        .then(response => this.msg= response.data.messeage); 
    },
    gotosignup(){
      this.$router.push('/register'); 
    },
     gotocategory(){
      this.$router.push('/categories'); 
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >


body {
  height: 100%;
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(to right, #02021f, #252135);
  
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}

form {
  width: 50%;
  height: 70%;
  padding: 20px 50px 20px 20px;
  
}

form .form-group {
  display: flex;
  flex-direction: column;
  margin: 0 0 20px 0;
  color: #ffffff;
  font-size: 0.5cm;
}
form .form-group label {
  margin: 0 0 16px 0;
}

.form-group input[type="text"],
.form-group input[type="password"] {
  border:  1px inset #ffffff;
  border-radius: 5px;
  background: transparent;
  padding: 0px 5px;
  font-size: 1em;
  color: #ffffff;
}
.button {
  background-color: #3c3fcf; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.button:hover {
  
  background-color: #405feb; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.button:active {
  background-color:rgb(6, 167, 0);
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.rectangle {
  height: 1cm;
}
#goodmessages {
  font-size: 0.4cm;
  color: rgb(0, 255, 76);
}
#badmessages {
  font-size: 0.4cm;
  color: rgb(255, 0, 0);
}
#check {
  font-size: 0.7cm;
  color: rgb(231, 231, 231);
}
#a{
  text-decoration: underline;
  cursor: pointer;
}

</style>
