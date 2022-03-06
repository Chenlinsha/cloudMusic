// import('../src/css/index.css')
// import('../src/css/listdt.css')
let cat = document.querySelector('.cat')
let item = document.querySelector('.item')
let category = []

let ul = document.querySelector('.picf')
let one = document.querySelector('.one')
const buttoning = document.querySelector('.buttomimg')
const index = document.querySelector('#tab2')
const song = document.querySelector('#tab3')
item.onclick = function () {
    one.style.display = "block"
    console.log(1);
}
async function getFetch(url) {
    let response = await fetch(url)
    let res = await response.json()
    //  console.log(res);
    return res
}
async function getCatlist() {
    let res = await getFetch('http://redrock.udday.cn:2022/playlist/catlist')
    res.sub.forEach((ele, i) => {
        let li = document.createElement("li")
        li.setAttribute('class', 'category')
        li.innerHTML = res.sub[i].name
        console.log(1);
        console.log(cat);
        cat.appendChild(li)
        category.push(res.sub[i].name)
        li.onclick = async () => {
            let res = await getFetch(`http://redrock.udday.cn:2022/top/playlist?cat=${category[i]}`)
            ul.innerHTML = ''
            res.playlists.forEach((ele, i) => {
                let div = document.createElement("div")
                div.setAttribute('class', 'pic')
                div.innerHTML = `<a class="playlista"><img position="absolute" top="0px" src="${res.playlists[i].coverImgUrl}">
              </a><button></button><span>${res.playlists[i].name}</span>`
                ul.appendChild(div)
                div.addEventListener('click', () => {
                    window.location.replace(`..\\html\\playlist.html?id=${res.playlists[i].id}`)
                })
                one.style.display = "none"
                div.onclick = function () {
                    one.style.display = "none"
                }
            })

        };
    })
}
getCatlist()

index.onclick = () => window.location.replace("..\\html\\cloudmusic.html")
song.onclick = () => window.location.replace("..\\html\\songer.html")