let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

function _assertBoolean(n) {
    if (typeof(n) !== 'boolean') {
        throw new Error('expected a boolean argument');
    }
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    if (typeof(heap_next) !== 'number') throw new Error('corrupt heap');

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (typeof(arg) !== 'string') throw new Error('expected a string argument');

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);
        if (ret.read !== arg.length) throw new Error('failed to pass whole string');
        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function _assertNum(n) {
    if (typeof(n) !== 'number') throw new Error('expected a number argument');
}

let cachedFloat64Memory0 = null;

function getFloat64Memory0() {
    if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {
        cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }

function logError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        let error = (function () {
            try {
                return e instanceof Error ? `${e.message}\n\nStack:\n${e.stack}` : e.toString();
            } catch(_) {
                return "<failed to stringify thrown value>";
            }
        }());
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", error);
        throw e;
    }
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
*/
export class Canvas {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_canvas_free(ptr);
    }
    /**
    * @param {HTMLCanvasElement} canvas
    */
    constructor(canvas) {
        const ret = wasm.canvas_new(addHeapObject(canvas));
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {number} width
    * @param {number} height
    * @param {number} ratio
    * @param {any} data
    */
    init(width, height, ratio, data) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        _assertNum(width);
        _assertNum(height);
        wasm.canvas_init(this.__wbg_ptr, width, height, ratio, addHeapObject(data));
    }
    /**
    * @param {any} data
    */
    update(data) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        wasm.canvas_update(this.__wbg_ptr, addHeapObject(data));
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    mouseover(x, y) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        wasm.canvas_mouseover(this.__wbg_ptr, x, y);
    }
    /**
    */
    mouseout() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        wasm.canvas_mouseout(this.__wbg_ptr);
    }
    /**
    * @param {number} width
    * @param {number} height
    * @param {number} space
    * @param {number} total
    */
    draw_lines(width, height, space, total) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        _assertNum(width);
        _assertNum(height);
        _assertNum(space);
        _assertNum(total);
        wasm.canvas_draw_lines(this.__wbg_ptr, width, height, space, total);
    }
}
/**
*/
export class Data {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_data_free(ptr);
    }
    /**
    */
    constructor() {
        const ret = wasm.data_new();
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {any}
    */
    get_post() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ret = wasm.data_get_post(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get_post_musica() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ret = wasm.data_get_post_musica(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get_post_24() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ret = wasm.data_get_post_24(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get_day() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ret = wasm.data_get_day(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    get_soma() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ret = wasm.data_get_soma(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {any} data
    * @param {number} year
    * @param {number} month
    * @param {number} date
    */
    teste(data, year, month, date) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        _assertNum(year);
        _assertNum(month);
        _assertNum(date);
        wasm.data_teste(this.__wbg_ptr, addHeapObject(data), year, month, date);
    }
}

export function __wbindgen_is_undefined(arg0) {
    const ret = getObject(arg0) === undefined;
    _assertBoolean(ret);
    return ret;
};

export function __wbindgen_in(arg0, arg1) {
    const ret = getObject(arg0) in getObject(arg1);
    _assertBoolean(ret);
    return ret;
};

export function __wbindgen_string_new(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

export function __wbindgen_string_get(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

export function __wbindgen_is_object(arg0) {
    const val = getObject(arg0);
    const ret = typeof(val) === 'object' && val !== null;
    _assertBoolean(ret);
    return ret;
};

export function __wbindgen_object_clone_ref(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
};

export const __wbg_random_6f5242ce64d4c728 = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');

export function __wbg_setwidth_05075fb6b4cc720e() { return logError(function (arg0, arg1) {
    getObject(arg0).width = arg1 >>> 0;
}, arguments) };

export function __wbg_setheight_7e0e88a922100d8c() { return logError(function (arg0, arg1) {
    getObject(arg0).height = arg1 >>> 0;
}, arguments) };

export function __wbg_getContext_39cdfeffd658feb7() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
}, arguments) };

export function __wbg_width_f6dd6c6e29ab874d() { return logError(function (arg0) {
    const ret = getObject(arg0).width;
    return ret;
}, arguments) };

export function __wbg_actualBoundingBoxAscent_40f7f26ce708f1ae() { return logError(function (arg0) {
    const ret = getObject(arg0).actualBoundingBoxAscent;
    return ret;
}, arguments) };

export function __wbg_actualBoundingBoxDescent_233f7e7f8c60be5d() { return logError(function (arg0) {
    const ret = getObject(arg0).actualBoundingBoxDescent;
    return ret;
}, arguments) };

export function __wbg_instanceof_CanvasRenderingContext2d_17760092d89f8894() { return logError(function (arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof CanvasRenderingContext2D;
    } catch (_) {
        result = false;
    }
    const ret = result;
    _assertBoolean(ret);
    return ret;
}, arguments) };

export function __wbg_setstrokeStyle_7459000441c14f13() { return logError(function (arg0, arg1) {
    getObject(arg0).strokeStyle = getObject(arg1);
}, arguments) };

export function __wbg_setfillStyle_0284526726395e47() { return logError(function (arg0, arg1) {
    getObject(arg0).fillStyle = getObject(arg1);
}, arguments) };

export function __wbg_setimageSmoothingEnabled_08c3dde7d4aeda26() { return logError(function (arg0, arg1) {
    getObject(arg0).imageSmoothingEnabled = arg1 !== 0;
}, arguments) };

export function __wbg_setlineWidth_7d11c2d417a3d73d() { return logError(function (arg0, arg1) {
    getObject(arg0).lineWidth = arg1;
}, arguments) };

export function __wbg_setfont_618d296905d5784e() { return logError(function (arg0, arg1, arg2) {
    getObject(arg0).font = getStringFromWasm0(arg1, arg2);
}, arguments) };

export function __wbg_beginPath_317e9c4bf21bdeaa() { return logError(function (arg0) {
    getObject(arg0).beginPath();
}, arguments) };

export function __wbg_fill_9a9ff7e4565cec29() { return logError(function (arg0) {
    getObject(arg0).fill();
}, arguments) };

export function __wbg_stroke_31f20cb8d85be0b9() { return logError(function (arg0) {
    getObject(arg0).stroke();
}, arguments) };

export function __wbg_getImageData_23ae615d32adfe2f() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    const ret = getObject(arg0).getImageData(arg1, arg2, arg3, arg4);
    return addHeapObject(ret);
}, arguments) };

