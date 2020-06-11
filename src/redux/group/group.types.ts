export type MemberType = Readonly<{ id: string; displayName: string }>
export type MonthlySummaryType = Readonly<{
  id: string
  collectedGroupAmount: number
  groupAmount: number
  isCollected: boolean
  month: number
  uncollectedGroupAmount: number
  year: number
}>

export type MonthlyUserSummaryType = Readonly<{
  id: string
  uid: string
  collectedAmount: number
  isCollected: boolean
  month: number
  paidAmount: number
  uncollectedAmount: number
  year: number
}>

export type CurrentGroupProps = Readonly<{
  members: MemberType[]
  monthlySummaries: MonthlySummaryType[]
  monthlyUserSummaries: MonthlyUserSummaryType[]
}>

export type ReduxCurrentGroupProps = {
  group: CurrentGroupProps
}
