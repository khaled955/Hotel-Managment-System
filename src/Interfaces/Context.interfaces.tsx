import { UserProfile } from "./Authentication.interfaces";

 export interface AuthContextType {
  token: string | undefined;
  setToken: (token: string | undefined) => void;
  getUserInformation:()=>Promise<void>;
  userInfo:UserProfile | null;
}
