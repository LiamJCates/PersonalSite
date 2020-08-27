/* Welcome Section Name Gradient */
var colors = new Array(
    [28, 216, 210], [147, 237, 199],

    [237, 66, 100], [255, 237, 188],

    [220, 36, 36], [74, 86, 157],

    [252, 53, 76], [10, 191, 188],

    [248, 87, 166], [255, 88, 88],

    [229, 93, 135], [95, 195, 228]
);

var step = 0;

var colorIndices = [0, 1, 2, 3];

var gradientSpeed = 0.01;

function updateGradient() {
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "#" + ((r1 << 16) | (g1 << 8) | b1).toString(16);

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "#" + ((r2 << 16) | (g2 << 8) | b2).toString(16);

    $('.first').css({
        background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
    }).css({
        background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
    }).css({
        '-webkit-text-fill-color': 'transparent',
        '-webkit-background-clip': 'text'
    });

    step += gradientSpeed;
    if (step >= 1) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

    }
}

setInterval(updateGradient, 10);



/* Welcome Section Message Roll */

var Messenger = function(el) {
    'use strict';
    var m = this;

    m.init = function() {
        m.codeletters = "&#*+%?£@§$";
        m.message = 0;
        m.current_length = 0;
        m.fadeBuffer = false;
        m.messages = [
            'Using machines to help people',
            'Software Engineer',
            'Security Enthusiast',
            'Cybercitizen'
        ];

        setTimeout(m.animateIn, 100);
    };

    m.generateRandomString = function(length) {
        var random_text = '';
        while (random_text.length < length) {
            random_text += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length));
        }

        return random_text;
    };

    m.animateIn = function() {
        if (m.current_length < m.messages[m.message].length) {
            m.current_length = m.current_length + 2;
            if (m.current_length > m.messages[m.message].length) {
                m.current_length = m.messages[m.message].length;
            }

            var message = m.generateRandomString(m.current_length);
            $(el).html(message);

            setTimeout(m.animateIn, 20);
        } else {
            setTimeout(m.animateFadeBuffer, 20);
        }
    };

    m.animateFadeBuffer = function() {
        if (m.fadeBuffer === false) {
            m.fadeBuffer = [];
            for (var i = 0; i < m.messages[m.message].length; i++) {
                m.fadeBuffer.push({
                    c: (Math.floor(Math.random() * 12)) + 1,
                    l: m.messages[m.message].charAt(i)
                });
            }
        }

        var do_cycles = false;
        var message = '';

        for (var i = 0; i < m.fadeBuffer.length; i++) {
            var fader = m.fadeBuffer[i];
            if (fader.c > 0) {
                do_cycles = true;
                fader.c--;
                message += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length));
            } else {
                message += fader.l;
            }
        }

        $(el).html(message);

        if (do_cycles === true) {
            setTimeout(m.animateFadeBuffer, 50);
        } else {
            setTimeout(m.cycleText, 2000);
        }
    };

    m.cycleText = function() {
        m.message = m.message + 1;
        if (m.message >= m.messages.length) {
            m.message = 0;
        }

        m.current_length = 0;
        m.fadeBuffer = false;
        $(el).html('');

        setTimeout(m.animateIn, 200);
    };

    m.init();
}
var messenger = new Messenger(document.getElementById("messenger"));



/*  Welcome Section Interactive Background Grid
    three.js - https://github.com/mrdoob/three.js
*/
'use strict';
var THREE = THREE || {REVISION: "56"};

THREE.extend = function(a, b) {
    if (Object.keys)
        for (var c = Object.keys(b), d = 0, e = c.length; d < e; d++) {
            var f = c[d];
            Object.defineProperty(a, f, Object.getOwnPropertyDescriptor(b, f))
        } else
            for (f in c = {}.hasOwnProperty, b) c.call(b, f) && (a[f] = b[f]);
    return a
};

THREE.FrontSide = 0;
THREE.BackSide = 1;
THREE.DoubleSide = 2;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.FaceColors = 1;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.AddEquation = 100;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.RepeatWrapping = 1E3;
THREE.ClampToEdgeWrapping = 1001;
THREE.LinearFilter = 1006;
THREE.LinearMipMapLinearFilter = 1008;
THREE.UnsignedByteType = 1009;
THREE.ByteType = 1010;
THREE.RGBAFormat = 1021;

/* Required Dependency */
THREE.Color = function(a) {
    void 0 !== a && this.set(a);
    return this
};
THREE.extend(THREE.Color.prototype, {
    r: 1,
    g: 1,
    b: 1,
    set: function(a) {
        switch (typeof a) {
            case "number":
                this.setHex(a);
                break;
            case "string":
                this.setStyle(a)
        }
    },
    setHex: function(a) {
        a = Math.floor(a);
        this.r = (a >> 16 & 255) / 255;
        this.g = (a >> 8 & 255) / 255;
        this.b = (a & 255) / 255;
        return this
    },
    setRGB: function(a, b, c) {
        this.r = a;
        this.g = b;
        this.b = c;
        return this
    },
    setHSV: function(a, b, c) {
        console.log("DEPRECATED: Color's .setHSV() will be removed. Use .setHSL( h, s, l ) instead.");
        return this.setHSL(a, b * c / (1 > (a = (2 - b) * c) ? a : 2 - a), a / 2)
    },
    setHSL: function(a,
        b, c) {
        if (0 === b) this.r = this.g = this.b = c;
        else {
            var d = function(a, b, c) {
                    0 > c && (c += 1);
                    1 < c && (c -= 1);
                    return c < 1 / 6 ? a + 6 * (b - a) * c : 0.5 > c ? b : c < 2 / 3 ? a + 6 * (b - a) * (2 / 3 - c) : a
                },
                b = 0.5 >= c ? c * (1 + b) : c + b - c * b,
                c = 2 * c - b;
            this.r = d(c, b, a + 1 / 3);
            this.g = d(c, b, a);
            this.b = d(c, b, a - 1 / 3)
        }
        return this
    },
    setStyle: function(a) {
        if (/^rgb\((\d+),(\d+),(\d+)\)$/i.test(a)) return a = /^rgb\((\d+),(\d+),(\d+)\)$/i.exec(a), this.r = Math.min(255, parseInt(a[1], 10)) / 255, this.g = Math.min(255, parseInt(a[2], 10)) / 255, this.b = Math.min(255, parseInt(a[3], 10)) / 255, this;
        if (/^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.test(a)) return a =
            /^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.exec(a), this.r = Math.min(100, parseInt(a[1], 10)) / 100, this.g = Math.min(100, parseInt(a[2], 10)) / 100, this.b = Math.min(100, parseInt(a[3], 10)) / 100, this;
        if (/^\#([0-9a-f]{6})$/i.test(a)) return a = /^\#([0-9a-f]{6})$/i.exec(a), this.setHex(parseInt(a[1], 16)), this;
        if (/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(a)) return a = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a), this.setHex(parseInt(a[1] + a[1] + a[2] + a[2] + a[3] + a[3], 16)), this;
        if (/^(\w+)$/i.test(a)) return this.setHex(THREE.ColorKeywords[a]),
            this
    },
    copy: function(a) {
        this.r = a.r;
        this.g = a.g;
        this.b = a.b;
        return this
    },
    copyGammaToLinear: function(a) {
        this.r = a.r * a.r;
        this.g = a.g * a.g;
        this.b = a.b * a.b;
        return this
    },
    copyLinearToGamma: function(a) {
        this.r = Math.sqrt(a.r);
        this.g = Math.sqrt(a.g);
        this.b = Math.sqrt(a.b);
        return this
    },
    convertGammaToLinear: function() {
        var a = this.r,
            b = this.g,
            c = this.b;
        this.r = a * a;
        this.g = b * b;
        this.b = c * c;
        return this
    },
    convertLinearToGamma: function() {
        this.r = Math.sqrt(this.r);
        this.g = Math.sqrt(this.g);
        this.b = Math.sqrt(this.b);
        return this
    },
    getHex: function() {
        return 255 *
            this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
    },
    getHexString: function() {
        return ("000000" + this.getHex().toString(16)).slice(-6)
    },
    getHSL: function() {
        var a = {
            h: 0,
            s: 0,
            l: 0
        };
        return function() {
            var b = this.r,
                c = this.g,
                d = this.b,
                e = Math.max(b, c, d),
                f = Math.min(b, c, d),
                g, h = (f + e) / 2;
            if (f === e) f = g = 0;
            else {
                var i = e - f,
                    f = 0.5 >= h ? i / (e + f) : i / (2 - e - f);
                switch (e) {
                    case b:
                        g = (c - d) / i + (c < d ? 6 : 0);
                        break;
                    case c:
                        g = (d - b) / i + 2;
                        break;
                    case d:
                        g = (b - c) / i + 4
                }
                g /= 6
            }
            a.h = g;
            a.s = f;
            a.l = h;
            return a
        }
    }(),
    getStyle: function() {
        return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) +
            "," + (255 * this.b | 0) + ")"
    },
    offsetHSL: function(a, b, c) {
        var d = this.getHSL();
        d.h += a;
        d.s += b;
        d.l += c;
        this.setHSL(d.h, d.s, d.l);
        return this
    },
    add: function(a) {
        this.r += a.r;
        this.g += a.g;
        this.b += a.b;
        return this
    },
    addColors: function(a, b) {
        this.r = a.r + b.r;
        this.g = a.g + b.g;
        this.b = a.b + b.b;
        return this
    },
    addScalar: function(a) {
        this.r += a;
        this.g += a;
        this.b += a;
        return this
    },
    multiply: function(a) {
        this.r *= a.r;
        this.g *= a.g;
        this.b *= a.b;
        return this
    },
    multiplyScalar: function(a) {
        this.r *= a;
        this.g *= a;
        this.b *= a;
        return this
    },
    lerp: function(a, b) {
        this.r +=
            (a.r - this.r) * b;
        this.g += (a.g - this.g) * b;
        this.b += (a.b - this.b) * b;
        return this
    },
    clone: function() {
        return (new THREE.Color).setRGB(this.r, this.g, this.b)
    }
});
THREE.ColorKeywords = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
};

/* Required Dependency */
THREE.Quaternion = function(a, b, c, d) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0;
    this.w = void 0 !== d ? d : 1
};
THREE.extend(THREE.Quaternion.prototype, {
    set: function(a, b, c, d) {
        this.x = a;
        this.y = b;
        this.z = c;
        this.w = d;
        return this
    },
    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = a.w;
        return this
    },
    setFromEuler: function(a, b) {
        var c = Math.cos(a.x / 2),
            d = Math.cos(a.y / 2),
            e = Math.cos(a.z / 2),
            f = Math.sin(a.x / 2),
            g = Math.sin(a.y / 2),
            h = Math.sin(a.z / 2);
        void 0 === b || "XYZ" === b ? (this.x = f * d * e + c * g * h, this.y = c * g * e - f * d * h, this.z = c * d * h + f * g * e, this.w = c * d * e - f * g * h) : "YXZ" === b ? (this.x = f * d * e + c * g * h, this.y = c * g * e - f * d * h, this.z = c * d * h - f * g * e, this.w = c *
            d * e + f * g * h) : "ZXY" === b ? (this.x = f * d * e - c * g * h, this.y = c * g * e + f * d * h, this.z = c * d * h + f * g * e, this.w = c * d * e - f * g * h) : "ZYX" === b ? (this.x = f * d * e - c * g * h, this.y = c * g * e + f * d * h, this.z = c * d * h - f * g * e, this.w = c * d * e + f * g * h) : "YZX" === b ? (this.x = f * d * e + c * g * h, this.y = c * g * e + f * d * h, this.z = c * d * h - f * g * e, this.w = c * d * e - f * g * h) : "XZY" === b && (this.x = f * d * e - c * g * h, this.y = c * g * e - f * d * h, this.z = c * d * h + f * g * e, this.w = c * d * e + f * g * h);
        return this
    },
    setFromAxisAngle: function(a, b) {
        var c = b / 2,
            d = Math.sin(c);
        this.x = a.x * d;
        this.y = a.y * d;
        this.z = a.z * d;
        this.w = Math.cos(c);
        return this
    },
    setFromRotationMatrix: function(a) {
        var b = a.elements,
            c = b[0],
            a = b[4],
            d = b[8],
            e = b[1],
            f = b[5],
            g = b[9],
            h = b[2],
            i = b[6],
            b = b[10],
            k = c + f + b;
        0 < k ? (c = 0.5 / Math.sqrt(k + 1), this.w = 0.25 / c, this.x = (i - g) * c, this.y = (d - h) * c, this.z = (e - a) * c) : c > f && c > b ? (c = 2 * Math.sqrt(1 + c - f - b), this.w = (i - g) / c, this.x = 0.25 * c, this.y = (a + e) / c, this.z = (d + h) / c) : f > b ? (c = 2 * Math.sqrt(1 + f - c - b), this.w = (d - h) / c, this.x = (a + e) / c, this.y = 0.25 * c, this.z = (g + i) / c) : (c = 2 * Math.sqrt(1 + b - c - f), this.w = (e - a) / c, this.x = (d + h) / c, this.y = (g + i) / c, this.z = 0.25 * c);
        return this
    },
    inverse: function() {
        this.conjugate().normalize();
        return this
    },
    conjugate: function() {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return this
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    },
    normalize: function() {
        var a = this.length();
        0 === a ? (this.z = this.y = this.x = 0, this.w = 1) : (a = 1 / a, this.x *= a, this.y *= a, this.z *= a, this.w *= a);
        return this
    },
    multiply: function(a, b) {
        return void 0 !== b ? (console.warn("DEPRECATED: Quaternion's .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),
            this.multiplyQuaternions(a, b)) : this.multiplyQuaternions(this, a)
    },
    multiplyQuaternions: function(a, b) {
        var c = a.x,
            d = a.y,
            e = a.z,
            f = a.w,
            g = b.x,
            h = b.y,
            i = b.z,
            k = b.w;
        this.x = c * k + f * g + d * i - e * h;
        this.y = d * k + f * h + e * g - c * i;
        this.z = e * k + f * i + c * h - d * g;
        this.w = f * k - c * g - d * h - e * i;
        return this
    },
    multiplyVector3: function(a) {
        console.warn("DEPRECATED: Quaternion's .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.");
        return a.applyQuaternion(this)
    },
    slerp: function(a, b) {
        var c = this.x,
            d = this.y,
            e = this.z,
            f = this.w,
            g = f * a.w + c * a.x + d * a.y + e * a.z;
        0 > g ? (this.w = -a.w, this.x = -a.x, this.y = -a.y, this.z = -a.z, g = -g) : this.copy(a);
        if (1 <= g) return this.w = f, this.x = c, this.y = d, this.z = e, this;
        var h = Math.acos(g),
            i = Math.sqrt(1 - g * g);
        if (0.001 > Math.abs(i)) return this.w = 0.5 * (f + this.w), this.x = 0.5 * (c + this.x), this.y = 0.5 * (d + this.y), this.z = 0.5 * (e + this.z), this;
        g = Math.sin((1 - b) * h) / i;
        h = Math.sin(b * h) / i;
        this.w = f * g + this.w * h;
        this.x = c * g + this.x * h;
        this.y = d * g + this.y * h;
        this.z = e * g + this.z * h;
        return this
    },
    equals: function(a) {
        return a.x === this.x && a.y ===
            this.y && a.z === this.z && a.w === this.w
    },
    clone: function() {
        return new THREE.Quaternion(this.x, this.y, this.z, this.w)
    }
});
THREE.Quaternion.slerp = function(a, b, c, d) {
    return c.copy(a).slerp(b, d)
};

