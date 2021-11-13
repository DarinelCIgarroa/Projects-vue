<template>
  <div v-if="project.data.status != false" class="col s12 l6">
    <div class="card horizontal">
      <div class="card-stacked">
        <div class="card-content">
          <span class="card-title">{{ project.data.name }}</span>
          <p><b>Descripción:</b> {{ project.data.description }}</p>
          <b>Tecnologías:</b
          ><span v-for="(lang, index) in project.data.langs" :key="index">
            {{ index < project.data.langs.length - 1 ? ` ${lang},` : lang }}
          </span>
        </div>
        <div class="card-action">
          <router-link
            :to="`/actualizar-proyectos/${project.id}`"
            class="waves-effect light-blue darken-3 btn col s6"
          >
            <i class="material-icons">edit</i>
          </router-link>
          <button
            @click="deleteProject(project.id)"
            class="waves-effect red darken-4 btn col s6"
          >
            <i class="material-icons">delete</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProject",
  props: {
    project: Object,
  },
  methods: {
    deleteProject(id) {
      this.$emit("deleteProject", id);
    },
  },
};
</script>
<style scoped>
.card-action {
  display: flex;
  justify-content: space-around;
}
.card-action a {
  margin: 0 5px;
}
.langs {
  display: inline-block;
}
</style>