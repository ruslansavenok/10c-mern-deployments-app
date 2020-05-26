import unionWith from "lodash/unionWith";
import * as actionTypes from "./actionTypes";
import { makeReducer } from "./utils";

const defaultState = {
  deployments: null,
  templates: null,
  appLoadError: false,
  newDeployment: {
    isSubmitting: false,
    errors: null,
  },
  isDeletingDeploymentWithId: null,
};

const reducer = {
  [actionTypes.INIT_OK]: (state, { templates, deployments }) => ({
    ...state,
    templates,
    deployments,
  }),

  [actionTypes.INIT_FAIL]: (state) => ({
    ...state,
    appLoadError: true,
  }),

  [actionTypes.REFRESH_DEPLOYMENTS_OK]: (state, { deployments }) => ({
    ...state,
    deployments: unionWith(
      deployments,
      state.deployments,
      (newItem, oldItem) => newItem._id !== oldItem.id
    ),
  }),

  [actionTypes.REFRESH_DEPLOYMENTS_FAIL]: (state) => ({
    ...state,
    appLoadError: true,
  }),

  [actionTypes.ADD_DEPLOYMENT]: (state) => ({
    ...state,
    newDeployment: {
      isSubmitting: true,
      errors: null,
    },
  }),

  [actionTypes.ADD_DEPLOYMENT_OK]: (state, { deployment }) => ({
    ...state,
    deployments: [deployment, ...state.deployments],
    newDeployment: {
      isSubmitting: false,
      errors: null,
    },
  }),

  [actionTypes.ADD_DEPLOYMENT_FAIL]: (state, { errors }) => ({
    ...state,
    newDeployment: {
      isSubmitting: false,
      errors,
    },
  }),

  [actionTypes.DELETE_DEPLOYMENT]: (state, { id }) => ({
    ...state,
    isDeletingDeploymentWithId: id,
  }),

  [actionTypes.DELETE_DEPLOYMENT_OK]: (state, { id }) => ({
    ...state,
    isDeletingDeploymentWithId: null,
    deployments: state.deployments.filter((item) => item.id !== id),
  }),

  [actionTypes.DELETE_DEPLOYMENT_FAIL]: (state) => ({
    ...state,
    isDeletingDeploymentWithId: false,
    appLoadError: true,
  }),
};

export default makeReducer(reducer, defaultState);
