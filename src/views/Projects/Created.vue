<template>
  <div class="container">
    <h4 style="text-align: center">Crear nuevo proyecto</h4>
    <CreatedProject @dataProject="createProject" />
  </div>
</template>

<script>
import CreatedProject from "@/components/projectsComponent/CreatedProject.vue";
import router from "@/router/index.js"
export default {
  components: {
    CreatedProject,
  },
  methods: {
    createProject(data) {
      const user = JSON.parse(localStorage.getItem("user"))
      fetch(`https://my-db-vue-default-rtdb.firebaseio.com/projects/${user.localId}/.json/?auth=${user.idToken}`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      router.push("/proyectos");
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  margin-top: 20px;
  -webkit-box-shadow: 0px 0px 31px -1px rgba(0, 0, 0, 0.56);
  -moz-box-shadow: 0px 0px 31px -1px rgba(0, 0, 0, 0.56);
  box-shadow: 0px 0px 31px -1px rgba(0, 0, 0, 0.56);
}
</style>