import { MemberType, ReduxCurrentGroupProps } from './group.types'

export const currentMemberSelector: (
  state: ReduxCurrentGroupProps
) => MemberType[] = (state) => state.group.members
