import { Resource } from '@shared/models/resource.model';
import * as resourceActions from '../state/resource.actions';

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
    case resourceActions.LOAD_RESOURCE_SUCCESS: {
      return { ...state, currentResource: action.payload, errorMessage: '' };
    }

    case resourceActions.LOAD_RESOURCE_FAIL: {
      return { ...state, currentResource: null, errorMessage: action.payload };
    }

    default:
      return state;
  }
}
