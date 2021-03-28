<!--
 * @Description:
 * @Autor: hanipig
 * @Date: 2021-03-28 23:32:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-29 00:04:05
-->

## http 相关

### 请求方法

> 1. GET：发送一个请求获取服务器上的某一资源
> 2. POST：向 URL 指定的资源提交数据或附加新的数据
> 3. PUT：跟 POST 很像，也是向服务器提交数据。但是，他们之前有不同。PUT 指定了资源在服务器上的位置，而 POST 没有
> 4. HEAD：只请求页面的首部
> 5. DELETE：删除服务器上的某资源
> 6. OPTIONS：用于获取当前 URL 所支持的方法。如果请求成功，会有一个 Allow 的头包含类似"GET, POST"这样的信息
> 7. TRACE：用于激发一个远程的，应用层的请求消息回路
> 8. CONNECT：把请求连接转换成透明的 TCP/IP 通道

### HTTP 状态码及其含义

- 1XX：信息状态码
  > 1. 100 Continue 继续，一般在发送 post 请求时，已发送了 http header 之后服务端将返回此信息，表示确认，之后发送具体参数信息
- 2XX：成功状态码
  > 1. 200 OK 正常返回信息
  > 2. 201 Created 请求成功并且服务器创建了新的资源
  > 3. 202 Accepted 服务器已接受请求，但尚未处理
- 3XX：重定向
  > 1. 301 Moved Permanently 请求的网页已永久移动到新位置。
  > 2. 302 Found 临时性重定向。
  > 3. 303 See Other 临时性重定向，且总是使用 GET 请求新的 URI。
  > 4. 304 Not Modified 自从上次请求后，请求的网页未修改过。
- 4XX：客户端错误
  > 1. 400 Bad Request 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
  > 2. 401 Unauthorized 请求未授权。
  > 3. 403 Forbidden 禁止访问。
  > 4. 404 Not Found 找不到如何与 URI 相匹配的资源。
- 5XX：服务器端错误
  > 1. 500 Internal Server Error 最常见的服务器端错误。
  > 2. 503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。

### HTTP 报文的组成部分

> 1. 请求报文

> - 请求行（http 方法 + 页面地址 + http 协议 + 版本）
> - 请求头（key + value）
> - 空行（服务器通过空行来判断下一部分不再是请求头，而当做请求题来解析）
> - 请求体（数据部分）

> 2. 响应报文

> - 状态行（http 协议 + 版本号 + 状态码 + 状态描述）
> - 响应头
> - 空行
> - 响应体

### 从输入 URL 到呈现页面过程
