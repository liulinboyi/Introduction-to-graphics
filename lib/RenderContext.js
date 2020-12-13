import { initGL } from "./boot/initGL";
import { initProgram } from "./boot/initProgram";
export default class RenderContext {
  static gl = null;
  static programs = {};

  static init() {

    if (RenderContext.gl) {
      return
    }
    const gl = initGL()
    const program = initProgram(gl)
    gl.canvas.width = gl.canvas.clientWidth;
    gl.canvas.height = gl.canvas.clientHeight;
    RenderContext.programs = program
    RenderContext.gl = gl;
  }

  static initProgram(name = 'default') {
    const gl = RenderContext.gl
    if (!RenderContext.programs[name]) {
      const program = initProgram(gl, name);
      RenderContext.programs[name] = program;
    }
    if (name === 'default') {
      RenderContext.gl.useProgram(RenderContext.programs['default'])
    }


  }

  static getAspect() {
    return RenderContext.aspect;
  }

  static getGL() {
    RenderContext.init();
    return RenderContext.gl;
  }

  static getProgram() {
    this.init();
    if (!RenderContext.currentProgram) {
      this.initProgram('default')
      RenderContext.currentProgram = RenderContext.programs['default']
    }
    return RenderContext.currentProgram
  }

  static switchProgram(name) {
    this.init()
    this.initProgram(name)
    RenderContext.currentProgram = RenderContext.programs[name]
    RenderContext.gl.useProgram(RenderContext.currentProgram)
  }
}
