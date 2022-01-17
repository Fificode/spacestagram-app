const apiKey = "dRubRkZc5TtGtdoG8GdGOaGDjGigGE5Pom6trrZB";
const searchForm = document.getElementById("search-form");
const resultContainer = document.getElementById("result-container");
const input = document.getElementById("search");
const loader = document.getElementById("loading");


function displayLoading() {
    loader.classList.add("display");

}

function hideLoading() {
    loader.classList.remove("display");
}



const getRequest = async (e) => {
    e.preventDefault();
    displayLoading();
    let response = await fetch(`https://images-api.nasa.gov/search?q=${input.value}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        }

    );

    if (input.value === '') {
        hideLoading();
        console.log("Please provide a value");
    }
    if (!response.ok) {
        throw Error("ERROR");

    }
    response = await response.json();
    hideLoading();
    console.log(response.collection.items);
    return response.collection.items;


}



const renderResult = async (e) => {
    let results = await getRequest(e);


    results.forEach((result) => {
        let pic = document.createElement("div");
        pic.classList.add("result");
        pic.innerHTML = `<img src="${result.links[0].href}" class="img-style">
        <h2>${result.data[0].title}</h2>
        <h3>${result.data[0].date_created}</h3>
        <p>${result.data[0].description}</p>
        <button id="like-button">Like</button>`
            ;



        resultContainer.appendChild(pic);
    }

    )


};
const likeButton = document.getElementById("like-button");
function renderLikebutton() {
    if (likeButton.clicked === true) {
        likeButton.style.color = '#fff';
        likeButton.style.backgroundColor = "red";
    }
    else {
        console.log("Error");
    }
}
searchForm.addEventListener("submit", renderResult
);
likeButton.addEventListener("click", renderLikebutton);