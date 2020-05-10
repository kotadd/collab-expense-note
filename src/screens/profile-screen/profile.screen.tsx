import React from 'react'
import { Content, Container } from 'native-base'
import ProfileForm from '../../components/profile-form/profile-form.component'

const ProfileScreen: React.FC = () => (
  <Container>
    <Content>
      <ProfileForm />
    </Content>
  </Container>
)

export default ProfileScreen
