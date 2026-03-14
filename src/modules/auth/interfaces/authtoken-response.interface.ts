import { User } from "src/modules/user/interfaces/user.interface";

export interface AuthTokenResponse {
  token: string;
  user?: User;
}

