const allCards = document.querySelector('.card-deck');
const singlePost = document.querySelector('.single-post');


let limit = 15;
let page = 1;

//fetch post from API
async function getPosts(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    
    const data = await res.json();
    return data;
}

async function showPosts() {
    const posts = await getPosts();
  
    posts.forEach(post => {
      const cardEl = document.createElement('div');
      cardEl.classList.add('single-card');
      cardEl.innerHTML = `
        <div class="card-body">
            <div class='number'>${post.id}</div>
            <h5 class="card-title">${post.title}</h2>
            <p class="card-text">${post.body}</p>

            <div class="read-more">
              <button post-id="${post.id}">Read More</button>
            </div>
        </div>
      `;
  
      allCards.appendChild(cardEl); 
    });
  }

  showPosts();


  allCards.addEventListener('click', e => {
    const clickedEl = e.target;
  
    if (clickedEl.tagName === 'BUTTON') {
      const postId = clickedEl.getAttribute('post-id');
  
      singlePagePost(postId);
      //alert(postId);
    }
  });
  
  async function singlePagePost(postId) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const data = await res.json();
    console.log(data);

    allCards.innerHTML = "";
    allCards.innerHTML = `
                          <i class="fa fa-arrow-circle-left" onclick="showPosts();"></i>
                          <h3 class="single-page-title"><strong>${data.title}</strong></h3><br>
                          <p class="single-page-paragraph">${data.body}<p>

    `;

    
  }