export default function useMdFiles() {
  // 读取posts文件夹里的文件
  const postsContext = require.context(
    '@/posts', // 目录路径
    true, // 包含子目录
    /\.md$/ // 文件匹配正则
  )

  function getMdFilesMeta() {
    return postsContext.keys().map(path => {
      const slug = path
        .replace(/^\.\//, '') // 移除开头的 ./
        .replace(/\.md$/, '') // 移除文件扩展名
      return {
        path: slug,
        ...postsContext(path).attributes
      }
    })
  }

  function getSingleMdFileMeta(slug: string | string[]) {
    let content, meta
    try {
      // 匹配文件
      const mod = postsContext(`./${slug}.md`)
      // 获取md的内容和formatt信息
      content = mod.html
      meta = mod.attributes
    } catch (e) {
      content = ''
      meta = null
    }
    return {
      html: content,
      ...meta
    }
  }

  function getMdFilesTag() {
    const arrTag = getMdFilesMeta().map(item => item.tag)
    return [...new Set(arrTag)]
  }

  return {
    getMdFilesMeta,
    getSingleMdFileMeta,
    getMdFilesTag
  }
}
