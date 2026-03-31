export default function useMdFileImg() {
  const blogImgContext = require.context(
    '@/assets/blog-img',
    false,
    /\.(png|jpe?g|gif|webp|svg)$/
  )

  // 由于先获取dom然后修改的图片src所以错误请求已经发出了，这个时候必须修改此函数的调用时间
  function fixMarkdownImages(containerEl: HTMLElement) {
    const imgs = containerEl.querySelectorAll('img')
    for (const img of imgs) {
      const src = img.getAttribute('src') || ''
      if (!src.startsWith('../assets/blog-img/')) continue
      const filename = src.replace('../assets/blog-img/', '')
      try {
        const resolvedUrl = blogImgContext(`./${filename}`)
        console.log(resolvedUrl)
        img.setAttribute('src', resolvedUrl)
      } catch {
        console.error('img-404')
      }
    }
  }
  return {
    fixMarkdownImages
  }
}