/* Required Dependency */
THREE.Vector2 = function(a, b) {
    this.x = a || 0;
    this.y = b || 0
};
THREE.extend(THREE.Vector2.prototype, {
    set: function(a, b) {
        this.x = a;
        this.y = b;
        return this
    },
    setX: function(a) {
        this.x = a;
        return this
    },
    setY: function(a) {
        this.y = a;
        return this
    },
    setComponent: function(a, b) {
        switch (a) {
            case 0:
                this.x = b;
                break;
            case 1:
                this.y = b;
                break;
            default:
                throw Error("index is out of range: " + a);
        }
    },
    getComponent: function(a) {
        switch (a) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            default:
                throw Error("index is out of range: " + a);
        }
    },
    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        return this
    },
    add: function(a, b) {
        if (void 0 !==
            b) return console.warn("DEPRECATED: Vector2's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b);
        this.x += a.x;
        this.y += a.y;
        return this
    },
    addVectors: function(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this
    },
    addScalar: function(a) {
        this.x += a;
        this.y += a;
        return this
    },
    sub: function(a, b) {
        if (void 0 !== b) return console.warn("DEPRECATED: Vector2's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(a, b);
        this.x -= a.x;
        this.y -= a.y;
        return this
    },
    subVectors: function(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this
    },
    multiplyScalar: function(a) {
        this.x *= a;
        this.y *= a;
        return this
    },
    divideScalar: function(a) {
        0 !== a ? (this.x /= a, this.y /= a) : this.set(0, 0);
        return this
    },
    min: function(a) {
        this.x > a.x && (this.x = a.x);
        this.y > a.y && (this.y = a.y);
        return this
    },
    max: function(a) {
        this.x < a.x && (this.x = a.x);
        this.y < a.y && (this.y = a.y);
        return this
    },
    clamp: function(a, b) {
        this.x < a.x ? this.x = a.x : this.x > b.x && (this.x = b.x);
        this.y < a.y ? this.y = a.y : this.y > b.y && (this.y = b.y);
        return this
    },
    negate: function() {
        return this.multiplyScalar(-1)
    },
    dot: function(a) {
        return this.x * a.x + this.y * a.y
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    distanceTo: function(a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function(a) {
        var b = this.x - a.x,
            a = this.y - a.y;
        return b * b + a * a
    },
    setLength: function(a) {
        var b = this.length();
        0 !== b && a !== b && this.multiplyScalar(a / b);
        return this
    },
    lerp: function(a, b) {
        this.x += (a.x - this.x) *
            b;
        this.y += (a.y - this.y) * b;
        return this
    },
    equals: function(a) {
        return a.x === this.x && a.y === this.y
    },
    toArray: function() {
        return [this.x, this.y]
    },
    clone: function() {
        return new THREE.Vector2(this.x, this.y)
    }
});

/* Required Dependency */
THREE.Vector3 = function(a, b, c) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0
};
THREE.extend(THREE.Vector3.prototype, {
    set: function(a, b, c) {
        this.x = a;
        this.y = b;
        this.z = c;
        return this
    },
    setX: function(a) {
        this.x = a;
        return this
    },
    setY: function(a) {
        this.y = a;
        return this
    },
    setZ: function(a) {
        this.z = a;
        return this
    },
    setComponent: function(a, b) {
        switch (a) {
            case 0:
                this.x = b;
                break;
            case 1:
                this.y = b;
                break;
            case 2:
                this.z = b;
                break;
            default:
                throw Error("index is out of range: " + a);
        }
    },
    getComponent: function(a) {
        switch (a) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            default:
                throw Error("index is out of range: " +
                    a);
        }
    },
    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        return this
    },
    add: function(a, b) {
        if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b);
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        return this
    },
    addScalar: function(a) {
        this.x += a;
        this.y += a;
        this.z += a;
        return this
    },
    addVectors: function(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this
    },
    sub: function(a, b) {
        if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
            this.subVectors(a, b);
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        return this
    },
    subVectors: function(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this
    },
    multiply: function(a, b) {
        if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(a, b);
        this.x *= a.x;
        this.y *= a.y;
        this.z *= a.z;
        return this
    },
    multiplyScalar: function(a) {
        this.x *= a;
        this.y *= a;
        this.z *= a;
        return this
    },
    multiplyVectors: function(a, b) {
        this.x = a.x *
            b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this
    },
    applyMatrix3: function(a) {
        var b = this.x,
            c = this.y,
            d = this.z,
            a = a.elements;
        this.x = a[0] * b + a[3] * c + a[6] * d;
        this.y = a[1] * b + a[4] * c + a[7] * d;
        this.z = a[2] * b + a[5] * c + a[8] * d;
        return this
    },
    applyMatrix4: function(a) {
        var b = this.x,
            c = this.y,
            d = this.z,
            a = a.elements;
        this.x = a[0] * b + a[4] * c + a[8] * d + a[12];
        this.y = a[1] * b + a[5] * c + a[9] * d + a[13];
        this.z = a[2] * b + a[6] * c + a[10] * d + a[14];
        return this
    },
    applyProjection: function(a) {
        var b = this.x,
            c = this.y,
            d = this.z,
            a = a.elements,
            e = 1 / (a[3] * b + a[7] * c + a[11] * d + a[15]);
        this.x = (a[0] * b + a[4] * c + a[8] * d + a[12]) * e;
        this.y = (a[1] * b + a[5] * c + a[9] * d + a[13]) * e;
        this.z = (a[2] * b + a[6] * c + a[10] * d + a[14]) * e;
        return this
    },
    applyQuaternion: function(a) {
        var b = this.x,
            c = this.y,
            d = this.z,
            e = a.x,
            f = a.y,
            g = a.z,
            a = a.w,
            h = a * b + f * d - g * c,
            i = a * c + g * b - e * d,
            k = a * d + e * c - f * b,
            b = -e * b - f * c - g * d;
        this.x = h * a + b * -e + i * -g - k * -f;
        this.y = i * a + b * -f + k * -e - h * -g;
        this.z = k * a + b * -g + h * -f - i * -e;
        return this
    },
    applyEuler: function() {
        var a = new THREE.Quaternion;
        return function(b, c) {
            var d = a.setFromEuler(b, c);
            this.applyQuaternion(d);
            return this
        }
    }(),
    applyAxisAngle: function() {
        var a =
            new THREE.Quaternion;
        return function(b, c) {
            var d = a.setFromAxisAngle(b, c);
            this.applyQuaternion(d);
            return this
        }
    }(),
    transformDirection: function(a) {
        var b = this.x,
            c = this.y,
            d = this.z,
            a = a.elements;
        this.x = a[0] * b + a[4] * c + a[8] * d;
        this.y = a[1] * b + a[5] * c + a[9] * d;
        this.z = a[2] * b + a[6] * c + a[10] * d;
        this.normalize();
        return this
    },
    divide: function(a) {
        this.x /= a.x;
        this.y /= a.y;
        this.z /= a.z;
        return this
    },
    divideScalar: function(a) {
        0 !== a ? (this.x /= a, this.y /= a, this.z /= a) : this.z = this.y = this.x = 0;
        return this
    },
    min: function(a) {
        this.x > a.x && (this.x =
            a.x);
        this.y > a.y && (this.y = a.y);
        this.z > a.z && (this.z = a.z);
        return this
    },
    max: function(a) {
        this.x < a.x && (this.x = a.x);
        this.y < a.y && (this.y = a.y);
        this.z < a.z && (this.z = a.z);
        return this
    },
    clamp: function(a, b) {
        this.x < a.x ? this.x = a.x : this.x > b.x && (this.x = b.x);
        this.y < a.y ? this.y = a.y : this.y > b.y && (this.y = b.y);
        this.z < a.z ? this.z = a.z : this.z > b.z && (this.z = b.z);
        return this
    },
    negate: function() {
        return this.multiplyScalar(-1)
    },
    dot: function(a) {
        return this.x * a.x + this.y * a.y + this.z * a.z
    },
    lengthSq: function() {
        return this.x * this.x + this.y *
            this.y + this.z * this.z
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    },
    lengthManhattan: function() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(a) {
        var b = this.length();
        0 !== b && a !== b && this.multiplyScalar(a / b);
        return this
    },
    lerp: function(a, b) {
        this.x += (a.x - this.x) * b;
        this.y += (a.y - this.y) * b;
        this.z += (a.z - this.z) * b;
        return this
    },
    cross: function(a, b) {
        if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),
            this.crossVectors(a, b);
        var c = this.x,
            d = this.y,
            e = this.z;
        this.x = d * a.z - e * a.y;
        this.y = e * a.x - c * a.z;
        this.z = c * a.y - d * a.x;
        return this
    },
    crossVectors: function(a, b) {
        this.x = a.y * b.z - a.z * b.y;
        this.y = a.z * b.x - a.x * b.z;
        this.z = a.x * b.y - a.y * b.x;
        return this
    },
    projectOnVector: function() {
        var a = new THREE.Vector3;
        return function(b) {
            a.copy(b).normalize();
            b = this.dot(a);
            return this.copy(a).multiplyScalar(b)
        }
    }(),
    projectOnPlane: function() {
        var a = new THREE.Vector3;
        return function(b) {
            a.copy(this).projectOnVector(b);
            return this.sub(a)
        }
    }(),
    reflect: function() {
        var a = new THREE.Vector3;
        return function(b) {
            a.copy(this).projectOnVector(b).multiplyScalar(2);
            return this.subVectors(a, this)
        }
    }(),
    angleTo: function(a) {
        a = this.dot(a) / (this.length() * a.length());
        return Math.acos(THREE.Math.clamp(a, -1, 1))
    },
    distanceTo: function(a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function(a) {
        var b = this.x - a.x,
            c = this.y - a.y,
            a = this.z - a.z;
        return b * b + c * c + a * a
    },
    getPositionFromMatrix: function(a) {
        this.x = a.elements[12];
        this.y = a.elements[13];
        this.z = a.elements[14];
        return this
    },
    setEulerFromRotationMatrix: function(a, b) {
        function c(a) {
            return Math.min(Math.max(a, -1), 1)
        }
        var d = a.elements,
            e = d[0],
            f = d[4],
            g = d[8],
            h = d[1],
            i = d[5],
            k = d[9],
            l = d[2],
            m = d[6],
            d = d[10];
        void 0 === b || "XYZ" === b ? (this.y = Math.asin(c(g)), 0.99999 > Math.abs(g) ? (this.x = Math.atan2(-k, d), this.z = Math.atan2(-f, e)) : (this.x = Math.atan2(m, i), this.z = 0)) : "YXZ" === b ? (this.x = Math.asin(-c(k)), 0.99999 > Math.abs(k) ? (this.y = Math.atan2(g, d), this.z = Math.atan2(h, i)) : (this.y = Math.atan2(-l, e), this.z = 0)) : "ZXY" === b ? (this.x = Math.asin(c(m)),
            0.99999 > Math.abs(m) ? (this.y = Math.atan2(-l, d), this.z = Math.atan2(-f, i)) : (this.y = 0, this.z = Math.atan2(h, e))) : "ZYX" === b ? (this.y = Math.asin(-c(l)), 0.99999 > Math.abs(l) ? (this.x = Math.atan2(m, d), this.z = Math.atan2(h, e)) : (this.x = 0, this.z = Math.atan2(-f, i))) : "YZX" === b ? (this.z = Math.asin(c(h)), 0.99999 > Math.abs(h) ? (this.x = Math.atan2(-k, i), this.y = Math.atan2(-l, e)) : (this.x = 0, this.y = Math.atan2(g, d))) : "XZY" === b && (this.z = Math.asin(-c(f)), 0.99999 > Math.abs(f) ? (this.x = Math.atan2(m, i), this.y = Math.atan2(g, e)) : (this.x = Math.atan2(-k,
            d), this.y = 0));
        return this
    },
    setEulerFromQuaternion: function(a, b) {
        function c(a) {
            return Math.min(Math.max(a, -1), 1)
        }
        var d = a.x * a.x,
            e = a.y * a.y,
            f = a.z * a.z,
            g = a.w * a.w;
        void 0 === b || "XYZ" === b ? (this.x = Math.atan2(2 * (a.x * a.w - a.y * a.z), g - d - e + f), this.y = Math.asin(c(2 * (a.x * a.z + a.y * a.w))), this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g + d - e - f)) : "YXZ" === b ? (this.x = Math.asin(c(2 * (a.x * a.w - a.y * a.z))), this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g - d - e + f), this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g - d + e - f)) : "ZXY" === b ? (this.x = Math.asin(c(2 * (a.x * a.w +
            a.y * a.z))), this.y = Math.atan2(2 * (a.y * a.w - a.z * a.x), g - d - e + f), this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g - d + e - f)) : "ZYX" === b ? (this.x = Math.atan2(2 * (a.x * a.w + a.z * a.y), g - d - e + f), this.y = Math.asin(c(2 * (a.y * a.w - a.x * a.z))), this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g + d - e - f)) : "YZX" === b ? (this.x = Math.atan2(2 * (a.x * a.w - a.z * a.y), g - d + e - f), this.y = Math.atan2(2 * (a.y * a.w - a.x * a.z), g + d - e - f), this.z = Math.asin(c(2 * (a.x * a.y + a.z * a.w)))) : "XZY" === b && (this.x = Math.atan2(2 * (a.x * a.w + a.y * a.z), g - d + e - f), this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g + d -
            e - f), this.z = Math.asin(c(2 * (a.z * a.w - a.x * a.y))));
        return this
    },
    getScaleFromMatrix: function(a) {
        var b = this.set(a.elements[0], a.elements[1], a.elements[2]).length(),
            c = this.set(a.elements[4], a.elements[5], a.elements[6]).length(),
            a = this.set(a.elements[8], a.elements[9], a.elements[10]).length();
        this.x = b;
        this.y = c;
        this.z = a;
        return this
    },
    equals: function(a) {
        return a.x === this.x && a.y === this.y && a.z === this.z
    },
    toArray: function() {
        return [this.x, this.y, this.z]
    },
    clone: function() {
        return new THREE.Vector3(this.x, this.y, this.z)
    }
});

/* Required Dependency */
THREE.Vector4 = function(a, b, c, d) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0;
    this.w = void 0 !== d ? d : 1
};
THREE.extend(THREE.Vector4.prototype, {
    set: function(a, b, c, d) {
        this.x = a;
        this.y = b;
        this.z = c;
        this.w = d;
        return this
    },
    setX: function(a) {
        this.x = a;
        return this
    },
    setY: function(a) {
        this.y = a;
        return this
    },
    setZ: function(a) {
        this.z = a;
        return this
    },
    setW: function(a) {
        this.w = a;
        return this
    },
    setComponent: function(a, b) {
        switch (a) {
            case 0:
                this.x = b;
                break;
            case 1:
                this.y = b;
                break;
            case 2:
                this.z = b;
                break;
            case 3:
                this.w = b;
                break;
            default:
                throw Error("index is out of range: " + a);
        }
    },
    getComponent: function(a) {
        switch (a) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            case 3:
                return this.w;
            default:
                throw Error("index is out of range: " + a);
        }
    },
    copy: function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = void 0 !== a.w ? a.w : 1;
        return this
    },
    add: function(a, b) {
        if (void 0 !== b) return console.warn("DEPRECATED: Vector4's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b);
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        this.w += a.w;
        return this
    },
    addScalar: function(a) {
        this.x += a;
        this.y += a;
        this.z += a;
        this.w += a;
        return this
    },
    addVectors: function(a,
        b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        this.w = a.w + b.w;
        return this
    },
    sub: function(a, b) {
        if (void 0 !== b) return console.warn("DEPRECATED: Vector4's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(a, b);
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        this.w -= a.w;
        return this
    },
    subVectors: function(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        this.w = a.w - b.w;
        return this
    },
    multiplyScalar: function(a) {
        this.x *= a;
        this.y *= a;
        this.z *= a;
        this.w *= a;
        return this
    },
    applyMatrix4: function(a) {
        var b =
            this.x,
            c = this.y,
            d = this.z,
            e = this.w,
            a = a.elements;
        this.x = a[0] * b + a[4] * c + a[8] * d + a[12] * e;
        this.y = a[1] * b + a[5] * c + a[9] * d + a[13] * e;
        this.z = a[2] * b + a[6] * c + a[10] * d + a[14] * e;
        this.w = a[3] * b + a[7] * c + a[11] * d + a[15] * e;
        return this
    },
    divideScalar: function(a) {
        0 !== a ? (this.x /= a, this.y /= a, this.z /= a, this.w /= a) : (this.z = this.y = this.x = 0, this.w = 1);
        return this
    },
    setAxisAngleFromQuaternion: function(a) {
        this.w = 2 * Math.acos(a.w);
        var b = Math.sqrt(1 - a.w * a.w);
        1E-4 > b ? (this.x = 1, this.z = this.y = 0) : (this.x = a.x / b, this.y = a.y / b, this.z = a.z / b);
        return this
    },
    setAxisAngleFromRotationMatrix: function(a) {
        var b, c, d, a = a.elements,
            e = a[0];
        d = a[4];
        var f = a[8],
            g = a[1],
            h = a[5],
            i = a[9];
        c = a[2];
        b = a[6];
        var k = a[10];
        if (0.01 > Math.abs(d - g) && 0.01 > Math.abs(f - c) && 0.01 > Math.abs(i - b)) {
            if (0.1 > Math.abs(d + g) && 0.1 > Math.abs(f + c) && 0.1 > Math.abs(i + b) && 0.1 > Math.abs(e + h + k - 3)) return this.set(1, 0, 0, 0), this;
            a = Math.PI;
            e = (e + 1) / 2;
            h = (h + 1) / 2;
            k = (k + 1) / 2;
            d = (d + g) / 4;
            f = (f + c) / 4;
            i = (i + b) / 4;
            e > h && e > k ? 0.01 > e ? (b = 0, d = c = 0.707106781) : (b = Math.sqrt(e), c = d / b, d = f / b) : h > k ? 0.01 > h ? (b = 0.707106781, c = 0, d = 0.707106781) : (c = Math.sqrt(h),
                b = d / c, d = i / c) : 0.01 > k ? (c = b = 0.707106781, d = 0) : (d = Math.sqrt(k), b = f / d, c = i / d);
            this.set(b, c, d, a);
            return this
        }
        a = Math.sqrt((b - i) * (b - i) + (f - c) * (f - c) + (g - d) * (g - d));
        0.001 > Math.abs(a) && (a = 1);
        this.x = (b - i) / a;
        this.y = (f - c) / a;
        this.z = (g - d) / a;
        this.w = Math.acos((e + h + k - 1) / 2);
        return this
    },
    min: function(a) {
        this.x > a.x && (this.x = a.x);
        this.y > a.y && (this.y = a.y);
        this.z > a.z && (this.z = a.z);
        this.w > a.w && (this.w = a.w);
        return this
    },
    max: function(a) {
        this.x < a.x && (this.x = a.x);
        this.y < a.y && (this.y = a.y);
        this.z < a.z && (this.z = a.z);
        this.w < a.w && (this.w =
            a.w);
        return this
    },
    clamp: function(a, b) {
        this.x < a.x ? this.x = a.x : this.x > b.x && (this.x = b.x);
        this.y < a.y ? this.y = a.y : this.y > b.y && (this.y = b.y);
        this.z < a.z ? this.z = a.z : this.z > b.z && (this.z = b.z);
        this.w < a.w ? this.w = a.w : this.w > b.w && (this.w = b.w);
        return this
    },
    negate: function() {
        return this.multiplyScalar(-1)
    },
    dot: function(a) {
        return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y +
            this.z * this.z + this.w * this.w)
    },
    lengthManhattan: function() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(a) {
        var b = this.length();
        0 !== b && a !== b && this.multiplyScalar(a / b);
        return this
    },
    lerp: function(a, b) {
        this.x += (a.x - this.x) * b;
        this.y += (a.y - this.y) * b;
        this.z += (a.z - this.z) * b;
        this.w += (a.w - this.w) * b;
        return this
    },
    equals: function(a) {
        return a.x === this.x && a.y === this.y && a.z === this.z && a.w === this.w
    },
    toArray: function() {
        return [this.x,
            this.y, this.z, this.w
        ]
    },
    clone: function() {
        return new THREE.Vector4(this.x, this.y, this.z, this.w)
    }
});

