import { CurrentGroupProps, MemberType } from './group.types'

export const currentMemberSelector: (
  state: CurrentGroupProps
) => MemberType[] = (state) => state.group.members
