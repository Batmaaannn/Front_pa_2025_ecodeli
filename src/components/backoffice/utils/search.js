export function searchInList(list, query) {
    if (!query) return list

    const lowerQuery = query.toLowerCase()

    return list.filter(item =>
        Object.values(item).some(value =>
            String(value).toLowerCase().includes(lowerQuery)
        )
    )
}