/* Required Dependency */
THREE.Box2 = function(a, b) {
    this.min = void 0 !== a ? a : new THREE.Vector2(Infinity, Infinity);
    this.max = void 0 !== b ? b : new THREE.Vector2(-Infinity, -Infinity)
};
THREE.extend(THREE.Box2.prototype, {
    set: function(a, b) {
        this.min.copy(a);
        this.max.copy(b);
        return this
    },
    setFromPoints: function(a) {
        if (0 < a.length) {
            var b = a[0];
            this.min.copy(b);
            this.max.copy(b);
            for (var c = 1, d = a.length; c < d; c++) b = a[c], b.x < this.min.x ? this.min.x = b.x : b.x > this.max.x && (this.max.x = b.x), b.y < this.min.y ? this.min.y = b.y : b.y > this.max.y && (this.max.y = b.y)
        } else this.makeEmpty();
        return this
    },
    setFromCenterAndSize: function() {
        var a = new THREE.Vector2;
        return function(b, c) {
            var d = a.copy(c).multiplyScalar(0.5);
            this.min.copy(b).sub(d);
            this.max.copy(b).add(d);
            return this
        }
    }(),
    copy: function(a) {
        this.min.copy(a.min);
        this.max.copy(a.max);
        return this
    },
    makeEmpty: function() {
        this.min.x = this.min.y = Infinity;
        this.max.x = this.max.y = -Infinity;
        return this
    },
    empty: function() {
        return this.max.x < this.min.x || this.max.y < this.min.y
    },
    center: function(a) {
        return (a || new THREE.Vector2).addVectors(this.min, this.max).multiplyScalar(0.5)
    },
    size: function(a) {
        return (a || new THREE.Vector2).subVectors(this.max, this.min)
    },
    expandByPoint: function(a) {
        this.min.min(a);
        this.max.max(a);
        return this
    },
    expandByVector: function(a) {
        this.min.sub(a);
        this.max.add(a);
        return this
    },
    expandByScalar: function(a) {
        this.min.addScalar(-a);
        this.max.addScalar(a);
        return this
    },
    containsPoint: function(a) {
        return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y ? !1 : !0
    },
    containsBox: function(a) {
        return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y ? !0 : !1
    },
    getParameter: function(a) {
        return new THREE.Vector2((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) /
            (this.max.y - this.min.y))
    },
    isIntersectionBox: function(a) {
        return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y ? !1 : !0
    },
    clampPoint: function(a, b) {
        return (b || new THREE.Vector2).copy(a).clamp(this.min, this.max)
    },
    distanceToPoint: function() {
        var a = new THREE.Vector2;
        return function(b) {
            return a.copy(b).clamp(this.min, this.max).sub(b).length()
        }
    }(),
    intersect: function(a) {
        this.min.max(a.min);
        this.max.min(a.max);
        return this
    },
    union: function(a) {
        this.min.min(a.min);
        this.max.max(a.max);
        return this
    },
    translate: function(a) {
        this.min.add(a);
        this.max.add(a);
        return this
    },
    equals: function(a) {
        return a.min.equals(this.min) && a.max.equals(this.max)
    },
    clone: function() {
        return (new THREE.Box2).copy(this)
    }
});

