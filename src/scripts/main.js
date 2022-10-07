import { FormHTML } from "./BTCForm.js"
import { fetchClowns, fetchGigs, fetchCompletedGigs } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

const renderHTML = () => {
    fetchClowns()
        .then(() => fetchGigs())
        .then(() => fetchCompletedGigs())
        .then(
            () => {
                mainContainer.innerHTML = FormHTML()
            }
        )
}

renderHTML()

mainContainer.addEventListener(
    "stateChanged",
    event => {
        renderHTML()
    }
)