<template>
  <div>
    <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
      <div class="card flex-shrink-0 w-full shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">ProxyTo</span>
            </label>
            <input type="text" placeholder="backend2.example.org:25566" class="input input-bordered" v-model="proxyTo" />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Proxy Name</span>
            </label>
            <input type="text" placeholder="Example" class="input input-bordered" v-model="name" />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" @click="add">Add Proxy</button>
          </div>
        </div>
      </div>
      <div class="card w-full bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">DomainNames</h2>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Domain</span>
            </label>
            <input type="text" placeholder="example.com" class="input input-bordered" v-model="domain" />
            <button class="btn btn-accent btn-xs mt-6" @click="adddomain">Add Domain</button>
          </div>
          <div class="grid grid-cols-6 gap-4">
            <div class="badge badge-primary" v-for="domain in domainNames" :key="domain">
              {{ domain }}
            </div>
          </div>
          <div class="card-actions justify-end">
            <button class="btn btn-primary" @click="cleardomainnames">Clear</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddPage',
  middleware: 'login',

  data () {
    return {
      domain: null,
      domainNames: [],
      proxyTo: null,
      name: null
    }
  },

  methods: {
    adddomain () {
      if (!this.domain) {
        return
      }
      this.domainNames.push(this.domain)
      this.$toast.success('Added: ' + this.domain)
    },

    cleardomainnames () {
      this.domainNames.splice(0)
      this.$toast.success('Cleaned successfully!')
    },

    async add () {
      if (this.name === null) {
        this.$toast.error('Proxy name is empty!')
        return
      } else if (this.domainNames.length === 0) {
        this.$toast.error('DomainNames is empty!')
        return
      } else if (this.proxyTo === null) {
        this.$toast.error('ProxyTo is empty!')
        return
      }
      this.name.trim()
      const response = await this.$axios.post('/proxies/' + this.name, { domainNames: this.domainNames, proxyTo: this.proxyTo })
      if (response.status === 200) {
        this.$toast.success('The proxy has been added succesfully')
      } else {
        this.$toast.error('Could not successfully add.')
      }
    }
  }
}
</script>