/* Required Dependency */
THREE.Box3 = function(a, b) {
    this.min = void 0 !== a ? a : new THREE.Vector3(Infinity, Infinity, Infinity);
    this.max = void 0 !== b ? b : new THREE.Vector3(-Infinity, -Infinity, -Infinity)
};
THREE.extend(THREE.Box3.prototype, {
    set: function(a, b) {
        this.min.copy(a);
        this.max.copy(b);
        return this
    },
    setFromPoints: function(a) {
        if (0 < a.length) {
            var b = a[0];
            this.min.copy(b);
            this.max.copy(b);
            for (var c = 1, d = a.length; c < d; c++) b = a[c], b.x < this.min.x ? this.min.x = b.x : b.x > this.max.x && (this.max.x = b.x), b.y < this.min.y ? this.min.y = b.y : b.y > this.max.y && (this.max.y = b.y), b.z < this.min.z ? this.min.z = b.z : b.z > this.max.z && (this.max.z = b.z)
        } else this.makeEmpty();
        return this
    },
    setFromCenterAndSize: function() {
        var a = new THREE.Vector3;
        return function(b, c) {
            var d = a.copy(c).multiplyScalar(0.5);
            this.min.copy(b).sub(d);
            this.max.copy(b).add(d);
            return this
        }
    }(),
    copy: function(a) {
        this.min.copy(a.min);
        this.max.copy(a.max);
        return this
    },
    makeEmpty: function() {
        this.min.x = this.min.y = this.min.z = Infinity;
        this.max.x = this.max.y = this.max.z = -Infinity;
        return this
    },
    empty: function() {
        return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
    },
    center: function(a) {
        return (a || new THREE.Vector3).addVectors(this.min, this.max).multiplyScalar(0.5)
    },
    size: function(a) {
        return (a || new THREE.Vector3).subVectors(this.max, this.min)
    },
    expandByPoint: function(a) {
        this.min.min(a);
        this.max.max(a);
        return this
    },
    expandByVector: function(a) {
        this.min.sub(a);
        this.max.add(a);
        return this
    },
    expandByScalar: function(a) {
        this.min.addScalar(-a);
        this.max.addScalar(a);
        return this
    },
    containsPoint: function(a) {
        return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y || a.z < this.min.z || a.z > this.max.z ? !1 : !0
    },
    containsBox: function(a) {
        return this.min.x <= a.min.x && a.max.x <=
            this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y && this.min.z <= a.min.z && a.max.z <= this.max.z ? !0 : !1
    },
    getParameter: function(a) {
        return new THREE.Vector3((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y), (a.z - this.min.z) / (this.max.z - this.min.z))
    },
    isIntersectionBox: function(a) {
        return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y || a.max.z < this.min.z || a.min.z > this.max.z ? !1 : !0
    },
    clampPoint: function(a, b) {
        return (b || new THREE.Vector3).copy(a).clamp(this.min,
            this.max)
    },
    distanceToPoint: function() {
        var a = new THREE.Vector3;
        return function(b) {
            return a.copy(b).clamp(this.min, this.max).sub(b).length()
        }
    }(),
    getBoundingSphere: function() {
        var a = new THREE.Vector3;
        return function(b) {
            b = b || new THREE.Sphere;
            b.center = this.center();
            b.radius = 0.5 * this.size(a).length();
            return b
        }
    }(),
    intersect: function(a) {
        this.min.max(a.min);
        this.max.min(a.max);
        return this
    },
    union: function(a) {
        this.min.min(a.min);
        this.max.max(a.max);
        return this
    },
    applyMatrix4: function() {
        var a = [new THREE.Vector3,
            new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3
        ];
        return function(b) {
            a[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(b);
            a[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(b);
            a[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(b);
            a[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(b);
            a[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(b);
            a[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(b);
            a[6].set(this.max.x,
                this.max.y, this.min.z).applyMatrix4(b);
            a[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(b);
            this.makeEmpty();
            this.setFromPoints(a);
            return this
        }
    }(),
    translate: function(a) {
        this.min.add(a);
        this.max.add(a);
        return this
    },
    equals: function(a) {
        return a.min.equals(this.min) && a.max.equals(this.max)
    },
    clone: function() {
        return (new THREE.Box3).copy(this)
    }
});

/* Required Dependency */
THREE.Matrix3 = function(a, b, c, d, e, f, g, h, i) {
    this.elements = new Float32Array(9);
    this.set(void 0 !== a ? a : 1, b || 0, c || 0, d || 0, void 0 !== e ? e : 1, f || 0, g || 0, h || 0, void 0 !== i ? i : 1)
};
THREE.extend(THREE.Matrix3.prototype, {
    set: function(a, b, c, d, e, f, g, h, i) {
        var k = this.elements;
        k[0] = a;
        k[3] = b;
        k[6] = c;
        k[1] = d;
        k[4] = e;
        k[7] = f;
        k[2] = g;
        k[5] = h;
        k[8] = i;
        return this
    },
    identity: function() {
        this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
        return this
    },
    copy: function(a) {
        a = a.elements;
        this.set(a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8]);
        return this
    },
    multiplyVector3: function(a) {
        console.warn("DEPRECATED: Matrix3's .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.");
        return a.applyMatrix3(this)
    },
    multiplyVector3Array: function() {
        var a =
            new THREE.Vector3;
        return function(b) {
            for (var c = 0, d = b.length; c < d; c += 3) a.x = b[c], a.y = b[c + 1], a.z = b[c + 2], a.applyMatrix3(this), b[c] = a.x, b[c + 1] = a.y, b[c + 2] = a.z;
            return b
        }
    }(),
    multiplyScalar: function(a) {
        var b = this.elements;
        b[0] *= a;
        b[3] *= a;
        b[6] *= a;
        b[1] *= a;
        b[4] *= a;
        b[7] *= a;
        b[2] *= a;
        b[5] *= a;
        b[8] *= a;
        return this
    },
    determinant: function() {
        var a = this.elements,
            b = a[0],
            c = a[1],
            d = a[2],
            e = a[3],
            f = a[4],
            g = a[5],
            h = a[6],
            i = a[7],
            a = a[8];
        return b * f * a - b * g * i - c * e * a + c * g * h + d * e * i - d * f * h
    },
    getInverse: function(a, b) {
        var c = a.elements,
            d = this.elements;
        d[0] = c[10] * c[5] - c[6] * c[9];
        d[1] = -c[10] * c[1] + c[2] * c[9];
        d[2] = c[6] * c[1] - c[2] * c[5];
        d[3] = -c[10] * c[4] + c[6] * c[8];
        d[4] = c[10] * c[0] - c[2] * c[8];
        d[5] = -c[6] * c[0] + c[2] * c[4];
        d[6] = c[9] * c[4] - c[5] * c[8];
        d[7] = -c[9] * c[0] + c[1] * c[8];
        d[8] = c[5] * c[0] - c[1] * c[4];
        c = c[0] * d[0] + c[1] * d[3] + c[2] * d[6];
        if (0 === c) {
            if (b) throw Error("Matrix3.getInverse(): can't invert matrix, determinant is 0");
            console.warn("Matrix3.getInverse(): can't invert matrix, determinant is 0");
            this.identity();
            return this
        }
        this.multiplyScalar(1 / c);
        return this
    },
    transpose: function() {
        var a,
            b = this.elements;
        a = b[1];
        b[1] = b[3];
        b[3] = a;
        a = b[2];
        b[2] = b[6];
        b[6] = a;
        a = b[5];
        b[5] = b[7];
        b[7] = a;
        return this
    },
    getNormalMatrix: function(a) {
        this.getInverse(a).transpose();
        return this
    },
    transposeIntoArray: function(a) {
        var b = this.elements;
        a[0] = b[0];
        a[1] = b[3];
        a[2] = b[6];
        a[3] = b[1];
        a[4] = b[4];
        a[5] = b[7];
        a[6] = b[2];
        a[7] = b[5];
        a[8] = b[8];
        return this
    },
    clone: function() {
        var a = this.elements;
        return new THREE.Matrix3(a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8])
    }
});

/* Required Dependency */
THREE.Matrix4 = function(a, b, c, d, e, f, g, h, i, k, l, m, n, s, r, p) {
    var q = this.elements = new Float32Array(16);
    q[0] = void 0 !== a ? a : 1;
    q[4] = b || 0;
    q[8] = c || 0;
    q[12] = d || 0;
    q[1] = e || 0;
    q[5] = void 0 !== f ? f : 1;
    q[9] = g || 0;
    q[13] = h || 0;
    q[2] = i || 0;
    q[6] = k || 0;
    q[10] = void 0 !== l ? l : 1;
    q[14] = m || 0;
    q[3] = n || 0;
    q[7] = s || 0;
    q[11] = r || 0;
    q[15] = void 0 !== p ? p : 1
};
THREE.extend(THREE.Matrix4.prototype, {
    set: function(a, b, c, d, e, f, g, h, i, k, l, m, n, s, r, p) {
        var q = this.elements;
        q[0] = a;
        q[4] = b;
        q[8] = c;
        q[12] = d;
        q[1] = e;
        q[5] = f;
        q[9] = g;
        q[13] = h;
        q[2] = i;
        q[6] = k;
        q[10] = l;
        q[14] = m;
        q[3] = n;
        q[7] = s;
        q[11] = r;
        q[15] = p;
        return this
    },
    identity: function() {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    },
    copy: function(a) {
        a = a.elements;
        this.set(a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15]);
        return this
    },
    setRotationFromEuler: function(a, b) {
        var c = this.elements,
            d = a.x,
            e = a.y,
            f = a.z,
            g = Math.cos(d),
            d = Math.sin(d),
            h = Math.cos(e),
            e = Math.sin(e),
            i = Math.cos(f),
            f = Math.sin(f);
        if (void 0 === b || "XYZ" === b) {
            var k = g * i,
                l = g * f,
                m = d * i,
                n = d * f;
            c[0] = h * i;
            c[4] = -h * f;
            c[8] = e;
            c[1] = l + m * e;
            c[5] = k - n * e;
            c[9] = -d * h;
            c[2] = n - k * e;
            c[6] = m + l * e;
            c[10] = g * h
        } else "YXZ" === b ? (k = h * i, l = h * f, m = e * i, n = e * f, c[0] = k + n * d, c[4] = m * d - l, c[8] = g * e, c[1] = g * f, c[5] = g * i, c[9] = -d, c[2] = l * d - m, c[6] = n + k * d, c[10] = g * h) : "ZXY" === b ? (k = h * i, l = h * f, m = e * i, n = e * f, c[0] = k - n * d, c[4] = -g * f, c[8] = m + l * d, c[1] = l + m * d, c[5] = g * i, c[9] = n - k * d, c[2] = -g * e, c[6] = d, c[10] = g * h) :
            "ZYX" === b ? (k = g * i, l = g * f, m = d * i, n = d * f, c[0] = h * i, c[4] = m * e - l, c[8] = k * e + n, c[1] = h * f, c[5] = n * e + k, c[9] = l * e - m, c[2] = -e, c[6] = d * h, c[10] = g * h) : "YZX" === b ? (k = g * h, l = g * e, m = d * h, n = d * e, c[0] = h * i, c[4] = n - k * f, c[8] = m * f + l, c[1] = f, c[5] = g * i, c[9] = -d * i, c[2] = -e * i, c[6] = l * f + m, c[10] = k - n * f) : "XZY" === b && (k = g * h, l = g * e, m = d * h, n = d * e, c[0] = h * i, c[4] = -f, c[8] = e * i, c[1] = k * f + n, c[5] = g * i, c[9] = l * f - m, c[2] = m * f - l, c[6] = d * i, c[10] = n * f + k);
        return this
    },
    setRotationFromQuaternion: function(a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            e = a.z,
            f = a.w,
            g = c + c,
            h = d + d,
            i = e + e,
            a = c * g,
            k = c * h,
            c = c * i,
            l = d * h,
            d = d * i,
            e = e * i,
            g = f * g,
            h = f * h,
            f = f * i;
        b[0] = 1 - (l + e);
        b[4] = k - f;
        b[8] = c + h;
        b[1] = k + f;
        b[5] = 1 - (a + e);
        b[9] = d - g;
        b[2] = c - h;
        b[6] = d + g;
        b[10] = 1 - (a + l);
        return this
    },
    lookAt: function() {
        var a = new THREE.Vector3,
            b = new THREE.Vector3,
            c = new THREE.Vector3;
        return function(d, e, f) {
            var g = this.elements;
            c.subVectors(d, e).normalize();
            0 === c.length() && (c.z = 1);
            a.crossVectors(f, c).normalize();
            0 === a.length() && (c.x += 1E-4, a.crossVectors(f, c).normalize());
            b.crossVectors(c, a);
            g[0] = a.x;
            g[4] = b.x;
            g[8] = c.x;
            g[1] = a.y;
            g[5] = b.y;
            g[9] = c.y;
            g[2] = a.z;
            g[6] = b.z;
            g[10] = c.z;
            return this
        }
    }(),
    multiply: function(a, b) {
        return void 0 !== b ? (console.warn("DEPRECATED: Matrix4's .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(a, b)) : this.multiplyMatrices(this, a)
    },
    multiplyMatrices: function(a, b) {
        var c = a.elements,
            d = b.elements,
            e = this.elements,
            f = c[0],
            g = c[4],
            h = c[8],
            i = c[12],
            k = c[1],
            l = c[5],
            m = c[9],
            n = c[13],
            s = c[2],
            r = c[6],
            p = c[10],
            q = c[14],
            y = c[3],
            v = c[7],
            z = c[11],
            c = c[15],
            t = d[0],
            A = d[4],
            I = d[8],
            C = d[12],
            x = d[1],
            G = d[5],
            J = d[9],
            E = d[13],
            H = d[2],
            B = d[6],
            W = d[10],
            F = d[14],
            K = d[3],
            L = d[7],
            U = d[11],
            d = d[15];
        e[0] = f * t + g * x + h * H + i * K;
        e[4] = f * A + g * G + h * B + i * L;
        e[8] = f * I + g * J + h * W + i * U;
        e[12] = f * C + g * E + h * F + i * d;
        e[1] = k * t + l * x + m * H + n * K;
        e[5] = k * A + l * G + m * B + n * L;
        e[9] = k * I + l * J + m * W + n * U;
        e[13] = k * C + l * E + m * F + n * d;
        e[2] = s * t + r * x + p * H + q * K;
        e[6] = s * A + r * G + p * B + q * L;
        e[10] = s * I + r * J + p * W + q * U;
        e[14] = s * C + r * E + p * F + q * d;
        e[3] = y * t + v * x + z * H + c * K;
        e[7] = y * A + v * G + z * B + c * L;
        e[11] = y * I + v * J + z * W + c * U;
        e[15] = y * C + v * E + z * F + c * d;
        return this
    },
    multiplyToArray: function(a, b, c) {
        var d = this.elements;
        this.multiplyMatrices(a, b);
        c[0] = d[0];
        c[1] = d[1];
        c[2] = d[2];
        c[3] = d[3];
        c[4] = d[4];
        c[5] = d[5];
        c[6] = d[6];
        c[7] = d[7];
        c[8] = d[8];
        c[9] = d[9];
        c[10] = d[10];
        c[11] = d[11];
        c[12] = d[12];
        c[13] = d[13];
        c[14] = d[14];
        c[15] = d[15];
        return this
    },
    multiplyScalar: function(a) {
        var b = this.elements;
        b[0] *= a;
        b[4] *= a;
        b[8] *= a;
        b[12] *= a;
        b[1] *= a;
        b[5] *= a;
        b[9] *= a;
        b[13] *= a;
        b[2] *= a;
        b[6] *= a;
        b[10] *= a;
        b[14] *= a;
        b[3] *= a;
        b[7] *= a;
        b[11] *= a;
        b[15] *= a;
        return this
    },
    multiplyVector3: function(a) {
        console.warn("DEPRECATED: Matrix4's .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead.");
        return a.applyProjection(this)
    },
    multiplyVector4: function(a) {
        console.warn("DEPRECATED: Matrix4's .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.");
        return a.applyMatrix4(this)
    },
    multiplyVector3Array: function() {
        var a = new THREE.Vector3;
        return function(b) {
            for (var c = 0, d = b.length; c < d; c += 3) a.x = b[c], a.y = b[c + 1], a.z = b[c + 2], a.applyProjection(this), b[c] = a.x, b[c + 1] = a.y, b[c + 2] = a.z;
            return b
        }
    }(),
    rotateAxis: function(a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            e = a.z;
        a.x = c * b[0] + d * b[4] + e * b[8];
        a.y =
            c * b[1] + d * b[5] + e * b[9];
        a.z = c * b[2] + d * b[6] + e * b[10];
        a.normalize();
        return a
    },
    crossVector: function(a) {
        var b = this.elements,
            c = new THREE.Vector4;
        c.x = b[0] * a.x + b[4] * a.y + b[8] * a.z + b[12] * a.w;
        c.y = b[1] * a.x + b[5] * a.y + b[9] * a.z + b[13] * a.w;
        c.z = b[2] * a.x + b[6] * a.y + b[10] * a.z + b[14] * a.w;
        c.w = a.w ? b[3] * a.x + b[7] * a.y + b[11] * a.z + b[15] * a.w : 1;
        return c
    },
    determinant: function() {
        var a = this.elements,
            b = a[0],
            c = a[4],
            d = a[8],
            e = a[12],
            f = a[1],
            g = a[5],
            h = a[9],
            i = a[13],
            k = a[2],
            l = a[6],
            m = a[10],
            n = a[14];
        return a[3] * (+e * h * l - d * i * l - e * g * m + c * i * m + d * g * n - c * h * n) + a[7] *
            (+b * h * n - b * i * m + e * f * m - d * f * n + d * i * k - e * h * k) + a[11] * (+b * i * l - b * g * n - e * f * l + c * f * n + e * g * k - c * i * k) + a[15] * (-d * g * k - b * h * l + b * g * m + d * f * l - c * f * m + c * h * k)
    },
    transpose: function() {
        var a = this.elements,
            b;
        b = a[1];
        a[1] = a[4];
        a[4] = b;
        b = a[2];
        a[2] = a[8];
        a[8] = b;
        b = a[6];
        a[6] = a[9];
        a[9] = b;
        b = a[3];
        a[3] = a[12];
        a[12] = b;
        b = a[7];
        a[7] = a[13];
        a[13] = b;
        b = a[11];
        a[11] = a[14];
        a[14] = b;
        return this
    },
    flattenToArray: function(a) {
        var b = this.elements;
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        a[4] = b[4];
        a[5] = b[5];
        a[6] = b[6];
        a[7] = b[7];
        a[8] = b[8];
        a[9] = b[9];
        a[10] = b[10];
        a[11] =
            b[11];
        a[12] = b[12];
        a[13] = b[13];
        a[14] = b[14];
        a[15] = b[15];
        return a
    },
    flattenToArrayOffset: function(a, b) {
        var c = this.elements;
        a[b] = c[0];
        a[b + 1] = c[1];
        a[b + 2] = c[2];
        a[b + 3] = c[3];
        a[b + 4] = c[4];
        a[b + 5] = c[5];
        a[b + 6] = c[6];
        a[b + 7] = c[7];
        a[b + 8] = c[8];
        a[b + 9] = c[9];
        a[b + 10] = c[10];
        a[b + 11] = c[11];
        a[b + 12] = c[12];
        a[b + 13] = c[13];
        a[b + 14] = c[14];
        a[b + 15] = c[15];
        return a
    },
    getPosition: function() {
        var a = new THREE.Vector3;
        return function() {
            console.warn("DEPRECATED: Matrix4's .getPosition() has been removed. Use Vector3.getPositionFromMatrix( matrix ) instead.");
            var b = this.elements;
            return a.set(b[12], b[13], b[14])
        }
    }(),
    setPosition: function(a) {
        var b = this.elements;
        b[12] = a.x;
        b[13] = a.y;
        b[14] = a.z;
        return this
    },
    getInverse: function(a, b) {
        var c = this.elements,
            d = a.elements,
            e = d[0],
            f = d[4],
            g = d[8],
            h = d[12],
            i = d[1],
            k = d[5],
            l = d[9],
            m = d[13],
            n = d[2],
            s = d[6],
            r = d[10],
            p = d[14],
            q = d[3],
            y = d[7],
            v = d[11],
            z = d[15];
        c[0] = l * p * y - m * r * y + m * s * v - k * p * v - l * s * z + k * r * z;
        c[4] = h * r * y - g * p * y - h * s * v + f * p * v + g * s * z - f * r * z;
        c[8] = g * m * y - h * l * y + h * k * v - f * m * v - g * k * z + f * l * z;
        c[12] = h * l * s - g * m * s - h * k * r + f * m * r + g * k * p - f * l * p;
        c[1] = m * r * q - l * p * q -
            m * n * v + i * p * v + l * n * z - i * r * z;
        c[5] = g * p * q - h * r * q + h * n * v - e * p * v - g * n * z + e * r * z;
        c[9] = h * l * q - g * m * q - h * i * v + e * m * v + g * i * z - e * l * z;
        c[13] = g * m * n - h * l * n + h * i * r - e * m * r - g * i * p + e * l * p;
        c[2] = k * p * q - m * s * q + m * n * y - i * p * y - k * n * z + i * s * z;
        c[6] = h * s * q - f * p * q - h * n * y + e * p * y + f * n * z - e * s * z;
        c[10] = f * m * q - h * k * q + h * i * y - e * m * y - f * i * z + e * k * z;
        c[14] = h * k * n - f * m * n - h * i * s + e * m * s + f * i * p - e * k * p;
        c[3] = l * s * q - k * r * q - l * n * y + i * r * y + k * n * v - i * s * v;
        c[7] = f * r * q - g * s * q + g * n * y - e * r * y - f * n * v + e * s * v;
        c[11] = g * k * q - f * l * q - g * i * y + e * l * y + f * i * v - e * k * v;
        c[15] = f * l * n - g * k * n + g * i * s - e * l * s - f * i * r + e * k * r;
        c = d[0] * c[0] + d[1] * c[4] +
            d[2] * c[8] + d[3] * c[12];
        if (0 == c) {
            if (b) throw Error("Matrix4.getInverse(): can't invert matrix, determinant is 0");
            console.warn("Matrix4.getInverse(): can't invert matrix, determinant is 0");
            this.identity();
            return this
        }
        this.multiplyScalar(1 / c);
        return this
    },
    compose: function() {
        var a = new THREE.Matrix4,
            b = new THREE.Matrix4;
        return function(c, d, e) {
            var f = this.elements;
            a.identity();
            a.setRotationFromQuaternion(d);
            b.makeScale(e.x, e.y, e.z);
            this.multiplyMatrices(a, b);
            f[12] = c.x;
            f[13] = c.y;
            f[14] = c.z;
            return this
        }
    }(),
    decompose: function() {
        var a =
            new THREE.Vector3,
            b = new THREE.Vector3,
            c = new THREE.Vector3,
            d = new THREE.Matrix4;
        return function(e, f, g) {
            var h = this.elements;
            a.set(h[0], h[1], h[2]);
            b.set(h[4], h[5], h[6]);
            c.set(h[8], h[9], h[10]);
            e = e instanceof THREE.Vector3 ? e : new THREE.Vector3;
            f = f instanceof THREE.Quaternion ? f : new THREE.Quaternion;
            g = g instanceof THREE.Vector3 ? g : new THREE.Vector3;
            g.x = a.length();
            g.y = b.length();
            g.z = c.length();
            e.x = h[12];
            e.y = h[13];
            e.z = h[14];
            d.copy(this);
            d.elements[0] /= g.x;
            d.elements[1] /= g.x;
            d.elements[2] /= g.x;
            d.elements[4] /=
                g.y;
            d.elements[5] /= g.y;
            d.elements[6] /= g.y;
            d.elements[8] /= g.z;
            d.elements[9] /= g.z;
            d.elements[10] /= g.z;
            f.setFromRotationMatrix(d);
            return [e, f, g]
        }
    }(),
    extractPosition: function(a) {
        var b = this.elements,
            a = a.elements;
        b[12] = a[12];
        b[13] = a[13];
        b[14] = a[14];
        return this
    },
    extractRotation: function() {
        var a = new THREE.Vector3;
        return function(b) {
            var c = this.elements,
                b = b.elements,
                d = 1 / a.set(b[0], b[1], b[2]).length(),
                e = 1 / a.set(b[4], b[5], b[6]).length(),
                f = 1 / a.set(b[8], b[9], b[10]).length();
            c[0] = b[0] * d;
            c[1] = b[1] * d;
            c[2] = b[2] * d;
            c[4] =
                b[4] * e;
            c[5] = b[5] * e;
            c[6] = b[6] * e;
            c[8] = b[8] * f;
            c[9] = b[9] * f;
            c[10] = b[10] * f;
            return this
        }
    }(),
    translate: function(a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            a = a.z;
        b[12] = b[0] * c + b[4] * d + b[8] * a + b[12];
        b[13] = b[1] * c + b[5] * d + b[9] * a + b[13];
        b[14] = b[2] * c + b[6] * d + b[10] * a + b[14];
        b[15] = b[3] * c + b[7] * d + b[11] * a + b[15];
        return this
    },
    rotateX: function(a) {
        var b = this.elements,
            c = b[4],
            d = b[5],
            e = b[6],
            f = b[7],
            g = b[8],
            h = b[9],
            i = b[10],
            k = b[11],
            l = Math.cos(a),
            a = Math.sin(a);
        b[4] = l * c + a * g;
        b[5] = l * d + a * h;
        b[6] = l * e + a * i;
        b[7] = l * f + a * k;
        b[8] = l * g - a * c;
        b[9] = l * h - a * d;
        b[10] =
            l * i - a * e;
        b[11] = l * k - a * f;
        return this
    },
    rotateY: function(a) {
        var b = this.elements,
            c = b[0],
            d = b[1],
            e = b[2],
            f = b[3],
            g = b[8],
            h = b[9],
            i = b[10],
            k = b[11],
            l = Math.cos(a),
            a = Math.sin(a);
        b[0] = l * c - a * g;
        b[1] = l * d - a * h;
        b[2] = l * e - a * i;
        b[3] = l * f - a * k;
        b[8] = l * g + a * c;
        b[9] = l * h + a * d;
        b[10] = l * i + a * e;
        b[11] = l * k + a * f;
        return this
    },
    rotateZ: function(a) {
        var b = this.elements,
            c = b[0],
            d = b[1],
            e = b[2],
            f = b[3],
            g = b[4],
            h = b[5],
            i = b[6],
            k = b[7],
            l = Math.cos(a),
            a = Math.sin(a);
        b[0] = l * c + a * g;
        b[1] = l * d + a * h;
        b[2] = l * e + a * i;
        b[3] = l * f + a * k;
        b[4] = l * g - a * c;
        b[5] = l * h - a * d;
        b[6] = l * i - a * e;
        b[7] = l *
            k - a * f;
        return this
    },
    rotateByAxis: function(a, b) {
        var c = this.elements;
        if (1 === a.x && 0 === a.y && 0 === a.z) return this.rotateX(b);
        if (0 === a.x && 1 === a.y && 0 === a.z) return this.rotateY(b);
        if (0 === a.x && 0 === a.y && 1 === a.z) return this.rotateZ(b);
        var d = a.x,
            e = a.y,
            f = a.z,
            g = Math.sqrt(d * d + e * e + f * f),
            d = d / g,
            e = e / g,
            f = f / g,
            g = d * d,
            h = e * e,
            i = f * f,
            k = Math.cos(b),
            l = Math.sin(b),
            m = 1 - k,
            n = d * e * m,
            s = d * f * m,
            m = e * f * m,
            d = d * l,
            r = e * l,
            l = f * l,
            f = g + (1 - g) * k,
            g = n + l,
            e = s - r,
            n = n - l,
            h = h + (1 - h) * k,
            l = m + d,
            s = s + r,
            m = m - d,
            i = i + (1 - i) * k,
            k = c[0],
            d = c[1],
            r = c[2],
            p = c[3],
            q = c[4],
            y = c[5],
            v = c[6],
            z = c[7],
            t = c[8],
            A = c[9],
            I = c[10],
            C = c[11];
        c[0] = f * k + g * q + e * t;
        c[1] = f * d + g * y + e * A;
        c[2] = f * r + g * v + e * I;
        c[3] = f * p + g * z + e * C;
        c[4] = n * k + h * q + l * t;
        c[5] = n * d + h * y + l * A;
        c[6] = n * r + h * v + l * I;
        c[7] = n * p + h * z + l * C;
        c[8] = s * k + m * q + i * t;
        c[9] = s * d + m * y + i * A;
        c[10] = s * r + m * v + i * I;
        c[11] = s * p + m * z + i * C;
        return this
    },
    scale: function(a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            a = a.z;
        b[0] *= c;
        b[4] *= d;
        b[8] *= a;
        b[1] *= c;
        b[5] *= d;
        b[9] *= a;
        b[2] *= c;
        b[6] *= d;
        b[10] *= a;
        b[3] *= c;
        b[7] *= d;
        b[11] *= a;
        return this
    },
    getMaxScaleOnAxis: function() {
        var a = this.elements;
        return Math.sqrt(Math.max(a[0] *
            a[0] + a[1] * a[1] + a[2] * a[2], Math.max(a[4] * a[4] + a[5] * a[5] + a[6] * a[6], a[8] * a[8] + a[9] * a[9] + a[10] * a[10])))
    },
    makeTranslation: function(a, b, c) {
        this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1);
        return this
    },
    makeRotationX: function(a) {
        var b = Math.cos(a),
            a = Math.sin(a);
        this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1);
        return this
    },
    makeRotationY: function(a) {
        var b = Math.cos(a),
            a = Math.sin(a);
        this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1);
        return this
    },
    makeRotationZ: function(a) {
        var b = Math.cos(a),
            a = Math.sin(a);
        this.set(b, -a, 0, 0, a, b, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 1);
        return this
    },
    makeRotationAxis: function(a, b) {
        var c = Math.cos(b),
            d = Math.sin(b),
            e = 1 - c,
            f = a.x,
            g = a.y,
            h = a.z,
            i = e * f,
            k = e * g;
        this.set(i * f + c, i * g - d * h, i * h + d * g, 0, i * g + d * h, k * g + c, k * h - d * f, 0, i * h - d * g, k * h + d * f, e * h * h + c, 0, 0, 0, 0, 1);
        return this
    },
    makeScale: function(a, b, c) {
        this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1);
        return this
    },
    makeFrustum: function(a, b, c, d, e, f) {
        var g = this.elements;
        g[0] = 2 * e / (b - a);
        g[4] = 0;
        g[8] = (b + a) / (b - a);
        g[12] = 0;
        g[1] = 0;
        g[5] = 2 * e / (d - c);
        g[9] = (d + c) / (d - c);
        g[13] = 0;
        g[2] = 0;
        g[6] = 0;
        g[10] = -(f + e) / (f - e);
        g[14] = -2 *
            f * e / (f - e);
        g[3] = 0;
        g[7] = 0;
        g[11] = -1;
        g[15] = 0;
        return this
    },
    makePerspective: function(a, b, c, d) {
        var a = c * Math.tan(THREE.Math.degToRad(0.5 * a)),
            e = -a;
        return this.makeFrustum(e * b, a * b, e, a, c, d)
    },
    makeOrthographic: function(a, b, c, d, e, f) {
        var g = this.elements,
            h = b - a,
            i = c - d,
            k = f - e;
        g[0] = 2 / h;
        g[4] = 0;
        g[8] = 0;
        g[12] = -((b + a) / h);
        g[1] = 0;
        g[5] = 2 / i;
        g[9] = 0;
        g[13] = -((c + d) / i);
        g[2] = 0;
        g[6] = 0;
        g[10] = -2 / k;
        g[14] = -((f + e) / k);
        g[3] = 0;
        g[7] = 0;
        g[11] = 0;
        g[15] = 1;
        return this
    },
    clone: function() {
        var a = this.elements;
        return new THREE.Matrix4(a[0], a[4], a[8], a[12],
            a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15])
    }
});

/* Required Dependency */
THREE.Frustum = function(a, b, c, d, e, f) {
    this.planes = [void 0 !== a ? a : new THREE.Plane, void 0 !== b ? b : new THREE.Plane, void 0 !== c ? c : new THREE.Plane, void 0 !== d ? d : new THREE.Plane, void 0 !== e ? e : new THREE.Plane, void 0 !== f ? f : new THREE.Plane]
};
THREE.extend(THREE.Frustum.prototype, {
    set: function(a, b, c, d, e, f) {
        var g = this.planes;
        g[0].copy(a);
        g[1].copy(b);
        g[2].copy(c);
        g[3].copy(d);
        g[4].copy(e);
        g[5].copy(f);
        return this
    },
    copy: function(a) {
        for (var b = this.planes, c = 0; 6 > c; c++) b[c].copy(a.planes[c]);
        return this
    },
    setFromMatrix: function(a) {
        var b = this.planes,
            c = a.elements,
            a = c[0],
            d = c[1],
            e = c[2],
            f = c[3],
            g = c[4],
            h = c[5],
            i = c[6],
            k = c[7],
            l = c[8],
            m = c[9],
            n = c[10],
            s = c[11],
            r = c[12],
            p = c[13],
            q = c[14],
            c = c[15];
        b[0].setComponents(f - a, k - g, s - l, c - r).normalize();
        b[1].setComponents(f +
            a, k + g, s + l, c + r).normalize();
        b[2].setComponents(f + d, k + h, s + m, c + p).normalize();
        b[3].setComponents(f - d, k - h, s - m, c - p).normalize();
        b[4].setComponents(f - e, k - i, s - n, c - q).normalize();
        b[5].setComponents(f + e, k + i, s + n, c + q).normalize();
        return this
    },
    intersectsObject: function() {
        var a = new THREE.Vector3;
        return function(b) {
            var c = b.matrixWorld,
                d = this.planes,
                b = -b.geometry.boundingSphere.radius * c.getMaxScaleOnAxis();
            a.getPositionFromMatrix(c);
            for (c = 0; 6 > c; c++)
                if (d[c].distanceToPoint(a) < b) return !1;
            return !0
        }
    }(),
    intersectsSphere: function(a) {
        for (var b =
                this.planes, c = a.center, a = -a.radius, d = 0; 6 > d; d++)
            if (b[d].distanceToPoint(c) < a) return !1;
        return !0
    },
    containsPoint: function(a) {
        for (var b = this.planes, c = 0; 6 > c; c++)
            if (0 > b[c].distanceToPoint(a)) return !1;
        return !0
    },
    clone: function() {
        return (new THREE.Frustum).copy(this)
    }
});

/* Required Dependency */
THREE.Plane = function(a, b) {
    this.normal = void 0 !== a ? a : new THREE.Vector3(1, 0, 0);
    this.constant = void 0 !== b ? b : 0
};
THREE.extend(THREE.Plane.prototype, {
    set: function(a, b) {
        this.normal.copy(a);
        this.constant = b;
        return this
    },
    setComponents: function(a, b, c, d) {
        this.normal.set(a, b, c);
        this.constant = d;
        return this
    },
    setFromNormalAndCoplanarPoint: function(a, b) {
        this.normal.copy(a);
        this.constant = -b.dot(this.normal);
        return this
    },
    setFromCoplanarPoints: function() {
        var a = new THREE.Vector3,
            b = new THREE.Vector3;
        return function(c, d, e) {
            d = a.subVectors(e, d).cross(b.subVectors(c, d)).normalize();
            this.setFromNormalAndCoplanarPoint(d, c);
            return this
        }
    }(),
    copy: function(a) {
        this.normal.copy(a.normal);
        this.constant = a.constant;
        return this
    },
    normalize: function() {
        var a = 1 / this.normal.length();
        this.normal.multiplyScalar(a);
        this.constant *= a;
        return this
    },
    negate: function() {
        this.constant *= -1;
        this.normal.negate();
        return this
    },
    distanceToPoint: function(a) {
        return this.normal.dot(a) + this.constant
    },
    distanceToSphere: function(a) {
        return this.distanceToPoint(a.center) - a.radius
    },
    projectPoint: function(a, b) {
        return this.orthoPoint(a, b).sub(a).negate()
    },
    orthoPoint: function(a,
        b) {
        var c = this.distanceToPoint(a);
        return (b || new THREE.Vector3).copy(this.normal).multiplyScalar(c)
    },
    isIntersectionLine: function(a) {
        var b = this.distanceToPoint(a.start),
            a = this.distanceToPoint(a.end);
        return 0 > b && 0 < a || 0 > a && 0 < b
    },
    intersectLine: function() {
        var a = new THREE.Vector3;
        return function(b, c) {
            var d = c || new THREE.Vector3,
                e = b.delta(a),
                f = this.normal.dot(e);
            if (0 == f) {
                if (0 == this.distanceToPoint(b.start)) return d.copy(b.start)
            } else return f = -(b.start.dot(this.normal) + this.constant) / f, 0 > f || 1 < f ? void 0 : d.copy(e).multiplyScalar(f).add(b.start)
        }
    }(),
    coplanarPoint: function(a) {
        return (a || new THREE.Vector3).copy(this.normal).multiplyScalar(-this.constant)
    },
    applyMatrix4: function() {
        var a = new THREE.Vector3,
            b = new THREE.Vector3;
        return function(c, d) {
            var d = d || (new THREE.Matrix3).getInverse(c).transpose(),
                e = a.copy(this.normal).applyMatrix3(d),
                f = this.coplanarPoint(b);
            f.applyMatrix4(c);
            this.setFromNormalAndCoplanarPoint(e, f);
            return this
        }
    }(),
    translate: function(a) {
        this.constant -= a.dot(this.normal);
        return this
    },
    equals: function(a) {
        return a.normal.equals(this.normal) &&
            a.constant == this.constant
    },
    clone: function() {
        return (new THREE.Plane).copy(this)
    }
});

/* Required Dependency */
THREE.Math = {
    clamp: function(a, b, c) {
        return a < b ? b : a > c ? c : a
    },
    clampBottom: function(a, b) {
        return a < b ? b : a
    },
    mapLinear: function(a, b, c, d, e) {
        return d + (a - b) * (e - d) / (c - b)
    },
    smoothstep: function(a, b, c) {
        if (a <= b) return 0;
        if (a >= c) return 1;
        a = (a - b) / (c - b);
        return a * a * (3 - 2 * a)
    },
    smootherstep: function(a, b, c) {
        if (a <= b) return 0;
        if (a >= c) return 1;
        a = (a - b) / (c - b);
        return a * a * a * (a * (6 * a - 15) + 10)
    },
    random16: function() {
        return (65280 * Math.random() + 255 * Math.random()) / 65535
    },
    randInt: function(a, b) {
        return a + Math.floor(Math.random() * (b - a + 1))
    },
    randFloat: function(a,
        b) {
        return a + Math.random() * (b - a)
    },
    randFloatSpread: function(a) {
        return a * (0.5 - Math.random())
    },
    sign: function(a) {
        return 0 > a ? -1 : 0 < a ? 1 : 0
    },
    degToRad: function() {
        var a = Math.PI / 180;
        return function(b) {
            return b * a
        }
    }(),
    radToDeg: function() {
        var a = 180 / Math.PI;
        return function(b) {
            return b * a
        }
    }()
};

/* Required Dependency */
THREE.EventDispatcher = function() {
    var a = {};
    this.addEventListener = function(b, c) {
        void 0 === a[b] && (a[b] = []); - 1 === a[b].indexOf(c) && a[b].push(c)
    };
    this.removeEventListener = function(b, c) {
        var d = a[b].indexOf(c); - 1 !== d && a[b].splice(d, 1)
    };
    this.dispatchEvent = function(b) {
        var c = a[b.type];
        if (void 0 !== c) {
            b.target = this;
            for (var d = 0, e = c.length; d < e; d++) c[d].call(this, b)
        }
    }
};

/* Required Dependency */
THREE.Object3D = function() {
    this.id = THREE.Object3DIdCount++;
    this.name = "";
    this.properties = {};
    this.parent = void 0;
    this.children = [];
    this.up = new THREE.Vector3(0, 1, 0);
    this.position = new THREE.Vector3;
    this.rotation = new THREE.Vector3;
    this.eulerOrder = THREE.Object3D.defaultEulerOrder;
    this.scale = new THREE.Vector3(1, 1, 1);
    this.renderDepth = null;
    this.rotationAutoUpdate = !0;
    this.matrix = new THREE.Matrix4;
    this.matrixWorld = new THREE.Matrix4;
    this.matrixRotationWorld = new THREE.Matrix4;
    this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = !0;
    this.quaternion = new THREE.Quaternion;
    this.useQuaternion = !1;
    this.visible = !0;
    this.receiveShadow = this.castShadow = !1;
    this.frustumCulled = !0;
    this._vector = new THREE.Vector3
};
THREE.Object3D.prototype = {
    constructor: THREE.Object3D,
    applyMatrix: function(a) {
        this.matrix.multiplyMatrices(a, this.matrix);
        this.scale.getScaleFromMatrix(this.matrix);
        a = (new THREE.Matrix4).extractRotation(this.matrix);
        this.rotation.setEulerFromRotationMatrix(a, this.eulerOrder);
        this.position.getPositionFromMatrix(this.matrix)
    },
    translate: function(a, b) {
        this.matrix.rotateAxis(b);
        this.position.add(b.multiplyScalar(a))
    },
    translateX: function(a) {
        this.translate(a, this._vector.set(1, 0, 0))
    },
    translateY: function(a) {
        this.translate(a,
            this._vector.set(0, 1, 0))
    },
    translateZ: function(a) {
        this.translate(a, this._vector.set(0, 0, 1))
    },
    localToWorld: function(a) {
        return a.applyMatrix4(this.matrixWorld)
    },
    worldToLocal: function(a) {
        return a.applyMatrix4(THREE.Object3D.__m1.getInverse(this.matrixWorld))
    },
    lookAt: function(a) {
        this.matrix.lookAt(a, this.position, this.up);
        this.rotationAutoUpdate && (!1 === this.useQuaternion ? this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder) : this.quaternion.copy(this.matrix.decompose()[1]))
    },
    add: function(a) {
        if (a ===
            this) console.warn("THREE.Object3D.add: An object can't be added as a child of itself.");
        else if (a instanceof THREE.Object3D) {
            void 0 !== a.parent && a.parent.remove(a);
            a.parent = this;
            this.children.push(a);
            for (var b = this; void 0 !== b.parent;) b = b.parent;
            void 0 !== b && b instanceof THREE.Scene && b.__addObject(a)
        }
    },
    remove: function(a) {
        var b = this.children.indexOf(a);
        if (-1 !== b) {
            a.parent = void 0;
            this.children.splice(b, 1);
            for (b = this; void 0 !== b.parent;) b = b.parent;
            void 0 !== b && b instanceof THREE.Scene && b.__removeObject(a)
        }
    },
    traverse: function(a) {
        a(this);
        for (var b = 0, c = this.children.length; b < c; b++) this.children[b].traverse(a)
    },
    getChildByName: function(a, b) {
        for (var c = 0, d = this.children.length; c < d; c++) {
            var e = this.children[c];
            if (e.name === a || !0 === b && (e = e.getChildByName(a, b), void 0 !== e)) return e
        }
    },
    getDescendants: function(a) {
        void 0 === a && (a = []);
        Array.prototype.push.apply(a, this.children);
        for (var b = 0, c = this.children.length; b < c; b++) this.children[b].getDescendants(a);
        return a
    },
    updateMatrix: function() {
        this.matrix.setPosition(this.position);
        !1 === this.useQuaternion ? this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder) : this.matrix.setRotationFromQuaternion(this.quaternion);
        (1 !== this.scale.x || 1 !== this.scale.y || 1 !== this.scale.z) && this.matrix.scale(this.scale);
        this.matrixWorldNeedsUpdate = !0
    },
    updateMatrixWorld: function(a) {
        !0 === this.matrixAutoUpdate && this.updateMatrix();
        if (!0 === this.matrixWorldNeedsUpdate || !0 === a) void 0 === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
            this.matrixWorldNeedsUpdate = !1, a = !0;
        for (var b = 0, c = this.children.length; b < c; b++) this.children[b].updateMatrixWorld(a)
    },
    clone: function(a) {
        void 0 === a && (a = new THREE.Object3D);
        a.name = this.name;
        a.up.copy(this.up);
        a.position.copy(this.position);
        a.rotation instanceof THREE.Vector3 && a.rotation.copy(this.rotation);
        a.eulerOrder = this.eulerOrder;
        a.scale.copy(this.scale);
        a.renderDepth = this.renderDepth;
        a.rotationAutoUpdate = this.rotationAutoUpdate;
        a.matrix.copy(this.matrix);
        a.matrixWorld.copy(this.matrixWorld);
        a.matrixRotationWorld.copy(this.matrixRotationWorld);
        a.matrixAutoUpdate = this.matrixAutoUpdate;
        a.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate;
        a.quaternion.copy(this.quaternion);
        a.useQuaternion = this.useQuaternion;
        a.visible = this.visible;
        a.castShadow = this.castShadow;
        a.receiveShadow = this.receiveShadow;
        a.frustumCulled = this.frustumCulled;
        for (var b = 0; b < this.children.length; b++) a.add(this.children[b].clone());
        return a
    }
};
THREE.Object3D.__m1 = new THREE.Matrix4;
THREE.Object3D.defaultEulerOrder = "XYZ";
THREE.Object3DIdCount = 0;

