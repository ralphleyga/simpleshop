function SearchFilters() {
    const search = window.location.search
    const params = new URLSearchParams(search)
    const { categories } = this.props
    const filterCategory = (category) => ('?category=' + category.id)
    const searchKeyword = params.get('search') ? ('&search=' + params.get('search')) : ''
    const filterSearch = (category) => filterCategory(category) + searchKeyword
}