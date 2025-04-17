### useRefHistory()

<p style="color:red">跟踪ref变化的历史，还提供了撤销和重做的功能(类似于git的版本回退)</p>

[文档](https://vueuse.org/core/useRefHistory/)

- **用法**：

  - 第一步声明一个ref 然后作为参数传入

    ![image-20250308095159960](../assets/blog-img/\image-20250308095159960.png)

  - 第二步：在**异步函数**中拿到history的值（也可以在模板中直接打印） 就是历史记录（包括历史值和修改时间）绑定事件，调用undo 或 redo 来回退历史记录

    ![image-20250308095528304](../assets/blog-img/\image-20250308095528304.png)

    ![image-20250308095638670](../assets/blog-img/\image-20250308095638670.png)

  - useRefHistory()第二个参数是一个对象，可以做一些配置：

    deep:true //深入追踪ref对象或数组中的属性 ，也可以使用自定义的clone函数

     capacity: 15 // 限制为 15 条历史记录

     flush: 'sync', // 选项 'pre'（默认），'post' 和 'sync' 修改刷新时机

    ....

  - 还可以用commit手动提交 在同一时刻拿到多个历史记录点

​											![image-20250308100029687](../assets/blog-img/\image-20250308100029687.png)

- **源码剖析**

截取片段

vueuse中还有一个方法叫useManualRefHistory（）这个方法是手动commit 提交更新，useRefHistory()是在这个方法的基础上添加了自动提交更新，所以我们先搞清楚

useManualRefHistory（）的逻辑

![image-20250308110317741](../assets/blog-img/\image-20250308110317741.png)

首先我们可以看到在函数内部声明了两个数组 undoStack redoStack

undo方法和rudo方法其实就是操作这两个数组进行增添，然后重新设置state

![image-20250308110605341](../assets/blog-img/\image-20250308110605341.png)

![image-20250308110415625](../assets/blog-img/\image-20250308110415625.png)

commit方法也是对undo进行操作，执行commit方法之后 将变化值增加到undoStack数组中。

![image-20250308110725245](../assets/blog-img/\image-20250308110725245.png)

最后得到的history历史记录就是最新值和undo数组的一个拼接

那么useRefHistory（）的逻辑就是在上述中增加了一个watchIgnorable（vueuse实现的增强版的watch可以忽略某些更新)

![image-20250308111006117](../assets/blog-img/\image-20250308111006117.png)

在watchIgnorable中传入source数据源进行观察，然后将之前的commit方法传入，数据源发生更新时自动调用commit方法，完成自动追踪ref更新历史的操作
