import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, AppRegistry  } from 'react-native'
import api from '../services/api'
// FlatList =  sempre que entender que é uma lista, usar esse componente
// TouchableOpacity = Diminui a opacidade do botao a ser clicado, Existe diversas outras formas de botoes
export default class Main extends Component {

  static navigationOptions = {
    title: 'JS Hunt'
  }

  state = {
    productInfo: {},// dados como  tamanho, pagina atual etc
    docs: [],
    page: 1
  }

  componentDidMount() {
    this.loadProducts()
  }

  loadProducts = async (page = 1) => { // padrão é a pagina 1

    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data // pega informação do docs, e joga o resto pra variavel productInfo
    // console.log(docs)
    this.setState({ docs: [...this.state.docs, ...docs], productInfo, page }) // Adiciona as dados da 2ª pagina junto com a a da primeira ao scrollar
  }

  loadMore = () => {
    const { page, productInfo } = this.state // pega page e productInfo do state

    if (page === productInfo.pages) return; // se a pagina for a mesma da pagina total, nao faz nada

    const pageNumber = page + 1 // caso contrario adiciona um a variavel page do state, que ira ser chamada na função da rota de nova pagina

    this.loadProducts(pageNumber) // passa no lugar do valor padrao
  }

  renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <TouchableOpacity
          style={styles.productButton}
          onPress={() => {
          this.props.navigation.navigate("Products", { product: item })
        }}
      >
        <Text style={styles.productButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Pagina Main: </Text>
        {this.state.docs.map(product => ( // parenteses no lugar de chave, exclui a necessidade do return
          <Text key={product._key}>{product.title}</Text>
        ))} */}
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.docs}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.1} />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  list: {
    padding: 20
  },
  productContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#333'
  },
  productDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#DA552F',
    backgroundColor: 'transparent',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  productButtonText: {
    fontSize: 16,
    color: "#DA552F",
    fontWeight: "bold"
  }
})