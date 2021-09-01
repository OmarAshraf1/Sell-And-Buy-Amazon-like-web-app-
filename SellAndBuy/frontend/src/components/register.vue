<template>
  <div class="container">
       
        <h1>{{this.msg}}</h1>
    <div id="app" class="signup">
    </div>
    <template id="signup-form">
      
      

      <form id="signupform">

        <div class="form-group">
          <label id="labels"  for="email">Email</label>
          <input class="rectangle" type="text" v-model="email" placeholder="Email"  required/><span id="goodmessages" v-show="msg4">{{ email1_msg }}</span><span id="badmessages" v-show="msg5">{{ email2_msg }}</span>
        </div>

        <div class="form-group">
          <label for="user">User Name</label>
          <input class="rectangle" type="text" v-model="username"  placeholder="User Name" maxlength="50" required/>
        </div>

        <div class="form-group">
          <label for="psw1">Password </label>
          <input class="rectangle" type="password" v-model="password" placeholder="Password" maxlength="30" required />
        </div>
        
        
        
        

        <br><br>

        <div class="form-group">
        <button class="button"  @click="signUp() ; gotocategory();">Sign Up</button>
        </div>
        
        <div class="form-group">
        <a id="a" @click=gotologinin() >I have already an account</a>
        </div>

      </form>
    </template>
  
</div>
</template>

<script>

  import axios from 'axios'

export default {
  name: 'register'
  ,
     data() {
    return {
      information:[],
      email: '',
      username: '',
      password: '',
      msg:''
      
      
    }
  },
  methods: {

     signUp(){ //from vue to express
      this.information = { username:this.username,email:this.email, password:this.password}
        axios.post("http://localhost:8081/register", this.information)
        .then(response => this.msg= response.data.messeage); 
        if(this.msg === 'done'){
          this.msg = 'Welcome' + this.username
        } 
        else{
            this.msg = 'User already exists'
        }
    },

    gotologinin(){
      this.$router.push('/login'); 
    },
    gotocategory(){
      this.$router.push('/categories'); 
    }

    
  }
 
}
</script>

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

.signup {
  width: 3.2in;
  height: 0.1in;
  position: relative;
  overflow: hidden;
  box-shadow: 10px 10px 60px rgba(0, 0, 0, 0.322);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 5px;
  background-image: url("../assets/logo.png") ;

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
#a{
  text-decoration: underline;
  cursor: pointer;
}


</style>

