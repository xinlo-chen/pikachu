const string = `
.skin * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.skin *::before,
.skin *::after {
  box-sizing: border-box;
}

.skin {
  position: relative;
  background: #ffdb00;
  height: 50vh;
}

.nose {
  border: 10px solid black;
  border-color: black transparent transparent;
  border-bottom: none;
  height: 0px;
  width: 0px;
  position: relative;
  left: 50%;
  top: 145px;
  margin-left: -10px;
  z-index: 10;
}

@keyframes wave {
  0% {
      transform: rotate(0deg);
  }
  33% {
      transform: rotate(5deg);
  }
  66% {
      transform: rotate(5deg);
  }
  100% {
      transform: rotate(0deg);
  }
}

.nose:hover {
  transform-origin: 50% 100%;
  /* 指定参考点 左右50%位置 上下100% */
  animation: wave 0.25s infinite linear;
}

.yuan {
  position: absolute;
  width: 20px;
  height: 6px;
  top: -16px;
  left: -10px;
  border-radius: 10px 10px 0 0;
  background: black;
}

.eye {
  border: 2px solid black;
  width: 64px;
  height: 64px;
  background: #2e2e2e;
  position: absolute;
  left: 50%;
  margin-left: -32px;
  top: 100px;
  border-radius: 50%;
}

.eye::before {
  content: '';
  display: block;
  border: 3px solid #000;
  width: 31px;
  height: 31px;
  background: #fff;
  border-radius: 50%;
  position: relative;
  left: 7px;
}

.eye.left {
  transform: translateX(-100px);
}

.eye.right {
  transform: translateX(100px);
}

.mouth {
  width: 200px;
  height: 200px;
  position: relative;
  left: 50%;
  top: 170px;
  margin-left: -100px;
}

.mouth .up {
  position: relative;
  top: -20px;
  z-index: 1;
}

.mouth .up .lip {
  border: 3px solid black;
  height: 30px;
  width: 100px;
  background: #ffdb00;
  border-top-color: transparent;
  border-right-color: transparent;
  position: absolute;
  left: 50%;
  margin-left: -50px;
}

.mouth .up .lip.left {
  border-radius: 0 0 0 50px;
  transform: rotate(-15deg) translateX(-53px);
}

.mouth .up .lip.right {
  border-radius: 0 0 50px 0;
  transform: rotate(15deg) translateX(53px);
}

.mouth .up .lip::before {
  content: '';
  display: block;
  width: 7px;
  height: 30px;
  position: absolute;
  bottom: 0;
  background: #ffdb00;
}

.mouth>.up>.lip.left::before {
  right: -5px;
}

.mouth>.up>.lip.right::before {
  left: -5px;
}

.mouth .down {
  height: 165px;
  position: absolute;
  top: 5px;
  width: 100%;
  overflow: hidden;
}

.mouth .down .yuan1 {
  border: 3px solid black;
  width: 150px;
  height: 1000px;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -75px;
  border-radius: 75px/300px;
  background: #9a000f;
  overflow: hidden;
}

.mouth .down .yuan1 .yuan2 {
  width: 200px;
  height: 300px;
  position: absolute;
  background: #fd4760;
  bottom: -170px;
  left: 50%;
  margin-left: -100px;
  border-radius: 100px;
}

.face {
  width: 88px;
  height: 88px;
  border: 3px solid #000;
  position: absolute;
  left: 50%;
  top: 200px;
  margin-left: -44px;
  z-index: 3;
}

.face img {
  position: absolute;
  top: 50%;
  left: 50%;
}

.face.left {
  transform: translateX(-180px);
  background: #fd0013;
  border-radius: 50%;
}

.face.left img {
  transform: rotateY(180deg);
  transform-origin: 0 0;
}

.face.right {
  transform: translateX(180px);
  background: #fd0013;
  border-radius: 50%;
}
`
const player = {
    id: undefined,
    time: 100,
    ui: {
        demo: document.querySelector('#demo'),
        demo2: document.querySelector('#demo2')
    },
    events: {
        '#btnPause': 'pause',
        '#btnPlay': 'play',
        '#btnSlow': 'slow',
        '#btnNormal': 'normal',
        '#btnFast': 'fast'
    },
    n: 1,
    init: () => {
        player.ui.demo.innerText = string.substr(0, player.n)
        player.ui.demo2.innerHTML = string.substr(0, player.n)
        player.bindEvents()
        player.play()
    },
    bindEvents: () => {
        for (let key in player.events) {
            if (player.events.hasOwnProperty(key)) {
                const value = player.events[key] // pause / play / slow
                document.querySelector(key).onclick = player[value]
            }
        }

    },
    run: () => {
        player.n += 1
        if (player.n > string.length) {
            window.clearInterval(player.id)
            return
        }
        player.ui.demo.innerText = string.substr(0, player.n)
        player.ui.demo2.innerHTML = string.substr(0, player.n)
        player.ui.demo.scrollTop = player.ui.demo.scrollHeight
    },
    play: () => {
        window.clearInterval(player.id)
        player.id = setInterval(player.run, player.time)
    },
    pause: () => {
        window.clearInterval(player.id)
    },
    slow: () => {
        player.pause()
        player.time = 300
        player.play()
    },
    normal: () => {
        player.pause()
        player.time = 100
        player.play()
    },
    fast: () => {
        player.pause()
        player.time = 0
        player.play()
    }
}

player.init()