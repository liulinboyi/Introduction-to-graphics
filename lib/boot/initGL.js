/**
 * 获取webgl实例
 */
export const initGL = function () {
    const canvas = document.querySelector("#canvas")
    console.log(canvas)
    const gl = canvas.getContext('webgl')
    console.log(gl, 'webgl context')

    if (!gl) {
        throw "gl initalize fail"
    }

    return gl
}


