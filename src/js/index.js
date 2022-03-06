let leftb = document.querySelector('.left');
let rightb = document.querySelector('.right');
let box = document.querySelector('.box');
let imgs = box.querySelector('.imgs');
let imgt = imgs.querySelectorAll('li');
let login1 = document.querySelector('.login')
let sidebar = document.querySelectorAll('.sidebar')
let sidebar0 = document.querySelector('.sidebar0')
let sidebar1 = document.querySelector('.sidebar1')
let sidebar2 = document.querySelector('.sidebar2')
let item = document.querySelectorAll('.item')
let pic = document.querySelectorAll('.pic a')
let guide = document.querySelectorAll('.guide', '.guide1')
let hot = document.querySelector('.hot')
let conmiddle = document.querySelector('.conmiddle')
let tab1 = document.querySelector('#tab1')
let musics = document.querySelector('audio')
let tel = document.querySelector('.tel')
let psw = document.querySelector('.password')
let checkbox = document.querySelector('.checkbox')
let btnlogin = document.querySelector('.btnlogin')
let warning = document.querySelector('.warning')
let agree = document.querySelector('.agree1')
let form = document.querySelector('.input')
let login = document.querySelector('.btnlogin')
let phone = document.querySelector('.tel')
let password = document.querySelector('.password')
let nickname = document.querySelector('.name')
let imgtouxiang = document.querySelector('.pictou')
let search = document.querySelector('.search')
let searchbox = document.querySelector('.hipt')
let ul = document.querySelector('.picf')
const buttoning = document.querySelector('.buttomimg')
let hots = []
let divs = []
conmiddle.onclick = x => {
  hot.style.display = "none"

}
conmiddle.onclick = x => {
  login1.style.display = "none"
}

let ulog = document.querySelector('.ulog')
ulog.onclick = x => {
  login1.style.display = "block";
  ulog.style.display = "none"
}


let timeone = setInterval(function () {
  rightf();
}, 3000);
for (let i = 0; i < sidebar.length; i++) {
  sidebar[0].className = "sidebar0"
  sidebar[i].onclick = function () {
    for (let i = 0; i < sidebar.length; i++) {
      sidebar[i].className = ' sidebar'
    }
    this.className = ' sidebar0';
  }
}
for (let i = 0; i < guide.length; i++) {
  guide[i].setAttribute('indext', i);
  guide[0].className = "guide1"
  guide[i].onclick = function () {
    for (let i = 0; i < guide.length; i++) {
      guide[i].className = ' guide'
    }

    this.className = 'guide1';
  }
}
for (let i = 0; i < pic.length; i++) {
  pic[i].hover = function () {
    this.style.display = 'block'
  }
}

box.addEventListener('mouseover', function () {
  leftb.style.display = 'block';
  rightb.style.display = 'block';
  clearInterval(timeone);

})
box.addEventListener('mouseout', function () {
  leftb.style.display = 'none';
  rightb.style.display = 'none';
  clearInterval(timeone);
  timeone = setInterval(function () {
    rightf();
  }, 3000)
})
let list = box.querySelector('.list');
for (let i = 0; i < imgs.children.length; i++) {
  let li = document.createElement('li');
  list.appendChild(li);
  li.setAttribute('index', i);
  li.addEventListener('click', colors);
  li.addEventListener('mouseenter', jump);
}
list.children[1].className = 'change';

function colors() {
  for (let i = 0; i < list.children.length; i++) {
    list.children[i].className = '';
  }
  let index = this.getAttribute('index');
  list.children[index].className = 'change';
}

function jump() {
  let index = this.getAttribute('index');
  let now = num.indexOf('two');
  let dif = Math.max(index, now) - Math.min(index, now);
  if (index > now) {
    while (dif--) {
      rightf();
    }
  } else {
    while (dif--) {
      leftf();
    }
  }
}

function throttle(fn, timeout) {
  timer = null;
  return function () {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn()
      timer = null
    }, timeout);
  }
}
let throttleJump = throttle(jump, 200)
let j = 1;

function colort() {
  for (let i = 0; i < list.children.length; i++) {
    list.children[i].className = '';
  }
  if (j >= 6) {
    j = 0;
  } else if (j < 0) {
    j = 5;
  }
  list.children[j].className = 'change';
}
let num = ['one', 'two', 'three', 'four', 'five', 'six'];
rightb.addEventListener('click', rightf);

function rightf() {
  num.unshift(num[5]);
  num.pop();
  for (let i = 0; i < num.length; i++) {
    imgt[i].setAttribute('class', num[i]);
  }
  j++;
  colort();
}
leftb.addEventListener('click', leftf)

function leftf() {
  num.push(num[0]);
  num.shift();
  for (let i = 0; i < num.length; i++) {
    imgt[i].setAttribute('class', num[i]);
  }
  j--;
  colort();
}
form.onsubmit = function () {

  if (tel.value.length !== 11) {
    warning.innerHTML = "请输入11位数字的手机号"
    return false
  } else if (psw.value == '') {
    warning.innerHTML = "请输入登录密码"
    return false
  } else if (!agree.checked) {
    warning.innerHTML = ""
    alert("请先勾选 同意《服务条款》《隐私政策》《儿童隐私政策》")
    return false
  }
  alert('登陆成功')
  login1.style.display = "none"
  return false
}

