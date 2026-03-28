import { useRoute } from 'vue-router'

const headerOffset = 0

export default function useLinkColor() {
  const route = useRoute()

  // 传递一个dom数组 里面都是a标签
  function clickMatch(a: NodeListOf<HTMLAnchorElement>) {
    const hash = route.hash
    searchAnchorIndex(a, hash)
  }

  function scrollMatch(
    a: NodeListOf<HTMLAnchorElement>,
    h: NodeListOf<HTMLTitleElement>
  ) {
    if (h.length === 0) return
    let id = ''
    for (const item of h) {
      const rect = item.getBoundingClientRect()
      // 判断标题是否在视口内（考虑固定头部）
      const isInViewport =
        Math.ceil(rect.top) >= headerOffset && rect.top <= window.innerHeight
      if (isInViewport) {
        id = item.id
        break
      }
    }
    if (id) {
      console.log(id)
      searchAnchorIndex(a, `#${id}`)
    } else {
      // 找不到id说明当前视口没有标题，那么哪个标题高亮就需要具体判断一下
      const scrollTop = window.scrollY
      const headings = []
      for (const item of h) {
        headings.push({
          id: item.id,
          top: item.offsetTop
        })
      }
      if (scrollTop < headings[0].top) {
        return
      }
      for (let i = 0; i < headings.length - 1; i++) {
        if (scrollTop > headings[i].top && scrollTop < headings[i + 1].top) {
          id = headings[i].id
          break
        }
      }
      id = id == '' ? headings[headings.length - 1].id : id
      searchAnchorIndex(a, `#${id}`)
    }
  }
  return {
    clickMatch,
    scrollMatch
  }
}

function searchAnchorIndex(a: NodeListOf<HTMLAnchorElement>, target: string) {
  a.forEach(item => {
    if (item.getAttribute('href') == target) {
      item.classList.add('active')
    } else {
      item.classList.remove('active')
    }
  })
}
/**
 * 问题
 *    最底部的click高亮会被覆盖
 */
