<template>
  <div class="container">
    <div class="row">
      <div class="content-text col s12">
        <div class="welcome">Bienvenido</div>
        <div class="login-text">
          <span>¡Nos alegra verte de vuelta!</span>
        </div>
      </div>

      <div v-show="error" class="col s12 m7 l12">
        <div class="card horizontal">
          <div class="card-stacked">
            <div class="card-content">
              <p>Los datos ingresados no coinciden con nuestros registros.</p>
            </div>
          </div>
        </div>
      </div>
      <loader v-show="loader" />
      <form @submit.prevent="login" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input v-model="email" id="email" type="text" class="validate" />
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
        <button
          class="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Inciar Sesión
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import router from "@/router/index.js";

export default {
  components: { Loader },
  name: "Home",
  data() {
    return {
      email: "",
      password: "",
      error: false,
      loader: false,
    };
  },
  methods: {
    async login() {
      this.loader = true;
      const API_KEY = "AIzaSyAb1fuycB1YQmfJ5eRK_gUK1lwOx0J0daY";
      if ((this.email != "") & (this.password.length > 0)) {
        try {
          const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
            {
              method: "POST",
              body: JSON.stringify({
                email: this.email,
                password: this.password,
                returnSecureToken: true,
              }),
            }
          );
          this.loader = false;
          const data = await response.json();
          if (data.error) {
            this.error = true;
          } else {
            this.error = false;
            localStorage.setItem("user", JSON.stringify(data));
            router.push("/proyectos");
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.content-text {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;
  height: 100px;
  color: #555;
  font-family: "Roboto";
  font-weight: 300;
  font-size: 30px;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  -webkit-transform: translate3d(0, 0, 0);
}
.welcome,
.login-text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
}
.welcome:first-of-type {
  animation: showup 7s infinite;
}

.welcome {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
}
.login-text:last-of-type {
  width: 0px;
  animation: reveal 7s infinite;
}
.login-text:last-of-type span {
  margin-left: -355px;
  animation: slidein 7s infinite;
}

@keyframes showup {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes slidein {
  0% {
    margin-left: -800px;
  }
  20% {
    margin-left: -800px;
  }
  35% {
    margin-left: 0px;
  }
  100% {
    margin-left: 0px;
  }
}

@keyframes reveal {
  0% {
    opacity: 0;
    width: 0px;
  }
  20% {
    opacity: 1;
    width: 0px;
  }
  30% {
    width: 355px;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    width: 355px;
  }
}
@media only screen and (max-width: 600px) {
  .content-text {
    flex-direction: column;
    flex-wrap: nowrap;
    font-size: 25px;
  }
}
.container {
  margin-top: 20px;
}
.item-label {
  font-size: 18px;
}
.card-content {
  text-align: center;
  color: red;
  font-size: 16px;
}
.content-svg {
  background-color: lightgreen;
  display: flex;
  justify-content: center;
}
</style>
