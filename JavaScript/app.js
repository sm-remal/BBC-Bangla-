const categoryContainer = document.getElementById("category-container");
const newsContainer = document.getElementById("newsContainer");


// Load Category 
const loadCategory = () => {
    const url = "https://news-api-fs.vercel.app/api/categories"
    fetch(url)
    .then(response => response.json())
    .then(data => {
        showCategory(data.categories)
    })
    .catch(error => {
        console.log(error)
    })
}

// Category Display Function 
const showCategory = (value) => {
    value.forEach((category) => {
        categoryContainer.innerHTML += `
        <li id="${category.id}" class="hover:border-b-4 hover:border-red-600 cursor-pointer ${category.id === 'main' ? "active" : ""} ">${category.title}</li>
    `
    })
    categoryContainer.addEventListener("click", (event) => {
        const allLi = document.querySelectorAll("li")
        allLi.forEach(li => {
            li.classList.remove("active")
        })

        if(event.target.tagName === "LI"){
            // console.log(event.target.id)
            event.target.classList.add("active");
            loadNewsByCategory(event.target.id)
        }
    })
}

const loadNewsByCategory = (categoryId) => {

    const url = `https://news-api-fs.vercel.app/api/categories/${categoryId}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        showNewsByCategory(data.articles)
    })
    // .catch(error => {
    //     console.log(error)
    // }) 
}


const showNewsByCategory = (articles) => {
    newsContainer.innerHTML = ""
    articles.forEach(article => {
        // console.log(article.title)
        newsContainer.innerHTML += `
            <div class="border border-gray-300 rounded-lg space-y-4">
                <div>
                    <img src="${article.image.srcset[5].url}" alt="">
                </div>
                <div class="p-4">
                <h2 class="py-3 font-bold">${article.title}</h2>
                <p class="pb-5 text-sm">${article.time}</p>
                <button class="text-[10px] rounded-sm px-2 py-1 mr-2 bg-gray-100 cursor-pointer">Bookmark</button>
                <button class="text-[10px] rounded-sm px-2 py-1 bg-gray-100 cursor-pointer">Details</button>
                </div>
            </div>
        `
    })
}




loadCategory()
loadNewsByCategory("main")