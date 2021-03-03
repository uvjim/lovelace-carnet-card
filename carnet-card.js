class CarnetCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const scale = this.config.scale;
      const height = this.config.height;

      const card = document.createElement("ha-card");
      this.content = document.createElement("div");
      this.content.style.width = "100%";
      if (!!height) {
        this.content.style.height = `${height}`;
      }
      if (!!scale) {
        this.content.style.transform = `scale(${scale})`;
      }
      this.content.style.transformOrigin = "top center";
      card.appendChild(this.content);
      this.appendChild(card);
    }

    const sensors = [
      {
        name: "sunroof_closed",
        carnetId: "sunroof",
        on: "open",
        off: ""
      },
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
        (state === undefined) ||
        (sensor.carnetId === "trunk" && state.state == "off") ||
        (sensor.carnetId.startsWith("window_") && state.state == "off")
      ) {
        return "";
      }

      let key = state.state === "on" ? sensor.on : sensor.off;
      if (key !== "") {
        key = `_${key}`; // add underscore in front of key
      }
      const url = `${sliceUrl}_${sensor.carnetId}${key}@2x.png`;
      return `<img src="${url}" style="transform-origin: 50%; position: absolute; top: 0; left: 0; width: 100%" />`;
    });

    // console.log(entities);
    // console.log(urls);
    // console.log(states);
    // console.log(images);

    this.content.innerHTML = `
      <img src="${sliceUrl}_car@2x.png" style="width: 100%;" />
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
