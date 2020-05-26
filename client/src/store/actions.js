import * as actionTypes from "./actionTypes";
import * as api from "../api";

// TODO:
// Doesn't handle unexpected errors such as network failure/back-end 500
export function initApp() {
  return async function (dispatch) {
    try {
      const { data: templates } = await api.getTemplates();
      const { data: deployments } = await api.getDeployments();

      dispatch({
        type: actionTypes.INIT_OK,
        templates,
        deployments,
      });
    } catch (e) {
      dispatch({ type: actionTypes.INIT_FAIL });
    }
  };
}

export function refreshDeployments() {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.REFRESH_DEPLOYMENTS,
    });

    try {
      const { data: deployments } = await api.getDeployments();

      dispatch({
        type: actionTypes.REFRESH_DEPLOYMENTS_OK,
        deployments,
      });
    } catch (e) {
      dispatch({
        type: actionTypes.REFRESH_DEPLOYMENTS_FAIL,
      });
    }
  };
}

export function addDeployment(data) {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.ADD_DEPLOYMENT,
      data,
    });

    try {
      const { data: deployment } = await api.createDeployment(data);
      dispatch({
        type: actionTypes.ADD_DEPLOYMENT_OK,
        deployment,
      });
    } catch (e) {
      dispatch({
        type: actionTypes.ADD_DEPLOYMENT_FAIL,
        errors: e.response.data.fields,
      });
    }
  };
}

export function deleteDeployment(id) {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.DELETE_DEPLOYMENT,
      id,
    });

    try {
      await api.deleteDeployment(id);
      dispatch({
        type: actionTypes.DELETE_DEPLOYMENT_OK,
        id,
      });
    } catch (e) {
      dispatch({ type: actionTypes.DELETE_DEPLOYMENT_FAIL });
    }
  };
}
