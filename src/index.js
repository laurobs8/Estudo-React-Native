import React from 'react'
import Routes from './routes'
import './config/statusBarConfig'

/*
Mesma coisa:
Mas usando Component, dá acesso 
a mais funções do react, mas como
nesse exemplo nao vamos utilizar vamos
sem o component msm.

const App = () => <Routes />
class App extends Component {
  render() {
    return <Routes />
  }
}*/

// Todo componente deve exportar ele por padrao dentro do arquivo

const App = () => <Routes />;

export default App;
