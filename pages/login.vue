y
<template>
  <div class="hero">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6">From here you can login to the Infrared Control Panel.</p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">User</span>
            </label>
            <input type="text" placeholder="user" class="input input-bordered" v-model="username" />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input type="password" placeholder="password" class="input input-bordered" v-model="password" />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" @click="login">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',

  data () {
    return {
      username: undefined,
      password: undefined
    }
  },

  asyncData ({ $config }) {
    return { admin_username: $config.admin_name, admin_password: $config.admin_password }
  },

  mounted () {
    if (this.$cookies.get('logged')) {
      this.$router.push('/')
    }
  },

  methods: {
    login () {
      if (this.username === undefined || this.password === undefined) {
        this.$toast.error('Not all inputs have been completed!')
      } else if (this.username !== this.admin_username) {
        this.$toast.error('Incorrect username!')
      } else if (this.password !== this.admin_password) {
        this.$toast.error('Incorrect password!')
      } else {
        this.$cookies.set('logged', true)
        this.$toast.success('Well done! You successfully logged in!')
        this.$router.push('/')
      }
    }
  }
}
</script>
