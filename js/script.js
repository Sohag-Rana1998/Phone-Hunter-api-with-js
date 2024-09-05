const phonesContainer = document.getElementById('phone-container');
const detailsContainer = document.getElementById('details-container');
const spinner = document.getElementById('spinner')
const showAllButton = document.getElementById("show-all");
let isShowAll = false;


const loadData = async (name, isShowAll) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${name}`);

  const data = await response.json();
  const phones = data.data;

  displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
  const noResult = document.getElementById('no-result');
  noResult.classList.add('hidden');


  const phonesContainer = document.getElementById('phone-container');
  phonesContainer.innerHTML = '';

  if (phones.length === 0) {
    noResult.classList.remove('hidden');
  }


  if (phones.length > 12 && !isShowAll) {
    showAllButton.classList.remove('hidden');
  }
  else {
    showAllButton.classList.add('hidden');
  }



  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }




  spinner.classList.add('hidden');

  phones.forEach(phone => {
    // console.log(phone)
    const card = document.createElement('div');
    card.innerHTML = `
      <div class="card w-full bg-base-100 shadow-xl">
          <figure class="p-5"><img src="${phone.image}" alt="Shoes" />
          </figure >
  <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <p class="text-xl font-extrabold">$999</p>
    <div class="card-actions justify-center">
      <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Detail</button>
    </div>
  </div>
        </div >
  `;
    phonesContainer.appendChild(card);

  });


}


const searchPhone = (isShowAll) => {
  const inputField = document.getElementById('search-field');
  const inputText = inputField.value;

  if (inputText.length === 0) {
    alert('Please input text for search ')
  }
  loadData(inputText, isShowAll);
  console.log(isShowAll);
  const spinner = document.getElementById('spinner')
  spinner.classList.remove('hidden');

}


const showAllPhones = (inputText) => {
  spinner.classList.remove('hidden');
  showAllButton.classList.add('hidden');
  isShowAll = true;
  const inputField = document.getElementById('search-field');
  const text = inputField.value;
  if (text.length > 0) {

    searchPhone(isShowAll);
  }

  else {

    loadData('iphone', isShowAll);
  }

}



const showDetails = async (id) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await response.json();
  const phone = data.data;
  console.log(phone);


  detailsContainer.classList.remove('hidden');
  phonesContainer.classList.add('hidden');
  showAllButton.classList.add('hidden');
  detailsContainer.innerHTML = `
        <div class="card container p-10 mx-auto  bg-base-100 shadow-xl">
        <figure class="p-5"><img src="${phone.image}" alt="Shoes" />
        </figure>
        <div class="flex w-full flex-col  ">
          <h2 class="card-title">${phone.name}</h2>

          <p class="my-3">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

          <p><span class="font-bold">Storage:</span>${phone?.mainFeatures?.storage || 'Not found'}</p>

          <p><span class="font-bold">Display Size:</span>${phone?.mainFeatures?.displaySize || 'Not found'}</p>
          

          <p><span class="font-bold">Chipset:</span>${phone?.mainFeatures?.chipSet || 'Not found'}</p>

          <p><span class="font-bold">Memory:</span>${phone?.mainFeatures?.memory || 'Not found'}</p>

          <p><span class="font-bold">Slug:</span>${phone?.slug || 'Not found'}</p>

          <p><span class="font-bold">Release data:</span>${phone?.releaseDate || 'Not found'}</p>

          <p><span class="font-bold">Brand:</span>${phone?.brand || 'Not found'}</p>

          <p><span class="font-bold">GPS:</span>${phone?.others?.GPS || 'Not found'}</p>
          <div class="card-actions justify-end">
            <button id="back" onclick="back()" class="btn btn-primary">Back</button>
          </div>
        </div>
      </div>
  `
}


const back = () => {
  detailsContainer.classList.add('hidden');
  phonesContainer.classList.remove('hidden');
}





loadData('iphone', isShowAll);