login['onclick'] = X => {
  fetch(`http://redrock.udday.cn:2022/login/cellphone?phone=${phone.value}&password=${password.value}`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).then((res) => res.json())
    .then((res) => {
      localStorage.setItem("cookie", res.cookie);
      localStorage.setItem("token", res.token)
      localStorage.setItem("userid", res.bindings[0].id)
      localStorage.setItem("res.profile.nickname", res.profile.nickname)
      localStorage.setItem("res.profile.avatarUr", res.profile.avatarUrl)
      nickname.innerHTML = localStorage.getItem("res.profile.nickname")
      imgtouxiang.src = localStorage.getItem("res.profile.avatarUr")
    })

}
async function getFetch(url) {
  let response = await fetch(url)
  let res = await response.json()
  //  console.log(res);
  return res
}
let li
async function getUserByAsync() {
  let response = await fetch(`http://redrock.udday.cn:2022/top/playlist/highquality?limit=10`)
  const res = await response.json();
  const playlist = res.playlists
  console.log(playlist);
  for (let i = 0; i < playlist.length; i++) {
    li = document.createElement("li")
    let span = document.createElement("span")
    span.innerHTML = playlist[i].name;
    span.setAttribute('positon', 'absolute')
    span.setAttribute('top', '0px')
    li.setAttribute('class', 'pic')
    let div = document.createElement("div")
    div.setAttribute('class', 'picv')
    let img = document.createElement("img")
    let a = document.createElement("a")
    li['onclick'] = x => {
      window.location.replace(`playlist.html?id=${ playlist[i].id}`)
    }
    a.appendChild(img)
    li.appendChild(a)
    ul.appendChild(li)
    li.appendChild(div)
    li.appendChild(span)
    div.innerHTML = "▶"
    div.style.color = "red"
    div.style.textAlign = "center"
    img.src = playlist[i].coverImgUrl
  }
}
getUserByAsync()


sidebar2.onclick = function () {
  sidebar2.style.height = 400 + "px"
}
let cookie = localStorage.getItem("cookie")
let userid1 = localStorage.getItem("userid")
localStorage.getItem("token")
let likelist = document.querySelector('.likelist')
async function getLikelist() {
  let res = await getFetch(`http://redrock.udday.cn:2022/likelist?uid=${userid1}&cookie=${cookie}`)
  let ids = []
  ids.push(res.ids);
}
getLikelist()

likelist.onclick = () => {
  window.location.replace("../html/likelist.html")
}



async function getHot() {
  let res = await getFetch('http://redrock.udday.cn:2022/search/hot/detail')
  for (let i = 0; i < res.data.length; i++) {
    hots.push(res.data[i].searchWord)
    let span = document.createElement("span")
    let li = document.createElement("li")
    li.innerHTML = hots[i]
    let div = document.createElement("div")
    hot.appendChild(div)
    li.setAttribute('class', 'hotli')
    div.appendChild(span)
    div.appendChild(li)
    span.innerHTML = i + 1
    li.onclick = async function () {
      let res = await getFetch(`http://redrock.udday.cn:2022/search?keywords=${hots[i]}`)
      //  return res.result.songs;
      let songs = await res.result.songs
      localStorage.setItem("res", JSON.stringify(songs))
      localStorage.setItem("searchvalue", searchbox.value)
      window.location.replace("../html/search.html")
      // console.log(res);
    }
  }
}
getHot()

getFetch('http://redrock.udday.cn:2022/search/hot/detail')
  .then((res) => {
    // console.log(res);
    for (let i = 0; i < res.data.length; i++) {
      hots.push(res.data[i].searchWord)
      let span = document.createElement("span")
      let li = document.createElement("li")
      li.innerHTML = hots[i]
      let div = document.createElement("div")
      hot.appendChild(div)
      li.setAttribute('class', 'hotli')
      div.appendChild(span)
      div.appendChild(li)
      span.innerHTML = i + 1
      divs.push(div)
      for (let f = 0; f < 3; f++) {}
      li.onclick = function () {
        fetch(`http://redrock.udday.cn:2022/search?keywords=${hots[i]}`).then((res) => {
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
    }
  })

// let himg = document.querySelector('.himg')
// himg.onclick = x => window.location.replace("网易云.html")

tab1.onclick = x => window.location.replace("../html/songer.html")
let hipt = document.querySelector('.hipt')
hipt.onclick = x => {
  hot.style.display = "block"
}


let tab2 = document.querySelector('#tab2')
tab2.onclick = x => {
  window.location.replace("../html/listdt.html")
  console.log(2);
}
conmiddle.onclick = () => {
  hot.style.display = "none"
  login1.style.display = "none"
  volumecontorl.style.display = "none"
}