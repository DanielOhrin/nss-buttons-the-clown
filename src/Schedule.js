import { getCompletedGigs, getGigs, getClowns, denyGig, completeGig } from "./scripts/dataAccess.js"

const mainContainer = document.querySelector("#container")

const selectClown = (gigId) => {
    const clowns = getClowns()

    let html = `<select class="clown-select" id="selectClown-${gigId}">
        <option value="0">Choose a Clown</option>`

    html += clowns.map(clown => {
        return `<option value="${gigId}--${clown.id}">${clown.name}</option>`
    }).join("")

    return html += `</select>`

}

const sortByDate = (a, b) => {
    //1. < 0 ... a comes first
    //2. 0 ... nothing will change
    //3. > 0 ... b comes first
    
    return new Date(a.date) - new Date(b.date)
}

const sortGigs = () => {
    const gigs = getGigs()
    const completedGigs = getCompletedGigs()

    const completedGigsArr = completedGigs.map(completedGig => {
        const completedGigObj = gigs.find(gig => gig.id === completedGig.gigId)
        gigs.splice(gigs.indexOf(completedGigObj), 1)
        return completedGigObj
    })

    return [gigs.sort(sortByDate), completedGigsArr]
}

export const Schedule = () => {
    const clowns = getClowns()
    const completedGigs = getCompletedGigs()
    const [gigs, completedGigsArr] = sortGigs()

    console.log(gigs)
    console.log(completedGigsArr)

    let html = `<h2>Schedule</h2>`

    html += gigs.map(gig => {
        return `<div class="gig" id="gig--${gig.id}">
            <ul>
                <li>Parent: ${gig.parent_name}</li>
                <li>Child: ${gig.child_name}</li>
                <li>Address: ${gig.address}</li>
                <li>Date: ${gig.date}</li>
                <li>Hours: ${gig.length}</li>
            </ul>
            <div class="gig-options">
                <button type="button" class="accept-btn" id="accept--${gig.id}">Accept</button>
                <button type="button" class="deny-btn" id="deny--${gig.id}">Deny</button>
                ${selectClown(gig.id)}
            </div>
        </div>`
    }).join("")

    return html += completedGigsArr.sort(sortByDate).map(gig => {
        return `<div class="completed-gig" id="gig--${gig.id}">
            <ul>
                    <li>Parent: ${gig.parent_name}</li>
                    <li>Child: ${gig.child_name}</li>
                    <li>Address: ${gig.address}</li>
                    <li>Date: ${gig.date}</li>
                    <li>Hours: ${gig.length}</li>
            </ul>
            <div class="completion-info">
                <p>Completed by ${clowns.find(clown => clown.id === completedGigs.find(gigObj => gigObj.gigId === gig.id).clownId).name}<br>${completedGigs.find(gigObj => gigObj.gigId === gig.id).completion_date}</p>
            </div>
        </div>`
    }).join("")
}

mainContainer.addEventListener(
    "click",
    event => {
        if (event.target.id.startsWith("deny")) {
            const [, gigId] = event.target.id.split("--")

            denyGig(gigId)
        }
    }
)

mainContainer.addEventListener(
    "click",
    event => {
        if (event.target.id.startsWith("accept")) {
            const [, gigId] = event.target.id.split("--")
            const [, clownId] = document.querySelector(`#selectClown-${gigId}`).value.split("--")

            if (gigId && clownId) {
                const completedGig = {
                    gigId: parseInt(gigId),
                    clownId: parseInt(clownId),
                    completion_date: Date.now()
                }

                completeGig(completedGig)
            }
        }
    }
)