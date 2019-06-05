import { Resource } from '@shared/models/resource.model';
import { ResourcesApiActions } from '../actions';

export interface State {
  entities: Resource[];
  orderByDirection: firebase.firestore.OrderByDirection;
  startAfter: number;
  currentPage: number;
  isFetching: boolean;
  errorMessage: string;
  pageSize: number;
}

export const initialState: State = {
  entities: [],
  orderByDirection: 'desc',
  startAfter: 0,
  currentPage: 0,
  isFetching: false,
  errorMessage: '',
  pageSize: 5,
};

export function reducer(state = initialState, action: ResourcesApiActions.ResourcesApiActionsUnion): State {
  switch (action.type) {
    case ResourcesApiActions.loadResourcesSuccess.type: {
      const startAfter =
        (action.resources || []).length === state.pageSize ? action.resources[state.pageSize - 1].dateTime : null;

      return {
        ...state,
        isFetching: false,
        entities: [...state.entities, ...action.resources],
        startAfter: startAfter,
        errorMessage: '',
        currentPage: state.currentPage + 1,
      };
    }

    case ResourcesApiActions.loadResourcesFailure.type: {
      return { ...state, isFetching: false, errorMessage: action.errorMsg };
    }

    default:
      return state;
  }
}

export const getResources = (state: State) => state.entities;
export const getIsFetching = (state: State) => state.isFetching;
export const getNextPage = (state: State) => state.startAfter;
