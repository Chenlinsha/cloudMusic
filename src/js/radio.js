let musics = document.querySelectorAll('audio')
const buttoning = document.querySelector('.buttomimg')
const song1 = document.querySelector('.song')
const songer2 = document.querySelector('.songer1')
let names = []
let musiclist = []
let songerlist = []
let ids = []
let imgs = []
let index = 0
let songname = document.querySelector('.song-name')
let album = document.querySelector('.album')
let songer3 = document.querySelector('.songer')
let circle = document.querySelector('#circle-pic')
let circle1 = document.querySelector('.circle-big')
localStorage.getItem("token")
let dia = document.querySelector('.dia')
let volumecontorl = document.querySelector('.volume-control')
let lyrics1 = document.querySelector('.lyrics')
const Audio = document.querySelector('.audio');
const contorl = document.querySelector('.on');
const contorlDot = document.querySelector('#control-dot');
const contorlProgress = document.querySelector('#control-progress');
const contorlProgressBox = document.querySelector('#progress');
const current = document.querySelector('#current');
const duration = document.querySelector('#duration');
let volume = document.querySelector('.volume')
let volumeNow = document.querySelector(".volume-now")
let volumeMax = document.querySelector(".volume-max")
let dot = document.querySelector(".volume-control-dot")
let btnif = true
const textarea = document.querySelector('textarea')
let up = document.querySelector(".down")
let down1 = document.querySelector(".up")
let flag = false; // 标记是否拖动开始
let back = document.querySelector('.hal')
let go = document.querySelector('.har')
let commend = document.querySelector('.commend')
let icon10 = document.querySelector('.icon10')
const position = {
    oriOffestLeft: 0, // 移动开始时进度条的点距离进度条的偏移值
    oriX: 0, // 移动开始时的x坐标
    maxLeft: 0, // 向左最大可拖动距离
    maxRight: 0, // 向右最大可拖动距离
};

async function getFetch(url) {
    let response = await fetch(url)
    let res = await response.json()
    //  console.log(res);
    return res
}

// up.onclick = function () {
//     fetch(`http://redrock.udday.cn:2022/song/url?id=${ids[index]}`).then((res) => {
//         return res.json()
//     }).then((res) => {
//         index++;
//         if (index == names.length)
//             index = 0
//         Audio.src = res.data[0].url
//     })

//     switchAudio()
// }
// down1.onclick = function () {
//     fetch(`http://redrock.udday.cn:2022/song/url?id=${ids[index]}`).then((res) => {
//         return res.json()
//     }).then((res) => {
//         index = index - 1
//         if (index == -1) {
//             index = names.length - 1
//         }
//         Audio.src = res.data[0].url
//     })

//     switchAudio()
// }


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
        circle1.style.webkitAnimationPlayState = 'running';
    } else {
        e.target.innerText = '▶';
        Audio.pause();
        circle1.style.webkitAnimationPlayState = 'paused';
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

    // console.log(lyricBox.style.buttom);
});

Audio.addEventListener('ended', e => {
    contorl.innerText = '▶';
});




const down = event => {
    if (!Audio.pause || Audio.currentTime !== 0) {
        flag = true;

        position.oriOffestLeft = contorlDot.offsetLeft;
        position.oriX = event.touches ?
            event.touches[0].clientX :
            event.clientX;
        // 要同时适配mousedown和touchstart事件
        position.maxLeft = position.oriOffestLeft;
        // 向左最大可拖动距离
        position.maxRight = contorlProgressBox.offsetWidth -
            position.oriOffestLeft; // 向右边最大可拖动距离

        if (event && event.preventDefault) event.preventDefault();
        else event.returnValue = false;

        if (event && event.stopPropagation) event.stopPropagation();
        else window.event.cancelBubble = true;
    }
};
const move = event => {
    if (flag) {
        let clientX = event.touches ? event.touches[0].clientX : event.clientX;
        let length = clientX - position.oriX;
        if (length > position.maxRight) {
            length = position.maxRight;
        } else if (length < -position.maxLeft) {
            length = -position.maxLeft;
        }

        let pgsWidth = parseFloat(
            window.getComputedStyle(contorlProgressBox, null).width.replace('px'),
        );

        let rate = (position.oriOffestLeft + length) / pgsWidth;

        Audio.currentTime = Audio.duration * rate;
    }
};

const end = () => {
    flag = false;
};
// 鼠标按下
contorlDot.addEventListener('mousedown', down, false);
contorlDot.addEventListener('touchstart', down, false);

// 开始拖动
document.addEventListener('mousemove', move, false);
document.addEventListener('touchmove', move, false);

// 拖动结束
document.addEventListener('mouseup', end, false);
document.addEventListener('touchend', end, false);

