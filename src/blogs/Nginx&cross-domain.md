## 1、nginx是什么？

- 回答：nginx一种高性能的http服务器和反向代理服务器

- 默认路径：etc/nginx

  

## 2、nginx的优点

- 开源免费
- 高性能稳定支持多个tcp连接并且消耗的资源很低



## 3、nginx的常用场景

- 部署静态网站
- 提供多个网站，多域名的服务
- 提供反向代理服务

## 4、nginx的使用

#### 4.1、管理命令

```
nginx -t  			检查nginx.conf语法
nginx -s reload 	重新读取nginx.conf
nginx -s stop       停止nginx
cd /etc/nginx  vim nginx.conf //默认配置路径
```

#### 4.2、nginx的配置解释

- 宏观模块

![image-20230104155124722](../assets/blog-img/\image-20230104155124722.png)

![image-20230104155911036](../assets/blog-img/\image-20230104155911036.png)



##### 4.2.1、关于location的匹配原则

``` 
资源匹配
lcation / 					
// 1、匹配url以‘/’开头的所有请求

location = /a              
// 2、优先级最高 /a请求会走到这个匹配

location ^~ /a 
// 3、优先级次高 匹配/a开头

location + 正则表达式
// 4、第三优先级 

//优先级一样看匹配度 匹配度也一样 写在上面的先匹配
```



##### 4.2.2、静态资源的部署

~~~
1、网站重定向
   location / {
         rewrite ^/ https://github.com/laybrid;

    }
2、部署静态资源 
	location /a {
		root '/test'     资源在服务器里的位置/test/a/index.html
		index index.html
	}
	location /a {
		alias:/test      同上 但是路径是 /test/index.html
	}
总结：先大致匹配一下location 然后根据里面的配置 该重定向重定向
	 该根据root/alias进入服务器里的文件夹找静态资源
~~~



##### 4.2.3、反向代理与负载均衡的配置

~~~ 
反向代理：一对多或一对一，代理服务器会代理服务端，将客户端的请求转发到被代理的服务器上，目的是通常用于做负载均衡，隐藏服务器的ip地址，提高访问速度（硬盘）和安全性！
正向代理：多对一或一对一，代理服务器会代理客户端，根据客户端的请求向目标服务器发送请求并返回资源。目的是：突破客户端的访问限制（解决跨域），隐藏客户端的真实ip，提高访问速度（缓存）。
~~~

![image-20230114155252405](../assets/blog-img/\image-20230114155252405.png)

![image-20230114155304053](../assets/blog-img/\image-20230114155304053.png)

~~~
反向代理（主要是区别带不带斜杠）
1、不带斜杠 意思是将 /a请求 转到 http:.../a
location /a {
	proxy_pass   http:....
}
2、带斜杠  意思是/a请求转到 http://...   （转到根路径 项目中用到了）
location /a/ {
	proxy_pass http://..../
}

~~~

~~~
负载均衡 （让用户的请求可以根据负载均衡的策略扩散分布在每一台服务器上，而不至于对着一台服务器猛砸）

http {
upstream gruop1 {
	// 用不同的个服务器 或者相同的服务器不同的端口号都可以
	// weight表示权重 当你访问/a的时候
    //1、如果不写权重 就是随机代理
    //2、如果权重一样 那么访问/a两个服务器交替代理
    //3、如果权重不一样 高权重的代理的服务器次数多
	server 192.0.0.12  weight 10
	server 192.0.0.13  weight 1
}

server {
	//先做一个反向代理
	location /a/ {
						//将ip地址用变量代替
		proxy_pass http://gruop1/	
	}
  }
}

//负载均衡的分配方案 
1、round-robin（默认） 	将请求依次转发给每一个服务器
2、least-connected      将请求发送给当前请求资源最少的服务器

补充：
当然本身nginx服务器也可以做负载均衡（搞多台服务器充当nginx服务器）
这样不至于一台nginx服务器没了后面的负载均衡 反向代理全完蛋了。。
还可以通过dns服务告诉用户哪儿有健康的nginx服务器，这样所有的请求只会进入健康的nginx服务器，单点风险就能解决
~~~

- 负载均衡动态图

  ![image-20230113200118158](../assets/blog-img/\image-20230113200118158.png)

![image-20230113200127020](../assets/blog-img/\image-20230113200127020.png)



##### 4.2.4、404等错误页面的自定义优化

~~~
如果你没有优化的话 会是默认的nginx404/403页面 类似于这种
~~~

![image-20230113213741465](../assets/blog-img/\image-20230113213741465.png)

- 常见的优化方案1、相对路径(默认写法)

  ~~~
  配置里的写法
  server {
  	server_name xxxxx
  	404  /404.html
  }
  这种写法遇到404状态码的时相当于访问
  xxxx/404.html
  1、此时你可以单独匹配一个location
  location /404.html {
  	存放404.html的静态资源
  }
  2、也可以不单独配置location 让他走到location / 这个匹配规则
  然后根据location里的root/alias静态文件夹 将你的404.html放进去
  location / {
  	alias/root
  }
  这种写法遇到错误路径时会保留
  比如访问 laybridleijiaxiang.com/qqqqqqq
  刷新时这个url还是错误url
  ~~~

