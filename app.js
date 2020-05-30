const allCards = document.querySelector('.card-deck');

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
            <h5 class="card-title">${post.title}</h2>
            <p class="card-text">${post.body}</p>

            <div class="read-more">
               <button>Read More</button>
            </div>
        </div>
      `;
  
      allCards.appendChild(cardEl); 
    });
  }

  showPosts();


//   function SetMaxLength() {
//     var title = document.querySelector(".card-title");
//     title.maxLength = 10;
//  }

 

//   <head>
//     <script type="text/javascript">
//         function SetMaxLength () {
//             var input = document.getElementById("myInput");
//             input.maxLength = 10;
//         }
//     </script>
// </head>
// <body>
//     <input id="myInput" type="text" size="20" />
// </body>