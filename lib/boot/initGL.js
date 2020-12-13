const { func } = require("prop-types")

export const initGL = function () {
    const canvas = document.querySelector("#canvas")
    console.log(canvas)
    const gl = canvas.getContext('webgl')

    if (!gl) {
        throw "gl initalize fail"
    }

    return gl
}


