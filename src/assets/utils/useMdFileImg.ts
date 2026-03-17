export default function useMdFileImg() {
  const blogImgContext = require.context(
    '@/assets/blog-img',
    false,
    /\.(png|jpe?g|gif|webp|svg)$/
  )

  function fixMarkdownImages(containerEl: HTMLElement) {
    const imgs = containerEl.querySelectorAll('img')
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
  }
  return {
    fixMarkdownImages
  }
}
