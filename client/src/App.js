import React from 'react'

import PropTypes from 'prop-types'
import { Route } from 'react-router'

import { Router, Switch } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy';
import styled from 'styled-components'

import history from './history'

import Header from './components/Header'
import Login from './pages/Login/Login'
import Enterprise from './pages/Signup/Enterprise'
import Professional from './pages/Signup/Professional'
import Users from './pages/Signup/User'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard/index'
import Admin from './pages/Dashboard/Admin/Admin'
import AllEnterprises from './pages/Enterprises/index'
import VacancyList from './pages/Vacancy/VacancyList'
import VacancyRegister from './pages/Vacancy/VacancyRegister'
import SearchProfessionals from './pages/Search/SearchProfessionals';
import SearchEnterprise from './pages/Search/SearchEnterprise';
import ResultSearchProfessionals from './pages/Search/ResultSearchProfessionals';
import ResultSearchEnterprise from './pages/Search/ResultSearchEnterprise';

const AppWrapper = styled.div`
  height: 100vh;
`

const AppBody = styled.div`
  width: 100%;
  font-family: "Montserrat";
`

const App = ({ store }) => (
  <StoreProvider store={store}>
    <Router history={history}>
      <AppWrapper>
        <Header />
        <AppBody>
          <Route path="/" exact component={Login} />
          <Route path="/cadastro" exact component={Users} />
          <Switch>
            <PrivateRoute
              path='/listagem/vagas/:id'
              component={VacancyList}
            />
            <PrivateRoute path='/cadastro/vaga' component={VacancyRegister} />
            <PrivateRoute path='/cadastro/empresa' component={Enterprise} />
            <PrivateRoute
              path='/cadastro/profissional'
              component={Professional}
            />
            <PrivateRoute path='/dashboard/admin' exact component={Admin} />
            <PrivateRoute
              path='/dashboard/admin/empresas'
              component={AllEnterprises}
            />
            <PrivateRoute
              path='/dashboard/profissional'
              component={Dashboard}
            />
            <PrivateRoute
              path='/dashboard/empresa'
              component={Dashboard}
            />
            <Route
              path='/busca/profissionais'
              component={SearchProfessionals}
            />
            <Route
              path='/resultados/profissionais'
              component={ResultSearchProfessionals}
            />
            <Route path='/busca/empresas' component={SearchEnterprise} />
            <Route
              path='/resultados/empresas'
              component={ResultSearchEnterprise}
            />
          </Switch>
          <Footer fixed>
          </Footer>
        </AppBody>
      </AppWrapper>
    </Router>
  </StoreProvider>
)

App.propTypes = {
  store: PropTypes.object.isRequired,
}

export default App
