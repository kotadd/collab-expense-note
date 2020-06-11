import {
  MonthlySummaryType,
  MonthlyUserSummaryType,
} from '../../redux/group/group.types'
import dayjs from 'dayjs'

type lastMonthSummary = MonthlySummaryType | undefined

export function findInCollectedLastMonthSummary(
  monthlySummaries: MonthlySummaryType[]
): lastMonthSummary {
  return monthlySummaries.find((summary) => {
    const lastMonth = dayjs().subtract(1, 'month')
    const year = lastMonth.year()
    const month = lastMonth.month() + 1

    return (
      summary.year === year && summary.month === month && !summary.isCollected
    )
  })
}

export function getTargetUserSummaries(
  lastMonthSummary: lastMonthSummary,
  monthlyUserSummaries: MonthlyUserSummaryType[]
): (MonthlyUserSummaryType | undefined)[] {
  return lastMonthSummary
    ? monthlyUserSummaries.map((summary) => {
        const lastMonth = dayjs().subtract(1, 'month')
        const year = lastMonth.year()
        const month = lastMonth.month() + 1
        if (
          summary.year === year &&
          summary.month === month &&
          !summary.isCollected
        ) {
          return summary
        }
      })
    : monthlyUserSummaries.map((summary) => {
        const year = dayjs().year()
        const month = dayjs().month() + 1
        if (summary.year === year && summary.month === month) {
          return summary
        }
      })
}
