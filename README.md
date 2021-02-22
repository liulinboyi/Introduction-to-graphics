# 图形学入门

## [样例展示](https://blog.heyliubo.top/Introduction-to-graphics/dist/)

## 向图形渲染管道即向图形着色器语言（GLSL）传值

### 有两个个控制反转单元留给了用户，用户可以操作
- 计算顶点位置（vertex shader）
    - 平移、旋转、缩放...
    - 投影
- 为每个像素上色（fragement shader）
    - 颜色
    - 材质
    - 光照

### 传递方式
- uniforms 直接传递（类似全局变量）可以传递矩阵、向量等，其实就是js中的数组；可以传递给顶点着色器或者片段着色器
- attributes 顶点的属性，顶点的位置，顶点的颜色，通过Buffer传递；只能传递给顶点着色器

### 传递向量到着色器
- location: 着色器语言对应变量的位置
- data: 要传过去的变量，data要与维度一致
-               维度    类型
- gl.uniform[1|2|3|4][ui|i|f][v](location, data)
    - ui:unsigned interger 无符号整数
    - i:interger
    - f:float
- eg: 
    - gl.uniform2fv(location, data)

### 传递矩阵到着色器
- location: 着色器语言对应变量的位置
- false 固定的，预留api代表矩阵要不要转置，矩阵行列交换，目前没有实现
- gl.uniformMatrix[2|3|4]x[2|3|4]fv(location, false, data)
- eg: 
    - gl.uniformMatrix2fv(location, false, data)
    - gl.uniformMatrix2x3fv(location, false, data)
    - gl.uniformMatrix3fv(location, false, data)

### 传递属性（Buffer（缓冲区））

- Buffer: 分配好的一块内存空间
- webgl中用于存储数据
- 类型
    - Vertex Buffer 顶点Buffer，存储顶点属性的Buffer，比如顶点的位置或者颜色
    - Index Buffer 顶点的索引Buffer
    - Frame Buffer 用来驱动显示器工作的Buffer，一般不会让用户去用，除非用户需要性能极高的场景，用户需要去操作

### Buffer（缓冲区）操作
- gl.createBuffer() 创建缓冲区，没有向里面填数据，以及数据类型，需要后续操作
- target: （Vertex Buffer | Index Buffer）: gl.ARRAY_BUFFER | ELEMENT_ARRAY_BUFFER
- gl.bindBuffer(target, buffer) 指定Buffer，绑定到那种Buffer上去用
- usage: 给opengl提示如何去用这些数据，比如，这些数据会不会经常变换
- usage: gl.STATIC_DRAW | gl.DYNAMIC_DRAW | ...
- 如果要改变图形，一般改变uniform，不会改Buffer
- gl.bufferData(target, data, usage) 向缓冲区中注入数据


### GLSL着色器语言中，变量类型
- Attribute（属性）
    - 表示数据（顶点、索引、颜色、法向量等）
    - 只在顶点着色器中使用
- Uniform（统一的）
    - 通常是一个全局的向量（如颜色、光照参数等），或者全局的矩阵（如世界矩阵、观察矩阵等）
    - 可以在顶点着色器和片元着色器中使用
- Varying（变化的）
    - 通常用来将数据从顶点着色器传递到片元着色器

### 属性实例（Attribute）
```javascript

const colors = [...]
// 创建缓冲区，并将数据绑定到webgl的ARRAY_BUFFER
const buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)
// 将数据和顶点着色器的属性关联
const a_color = gl.getAttribLocation(program, 'a_color') // 拿到位置
gl.bindBuffer(gl.ARRAY_BUFFER, buffer) // 再调用一次bindBuffer，切换Buffer
gl.vertexAttribPointer(a_color, 4/*维度*/, gl.FLOAT/*数据类型*/, false/*是否规约*/, 0/*从第0个位置开始读*/, 0/*每次没有间隔*/)
gl.enableVertexAttribArray(a_color) // 可以在任何时候可以打开，如果Buffer或者attribute比较多的情况下，可以考虑关掉一些 gl.disableVertexAttribArray(a_color)
// Buffer不仅程序要用，GPU也要用

```
