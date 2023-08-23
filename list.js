class RedditList extends HTMLElement{

    constructor(){
        super()
        this.attachShadow({mode: 'open'})

    }

    connectedCallback(){
        const params = this.getParams()
        this.shadowRoot.innerHTML = `<style>
        .post-div{
            border: 1px solid black;
            gap: 4px;
        }
        
        </style>`
        this.shadowRoot.innerHTML += `<div id="post-container">
        
        </div>`         
        RedditService.getPosts(params.get('r')).then(posts => {

            console.log(posts)

            for (let i = 0; i < posts.data.children.length; i++) {
                const post = posts.data.children[i].data;
                let blabla; 
                if (post.thumbnail !== 'self' && post.thumbnail !== 'nsfw'){
                    blabla = `<img src="${post.thumbnail}"></img>`
                } else {
                    blabla="";
                }
                const container = this.shadowRoot.getElementById('post-container')
                const postDiv = document.createElement('div')
                postDiv.classList.add('post-div')
               
                postDiv.innerHTML += `
                
                    <div>${post.title}</div>
                    <div>Posted by r/${post.author}</div>
                    <div>${blabla}</div>
                    <div>Vai al post: <a href="${post.url}" target="_blank">link</a></div>
                                 
                `
                const permalinkBtn = document.createElement('button')
                const btnText = document.createTextNode('Cliccami');

                const postUrl = 'https://api.reddit.com/api/info/?id=' + post.id;

                permalinkBtn.appendChild(btnText)
                permalinkBtn.addEventListener('click', () => {
                localStorage.setItem('singlePost', postUrl)
                window.location.href='./single-post.html';
            }
                 );
                postDiv.appendChild(permalinkBtn)
                container.appendChild(postDiv)
            }            

        })

        


    }

    getParams() {
        const params = new URLSearchParams(window.location.search);
        console.log(params);
        return params;
    }

}

customElements.define('reddit-list', RedditList)