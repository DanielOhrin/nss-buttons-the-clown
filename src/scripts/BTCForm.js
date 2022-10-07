// Add Imports Here
import { Schedule } from "../schedule.js"
import { createGig } from "./dataAccess.js"

export const FormHTML = () => {
    return `<form>
        <div class="form-element">
            <label for="parentName"/>Name of Parent:
            <input type="text" name="parentName" placeholder="First and Last">
        </div>

        <div class="form-element">
            <label for="childName"/>Name of Child:
            <input type="text" name="childName">
        </div>

        <div class="form-element">
            <label for="address"/>Address:
            <input type="text" name="address">
        </div>

        <div class="form-element">
            <label for="date"/>Date of Event:
            <input type="date" name="date">
        </div>

        <div class="form-element">
            <label for="length"/>Length of event:
            <input type="text" name="length" placeholder="Event length in hours">
        </div>

        <button class="form-element" id="save-btn" type="button">Create Order</button>
    </form>
    <hr style="opacity: 0%">
    <section id="schedule">
        ${ Schedule() }
    </section>`
}

document.querySelector("#container").addEventListener(
    "click",
    event => {
        if (event.target.id === "save-btn") {
            const parentName = document.querySelector("input[name='parentName']").value
            const childName = document.querySelector("input[name='childName']").value
            const address = document.querySelector("input[name='address']").value
            const date = document.querySelector("input[name='date']").value
            const length = document.querySelector("input[name='length']").value

            const gigObject = {
                parent_name: parentName,
                child_name: childName,
                address: address,
                date: date,
                length: length,
            }

            if (!Object.values(gigObject).includes("")) {
                createGig(gigObject)
            } else {
                window.alert(`Please fill out the entire form.`)
            }

        }
    }
)
