const getJson = async url => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error('Unexpected HTTP Response')
    }
    return await response.json()
}

export const fetchAllPeople = () =>
    getjSON