/* Required Dependency */
THREE.Projector = function() {
    function a() {
        if (f === h) {
            var a = new THREE.RenderableObject;
            g.push(a);
            h++;
            f++;
            return a
        }
        return g[f++]
    }

    function b() {
        if (k === m) {
            var a = new THREE.RenderableVertex;
            l.push(a);
            m++;
            k++;
            return a
        }
        return l[k++]
    }

    function c(a, b) {
        return b.z - a.z
    }

    function d(a, b) {
        var c = 0,
            d = 1,
            e = a.z + a.w,
            f = b.z + b.w,
            g = -a.z + a.w,
            h = -b.z + b.w;
        if (0 <= e && 0 <= f && 0 <= g && 0 <= h) return !0;
        if (0 > e && 0 > f || 0 > g && 0 > h) return !1;
        0 > e ? c = Math.max(c, e / (e - f)) : 0 > f && (d = Math.min(d, e / (e - f)));
        0 > g ? c = Math.max(c, g / (g - h)) : 0 > h && (d = Math.min(d, g / (g - h)));
        if (d <
            c) return !1;
        a.lerp(b, c);
        b.lerp(a, 1 - d);
        return !0
    }
    var e, f, g = [],
        h = 0,
        i, k, l = [],
        m = 0,
        n, s, r = [],
        p = 0,
        q, y = [],
        v = 0,
        z, t, A = [],
        I = 0,
        C, x, G = [],
        J = 0,
        E = {
            objects: [],
            sprites: [],
            lights: [],
            elements: []
        },
        H = new THREE.Vector3,
        B = new THREE.Vector4,
        W = new THREE.Box3(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1)),
        F = new THREE.Box3,
        K = Array(3),
        L = Array(4),
        U = new THREE.Matrix4,
        fa = new THREE.Matrix4,
        Ca, $a = new THREE.Matrix4,
        M = new THREE.Matrix3,
        ca = new THREE.Matrix3,
        qa = new THREE.Vector3,
        ha = new THREE.Frustum,
        ra = new THREE.Vector4,
        N = new THREE.Vector4;
    this.projectVector = function(a, b) {
        b.matrixWorldInverse.getInverse(b.matrixWorld);
        fa.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse);
        return a.applyProjection(fa)
    };
    this.unprojectVector = function(a, b) {
        b.projectionMatrixInverse.getInverse(b.projectionMatrix);
        fa.multiplyMatrices(b.matrixWorld, b.projectionMatrixInverse);
        return a.applyProjection(fa)
    };
    this.pickingRay = function(a, b) {
        a.z = -1;
        var c = new THREE.Vector3(a.x, a.y, 1);
        this.unprojectVector(a, b);
        this.unprojectVector(c, b);
        c.sub(a).normalize();
        return new THREE.Raycaster(a,
            c)
    };
    this.projectScene = function(g, h, m, Pa) {
        var ta = !1,
            ka, aa, pa, Y, da, la, Z, oa, gb, nb, ia, Wa, ab;
        x = t = q = s = 0;
        E.elements.length = 0;
        g.updateMatrixWorld();
        void 0 === h.parent && h.updateMatrixWorld();
        U.copy(h.matrixWorldInverse.getInverse(h.matrixWorld));
        fa.multiplyMatrices(h.projectionMatrix, U);
        ca.getInverse(U);
        ca.transpose();
        ha.setFromMatrix(fa);
        f = 0;
        E.objects.length = 0;
        E.sprites.length = 0;
        E.lights.length = 0;
        var Fa = function(b) {
            for (var c = 0, d = b.children.length; c < d; c++) {
                var f = b.children[c];
                if (!1 !== f.visible) {
                    if (f instanceof THREE.Light) E.lights.push(f);
                    else if (f instanceof THREE.Mesh || f instanceof THREE.Line) {
                        if (!1 === f.frustumCulled || !0 === ha.intersectsObject(f)) e = a(), e.object = f, null !== f.renderDepth ? e.z = f.renderDepth : (H.getPositionFromMatrix(f.matrixWorld), H.applyProjection(fa), e.z = H.z), E.objects.push(e)
                    } else f instanceof THREE.Particle ? (e = a(), e.object = f, null !== f.renderDepth ? e.z = f.renderDepth : (H.getPositionFromMatrix(f.matrixWorld), H.applyProjection(fa), e.z = H.z), E.sprites.push(e)) : (e = a(), e.object =
                        f, null !== f.renderDepth ? e.z = f.renderDepth : (H.getPositionFromMatrix(f.matrixWorld), H.applyProjection(fa), e.z = H.z), E.objects.push(e));
                    Fa(f)
                }
            }
        };
        Fa(g);
        !0 === m && E.objects.sort(c);
        g = 0;
        for (m = E.objects.length; g < m; g++)
            if (oa = E.objects[g].object, Ca = oa.matrixWorld, k = 0, oa instanceof THREE.Mesh) {
                gb = oa.geometry;
                pa = gb.vertices;
                nb = gb.faces;
                gb = gb.faceVertexUvs;
                M.getInverse(Ca);
                M.transpose();
                Wa = oa.material instanceof THREE.MeshFaceMaterial;
                ab = !0 === Wa ? oa.material : null;
                ka = 0;
                for (aa = pa.length; ka < aa; ka++) i = b(), i.positionWorld.copy(pa[ka]).applyMatrix4(Ca),
                    i.positionScreen.copy(i.positionWorld).applyMatrix4(fa), i.positionScreen.x /= i.positionScreen.w, i.positionScreen.y /= i.positionScreen.w, i.positionScreen.z /= i.positionScreen.w, i.visible = !(-1 > i.positionScreen.x || 1 < i.positionScreen.x || -1 > i.positionScreen.y || 1 < i.positionScreen.y || -1 > i.positionScreen.z || 1 < i.positionScreen.z);
                pa = 0;
                for (ka = nb.length; pa < ka; pa++) {
                    aa = nb[pa];
                    var Xa = !0 === Wa ? ab.materials[aa.materialIndex] : oa.material;
                    if (void 0 !== Xa) {
                        la = Xa.side;
                        if (aa instanceof THREE.Face3)
                            if (Y = l[aa.a], da = l[aa.b],
                                Z = l[aa.c], K[0] = Y.positionScreen, K[1] = da.positionScreen, K[2] = Z.positionScreen, !0 === Y.visible || !0 === da.visible || !0 === Z.visible || W.isIntersectionBox(F.setFromPoints(K)))
                                if (ta = 0 > (Z.positionScreen.x - Y.positionScreen.x) * (da.positionScreen.y - Y.positionScreen.y) - (Z.positionScreen.y - Y.positionScreen.y) * (da.positionScreen.x - Y.positionScreen.x), la === THREE.DoubleSide || ta === (la === THREE.FrontSide)) s === p ? (ia = new THREE.RenderableFace3, r.push(ia), p++, s++, n = ia) : n = r[s++], n.v1.copy(Y), n.v2.copy(da), n.v3.copy(Z);
                                else continue;
                        else continue;
                        else if (aa instanceof THREE.Face4)
                            if (Y = l[aa.a], da = l[aa.b], Z = l[aa.c], ia = l[aa.d], L[0] = Y.positionScreen, L[1] = da.positionScreen, L[2] = Z.positionScreen, L[3] = ia.positionScreen, !0 === Y.visible || !0 === da.visible || !0 === Z.visible || !0 === ia.visible || W.isIntersectionBox(F.setFromPoints(L)))
                                if (ta = 0 > (ia.positionScreen.x - Y.positionScreen.x) * (da.positionScreen.y - Y.positionScreen.y) - (ia.positionScreen.y - Y.positionScreen.y) * (da.positionScreen.x - Y.positionScreen.x) || 0 > (da.positionScreen.x - Z.positionScreen.x) *
                                    (ia.positionScreen.y - Z.positionScreen.y) - (da.positionScreen.y - Z.positionScreen.y) * (ia.positionScreen.x - Z.positionScreen.x), la === THREE.DoubleSide || ta === (la === THREE.FrontSide)) {
                                    if (q === v) {
                                        var ub = new THREE.RenderableFace4;
                                        y.push(ub);
                                        v++;
                                        q++;
                                        n = ub
                                    } else n = y[q++];
                                    n.v1.copy(Y);
                                    n.v2.copy(da);
                                    n.v3.copy(Z);
                                    n.v4.copy(ia)
                                } else continue;
                        else continue;
                        n.normalModel.copy(aa.normal);
                        !1 === ta && (la === THREE.BackSide || la === THREE.DoubleSide) && n.normalModel.negate();
                        n.normalModel.applyMatrix3(M).normalize();
                        n.normalModelView.copy(n.normalModel).applyMatrix3(ca);
                        n.centroidModel.copy(aa.centroid).applyMatrix4(Ca);
                        Z = aa.vertexNormals;
                        Y = 0;
                        for (da = Z.length; Y < da; Y++) ia = n.vertexNormalsModel[Y], ia.copy(Z[Y]), !1 === ta && (la === THREE.BackSide || la === THREE.DoubleSide) && ia.negate(), ia.applyMatrix3(M).normalize(), n.vertexNormalsModelView[Y].copy(ia).applyMatrix3(ca);
                        n.vertexNormalsLength = Z.length;
                        Y = 0;
                        for (da = gb.length; Y < da; Y++)
                            if (ia = gb[Y][pa], void 0 !== ia) {
                                la = 0;
                                for (Z = ia.length; la < Z; la++) n.uvs[Y][la] = ia[la]
                            } n.color = aa.color;
                        n.material = Xa;
                        qa.copy(n.centroidModel).applyProjection(fa);
                        n.z = qa.z;
                        E.elements.push(n)
                    }
                }
            } else if (oa instanceof THREE.Line) {
            $a.multiplyMatrices(fa, Ca);
            pa = oa.geometry.vertices;
            Y = b();
            Y.positionScreen.copy(pa[0]).applyMatrix4($a);
            nb = oa.type === THREE.LinePieces ? 2 : 1;
            ka = 1;
            for (aa = pa.length; ka < aa; ka++) Y = b(), Y.positionScreen.copy(pa[ka]).applyMatrix4($a), 0 < (ka + 1) % nb || (da = l[k - 2], ra.copy(Y.positionScreen), N.copy(da.positionScreen), !0 === d(ra, N) && (ra.multiplyScalar(1 / ra.w), N.multiplyScalar(1 / N.w), t === I ? (gb = new THREE.RenderableLine, A.push(gb), I++, t++, z = gb) : z = A[t++], z.v1.positionScreen.copy(ra),
                z.v2.positionScreen.copy(N), z.z = Math.max(ra.z, N.z), z.material = oa.material, E.elements.push(z)))
        }
        g = 0;
        for (m = E.sprites.length; g < m; g++) oa = E.sprites[g].object, Ca = oa.matrixWorld, oa instanceof THREE.Particle && (B.set(Ca.elements[12], Ca.elements[13], Ca.elements[14], 1), B.applyMatrix4(fa), B.z /= B.w, 0 < B.z && 1 > B.z && (x === J ? (ta = new THREE.RenderableParticle, G.push(ta), J++, x++, C = ta) : C = G[x++], C.object = oa, C.x = B.x / B.w, C.y = B.y / B.w, C.z = B.z, C.rotation = oa.rotation.z, C.scale.x = oa.scale.x * Math.abs(C.x - (B.x + h.projectionMatrix.elements[0]) /
            (B.w + h.projectionMatrix.elements[12])), C.scale.y = oa.scale.y * Math.abs(C.y - (B.y + h.projectionMatrix.elements[5]) / (B.w + h.projectionMatrix.elements[13])), C.material = oa.material, E.elements.push(C)));
        !0 === Pa && E.elements.sort(c);
        return E
    }
};

