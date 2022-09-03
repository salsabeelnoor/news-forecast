//Load news categories
const loadNewsCategory = async() => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try{
        const rest = await fetch(url);
        const data = await rest.json();
        // console.log(data.data.news_category);
        displayCategory(data.data.news_category);
        getNews(data.data.news_category);
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
            <a href="#" id="${category.category_id}"
            class="ml-0 hover:text-blue-500 font-roboto font-normal lg:text-lg text-base text-[#858585] leading-loose px-3 lg:px-1"
            aria-current="page">${category.category_name}</a>
        </li>
        `;
        newsCategory.appendChild(categoryList);
    })
    toggleSpinner(false);
}
const displayCategoryFailed = () => {
    const newsCategory = document.getElementById('fail-div');
    newsCategory.classList.remove('hidden');
    newsCategory.innerHTML = `
        <h3 class="text-center text-gray-700 font-roboto font-normal lg:text-lg text-base text-[#858585]">404 NOT FOUND</h3>
    `;
}
//Load news
const loadNews = async (category_id, category_name) => {
    toggleSpinner(true);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    try{
        const rest = await fetch(url);
        const data = await rest.json();
        // console.log(data.data);
        displayNews(data.data, category_name);
    }
    catch(error){
        console.log(error);
    }
    
}
const getNews = categories => {
    categories.forEach(category => {
        document.getElementById(`${category.category_id}`).addEventListener('click', function(){
            
            loadNews(category.category_id, category.category_name);
        })
    })
}
const displayNews = (news, category_name) => {
    //count number of news
    const newsCount = news.length;
    const newsCountContainer = document.getElementById('news-count');
    newsCountContainer.innerHTML = `
    <p class="lg:py-4 lg:pl-7 py-3 pl-5 font-roboto font-normal text-base text-gray-800">${newsCount} items found for category
    ${category_name}</p>
    `;
    //show all news
    const newsContainer = document.getElementById('news-container');
    //check news exist or not
    const showFailMsg = document.getElementById('no-news-found');
    if(news.length == 0){
        showFailMsg.classList.remove('hidden');
    }
    else{
        showFailMsg.classList.add('hidden');
    }
    news.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    news.forEach(news => {
        //name check
        let authorName;
        if(news.author.name == '' || news.author.name == null){
            authorName = 'Not availabe';
        }
        else{
            authorName = news.author.name;
        }
        //check view
        let view;
        if(news.total_view == '' || news.total_view == null){
            view = 0;
        }
        else{
            view = news.total_view;
        }
        //slice text
        let newsDetail = '';
        if(news.details.length > 900){
            newsDetail = news.details.slice(0,900) + '...';
        }
        else{
            newsDetail = news.details;
        }
        //create div
        const newsCard = document.createElement('div');
        newsCard.classList.add('card');
        newsCard.innerHTML = `
            <div class="card container mx-auto pb-4">
            <a href="#"
                class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row">
                <img class="object-cover w-full h-70 rounded-t-lg md:h-80 md:w-2/12 md:rounded-none md:rounded-l-lg lg:p-2"
                    src="${news.image_url}" alt="">
                <div class="flex flex-col justify-between p-4 leading-normal w-full">
                    <h5 class="mb-2 text-2xl font-bold tracking-normal text-gray-900 md:mt-0 lg:pt-0">${news.title}</h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${newsDetail}</p>
                
                    <!-- writer -->
                    <div class="pt-3"> 
                        <div class="flex lg:flex-row justify-between">
                            <div class="flex">
                                <img src="${news.author.img}" class="rounded-full w-10 h-10" alt="">
                                <p class="pl-2 pt-1.5 font-roboto font-normal text-base text-gray-500">${authorName}</p>
                            </div>
                            <!-- view -->
                            <div class="flex pr-2">
                                <i class="fa-solid fa-eye lg:pt-3.5 text-[#515151] pt-2.5"></i>
                                <p class="lg:pt-2.5 pl-2 pt-1.5 font-roboto font-bold text-base">${view}</p>
                            </div>
                            <div class="flex ">
                            <label for="my-modal-3" onclick="loadFullNews('${news._id}')" class="btn btn-outline modal-button flex items-center">See More <i class="fa-solid md:pl-2 fa-arrow-right invisible md:visible"></i></label>
                            </div>
                        </div>
                    </div>
                </div>
            </a>

        </div>
        `;
        newsContainer.appendChild(newsCard);
    })
    //stop spinner
    toggleSpinner(false);
}
const loadFullNews = async id => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        displayFullNews(data.data);
    }
    catch {
        alert("Data couldn't be fetched");
    }
}

const displayFullNews = newsData => {
    console.log(newsData)
    document.getElementById('newsTitle').innerText = newsData[0].title ? newsData[0].title : 'Not Available';
    document.getElementById('fullNews').innerText = newsData[0].details ? newsData[0].details : 'Not Available';
    document.getElementById('newsAuthor').innerText = newsData[0].author.name ? newsData[0].author.name : 'Not Available';
    document.getElementById('newsDate').innerText = newsData[0].author.published_date ? newsData[0].author.published_date : 'Not Available';
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    const showFailMsg = document.getElementById('no-news-found');
    if(isLoading){
        showFailMsg.classList.add('hidden');
        loaderSection.classList.remove('hidden');
    }
    else {
        loaderSection.classList.add('hidden');
    }
}
loadNewsCategory();
loadNews('08', 'All News');
