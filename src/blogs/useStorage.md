### useStorage

<p style="color:red">创建一个响应式引用，用于访问和修改 默认情况下使用 localStorage，其他存储源可以通过第三个参数指定。
[文档](https://vueuse.pages.dev/core/useStorage/)



- **用法**

  - 第一步调用传参（key value 本地存储方式默认是localstorage  配置项）

    ![](../assets/blog-img/\image-20250308142813990.png)

  - 第二步测试 返回值是一个ref 可以响应式更新视图和浏览器内部的存储



![image-20250308143336707](../assets/blog-img/\image-20250308143336707.png)

![image-20250308143353473](../assets/blog-img/\image-20250308143353473.png)



- 底层就是根据类型和配置项操作storage,用watch监听ref的改变，ref变了就重新设置storage

  ~~~

