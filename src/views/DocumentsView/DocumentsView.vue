<template>
  <div class="documents">
    <the-header />

    <the-modal
      :is-open="state.is_modal_open"
      title="Выберите файл"
      @close="closeModal"
    >
      <the-toast :message="state.error" variant="error" @close="closeToast" />

      <div v-if="state.file">
        <div class="documents__actions">
          <span class="documents__file-name">{{ state.file.name }}</span>

          <div @click="reset" class="documents__reset-btn">Сбросить</div>
        </div>

        <div
          :class="[
            'documents__send',
            { 'documents__send-disabled': state.is_loading_send },
          ]"
          @click="send"
        >
          {{ state.is_loading_send ? "Загрузка..." : "Отправить" }}
        </div>
      </div>
      <div
        v-else
        class="documents__choose-btn"
        @click="() => $refs.file.click()"
      >
        Выбрать файл
        <input
          type="file"
          ref="file"
          accept="application/pdf"
          @change="(e) => chooseFile(e)"
          hidden
        />
      </div>
    </the-modal>

    <the-loader v-if="state.is_loading" />
    <div v-else>
      <div v-for="(document, idx) in state.documents" class="documents__item">
        <span class="bold">Наименование</span>
        <div class="documents__download">
          <span>{{ document.fileTypeName }}</span>
        </div>

        <div class="documents__file">
          <img
            src="@/assets/icons/file.svg"
            alt="file-ic"
            class="documents__file-img"
          />

          <span class="bold">{{ document.fileName }}</span>
        </div>

        <div class="documents__upload" @click="() => onChooseFile(idx)">
          <span>Вложить</span>

          <img
            src="@/assets/icons/clip.svg"
            alt="clip-ic"
            class="documents__upload-img"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onBeforeMount, ref, computed } from "vue";
import { useDataStore } from "@/stores/data";
import { useRouter } from "vue-router";
import TheLoader from "@/components/TheLoader/TheLoader.vue";
import axios from "axios";
import TheModal from "@/components/TheModal/TheModal.vue";
import TheToast from "@/components/TheToast/TheToast.vue";
import TheHeader from "@/components/TheHeader/TheHeader.vue";

export default {
  components: { TheHeader, TheToast, TheModal, TheLoader },
  setup() {
    const file = ref(null);
    const store = useDataStore();
    const router = useRouter();

    const state = reactive({
      is_loading: true,
      is_loading_send: false,
      is_modal_open: false,
      error: "",
      //
      file: null,
      current_idx: null,
      documents: [],
    });

    const getDocuments = () => {
      state.is_loading = true;

      axios
        .post(`${store.baseUrl}/arm/api/File/List`, {
          processInstanceId: store.processInstanceId,
        })
        .then((resp) => {
          state.documents = resp.data.map((document) => ({
            ...document,
            file: null,
          }));
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          state.is_loading = false;
        });
    };

    const onChooseFile = (idx) => {
      state.current_idx = idx;
      state.is_modal_open = true;
    };

    const reset = () => {
      state.file = null;
    };

    const send = () => {
      state.is_loading_send = true;

      axios
        .post(`${store.baseUrl}/arm/api/File/UploadFiles`, {
          file: state.file,
          fileData: [
            {
              processInstanceId:
                state.documents[state.current_idx].processInstanceId,
              fileTypeCode: "7",
              page: "1",
              fileName: state.file.name,
            },
          ],
        })
        .then(() => {
          closeModal();
          getDocuments();
        })
        .catch((e) => {
          state.error = e.response ? e.response.data : e.message;
        })
        .finally(() => {
          state.is_loading_send = false;
        });
    };

    const closeToast = () => {
      state.error = "";
    };

    const chooseFile = (e) => {
      state.file = e.target.files[0];
    };

    const closeModal = () => {
      reset();
      closeToast();
      state.current_idx = null;
      state.is_modal_open = false;
    };

    onBeforeMount(() => {
      if (!store.accessToken) router.push("/auth");
      else getDocuments();
    });

    return {
      state,
      onChooseFile,
      chooseFile,
      closeModal,
      file,
      reset,
      send,
      closeToast,
    };
  },
};
</script>

<style lang="scss" src="./DocumentsView.scss" scoped />
