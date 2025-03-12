### createGlobalState（）

<p style=color:red>在简单场景下更加简洁(相较于vuex provide/inject...)的实现全局状态管理。
 ps:全局状态管理：就是不同vue实例之间共享 维护状态（数据）

[文档](https://vueuse.org/shared/createGlobalState/)

- **用法**

  - 第一步，往里传入一个函数，定义需要共享的全局状态，并赋予初值然后返回一个对象将全局状态return：

  ![image-20250307200307163](../assets/blog-img/\image-20250307200307163.png)

  - 第二步，在各个组件中引入useGlobalState并调用，会返回一个对象，这个对象就是之前传参是return的对象，拿到全局状态并渲染到模板

    ![image-20250307201506087](../assets/blog-img/\image-20250307201506087.png)

    ​		![image-20250307201638398](../assets/blog-img/\image-20250307201638398.png)

  - 第三步测试：在组件a中修改值 组件b中的值也会变动，完成全局状态管理

    

![image-20250307201944163](../assets/blog-img/\image-20250307201944163.png)

tips：当前保存的全局状态是在内存中也就是非持久性，想持久性的保存全局状态可[参考文档](https://vueuse.org/shared/createGlobalState/#with-persistence)

- **源码剖析**
~~~