/* Required Dependency */
THREE.Geometry = function() {
    THREE.EventDispatcher.call(this);
    this.id = THREE.GeometryIdCount++;
    this.name = "";
    this.vertices = [];
    this.colors = [];
    this.normals = [];
    this.faces = [];
    this.faceUvs = [
        []
    ];
    this.faceVertexUvs = [
        []
    ];
    this.morphTargets = [];
    this.morphColors = [];
    this.morphNormals = [];
    this.skinWeights = [];
    this.skinIndices = [];
    this.lineDistances = [];
    this.boundingSphere = this.boundingBox = null;
    this.hasTangents = !1;
    this.dynamic = !0;
    this.buffersNeedUpdate = this.lineDistancesNeedUpdate = this.colorsNeedUpdate = this.tangentsNeedUpdate =
        this.normalsNeedUpdate = this.uvsNeedUpdate = this.elementsNeedUpdate = this.verticesNeedUpdate = !1
};
THREE.GeometryIdCount = 0;

/* Required Dependency */
THREE.Camera = function() {
    THREE.Object3D.call(this);
    this.matrixWorldInverse = new THREE.Matrix4;
    this.projectionMatrix = new THREE.Matrix4;
    this.projectionMatrixInverse = new THREE.Matrix4
};
THREE.Camera.prototype = Object.create(THREE.Object3D.prototype);
THREE.Camera.prototype.lookAt = function(a) {
    this.matrix.lookAt(this.position, a, this.up);
    !0 === this.rotationAutoUpdate && (!1 === this.useQuaternion ? this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder) : this.quaternion.copy(this.matrix.decompose()[1]))
};

/* Required Dependency */
THREE.PerspectiveCamera = function(a, b, c, d) {
    THREE.Camera.call(this);
    this.fov = void 0 !== a ? a : 50;
    this.aspect = void 0 !== b ? b : 1;
    this.near = void 0 !== c ? c : 0.1;
    this.far = void 0 !== d ? d : 2E3;
    this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype);
