let ids = []
let names = []
let songerlist = []
let index = 0
let buttonpic = []
let als = []
let songs = document.querySelector('.songs')
const song1 = document.querySelector('.song')
const songer2 = document.querySelector('.songer1')
const buttoning = document.querySelector('.buttomimg')
let pic = document.querySelector('.pic')
let listname = document.querySelector('.listname')

function GetUrlPara() {
    let url = document.location.toString(); //获取当前URL
    if (url.indexOf("?") != -1) { //判断URL？后面不为空
        let arrUrl = url.split("?"); //分割？
        let para = arrUrl[1]; //获取参数部分
        if (para) //判断传入的参数部分不为空
        {
            let arr = para.split("!");
            let res = arr.slice(1, 3)
            console.log(res); //分割=
            // var res = arr[1]; //获取参数的值
            return res;
        }
    }
    return null;
}
let res = GetUrlPara();
let id = res[0]
let src = res[1]
console.log(id);
console.log(src);
fetch(`http://redrock.udday.cn:2022/artist/top/song?id=${id}`).then((res) => {
    return res.json()
}).then((res) => {
    console.log(res);
    for (let i = 0; i < res.songs.length; i++) {
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
        name.innerHTML = res.songs[i].name
        songer1.innerHTML = res.songs[0].ar[0].name
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
        pic.src = src
        listname.innerHTML = res.songs[1].ar[0].name
        let src1 = res.songs[i].al.picUrl
        //     als.push(res[i].al.name)
        let id3 = res.songs[i].id
        ids.push(res.songs[i].id)
        names.push(res.songs[i].name)

        buttonpic.push(res.songs[i].al.picUrl)
        li['onclick'] = x => {
            console.log(res);
            localStorage.setItem("pic", src1)
            localStorage.setItem("alname", res.songs[i].al.name);
            //  localStorage.setItem("songer", res[i].ar[0].name)
            localStorage.setItem("song", res.songs[i].name)
            localStorage.setItem("idl", id)
            buttoning.src = src1
            console.log(src1);
            console.log(id3);
            songer2.innerHTML = res.songs[0].ar[0].name
            song1.innerHTML = res.songs[i].name
            fetch(`http://redrock.udday.cn:2022/song/url?id=${id3}`).then((res) => {
                return res.json()
            }).then((res) => {
                console.log(res);
                Audio.src = res.data[0].url
                localStorage.setItem("src", res.data[0].url)
                buttoning['onclick'] = x => {
                    window.location.replace(`radio.html?id=!${id3}`)
                }
            })
        }
    }
})