import RenderContext from '../RenderContext'
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

    draw() {
        const gl = this.gl
        // 视口
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
        // 清除所有颜色
        gl.clear(gl.COLOR_BUFFER_BIT)
        this.mesh.draw()
    }
}