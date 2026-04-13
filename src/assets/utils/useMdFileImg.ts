export default function useMdFileImg() {
  const blogImgContext = require.context(
    '@/assets/blog-img',
    false,
    /\.(png|jpe?g|gif|webp|svg)$/
  )
  // v-html之前修改图片路径
  function fixMarkdownImages(html: string) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const imgs = doc.querySelectorAll('img')
    for (const img of imgs) {
      const src = img.getAttribute('src') || ''
      if (!src.startsWith('../assets/blog-img/')) continue
      const filename = src.replace('../assets/blog-img/', '')
      try {
        const resolvedUrl = blogImgContext(`./${filename}`)
        img.setAttribute('src', resolvedUrl)
      } catch {
        console.error('img-404')
      }
    }
    return doc.body.innerHTML
  }

  return {
    fixMarkdownImages
  }
}
