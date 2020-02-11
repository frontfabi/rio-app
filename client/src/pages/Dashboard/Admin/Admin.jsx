import React from "react"
import { Link } from 'react-router-dom'
import { WrapperChoices, Title, Background } from './style'

const DashboardWrapper = () => {

  return (
    <Background>
      <Title>Escolha uma visão: </Title>
      <WrapperChoices>
        <Link to="/empresas">
          <Title>Empresarial</Title>
        </Link>
        <Link to="/profissionais">
          <Title>Profissional</Title>
        </Link>
      </WrapperChoices>
    </Background>
  )

}

export default DashboardWrapper