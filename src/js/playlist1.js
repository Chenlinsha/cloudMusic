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

function GetUrlPara() {
    let = url = document.location.toString(); //获取当前URL
    if (url.indexOf("?") != -1) { //判断URL？后面不为空
        let = arrUrl = url.split("?"); //分割？
        let = para = arrUrl[1]; //获取参数部分
        if (para) //判断传入的参数部分不为空
        {
            let = arr = para.split("=");
            let res = arr.slice(1, 4)
            console.log(res); //分割=
            // var res = arr[1]; //获取参数的值
            return res;
        }
    }
    return null;
}
let id = GetUrlPara();
console.log(id);
fetch(`http://redrock.udday.cn:2022/playlist/detail?id=${id}`).then((res) => {
        return res.json();
    })
    .then((res) => {
        console.log(res);
        tag.innerHTML = res.playlist.tags
        song.innerHTML = res.playlist.trackCount
        saudio.innerHTML = res.playlist.playCount
        exp.innerHTML = res.playlist.description
        pic.src = res.playlist.coverImgUrl
        listname.innerHTML = res.playlist.name
        touxiang.src = res.playlist.creator.avatarUrl
        name1.innerHTML = res.playlist.creator.nickname
        return res.playlist.tracks
    })
    .then((res) => {
        console.log(res);
        for (let i = 0; i < res.length; i++) {
            songerlist.push(res[i].ar[0].name);
            names.push(res[i].name)
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
            if (i < 9) {
                let value = i + 1
                num.innerHTML = "0" + value.toString()
            } else {
                num.innerHTML = i + 1
            }
            name.innerHTML = res[i].name
            songer1.innerHTML = res[i].ar[0].name
            songs.appendChild(li)
            li.appendChild(num)
            let img1 = document.createElement("img")
            let img2 = document.createElement("img")
            img1.setAttribute('src', '../images/love.PNG')
            img2.setAttribute('src', '../images/download2.PNG')
            li.appendChild(img1)
            li.appendChild(img2)
            li.appendChild(name)
            li.appendChild(songer1)
            ids.push(res[i].id)
            //     als.push(res[i].al.name)
            let id = res[i].id
            buttonpic.push(res[i].al.picUrl)
            let src1 = res[i].al.picUrl

            li['onclick'] = x => {
                console.log(res);
                localStorage.setItem("pic", src1)
                localStorage.setItem("alname", res[i].al.name);
                localStorage.setItem("songer", res[i].ar[0].name)
                localStorage.setItem("song", res[i].name)
                localStorage.setItem("idl", id)
                buttoning.src = src1
                console.log(src1);
                console.log(id);
                songer2.innerHTML = res[i].ar[0].name
                song1.innerHTML = res[i].name
                fetch(`http://redrock.udday.cn:2022/song/url?id=${id}`).then((res) => {
                    return res.json()
                }).then((res) => {
                    Audio.src = res.data[0].url
                    localStorage.setItem("src", res.data[0].url)
                })
            }
        }
    })
buttoning['onclick'] = x => {
    window.location.replace("..\\html\\radio.html")
}