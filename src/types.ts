export interface UserDataT {
  accessToken: string;
  refreshToken: string;
}

export interface StoreDataT {
  accessToken: string;
  refreshToken: string;
  baseUrl: string;
  processInstanceId: string;
  setUser: any;
  resetUser: any;
}

export interface DocumentListItemT {
  fileName: string;
  fileTypeName: string;
  processInstanceId: string;
}

export interface FileT {
  name: string;
}
