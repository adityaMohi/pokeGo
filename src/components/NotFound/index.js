import './index.css'

const NotFound = () => (
  <div className="page-not-found-container">
    <img
      className="page-not-found-img"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <h1 className="heading-250">Page Not Found</h1>
    <p className="para-80">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
