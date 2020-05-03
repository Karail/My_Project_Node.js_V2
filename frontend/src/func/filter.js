
export const search = (items, searchQuery) => {
    return items.filter( (o) => {
        return o.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
    })
}