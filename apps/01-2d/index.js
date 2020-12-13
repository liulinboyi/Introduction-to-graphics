// import { initGL } from "../../lib/boot/initGL.js";
// initGL()

/**

import RenderContext from '../../lib/RenderContext'

const gl = RenderContext.getGL()

const program = RenderContext.getProgram()

console.log(gl)

console.log(program)

 */

import { Model, shape } from '../../lib'
import RenderContext from '../../lib/RenderContext'
import { transformColor } from '../../lib/utils/index'
import { ToyVue } from './toyVue'

void function () {
    const gl = RenderContext.getGL()

    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)
    gl.viewport(0.0, 0.0, canvas.width, canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    const mesh = shape.d2_f(100, 100, 100, 150, 30)
    const model = new Model(mesh)
    // model.setVectorUniform('u_color', [0, 0, 0, 1.0])
    // let color = [...transformColor(0, 255, 255), 1.0]
    let color = [...transformColor(238, 238, 238), 1.0]
    console.log(color)
    model.setVectorUniform('u_color', color)
    model.setVectorUniform('u_resolution', [gl.canvas.width, gl.canvas.height])
    model.draw()
    const toyVue = ToyVue()
    const reactive = toyVue.reactive
    const effect = toyVue.effect

    let rgb = {
        r: 102,
        g: 191,
        b: 255
    };
    let test = {
        a: { b: { c: 1 } }
    }
    let proxy_test = reactive(test);
    console.log(proxy_test);
    proxy_test.a.b.c = 4;
    let proxy_rgb = reactive(rgb);
    r.value = proxy_rgb.r;
    g.value = proxy_rgb.g;
    b.value = proxy_rgb.b;
    // color.style.backgroundColor = `rgb(${proxy_rgb.r},${proxy_rgb.g}, ${proxy_rgb.b})`;
    r.addEventListener('input', (e) => {
        proxy_rgb.r = r.value
    })
    g.addEventListener('input', (e) => {
        proxy_rgb.g = g.value
    })
    b.addEventListener('input', (e) => {
        proxy_rgb.b = b.value
    })

    effect(() => {
        let color = [...transformColor(proxy_rgb.r, proxy_rgb.g, proxy_rgb.b), 1.0]
        model.setVectorUniform('u_color', color)
        model.draw()
    })
}()
