'use strict';

const restaurantRow = (restaurant) => {
  const {name, company, address} = restaurant;
  const rivi = document.createElement('tr');
  const nimi = document.createElement('td');
  nimi.innerText = name
  const osoite = document.createElement('td');
  osoite.innerText = address
  const firma = document.createElement('td');
  firma.innerText = company
  rivi.append(nimi, osoite, firma)
  return rivi
}

const restaurantModal = (restaurant, menu) => {
  const {name, company, address, city, phone, postalCode} = restaurant;

  let listaHTML = '';
  menu.forEach(food => {

    const {name, price, diets} = food;
    listaHTML += `<il>
    <h3>${name || 'ei ilmoitettu'},</h3>
    <p>Hinta: ${price || 'ei ilmoitettu'},</p>
    <p>Aleergeenit: ${diets || 'ei ilmoitettu'}</p>
    </il>`;
    });

  const ravintolaHTML = `
          <header>
          <h3>${name}</h3>
            <p>${company}</p>
          </header>
          <address>
            ${address} <br>
            ${postalCode} ${city} <br>
            ${phone || 'ei puhelin numero'} <br>
          </address>
          <div>
            <h3>Päivän roukalista</h3>
            <ul>
              ${listaHTML}
            </ul>
            </div>
            `;
        return ravintolaHTML;
}

export {restaurantRow, restaurantModal}
