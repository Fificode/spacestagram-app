const apiKey = "dRubRkZc5TtGtdoG8GdGOaGDjGigGE5Pom6trrZB";
const submitBtn = document.getElementById("search-button");
const searchForm = document.getElementById("search-form");
const resultContainer = document.getElementById("result-container");
const input = document.getElementById("search");
// api_key=${apiKey}


const getRequest = async (e) => {
    e.preventDefault();
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
    console.log(response.collection.items[4].links[0].href);
    return response.collection.items;


}

searchForm.addEventListener("submit", getRequest
);

const renderResult = async (e) => {
    let result = await getRequest();


    result.photos.forEach((photo) => {
        let pic = document.createElement("div");
        pic.innerHTML = `<img src="${photo.collection.items[4].links[0].href}">`
            ;

    }
    )
    resultContainer.appendChild(pic);
};
renderResult();
