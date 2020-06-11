import {
  SetCurrentMemberAction,
  SetMonthlySummaryAction,
  SetMonthlyUserSummaryAction,
} from './group.actions'
import { CurrentGroupProps } from './group.types'

const initialState: CurrentGroupProps = {
  members: [],
  monthlySummaries: [],
  monthlyUserSummaries: [],
}

type Action =
  | SetCurrentMemberAction
  | SetMonthlySummaryAction
  | SetMonthlyUserSummaryAction

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
    case 'SET_MONTHLY_SUMMARIES':
      return {
        ...state,
        monthlySummaries: action.payload,
      }
    case 'SET_MONTHLY_USER_SUMMARIES':
      return {
        ...state,
        monthlyUserSummaries: action.payload,
      }
    default:
      return state
  }
}

export default groupReducer
