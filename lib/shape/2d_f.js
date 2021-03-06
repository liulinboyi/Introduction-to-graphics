import { Mesh } from '../model/Mesh'
/**
 * 绘制三角形
 * @param {*} x 
 * @param {*} y 
 * @param {*} width 
 * @param {*} height 
 * @param {*} thickness 
 */
export const d2_f = function (x, y, width, height, thickness/**厚度 */) {
    /**
     * 右侧F  的两横不好用符号表示，暂时这么表示吧。
     * ----------------
     * |\       | \   |
     * | \      |  \  |
     * |  \     |------
     * |   \    |------
     * |    \   | \   |
     * |     \  |  \  |
     * |      \ |------
     * |       \|
     * ----------
     */
    const data = [
        // 左边
        x, y,
        x + thickness, y,
        x, y + height,

        x, y + height,
        x + thickness, y,
        x + thickness, y + height,
        // 第一个横杠
        x + thickness, y,
        x + width, y,
        x + thickness, y + thickness,

        x + thickness, y + thickness,
        x + width, y,
        x + width, y + thickness,
        // 第二个横杠
        x + thickness, y + thickness * 2,
        x + width * 2 / 3, y + thickness * 2,
        x + thickness, y + thickness * 3,

        x + thickness, y + thickness * 3,
        x + width * 2 / 3, y + thickness * 2,
        x + width * 2 / 3, y + thickness * 3,
    ]

    return new Mesh({vertexes: data,indices: null,dimension: 2})
}

