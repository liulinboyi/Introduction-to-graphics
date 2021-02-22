import RenderContext from "../RenderContext"
import GLIndexBuffer from './GLIndexBuffer'
import GLVertexBuffer from './GLVertexBuffer'

/**
 * 网格
 * 将图形相关的比如缓冲区放到了Mesh中
 *  - Vertexes 顶点
 *  - Indexs 索引
 */
export class Mesh {
    constructor({vertexes/**顶点 */, indices = null/**索引 */, dimension = 3 /**几维网格 */,colors = null}) {
        this.dimension = dimension
        this.vertexes = vertexes
        this.indices = indices
        this.colors = colors

        // opengl实例
        this.gl = RenderContext.getGL()
        this.program = RenderContext.getProgram()
        // 顶点在程序中的位置，不是变量名称，是通过变量名称来获取的位置
        // this.vertexPosition =
        //     this.gl.getAttribLocation(this.program, "a_positoon");
        // console.log(this.vertexPosition, 'this.vertexPosition')
        // // Buffer
        // this.vertexeBuffer = null
        // this.init()

        this.vertexeBuffer = new GLVertexBuffer(
            'a_positoon', 
            new Float32Array(vertexes),
            dimension)
        if(this.colors) {
            this.colorsBuffer = new GLVertexBuffer(
                'a_color',
                new Float32Array(colors),
                dimension
            )
        }
        if(this.indices) {
            this.indicesBuffer = new GLIndexBuffer(
                new Uint16Array(this.indices),
                dimension
            )
        }
    }

    init() {
        // 将buffer和webgl绑定起来
        this.vertexeBuffer = this.gl.createBuffer() // 创建缓冲区
        this.gl.bindBuffer( // 绑定buffer
            this.gl.ARRAY_BUFFER,
            this.vertexeBuffer
        )
        this.gl.bufferData( // 提供32位浮点数数据（数组）
            this.gl.ARRAY_BUFFER,
            new Float32Array(this.vertexes),
            this.gl.STATIC_DRAW
        )


    }

    draw() {
        // v 1.0
        // 启用顶点属性数组，传入顶点位置
        // this.gl.enableVertexAttribArray(this.vertexPosition)
        // // gl每次用的是某一个Buffer,不同的模型，不同的Buffer,在这里做切换
        // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexeBuffer)
        // // 参数
        // const type = this.gl.FLOAT
        // const normalized = false
        // const stride = 0 // 点和点之间空多少
        // const offset = 0 // 从第几个点开始
        // // 把Buffer如何定向到webgl
        // this.gl.vertexAttribPointer(
        //     this.vertexPosition,
        //     this.dimension,
        //     type,
        //     normalized,
        //     stride,
        //     offset
        // )
        // this.gl.drawArrays(
        //     this.gl.TRIANGLES/*绘制三角形 */, 
        //     0/*从第0个开始 */, 
        //     this.vertexes.length / this.dimension/*总共画多少个三角形 顶点个数/维度 比如维度为2，表示2个组成一个顶点 */
        //     )




        // v 2.0
        const gl = this.gl
        gl.enable(gl.DEPTH_TEST)
        gl.depthFunc(gl.LEQUAL)

        this.vertexeBuffer.associate()
        this.colorsBuffer && this.colorsBuffer.associate()
        this.indicesBuffer && this.indicesBuffer.associate()

        // 有无索引数据
        if(this.indicesBuffer) {
            gl.drawElements(
              gl.TRIANGLES, 
              this.indices.length,
              gl.UNSIGNED_SHORT,
              0
            )
          } else {
      
            gl.drawArrays(
              gl.TRIANGLES,
              0,
              this.vertexes.length / this.dimension
            )
          }
    }
}