THREE.PerspectiveCamera.prototype.setLens = function(a, b) {
    void 0 === b && (b = 24);
    this.fov = 2 * THREE.Math.radToDeg(Math.atan(b / (2 * a)));
    this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.setViewOffset = function(a, b, c, d, e, f) {
    this.fullWidth = a;
    this.fullHeight = b;
    this.x = c;
    this.y = d;
    this.width = e;
    this.height = f;
    this.updateProjectionMatrix()
};
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function() {
    if (this.fullWidth) {
        var a = this.fullWidth / this.fullHeight,
            b = Math.tan(THREE.Math.degToRad(0.5 * this.fov)) * this.near,
            c = -b,
            d = a * c,
            a = Math.abs(a * b - d),
            c = Math.abs(b - c);
        this.projectionMatrix.makeFrustum(d + this.x * a / this.fullWidth, d + (this.x + this.width) * a / this.fullWidth, b - (this.y + this.height) * c / this.fullHeight, b - this.y * c / this.fullHeight, this.near, this.far)
    } else this.projectionMatrix.makePerspective(this.fov, this.aspect, this.near, this.far)
};

/* Required Dependency */
THREE.Light = function(a) {
    THREE.Object3D.call(this);
    this.color = new THREE.Color(a)
};
THREE.Light.prototype = Object.create(THREE.Object3D.prototype);

/* Required Dependency */
THREE.Material = function() {
    THREE.EventDispatcher.call(this);
    this.id = THREE.MaterialIdCount++;
    this.name = "";
    this.side = THREE.FrontSide;
    this.opacity = 1;
    this.transparent = !1;
    this.blending = THREE.NormalBlending;
    this.blendSrc = THREE.SrcAlphaFactor;
    this.blendDst = THREE.OneMinusSrcAlphaFactor;
    this.blendEquation = THREE.AddEquation;
    this.depthWrite = this.depthTest = !0;
    this.polygonOffset = !1;
    this.alphaTest = this.polygonOffsetUnits = this.polygonOffsetFactor = 0;
    this.overdraw = !1;
    this.needsUpdate = this.visible = !0
};
THREE.Material.prototype.setValues = function(a) {
    if (void 0 !== a)
        for (var b in a) {
            var c = a[b];
            if (void 0 === c) console.warn("THREE.Material: '" + b + "' parameter is undefined.");
            else if (b in this) {
                var d = this[b];
                d instanceof THREE.Color && c instanceof THREE.Color ? d.copy(c) : d instanceof THREE.Color ? d.set(c) : d instanceof THREE.Vector3 && c instanceof THREE.Vector3 ? d.copy(c) : this[b] = c
            }
        }
};
THREE.Material.prototype.clone = function(a) {
    void 0 === a && (a = new THREE.Material);
    a.name = this.name;
    a.side = this.side;
    a.opacity = this.opacity;
    a.transparent = this.transparent;
    a.blending = this.blending;
    a.blendSrc = this.blendSrc;
    a.blendDst = this.blendDst;
    a.blendEquation = this.blendEquation;
    a.depthTest = this.depthTest;
    a.depthWrite = this.depthWrite;
    a.polygonOffset = this.polygonOffset;
    a.polygonOffsetFactor = this.polygonOffsetFactor;
    a.polygonOffsetUnits = this.polygonOffsetUnits;
    a.alphaTest = this.alphaTest;
    a.overdraw = this.overdraw;
    a.visible = this.visible;
    return a
};
THREE.Material.prototype.dispose = function() {
    this.dispatchEvent({
        type: "dispose"
    })
};
THREE.MaterialIdCount = 0;

/* Required Dependency */
THREE.ParticleBasicMaterial = function(a) {
    THREE.Material.call(this);
    this.color = new THREE.Color(16777215);
    this.map = null;
    this.size = 1;
    this.sizeAttenuation = !0;
    this.vertexColors = !1;
    this.fog = !0;
    this.setValues(a)
};
THREE.ParticleBasicMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ParticleBasicMaterial.prototype.clone = function() {
    var a = new THREE.ParticleBasicMaterial;
    THREE.Material.prototype.clone.call(this, a);
    a.color.copy(this.color);
    a.map = this.map;
    a.size = this.size;
    a.sizeAttenuation = this.sizeAttenuation;
    a.vertexColors = this.vertexColors;
    a.fog = this.fog;
    return a
};

/* Required Dependency */
THREE.ParticleCanvasMaterial = function(a) {
    THREE.Material.call(this);
    this.color = new THREE.Color(16777215);
    this.program = function() {};
    this.setValues(a)
};
THREE.ParticleCanvasMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.ParticleCanvasMaterial.prototype.clone = function() {
    var a = new THREE.ParticleCanvasMaterial;
    THREE.Material.prototype.clone.call(this, a);
    a.color.copy(this.color);
    a.program = this.program;
    return a
};

/* Required Dependency */
THREE.Particle = function(a) {
    THREE.Object3D.call(this);
    this.material = a
};
THREE.Particle.prototype = Object.create(THREE.Object3D.prototype);
THREE.Particle.prototype.clone = function(a) {
    void 0 === a && (a = new THREE.Particle(this.material));
    THREE.Object3D.prototype.clone.call(this, a);
    return a
};

/* Required Dependency */
THREE.Line = function(a, b, c) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.material = void 0 !== b ? b : new THREE.LineBasicMaterial({
        color: 16777215 * Math.random()
    });
    this.type = void 0 !== c ? c : THREE.LineStrip;
    this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere())
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = Object.create(THREE.Object3D.prototype);
THREE.Line.prototype.clone = function(a) {
    void 0 === a && (a = new THREE.Line(this.geometry, this.material, this.type));
    THREE.Object3D.prototype.clone.call(this, a);
    return a
};

/* Required Dependency */
THREE.Mesh = function(a, b) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.material = void 0 !== b ? b : new THREE.MeshBasicMaterial({
        color: 16777215 * Math.random(),
        wireframe: !0
    });
    void 0 !== this.geometry && (null === this.geometry.boundingSphere && this.geometry.computeBoundingSphere(), this.updateMorphTargets())
};
THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype);
THREE.Mesh.prototype.updateMorphTargets = function() {
    if (0 < this.geometry.morphTargets.length) {
        this.morphTargetBase = -1;
        this.morphTargetForcedOrder = [];
        this.morphTargetInfluences = [];
        this.morphTargetDictionary = {};
        for (var a = 0, b = this.geometry.morphTargets.length; a < b; a++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[a].name] = a
    }
};
THREE.Mesh.prototype.getMorphTargetIndexByName = function(a) {
    if (void 0 !== this.morphTargetDictionary[a]) return this.morphTargetDictionary[a];
    console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + a + " does not exist. Returning 0.");
    return 0
};
THREE.Mesh.prototype.clone = function(a) {
    void 0 === a && (a = new THREE.Mesh(this.geometry, this.material));
    THREE.Object3D.prototype.clone.call(this, a);
    return a
};

/* Required Dependency */
THREE.Scene = function() {
    THREE.Object3D.call(this);
    this.overrideMaterial = this.fog = null;
    this.matrixAutoUpdate = !1;
    this.__objects = [];
    this.__lights = [];
    this.__objectsAdded = [];
    this.__objectsRemoved = []
};
THREE.Scene.prototype = Object.create(THREE.Object3D.prototype);
THREE.Scene.prototype.__addObject = function(a) {
    if (a instanceof THREE.Light) - 1 === this.__lights.indexOf(a) && this.__lights.push(a), a.target && void 0 === a.target.parent && this.add(a.target);
    else if (!(a instanceof THREE.Camera) && -1 === this.__objects.indexOf(a)) {
        this.__objects.push(a);
        this.__objectsAdded.push(a);
        var b = this.__objectsRemoved.indexOf(a); - 1 !== b && this.__objectsRemoved.splice(b, 1)
    }
    for (b = 0; b < a.children.length; b++) this.__addObject(a.children[b])
};
THREE.Scene.prototype.__removeObject = function(a) {
    if (a instanceof THREE.Light) {
        var b = this.__lights.indexOf(a); - 1 !== b && this.__lights.splice(b, 1)
    } else a instanceof THREE.Camera || (b = this.__objects.indexOf(a), -1 !== b && (this.__objects.splice(b, 1), this.__objectsRemoved.push(a), b = this.__objectsAdded.indexOf(a), -1 !== b && this.__objectsAdded.splice(b, 1)));
    for (b = 0; b < a.children.length; b++) this.__removeObject(a.children[b])
};

