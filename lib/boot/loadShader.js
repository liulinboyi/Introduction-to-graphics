/**
 * 加载着色器
 * @param {} gl 
 * @param {*} type 
 * @param {*} source 
 */
export const loadShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const err = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw 'An error occurred compiling the shaders: ' + err;
    }
    return shader;
}