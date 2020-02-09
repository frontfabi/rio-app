import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions } from 'easy-peasy'
import uuid from 'uuid'

import { If } from '../../components/If'
import Flexbox from '../../components/Flexbox'
import Button from '../../components/Button'
import Textarea from '../../components/Textarea'
import Checkboxes from '../../components/Checkboxes'
import Radios from '../../components/Radios'
import Select from '../../components/Select'

import cities from '../../assets/cities.json'
import states from '../../assets/states.json'
import {
  segment,
  actions,
  functions,
  color,
  identitySegments,
  cnpj_type
} from '../Signup/dicioFields'

import { TitleSearch } from './styles'

import { Form, Background } from '../Signup/styles'
import ResultSearchEnterprise from './ResultSearchEnterprise'

const Enterprise = () => {
  const { register, handleSubmit, errors, getValues, setValue } = useForm({
    // defaultValues: {
    //   foundation_date: '12/12/2020',
    //   presentation: 'blablabla',
    //   links: 'blablalba',
    //   city: 'blabla',
    //   state: 'blablalba',
    //   cnpj_type: false,
    //   apan_associate: false,
    //   identity_content: true,
    //   identity_segments: ['bla', 'bla'],
    //   other_states: ['bla', 'bla', 'bla'],
    //   diversity_functions: ['bla', 'bla'],
    //   business_segments: ['bla', 'bla'],
    //   business_fields: ['bla', 'bla'],
    // }
  })

  const registerCompany = useStoreActions(actions => actions.user.registerCompany)
  const [isLoading, setLoader] = useState(false)
  const [form, setForm] = useState(true)
  const [dados, setDados] = useState(true)
  

  const formatCheckboxFields = (field) => {
    const identifiers = Object.keys(field)
    return identifiers.filter((i) => field[i])
  }

  const onSubmit = (data) => {
    setForm(false)
    console.log("data", data)
    // const formatted = {
    //   ...data,
    //   foundation_date: '12/12/2010', // TODO: Arrumar isso, deixar dinamico
    //   city: 'blablalba', // TODO: Arrumar isso, deixar o select dinamico
    //   cnpj_type: data.cnpjType,
    //   apan_associate: data.apanAssociate,
    //   identity_segments: formatCheckboxFields(data.identitySegments),
    //   other_states: formatCheckboxFields(data.otherStates),
    //   diversity_functions: formatCheckboxFields(data.diversityFunctions),
    //   business_segments: formatCheckboxFields(data.businessSegments),
    //   business_fields: formatCheckboxFields(data.businessFields),
    //   identity_content: data.identityContent
    // }
    setDados(data)
    console.log("formatted", data)
  }

  const programIsLoading = () => {
    setLoader(true)
    setTimeout(() => { setLoader(false) }, 2000);
  }

  const handleRadio = (field, selectedOption) => setValue(field, (selectedOption.toLowerCase() === 'true'))

  useEffect(() => {
    register({ name: 'identityContent' });
    register({ name: 'apanAssociate' });
  }, [register]);

  // TODO: req hasNoRegister p/ validar se o usuário tem algum registro como profissional ou empresa. Se sim, redireciona para o dashboard, se não, mantém na página.
  return (
    <>
      {
        form ?
          <Background>
            <Flexbox justify="center">
              <Form onSubmit={handleSubmit(onSubmit)}>

                <TitleSearch>Busca de Empresas</TitleSearch>
                <Checkboxes
                  label="Segmento de atuação"
                  register={register}
                  fields={segment}
                  name="businessSegments"
                />
                <Checkboxes
                  label="Campos de atuação"
                  register={register}
                  fields={actions}
                  name="businessFields"
                />
                <Checkboxes
                  label="Funções que busca diversificar na empresa"
                  register={register}
                  fields={functions}
                  name="diversityFunctions"
                />

                <Select
                  label="Estado"
                  error={errors.state && errors.state.message}
                  name="state"
                  firstValue="Estado Sede"
                  register={register}
                  onChange={programIsLoading}
                  isLoading={isLoading}
                >
                  {states.map(item =>
                    <option value={item.id} key={item.id}>{item.name}</option>
                  )}
                </Select>

                <Button type="submit">
                  Enviar
          </Button>
              </Form>
            </Flexbox>
          </Background>
          :
          <ResultSearchEnterprise data={dados} />
      }
    </>
  )
}

export default Enterprise