import { Resource } from '@shared/models/resource.model';
import { ResourceApiActions } from '../actions';

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

export function resourceReducer(state = initialState, action: ResourceApiActions.ResourceApiActionsUnion) {
  switch (action.type) {
    case ResourceApiActions.loadResourceSuccess.type: {
      return { ...state, currentResource: action.resource, errorMessage: '' };
    }

    case ResourceApiActions.loadResourceFailure.type: {
      return { ...state, currentResource: null, errorMessage: action.errorMsg };
    }

    default:
      return state;
  }
}

export const getCurrentResource = (state: State) => state.currentResource;
export const getResources = (state: State) => state.resources;
