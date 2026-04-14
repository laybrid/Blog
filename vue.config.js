const { defineConfig } = require('@vue/cli-service')
const hljs = require('highlight.js')
const MarkdownIt = require('markdown-it')
// const slugify = require('@sindresorhus/slugify')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-table-of-contents')

function slugifyHeading(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/[\s]+/g, '-') // 空白转 -
    .replace(/[\/\\?%*:|"<>]/g, '') // 去掉 Windows/URL 常见非法字符
    .replace(/-+/g, '-') // 合并多个 -
}

const md = new MarkdownIt({
  html: true,
  highlight(str, lang) {
    let preCode = ''
    if (lang && hljs.getLanguage(lang)) {
      try {
        preCode = hljs.highlight(str, { language: lang }).value
      } catch (_) {}
    }
    if (!preCode) preCode = md.utils.escapeHtml(str)
    const encoded = encodeURIComponent(str)
    return `<pre class="hljs code-block"><div class="code-copy-btn" data-code="${encoded}"><svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="#ffffff" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg></div><code>${preCode}</code></pre>`
  }
})

md.use(anchor, {
  level: [1, 2, 3, 4, 5, 6],
  slugify: slugifyHeading,
  permalink: anchor.permalink.linkInsideHeader({
    symbol: '#',
    placement: 'after', // 或 'after'
    ariaHidden: true,
    class: 'header-anchor'
  })
})

md.use(toc, {
  includeLevel: [2, 3, 4],
  containerClass: 'table-of-contents',
  listType: 'ul'
})

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // feat markdown 规则：用 frontmatter-markdown-loader，把 md 转成 html
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('frontmatter-markdown-loader')
      .loader('frontmatter-markdown-loader')
      .options({
        mode: ['html', 'meta'],
        markdownIt: md
      })
  }
})
