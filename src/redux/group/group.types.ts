export type MemberType = Readonly<{ id: string; displayName: string }>

export type CurrentGroupProps = Readonly<{
  members: MemberType[]
}>

export type ReduxCurrentGroupProps = {
  group: CurrentGroupProps
}
