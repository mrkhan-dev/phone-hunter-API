const loadPhone = async (searchPhone = "13") => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  //   console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  //   clear phone container
  phoneContainer.textContent = "";
  const showAll = document.getElementById("show-all-container");
  if (phones.length > 12) {
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }
  //   display only 12 phone
  phones = phones.slice(0, 12);
  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card p-4 bg-base-100 shadow-xl";
    phoneCard.innerHTML = `
    <figure>
    <img
      src="${phone.image}"
      alt="Shoes"
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>Brand: ${phone.brand}</p>
    <div class="card-actions justify-center">
      <button onclick="handleShowAll('${phone.slug}')" class="btn bg-[#0d6efd] mt-5 text-white">SHOW DETAILS</button>
    </div>
  </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });

  toggleLoadingSpinner(false);
};

// handle show all button

const handleShowAll = async (id) => {
  console.log("clicked", id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  console.log(data);
};

// handel search button

const searchButton = () => {
  toggleLoadingSpinner(true);
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;
  console.log(searchText);
  loadPhone(searchText);
};

const toggleLoadingSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

loadPhone();
