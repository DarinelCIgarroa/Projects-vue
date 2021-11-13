<template>
  <div id="nav">
    <NavComponents />
    <router-view />
  </div>
</template>

<script>
import NavComponents from "@/components/NavComponents.vue";

export default {
  components: { NavComponents },
};
</script>

