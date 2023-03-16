import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

class CardPoke extends Component {
  state = {
    name: '',
    imageUrl: '',
    idNumber: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {pokemonDetails} = this.props
    const {url} = pokemonDetails
    const response = await fetch(url)
    const fetchedData = await response.json()
    this.setState({
      name: fetchedData.name,
      imageUrl: fetchedData.sprites.front_default,
      idNumber: fetchedData.id,
    })
  }

  render() {
    const {name, imageUrl, idNumber} = this.state

    return (
      <li className="pokemon-item">
        <Link to={`/poke/${idNumber}`} className="link-style">
          <p className="para">{idNumber}</p>
          <img src={imageUrl} alt={name} className="list-image" />
          <p className="para">{name}</p>
        </Link>
      </li>
    )
  }
}

export default CardPoke
