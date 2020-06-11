import React from 'react'
import { Content, Container, Card } from 'native-base'
import ProfileForm from '../../components/profile-form/profile-form.component'

const ProfileScreen: React.FC = () => (
  <Container>
    <Content>
      <Card key="ProfileScreen">
        <ProfileForm />
      </Card>
    </Content>
  </Container>
)

export default ProfileScreen
