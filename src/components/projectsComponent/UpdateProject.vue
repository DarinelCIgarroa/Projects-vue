<template>
  <div class="row">
    <form class="col s12" @submit.prevent="updateProject">
      <div class="row">
        <div class="input-field col s6">
          <input
            id="name"
            type="text"
            class="validate"
            v-model="project.name"
            required
          />
          <label v-if="project.name == false" for="name">Nombre</label>
        </div>
        <div class="input-field col s6">
          <input
            id="description"
            type="text"
            class="validate"
            v-model="project.description"
            required
          />
          <label v-if="project.description == false" for="description"
            >Description</label
          >
        </div>
        <div class="input-field col s12 langs-content">
          <p>
            <label>
              <input type="checkbox" v-model="project.langs" value="html5" />
              <span>HTML5</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" v-model="project.langs" value="css3" />
              <span>CSS3</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="checkbox"
                v-model="project.langs"
                value="javaScript"
              />
              <span>JAVASCRIPT</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" v-model="project.langs" value="php" />
              <span>PHP</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" v-model="project.langs" value="laravel" />
              <span>LARAVEL</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" v-model="project.langs" value="vuejs" />
              <span>VUEJS</span>
            </label>
          </p>
        </div>
        <button
          class="btn waves-effect waves-light col s12 l12"
          type="submit"
          name="action"
        >
          Guardar proyecto
          <i class="material-icons right">send</i>
        </button>
        <router-link
          :to="{ name: 'Projects' }"
          class="waves-effect red accent-3 btn-small col s12 l12 back-page"
          ><i class="material-icons right">arrow_back</i>REGRESAR</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import router from "@/router/index.js";
export default {
  name: "UpdateProject",
  data() {
    return {
      id: this.$route.params.id,
      project: {
        name: "",
        description: "",
        langs: [],
      },
    };
  },
  mounted() {
    this.getProject();
  },
  methods: {
    async updateProject() {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(
        `https://my-db-vue-default-rtdb.firebaseio.com/projects/${user.localId}/${this.id}.json?auth=${user.idToken}`,
        {
          method: "PATCH",
          body: JSON.stringify(this.project),
        }
      );
      router.push("/proyectos");
    },
    async getProject() {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(
        `https://my-db-vue-default-rtdb.firebaseio.com/projects/${user.localId}/${this.id}.json?auth=${user.idToken}`
      );
      const data = await response.json();
      this.project = data;
    },
  },
};
</script>

<style scoped>
.langs-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.back-page {
  margin: 10px;
}
</style>