/* Maybe Necessary*/
THREE.CanvasRenderer = function(a) {
    function b(a) {
        C !== a && (C = t.globalAlpha = a)
    }

    function c(a) {
        x !== a && (a === THREE.NormalBlending ? t.globalCompositeOperation = "source-over" : a === THREE.AdditiveBlending ? t.globalCompositeOperation = "lighter" : a === THREE.SubtractiveBlending && (t.globalCompositeOperation = "darker"), x = a)
    }

    function d(a) {
        E !== a && (E = t.lineWidth = a)
    }

    function e(a) {
        H !== a && (H = t.lineCap = a)
    }

    function f(a) {
        B !== a && (B = t.lineJoin = a)
    }

    function g(a) {
        G !== a && (G = t.strokeStyle = a)
    }

    function h(a) {
        J !== a && (J = t.fillStyle = a)
    }

    function i(a,
        b) {
        if (W !== a || F !== b) t.setLineDash([a, b]), W = a, F = b
    }
    console.log("THREE.CanvasRenderer", THREE.REVISION);
    var k = THREE.Math.smoothstep,
        a = a || {},
        l = this,
        m, n, s, r = new THREE.Projector,
        p = void 0 !== a.canvas ? a.canvas : document.createElement("canvas"),
        q, y, v, z, t = p.getContext("2d"),
        A = new THREE.Color(0),
        I = 0,
        C = 1,
        x = 0,
        G = null,
        J = null,
        E = null,
        H = null,
        B = null,
        W = null,
        F = 0,
        K, L, U, fa, Ca = new THREE.RenderableVertex,
        $a = new THREE.RenderableVertex,
        M, ca, qa, ha, ra, N, Ma, Na, mb, Pa, ta, ka, aa = new THREE.Color,
        pa = new THREE.Color,
        Y = new THREE.Color,
        da =
        new THREE.Color,
        la = new THREE.Color,
        Z = new THREE.Color,
        oa = new THREE.Color,
        gb = new THREE.Color,
        nb = {},
        ia = {},
        Wa, ab, Fa, Xa, ub, Ib, Jb, fc, Ab, mc, pb = new THREE.Box2,
        Ka = new THREE.Box2,
        Va = new THREE.Box2,
        gc = !1,
        vb = new THREE.Color,
        Qa = new THREE.Color,
        La = new THREE.Color,
        bb = new THREE.Vector3,
        xb, j, yb, Ra, cb, Sa, zb = 16;
    xb = document.createElement("canvas");
    xb.width = xb.height = 2;
    j = xb.getContext("2d");
    j.fillStyle = "rgba(0,0,0,1)";
    j.fillRect(0, 0, 2, 2);
    yb = j.getImageData(0, 0, 2, 2);
    Ra = yb.data;
    cb = document.createElement("canvas");
    cb.width =
        cb.height = zb;
    Sa = cb.getContext("2d");
    Sa.translate(-zb / 2, -zb / 2);
    Sa.scale(zb, zb);
    zb--;
    void 0 === t.setLineDash && (t.setLineDash = void 0 !== t.mozDash ? function(a) {
        t.mozDash = null !== a[0] ? a : null
    } : function() {});
    this.domElement = p;
    this.devicePixelRatio = void 0 !== a.devicePixelRatio ? a.devicePixelRatio : void 0 !== window.devicePixelRatio ? window.devicePixelRatio : 1;
    this.sortElements = this.sortObjects = this.autoClear = !0;
    this.info = {
        render: {
            vertices: 0,
            faces: 0
        }
    };
    this.supportsVertexTextures = function() {};
    this.setFaceCulling = function() {};
    this.setSize = function(a, b) {
        q = a * this.devicePixelRatio;
        y = b * this.devicePixelRatio;
        v = Math.floor(q / 2);
        z = Math.floor(y / 2);
        p.width = q;
        p.height = y;
        p.style.width = a + "px";
        p.style.height = b + "px";
        pb.set(new THREE.Vector2(-v, -z), new THREE.Vector2(v, z));
        Ka.set(new THREE.Vector2(-v, -z), new THREE.Vector2(v, z));
        C = 1;
        x = 0;
        B = H = E = J = G = null
    };
    this.setClearColor = function(a, b) {
        A.copy(a);
        I = void 0 !== b ? b : 1;
        Ka.set(new THREE.Vector2(-v, -z), new THREE.Vector2(v, z))
    };
    this.setClearColorHex = function(a, b) {
        A.setHex(a);
        I = void 0 !== b ? b : 1;
        Ka.set(new THREE.Vector2(-v,
            -z), new THREE.Vector2(v, z))
    };
    this.getMaxAnisotropy = function() {
        return 0
    };
    this.clear = function() {
        t.setTransform(1, 0, 0, -1, v, z);
        !1 === Ka.empty() && (Ka.intersect(pb), Ka.expandByScalar(2), 1 > I && t.clearRect(Ka.min.x | 0, Ka.min.y | 0, Ka.max.x - Ka.min.x | 0, Ka.max.y - Ka.min.y | 0), 0 < I && (c(THREE.NormalBlending), b(1), h("rgba(" + Math.floor(255 * A.r) + "," + Math.floor(255 * A.g) + "," + Math.floor(255 * A.b) + "," + I + ")"), t.fillRect(Ka.min.x | 0, Ka.min.y | 0, Ka.max.x - Ka.min.x | 0, Ka.max.y - Ka.min.y | 0)), Ka.makeEmpty())
    };
    this.render = function(a, p) {
        function q(a,
            b, c) {
            for (var d = 0, e = s.length; d < e; d++) {
                var f = s[d];
                gb.copy(f.color);
                if (f instanceof THREE.DirectionalLight) {
                    var g = bb.getPositionFromMatrix(f.matrixWorld).normalize(),
                        j = b.dot(g);
                    0 >= j || (j *= f.intensity, c.add(gb.multiplyScalar(j)))
                } else f instanceof THREE.PointLight && (g = bb.getPositionFromMatrix(f.matrixWorld), j = b.dot(bb.subVectors(g, a).normalize()), 0 >= j || (j *= 0 == f.distance ? 1 : 1 - Math.min(a.distanceTo(g) / f.distance, 1), 0 != j && (j *= f.intensity, c.add(gb.multiplyScalar(j)))))
            }
        }

        function y(a, b, c, d, e, f) {
            t.beginPath();
            t.moveTo(a, b);
            t.lineTo(c, d);
            t.lineTo(e, f);
            t.closePath()
        }

        function B(a, b, c, d, e, f, g, j) {
            t.beginPath();
            t.moveTo(a, b);
            t.lineTo(c, d);
            t.lineTo(e, f);
            t.lineTo(g, j);
            t.closePath()
        }

        function C(a, b, c, j) {
            d(b);
            e(c);
            f(j);
            g(a.getStyle());
            t.stroke();
            Va.expandByScalar(2 * b)
        }

        function A(a) {
            h(a.getStyle());
            t.fill()
        }

        function F(a, b, c, d, e, f, g, j, i, wa, k, l, n) {
            if (!(n instanceof THREE.DataTexture || void 0 === n.image || 0 == n.image.width)) {
                if (!0 === n.needsUpdate) {
                    var m = n.wrapS == THREE.RepeatWrapping,
                        hb = n.wrapT == THREE.RepeatWrapping;
                    nb[n.id] = t.createPattern(n.image, !0 === m && !0 === hb ? "repeat" : !0 === m && !1 === hb ? "repeat-x" : !1 === m && !0 === hb ? "repeat-y" : "no-repeat");
                    n.needsUpdate = !1
                }
                void 0 === nb[n.id] ? h("rgba(0,0,0,1)") : h(nb[n.id]);
                var m = n.offset.x /
                    n.repeat.x,
                    hb = n.offset.y / n.repeat.y,
                    p = n.image.width * n.repeat.x,
                    q = n.image.height * n.repeat.y,
                    g = (g + m) * p,
                    j = (1 - j + hb) * q,
                    c = c - a,
                    d = d - b,
                    e = e - a,
                    f = f - b,
                    i = (i + m) * p - g,
                    wa = (1 - wa + hb) * q - j,
                    k = (k + m) * p - g,
                    l = (1 - l + hb) * q - j,
                    m = i * l - k * wa;
                0 === m ? (void 0 === ia[n.id] && (b = document.createElement("canvas"), b.width = n.image.width, b.height = n.image.height, b = b.getContext("2d"), b.drawImage(n.image, 0, 0), ia[n.id] = b.getImageData(0, 0, n.image.width, n.image.height).data), b = ia[n.id], g = 4 * (Math.floor(g) + Math.floor(j) * n.image.width), aa.setRGB(b[g] / 255,
                    b[g + 1] / 255, b[g + 2] / 255), A(aa)) : (m = 1 / m, n = (l * c - wa * e) * m, wa = (l * d - wa * f) * m, c = (i * e - k * c) * m, d = (i * f - k * d) * m, a = a - n * g - c * j, g = b - wa * g - d * j, t.save(), t.transform(n, wa, c, d, a, g), t.fill(), t.restore())
            }
        }

        function G(a, b, c, d, e, f, g, j, i, h, wa, k, n) {
            var l, m;
            l = n.width - 1;
            m = n.height - 1;
            g *= l;
            j *= m;
            c -= a;
            d -= b;
            e -= a;
            f -= b;
            i = i * l - g;
            h = h * m - j;
            wa = wa * l - g;
            k = k * m - j;
            m = 1 / (i * k - wa * h);
            l = (k * c - h * e) * m;
            h = (k * d - h * f) * m;
            c = (i * e - wa * c) * m;
            d = (i * f - wa * d) * m;
            a = a - l * g - c * j;
            b = b - h * g - d * j;
            t.save();
            t.transform(l, h, c, d, a, b);
            t.clip();
            t.drawImage(n, 0, 0);
            t.restore()
        }

        function E(a, b,
            c, d) {
            Ra[0] = 255 * a.r | 0;
            Ra[1] = 255 * a.g | 0;
            Ra[2] = 255 * a.b | 0;
            Ra[4] = 255 * b.r | 0;
            Ra[5] = 255 * b.g | 0;
            Ra[6] = 255 * b.b | 0;
            Ra[8] = 255 * c.r | 0;
            Ra[9] = 255 * c.g | 0;
            Ra[10] = 255 * c.b | 0;
            Ra[12] = 255 * d.r | 0;
            Ra[13] = 255 * d.g | 0;
            Ra[14] = 255 * d.b | 0;
            j.putImageData(yb, 0, 0);
            Sa.drawImage(xb, 0, 0);
            return cb
        }

        function I(a, b) {
            var c = b.x - a.x,
                d = b.y - a.y,
                e = c * c + d * d;
            0 !== e && (e = 1 / Math.sqrt(e), c *= e, d *= e, b.x += c, b.y += d, a.x -= c, a.y -= d)
        }
        if (!1 === p instanceof THREE.Camera) console.error("THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera.");
        else {
            !0 ===
                this.autoClear && this.clear();
            t.setTransform(1, 0, 0, -1, v, z);
            l.info.render.vertices = 0;
            l.info.render.faces = 0;
            m = r.projectScene(a, p, this.sortObjects, this.sortElements);
            n = m.elements;
            s = m.lights;
            gc = 0 < s.length;
            if (!0 === gc) {
                vb.setRGB(0, 0, 0);
                Qa.setRGB(0, 0, 0);
                La.setRGB(0, 0, 0);
                for (var J = 0, W = s.length; J < W; J++) {
                    var P = s[J],
                        X = P.color;
                    P instanceof THREE.AmbientLight ? vb.add(X) : P instanceof THREE.DirectionalLight ? Qa.add(X) : P instanceof THREE.PointLight && La.add(X)
                }
            }
            J = 0;
            for (W = n.length; J < W; J++) {
                var H = n[J],
                    P = H.material;
                if (!(void 0 ===
                        P || !1 === P.visible)) {
                    Va.makeEmpty();
                    if (H instanceof THREE.RenderableParticle) {
                        K = H;
                        K.x *= v;
                        K.y *= z;
                        var X = K,
                            wa = H;
                        b(P.opacity);
                        c(P.blending);
                        var Bb = void 0,
                            hb = void 0,
                            Cb = void 0,
                            Db = void 0,
                            md = H = void 0,
                            nd = void 0;
                        P instanceof THREE.ParticleBasicMaterial ? null === P.map ? (Cb = wa.object.scale.x, Db = wa.object.scale.y, Cb *= wa.scale.x * v, Db *= wa.scale.y * z, Va.min.set(X.x - Cb, X.y - Db), Va.max.set(X.x + Cb, X.y + Db), !1 !== pb.isIntersectionBox(Va) && (h(P.color.getStyle()), t.save(), t.translate(X.x, X.y), t.rotate(-wa.rotation), t.scale(Cb,
                            Db), t.fillRect(-1, -1, 2, 2), t.restore())) : (H = P.map.image, md = H.width >> 1, nd = H.height >> 1, Cb = wa.scale.x * v, Db = wa.scale.y * z, Bb = Cb * md, hb = Db * nd, Va.min.set(X.x - Bb, X.y - hb), Va.max.set(X.x + Bb, X.y + hb), !1 !== pb.isIntersectionBox(Va) && (t.save(), t.translate(X.x, X.y), t.rotate(-wa.rotation), t.scale(Cb, -Db), t.translate(-md, -nd), t.drawImage(H, 0, 0), t.restore())) : P instanceof THREE.ParticleCanvasMaterial && (Bb = wa.scale.x * v, hb = wa.scale.y * z, Va.min.set(X.x - Bb, X.y - hb), Va.max.set(X.x + Bb, X.y + hb), !1 !== pb.isIntersectionBox(Va) && (g(P.color.getStyle()),
                            h(P.color.getStyle()), t.save(), t.translate(X.x, X.y), t.rotate(-wa.rotation), t.scale(Bb, hb), P.program(t), t.restore()))
                    } else if (H instanceof THREE.RenderableLine) K = H.v1, L = H.v2, K.positionScreen.x *= v, K.positionScreen.y *= z, L.positionScreen.x *= v, L.positionScreen.y *= z, Va.setFromPoints([K.positionScreen, L.positionScreen]), !0 === pb.isIntersectionBox(Va) && (X = K, wa = L, b(P.opacity), c(P.blending), t.beginPath(), t.moveTo(X.positionScreen.x, X.positionScreen.y), t.lineTo(wa.positionScreen.x, wa.positionScreen.y), P instanceof THREE.LineBasicMaterial ? (d(P.linewidth), e(P.linecap), f(P.linejoin), g(P.color.getStyle()), i(null, null), t.stroke(), Va.expandByScalar(2 * P.linewidth)) : P instanceof THREE.LineDashedMaterial && (d(P.linewidth), e(P.linecap), f(P.linejoin), g(P.color.getStyle()), i(P.dashSize, P.gapSize), t.stroke(), Va.expandByScalar(2 * P.linewidth)));
                    else if (H instanceof THREE.RenderableFace3) {
                        K = H.v1;
                        L = H.v2;
                        U = H.v3;
                        if (-1 > K.positionScreen.z || 1 < K.positionScreen.z) continue;
                        if (-1 > L.positionScreen.z || 1 < L.positionScreen.z) continue;
                        if (-1 >
                            U.positionScreen.z || 1 < U.positionScreen.z) continue;
                        K.positionScreen.x *= v;
                        K.positionScreen.y *= z;
                        L.positionScreen.x *= v;
                        L.positionScreen.y *= z;
                        U.positionScreen.x *= v;
                        U.positionScreen.y *= z;
                        !0 === P.overdraw && (I(K.positionScreen, L.positionScreen), I(L.positionScreen, U.positionScreen), I(U.positionScreen, K.positionScreen));
                        Va.setFromPoints([K.positionScreen, L.positionScreen, U.positionScreen]);
                        x(K, L, U, 0, 1, 2, H, P)
                    } else if (H instanceof THREE.RenderableFace4) {
                        K = H.v1;
                        L = H.v2;
                        U = H.v3;
                        fa = H.v4;
                        if (-1 > K.positionScreen.z ||
                            1 < K.positionScreen.z) continue;
                        if (-1 > L.positionScreen.z || 1 < L.positionScreen.z) continue;
                        if (-1 > U.positionScreen.z || 1 < U.positionScreen.z) continue;
                        if (-1 > fa.positionScreen.z || 1 < fa.positionScreen.z) continue;
                        K.positionScreen.x *= v;
                        K.positionScreen.y *= z;
                        L.positionScreen.x *= v;
                        L.positionScreen.y *= z;
                        U.positionScreen.x *= v;
                        U.positionScreen.y *= z;
                        fa.positionScreen.x *= v;
                        fa.positionScreen.y *= z;
                        Ca.positionScreen.copy(L.positionScreen);
                        $a.positionScreen.copy(fa.positionScreen);
                        !0 === P.overdraw && (I(K.positionScreen, L.positionScreen),
                            I(L.positionScreen, fa.positionScreen), I(fa.positionScreen, K.positionScreen), I(U.positionScreen, Ca.positionScreen), I(U.positionScreen, $a.positionScreen));
                        Va.setFromPoints([K.positionScreen, L.positionScreen, U.positionScreen, fa.positionScreen]);
                        X = K;
                        wa = L;
                        Bb = U;
                        hb = fa;
                        Cb = Ca;
                        Db = $a;
                        l.info.render.vertices += 4;
                        l.info.render.faces++;
                        b(P.opacity);
                        c(P.blending);
                        void 0 !== P.map && null !== P.map || void 0 !== P.envMap && null !== P.envMap ? (x(X, wa, hb, 0, 1, 3, H, P), x(Cb, Bb, Db, 1, 2, 3, H, P)) : (M = X.positionScreen.x, ca = X.positionScreen.y,
                            qa = wa.positionScreen.x, ha = wa.positionScreen.y, ra = Bb.positionScreen.x, N = Bb.positionScreen.y, Ma = hb.positionScreen.x, Na = hb.positionScreen.y, mb = Cb.positionScreen.x, Pa = Cb.positionScreen.y, ta = Db.positionScreen.x, ka = Db.positionScreen.y, P instanceof THREE.MeshLambertMaterial || P instanceof THREE.MeshPhongMaterial ? (Z.copy(P.color), oa.copy(P.emissive), P.vertexColors === THREE.FaceColors && Z.multiply(H.color), !0 === gc ? !1 === P.wireframe && P.shading == THREE.SmoothShading && 4 == H.vertexNormalsLength ? (pa.copy(vb), Y.copy(vb),
                                da.copy(vb), la.copy(vb), q(H.v1.positionWorld, H.vertexNormalsModel[0], pa), q(H.v2.positionWorld, H.vertexNormalsModel[1], Y), q(H.v4.positionWorld, H.vertexNormalsModel[3], da), q(H.v3.positionWorld, H.vertexNormalsModel[2], la), pa.multiply(Z).add(oa), Y.multiply(Z).add(oa), da.multiply(Z).add(oa), la.multiply(Z).add(oa), Fa = E(pa, Y, da, la), y(M, ca, qa, ha, Ma, Na), G(M, ca, qa, ha, Ma, Na, 0, 0, 1, 0, 0, 1, Fa), y(mb, Pa, ra, N, ta, ka), G(mb, Pa, ra, N, ta, ka, 1, 0, 1, 1, 0, 1, Fa)) : (aa.copy(vb), q(H.centroidModel, H.normalModel, aa), aa.multiply(Z).add(oa),
                                B(M, ca, qa, ha, ra, N, Ma, Na), !0 === P.wireframe ? C(aa, P.wireframeLinewidth, P.wireframeLinecap, P.wireframeLinejoin) : A(aa)) : (aa.addColors(Z, oa), B(M, ca, qa, ha, ra, N, Ma, Na), !0 === P.wireframe ? C(aa, P.wireframeLinewidth, P.wireframeLinecap, P.wireframeLinejoin) : A(aa))) : P instanceof THREE.MeshBasicMaterial ? (aa.copy(P.color), P.vertexColors === THREE.FaceColors && aa.multiply(H.color), B(M, ca, qa, ha, ra, N, Ma, Na), !0 === P.wireframe ? C(aa, P.wireframeLinewidth, P.wireframeLinecap, P.wireframeLinejoin) : A(aa)) : P instanceof THREE.MeshNormalMaterial ?
                            (X = void 0, P.shading == THREE.FlatShading ? (X = H.normalModelView, aa.setRGB(X.x, X.y, X.z).multiplyScalar(0.5).addScalar(0.5), B(M, ca, qa, ha, ra, N, Ma, Na), !0 === P.wireframe ? C(aa, P.wireframeLinewidth, P.wireframeLinecap, P.wireframeLinejoin) : A(aa)) : P.shading == THREE.SmoothShading && (X = H.vertexNormalsModelView[0], pa.setRGB(X.x, X.y, X.z).multiplyScalar(0.5).addScalar(0.5), X = H.vertexNormalsModelView[1], Y.setRGB(X.x, X.y, X.z).multiplyScalar(0.5).addScalar(0.5), X = H.vertexNormalsModelView[3], da.setRGB(X.x, X.y, X.z).multiplyScalar(0.5).addScalar(0.5),
                                X = H.vertexNormalsModelView[2], la.setRGB(X.x, X.y, X.z).multiplyScalar(0.5).addScalar(0.5), Fa = E(pa, Y, da, la), y(M, ca, qa, ha, Ma, Na), G(M, ca, qa, ha, Ma, Na, 0, 0, 1, 0, 0, 1, Fa), y(mb, Pa, ra, N, ta, ka), G(mb, Pa, ra, N, ta, ka, 1, 0, 1, 1, 0, 1, Fa))) : P instanceof THREE.MeshDepthMaterial && (Wa = p.near, ab = p.far, pa.r = pa.g = pa.b = 1 - k(X.positionScreen.z * X.positionScreen.w, Wa, ab), Y.r = Y.g = Y.b = 1 - k(wa.positionScreen.z * wa.positionScreen.w, Wa, ab), da.r = da.g = da.b = 1 - k(hb.positionScreen.z * hb.positionScreen.w, Wa, ab), la.r = la.g = la.b = 1 - k(Bb.positionScreen.z *
                                Bb.positionScreen.w, Wa, ab), Fa = E(pa, Y, da, la), y(M, ca, qa, ha, Ma, Na), G(M, ca, qa, ha, Ma, Na, 0, 0, 1, 0, 0, 1, Fa), y(mb, Pa, ra, N, ta, ka), G(mb, Pa, ra, N, ta, ka, 1, 0, 1, 1, 0, 1, Fa)))
                    }
                    Ka.union(Va)
                }
            }
            t.setTransform(1, 0, 0, 1, 0, 0)
        }
    }
};

/* Required Dependency */
THREE.WebGLRenderTarget = function(a, b, c) {
    THREE.EventDispatcher.call(this);
    this.width = a;
    this.height = b;
    c = c || {};
    this.wrapS = void 0 !== c.wrapS ? c.wrapS : THREE.ClampToEdgeWrapping;
    this.wrapT = void 0 !== c.wrapT ? c.wrapT : THREE.ClampToEdgeWrapping;
    this.magFilter = void 0 !== c.magFilter ? c.magFilter : THREE.LinearFilter;
    this.minFilter = void 0 !== c.minFilter ? c.minFilter : THREE.LinearMipMapLinearFilter;
    this.anisotropy = void 0 !== c.anisotropy ? c.anisotropy : 1;
    this.offset = new THREE.Vector2(0, 0);
    this.repeat = new THREE.Vector2(1, 1);
    this.format = void 0 !== c.format ? c.format : THREE.RGBAFormat;
    this.type = void 0 !== c.type ? c.type : THREE.UnsignedByteType;
    this.depthBuffer = void 0 !== c.depthBuffer ? c.depthBuffer : !0;
    this.stencilBuffer = void 0 !== c.stencilBuffer ? c.stencilBuffer : !0;
    this.generateMipmaps = !0;
    this.shareDepthFrom = null
};
THREE.WebGLRenderTarget.prototype.clone = function() {
    var a = new THREE.WebGLRenderTarget(this.width, this.height);
    a.wrapS = this.wrapS;
    a.wrapT = this.wrapT;
    a.magFilter = this.magFilter;
    a.minFilter = this.minFilter;
    a.anisotropy = this.anisotropy;
    a.offset.copy(this.offset);
    a.repeat.copy(this.repeat);
    a.format = this.format;
    a.type = this.type;
    a.depthBuffer = this.depthBuffer;
    a.stencilBuffer = this.stencilBuffer;
    a.generateMipmaps = this.generateMipmaps;
    a.shareDepthFrom = this.shareDepthFrom;
    return a
};
THREE.WebGLRenderTarget.prototype.dispose = function() {
    this.dispatchEvent({
        type: "dispose"
    })
};
THREE.RenderableVertex = function() {
    this.positionWorld = new THREE.Vector3;
    this.positionScreen = new THREE.Vector4;
    this.visible = !0
};
THREE.RenderableVertex.prototype.copy = function(a) {
    this.positionWorld.copy(a.positionWorld);
    this.positionScreen.copy(a.positionScreen)
};
THREE.RenderableFace3 = function() {
    this.v1 = new THREE.RenderableVertex;
    this.v2 = new THREE.RenderableVertex;
    this.v3 = new THREE.RenderableVertex;
    this.centroidModel = new THREE.Vector3;
    this.normalModel = new THREE.Vector3;
    this.normalModelView = new THREE.Vector3;
    this.vertexNormalsLength = 0;
    this.vertexNormalsModel = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
    this.vertexNormalsModelView = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
    this.material = this.color = null;
    this.uvs = [
        []
    ];
    this.z = null
};
THREE.RenderableObject = function() {
    this.z = this.object = null
};
THREE.RenderableParticle = function() {
    this.rotation = this.z = this.y = this.x = this.object = null;
    this.scale = new THREE.Vector2;
    this.material = null
};
THREE.RenderableLine = function() {
    this.z = null;
    this.v1 = new THREE.RenderableVertex;
    this.v2 = new THREE.RenderableVertex;
    this.material = null
};

/* Required Dependency */
THREE.ExtrudeGeometry = function(a, b) {
    "undefined" !== typeof a && (THREE.Geometry.call(this), a = a instanceof Array ? a : [a], this.shapebb = a[a.length - 1].getBoundingBox(), this.addShapeList(a, b), this.computeCentroids(), this.computeFaceNormals())
};
THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype);


/* Non-framework code */
var SEPARATION = 100,
    AMOUNTX = 100,
    AMOUNTY = 70;

var container;
var camera, scene, renderer;

var particles, particle, count = 0;

var mouseX = 85,
    mouseY = -342;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

    container = document.createElement('div');
    document.getElementById('welcome-section').appendChild(container);

    camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    particles = new Array();

    var PI2 = Math.PI * 2;
    var material = new THREE.ParticleCanvasMaterial({

        color: 0xe1e1e1,
        program: function(context) {

            context.beginPath();
            context.arc(0, 0, .6, 0, PI2, true);
            context.fill();

        }

    });

    var i = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {

        for (var iy = 0; iy < AMOUNTY; iy++) {

            particle = particles[i++] = new THREE.Particle(material);
            particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
            particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
            scene.add(particle);

        }

    }

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    document.getElementById('welcome-section').addEventListener('mousemove', onDocumentMouseMove, false);
    document.getElementById('welcome-section').addEventListener('touchstart', onDocumentTouchStart, false);
    document.getElementById('welcome-section').addEventListener('touchmove', onDocumentTouchMove, false);

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart(event) {

    if (event.touches.length === 1) {

        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;

    }

}

function onDocumentTouchMove(event) {

    if (event.touches.length === 1) {

        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;

    }

}

function animate() {

    requestAnimationFrame(animate);

    render();


}

function render() {

    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (-mouseY - camera.position.y) * .05;
    camera.lookAt(scene.position);

    var i = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {

        for (var iy = 0; iy < AMOUNTY; iy++) {

            particle = particles[i++];
            particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
            particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;

        }

    }

    renderer.render(scene, camera);

    count += 0.1;

}
