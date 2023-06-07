import {BsSearch} from 'react-icons/bs'
import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    searchDatabase,
    onChangeSearchInput,
    onClickCategory,
    onClickRating,
    onClickClearFilters,
    searchInput,
    category,
    rating,
  } = props

  const searchInp = event => {
    onChangeSearchInput(event.target.value)
  }

  const searchDb = event => {
    if (event.key === 'Enter') {
      searchDatabase()
    }
  }

  return (
    <div className="filters-group-container">
      <div className="search-input-container">
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          onChange={searchInp}
          onKeyDown={searchDb}
          value={searchInput}
        />
        <BsSearch />
      </div>
      <h1 className="category-heading"> Category </h1>
      {/* Category List */}
      <ul className="category-list-container">
        {categoryOptions.map(eachCategory => (
          <li key={eachCategory.categoryId} className="category-item">
            <button
              type="button"
              className={`button ${
                eachCategory.categoryId === category ? 'active' : ''
              }`}
              onClick={() => onClickCategory(eachCategory.categoryId)}
            >
              <p>{eachCategory.name}</p>
            </button>
          </li>
        ))}
      </ul>
      <h1 className="rating-heading"> Rating </h1>
      {/* Rating List */}
      <ul className="rating-list-container">
        {ratingsList.map(eachRating => (
          <li key={eachRating.ratingId} className="rating-item">
            <button
              type="button"
              className={`button ${
                eachRating.ratingId === rating ? 'active' : ''
              }`}
              onClick={() => onClickRating(eachRating.ratingId)}
            >
              <img
                src={eachRating.imageUrl}
                alt={`rating ${eachRating.ratingId}`}
                className="rating-image"
              />
              <p className="rating-text"> & up </p>
            </button>
          </li>
        ))}
      </ul>
      {/* Clear Filter */}
      <button
        type="button"
        className="clear-filters-button"
        onClick={onClickClearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
