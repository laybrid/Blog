### useActiveElement

<p style="color:red">响应式地获取 `document.activeElement`<p>

- 用法很简单 useActiveElement 会返回一个ref,这个ref的值就是当前被激活的html对象，如果没有激活的元素就是body标签

  ![image-20250308152408235](../assets/blog-img/\image-20250308152408235.png)

- 源码剖析

  ![image-20250308153031424](../assets/blog-img/\image-20250308153031424.png)

首先定义了一个ref就是我们的返回值 用于存储被激活的html元素，然后定义了一个事件函数trigger，这个事件函数会挂载在window上，当window上触发了focus,blur等事件时，会调用trigger函数将document.activeElement的值赋值给ref 然后返回这个ref就行

![image-20250308153326942](../assets/blog-img/\image-20250308153326942.png)

ps:useEventListener是vueuse封装的事件添加器
