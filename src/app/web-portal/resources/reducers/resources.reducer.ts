import { Resource } from '@shared/models/resource.model';
import { ResourcesApiActions, ResourcesActions } from '../actions';

export interface State {
  entities: Resource[];
  orderBy: string;
  orderByDirection: firebase.firestore.OrderByDirection;
  startAfter: any;
  currentPage: number;
  isFetching: boolean;
  errorMessage: string;
  pageSize: number;
}

export const initialState: State = {
  entities: [],
  orderBy: 'dateTime',
  orderByDirection: 'desc',
  startAfter: null,
  currentPage: 0,
  isFetching: false,
  errorMessage: '',
  pageSize: 20,
};

export function reducer(
  state = initialState,
  action: ResourcesApiActions.ResourcesApiActionsUnion | ResourcesActions.ResourcesActionsUnion
): State {
  switch (action.type) {
    case ResourcesActions.loadResources.type: {
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
      };
    }
    case ResourcesApiActions.loadResourcesSuccess.type: {
      const resources = action.resources || [];
      const startAfter =
        resources.length === state.pageSize ? action.resources[state.pageSize - 1][state.orderBy] : null;

      return {
        ...state,
        isFetching: false,
        entities: [...state.entities, ...resources],
        startAfter,
        errorMessage: '',
        currentPage: state.currentPage + 1,
      };
    }

    case ResourcesApiActions.loadResourcesFailure.type: {
      return { ...state, isFetching: false, errorMessage: action.errorMsg };
    }

    case ResourcesActions.clearResources.type: {
      return { ...state, entities: [], currentPage: 0, startAfter: null };
    }

    case ResourcesActions.changeResourceOrderDirection.type: {
      return { ...state, entities: [], currentPage: 0, startAfter: null, orderByDirection: action.orderByDirection };
    }

    case ResourcesActions.changeResourceOrderBy.type: {
      return { ...state, entities: [], currentPage: 0, startAfter: null, orderBy: action.orderBy };
    }

    default:
      return state;
  }
}
