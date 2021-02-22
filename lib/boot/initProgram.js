import {loadShader} from './loadShader.js'

/**
 * 着色器程序，有一个program类来管理
 * 
 * @param {*} gl 
 * @param {*} name 
 */
export const initProgram =  (gl, name = 'default') => {

  let vShaderId = 'vertex-shader'
  let fShaderId = 'fragment-shader'
  if(name !== 'default') {
    vShaderId += '-' + name
    fShaderId += '-' + name

  }
  console.log(vShaderId)
  const vertexShaderSource = document.getElementById(vShaderId).text
  const fragShaderSource = document.getElementById(fShaderId).text

  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragShader = loadShader(gl, gl.FRAGMENT_SHADER, fragShaderSource)

  // 创建一个管理着色器的程序
  const program = gl.createProgram()
  // 附加着色器
  gl.attachShader(program, vertexShader)
  // 附加着色器
  gl.attachShader(program, fragShader)
  // 链接program和opengl
  gl.linkProgram(program)

  return program

}