export function __wbg_putImageData_bff96b74626e8a54() { return handleError(function (arg0, arg1, arg2, arg3) {
    getObject(arg0).putImageData(getObject(arg1), arg2, arg3);
}, arguments) };

export function __wbg_arc_34dbac7d98c4d070() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).arc(arg1, arg2, arg3, arg4, arg5);
}, arguments) };

export function __wbg_lineTo_3fcfab7d5f3282a0() { return logError(function (arg0, arg1, arg2) {
    getObject(arg0).lineTo(arg1, arg2);
}, arguments) };

export function __wbg_moveTo_85c1057e0b74ac9d() { return logError(function (arg0, arg1, arg2) {
    getObject(arg0).moveTo(arg1, arg2);
}, arguments) };

export function __wbg_clearRect_28e49fdce6b0c2d5() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).clearRect(arg1, arg2, arg3, arg4);
}, arguments) };

export function __wbg_fillRect_7f9e32d06a574988() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).fillRect(arg1, arg2, arg3, arg4);
}, arguments) };

export function __wbg_fillText_f2a58af1e18c8bd6() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).fillText(getStringFromWasm0(arg1, arg2), arg3, arg4);
}, arguments) };

export function __wbg_fillText_3fb6b729ca60b79c() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).fillText(getStringFromWasm0(arg1, arg2), arg3, arg4, arg5);
}, arguments) };

export function __wbg_measureText_30cf49ee9b64c74e() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).measureText(getStringFromWasm0(arg1, arg2));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_scale_a81f862b2a5c0f81() { return handleError(function (arg0, arg1, arg2) {
    getObject(arg0).scale(arg1, arg2);
}, arguments) };

