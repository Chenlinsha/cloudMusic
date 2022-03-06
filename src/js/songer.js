let ul = document.querySelector('.songer')
let all1 = document.querySelector('#all1')
let all2 = document.querySelector('#all2')
let tablli = document.querySelector('.tablli ')
let catLi = document.querySelectorAll('.catg')
let interLi = document.querySelectorAll('.int')
let li
let int1, cat
let int = document.querySelectorAll('.int')
const index = document.querySelector('#tab2')
const songlist = document.querySelector('#tab3')
let ints = []
let catgs = []
let i
ints.push(int)
ints[0] = -1
ints[1] = 7
ints[2] = 96
ints[3] = 8
ints[4] = 16
catgs.push(catLi)
catgs[0] = -1
catgs[1] = 1
catgs[2] = 2
catgs[3] = 3


console.log(int);
int.forEach(((ele, i) => {
    int[i].addEventListener('click', () => {
        int.forEach(((ele, j) => {
            int[j].style.color = "black"
            int[i].style.color = "red"
        }))
    })
}))
catLi.forEach(((ele, i) => {
    catLi[i].addEventListener('click', () => {
        catLi.forEach(((ele, j) => {
            catLi[j].style.color = "black"
            catLi[i].style.color = "red"
        }))
    })
}))

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
    ul.innerHTML = ''
}
interLi.forEach((ele, i) => {
    ele.addEventListener('click', function () {
        myRemove()
        int ? int1 = ints[i] : int = -1;
        getUserByAsync()
    })
})
catLi.forEach((item, i) => {
    item.addEventListener('click', function () {
        myRemove()
        // cat ? cat = catgs[i] : cat = -1;
        console.log(cat);
        if (cat) {
            cat = catgs[i]
        } else {
            cat = -1
        }
        console.log(cat);
        getUserByAsync()
    })
})
index.onclick = () => window.location.replace("..\\html\\cloudmusic.html")
songlist.onclick = () => window.location.replace("..\\html\\listdt.html")