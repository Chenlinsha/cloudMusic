// import('../src/css/playlist.css')
let cookie = localStorage.getItem("cookie")
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
nickname.innerHTML = localStorage.getItem("res.profile.nickname")
imgtouxiang.src = localStorage.getItem("res.profile.avatarUr")
atouxiang.src = localStorage.getItem("res.profile.avatarUr")
myname.innerHTML = localStorage.getItem("res.profile.nickname")

async function getFetch(url) {
    let response = await fetch(url)
    let res = await response.json()
    //  console.log(res);
    return res
}
async function getLikelist() {
    const res = await getFetch(`http://redrock.udday.cn:2022/likelist?uid=${userid}&cookie=${cookie}`)
    const ids = res.ids
    ids.forEach(async (ele, i) => {
        const data = await getFetch(`http://redrock.udday.cn:2022/song/detail?ids=${ids[i]}`)
        let ul = document.querySelector('.songs1')
        data.songs.forEach((ele, i) => {
            songerlist.push(data.songs[i].ar[0].name)
            names.push(data.songs[i].name)
            let li = document.createElement("li")
            li.setAttribute('class', 'onesong')
            li.innerHTML = `<img src="../images/love.PNG" > <img src="../images/download.PNG" ><span class="num">${i < 9 ? "0" + (i + 1)  : i + 1}</span><span class="name2">${data.songs[i].name}</span><span
            class="songer2">${data.songs[i].ar[0].name}</span><span class="cd"></span>`
            buttonpic.push(data.songs[i].al.picUrl)
            ul.appendChild(li)
            pic.src = data.songs[i].al.picUrl
            li['onclick'] = async () => {
                let id = data.songs[i].id
                buttoning.src = data.songs[i].al.picUrl
                songer2.innerHTML = data.songs[i].ar[0].name
                song1.innerHTML = data.songs[i].name
                let res = await getFetch(`http://redrock.udday.cn:2022/song/url?id=${id}`)
                console.log(id);
                Audio.src = res.data[0].url
                localStorage.setItem("src", res.data[0].url)
            }
        })
    });
}
getLikelist()
//------------------------------------------------------------------------------------
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