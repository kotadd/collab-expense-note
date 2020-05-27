export type MemberType = Readonly<{ id: string; displayName: string }>

export type MembersProps = Readonly<{
  members: MemberType[]
}>

export type CurrentGroupProps = Readonly<{
  group: MembersProps
}>
