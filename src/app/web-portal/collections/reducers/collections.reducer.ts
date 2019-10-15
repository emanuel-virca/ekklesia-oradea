import { CollectionsActions, CollectionsApiActions } from '../actions';
import { LibraryResource } from '@shared/models/library';

export const featureKey = 'collections';

export interface State {
  entities: LibraryResource[];
  entityIds: string[];
  isFetching: boolean;
  errorMessage: string;
  pageSize: number;
  currentPage: number;
  startAfter: any;
  orderBy: string;
  orderByDirection: firebase.firestore.OrderByDirection;
}

export const initialState: State = {
  entities: [],
  entityIds: [],
  orderBy: 'sortNo',
  orderByDirection: 'asc',
  isFetching: false,
  errorMessage: '',
  pageSize: 20,
  currentPage: 0,
  startAfter: null,
};

export function reducer(
  state = initialState,
  action: CollectionsActions.CollectionsActionsUnion | CollectionsApiActions.CollectionsApiActionsUnion
): State {
  switch (action.type) {
    case CollectionsActions.loadLibraryResources.type: {
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
      };
    }

    case CollectionsApiActions.loadLibraryResourcesSuccess.type: {
      const likedResources = action.likedResources || [];
      const startAfter =
        likedResources.length === state.pageSize ? action.likedResources[state.pageSize - 1].sortNo : null;

      return {
        ...state,
        isFetching: false,
        entities: [...state.entities, ...likedResources],
        errorMessage: '',
        startAfter,
        currentPage: state.currentPage + 1,
      };
    }

    case CollectionsApiActions.loadLibraryResourcesFailure.type: {
      return { ...state, isFetching: false, errorMessage: action.errorMsg };
    }

    case CollectionsApiActions.addToLibrarySuccess.type: {
      return {
        ...state,
        isFetching: false,
        entityIds: [...state.entityIds, action.resource.id],
        errorMessage: '',
      };
    }

    case CollectionsApiActions.removeFromLibrarySuccess.type: {
      return {
        ...state,
        isFetching: false,
        entities: [...state.entities.filter(x => x.resource.id !== action.resource.id)],
        entityIds: [...state.entityIds.filter(x => x !== action.resource.id)],
        errorMessage: '',
      };
    }

    case CollectionsApiActions.loadUserLikesSuccess.type: {
      return {
        ...state,
        entityIds: action.resourceIds,
      };
    }

    case CollectionsActions.clearLibraryResources.type: {
      return { ...state, entities: [], currentPage: 0, startAfter: null };
    }

    case CollectionsActions.changeOrderDirection.type: {
      return { ...state, entities: [], currentPage: 0, startAfter: null, orderByDirection: action.orderByDirection };
    }

    case CollectionsActions.changeOrderBy.type: {
      return { ...state, entities: [], currentPage: 0, startAfter: null, orderBy: action.orderBy };
    }

    default:
      return state;
  }
}
