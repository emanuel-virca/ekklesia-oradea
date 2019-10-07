import { Resource } from '@shared/models/resource';
import { CollectionsActions, CollectionsApiActions } from '../actions';

export const featureKey = 'collections';

export interface State {
  entities: Resource[];
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
  orderBy: 'addedOn',
  orderByDirection: 'desc',
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
    case CollectionsActions.loadLikedResources.type: {
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
      };
    }

    case CollectionsApiActions.loadLikedResourcesSuccess.type: {
      const likedResource = action.likedResources || [];
      const startAfter =
        likedResource.length === state.pageSize ? action.likedResources[state.pageSize - 1].addedOn : null;

      return {
        ...state,
        isFetching: false,
        entities: [...state.entities, ...likedResource.map(x => x.resource)],
        errorMessage: '',
        startAfter,
        currentPage: state.currentPage + 1,
      };
    }

    case CollectionsApiActions.loadLikedResourcesFailure.type: {
      return { ...state, isFetching: false, errorMessage: action.errorMsg };
    }

    case CollectionsApiActions.addToLikedResourcesSuccess.type: {
      return {
        ...state,
        isFetching: false,
        entityIds: [...state.entityIds, action.resource.id],
        errorMessage: '',
      };
    }

    case CollectionsApiActions.removeFromLikedResourcesSuccess.type: {
      return {
        ...state,
        isFetching: false,
        entities: [...state.entities.filter(x => x.id !== action.resource.id)],
        entityIds: [...state.entityIds.filter(x => x !== action.resource.id)],
        errorMessage: '',
      };
    }

    case CollectionsApiActions.loadLikedResourceIdsSuccess.type: {
      return {
        ...state,
        entityIds: action.resourceIds,
      };
    }

    case CollectionsActions.clearLikedResources.type: {
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
