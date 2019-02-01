/**
 * 复制拦截器
 */
const isBrowser = process && process.browser

if (isBrowser) {
  const copyText = () => {
    return [
      '\n',
      '版权归作者所有,转载请注明出处。',
      '作者：Luke',
      '链接：' + location.href,
      '来源：tblog-nuxt',
      ''
    ].join('\n')
  }

  //转成Text
  const convertToText = content => {
    return content + copyText()
  }

  //转成HTML
  const convertToHtml = content => {
    return content + copyText()
  }

  //监听拷贝事件
  document.addEventListener('copy', e => {
    if (!window.getSelection) return
    if (!window.clickCopy) {
      const content = window.getSelection().toString()
      e.clipboardData.setData('text/plain', convertToText(content))
      e.clipboardData.setData('text/html', convertToHtml(content))
      e.preventDefault()
    }
  })
}
