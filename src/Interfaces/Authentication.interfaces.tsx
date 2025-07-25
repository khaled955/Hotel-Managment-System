export interface  RegisterProps {
  userName:string;
  email:string;
  password:string;
  country:string;
  phoneNumber:string;
  confirmPassword:string;
profileImage:File | null;
role:"user"


}


export interface  LoginProps {
  email:string;
  password:string;


}
export interface  ForgetProps {
  email:string;
  password:string;

}



export interface ResetPasswordProps {
    email:string;
    password: string;
    confirmPassword: string;
    seed: string;
}


export interface ChangePasswordProps {
  oldPassword: string;
  newPassword:string;
confirmPassword: string;

}







export interface UserProfile {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: number;
  country: string;
  profileImage: string;
  role: 'user' | 'admin'; // Add other roles if needed
  verified: boolean;
  createdAt: string; // or Date if parsed
  updatedAt: string; // or Date if parsed
}