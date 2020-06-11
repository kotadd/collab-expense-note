import {
  MemberType,
  ReduxCurrentGroupProps,
  MonthlySummaryType,
  MonthlyUserSummaryType,
} from './group.types'

export const membersSelector: (
  state: ReduxCurrentGroupProps
) => MemberType[] = (state) => state.group.members

export const monthlySummariesSelector: (
  state: ReduxCurrentGroupProps
) => MonthlySummaryType[] = (state) => state.group.monthlySummaries

export const monthlyUserSummariesSelector: (
  state: ReduxCurrentGroupProps
) => MonthlyUserSummaryType[] = (state) => state.group.monthlyUserSummaries
