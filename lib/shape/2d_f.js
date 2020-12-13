import { Mesh } from '../model/Mesh'
export const d2_f = function (x, y, width, height, thickness/**厚度 */) {
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

    return new Mesh(data, 2)
}

