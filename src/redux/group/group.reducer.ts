import { SetCurrentMemberAction } from './group.actions'
import { CurrentGroupProps } from './group.types'

const initialState: CurrentGroupProps = {
  members: [],
}

type Action = SetCurrentMemberAction

const groupReducer = (
  state = initialState,
  action: Action
): CurrentGroupProps => {
  switch (action.type) {
    case 'SET_CURRENT_MEMBERS':
      return {
        ...state,
        members: action.payload,
      }
    default:
      return state
  }
}

export default groupReducer
