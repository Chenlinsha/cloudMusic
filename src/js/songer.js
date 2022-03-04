// import('../src/css/index.css')
// import('../src/css/songer.css')
let ul = document.querySelector('.songer')
let all1 = document.querySelector('#all1')
let all2 = document.querySelector('#all2')
// let chinese = document.querySelector('#Chinese')
// let EandA=document.querySelector('#EandA')
// let japanese=document.querySelector('#Japanese')
let tablli = document.querySelector('.tablli ')
let catLi = document.querySelectorAll('.catg')
let interLi = document.querySelectorAll('.int')

let int = document.querySelectorAll('.int')
let catg = document.querySelectorAll('.catg')
let ints = []
let catgs = []

ints.push(int)
ints[0] = -1
ints[1] = 7
ints[2] = 96
ints[3] = 8
ints[4] = 16

catgs.push(catg)

let i
catgs.forEach((ele, i) => {
    ele = i == 0 ? -1 : i
});



let div
let int1, cat
fetch(`http://redrock.udday.cn:2022/artist/list?type=${cat?cat:-1}&area=${int1?int1:-1}`).then((res) => {
    return res.json()
}).then((res) => {
    ul.removeChild(div)
    for (let i = 0; i < res.artists.length; i++) {
        div = document.createElement("li")
        let span = document.createElement("span")
        span.innerHTML = res.artists[i].name
        span.setAttribute('positon', 'absolute')
        span.setAttribute('top', '0px')
        div.setAttribute('class', 'pic')
        let a = document.createElement("a")
        let img = document.createElement("img")
        a.setAttribute('class', 'playlista')
        // a.setAttribute('href', 'song.html')
        a.appendChild(img)
        div.appendChild(a)
        ul.appendChild(div)
        div.appendChild(span)
        img.src = res.artists[i].picUrl
        div['onclick'] = x => {
            window.location.replace(`..\\html\\song.html?id=!${res.artists[i].id}&src=!${res.artists[i].picUrl}`)
        }
    }
})
catLi['onclick'] = x => {
    console.log(1);
    if (cat)
        cat = catgs[i]
    else {
        cat = -1
    }
    fetch(`http://redrock.udday.cn:2022/artist/list?type=${cat?cat:-1}&area=${int1?int1:-1}`).then((res) => {
        return res.json()
    }).then((res) => {
        ul.removeChild(div)
        for (let i = 0; i < res.artists.length; i++) {
            div = document.createElement("li")
            let span = document.createElement("span")
            span.innerHTML = res.artists[i].name
            span.setAttribute('positon', 'absolute')
            span.setAttribute('top', '0px')
            div.setAttribute('class', 'pic')
            let a = document.createElement("a")
            let img = document.createElement("img")
            a.setAttribute('class', 'playlista')
            // a.setAttribute('href', 'song.html')
            a.appendChild(img)
            div.appendChild(a)
            ul.appendChild(div)
            div.appendChild(span)
            img.src = res.artists[i].picUrl
            div['onclick'] = x => {
                window.location.replace(`..\\html\\song.html?id=!${res.artists[i].id}&src=!${res.artists[i].picUrl}`)
            }
        }
    })
}
console.log(interLi);
for (let i = 0; i < interLi.length; i++) {
    console.log(interLi[i]);
    interLi[i].addEventListener('click', function () {
        if (int)
            int1 = ints[i]
        else {
            int = -1
        }
        fetch(`http://redrock.udday.cn:2022/artist/list?type=${cat?cat:-1}&area=${int1?int1:-1}`).then((res) => {
            return res.json()
        }).then((res) => {
            // ul.removeChild(div)
            for (let i = 0; i < res.artists.length; i++) {
                div = document.createElement("li")
                let span = document.createElement("span")
                span.innerHTML = res.artists[i].name
                span.setAttribute('positon', 'absolute')
                span.setAttribute('top', '0px')
                div.setAttribute('class', 'pic')
                let a = document.createElement("a")
                let img = document.createElement("img")
                a.setAttribute('class', 'playlista')
                // a.setAttribute('href', 'song.html')
                a.appendChild(img)
                div.appendChild(a)
                ul.appendChild(div)
                div.appendChild(span)
                img.src = res.artists[i].picUrl
                div['onclick'] = x => {
                    window.location.replace(`..\\html\\song.html?id=!${res.artists[i].id}&src=!${res.artists[i].picUrl}`)
                }
            }
        })
    })
}
for (let i = 0; i < catLi.length; i++) {
    catLi['onclick'] = x => {
        if (int)
            int1 = ints[i]
        else {
            int = -1
        }
        fetch(`http://redrock.udday.cn:2022/artist/list?type=${cat?cat:-1}&area=${int1?int1:-1}`).then((res) => {
            return res.json()
        }).then((res) => {
            ul.removeChild(div)
            for (let i = 0; i < res.artists.length; i++) {
                div = document.createElement("li")
                let span = document.createElement("span")
                span.innerHTML = res.artists[i].name
                span.setAttribute('positon', 'absolute')
                span.setAttribute('top', '0px')
                div.setAttribute('class', 'pic')
                let a = document.createElement("a")
                let img = document.createElement("img")
                a.setAttribute('class', 'playlista')
                // a.setAttribute('href', 'song.html')
                a.appendChild(img)
                div.appendChild(a)
                ul.appendChild(div)
                div.appendChild(span)
                img.src = res.artists[i].picUrl
                div['onclick'] = x => {
                    window.location.replace(`..\\html\\song.html?id=!${res.artists[i].id}&src=!${res.artists[i].picUrl}`)
                }
            }
        })
    }
}