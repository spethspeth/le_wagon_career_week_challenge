import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "lat", "lon", "output" ]

  connect() {
    console.log("Query controller connected!");
  }

  listMuseums(data) {
    console.log(data)
    data.sort(function (a, b) {
      return a.context[0].text - b.context[0].text;
    });
    data.forEach((museum) => {
      const museumtag = `<li>${museum.context[0].text}: ${museum.place_name}</li>`
      this.outputTarget.insertAdjacentHTML("beforeend", museumtag)
    })
  }

  submit() {
    const lat = this.latTarget.value
    const lon = this.lonTarget.value
    this.outputTarget.innerText = `Latitude: ${lat}, longitude: ${lon}`
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/museum.json?limit=10&type=poi&proximity=${lon},${lat}&access_token=pk.eyJ1Ijoic3BldGhzcGV0aCIsImEiOiJjbDM0Z2U3a3EwM3VmM2JtcXQwcGQxZzl4In0.zlY4PcZvSYXEEJeMRFVtEw`)
      .then(response => response.json())
      .then(data => this.listMuseums(data.features))
  }
}
