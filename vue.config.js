const { defineConfig } = require('@vue/cli-service')
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
        mode: ['html', 'meta']
      })
  }
})
