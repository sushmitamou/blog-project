const header     = document.querySelector('.header');
const allCards   = document.querySelector('.card-deck');
const singlePost = document.querySelector('.single-post');
const comment    = document.querySelector('.comments-section');
const loading    = document.querySelector('.loader');
const comments   = document.querySelector('.comments');
const allComments = document.querySelector('.all-comments'); 

let posts = [];
let limit = 15;
let page = 1;

//fetch post from API
async function getPosts(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    
    const data = await res.json();
    return data;
}

function getPostCardHtml(post) {
  return `
    <div class="card-body">
        <div class='number'>${post.id}</div>
        <h5 class="card-title">${post.title}</h2>
        <p class="card-text">${post.body}</p>

        <div class="read-more">
        <button post-id="${post.id}">Read More</button>
        </div>
    </div>
  `;
}

function renderPostCardsIntoHtml(posts) {
  // to-do: Remove previous posts first

  posts.forEach(post => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('post');
    cardEl.innerHTML = getPostCardHtml(post);
    allCards.appendChild(cardEl); 
  });

  loading.style.display = "flex";
}

async function showPosts() {
  
  header.style.display      ="flex";
  singlePost.style.display  = "none";
  allCards.style.display    = "flex"; 
  allComments.style.display = "none";

  posts = await getPosts();
  renderPostCardsIntoHtml(posts);
}

showPosts();


  allCards.addEventListener('click', e => {
    const clickedEl = e.target;
  
    if (clickedEl.tagName === 'BUTTON') {
      const postId = clickedEl.getAttribute('post-id');
  
      singlePagePost(postId);
      Comments(postId);
      //alert(postId);
    }
  });
  
  async function singlePagePost(postId) {

    const singlePostUrl = 'https://jsonplaceholder.typicode.com/posts';
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const data = await res.json();
    //console.log(data);

    header.style.display      = "none";
    loading.style.display     = "none";
    allCards.style.display    = "none";
    singlePost.style.display  = "flex";
    allComments.style.display = "flex";
    singlePost.innerHTML = `
        <i class="fa fa-arrow-circle-left" onclick="showPosts();"></i>
        <h3 class="single-page-title"><strong>${data.title}</strong></h3><br>
        <p class="single-page-paragraph">${data.body}</p>
    `;
  }
  // <button id="comments" post-id="${data.id}">Comments</button>


  //to get comments on a specific post

  // singlePost.addEventListener('click', e => {
  //   const clickedEl = e.target;
  
  //   if (clickedEl.tagName === 'BUTTON') {
  //     const postId = clickedEl.getAttribute('post-id');
  
  //     Comments(postId);
  //     //alert(postId);
  //   }
  // });

  async function getComments(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1/comments`);
    
    const data = await res.json();
    return data;
};

async function Comments(postId) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  const posts = await res.json();
  console.log(posts);
  
  // const posts = await getComments();

  posts.forEach(post => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('comments');
    cardEl.innerHTML = `
      <div class="card-body">
          <p class="comments-name"> <i class="fa fa-user"></i> ${post.name}</p>
          <p class="comments-email"> <i class="fa fa-envelope"> </i> ${post.email}</p>
          <p class="comments-paragraph">${post.body}</p>
      </div>
    `;

    allComments.appendChild(cardEl); 
  });
}

  ///loading
  function showLoading(){
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts();
        }, 300)

    }, 2000);
}

window.addEventListener('scroll', () => {
  const {scrollTop, scrollHeight, clientHeight}= document.documentElement;
  
  if(scrollTop + clientHeight >= scrollHeight - 5 ){
      showLoading();
  }
});

function filterPost(e){
  allCards.innerHTML = "";
  const term = e.target.value.toLowerCase();
  const filteredPost = posts.filter(post => {
    return post.title.indexOf(term) > -1;
  })

  renderPostCardsIntoHtml(filteredPost);
}

filter.addEventListener('input', filterPost);



// 1. Inital load 15 posts -> save -> card/html o show korlam
// 2. Search -> initial post -> filter -> 5 post -> card/html o show kormu

// Generic Method -> all posts -> render post cards