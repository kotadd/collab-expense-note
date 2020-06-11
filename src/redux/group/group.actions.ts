import {
  MemberType,
  MonthlySummaryType,
  MonthlyUserSummaryType,
} from './group.types'

export type SetCurrentMemberAction = {
  type: 'SET_CURRENT_MEMBERS'
  payload: MemberType[]
}

export type SetMonthlySummaryAction = {
  type: 'SET_MONTHLY_SUMMARIES'
  payload: MonthlySummaryType[]
}

export type SetMonthlyUserSummaryAction = {
  type: 'SET_MONTHLY_USER_SUMMARIES'
  payload: MonthlyUserSummaryType[]
}

export const setCurrentMembers = (
  state: MemberType[]
): SetCurrentMemberAction => ({
  type: 'SET_CURRENT_MEMBERS',
  payload: state,
})

export const setMonthlySummaries = (
  state: MonthlySummaryType[]
): SetMonthlySummaryAction => ({
  type: 'SET_MONTHLY_SUMMARIES',
  payload: state,
})

export const setMonthlyUserSummaries = (
  state: MonthlyUserSummaryType[]
): SetMonthlyUserSummaryAction => ({
  type: 'SET_MONTHLY_USER_SUMMARIES',
  payload: state,
})
