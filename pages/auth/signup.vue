<template>
    <div>
        <Nav></Nav>
        <div class="container">
        <div
        class="cardCenter md-layout-item md-size-33 md-medium-size-40 md-small-size-50 md-xsmall-size-70 mx-auto my-auto text-center"
        >
        <md-card md-with-hover>
            <md-progress-bar md-mode="indeterminate" v-if="awaitS" />

            <md-card-header>
            <div class="md-title">Login</div>
            </md-card-header>

            <md-card-content>
            <b-alert v-model="valErrAlert" variant="danger" class="my-3" dismissible>
            <ul>
                <li 
                v-for="(valErrA, index) in backendErrors" 
                :key="index">
                {{valErrA[0]}}
                </li>
            </ul>
            </b-alert>
            <!-- NAME -->
            <md-field :class="{'md-invalid':!validateState('name')}"> 
            <label for="name">Name</label>
            <md-input 
            type="name" 
            name="name"
            v-model="form.name"
            v-validate="{ required: true,  min: 3 }"
            aria-describedby="name-fb"
            ></md-input>
            <span class="md-error" id="name-fb"><p v-for="(frontErr,index) in veeErrors.collect('email')" :key="index">{{ frontErr }}</p></span>
            </md-field>
            <!-- EMAIL -->
            <md-field :class="{'md-invalid':!validateState('email')}"> 
            <label for="email">Email</label>
            <md-input 
            type="email" 
            name="email"
            v-model="form.email"
            v-validate="{ required: true, email:true }"
            aria-describedby="email-fb"
            ></md-input>
            <span class="md-error" id="email-fb"><p v-for="(frontErr,index) in veeErrors.collect('email')" :key="index">{{ frontErr }}</p></span>
            </md-field>
            <!-- PASSWORD -->
            <md-field :class="{'md-invalid':!validateState('password')}">
            <label for="password">Password</label>
            <md-input 
            type="password"
            name="password"
            v-model="form.password"
            v-validate="{ required: true, min: 5 }"
            aria-describedby="password-fb"
            ></md-input>
            <span class="md-error" id="password-fb"><p v-for="(frontErr,index) in veeErrors.collect('password')" :key="index">{{ frontErr }}</p></span>
            </md-field>
            </md-card-content>

            <md-card-actions>
            <md-button @click="resetForm"><md-ripple>Cancel</md-ripple></md-button>
            <md-button @click="onSubmit" :disabled="disabledBtn"><md-ripple>SignUp</md-ripple></md-button>
            </md-card-actions>
        
    </md-card>
    
            </div>
          </div>

    </div>
</template>

<script>
import Nav from '@/components/Nav'


export default {
    auth: 'guest',
    data() {
        return {
            form:{ 
                name: '',
                email: '',
                password: ''
            },
            valErrAlert: false,
            backValErr: false,
            awaitS: false,
            loadText:''
            

        }  
    },
    components: {
        Nav
    },
    computed: {
         disabledBtn(){
            if(this.validateState('password') 
            && this.validateState('email') 
            && this.validateState('name') 
            === true){
                return false
            }
            else{
                return true
            }
        }
    },
    mounted() {
        this.validateState('email');
    },
    methods: {
        async onSubmit() {
            this.awaitS = true;
            this.loadText = "Signing Up"
            await this.$axios.post('api/auth/register', this.form)
            .then( res => {
                this.loadText = "Logging In"
                this.$auth.loginWith('local', {data: this.form})
                .catch(err => {console.error(err);this.valErrAlert = true;})
            })
            .catch(err => {
                console.error(err);
                this.valErrAlert = true;
                this.awaitS = false;})
        },
        resetForm(){
            this.form.email = this.form.password = this.form.name= "";
        },
        validateState(ref) {
        if (
          this.veeFields[ref] &&
          (this.veeFields[ref].dirty || this.veeFields[ref].validated)
        ) {
          return !this.veeErrors.has(ref)
        }
        return null
      }
    },
    
}
</script>
<style scoped>
.centerBtn{
  display: flex;
  justify-content: center;
  align-items: center;
}

.cardCenter{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
