class CarnetCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement("ha-card");
      this.content = document.createElement("div");
      this.content.style.padding = "0 16px 16px";
      card.appendChild(this.content);
      this.appendChild(card);
    }

    const sensors = [
      { name: "sunroof_closed", carnetId: "sunroof", on: "open", off: "" },
      {
        name: "door_closed_left_front",
        carnetId: "door_ul",
        on: "open",
        off: "closed",
      },
      {
        name: "door_closed_left_back",
        carnetId: "door_ll",
        on: "open",
        off: "closed",
      },
      {
        name: "door_closed_right_front",
        carnetId: "door_ur",
        on: "open",
        off: "closed",
      },
      {
        name: "door_closed_right_back",
        carnetId: "door_lr",
        on: "open",
        off: "closed",
      },
      { name: "trunk_closed", carnetId: "trunk", on: "open" },
      {
        name: "window_closed_left_front",
        carnetId: "window_ul",
        on: "open",
      },
      {
        name: "window_closed_left_back",
        carnetId: "window_ll",
        on: "open",
      },
      {
        name: "window_closed_right_front",
        carnetId: "window_ur",
        on: "open",
      },
      {
        name: "window_closed_right_back",
        carnetId: "window_lr",
        on: "open",
      },
    ];

    const carId = this.config.car_id;
    const sliceUrl = this.config.slice_url;

    const entities = sensors.map((s) => `binary_sensor.${carId}_${s.name}`);
    const states = entities.map((e) => hass.states[e]);
    const images = states.map((state, idx) => {
      const sensor = sensors[idx];

      // trunk doesn't have an "closed" image
      // windows don't have "closed" state either.
      if (
        (sensor.carnetId === "trunk" && state.state == "off") ||
        (sensor.carnetId.startsWith("window_") && state.state == "off")
      ) {
        return "";
      }

      const key = state.state === "on" ? sensor.on : sensor.off;
      const url = `${sliceUrl}_${sensor.carnetId}_${key}@2x.png`;
      return `<img src="${url}" style="position: absolute; top: 0;" />`;
    });

    // console.log(entities);
    // console.log(urls);
    // console.log(states);
    // console.log(images);

    this.content.innerHTML = `
      <img src="${sliceUrl}_car@2x.png" />
      ${images.join("")}
    `;
  }

  setConfig(config) {
    if (!config.slice_url) {
      throw new Error("You need to define the slice_url");
    }
    if (!config.car_id) {
      throw new Error("You need to define the car_id");
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define("carnet-card", CarnetCard);
