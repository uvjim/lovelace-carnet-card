# Volkswagen Carnet - An home assistant card to visualize the open / close state of doors, windows and trunk.

[![buy me a coffee](https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png)](https://www.buymeacoffee.com/davidluhmer)

## Install

1. Open Home-Assistant
2. Settings
3. Lovelace Dashboards
4. Ressources
5. Add new: https://raw.githubusercontent.com/David-Development/lovelace-carnet-card/master/carnet-card.js (JavaScript Module)
6. Open your dashboard -> Edit Dashboard -> Add new Card -> Manual (all the way on the bottom)

```yaml
type: "custom:carnet-card"
car_id: passat_gte_2020 # your car identifer in home assistant (e.g. binary_sensor.passat_gte_2020_climatisation_without_external_power)
slice_url: https://images.portal.volkswagen-we.com/slices/passat_variant_gte_pa/passat_variant_gte_pa # either you can extract this url from the logs of the homeassistant-volkswagencarnet plugin or use the dev tools and debug the portal.volkswagen-we.com website.
```

## Development

1. Clone Repo
2. Run dev server `http-server --cors -c-1 -p 8000`
3. Open Home-Assistant -> Settings -> Lovelace Dashboards -> Ressources -> http://<your-ip>:8000/carnet-card.js

## Example:

![](carnet-card.png)
