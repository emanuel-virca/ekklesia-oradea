import { Resource } from '@shared/models/resource';
import { ResourceApiActions, ResourceActions } from '../actions';

export const featureKey = 'resourceDetails';

export interface State {
  currentResource: Resource;
  errorMessage: string;
}

export const initialState: State = {
  currentResource: null,
  errorMessage: '',
};

export function reducer(
  state = initialState,
  action: ResourceApiActions.ResourceDetailsApiActionsUnion | ResourceActions.ResourceDetailsActionsUnion
) {
  switch (action.type) {
    case ResourceActions.selectResource.type:
    case ResourceActions.clearSelectedResource.type: {
      return { ...state, currentResource: null, errorMessage: '' };
    }

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
