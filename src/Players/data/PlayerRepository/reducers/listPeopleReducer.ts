import BaseAction from "Base/types/BaseAction";
import FetchActionTypes from "Base/types/FetchActionTypes";
import FetchPayload from "Base/types/FetchPayload";

import { Player } from "../PlayersRepository";

type ListPlayersPayload = FetchPayload<Player[]>;

export type ListPlayersActions = BaseAction<ListPlayersPayload>;

type ListPlayersAction = ListPlayersActions[keyof ListPlayersActions];

interface ListPlayersState {
  data: Player[];
  loading: boolean;
  error?: string;
}

export const initialState: ListPlayersState = {
  data: [],
  loading: false,
};

const listPlayersReducer = (
  state: ListPlayersState = initialState,
  action: ListPlayersAction
): ListPlayersState => {
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

export default listPlayersReducer;
