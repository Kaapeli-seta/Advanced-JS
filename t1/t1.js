'use strict';


import { restaurantModal, restaurantRow } from './componetn.js';
import {fetchData} from './fetchData.js'
import { apiURL } from './variable.js';



const kohde = document.querySelector('tbody');
const modaali = document.querySelector('dialog');
const info = document.querySelector('#info');
const closeModal = document.querySelector('#close-modal');
const sodexoBTN = document.querySelector('#sodexo');
const compassBTN = document.querySelector('#compass');
const resetBTN = document.querySelector('#reset');

let raflat = '';

closeModal.addEventListener('click', () => {
  modaali.close();
});

const haeRavintolat = async () => {
  return await fetchData(apiURL + '/api/v1/restaurants');
}

let filteredRestaurants = []






const teeRavintolaLista = async (restaurants, raflat) => {
  try {

    console.log(restaurants)

    kohde.innerHTML = '';

    //filter ******************************
    // !! ORIGINALL FILTER DOES NOT WORK DO TO MULTIPLYING EVENTLISTENERES "removeEventListener" DOES NOT WORK WITH ANONYMOUS NOR UNDEFINED FUNCTIONS !!
    function Sodexo () {
      filteredRestaurants = raflat.filter((restaurant) =>
          restaurant.company === 'Sodexo'
      );
      teeRavintolaLista(filteredRestaurants, raflat);
      sodexoBTN.removeEventListener('click', Sodexo)
      compassBTN.removeEventListener('click', Compass)
      resetBTN.removeEventListener('click', Reset)
    }

    function Compass () {
      filteredRestaurants = raflat.filter((restaurant) =>
          restaurant.company === 'Compass Group'
      );
      teeRavintolaLista(filteredRestaurants, raflat);
      sodexoBTN.removeEventListener('click', Sodexo)
      compassBTN.removeEventListener('click', Compass)
      resetBTN.removeEventListener('click', Reset)
    }

    function Reset () {
      teeRavintolaLista(raflat, raflat);
      sodexoBTN.removeEventListener('click', Sodexo)
      compassBTN.removeEventListener('click', Compass)
      resetBTN.removeEventListener('click', Reset)
    }


    sodexoBTN.addEventListener('click', Sodexo)
    compassBTN.addEventListener('click', Compass)
    resetBTN.addEventListener('click', Reset)

    //****************************

      restaurants.sort((a, b) => a.name.localeCompare(b.name));

      restaurants.forEach(restaurant => {
      if (restaurant){
        const { _id} = restaurant;

        const rivi = restaurantRow(restaurant)

        rivi.addEventListener('click', async () => {
          try {

            modaali.showModal();
            const cour = await fetchData(apiURL + `/api/v1/restaurants/daily/${_id}/fi`)

            const korostetut = document.querySelectorAll('.highlight');
            for (const korostettu of korostetut) {
              korostettu.classList.remove('highlight');
            }

            rivi.classList.add('highlight');
            const ravintolaHTML = restaurantModal(
              restaurant,
              cour.courses
            );
            info.innerHTML = '';
            info.insertAdjacentHTML('beforeend', ravintolaHTML);
          } catch(error) {
            console.log(error)
          }
        });

        kohde.append(rivi);
      }
    });
  } catch (error) {
    console.log(error)
  }
};
try {
  raflat = await haeRavintolat();
  teeRavintolaLista(raflat, raflat);
} catch (error) {
  console.error(error);
}
