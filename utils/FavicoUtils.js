/**
 * 有惊喜
 */
import Favico from 'favico.js'

let favicon = null
let faviconTimer = null

const setFavicon = () => {
  favicon = new Favico({ type: 'rectangle', animation: 'popFade' })
  let currIndex = 0
  const positions = ['up', 'down', 'left','upleft']
  const words = '2019你最牛'.split('')
  const doSetFavicon = () => {
    const text = words[currIndex % words.length]
    const position = positions[currIndex % positions.length]
    favicon.badge(text, { position })
    currIndex++
    faviconTimer = setTimeout(doSetFavicon, 1000)
  }
  doSetFavicon()
}

//彩蛋
export const runFavicon = () => {
  setFavicon()
}

//恢复默认
export const resetFavicon = () => {
  clearTimeout(faviconTimer)
  favicon && favicon.reset()
}
