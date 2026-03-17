const { defineConfig } = require('@vue/cli-service')
const hljs = require('highlight.js')
const MarkdownIt = require('markdown-it')

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
