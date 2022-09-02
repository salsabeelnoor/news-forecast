// console.log("found");
const loadNewsCategory = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try{
        const rest = await fetch(url);
        const data = await rest.json();
        // console.log(data.data.news_category);
        displayCategory(data.data.news_category);
        
    }
    catch(error){
        // console.log(error);
        displayCategoryFailed();
    }
}
const displayCategory = newsCat => {
    const newsCategory = document.getElementById('category-list');
    newsCat.forEach(category => {
        const categoryList = document.createElement('li');
        categoryList.innerHTML = `
        <li>
            <a href="#"
            class=" ml-0 hover:text-blue-500 font-roboto font-normal lg:text-lg text-base text-[#858585] leading-loose px-3 lg:px-1"
            aria-current="page">${category.category_name}</a>
        </li>
        `;
        newsCategory.appendChild(categoryList);
    })
}
const displayCategoryFailed = () => {
    const newsCategory = document.getElementById('fail-div');
    newsCategory.classList.remove('d-none');
    newsCategory.innerHTML = `
        <h3 class="text-center text-gray-700 font-roboto font-normal lg:text-lg text-base text-[#858585]">404 NOT FOUND</h3>
    `;
    newsCategory.appendChild(categoryList);
    
}
loadNewsCategory();
