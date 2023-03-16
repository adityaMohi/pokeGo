import './index.css'

const NotFound = () => (
  <div className="page-not-found-container">
    <img
      className="page-not-found-img"
      src="https://res.cloudinary.com/dem9u6dox/image/upload/v1677856047/erroring_1_zczcpp.png"
      alt="page not found"
    />
    <h1 className="page-not-found-heading">Page Not Found</h1>
    <p className="page-not-found-para">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
  </div>
)

export default NotFound
