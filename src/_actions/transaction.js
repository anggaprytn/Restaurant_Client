import axios from "axios";
import { API_URL } from "react-native-dotenv";

export const regisTable = (data) => {
  return {
    type: 'REGISTER_TABLE',
    payload: axios.post(`${API_URL}/api/v1/transaction/register_table`, data)
  }
}

export const getDetailTransaction = (headers) => {
  return {
    type: 'GET_DETAIL_TRANSACTION',
    payload: axios.get(`${API_URL}/api/v1/transaction/view_bill`, headers)
  }
}

export const finishTransaction = (data, headers) => {
  return {
    type: 'FINISH_TRANSACTION',
    payload: axios.patch(`${API_URL}/api/v1/transaction/confirm`, data, headers)
  }
}
