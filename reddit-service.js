class RedditService{

    static getPosts(subreddit, order='new'){
        const subredditName = subreddit === null ? 'popular' : subreddit;
        const redditUrl = 'https://www.reddit.com/r/' + subredditName + '/' + order + '.json'
        console.log(redditUrl);
        return fetch(redditUrl).then(resp => resp.json())

    }

    // static getSinglePost(permalink){
    //     let postUrl = 'https://www.reddit.com/' + post.permalink;
    // }

}