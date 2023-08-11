document.addEventListener("DOMContentLoaded", () => {
  const breedContainer = document.getElementById("breedContainer");

  // Fetch breed list
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => response.json())
    .then((data) => {
      const breeds = Object.keys(data.message);
      breeds.forEach((breed) => {
        fetch(`https://dog.ceo/api/breed/${breed}/images`)
          .then((response) => response.json())
          .then((data) => {
            if (data.status !== 404) {
              const images = data.message.filter(
                (image) => !image.includes("Not Found")
              );
              const breedCard = createBreedCard(breed, images);
              breedContainer.appendChild(breedCard);
            } else {
              console.error(
                `Error fetching images for ${breed}:`,
                data.message
              );
            }
          })
          .catch((error) => {
            console.error(`Error fetching images for ${breed}:`, error);
          });
      });
    });

  // Create breed card with name and images
  function createBreedCard(breed, images) {
    const breedCard = document.createElement("div");
    breedCard.className = "container mt-5";
    breedCard.innerHTML = `
      <div class="row m-3 px-5"> 
        <div class="col">
          <h3 class="text-capitalize">${breed}</h3>
        </div>
        <div class="col">
          
          <a href="${window.location.origin}/hometemp/offers.html?category=${encodeURIComponent(breed)}" class="btn btn-danger loginbtn float-end">View more</a>
          </div>
        </div>
      </div>
      <div id="${breed}-slider" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          ${generateCarouselItems(images)}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#${breed}-slider" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#${breed}-slider" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    `;
    return breedCard;
  }

  function generateCarouselItems(images) {
    let slideshowHTML = "";
    const maxImagesToShow = Math.min(images.length, 15);

    for (let i = 0; i < maxImagesToShow; i += 5) {
      const isActive = i === 0 ? "active" : "";

      slideshowHTML += `
            <div class="carousel-item ${isActive}">

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
                            }.</p>
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
