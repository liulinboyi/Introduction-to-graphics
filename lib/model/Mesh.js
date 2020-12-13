import RenderContext from "../RenderContext"

/**
 * 网格
 */
export class Mesh {
    constructor(vertexes/**顶点 */, dimension = 3 /**几维网格 */, indexes = null/**索引 */) {
        this.dimension = dimension
        this.vertexes = vertexes
        this.indexes = indexes

        // opengl实例
        this.gl = RenderContext.getGL()
        this.program = RenderContext.getProgram()
        this.vertexPosition =
            this.gl.getAttribLocation(this.program, "a_positoon")
        // Buffer
        this.vertexeBuffer = null
        this.init()
    }

    init() {
        this.vertexeBuffer = this.gl.createBuffer() // 创建缓冲区
        this.gl.bindBuffer(
            this.gl.ARRAY_BUFFER,
            this.vertexeBuffer
        )
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array(this.vertexes),
            this.gl.STATIC_DRAW
        )


    }

    draw() {
        this.gl.enableVertexAttribArray(this.vertexPosition)
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexeBuffer)
        // 参数
        const type = this.gl.FLOAT
        const normalized = false
        const stride = 0 // 点和点之间空多少
        const offset = 0 // 从第几个点开始
        this.gl.vertexAttribPointer(
            this.vertexPosition,
            this.dimension,
            type,
            normalized,
            stride,
            offset
        )
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexes.length / this.dimension)
    }
}

