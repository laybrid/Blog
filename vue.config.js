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
    return `<pre class="hljs code-block"><button class="code-copy-btn" type="button" data-code="${encoded}">Copy</button><code>${preCode}</code></pre>`
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
