import axios from "axios";
import { API_URL } from "react-native-dotenv";

export const getMenus = () => {
  return {
    type: 'GET_MENUS',
    payload: axios.get(`${API_URL}/api/v1/menus/`)
  }
}