dot.onmousedown = function (e) {
    let y = e.pageY - dot.offsetTop + dot.offsetHeight / 2
    document.addEventListener("mousemove", gundong1)

    function gundong1(e) {
        if (e.pageY - y < 0) {
            dot.style.top = 0 + "px"
        } else if (e.pageY - y > 80) {
            dot.style.top = 80 + "px"
        } else {
            dot.style.top = (e.pageY - y) + "px"
            console.log(dot.style.top);
        }
        volumeNow.style.height = 80 - parseInt(dot.style.top) + "px"
        console.log(volumeNow.style.height);
        Audio.volume = 1 - (parseInt(dot.style.top) / 80)
        document.onmouseup = function () {
            document.removeEventListener("mousemove", gundong1)
        }
    }
}

back.onclick = function () {
    window.history.back(1)
    console.log(1);
}
go.onclick = function () {
    window.history.go(1)
    console.log(2);
}
document.addEventListener('keydown', async function (e) {
    let theEvent = e || window.event;
    let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        //回车执行查询
        let res = getFetch(`http://redrock.udday.cn:2022/search?keywords=${searchbox.value}`)
        res = res.result.songs;
        localStorage.setItem("res", JSON.stringify(res))
        localStorage.setItem("searchvalue", searchbox.value)
        window.location.replace("..\\html\\search.html")
        console.log(res);
    }
})

volume.onclick = x => {
    volumecontorl.style.display = "block";
}
let himg = document.querySelector('.himg')
himg.onclick = x => window.location.replace("..\\html\\cloudmusic.html")
// let userid =  localStorage.getItem("userid")
// fetch(`http://redrock.udday.cn:2022/user/playlist?uid=${userid}`)
//     .then((res) => {
//         console.log(userid);
//         return res.json()
//     }).then((res) => console.log(res))
// let listdata =  localStorage.getItem("listdata")
// let radiosongs = document.querySelector('.radiosongs')


