export interface RefreshTokenResponseInterface {
  accessToken: string;
}

import { UserInterface } from "@/core/types";

export interface TokensInterface {
  refresh: string;
  access: string;
}

export interface LoginResponseInterface {
  tokens: TokensInterface;
  user: UserInterface;
}

export interface FetchUserResponseInterface {
  user: UserInterface;
}
