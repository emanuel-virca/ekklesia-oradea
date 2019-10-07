import { Resource } from '@shared/models/resource';
import * as resourceActions from './resource.actions';

export interface ResourceState {
  resources: Resource[];
  currentResource: Resource;
  errorMessage: string;
}

export const initialState: ResourceState = {
  resources: [],
  currentResource: null,
  errorMessage: '',
};

export function resourceReducer(state = initialState, action: resourceActions.Actions) {
  switch (action.type) {
    case resourceActions.LOAD_RESOURCES_SUCCESS: {
      return { ...state, resources: action.payload, errorMessage: '' };
    }

    case resourceActions.LOAD_RESOURCES_FAIL: {
      return { ...state, resources: [], errorMessage: action.payload };
    }

    case resourceActions.SET_CURRENT_RESOURCE: {
      return { ...state, currentResource: action.payload, errorMessage: '' };
    }

    case resourceActions.CREATE_RESOURCE_SUCCESS:
    case resourceActions.UPDATE_RESOURCE_SUCCESS:
    case resourceActions.DELETE_RESOURCE_SUCCESS:
    case resourceActions.PUBLISH_RESOURCE_SUCCESS:
    case resourceActions.UNPUBLISH_RESOURCE_SUCCESS: {
      return { ...state, errorMessage: '', currentResource: null };
    }

    case resourceActions.CREATE_RESOURCE_FAIL:
    case resourceActions.UPDATE_RESOURCE_FAIL:
    case resourceActions.DELETE_RESOURCE_FAIL:
    case resourceActions.PUBLISH_RESOURCE_FAIL:
    case resourceActions.UNPUBLISH_RESOURCE_FAIL: {
      return { ...state, errorMessage: action.payload };
    }

    default:
      return state;
  }
}
