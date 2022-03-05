let ul = document.querySelector('.songer')
let all1 = document.querySelector('#all1')
let all2 = document.querySelector('#all2')
let tablli = document.querySelector('.tablli ')
let catLi = document.querySelectorAll('.catg')
let interLi = document.querySelectorAll('.int')
let li
let int1, cat
let int = document.querySelectorAll('.int')
let catg = document.querySelectorAll('.catg')
let ints = []
let catgs = []
let i
ints.push(int)
ints[0] = -1
ints[1] = 7
ints[2] = 96
ints[3] = 8
ints[4] = 16

catgs.push(catg)


catgs.forEach((ele, i) => {
    ele = i == 0 ? -1 : i
});

async function getUserByAsync() {
    let response = await fetch(`http://redrock.udday.cn:2022/artist/list?type=${cat?cat:-1}&area=${int1?int1:-1}`)
    const movies = await response.json();
    movies.artists.forEach((ele, i) => {
        li = document.createElement("li")
        let span = document.createElement("span")
        span.innerHTML = movies.artists[i].name
        span.setAttribute('positon', 'absolute')
        span.setAttribute('top', '0px')
        li.setAttribute('class', 'pic')
        let a = document.createElement("a")
        let img = document.createElement("img")
        a.setAttribute('class', 'playlista')
        // a.setAttribute('href', 'song.html')
        a.appendChild(img)
        li.appendChild(a)
        ul.appendChild(li)
        li.appendChild(span)
        img.src = movies.artists[i].picUrl
        li['onclick'] = x => {
            window.location.replace(`..\\html\\song.html?id=!${movies.artists[i].id}&src=!${movies.artists[i].picUrl}`)
        }
    })

    return movies;
}
getUserByAsync().then(res => console.log(res));

function myRemove() {
    // ul.childNodes.forEach((ele, i) => {
    //     while (ul.hasChildNodes()) {
    //         ul.removeChild(ul.childNodes[i]);
    //     }
    // })
    ul.innerHTML = ''
}
// console.log(li);
// ul.removeChild(li)
// console.log(interLi);
interLi.forEach((ele, i) => {
    ele.addEventListener('click', function () {
        myRemove()
        int ? int1 = ints[i] : int = -1;
        getUserByAsync()
    })
})

// for (let i = 0; i < interLi.length; i++) {
//     console.log(interLi[i]);
// }

console.log(catLi);
for (let i = 0; i < catLi.length; i++) {
    catLi[i].addEventListener('click', function () {
        myRemove()
        if (int)
            int1 = ints[i]
        else {
            int = -1
        }
        getUserByAsync()
    })
}

catLi.forEach(item => {

})