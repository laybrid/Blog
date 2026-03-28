import { useRoute } from 'vue-router'
import { onUnmounted } from 'vue'

export default function useLinkColor() {
  const route = useRoute()
  let observer: IntersectionObserver | null = null

  // 传递一个dom数组 里面都是a标签
  function clickMatch(a: NodeListOf<HTMLAnchorElement>) {
    const hash = route.hash
    a.forEach(item => {
      if (item.getAttribute('href') == hash) {
        item.classList.add('active')
      } else {
        item.classList.remove('active')
      }
    })
  }

  function scrollMatch(
    a: NodeListOf<HTMLAnchorElement>,
    h: NodeListOf<HTMLTitleElement>
  ) {
    observer = new IntersectionObserver(
      // 被监听的元素集合
      entries => {
        const visibleHeading = entries.find(entry => entry.isIntersecting)
        if (visibleHeading) {
          const id = visibleHeading.target.id
          if (id) {
            a.forEach(link => {
              link.classList.remove('active')
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active')
              }
            })
          }
        }
      },
      {
        rootMargin: '0px 0px -90% 0px',
        threshold: 0
      }
    )
    h.forEach(item => observer!.observe(item))
  }

  onUnmounted(() => {
    observer?.disconnect()
  })
  return {
    clickMatch,
    scrollMatch
  }
}

/**
 * 问题1：
 *      第一个标题已经滚了,这时候第二个标题如果不满足触发条件就不触发
 */
