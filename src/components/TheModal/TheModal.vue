<template>
  <div v-if="isOpen" class="modal-holder" @click.self="emitClose">
    <div class="modal">
      <div class="modal__header">
        <span>{{ title }}</span>

        <img
          src="@/assets/icons/close-green.svg"
          alt="close-ic"
          class="modal__close"
          @click="emitClose"
        />
      </div>

      <div class="modal__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Modal",
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const emitClose = (e) => {
      emit("close");
    };

    return { emitClose };
  },
};
</script>

<style lang="scss" src="./TheModal.scss" scoped />
