import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PokeDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    name: '',
    id: '',
    imageUrl: '',
    type: '',
    weight: '',
    height: '',
    stats: [],
    statsName: [],
    abilities: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.initial})
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`

    const response = await fetch(apiUrl)

    if (response.ok) {
      const fetchData = await response.json()
      this.setState({
        name: fetchData.name.toUpperCase(),
        id: fetchData.id,
        imageUrl: fetchData.sprites.other.dream_world.front_default,
        type: fetchData.types[0].type.name,
        weight: fetchData.weight,
        height: fetchData.height,
        stats: fetchData.stats.map(stat => stat.base_stat).slice(0, 3),
        statsName: fetchData.stats.map(obj => obj.stat.name).slice(0, 3),
        abilities: fetchData.abilities.map(obj => obj.ability.name),
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="details-loader-container">
      <Loader type="ThreeDots" color="#d61552" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
    </div>
  )

  renderSucessView = () => {
    const {
      name,
      id,
      imageUrl,
      type,
      weight,
      height,
      stats,
      statsName,
      abilities,
    } = this.state

    return (
      <div className="sucess-container">
        <div className="image-section">
          <img src={imageUrl} alt={name} className="image-details" />
        </div>

        <div className="info-container">
          <div className="heading-section">
            <p className="para-id">{`ID:${id}`}</p>
            <h1 className="para-id">{`Name: ${name}`}</h1>
          </div>

          <div className="poke-apperance">
            <p className="para-table">{`Type: ${type}`}</p>
            <hr className="line" />
            <p className="para-table">{`Weight: ${weight}`}</p>
            <hr className="line" />
            <p className="para-table">{`Height: ${height}`}</p>
          </div>
          <Link to="/">
            <button className="btn-back" type="button">
              Back
            </button>
          </Link>
        </div>
      </div>
    )
  }

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSucessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="bg-container">{this.renderView()}</div>
  }
}
export default PokeDetails