- 2、重定向（绝对路径）

```
server {
	404  http://taobao....或者laybridleijiaxiang.com/err
}
写别人的路径或者自己的绝对路径 然后根据这个路径配置放资源
location err {
	alias....
}
与上面的不同的是 访问laybridleijiaxiang.com/qqqqqqq
会自动跳转到绝对路径 url变了
```



## 5、关于跨域的解决方法介绍以及特点对比

#### 5.1、什么是同源，为什么跨域会报错，为什么不让跨域？

- **两个url  协议 域名  端口  都相同就是同源**

- 浏览器如何检测跨域

  ![image-20230116145810465](../assets/blog-img/\image-20230116145810465.png)

- 没有跨域b网站的脚本就可以随便向a网站发送请求得到浏览器存储的cookie信息，来盗取用户的资料等等

#### 5.2、CORS是什么？有什么用

~~~
CORS（跨资源共享），一种基于http头的机制，只要http响应头里包含了cors响应头就可以跨域
~~~

#### 5.3cors的使用配置

针对这些**简单请求**   **复杂请求**  **带凭证的请求（cookie）** 配置方式不一样

###### 简单请求

- 定义

  ![image-20230116145458951](../assets/blog-img/\image-20230116145458951.png)

- 解决方案

~~~
只需在响应头中追加(nodejs可以追加)
Access-Control-Allow-Origin *代表所有请求源都允许
~~~

![image-20230116150658349](../assets/blog-img/\image-20230116150658349.png)

###### 复杂请求（非简单请求）

- 定义

  ![image-20230116151029056](../assets/blog-img/\image-20230116151029056.png)

- 解决方案

  - 1、将复杂请求的改成简单请求 通过修改headers里的content-type

  - ![image-20230116164426301](../assets/blog-img/\image-20230116164426301.png)

  - 2、配置响应头中的cors

    ![image-20230116164800953](../assets/blog-img/\image-20230116164800953.png)

###### 带凭证的请求

- 定义：有的时候cookie里是有数据的 一般的请求都会携带cookie的数据 但是跨域请求不会携带

- 解决方案：

  要想携带必须在服务端和客户端都进行配置！

  ![image-20230116190604315](../assets/blog-img/\image-20230116190604315.png)

![image-20230116190641962](../assets/blog-img/\image-20230116190641962.png)

![image-20230116190716731](../assets/blog-img/\image-20230116190716731.png)



#### 5.3、关于jsonp的使用

- 原理通过script标签的src属性发送跨域请求

  ![image-20230117202048681](../assets/blog-img/\image-20230117202048681.png)

- 其他方式发送请求也可以 jquery 和jsonp的库

  ![image-20230117202830662](../assets/blog-img/\image-20230117202830662.png)

![image-20230117202855756](../assets/blog-img/\image-20230117202855756.png)

// 缺优点：只能发送get请求  兼容性最好



## 6、跨域

#### 6.1、跨域是什么？

- 首先跨域其实是一种浏览器的保护机制，当两个站点的url 协议号域名端口号有一个不同时，去发送ajax请求的时候会被浏览器阻止

#### 6.2、解决跨域的方案和优劣详细说明

- jsonp

  ~~~
  jsonp的原理就是利用script标签的src属性没有跨域限制的。我们可以通过在客户端注册一个回调函数然后将这个函数作为jsonp请求得参数传递给服务端，然后服务端把数据作为函数的参数传递回来，从而在函数里面使用它
  优点：兼容性很好
  缺点：只支持get请求，安全性有问题 怕被注入页面漏洞（js脚本）
  ~~~

- cors

  ```
  针对简单请求和非简单请求去让服务端给响应头追加一些配置(Acess开头的一些配置)  浏览器检测到这些配置之后就不会屏蔽请求
  优点：请求齐全 配置简单
  缺点：兼容性可能不太好
  ```

- postmessage

  ~~~
  不同页面之间的通信 但还是要求协议端口号相同 document.domain也要设置为相同（这个默认是返回当前文档所在的的域名）
  主要解决的是父域和子域的传值（告诉浏览器是同域的）
  
  ~~~

  

- webpack/vue.config.js /node.js代理 

  - 都是差不多这个原理 给你启动一个本地node服务器 将请求发送到被代理的服务器上（开发环境才能用）

  ![image-20230118130724685](../assets/blog-img/\image-20230118130724685.png)

- nginx反向代理

  ~~~
  高性能http服务器和反向代理服务器
  
  优点：开源 可靠 热部署  高性能稳定支持多个tcp连接并且消耗的资源很低
  ~~~

  