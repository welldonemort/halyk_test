<template>
  <div class="header">
    <div class="header__btn" @click="logout">Выйти</div>
  </div>
</template>

<script>
import { useDataStore } from "@/stores/data";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useDataStore();
    const router = useRouter();

    const logout = () => {
      store.resetUser();
      router.push("/auth");
    };

    return { logout };
  },
};
</script>

<style lang="scss" src="./TheHeader.scss" scoped />
