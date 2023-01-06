import { Dimensions } from "react-native";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

const BASE_URL = "https://image.tmdb.org/t/p/";
export const getImgPath = (path, size = "w500") => `${BASE_URL}${size}${path}`;

export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const pwRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
