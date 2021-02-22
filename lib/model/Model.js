import RenderContext from '../RenderContext'
/**
 * 绘制的是一个模型
 * 模型
 *  - Mesh 网格
 *  - Matrix 变换矩阵
 */
export class Model {
    constructor(mesh) {
        this.mesh = mesh
        this.gl = RenderContext.getGL()
        this.program = RenderContext.getProgram()
        this.gl.useProgram(this.program)
    }

    /**
     * 传递颜色和分辨率
     */
    setVectorUniform(name, value) {
        // name是为了在program中找name位置
        const position = this.gl.getUniformLocation(this.program, name)
        if (value.length === 2) {
            // 二维浮点数向量
            this.gl.uniform2fv(position, value)
        } else if (value.length === 3) {
            // 三维浮点数向量
            this.gl.uniform3fv(position, value)
        } else if (value.length === 4) {
            // 四维浮点数向量
            this.gl.uniform4fv(position, value)
        }
    }

    /**
     * 画一个模型
     */
    draw() {
        const gl = this.gl
        gl.enable(gl.DEPTH_TEST)
        gl.depthFunc(gl.LEQUAL)
        gl.clearColor(0.5,0.5,0.5,0.9)
        gl.clearDepth(1.0)
        // 视口
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
        // 清除所有颜色
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        this.mesh.draw()
    }
}