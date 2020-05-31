export type MemberType = Readonly<{ id: string; displayName: string }>
export type MonthlySummaryType = Readonly<{
  id: string
  groupAmount: number
  collectedGroupAmount: number
  uncollectedGroupAmount: number
  year: number
  month: number
}>

export type MonthlyUserSummaryType = Readonly<{
  id: string
  uid: string
  paidAmount: number
  collectedAmount: number
  uncollectedAmount: number
  year: number
  month: number
}>

export type CurrentGroupProps = Readonly<{
  members: MemberType[]
  monthlySummaries: MonthlySummaryType[]
  monthlyUserSummaries: MonthlyUserSummaryType[]
}>

export type ReduxCurrentGroupProps = {
  group: CurrentGroupProps
}