export function __wbindgen_error_new(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export function __wbindgen_as_number(arg0) {
    const ret = +getObject(arg0);
    return ret;
};

export function __wbindgen_number_get(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof(obj) === 'number' ? obj : undefined;
    if (!isLikeNone(ret)) {
        _assertNum(ret);
    }
    getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
};

export function __wbindgen_boolean_get(arg0) {
    const v = getObject(arg0);
    const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
    _assertNum(ret);
    return ret;
};

export function __wbindgen_number_new(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
};

export function __wbindgen_jsval_loose_eq(arg0, arg1) {
    const ret = getObject(arg0) == getObject(arg1);
    _assertBoolean(ret);
    return ret;
};

export function __wbindgen_bigint_from_u64(arg0) {
    const ret = BigInt.asUintN(64, arg0);
    return addHeapObject(ret);
};

export function __wbg_getwithrefkey_4a92a5eca60879b9() { return logError(function (arg0, arg1) {
    const ret = getObject(arg0)[getObject(arg1)];
    return addHeapObject(ret);
}, arguments) };

export function __wbg_new_34c624469fb1d4fd() { return logError(function () {
    const ret = new Array();
    return addHeapObject(ret);
}, arguments) };

export function __wbg_get_c43534c00f382c8a() { return logError(function (arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return addHeapObject(ret);
}, arguments) };

export function __wbg_set_379b27f1d5f1bf9c() { return logError(function (arg0, arg1, arg2) {
    getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
}, arguments) };

export function __wbg_isArray_fbd24d447869b527() { return logError(function (arg0) {
    const ret = Array.isArray(getObject(arg0));
    _assertBoolean(ret);
    return ret;
}, arguments) };

export function __wbg_length_d99b680fd68bf71b() { return logError(function (arg0) {
    const ret = getObject(arg0).length;
    _assertNum(ret);
    return ret;
}, arguments) };

export function __wbg_instanceof_ArrayBuffer_f4521cec1b99ee35() { return logError(function (arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof ArrayBuffer;
    } catch (_) {
        result = false;
    }
    const ret = result;
    _assertBoolean(ret);
    return ret;
}, arguments) };

export function __wbg_call_a79f1973a4f07d5e() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_next_267398d0e0761bf9() { return handleError(function (arg0) {
    const ret = getObject(arg0).next();
    return addHeapObject(ret);
}, arguments) };

export function __wbg_next_1938cf110c9491d4() { return logError(function (arg0) {
    const ret = getObject(arg0).next;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_done_506b44765ba84b9c() { return logError(function (arg0) {
    const ret = getObject(arg0).done;
    _assertBoolean(ret);
    return ret;
}, arguments) };

export function __wbg_value_31485d8770eb06ab() { return logError(function (arg0) {
    const ret = getObject(arg0).value;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_isSafeInteger_d8c89788832a17bf() { return logError(function (arg0) {
    const ret = Number.isSafeInteger(getObject(arg0));
    _assertBoolean(ret);
    return ret;
}, arguments) };

export function __wbg_now_86f7ca537c8b86d5() { return logError(function () {
    const ret = Date.now();
    return ret;
}, arguments) };

export function __wbg_iterator_364187e1ee96b750() { return logError(function () {
    const ret = Symbol.iterator;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_instanceof_Uint8Array_4f5cffed7df34b2f() { return logError(function (arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof Uint8Array;
    } catch (_) {
        result = false;
    }
    const ret = result;
    _assertBoolean(ret);
    return ret;
}, arguments) };

export function __wbg_new_ace717933ad7117f() { return logError(function (arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_length_f0764416ba5bb237() { return logError(function (arg0) {
    const ret = getObject(arg0).length;
    _assertNum(ret);
    return ret;
}, arguments) };

export function __wbg_set_74906aa30864df5a() { return logError(function (arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
}, arguments) };

export function __wbindgen_is_function(arg0) {
    const ret = typeof(getObject(arg0)) === 'function';
    _assertBoolean(ret);
    return ret;
};

export function __wbg_buffer_5d1b598a01b41a42() { return logError(function (arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_get_5027b32da70f39b1() { return handleError(function (arg0, arg1) {
    const ret = Reflect.get(getObject(arg0), getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbindgen_debug_string(arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export function __wbindgen_memory() {
    const ret = wasm.memory;
    return addHeapObject(ret);
};

