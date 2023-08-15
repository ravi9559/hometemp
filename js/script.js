document.addEventListener("DOMContentLoaded", () => {
  const offerContainer = document.getElementById("offerContainer");

  // Fetch offer Category list
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => response.json())
    .then((data) => {
      const offerCategory = Object.keys(data.message);
      offerCategory.forEach((offer) => {
        fetch(`https://dog.ceo/api/breed/${offer}/images`)
          .then((response) => response.json())
          .then((data) => {
            if (data.status !== 404) {
              const images = data.message.filter(
                (image) => !image.includes("Not Found")
              );
              const offerCard = createOfferCard(offer, images);
              offerContainer.appendChild(offerCard);
            } else {
              console.error(
                `Error fetching images for ${offer}:`,
                data.message
              );
            }
          })
          .catch((error) => {
            console.error(`Error fetching images for ${offer}:`, error);
          });
      });
    });

  // Create offer  card with name and images
  function createOfferCard(offer, images) {
    const offerCard = document.createElement("div");
    offerCard.className = "container mt-5";
    offerCard.innerHTML = `
      <div class="row m-3 px-5"> 
        <div class="col">
          <h3 class="text-capitalize">${offer}</h3>
        </div>
        <div class="col">
          
          <a href="${
            window.location.origin
          }/hometemp/offers.html?category=${encodeURIComponent(
      offer
    )}" class="btn btn-danger loginbtn float-end">View more</a>
          </div>
        </div>
      </div>
      <div id="${offer}-slider" class="carousel carousel-dark slide" data-bs-ride="carousel" >
        <div class="carousel-inner">
          ${generateCarouselItems(images)}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#${offer}-slider" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#${offer}-slider" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    `;
    return offerCard;
  }

  function generateCarouselItems(images) {
    let slideshowHTML = "";
    const maxImagesToShow = Math.min(images.length, 15);

    for (let i = 0; i < maxImagesToShow; i += 5) {
      const isActive = i === 0 ? "active" : "";

      slideshowHTML += `
            <div class="carousel-item ${isActive}" data-bs-interval="false">

            <div class="card-group  mx-5 ">
            
            
        `;

      for (let j = i; j < i + 5 && j < maxImagesToShow; j++) {
        const imageSrc = images[j];

        slideshowHTML += `
        
                    <div class="card me-3">
                        <img src="${imageSrc}" class="img-fluid" alt="Image ${
          j + 1
        }" style="width: 400px; height: 300px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title">Card ${j + 1} Title</h5>
                            <p class="card-text">Description for Card ${
                              j + 1
                            }. <span class=" float-end"><i class="far fa-fw fa-heart"></i></span></p>
                            
                        </div>
                    </div>
                    

            `;
      }

      slideshowHTML += `
                </div>
            </div>
        `;
    }

    return slideshowHTML;
  }
});


/* back to top */

window.addEventListener("scroll", function () {
  var backToTopButton = document.getElementById("backToTopButton");
  backToTopButton.classList.toggle("show", window.scrollY > 50);
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}