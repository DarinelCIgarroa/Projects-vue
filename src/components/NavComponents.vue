<template>
  <nav>
    <div class="nav-wrapper grey darken-3">
      <router-link :to="{ name: 'Projects' }" class="brand-logo"
        >Darinel</router-link
      >
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"
        ><i class="material-icons">menu</i></a
      >
      <ul class="right hide-on-med-and-down">
        <li v-if="!protectRoute">
          <router-link :to="{ name: 'Login' }">Iniciar Sesión</router-link>
        </li>
        <li v-if="!protectRoute">
          <router-link :to="{ name: 'Register' }">Registrarse</router-link>
        </li>
        <li v-if="protectRoute">
          <router-link
            class="
              waves-effect waves-light
              btn
              blue
              lighten-5
              black-text
              text-darken-2
            "
            :to="{ name: 'Projects' }"
            >Proyectos</router-link
          >
        </li>
        <li v-if="protectRoute">
          <router-link @click="logout" :to="{ name: 'Register' }"
            >Cerrar Sesión</router-link
          >
        </li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="mobile-demo">
    <li><router-link v-if="!protectRoute" to="/">Registrarse</router-link></li>
    <li>
      <router-link v-if="!protectRoute" to="/login">Iniciar sesión</router-link>
    </li>
    <li>
      <router-link v-if="protectRoute" :to="{ name: 'Projects' }"
        >Proyectos</router-link
      >
    </li>
    <div class="row">
      <button @click="logout" class="waves-effect waves-light btn col s12">
        <i class="material-icons right">exit_to_app</i>Cerrar Sesión
      </button>
    </div>
  </ul>
</template> 
<script>
import route from "@/router/index.js";
import router from "../router";
export default {
  name: "NavComponent",
  mounted() {
    M.AutoInit();
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      router.push({ name: "Login" });
    },
  },
  computed: {
    protectRoute() {
      if (localStorage.getItem("user") != undefined) {
        return true;
      }
      return false;
    },
  },
};
</script>