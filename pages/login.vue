<template>
  <v-container class="spacing-playground pa-2" fluid>
    <v-card
      class="spacing-playground pa-5 mx-auto my-12"
      elevation="5"
      max-width="650"
    >
      <h1>Login</h1>
      <template>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show = !show"
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="postLogin"
          >
            Login
          </v-btn>
        </v-form>
      </template>
    </v-card>
  </v-container>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  layout: 'auth',
  middleware: 'notAuthenticated',
  data: () => ({
    valid: true,
    show: false,
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) =>
        (v && v.length <= 15) || 'Password must be less than 15 characters',
    ],
  }),
  methods: {
    async postLogin() {
      try {
        await this.$axios
          .$post('/api/Login', {
            Email: this.email,
            Password: this.password,
          })
          .then((res) => {
            console.log('res', res);

            const data = res;

              const auth = {
                accessToken: data
              }
              this.$store.commit('setAuth', auth) // mutating to store for client rendering
              Cookie.set('auth', auth) // saving token in cookie for server rendering
              this.$router.push('/student');           
          })
        // const auth = {
        //         accessToken: "token123"
        //       }
        // this.$store.commit('setAuth', auth)
        // Cookie.set('auth', auth) 
        // this.$router.push('/student'); 
      } catch (err) {}

    },
  },
}
</script>
