// import('../src/css/index.css')
// import('../src/css/listdt.css')
let cat = document.querySelector('.cat')
let item = document.querySelector('.item')
let category = []
let ul = document.querySelector('.picf')
let one = document.querySelector('.one')
const buttoning = document.querySelector('.buttomimg')
item.onclick = function () {
    one.style.display = "block"
    console.log(1);
}
fetch('http://redrock.udday.cn:2022/playlist/catlist').then((res) => {
    return res.json()
}).then((res) => {
    console.log(res);
    console.log(res.sub.length);
    for (let i = 0; i < res.sub.length; i++) {
        let li = document.createElement("li")
        li.setAttribute('class', 'category')
        li.innerHTML = res.sub[i].name
        cat.appendChild(li)
        category.push(res.sub[i].name)
        console.log(category);
        li.onclick = function () {
            fetch(`http://redrock.udday.cn:2022/top/playlist?cat=${category[i]}`).then((res) => {
                return res.json()
            }).then((res) => {
                //s console.log(res);
                for (let j = 0; j < res.playlists.length; j++) {
                    let div = document.createElement("div")
                    let span = document.createElement("span")
                    span.innerHTML = res.playlists[j].name
                    span.setAttribute('positon', 'absolute')
                    span.setAttribute('top', '0px')
                    div.setAttribute('class', 'pic')
                    let button = document.createElement("button")
                    let img = document.createElement("img")
                    let a = document.createElement("a")
                    img['onclick'] = x => {
                        window.location.replace(`..\\html\\playlist.html?id=${res.playlists[j].id}`)
                    }
                    a.setAttribute('class', 'playlista')
                    a.appendChild(img)
                    div.appendChild(a)
                    ul.appendChild(div)
                    div.appendChild(button)
                    div.appendChild(span)
                    img.src = res.playlists[j].coverImgUrl
                    //console.log(div);
                    one.style.display = "none"
                    console.log(3);
                    div.onclick = function () {
                        one.style.display = "none"
                        console.log(3);
                    }
                }
            })
        }
    }
})