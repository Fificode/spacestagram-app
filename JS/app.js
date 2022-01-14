const apiKey = "dRubRkZc5TtGtdoG8GdGOaGDjGigGE5Pom6trrZB";
const submitBtn = document.getElementById("search-button");
const searchForm = document.getElementById("search-form");
const resultContainer = document.getElementById("result-container");
const input = document.getElementById("search");
const loader = document.getElementById("loading");
// api_key=${apiKey}

function displayLoading() {
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display")
    }, 5000);
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
    console.log(response.collection.items[4].links[0].href);
    return response.collection.items;


}



const renderResult = async (e) => {
    let results = await getRequest(e);


    results.forEach((result) => {
        let pic = document.createElement("div");
        pic.innerHTML = `<img src="${result.collection.items[4].links[0].href}">`
            ;

    }
    )
    resultContainer.appendChild(pic);
};

searchForm.addEventListener("submit", renderResult
);
