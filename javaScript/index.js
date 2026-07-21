const url = "https://fakestoreapi.com/products";
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("error");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const count = document.getElementById("count");
let allProducts = [];
//Fetch all products from API
const loadProducts = async () => {
  try {
    loading.style.display = "block";
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    allProducts = data;
    displayProducts(data);
  } catch (error) {
    errorMsg.style.display = "block";
    console.error(error);
  } finally {
    loading.style.display = "none";
  }
};
loadProducts();

// Search products by title
searchInput.addEventListener("input", () => {
  const value = searchInput.value;
  const filterProducts = allProducts.filter((product) => {
    return product.title.toLowerCase().includes(value);
  });
  // display filtered products
  displayProducts(filterProducts);
  const countItems = filterProducts.length;
  count.innerText = `Showing ${countItems} products`;

  if (countItems === 0) {
    count.innerText = `😔 No products found`;
  }
});

// Filter product by category
categoryFilter.addEventListener("change", () => {
  const selectCategory = categoryFilter.value;
  // console.log(selectCategory);
  if (selectCategory === "all") {
    displayProducts(allProducts);
  } else {
    const categoryProducts = allProducts.filter((product) => {
      return product.category === selectCategory;
    });
    displayProducts(categoryProducts);
  }
});

// Show product details in modal
const handleDetails = async (id) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await res.json();
    console.log(data);
    displayProductDetails(data);
  } catch (error) {
    console.error(error);
  }
};

// Display products on UI
const displayProducts = (products) => {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.innerHTML = `
            <div
          class="card bg-base-100 h-full w-full shadow-lg hover:-translate-y-2 hover:shadow-2xl active:scale-95 transition-all duration-300"
        >
          <figure class="px-10 py-10 bg-[#F5F5F5] ">
            <img
              src="${product.image}"
              alt="Shoes"
              class="  h-48 object-contain rounded-xl "
            />
          </figure>
          <div class="card-body items-center text-center">
            <h2 class="card-title">${product.title}</h2>
            <p>[ ${product.category} ]</p>
            <p>${product.rating.rate > 4 ? "⭐ Top Rated" : "✅ Good Product"}</p>
            <p>$${product.price}</p>
            <div class="card-actions">
              <button onclick = "handleDetails(${product.id})"
                class="btn border-2 border-[#FF85BB] px-3 py-2 hover:bg-[#FF85BB] hover:text-white hover:border-none focus:bg-[#FF85BB] focus:text-white active:scale-95 rounded-full"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
`;
    productContainer.append(card);
  });
};

// modal
const displayProductDetails = (product) => {
  const modalContent = document.getElementById("modal-content");

  modalContent.innerHTML = `
      <figure class="px-10 py-5 bg-[#F5F5F5]">
        <img src="${product.image}" alt="${product.title}" class="h-48 w-full object-contain  rounded-xl"/>
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${product.title}</h2>
        <p>[${product.category}]</p>
        <p class="font-semibold"><span class="text-green-500">${product.price}</span> $</p>
        <p>${product.rating.rate}⭐</p>
        <p class="text-gray-500">${product.description}</p>
     
`;
  document.getElementById("my_modal_5").showModal();
};
