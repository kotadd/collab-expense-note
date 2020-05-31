import {
  MemberType,
  ReduxCurrentGroupProps,
  MonthlySummaryType,
  MonthlyUserSummaryType,
} from './group.types'

export const currentMemberSelector: (
  state: ReduxCurrentGroupProps
) => MemberType[] = (state) => state.group.members

export const currentMonthlyPaymentsSelector: (
  state: ReduxCurrentGroupProps
) => MonthlySummaryType[] = (state) => state.group.monthlySummaries

export const currentMonthlyUserPaymentsSelector: (
  state: ReduxCurrentGroupProps
) => MonthlyUserSummaryType[] = (state) => state.group.monthlyUserSummaries
