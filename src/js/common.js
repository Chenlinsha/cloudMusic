// import('../src/css/common.css')
let himg = document.querySelector('.himg')
let volumecontorl = document.querySelector('.volume-control')
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
let contianer = document.querySelector('.contianer')
let up = document.querySelector(".down")
let down1 = document.querySelector(".up")
let back = document.querySelector('.hal')
let go = document.querySelector('.har')
let listdata = localStorage.getItem("listdata")
let radiosongs = document.querySelector('.radiosongs')
let userid = localStorage.getItem("userid")

function switchAudio() {
    document.querySelector(".song").innerHTML = names[index]
    //   buttoning.src = buttonpic[index]
    document.querySelector(".songer1").innerHTML = songerlist[index]
    Audio.play()
}

console.log(up);

up.onclick = function () {
    fetch(`http://redrock.udday.cn:2022/song/url?id=${ids[index]}`).then((res) => {
        return res.json()
    }).then((res) => {
        index++;
        if (index == names.length)
            index = 0
        Audio.src = res.data[0].url
    })

    switchAudio()
}
down1.onclick = function () {
    fetch(`http://redrock.udday.cn:2022/song/url?id=${ids[index]}`).then((res) => {
        return res.json()
    }).then((res) => {
        index = index - 1
        if (index == -1) {
            index = names.length - 1
        }
        Audio.src = res.data[0].url
    })

    switchAudio()
}

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
        circle

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
    contorl.innerText = '▶';
});


const position = {
    oriOffestLeft: 0, // 移动开始时进度条的点距离进度条的偏移值
    oriX: 0, // 移动开始时的x坐标
    maxLeft: 0, // 向左最大可拖动距离
    maxRight: 0, // 向右最大可拖动距离
};
let flag = false; // 标记是否拖动开始

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
}
go.onclick = function () {
    window.history.go(1)
}
document.addEventListener('keydown', function (e) {
    let theEvent = e || window.event;
    let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        //回车执行查询
        fetch(`http://redrock.udday.cn:2022/search?keywords=${searchbox.value}`, {
            method: 'Get'
        }).then((res) => {
            return res.json()
        }).then((res) => {
            console.log(res);
            return res.result.songs;
        }).then((res) => {
            localStorage.setItem("res", JSON.stringify(res))
            localStorage.setItem("searchvalue", searchbox.value)
            window.location.replace("../html/search.html")
            console.log(res);
        })
    }
})

// volume.onclick = x => {
//     volumecontorl.style.display = "block";
// }

himg.onclick = x => window.location.replace("..\\html\\cloudmusic.html")

fetch(`http://redrock.udday.cn:2022/user/playlist?uid=${userid}`)
    .then((res) => {
        console.log(userid);
        return res.json()
    }).then((res) => console.log(res))

console.log(listdata);
volume.onclick = X => {
    volumecontorl.style.display = "block"
}