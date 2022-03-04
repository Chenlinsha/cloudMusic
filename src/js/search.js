//import('../src/css/search.css')
let search = document.querySelector('.search')
let searchbox = document.querySelector('.hipt')
let touxiang = document.querySelector('.atouxiang')
let name1 = document.querySelector('.name1')
let songs = document.querySelector('.songlist')
const buttoning = document.querySelector('.buttomimg')
const song1 = document.querySelector('.song')
const songer2 = document.querySelector('.songer1')
const searchname = document.querySelector('.searchname')
let ids = []
let names = []
let songerlist = []
let index = 0
let buttonpic = []


let res = JSON.parse(localStorage.getItem("res"))
console.log(res);
let searchvalue = localStorage.getItem("searchvalue")
searchname.innerHTML = `搜索：${searchvalue}`
for (let i = 0; i < res.length; i++) {
    let li = document.createElement("li")
    let img1 = document.createElement("img")
    let img2 = document.createElement("img")
    li.setAttribute('class', 'onesong')
    let num = document.createElement("span")
    let name = document.createElement("span")
    let songer1 = document.createElement("span")
    let cd = document.createElement("span")
    name.setAttribute('class', 'name2')
    num.setAttribute('class', 'num')
    songer1.setAttribute('class', 'songer2')
    cd.setAttribute('class', 'cd')
    names.push(res[i].name)
    ids.push(res[i].id)
    buttonpic.push(res[i].album.artist.img1v1Url)
    songerlist.push(res[i].artists[0].name)
    if (i < 9) {
        let value = i + 1
        num.innerHTML = "0" + value.toString()
    } else {
        num.innerHTML = i + 1
    }
    img1.setAttribute('src', 'PNG\\love.PNG')
    img2.setAttribute('src', 'PNG\\download2.PNG')
    name.innerHTML = res[i].name
    songer1.innerHTML = res[i].artists[0].name
    songs.appendChild(li)
    li.appendChild(num)
    li.appendChild(img1)
    li.appendChild(img2)
    li.appendChild(name)
    li.appendChild(songer1)
    let id = res[i].id
    let src1 = res[i].album.artist.img1v1Url
    li['onclick'] = x => {
        buttoning.src = src1
        songer2.innerHTML = res[i].artists[0].name
        song1.innerHTML = res[i].name
        fetch(`http://redrock.udday.cn:2022/song/url?id=${id}`).then((res) => {
            return res.json()
        }).then((res) => {
            console.log(id);
            Audio.src = res.data[0].url
            console.log(Audio.src)
        })
    }
}


console.log(localStorage.getItem("token"));


document.addEventListener('keydown', function (e) {
    let theEvent = e || window.event;
    let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        fetch(`http://redrock.udday.cn:2022/search?keywords=${searchbox.value}`, {
                method: 'Get'
            }).then((res) => {
                return res.json()
            }).then((res) => {
                console.log(res);
                return res.result.songs;
            })
            .then((res) => {
                console.log(res);
                searchname.innerHTML = "搜索：" + searchbox.value
                for (let i = 0; i < res.length; i++) {
                    let div = document.createElement("div")
                    let img1 = document.createElement("img")
                    let img2 = document.createElement("img")
                    let li = document.createElement("li")
                    li.setAttribute('class', 'onesong')
                    let num = document.createElement("span")
                    let name = document.createElement("span")
                    let songer1 = document.createElement("span")
                    let cd = document.createElement("span")
                    name.setAttribute('class', 'name2')
                    num.setAttribute('class', 'num')
                    songer1.setAttribute('class', 'songer2')
                    cd.setAttribute('class', 'cd')
                    names.push(res[i].album.name)
                    console.log(names);
                    ids.push(res[i].id)
                    buttonpic.push(res[i].album.artist.img1v1Url)
                    songerlist.push(res[i].artists[0].name)
                    if (i < 9) {
                        let value = i + 1
                        num.innerHTML = "0" + value.toString()
                    } else {
                        num.innerHTML = i + 1
                    }

                    name.innerHTML = res[i].name
                    songer1.innerHTML = res[i].artists[0].name
                    songs.appendChild(div)
                    console.log(div);
                    div.appendChild(li)
                    li.appendChild(num)
                    img1.setAttribute('src', 'PNG\\love.PNG')
                    img2.setAttribute('src', 'PNG\\download2.PNG')
                    li.appendChild(img1)
                    li.appendChild(img2)
                    li.appendChild(name)
                    li.appendChild(songer1)
                    let id = res[i].id
                    let src1 = res[i].album.artist.img1v1Url
                    li['onclick'] = x => {
                        buttonimg.src = src1
                        songer2.innerHTML = res[i].artists[0].name
                        song1.innerHTML = res[i].name
                        fetch(`http://redrock.udday.cn:2022/song/url?id=${id}`).then((res) => {
                            return res.json()
                        }).then((res) => {
                            Audio.src = res.data[0].url
                            console.log(Audio.src)
                        })
                    }
                }
            })
    }
})