import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  // GET_PROFILES,
  PROFILE_ERROR,
  // UPDATE_PROFILE,
  // CLEAR_PROFILE,
  // ACCOUNT_DELETED,
  // GET_REPOS,
  // NO_REPOS,
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/profile/me`);
    console.log("res--->" + res);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