function GetUrlPara() {
    let url = document.location.toString(); //获取当前URL
    if (url.indexOf("?") != -1) { //判断URL？后面不为空
        let arrUrl = url.split("?"); //分割？
        let para = arrUrl[1]; //获取参数部分
        if (para) { //判断传入的参数部分不为空
            const arr = para.split("!");
            const res = arr.slice(1, 4)
            // console.log(res); //分割=
            // var res = arr[1]; //获取参数的值
            return res;
        }
    }
}
let res = GetUrlPara();
console.log(res);
let i = res[0].split("&")[0]
let a = 200; //歌词容器到高，随便改,但最好和你自己写到那个div一样高；
let b = 35;
let lid = res[1]
console.log(i);
console.log(lid);
fetch(`http://redrock.udday.cn:2022/playlist/detail?id=${lid}`).then((res) => {
    return res.json();
}).then((res) => {
    console.log(res)
    song1.innerHTML = res.playlist.tracks[i].name
    songname.innerHTML = res.playlist.tracks[i].name
    album.innerHTML = res.playlist.tracks[i].al.name
    songer2.innerHTML = res.playlist.tracks[i].ar[0].name
    songer3.innerHTML = res.playlist.tracks[i].ar[0].name
    buttoning.src = res.playlist.tracks[i].al.picUrl
    circle.src = res.playlist.tracks[i].al.picUrl
    ids[i] = res.playlist.tracks[i].id
    fetch(`http://redrock.udday.cn:2022/lyric?id=${res.playlist.tracks[i].id}`).then((res) => {
        return res.json();
    }).then((res) => {
        console.log(res);

        textarea.innerHTML = res.lrc.lyric
        console.log(res.lrc.lyric);
        return textarea.innerHTML
    }).then((res) => {
        lrc = res

        function split() { //把lrc歌词分割成数组，
            let split_1 = lrc.split('\n');
            let length = split_1.length;
            for (let i = 0; i < length; i++) {
                let lrcArr = split_1[i];
                split_1[i] = change(lrcArr);

                function change(str) {
                    let lrc = str.split(']');
                    let timer = lrc[0].replace('[', '');
                    let str_music = lrc[1];
                    let time_split = timer.split(':');
                    let s = +time_split[1];
                    let min = +time_split[0];
                    return {
                        time: min * 60 + s,
                        lrc: str_music //分割好到歌词和时间
                    }
                }
            }
            return split_1
        }
        let lrcArr = split();

        function createLi() { //根据歌词数组创建li
            let len = lrcArr.length;
            for (let i = 0; i < len; i++) {
                let lrc_li = lrcArr[i];
                let li = document.createElement('li');
                li.innerText = lrc_li.lrc;
                li.style.height = b + 'px'
                li.style.textAlign = 'center'
                li.style.width = '100%'
                li.style.padding = '0';
                li.style.color = '#999'
                li.style.transition = '0.3'
                dia.appendChild(li);
            }
        }
        createLi()

        function setCurrentLi() {
            let time = Audio.currentTime;
            for (i = 0; i < lrcArr.length; i++) {
                let play1 = lrcArr[i];
                if (time - play1.time <= 0) {
                    return i;
                }
            }
            return -1;
        }

        function current() { //设置top，让其滚动
            let li = setCurrentLi();
            let divHeight = a;
            let liHeight = b;
            let top = liHeight * li - divHeight / 2 + liHeight / 2;
            if (top < 0) {
                top = 0;
            }
            dia.style.marginTop = -top + 'px';
            // console.log('top'+top);
            let playLi = dia.querySelector('.play1')
            if (playLi) {
                playLi.className = '';
            }
            if (li >= 0) {
                console.log(li);
                // li.style.cssText = "color: #000;font-size: 20px;"
                console.log(dia.children);
                dia.children[li - 1].className = 'play1'
                console.log(dia.children);
            }


        }
        Audio.ontimeupdate = current;

        //  



    })
    fetch(`http://redrock.udday.cn:2022/song/url?id=${res.playlist.tracks[i].id}`).then((res) => {
        return res.json()
    }).then((res) => {
        Audio.src = res.data[0].url
    })
    fetch(`http://redrock.udday.cn:2022/comment/music?id=${res.playlist.tracks[i].id}`).then((res) => {
        return res.json()
    }).then((res) => {
        console.log(res)
        for (let i = 0; i < 15; i++) {
            let commend = document.querySelector('.commend')
            let con = document.createElement("div")
            con.setAttribute('class', 'con')
            let comcon = document.createElement("div")
            comcon.setAttribute('class', 'comcon')
            let userpic = document.createElement('div')
            userpic.setAttribute('class', 'userpic')
            let time = document.createElement('div')
            time.setAttribute('class', 'time')
            let like = document.createElement("div")
            let img2 = document.createElement("img")
            like.setAttribute('class', 'like')
            let img = document.createElement("img")
            // like.appendChild(icon10)

            userpic.appendChild(img)
            con.appendChild(userpic)
            con.appendChild(time)
            con.appendChild(like)
            con.appendChild(comcon)
            commend.appendChild(con)
            console.log(userpic);
            comcon.innerHTML = res.hotComments[i].user.nickname + ":" + res.hotComments[i].content
            like.innerHTML = "👍" + res.hotComments[i].likedCount
            img.src = res.hotComments[i].user.avatarUrl
            time.innerHTML = res.hotComments[i].timeStr
        }
    })
    let up = document.querySelector(".down")
    console.log(up);
    let down1 = document.querySelector(".up")

    function switchAudio() {
        document.querySelector(".song").innerHTML = res.playlist.tracks[i].name
        buttoning.src = res.playlist.tracks[i].al.picUrl
        document.querySelector(".songer1").innerHTML = res.playlist.tracks[i].ar[0].name
        // textarea.innerHTML = res.lrc.lyric;
        comcon.innerHTML = res.hotComments[i].user.nickname + ":" + res.hotComments[i].content
        like.innerHTML = res.hotComments[i].likedCount
        img.src = res.hotComments[i].user.avatarUrl
        time.innerHTML = res.hotComments[i].timeStr
        circle.src = res.playlist.tracks[i].al.picUrl
        Audio.play()
    }
    up.onclick = async function () {
        console.log(res.playlist.tracks[i].id);
        fetch(`http://redrock.udday.cn:2022/song/url?id=${res.playlist.tracks[i].id}`).then((res) => {
            return res.json()
        }).then((res) => {
            i++;
            if (i == names.length)
                i = 0
            Audio.src = res.data[0].url
        })

        switchAudio()
    }
    down1.onclick = function () {
        fetch(`http://redrock.udday.cn:2022/song/url?id=${res.playlist.tracks[i].id}`).then((res) => {
            return res.json()
        }).then((res) => {
            i = i - 1
            if (i == -1) {
                i = names.length - 1
            }
            Audio.src = res.data[0].url
        })

        switchAudio()
    }
})

songerlist.push(localStorage.getItem("songer"))
songname.innerHTML = localStorage.getItem("song")
names.push(localStorage.getItem("song"))
imgs.push(localStorage.getItem("pic"))

console.log(songerlist);
//buttoning.src =  localStorage.getItem("pic")
console.log(names);





buttoning['onclick'] = x => {
    window.location.replace("..\\html\\cloudmusic.html")
}