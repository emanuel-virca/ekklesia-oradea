import * as authorActions from './author.actions';
import { Author } from 'src/app/shared/models/author.model';

export interface AuthorState {
    authors: Author[];
    currentAuthor: Author;
    errorMessage: string;
}

export const intialState: AuthorState = {
    authors: [],
    currentAuthor: null,
    errorMessage: '',
};

export function authorReducer(state = intialState, action: authorActions.Actions): AuthorState {
    switch (action.type) {
        case authorActions.LOAD_AUTHORS_SUCCESS: {
            return { ...state, authors: action.payload, errorMessage: '' };
        }

        case authorActions.LOAD_AUTHORS_FAIL: {
            return { ...state, authors: [], errorMessage: action.payload };
        }

        case authorActions.LOAD_AUTHOR_SUCCESS: {
            return { ...state, currentAuthor: action.payload, errorMessage: '' };
        }

        case authorActions.LOAD_AUTHOR_FAIL: {
            return { ...state, currentAuthor: null, errorMessage: action.payload };
        }

        case authorActions.CREATE_AUTHOR_SUCCESS: {
            return { ...state, currentAuthor: null, errorMessage: '' };
        }

        case authorActions.CREATE_AUTHOR_FAIL: {
            return { ...state, currentAuthor: null, errorMessage: action.payload };
        }

        case authorActions.DELETE_AUTHOR_SUCCESS: {
            return { ...state, errorMessage: '' };
        }

        case authorActions.DELETE_AUTHOR_FAIL: {
            return { ...state, errorMessage: action.payload };
        }

        default:
            return state;
    }
}
