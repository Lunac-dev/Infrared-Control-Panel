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

  async asyncData ({ $axios }) {
    const response = await $axios.$get('/api/proxies')
    const proxies = response
    return { proxies }
  },

  methods: {
    async remove (name) {
      const response = await this.$axios.$get('/api/remove/' + name)
      if (response.status === '200') {
        this.$toast.success('Deleted successfully!')
        const response = await this.$axios.$get('/api/proxies')
        this.proxies = response
      } else {
        this.$toast.error('Could not successfully delete.')
      }
    }
  }
}
</script>
