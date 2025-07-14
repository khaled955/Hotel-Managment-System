 export interface AuthContextType {
  token: string | undefined;
  setToken: (token: string | undefined) => void;
  getUserInformation:()=>Promise<void>;
  updateUserInformation:()=>Promise<void>
}
