import { MemberType } from './group.types'

export type SetCurrentMemberAction = {
  type: 'SET_CURRENT_MEMBERS'
  payload: MemberType[]
}

export const setCurrentMembers = (
  state: MemberType[]
): SetCurrentMemberAction => ({
  type: 'SET_CURRENT_MEMBERS',
  payload: state,
})
