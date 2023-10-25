import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Tournament } from "../TournamentsRepository";

type ListPeoplePayload = FetchPayload<Tournament[]>;

export type ListPeopleActions = BaseAction<ListPeoplePayload>;

type ListPeopleAction = ListPeopleActions[keyof ListPeopleActions];

interface ListPeopleState {
  data: Tournament[];
  loading: boolean;
  error?: string;
}

export const initialState: ListPeopleState = {
  data: [],
  loading: false,
};

const tournamentsListReducer = (
  state: ListPeopleState = initialState,
  action: ListPeopleAction
): ListPeopleState => {
  switch (action.type) {
    case FetchActionTypes.Start: {
      return {
        ...state,
        loading: true,
      };
    }
    case FetchActionTypes.Succeess: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }
    case FetchActionTypes.Failure: {
      return {
        ...state,
        data: initialState.data,
        error: action.payload,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default tournamentsListReducer;
