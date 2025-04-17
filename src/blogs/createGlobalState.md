### createGlobalState（）

 在简单场景下更加简洁(相较于vuex provide/inject...)的实现全局状态管理。
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

~~~typescript
import type { AnyFn } from '../utils'
import { effectScope } from 'vue'

/**
 * Keep states in the global scope to be reusable across Vue instances.
 *
 * @see https://vueuse.org/createGlobalState
 * @param stateFactory A factory function to create the state
 */
export function createGlobalState<Fn extends AnyFn>(
  stateFactory: Fn,
): Fn {
  let initialized = false
  let state: any
  const scope = effectScope(true)

  return ((...args: any[]) => {
    if (!initialized) {
      state = scope.run(() => stateFactory(...args))!
      initialized = true
    }
    return state
  }) as Fn
}
~~~

从语法上看该函数接受一个函数**stateFactory**作为参数 并返回一个函数 调用返回的函数即可获得state 也就是我们需要的全局状态

**逻辑分析**：首先定义一个`initialized` 用于标记全局状态是否已经初始化，`state` 用于保存全局状态。当我们第一次调用的时候initialized为false 全局状态没有初始化，所以需要scope.run 将状态保存到state 。之后再调用的时候就可以直接返回state拿到全局状态

重点介绍：effectScope() vue3 进阶api   用于创建一个新的effect作用域 用来保存响应式状态，并方便对响应式状态的副作用一起处理。 调用effectScope()得到一个新的scop作用域，然后调用.run（）方法将我们之前声明的全局状态进行注册和保存。(可以看到.run()方法里的函数参数执行了我们传入的参数stateFactory) 该run方法将stateFactory（）的返回值转发到state上 所以state能拿到全局状态。

整个源码最重要的方法就是（）,所以这里贴出两个effectScope（）的参考资料：[基本用法](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md)

- **思考**：effectScope()会单独创建一个作用域，为什么要单独创建作用域呢，其实从vue3的基本组件传参来看不管是props v-model slot provide等等都要求组件有一定的父子关系，这种父子关系的传参 父组件不在子组件也一定会被销毁，也就是说子组件一定可以用到父组件定义的状态，那么试想一个情况两个同等级的组件(并无父子关系) 想要共享一个状态，那么此状态如果定义在a组件，a组件被销毁但是b组件还想用就用不了了，因为状态是在a组件中定义的 a组件被销毁状态就没了，**所以用effectScope()会单独创建一个作用域，将响应式状态保存到该作用域，这样就不会因为某一个组件销毁，另一个组件无法使用的情况！！！**