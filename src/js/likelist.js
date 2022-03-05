// import('../src/css/playlist.css')
let cookie =  localStorage.getItem("cookie")
let nickname = document.querySelector('.name')
let imgtouxiang = document.querySelector('.pictou')
let atouxiang = document.querySelector('.atouxiang')
let myname = document.querySelector('.name1')
let names = []
let songerlist = []
const buttoning = document.querySelector('.buttomimg')
let buttonpic = []
let als = []
const song1 = document.querySelector('.song')
const songer2 = document.querySelector('.songer1')
let songs = document.querySelector('.songs')
let pic = document.querySelector('.pic')
let ids = []
nickname.innerHTML =  localStorage.getItem("res.profile.nickname")
imgtouxiang.src =  localStorage.getItem("res.profile.avatarUr")
atouxiang.src =  localStorage.getItem("res.profile.avatarUr")
myname.innerHTML =  localStorage.getItem("res.profile.nickname")

fetch(`http://redrock.udday.cn:2022/likelist?uid=${userid}&cookie=${cookie}`).then((res) => {
    return res.json()
}).then((res) => {
    ids = res.ids

    for (let i = 0; i < ids.length; i++) {
        fetch(`http://redrock.udday.cn:2022/song/detail?ids=${ids[i]}`).then((res) => {
            return res.json()
        }).then((res) => {
            let ul = document.querySelector('.songs1')
            for (let j = 0; j < res.songs.length; j++) {
                songerlist.push(res.songs[j].ar[0].name)
                names.push(res.songs[j].name)
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
                buttonpic.push(res.songs[j].al.picUrl)
                name.innerHTML = res.songs[j].name
                songer1.innerHTML = res.songs[j].ar[0].name
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
                ul.appendChild(li)
                 localStorage.setItem("piclove", res.songs[j].al.picUrl)
                 localStorage.setItem("songpic", res.songs[0].al.picUrl)

                let piclove =  localStorage.getItem("piclove")
                let id = res.songs[j].id

                li['onclick'] = x => {
                    buttoning.src = piclove
                    songer2.innerHTML = res.songs[j].ar[0].name
                    song1.innerHTML = res.songs[j].name
                    fetch(`http://redrock.udday.cn:2022/song/url?id=${id}`).then((res) => {
                        return res.json()
                    }).then((res) => {
                        console.log(id);
                        Audio.src = res.data[0].url
                         localStorage.setItem("src", res.data[0].url)
                    })
                }
            }
        })

    }
})
console.log( localStorage.getItem("songpic"));
pic.src =  localStorage.getItem("songpic")

//-------------------------------------------------------------------------------------

function transTime(value) {
    let time = '';
    let h = parseInt(`${value / 3600}`);
    value %= 3600;
    let m = parseInt(`${value / 60}`);
    let s = parseInt(`${value % 60}`);
    if (h > 0) {
        time = formatTime(h + ':' + m + ':' + s);
    } else {
        time = formatTime(m + ':' + s);
    }

    return time;
}
// 补零
function formatTime(value) {
    let time = '';
    let s = value.split(':');
    let i = 0;
    for (; i < s.length - 1; i++) {
        time += s[i].length === 1 ? '0' + s[i] : s[i];
        time += ':';
    }
    time += s[i].length === 1 ? '0' + s[i] : s[i];

    return time;
}

contorl.addEventListener('click', e => {
    if (e.target.innerText === '▶') {
        e.target.innerText = '┃┃';
        Audio.play();

    } else {
        e.target.innerText = '▶';
        Audio.pause();
    }
});

Audio.addEventListener('loadedmetadata', e => {
    duration.innerText = transTime(e.target.duration);
});

Audio.addEventListener('timeupdate', e => {
    let value = e.target.currentTime / Audio.duration;
    current.innerText = transTime(e.target.currentTime);
    contorlProgress.style.width = `${value * 100}%`;
    contorlDot.style.left = `${value * 100}%`;
});

Audio.addEventListener('ended', e => {
    contorlProgress.style.width = '0%';
    contorlDot.style.left = '0%';
    contorl.innerText = '▶';
});