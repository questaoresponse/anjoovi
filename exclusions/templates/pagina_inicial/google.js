(function(sttc) {
    'use strict';
    var aa = {};
    /* 
 
 Copyright The Closure Library Authors. 
 SPDX-License-Identifier: Apache-2.0 
*/
    var p = this || self;
    function ba(a, b) {
        var c = ca("CLOSURE_FLAGS");
        a = c && c[a];
        return null != a ? a : b
    }
    function ca(a) {
        a = a.split(".");
        for (var b = p, c = 0; c < a.length; c++)
            if (b = b[a[c]],
            null == b)
                return null;
        return b
    }
    function da(a) {
        var b = typeof a;
        return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    }
    function ea(a) {
        var b = da(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }
    function fa(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }
    function ha(a) {
        return Object.prototype.hasOwnProperty.call(a, ia) && a[ia] || (a[ia] = ++ja)
    }
    var ia = "closure_uid_" + (1E9 * Math.random() >>> 0)
      , ja = 0;
    function ka(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
    function la(a, b, c) {
        if (!a)
            throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }
    function ma(a, b, c) {
        ma = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ka : la;
        return ma.apply(null, arguments)
    }
    function na(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var d = c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d)
        }
    }
    function oa(a, b, c) {
        a = a.split(".");
        c = c || p;
        a[0]in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift()); )
            a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
    }
    function pa(a) {
        return a
    }
    ;let qa = (new Date).getTime();
    function ra(a) {
        p.setTimeout(()=>{
            throw a;
        }
        , 0)
    }
    ;function sa(a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    }
    function ta(a, b) {
        let c = 0;
        a = sa(String(a)).split(".");
        b = sa(String(b)).split(".");
        const d = Math.max(a.length, b.length);
        for (let g = 0; 0 == c && g < d; g++) {
            var e = a[g] || ""
              , f = b[g] || "";
            do {
                e = /(\d*)(\D*)(.*)/.exec(e) || ["", "", "", ""];
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                if (0 == e[0].length && 0 == f[0].length)
                    break;
                c = ua(0 == e[1].length ? 0 : parseInt(e[1], 10), 0 == f[1].length ? 0 : parseInt(f[1], 10)) || ua(0 == e[2].length, 0 == f[2].length) || ua(e[2], f[2]);
                e = e[3];
                f = f[3]
            } while (0 == c)
        }
        return c
    }
    function ua(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }
    ;var va = ba(610401301, !1)
      , wa = ba(572417392, !0);
    function xa() {
        var a = p.navigator;
        return a && (a = a.userAgent) ? a : ""
    }
    var ya;
    const za = p.navigator;
    ya = za ? za.userAgentData || null : null;
    function Aa(a) {
        return va ? ya ? ya.brands.some(({brand: b})=>b && -1 != b.indexOf(a)) : !1 : !1
    }
    function q(a) {
        return -1 != xa().indexOf(a)
    }
    ;function Ba() {
        return va ? !!ya && 0 < ya.brands.length : !1
    }
    function Ca() {
        return Ba() ? !1 : q("Trident") || q("MSIE")
    }
    function Da() {
        return Ba() ? Aa("Microsoft Edge") : q("Edg/")
    }
    function Ea() {
        !q("Safari") || Fa() || (Ba() ? 0 : q("Coast")) || (Ba() ? 0 : q("Opera")) || (Ba() ? 0 : q("Edge")) || Da() || Ba() && Aa("Opera")
    }
    function Fa() {
        return Ba() ? Aa("Chromium") : (q("Chrome") || q("CriOS")) && !(Ba() ? 0 : q("Edge")) || q("Silk")
    }
    function Ga(a) {
        const b = {};
        a.forEach(c=>{
            b[c[0]] = c[1]
        }
        );
        return c=>b[c.find(d=>d in b)] || ""
    }
    function Ha() {
        var a = xa();
        if (Ca()) {
            var b = /rv: *([\d\.]*)/.exec(a);
            if (b && b[1])
                a = b[1];
            else {
                b = "";
                var c = /MSIE +([\d\.]+)/.exec(a);
                if (c && c[1])
                    if (a = /Trident\/(\d.\d)/.exec(a),
                    "7.0" == c[1])
                        if (a && a[1])
                            switch (a[1]) {
                            case "4.0":
                                b = "8.0";
                                break;
                            case "5.0":
                                b = "9.0";
                                break;
                            case "6.0":
                                b = "10.0";
                                break;
                            case "7.0":
                                b = "11.0"
                            }
                        else
                            b = "7.0";
                    else
                        b = c[1];
                a = b
            }
            return a
        }
        c = RegExp("([A-Z][\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g");
        b = [];
        let d;
        for (; d = c.exec(a); )
            b.push([d[1], d[2], d[3] || void 0]);
        a = Ga(b);
        return (Ba() ? 0 : q("Opera")) ? a(["Version", "Opera"]) : (Ba() ? 0 : q("Edge")) ? a(["Edge"]) : Da() ? a(["Edg"]) : q("Silk") ? a(["Silk"]) : Fa() ? a(["Chrome", "CriOS", "HeadlessChrome"]) : (a = b[2]) && a[1] || ""
    }
    ;function Ia(a, b) {
        if ("string" === typeof a)
            return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (let c = 0; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    }
    function Ja(a, b) {
        const c = a.length
          , d = "string" === typeof a ? a.split("") : a;
        for (let e = 0; e < c; e++)
            e in d && b.call(void 0, d[e], e, a)
    }
    function La(a, b) {
        const c = a.length
          , d = [];
        let e = 0;
        const f = "string" === typeof a ? a.split("") : a;
        for (let g = 0; g < c; g++)
            if (g in f) {
                const h = f[g];
                b.call(void 0, h, g, a) && (d[e++] = h)
            }
        return d
    }
    function Ma(a, b) {
        const c = a.length
          , d = Array(c)
          , e = "string" === typeof a ? a.split("") : a;
        for (let f = 0; f < c; f++)
            f in e && (d[f] = b.call(void 0, e[f], f, a));
        return d
    }
    function Na(a, b) {
        const c = a.length
          , d = "string" === typeof a ? a.split("") : a;
        for (let e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a))
                return !0;
        return !1
    }
    function Oa(a, b) {
        a: {
            var c = a.length;
            const d = "string" === typeof a ? a.split("") : a;
            for (--c; 0 <= c; c--)
                if (c in d && b.call(void 0, d[c], c, a)) {
                    b = c;
                    break a
                }
            b = -1
        }
        return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]
    }
    function Pa(a, b) {
        return 0 <= Ia(a, b)
    }
    function Qa(a) {
        const b = a.length;
        if (0 < b) {
            const c = Array(b);
            for (let d = 0; d < b; d++)
                c[d] = a[d];
            return c
        }
        return []
    }
    ;function Ra(a) {
        Ra[" "](a);
        return a
    }
    Ra[" "] = function() {}
    ;
    var Sa = Ca();
    !q("Android") || Fa();
    Fa();
    Ea();
    var Ta = null;
    function Ua(a) {
        var b = [];
        Va(a, function(c) {
            b.push(c)
        });
        return b
    }
    function Va(a, b) {
        function c(k) {
            for (; d < a.length; ) {
                var m = a.charAt(d++)
                  , l = Ta[m];
                if (null != l)
                    return l;
                if (!/^[\s\xa0]*$/.test(m))
                    throw Error("Unknown base64 encoding at char: " + m);
            }
            return k
        }
        Xa();
        for (var d = 0; ; ) {
            var e = c(-1)
              , f = c(0)
              , g = c(64)
              , h = c(64);
            if (64 === h && -1 === e)
                break;
            b(e << 2 | f >> 4);
            64 != g && (b(f << 4 & 240 | g >> 2),
            64 != h && b(g << 6 & 192 | h))
        }
    }
    function Xa() {
        if (!Ta) {
            Ta = {};
            for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), b = ["+/=", "+/", "-_=", "-_.", "-_"], c = 0; 5 > c; c++)
                for (var d = a.concat(b[c].split("")), e = 0; e < d.length; e++) {
                    var f = d[e];
                    void 0 === Ta[f] && (Ta[f] = e)
                }
        }
    }
    ;var Ya = "undefined" != typeof structuredClone;
    var $a = !wa;
    let ab = !wa;
    let bb = 0
      , cb = 0;
    function db(a) {
        var b = 0 > a;
        a = Math.abs(a);
        var c = a >>> 0;
        a = Math.floor((a - c) / 4294967296);
        if (b) {
            b = c;
            c = ~a;
            b ? b = ~b + 1 : c += 1;
            const [d,e] = [b, c];
            a = e;
            c = d
        }
        bb = c >>> 0;
        cb = a >>> 0
    }
    function eb() {
        var a = bb
          , b = cb;
        if (b & 2147483648)
            var c = "" + (BigInt(b | 0) << BigInt(32) | BigInt(a >>> 0));
        else
            b >>>= 0,
            a >>>= 0,
            2097151 >= b ? c = "" + (4294967296 * b + a) : c = "" + (BigInt(b) << BigInt(32) | BigInt(a));
        return c
    }
    ;function fb(a) {
        return Array.prototype.slice.call(a)
    }
    ;var r = Symbol()
      , gb = Symbol();
    function hb(a) {
        const b = a[r] | 0;
        1 !== (b & 1) && (Object.isFrozen(a) && (a = fb(a)),
        a[r] = b | 1)
    }
    function t(a, b, c) {
        return c ? a | b : a & ~b
    }
    function ib() {
        var a = [];
        a[r] |= 1;
        return a
    }
    function jb(a) {
        a[r] |= 32;
        return a
    }
    function kb(a, b) {
        b[r] = (a | 0) & -14591
    }
    function lb(a, b) {
        b[r] = (a | 34) & -14557
    }
    function nb(a) {
        a = a >> 14 & 1023;
        return 0 === a ? 536870912 : a
    }
    ;var ob = {}
      , pb = {};
    function qb(a) {
        return !(!a || "object" !== typeof a || a.mc !== pb)
    }
    function rb(a) {
        return null !== a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
    }
    let sb, tb = !wa;
    function ub(a, b, c) {
        if (!Array.isArray(a) || a.length)
            return !1;
        const d = a[r] | 0;
        if (d & 1)
            return !0;
        if (!(b && (Array.isArray(b) ? b.includes(c) : b.has(c))))
            return !1;
        a[r] = d | 1;
        return !0
    }
    var vb;
    const wb = [];
    wb[r] = 55;
    vb = Object.freeze(wb);
    function xb(a) {
        if (a & 2)
            throw Error();
    }
    class yb {
    }
    class zb {
    }
    Object.freeze(new yb);
    Object.freeze(new zb);
    function Ab(a, b) {
        a.__closure__error__context__984382 || (a.__closure__error__context__984382 = {});
        a.__closure__error__context__984382.severity = b
    }
    ;let Bb;
    function Cb(a) {
        if (Bb)
            throw Error("");
        Bb = a
    }
    function Db(a) {
        if (Bb)
            try {
                Bb(a)
            } catch (b) {
                throw b.cause = a,
                b;
            }
    }
    function Eb() {
        const a = Fb();
        Bb ? p.setTimeout(()=>{
            Db(a)
        }
        , 0) : ra(a)
    }
    function Gb(a) {
        a = Error(a);
        Ab(a, "warning");
        Db(a);
        return a
    }
    function Fb() {
        const a = Error();
        Ab(a, "incident");
        return a
    }
    ;function Hb(a) {
        if (null != a && "boolean" !== typeof a)
            throw Error(`Expected boolean but got ${da(a)}: ${a}`);
        return a
    }
    const Ib = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
    function Jb(a) {
        const b = typeof a;
        return "number" === b ? Number.isFinite(a) : "string" !== b ? !1 : Ib.test(a)
    }
    function Kb(a) {
        null != a && (Number.isFinite(a) || Eb());
        return a
    }
    function Lb(a) {
        return a
    }
    function Mb(a) {
        if ("number" !== typeof a)
            throw Gb("int32");
        if (!Number.isFinite(a))
            throw Gb("int32");
        return a | 0
    }
    function Nb(a) {
        return null == a ? a : Mb(a)
    }
    function Ob(a) {
        if (null == a)
            return a;
        if ("string" === typeof a) {
            if (!a)
                return;
            a = +a
        }
        if ("number" === typeof a)
            return Number.isFinite(a) ? a | 0 : void 0
    }
    function Pb(a) {
        if (null == a)
            return a;
        if ("string" === typeof a) {
            if (!a)
                return;
            a = +a
        }
        if ("number" === typeof a)
            return Number.isFinite(a) ? a >>> 0 : void 0
    }
    function Qb(a) {
        return "-" === a[0] ? 20 > a.length ? !0 : 20 === a.length && -922337 < Number(a.substring(0, 7)) : 19 > a.length ? !0 : 19 === a.length && 922337 > Number(a.substring(0, 6))
    }
    function Rb(a) {
        a = Math.trunc(a);
        if (!Number.isSafeInteger(a)) {
            db(a);
            var b = bb
              , c = cb;
            if (a = c & 2147483648)
                b = ~b + 1 >>> 0,
                c = ~c >>> 0,
                0 == b && (c = c + 1 >>> 0);
            b = 4294967296 * c + (b >>> 0);
            a = a ? -b : b
        }
        return a
    }
    function Sb(a) {
        var b = Math.trunc(Number(a));
        if (Number.isSafeInteger(b))
            return String(b);
        b = a.indexOf(".");
        -1 !== b && (a = a.substring(0, b));
        Qb(a) || (16 > a.length ? db(Number(a)) : (a = BigInt(a),
        bb = Number(a & BigInt(4294967295)) >>> 0,
        cb = Number(a >> BigInt(32) & BigInt(4294967295))),
        a = eb());
        return a
    }
    function Tb(a) {
        if ("string" !== typeof a)
            throw Error();
        return a
    }
    function Ub(a) {
        if (null != a && "string" !== typeof a)
            throw Error();
        return a
    }
    function Vb(a) {
        return null == a || "string" === typeof a ? a : void 0
    }
    function Wb(a, b, c, d) {
        if (null != a && "object" === typeof a && a.ka === ob)
            return a;
        if (!Array.isArray(a))
            return c ? d & 2 ? (a = b[gb]) ? b = a : (a = new b,
            d = a.u,
            d[r] |= 34,
            b = b[gb] = a) : b = new b : b = void 0,
            b;
        let e = c = a[r] | 0;
        0 === e && (e |= d & 32);
        e |= d & 2;
        e !== c && (a[r] = e);
        return new b(a)
    }
    ;let Xb;
    function Yb(a, b) {
        Xb = b;
        a = new a(b);
        Xb = void 0;
        return a
    }
    ;function Zb(a, b) {
        return $b(b)
    }
    function $b(a) {
        switch (typeof a) {
        case "number":
            return isFinite(a) ? a : String(a);
        case "boolean":
            return a ? 1 : 0;
        case "object":
            if (a) {
                if (Array.isArray(a))
                    return tb || !ub(a, void 0, 9999) ? a : void 0;
                if (null != a && a instanceof Uint8Array) {
                    let b = ""
                      , c = 0;
                    const d = a.length - 10240;
                    for (; c < d; )
                        b += String.fromCharCode.apply(null, a.subarray(c, c += 10240));
                    b += String.fromCharCode.apply(null, c ? a.subarray(c) : a);
                    return btoa(b)
                }
            }
        }
        return a
    }
    ;function ac(a, b, c) {
        a = fb(a);
        var d = a.length;
        const e = b & 256 ? a[d - 1] : void 0;
        d += e ? -1 : 0;
        for (b = b & 512 ? 1 : 0; b < d; b++)
            a[b] = c(a[b]);
        if (e) {
            b = a[b] = {};
            for (const f in e)
                Object.prototype.hasOwnProperty.call(e, f) && (b[f] = c(e[f]))
        }
        return a
    }
    function bc(a, b, c, d, e, f) {
        if (null != a) {
            if (Array.isArray(a))
                a = e && 0 == a.length && (a[r] | 0) & 1 ? void 0 : f && (a[r] | 0) & 2 ? a : cc(a, b, c, void 0 !== d, e, f);
            else if (rb(a)) {
                const g = {};
                for (let h in a)
                    Object.prototype.hasOwnProperty.call(a, h) && (g[h] = bc(a[h], b, c, d, e, f));
                a = g
            } else
                a = b(a, d);
            return a
        }
    }
    function cc(a, b, c, d, e, f) {
        const g = d || c ? a[r] | 0 : 0;
        d = d ? !!(g & 32) : void 0;
        a = fb(a);
        for (let h = 0; h < a.length; h++)
            a[h] = bc(a[h], b, c, d, e, f);
        c && c(g, a);
        return a
    }
    function dc(a) {
        return a.ka === ob ? ec(a, cc(a.u, dc, void 0, void 0, !1, !1), !0) : null != a && a instanceof Uint8Array ? new Uint8Array(a) : a
    }
    function fc(a) {
        return a.ka === ob ? a.toJSON() : $b(a)
    }
    var gc = Ya ? structuredClone : a=>cc(a, dc, void 0, void 0, !1, !1);
    function hc(a, b, c=lb) {
        if (null != a) {
            if (a instanceof Uint8Array)
                return b ? a : new Uint8Array(a);
            if (Array.isArray(a)) {
                var d = a[r] | 0;
                if (d & 2)
                    return a;
                b && (b = 0 === d || !!(d & 32) && !(d & 64 || !(d & 16)));
                return b ? (a[r] = (d | 34) & -12293,
                a) : cc(a, hc, d & 4 ? lb : c, !0, !1, !0)
            }
            a.ka === ob && (c = a.u,
            d = c[r],
            a = d & 2 ? a : Yb(a.constructor, ic(c, d, !0)));
            return a
        }
    }
    function ic(a, b, c) {
        const d = c || b & 2 ? lb : kb
          , e = !!(b & 32);
        a = ac(a, b, f=>hc(f, e, d));
        a[r] = a[r] | 32 | (c ? 2 : 0);
        return a
    }
    function jc(a) {
        const b = a.u
          , c = b[r];
        return c & 2 ? Yb(a.constructor, ic(b, c, !1)) : a
    }
    ;function u(a, b) {
        a = a.u;
        return kc(a, a[r], b)
    }
    function kc(a, b, c, d) {
        if (-1 === c)
            return null;
        if (c >= nb(b)) {
            if (b & 256)
                return a[a.length - 1][c]
        } else {
            var e = a.length;
            if (d && b & 256 && (d = a[e - 1][c],
            null != d))
                return d;
            b = c + (+!!(b & 512) - 1);
            if (b < e)
                return a[b]
        }
    }
    function y(a, b, c) {
        const d = a.u;
        let e = d[r];
        xb(e);
        B(d, e, b, c);
        return a
    }
    function B(a, b, c, d, e) {
        var f = nb(b);
        if (c >= f || e) {
            e = b;
            if (b & 256)
                f = a[a.length - 1];
            else {
                if (null == d)
                    return e;
                f = a[f + (+!!(b & 512) - 1)] = {};
                e |= 256
            }
            f[c] = d;
            e !== b && (a[r] = e);
            return e
        }
        a[c + (+!!(b & 512) - 1)] = d;
        b & 256 && (a = a[a.length - 1],
        c in a && delete a[c]);
        return b
    }
    function lc(a, b, c) {
        return void 0 !== mc(a, b, c, !1)
    }
    function nc(a, b, c, d) {
        var e = b & 2;
        let f = kc(a, b, c);
        Array.isArray(f) || (f = vb);
        const g = !(d & 2);
        d = !(d & 1);
        const h = !!(b & 32);
        let k = f[r] | 0;
        0 !== k || !h || e || g ? k & 1 || (k |= 1,
        f[r] = k) : (k |= 33,
        f[r] = k);
        e ? (a = !1,
        k & 2 || (f[r] |= 34,
        a = !!(4 & k)),
        (d || a) && Object.freeze(f)) : (e = !!(2 & k) || !!(2048 & k),
        d && e ? (f = fb(f),
        d = 1,
        h && !g && (d |= 32),
        f[r] = d,
        B(a, b, c, f)) : g && k & 32 && !e && (a = f,
        a[r] &= -33));
        return f
    }
    function oc(a, b) {
        a = u(a, b);
        return null == a || "boolean" === typeof a ? a : "number" === typeof a ? !!a : void 0
    }
    function pc(a, b, c) {
        a = a.u;
        let d = a[r];
        const e = 2 & d ? 1 : 2;
        let f = nc(a, d, b, 1);
        d = a[r];
        let g = f[r] | 0
          , h = g
          , k = !!(2 & g);
        var m = !!(4 & g);
        const l = k && m;
        if (!(4 & g)) {
            if (m || Object.isFrozen(f))
                f = fb(f),
                h = 0,
                g = qc(g, d, !1),
                k = !!(2 & g),
                d = B(a, d, b, f);
            let n = m = 0;
            for (; m < f.length; m++) {
                const x = c(f[m]);
                null != x && (f[n++] = x)
            }
            n < m && (f.length = n);
            c = t(g, 4096, !1);
            g = c = t(c, 8192, !1);
            g = t(g, 20, !0)
        }
        l || ((c = 1 === e) && (g = t(g, 2, !0)),
        g !== h && (f[r] = g),
        (c || k) && Object.freeze(f));
        2 === e && k && (f = fb(f),
        g = qc(g, d, !1),
        f[r] = g,
        B(a, d, b, f));
        return f
    }
    function rc(a, b, c, d) {
        const e = a.u;
        let f = e[r];
        xb(f);
        if (null == c)
            return B(e, f, b),
            a;
        let g = c[r] | 0
          , h = g;
        var k = !!(2 & g) || Object.isFrozen(c);
        const m = !k && !1;
        if (!(4 & g))
            for (g = 21,
            k && (c = fb(c),
            h = 0,
            g = qc(g, f, !0)),
            k = 0; k < c.length; k++)
                c[k] = d(c[k]);
        m && (c = fb(c),
        h = 0,
        g = qc(g, f, !0));
        g !== h && (c[r] = g);
        B(e, f, b, c);
        return a
    }
    function C(a, b, c, d) {
        const e = a.u;
        let f = e[r];
        xb(f);
        B(e, f, b, ("0" === d ? 0 === Number(c) : c === d) ? void 0 : c);
        return a
    }
    function sc(a, b, c, d) {
        const e = a.u;
        let f = e[r];
        xb(f);
        (c = tc(e, f, c)) && c !== b && null != d && (f = B(e, f, c));
        B(e, f, b, d);
        return a
    }
    function uc(a, b, c) {
        a = a.u;
        return tc(a, a[r], b) === c ? c : -1
    }
    function vc(a, b) {
        a = a.u;
        return tc(a, a[r], b)
    }
    function tc(a, b, c) {
        let d = 0;
        for (let e = 0; e < c.length; e++) {
            const f = c[e];
            null != kc(a, b, f) && (0 !== d && (b = B(a, b, d)),
            d = f)
        }
        return d
    }
    function wc(a) {
        var b = xc;
        a = a.u;
        let c = a[r];
        xb(c);
        const d = kc(a, c, 3);
        b = jc(Wb(d, b, !0, c));
        d !== b && B(a, c, 3, b);
        return b
    }
    function mc(a, b, c, d) {
        a = a.u;
        let e = a[r];
        const f = kc(a, e, c, d);
        b = Wb(f, b, !1, e);
        b !== f && null != b && B(a, e, c, b, d);
        return b
    }
    function E(a, b, c) {
        b = mc(a, b, c, !1);
        if (null == b)
            return b;
        a = a.u;
        let d = a[r];
        if (!(d & 2)) {
            const e = jc(b);
            e !== b && (b = e,
            B(a, d, c, b, !1))
        }
        return b
    }
    function G(a, b, c) {
        a = a.u;
        var d = a[r]
          , e = !!(2 & d)
          , f = e ? 1 : 2;
        const g = 1 === f;
        f = 2 === f;
        var h = !!(2 & d) && f;
        let k = nc(a, d, c, 3);
        d = a[r];
        var m = k[r] | 0
          , l = !!(2 & m);
        const n = !!(4 & m)
          , x = !!(32 & m);
        let v = l && n || !!(2048 & m);
        if (!n) {
            var w = k
              , z = d;
            const A = !!(2 & m);
            A && (z = t(z, 2, !0));
            let D = !A
              , J = !0
              , F = 0
              , Ka = 0;
            for (; F < w.length; F++) {
                const Wa = Wb(w[F], b, !1, z);
                if (Wa instanceof b) {
                    if (!A) {
                        const mb = !!((Wa.u[r] | 0) & 2);
                        D && (D = !mb);
                        J && (J = mb)
                    }
                    w[Ka++] = Wa
                }
            }
            Ka < F && (w.length = Ka);
            m = t(m, 4, !0);
            m = t(m, 16, J);
            m = t(m, 8, D);
            w[r] = m;
            l && !h && (Object.freeze(k),
            v = !0)
        }
        b = m;
        h = !!(8 & m) || g && !k.length;
        if (!e && !h) {
            v && (k = fb(k),
            v = !1,
            b = 0,
            m = qc(m, d, !1),
            d = B(a, d, c, k));
            e = k;
            h = m;
            for (l = 0; l < e.length; l++)
                w = e[l],
                m = jc(w),
                w !== m && (e[l] = m);
            h = t(h, 8, !0);
            m = h = t(h, 16, !e.length)
        }
        v || (g ? m = t(m, !k.length || 16 & m && (!n || x) ? 2 : 2048, !0) : m = t(m, 32, !1),
        m !== b && (k[r] = m),
        g && (Object.freeze(k),
        v = !0));
        f && v && (k = fb(k),
        m = qc(m, d, !1),
        k[r] = m,
        B(a, d, c, k));
        return k
    }
    function yc(a, b, c) {
        null == c && (c = void 0);
        return y(a, b, c)
    }
    function zc(a, b, c, d) {
        null == d && (d = void 0);
        return sc(a, b, c, d)
    }
    function Ac(a, b, c) {
        const d = a.u;
        let e = d[r];
        xb(e);
        if (null == c)
            return B(d, e, b),
            a;
        let f = c[r] | 0
          , g = f;
        const h = !!(2 & f) || !!(2048 & f)
          , k = h || Object.isFrozen(c);
        let m = !0
          , l = !0;
        for (let x = 0; x < c.length; x++) {
            var n = c[x];
            h || (n = !!((n.u[r] | 0) & 2),
            m && (m = !n),
            l && (l = n))
        }
        h || (f = t(f, 5, !0),
        f = t(f, 8, m),
        f = t(f, 16, l));
        k && f !== g && (c = fb(c),
        g = 0,
        f = qc(f, e, !0));
        f !== g && (c[r] = f);
        B(d, e, b, c);
        return a
    }
    function qc(a, b, c) {
        a = t(a, 2, !!(2 & b));
        a = t(a, 32, !!(32 & b) && c);
        return a = t(a, 2048, !1)
    }
    function H(a, b) {
        return Ob(u(a, b))
    }
    function Bc(a, b) {
        a = u(a, b);
        var c;
        null == a ? c = a : Jb(a) ? "number" === typeof a ? c = Rb(a) : c = Sb(a) : c = void 0;
        return c
    }
    function I(a, b) {
        return Vb(u(a, b))
    }
    function Cc(a, b) {
        return u(a, b)
    }
    function Dc(a) {
        return a ?? 0
    }
    function K(a, b, c=!1) {
        return oc(a, b) ?? c
    }
    function Ec(a, b) {
        return Dc(Bc(a, b))
    }
    function Fc(a, b) {
        a = a.u;
        let c = a[r];
        const d = kc(a, c, b);
        var e = null == d || "number" === typeof d ? d : "NaN" === d || "Infinity" === d || "-Infinity" === d ? Number(d) : void 0;
        null != e && e !== d && B(a, c, b, e);
        return e ?? 0
    }
    function L(a, b) {
        return I(a, b) ?? ""
    }
    function M(a, b) {
        return u(a, b) ?? 0
    }
    function Gc(a, b, c, d) {
        return E(a, b, uc(a, d, c))
    }
    function Hc(a, b, c) {
        if (null != c) {
            var d = !!d;
            if (!Jb(c))
                throw Gb("int64");
            "string" === typeof c ? c = Sb(c) : d ? (c = Math.trunc(c),
            Number.isSafeInteger(c) ? c = String(c) : (d = String(c),
            Qb(d) ? c = d : (db(c),
            c = eb()))) : c = Rb(c)
        }
        return C(a, b, c, "0")
    }
    function Ic(a, b) {
        var c = performance.now();
        if (null != c && "number" !== typeof c)
            throw Error(`Value of float/double field must be a number, found ${typeof c}: ${c}`);
        C(a, b, c, 0)
    }
    function Jc(a, b, c) {
        return C(a, b, Ub(c), "")
    }
    ;var N = class {
        constructor(a) {
            a: {
                null == a && (a = Xb);
                Xb = void 0;
                if (null == a) {
                    var b = 96;
                    a = []
                } else {
                    if (!Array.isArray(a))
                        throw Error();
                    b = a[r] | 0;
                    if (b & 64)
                        break a;
                    b |= 64;
                    var c = a.length;
                    if (c && (--c,
                    rb(a[c]))) {
                        b |= 256;
                        c -= +!!(b & 512) - 1;
                        if (1024 <= c)
                            throw Error();
                        b = b & -16760833 | (c & 1023) << 14
                    }
                }
                a[r] = b
            }
            this.u = a
        }
        toJSON() {
            if (sb)
                var a = ec(this, this.u, !1);
            else
                a = cc(this.u, fc, void 0, void 0, !1, !1),
                a = ec(this, a, !0);
            return a
        }
    }
    ;
    N.prototype.ka = ob;
    function ec(a, b, c) {
        const d = a.constructor.s;
        var e = (c ? a.u : b)[r]
          , f = nb(e)
          , g = !1;
        if (d && tb) {
            if (!c) {
                b = fb(b);
                var h;
                if (b.length && rb(h = b[b.length - 1]))
                    for (g = 0; g < d.length; g++)
                        if (d[g] >= f) {
                            Object.assign(b[b.length - 1] = {}, h);
                            break
                        }
                g = !0
            }
            f = b;
            c = !c;
            h = a.u[r];
            a = nb(h);
            h = +!!(h & 512) - 1;
            var k;
            for (let D = 0; D < d.length; D++) {
                var m = d[D];
                if (m < a) {
                    m += h;
                    var l = f[m];
                    null == l ? f[m] = c ? vb : ib() : c && l !== vb && hb(l)
                } else {
                    if (!k) {
                        var n = void 0;
                        f.length && rb(n = f[f.length - 1]) ? k = n : f.push(k = {})
                    }
                    l = k[m];
                    null == k[m] ? k[m] = c ? vb : ib() : c && l !== vb && hb(l)
                }
            }
        }
        k = b.length;
        if (!k)
            return b;
        let x, v;
        if (rb(n = b[k - 1])) {
            a: {
                var w = n;
                f = {};
                c = !1;
                for (var z in w)
                    if (Object.prototype.hasOwnProperty.call(w, z)) {
                        a = w[z];
                        if (Array.isArray(a)) {
                            h = a;
                            if (!ab && ub(a, d, +z) || !$a && qb(a) && 0 === a.size)
                                a = null;
                            a != h && (c = !0)
                        }
                        null != a ? f[z] = a : c = !0
                    }
                if (c) {
                    for (let D in f) {
                        w = f;
                        break a
                    }
                    w = null
                }
            }
            w != n && (x = !0);
            k--
        }
        for (e = +!!(e & 512) - 1; 0 < k; k--) {
            z = k - 1;
            n = b[z];
            if (!(null == n || !ab && ub(n, d, z - e) || !$a && qb(n) && 0 === n.size))
                break;
            v = !0
        }
        if (!x && !v)
            return b;
        var A;
        g ? A = b : A = Array.prototype.slice.call(b, 0, k);
        b = A;
        g && (b.length = k);
        w && b.push(w);
        return b
    }
    function Kc(a, b) {
        if (null == b)
            return new a;
        if (!Array.isArray(b))
            throw Error("must be an array");
        if (Object.isFrozen(b) || Object.isSealed(b) || !Object.isExtensible(b))
            throw Error("arrays passed to jspb constructors must be mutable");
        b[r] |= 128;
        return Yb(a, jb(b))
    }
    ;function Lc(a, b) {
        const c = Mc;
        Mc = void 0;
        if (!b(a))
            throw b = c ? c() + "\n" : "",
            Error(b + String(a));
    }
    const Nc = a=>null !== a && void 0 !== a;
    let Mc = void 0;
    function Oc(a) {
        return b=>{
            if (null == b || "" == b)
                b = new a;
            else {
                b = JSON.parse(b);
                if (!Array.isArray(b))
                    throw Error(void 0);
                b = Yb(a, jb(b))
            }
            return b
        }
    }
    ;var Pc = class extends N {
    }
    ;
    var Qc = class extends N {
    }
    ;
    Qc.s = [2, 3, 4];
    var O = class {
        constructor(a, b=!1) {
            this.g = a;
            this.defaultValue = b
        }
    }
      , Rc = class {
        constructor(a, b=0) {
            this.g = a;
            this.defaultValue = b
        }
    }
      , Sc = class {
        constructor(a) {
            this.g = a;
            this.defaultValue = ""
        }
    }
      , Tc = class {
        constructor(a, b=[]) {
            this.g = a;
            this.defaultValue = b
        }
    }
    ;
    var Uc = new O(203);
    function Vc(a) {
        return function() {
            return !a.apply(this, arguments)
        }
    }
    function Wc(a) {
        let b = !1, c;
        return function() {
            b || (c = a(),
            b = !0);
            return c
        }
    }
    function Xc(a) {
        let b = a;
        return function() {
            if (b) {
                const c = b;
                b = null;
                c()
            }
        }
    }
    ;function Yc(a, b, c) {
        a.addEventListener && a.addEventListener(b, c, !1)
    }
    function Zc(a, b, c) {
        return a.removeEventListener ? (a.removeEventListener(b, c, !1),
        !0) : !1
    }
    ;var P = a=>{
        var b = "ya";
        if (a.ya && a.hasOwnProperty(b))
            return a.ya;
        b = new a;
        return a.ya = b
    }
    ;
    var $c = class {
        constructor() {
            const a = {};
            this.i = (b,c)=>null != a[b] ? a[b] : c;
            this.j = (b,c)=>null != a[b] ? a[b] : c;
            this.g = (b,c)=>null != a[b] ? a[b] : c;
            this.h = (b,c)=>null != a[b] ? a[b] : c;
            this.m = ()=>{}
        }
    }
    ;
    function Q(a) {
        return P($c).i(a.g, a.defaultValue)
    }
    function ad(a) {
        return P($c).j(a.g, a.defaultValue)
    }
    ;function bd(a, b) {
        const c = {};
        for (const d in a)
            b.call(void 0, a[d], d, a) && (c[d] = a[d]);
        return c
    }
    function cd(a, b) {
        for (const c in a)
            if (b.call(void 0, a[c], c, a))
                return !0;
        return !1
    }
    function dd(a) {
        const b = [];
        let c = 0;
        for (const d in a)
            b[c++] = a[d];
        return b
    }
    function ed(a) {
        const b = {};
        for (const c in a)
            b[c] = a[c];
        return b
    }
    ;var fd;
    var gd = class {
        constructor(a) {
            this.h = a
        }
        toString() {
            return this.h + ""
        }
    }
    ;
    function hd(a, b) {
        a = id.exec(jd(a).toString());
        var c = a[3] || "";
        return kd(a[1] + ld("?", a[2] || "", b) + ld("#", c))
    }
    function jd(a) {
        return a instanceof gd && a.constructor === gd ? a.h : "type_error:TrustedResourceUrl"
    }
    var id = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/
      , md = {};
    function kd(a) {
        if (void 0 === fd) {
            var b = null;
            var c = p.trustedTypes;
            if (c && c.createPolicy) {
                try {
                    b = c.createPolicy("goog#html", {
                        createHTML: pa,
                        createScript: pa,
                        createScriptURL: pa
                    })
                } catch (d) {
                    p.console && p.console.error(d.message)
                }
                fd = b
            } else
                fd = b
        }
        a = (b = fd) ? b.createScriptURL(a) : a;
        return new gd(a,md)
    }
    function ld(a, b, c) {
        if (null == c)
            return b;
        if ("string" === typeof c)
            return c ? a + encodeURIComponent(c) : "";
        for (var d in c)
            if (Object.prototype.hasOwnProperty.call(c, d)) {
                var e = c[d];
                e = Array.isArray(e) ? e : [e];
                for (var f = 0; f < e.length; f++) {
                    var g = e[f];
                    null != g && (b || (b = a),
                    b += (b.length > a.length ? "&" : "") + encodeURIComponent(d) + "=" + encodeURIComponent(String(g)))
                }
            }
        return b
    }
    ;var nd = class {
        constructor(a) {
            this.g = a
        }
        toString() {
            return this.g.toString()
        }
    }
    ;
    function od(a) {
        return String(a).replace(/\-([a-z])/g, function(b, c) {
            return c.toUpperCase()
        })
    }
    ;function pd(a, b, c) {
        function d(h) {
            h && b.appendChild("string" === typeof h ? a.createTextNode(h) : h)
        }
        for (var e = 1; e < c.length; e++) {
            var f = c[e];
            if (!ea(f) || fa(f) && 0 < f.nodeType)
                d(f);
            else {
                a: {
                    if (f && "number" == typeof f.length) {
                        if (fa(f)) {
                            var g = "function" == typeof f.item || "string" == typeof f.item;
                            break a
                        }
                        if ("function" === typeof f) {
                            g = "function" == typeof f.item;
                            break a
                        }
                    }
                    g = !1
                }
                Ja(g ? Qa(f) : f, d)
            }
        }
    }
    function qd(a) {
        this.g = a || p.document || document
    }
    qd.prototype.getElementsByTagName = function(a, b) {
        return (b || this.g).getElementsByTagName(String(a))
    }
    ;
    qd.prototype.createElement = function(a) {
        var b = this.g;
        a = String(a);
        "application/xhtml+xml" === b.contentType && (a = a.toLowerCase());
        return b.createElement(a)
    }
    ;
    qd.prototype.createTextNode = function(a) {
        return this.g.createTextNode(String(a))
    }
    ;
    qd.prototype.append = function(a, b) {
        pd(9 == a.nodeType ? a : a.ownerDocument || a.document, a, arguments)
    }
    ;
    qd.prototype.contains = function(a, b) {
        if (!a || !b)
            return !1;
        if (a.contains && 1 == b.nodeType)
            return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)
            return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b; )
            b = b.parentNode;
        return b == a
    }
    ;
    function rd() {
        return va && ya ? ya.mobile : !sd() && (q("iPod") || q("iPhone") || q("Android") || q("IEMobile"))
    }
    function sd() {
        return va && ya ? !ya.mobile && (q("iPad") || q("Android") || q("Silk")) : q("iPad") || q("Android") && !q("Mobile") || q("Silk")
    }
    ;var td = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$")
      , ud = /#|$/;
    function vd(a, b) {
        var c = a.search(ud);
        a: {
            var d = 0;
            for (var e = b.length; 0 <= (d = a.indexOf(b, d)) && d < c; ) {
                var f = a.charCodeAt(d - 1);
                if (38 == f || 63 == f)
                    if (f = a.charCodeAt(d + e),
                    !f || 61 == f || 38 == f || 35 == f)
                        break a;
                d += e + 1
            }
            d = -1
        }
        if (0 > d)
            return null;
        e = a.indexOf("&", d);
        if (0 > e || e > c)
            e = c;
        d += b.length + 1;
        return decodeURIComponent(a.slice(d, -1 !== e ? e : 0).replace(/\+/g, " "))
    }
    ;function wd(a, b=`unexpected value ${a}!`) {
        throw Error(b);
    }
    ;/* 
 
 SPDX-License-Identifier: Apache-2.0 
*/
    const xd = "alternate author bookmark canonical cite help icon license next prefetch dns-prefetch prerender preconnect preload prev search subresource".split(" ");
    function yd(a) {
        try {
            var b;
            if (b = !!a && null != a.location.href)
                a: {
                    try {
                        Ra(a.foo);
                        b = !0;
                        break a
                    } catch (c) {}
                    b = !1
                }
            return b
        } catch {
            return !1
        }
    }
    function zd(a) {
        return yd(a.top) ? a.top : null
    }
    function Ad(a, b) {
        const c = Bd("SCRIPT", a);
        c.src = jd(b);
        (void 0)?.nc || (b = (b = (c.ownerDocument && c.ownerDocument.defaultView || window).document.querySelector?.("script[nonce]")) ? b.nonce || b.getAttribute("nonce") || "" : "") && c.setAttribute("nonce", b);
        return (a = a.getElementsByTagName("script")[0]) && a.parentNode ? (a.parentNode.insertBefore(c, a),
        c) : null
    }
    function Cd(a, b) {
        return b.getComputedStyle ? b.getComputedStyle(a, null) : a.currentStyle
    }
    function Dd() {
        if (!globalThis.crypto)
            return Math.random();
        try {
            const a = new Uint32Array(1);
            globalThis.crypto.getRandomValues(a);
            return a[0] / 65536 / 65536
        } catch {
            return Math.random()
        }
    }
    function Ed(a, b) {
        if (a)
            for (const c in a)
                Object.prototype.hasOwnProperty.call(a, c) && b(a[c], c, a)
    }
    function Fd(a) {
        const b = a.length;
        if (0 == b)
            return 0;
        let c = 305419896;
        for (let d = 0; d < b; d++)
            c ^= (c << 5) + (c >> 2) + a.charCodeAt(d) & 4294967295;
        return 0 < c ? c : 4294967296 + c
    }
    var Gd = /^([0-9.]+)px$/
      , Hd = /^(-?[0-9.]{1,30})$/;
    function Id(a) {
        if (!Hd.test(a))
            return null;
        a = Number(a);
        return isNaN(a) ? null : a
    }
    function R(a) {
        return (a = Gd.exec(a)) ? +a[1] : null
    }
    var Jd = (a,b)=>{
        for (let e = 0; 50 > e; ++e) {
            try {
                var c = !(!a.frames || !a.frames[b])
            } catch {
                c = !1
            }
            if (c)
                return a;
            a: {
                try {
                    const f = a.parent;
                    if (f && f != a) {
                        var d = f;
                        break a
                    }
                } catch {}
                d = null
            }
            if (!(a = d))
                break
        }
        return null
    }
      , Kd = Wc(()=>rd() ? 2 : sd() ? 1 : 0)
      , Ld = a=>{
        Ed({
            display: "none"
        }, (b,c)=>{
            a.style.setProperty(c, b, "important")
        }
        )
    }
    ;
    let Md = [];
    const Nd = ()=>{
        const a = Md;
        Md = [];
        for (const b of a)
            try {
                b()
            } catch {}
    }
    ;
    function Od() {
        var a = P($c).h(Pd.g, Pd.defaultValue)
          , b = S.document;
        if (a.length && b.head)
            for (const c of a)
                c && b.head && (a = Bd("META"),
                b.head.appendChild(a),
                a.httpEquiv = "origin-trial",
                a.content = c)
    }
    var Qd = ()=>{
        var a = Math.random;
        return Math.floor(a() * 2 ** 52)
    }
      , Rd = a=>{
        if ("number" !== typeof a.goog_pvsid)
            try {
                Object.defineProperty(a, "goog_pvsid", {
                    value: Qd(),
                    configurable: !1
                })
            } catch (b) {}
        return Number(a.goog_pvsid) || -1
    }
      , Td = a=>{
        var b = Sd;
        "complete" === b.readyState || "interactive" === b.readyState ? (Md.push(a),
        1 == Md.length && (window.Promise ? Promise.resolve().then(Nd) : window.setImmediate ? setImmediate(Nd) : setTimeout(Nd, 0))) : b.addEventListener("DOMContentLoaded", a)
    }
    ;
    function Bd(a, b=document) {
        return b.createElement(String(a).toLowerCase())
    }
    ;function Ud(a, b, c=null, d=!1, e=!1) {
        Vd(a, b, c, d, e)
    }
    function Vd(a, b, c, d, e=!1) {
        a.google_image_requests || (a.google_image_requests = []);
        const f = Bd("IMG", a.document);
        if (c || d) {
            const g = h=>{
                c && c(h);
                if (d) {
                    h = a.google_image_requests;
                    const k = Ia(h, f);
                    0 <= k && Array.prototype.splice.call(h, k, 1)
                }
                Zc(f, "load", g);
                Zc(f, "error", g)
            }
            ;
            Yc(f, "load", g);
            Yc(f, "error", g)
        }
        e && (f.attributionSrc = "");
        f.src = b;
        a.google_image_requests.push(f)
    }
    var Xd = a=>{
        let b = "https://pagead2.googlesyndication.com/pagead/gen_204?id=tcfe";
        Ed(a, (c,d)=>{
            if (c || 0 === c)
                b += `&${d}=${encodeURIComponent("" + c)}`
        }
        );
        Wd(b)
    }
      , Wd = a=>{
        var b = window;
        b.fetch ? b.fetch(a, {
            keepalive: !0,
            credentials: "include",
            redirect: "follow",
            method: "get",
            mode: "no-cors"
        }) : Ud(b, a, void 0, !1, !1)
    }
    ;
    let Yd = null;
    var Sd = document
      , S = window;
    function Zd(a) {
        this.g = a || {
            cookie: ""
        }
    }
    Zd.prototype.set = function(a, b, c) {
        let d, e, f, g = !1, h;
        "object" === typeof c && (h = c.oc,
        g = c.qc || !1,
        f = c.domain || void 0,
        e = c.path || void 0,
        d = c.xb);
        if (/[;=\s]/.test(a))
            throw Error('Invalid cookie name "' + a + '"');
        if (/[;\r\n]/.test(b))
            throw Error('Invalid cookie value "' + b + '"');
        void 0 === d && (d = -1);
        this.g.cookie = a + "=" + b + (f ? ";domain=" + f : "") + (e ? ";path=" + e : "") + (0 > d ? "" : 0 == d ? ";expires=" + (new Date(1970,1,1)).toUTCString() : ";expires=" + (new Date(Date.now() + 1E3 * d)).toUTCString()) + (g ? ";secure" : "") + (null != h ? ";samesite=" + h : "")
    }
    ;
    Zd.prototype.get = function(a, b) {
        const c = a + "="
          , d = (this.g.cookie || "").split(";");
        for (let e = 0, f; e < d.length; e++) {
            f = sa(d[e]);
            if (0 == f.lastIndexOf(c, 0))
                return f.slice(c.length);
            if (f == a)
                return ""
        }
        return b
    }
    ;
    Zd.prototype.isEmpty = function() {
        return !this.g.cookie
    }
    ;
    Zd.prototype.clear = function() {
        var a = (this.g.cookie || "").split(";");
        const b = [];
        var c = [];
        let d, e;
        for (let f = 0; f < a.length; f++)
            e = sa(a[f]),
            d = e.indexOf("="),
            -1 == d ? (b.push(""),
            c.push(e)) : (b.push(e.substring(0, d)),
            c.push(e.substring(d + 1)));
        for (c = b.length - 1; 0 <= c; c--)
            a = b[c],
            this.get(a),
            this.set(a, "", {
                xb: 0,
                path: void 0,
                domain: void 0
            })
    }
    ;
    function $d(a, b=window) {
        if (K(a, 5))
            try {
                return b.localStorage
            } catch {}
        return null
    }
    function ae(a=window) {
        try {
            return a.localStorage
        } catch {
            return null
        }
    }
    ;function be(a, ...b) {
        if (0 === b.length)
            return kd(a[0]);
        let c = a[0];
        for (let d = 0; d < b.length; d++)
            c += encodeURIComponent(b[d]) + a[d + 1];
        return kd(c)
    }
    ;let ce = null;
    var de = (a,b=[])=>{
        let c = !1;
        p.google_logging_queue || (c = !0,
        p.google_logging_queue = []);
        p.google_logging_queue.push([a, b]);
        if (a = c) {
            if (null == ce) {
                ce = !1;
                try {
                    const d = zd(p);
                    d && -1 !== d.location.hash.indexOf("google_logging") && (ce = !0);
                    ae(p)?.getItem("google_logging") && (ce = !0)
                } catch (d) {}
            }
            a = ce
        }
        a && Ad(p.document, be`https://pagead2.googlesyndication.com/pagead/js/logging_library.js`)
    }
    ;
    function ee(a=p) {
        let b = a.context || a.AMP_CONTEXT_DATA;
        if (!b)
            try {
                b = a.parent.context || a.parent.AMP_CONTEXT_DATA
            } catch {}
        return b?.pageViewId && b?.canonicalUrl ? b : null
    }
    function fe(a=ee()) {
        return a ? yd(a.master) ? a.master : null : null
    }
    ;var ge = a=>{
        a = fe(ee(a)) || a;
        a.google_unique_id = (a.google_unique_id || 0) + 1;
        return a.google_unique_id
    }
      , he = a=>{
        a = a.google_unique_id;
        return "number" === typeof a ? a : 0
    }
      , ie = ()=>{
        if (!S)
            return !1;
        try {
            return !(!S.navigator.standalone && !S.top.navigator.standalone)
        } catch (a) {
            return !1
        }
    }
      , je = a=>{
        if (!a)
            return "";
        a = a.toLowerCase();
        "ca-" != a.substring(0, 3) && (a = "ca-" + a);
        return a
    }
    ;
    class ke {
        constructor(a, b) {
            this.error = a;
            this.context = b.context;
            this.msg = b.message || "";
            this.id = b.id || "jserror";
            this.meta = {}
        }
    }
    var le = a=>!!(a.error && a.meta && a.id);
    const me = RegExp("^https?://(\\w|-)+\\.cdn\\.ampproject\\.(net|org)(\\?|/|$)");
    var ne = class {
        constructor(a, b) {
            this.g = a;
            this.h = b
        }
    }
      , oe = class {
        constructor(a, b, c) {
            this.url = a;
            this.l = b;
            this.Wa = !!c;
            this.depth = null
        }
    }
    ;
    let pe = null;
    function qe() {
        if (null === pe) {
            pe = "";
            try {
                let a = "";
                try {
                    a = p.top.location.hash
                } catch (b) {
                    a = p.location.hash
                }
                if (a) {
                    const b = a.match(/\bdeid=([\d,]+)/);
                    pe = b ? b[1] : ""
                }
            } catch (a) {}
        }
        return pe
    }
    ;function re() {
        const a = p.performance;
        return a && a.now && a.timing ? Math.floor(a.now() + a.timing.navigationStart) : Date.now()
    }
    function se() {
        const a = p.performance;
        return a && a.now ? a.now() : null
    }
    ;var te = class {
        constructor(a, b) {
            var c = se() || re();
            this.label = a;
            this.type = b;
            this.value = c;
            this.duration = 0;
            this.taskId = this.slotId = void 0;
            this.uniqueId = Math.random()
        }
    }
    ;
    const ue = p.performance
      , ve = !!(ue && ue.mark && ue.measure && ue.clearMarks)
      , we = Wc(()=>{
        var a;
        if (a = ve)
            a = qe(),
            a = !!a.indexOf && 0 <= a.indexOf("1337");
        return a
    }
    );
    function xe(a) {
        a && ue && we() && (ue.clearMarks(`goog_ ${a.label}_ ${a.uniqueId}_start`),
        ue.clearMarks(`goog_ ${a.label}_ ${a.uniqueId}_end`))
    }
    function ye(a) {
        a.g = !1;
        a.h != a.i.google_js_reporting_queue && (we() && Ja(a.h, xe),
        a.h.length = 0)
    }
    class ze {
        constructor(a) {
            this.h = [];
            this.i = a || p;
            let b = null;
            a && (a.google_js_reporting_queue = a.google_js_reporting_queue || [],
            this.h = a.google_js_reporting_queue,
            b = a.google_measure_js_timing);
            this.g = we() || (null != b ? b : 1 > Math.random())
        }
        start(a, b) {
            if (!this.g)
                return null;
            a = new te(a,b);
            b = `goog_ ${a.label}_ ${a.uniqueId}_start`;
            ue && we() && ue.mark(b);
            return a
        }
        end(a) {
            if (this.g && "number" === typeof a.value) {
                a.duration = (se() || re()) - a.value;
                var b = `goog_ ${a.label}_ ${a.uniqueId}_end`;
                ue && we() && ue.mark(b);
                !this.g || 2048 < this.h.length || this.h.push(a)
            }
        }
    }
    ;function Ae(a, b) {
        const c = {};
        c[a] = b;
        return [c]
    }
    function Be(a, b, c, d, e) {
        const f = [];
        Ed(a, function(g, h) {
            (g = Ce(g, b, c, d, e)) && f.push(h + "=" + g)
        });
        return f.join(b)
    }
    function Ce(a, b, c, d, e) {
        if (null == a)
            return "";
        b = b || "&";
        c = c || ",$";
        "string" == typeof c && (c = c.split(""));
        if (a instanceof Array) {
            if (d = d || 0,
            d < c.length) {
                const f = [];
                for (let g = 0; g < a.length; g++)
                    f.push(Ce(a[g], b, c, d + 1, e));
                return f.join(c[d])
            }
        } else if ("object" == typeof a)
            return e = e || 0,
            2 > e ? encodeURIComponent(Be(a, b, c, d, e + 1)) : "...";
        return encodeURIComponent(String(a))
    }
    function De(a) {
        let b = 1;
        for (const c in a.h)
            b = c.length > b ? c.length : b;
        return 3997 - b - a.i.length - 1
    }
    function Ee(a, b) {
        let c = "https://pagead2.googlesyndication.com" + b
          , d = De(a) - b.length;
        if (0 > d)
            return "";
        a.g.sort(function(f, g) {
            return f - g
        });
        b = null;
        let e = "";
        for (let f = 0; f < a.g.length; f++) {
            const g = a.g[f]
              , h = a.h[g];
            for (let k = 0; k < h.length; k++) {
                if (!d) {
                    b = null == b ? g : b;
                    break
                }
                let m = Be(h[k], a.i, ",$");
                if (m) {
                    m = e + m;
                    if (d >= m.length) {
                        d -= m.length;
                        c += m;
                        e = a.i;
                        break
                    }
                    b = null == b ? g : b
                }
            }
        }
        a = "";
        null != b && (a = e + "trn=" + b);
        return c + a
    }
    class Fe {
        constructor() {
            this.i = "&";
            this.h = {};
            this.j = 0;
            this.g = []
        }
    }
    ;function Ge(a) {
        let b = a.toString();
        a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
        a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
        if (a.stack) {
            a = a.stack;
            var c = b;
            try {
                -1 == a.indexOf(c) && (a = c + "\n" + a);
                let d;
                for (; a != d; )
                    d = a,
                    a = a.replace(RegExp("((https?:/..*/)[^/:]*:\\d+(?:.|\n)*)\\2"), "$1");
                b = a.replace(RegExp("\n *", "g"), "\n")
            } catch (d) {
                b = c
            }
        }
        return b
    }
    var Ie = class {
        constructor(a, b, c=null) {
            this.v = a;
            this.A = b;
            this.h = c;
            this.g = null;
            this.i = !1;
            this.m = this.H
        }
        eb(a) {
            this.m = a
        }
        Ba(a) {
            this.g = a
        }
        j(a) {
            this.i = a
        }
        ca(a, b, c) {
            let d, e;
            try {
                this.h && this.h.g ? (e = this.h.start(a.toString(), 3),
                d = b(),
                this.h.end(e)) : d = b()
            } catch (f) {
                b = this.A;
                try {
                    xe(e),
                    b = this.m(a, new ke(f,{
                        message: Ge(f)
                    }), void 0, c)
                } catch (g) {
                    this.H(217, g)
                }
                if (b)
                    window.console?.error?.(f);
                else
                    throw f;
            }
            return d
        }
        ma(a, b) {
            return (...c)=>this.ca(a, ()=>b.apply(void 0, c))
        }
        H(a, b, c, d, e) {
            e = e || "jserror";
            let f;
            try {
                const F = new Fe;
                F.g.push(1);
                F.h[1] = Ae("context", a);
                le(b) || (b = new ke(b,{
                    message: Ge(b)
                }));
                if (b.msg) {
                    var g = b.msg.substring(0, 512);
                    F.g.push(2);
                    F.h[2] = Ae("msg", g)
                }
                const Ka = b.meta || {};
                if (this.g)
                    try {
                        this.g(Ka)
                    } catch (Za) {}
                if (d)
                    try {
                        d(Ka)
                    } catch (Za) {}
                b = [Ka];
                F.g.push(3);
                F.h[3] = b;
                d = p;
                b = [];
                g = null;
                do {
                    var h = d;
                    if (yd(h)) {
                        var k = h.location.href;
                        g = h.document && h.document.referrer || null
                    } else
                        k = g,
                        g = null;
                    b.push(new oe(k || "",h));
                    try {
                        d = h.parent
                    } catch (Za) {
                        d = null
                    }
                } while (d && h != d);
                for (let Za = 0, bg = b.length - 1; Za <= bg; ++Za)
                    b[Za].depth = bg - Za;
                h = p;
                if (h.location && h.location.ancestorOrigins && h.location.ancestorOrigins.length == b.length - 1)
                    for (k = 1; k < b.length; ++k) {
                        var m = b[k];
                        m.url || (m.url = h.location.ancestorOrigins[k - 1] || "",
                        m.Wa = !0)
                    }
                var l = b;
                let Wa = new oe(p.location.href,p,!1);
                h = null;
                const mb = l.length - 1;
                for (m = mb; 0 <= m; --m) {
                    var n = l[m];
                    !h && me.test(n.url) && (h = n);
                    if (n.url && !n.Wa) {
                        Wa = n;
                        break
                    }
                }
                n = null;
                const hk = l.length && l[mb].url;
                0 != Wa.depth && hk && (n = l[mb]);
                f = new ne(Wa,n);
                if (f.h) {
                    var x = f.h.url || "";
                    F.g.push(4);
                    F.h[4] = Ae("top", x)
                }
                var v = {
                    url: f.g.url || ""
                };
                if (f.g.url) {
                    var w = f.g.url.match(td)
                      , z = w[1]
                      , A = w[3]
                      , D = w[4];
                    l = "";
                    z && (l += z + ":");
                    A && (l += "//",
                    l += A,
                    D && (l += ":" + D));
                    var J = l
                } else
                    J = "";
                v = [v, {
                    url: J
                }];
                F.g.push(5);
                F.h[5] = v;
                He(this.v, e, F, this.i, c)
            } catch (F) {
                try {
                    He(this.v, e, {
                        context: "ecmserr",
                        rctx: a,
                        msg: Ge(F),
                        url: f && f.g.url
                    }, this.i, c)
                } catch (Ka) {}
            }
            return this.A
        }
        W(a, b) {
            b.catch(c=>{
                c = c ? c : "unknown rejection";
                this.H(a, c instanceof Error ? c : Error(c), void 0, this.g || void 0)
            }
            )
        }
    }
    ;
    var Je = a=>"string" === typeof a
      , Ke = a=>void 0 === a;
    var Le = class extends N {
    }
    ;
    Le.s = [2, 8];
    var Me = [3, 4, 5]
      , Ne = [6, 7];
    function Oe(a) {
        return null != a ? !a : a
    }
    function Pe(a, b) {
        let c = !1;
        for (let d = 0; d < a.length; d++) {
            const e = a[d]();
            if (e === b)
                return e;
            null == e && (c = !0)
        }
        if (!c)
            return !b
    }
    function Qe(a, b) {
        var c = G(a, Le, 2);
        if (!c.length)
            return Re(a, b);
        a = M(a, 1);
        if (1 === a)
            return Oe(Qe(c[0], b));
        c = Ma(c, d=>()=>Qe(d, b));
        switch (a) {
        case 2:
            return Pe(c, !1);
        case 3:
            return Pe(c, !0)
        }
    }
    function Re(a, b) {
        const c = vc(a, Me);
        a: {
            switch (c) {
            case 3:
                var d = M(a, uc(a, Me, 3));
                break a;
            case 4:
                d = M(a, uc(a, Me, 4));
                break a;
            case 5:
                d = M(a, uc(a, Me, 5));
                break a
            }
            d = void 0
        }
        if (d && (b = (b = b[c]) && b[d])) {
            try {
                var e = pc(a, 8, Vb);
                var f = b(...e)
            } catch (g) {
                return
            }
            e = M(a, 1);
            if (4 === e)
                return !!f;
            if (5 === e)
                return null != f;
            if (12 === e)
                a = L(a, uc(a, Ne, 7));
            else
                a: {
                    switch (c) {
                    case 4:
                        a = Fc(a, uc(a, Ne, 6));
                        break a;
                    case 5:
                        a = L(a, uc(a, Ne, 7));
                        break a
                    }
                    a = void 0
                }
            if (null != a) {
                if (6 === e)
                    return f === a;
                if (9 === e)
                    return null != f && 0 === ta(String(f), a);
                if (null != f)
                    switch (e) {
                    case 7:
                        return f < a;
                    case 8:
                        return f > a;
                    case 12:
                        return Je(a) && Je(f) && (new RegExp(a)).test(f);
                    case 10:
                        return null != f && -1 === ta(String(f), a);
                    case 11:
                        return null != f && 1 === ta(String(f), a)
                    }
            }
        }
    }
    function Se(a, b) {
        return !a || !(!b || !Qe(a, b))
    }
    ;var Te = class extends N {
    }
    ;
    Te.s = [4];
    var Ue = class extends N {
        getValue() {
            return E(this, Te, 2)
        }
    }
    ;
    var Ve = class extends N {
    }
      , We = Oc(Ve);
    Ve.s = [5];
    var Xe = [1, 2, 3, 6, 7];
    var Ye = class extends N {
        constructor() {
            super()
        }
    }
    ;
    function Ze(a, b) {
        const c = d=>[{
            [d.Ca]: d.za
        }];
        return JSON.stringify([a.filter(d=>d.ja).map(c), b.toJSON(), a.filter(d=>!d.ja).map(c)])
    }
    var $e = class {
        constructor(a, b) {
            var c = new Ye;
            a = C(c, 1, Kb(a), 0);
            b = Jc(a, 2, b);
            a = b.u;
            c = a[r];
            this.j = c & 2 ? b : Yb(b.constructor, ic(a, c, !0))
        }
    }
    ;
    var af = class extends N {
        constructor() {
            super()
        }
    }
    ;
    af.s = [2];
    function bf(a) {
        var b = new cf;
        return y(b, 1, Kb(a))
    }
    var cf = class extends N {
        constructor() {
            super()
        }
        getValue() {
            return M(this, 1)
        }
    }
    ;
    function df(a, b) {
        return Hc(a, 1, b)
    }
    function ef(a, b) {
        return Hc(a, 2, b)
    }
    var ff = class extends N {
        constructor() {
            super()
        }
        getWidth() {
            return Ec(this, 1)
        }
        getHeight() {
            return Ec(this, 2)
        }
    }
    ;
    function gf(a, b) {
        return yc(a, 1, b)
    }
    function hf(a, b) {
        return yc(a, 2, b)
    }
    function jf(a, b) {
        yc(a, 3, b)
    }
    function kf(a, b) {
        return C(a, 5, Hb(b), !1)
    }
    var lf = class extends N {
        constructor() {
            super()
        }
        getContentUrl() {
            return L(this, 4)
        }
    }
    ;
    var xc = class extends N {
    }
    ;
    var mf = class extends N {
    }
    ;
    var nf = class extends N {
        constructor() {
            super()
        }
        getContentUrl() {
            return L(this, 1)
        }
    }
    ;
    function of(a) {
        var b = new pf;
        return C(b, 1, Kb(a), 0)
    }
    var pf = class extends N {
        constructor() {
            super()
        }
    }
    ;
    function qf(a, b) {
        return zc(a, 4, rf, b)
    }
    var sf = class extends N {
        constructor() {
            super()
        }
    }
      , rf = [4, 5, 6, 8, 9, 10, 11];
    var tf = class extends N {
        constructor() {
            super()
        }
    }
    ;
    function uf(a, b) {
        return C(a, 1, Kb(b), 0)
    }
    function vf(a, b) {
        return C(a, 2, Kb(b), 0)
    }
    var wf = class extends N {
        constructor() {
            super()
        }
    }
    ;
    var xf = class extends N {
        constructor() {
            super()
        }
    }
      , yf = [1, 2];
    function zf(a, b) {
        return yc(a, 1, b)
    }
    function Af(a, b) {
        return Ac(a, 2, b)
    }
    function Bf(a, b) {
        return rc(a, 4, b, Mb)
    }
    function Cf(a, b) {
        return Ac(a, 5, b)
    }
    function Df(a, b) {
        return C(a, 6, Kb(b), 0)
    }
    var Ef = class extends N {
        constructor() {
            super()
        }
    }
    ;
    Ef.s = [2, 4, 5];
    var Ff = class extends N {
        constructor() {
            super()
        }
    }
    ;
    Ff.s = [5];
    var Gf = [1, 2, 3, 4];
    var Hf = class extends N {
        constructor() {
            super()
        }
    }
    ;
    Hf.s = [2, 3];
    function If(a) {
        var b = new Jf;
        return zc(b, 4, Kf, a)
    }
    var Jf = class extends N {
        constructor() {
            super()
        }
        getTagSessionCorrelator() {
            return Ec(this, 2)
        }
    }
      , Kf = [4, 5, 7, 8];
    var Lf = class extends N {
        constructor() {
            super()
        }
    }
    ;
    var Mf = class extends N {
        constructor() {
            super()
        }
    }
    ;
    Mf.s = [4, 5];
    var Nf = class extends N {
        constructor() {
            super()
        }
        getTagSessionCorrelator() {
            return Ec(this, 1)
        }
    }
    ;
    Nf.s = [2];
    var Of = class extends N {
        constructor() {
            super()
        }
    }
      , Pf = [4, 6];
    class Qf extends $e {
    }
    function Rf(a, ...b) {
        Sf(a, ...b.map(c=>({
            ja: !0,
            Ca: 3,
            za: c.toJSON()
        })))
    }
    function Tf(a, ...b) {
        Sf(a, ...b.map(c=>({
            ja: !0,
            Ca: 4,
            za: c.toJSON()
        })))
    }
    function Uf(a, ...b) {
        Sf(a, ...b.map(c=>({
            ja: !0,
            Ca: 7,
            za: c.toJSON()
        })))
    }
    var Vf = class extends Qf {
    }
    ;
    var Wf = (a,b)=>{
        globalThis.fetch(a, {
            method: "POST",
            body: b,
            keepalive: 65536 > b.length,
            credentials: "omit",
            mode: "no-cors",
            redirect: "follow"
        }).catch(()=>{}
        )
    }
    ;
    function Sf(a, ...b) {
        a.A && 65536 <= Ze(a.g.concat(b), a.j).length && Xf(a);
        a.i && !a.m && (a.m = !0,
        Yf(a.i, ()=>{
            Xf(a)
        }
        ));
        a.g.push(...b);
        a.g.length >= a.v && Xf(a);
        a.g.length && null === a.h && (a.h = setTimeout(()=>{
            Xf(a)
        }
        , a.G))
    }
    function Xf(a) {
        null !== a.h && (clearTimeout(a.h),
        a.h = null);
        if (a.g.length) {
            var b = Ze(a.g, a.j);
            a.B("https://pagead2.googlesyndication.com/pagead/ping?e=1", b);
            a.g = []
        }
    }
    var Zf = class extends Vf {
        constructor(a, b, c, d, e, f) {
            super(a, b);
            this.B = Wf;
            this.G = c;
            this.v = d;
            this.A = e;
            this.i = f;
            this.g = [];
            this.h = null;
            this.m = !1
        }
    }
      , $f = class extends Zf {
        constructor(a, b, c=1E3, d=100, e=!1, f) {
            super(a, b, c, d, e && !0, f)
        }
    }
    ;
    function ag(a, b) {
        var c = Date.now();
        c = Number.isFinite(c) ? Math.round(c) : 0;
        b = Hc(b, 1, c);
        c = Rd(window);
        b = Hc(b, 2, c);
        return Hc(b, 6, a.m)
    }
    function cg(a, b, c, d, e, f) {
        if (a.i) {
            var g = vf(uf(new wf, b), c);
            b = Df(Af(zf(Cf(Bf(new Ef, d), e), g), a.g.slice()), f);
            b = If(b);
            Tf(a.h, ag(a, b));
            if (1 === f || 3 === f || 4 === f && !a.g.some(h=>M(h, 1) === M(g, 1) && M(h, 2) === c))
                a.g.push(g),
                100 < a.g.length && a.g.shift()
        }
    }
    function dg(a, b, c, d) {
        if (a.i && a.j) {
            var e = new Hf;
            b = Ac(e, 2, b);
            c = Ac(b, 3, c);
            d && C(c, 1, Nb(d), 0);
            d = new Jf;
            d = zc(d, 7, Kf, c);
            Tf(a.h, ag(a, d))
        }
    }
    function eg(a, b, c, d) {
        if (a.i) {
            var e = new tf;
            b = y(e, 1, Nb(b));
            c = y(b, 2, Nb(c));
            d = y(c, 3, Kb(d));
            c = new Jf;
            d = zc(c, 8, Kf, d);
            Tf(a.h, ag(a, d))
        }
    }
    var fg = class {
        constructor(a, b, c, d=new $f(6,"unknown",b)) {
            this.m = a;
            this.j = c;
            this.h = d;
            this.g = [];
            this.i = 0 < a && Dd() < 1 / a
        }
    }
    ;
    var gg = class {
        constructor() {
            this.F = {
                [3]: {},
                [4]: {},
                [5]: {}
            }
        }
    }
    ;
    var hg = /^true$/.test("false");
    function ig(a, b) {
        switch (b) {
        case 1:
            return M(a, uc(a, Xe, 1));
        case 2:
            return M(a, uc(a, Xe, 2));
        case 3:
            return M(a, uc(a, Xe, 3));
        case 6:
            return M(a, uc(a, Xe, 6));
        default:
            return null
        }
    }
    function jg(a, b) {
        if (!a)
            return null;
        switch (b) {
        case 1:
            return K(a, 1);
        case 7:
            return L(a, 3);
        case 2:
            return Fc(a, 2);
        case 3:
            return L(a, 3);
        case 6:
            return pc(a, 4, Vb);
        default:
            return null
        }
    }
    const kg = Wc(()=>{
        if (!hg)
            return {};
        try {
            var a = window;
            try {
                var b = a.sessionStorage
            } catch {
                b = null
            }
            if (b = b?.getItem("GGDFSSK"))
                return JSON.parse(b)
        } catch {}
        return {}
    }
    );
    function lg(a, b, c, d=0) {
        P(mg).i[d] = P(mg).i[d]?.add(b) ?? (new Set).add(b);
        const e = kg();
        if (null != e[b])
            return e[b];
        b = ng(d)[b];
        if (!b)
            return c;
        b = We(JSON.stringify(b));
        b = og(b);
        a = jg(b, a);
        return null != a ? a : c
    }
    function og(a) {
        const b = P(gg).F;
        if (b) {
            const c = Oa(G(a, Ue, 5), d=>Se(E(d, Le, 1), b));
            if (c)
                return c.getValue() ?? null
        }
        return E(a, Te, 4) ?? null
    }
    class mg {
        constructor() {
            this.h = {};
            this.j = [];
            this.i = {};
            this.g = new Map
        }
    }
    function pg(a, b=!1, c) {
        return !!lg(1, a, b, c)
    }
    function qg(a, b=0, c) {
        a = Number(lg(2, a, b, c));
        return isNaN(a) ? b : a
    }
    function rg(a, b="", c) {
        a = lg(3, a, b, c);
        return "string" === typeof a ? a : b
    }
    function sg(a, b=[], c) {
        a = lg(6, a, b, c);
        return Array.isArray(a) ? a : b
    }
    function ng(a) {
        return P(mg).h[a] || (P(mg).h[a] = {})
    }
    function tg(a, b) {
        const c = ng(b);
        Ed(a, (d,e)=>c[e] = d)
    }
    function ug(a, b, c, d, e=!1) {
        const f = []
          , g = [];
        Ja(b, h=>{
            const k = ng(h);
            Ja(a, m=>{
                var l = vc(m, Xe);
                const n = ig(m, l);
                if (n) {
                    var x = P(mg).g.get(h)?.get(n)?.slice(0) ?? [];
                    a: {
                        const v = new Ff;
                        switch (l) {
                        case 1:
                            sc(v, 1, Gf, Kb(n));
                            break;
                        case 2:
                            sc(v, 2, Gf, Kb(n));
                            break;
                        case 3:
                            sc(v, 3, Gf, Kb(n));
                            break;
                        case 6:
                            sc(v, 4, Gf, Kb(n));
                            break;
                        default:
                            l = void 0;
                            break a
                        }
                        rc(v, 5, x, Mb);
                        l = v
                    }
                    if (x = l)
                        x = !!P(mg).i[h]?.has(n);
                    x && f.push(l);
                    if (x = l)
                        x = !!P(mg).g.get(h)?.has(n);
                    x && g.push(l);
                    e || (l = P(mg),
                    l.g.has(h) || l.g.set(h, new Map),
                    l.g.get(h).has(n) || l.g.get(h).set(n, []),
                    d && l.g.get(h).get(n).push(d));
                    k[n] = m.toJSON()
                }
            }
            )
        }
        );
        (f.length || g.length) && dg(c, f, g, d ?? void 0)
    }
    function vg(a, b) {
        const c = ng(b);
        Ja(a, d=>{
            var e = We(JSON.stringify(d));
            const f = vc(e, Xe);
            (e = ig(e, f)) && (c[e] || (c[e] = d))
        }
        )
    }
    function wg() {
        return Ma(Object.keys(P(mg).h), a=>Number(a))
    }
    function xg(a) {
        Pa(P(mg).j, a) || tg(ng(4), a)
    }
    ;function T(a, b, c) {
        c.hasOwnProperty(a) || Object.defineProperty(c, String(a), {
            value: b
        })
    }
    function yg(a, b, c) {
        return b[a] || c
    }
    function zg(a) {
        T(5, pg, a);
        T(6, qg, a);
        T(7, rg, a);
        T(8, sg, a);
        T(13, vg, a);
        T(15, xg, a)
    }
    function Ag(a) {
        T(4, b=>{
            P(gg).F = b
        }
        , a);
        T(9, (b,c)=>{
            var d = P(gg);
            null == d.F[3][b] && (d.F[3][b] = c)
        }
        , a);
        T(10, (b,c)=>{
            var d = P(gg);
            null == d.F[4][b] && (d.F[4][b] = c)
        }
        , a);
        T(11, (b,c)=>{
            var d = P(gg);
            null == d.F[5][b] && (d.F[5][b] = c)
        }
        , a);
        T(14, b=>{
            var c = P(gg);
            for (const d of [3, 4, 5])
                Object.assign(c.F[d], b[d])
        }
        , a)
    }
    function Bg(a) {
        a.hasOwnProperty("init-done") || Object.defineProperty(a, "init-done", {
            value: !0
        })
    }
    ;function Cg(a, b, c) {
        a.i = yg(1, b, ()=>{}
        );
        a.j = (d,e)=>yg(2, b, ()=>[])(d, c, e);
        a.g = ()=>yg(3, b, ()=>[])(c);
        a.h = d=>{
            yg(16, b, ()=>{}
            )(d, c)
        }
    }
    class Dg {
        i() {}
        h() {}
        j() {
            return []
        }
        g() {
            return []
        }
    }
    ;function He(a, b, c, d=!1, e) {
        if ((d ? a.g : Math.random()) < (e || .01))
            try {
                let f;
                c instanceof Fe ? f = c : (f = new Fe,
                Ed(c, (h,k)=>{
                    var m = f;
                    const l = m.j++;
                    h = Ae(k, h);
                    m.g.push(l);
                    m.h[l] = h
                }
                ));
                const g = Ee(f, "/pagead/gen_204?id=" + b + "&");
                g && Ud(p, g)
            } catch (f) {}
    }
    function Eg(a, b) {
        0 <= b && 1 >= b && (a.g = b)
    }
    class Fg {
        constructor() {
            this.g = Math.random()
        }
    }
    ;let Gg, Hg;
    const Ig = new ze(window);
    (a=>{
        Gg = a ?? new Fg;
        "number" !== typeof window.google_srt && (window.google_srt = Math.random());
        Eg(Gg, window.google_srt);
        Hg = new Ie(Gg,!0,Ig);
        Hg.Ba(()=>{}
        );
        Hg.j(!0);
        "complete" == window.document.readyState ? window.google_measure_js_timing || ye(Ig) : Ig.g && Yc(window, "load", ()=>{
            window.google_measure_js_timing || ye(Ig)
        }
        )
    }
    )();
    var Jg = {
        Wb: 0,
        Vb: 1,
        Sb: 2,
        Nb: 3,
        Tb: 4,
        Ob: 5,
        Ub: 6,
        Qb: 7,
        Rb: 8,
        Mb: 9,
        Pb: 10,
        Xb: 11
    };
    var Kg = {
        Zb: 0,
        ac: 1,
        Yb: 2
    };
    function Lg(a) {
        if (0 != a.g)
            throw Error("Already resolved/rejected.");
    }
    var Og = class {
        constructor() {
            this.h = new Mg(this);
            this.g = 0
        }
        resolve(a) {
            Lg(this);
            this.g = 1;
            this.j = a;
            Ng(this.h)
        }
    }
    ;
    function Ng(a) {
        switch (a.g.g) {
        case 0:
            break;
        case 1:
            a.h && a.h(a.g.j);
            break;
        case 2:
            a.i && a.i(a.g.i);
            break;
        default:
            throw Error("Unhandled deferred state.");
        }
    }
    var Mg = class {
        constructor(a) {
            this.g = a
        }
        then(a, b) {
            if (this.h)
                throw Error("Then functions already set.");
            this.h = a;
            this.i = b;
            Ng(this)
        }
    }
    ;
    const Pg = class {
        constructor(a) {
            this.g = a.slice(0)
        }
        forEach(a) {
            this.g.forEach((b,c)=>void a(b, c, this))
        }
        filter(a) {
            return new Pg(La(this.g, a))
        }
        apply(a) {
            return new Pg(a(this.g.slice(0)))
        }
        sort(a) {
            return new Pg(this.g.slice(0).sort(a))
        }
        get(a) {
            return this.g[a]
        }
        add(a) {
            const b = this.g.slice(0);
            b.push(a);
            return new Pg(b)
        }
    }
    ;
    function Qg(a, b) {
        for (var c = [], d = a.length, e = 0; e < d; e++)
            c.push(a[e]);
        c.forEach(b, void 0)
    }
    ;const Sg = class {
        constructor() {
            this.g = {};
            this.h = {}
        }
        set(a, b) {
            const c = Rg(a);
            this.g[c] = b;
            this.h[c] = a
        }
        get(a, b) {
            a = Rg(a);
            return void 0 !== this.g[a] ? this.g[a] : b
        }
        clear() {
            this.g = {};
            this.h = {}
        }
    }
    ;
    function Rg(a) {
        return a instanceof Object ? String(ha(a)) : a + ""
    }
    ;function Tg(a) {
        return new Ug({
            value: a
        },null)
    }
    function Vg(a) {
        return new Ug(null,a)
    }
    function Wg(a) {
        try {
            return Tg(a())
        } catch (b) {
            return Vg(b)
        }
    }
    function Xg(a) {
        return null != a.g ? a.getValue() : null
    }
    function Yg(a, b) {
        null != a.g && b(a.getValue());
        return a
    }
    function Zg(a, b) {
        null != a.g || b(a.h);
        return a
    }
    class Ug {
        constructor(a, b) {
            this.g = a;
            this.h = b
        }
        getValue() {
            return this.g.value
        }
        map(a) {
            return null != this.g ? (a = a(this.getValue()),
            a instanceof Ug ? a : Tg(a)) : this
        }
    }
    ;const $g = class {
        constructor(a) {
            this.g = new Sg;
            if (a)
                for (var b = 0; b < a.length; ++b)
                    this.add(a[b])
        }
        add(a) {
            this.g.set(a, !0)
        }
        contains(a) {
            return void 0 !== this.g.g[Rg(a)]
        }
    }
    ;
    class ah {
        constructor() {
            this.g = new Sg
        }
        set(a, b) {
            let c = this.g.get(a);
            c || (c = new $g,
            this.g.set(a, c));
            c.add(b)
        }
    }
    ;var U = class extends N {
        getId() {
            return I(this, 3)
        }
    }
    ;
    U.s = [4];
    class bh {
        constructor({jb: a, bc: b, lc: c, Bb: d}) {
            this.g = b;
            this.j = new Pg(a || []);
            this.i = d;
            this.h = c
        }
    }
    ;const dh = a=>{
        const b = []
          , c = a.j;
        c && c.g.length && b.push({
            T: "a",
            ba: ch(c)
        });
        null != a.g && b.push({
            T: "as",
            ba: a.g
        });
        null != a.h && b.push({
            T: "i",
            ba: String(a.h)
        });
        null != a.i && b.push({
            T: "rp",
            ba: String(a.i)
        });
        b.sort(function(d, e) {
            return d.T.localeCompare(e.T)
        });
        b.unshift({
            T: "t",
            ba: "aa"
        });
        return b
    }
      , ch = a=>{
        a = a.g.slice(0).map(eh);
        a = JSON.stringify(a);
        return Fd(a)
    }
      , eh = a=>{
        const b = {};
        null != I(a, 7) && (b.q = I(a, 7));
        null != H(a, 2) && (b.o = H(a, 2));
        null != H(a, 5) && (b.p = H(a, 5));
        return b
    }
    ;
    var fh = class extends N {
        setLocation(a) {
            return y(this, 1, Kb(a))
        }
    }
    ;
    function gh(a) {
        const b = [].slice.call(arguments).filter(Vc(e=>null === e));
        if (!b.length)
            return null;
        let c = []
          , d = {};
        b.forEach(e=>{
            c = c.concat(e.Ta || []);
            d = Object.assign(d, e.bb)
        }
        );
        return new hh(c,d)
    }
    function ih(a) {
        switch (a) {
        case 1:
            return new hh(null,{
                google_ad_semantic_area: "mc"
            });
        case 2:
            return new hh(null,{
                google_ad_semantic_area: "h"
            });
        case 3:
            return new hh(null,{
                google_ad_semantic_area: "f"
            });
        case 4:
            return new hh(null,{
                google_ad_semantic_area: "s"
            });
        default:
            return null
        }
    }
    function jh(a) {
        if (null == a)
            var b = null;
        else {
            var c = dh(a);
            a = [];
            for (b of c)
                c = String(b.ba),
                a.push(b.T + "." + (20 >= c.length ? c : c.slice(0, 19) + "_"));
            b = new hh(null,{
                google_placement_id: a.join("~")
            })
        }
        return b
    }
    class hh {
        constructor(a, b) {
            this.Ta = a;
            this.bb = b
        }
    }
    ;const kh = new hh(["google-auto-placed"],{
        google_reactive_ad_format: 40,
        google_tag_origin: "qs"
    });
    var lh = Oc(class extends N {
    }
    );
    var mh = class extends N {
    }
    ;
    var nh = class extends N {
    }
    ;
    var oh = class extends N {
    }
    ;
    oh.s = [6, 7, 9, 10, 11];
    var ph = class extends N {
    }
    ;
    var qh = class extends N {
        constructor() {
            super()
        }
    }
    ;
    qh.s = [1];
    function rh(a) {
        if (1 != a.nodeType)
            var b = !1;
        else if (b = "INS" == a.tagName)
            a: {
                b = ["adsbygoogle-placeholder"];
                a = a.className ? a.className.split(/\s+/) : [];
                for (var c = {}, d = 0; d < a.length; ++d)
                    c[a[d]] = !0;
                for (d = 0; d < b.length; ++d)
                    if (!c[b[d]]) {
                        b = !1;
                        break a
                    }
                b = !0
            }
        return b
    }
    ;var sh = new O(1082,!0)
      , th = new O(1271)
      , uh = new O(1308)
      , vh = new Rc(1130,100)
      , wh = new Sc(14)
      , xh = new O(1247,!0)
      , yh = new O(1272)
      , zh = new O(316)
      , Ah = new O(1207,!0)
      , Bh = new O(313)
      , Ch = new O(369)
      , Dh = new O(1289)
      , Eh = new O(1298,!0)
      , Fh = new O(1302)
      , Gh = new O(217)
      , Hh = new Sc(1307)
      , Ih = new Rc(572636916,25)
      , Jh = new Rc(579884443)
      , Kh = new Tc(556791602,["1", "2"])
      , Lh = new O(572636914)
      , Mh = new O(529362570,!0)
      , Nh = new O(579884441)
      , Oh = new Rc(572636915,150)
      , Ph = new Rc(579884442)
      , Qh = new O(506914611)
      , Rh = new O(506852289)
      , Sh = new O(1120)
      , Th = new O(567362967,!0)
      , Uh = new Rc(1079,5)
      , Vh = new O(10009,!0)
      , Pd = new Tc(1934,["As0hBNJ8h++fNYlkq8cTye2qDLyom8NddByiVytXGGD0YVE+2CEuTCpqXMDxdhOMILKoaiaYifwEvCRlJ/9GcQ8AAAB8eyJvcmlnaW4iOiJodHRwczovL2RvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiV2ViVmlld1hSZXF1ZXN0ZWRXaXRoRGVwcmVjYXRpb24iLCJleHBpcnkiOjE3MTk1MzI3OTksImlzU3ViZG9tYWluIjp0cnVlfQ==", "AgRYsXo24ypxC89CJanC+JgEmraCCBebKl8ZmG7Tj5oJNx0cmH0NtNRZs3NB5ubhpbX/bIt7l2zJOSyO64NGmwMAAACCeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXN5bmRpY2F0aW9uLmNvbTo0NDMiLCJmZWF0dXJlIjoiV2ViVmlld1hSZXF1ZXN0ZWRXaXRoRGVwcmVjYXRpb24iLCJleHBpcnkiOjE3MTk1MzI3OTksImlzU3ViZG9tYWluIjp0cnVlfQ==", "A/ERL66fN363FkXxgDc6F1+ucRUkAhjEca9W3la6xaLnD2Y1lABsqmdaJmPNaUKPKVBRpyMKEhXYl7rSvrQw+AkAAACNeyJvcmlnaW4iOiJodHRwczovL2RvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiRmxlZGdlQmlkZGluZ0FuZEF1Y3Rpb25TZXJ2ZXIiLCJleHBpcnkiOjE3MTkzNTk5OTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9", "A6OdGH3fVf4eKRDbXb4thXA4InNqDJDRhZ8U533U/roYjp4Yau0T3YSuc63vmAs/8ga1cD0E3A7LEq6AXk1uXgsAAACTeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXN5bmRpY2F0aW9uLmNvbTo0NDMiLCJmZWF0dXJlIjoiRmxlZGdlQmlkZGluZ0FuZEF1Y3Rpb25TZXJ2ZXIiLCJleHBpcnkiOjE3MTkzNTk5OTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9"])
      , Wh = new O(84);
    function Xh(a, b, c) {
        switch (c) {
        case 0:
            b.parentNode && b.parentNode.insertBefore(a, b);
            break;
        case 3:
            if (c = b.parentNode) {
                var d = b.nextSibling;
                if (d && d.parentNode != c)
                    for (; d && 8 == d.nodeType; )
                        d = d.nextSibling;
                c.insertBefore(a, d)
            }
            break;
        case 1:
            b.insertBefore(a, b.firstChild);
            break;
        case 2:
            b.appendChild(a)
        }
        rh(b) && (b.setAttribute("data-init-display", b.style.display),
        b.style.display = "block")
    }
    ;function Yh(a, b) {
        const c = e=>{
            e = Zh(e);
            return null == e ? !1 : 0 < e
        }
          , d = e=>{
            e = Zh(e);
            return null == e ? !1 : 0 > e
        }
        ;
        switch (b) {
        case 0:
            return {
                init: $h(a.previousSibling, c),
                fa: e=>$h(e.previousSibling, c),
                la: 0
            };
        case 2:
            return {
                init: $h(a.lastChild, c),
                fa: e=>$h(e.previousSibling, c),
                la: 0
            };
        case 3:
            return {
                init: $h(a.nextSibling, d),
                fa: e=>$h(e.nextSibling, d),
                la: 3
            };
        case 1:
            return {
                init: $h(a.firstChild, d),
                fa: e=>$h(e.nextSibling, d),
                la: 3
            }
        }
        throw Error("Un-handled RelativePosition: " + b);
    }
    function Zh(a) {
        return a.hasOwnProperty("google-ama-order-assurance") ? a["google-ama-order-assurance"] : null
    }
    function $h(a, b) {
        return a && b(a) ? a : null
    }
    ;var ai = {
        rectangle: 1,
        horizontal: 2,
        vertical: 4
    };
    var bi = {
        overlays: 1,
        interstitials: 2,
        vignettes: 2,
        inserts: 3,
        immersives: 4,
        list_view: 5,
        full_page: 6,
        side_rails: 7
    };
    function ci(a) {
        a = a.document;
        let b = {};
        a && (b = "CSS1Compat" == a.compatMode ? a.documentElement : a.body);
        return b || {}
    }
    function di(a) {
        return ci(a).clientWidth
    }
    ;var ei = a=>{
        if (a == a.top)
            return 0;
        for (; a && a != a.top && yd(a); a = a.parent) {
            if (a.sf_)
                return 2;
            if (a.$sf)
                return 3;
            if (a.inGptIF)
                return 4;
            if (a.inDapIF)
                return 5
        }
        return 1
    }
    ;
    var fi = (a,b)=>{
        do {
            const c = Cd(a, b);
            if (c && "fixed" == c.position)
                return !1
        } while (a = a.parentElement);
        return !0
    }
    ;
    function gi(a, b) {
        var c = ["width", "height"];
        for (let e = 0; e < c.length; e++) {
            const f = "google_ad_" + c[e];
            if (!b.hasOwnProperty(f)) {
                var d = R(a[c[e]]);
                d = null === d ? null : Math.round(d);
                null != d && (b[f] = d)
            }
        }
    }
    var hi = (a,b)=>!((Hd.test(b.google_ad_width) || Gd.test(a.style.width)) && (Hd.test(b.google_ad_height) || Gd.test(a.style.height)))
      , ji = (a,b)=>(a = ii(a, b)) ? a.y : 0
      , ii = (a,b)=>{
        try {
            const c = b.document.documentElement.getBoundingClientRect()
              , d = a.getBoundingClientRect();
            return {
                x: d.left - c.left,
                y: d.top - c.top
            }
        } catch (c) {
            return null
        }
    }
      , ki = (a,b,c,d,e)=>{
        if (a !== a.top)
            return zd(a) ? 3 : 16;
        if (!(488 > di(a)))
            return 4;
        if (!(a.innerHeight >= a.innerWidth))
            return 5;
        const f = di(a);
        if (!f || (f - c) / f > d)
            a = 6;
        else {
            if (c = "true" != e.google_full_width_responsive)
                a: {
                    c = b.parentElement;
                    for (b = di(a); c; c = c.parentElement)
                        if ((d = Cd(c, a)) && (e = R(d.width)) && !(e >= b) && "visible" != d.overflow) {
                            c = !0;
                            break a
                        }
                    c = !1
                }
            a = c ? 7 : !0
        }
        return a
    }
      , li = (a,b,c,d)=>{
        const e = ki(b, c, a, .3, d);
        !0 !== e ? a = e : "true" == d.google_full_width_responsive || fi(c, b) ? (b = di(b),
        a = b - a,
        a = b && 0 <= a ? !0 : b ? -10 > a ? 11 : 0 > a ? 14 : 12 : 10) : a = 9;
        return a
    }
      , mi = (a,b,c)=>{
        a = a.style;
        "rtl" == b ? a.marginRight = c : a.marginLeft = c
    }
    ;
    const ni = (a,b)=>{
        if (3 == b.nodeType)
            return /\S/.test(b.data);
        if (1 == b.nodeType) {
            if (/^(script|style)$/i.test(b.nodeName))
                return !1;
            let c;
            try {
                c = Cd(b, a)
            } catch (d) {}
            return !c || "none" != c.display && !("absolute" == c.position && ("hidden" == c.visibility || "collapse" == c.visibility))
        }
        return !1
    }
      , oi = (a,b,c)=>{
        a = ii(b, a);
        return "rtl" == c ? -a.x : a.x
    }
    ;
    var pi = (a,b)=>{
        var c;
        c = (c = b.parentElement) ? (c = Cd(c, a)) ? c.direction : "" : "";
        if (c) {
            b.style.border = b.style.borderStyle = b.style.outline = b.style.outlineStyle = b.style.transition = "none";
            b.style.borderSpacing = b.style.padding = "0";
            mi(b, c, "0px");
            b.style.width = di(a) + "px";
            if (0 !== oi(a, b, c)) {
                mi(b, c, "0px");
                var d = oi(a, b, c);
                mi(b, c, -1 * d + "px");
                a = oi(a, b, c);
                0 !== a && a !== d && mi(b, c, d / (a - d) * d + "px")
            }
            b.style.zIndex = 30
        }
    }
    ;
    var qi = class {
        constructor(a, b) {
            this.I = a;
            this.i = b
        }
        height() {
            return this.i
        }
        g(a) {
            return 300 < a && 300 < this.i ? this.I : Math.min(1200, Math.round(a))
        }
        h() {}
    }
    ;
    var ri = (a,b,c,d=e=>e)=>{
        let e;
        return a.style && a.style[c] && d(a.style[c]) || (e = Cd(a, b)) && e[c] && d(e[c]) || null
    }
      , si = a=>b=>b.I <= a
      , vi = (a,b,c,d)=>{
        const e = a && ti(c, b)
          , f = ui(b, d);
        return g=>!(e && g.height() >= f)
    }
      , wi = a=>b=>b.height() <= a
      , ti = (a,b)=>ji(a, b) < ci(b).clientHeight - 100
      , xi = (a,b)=>{
        var c = ri(b, a, "height", R);
        if (c)
            return c;
        var d = b.style.height;
        b.style.height = "inherit";
        c = ri(b, a, "height", R);
        b.style.height = d;
        if (c)
            return c;
        c = Infinity;
        do
            (d = b.style && R(b.style.height)) && (c = Math.min(c, d)),
            (d = ri(b, a, "maxHeight", R)) && (c = Math.min(c, d));
        while ((b = b.parentElement) && "HTML" != b.tagName);
        return c
    }
    ;
    const ui = (a,b)=>{
        const c = 0 == he(a);
        return b && c ? Math.max(250, 2 * ci(a).clientHeight / 3) : 250
    }
    ;
    var yi = {
        google_ad_channel: !0,
        google_ad_client: !0,
        google_ad_host: !0,
        google_ad_host_channel: !0,
        google_adtest: !0,
        google_tag_for_child_directed_treatment: !0,
        google_tag_for_under_age_of_consent: !0,
        google_tag_partner: !0,
        google_restrict_data_processing: !0,
        google_page_url: !0,
        google_debug_params: !0,
        google_shadow_mode: !0,
        google_adbreak_test: !0,
        google_ad_frequency_hint: !0,
        google_admob_interstitial_slot: !0,
        google_admob_rewarded_slot: !0,
        google_admob_ads_only: !0,
        google_ad_start_delay_hint: !0,
        google_max_ad_content_rating: !0,
        google_traffic_source: !0,
        google_overlays: !0,
        google_privacy_treatments: !0,
        google_xz: !0
    };
    const zi = RegExp("(^| )adsbygoogle($| )");
    function Ai(a, b) {
        for (let c = 0; c < b.length; c++) {
            const d = b[c]
              , e = od(d.property);
            a[e] = d.value
        }
    }
    ;var Bi = class extends N {
    }
    ;
    var Ci = class extends N {
    }
    ;
    var Di = class extends N {
        g() {
            return oc(this, 23)
        }
    }
    ;
    var Ei = class extends N {
    }
    ;
    var Fi = class extends N {
    }
    ;
    var Gi = class extends N {
    }
    ;
    var Hi = class extends N {
    }
    ;
    var Ii = class extends N {
    }
    ;
    var Ji = class extends N {
        getName() {
            return I(this, 4)
        }
    }
      , Ki = [1, 2, 3];
    var Li = class extends N {
    }
    ;
    Li.s = [2, 5, 6, 11];
    var Mi = class extends N {
    }
    ;
    var Oi = class extends N {
        g() {
            return Gc(this, Mi, 2, Ni)
        }
    }
      , Ni = [1, 2];
    var Pi = class extends N {
        g() {
            return E(this, Oi, 3)
        }
    }
    ;
    Pi.s = [1, 4];
    var Qi = class extends N {
    }
      , Ri = Oc(Qi);
    Qi.s = [1, 2, 5, 7];
    function Si(a) {
        var b = [];
        Qg(a.getElementsByTagName("p"), function(c) {
            100 <= Ti(c) && b.push(c)
        });
        return b
    }
    function Ti(a) {
        if (3 == a.nodeType)
            return a.length;
        if (1 != a.nodeType || "SCRIPT" == a.tagName)
            return 0;
        var b = 0;
        Qg(a.childNodes, function(c) {
            b += Ti(c)
        });
        return b
    }
    function Ui(a) {
        return 0 == a.length || isNaN(a[0]) ? a : "\\" + (30 + parseInt(a[0], 10)) + " " + a.substring(1)
    }
    function Vi(a, b) {
        if (null == a.g)
            return b;
        switch (a.g) {
        case 1:
            return b.slice(1);
        case 2:
            return b.slice(0, b.length - 1);
        case 3:
            return b.slice(1, b.length - 1);
        case 0:
            return b;
        default:
            throw Error("Unknown ignore mode: " + a.g);
        }
    }
    const Wi = class {
        constructor(a, b, c, d) {
            this.j = a;
            this.h = b;
            this.i = c;
            this.g = d
        }
        query(a) {
            var b = [];
            try {
                b = a.querySelectorAll(this.j)
            } catch (f) {}
            if (!b.length)
                return [];
            a = Qa(b);
            a = Vi(this, a);
            "number" === typeof this.h && (b = this.h,
            0 > b && (b += a.length),
            a = 0 <= b && b < a.length ? [a[b]] : []);
            if ("number" === typeof this.i) {
                b = [];
                for (var c = 0; c < a.length; c++) {
                    var d = Si(a[c])
                      , e = this.i;
                    0 > e && (e += d.length);
                    0 <= e && e < d.length && b.push(d[e])
                }
                a = b
            }
            return a
        }
        toString() {
            return JSON.stringify({
                nativeQuery: this.j,
                occurrenceIndex: this.h,
                paragraphIndex: this.i,
                ignoreMode: this.g
            })
        }
    }
    ;
    class Xi {
        constructor() {
            var a = be`https://pagead2.googlesyndication.com/pagead/js/err_rep.js`;
            this.g = null;
            this.i = !1;
            this.m = Math.random();
            this.h = this.H;
            this.v = a
        }
        Ba(a) {
            this.g = a
        }
        j(a) {
            this.i = a
        }
        eb(a) {
            this.h = a
        }
        H(a, b, c=.01, d, e="jserror") {
            if ((this.i ? this.m : Math.random()) > c)
                return !1;
            le(b) || (b = new ke(b,{
                context: a,
                id: e
            }));
            if (d || this.g)
                b.meta = {},
                this.g && this.g(b.meta),
                d && d(b.meta);
            p.google_js_errors = p.google_js_errors || [];
            p.google_js_errors.push(b);
            p.error_rep_loaded || (Ad(p.document, this.v),
            p.error_rep_loaded = !0);
            return !1
        }
        ca(a, b, c) {
            try {
                return b()
            } catch (d) {
                if (!this.h(a, d, .01, c, "jserror"))
                    throw d;
            }
        }
        ma(a, b) {
            return (...c)=>this.ca(a, ()=>b.apply(void 0, c))
        }
        W(a, b) {
            b.catch(c=>{
                c = c ? c : "unknown rejection";
                this.H(a, c instanceof Error ? c : Error(c), void 0, this.g || void 0)
            }
            )
        }
    }
    ;const Yi = (a,b)=>{
        b = b.google_js_reporting_queue = b.google_js_reporting_queue || [];
        2048 > b.length && b.push(a)
    }
    ;
    var Zi = (a,b,c,d,e=!1)=>{
        const f = d || window
          , g = "undefined" !== typeof queueMicrotask;
        return function() {
            e && g && queueMicrotask(()=>{
                f.google_rum_task_id_counter = f.google_rum_task_id_counter || 1;
                f.google_rum_task_id_counter += 1
            }
            );
            const h = se();
            let k, m = 3;
            try {
                k = b.apply(this, arguments)
            } catch (l) {
                m = 13;
                if (!c)
                    throw l;
                c(a, l)
            } finally {
                f.google_measure_js_timing && h && Yi({
                    label: a.toString(),
                    value: h,
                    duration: (se() || 0) - h,
                    type: m,
                    ...(e && g && {
                        taskId: f.google_rum_task_id_counter = f.google_rum_task_id_counter || 1
                    })
                }, f)
            }
            return k
        }
    }
      , $i = (a,b)=>Zi(a, b, (c,d)=>{
        (new Xi).H(c, d)
    }
    , void 0, !1);
    function aj(a, b, c) {
        return Zi(a, b, void 0, c, !0).apply()
    }
    function bj(a) {
        if (!a)
            return null;
        var b = I(a, 7);
        if (I(a, 1) || a.getId() || 0 < pc(a, 4, Vb).length) {
            var c = pc(a, 4, Vb);
            b = H(a, 2);
            var d = H(a, 5)
              , e = cj(u(a, 6))
              , f = I(a, 3)
              , g = I(a, 1);
            a = "";
            g && (a += g);
            f && (a += "#" + Ui(f));
            if (c)
                for (f = 0; f < c.length; f++)
                    a += "." + Ui(c[f]);
            b = (c = a) ? new Wi(c,b,d,e) : null
        } else
            b = b ? new Wi(b,H(a, 2),H(a, 5),cj(u(a, 6))) : null;
        return b
    }
    var dj = {
        1: 1,
        2: 2,
        3: 3,
        0: 0
    };
    function cj(a) {
        return null == a ? a : dj[a]
    }
    var ej = {
        1: 0,
        2: 1,
        3: 2,
        4: 3
    };
    function fj(a) {
        return a.google_ama_state = a.google_ama_state || {}
    }
    function gj(a) {
        a = fj(a);
        return a.optimization = a.optimization || {}
    }
    ;var hj = a=>{
        switch (u(a, 8)) {
        case 1:
        case 2:
            if (null == a)
                var b = null;
            else
                b = E(a, U, 1),
                null == b ? b = null : (a = u(a, 2),
                b = null == a ? null : new bh({
                    jb: [b],
                    Bb: a
                }));
            return null != b ? Tg(b) : Vg(Error("Missing dimension when creating placement id"));
        case 3:
            return Vg(Error("Missing dimension when creating placement id"));
        default:
            return Vg(Error("Invalid type: " + u(a, 8)))
        }
    }
    ;
    var ij = (a,b)=>{
        const c = [];
        let d = a;
        for (a = ()=>{
            c.push({
                anchor: d.anchor,
                position: d.position
            });
            return d.anchor == b.anchor && d.position == b.position
        }
        ; d; ) {
            switch (d.position) {
            case 1:
                if (a())
                    return c;
                d.position = 2;
            case 2:
                if (a())
                    return c;
                if (d.anchor.firstChild) {
                    d = {
                        anchor: d.anchor.firstChild,
                        position: 1
                    };
                    continue
                } else
                    d.position = 3;
            case 3:
                if (a())
                    return c;
                d.position = 4;
            case 4:
                if (a())
                    return c
            }
            for (; d && !d.anchor.nextSibling && d.anchor.parentNode != d.anchor.ownerDocument.body; ) {
                d = {
                    anchor: d.anchor.parentNode,
                    position: 3
                };
                if (a())
                    return c;
                d.position = 4;
                if (a())
                    return c
            }
            d && d.anchor.nextSibling ? d = {
                anchor: d.anchor.nextSibling,
                position: 1
            } : d = null
        }
        return c
    }
    ;
    function jj(a, b) {
        const c = new ah
          , d = new $g;
        b.forEach(e=>{
            if (Gc(e, Hi, 1, Ki)) {
                e = Gc(e, Hi, 1, Ki);
                if (E(e, mh, 1) && E(E(e, mh, 1), U, 1) && E(e, mh, 2) && E(E(e, mh, 2), U, 1)) {
                    const g = kj(a, E(E(e, mh, 1), U, 1))
                      , h = kj(a, E(E(e, mh, 2), U, 1));
                    if (g && h)
                        for (var f of ij({
                            anchor: g,
                            position: Cc(E(e, mh, 1), 2)
                        }, {
                            anchor: h,
                            position: Cc(E(e, mh, 2), 2)
                        }))
                            c.set(ha(f.anchor), f.position)
                }
                E(e, mh, 3) && E(E(e, mh, 3), U, 1) && (f = kj(a, E(E(e, mh, 3), U, 1))) && c.set(ha(f), Cc(E(e, mh, 3), 2))
            } else
                Gc(e, Ii, 2, Ki) ? lj(a, Gc(e, Ii, 2, Ki), c) : Gc(e, Gi, 3, Ki) && mj(a, Gc(e, Gi, 3, Ki), d)
        }
        );
        return new nj(c,d)
    }
    class nj {
        constructor(a, b) {
            this.h = a;
            this.g = b
        }
    }
    const lj = (a,b,c)=>{
        E(b, mh, 2) ? (b = E(b, mh, 2),
        (a = kj(a, E(b, U, 1))) && c.set(ha(a), u(b, 2))) : E(b, U, 1) && (a = oj(a, E(b, U, 1))) && a.forEach(d=>{
            d = ha(d);
            c.set(d, 1);
            c.set(d, 4);
            c.set(d, 2);
            c.set(d, 3)
        }
        )
    }
      , mj = (a,b,c)=>{
        E(b, U, 1) && (a = oj(a, E(b, U, 1))) && a.forEach(d=>{
            c.add(ha(d))
        }
        )
    }
      , kj = (a,b)=>(a = oj(a, b)) && 0 < a.length ? a[0] : null
      , oj = (a,b)=>(b = bj(b)) ? b.query(a) : null;
    class V extends Error {
        constructor(a="") {
            super();
            this.name = "TagError";
            this.message = a ? "adsbygoogle.push() error: " + a : "";
            Error.captureStackTrace ? Error.captureStackTrace(this, V) : this.stack = Error().stack || ""
        }
    }
    ;let pj, W;
    const qj = new ze(p);
    var rj = a=>{
        null != a && (p.google_measure_js_timing = a);
        p.google_measure_js_timing || ye(qj)
    }
    ;
    ((a,b=!0)=>{
        pj = a || new Fg;
        "number" !== typeof p.google_srt && (p.google_srt = Math.random());
        Eg(pj, p.google_srt);
        W = new Ie(pj,b,qj);
        W.j(!0);
        "complete" == p.document.readyState ? rj() : qj.g && Yc(p, "load", ()=>{
            rj()
        }
        )
    }
    )();
    var sj = (a,b,c)=>W.ca(a, b, c)
      , tj = (a,b,c)=>{
        const d = P(Dg).g();
        !b.eid && d.length && (b.eid = d.toString());
        He(pj, a, b, !0, c)
    }
      , uj = (a,b)=>{
        W.W(a, b)
    }
      , vj = (a,b,c,d)=>{
        let e;
        le(b) ? e = b.msg || Ge(b.error) : e = Ge(b);
        return 0 == e.indexOf("TagError") ? ((b instanceof ke ? b.error : b).pbr = !0,
        !1) : W.H(a, b, c, d)
    }
    ;
    var wj = class {
        constructor() {
            this.g = Qd();
            this.h = 0
        }
    }
    ;
    function xj(a, b, c) {
        switch (c) {
        case 2:
        case 3:
            break;
        case 1:
        case 4:
            b = b.parentElement;
            break;
        default:
            throw Error("Unknown RelativePosition: " + c);
        }
        for (c = []; b; ) {
            if (yj(b))
                return !0;
            if (a.g.has(b))
                break;
            c.push(b);
            b = b.parentElement
        }
        c.forEach(d=>a.g.add(d));
        return !1
    }
    function zj(a) {
        a = Aj(a);
        return a.has("all") || a.has("after")
    }
    function Bj(a) {
        a = Aj(a);
        return a.has("all") || a.has("before")
    }
    function Aj(a) {
        return (a = a && a.getAttribute("data-no-auto-ads")) ? new Set(a.split("|")) : new Set
    }
    function yj(a) {
        const b = Aj(a);
        return a && ("AUTO-ADS-EXCLUSION-AREA" === a.tagName || b.has("inside") || b.has("all"))
    }
    var Cj = class {
        constructor() {
            this.g = new Set;
            this.h = new wj
        }
    }
    ;
    function Dj(a, b) {
        if (!a)
            return !1;
        a = Cd(a, b);
        if (!a)
            return !1;
        a = a.cssFloat || a.styleFloat;
        return "left" == a || "right" == a
    }
    function Ej(a) {
        for (a = a.previousSibling; a && 1 != a.nodeType; )
            a = a.previousSibling;
        return a ? a : null
    }
    function Fj(a) {
        return !!a.nextSibling || !!a.parentNode && Fj(a.parentNode)
    }
    ;function Gj(a=null) {
        ({googletag: a} = a ?? window);
        return a?.apiReady ? a : void 0
    }
    ;const Hj = a=>{
        const b = Gj(a);
        return b ? La(Ma(b.pubads().getSlots(), c=>a.document.getElementById(c.getSlotElementId())), c=>null != c) : null
    }
    ;
    var Ij = a=>{
        const b = [];
        for (const c of a) {
            a = !0;
            for (let d = 0; d < b.length; d++) {
                const e = b[d];
                if (e.contains(c)) {
                    a = !1;
                    break
                }
                if (c.contains(e)) {
                    a = !1;
                    b[d] = c;
                    break
                }
            }
            a && b.push(c)
        }
        return b
    }
    ;
    function Jj(a, b) {
        if (a.j)
            return !0;
        a.j = !0;
        const c = G(a.i, oh, 1);
        a.h = 0;
        const d = Kj(a.B);
        var e = a.g;
        var f;
        try {
            var g = (f = e.localStorage.getItem("google_ama_settings")) ? lh(f) : null
        } catch (n) {
            g = null
        }
        f = null !== g && K(g, 2, !1);
        g = fj(e);
        f && (g.eatf = !0,
        de(7, [!0, 0, !1]));
        b: {
            var h = {
                rb: !1,
                sb: !1
            }
              , k = Qa(e.document.querySelectorAll(".google-auto-placed"));
            const n = Qa(e.document.querySelectorAll("ins.adsbygoogle[data-anchor-shown],ins.adsbygoogle[data-anchor-status]"))
              , x = Qa(e.document.querySelectorAll("ins.adsbygoogle[data-ad-format=autorelaxed]"));
            var m = (Hj(e) || Qa(e.document.querySelectorAll("div[id^=div-gpt-ad]"))).concat(Qa(e.document.querySelectorAll("iframe[id^=google_ads_iframe]")));
            const v = Qa(e.document.querySelectorAll("div.trc_related_container,div.OUTBRAIN,div[id^=rcjsload],div[id^=ligatusframe],div[id^=crt-],iframe[id^=cto_iframe],div[id^=yandex_], div[id^=Ya_sync],iframe[src*=adnxs],div.advertisement--appnexus,div[id^=apn-ad],div[id^=amzn-native-ad],iframe[src*=amazon-adsystem],iframe[id^=ox_],iframe[src*=openx],img[src*=openx],div[class*=adtech],div[id^=adtech],iframe[src*=adtech],div[data-content-ad-placement=true],div.wpcnt div[id^=atatags-]"))
              , w = Qa(e.document.querySelectorAll("ins.adsbygoogle-ablated-ad-slot"))
              , z = Qa(e.document.querySelectorAll("div.googlepublisherpluginad"))
              , A = Qa(e.document.querySelectorAll("html > ins.adsbygoogle"));
            let D = [].concat(Qa(e.document.querySelectorAll("iframe[id^=aswift_],iframe[id^=google_ads_frame]")), Qa(e.document.querySelectorAll("body ins.adsbygoogle")));
            f = [];
            for (const [J,F] of [[h.ec, k], [h.rb, n], [h.jc, x], [h.hc, m], [h.kc, v], [h.dc, w], [h.ic, z], [h.sb, A]])
                !1 === J ? f = f.concat(F) : D = D.concat(F);
            h = Ij(D);
            f = Ij(f);
            h = h.slice(0);
            for (l of f)
                for (f = 0; f < h.length; f++)
                    (l.contains(h[f]) || h[f].contains(l)) && h.splice(f, 1);
            var l = h;
            e = ci(e).clientHeight;
            for (f = 0; f < l.length; f++)
                if (!(l[f].getBoundingClientRect().top > e)) {
                    e = !0;
                    break b
                }
            e = !1
        }
        e = e ? g.eatfAbg = !0 : !1;
        if (e)
            return !0;
        e = new $g([2]);
        for (g = 0; g < c.length; g++) {
            l = a;
            h = c[g];
            f = g;
            m = b;
            if (E(h, fh, 4) && e.contains(Cc(E(h, fh, 4), 1)) && 1 === u(h, 8) && Lj(h, d)) {
                l.h++;
                if (m = Mj(l, h, m, d))
                    k = fj(l.g),
                    k.numAutoAdsPlaced || (k.numAutoAdsPlaced = 0),
                    E(h, U, 1) && null != H(E(h, U, 1), 5) && (k.numPostPlacementsPlaced ? k.numPostPlacementsPlaced++ : k.numPostPlacementsPlaced = 1),
                    null == k.placed && (k.placed = []),
                    k.numAutoAdsPlaced++,
                    k.placed.push({
                        index: f,
                        element: m.ea
                    }),
                    de(7, [!1, l.h, !0]);
                l = m
            } else
                l = null;
            if (l)
                return !0
        }
        de(7, [!1, a.h, !1]);
        return !1
    }
    function Mj(a, b, c, d) {
        if (!Lj(b, d) || 1 != u(b, 8))
            return null;
        d = E(b, U, 1);
        if (!d)
            return null;
        d = bj(d);
        if (!d)
            return null;
        d = d.query(a.g.document);
        if (0 == d.length)
            return null;
        d = d[0];
        var e = ej[u(b, 2)];
        e = void 0 === e ? null : e;
        var f;
        if (!(f = null == e)) {
            a: {
                f = a.g;
                switch (e) {
                case 0:
                    f = Dj(Ej(d), f);
                    break a;
                case 3:
                    f = Dj(d, f);
                    break a;
                case 2:
                    var g = d.lastChild;
                    f = Dj(g ? 1 == g.nodeType ? g : Ej(g) : null, f);
                    break a
                }
                f = !1
            }
            if (c = !f && !(!c && 2 == e && !Fj(d)))
                c = 1 == e || 2 == e ? d : d.parentNode,
                c = !(c && !rh(c) && 0 >= c.offsetWidth);
            f = !c
        }
        if (!(c = f)) {
            c = a.v;
            f = u(b, 2);
            g = ha(d);
            g = c.h.g.get(g);
            if (!(g = g ? g.contains(f) : !1))
                a: {
                    if (c.g.contains(ha(d)))
                        switch (f) {
                        case 2:
                        case 3:
                            g = !0;
                            break a;
                        default:
                            g = !1;
                            break a
                        }
                    for (f = d.parentElement; f; ) {
                        if (c.g.contains(ha(f))) {
                            g = !0;
                            break a
                        }
                        f = f.parentElement
                    }
                    g = !1
                }
            c = g
        }
        if (!c) {
            c = a.A;
            g = u(b, 2);
            a: switch (g) {
            case 1:
                f = zj(d.previousElementSibling) || Bj(d);
                break a;
            case 4:
                f = zj(d) || Bj(d.nextElementSibling);
                break a;
            case 2:
                f = Bj(d.firstElementChild);
                break a;
            case 3:
                f = zj(d.lastElementChild);
                break a;
            default:
                throw Error("Unknown RelativePosition: " + g);
            }
            g = xj(c, d, g);
            c = c.h;
            tj("ama_exclusion_zone", {
                typ: f ? g ? "siuex" : "siex" : g ? "suex" : "noex",
                cor: c.g,
                num: c.h++,
                dvc: Kd()
            }, .1);
            c = f || g
        }
        if (c)
            return null;
        f = E(b, nh, 3);
        c = {};
        f && (c.gb = I(f, 1),
        c.Ra = I(f, 2),
        c.mb = !!oc(f, 3));
        f = E(b, fh, 4) && Cc(E(b, fh, 4), 2) ? Cc(E(b, fh, 4), 2) : null;
        f = ih(f);
        g = null != H(b, 12) ? H(b, 12) : null;
        g = null == g ? null : new hh(null,{
            google_ml_rank: g
        });
        b = Nj(a, b);
        b = gh(a.m, f, g, b);
        f = a.g;
        a = a.G;
        var h = f.document
          , k = c.mb || !1;
        g = (new qd(h)).createElement("DIV");
        const m = g.style;
        m.width = "100%";
        m.height = "auto";
        m.clear = k ? "both" : "none";
        k = g.style;
        k.textAlign = "center";
        c.Ab && Ai(k, c.Ab);
        h = (new qd(h)).createElement("INS");
        k = h.style;
        k.display = "block";
        k.margin = "auto";
        k.backgroundColor = "transparent";
        c.gb && (k.marginTop = c.gb);
        c.Ra && (k.marginBottom = c.Ra);
        c.ib && Ai(k, c.ib);
        g.appendChild(h);
        c = {
            wa: g,
            ea: h
        };
        c.ea.setAttribute("data-ad-format", "auto");
        g = [];
        if (h = b && b.Ta)
            c.wa.className = h.join(" ");
        h = c.ea;
        h.className = "adsbygoogle";
        h.setAttribute("data-ad-client", a);
        g.length && h.setAttribute("data-ad-channel", g.join("+"));
        a: {
            try {
                var l = c.wa;
                if (Q(Bh)) {
                    {
                        const z = Yh(d, e);
                        if (z.init) {
                            var n = z.init;
                            for (d = n; d = z.fa(d); )
                                n = d;
                            var x = {
                                anchor: n,
                                position: z.la
                            }
                        } else
                            x = {
                                anchor: d,
                                position: e
                            }
                    }
                    l["google-ama-order-assurance"] = 0;
                    Xh(l, x.anchor, x.position)
                } else
                    Xh(l, d, e);
                b: {
                    var v = c.ea;
                    v.dataset.adsbygoogleStatus = "reserved";
                    v.className += " adsbygoogle-noablate";
                    l = {
                        element: v
                    };
                    var w = b && b.bb;
                    if (v.hasAttribute("data-pub-vars")) {
                        try {
                            w = JSON.parse(v.getAttribute("data-pub-vars"))
                        } catch (z) {
                            break b
                        }
                        v.removeAttribute("data-pub-vars")
                    }
                    w && (l.params = w);
                    (f.adsbygoogle = f.adsbygoogle || []).push(l)
                }
            } catch (z) {
                (v = c.wa) && v.parentNode && (w = v.parentNode,
                w.removeChild(v),
                rh(w) && (w.style.display = w.getAttribute("data-init-display") || "none"));
                v = !1;
                break a
            }
            v = !0
        }
        return v ? c : null
    }
    function Nj(a, b) {
        return Xg(Zg(hj(b).map(jh), c=>{
            fj(a.g).exception = c
        }
        ))
    }
    const Oj = class {
        constructor(a, b, c, d, e) {
            this.g = a;
            this.G = b;
            this.i = c;
            this.m = e || null;
            (this.B = d) ? (a = a.document,
            d = G(d, Ji, 5),
            d = jj(a, d)) : d = jj(a.document, []);
            this.v = d;
            this.A = new Cj;
            this.h = 0;
            this.j = !1
        }
    }
    ;
    function Kj(a) {
        const b = {};
        a && pc(a, 6, Lb).forEach(c=>{
            b[c] = !0
        }
        );
        return b
    }
    function Lj(a, b) {
        return a && lc(a, fh, 4) && b[Cc(E(a, fh, 4), 2)] ? !1 : !0
    }
    ;var Pj = Oc(class extends N {
    }
    );
    function Qj(a) {
        try {
            var b = a.localStorage.getItem("google_auto_fc_cmp_setting") || null
        } catch (d) {
            b = null
        }
        const c = b;
        return c ? Wg(()=>Pj(c)) : Tg(null)
    }
    ;function Rj() {
        if (Sj)
            return Sj;
        var a = fe() || window;
        const b = a.google_persistent_state_async;
        return null != b && "object" == typeof b && null != b.S && "object" == typeof b.S ? Sj = b : a.google_persistent_state_async = Sj = new Tj
    }
    function Uj(a, b, c) {
        b = Vj[b] || `google_ps_ ${b}`;
        a = a.S;
        const d = a[b];
        return void 0 === d ? (a[b] = c(),
        a[b]) : d
    }
    function Wj(a, b, c) {
        return Uj(a, b, ()=>c)
    }
    function Xj(a, b, c) {
        a.S[Vj[b] || `google_ps_ ${b}`] = c
    }
    function Yj(a, b) {
        Xj(a, 38, b)
    }
    var Tj = class {
        constructor() {
            this.S = {}
        }
    }
      , Sj = null;
    const Vj = {
        [8]: "google_prev_ad_formats_by_region",
        [9]: "google_prev_ad_slotnames_by_region"
    };
    function Zj(a) {
        var b = new ak;
        return y(b, 5, Hb(a))
    }
    var ak = class extends N {
        constructor() {
            super()
        }
    }
    ;
    ak.s = [10];
    function bk() {
        this.m = this.m;
        this.i = this.i
    }
    bk.prototype.m = !1;
    function ck(a, b) {
        a.m ? b() : (a.i || (a.i = []),
        a.i.push(b))
    }
    ;const dk = a=>{
        void 0 !== a.addtlConsent && "string" !== typeof a.addtlConsent && (a.addtlConsent = void 0);
        void 0 !== a.gdprApplies && "boolean" !== typeof a.gdprApplies && (a.gdprApplies = void 0);
        return void 0 !== a.tcString && "string" !== typeof a.tcString || void 0 !== a.listenerId && "number" !== typeof a.listenerId ? 2 : a.cmpStatus && "error" !== a.cmpStatus ? 0 : 3
    }
    ;
    function ek(a) {
        if (!1 === a.gdprApplies)
            return !0;
        void 0 === a.internalErrorState && (a.internalErrorState = dk(a));
        return "error" === a.cmpStatus || 0 !== a.internalErrorState ? a.internalBlockOnErrors ? (Xd({
            e: String(a.internalErrorState)
        }),
        !1) : !0 : "loaded" !== a.cmpStatus || "tcloaded" !== a.eventStatus && "useractioncomplete" !== a.eventStatus ? !1 : !0
    }
    function fk(a) {
        if (a.g)
            return a.g;
        a.g = Jd(a.h, "__tcfapiLocator");
        return a.g
    }
    function gk(a) {
        return "function" === typeof a.h.__tcfapi || null != fk(a)
    }
    function ik(a, b, c, d) {
        c || (c = ()=>{}
        );
        if ("function" === typeof a.h.__tcfapi)
            a = a.h.__tcfapi,
            a(b, 2, c, d);
        else if (fk(a)) {
            jk(a);
            const e = ++a.G;
            a.A[e] = c;
            a.g && a.g.postMessage({
                __tcfapiCall: {
                    command: b,
                    version: 2,
                    callId: e,
                    parameter: d
                }
            }, "*")
        } else
            c({}, !1)
    }
    function jk(a) {
        a.j || (a.j = b=>{
            try {
                var c = ("string" === typeof b.data ? JSON.parse(b.data) : b.data).__tcfapiReturn;
                a.A[c.callId](c.returnValue, c.success)
            } catch (d) {}
        }
        ,
        Yc(a.h, "message", a.j))
    }
    class kk extends bk {
        constructor(a) {
            var b = {};
            super();
            this.h = a;
            this.g = null;
            this.A = {};
            this.G = 0;
            this.B = b.timeoutMs ?? 500;
            this.v = b.cc ?? !1;
            this.j = null
        }
        addEventListener(a) {
            let b = {
                internalBlockOnErrors: this.v
            };
            const c = Xc(()=>a(b));
            let d = 0;
            -1 !== this.B && (d = setTimeout(()=>{
                b.tcString = "tcunavailable";
                b.internalErrorState = 1;
                c()
            }
            , this.B));
            const e = (f,g)=>{
                clearTimeout(d);
                f ? (b = f,
                b.internalErrorState = dk(b),
                b.internalBlockOnErrors = this.v,
                g && 0 === b.internalErrorState || (b.tcString = "tcunavailable",
                g || (b.internalErrorState = 3))) : (b.tcString = "tcunavailable",
                b.internalErrorState = 3);
                a(b)
            }
            ;
            try {
                ik(this, "addEventListener", e)
            } catch (f) {
                b.tcString = "tcunavailable",
                b.internalErrorState = 3,
                d && (clearTimeout(d),
                d = 0),
                c()
            }
        }
        removeEventListener(a) {
            a && a.listenerId && ik(this, "removeEventListener", null, a.listenerId)
        }
    }
    ;var pk = ({l: a, P: b, timeoutMs: c, aa: d, ga: e=!1, ha: f=!1})=>{
        b = lk({
            l: a,
            P: b,
            ga: e,
            ha: f
        });
        null != b.g || "tcunav" != b.h.message ? d(b) : mk(a, c).then(g=>g.map(nk)).then(g=>g.map(h=>ok(a, h))).then(d)
    }
      , lk = ({l: a, P: b, ga: c=!1, ha: d=!1})=>{
        if (!qk({
            l: a,
            P: b,
            ga: c,
            ha: d
        }))
            return ok(a, Zj(!0));
        b = Rj();
        return (b = Wj(b, 24)) ? ok(a, nk(b)) : Vg(Error("tcunav"))
    }
    ;
    function qk({l: a, P: b, ga: c, ha: d}) {
        if (!(d = !d && gk(new kk(a)))) {
            if (c = !c) {
                if (b) {
                    a = Qj(a);
                    if (null != a.g)
                        if ((a = a.getValue()) && null != u(a, 1))
                            b: switch (a = u(a, 1),
                            a) {
                            case 1:
                                a = !0;
                                break b;
                            default:
                                throw Error("Unhandled AutoGdprFeatureStatus: " + a);
                            }
                        else
                            a = !1;
                    else
                        W.H(806, a.h, void 0, void 0),
                        a = !1;
                    b = !a
                }
                c = b
            }
            d = c
        }
        return d ? !0 : !1
    }
    function mk(a, b) {
        return Promise.race([rk(), sk(a, b)])
    }
    function rk() {
        return (new Promise(a=>{
            var b = Rj();
            a = {
                resolve: a
            };
            const c = Wj(b, 25, []);
            c.push(a);
            Xj(b, 25, c)
        }
        )).then(tk)
    }
    function sk(a, b) {
        return new Promise(c=>{
            a.setTimeout(c, b, Vg(Error("tcto")))
        }
        )
    }
    function tk(a) {
        return a ? Tg(a) : Vg(Error("tcnull"))
    }
    function nk(a) {
        if (ek(a))
            if (!1 !== a.gdprApplies && "tcunavailable" !== a.tcString && void 0 !== a.gdprApplies && "string" === typeof a.tcString && a.tcString.length) {
                b: {
                    if (a.publisher && a.publisher.restrictions) {
                        var b = a.publisher.restrictions["1"];
                        if (void 0 !== b) {
                            b = b["755"];
                            break b
                        }
                    }
                    b = void 0
                }
                0 === b ? a = !1 : a.purpose && a.vendor ? (b = a.vendor.consents,
                (b = !(!b || !b["755"])) && a.purposeOneTreatment && "CH" === a.publisherCC ? a = !0 : (b && (a = a.purpose.consents,
                b = !(!a || !a["1"])),
                a = b)) : a = !0
            } else
                a = !0;
        else
            a = !1;
        return Zj(a)
    }
    function ok(a, b) {
        return (a = $d(b, a)) ? Tg(a) : Vg(Error("unav"))
    }
    ;var uk = class extends N {
    }
    ;
    uk.s = [1, 2, 3];
    var vk = class extends N {
    }
    ;
    vk.s = [1, 2, 3];
    var wk = class extends N {
        g() {
            return E(this, uk, 2)
        }
        h() {
            return E(this, vk, 3)
        }
    }
    ;
    const xk = class {
        constructor(a) {
            this.exception = a
        }
    }
    ;
    function yk(a, b) {
        try {
            var c = a.h
              , d = c.resolve
              , e = a.g;
            fj(e.g);
            G(e.i, oh, 1);
            d.call(c, new xk(b))
        } catch (f) {
            a = a.h,
            b = f,
            Lg(a),
            a.g = 2,
            a.i = b,
            Ng(a.h)
        }
    }
    var zk = class {
        constructor(a, b, c) {
            this.i = a;
            this.g = b;
            this.h = c
        }
        start() {
            this.j()
        }
        j() {
            try {
                switch (this.i.document.readyState) {
                case "complete":
                case "interactive":
                    Jj(this.g, !0);
                    yk(this);
                    break;
                default:
                    Jj(this.g, !1) ? yk(this) : this.i.setTimeout(ma(this.j, this), 100)
                }
            } catch (a) {
                yk(this, a)
            }
        }
    }
    ;
    var Ak = class extends N {
        constructor() {
            super()
        }
        getVersion() {
            return Dc(H(this, 2))
        }
    }
    ;
    Ak.s = [3];
    function Bk(a) {
        return Ua(2 > (a.length + 3) % 4 ? a + "A" : a).map(b=>b.toString(2).padStart(8, "0")).join("")
    }
    function Ck(a) {
        if (!/^[0-1]+$/.test(a))
            throw Error(`Invalid input [${a}] not a bit string.`);
        return parseInt(a, 2)
    }
    function Dk(a) {
        if (!/^[0-1]+$/.test(a))
            throw Error(`Invalid input [${a}] not a bit string.`);
        const b = [1, 2, 3, 5];
        let c = 0;
        for (let d = 0; d < a.length - 1; d++)
            b.length <= d && b.push(b[d - 1] + b[d - 2]),
            c += parseInt(a[d], 2) * b[d];
        return c
    }
    ;function Ek(a) {
        var b = Bk(a + "A")
          , c = Ck(b.slice(0, 6));
        a = Ck(b.slice(6, 12));
        var d = new Ak;
        c = C(d, 1, Nb(c), 0);
        a = C(c, 2, Nb(a), 0);
        b = b.slice(12);
        c = Ck(b.slice(0, 12));
        d = [];
        let e = b.slice(12).replace(/0+$/, "");
        for (let k = 0; k < c; k++) {
            if (0 === e.length)
                throw Error(`Found ${k} of ${c} sections [${d}] but reached end of input [${b}]`);
            var f = 0 === Ck(e[0]);
            e = e.slice(1);
            var g = Fk(e, b)
              , h = 0 === d.length ? 0 : d[d.length - 1];
            h = Dk(g) + h;
            e = e.slice(g.length);
            if (f)
                d.push(h);
            else {
                f = Fk(e, b);
                g = Dk(f);
                for (let m = 0; m <= g; m++)
                    d.push(h + m);
                e = e.slice(f.length)
            }
        }
        if (0 < e.length)
            throw Error(`Found ${c} sections [${d}] but has remaining input [${e}], entire input [${b}]`);
        return rc(a, 3, d, Mb)
    }
    function Fk(a, b) {
        const c = a.indexOf("11");
        if (-1 === c)
            throw Error(`Expected section bitstring but not found in [${a}] part of [${b}]`);
        return a.slice(0, c + 2)
    }
    ;var Gk = "a".charCodeAt()
      , Hk = dd(Jg)
      , Ik = dd(Kg);
    function Jk() {
        var a = new Kk;
        return Hc(a, 1, 0)
    }
    function Lk(a) {
        const b = Ec(a, 1);
        a = Dc(H(a, 2));
        return new Date(1E3 * b + a / 1E6)
    }
    var Kk = class extends N {
    }
    ;
    function Mk(a, b) {
        if (a.g + b > a.h.length)
            throw Error("Requested length " + b + " is past end of string.");
        const c = a.h.substring(a.g, a.g + b);
        a.g += b;
        return parseInt(c, 2)
    }
    function Nk(a) {
        let b = Mk(a, 12);
        const c = [];
        for (; b--; ) {
            var d = !0 === !!Mk(a, 1)
              , e = Mk(a, 16);
            if (d)
                for (d = Mk(a, 16); e <= d; e++)
                    c.push(e);
            else
                c.push(e)
        }
        c.sort((f,g)=>f - g);
        return c
    }
    function Ok(a, b, c) {
        const d = [];
        for (let e = 0; e < b; e++)
            if (Mk(a, 1)) {
                const f = e + 1;
                if (c && -1 === c.indexOf(f))
                    throw Error(`ID: ${f} is outside of allowed values!`);
                d.push(f)
            }
        return d
    }
    function Pk(a) {
        const b = Mk(a, 16);
        return !0 === !!Mk(a, 1) ? (a = Nk(a),
        a.forEach(c=>{
            if (c > b)
                throw Error(`ID ${c} is past MaxVendorId ${b}!`);
        }
        ),
        a) : Ok(a, b)
    }
    class Qk {
        constructor(a) {
            if (/[^01]/.test(a))
                throw Error(`Input bitstring ${a} is malformed!`);
            this.h = a;
            this.g = 0
        }
        skip(a) {
            this.g += a
        }
    }
    ;var Sk = (a,b)=>{
        try {
            var c = Ua(a.split(".")[0]).map(e=>e.toString(2).padStart(8, "0")).join("");
            const d = new Qk(c);
            c = {};
            c.tcString = a;
            c.gdprApplies = !0;
            d.skip(78);
            c.cmpId = Mk(d, 12);
            c.cmpVersion = Mk(d, 12);
            d.skip(30);
            c.tcfPolicyVersion = Mk(d, 6);
            c.isServiceSpecific = !!Mk(d, 1);
            c.useNonStandardStacks = !!Mk(d, 1);
            c.specialFeatureOptins = Rk(Ok(d, 12, Ik), Ik);
            c.purpose = {
                consents: Rk(Ok(d, 24, Hk), Hk),
                legitimateInterests: Rk(Ok(d, 24, Hk), Hk)
            };
            c.purposeOneTreatment = !!Mk(d, 1);
            c.publisherCC = String.fromCharCode(Gk + Mk(d, 6)) + String.fromCharCode(Gk + Mk(d, 6));
            c.vendor = {
                consents: Rk(Pk(d), b),
                legitimateInterests: Rk(Pk(d), b)
            };
            return c
        } catch (d) {
            return null
        }
    }
    ;
    const Rk = (a,b)=>{
        const c = {};
        if (Array.isArray(b) && 0 !== b.length)
            for (const d of b)
                c[d] = -1 !== a.indexOf(d);
        else
            for (const d of a)
                c[d] = !0;
        delete c[0];
        return c
    }
    ;
    var Tk = class extends N {
        g() {
            return null != I(this, 2)
        }
    }
    ;
    var Uk = class extends N {
        g() {
            return null != I(this, 2)
        }
    }
    ;
    var Vk = class extends N {
    }
    ;
    var Wk = class extends N {
    }
      , Xk = Oc(Wk);
    Wk.s = [7];
    function Yk(a) {
        a = Zk(a);
        try {
            var b = a ? Xk(a) : null
        } catch (c) {
            b = null
        }
        return b ? E(b, Vk, 4) || null : null
    }
    function Zk(a) {
        a = (new Zd(a)).get("FCCDCF", "");
        if (a)
            if (a.startsWith("%"))
                try {
                    var b = decodeURIComponent(a)
                } catch (c) {
                    b = null
                }
            else
                b = a;
        else
            b = null;
        return b
    }
    ;function $k(a) {
        a.__uspapiPostMessageReady || al(new bl(a))
    }
    function al(a) {
        a.g = b=>{
            const c = "string" === typeof b.data;
            let d;
            try {
                d = c ? JSON.parse(b.data) : b.data
            } catch (f) {
                return
            }
            const e = d.__uspapiCall;
            e && "getUSPData" === e.command && a.l.__uspapi(e.command, e.version, (f,g)=>{
                const h = {};
                h.__uspapiReturn = {
                    returnValue: f,
                    success: g,
                    callId: e.callId
                };
                f = c ? JSON.stringify(h) : h;
                b.source && "function" === typeof b.source.postMessage && b.source.postMessage(f, b.origin);
                return f
            }
            )
        }
        ;
        a.l.addEventListener("message", a.g);
        a.l.__uspapiPostMessageReady = !0
    }
    var bl = class {
        constructor(a) {
            this.l = a;
            this.g = null
        }
    }
    ;
    dd(Jg).map(a=>Number(a));
    dd(Kg).map(a=>Number(a));
    function cl(a) {
        a.__tcfapiPostMessageReady || dl(new el(a))
    }
    function dl(a) {
        a.h = b=>{
            const c = "string" == typeof b.data;
            let d;
            try {
                d = c ? JSON.parse(b.data) : b.data
            } catch (f) {
                return
            }
            const e = d.__tcfapiCall;
            !e || "ping" !== e.command && "getTCData" !== e.command && "addEventListener" !== e.command && "removeEventListener" !== e.command || a.g.__tcfapi(e.command, e.version, (f,g)=>{
                const h = {};
                h.__tcfapiReturn = "removeEventListener" === e.command ? {
                    success: f,
                    callId: e.callId
                } : {
                    returnValue: f,
                    success: g,
                    callId: e.callId
                };
                f = c ? JSON.stringify(h) : h;
                b.source && "function" === typeof b.source.postMessage && b.source.postMessage(f, b.origin);
                return f
            }
            , e.parameter)
        }
        ;
        a.g.addEventListener("message", a.h);
        a.g.__tcfapiPostMessageReady = !0
    }
    var el = class {
        constructor(a) {
            this.g = a;
            this.h = null
        }
    }
    ;
    var fl = class extends N {
    }
    ;
    var gl = class extends N {
        g() {
            return null != I(this, 1)
        }
    }
      , hl = Oc(gl);
    gl.s = [2];
    function il(a, b, c) {
        function d(l) {
            if (10 > l.length)
                return null;
            var n = g(l.slice(0, 4));
            n = h(n);
            l = g(l.slice(6, 10));
            l = k(l);
            return "1" + n + l + "N"
        }
        function e(l) {
            if (10 > l.length)
                return null;
            var n = g(l.slice(0, 6));
            n = h(n);
            l = g(l.slice(6, 10));
            l = k(l);
            return "1" + n + l + "N"
        }
        function f(l) {
            if (12 > l.length)
                return null;
            var n = g(l.slice(0, 6));
            n = h(n);
            l = g(l.slice(8, 12));
            l = k(l);
            return "1" + n + l + "N"
        }
        function g(l) {
            const n = [];
            let x = 0;
            for (let v = 0; v < l.length / 2; v++)
                n.push(Ck(l.slice(x, x + 2))),
                x += 2;
            return n
        }
        function h(l) {
            return l.every(n=>1 === n) ? "Y" : "N"
        }
        function k(l) {
            return l.some(n=>1 === n) ? "Y" : "N"
        }
        if (0 === a.length)
            return null;
        a = a.split(".");
        if (2 < a.length)
            return null;
        a = Bk(a[0]);
        const m = Ck(a.slice(0, 6));
        a = a.slice(6);
        if (1 !== m)
            return null;
        switch (b) {
        case 8:
            return d(a);
        case 10:
        case 12:
        case 9:
            return e(a);
        case 11:
            return c ? f(a) : null;
        default:
            return null
        }
    }
    ;var jl = (a,b)=>{
        const c = a.document
          , d = ()=>{
            if (!a.frames[b])
                if (c.body) {
                    const e = Bd("IFRAME", c);
                    e.style.display = "none";
                    e.style.width = "0px";
                    e.style.height = "0px";
                    e.style.border = "none";
                    e.style.zIndex = "-1000";
                    e.style.left = "-1000px";
                    e.style.top = "-1000px";
                    e.name = b;
                    c.body.appendChild(e)
                } else
                    a.setTimeout(d, 5)
        }
        ;
        d()
    }
    ;
    function kl() {
        var a = Q(uh);
        S !== S.top || S.__uspapi || S.frames.__uspapiLocator || (a = new ll(a),
        ml(a),
        nl(a))
    }
    function ml(a) {
        !a.j || a.g.__uspapi || a.g.frames.__uspapiLocator || (a.g.__uspapiManager = "fc",
        jl(a.g, "__uspapiLocator"),
        oa("__uspapi", (...b)=>ol(a, ...b), a.g),
        $k(a.g))
    }
    function nl(a) {
        !a.h || a.g.__tcfapi || a.g.frames.__tcfapiLocator || (a.g.__tcfapiManager = "fc",
        jl(a.g, "__tcfapiLocator"),
        a.g.__tcfapiEventListeners = a.g.__tcfapiEventListeners || [],
        oa("__tcfapi", (...b)=>pl(a, ...b), a.g),
        cl(a.g))
    }
    function ol(a, b, c, d) {
        "function" === typeof d && "getUSPData" === b && d({
            version: 1,
            uspString: a.j
        }, !0)
    }
    function ql(a, b) {
        if (!b?.g() || 0 === L(b, 1).length || 0 == G(b, fl, 2).length)
            return null;
        const c = L(b, 1);
        let d;
        try {
            var e = Ek(c.split("~")[0]);
            d = c.includes("~") ? c.split("~").slice(1) : []
        } catch (f) {
            return null
        }
        b = G(b, fl, 2).reduce((f,g)=>Ec(rl(f), 1) > Ec(rl(g), 1) ? f : g);
        e = pc(e, 3, Ob).indexOf(Dc(H(b, 1)));
        return -1 === e || e >= d.length ? null : {
            uspString: il(d[e], Dc(H(b, 1)), a.m),
            va: Lk(rl(b))
        }
    }
    function sl(a) {
        a = a.find(b=>13 === M(b, 1));
        if (a?.g())
            try {
                return hl(L(a, 2))
            } catch (b) {}
        return null
    }
    function rl(a) {
        return lc(a, Kk, 2) ? E(a, Kk, 2) : Jk()
    }
    function pl(a, b, c, d, e=null) {
        if ("function" === typeof d)
            if (c && (2.1 < c || 1 >= c))
                d(null, !1);
            else
                switch (c = a.g.__tcfapiEventListeners,
                b) {
                case "getTCData":
                    !e || Array.isArray(e) && e.every(f=>"number" === typeof f) ? d(tl(a, e, null), !0) : d(null, !1);
                    break;
                case "ping":
                    d({
                        gdprApplies: !0,
                        cmpLoaded: !0,
                        cmpStatus: "loaded",
                        displayStatus: "disabled",
                        apiVersion: "2.1",
                        cmpVersion: 2,
                        cmpId: 300
                    });
                    break;
                case "addEventListener":
                    b = c.push(d);
                    d(tl(a, null, b - 1), !0);
                    break;
                case "removeEventListener":
                    c[e] ? (c[e] = null,
                    d(!0)) : d(!1);
                    break;
                case "getInAppTCData":
                case "getVendorList":
                    d(null, !1)
                }
    }
    function tl(a, b, c) {
        if (!a.h)
            return null;
        b = Sk(a.h, b);
        b.addtlConsent = null != a.i ? a.i : void 0;
        b.cmpStatus = "loaded";
        b.eventStatus = "tcloaded";
        null != c && (b.listenerId = c);
        return b
    }
    class ll {
        constructor(a) {
            var b = S;
            this.g = b;
            this.m = a;
            a = Zk(this.g.document);
            try {
                var c = a ? Xk(a) : null
            } catch (e) {
                c = null
            }
            (a = c) ? (c = E(a, Uk, 5) || null,
            a = G(a, Tk, 7),
            a = sl(a ?? []),
            c = {
                Sa: c,
                Va: a
            }) : c = {
                Sa: null,
                Va: null
            };
            a = c;
            c = ql(this, a.Va);
            a = a.Sa;
            if (a?.g() && 0 !== L(a, 2).length) {
                var d = lc(a, Kk, 1) ? E(a, Kk, 1) : Jk();
                a = {
                    uspString: L(a, 2),
                    va: Lk(d)
                }
            } else
                a = null;
            this.j = a && c ? c.va > a.va ? c.uspString : a.uspString : a ? a.uspString : c ? c.uspString : null;
            this.h = (c = Yk(b.document)) && null != I(c, 1) ? L(c, 1) : null;
            this.i = (b = Yk(b.document)) && null != I(b, 2) ? L(b, 2) : null
        }
    }
    ;const ul = {
        google_ad_channel: !0,
        google_ad_host: !0
    };
    function vl(a, b) {
        a.location.href && a.location.href.substring && (b.url = a.location.href.substring(0, 200));
        tj("ama", b, .01)
    }
    function wl(a) {
        const b = {};
        Ed(ul, (c,d)=>{
            d in a && (b[d] = a[d])
        }
        );
        return b
    }
    ;const xl = a=>{
        const b = /[a-zA-Z0-9._~-]/
          , c = /%[89a-zA-Z]./;
        return a.replace(/(%[a-zA-Z0-9]{2})/g, function(d) {
            if (!d.match(c)) {
                const e = decodeURIComponent(d);
                if (e.match(b))
                    return e
            }
            return d.toUpperCase()
        })
    }
      , yl = a=>{
        let b = "";
        const c = /[/%?&=]/;
        for (let d = 0; d < a.length; ++d) {
            const e = a[d];
            b = e.match(c) ? b + e : b + encodeURIComponent(e)
        }
        return b
    }
    ;
    var zl = a=>{
        a = pc(a, 2, Lb);
        if (!a)
            return !1;
        for (let b = 0; b < a.length; b++)
            if (1 == a[b])
                return !0;
        return !1
    }
      , Bl = (a,b)=>{
        a = yl(xl(a.location.pathname)).replace(/(^\/)|(\/$)/g, "");
        const c = Fd(a)
          , d = Al(a);
        return b.find(e=>{
            if (lc(e, Fi, 7)) {
                var f = E(e, Fi, 7);
                f = Pb(u(f, 1))
            } else
                f = Pb(u(e, 1));
            e = lc(e, Fi, 7) ? Cc(E(e, Fi, 7), 2) : 2;
            if ("number" !== typeof f)
                return !1;
            switch (e) {
            case 1:
                return f == c;
            case 2:
                return d[f] || !1
            }
            return !1
        }
        ) || null
    }
    ;
    const Al = a=>{
        const b = {};
        for (; ; ) {
            b[Fd(a)] = !0;
            if (!a)
                return b;
            a = a.substring(0, a.lastIndexOf("/"))
        }
    }
    ;
    var Cl = a=>{
        a = E(a, Ei, 3);
        return !a || Bc(a, 1) <= Date.now() ? !1 : !0
    }
    ;
    function Dl(a) {
        if (Q(zh))
            var b = null;
        else
            try {
                b = a.getItem("google_ama_config")
            } catch (d) {
                b = null
            }
        try {
            var c = b ? Ri(b) : null
        } catch (d) {
            c = null
        }
        return c
    }
    ;var El = class extends N {
        g() {
            return E(this, wk, 2)
        }
        h() {
            return K(this, 3)
        }
    }
    ;
    var Fl = class extends N {
        g() {
            return pc(this, 1, Vb)
        }
        h() {
            return E(this, El, 2)
        }
    }
    ;
    Fl.s = [1];
    var Gl = class extends N {
        getId() {
            return Dc(H(this, 1))
        }
    }
    ;
    Gl.s = [2];
    var Hl = class extends N {
    }
    ;
    Hl.s = [2];
    var Il = class extends N {
    }
    ;
    Il.s = [2];
    var Jl = class extends N {
        g() {
            return Ec(this, 2)
        }
        h() {
            return Ec(this, 4)
        }
        i() {
            return K(this, 3)
        }
    }
    ;
    var Kl = class extends N {
    }
    ;
    Kl.s = [1, 4, 2, 3];
    var Ml = class extends N {
        h() {
            return Gc(this, El, 13, Ll)
        }
        j() {
            return void 0 !== mc(this, El, uc(this, Ll, 13))
        }
        g() {
            return Gc(this, Fl, 14, Ll)
        }
        i() {
            return void 0 !== mc(this, Fl, uc(this, Ll, 14))
        }
    }
    ;
    Ml.s = [19];
    var Ll = [13, 14];
    let Nl = void 0;
    function Ol(a) {
        Lc(Nl, Ke);
        Nl = a
    }
    ;function X(a) {
        return a.google_ad_modifications = a.google_ad_modifications || {}
    }
    function Pl(a) {
        a = X(a);
        const b = a.space_collapsing || "none";
        return a.remove_ads_by_default ? {
            Qa: !0,
            Gb: b,
            sa: a.ablation_viewport_offset
        } : null
    }
    function Ql(a, b) {
        a = X(a);
        a.had_ads_ablation = !0;
        a.remove_ads_by_default = !0;
        a.space_collapsing = "slot";
        a.ablation_viewport_offset = b
    }
    function Rl(a) {
        X(S).allow_second_reactive_tag = a
    }
    function Sl() {
        const a = X(window);
        a.afg_slotcar_vars || (a.afg_slotcar_vars = {});
        return a.afg_slotcar_vars
    }
    ;function Tl(a) {
        return X(a)?.head_tag_slot_vars?.google_ad_host ?? Ul(a)
    }
    function Ul(a) {
        return a.document?.querySelector('meta[name="google-adsense-platform-account"]')?.getAttribute("content") ?? null
    }
    ;const Vl = [2, 7, 1];
    var Yl = (a,b,c="",d=null)=>1 === b && Wl(c, d) ? !0 : Xl(a, c, e=>Na(G(e, Pc, 2), f=>u(f, 1) === b))
      , Wl = (a,b)=>b ? b.j() ? K(b.h(), 1) : b.i() && "" !== a && 1 === b.g().g().length && b.g().g()[0] === a ? K(b.g().h(), 1) : !1 : !1
      , Zl = (a,b)=>{
        b = Dc(H(b, 18));
        -1 !== b && (a.tmod = b)
    }
      , am = a=>{
        const b = zd(S) || S;
        return $l(b, a) ? !0 : Xl(S, "", c=>Na(pc(c, 3, Lb), d=>d === a))
    }
    ;
    function $l(a, b) {
        a = (a = (a = a.location && a.location.hash) && a.match(/forced_clientside_labs=([\d,]+)/)) && a[1];
        return !!a && Pa(a.split(","), b.toString())
    }
    function Xl(a, b, c) {
        a = zd(a) || a;
        const d = bm(a);
        b && (b = je(String(b)));
        return cd(d, (e,f)=>Object.prototype.hasOwnProperty.call(d, f) && (!b || b === f) && c(e))
    }
    function bm(a) {
        a = cm(a);
        const b = {};
        Ed(a, (c,d)=>{
            try {
                const e = new Qc(c);
                b[d] = e
            } catch (e) {}
        }
        );
        return b
    }
    var cm = a=>Q(sh) ? (Lc(Nl, Nc),
    a = lk({
        l: a,
        P: Nl
    }),
    null != a.g ? dm(a.getValue()) : {}) : dm(a.localStorage);
    function dm(a) {
        try {
            const b = a.getItem("google_adsense_settings");
            if (!b)
                return {};
            const c = JSON.parse(b);
            return c !== Object(c) ? {} : bd(c, (d,e)=>Object.prototype.hasOwnProperty.call(c, e) && "string" === typeof e && Array.isArray(d))
        } catch (b) {
            return {}
        }
    }
    function em(a) {
        tj("atf_ad_settings_from_ppabg", {
            p_s: a
        }, .01)
    }
    const fm = a=>{
        tj("overlay_settings_from_ppabg", {
            p_s: a
        }, .01)
    }
      , gm = (a,b)=>{
        if (Tl(p))
            return Vl;
        if (b?.j()) {
            var c = L(b.h(), 9);
            b = b?.h()?.g()?.h();
            if (!a || c != a || !b)
                return Vl;
            fm(!1);
            return pc(b, 3, Lb)
        }
        if (b?.i()) {
            c = b?.g()?.g();
            if (!c || 1 !== c.length || !a || c[0] !== a || L(b, 17) != p.location.host)
                return Vl;
            a = b?.g()?.h()?.g()?.h();
            if (!a)
                return Vl;
            fm(!0);
            return pc(a, 3, Lb)
        }
        return Vl
    }
    ;
    var hm = (a,b)=>{
        const c = [];
        a = gm(a, b);
        a.includes(1) || c.push(1);
        a.includes(2) || c.push(2);
        a.includes(7) || c.push(7);
        return c
    }
    ;
    function im(a, b, c, d) {
        jm(new km(a,b,c,d))
    }
    function jm(a) {
        Zg(Yg(lk({
            l: a.l,
            P: K(a.g, 6)
        }), b=>{
            lm(a, b, !0)
        }
        ), ()=>{
            mm(a)
        }
        )
    }
    function lm(a, b, c) {
        Zg(Yg(nm(b), d=>{
            om("ok");
            a.h(d, {
                fromLocalStorage: !0
            })
        }
        ), ()=>{
            var d = a.l;
            try {
                b.removeItem("google_ama_config")
            } catch (e) {
                vl(d, {
                    lserr: 1
                })
            }
            c ? mm(a) : a.h(null, null)
        }
        )
    }
    function mm(a) {
        Zg(Yg(pm(a), b=>{
            a.h(b, {
                fromPABGSettings: !0
            })
        }
        ), ()=>{
            qm(a)
        }
        )
    }
    function nm(a) {
        return (a = (a = Dl(a)) ? Cl(a) ? a : null : null) ? Tg(a) : Vg(Error("invlocst"))
    }
    function pm(a) {
        if (Tl(a.l) && !K(a.g, 22))
            return Vg(Error("invtag"));
        a: {
            var b = a.l;
            var c = a.i;
            a = a.g;
            if (a?.j())
                (b = a?.h()?.g()?.g()) && (0 < G(b, oh, 1).length || Q(Ah) && 0 < G(b, ph, 3).length) ? em(!1) : b = null;
            else {
                if (a?.i()) {
                    const d = a?.g()?.g()
                      , e = a?.g()?.h()?.g()?.g();
                    if (d && 1 === d.length && d[0] === c && e && (0 < G(e, oh, 1).length || Q(Ah) && 0 < G(e, ph, 3).length) && L(a, 17) === b.location.host) {
                        em(!0);
                        b = e;
                        break a
                    }
                }
                b = null
            }
        }
        b ? (c = new Qi,
        a = G(b, oh, 1),
        c = Ac(c, 1, a),
        a = G(b, Li, 2),
        c = Ac(c, 7, a),
        Q(Ah) && 0 < G(b, ph, 3).length && (a = new qh,
        b = G(b, ph, 3),
        b = Ac(a, 1, b),
        yc(c, 6, b)),
        b = Tg(c)) : b = Vg(Error("invtag"));
        return b
    }
    function qm(a) {
        pk({
            l: a.l,
            P: K(a.g, 6),
            timeoutMs: 50,
            aa: b=>{
                rm(a, b)
            }
        })
    }
    function rm(a, b) {
        Zg(Yg(b, c=>{
            lm(a, c, !1)
        }
        ), c=>{
            om(c.message);
            a.h(null, null)
        }
        )
    }
    function om(a) {
        tj("abg::amalserr", {
            status: a,
            guarding: "true",
            timeout: 50,
            rate: .01
        }, .01)
    }
    class km {
        constructor(a, b, c, d) {
            this.l = a;
            this.g = b;
            this.i = c;
            this.h = d
        }
    }
    ;var um = (a,b,c,d)=>{
        try {
            const e = Bl(a, G(c, Li, 7));
            if (e && zl(e)) {
                I(e, 4) && (d = gh(d, new hh(null,{
                    google_package: I(e, 4)
                })));
                const f = new Oj(a,b,c,e,d);
                aj(1E3, ()=>{
                    var g = new Og;
                    (new zk(a,f,g)).start();
                    return g.h
                }
                , a).then(na(sm, a), na(tm, a))
            }
        } catch (e) {
            vl(a, {
                atf: -1
            })
        }
    }
    ;
    const sm = a=>{
        vl(a, {
            atf: 1
        })
    }
      , tm = (a,b)=>{
        (a.google_ama_state = a.google_ama_state || {}).exception = b;
        vl(a, {
            atf: 0
        })
    }
    ;
    function vm(a) {
        a.easpi = Q(Sh);
        a.asla = .4;
        a.asaa = -1;
        a.sedf = !1;
        a.asro = Q(Qh);
        Q(Mh) && (a.asiscm = !0);
        a.sefa = !0;
        Q(Rh) && (a.sugawps = !0);
        const b = P($c).h(Kh.g, Kh.defaultValue);
        b.length && (a.seiel = b.join("~"));
        Q(Lh) && (a.slcwct = ad(Oh),
        a.sacwct = ad(Ih));
        Q(Nh) && (a.slmct = ad(Ph),
        a.samct = ad(Jh))
    }
    ;function wm(a, b) {
        if (!a)
            return !1;
        a = a.hash;
        if (!a || !a.indexOf)
            return !1;
        if (-1 != a.indexOf(b))
            return !0;
        b = xm(b);
        return "go" != b && -1 != a.indexOf(b) ? !0 : !1
    }
    function xm(a) {
        let b = "";
        Ed(a.split("_"), c=>{
            b += c.substr(0, 2)
        }
        );
        return b
    }
    ;Sa || Ea();
    function ym() {
        const a = {};
        P($c).g(wh.g, wh.defaultValue) && (a.bust = P($c).g(wh.g, wh.defaultValue));
        var b = Rj();
        b = Wj(b, 38, "");
        "" !== b && (a.sbust = b);
        return a
    }
    ;class zm {
        constructor() {
            this.promise = new Promise(a=>{
                this.resolve = a
            }
            )
        }
    }
    ;function Am() {
        const {promise: a, resolve: b} = new zm;
        return {
            promise: a,
            resolve: b
        }
    }
    ;function Bm(a=()=>{}
    ) {
        p.google_llp || (p.google_llp = {});
        const b = p.google_llp;
        let c = b[7];
        if (c)
            return c;
        c = Am();
        b[7] = c;
        a();
        return c
    }
    function Cm(a) {
        return Bm(()=>{
            Ad(p.document, a)
        }
        ).promise
    }
    ;function Dm(a) {
        a.google_reactive_ads_global_state ? (null == a.google_reactive_ads_global_state.sideRailProcessedFixedElements && (a.google_reactive_ads_global_state.sideRailProcessedFixedElements = new Set),
        null == a.google_reactive_ads_global_state.sideRailAvailableSpace && (a.google_reactive_ads_global_state.sideRailAvailableSpace = new Map),
        null == a.google_reactive_ads_global_state.sideRailPlasParam && (a.google_reactive_ads_global_state.sideRailPlasParam = new Map)) : a.google_reactive_ads_global_state = new Em;
        return a.google_reactive_ads_global_state
    }
    class Em {
        constructor() {
            this.wasPlaTagProcessed = !1;
            this.wasReactiveAdConfigReceived = {};
            this.adCount = {};
            this.wasReactiveAdVisible = {};
            this.stateForType = {};
            this.reactiveTypeEnabledInAsfe = {};
            this.wasReactiveTagRequestSent = !1;
            this.reactiveTypeDisabledByPublisher = {};
            this.tagSpecificState = {};
            this.messageValidationEnabled = !1;
            this.floatingAdsStacking = new Fm;
            this.sideRailProcessedFixedElements = new Set;
            this.sideRailAvailableSpace = new Map;
            this.sideRailPlasParam = new Map
        }
    }
    var Fm = class {
        constructor() {
            this.maxZIndexRestrictions = {};
            this.nextRestrictionId = 0;
            this.maxZIndexListeners = []
        }
    }
    ;
    var Gm = a=>{
        if (p.google_apltlad)
            return null;
        var b = Q(Fh) && 1 === (p.top == p ? 0 : yd(p.top) ? 1 : 2);
        if (p !== p.top && !b || !a.google_ad_client)
            return null;
        p.google_apltlad = !0;
        b = {
            enable_page_level_ads: {
                pltais: !0
            },
            google_ad_client: a.google_ad_client
        };
        const c = b.enable_page_level_ads;
        Ed(a, (d,e)=>{
            yi[e] && "google_ad_client" !== e && (c[e] = d)
        }
        );
        c.google_pgb_reactive = 7;
        vm(c);
        if ("google_ad_section"in a || "google_ad_region"in a)
            c.google_ad_section = a.google_ad_section || a.google_ad_region;
        return b
    }
    ;
    function Hm(a, b) {
        X(S).ama_ran_on_page || aj(1001, ()=>{
            Im(new Jm(a,b))
        }
        , p)
    }
    function Im(a) {
        im(a.l, a.h, a.g.google_ad_client || "", (b,c)=>{
            var d = a.l
              , e = a.g;
            X(S).ama_ran_on_page || b && Km(d, e, b, c)
        }
        )
    }
    class Jm {
        constructor(a, b) {
            this.l = p;
            this.g = a;
            this.h = b
        }
    }
    function Km(a, b, c, d) {
        d && (fj(a).configSourceInAbg = d);
        lc(c, Pi, 24) && (d = gj(a),
        d.availableAbg = !0,
        d.ablationFromStorage = !!E(c, Pi, 24)?.g()?.g());
        if (fa(b.enable_page_level_ads) && 7 === b.enable_page_level_ads.google_pgb_reactive) {
            if (!Bl(a, G(c, Li, 7))) {
                tj("amaait", {
                    value: "true"
                });
                return
            }
            tj("amaait", {
                value: "false"
            })
        }
        X(S).ama_ran_on_page = !0;
        E(c, Di, 15)?.g() && (X(a).enable_overlap_observer = !0);
        var e = E(c, Ci, 13);
        e && 1 === u(e, 1) ? (d = 0,
        (e = E(e, Bi, 6)) && H(e, 3) && (d = H(e, 3) || 0),
        Ql(a, d)) : E(c, Pi, 24)?.g()?.g() && (gj(a).ablatingThisPageview = !0,
        Ql(a, 1));
        de(3, [c.toJSON()]);
        const f = b.google_ad_client || "";
        b = wl(fa(b.enable_page_level_ads) ? b.enable_page_level_ads : {});
        const g = gh(kh, new hh(null,b));
        sj(782, ()=>{
            um(a, f, c, g)
        }
        )
    }
    ;function Lm(a, b) {
        a = a.document;
        for (var c = void 0, d = 0; !c || a.getElementById(c + "_host"); )
            c = "aswift_" + d++;
        a = c;
        c = Number(b.google_ad_width || 0);
        b = Number(b.google_ad_height || 0);
        d = document.createElement("div");
        d.id = a + "_host";
        const e = d.style;
        e.border = "none";
        e.height = `${b}px`;
        e.width = `${c}px`;
        e.margin = "0px";
        e.padding = "0px";
        e.position = "relative";
        e.visibility = "visible";
        e.backgroundColor = "transparent";
        e.display = "inline-block";
        return {
            qb: a,
            Ib: d
        }
    }
    ;function Mm({ta: a, Aa: b}) {
        return a || ("dev" === b ? "dev" : "")
    }
    ;var Nm = {
        google_analytics_domain_name: !0,
        google_analytics_uacct: !0,
        google_pause_ad_requests: !0,
        google_user_agent_client_hint: !0
    }
      , Om = a=>(a = a.innerText || a.innerHTML) && (a = a.replace(/^\s+/, "").split(/\r?\n/, 1)[0].match(/^\x3c!--+(.*?)(?:--+>)?\s*$/)) && RegExp("google_ad_client").test(a[1]) ? a[1] : null
      , Pm = a=>{
        if (a = a.innerText || a.innerHTML)
            if (a = a.replace(/^\s+|\s+$/g, "").replace(/\s*(\r?\n)+\s*/g, ";"),
            (a = a.match(/^\x3c!--+(.*?)(?:--+>)?$/) || a.match(/^\/*\s*<!\[CDATA\[(.*?)(?:\/*\s*\]\]>)?$/i)) && RegExp("google_ad_client").test(a[1]))
                return a[1];
        return null
    }
      , Qm = a=>{
        switch (a) {
        case "true":
            return !0;
        case "false":
            return !1;
        case "null":
            return null;
        case "undefined":
            break;
        default:
            try {
                const b = a.match(/^(?:'(.*)'|"(.*)")$/);
                if (b)
                    return b[1] || b[2] || "";
                if (/^[-+]?\d*(\.\d+)?$/.test(a)) {
                    const c = parseFloat(a);
                    return c === c ? c : void 0
                }
            } catch (b) {}
        }
    }
    ;
    function Rm(a) {
        if (a.google_ad_client)
            var b = String(a.google_ad_client);
        else {
            if (null == (b = X(a).head_tag_slot_vars?.google_ad_client ?? a.document.querySelector(".adsbygoogle[data-ad-client]")?.getAttribute("data-ad-client"))) {
                b: {
                    b = a.document.getElementsByTagName("script");
                    a = a.navigator && a.navigator.userAgent || "";
                    a = RegExp("appbankapppuzdradb|daumapps|fban|fbios|fbav|fb_iab|gsa/|messengerforios|naver|niftyappmobile|nonavigation|pinterest|twitter|ucbrowser|yjnewsapp|youtube", "i").test(a) || /i(phone|pad|pod)/i.test(a) && /applewebkit/i.test(a) && !/version|safari/i.test(a) && !ie() ? Om : Pm;
                    for (var c = b.length - 1; 0 <= c; c--) {
                        var d = b[c];
                        if (!d.google_parsed_script_for_pub_code && (d.google_parsed_script_for_pub_code = !0,
                        d = a(d))) {
                            b = d;
                            break b
                        }
                    }
                    b = null
                }
                if (b) {
                    a = /(google_\w+) *= *(['"]?[\w.-]+['"]?) *(?:;|$)/gm;
                    for (c = {}; d = a.exec(b); )
                        c[d[1]] = Qm(d[2]);
                    b = c;
                    b = b.google_ad_client ? b.google_ad_client : ""
                } else
                    b = ""
            }
            b = b ?? ""
        }
        return b
    }
    ;var Sm = {
        "120x90": !0,
        "160x90": !0,
        "180x90": !0,
        "200x90": !0,
        "468x15": !0,
        "728x15": !0
    };
    function Tm(a, b) {
        if (15 == b) {
            if (728 <= a)
                return 728;
            if (468 <= a)
                return 468
        } else if (90 == b) {
            if (200 <= a)
                return 200;
            if (180 <= a)
                return 180;
            if (160 <= a)
                return 160;
            if (120 <= a)
                return 120
        }
        return null
    }
    ;var Um = class extends N {
        constructor() {
            super()
        }
        getVersion() {
            return L(this, 2)
        }
    }
    ;
    function Vm(a, b) {
        return y(a, 2, Ub(b))
    }
    function Wm(a, b) {
        return y(a, 3, Ub(b))
    }
    function Xm(a, b) {
        return y(a, 4, Ub(b))
    }
    function Ym(a, b) {
        return y(a, 5, Ub(b))
    }
    function Zm(a, b) {
        return y(a, 9, Ub(b))
    }
    function $m(a, b) {
        return Ac(a, 10, b)
    }
    function an(a, b) {
        return y(a, 11, Hb(b))
    }
    function bn(a, b) {
        return y(a, 1, Ub(b))
    }
    function cn(a, b) {
        return y(a, 7, Hb(b))
    }
    var dn = class extends N {
        constructor() {
            super()
        }
    }
    ;
    dn.s = [10, 6];
    const en = "platform platformVersion architecture model uaFullVersion bitness fullVersionList wow64".split(" ");
    function fn() {
        var a = S;
        if ("function" !== typeof a.navigator?.userAgentData?.getHighEntropyValues)
            return null;
        const b = a.google_tag_data ?? (a.google_tag_data = {});
        if (b.uach_promise)
            return b.uach_promise;
        a = a.navigator.userAgentData.getHighEntropyValues(en).then(c=>{
            b.uach ?? (b.uach = c);
            return c
        }
        );
        return b.uach_promise = a
    }
    function gn(a) {
        return an($m(Ym(Vm(bn(Xm(cn(Zm(Wm(new dn, a.architecture || ""), a.bitness || ""), a.mobile || !1), a.model || ""), a.platform || ""), a.platformVersion || ""), a.uaFullVersion || ""), a.fullVersionList?.map(b=>{
            var c = new Um;
            c = y(c, 1, Ub(b.brand));
            return y(c, 2, Ub(b.version))
        }
        ) || []), a.wow64 || !1)
    }
    function hn() {
        return fn()?.then(a=>gn(a)) ?? null
    }
    ;function jn() {
        var a = S;
        a.google_sa_impl && !a.document.getElementById("google_shimpl") && (delete a.google_sa_queue,
        delete a.google_sa_impl)
    }
    function kn(a, b) {
        b.google_ad_host || (a = Ul(a)) && (b.google_ad_host = a)
    }
    function ln(a, b, c="") {
        jn();
        S.google_sa_queue || (S.google_sa_queue = [],
        S.google_process_slots = W.ma(215, ()=>{
            mn(S.google_sa_queue)
        }
        ),
        a = nn(c, a, b),
        Ad(S.document, a).id = "google_shimpl")
    }
    function mn(a) {
        const b = a.shift();
        "function" === typeof b && W.ca(216, b);
        a.length && p.setTimeout(W.ma(215, ()=>{
            mn(a)
        }
        ), 0)
    }
    function on(a, b) {
        a.google_sa_queue = a.google_sa_queue || [];
        a.google_sa_impl ? b() : a.google_sa_queue.push(b)
    }
    function nn(a, b, c) {
        b = K(c, 4) ? b.Cb : b.Db;
        const d = {};
        a: {
            if (K(c, 4)) {
                if (a = a || Rm(S)) {
                    a = {
                        client: a,
                        plah: S.location.host
                    };
                    break a
                }
                throw Error("PublisherCodeNotFoundForAma");
            }
            a = {}
        }
        pn(a, d);
        pn(ym(), d);
        return hd(b, d)
    }
    function pn(a, b) {
        Ed(a, (c,d)=>{
            void 0 === b[d] && (b[d] = c)
        }
        )
    }
    function qn(a) {
        a: {
            var b = [p.top];
            var c = [];
            let e = 0, f;
            for (; f = b[e++]; ) {
                c.push(f);
                try {
                    if (f.frames)
                        for (let g = 0; g < f.frames.length && 1024 > b.length; ++g)
                            b.push(f.frames[g])
                } catch {}
            }
            b = c;
            for (c = 0; c < b.length; c++)
                try {
                    var d = b[c].frames.google_esf;
                    if (d) {
                        Yd = d;
                        break a
                    }
                } catch (g) {}
            Yd = null
        }
        if (Yd)
            return null;
        d = Bd("IFRAME");
        d.id = "google_esf";
        d.name = "google_esf";
        b = a.Lb;
        c = P($c).g(Hh.g, Hh.defaultValue);
        "inhead" === c ? b = a.Jb : "nohtml" === c && (b = a.Kb);
        Q(Dh) && (b = hd(b, {
            hello: "world"
        }));
        d.src = jd(b).toString();
        d.style.display = "none";
        return d
    }
    function rn(a, b, c, d) {
        const {qb: e, Ib: f} = Lm(a, b);
        c.appendChild(f);
        sn(a, c, b);
        c = b.google_start_time ?? qa;
        const g = (new Date).getTime();
        b.google_lrv = Mm({
            ta: "m202312060101",
            Aa: L(d, 2)
        });
        b.google_async_iframe_id = e;
        b.google_start_time = c;
        b.google_bpp = g > c ? g - c : 1;
        a.google_sv_map = a.google_sv_map || {};
        a.google_sv_map[e] = b;
        on(a, ()=>{
            var h = f;
            if (!h || !h.isConnected)
                if (h = a.document.getElementById(String(b.google_async_iframe_id) + "_host"),
                null == h)
                    throw Error("no_div");
            (h = a.google_sa_impl({
                pubWin: a,
                vars: b,
                innerInsElement: h
            })) && W.W(911, h)
        }
        )
    }
    function sn(a, b, c) {
        var d = c.google_ad_output
          , e = c.google_ad_format
          , f = c.google_ad_width || 0
          , g = c.google_ad_height || 0;
        e || "html" !== d && null != d || (e = f + "x" + g);
        d = !c.google_ad_slot || c.google_override_format || !Sm[c.google_ad_width + "x" + c.google_ad_height] && "aa" === c.google_loader_used;
        e && d ? e = e.toLowerCase() : e = "";
        c.google_ad_format = e;
        if ("number" !== typeof c.google_reactive_sra_index || !c.google_ad_unit_key) {
            e = [c.google_ad_slot, c.google_orig_ad_format || c.google_ad_format, c.google_ad_type, c.google_orig_ad_width || c.google_ad_width, c.google_orig_ad_height || c.google_ad_height];
            d = [];
            f = 0;
            for (g = b; g && 25 > f; g = g.parentNode,
            ++f)
                9 === g.nodeType ? d.push("") : d.push(g.id);
            (d = d.join()) && e.push(d);
            c.google_ad_unit_key = Fd(e.join(":")).toString();
            e = [];
            for (d = 0; b && 25 > d; ++d) {
                f = (f = 9 !== b.nodeType && b.id) ? "/" + f : "";
                a: {
                    if (b && b.nodeName && b.parentElement) {
                        g = b.nodeName.toString().toLowerCase();
                        const h = b.parentElement.childNodes;
                        let k = 0;
                        for (let m = 0; m < h.length; ++m) {
                            const l = h[m];
                            if (l.nodeName && l.nodeName.toString().toLowerCase() === g) {
                                if (b === l) {
                                    g = "." + k;
                                    break a
                                }
                                ++k
                            }
                        }
                    }
                    g = ""
                }
                e.push((b.nodeName && b.nodeName.toString().toLowerCase()) + f + g);
                b = b.parentElement
            }
            b = e.join() + ":";
            e = [];
            if (a)
                try {
                    let h = a.parent;
                    for (d = 0; h && h !== a && 25 > d; ++d) {
                        const k = h.frames;
                        for (f = 0; f < k.length; ++f)
                            if (a === k[f]) {
                                e.push(f);
                                break
                            }
                        a = h;
                        h = a.parent
                    }
                } catch (h) {}
            c.google_ad_dom_fingerprint = Fd(b + e.join()).toString()
        }
    }
    function tn() {
        var a = zd(p);
        a && (a = Dm(a),
        a.tagSpecificState[1] || (a.tagSpecificState[1] = {
            debugCard: null,
            debugCardRequested: !1
        }))
    }
    function un() {
        const a = hn();
        null != a && a.then(b=>{
            a: {
                sb = !0;
                try {
                    var c = JSON.stringify(b.toJSON(), Zb);
                    break a
                } finally {
                    sb = !1
                }
                c = void 0
            }
            S.google_user_agent_client_hint = c
        }
        );
        Od()
    }
    ;function vn(a) {
        return b=>!!(b.da & a)
    }
    class Y extends qi {
        constructor(a, b, c, d=!1) {
            super(a, b);
            this.da = c;
            this.ub = d
        }
        na() {
            return this.da
        }
        h(a, b, c) {
            if (!b.google_ad_resize || Q(Eh))
                c.style.height = this.height() + "px",
                b.rpe = !0
        }
    }
    ;const wn = {
        image_stacked: 1 / 1.91,
        image_sidebyside: 1 / 3.82,
        mobile_banner_image_sidebyside: 1 / 3.82,
        pub_control_image_stacked: 1 / 1.91,
        pub_control_image_sidebyside: 1 / 3.82,
        pub_control_image_card_stacked: 1 / 1.91,
        pub_control_image_card_sidebyside: 1 / 3.74,
        pub_control_text: 0,
        pub_control_text_card: 0
    }
      , xn = {
        image_stacked: 80,
        image_sidebyside: 0,
        mobile_banner_image_sidebyside: 0,
        pub_control_image_stacked: 80,
        pub_control_image_sidebyside: 0,
        pub_control_image_card_stacked: 85,
        pub_control_image_card_sidebyside: 0,
        pub_control_text: 80,
        pub_control_text_card: 80
    }
      , yn = {
        pub_control_image_stacked: 100,
        pub_control_image_sidebyside: 200,
        pub_control_image_card_stacked: 150,
        pub_control_image_card_sidebyside: 250,
        pub_control_text: 100,
        pub_control_text_card: 150
    };
    function zn(a) {
        var b = 0;
        a.O && b++;
        a.J && b++;
        a.K && b++;
        if (3 > b)
            return {
                M: "Tags data-matched-content-ui-type, data-matched-content-columns-num and data-matched-content-rows-num should be set together."
            };
        b = a.O.split(",");
        const c = a.K.split(",");
        a = a.J.split(",");
        if (b.length !== c.length || b.length !== a.length)
            return {
                M: 'Lengths of parameters data-matched-content-ui-type, data-matched-content-columns-num and data-matched-content-rows-num must match. Example: \n data-matched-content-rows-num="4,2"\ndata-matched-content-columns-num="1,6"\ndata-matched-content-ui-type="image_stacked,image_card_sidebyside"'
            };
        if (2 < b.length)
            return {
                M: "The parameter length of attribute data-matched-content-ui-type, data-matched-content-columns-num and data-matched-content-rows-num is too long. At most 2 parameters for each attribute are needed: one for mobile and one for desktop, while " + `you are providing ${b.length} parameters. Example: ${'\n data-matched-content-rows-num="4,2"\ndata-matched-content-columns-num="1,6"\ndata-matched-content-ui-type="image_stacked,image_card_sidebyside"'}.`
            };
        const d = []
          , e = [];
        for (let g = 0; g < b.length; g++) {
            var f = Number(c[g]);
            if (Number.isNaN(f) || 0 === f)
                return {
                    M: `Wrong value '${c[g]}' for ${"data-matched-content-rows-num"}.`
                };
            d.push(f);
            f = Number(a[g]);
            if (Number.isNaN(f) || 0 === f)
                return {
                    M: `Wrong value '${a[g]}' for ${"data-matched-content-columns-num"}.`
                };
            e.push(f)
        }
        return {
            K: d,
            J: e,
            Ya: b
        }
    }
    function An(a) {
        return 1200 <= a ? {
            width: 1200,
            height: 600
        } : 850 <= a ? {
            width: a,
            height: Math.floor(.5 * a)
        } : 550 <= a ? {
            width: a,
            height: Math.floor(.6 * a)
        } : 468 <= a ? {
            width: a,
            height: Math.floor(.7 * a)
        } : {
            width: a,
            height: Math.floor(3.44 * a)
        }
    }
    ;const Bn = Ra("script");
    function Cn(a, b, c) {
        null != a.da && (c.google_responsive_formats = a.da);
        null != a.V && (c.google_safe_for_responsive_override = a.V);
        null != a.h && (!0 === a.h ? c.google_full_width_responsive_allowed = !0 : (c.google_full_width_responsive_allowed = !1,
        c.gfwrnwer = a.h));
        null != a.i && !0 !== a.i && (c.gfwrnher = a.i);
        var d = a.m || c.google_ad_width;
        null != d && (c.google_resizing_width = d);
        d = a.j || c.google_ad_height;
        null != d && (c.google_resizing_height = d);
        d = a.size().g(b);
        const e = a.size().height();
        if (!c.google_ad_resize || Q(Eh)) {
            c.google_ad_width = d;
            c.google_ad_height = e;
            var f = a.size();
            b = f.g(b) + "x" + f.height();
            c.google_ad_format = b;
            c.google_responsive_auto_format = a.v;
            null != a.g && (c.armr = a.g);
            c.google_ad_resizable = !0;
            c.google_override_format = 1;
            c.google_loader_features_used = 128;
            !0 === a.h && (c.gfwrnh = a.size().height() + "px")
        }
        null != a.A && (c.gfwroml = a.A);
        null != a.B && (c.gfwromr = a.B);
        null != a.j && (c.gfwroh = a.j);
        null != a.m && (c.gfwrow = a.m);
        null != a.G && (c.gfwroz = a.G);
        b = zd(window) || window;
        wm(b.location, "google_responsive_dummy_ad") && (Pa([1, 2, 3, 4, 5, 6, 7, 8], a.v) || 1 === a.g) && 2 !== a.g && (a = JSON.stringify({
            googMsgType: "adpnt",
            key_value: [{
                key: "qid",
                value: "DUMMY_AD"
            }]
        }),
        c.dash = `<${Bn}>window.top.postMessage('${a}', '*'); 
          </${Bn}> 
          <div id="dummyAd" style="width:${d}px;height:${e}px; 
            background:#ddd;border:3px solid #f00;box-sizing:border-box; 
            color:#000;"> 
            <p>Requested size:${d}x ${e}</p> 
            <p>Rendered size:${d}x ${e}</p> 
          </div>`)
    }
    class Dn {
        constructor(a, b, c=null, d=null, e=null, f=null, g=null, h=null, k=null, m=null, l=null, n=null) {
            this.v = a;
            this.Z = b;
            this.da = c;
            this.g = d;
            this.V = e;
            this.h = f;
            this.i = g;
            this.A = h;
            this.B = k;
            this.j = m;
            this.m = l;
            this.G = n
        }
        size() {
            return this.Z
        }
    }
    ;const En = ["google_content_recommendation_ui_type", "google_content_recommendation_columns_num", "google_content_recommendation_rows_num"];
    var Fn = class extends qi {
        g(a) {
            return Math.min(1200, Math.max(this.I, Math.round(a)))
        }
    }
      , In = (a,b)=>{
        Gn(a, b);
        if ("pedestal" == b.google_content_recommendation_ui_type)
            return new Dn(9,new Fn(a,Math.floor(a * b.google_phwr)));
        var c = rd();
        468 > a ? c ? (c = a - 8 - 8,
        c = Math.floor(c / 1.91 + 70) + Math.floor(11 * (c * wn.mobile_banner_image_sidebyside + xn.mobile_banner_image_sidebyside) + 96),
        a = {
            Y: a,
            X: c,
            J: 1,
            K: 12,
            O: "mobile_banner_image_sidebyside"
        }) : (a = An(a),
        a = {
            Y: a.width,
            X: a.height,
            J: 1,
            K: 13,
            O: "image_sidebyside"
        }) : (a = An(a),
        a = {
            Y: a.width,
            X: a.height,
            J: 4,
            K: 2,
            O: "image_stacked"
        });
        Hn(b, a);
        return new Dn(9,new Fn(a.Y,a.X))
    }
      , Jn = (a,b)=>{
        Gn(a, b);
        var c = zn({
            K: b.google_content_recommendation_rows_num,
            J: b.google_content_recommendation_columns_num,
            O: b.google_content_recommendation_ui_type
        });
        if (c.M)
            a = {
                Y: 0,
                X: 0,
                J: 0,
                K: 0,
                O: "image_stacked",
                M: c.M
            };
        else {
            var d = 2 === c.Ya.length && 468 <= a ? 1 : 0;
            var e = c.Ya[d];
            e = 0 === e.indexOf("pub_control_") ? e : "pub_control_" + e;
            var f = yn[e];
            let g = c.J[d];
            for (; a / g < f && 1 < g; )
                g--;
            f = g;
            d = c.K[d];
            c = Math.floor(((a - 8 * f - 8) / f * wn[e] + xn[e]) * d + 8 * d + 8);
            a = 1500 < a ? {
                width: 0,
                height: 0,
                Eb: "Calculated slot width is too large: " + a
            } : 1500 < c ? {
                width: 0,
                height: 0,
                Eb: "Calculated slot height is too large: " + c
            } : {
                width: a,
                height: c
            };
            a = {
                Y: a.width,
                X: a.height,
                J: f,
                K: d,
                O: e
            }
        }
        if (a.M)
            throw new V(a.M);
        Hn(b, a);
        return new Dn(9,new Fn(a.Y,a.X))
    }
    ;
    function Gn(a, b) {
        if (0 >= a)
            throw new V("Invalid responsive width from Matched Content slot " + b.google_ad_slot + ": " + a + ". Please ensure to put this Matched Content slot into a non-zero width div container.");
    }
    function Hn(a, b) {
        a.google_content_recommendation_ui_type = b.O;
        a.google_content_recommendation_columns_num = b.J;
        a.google_content_recommendation_rows_num = b.K
    }
    ;class Kn extends qi {
        g() {
            return this.I
        }
        h(a, b, c) {
            pi(a, c);
            if (!b.google_ad_resize || Q(Eh))
                c.style.height = this.height() + "px",
                b.rpe = !0
        }
    }
    ;const Ln = {
        "image-top": a=>600 >= a ? 284 + .414 * (a - 250) : 429,
        "image-middle": a=>500 >= a ? 196 - .13 * (a - 250) : 164 + .2 * (a - 500),
        "image-side": a=>500 >= a ? 205 - .28 * (a - 250) : 134 + .21 * (a - 500),
        "text-only": a=>500 >= a ? 187 - .228 * (a - 250) : 130,
        "in-article": a=>420 >= a ? a / 1.2 : 460 >= a ? a / 1.91 + 130 : 800 >= a ? a / 4 : 200
    };
    var Mn = class extends qi {
        g() {
            return Math.min(1200, this.I)
        }
    }
      , Nn = (a,b,c,d,e)=>{
        var f = e.google_ad_layout || "image-top";
        if ("in-article" == f) {
            var g = a;
            if ("false" == e.google_full_width_responsive)
                a = g;
            else if (a = ki(b, c, g, .2, e),
            !0 !== a)
                e.gfwrnwer = a,
                a = g;
            else if (a = di(b))
                if (e.google_full_width_responsive_allowed = !0,
                c.parentElement) {
                    b: {
                        g = c;
                        for (let h = 0; 100 > h && g.parentElement; ++h) {
                            const k = g.parentElement.childNodes;
                            for (let m = 0; m < k.length; ++m) {
                                const l = k[m];
                                if (l != g && ni(b, l))
                                    break b
                            }
                            g = g.parentElement;
                            g.style.width = "100%";
                            g.style.height = "auto"
                        }
                    }
                    pi(b, c)
                } else
                    a = g;
            else
                a = g
        }
        if (250 > a)
            throw new V("Fluid responsive ads must be at least 250px wide: availableWidth=" + a);
        a = Math.min(1200, Math.floor(a));
        if (d && "in-article" != f) {
            f = Math.ceil(d);
            if (50 > f)
                throw new V("Fluid responsive ads must be at least 50px tall: height=" + f);
            return new Dn(11,new qi(a,f))
        }
        if ("in-article" != f && (d = e.google_ad_layout_key)) {
            f = "" + d;
            c = Math.pow(10, 3);
            if (e = (d = f.match(/([+-][0-9a-z]+)/g)) && d.length)
                for (b = [],
                g = 0; g < e; g++)
                    b.push(parseInt(d[g], 36) / c);
            else
                b = null;
            if (!b)
                throw new V("Invalid data-ad-layout-key value: " + f);
            f = (a + -725) / 1E3;
            c = 0;
            d = 1;
            e = b.length;
            for (g = 0; g < e; g++)
                c += b[g] * d,
                d *= f;
            f = Math.ceil(1E3 * c - -725 + 10);
            if (isNaN(f))
                throw new V("Invalid height: height=" + f);
            if (50 > f)
                throw new V("Fluid responsive ads must be at least 50px tall: height=" + f);
            if (1200 < f)
                throw new V("Fluid responsive ads must be at most 1200px tall: height=" + f);
            return new Dn(11,new qi(a,f))
        }
        d = Ln[f];
        if (!d)
            throw new V("Invalid data-ad-layout value: " + f);
        c = ti(c, b);
        b = di(b);
        b = "in-article" !== f || c || a !== b ? Math.ceil(d(a)) : Math.ceil(1.25 * d(a));
        return new Dn(11,"in-article" == f ? new Mn(a,b) : new qi(a,b))
    }
    ;
    var On = a=>b=>{
        for (let c = a.length - 1; 0 <= c; --c)
            if (!a[c](b))
                return !1;
        return !0
    }
      , Qn = (a,b)=>{
        var c = Pn.slice(0);
        const d = c.length;
        let e = null;
        for (let f = 0; f < d; ++f) {
            const g = c[f];
            if (a(g)) {
                if (!b || b(g))
                    return g;
                null === e && (e = g)
            }
        }
        return e
    }
    ;
    var Z = [new Y(970,90,2), new Y(728,90,2), new Y(468,60,2), new Y(336,280,1), new Y(320,100,2), new Y(320,50,2), new Y(300,600,4), new Y(300,250,1), new Y(250,250,1), new Y(234,60,2), new Y(200,200,1), new Y(180,150,1), new Y(160,600,4), new Y(125,125,1), new Y(120,600,4), new Y(120,240,4), new Y(120,120,1,!0)]
      , Pn = [Z[6], Z[12], Z[3], Z[0], Z[7], Z[14], Z[1], Z[8], Z[10], Z[4], Z[15], Z[2], Z[11], Z[5], Z[13], Z[9], Z[16]];
    var Sn = (a,b,c,d,e)=>{
        "false" == e.google_full_width_responsive ? c = {
            C: a,
            D: 1
        } : "autorelaxed" == b && e.google_full_width_responsive || Rn(b) || e.google_ad_resize ? (b = li(a, c, d, e),
        c = !0 !== b ? {
            C: a,
            D: b
        } : {
            C: di(c) || a,
            D: !0
        }) : c = {
            C: a,
            D: 2
        };
        const {C: f, D: g} = c;
        return !0 !== g ? {
            C: a,
            D: g
        } : d.parentElement ? {
            C: f,
            D: g
        } : {
            C: a,
            D: g
        }
    }
      , Vn = (a,b,c,d,e)=>{
        const {C: f, D: g} = sj(247, ()=>Sn(a, b, c, d, e));
        var h = !0 === g;
        const k = R(d.style.width)
          , m = R(d.style.height)
          , {U: l, R: n, na: x, Xa: v} = Tn(f, b, c, d, e, h);
        h = Un(b, x);
        var w;
        const z = (w = ri(d, c, "marginLeft", R)) ? w + "px" : ""
          , A = (w = ri(d, c, "marginRight", R)) ? w + "px" : "";
        w = ri(d, c, "zIndex") || "";
        return new Dn(h,l,x,null,v,g,n,z,A,m,k,w)
    }
      , Rn = a=>"auto" == a || /^((^|,) *(horizontal|vertical|rectangle) *)+$/.test(a)
      , Tn = (a,b,c,d,e,f)=>{
        b = Wn(c, a, b);
        let g;
        var h = !1;
        let k = !1;
        var m = 488 > di(c);
        if (m) {
            g = fi(d, c);
            var l = ti(d, c);
            h = !l && g;
            k = l && g
        }
        l = [si(a), vn(b)];
        l.push(vi(m, c, d, k));
        null != e.google_max_responsive_height && l.push(wi(e.google_max_responsive_height));
        m = [w=>!w.ub];
        if (h || k)
            h = xi(c, d),
            m.push(wi(h));
        let n = Qn(On(l), On(m));
        if (!n)
            throw new V("No slot size for availableWidth=" + a);
        const {U: x, R: v} = sj(248, ()=>{
            var w;
            a: if (f) {
                if (e.gfwrnh && (w = R(e.gfwrnh))) {
                    w = {
                        U: new Kn(a,w),
                        R: !0
                    };
                    break a
                }
                w = a / 1.2;
                var z = Math;
                var A = z.min;
                if (e.google_resizing_allowed || "true" == e.google_full_width_responsive)
                    var D = Infinity;
                else {
                    D = d;
                    let F = Infinity;
                    do {
                        var J = ri(D, c, "height", R);
                        J && (F = Math.min(F, J));
                        (J = ri(D, c, "maxHeight", R)) && (F = Math.min(F, J))
                    } while ((D = D.parentElement) && "HTML" != D.tagName);
                    D = F
                }
                z = A.call(z, w, D);
                if (z < .5 * w || 100 > z)
                    z = w;
                w = {
                    U: new Kn(a,Math.floor(z)),
                    R: z < w ? 102 : !0
                }
            } else
                w = {
                    U: n,
                    R: 100
                };
            return w
        }
        );
        return "in-article" === e.google_ad_layout && c.location && "#hffwroe2etoq" == c.location.hash ? {
            U: Xn(a, c, d, x, e),
            R: !1,
            na: b,
            Xa: g
        } : {
            U: x,
            R: v,
            na: b,
            Xa: g
        }
    }
    ;
    const Un = (a,b)=>{
        if ("auto" == a)
            return 1;
        switch (b) {
        case 2:
            return 2;
        case 1:
            return 3;
        case 4:
            return 4;
        case 3:
            return 5;
        case 6:
            return 6;
        case 5:
            return 7;
        case 7:
            return 8
        }
        throw Error("bad mask");
    }
      , Wn = (a,b,c)=>{
        if ("auto" == c)
            c = Math.min(1200, di(a)),
            b = .25 >= b / c ? 4 : 3;
        else {
            b = 0;
            for (let d in ai)
                -1 != c.indexOf(d) && (b |= ai[d])
        }
        return b
    }
      , Xn = (a,b,c,d,e)=>{
        const f = e.google_ad_height || ri(c, b, "height", R);
        b = Nn(a, b, c, f, e).size();
        return b.I * b.height() > a * d.height() ? new Y(b.I,b.height(),1) : d
    }
    ;
    var Yn = (a,b,c,d,e)=>{
        var f;
        (f = di(b)) ? 488 > di(b) ? b.innerHeight >= b.innerWidth ? (e.google_full_width_responsive_allowed = !0,
        pi(b, c),
        f = {
            C: f,
            D: !0
        }) : f = {
            C: a,
            D: 5
        } : f = {
            C: a,
            D: 4
        } : f = {
            C: a,
            D: 10
        };
        const {C: g, D: h} = f;
        if (!0 !== h || a == g)
            return new Dn(12,new qi(a,d),null,null,!0,h,100);
        const {U: k, R: m, na: l} = Tn(g, "auto", b, c, e, !0);
        return new Dn(1,k,l,2,!0,h,m)
    }
    ;
    var $n = (a,b)=>{
        const c = b.google_ad_format;
        if ("autorelaxed" == c) {
            a: {
                if ("pedestal" != b.google_content_recommendation_ui_type)
                    for (const d of En)
                        if (null != b[d]) {
                            a = !0;
                            break a
                        }
                a = !1
            }
            return a ? 9 : 5
        }
        if (Rn(c))
            return 1;
        if ("link" === c)
            return 4;
        if ("fluid" == c)
            return "in-article" !== b.google_ad_layout || !a.location || "#hffwroe2etop" != a.location.hash && "#hffwroe2etoq" != a.location.hash ? 8 : (Zn(b),
            1);
        if (27 === b.google_reactive_ad_format)
            return Zn(b),
            1
    }
      , bo = (a,b,c,d,e=!1)=>{
        e = b.offsetWidth || (c.google_ad_resize || e) && ri(b, d, "width", R) || c.google_ad_width || 0;
        4 === a && (c.google_ad_format = "auto",
        a = 1);
        var f = (f = ao(a, e, b, c, d)) ? f : Vn(e, c.google_ad_format, d, b, c);
        f.size().h(d, c, b);
        Cn(f, e, c);
        1 != a && (a = f.size().height(),
        b.style.height = a + "px")
    }
    ;
    const ao = (a,b,c,d,e)=>{
        const f = d.google_ad_height || ri(c, e, "height", R);
        switch (a) {
        case 5:
            const {C: g, D: h} = sj(247, ()=>Sn(b, d.google_ad_format, e, c, d));
            !0 === h && b != g && pi(e, c);
            !0 === h ? d.google_full_width_responsive_allowed = !0 : (d.google_full_width_responsive_allowed = !1,
            d.gfwrnwer = h);
            return In(g, d);
        case 9:
            return Jn(b, d);
        case 8:
            return Nn(b, e, c, f, d);
        case 10:
            return Yn(b, e, c, f, d)
        }
    }
      , Zn = a=>{
        a.google_ad_format = "auto";
        a.armr = 3
    }
    ;
    function co(a, b) {
        a.google_resizing_allowed = !0;
        a.ovlp = !0;
        a.google_ad_format = "auto";
        a.iaaso = !0;
        a.armr = b
    }
    ;function eo(a, b) {
        var c = zd(b);
        if (c) {
            c = di(c);
            const d = Cd(a, b) || {}
              , e = d.direction;
            if ("0px" === d.width && "none" !== d.cssFloat)
                return -1;
            if ("ltr" === e && c)
                return Math.floor(Math.min(1200, c - a.getBoundingClientRect().left));
            if ("rtl" === e && c)
                return a = b.document.body.getBoundingClientRect().right - a.getBoundingClientRect().right,
                Math.floor(Math.min(1200, c - a - Math.floor((c - b.document.body.clientWidth) / 2)))
        }
        return -1
    }
    ;function fo(a, b) {
        switch (a) {
        case "google_reactive_ad_format":
            return a = parseInt(b, 10),
            isNaN(a) ? 0 : a;
        case "google_allow_expandable_ads":
            return /^true$/.test(b);
        default:
            return b
        }
    }
    function go(a, b) {
        if (a.getAttribute("src")) {
            var c = a.getAttribute("src") || ""
              , d = vd(c, "client");
            d && (b.google_ad_client = fo("google_ad_client", d));
            (c = vd(c, "host")) && (b.google_ad_host = fo("google_ad_host", c))
        }
        a = a.attributes;
        c = a.length;
        for (d = 0; d < c; d++) {
            var e = a[d];
            if (/data-/.test(e.name)) {
                const f = sa(e.name.replace("data-matched-content", "google_content_recommendation").replace("data", "google").replace(/-/g, "_"));
                b.hasOwnProperty(f) || (e = fo(f, e.value),
                null !== e && (b[f] = e))
            }
        }
    }
    function ho(a) {
        if (a = ee(a))
            switch (a.data && a.data.autoFormat) {
            case "rspv":
                return 13;
            case "mcrspv":
                return 15;
            default:
                return 14
            }
        else
            return 12
    }
    function io(a, b, c, d) {
        go(a, b);
        if (c.document && c.document.body && !$n(c, b) && !b.google_reactive_ad_format) {
            var e = parseInt(a.style.width, 10)
              , f = eo(a, c);
            if (0 < f && e > f) {
                var g = parseInt(a.style.height, 10);
                e = !!Sm[e + "x" + g];
                var h = f;
                if (e) {
                    const k = Tm(f, g);
                    if (k)
                        h = k,
                        b.google_ad_format = k + "x" + g + "_0ads_al";
                    else
                        throw new V("No slot size for availableWidth=" + f);
                }
                b.google_ad_resize = !0;
                b.google_ad_width = h;
                e || (b.google_ad_format = null,
                b.google_override_format = !0);
                f = h;
                a.style.width = `${f}px`;
                Q(Eh) ? co(b, 4) : (h = Vn(f, "auto", c, a, b),
                g = f,
                h.size().h(c, b, a),
                Cn(h, g, b),
                g = h.size(),
                b.google_responsive_formats = null,
                b.ovlp = !0,
                g.I > f && !e && (b.google_ad_width = g.I,
                a.style.width = `${g.I}px`))
            }
        }
        if (488 > di(c)) {
            f = zd(c) || c;
            (e = a.offsetWidth) || (e = ri(a, c, "width", R));
            e = e || b.google_ad_width || 0;
            g = b.google_ad_client;
            if (d = wm(f.location, "google_responsive_slot_preview") || Q(Gh) || Yl(f, 1, g, d))
                b: if (b.google_reactive_ad_format || b.google_ad_resize || $n(c, b) || hi(a, b))
                    d = !1;
                else {
                    for (d = a; d; d = d.parentElement) {
                        f = Cd(d, c);
                        if (!f) {
                            b.gfwrnwer = 18;
                            d = !1;
                            break b
                        }
                        if (!Pa(["static", "relative"], f.position)) {
                            b.gfwrnwer = 17;
                            d = !1;
                            break b
                        }
                    }
                    d = ki(c, a, e, .3, b);
                    !0 !== d ? (b.gfwrnwer = d,
                    d = !1) : d = c === c.top ? !0 : !1
                }
            d ? (co(b, 1),
            d = !0) : d = !1
        } else
            d = !1;
        if (e = $n(c, b))
            bo(e, a, b, c, d);
        else {
            if (hi(a, b)) {
                if (d = Cd(a, c))
                    a.style.width = d.width,
                    a.style.height = d.height,
                    gi(d, b);
                b.google_ad_width || (b.google_ad_width = a.offsetWidth);
                b.google_ad_height || (b.google_ad_height = a.offsetHeight);
                b.google_loader_features_used = 256;
                b.google_responsive_auto_format = ho(c)
            } else
                gi(a.style, b);
            c.location && "#gfwmrp" == c.location.hash || 12 == b.google_responsive_auto_format && "true" == b.google_full_width_responsive ? bo(10, a, b, c, !1) : .01 > Math.random() && 12 === b.google_responsive_auto_format && (a = li(a.offsetWidth || parseInt(a.style.width, 10) || b.google_ad_width, c, a, b),
            !0 !== a ? (b.efwr = !1,
            b.gfwrnwer = a) : b.efwr = !0)
        }
    }
    ;function Yf(a, b, c=0) {
        0 < a.g.size || jo(a);
        c = Math.min(Math.max(0, c), 9);
        const d = a.g.get(c);
        d ? d.push(b) : a.g.set(c, [b])
    }
    function ko(a, b, c, d) {
        Yc(b, c, d);
        ck(a, ()=>Zc(b, c, d))
    }
    function lo(a, b) {
        1 !== a.h && (a.h = 1,
        0 < a.g.size && mo(a, b))
    }
    function jo(a) {
        a.l.document.visibilityState ? ko(a, a.l.document, "visibilitychange", b=>{
            "hidden" === a.l.document.visibilityState && lo(a, b);
            "visible" === a.l.document.visibilityState && (a.h = 0)
        }
        ) : "onpagehide"in a.l ? (ko(a, a.l, "pagehide", b=>{
            lo(a, b)
        }
        ),
        ko(a, a.l, "pageshow", ()=>{
            a.h = 0
        }
        )) : ko(a, a.l, "beforeunload", b=>{
            lo(a, b)
        }
        )
    }
    function mo(a, b) {
        for (let c = 9; 0 <= c; c--)
            a.g.get(c)?.forEach(d=>{
                d(b)
            }
            )
    }
    var no = class extends bk {
        constructor(a) {
            super();
            this.l = a;
            this.h = 0;
            this.g = new Map
        }
    }
    ;
    async function oo(a, b) {
        var c = 10;
        return 0 >= c ? Promise.reject() : b() ? Promise.resolve() : new Promise((d,e)=>{
            const f = a.setInterval(()=>{
                --c ? b() && (a.clearInterval(f),
                d()) : (a.clearInterval(f),
                e())
            }
            , 200)
        }
        )
    }
    ;function po(a) {
        const b = a.g.pc;
        return null !== b && 0 !== b ? b : a.g.pc = Rd(a.l)
    }
    function qo(a) {
        const b = a.g.wpc;
        return null !== b && "" !== b ? b : a.g.wpc = Rm(a.l)
    }
    function ro(a, b) {
        var c = new sf;
        var d = po(a);
        c = Hc(c, 1, d);
        d = qo(a);
        c = Jc(c, 2, d);
        c = Hc(c, 3, a.g.sd);
        return Hc(c, 7, Math.round(b || a.l.performance.now()))
    }
    async function so(a) {
        await oo(a.l, ()=>!(!po(a) || !qo(a)))
    }
    function to(a) {
        var b = P(uo);
        b.j && sj(1178, ()=>{
            const c = b.v;
            a(c);
            b.g.psi = c.toJSON()
        }
        )
    }
    async function vo(a) {
        var b = P(uo);
        if (b.j && !b.g.le.includes(1)) {
            b.g.le.push(1);
            var c = b.l.performance.now();
            await so(b);
            a = gf(hf(kf(new lf, a), ef(df(new ff, ci(b.l).scrollWidth), ci(b.l).scrollHeight)), ef(df(new ff, di(b.l)), ci(b.l).clientHeight));
            var d = new nf;
            Q(xh) ? (Jc(a, 4, b.i),
            Jc(d, 1, b.i)) : (Jc(a, 4, b.l?.document?.URL),
            Jc(d, 1, b.l?.document?.URL));
            var e = ei(b.l);
            0 !== e && jf(a, bf(e));
            Uf(b.h, qf(ro(b, c), a));
            Yf(b.m, ()=>{
                try {
                    if (null != b.g?.psi) {
                        var f = Kc(mf, gc(b.g.psi));
                        yc(d, 2, f)
                    }
                } catch {}
                f = b.h;
                var g = ro(b);
                g = zc(g, 8, rf, d);
                Uf(f, g)
            }
            , 9)
        }
    }
    async function wo(a, b, c) {
        if (a.j && c.length && !a.g.lgdp.includes(Number(b))) {
            a.g.lgdp.push(Number(b));
            var d = a.l.performance.now();
            await so(a);
            var e = a.h;
            a = ro(a, d);
            d = new af;
            b = C(d, 1, Kb(b), 0);
            c = rc(b, 2, c, Mb);
            c = zc(a, 9, rf, c);
            Uf(e, c)
        }
    }
    async function xo(a, b) {
        await so(a);
        var c = a.h;
        a = ro(a);
        a = Hc(a, 3, 1);
        b = zc(a, 10, rf, b);
        Uf(c, b)
    }
    var uo = class {
        constructor(a, b) {
            this.l = fe() || window;
            this.m = b ?? new no(this.l);
            this.h = a ?? new $f(2,"m202312060101",100,100,!0,this.m);
            this.g = Uj(Rj(), 33, ()=>{
                const c = ad(vh);
                return {
                    sd: c,
                    ssp: 0 < c && Dd() < 1 / c,
                    pc: null,
                    wpc: null,
                    cu: null,
                    le: [],
                    lgdp: [],
                    psi: null
                }
            }
            )
        }
        get j() {
            return this.g.ssp
        }
        get i() {
            return this.g.cu
        }
        set i(a) {
            this.g.cu = a
        }
        get v() {
            return null === this.g.psi ? new mf : Kc(mf, gc(this.g.psi))
        }
    }
    ;
    function yo() {
        var a = window;
        return "on" === p.google_adtest || "on" === p.google_adbreak_test || a.location.host.endsWith("h5games.usercontent.goog") ? a.document.querySelector('meta[name="h5-games-eids"]')?.getAttribute("content")?.split(",").map(b=>Math.floor(Number(b))).filter(b=>!isNaN(b) && 0 < b) || [] : []
    }
    ;function zo(a, b) {
        return a instanceof HTMLScriptElement && b.test(a.src) ? 0 : 1
    }
    function Ao(a) {
        var b = S.document;
        if (b.currentScript)
            return zo(b.currentScript, a);
        for (const c of b.scripts)
            if (0 === zo(c, a))
                return 0;
        return 1
    }
    ;function Bo(a, b) {
        return {
            [3]: {
                [55]: ()=>0 === a,
                [23]: c=>Yl(S, Number(c)),
                [24]: c=>am(Number(c)),
                [61]: ()=>K(b, 6),
                [63]: ()=>K(b, 6) || ".google.ch" === L(b, 8)
            },
            [4]: {},
            [5]: {
                [6]: ()=>L(b, 15)
            }
        }
    }
    ;function Co(a=p) {
        return a.ggeac || (a.ggeac = {})
    }
    ;function Do(a, b=document) {
        return !!b.featurePolicy?.features().includes(a)
    }
    function Eo(a, b=document) {
        return !!b.featurePolicy?.allowedFeatures().includes(a)
    }
    ;function Fo(a, b) {
        try {
            const d = a.split(".");
            a = p;
            let e = 0, f;
            for (; null != a && e < d.length; e++)
                f = a,
                a = a[d[e]],
                "function" === typeof a && (a = f[d[e]]());
            var c = a;
            if (typeof c === b)
                return c
        } catch {}
    }
    var Go = {
        [3]: {
            [8]: a=>{
                try {
                    return null != ca(a)
                } catch {}
            }
            ,
            [9]: a=>{
                try {
                    var b = ca(a)
                } catch {
                    return
                }
                if (a = "function" === typeof b)
                    b = b && b.toString && b.toString(),
                    a = "string" === typeof b && -1 != b.indexOf("[native code]");
                return a
            }
            ,
            [10]: ()=>window === window.top,
            [6]: a=>Pa(P(Dg).g(), Number(a)),
            [27]: a=>{
                a = Fo(a, "boolean");
                return void 0 !== a ? a : void 0
            }
            ,
            [60]: a=>{
                try {
                    return !!p.document.querySelector(a)
                } catch {}
            }
            ,
            [69]: a=>Do(a, p.document),
            [70]: a=>Eo(a, p.document)
        },
        [4]: {
            [3]: ()=>Kd(),
            [6]: a=>{
                a = Fo(a, "number");
                return void 0 !== a ? a : void 0
            }
        },
        [5]: {
            [2]: ()=>window.location.href,
            [3]: ()=>{
                try {
                    return window.top.location.hash
                } catch {
                    return ""
                }
            }
            ,
            [4]: a=>{
                a = Fo(a, "string");
                return void 0 !== a ? a : void 0
            }
        }
    };
    function Ho(a, b) {
        const c = new Map;
        for (const [f,g] of a[1].entries()) {
            var d = f
              , e = g;
            const {fb: h, Za: k, ab: m} = e[e.length - 1];
            c.set(d, h + k * m)
        }
        for (const f of b)
            for (const g of G(f, Hl, 2))
                if (0 !== G(g, Gl, 2).length) {
                    b = Dc(Pb(u(g, 8)));
                    M(g, 4) && !M(g, 13) && (b = c.get(M(g, 4)) ?? 0,
                    d = Dc(Pb(u(g, 1))) * G(g, Gl, 2).length,
                    c.set(M(g, 4), b + d));
                    d = [];
                    for (e = 0; e < G(g, Gl, 2).length; e++) {
                        const h = {
                            fb: b,
                            Za: Dc(Pb(u(g, 1))),
                            ab: G(g, Gl, 2).length,
                            yb: e,
                            Ua: M(f, 1),
                            oa: g,
                            N: G(g, Gl, 2)[e]
                        };
                        d.push(h)
                    }
                    Io(a[2], M(g, 10), d) || Io(a[1], M(g, 4), d) || Io(a[0], G(g, Gl, 2)[0].getId(), d)
                }
        return a
    }
    function Io(a, b, c) {
        if (!b)
            return !1;
        a.has(b) || a.set(b, []);
        a.get(b).push(...c);
        return !0
    }
    ;function Jo(a=Dd()) {
        return b=>Fd(`${b} + ${a}`) % 1E3
    }
    ;const Ko = [12, 13, 20];
    function Lo(a, b, c) {
        a.g[c] || (a.g[c] = []);
        a = a.g[c];
        a.includes(b) || a.push(b)
    }
    function Mo(a, b, c, d) {
        const e = [];
        var f;
        if (f = 9 !== b)
            a.j[b] ? f = !0 : (a.j[b] = !0,
            f = !1);
        if (f)
            return cg(a.L, b, c, e, [], 4),
            e;
        f = Ko.includes(b);
        const g = []
          , h = P(gg).F
          , k = [];
        for (const x of [0, 1, 2])
            for (const [v,w] of a.ia[x].entries()) {
                var m = v
                  , l = w;
                const z = new xf;
                var n = l.filter(A=>A.Ua === b && !!a.h[A.N.getId()] && Se(E(A.oa, Le, 3), h) && Se(E(A.N, Le, 3), h));
                if (n.length)
                    for (const A of n)
                        k.push(A.N);
                else if (!a.xa && (2 === x ? (n = d[1],
                sc(z, 2, yf, Kb(m))) : n = d[0],
                m = n?.(String(m)) ?? (2 === x && 1 === M(l[0].oa, 11) ? void 0 : d[0](String(m))),
                void 0 !== m)) {
                    for (const A of l)
                        if (A.Ua === b) {
                            l = m - A.fb;
                            n = A.Za;
                            const D = A.ab
                              , J = A.yb;
                            0 <= l && l < n * D && l % D === J && Se(E(A.oa, Le, 3), h) && Se(E(A.N, Le, 3), h) && (l = M(A.oa, 13),
                            0 !== l && void 0 !== l && (n = a.i[String(l)],
                            void 0 !== n && n !== A.N.getId() ? eg(a.L, a.i[String(l)], A.N.getId(), l) : a.i[String(l)] = A.N.getId()),
                            k.push(A.N))
                        }
                    0 !== vc(z, yf) && (C(z, 3, Nb(m), 0),
                    g.push(z))
                }
            }
        for (const x of k)
            d = x.getId(),
            e.push(d),
            Lo(a, d, f ? 4 : c),
            ug(G(x, Ve, 2), f ? wg() : [c], a.L, d);
        cg(a.L, b, c, e, g, 1);
        return e
    }
    function No(a, b) {
        b = b.map(c=>new Il(c)).filter(c=>!Ko.includes(M(c, 1)));
        a.ia = Ho(a.ia, b)
    }
    function Oo(a, b) {
        T(1, c=>{
            a.h[c] = !0
        }
        , b);
        T(2, (c,d,e)=>Mo(a, c, d, e), b);
        T(3, c=>(a.g[c] || []).concat(a.g[4]), b);
        T(12, c=>void No(a, c), b);
        T(16, (c,d)=>void Lo(a, c, d), b)
    }
    var Po = class {
        constructor(a, b, c, {xa: d=!1, rc: e=[]}={}) {
            this.ia = a;
            this.L = c;
            this.j = {};
            this.xa = d;
            this.g = {
                [b]: [],
                [4]: []
            };
            this.h = {};
            this.i = {};
            if (a = qe()) {
                a = a.split(",") || [];
                for (const f of a)
                    (a = Number(f)) && (this.h[a] = !0)
            }
            for (const f of e)
                this.h[f] = !0
        }
    }
    ;
    function Qo(a, b) {
        a.g = yg(14, b, ()=>{}
        )
    }
    class Ro {
        constructor() {
            this.g = ()=>{}
        }
    }
    function So(a) {
        P(Ro).g(a)
    }
    ;function To({pb: a, F: b, config: c, kb: d=Co(), lb: e=0, L: f=new fg(E(a, Jl, 5)?.g() ?? 0,E(a, Jl, 5)?.h() ?? 0,E(a, Jl, 5)?.i() ?? !1), ia: g=Ho({
        [0]: new Map,
        [1]: new Map,
        [2]: new Map
    }, G(a, Il, 2))}) {
        d.hasOwnProperty("init-done") ? (yg(12, d, ()=>{}
        )(G(a, Il, 2).map(h=>h.toJSON())),
        yg(13, d, ()=>{}
        )(G(a, Ve, 1).map(h=>h.toJSON()), e),
        b && yg(14, d, ()=>{}
        )(b),
        Uo(e, d)) : (Oo(new Po(g,e,f,c), d),
        zg(d),
        Ag(d),
        Bg(d),
        Uo(e, d),
        ug(G(a, Ve, 1), [e], f, void 0, !0),
        hg = hg || !(!c || !c.tb),
        So(Go),
        b && So(b))
    }
    function Uo(a, b=Co()) {
        Cg(P(Dg), b, a);
        Vo(b, a);
        Qo(P(Ro), b);
        P($c).m()
    }
    function Vo(a, b) {
        const c = P($c);
        c.i = (d,e)=>yg(5, a, ()=>!1)(d, e, b);
        c.j = (d,e)=>yg(6, a, ()=>0)(d, e, b);
        c.g = (d,e)=>yg(7, a, ()=>"")(d, e, b);
        c.h = (d,e)=>yg(8, a, ()=>[])(d, e, b);
        c.m = ()=>{
            yg(15, a, ()=>{}
            )(b)
        }
    }
    ;function Wo(a, b) {
        b = {
            [0]: Jo(Rd(b).toString())
        };
        b = P(Dg).j(a, b);
        Hg.W(1085, wo(P(uo), a, b))
    }
    var Xo = (a,b,c)=>{
        var d = X(a);
        if (d.plle)
            Uo(1, Co(a));
        else {
            d.plle = !0;
            d = E(b, Kl, 12);
            var e = K(b, 9);
            To({
                pb: d,
                F: Bo(c, b),
                config: {
                    xa: e && !!a.google_disable_experiments,
                    tb: e
                },
                kb: Co(a),
                lb: 1
            });
            if (c = L(b, 15))
                c = Number(c),
                P(Dg).i(c);
            for (const f of pc(b, 19, Ob))
                P(Dg).h(f);
            Wo(12, a);
            Wo(10, a);
            a = zd(a) || a;
            wm(a.location, "google_mc_lab") && P(Dg).h(44738307);
            wm(a.location, "google_auto_storify_swipeable") && P(Dg).h(44773747);
            wm(a.location, "google_auto_storify_scrollable") && P(Dg).h(44773746)
        }
    }
    ;
    function Yo(a) {
        W.Ba(b=>{
            b.shv = String(a);
            b.mjsv = Mm({
                ta: "m202312060101",
                Aa: a
            });
            const c = P(Dg).g()
              , d = yo();
            b.eid = c.concat(d).join(",")
        }
        )
    }
    ;function Zo(a) {
        var b = W;
        try {
            return Lc(a, Je),
            new Ml(JSON.parse(a))
        } catch (c) {
            b.H(838, c instanceof Error ? c : Error(String(c)), void 0, d=>{
                d.jspb = String(a)
            }
            )
        }
        return new Ml
    }
    ;function $o(a) {
        if (a.g)
            return a.g;
        a.v && a.v(a.h) ? a.g = a.h : a.g = Jd(a.h, a.B);
        return a.g ?? null
    }
    var ap = class extends bk {
        constructor(a, b, c) {
            super();
            this.B = b;
            this.v = c;
            this.A = new Map;
            this.j = new Map;
            this.h = a
        }
    }
    ;
    const bp = (a,b)=>{
        (0,
        a.__uspapi)("getUSPData", 1, (c,d)=>{
            b.aa({
                ua: c ?? void 0,
                ob: d ? void 0 : 2
            })
        }
        )
    }
      , cp = {
        vb: a=>a.aa,
        wb: (a,b)=>({
            __uspapiCall: {
                callId: b,
                command: "getUSPData",
                version: 1
            }
        }),
        zb: (a,b)=>{
            b = b.__uspapiReturn;
            a({
                ua: b.returnValue ?? void 0,
                ob: b.success ? void 0 : 2
            })
        }
    };
    var dp = class extends bk {
        constructor() {
            var a = S;
            super();
            this.timeoutMs = {}.timeoutMs ?? 500;
            this.caller = new ap(a,"__uspapiLocator",b=>"function" === typeof b.__uspapi);
            this.caller.A.set("getDataWithCallback", bp);
            this.caller.j.set("getDataWithCallback", cp)
        }
    }
    ;
    var ep = Oc(class extends N {
    }
    );
    const fp = (a,b)=>{
        const c = {
            cb: d=>{
                d = ep(d);
                b.aa({
                    ua: d
                })
            }
        };
        b.spsp && (c.spsp = b.spsp);
        a = a.googlefc || (a.googlefc = {});
        a.__fci = a.__fci || [];
        a.__fci.push(b.command, c)
    }
      , gp = {
        vb: a=>a.aa,
        wb: (a,b)=>({
            __fciCall: {
                callId: b,
                command: a.command,
                spsp: a.spsp || void 0
            }
        }),
        zb: (a,b)=>{
            a({
                ua: b
            })
        }
    };
    var hp = class extends bk {
        constructor() {
            var a = S;
            super();
            this.g = this.h = !1;
            this.caller = new ap(a,"googlefcPresent");
            this.caller.A.set("getDataWithCallback", fp);
            this.caller.j.set("getDataWithCallback", gp)
        }
    }
    ;
    var ip = a=>{
        Yc(window, "message", b=>{
            let c;
            try {
                c = JSON.parse(b.data)
            } catch (d) {
                return
            }
            !c || "sc-cnf" !== c.googMsgType || a(c, b)
        }
        )
    }
    ;
    function jp(a, b) {
        return null == b ? `&${a}=null` : `&${a}=${Math.floor(b)}`
    }
    function kp(a, b) {
        return `&${a}=${b.toFixed(3)}`
    }
    function lp() {
        const a = new Set
          , b = Gj();
        try {
            if (!b)
                return a;
            const c = b.pubads();
            for (const d of c.getSlots())
                a.add(d.getSlotId().getDomId())
        } catch {}
        return a
    }
    function mp(a) {
        a = a.id;
        return null != a && (lp().has(a) || a.startsWith("google_ads_iframe_") || a.startsWith("aswift"))
    }
    function np(a, b, c) {
        if (!a.sources)
            return !1;
        switch (op(a)) {
        case 2:
            const d = pp(a);
            if (d)
                return c.some(f=>qp(d, f));
            break;
        case 1:
            const e = rp(a);
            if (e)
                return b.some(f=>qp(e, f))
        }
        return !1
    }
    function op(a) {
        if (!a.sources)
            return 0;
        a = a.sources.filter(b=>b.previousRect && b.currentRect);
        if (1 <= a.length) {
            a = a[0];
            if (a.previousRect.top < a.currentRect.top)
                return 2;
            if (a.previousRect.top > a.currentRect.top)
                return 1
        }
        return 0
    }
    function rp(a) {
        return sp(a, b=>b.currentRect)
    }
    function pp(a) {
        return sp(a, b=>b.previousRect)
    }
    function sp(a, b) {
        return a.sources.reduce((c,d)=>{
            d = b(d);
            return c ? d && 0 !== d.width * d.height ? d.top < c.top ? d : c : c : d
        }
        , null)
    }
    function qp(a, b) {
        const c = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        a = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        return 0 >= c || 0 >= a ? !1 : 50 <= 100 * c * a / ((b.right - b.left) * (b.bottom - b.top))
    }
    function tp() {
        const a = Array.from(document.getElementsByTagName("iframe")).filter(mp)
          , b = [...lp()].map(c=>document.getElementById(c)).filter(c=>null !== c);
        up = window.scrollX;
        vp = window.scrollY;
        return wp = [...a, ...b].map(c=>c.getBoundingClientRect())
    }
    function xp() {
        var a = new yp;
        if (Q(Uc)) {
            var b = window;
            if (!b.google_plmetrics && window.PerformanceObserver) {
                b.google_plmetrics = !0;
                b = ["layout-shift", "largest-contentful-paint", "first-input", "longtask"];
                a.hb.nb && b.push("event");
                for (const c of b)
                    b = {
                        type: c,
                        buffered: !0
                    },
                    "event" === c && (b.durationThreshold = 40),
                    zp(a).observe(b);
                Ap(a)
            }
        }
    }
    function Bp(a, b) {
        const c = up !== window.scrollX || vp !== window.scrollY ? [] : wp
          , d = tp();
        for (const e of b.getEntries())
            switch (b = e.entryType,
            b) {
            case "layout-shift":
                Cp(a, e, c, d);
                break;
            case "largest-contentful-paint":
                b = e;
                a.Ia = Math.floor(b.renderTime || b.loadTime);
                a.Ha = b.size;
                break;
            case "first-input":
                b = e;
                a.Ea = Number((b.processingStart - b.startTime).toFixed(3));
                a.Fa = !0;
                a.g.some(f=>f.entries.some(g=>e.duration === g.duration && e.startTime === g.startTime)) || Dp(a, e);
                break;
            case "longtask":
                b = Math.max(0, e.duration - 50);
                a.v += b;
                a.G = Math.max(a.G, b);
                a.qa += 1;
                break;
            case "event":
                Dp(a, e);
                break;
            default:
                wd(b, void 0)
            }
    }
    function zp(a) {
        a.L || (a.L = new PerformanceObserver($i(640, b=>{
            Bp(a, b)
        }
        )));
        return a.L
    }
    function Ap(a) {
        const b = $i(641, ()=>{
            var d = document;
            2 === (d.prerendering ? 3 : {
                visible: 1,
                hidden: 2,
                prerender: 3,
                preview: 4,
                unloaded: 5
            }[d.visibilityState || d.webkitVisibilityState || d.mozVisibilityState || ""] || 0) && Ep(a)
        }
        )
          , c = $i(641, ()=>void Ep(a));
        document.addEventListener("visibilitychange", b);
        document.addEventListener("pagehide", c);
        a.Da = ()=>{
            document.removeEventListener("visibilitychange", b);
            document.removeEventListener("pagehide", c);
            zp(a).disconnect()
        }
    }
    function Ep(a) {
        if (!a.La) {
            a.La = !0;
            zp(a).takeRecords();
            var b = "https://pagead2.googlesyndication.com/pagead/gen_204?id=plmetrics";
            window.LayoutShift && (b += kp("cls", a.A),
            b += kp("mls", a.V),
            b += jp("nls", a.pa),
            window.LayoutShiftAttribution && (b += kp("cas", a.m),
            b += jp("nas", a.Ka),
            b += kp("was", a.Pa)),
            b += kp("wls", a.ra),
            b += kp("tls", a.Oa));
            window.LargestContentfulPaint && (b += jp("lcp", a.Ia),
            b += jp("lcps", a.Ha));
            window.PerformanceEventTiming && a.Fa && (b += jp("fid", a.Ea));
            window.PerformanceLongTaskTiming && (b += jp("cbt", a.v),
            b += jp("mbt", a.G),
            b += jp("nlt", a.qa));
            let d = 0;
            for (var c of document.getElementsByTagName("iframe"))
                mp(c) && d++;
            b += jp("nif", d);
            b += jp("ifi", he(window));
            c = P(Dg).g();
            b += `&${"eid"}=${encodeURIComponent(c.join())}`;
            b += `&${"top"}=${p === p.top ? 1 : 0}`;
            b += a.Na ? `&${"qqid"}=${encodeURIComponent(a.Na)}` : jp("pvsid", Rd(p));
            window.googletag && (b += "&gpt=1");
            c = Math.min(a.g.length - 1, Math.floor((a.L ? a.Ga : performance.interactionCount || 0) / 50));
            0 <= c && (c = a.g[c].latency,
            0 <= c && (b += jp("inp", c)));
            window.fetch(b, {
                keepalive: !0,
                credentials: "include",
                redirect: "follow",
                method: "get",
                mode: "no-cors"
            });
            a.Da()
        }
    }
    function Cp(a, b, c, d) {
        if (!b.hadRecentInput) {
            a.A += Number(b.value);
            Number(b.value) > a.V && (a.V = Number(b.value));
            a.pa += 1;
            if (c = np(b, c, d))
                a.m += b.value,
                a.Ka++;
            if (5E3 < b.startTime - a.Ja || 1E3 < b.startTime - a.Ma)
                a.Ja = b.startTime,
                a.h = 0,
                a.i = 0;
            a.Ma = b.startTime;
            a.h += b.value;
            c && (a.i += b.value);
            a.h > a.ra && (a.ra = a.h,
            a.Pa = a.i,
            a.Oa = b.startTime + b.duration)
        }
    }
    function Dp(a, b) {
        Fp(a, b);
        const c = a.g[a.g.length - 1]
          , d = a.B[b.interactionId];
        if (d || 10 > a.g.length || b.duration > c.latency)
            d ? (d.entries.push(b),
            d.latency = Math.max(d.latency, b.duration)) : (b = {
                id: b.interactionId,
                latency: b.duration,
                entries: [b]
            },
            a.B[b.id] = b,
            a.g.push(b)),
            a.g.sort((e,f)=>f.latency - e.latency),
            a.g.splice(10).forEach(e=>{
                delete a.B[e.id]
            }
            )
    }
    function Fp(a, b) {
        b.interactionId && (a.Z = Math.min(a.Z, b.interactionId),
        a.j = Math.max(a.j, b.interactionId),
        a.Ga = a.j ? (a.j - a.Z) / 7 + 1 : 0)
    }
    var yp = class {
        constructor() {
            var a = {
                nb: Q(Th)
            };
            this.i = this.h = this.pa = this.V = this.A = 0;
            this.Ma = this.Ja = Number.NEGATIVE_INFINITY;
            this.g = [];
            this.B = {};
            this.Ga = 0;
            this.Z = Infinity;
            this.Ea = this.Ha = this.Ia = this.Ka = this.Pa = this.m = this.Oa = this.ra = this.j = 0;
            this.Fa = !1;
            this.qa = this.G = this.v = 0;
            this.L = null;
            this.La = !1;
            this.Da = ()=>{}
            ;
            const b = document.querySelector("[data-google-query-id]");
            this.Na = b ? b.getAttribute("data-google-query-id") : null;
            this.hb = a
        }
    }
    , up, vp, wp = [];
    let Gp = null;
    const Hp = []
      , Ip = new Map;
    let Jp = -1;
    function Kp(a) {
        return zi.test(a.className) && "done" !== a.dataset.adsbygoogleStatus
    }
    function Lp(a, b, c) {
        a.dataset.adsbygoogleStatus = "done";
        Mp(a, b, c)
    }
    function Mp(a, b, c) {
        var d = window;
        d.google_spfd || (d.google_spfd = io);
        var e = b.google_reactive_ads_config;
        e || io(a, b, d, c);
        kn(d, b);
        if (!Np(a, b, d)) {
            if (e) {
                e = e.page_level_pubvars || {};
                if (X(S).page_contains_reactive_tag && !X(S).allow_second_reactive_tag) {
                    if (e.pltais) {
                        Rl(!1);
                        return
                    }
                    throw new V("Only one 'enable_page_level_ads' allowed per page.");
                }
                X(S).page_contains_reactive_tag = !0;
                Rl(7 === e.google_pgb_reactive)
            }
            b.google_unique_id = ge(d);
            Ed(Nm, (f,g)=>{
                b[g] = b[g] || d[g]
            }
            );
            "sd" !== b.google_loader_used && (b.google_loader_used = "aa");
            b.google_reactive_tag_first = 1 === (X(S).first_tag_on_page || 0);
            sj(164, ()=>{
                rn(d, b, a, c)
            }
            )
        }
    }
    function Np(a, b, c) {
        var d = b.google_reactive_ads_config
          , e = "string" === typeof a.className && RegExp("(\\W|^)adsbygoogle-noablate(\\W|$)").test(a.className)
          , f = Pl(c);
        if (f && f.Qa && "on" !== b.google_adtest && !e) {
            e = ji(a, c);
            const g = ci(c).clientHeight;
            e = 0 == g ? null : e / g;
            if (!f.sa || f.sa && (e || 0) >= f.sa)
                return a.className += " adsbygoogle-ablated-ad-slot",
                c = c.google_sv_map = c.google_sv_map || {},
                d = ha(a),
                b.google_element_uid = d,
                c[b.google_element_uid] = b,
                a.setAttribute("google_element_uid", String(d)),
                "slot" === f.Gb && (null !== Id(a.getAttribute("width")) && a.setAttribute("width", "0"),
                null !== Id(a.getAttribute("height")) && a.setAttribute("height", "0"),
                a.style.width = "0px",
                a.style.height = "0px"),
                !0
        }
        if ((f = Cd(a, c)) && "none" === f.display && !("on" === b.google_adtest || 0 < b.google_reactive_ad_format || d))
            return c.document.createComment && a.appendChild(c.document.createComment("No ad requested because of display:none on the adsbygoogle tag")),
            !0;
        a = null == b.google_pgb_reactive || 3 === b.google_pgb_reactive;
        return 1 !== b.google_reactive_ad_format && 8 !== b.google_reactive_ad_format || !a ? !1 : (p.console && p.console.warn("Adsbygoogle tag with data-reactive-ad-format=" + String(b.google_reactive_ad_format) + " is deprecated. Check out page-level ads at https://www.google.com/adsense"),
        !0)
    }
    function Op(a) {
        var b = document.getElementsByTagName("INS");
        for (let d = 0, e = b[d]; d < b.length; e = b[++d]) {
            var c = e;
            if (Kp(c) && "reserved" !== c.dataset.adsbygoogleStatus && (!a || e.id === a))
                return e
        }
        return null
    }
    function Pp(a, b, c) {
        if (a && "shift"in a) {
            to(e=>{
                Fc(wc(e), 2) || (e = wc(e),
                Ic(e, 2))
            }
            );
            for (var d = 20; 0 < a.length && 0 < d; ) {
                try {
                    Qp(a.shift(), b, c)
                } catch (e) {
                    setTimeout(()=>{
                        throw e;
                    }
                    )
                }
                --d
            }
        }
    }
    function Rp() {
        const a = Bd("INS");
        a.className = "adsbygoogle";
        a.className += " adsbygoogle-noablate";
        Ld(a);
        return a
    }
    function Sp(a, b) {
        const c = {}
          , d = hm(a.google_ad_client, b);
        Ed(bi, (g,h)=>{
            !1 === a.enable_page_level_ads ? c[h] = !1 : a.hasOwnProperty(h) ? c[h] = a[h] : d.includes(g) && (c[h] = !1)
        }
        );
        fa(a.enable_page_level_ads) && (c.page_level_pubvars = a.enable_page_level_ads);
        const e = Rp();
        Sd.body.appendChild(e);
        const f = {
            google_reactive_ads_config: c,
            google_ad_client: a.google_ad_client
        };
        f.google_pause_ad_requests = !!X(S).pause_ad_requests;
        Lp(e, f, b);
        to(g=>{
            Fc(wc(g), 6) || (g = wc(g),
            Ic(g, 6))
        }
        )
    }
    function Tp(a, b) {
        Dm(p).wasPlaTagProcessed = !0;
        const c = ()=>{
            Sp(a, b)
        }
          , d = p.document;
        if (d.body || "complete" === d.readyState || "interactive" === d.readyState)
            Sp(a, b);
        else {
            const e = Xc(W.ma(191, c));
            Yc(d, "DOMContentLoaded", e);
            (new p.MutationObserver((f,g)=>{
                d.body && (e(),
                g.disconnect())
            }
            )).observe(d, {
                childList: !0,
                subtree: !0
            })
        }
    }
    function Qp(a, b, c) {
        const d = {};
        sj(165, ()=>{
            Up(a, d, b, c)
        }
        , e=>{
            e.client = e.client || d.google_ad_client || a.google_ad_client;
            e.slotname = e.slotname || d.google_ad_slot;
            e.tag_origin = e.tag_origin || d.google_tag_origin
        }
        )
    }
    function Vp(a) {
        delete a.google_checked_head;
        Ed(a, (b,c)=>{
            yi[c] || (delete a[c],
            b = c.replace("google", "data").replace(/_/g, "-"),
            p.console.warn(`AdSense head tag doesn't support ${b} attribute.`))
        }
        )
    }
    function Wp(a, b) {
        var c = S.document.querySelector('script[src*="/pagead/js/adsbygoogle.js?client="]:not([data-checked-head])') || S.document.querySelector('script[src*="/pagead/js/adsbygoogle.js"][data-ad-client]:not([data-checked-head])');
        if (c) {
            c.setAttribute("data-checked-head", "true");
            var d = X(window);
            if (d.head_tag_slot_vars)
                Xp(c);
            else {
                to(g=>{
                    g = wc(g);
                    C(g, 7, Hb(!0), !1)
                }
                );
                var e = {};
                go(c, e);
                Vp(e);
                var f = ed(e);
                d.head_tag_slot_vars = f;
                c = {
                    google_ad_client: e.google_ad_client,
                    enable_page_level_ads: e
                };
                "bottom" === e.google_overlays && (c.overlays = {
                    bottom: !0
                });
                delete e.google_overlays;
                S.adsbygoogle || (S.adsbygoogle = []);
                d = S.adsbygoogle;
                d.loaded ? d.push(c) : d.splice && d.splice(0, 0, c);
                e.google_adbreak_test || b.h()?.h() ? Yp(f, a) : ip(()=>{
                    Yp(f, a)
                }
                )
            }
        }
    }
    function Xp(a) {
        const b = X(window).head_tag_slot_vars
          , c = a.getAttribute("src") || "";
        if ((a = vd(c, "client") || a.getAttribute("data-ad-client") || "") && a !== b.google_ad_client)
            throw new V("Warning: Do not add multiple property codes with AdSense tag to avoid seeing unexpected behavior. These codes were found on the page " + a + ", " + b.google_ad_client);
    }
    function Zp(a) {
        if ("object" === typeof a && null != a) {
            if ("string" === typeof a.type)
                return 2;
            if ("string" === typeof a.sound || "string" === typeof a.preloadAdBreaks)
                return 3
        }
        return 0
    }
    function Up(a, b, c, d) {
        if (null == a)
            throw new V("push() called with no parameters.");
        to(f=>{
            Fc(wc(f), 3) || (f = wc(f),
            Ic(f, 3))
        }
        );
        d.i() && $p(a, d.g().g(), L(d, 2));
        var e = Zp(a);
        if (0 !== e)
            if (d = Sl(),
            d.first_slotcar_request_processing_time || (d.first_slotcar_request_processing_time = Date.now(),
            d.adsbygoogle_execution_start_time = qa),
            null == Gp)
                aq(a),
                Hp.push(a);
            else if (3 === e) {
                const f = Gp;
                sj(787, ()=>{
                    f.handleAdConfig(a)
                }
                )
            } else
                uj(730, Gp.handleAdBreak(a));
        else {
            qa = (new Date).getTime();
            ln(c, d, bq(a));
            cq();
            a: {
                if (void 0 != a.enable_page_level_ads) {
                    if ("string" === typeof a.google_ad_client) {
                        e = !0;
                        break a
                    }
                    throw new V("'google_ad_client' is missing from the tag config.");
                }
                e = !1
            }
            if (e)
                to(f=>{
                    Fc(wc(f), 4) || (f = wc(f),
                    Ic(f, 4))
                }
                ),
                dq(a, d);
            else if ((e = a.params) && Ed(e, (f,g)=>{
                b[g] = f
            }
            ),
            "js" === b.google_ad_output)
                console.warn("Ads with google_ad_output='js' have been deprecated and no longer work. Contact your AdSense account manager or switch to standard AdSense ads.");
            else {
                e = eq(a.element);
                go(e, b);
                c = X(p).head_tag_slot_vars || {};
                Ed(c, (f,g)=>{
                    b.hasOwnProperty(g) || (b[g] = f)
                }
                );
                if (e.hasAttribute("data-require-head") && !X(p).head_tag_slot_vars)
                    throw new V("AdSense head tag is missing. AdSense body tags don't work without the head tag. You can copy the head tag from your account on https://adsense.com.");
                if (!b.google_ad_client)
                    throw new V("Ad client is missing from the slot.");
                if (c = 0 === (X(S).first_tag_on_page || 0) && Gm(b))
                    to(f=>{
                        Fc(wc(f), 5) || (f = wc(f),
                        Ic(f, 5))
                    }
                    ),
                    fq(c);
                0 === (X(S).first_tag_on_page || 0) && (X(S).first_tag_on_page = 2);
                b.google_pause_ad_requests = !!X(S).pause_ad_requests;
                Lp(e, b, d)
            }
        }
    }
    let gq = !1;
    function $p(a, b, c) {
        gq || (gq = !0,
        a = bq(a) || Rm(S),
        tj("predictive_abg", {
            a_c: a,
            p_c: b.join(),
            b_v: c
        }, .01))
    }
    function bq(a) {
        return a.google_ad_client ? a.google_ad_client : (a = a.params) && a.google_ad_client ? a.google_ad_client : ""
    }
    function cq() {
        if (Q(Ch)) {
            var a = Pl(S);
            if (!(a = a && a.Qa)) {
                a = S;
                try {
                    var b = a.localStorage
                } catch (c) {
                    b = null
                }
                b = b ? Dl(b) : null;
                a = !(b && Cl(b) && b)
            }
            a || Ql(S, 1)
        }
    }
    function fq(a) {
        Td(()=>{
            Dm(p).wasPlaTagProcessed || p.adsbygoogle && p.adsbygoogle.push(a)
        }
        )
    }
    function dq(a, b) {
        0 === (X(S).first_tag_on_page || 0) && (X(S).first_tag_on_page = 1);
        if (a.tag_partner) {
            var c = a.tag_partner;
            const d = X(p);
            d.tag_partners = d.tag_partners || [];
            d.tag_partners.push(c)
        }
        Hm(a, b);
        Tp(a, b)
    }
    function eq(a) {
        if (a) {
            if (!Kp(a) && (a.id ? a = Op(a.id) : a = null,
            !a))
                throw new V("'element' has already been filled.");
            if (!("innerHTML"in a))
                throw new V("'element' is not a good DOM element.");
        } else if (a = Op(),
        !a)
            throw new V("All 'ins' elements in the DOM with class=adsbygoogle already have ads in them.");
        return a
    }
    function hq() {
        var a = new kk(S)
          , b = new dp
          , c = new hp
          , d = S.__cmp ? 1 : 0;
        a = gk(a) ? 1 : 0;
        b = $o(b.caller) ? 1 : 0;
        c.h || (c.g = !!$o(c.caller),
        c.h = !0);
        c = c.g;
        tj("cmpMet", {
            tcfv1: d,
            tcfv2: a,
            usp: b,
            fc: c ? 1 : 0,
            ptt: 9
        }, .001)
    }
    function iq(a) {
        var b = Rj();
        Xj(b, 26, !!Number(a))
    }
    function jq(a) {
        Number(a) ? X(S).pause_ad_requests = !0 : (X(S).pause_ad_requests = !1,
        a = ()=>{
            if (!X(S).pause_ad_requests) {
                var b = {};
                let c;
                "function" === typeof window.CustomEvent ? c = new CustomEvent("adsbygoogle-pub-unpause-ad-requests-event",b) : (c = document.createEvent("CustomEvent"),
                c.initCustomEvent("adsbygoogle-pub-unpause-ad-requests-event", !!b.bubbles, !!b.cancelable, b.detail));
                S.dispatchEvent(c)
            }
        }
        ,
        p.setTimeout(a, 0),
        p.setTimeout(a, 1E3))
    }
    function kq(a) {
        a && a.call && "function" === typeof a && window.setTimeout(a, 0)
    }
    function Yp(a, b) {
        b = Cm(hd(b.Fb, ym())).then(c=>{
            null == Gp && (c.init(a),
            Gp = c,
            lq(c))
        }
        );
        W.W(723, b);
        b.finally(()=>{
            Hp.length = 0;
            tj("slotcar", {
                event: "api_ld",
                time: Date.now() - qa,
                time_pr: Date.now() - Jp
            });
            Q(Vh) && xo(P(uo), of(23))
        }
        )
    }
    function lq(a) {
        for (const [c,d] of Ip) {
            var b = c;
            const e = d;
            -1 !== e && (p.clearTimeout(e),
            Ip.delete(b))
        }
        for (b = 0; b < Hp.length; b++) {
            if (Ip.has(b))
                continue;
            const c = Hp[b]
              , d = Zp(c);
            sj(723, ()=>{
                if (3 === d)
                    a.handleAdConfig(c);
                else if (2 === d) {
                    var e = a.handleAdBreakBeforeReady(c);
                    W.W(730, e)
                }
            }
            )
        }
    }
    function aq(a) {
        var b = Hp.length;
        if (2 === Zp(a) && "preroll" === a.type && null != a.adBreakDone) {
            var c = a.adBreakDone;
            -1 === Jp && (Jp = Date.now());
            var d = p.setTimeout(()=>{
                try {
                    c({
                        breakType: "preroll",
                        breakName: a.name,
                        breakFormat: "preroll",
                        breakStatus: "timeout"
                    }),
                    Ip.set(b, -1),
                    tj("slotcar", {
                        event: "pr_to",
                        source: "adsbygoogle"
                    }),
                    Q(Vh) && xo(P(uo), of(22))
                } catch (e) {
                    console.error("[Ad Placement API] adBreakDone callback threw an error:", e instanceof Error ? e : Error(String(e)))
                }
            }
            , 1E3 * ad(Uh));
            Ip.set(b, d)
        }
    }
    function mq() {
        var a = S.document
          , b = be`https://googleads.g.doubleclick.net`;
        const c = a.createElement("LINK");
        c.crossOrigin = "";
        a: {
            if (b instanceof gd)
                c.href = jd(b).toString();
            else {
                if (-1 === xd.indexOf("preconnect"))
                    throw Error('TrustedResourceUrl href attribute required with rel="preconnect"');
                if (b instanceof nd)
                    b = b instanceof nd && b.constructor === nd ? b.g : "type_error:SafeUrl";
                else {
                    c: {
                        try {
                            var d = new URL(b)
                        } catch (e) {
                            d = "https:";
                            break c
                        }
                        d = d.protocol
                    }
                    b = "javascript:" !== d ? b : void 0
                }
                if (void 0 === b)
                    break a;
                c.href = b
            }
            c.rel = "preconnect"
        }
        a.head.appendChild(c)
    }
    ;(function(a, b, c, d=()=>{}
    ) {
        W.eb(vj);
        sj(166, ()=>{
            const e = new $f(2,a);
            try {
                Cb(n=>{
                    var x = new Of;
                    var v = new Nf;
                    try {
                        var w = Rd(window);
                        Hc(v, 1, w)
                    } catch (J) {}
                    try {
                        var z = P(Dg).g();
                        rc(v, 2, z, Mb)
                    } catch (J) {}
                    try {
                        Jc(v, 3, window.document.URL)
                    } catch (J) {}
                    x = yc(x, 2, v);
                    v = new Mf;
                    v = C(v, 1, Kb(1191), 0);
                    try {
                        var A = Je(n?.name) ? n.name : "Unknown error";
                        Jc(v, 2, A)
                    } catch (J) {}
                    try {
                        var D = Je(n?.message) ? n.message : `Caught ${n}`;
                        Jc(v, 3, D)
                    } catch (J) {}
                    try {
                        const J = Je(n?.stack) ? n.stack : Error().stack;
                        J && rc(v, 4, J.split(/\n\s*/), Tb)
                    } catch (J) {}
                    n = yc(x, 1, v);
                    A = new Lf;
                    try {
                        Jc(A, 1, "m202312060101")
                    } catch {}
                    zc(n, 6, Pf, A);
                    Hc(n, 5, 1);
                    Rf(e, n)
                }
                )
            } catch (n) {}
            const f = Zo(b);
            Yo(L(f, 2));
            Ol(K(f, 6));
            Yj(Rj(), L(f, 24));
            d();
            de(16, [1, f.toJSON()]);
            var g = fe(ee(S)) || S;
            const h = c(Mm({
                ta: a,
                Aa: L(f, 2)
            }), f);
            var k = null === S.document.currentScript ? 1 : Ao(h.Hb);
            Zl(g, f);
            Xo(g, f, k);
            Q(th) && mq();
            to(n=>{
                var x = Dc(H(n, 1)) + 1;
                C(n, 1, Nb(x), 0);
                S.top === S && (x = Dc(H(n, 2)) + 1,
                C(n, 2, Nb(x), 0));
                Fc(wc(n), 1) || (n = wc(n),
                Ic(n, 1))
            }
            );
            uj(1086, vo(0 === k));
            if (!Ca() || 0 <= ta(Ha(), 11)) {
                rj(Q(Wh));
                un();
                kl();
                try {
                    xp()
                } catch {}
                tn();
                Wp(h, f);
                g = window;
                k = g.adsbygoogle;
                if (!k || !k.loaded) {
                    tj("new_abg_tag", {
                        value: `${K(f, 16)}`,
                        host_v: `${K(f, 22)}`,
                        frequency: .01
                    }, .01);
                    hq();
                    var m = {
                        push: n=>{
                            Qp(n, h, f)
                        }
                        ,
                        loaded: !0
                    };
                    try {
                        Object.defineProperty(m, "requestNonPersonalizedAds", {
                            set: iq
                        }),
                        Object.defineProperty(m, "pauseAdRequests", {
                            set: jq
                        }),
                        Object.defineProperty(m, "onload", {
                            set: kq
                        })
                    } catch {}
                    if (k)
                        for (var l of ["requestNonPersonalizedAds", "pauseAdRequests"])
                            void 0 !== k[l] && (m[l] = k[l]);
                    Pp(k, h, f);
                    g.adsbygoogle = m;
                    k && (m.onload = k.onload);
                    Q(yh) || (l = qn(h)) && document.documentElement.appendChild(l)
                }
            }
        }
        )
    }
    )("m202312060101", "undefined" === typeof sttc ? void 0 : sttc, function(a, b) {
        const c = 2012 < Dc(H(b, 1)) ? `_fy ${Dc(H(b, 1))}` : ""
          , d = L(b, 3);
        b = L(b, 2);
        be`data:text/javascript,//show_ads_impl_preview.js`;
        return {
            Fb: be`https://pagead2.googlesyndication.com/pagead/managed/js/adsense/${a}/${""}slotcar_library ${c}.js`,
            Db: be`https://pagead2.googlesyndication.com/pagead/managed/js/adsense/${a}/${""}show_ads_impl ${c}.js`,
            Cb: be`https://pagead2.googlesyndication.com/pagead/managed/js/adsense/${a}/${""}show_ads_impl_with_ama ${c}.js`,
            Lb: be`https://googleads.g.doubleclick.net/pagead/html/${b}/${d}/zrt_lookup ${c}.html`,
            Jb: be`https://googleads.g.doubleclick.net/pagead/html/${b}/${d}/zrt_lookup_inhead ${c}.html`,
            Kb: be`https://googleads.g.doubleclick.net/pagead/html/${b}/${d}/zrt_lookup_nohtml ${c}.html`,
            Hb: /^(?:https?:)?\/\/(?:pagead2\.googlesyndication\.com|securepubads\.g\.doubleclick\.net)\/pagead\/(?:js\/)?(?:show_ads|adsbygoogle)\.js(?:[?#].*)?$/
        }
    });
}
).call(this, "[2021,\"r20231206\",\"r20190131\",null,null,null,null,\".google.com.br\",null,null,null,[[[1082,null,null,[1]],[1277,null,null,[1]],[null,1130,null,[null,100]],[1270,null,null,[1]],[null,1032,null,[null,200],[[[12,null,null,null,4,null,\"Android\",[\"navigator.userAgent\"]],[null,500]]]],[1247,null,null,[1]],[null,1224,null,[null,0.01]],[null,1159,null,[null,500]],[1207,null,null,[1]],[null,1263,null,[null,-1]],[null,1265,null,[null,-1]],[null,1264,null,[null,-1]],[1267,null,null,[1]],[1268,null,null,[1]],[null,66,null,[null,-1]],[null,65,null,[null,-1]],[1241,null,null,[1]],[1287,null,null,[1]],[1285,null,null,[1]],[1300,null,null,[1]],[null,null,null,[null,null,null,[\"en\",\"de\"]],null,1273],[1223,null,null,[1]],[null,null,null,[null,null,null,[\"44786015\",\"44786016\"]],null,1261],[1298,null,null,[1]],[1167,null,null,[1]],[1129,null,null,[1]],[1230,null,null,[1]],[1229,null,null,[1]],[1231,null,null,[1]],[1292,null,null,[1]],[1199,null,null,[1]],[1161,null,null,[1]],[null,1072,null,[null,0.75]],[1101,null,null,[1]],[1198,null,null,[1]],[1206,null,null,[1]],[1190,null,null,[1]],[null,1245,null,[null,3600]],[1284,null,null,[1]],[null,572636916,null,[null,25]],[null,566560958,null,[null,30000]],[null,506864295,null,[null,300]],[null,508040914,null,[null,100]],[null,547455356,null,[null,49]],[568515114,null,null,[]],[null,null,null,[null,null,null,[\"1\",\"2\",\"4\",\"6\"]],null,556791602],[561639568,null,null,[1]],[557811243,null,null,[1]],[529362570,null,null,[1]],[null,572636915,null,[null,150]],[575790354,null,null,[1]],[null,561668774,null,[null,0.1]],[576554717,null,null,[1]],[null,469675170,null,[null,30000]],[573506525,null,null,[1]],[573506524,null,null,[1]],[567362967,null,null,[1]],[570863962,null,null,[1]],[null,null,570879859,[null,null,\"control_1\\\\\\\\.\\\\\\\\d\"]],[null,570863961,null,[null,50]],[570879858,null,null,[1]],[null,1085,null,[null,5]],[null,63,null,[null,30]],[null,1080,null,[null,5]],[1086,null,null,[1]],[10010,null,null,[1]],[null,1027,null,[null,10]],[null,57,null,[null,120]],[null,1079,null,[null,5]],[10009,null,null,[1]],[null,1050,null,[null,30]],[null,58,null,[null,120]],[10005,null,null,[1]],[555237685,null,null,[1]],[45460956,null,null,[1]],[45414947,null,null,[1]],[null,472785970,null,[null,500]],[557143911,null,null,[1]],[541943501,null,null,[1]],[null,550718588,null,[null,250]],[null,null,null,[null,null,null,[\"As0hBNJ8h++fNYlkq8cTye2qDLyom8NddByiVytXGGD0YVE+2CEuTCpqXMDxdhOMILKoaiaYifwEvCRlJ\/9GcQ8AAAB8eyJvcmlnaW4iOiJodHRwczovL2RvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiV2ViVmlld1hSZXF1ZXN0ZWRXaXRoRGVwcmVjYXRpb24iLCJleHBpcnkiOjE3MTk1MzI3OTksImlzU3ViZG9tYWluIjp0cnVlfQ==\",\"AgRYsXo24ypxC89CJanC+JgEmraCCBebKl8ZmG7Tj5oJNx0cmH0NtNRZs3NB5ubhpbX\/bIt7l2zJOSyO64NGmwMAAACCeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXN5bmRpY2F0aW9uLmNvbTo0NDMiLCJmZWF0dXJlIjoiV2ViVmlld1hSZXF1ZXN0ZWRXaXRoRGVwcmVjYXRpb24iLCJleHBpcnkiOjE3MTk1MzI3OTksImlzU3ViZG9tYWluIjp0cnVlfQ==\",\"A\/ERL66fN363FkXxgDc6F1+ucRUkAhjEca9W3la6xaLnD2Y1lABsqmdaJmPNaUKPKVBRpyMKEhXYl7rSvrQw+AkAAACNeyJvcmlnaW4iOiJodHRwczovL2RvdWJsZWNsaWNrLm5ldDo0NDMiLCJmZWF0dXJlIjoiRmxlZGdlQmlkZGluZ0FuZEF1Y3Rpb25TZXJ2ZXIiLCJleHBpcnkiOjE3MTkzNTk5OTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9\",\"A6OdGH3fVf4eKRDbXb4thXA4InNqDJDRhZ8U533U\/roYjp4Yau0T3YSuc63vmAs\/8ga1cD0E3A7LEq6AXk1uXgsAAACTeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZXN5bmRpY2F0aW9uLmNvbTo0NDMiLCJmZWF0dXJlIjoiRmxlZGdlQmlkZGluZ0FuZEF1Y3Rpb25TZXJ2ZXIiLCJleHBpcnkiOjE3MTkzNTk5OTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9\"]],null,1934],[485990406,null,null,[]]],[[12,[[40,[[21065724],[21065725,[[203,null,null,[1]]]]],[4,null,9,null,null,null,null,[\"LayoutShift\"]],71],[10,[[31061690],[31061691,[[83,null,null,[1]],[84,null,null,[1]]]]],null,61]]],[13,[[500,[[31061692],[31061693,[[77,null,null,[1]],[78,null,null,[1]],[85,null,null,[1]],[80,null,null,[1]],[76,null,null,[1]]]]],[4,null,6,null,null,null,null,[\"31061691\"]]],[1000,[[31078663,null,[2,[[4,null,70,null,null,null,null,[\"browsing-topics\"]],[4,null,8,null,null,null,null,[\"document.browsingTopics\"]]]]]]],[1000,[[31078664,null,[2,[[4,null,69,null,null,null,null,[\"browsing-topics\"]],[1,[[4,null,70,null,null,null,null,[\"browsing-topics\"]]]]]]]]],[1000,[[31078665,null,[2,[[4,null,8,null,null,null,null,[\"navigator.runAdAuction\"]],[4,null,70,null,null,null,null,[\"run-ad-auction\"]],[4,null,70,null,null,null,null,[\"join-ad-interest-group\"]]]]]]],[1000,[[31078666,null,[2,[[4,null,69,null,null,null,null,[\"join-ad-interest-group\"]],[1,[[4,null,70,null,null,null,null,[\"join-ad-interest-group\"]]]]]]]]],[1000,[[31078667,null,[2,[[4,null,69,null,null,null,null,[\"run-ad-auction\"]],[1,[[4,null,70,null,null,null,null,[\"run-ad-auction\"]]]]]]]]],[1000,[[31078668,null,[4,null,70,null,null,null,null,[\"attribution-reporting\"]]]]],[1000,[[31078669,null,[2,[[4,null,69,null,null,null,null,[\"attribution-reporting\"]],[1,[[4,null,70,null,null,null,null,[\"attribution-reporting\"]]]]]]]]],[1000,[[31078670,null,[4,null,70,null,null,null,null,[\"shared-storage\"]]]]],[1000,[[31078671,null,[2,[[4,null,69,null,null,null,null,[\"shared-storage\"]],[1,[[4,null,70,null,null,null,null,[\"shared-storage\"]]]]]]]]]]],[10,[[50,[[31067422],[31067423,[[null,1032,null,[]]]],[44776369],[44792510],[44804781],[44806359]],[3,[[4,null,8,null,null,null,null,[\"gmaSdk.getQueryInfo\"]],[4,null,8,null,null,null,null,[\"webkit.messageHandlers.getGmaQueryInfo.postMessage\"]],[4,null,8,null,null,null,null,[\"webkit.messageHandlers.getGmaSig.postMessage\"]]]],69],[null,[[31078995],[31078996,[[45459826,null,null,[1]],[531007060,null,null,[1]],[45430975,null,null,[1]],[531582260,null,null,[1]]]]]],[50,[[31079265],[31079266,[[573506525,null,null,[]]]]]],[50,[[31079437],[31079438,[[573506524,null,null,[]]]]]],[50,[[31079714],[31079715,[[1275,null,null,[1]]]]]],[50,[[31079758],[31079759,[[1298,null,null,[]],[1292,null,null,[]]]]]],[100,[[31079863],[31079864,[[1308,null,null,[1]]]]]],[100,[[31079865],[31079866,[[45460956,null,null,[]]]]]],[100,[[31079919],[31079920,[[571859167,null,null,[1]]]]]],[100,[[31079921],[31079922,[[572636914,null,null,[1]]]]]],[100,[[31079923],[31079924,[[581290376,null,null,[1]]]]]],[100,[[31079928],[31079929,[[577647450,null,null,[1]]]]]],[100,[[31079930],[31079931,[[583098152,null,null,[1]]]]]],[10,[[31079964],[31079965]]],[100,[[31079979],[31079980,[[586386407,null,null,[1]]]]]],[1000,[[31079987,[[null,null,14,[null,null,\"31079987\"]]],[6,null,null,null,6,null,\"31079987\"]]],[4,null,55],63,null,null,null,null,null,null,null,null,2],[1000,[[31079988,[[null,null,14,[null,null,\"31079988\"]]],[6,null,null,null,6,null,\"31079988\"]]],[4,null,55],63,null,null,null,null,null,null,null,null,2],[1000,[[31080036,[[null,null,14,[null,null,\"31080036\"]]],[6,null,null,null,6,null,\"31080036\"]]],[4,null,55],63,null,null,null,null,null,null,null,null,2],[1000,[[31080037,[[null,null,14,[null,null,\"31080037\"]]],[6,null,null,null,6,null,\"31080037\"]]],[4,null,55],63,null,null,null,null,null,null,null,null,2],[1000,[[31080064,[[null,null,14,[null,null,\"31080064\"]]],[6,null,null,null,6,null,\"31080064\"]]],[4,null,55],63,null,null,null,null,null,null,null,null,2],[1000,[[31080065,[[null,null,14,[null,null,\"31080065\"]]],[6,null,null,null,6,null,\"31080065\"]]],[4,null,55],63,null,null,null,null,null,null,null,null,2],[10,[[31080103],[31080104,[[577127756,null,null,[1]]]]]],[1,[[42531513],[42531514,[[316,null,null,[1]]]]]],[1,[[42531644],[42531645,[[368,null,null,[1]]]],[42531646,[[369,null,null,[1]],[368,null,null,[1]]]]]],[50,[[42531705],[42531706]]],[1,[[42532242],[42532243,[[1256,null,null,[1]],[290,null,null,[1]]]]]],[1,[[42532262],[42532263,[[null,1263,null,[null,16]]]],[42532264,[[null,1263,null,[null,4294967296]]]],[42532265,[[null,1265,null,[null,60]],[null,1264,null,[null,0.2]],[1266,null,null,[1]]]],[42532266,[[null,1263,null,[null,4294967296]],[null,1265,null,[null,60]],[null,1264,null,[null,0.2]],[1266,null,null,[1]]]],[42532267,[[null,1263,null,[null,16]],[null,1265,null,[null,60]],[null,1264,null,[null,0.2]],[1266,null,null,[1]]]],[42532268,[[1266,null,null,[1]]]]]],[1,[[42532360],[42532361,[[1260,null,null,[1]],[1291,null,null,[1]]]]],null,90],[1,[[42532362],[42532363]]],[50,[[42532523],[42532524,[[1300,null,null,[]]]]]],[null,[[42532525],[42532526]]],[10,[[42532598],[42532599,[[1271,null,null,[1]]]],[42532600,[[1272,null,null,[1]]]],[42532601,[[1271,null,null,[1]],[1272,null,null,[1]]]]]],[1,[[44719338],[44719339,[[334,null,null,[1]],[null,54,null,[null,100]],[null,66,null,[null,10]],[null,65,null,[null,1000]]]]]],[10,[[44776368],[44779257]],[3,[[4,null,8,null,null,null,null,[\"gmaSdk.getQueryInfo\"]],[4,null,8,null,null,null,null,[\"webkit.messageHandlers.getGmaQueryInfo.postMessage\"]],[4,null,8,null,null,null,null,[\"webkit.messageHandlers.getGmaSig.postMessage\"]]]],69],[10,[[44785292],[44785293,[[1239,null,null,[1]]]]]],[10,[[44785294],[44785295]]],[1,[[44795552],[44795553,[[1260,null,null,[1]]]]],null,90],[1,[[44795554],[44795555]]],[100,[[44795921],[44795922,[[1222,null,null,[1]]]],[44798934,[[1222,null,null,[1]]]]]],[10,[[44800658],[44800659,[[1185,null,null,[1]]]]],null,76],[1,[[44801778],[44801779,[[506914611,null,null,[1]]]]],[4,null,55]],[1000,[[44802674,[[506852289,null,null,[1]]],[12,null,null,null,2,null,\"smitmehta\\\\.com\/\"]]],[4,null,55]],[50,[[44807405],[44807406,[[570863962,null,null,[]]]]],null,102],[50,[[44807749],[44807751,[[1185,null,null,[1]]]]],null,76],[10,[[44807750],[44807752,[[1185,null,null,[1]]]]],null,76],[50,[[44807753],[44807754,[[1185,null,null,[1]]]]],null,76],[50,[[44809003,[[1289,null,null,[1]]]],[44809004,[[1289,null,null,[1]],[null,null,1307,[null,null,\"inhead\"]]]],[44809005,[[1289,null,null,[1]],[null,null,1307,[null,null,\"nohtml\"]]]]]],[10,[[44809530],[44809531,[[1302,null,null,[1]]]]]],[10,[[95320376,[[1309,null,null,[1]]]],[95320377,[[null,null,null,[null,null,null,[\"en\",\"de\",\"fr\"]],null,1273],[1309,null,null,[1]]]],[95320378,[[null,null,null,[null,null,null,[\"en\",\"de\",\"ja\"]],null,1273],[1309,null,null,[1]]]]],null,75],[10,[[95320379],[95320380]],null,75],[10,[[95320381],[95320382]],null,75]]],[11,[[1000,[[31079716,null,[4,null,6,null,null,null,null,[\"31079714\"]]]],[4,null,8,null,null,null,null,[\"__gpp\"]],88,null,null,null,null,null,null,null,null,9],[1000,[[31079717,null,[4,null,6,null,null,null,null,[\"31079715\"]]]],[4,null,8,null,null,null,null,[\"__gpp\"]],88,null,null,null,null,null,null,null,null,9],[1000,[[44807497,null,[4,null,6,null,null,null,null,[\"44807405\"]]]],[4,null,8,null,null,null,null,[\"navigator.cookieDeprecationLabel\"]],103,null,null,null,null,null,null,null,null,16],[1000,[[44807498,null,[4,null,6,null,null,null,null,[\"44807406\"]]]],[4,null,8,null,null,null,null,[\"navigator.cookieDeprecationLabel\"]],103,null,null,null,null,null,null,null,null,16]]],[17,[[1,[[44797663,[[null,506871937,null,[null,44797663]],[1120,null,null,[1]]]],[44797664,[[null,506871937,null,[null,44797664]],[160889229,null,null,[1]],[1120,null,null,[1]]]]],[4,null,55],null,null,null,null,300,null,123],[95,[[44806139,[[null,506871937,null,[null,44806139]]]],[44806140,[[566279275,null,null,[1]],[566279276,null,null,[1]],[null,506871937,null,[null,44806140]],[1120,null,null,[1]]]],[44806141,[[null,506871937,null,[null,44806141]],[1120,null,null,[1]]]]],[4,null,55],null,null,null,null,610,null,123],[1,[[44806145,[[null,506871937,null,[null,44806145]],[1120,null,null,[1]]]],[44806146,[[566279275,null,null,[1]],[null,506871937,null,[null,44806146]],[1120,null,null,[1]]]],[44806147,[[566279276,null,null,[1]],[null,506871937,null,[null,44806147]],[1120,null,null,[1]]]]],[4,null,55],null,null,null,null,910,null,123],[500,[[95320229],[95320230,[[583331697,null,null,[1]]]]],[4,null,55],null,null,null,null,null,null,130],[10,[[95320854],[95320855,[[null,579884443,null,[null,0.8]],[null,null,null,[null,null,null,[\"1\",\"2\",\"3\",\"4\",\"6\"]],null,556791602],[579884441,null,null,[1]],[null,579884442,null,[null,0.8]]]],[95320856,[[null,579884443,null,[null,0.7]],[null,null,null,[null,null,null,[\"1\",\"2\",\"3\",\"4\",\"6\"]],null,556791602],[579884441,null,null,[1]],[null,579884442,null,[null,0.7]]]],[95320857,[[null,579884443,null,[null,0.6]],[null,null,null,[null,null,null,[\"1\",\"2\",\"3\",\"4\",\"6\"]],null,556791602],[579884441,null,null,[1]],[null,579884442,null,[null,0.6]]]],[95320858,[[null,579884443,null,[null,0.5]],[null,null,null,[null,null,null,[\"1\",\"2\",\"3\",\"4\",\"6\"]],null,556791602],[579884441,null,null,[1]],[null,579884442,null,[null,0.5]]]],[95320859,[[null,579884443,null,[null,1]],[null,null,null,[null,null,null,[\"1\",\"2\",\"3\",\"4\",\"6\"]],null,556791602],[579884441,null,null,[1]],[null,579884442,null,[null,0.8]]]],[95320860,[[null,579884443,null,[null,1]],[null,null,null,[null,null,null,[\"1\",\"2\",\"3\",\"4\",\"6\"]],null,556791602],[579884441,null,null,[1]],[null,579884442,null,[null,0.5]]]]],[4,null,55],null,null,null,null,null,null,132]]]],null,null,[null,1000,1,1000]],[1,[null,[],[]],null,null,null,null,null,null,\"ca-pub-4004929109745703\"],null,\"31080037\",1,\"www.anjoovi.com\",507635958,[44759876,44759927,44759837]]");
