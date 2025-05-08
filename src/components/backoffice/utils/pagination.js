export function paginate(list, currentPage = 1, itemsPerPage = 10) {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return list.slice(start, end)
}

export function totalPages(list, itemsPerPage = 10) {
    return Math.ceil(list.length / itemsPerPage)
}
