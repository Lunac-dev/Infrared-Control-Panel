<template>
  <div>
    <div class="navbar bg-neutral text-neutral-content">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li><nuxt-link to="/add">Add proxy</nuxt-link></li>
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <img src="/img/icon.png" class="object-scale-down h-16">
      </div>
      <div class="navbar-end">
        <a href="https://github.com/haveachin/infrared">
          <button class="btn btn-primary">
          Github
          </button>
        </a>
      </div>
    </div>
    <div class="container mx-auto py-10 h-screen">
      <Nuxt />
    </div>
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>Copyright © 2022 - All right reserved by Infrared</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
