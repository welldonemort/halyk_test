<template>
  <div
    :class="`toast ${variant ? 'toast-' + variant : ''} ${
      message ? 'toast-visible' : ''
    }`"
  >
    {{ message }}

    <img
      src="@/assets/icons/close.svg"
      alt="close-ic"
      class="toast__close"
      @click="closeToast"
    />
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
    variant: {
      type: String,
      default: "",
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const closeToast = () => {
      emit("close");
    };

    return { closeToast };
  },
};
</script>

<style lang="scss" src="./TheToast.scss" scoped />
