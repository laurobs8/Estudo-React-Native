import { createStackNavigator } from 'react-navigation' // normalmente navegações por botoes (Tem por pagina latera, etc)
// import React from 'react'
import Products from './pages/product'

import Main from './pages/main'

export default createStackNavigator({
  Main,
  Products
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#DA552F'
    },
    headerTintColor: '#FFF'
  }
})

