<template>
  <div>
    <h1>Proxies</h1>
    <div class="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
      <div class="card w-full bg-base-300 shadow-xl" v-for="proxy in proxies" :key="proxy.name">
        <div class="card-body">
          <h1 class="card-title">{{ proxy.name }}</h1>
          <h2>ProxyTo: {{ proxy.proxyTo }}</h2>
          <div class="card-actions justify-end">
            <div class="badge badge-primary" v-for="domain in proxy.domainNames" :key="domain">
              {{ domain }}
            </div>
            <button class="btn btn-secondary" @click="remove(proxy.name)">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: 'login',

  data () {
    return {
      proxies: []
    }
  },

  mounted () {
    this.getproxies()
  },

  methods: {
    async getproxies () {
      this.proxies.splice(0)
      const response = await this.$axios.get('/proxies')
      for (const p in response.data) {
        const proxyjson = await this.$axios.get('/proxies/' + response.data[p])
        const proxy = proxyjson.data
        proxy.name = response.data[p]
        this.proxies.push(proxy)
      }
    },

    async remove (name) {
      const response = await this.$axios.delete('/proxies/' + name)
      if (response.status === 200) {
        this.$toast.success('Deleted successfully!')
        this.getproxies()
      } else {
        this.$toast.error('Could not successfully delete.')
      }
    }
  }
}
</script>
