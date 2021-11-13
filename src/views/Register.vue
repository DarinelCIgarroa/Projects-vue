<template>
  <div class="container">
    <div v-show="error" class="col s12 m7 l12">
      <div class="card horizontal">
        <div class="card-stacked">
          <div class="card-content">
            <p>{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- <h4>Registrarse</h4> -->
      <loader v-show="loader" />
      <form @submit.prevent="register" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input v-model="email" id="email" type="email" class="validate" />
            <label class="item-label" for="email">Correo</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              v-model="password"
              id="password"
              type="password"
              class="validate"
            />
            <label class="item-label" for="password">Contraseña</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              v-model="confirmPassword"
              id="confirmPassword"
              type="password"
              class="validate"
            />
            <label class="item-label" for="confirmPassword"
              >Confirmar Contraseña</label
            >
          </div>
        </div>
        <div class="row content-sesion">
          <button
            class="btn waves-effect waves-light col s12"
            type="submit"
            name="action"
          >
            Registrarse
            <i class="material-icons right">send</i>
          </button>
          <router-link
            :to="{ name: 'Login' }"
            class="btn waves-effect pink accent-3 col s12"
            type="submit"
            name="action"
          >
            Inciar Sesión
            <i class="material-icons right">input</i>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";
import router from "@/router/index.js";

export default {
  components: { Loader },
  name: "Home",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      loader: false,
    };
  },
  methods: {
    async register() {
      if (this.email.length === 0) {
        this.error = "Ingresa un correo valido";
      } else if (this.password != this.confirmPassword) {
        this.error = "Las contraseñas no coinciden";
      }else if (this.password < 6){
        this.error = "La contraseña debe tener al menos 6 caracteres";
      } else {
        this.loader = true;
        const API_KEY = "AIzaSyAb1fuycB1YQmfJ5eRK_gUK1lwOx0J0daY";
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
          {
            method: "POST",
            body: JSON.stringify({
              email: this.email,
              password: this.password,
              returnSecureToken: true,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.error) {
          this.error = data.error.errors[0].message;
        } else {
          localStorage.setItem("user", JSON.stringify(data));
          router.push("/proyectos");
        }
        this.loader = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
.item-label {
  font-size: 18px;
}
.content-sesion button {
  margin-bottom: 10px;
}
.card-content {
  text-align: center;
  font-size: 16px;
  color: red;
}
</style>
