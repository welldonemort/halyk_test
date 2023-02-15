<template>
  <div class="auth">
    <the-toast :message="state.error" variant="error" @close="closeToast" />

    <form class="auth__form" @submit="login">
      <img src="@/assets/img/logo.png" alt="logo" class="auth__logo" />

      <input
        type="text"
        placeholder="Логин"
        class="auth__input"
        v-model="state.login"
      />

      <input
        type="password"
        placeholder="Пароль"
        class="auth__input"
        v-model="state.password"
      />

      <button
        type="submit"
        :class="[
          'auth__btn',
          { 'auth__btn-disabled': state.is_loading || !isValid },
        ]"
        @click="login"
      >
        {{ state.is_loading ? "Загрузка..." : "Вход в систему" }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { computed, reactive, onMounted } from "vue";
import TheToast from "@/components/TheToast/TheToast.vue";
import { useDataStore } from "@/stores/data";
import { useRouter } from "vue-router";

export default {
  components: { TheToast },
  setup() {
    const store = useDataStore();
    const router = useRouter();

    const state = reactive({
      is_loading: false,
      error: "",
      //
      login: "",
      password: "",
    });

    const closeToast = () => {
      state.error = "";
    };

    const login = (e) => {
      e.preventDefault();
      state.is_loading = true;

      axios
        .post(`${store.baseUrl}/identity/api/Account/login`, {
          login: state.login,
          password: state.password,
          numAttempt: 0,
        })
        .then((resp) => {
          store.setUser(resp.data);
          if (store.accessToken) router.push("/documents");
        })
        .catch((e) => {
          state.error = e.response.data ? e.response.data.toString() : "";
        })
        .finally(() => {
          state.is_loading = false;
        });
    };

    // computed

    const isValid = computed(() => {
      return state.login.length && state.password.length;
    });

    onMounted(() => {
      store.resetUser();
    });

    return { state, login, closeToast, isValid };
  },
};
</script>

<style lang="scss" src="./AuthView.scss" scoped />
