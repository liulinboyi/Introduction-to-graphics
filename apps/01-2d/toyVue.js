export const ToyVue = function () {
    const targetMap = new WeakMap()

    const effectStack = [];

    const baseHandler = {
        get(target, key) {
            // 栈顶
            if (effectStack[effectStack.length - 1]) {
                // 查看targetMap里面有没有当前对象
                let depMap = targetMap.get(target);
                // targetMap里面没有当前对象
                if (depMap === void 0) {
                    // 创建一个新的Map作为存储在targetMap中target为key的value
                    // 形如{target => depMap}
                    depMap = new Map();
                    targetMap.set(target, depMap)
                }
                let deps = depMap.get(key);
                // 查看depMap中是否存储key
                if (deps === void 0) {
                    // 如果没有创建一个deps
                    // 创建一个新的deps作为存储在depMap中key为key的value
                    // 形如{key => deps}
                    deps = new Set();
                    depMap.set(key, deps);
                }
                // 最后targetMap形如
                // {target => {key => deps}} deps中存储哪些方法/函数依赖这个key
                if (!deps.has(effectStack[effectStack.length - 1])) {
                    deps.add(effectStack[effectStack.length - 1])
                }
            }
            let getRes = target[key];
            if (typeof getRes === 'object') {
                console.log(getRes)
                getRes = reactive(getRes)
                console.log(getRes)
            }

            return getRes;
        },
        set(target, key, value) {
            target[key] = value;
            const depMap = targetMap.get(target);
            if (depMap) {
                if (depMap.get(key).size > 0) {
                    trigger(target, key)
                }
            }
            return true;
        }
    }

    function reactive(target) {
        const observed = new Proxy(target, baseHandler);
        return observed;
    }

    function effect(fn) {
        try {
            effectStack.push(fn)
            fn()
        } finally {
            effectStack.pop()
        }
    }

    function trigger(target, key) {
        for (let effect of targetMap.get(target).get(key)) {
            effect()
        }
    }

    console.log(targetMap)

    return { reactive, effect }
}


