import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions } from 'easy-peasy'
import ResultSearchProfessionals from './ResultSearchProfessionals'
import uuid from 'uuid'

import { If } from '../../components/If'
import Flexbox from '../../components/Flexbox'
import Button from '../../components/Button'

import Checkboxes from '../../components/Checkboxes'
import Radios from '../../components/Radios'
import Select from '../../components/Select'


import states from '../../assets/states.json'
import {
  functions,
  color as selfDeclaration,
  gender,
  registryTypes,
  formations,
  identitySegments,
  sexualOrientation
} from '../Signup/dicioFields'

import { Form, Success, Background } from '../Signup/styles'
import { TitleSearch } from './styles'


const SearchProfessionals = () => {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    setValue
  } = useForm()

  const [form, setForm] = useState(true)
  const [dados, setDados] = useState()
  const registerUser = useStoreActions(actions => actions.user.registerProfessional)
  const [isSuccessful, setSuccess] = useState(false)
  const [isLoading, setLoader] = useState({
    city: false,
    submit: false
  })

  const formatCheckboxFields = (field) => {
    const identifiers = Object.keys(field)
    return identifiers.filter((i) => field[i])
  }

  const onSubmit = (data) => {
    const formatted = {
      pcd: data.pcd,
      gender: data.gender,
      cnpj: data.companyRegistry,
      self_declaration: data.selfDeclaration,
      state: data.currentState,
      sexual_orientation: data.sexualOrientation,
      expertise_areas: formatCheckboxFields(data.expertiseAreas)
    }
    
    setDados(formatted)
    setForm(false)
  }

  const programIsLoading = () => {
    setLoader({ ...isLoading, city: true })
    setTimeout(() => { setLoader({ ...isLoading, city: false }) }, 2000);
  }

  const handleRadio = (field, selectedOption) => setValue(field, (selectedOption.toLowerCase() === 'true'))

  useEffect(() => {
    register({ name: 'pcd' });
    register({ name: 'companyRegistry' });
    register({ name: 'identityContent' });
    register({ name: 'apan' });
  }, [register]);

  // TODO: req hasNoRegister p/ validar se o usuário tem algum registro como profissional ou empresa. Se sim, redireciona para o dashboard, se não, mantém na página.

  return (
    <>
      {
        form ?
          <Background>
            <Flexbox justify="center">
              <Form onSubmit={handleSubmit(onSubmit)}>

                <TitleSearch>Busca de profissionais</TitleSearch>
                <Checkboxes
                  label="Áreas de atuação"
                  register={register}
                  fields={functions}
                  name="expertiseAreas"
                />

                <Select
                  label="Auto Declaração"
                  register={register}
                  name="selfDeclaration"
                  error={errors.selfDeclaration && errors.selfDeclaration.message}
                  firstValue="Auto Declaração"
                >
                  {selfDeclaration.map(item =>
                    <option value={item} key={uuid()}>{item}</option>
                  )}
                </Select>

                <Select
                  label="Gênero"
                  register={register}
                  name="gender"
                  error={errors.gender && errors.gender.message}
                  firstValue="Gênero"
                >
                  {gender.map(item =>
                    <option value={item} key={uuid()}>{item}</option>
                  )}
                </Select>

                <Select
                  label="Orientação sexual"
                  error={errors.sexualOrientation && errors.sexualOrientation.message}
                  name="sexualOrientation"
                  firstValue="Orientação Sexual"
                  register={register}
                >
                  {sexualOrientation.map(item =>
                    <option value={item} key={uuid()}>{item}</option>
                  )}
                </Select>

                <Radios
                  label="PcD (Pessoa com deficiência)"
                  error={errors.pcd && errors.pcd.message}
                  onChange={e => handleRadio('pcd', e.target.value)}
                  name="pcd"
                />

                <Select
                  label="Estado de residência"
                  error={errors.currentState && errors.currentState.message}
                  name="currentState"
                  firstValue="Estado"
                  register={register}
                  onChange={programIsLoading}
                >
                  {states.map(item =>
                    <option value={item.name} key={item.id}>{item.name}</option>
                  )}
                </Select>

                <Radios
                  label="Possui CNPJ"
                  onChange={e => handleRadio('companyRegistry', e.target.value)}
                  error={errors.companyRegistry && errors.companyRegistry.message}
                  name="companyRegistry"
                />

                <Button
                  type="submit"
                  isLoading={isLoading.submit}
                >
                  Buscar
          </Button>I
          </Form>
            </Flexbox>
          </Background >
          :
          <ResultSearchProfessionals data={dados} />
      }
    </>
  )
}


export default SearchProfessionals