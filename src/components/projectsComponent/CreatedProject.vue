<template>
  <div class="row">
    <form class="col s12" @submit.prevent="createdProject">
      <div class="row">
        <div class="input-field col s6">
          <input
            id="name"
            type="text"
            class="validate"
            v-model="project.name"
            required
          />
          <label for="name">Nombre</label>
        </div>
        <div class="input-field col s6">
          <input
            id="description"
            type="text"
            class="validate"
            v-model="project.description"
            required
          />
          <label for="description">Description</label>
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
              class="btn waves-effect red accent-3 col s12 l12"
              type="submit"
              name="action"
              :to="{ name: 'Projects' }"
            >
              Regresar
              <i class="material-icons right">arrow_back</i>
            </router-link>
          </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreatedProject",
  data: () => ({
    project: {
      name: "",
      description: "",
      langs: [],
      status: true,
    },
  }),
  methods: {
    createdProject() {
      this.$emit("dataProject", this.project);
      (this.project.name = []), (this.project.description = []);
      this.project.langs = [];
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
.options-buttons {
  background-color: lightgreen;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
button{
  margin-bottom: 10px;
}
</style>