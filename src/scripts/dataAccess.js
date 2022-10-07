const applicationState = {
    gigs: [

    ],
    clowns: [

    ],
    completedGigs: [

    ]
}

const mainContainer = document.querySelector("#container")
const API = `http://localhost:8088`

export const createGig = (gigObject) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gigObject)
    }

    return fetch(`${API}/gigs`, fetchOptions)
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const completeGig = (completedGigObj) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedGigObj)
    }

    return fetch(`${API}/completedGigs`, fetchOptions)
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const fetchClowns = () => {

    return fetch(`${API}/clowns`)
        .then((response) => response.json())
        .then(
            (data) => {
                applicationState.clowns = [...data]
            }
        )
}

export const fetchGigs = () => {

    return fetch(`${API}/gigs`)
        .then((response) => response.json())
        .then(
            (data) => {
                applicationState.gigs = [...data]
            }
        )
}

export const fetchCompletedGigs = () => {

    return fetch(`${API}/completedGigs`)
        .then((response) => response.json())
        .then(
            (data) => {
                applicationState.completedGigs = [...data]
            }
        )
}

export const getGigs = () => {
    return applicationState.gigs.map(gig => ({ ...gig }))
}

export const getClowns = () => {
    return applicationState.clowns.map(clown => ({ ...clown }))
}

export const getCompletedGigs = () => {
    return applicationState.completedGigs.map(completedGig => ({ ...completedGig }))
}

export const denyGig = (id) => {
    return fetch(`${API}/gigs/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}