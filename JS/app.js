const apiKey = "dRubRkZc5TtGtdoG8GdGOaGDjGigGE5Pom6trrZB";
const submitBtn = document.getElementById("search-button");
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


    results.forEach(() => {
        let pic = document.createElement("div");
        pic.innerHTML = `<img src="${results[0].links[0].href}">
        <h2>${results[0].data[0].title}</h2>
        <p>${results[0].data[0].date_created}</p>
        <p>${results[0].data[0].description}</p>`
            ;

        resultContainer.appendChild(pic);
    }

    )

};

searchForm.addEventListener("submit", renderResult
);
