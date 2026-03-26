import { useRoute } from 'vue-router'

export default function useLinkColor() {
  const route = useRoute()

  // 传递一个dom数组 里面都是a标签
  function match(a: NodeListOf<HTMLAnchorElement>) {
    const hash = route.hash
    a.forEach(item => {
      if (item.getAttribute('href') == hash) {
        item.classList.add('active')
      } else {
        item.classList.remove('active')
      }
    })
  }
  return {
    match
  }
}
