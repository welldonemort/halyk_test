import { ref } from "vue";
import { defineStore } from "pinia";
import type { UserDataT } from "@/types";

const accessToken_ls = localStorage.getItem("accessToken");
const refreshToken_ls = localStorage.getItem("accessToken");

export const useDataStore = defineStore("data", () => {
  const baseUrl = "https://products.halyklife.kz/api/v1/test/insis";

  const accessToken = ref(accessToken_ls || "");
  const refreshToken = ref(refreshToken_ls || "");

  const processInstanceId = ref("");

  const setUser = (data: UserDataT) => {
    accessToken.value = data.accessToken;
    refreshToken.value = data.refreshToken;

    localStorage.setItem("accessToken", accessToken.value);
    localStorage.setItem("refreshToken", refreshToken.value);

    processInstanceId.value = data.accessToken
      ? "0370c1fd-3b3d-4974-a0cb-23e8ccc727cd"
      : "";
  };

  const resetUser = () => {
    accessToken.value = "";
    refreshToken.value = "";
    processInstanceId.value = "";

    localStorage.clear();
  };

  return {
    accessToken,
    refreshToken,
    baseUrl,
    processInstanceId,
    //
    setUser,
    resetUser,
  };
});
