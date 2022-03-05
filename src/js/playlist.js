//import('../src/css/playlist.css')
let tag = document.querySelector('.contag')
let song = document.querySelector('.consong')
let saudio = document.querySelector('.consaudio')
let exp = document.querySelector('.conexp')
let pic = document.querySelector('.pic')
let listname = document.querySelector('.listname')
let touxiang = document.querySelector('.atouxiang')
let name1 = document.querySelector('.name1')
let songs = document.querySelector('.songs')
const buttoning = document.querySelector('.buttomimg')
const song1 = document.querySelector('.song')
const songer2 = document.querySelector('.songer1')
let ids = []
let names = []

let songerlist = []
let index = 0
let buttonpic = []
let als = []
let radioSongs = document.querySelector('.radiosongs')
let lis = []
let radiolist = document.querySelector('.radiolist')
let conright = document.querySelector('.conright')
let lid = GetUrlPara();

function GetUrlPara() {
    let url = document.location.toString(); //获取当前URL
    if (url.indexOf("?") != -1) { //判断URL？后面不为空
        let arrUrl = url.split("?"); //分割？
        let para = arrUrl[1]; //获取参数部分
        if (para) //判断传入的参数部分不为空
        {
            let arr = para.split("=");
            let res = arr.slice(1, 4)
            //分割=
            // var res = arr[1]; //获取参数的值
            return res;
        }
    }
    return null;
}

async function getFetch(url) {
    let response = await fetch(url)
    let res = await response.json()
    //  console.log(res);
    return res
}
async function getDetail() {
    let res = await getFetch(`http://redrock.udday.cn:2022/playlist/detail?id=${lid}`)
    tag.innerHTML = res.playlist.tags
    song.innerHTML = res.playlist.trackCount
    saudio.innerHTML = res.playlist.playCount
    exp.innerHTML = res.playlist.description
    pic.src = res.playlist.coverImgUrl
    listname.innerHTML = res.playlist.name
    touxiang.src = res.playlist.creator.avatarUrl
    name1.innerHTML = res.playlist.creator.nickname
    res = res.playlist.tracks
    res.forEach((ele, i) => {
        songerlist.push(res[i].ar[0].name);
        names.push(res[i].name)
        let li = document.createElement("li")
        li.setAttribute('class', 'onesong')
        li.innerHTML = `<img src="../images/love.PNG" > <img src="../images/download.PNG" ><span class="num">${i < 9 ? "0" + (i + 1)  : i + 1}</span><span class="name2">${res[i].name}</span><span
        class="songer2">${ res[i].ar[0].name}</span><span class="cd"></span>`
        songs.appendChild(li)
        ids.push(res[i].id)
        let smallli = document.createElement("li")
        smallli.setAttribute('class', 'onesong')
        smallli.innerHTML = li.innerHTML
        let id = res[i].id
        buttonpic.push(res[i].al.picUrl)
        let src1 = res[i].al.picUrl
        smallli['onclick'] = async () => {
            buttoning.src = src1
            lis.forEach((ele, j) => {
                lis[j].style.color = "black"
                smallli.style.color = "red"
            })
            songer2.innerHTML = res[i].ar[0].name
            song1.innerHTML = res[i].name
            let data = getFetch(`http://redrock.udday.cn:2022/song/url?id=${id}`)
            Audio.src = data.data[0].url
            buttoning['onclick'] = () => {
                window.location.replace(`..\\html\\radio.html?i=!${i}&ids=`
                    `!${lid}`)
            }
        }
        li['onclick'] = async () => {
            buttoning.src = src1
            songer2.innerHTML = res[i].ar[0].name
            lis.forEach((ele, j) => {
                lis[j].style.color = "black"
                smallli.style.color = "red"
            })
            song1.innerHTML = res[i].name
            let data = await getFetch(`http://redrock.udday.cn:2022/song/url?id=${id}`)
            Audio.src = data.data[0].url
            buttoning['onclick'] = x => {
                window.location.replace(`radio.html?i=!${i}&ids=!${lid}`)
            }
        }

    })
}
getDetail()

function switchAudio() {
    document.querySelector(".song").innerHTML = names[index]
    for (let j = 0; j < lis.length; j++) {
        lis[j].style.color = "black"
        lis[index].style.color = "red"
    }
    document.querySelector(".songer1").innerHTML = songerlist[index]
    Audio.play()
}

up.onclick = async function () {
    let res = await getFetch(`http://redrock.udday.cn:2022/song/url?id=${ids[index]}`)
    index++;
    if (index == names.length)
        index = 0
    Audio.src = res.data[0].url
    switchAudio()
}
down1.onclick = async function () {
    let res = await getFetch(`http://redrock.udday.cn:2022/song/url?id=${ids[index]}`)
    index = index - 1
    if (index == -1) {
        index = names.length - 1
    }
    Audio.src = res.data[0].url
    switchAudio()
}
contianer.onclick = x => {
    conright.style.display = "none"
    console.log(conright.style.disply);
}

radiolist.onclick = () => {
    conright.style.display = "block"

}

// songs.onclick = x => {
//     conright.style.disply = "block"
//     console.log(2);
// }