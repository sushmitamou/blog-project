const singlePost = document.querySelector('.single-post');


//fetch post from API
async function getPosts(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1`);
    
    const data = await res.json();
    return data;

}

async function singlePagePost(postId) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/v1/${postId}`);
    const data = await res.json();
     
      const cardEl = document.createElement('div');
      cardEl.innerHTML = `
        <div class="card-body">
            <h3>${data.title}</h3>
            <p>${data.body}</p>
        </div>
      `;
  
    allCards.appendChild(cardEl); 
    
  }

  singlePagePost();



