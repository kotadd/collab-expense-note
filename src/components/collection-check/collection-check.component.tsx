import React from 'react'
import { Right, Icon } from 'native-base'

type CollectionCheckProps = {
  collected: boolean
}
const CollectionCheck: React.FC<CollectionCheckProps> = ({
  collected,
}: CollectionCheckProps) => {
  if (collected) {
    return (
      <Right>
        <Icon
          type="FontAwesome"
          name="check"
          style={{ color: 'green', marginRight: 8 }}
        />
      </Right>
    )
  }

  return (
    <Right>
      <Icon type="FontAwesome" name="minus" style={{ marginRight: 10 }} />
    </Right>
  )
}

export default CollectionCheck
