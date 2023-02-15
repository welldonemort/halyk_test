<template>
  <div class="header">
    <div class="header__btn" @click="logout">Выйти</div>
  </div>
</template>

<script lang="ts">
import { useDataStore } from "@/stores/data";
import { useRouter } from "vue-router";
import type { StoreDataT } from "@/types";

export default {
  setup() {
    const store: StoreDataT = useDataStore();
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
