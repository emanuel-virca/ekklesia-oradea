import * as resourceActions from './resource.actions';
import { Resource } from 'src/app/shared/models/resource.model';

export interface ResourceState {
  resources: Resource[];
  errorMessage: string;
}

export const initialState: ResourceState = {
  resources: [],
  errorMessage: ''
};

export function resourceReducer(state = initialState, action: resourceActions.Actions) {
  switch (action.type) {
    case resourceActions.LOAD_RESOURCES_SUCCESS: {
      return { ...state, resources: action.payload, errorMessage: '' };
    }

    case resourceActions.LOAD_RESOURCES_FAIL: {
      return { ...state, resources: [], errorMessage: action.payload };
    }

    default:
      return state;
  }
}
