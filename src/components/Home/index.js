import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CardPoke from '../CardPoke'

import './index.css'

const statusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    url: 'https://pokeapi.co/api/v2/pokemon/',
    apiStatus: statusConst.initial,
    pokeData: [],
    nextUrl: '',
    previousUrl: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {url} = this.state
    this.setState({apiStatus: statusConst.inProgress})
    const response = await fetch(url)
    if (response.ok) {
      const Data = await response.json()
      this.setState({
        pokeData: Data.results,
        nextUrl: Data.next,
        previousUrl: Data.previous,
        apiStatus: statusConst.success,
      })
    } else {
      this.setState({apiStatus: statusConst.failure})
    }
  }

  onClickNext = () => {
    const {nextUrl} = this.state
    if (nextUrl !== null) {
      this.setState({url: nextUrl}, this.getData)
    }
  }

  onClickPrevious = () => {
    const {previousUrl} = this.state
    if (previousUrl !== null) {
      this.setState({url: previousUrl}, this.getData)
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderSuccessView = () => {
    const {pokeData} = this.state
    return (
      <div className="left-section">
        <ul className="poke-list-container">
          {pokeData.map(pokeObj => (
            <CardPoke pokemonDetails={pokeObj} key={pokeObj.name} />
          ))}
        </ul>
        <div className="button-container">
          <button type="button" onClick={this.onClickPrevious} className="btn">
            Previous
          </button>
          <button type="button" onClick={this.onClickNext} className="btn">
            Next
          </button>
        </div>
      </div>
    )
  }

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case statusConst.success:
        return this.renderSuccessView()
      case statusConst.failure:
        return this.renderFailureView()
      case statusConst.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <nav className="nav-container">
          <img
            src="https://assets.pokemon.com/assets/cms2/img/video-games/video-games/pokemon_go/169.jpg"
            className="logo-image"
            alt="logo"
          />
        </nav>
        <div className="partition-container">
          {this.renderView()}
          <div className="image-container">
            <img
              src="https://res.cloudinary.com/dp0azsrab/image/upload/v1678965960/images_1_glbdde.png"
              className="image-ash"
              alt="bannerImage"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
