<template>
  <div class="container">
    <div class="row">
      <div class="col s12">
        <svg viewBox="0 0 960 300" class="no-projects">
          <symbol id="s-text">
            <text text-anchor="middle" x="50%" y="80%">Proyectos</text>
          </symbol>

          <g class="g-ants">
            <use xlink:href="#s-text" class="text-copy"></use>
            <use xlink:href="#s-text" class="text-copy"></use>
            <use xlink:href="#s-text" class="text-copy"></use>
            <use xlink:href="#s-text" class="text-copy"></use>
            <use xlink:href="#s-text" class="text-copy"></use>
          </g>
        </svg>
      </div>
    </div>
    <router-link
      :to="{ name: 'ProjectCreate' }"
      class="new-project btn-floating btn-large waves-effect waves-light red"
      ><i class="material-icons">add</i></router-link
    >
    <div class="row" v-if="projects.length > 0">
      <CardProject
        v-for="(project, index) in projects"
        :key="index"
        :project="project"
        @deleteProject="deleteProject"
      />
    </div>
    <div class="row" v-else>
      <div class="content col s12">
        <div class="shadows">
          <span>p</span>
          <span>r</span>
          <span>o</span>
          <span>y</span>
          <span>e</span>
          <span>c</span>
          <span>t</span>
          <span>o</span>
          <span>s</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardProject from "@/components/projectsComponent/CardProject.vue";
export default {
  name: "ProyectosComponent",
  components: { CardProject },
  data: () => ({
    projects: [],
  }),
  mounted() {
    this.getProjects();
  },
  methods: {
    async getProjects() {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(
        `https://my-db-vue-default-rtdb.firebaseio.com/projects/${user.localId}/.json?auth=${user.idToken}`
      );
      const data = await res.json();

      for (let i in data) {
        this.projects.push({
          id: i,
          data: data[i],
        });
      }
    },
    deleteProject(id) {
      const user = JSON.parse(localStorage.getItem("user"));
      fetch(
        `https://my-db-vue-default-rtdb.firebaseio.com/projects/${user.localId}/${id}.json?auth=${user.idToken}`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: false }),
        }
      );
      const index = this.projects.findIndex((project) => project.id === id);
      this.projects.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.shadows {
  position: relative;
  text-transform: uppercase;
  text-shadow: -15px 5px 20px #5e5e5f;
  color: white;
  letter-spacing: -0.05em;
  font-family: "Anton", Arial, sans-serif;
  user-select: none;
  text-transform: uppercase;
  font-size: 100px;
  transition: all 0.25s ease-out;
}
.shadows:hover {
  text-shadow: -16px 6px 15px #313131;
}
.new-project {
  margin: 10px;
}
svg {
  /* background-color: lightseagreen; */
  display: block;
  font: 12.5em "Montserrat";
  max-width: 620px;
  max-height: 150px;
  margin: 0 auto;
}
.text-copy {
  fill: none;
  stroke: white;
  stroke-dasharray: 6% 29%;
  stroke-width: 8px;
  stroke-dashoffset: 0%;
  animation: stroke-offset 5.5s infinite linear;
}
.text-copy:nth-child(1) {
  stroke: #261c2c;
  animation-delay: -1;
}
.text-copy:nth-child(2) {
  stroke: #3e2c41;
  animation-delay: -2s;
}
.text-copy:nth-child(3) {
  stroke: #3e2c41;
  animation-delay: -3s;
}
.text-copy:nth-child(4) {
  stroke: #5c527f;
  animation-delay: -4s;
}

.text-copy:nth-child(5) {
  stroke: #6e85b2;
  animation-delay: -5s;
}
@keyframes stroke-offset {
  100% {
    stroke-dashoffset: -35%;
  }
}
</style>