<template>
    <div>
        <Nav></Nav>
        <div class="container">
            <div class="col-md-6">
                <div class="card centerCard">
                <div class="card-header">
                    Sign up
                </div>
                <div class="card-body">
                <b-alert v-model="backValErr" variant="danger" class="my-3" dismissible>
                <ul>
                    <li v-for="(valErrA, name, index) in backendErrors" :key="index">{{name}}{{valErrA[0]}}</li>
                </ul>
                </b-alert>
                    <b-form>
                        <b-form-group
                            label="name"
                            label-for="input-3">
                                <b-form-input
                                id="input-3"
                                name="name"
                                v-model="form.name"
                                type="text"
                                required
                                placeholder="Enter your Username"
                                v-validate="{ required: true, min: 3}"
                                :state="validateState('name')"
                                aria-describedby="name-fb"
                            ></b-form-input>
                            
                            <b-form-invalid-feedback id="name-fb">
                                <ul>
                                    <li v-for="(frontErr,index) in veeErrors.collect('email')" :key="index">{{ frontErr }}</li>
                                </ul>
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group
                            label="Email"
                            label-for="input-1">
                                <b-form-input
                                id="input-1"
                                name="email"
                                v-model="form.email"
                                type="text"
                                required
                                placeholder="Enter your Email"
                                v-validate="{ required: true, min: 5, email:true }"
                                :state="validateState('email')"
                                aria-describedby="email-fb"
                            ></b-form-input>
                            
                            <b-form-invalid-feedback id="email-fb">
                                <ul>
                                    <li v-for="(frontErr,index) in veeErrors.collect('email')" :key="index">{{ frontErr }}</li>
                                </ul>
                            </b-form-invalid-feedback>
                        </b-form-group>

                        <b-form-group
                            label="Password"
                            label-for="input-2">
                            <b-form-input
                            id="input-2"
                            name="password"
                            v-model="form.password"
                            type="password"
                            required
                            placeholder="Enter your Password"
                            v-validate="{ required: true, min: 5 }"
                            :state="validateState('password')"
                            :disabled="awaitS"
                            aria-describedby="password-fb"
                        ></b-form-input>
                        <b-form-invalid-feedback id="password-fb">
                                <ul>
                                    <li v-for="(frontErr,index) in veeErrors.collect('password')" :key="index">{{ frontErr }}</li>
                                </ul>
                            </b-form-invalid-feedback>
                        </b-form-group>
                        </b-form>
                        <div class="centerBtn">
                            <b-button variant="info"
                            class="mx-3"
                            @click="onSubmit"
                            :disabled="veeErrors.any()">
                            <b-spinner small v-if="awaitS"></b-spinner>
                            <span v-if="awaitS">{{loadText}}</span>
                            <span v-if="!awaitS">Sign Up</span>
                            </b-button>
                            <b-button variant="light"
                            @click="resetForm">
                            Resest
                            </b-button>
                        </div>
                </div>
                </div>
                
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
        /*
        backValErr() {
            if (this.backendErrors.email || 
            this.backendErrors.password ||
            this.backendErrors.name ){
                return true;
            }
            else {
                return false;
            }
            
        }*/
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
                .catch(err => {console.error(err);this.backValErr = true;})
            })
            .catch(err => {
                console.error(err);
                this.backValErr = true;
                this.awaitS = false;})
        },
        resetForm(){
            this.form.email = this.form.password = "";
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
