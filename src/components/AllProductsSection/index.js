import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    searchInput: '',
    category: '',
    rating: '',
    errorMsg: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  onChangeSearchInput = newSearchInput => {
    this.setState({searchInput: newSearchInput})
  }

  searchDatabase = () => {
    this.getProducts()
  }

  onClickCategory = newCategory => {
    this.setState({category: newCategory}, this.getProducts)
  }

  onClickRating = newRating => {
    this.setState({rating: newRating}, this.getProducts)
  }

  onClickClearFilters = () => {
    this.setState(
      {
        searchInput: '',
        category: '',
        rating: '',
        activeOptionId: sortbyOptions[0].optionId,
      },
      this.getProducts,
    )
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, searchInput, category, rating} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&title_search=${searchInput}&category=${category}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
        errorMsg: false,
      })
    } else {
      this.setState({isLoading: false, errorMsg: true})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        className="failure-image"
        alt="products failure"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-message">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderAllProductsView = () => {
    const {activeOptionId, productsList} = this.state

    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderNoProductsView = () => (
    <div className="no-products">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        className="no-products-image"
        alt="no products"
      />
      <h1 className="no-products-found-heading">No Products Found</h1>
      <p className="no-products-message">
        We could not find any products. Try other filters.
      </p>
    </div>
  )

  renderProductsList = () => {
    const {productsList, errorMsg} = this.state

    // TODO: Add No Products View

    if (errorMsg) {
      return this.renderFailureView()
    }

    return (
      <>
        {productsList.length === 0
          ? this.renderNoProductsView()
          : this.renderAllProductsView()}
      </>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  render() {
    const {isLoading, searchInput, category, rating} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          searchDatabase={this.searchDatabase}
          onChangeSearchInput={this.onChangeSearchInput}
          onClickCategory={this.onClickCategory}
          onClickRating={this.onClickRating}
          onClickClearFilters={this.onClickClearFilters}
          searchInput={searchInput}
          category={category}
          rating={rating}
        />

        {isLoading ? this.renderLoader() : this.renderProductsList()}
      </div>
    )
  }
}

export default AllProductsSection
