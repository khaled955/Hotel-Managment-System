

export const PHONE_NUMBER = {
          value:/^01[0-9]{9}$/,
          message:"Egyptian 10 Digits Number Only Accepted"
        }


export const USER_NAME = {
          value:/^[a-zA-Z0-9]{3,8}$/,
          message:"User Name must be 3-8 characters long and can only contain letters and numbers"
        }

 export const EMAIL_VALIDATION = {
          value:/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
            message:"Invalid Email"
        }

 export const PASSWORD_VALIDATION = {
  value:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  message :`Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character`
 }       