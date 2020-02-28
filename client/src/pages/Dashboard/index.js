import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import uuid from 'uuid'

import Field from '../../components/Field'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import { If } from '../../components/If'
import Enterprise from '@material-ui/icons/AccountBalanceOutlined'
import Person from '@material-ui/icons/Person'
import InfoDelete from '../../components/popups/InfoDelete'
import BoasVindas from '../../components/popups/BoasVindas'
import seloPlans from '../../assets/selo.png'

import { fields } from './dicio'
import {
  Background,
  ButtonDelete,
  GroupButtons,
  Container,
  Title
} from './style'

const Dashboard = () => {
  const userType = useStoreState(state => state.auth.auth.user)
  const getUser = useStoreActions(actions => actions.user.getUser)
  const user = useStoreState(state => state.user.user)

  const [modalStatus, setModalStatus] = useState(false)
  // const [disabledButton, setDisabledButton] = useState(false) // TODO: Add count to set or unset register vacancy button
  const [modalInfoPlans, setModalInfoPlans] = useState(false)
  const [modalBoasVindas, setModalBoasVindas] = useState(false)

  useEffect(() => {
    typeof userType.type !== 'undefined' && getUser(userType.type)
    if (userType.type === "professional") setModalBoasVindas(true)
    if (userType.type === "enterprise") setModalInfoPlans(true)
  }, [userType, getUser])

  return (
    <Background>
      <Container className='header'>
      { userType.type === "enterprise" ?
        <Enterprise style={{ fontSize: 80 }} /> :
        <Person style={{ fontSize: 80 }} />}
        <Title>Perfil {userType.type === "enterprise" ? "Empresa" : "Profissional"}</Title>
      </Container>
      <div>
      {fields.map(field => {
          if (typeof user[field.name] !== 'undefined') {
            return (
              <Field
                key={uuid()}
                name={field.display}
                content={user[field.name]}
              />
            )
          }
          return false
        })}
      </div>  
      <GroupButtons>
        <If condition={userType.type === "enterprise"}>
          <Link to="/cadastro/vaga">
            <Button>
              Cadastrar Vagas
            </Button>
          </Link>
          <Link to={`/listagem/vagas/${user.enterprise_id}`}>
            <Button>
              Ver minhas vagas
            </Button>
          </Link>
          <Link to={'/busca/profissionais'}>
            <Button>
              Buscar profissional
            </Button>
          </Link>
        </If>
        <ButtonDelete
          color="#FFFFFF"
          onClick={() => setModalStatus(true)}
        >
          Deletar Perfil
        </ButtonDelete>
      </GroupButtons>

      <Container className="ad">
        <a href="https://raio.agency/planos">
          <img src={seloPlans} />
        </a>
      </Container>

      <Modal
        isOpen={modalBoasVindas}
        onClose={() => setModalBoasVindas(false)}
        width="500px"
      >
        <BoasVindas />
      </Modal>
      <Modal
        isOpen={modalStatus}
        onClose={() => setModalStatus(false)}
        width="500px"
      >
        <InfoDelete
          toggleModalStatus={() => setModalStatus(!modalStatus)}
        />
      </Modal>
    </Background>
  )
}

export default Dashboard