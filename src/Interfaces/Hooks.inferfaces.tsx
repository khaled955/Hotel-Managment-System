export interface DecodedToken {
  _id: string;
  role: string;
  verified: boolean;
  iat: number;
  exp: number;
}