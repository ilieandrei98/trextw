export default class Readmore {
    constructor(baseUrl, id) {
        String.prototype.replaceAll = function (search, replacement) {
            var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };
        fetch(`${baseUrl}/api/articles/${id}`, { method: "GET" }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).then(rsp => {
            console.log(rsp);
            let tagsHTML = '';
            rsp.tags.forEach(tag => {
                tagsHTML += `<div class="tag-label article-tag-label">${tag}</div>`;
            });
            var isLiked = false;
            document.getElementById("readmore-article").innerHTML = `
            <div class="article-image" style="background-image: url(https://cdn-images-1.medium.com/max/1600/${rsp.previewImage})">

            </div>
            <div class="article">
                <div class="article-header readmore">
                    <div class="article-info">
                        <div class="article-title">${rsp.title}</div>
                        <div class="popularity-score">${rsp.popularity} likes</div>
                    </div>
                    <div class="article-labels">
                        <div class="tag-list">
                            ${tagsHTML}
                        </div>
                    </div>
                </div>
                <div class="article-content">${rsp.text.replaceAll('\n', '<br><br>&nbsp&nbsp&nbsp&nbsp')}</div>
                <div id="article-like-button">${isLiked?'Liked':'Like!'}</div>
            </div>
            `
        })
    }
}