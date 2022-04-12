import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import { ApiClient } from '../api/index'

const api = new ApiClient()

export const getEvents = () => async (dispatch) => {
  try {
    const { data } = await api.getEvents();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const addEvent = (post) => async (dispatch) => {
  try {
    const { data } = await api.addEvent(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateEvent = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updateEvent(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};


export const deleteEvent = (id) => async (dispatch) => {
  try {
    await api.deleteEvent(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
