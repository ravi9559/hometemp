const urlParams = new URLSearchParams(window.location.search);
  const offerCategory= urlParams.get("category");
  let currentPage = 1;
  let images = [];
  const imagesPerPage=10;

  document.addEventListener("DOMContentLoaded", () => {
    const offerContainer = document.getElementById("offerCategoryContainer");

    fetchImages(currentPage);

    function createOfferCard(images) {
      const offerCard = document.createElement("div");
      offerCard.className = "container mt-5";

      const startIndex = (currentPage - 1) * imagesPerPage;
      const endIndex = startIndex + imagesPerPage;
      const slicedImages = images.slice(startIndex, endIndex);

      offerCard.innerHTML = `
        <div class="row m-3"> 
          <div class="col">
            <h3 class="text-capitalize">${offerCategory}</h3>
          </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-3">
          ${generateOfferCards(slicedImages)}
        </div>
        <div class="row m-3">
          <div class="col">
            ${generatePagination(images)}
          </div>
        </div>
      `;
      return offerCard;
    }

    function generateOfferCards(images) {
      let imageCardsHTML = "";

      for (let j = 0; j < images.length; j++) {
        const imageSrc = images[j];

        imageCardsHTML += `
          <div class="col">
          <a class="page-link"  href="#" >
            <div class="card">

              <img src="${imageSrc}" class="card-img-top" alt="Image ${j + 1}" style="height: 300px; object-fit: cover;">
              <div class="card-body">
                <h5 class="card-title">Card ${j + 1} Title</h5>
                <p class="card-text">Description for Card ${j + 1}. <span class=" float-end"><i class="far fa-fw fa-heart"></i></span></p>
              </div>
            </div>
            </a>
          </div>
        `;
      }

      return imageCardsHTML;
    }

    function generatePagination(images) {
      const totalPages = Math.ceil(images.length / imagesPerPage);

      let paginationHTML = `
        <nav>
          <ul class="pagination justify-content-center">
      `;

      for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
          <li class="page-item ${i === currentPage ? 'active' : ''} "><a class="page-link text-dark" href="#" onclick="handlePagination(${i})">${i}</a></li>
        `;
      }

      paginationHTML += `
          </ul>
        </nav>
      `;

      return paginationHTML;
    }

    window.handlePagination = function(page) {
      currentPage = page;
      offerContainer.innerHTML = '';
      offerContainer.appendChild(createOfferCard(images));
    };

    function fetchImages(page) {
      fetch(`https://dog.ceo/api/breed/${offerCategory}/images`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status !== "error") {
            images = data.message.filter(
              (image) => !image.includes("Not Found")
            );
            handlePagination(page); // Display the specified page
          } else {
            console.error(
              `Error fetching images for ${offerCategory}:`,
              data.message
            );
          }
        });
    }
  });


  // Home url
  document.getElementById('home').href = window.location.hostname;

 
 