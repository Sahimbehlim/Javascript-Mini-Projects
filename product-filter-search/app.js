const productsWrapper = document.querySelector(".products-wrapper"),
  filterButtons = document.querySelector(".filter-buttons"),
  searchInput = document.querySelector(".search-box input"),
  searchBtn = document.querySelector(".search-box button");

let productList;

const createCard = (id, category, image, name, price) =>
  `<div id="${id}" data-category="${category}" class="product-box">
      <img src="${image}" alt="" />
      <h6 class="m-0">${name}</h5>
      <p class="m-0">₹${price}</p>
  </div>`;

const loadProducts = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      productList = data.products;
      renderProducts(productList);
    });
};

const renderProducts = (products) => {
  const productHTML = products
    .map((product) =>
      createCard(
        product.id,
        product.category,
        product.image,
        product.name,
        product.price
      )
    )
    .join("");
  productsWrapper.innerHTML = productHTML;
};

const filterHandler = (category) => {
  const filteredProducts =
    category === "All"
      ? productList
      : productList.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        );
  renderProducts(filteredProducts);
  searchInput.value = "";
};

filterButtons.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "button") {
    filterButtons
      .querySelectorAll("button")
      .forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    filterHandler(e.target.textContent);
  }
});

searchBtn.addEventListener("click", () => {
  const inputValue = searchInput.value.toLowerCase().trim();
  if (!inputValue) return alert("Please enter a value");

  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(inputValue)
  );
  renderProducts(filteredProducts);

  filterButtons
    .querySelectorAll("button")
    .forEach((btn) => btn.classList.remove("active"));
});

window.onload = loadProducts();
