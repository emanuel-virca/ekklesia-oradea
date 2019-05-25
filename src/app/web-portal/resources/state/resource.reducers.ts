import { Resource } from '@shared/models/resource.model';
import * as resourceActions from './resource.actions';

export interface State {
  resources: Resource[];
  currentResource: Resource;
  errorMessage: string;
}

export const initialState: State = {
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
