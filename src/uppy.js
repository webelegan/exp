! function(e) {
	if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
	else if ("function" == typeof define && define.amd) define([], e);
	else {
		("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Uppy = e()
	}
}((function() {
	return function e(t, i, r) {
		function s(o, a) {
			if (!i[o]) {
				if (!t[o]) {
					var l = "function" == typeof require && require;
					if (!a && l) return l(o, !0);
					if (n) return n(o, !0);
					var u = new Error("Cannot find module '" + o + "'");
					throw u.code = "MODULE_NOT_FOUND", u
				}
				var p = i[o] = {
					exports: {}
				};
				t[o][0].call(p.exports, (function(e) {
					return s(t[o][1][e] || e)
				}), p, p.exports, e, t, i, r)
			}
			return i[o].exports
		}
		for (var n = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
		return s
	}({
		1: [function(e, t, i) {
			function r(e) {
				if (e) return function(e) {
					for (var t in r.prototype) e[t] = r.prototype[t];
					return e
				}(e)
			}
			i.Emitter = r, r.prototype.on = r.prototype.addEventListener = function(e, t) {
				return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
			}, r.prototype.once = function(e, t) {
				function i() {
					this.off(e, i), t.apply(this, arguments)
				}
				return i.fn = t, this.on(e, i), this
			}, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(e, t) {
				if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
				var i, r = this._callbacks["$" + e];
				if (!r) return this;
				if (1 == arguments.length) return delete this._callbacks["$" + e], this;
				for (var s = 0; s < r.length; s++)
					if ((i = r[s]) === t || i.fn === t) {
						r.splice(s, 1);
						break
					} return 0 === r.length && delete this._callbacks["$" + e], this
			}, r.prototype.emit = function(e) {
				this._callbacks = this._callbacks || {};
				for (var t = new Array(arguments.length - 1), i = this._callbacks["$" + e], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
				if (i) {
					r = 0;
					for (var s = (i = i.slice(0)).length; r < s; ++r) i[r].apply(this, t)
				}
				return this
			}, r.prototype.emitReserved = r.prototype.emit, r.prototype.listeners = function(e) {
				return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
			}, r.prototype.hasListeners = function(e) {
				return !!this.listeners(e).length
			}
		}, {}],
		2: [function(e, t, i) {
			t.exports = function(e) {
				if ("number" != typeof e || isNaN(e)) throw new TypeError("Expected a number, got " + typeof e);
				var t = e < 0,
					i = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
				if (t && (e = -e), e < 1) return (t ? "-" : "") + e + " B";
				var r = Math.min(Math.floor(Math.log(e) / Math.log(1024)), i.length - 1);
				e = Number(e / Math.pow(1024, r));
				var s = i[r];
				return e >= 10 || e % 1 == 0 ? (t ? "-" : "") + e.toFixed(0) + " " + s : (t ? "-" : "") + e.toFixed(1) + " " + s
			}
		}, {}],
		3: [function(e, t, i) {
			function r(e) {
				e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0
			}
			t.exports = r, r.prototype.duration = function() {
				var e = this.ms * Math.pow(this.factor, this.attempts++);
				if (this.jitter) {
					var t = Math.random(),
						i = Math.floor(t * this.jitter * e);
					e = 0 == (1 & Math.floor(10 * t)) ? e - i : e + i
				}
				return 0 | Math.min(e, this.max)
			}, r.prototype.reset = function() {
				this.attempts = 0
			}, r.prototype.setMin = function(e) {
				this.ms = e
			}, r.prototype.setMax = function(e) {
				this.max = e
			}, r.prototype.setJitter = function(e) {
				this.jitter = e
			}
		}, {}],
		4: [function(e, t, i) {
			"use strict";
			i.byteLength = function(e) {
				var t = u(e),
					i = t[0],
					r = t[1];
				return 3 * (i + r) / 4 - r
			}, i.toByteArray = function(e) {
				var t, i, r = u(e),
					o = r[0],
					a = r[1],
					l = new n(function(e, t, i) {
						return 3 * (t + i) / 4 - i
					}(0, o, a)),
					p = 0,
					c = a > 0 ? o - 4 : o;
				for (i = 0; i < c; i += 4) t = s[e.charCodeAt(i)] << 18 | s[e.charCodeAt(i + 1)] << 12 | s[e.charCodeAt(i + 2)] << 6 | s[e.charCodeAt(i + 3)], l[p++] = t >> 16 & 255, l[p++] = t >> 8 & 255, l[p++] = 255 & t;
				2 === a && (t = s[e.charCodeAt(i)] << 2 | s[e.charCodeAt(i + 1)] >> 4, l[p++] = 255 & t);
				1 === a && (t = s[e.charCodeAt(i)] << 10 | s[e.charCodeAt(i + 1)] << 4 | s[e.charCodeAt(i + 2)] >> 2, l[p++] = t >> 8 & 255, l[p++] = 255 & t);
				return l
			}, i.fromByteArray = function(e) {
				for (var t, i = e.length, s = i % 3, n = [], o = 16383, a = 0, l = i - s; a < l; a += o) n.push(p(e, a, a + o > l ? l : a + o));
				1 === s ? (t = e[i - 1], n.push(r[t >> 2] + r[t << 4 & 63] + "==")) : 2 === s && (t = (e[i - 2] << 8) + e[i - 1], n.push(r[t >> 10] + r[t >> 4 & 63] + r[t << 2 & 63] + "="));
				return n.join("")
			};
			for (var r = [], s = [], n = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, l = o.length; a < l; ++a) r[a] = o[a], s[o.charCodeAt(a)] = a;

			function u(e) {
				var t = e.length;
				if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
				var i = e.indexOf("=");
				return -1 === i && (i = t), [i, i === t ? 0 : 4 - i % 4]
			}

			function p(e, t, i) {
				for (var s, n, o = [], a = t; a < i; a += 3) s = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]), o.push(r[(n = s) >> 18 & 63] + r[n >> 12 & 63] + r[n >> 6 & 63] + r[63 & n]);
				return o.join("")
			}
			s["-".charCodeAt(0)] = 62, s["_".charCodeAt(0)] = 63
		}, {}],
		5: [function(e, t, i) {
			(function(t) {
				(function() {
					/*!
					 * The buffer module from node.js, for the browser.
					 *
					 * @author   Feross Aboukhadijeh <https://feross.org>
					 * @license  MIT
					 */
					"use strict";
					var t = e("base64-js"),
						r = e("ieee754");
					i.Buffer = o, i.SlowBuffer = function(e) {
						+e != e && (e = 0);
						return o.alloc(+e)
					}, i.INSPECT_MAX_BYTES = 50;
					var s = 2147483647;

					function n(e) {
						if (e > s) throw new RangeError('The value "' + e + '" is invalid for option "size"');
						var t = new Uint8Array(e);
						return t.__proto__ = o.prototype, t
					}

					function o(e, t, i) {
						if ("number" == typeof e) {
							if ("string" == typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
							return u(e)
						}
						return a(e, t, i)
					}

					function a(e, t, i) {
						if ("string" == typeof e) return function(e, t) {
							"string" == typeof t && "" !== t || (t = "utf8");
							if (!o.isEncoding(t)) throw new TypeError("Unknown encoding: " + t);
							var i = 0 | h(e, t),
								r = n(i),
								s = r.write(e, t);
							s !== i && (r = r.slice(0, s));
							return r
						}(e, t);
						if (ArrayBuffer.isView(e)) return p(e);
						if (null == e) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
						if (L(e, ArrayBuffer) || e && L(e.buffer, ArrayBuffer)) return function(e, t, i) {
							if (t < 0 || e.byteLength < t) throw new RangeError('"offset" is outside of buffer bounds');
							if (e.byteLength < t + (i || 0)) throw new RangeError('"length" is outside of buffer bounds');
							var r;
							r = void 0 === t && void 0 === i ? new Uint8Array(e) : void 0 === i ? new Uint8Array(e, t) : new Uint8Array(e, t, i);
							return r.__proto__ = o.prototype, r
						}(e, t, i);
						if ("number" == typeof e) throw new TypeError('The "value" argument must not be of type number. Received type number');
						var r = e.valueOf && e.valueOf();
						if (null != r && r !== e) return o.from(r, t, i);
						var s = function(e) {
							if (o.isBuffer(e)) {
								var t = 0 | c(e.length),
									i = n(t);
								return 0 === i.length || e.copy(i, 0, 0, t), i
							}
							if (void 0 !== e.length) return "number" != typeof e.length || z(e.length) ? n(0) : p(e);
							if ("Buffer" === e.type && Array.isArray(e.data)) return p(e.data)
						}(e);
						if (s) return s;
						if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive]) return o.from(e[Symbol.toPrimitive]("string"), t, i);
						throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
					}

					function l(e) {
						if ("number" != typeof e) throw new TypeError('"size" argument must be of type number');
						if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"')
					}

					function u(e) {
						return l(e), n(e < 0 ? 0 : 0 | c(e))
					}

					function p(e) {
						for (var t = e.length < 0 ? 0 : 0 | c(e.length), i = n(t), r = 0; r < t; r += 1) i[r] = 255 & e[r];
						return i
					}

					function c(e) {
						if (e >= s) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
						return 0 | e
					}

					function h(e, t) {
						if (o.isBuffer(e)) return e.length;
						if (ArrayBuffer.isView(e) || L(e, ArrayBuffer)) return e.byteLength;
						if ("string" != typeof e) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
						var i = e.length,
							r = arguments.length > 2 && !0 === arguments[2];
						if (!r && 0 === i) return 0;
						for (var s = !1;;) switch (t) {
							case "ascii":
							case "latin1":
							case "binary":
								return i;
							case "utf8":
							case "utf-8":
								return N(e).length;
							case "ucs2":
							case "ucs-2":
							case "utf16le":
							case "utf-16le":
								return 2 * i;
							case "hex":
								return i >>> 1;
							case "base64":
								return M(e).length;
							default:
								if (s) return r ? -1 : N(e).length;
								t = ("" + t).toLowerCase(), s = !0
						}
					}

					function d(e, t, i) {
						var r = !1;
						if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
						if ((void 0 === i || i > this.length) && (i = this.length), i <= 0) return "";
						if ((i >>>= 0) <= (t >>>= 0)) return "";
						for (e || (e = "utf8");;) switch (e) {
							case "hex":
								return F(this, t, i);
							case "utf8":
							case "utf-8":
								return C(this, t, i);
							case "ascii":
								return x(this, t, i);
							case "latin1":
							case "binary":
								return _(this, t, i);
							case "base64":
								return k(this, t, i);
							case "ucs2":
							case "ucs-2":
							case "utf16le":
							case "utf-16le":
								return O(this, t, i);
							default:
								if (r) throw new TypeError("Unknown encoding: " + e);
								e = (e + "").toLowerCase(), r = !0
						}
					}

					function f(e, t, i) {
						var r = e[t];
						e[t] = e[i], e[i] = r
					}

					function m(e, t, i, r, s) {
						if (0 === e.length) return -1;
						if ("string" == typeof i ? (r = i, i = 0) : i > 2147483647 ? i = 2147483647 : i < -2147483648 && (i = -2147483648), z(i = +i) && (i = s ? 0 : e.length - 1), i < 0 && (i = e.length + i), i >= e.length) {
							if (s) return -1;
							i = e.length - 1
						} else if (i < 0) {
							if (!s) return -1;
							i = 0
						}
						if ("string" == typeof t && (t = o.from(t, r)), o.isBuffer(t)) return 0 === t.length ? -1 : g(e, t, i, r, s);
						if ("number" == typeof t) return t &= 255, "function" == typeof Uint8Array.prototype.indexOf ? s ? Uint8Array.prototype.indexOf.call(e, t, i) : Uint8Array.prototype.lastIndexOf.call(e, t, i) : g(e, [t], i, r, s);
						throw new TypeError("val must be string, number or Buffer")
					}

					function g(e, t, i, r, s) {
						var n, o = 1,
							a = e.length,
							l = t.length;
						if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
							if (e.length < 2 || t.length < 2) return -1;
							o = 2, a /= 2, l /= 2, i /= 2
						}

						function u(e, t) {
							return 1 === o ? e[t] : e.readUInt16BE(t * o)
						}
						if (s) {
							var p = -1;
							for (n = i; n < a; n++)
								if (u(e, n) === u(t, -1 === p ? 0 : n - p)) {
									if (-1 === p && (p = n), n - p + 1 === l) return p * o
								} else -1 !== p && (n -= n - p), p = -1
						} else
							for (i + l > a && (i = a - l), n = i; n >= 0; n--) {
								for (var c = !0, h = 0; h < l; h++)
									if (u(e, n + h) !== u(t, h)) {
										c = !1;
										break
									} if (c) return n
							}
						return -1
					}

					function y(e, t, i, r) {
						i = Number(i) || 0;
						var s = e.length - i;
						r ? (r = Number(r)) > s && (r = s) : r = s;
						var n = t.length;
						r > n / 2 && (r = n / 2);
						for (var o = 0; o < r; ++o) {
							var a = parseInt(t.substr(2 * o, 2), 16);
							if (z(a)) return o;
							e[i + o] = a
						}
						return o
					}

					function v(e, t, i, r) {
						return j(N(t, e.length - i), e, i, r)
					}

					function b(e, t, i, r) {
						return j(function(e) {
							for (var t = [], i = 0; i < e.length; ++i) t.push(255 & e.charCodeAt(i));
							return t
						}(t), e, i, r)
					}

					function w(e, t, i, r) {
						return b(e, t, i, r)
					}

					function S(e, t, i, r) {
						return j(M(t), e, i, r)
					}

					function P(e, t, i, r) {
						return j(function(e, t) {
							for (var i, r, s, n = [], o = 0; o < e.length && !((t -= 2) < 0); ++o) r = (i = e.charCodeAt(o)) >> 8, s = i % 256, n.push(s), n.push(r);
							return n
						}(t, e.length - i), e, i, r)
					}

					function k(e, i, r) {
						return 0 === i && r === e.length ? t.fromByteArray(e) : t.fromByteArray(e.slice(i, r))
					}

					function C(e, t, i) {
						i = Math.min(e.length, i);
						for (var r = [], s = t; s < i;) {
							var n, o, a, l, u = e[s],
								p = null,
								c = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
							if (s + c <= i) switch (c) {
								case 1:
									u < 128 && (p = u);
									break;
								case 2:
									128 == (192 & (n = e[s + 1])) && (l = (31 & u) << 6 | 63 & n) > 127 && (p = l);
									break;
								case 3:
									n = e[s + 1], o = e[s + 2], 128 == (192 & n) && 128 == (192 & o) && (l = (15 & u) << 12 | (63 & n) << 6 | 63 & o) > 2047 && (l < 55296 || l > 57343) && (p = l);
									break;
								case 4:
									n = e[s + 1], o = e[s + 2], a = e[s + 3], 128 == (192 & n) && 128 == (192 & o) && 128 == (192 & a) && (l = (15 & u) << 18 | (63 & n) << 12 | (63 & o) << 6 | 63 & a) > 65535 && l < 1114112 && (p = l)
							}
							null === p ? (p = 65533, c = 1) : p > 65535 && (p -= 65536, r.push(p >>> 10 & 1023 | 55296), p = 56320 | 1023 & p), r.push(p), s += c
						}
						return function(e) {
							var t = e.length;
							if (t <= E) return String.fromCharCode.apply(String, e);
							var i = "",
								r = 0;
							for (; r < t;) i += String.fromCharCode.apply(String, e.slice(r, r += E));
							return i
						}(r)
					}
					i.kMaxLength = s, o.TYPED_ARRAY_SUPPORT = function() {
						try {
							var e = new Uint8Array(1);
							return e.__proto__ = {
								__proto__: Uint8Array.prototype,
								foo: function() {
									return 42
								}
							}, 42 === e.foo()
						} catch (e) {
							return !1
						}
					}(), o.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(o.prototype, "parent", {
						enumerable: !0,
						get: function() {
							if (o.isBuffer(this)) return this.buffer
						}
					}), Object.defineProperty(o.prototype, "offset", {
						enumerable: !0,
						get: function() {
							if (o.isBuffer(this)) return this.byteOffset
						}
					}), "undefined" != typeof Symbol && null != Symbol.species && o[Symbol.species] === o && Object.defineProperty(o, Symbol.species, {
						value: null,
						configurable: !0,
						enumerable: !1,
						writable: !1
					}), o.poolSize = 8192, o.from = function(e, t, i) {
						return a(e, t, i)
					}, o.prototype.__proto__ = Uint8Array.prototype, o.__proto__ = Uint8Array, o.alloc = function(e, t, i) {
						return function(e, t, i) {
							return l(e), e <= 0 ? n(e) : void 0 !== t ? "string" == typeof i ? n(e).fill(t, i) : n(e).fill(t) : n(e)
						}(e, t, i)
					}, o.allocUnsafe = function(e) {
						return u(e)
					}, o.allocUnsafeSlow = function(e) {
						return u(e)
					}, o.isBuffer = function(e) {
						return null != e && !0 === e._isBuffer && e !== o.prototype
					}, o.compare = function(e, t) {
						if (L(e, Uint8Array) && (e = o.from(e, e.offset, e.byteLength)), L(t, Uint8Array) && (t = o.from(t, t.offset, t.byteLength)), !o.isBuffer(e) || !o.isBuffer(t)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
						if (e === t) return 0;
						for (var i = e.length, r = t.length, s = 0, n = Math.min(i, r); s < n; ++s)
							if (e[s] !== t[s]) {
								i = e[s], r = t[s];
								break
							} return i < r ? -1 : r < i ? 1 : 0
					}, o.isEncoding = function(e) {
						switch (String(e).toLowerCase()) {
							case "hex":
							case "utf8":
							case "utf-8":
							case "ascii":
							case "latin1":
							case "binary":
							case "base64":
							case "ucs2":
							case "ucs-2":
							case "utf16le":
							case "utf-16le":
								return !0;
							default:
								return !1
						}
					}, o.concat = function(e, t) {
						if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
						if (0 === e.length) return o.alloc(0);
						var i;
						if (void 0 === t)
							for (t = 0, i = 0; i < e.length; ++i) t += e[i].length;
						var r = o.allocUnsafe(t),
							s = 0;
						for (i = 0; i < e.length; ++i) {
							var n = e[i];
							if (L(n, Uint8Array) && (n = o.from(n)), !o.isBuffer(n)) throw new TypeError('"list" argument must be an Array of Buffers');
							n.copy(r, s), s += n.length
						}
						return r
					}, o.byteLength = h, o.prototype._isBuffer = !0, o.prototype.swap16 = function() {
						var e = this.length;
						if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
						for (var t = 0; t < e; t += 2) f(this, t, t + 1);
						return this
					}, o.prototype.swap32 = function() {
						var e = this.length;
						if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
						for (var t = 0; t < e; t += 4) f(this, t, t + 3), f(this, t + 1, t + 2);
						return this
					}, o.prototype.swap64 = function() {
						var e = this.length;
						if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
						for (var t = 0; t < e; t += 8) f(this, t, t + 7), f(this, t + 1, t + 6), f(this, t + 2, t + 5), f(this, t + 3, t + 4);
						return this
					}, o.prototype.toString = function() {
						var e = this.length;
						return 0 === e ? "" : 0 === arguments.length ? C(this, 0, e) : d.apply(this, arguments)
					}, o.prototype.toLocaleString = o.prototype.toString, o.prototype.equals = function(e) {
						if (!o.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
						return this === e || 0 === o.compare(this, e)
					}, o.prototype.inspect = function() {
						var e = "",
							t = i.INSPECT_MAX_BYTES;
						return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">"
					}, o.prototype.compare = function(e, t, i, r, s) {
						if (L(e, Uint8Array) && (e = o.from(e, e.offset, e.byteLength)), !o.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
						if (void 0 === t && (t = 0), void 0 === i && (i = e ? e.length : 0), void 0 === r && (r = 0), void 0 === s && (s = this.length), t < 0 || i > e.length || r < 0 || s > this.length) throw new RangeError("out of range index");
						if (r >= s && t >= i) return 0;
						if (r >= s) return -1;
						if (t >= i) return 1;
						if (this === e) return 0;
						for (var n = (s >>>= 0) - (r >>>= 0), a = (i >>>= 0) - (t >>>= 0), l = Math.min(n, a), u = this.slice(r, s), p = e.slice(t, i), c = 0; c < l; ++c)
							if (u[c] !== p[c]) {
								n = u[c], a = p[c];
								break
							} return n < a ? -1 : a < n ? 1 : 0
					}, o.prototype.includes = function(e, t, i) {
						return -1 !== this.indexOf(e, t, i)
					}, o.prototype.indexOf = function(e, t, i) {
						return m(this, e, t, i, !0)
					}, o.prototype.lastIndexOf = function(e, t, i) {
						return m(this, e, t, i, !1)
					}, o.prototype.write = function(e, t, i, r) {
						if (void 0 === t) r = "utf8", i = this.length, t = 0;
						else if (void 0 === i && "string" == typeof t) r = t, i = this.length, t = 0;
						else {
							if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
							t >>>= 0, isFinite(i) ? (i >>>= 0, void 0 === r && (r = "utf8")) : (r = i, i = void 0)
						}
						var s = this.length - t;
						if ((void 0 === i || i > s) && (i = s), e.length > 0 && (i < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
						r || (r = "utf8");
						for (var n = !1;;) switch (r) {
							case "hex":
								return y(this, e, t, i);
							case "utf8":
							case "utf-8":
								return v(this, e, t, i);
							case "ascii":
								return b(this, e, t, i);
							case "latin1":
							case "binary":
								return w(this, e, t, i);
							case "base64":
								return S(this, e, t, i);
							case "ucs2":
							case "ucs-2":
							case "utf16le":
							case "utf-16le":
								return P(this, e, t, i);
							default:
								if (n) throw new TypeError("Unknown encoding: " + r);
								r = ("" + r).toLowerCase(), n = !0
						}
					}, o.prototype.toJSON = function() {
						return {
							type: "Buffer",
							data: Array.prototype.slice.call(this._arr || this, 0)
						}
					};
					var E = 4096;

					function x(e, t, i) {
						var r = "";
						i = Math.min(e.length, i);
						for (var s = t; s < i; ++s) r += String.fromCharCode(127 & e[s]);
						return r
					}

					function _(e, t, i) {
						var r = "";
						i = Math.min(e.length, i);
						for (var s = t; s < i; ++s) r += String.fromCharCode(e[s]);
						return r
					}

					function F(e, t, i) {
						var r = e.length;
						(!t || t < 0) && (t = 0), (!i || i < 0 || i > r) && (i = r);
						for (var s = "", n = t; n < i; ++n) s += B(e[n]);
						return s
					}

					function O(e, t, i) {
						for (var r = e.slice(t, i), s = "", n = 0; n < r.length; n += 2) s += String.fromCharCode(r[n] + 256 * r[n + 1]);
						return s
					}

					function A(e, t, i) {
						if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
						if (e + t > i) throw new RangeError("Trying to access beyond buffer length")
					}

					function T(e, t, i, r, s, n) {
						if (!o.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
						if (t > s || t < n) throw new RangeError('"value" argument is out of bounds');
						if (i + r > e.length) throw new RangeError("Index out of range")
					}

					function R(e, t, i, r, s, n) {
						if (i + r > e.length) throw new RangeError("Index out of range");
						if (i < 0) throw new RangeError("Index out of range")
					}

					function U(e, t, i, s, n) {
						return t = +t, i >>>= 0, n || R(e, 0, i, 4), r.write(e, t, i, s, 23, 4), i + 4
					}

					function D(e, t, i, s, n) {
						return t = +t, i >>>= 0, n || R(e, 0, i, 8), r.write(e, t, i, s, 52, 8), i + 8
					}
					o.prototype.slice = function(e, t) {
						var i = this.length;
						(e = ~~e) < 0 ? (e += i) < 0 && (e = 0) : e > i && (e = i), (t = void 0 === t ? i : ~~t) < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i), t < e && (t = e);
						var r = this.subarray(e, t);
						return r.__proto__ = o.prototype, r
					}, o.prototype.readUIntLE = function(e, t, i) {
						e >>>= 0, t >>>= 0, i || A(e, t, this.length);
						for (var r = this[e], s = 1, n = 0; ++n < t && (s *= 256);) r += this[e + n] * s;
						return r
					}, o.prototype.readUIntBE = function(e, t, i) {
						e >>>= 0, t >>>= 0, i || A(e, t, this.length);
						for (var r = this[e + --t], s = 1; t > 0 && (s *= 256);) r += this[e + --t] * s;
						return r
					}, o.prototype.readUInt8 = function(e, t) {
						return e >>>= 0, t || A(e, 1, this.length), this[e]
					}, o.prototype.readUInt16LE = function(e, t) {
						return e >>>= 0, t || A(e, 2, this.length), this[e] | this[e + 1] << 8
					}, o.prototype.readUInt16BE = function(e, t) {
						return e >>>= 0, t || A(e, 2, this.length), this[e] << 8 | this[e + 1]
					}, o.prototype.readUInt32LE = function(e, t) {
						return e >>>= 0, t || A(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
					}, o.prototype.readUInt32BE = function(e, t) {
						return e >>>= 0, t || A(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
					}, o.prototype.readIntLE = function(e, t, i) {
						e >>>= 0, t >>>= 0, i || A(e, t, this.length);
						for (var r = this[e], s = 1, n = 0; ++n < t && (s *= 256);) r += this[e + n] * s;
						return r >= (s *= 128) && (r -= Math.pow(2, 8 * t)), r
					}, o.prototype.readIntBE = function(e, t, i) {
						e >>>= 0, t >>>= 0, i || A(e, t, this.length);
						for (var r = t, s = 1, n = this[e + --r]; r > 0 && (s *= 256);) n += this[e + --r] * s;
						return n >= (s *= 128) && (n -= Math.pow(2, 8 * t)), n
					}, o.prototype.readInt8 = function(e, t) {
						return e >>>= 0, t || A(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
					}, o.prototype.readInt16LE = function(e, t) {
						e >>>= 0, t || A(e, 2, this.length);
						var i = this[e] | this[e + 1] << 8;
						return 32768 & i ? 4294901760 | i : i
					}, o.prototype.readInt16BE = function(e, t) {
						e >>>= 0, t || A(e, 2, this.length);
						var i = this[e + 1] | this[e] << 8;
						return 32768 & i ? 4294901760 | i : i
					}, o.prototype.readInt32LE = function(e, t) {
						return e >>>= 0, t || A(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
					}, o.prototype.readInt32BE = function(e, t) {
						return e >>>= 0, t || A(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
					}, o.prototype.readFloatLE = function(e, t) {
						return e >>>= 0, t || A(e, 4, this.length), r.read(this, e, !0, 23, 4)
					}, o.prototype.readFloatBE = function(e, t) {
						return e >>>= 0, t || A(e, 4, this.length), r.read(this, e, !1, 23, 4)
					}, o.prototype.readDoubleLE = function(e, t) {
						return e >>>= 0, t || A(e, 8, this.length), r.read(this, e, !0, 52, 8)
					}, o.prototype.readDoubleBE = function(e, t) {
						return e >>>= 0, t || A(e, 8, this.length), r.read(this, e, !1, 52, 8)
					}, o.prototype.writeUIntLE = function(e, t, i, r) {
						(e = +e, t >>>= 0, i >>>= 0, r) || T(this, e, t, i, Math.pow(2, 8 * i) - 1, 0);
						var s = 1,
							n = 0;
						for (this[t] = 255 & e; ++n < i && (s *= 256);) this[t + n] = e / s & 255;
						return t + i
					}, o.prototype.writeUIntBE = function(e, t, i, r) {
						(e = +e, t >>>= 0, i >>>= 0, r) || T(this, e, t, i, Math.pow(2, 8 * i) - 1, 0);
						var s = i - 1,
							n = 1;
						for (this[t + s] = 255 & e; --s >= 0 && (n *= 256);) this[t + s] = e / n & 255;
						return t + i
					}, o.prototype.writeUInt8 = function(e, t, i) {
						return e = +e, t >>>= 0, i || T(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
					}, o.prototype.writeUInt16LE = function(e, t, i) {
						return e = +e, t >>>= 0, i || T(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
					}, o.prototype.writeUInt16BE = function(e, t, i) {
						return e = +e, t >>>= 0, i || T(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
					}, o.prototype.writeUInt32LE = function(e, t, i) {
						return e = +e, t >>>= 0, i || T(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
					}, o.prototype.writeUInt32BE = function(e, t, i) {
						return e = +e, t >>>= 0, i || T(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
					}, o.prototype.writeIntLE = function(e, t, i, r) {
						if (e = +e, t >>>= 0, !r) {
							var s = Math.pow(2, 8 * i - 1);
							T(this, e, t, i, s - 1, -s)
						}
						var n = 0,
							o = 1,
							a = 0;
						for (this[t] = 255 & e; ++n < i && (o *= 256);) e < 0 && 0 === a && 0 !== this[t + n - 1] && (a = 1), this[t + n] = (e / o >> 0) - a & 255;
						return t + i
					}, o.prototype.writeIntBE = function(e, t, i, r) {
						if (e = +e, t >>>= 0, !r) {
							var s = Math.pow(2, 8 * i - 1);
							T(this, e, t, i, s - 1, -s)
						}
						var n = i - 1,
							o = 1,
							a = 0;
						for (this[t + n] = 255 & e; --n >= 0 && (o *= 256);) e < 0 && 0 === a && 0 !== this[t + n + 1] && (a = 1), this[t + n] = (e / o >> 0) - a & 255;
						return t + i
					}, o.prototype.writeInt8 = function(e, t, i) {
						return e = +e, t >>>= 0, i || T(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
					}, o.prototype.writeInt16LE = function(e, t, i) {
						return e = +e, t >>>= 0, i || T(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
					}, o.prototype.writeInt16BE = function(e, t, i) {
						return e = +e, t >>>= 0, i || T(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
					}, o.prototype.writeInt32LE = function(e, t, i) {
						return e = +e, t >>>= 0, i || T(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
					}, o.prototype.writeInt32BE = function(e, t, i) {
						return e = +e, t >>>= 0, i || T(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
					}, o.prototype.writeFloatLE = function(e, t, i) {
						return U(this, e, t, !0, i)
					}, o.prototype.writeFloatBE = function(e, t, i) {
						return U(this, e, t, !1, i)
					}, o.prototype.writeDoubleLE = function(e, t, i) {
						return D(this, e, t, !0, i)
					}, o.prototype.writeDoubleBE = function(e, t, i) {
						return D(this, e, t, !1, i)
					}, o.prototype.copy = function(e, t, i, r) {
						if (!o.isBuffer(e)) throw new TypeError("argument should be a Buffer");
						if (i || (i = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 && r < i && (r = i), r === i) return 0;
						if (0 === e.length || 0 === this.length) return 0;
						if (t < 0) throw new RangeError("targetStart out of bounds");
						if (i < 0 || i >= this.length) throw new RangeError("Index out of range");
						if (r < 0) throw new RangeError("sourceEnd out of bounds");
						r > this.length && (r = this.length), e.length - t < r - i && (r = e.length - t + i);
						var s = r - i;
						if (this === e && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(t, i, r);
						else if (this === e && i < t && t < r)
							for (var n = s - 1; n >= 0; --n) e[n + t] = this[n + i];
						else Uint8Array.prototype.set.call(e, this.subarray(i, r), t);
						return s
					}, o.prototype.fill = function(e, t, i, r) {
						if ("string" == typeof e) {
							if ("string" == typeof t ? (r = t, t = 0, i = this.length) : "string" == typeof i && (r = i, i = this.length), void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
							if ("string" == typeof r && !o.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
							if (1 === e.length) {
								var s = e.charCodeAt(0);
								("utf8" === r && s < 128 || "latin1" === r) && (e = s)
							}
						} else "number" == typeof e && (e &= 255);
						if (t < 0 || this.length < t || this.length < i) throw new RangeError("Out of range index");
						if (i <= t) return this;
						var n;
						if (t >>>= 0, i = void 0 === i ? this.length : i >>> 0, e || (e = 0), "number" == typeof e)
							for (n = t; n < i; ++n) this[n] = e;
						else {
							var a = o.isBuffer(e) ? e : o.from(e, r),
								l = a.length;
							if (0 === l) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
							for (n = 0; n < i - t; ++n) this[n + t] = a[n % l]
						}
						return this
					};
					var I = /[^+/0-9A-Za-z-_]/g;

					function B(e) {
						return e < 16 ? "0" + e.toString(16) : e.toString(16)
					}

					function N(e, t) {
						var i;
						t = t || 1 / 0;
						for (var r = e.length, s = null, n = [], o = 0; o < r; ++o) {
							if ((i = e.charCodeAt(o)) > 55295 && i < 57344) {
								if (!s) {
									if (i > 56319) {
										(t -= 3) > -1 && n.push(239, 191, 189);
										continue
									}
									if (o + 1 === r) {
										(t -= 3) > -1 && n.push(239, 191, 189);
										continue
									}
									s = i;
									continue
								}
								if (i < 56320) {
									(t -= 3) > -1 && n.push(239, 191, 189), s = i;
									continue
								}
								i = 65536 + (s - 55296 << 10 | i - 56320)
							} else s && (t -= 3) > -1 && n.push(239, 191, 189);
							if (s = null, i < 128) {
								if ((t -= 1) < 0) break;
								n.push(i)
							} else if (i < 2048) {
								if ((t -= 2) < 0) break;
								n.push(i >> 6 | 192, 63 & i | 128)
							} else if (i < 65536) {
								if ((t -= 3) < 0) break;
								n.push(i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128)
							} else {
								if (!(i < 1114112)) throw new Error("Invalid code point");
								if ((t -= 4) < 0) break;
								n.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128)
							}
						}
						return n
					}

					function M(e) {
						return t.toByteArray(function(e) {
							if ((e = (e = e.split("=")[0]).trim().replace(I, "")).length < 2) return "";
							for (; e.length % 4 != 0;) e += "=";
							return e
						}(e))
					}

					function j(e, t, i, r) {
						for (var s = 0; s < r && !(s + i >= t.length || s >= e.length); ++s) t[s + i] = e[s];
						return s
					}

					function L(e, t) {
						return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
					}

					function z(e) {
						return e != e
					}
				}).call(this)
			}).call(this, e("buffer").Buffer)
		}, {
			"base64-js": 4,
			buffer: 5,
			ieee754: 14
		}],
		6: [function(e, t, i) {
			/*!
			  Copyright (c) 2018 Jed Watson.
			  Licensed under the MIT License (MIT), see
			  http://jedwatson.github.io/classnames
			*/
			! function() {
				"use strict";
				var e = {}.hasOwnProperty;

				function i() {
					for (var t = [], r = 0; r < arguments.length; r++) {
						var s = arguments[r];
						if (s) {
							var n = typeof s;
							if ("string" === n || "number" === n) t.push(s);
							else if (Array.isArray(s)) {
								if (s.length) {
									var o = i.apply(null, s);
									o && t.push(o)
								}
							} else if ("object" === n)
								if (s.toString === Object.prototype.toString)
									for (var a in s) e.call(s, a) && s[a] && t.push(a);
								else t.push(s.toString())
						}
					}
					return t.join(" ")
				}
				void 0 !== t && t.exports ? (i.default = i, t.exports = i) : window.classNames = i
			}()
		}, {}],
		7: [function(e, t, i) {
			function r(e) {
				if (e) return function(e) {
					for (var t in r.prototype) e[t] = r.prototype[t];
					return e
				}(e)
			}
			void 0 !== t && (t.exports = r), r.prototype.on = r.prototype.addEventListener = function(e, t) {
				return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
			}, r.prototype.once = function(e, t) {
				function i() {
					this.off(e, i), t.apply(this, arguments)
				}
				return i.fn = t, this.on(e, i), this
			}, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(e, t) {
				if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
				var i, r = this._callbacks["$" + e];
				if (!r) return this;
				if (1 == arguments.length) return delete this._callbacks["$" + e], this;
				for (var s = 0; s < r.length; s++)
					if ((i = r[s]) === t || i.fn === t) {
						r.splice(s, 1);
						break
					} return 0 === r.length && delete this._callbacks["$" + e], this
			}, r.prototype.emit = function(e) {
				this._callbacks = this._callbacks || {};
				for (var t = new Array(arguments.length - 1), i = this._callbacks["$" + e], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
				if (i) {
					r = 0;
					for (var s = (i = i.slice(0)).length; r < s; ++r) i[r].apply(this, t)
				}
				return this
			}, r.prototype.listeners = function(e) {
				return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
			}, r.prototype.hasListeners = function(e) {
				return !!this.listeners(e).length
			}
		}, {}],
		8: [function(e, t, i) {
			/*!
			 * Cropper.js v1.5.7
			 * https://fengyuanchen.github.io/cropperjs
			 *
			 * Copyright 2015-present Chen Fengyuan
			 * Released under the MIT license
			 *
			 * Date: 2020-05-23T05:23:00.081Z
			 */
			! function(e, r) {
				"object" == typeof i && void 0 !== t ? t.exports = r() : (e = e || self).Cropper = r()
			}(this, (function() {
				"use strict";

				function e(t) {
					return e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
						return typeof e
					} : function(e) {
						return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
					}, e(t)
				}

				function t(e, t) {
					if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
				}

				function i(e, t) {
					for (var i = 0; i < t.length; i++) {
						var r = t[i];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
					}
				}

				function r(e, t, i) {
					return t in e ? Object.defineProperty(e, t, {
						value: i,
						enumerable: !0,
						configurable: !0,
						writable: !0
					}) : e[t] = i, e
				}

				function s(e, t) {
					var i = Object.keys(e);
					if (Object.getOwnPropertySymbols) {
						var r = Object.getOwnPropertySymbols(e);
						t && (r = r.filter((function(t) {
							return Object.getOwnPropertyDescriptor(e, t).enumerable
						}))), i.push.apply(i, r)
					}
					return i
				}

				function n(e) {
					for (var t = 1; t < arguments.length; t++) {
						var i = null != arguments[t] ? arguments[t] : {};
						t % 2 ? s(Object(i), !0).forEach((function(t) {
							r(e, t, i[t])
						})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : s(Object(i)).forEach((function(t) {
							Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
						}))
					}
					return e
				}

				function o(e) {
					return function(e) {
						if (Array.isArray(e)) return a(e)
					}(e) || function(e) {
						if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
					}(e) || function(e, t) {
						if (!e) return;
						if ("string" == typeof e) return a(e, t);
						var i = Object.prototype.toString.call(e).slice(8, -1);
						"Object" === i && e.constructor && (i = e.constructor.name);
						if ("Map" === i || "Set" === i) return Array.from(e);
						if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return a(e, t)
					}(e) || function() {
						throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
					}()
				}

				function a(e, t) {
					(null == t || t > e.length) && (t = e.length);
					for (var i = 0, r = new Array(t); i < t; i++) r[i] = e[i];
					return r
				}
				var l = "undefined" != typeof window && void 0 !== window.document,
					u = l ? window : {},
					p = !(!l || !u.document.documentElement) && "ontouchstart" in u.document.documentElement,
					c = !!l && "PointerEvent" in u,
					h = "cropper",
					d = "all",
					f = "crop",
					m = "move",
					g = "zoom",
					y = "e",
					v = "w",
					b = "s",
					w = "n",
					S = "ne",
					P = "nw",
					k = "se",
					C = "sw",
					E = "".concat(h, "-crop"),
					x = "".concat(h, "-disabled"),
					_ = "".concat(h, "-hidden"),
					F = "".concat(h, "-hide"),
					O = "".concat(h, "-invisible"),
					A = "".concat(h, "-modal"),
					T = "".concat(h, "-move"),
					R = "".concat(h, "Action"),
					U = "".concat(h, "Preview"),
					D = "crop",
					I = "move",
					B = "none",
					N = "crop",
					M = "cropend",
					j = "cropmove",
					L = "cropstart",
					z = "dblclick",
					H = c ? "pointerdown" : p ? "touchstart" : "mousedown",
					$ = c ? "pointermove" : p ? "touchmove" : "mousemove",
					q = c ? "pointerup pointercancel" : p ? "touchend touchcancel" : "mouseup",
					V = "ready",
					W = "resize",
					X = "wheel",
					G = "zoom",
					K = "image/jpeg",
					Y = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/,
					Q = /^data:/,
					J = /^data:image\/jpeg;base64,/,
					Z = /^img|canvas$/i,
					ee = {
						viewMode: 0,
						dragMode: D,
						initialAspectRatio: NaN,
						aspectRatio: NaN,
						data: null,
						preview: "",
						responsive: !0,
						restore: !0,
						checkCrossOrigin: !0,
						checkOrientation: !0,
						modal: !0,
						guides: !0,
						center: !0,
						highlight: !0,
						background: !0,
						autoCrop: !0,
						autoCropArea: .8,
						movable: !0,
						rotatable: !0,
						scalable: !0,
						zoomable: !0,
						zoomOnTouch: !0,
						zoomOnWheel: !0,
						wheelZoomRatio: .1,
						cropBoxMovable: !0,
						cropBoxResizable: !0,
						toggleDragModeOnDblclick: !0,
						minCanvasWidth: 0,
						minCanvasHeight: 0,
						minCropBoxWidth: 0,
						minCropBoxHeight: 0,
						minContainerWidth: 200,
						minContainerHeight: 100,
						ready: null,
						cropstart: null,
						cropmove: null,
						cropend: null,
						crop: null,
						zoom: null
					},
					te = Number.isNaN || u.isNaN;

				function ie(e) {
					return "number" == typeof e && !te(e)
				}
				var re = function(e) {
					return e > 0 && e < 1 / 0
				};

				function se(e) {
					return void 0 === e
				}

				function ne(t) {
					return "object" === e(t) && null !== t
				}
				var oe = Object.prototype.hasOwnProperty;

				function ae(e) {
					if (!ne(e)) return !1;
					try {
						var t = e.constructor,
							i = t.prototype;
						return t && i && oe.call(i, "isPrototypeOf")
					} catch (e) {
						return !1
					}
				}

				function le(e) {
					return "function" == typeof e
				}
				var ue = Array.prototype.slice;

				function pe(e) {
					return Array.from ? Array.from(e) : ue.call(e)
				}

				function ce(e, t) {
					return e && le(t) && (Array.isArray(e) || ie(e.length) ? pe(e).forEach((function(i, r) {
						t.call(e, i, r, e)
					})) : ne(e) && Object.keys(e).forEach((function(i) {
						t.call(e, e[i], i, e)
					}))), e
				}
				var he = Object.assign || function(e) {
						for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) i[r - 1] = arguments[r];
						return ne(e) && i.length > 0 && i.forEach((function(t) {
							ne(t) && Object.keys(t).forEach((function(i) {
								e[i] = t[i]
							}))
						})), e
					},
					de = /\.\d*(?:0|9){12}\d*$/;

				function fe(e) {
					var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e11;
					return de.test(e) ? Math.round(e * t) / t : e
				}
				var me = /^width|height|left|top|marginLeft|marginTop$/;

				function ge(e, t) {
					var i = e.style;
					ce(t, (function(e, t) {
						me.test(t) && ie(e) && (e = "".concat(e, "px")), i[t] = e
					}))
				}

				function ye(e, t) {
					if (t)
						if (ie(e.length)) ce(e, (function(e) {
							ye(e, t)
						}));
						else if (e.classList) e.classList.add(t);
					else {
						var i = e.className.trim();
						i ? i.indexOf(t) < 0 && (e.className = "".concat(i, " ").concat(t)) : e.className = t
					}
				}

				function ve(e, t) {
					t && (ie(e.length) ? ce(e, (function(e) {
						ve(e, t)
					})) : e.classList ? e.classList.remove(t) : e.className.indexOf(t) >= 0 && (e.className = e.className.replace(t, "")))
				}

				function be(e, t, i) {
					t && (ie(e.length) ? ce(e, (function(e) {
						be(e, t, i)
					})) : i ? ye(e, t) : ve(e, t))
				}
				var we = /([a-z\d])([A-Z])/g;

				function Se(e) {
					return e.replace(we, "$1-$2").toLowerCase()
				}

				function Pe(e, t) {
					return ne(e[t]) ? e[t] : e.dataset ? e.dataset[t] : e.getAttribute("data-".concat(Se(t)))
				}

				function ke(e, t, i) {
					ne(i) ? e[t] = i : e.dataset ? e.dataset[t] = i : e.setAttribute("data-".concat(Se(t)), i)
				}
				var Ce = /\s\s*/,
					Ee = function() {
						var e = !1;
						if (l) {
							var t = !1,
								i = function() {},
								r = Object.defineProperty({}, "once", {
									get: function() {
										return e = !0, t
									},
									set: function(e) {
										t = e
									}
								});
							u.addEventListener("test", i, r), u.removeEventListener("test", i, r)
						}
						return e
					}();

				function xe(e, t, i) {
					var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
						s = i;
					t.trim().split(Ce).forEach((function(t) {
						if (!Ee) {
							var n = e.listeners;
							n && n[t] && n[t][i] && (s = n[t][i], delete n[t][i], 0 === Object.keys(n[t]).length && delete n[t], 0 === Object.keys(n).length && delete e.listeners)
						}
						e.removeEventListener(t, s, r)
					}))
				}

				function _e(e, t, i) {
					var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
						s = i;
					t.trim().split(Ce).forEach((function(t) {
						if (r.once && !Ee) {
							var n = e.listeners,
								o = void 0 === n ? {} : n;
							s = function() {
								delete o[t][i], e.removeEventListener(t, s, r);
								for (var n = arguments.length, a = new Array(n), l = 0; l < n; l++) a[l] = arguments[l];
								i.apply(e, a)
							}, o[t] || (o[t] = {}), o[t][i] && e.removeEventListener(t, o[t][i], r), o[t][i] = s, e.listeners = o
						}
						e.addEventListener(t, s, r)
					}))
				}

				function Fe(e, t, i) {
					var r;
					return le(Event) && le(CustomEvent) ? r = new CustomEvent(t, {
						detail: i,
						bubbles: !0,
						cancelable: !0
					}) : (r = document.createEvent("CustomEvent")).initCustomEvent(t, !0, !0, i), e.dispatchEvent(r)
				}

				function Oe(e) {
					var t = e.getBoundingClientRect();
					return {
						left: t.left + (window.pageXOffset - document.documentElement.clientLeft),
						top: t.top + (window.pageYOffset - document.documentElement.clientTop)
					}
				}
				var Ae = u.location,
					Te = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;

				function Re(e) {
					var t = e.match(Te);
					return null !== t && (t[1] !== Ae.protocol || t[2] !== Ae.hostname || t[3] !== Ae.port)
				}

				function Ue(e) {
					var t = "timestamp=".concat((new Date).getTime());
					return e + (-1 === e.indexOf("?") ? "?" : "&") + t
				}

				function De(e) {
					var t = e.rotate,
						i = e.scaleX,
						r = e.scaleY,
						s = e.translateX,
						n = e.translateY,
						o = [];
					ie(s) && 0 !== s && o.push("translateX(".concat(s, "px)")), ie(n) && 0 !== n && o.push("translateY(".concat(n, "px)")), ie(t) && 0 !== t && o.push("rotate(".concat(t, "deg)")), ie(i) && 1 !== i && o.push("scaleX(".concat(i, ")")), ie(r) && 1 !== r && o.push("scaleY(".concat(r, ")"));
					var a = o.length ? o.join(" ") : "none";
					return {
						WebkitTransform: a,
						msTransform: a,
						transform: a
					}
				}

				function Ie(e, t) {
					var i = e.pageX,
						r = e.pageY,
						s = {
							endX: i,
							endY: r
						};
					return t ? s : n({
						startX: i,
						startY: r
					}, s)
				}

				function Be(e) {
					var t = e.aspectRatio,
						i = e.height,
						r = e.width,
						s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "contain",
						n = re(r),
						o = re(i);
					if (n && o) {
						var a = i * t;
						"contain" === s && a > r || "cover" === s && a < r ? i = r / t : r = i * t
					} else n ? i = r / t : o && (r = i * t);
					return {
						width: r,
						height: i
					}
				}

				function Ne(e, t, i, r) {
					var s = t.aspectRatio,
						n = t.naturalWidth,
						a = t.naturalHeight,
						l = t.rotate,
						u = void 0 === l ? 0 : l,
						p = t.scaleX,
						c = void 0 === p ? 1 : p,
						h = t.scaleY,
						d = void 0 === h ? 1 : h,
						f = i.aspectRatio,
						m = i.naturalWidth,
						g = i.naturalHeight,
						y = r.fillColor,
						v = void 0 === y ? "transparent" : y,
						b = r.imageSmoothingEnabled,
						w = void 0 === b || b,
						S = r.imageSmoothingQuality,
						P = void 0 === S ? "low" : S,
						k = r.maxWidth,
						C = void 0 === k ? 1 / 0 : k,
						E = r.maxHeight,
						x = void 0 === E ? 1 / 0 : E,
						_ = r.minWidth,
						F = void 0 === _ ? 0 : _,
						O = r.minHeight,
						A = void 0 === O ? 0 : O,
						T = document.createElement("canvas"),
						R = T.getContext("2d"),
						U = Be({
							aspectRatio: f,
							width: C,
							height: x
						}),
						D = Be({
							aspectRatio: f,
							width: F,
							height: A
						}, "cover"),
						I = Math.min(U.width, Math.max(D.width, m)),
						B = Math.min(U.height, Math.max(D.height, g)),
						N = Be({
							aspectRatio: s,
							width: C,
							height: x
						}),
						M = Be({
							aspectRatio: s,
							width: F,
							height: A
						}, "cover"),
						j = Math.min(N.width, Math.max(M.width, n)),
						L = Math.min(N.height, Math.max(M.height, a)),
						z = [-j / 2, -L / 2, j, L];
					return T.width = fe(I), T.height = fe(B), R.fillStyle = v, R.fillRect(0, 0, I, B), R.save(), R.translate(I / 2, B / 2), R.rotate(u * Math.PI / 180), R.scale(c, d), R.imageSmoothingEnabled = w, R.imageSmoothingQuality = P, R.drawImage.apply(R, [e].concat(o(z.map((function(e) {
						return Math.floor(fe(e))
					}))))), R.restore(), T
				}
				var Me = String.fromCharCode;
				var je = /^data:.*,/;

				function Le(e) {
					var t, i = new DataView(e);
					try {
						var r, s, n;
						if (255 === i.getUint8(0) && 216 === i.getUint8(1))
							for (var o = i.byteLength, a = 2; a + 1 < o;) {
								if (255 === i.getUint8(a) && 225 === i.getUint8(a + 1)) {
									s = a;
									break
								}
								a += 1
							}
						if (s) {
							var l = s + 10;
							if ("Exif" === function(e, t, i) {
									var r = "";
									i += t;
									for (var s = t; s < i; s += 1) r += Me(e.getUint8(s));
									return r
								}(i, s + 4, 4)) {
								var u = i.getUint16(l);
								if (((r = 18761 === u) || 19789 === u) && 42 === i.getUint16(l + 2, r)) {
									var p = i.getUint32(l + 4, r);
									p >= 8 && (n = l + p)
								}
							}
						}
						if (n) {
							var c, h, d = i.getUint16(n, r);
							for (h = 0; h < d; h += 1)
								if (c = n + 12 * h + 2, 274 === i.getUint16(c, r)) {
									c += 8, t = i.getUint16(c, r), i.setUint16(c, 1, r);
									break
								}
						}
					} catch (e) {
						t = 1
					}
					return t
				}
				var ze = {
						render: function() {
							this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox()
						},
						initContainer: function() {
							var e = this.element,
								t = this.options,
								i = this.container,
								r = this.cropper;
							ye(r, _), ve(e, _);
							var s = {
								width: Math.max(i.offsetWidth, Number(t.minContainerWidth) || 200),
								height: Math.max(i.offsetHeight, Number(t.minContainerHeight) || 100)
							};
							this.containerData = s, ge(r, {
								width: s.width,
								height: s.height
							}), ye(e, _), ve(r, _)
						},
						initCanvas: function() {
							var e = this.containerData,
								t = this.imageData,
								i = this.options.viewMode,
								r = Math.abs(t.rotate) % 180 == 90,
								s = r ? t.naturalHeight : t.naturalWidth,
								n = r ? t.naturalWidth : t.naturalHeight,
								o = s / n,
								a = e.width,
								l = e.height;
							e.height * o > e.width ? 3 === i ? a = e.height * o : l = e.width / o : 3 === i ? l = e.width / o : a = e.height * o;
							var u = {
								aspectRatio: o,
								naturalWidth: s,
								naturalHeight: n,
								width: a,
								height: l
							};
							u.left = (e.width - a) / 2, u.top = (e.height - l) / 2, u.oldLeft = u.left, u.oldTop = u.top, this.canvasData = u, this.limited = 1 === i || 2 === i, this.limitCanvas(!0, !0), this.initialImageData = he({}, t), this.initialCanvasData = he({}, u)
						},
						limitCanvas: function(e, t) {
							var i = this.options,
								r = this.containerData,
								s = this.canvasData,
								n = this.cropBoxData,
								o = i.viewMode,
								a = s.aspectRatio,
								l = this.cropped && n;
							if (e) {
								var u = Number(i.minCanvasWidth) || 0,
									p = Number(i.minCanvasHeight) || 0;
								o > 1 ? (u = Math.max(u, r.width), p = Math.max(p, r.height), 3 === o && (p * a > u ? u = p * a : p = u / a)) : o > 0 && (u ? u = Math.max(u, l ? n.width : 0) : p ? p = Math.max(p, l ? n.height : 0) : l && (u = n.width, (p = n.height) * a > u ? u = p * a : p = u / a));
								var c = Be({
									aspectRatio: a,
									width: u,
									height: p
								});
								u = c.width, p = c.height, s.minWidth = u, s.minHeight = p, s.maxWidth = 1 / 0, s.maxHeight = 1 / 0
							}
							if (t)
								if (o > (l ? 0 : 1)) {
									var h = r.width - s.width,
										d = r.height - s.height;
									s.minLeft = Math.min(0, h), s.minTop = Math.min(0, d), s.maxLeft = Math.max(0, h), s.maxTop = Math.max(0, d), l && this.limited && (s.minLeft = Math.min(n.left, n.left + (n.width - s.width)), s.minTop = Math.min(n.top, n.top + (n.height - s.height)), s.maxLeft = n.left, s.maxTop = n.top, 2 === o && (s.width >= r.width && (s.minLeft = Math.min(0, h), s.maxLeft = Math.max(0, h)), s.height >= r.height && (s.minTop = Math.min(0, d), s.maxTop = Math.max(0, d))))
								} else s.minLeft = -s.width, s.minTop = -s.height, s.maxLeft = r.width, s.maxTop = r.height
						},
						renderCanvas: function(e, t) {
							var i = this.canvasData,
								r = this.imageData;
							if (t) {
								var s = function(e) {
										var t = e.width,
											i = e.height,
											r = e.degree;
										if (90 == (r = Math.abs(r) % 180)) return {
											width: i,
											height: t
										};
										var s = r % 90 * Math.PI / 180,
											n = Math.sin(s),
											o = Math.cos(s),
											a = t * o + i * n,
											l = t * n + i * o;
										return r > 90 ? {
											width: l,
											height: a
										} : {
											width: a,
											height: l
										}
									}({
										width: r.naturalWidth * Math.abs(r.scaleX || 1),
										height: r.naturalHeight * Math.abs(r.scaleY || 1),
										degree: r.rotate || 0
									}),
									n = s.width,
									o = s.height,
									a = i.width * (n / i.naturalWidth),
									l = i.height * (o / i.naturalHeight);
								i.left -= (a - i.width) / 2, i.top -= (l - i.height) / 2, i.width = a, i.height = l, i.aspectRatio = n / o, i.naturalWidth = n, i.naturalHeight = o, this.limitCanvas(!0, !1)
							}(i.width > i.maxWidth || i.width < i.minWidth) && (i.left = i.oldLeft), (i.height > i.maxHeight || i.height < i.minHeight) && (i.top = i.oldTop), i.width = Math.min(Math.max(i.width, i.minWidth), i.maxWidth), i.height = Math.min(Math.max(i.height, i.minHeight), i.maxHeight), this.limitCanvas(!1, !0), i.left = Math.min(Math.max(i.left, i.minLeft), i.maxLeft), i.top = Math.min(Math.max(i.top, i.minTop), i.maxTop), i.oldLeft = i.left, i.oldTop = i.top, ge(this.canvas, he({
								width: i.width,
								height: i.height
							}, De({
								translateX: i.left,
								translateY: i.top
							}))), this.renderImage(e), this.cropped && this.limited && this.limitCropBox(!0, !0)
						},
						renderImage: function(e) {
							var t = this.canvasData,
								i = this.imageData,
								r = i.naturalWidth * (t.width / t.naturalWidth),
								s = i.naturalHeight * (t.height / t.naturalHeight);
							he(i, {
								width: r,
								height: s,
								left: (t.width - r) / 2,
								top: (t.height - s) / 2
							}), ge(this.image, he({
								width: i.width,
								height: i.height
							}, De(he({
								translateX: i.left,
								translateY: i.top
							}, i)))), e && this.output()
						},
						initCropBox: function() {
							var e = this.options,
								t = this.canvasData,
								i = e.aspectRatio || e.initialAspectRatio,
								r = Number(e.autoCropArea) || .8,
								s = {
									width: t.width,
									height: t.height
								};
							i && (t.height * i > t.width ? s.height = s.width / i : s.width = s.height * i), this.cropBoxData = s, this.limitCropBox(!0, !0), s.width = Math.min(Math.max(s.width, s.minWidth), s.maxWidth), s.height = Math.min(Math.max(s.height, s.minHeight), s.maxHeight), s.width = Math.max(s.minWidth, s.width * r), s.height = Math.max(s.minHeight, s.height * r), s.left = t.left + (t.width - s.width) / 2, s.top = t.top + (t.height - s.height) / 2, s.oldLeft = s.left, s.oldTop = s.top, this.initialCropBoxData = he({}, s)
						},
						limitCropBox: function(e, t) {
							var i = this.options,
								r = this.containerData,
								s = this.canvasData,
								n = this.cropBoxData,
								o = this.limited,
								a = i.aspectRatio;
							if (e) {
								var l = Number(i.minCropBoxWidth) || 0,
									u = Number(i.minCropBoxHeight) || 0,
									p = o ? Math.min(r.width, s.width, s.width + s.left, r.width - s.left) : r.width,
									c = o ? Math.min(r.height, s.height, s.height + s.top, r.height - s.top) : r.height;
								l = Math.min(l, r.width), u = Math.min(u, r.height), a && (l && u ? u * a > l ? u = l / a : l = u * a : l ? u = l / a : u && (l = u * a), c * a > p ? c = p / a : p = c * a), n.minWidth = Math.min(l, p), n.minHeight = Math.min(u, c), n.maxWidth = p, n.maxHeight = c
							}
							t && (o ? (n.minLeft = Math.max(0, s.left), n.minTop = Math.max(0, s.top), n.maxLeft = Math.min(r.width, s.left + s.width) - n.width, n.maxTop = Math.min(r.height, s.top + s.height) - n.height) : (n.minLeft = 0, n.minTop = 0, n.maxLeft = r.width - n.width, n.maxTop = r.height - n.height))
						},
						renderCropBox: function() {
							var e = this.options,
								t = this.containerData,
								i = this.cropBoxData;
							(i.width > i.maxWidth || i.width < i.minWidth) && (i.left = i.oldLeft), (i.height > i.maxHeight || i.height < i.minHeight) && (i.top = i.oldTop), i.width = Math.min(Math.max(i.width, i.minWidth), i.maxWidth), i.height = Math.min(Math.max(i.height, i.minHeight), i.maxHeight), this.limitCropBox(!1, !0), i.left = Math.min(Math.max(i.left, i.minLeft), i.maxLeft), i.top = Math.min(Math.max(i.top, i.minTop), i.maxTop), i.oldLeft = i.left, i.oldTop = i.top, e.movable && e.cropBoxMovable && ke(this.face, R, i.width >= t.width && i.height >= t.height ? m : d), ge(this.cropBox, he({
								width: i.width,
								height: i.height
							}, De({
								translateX: i.left,
								translateY: i.top
							}))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output()
						},
						output: function() {
							this.preview(), Fe(this.element, N, this.getData())
						}
					},
					He = {
						initPreview: function() {
							var e = this.element,
								t = this.crossOrigin,
								i = this.options.preview,
								r = t ? this.crossOriginUrl : this.url,
								s = e.alt || "The image to preview",
								n = document.createElement("img");
							if (t && (n.crossOrigin = t), n.src = r, n.alt = s, this.viewBox.appendChild(n), this.viewBoxImage = n, i) {
								var o = i;
								"string" == typeof i ? o = e.ownerDocument.querySelectorAll(i) : i.querySelector && (o = [i]), this.previews = o, ce(o, (function(e) {
									var i = document.createElement("img");
									ke(e, U, {
										width: e.offsetWidth,
										height: e.offsetHeight,
										html: e.innerHTML
									}), t && (i.crossOrigin = t), i.src = r, i.alt = s, i.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', e.innerHTML = "", e.appendChild(i)
								}))
							}
						},
						resetPreview: function() {
							ce(this.previews, (function(e) {
								var t = Pe(e, U);
								ge(e, {
										width: t.width,
										height: t.height
									}), e.innerHTML = t.html,
									function(e, t) {
										if (ne(e[t])) try {
											delete e[t]
										} catch (i) {
											e[t] = void 0
										} else if (e.dataset) try {
											delete e.dataset[t]
										} catch (i) {
											e.dataset[t] = void 0
										} else e.removeAttribute("data-".concat(Se(t)))
									}(e, U)
							}))
						},
						preview: function() {
							var e = this.imageData,
								t = this.canvasData,
								i = this.cropBoxData,
								r = i.width,
								s = i.height,
								n = e.width,
								o = e.height,
								a = i.left - t.left - e.left,
								l = i.top - t.top - e.top;
							this.cropped && !this.disabled && (ge(this.viewBoxImage, he({
								width: n,
								height: o
							}, De(he({
								translateX: -a,
								translateY: -l
							}, e)))), ce(this.previews, (function(t) {
								var i = Pe(t, U),
									u = i.width,
									p = i.height,
									c = u,
									h = p,
									d = 1;
								r && (h = s * (d = u / r)), s && h > p && (c = r * (d = p / s), h = p), ge(t, {
									width: c,
									height: h
								}), ge(t.getElementsByTagName("img")[0], he({
									width: n * d,
									height: o * d
								}, De(he({
									translateX: -a * d,
									translateY: -l * d
								}, e))))
							})))
						}
					},
					$e = {
						bind: function() {
							var e = this.element,
								t = this.options,
								i = this.cropper;
							le(t.cropstart) && _e(e, L, t.cropstart), le(t.cropmove) && _e(e, j, t.cropmove), le(t.cropend) && _e(e, M, t.cropend), le(t.crop) && _e(e, N, t.crop), le(t.zoom) && _e(e, G, t.zoom), _e(i, H, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && _e(i, X, this.onWheel = this.wheel.bind(this), {
								passive: !1,
								capture: !0
							}), t.toggleDragModeOnDblclick && _e(i, z, this.onDblclick = this.dblclick.bind(this)), _e(e.ownerDocument, $, this.onCropMove = this.cropMove.bind(this)), _e(e.ownerDocument, q, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && _e(window, W, this.onResize = this.resize.bind(this))
						},
						unbind: function() {
							var e = this.element,
								t = this.options,
								i = this.cropper;
							le(t.cropstart) && xe(e, L, t.cropstart), le(t.cropmove) && xe(e, j, t.cropmove), le(t.cropend) && xe(e, M, t.cropend), le(t.crop) && xe(e, N, t.crop), le(t.zoom) && xe(e, G, t.zoom), xe(i, H, this.onCropStart), t.zoomable && t.zoomOnWheel && xe(i, X, this.onWheel, {
								passive: !1,
								capture: !0
							}), t.toggleDragModeOnDblclick && xe(i, z, this.onDblclick), xe(e.ownerDocument, $, this.onCropMove), xe(e.ownerDocument, q, this.onCropEnd), t.responsive && xe(window, W, this.onResize)
						}
					},
					qe = {
						resize: function() {
							if (!this.disabled) {
								var e, t, i = this.options,
									r = this.container,
									s = this.containerData,
									n = r.offsetWidth / s.width;
								if (1 !== n || r.offsetHeight !== s.height) i.restore && (e = this.getCanvasData(), t = this.getCropBoxData()), this.render(), i.restore && (this.setCanvasData(ce(e, (function(t, i) {
									e[i] = t * n
								}))), this.setCropBoxData(ce(t, (function(e, i) {
									t[i] = e * n
								}))))
							}
						},
						dblclick: function() {
							var e, t;
							this.disabled || this.options.dragMode === B || this.setDragMode((e = this.dragBox, t = E, (e.classList ? e.classList.contains(t) : e.className.indexOf(t) > -1) ? I : D))
						},
						wheel: function(e) {
							var t = this,
								i = Number(this.options.wheelZoomRatio) || .1,
								r = 1;
							this.disabled || (e.preventDefault(), this.wheeling || (this.wheeling = !0, setTimeout((function() {
								t.wheeling = !1
							}), 50), e.deltaY ? r = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? r = -e.wheelDelta / 120 : e.detail && (r = e.detail > 0 ? 1 : -1), this.zoom(-r * i, e)))
						},
						cropStart: function(e) {
							var t = e.buttons,
								i = e.button;
							if (!(this.disabled || ("mousedown" === e.type || "pointerdown" === e.type && "mouse" === e.pointerType) && (ie(t) && 1 !== t || ie(i) && 0 !== i || e.ctrlKey))) {
								var r, s = this.options,
									n = this.pointers;
								e.changedTouches ? ce(e.changedTouches, (function(e) {
									n[e.identifier] = Ie(e)
								})) : n[e.pointerId || 0] = Ie(e), r = Object.keys(n).length > 1 && s.zoomable && s.zoomOnTouch ? g : Pe(e.target, R), Y.test(r) && !1 !== Fe(this.element, L, {
									originalEvent: e,
									action: r
								}) && (e.preventDefault(), this.action = r, this.cropping = !1, r === f && (this.cropping = !0, ye(this.dragBox, A)))
							}
						},
						cropMove: function(e) {
							var t = this.action;
							if (!this.disabled && t) {
								var i = this.pointers;
								e.preventDefault(), !1 !== Fe(this.element, j, {
									originalEvent: e,
									action: t
								}) && (e.changedTouches ? ce(e.changedTouches, (function(e) {
									he(i[e.identifier] || {}, Ie(e, !0))
								})) : he(i[e.pointerId || 0] || {}, Ie(e, !0)), this.change(e))
							}
						},
						cropEnd: function(e) {
							if (!this.disabled) {
								var t = this.action,
									i = this.pointers;
								e.changedTouches ? ce(e.changedTouches, (function(e) {
									delete i[e.identifier]
								})) : delete i[e.pointerId || 0], t && (e.preventDefault(), Object.keys(i).length || (this.action = ""), this.cropping && (this.cropping = !1, be(this.dragBox, A, this.cropped && this.options.modal)), Fe(this.element, M, {
									originalEvent: e,
									action: t
								}))
							}
						}
					},
					Ve = {
						change: function(e) {
							var t, i = this.options,
								r = this.canvasData,
								s = this.containerData,
								o = this.cropBoxData,
								a = this.pointers,
								l = this.action,
								u = i.aspectRatio,
								p = o.left,
								c = o.top,
								h = o.width,
								E = o.height,
								x = p + h,
								F = c + E,
								O = 0,
								A = 0,
								T = s.width,
								R = s.height,
								U = !0;
							!u && e.shiftKey && (u = h && E ? h / E : 1), this.limited && (O = o.minLeft, A = o.minTop, T = O + Math.min(s.width, r.width, r.left + r.width), R = A + Math.min(s.height, r.height, r.top + r.height));
							var D = a[Object.keys(a)[0]],
								I = {
									x: D.endX - D.startX,
									y: D.endY - D.startY
								},
								B = function(e) {
									switch (e) {
										case y:
											x + I.x > T && (I.x = T - x);
											break;
										case v:
											p + I.x < O && (I.x = O - p);
											break;
										case w:
											c + I.y < A && (I.y = A - c);
											break;
										case b:
											F + I.y > R && (I.y = R - F)
									}
								};
							switch (l) {
								case d:
									p += I.x, c += I.y;
									break;
								case y:
									if (I.x >= 0 && (x >= T || u && (c <= A || F >= R))) {
										U = !1;
										break
									}
									B(y), (h += I.x) < 0 && (l = v, p -= h = -h), u && (E = h / u, c += (o.height - E) / 2);
									break;
								case w:
									if (I.y <= 0 && (c <= A || u && (p <= O || x >= T))) {
										U = !1;
										break
									}
									B(w), E -= I.y, c += I.y, E < 0 && (l = b, c -= E = -E), u && (h = E * u, p += (o.width - h) / 2);
									break;
								case v:
									if (I.x <= 0 && (p <= O || u && (c <= A || F >= R))) {
										U = !1;
										break
									}
									B(v), h -= I.x, p += I.x, h < 0 && (l = y, p -= h = -h), u && (E = h / u, c += (o.height - E) / 2);
									break;
								case b:
									if (I.y >= 0 && (F >= R || u && (p <= O || x >= T))) {
										U = !1;
										break
									}
									B(b), (E += I.y) < 0 && (l = w, c -= E = -E), u && (h = E * u, p += (o.width - h) / 2);
									break;
								case S:
									if (u) {
										if (I.y <= 0 && (c <= A || x >= T)) {
											U = !1;
											break
										}
										B(w), E -= I.y, c += I.y, h = E * u
									} else B(w), B(y), I.x >= 0 ? x < T ? h += I.x : I.y <= 0 && c <= A && (U = !1) : h += I.x, I.y <= 0 ? c > A && (E -= I.y, c += I.y) : (E -= I.y, c += I.y);
									h < 0 && E < 0 ? (l = C, c -= E = -E, p -= h = -h) : h < 0 ? (l = P, p -= h = -h) : E < 0 && (l = k, c -= E = -E);
									break;
								case P:
									if (u) {
										if (I.y <= 0 && (c <= A || p <= O)) {
											U = !1;
											break
										}
										B(w), E -= I.y, c += I.y, h = E * u, p += o.width - h
									} else B(w), B(v), I.x <= 0 ? p > O ? (h -= I.x, p += I.x) : I.y <= 0 && c <= A && (U = !1) : (h -= I.x, p += I.x), I.y <= 0 ? c > A && (E -= I.y, c += I.y) : (E -= I.y, c += I.y);
									h < 0 && E < 0 ? (l = k, c -= E = -E, p -= h = -h) : h < 0 ? (l = S, p -= h = -h) : E < 0 && (l = C, c -= E = -E);
									break;
								case C:
									if (u) {
										if (I.x <= 0 && (p <= O || F >= R)) {
											U = !1;
											break
										}
										B(v), h -= I.x, p += I.x, E = h / u
									} else B(b), B(v), I.x <= 0 ? p > O ? (h -= I.x, p += I.x) : I.y >= 0 && F >= R && (U = !1) : (h -= I.x, p += I.x), I.y >= 0 ? F < R && (E += I.y) : E += I.y;
									h < 0 && E < 0 ? (l = S, c -= E = -E, p -= h = -h) : h < 0 ? (l = k, p -= h = -h) : E < 0 && (l = P, c -= E = -E);
									break;
								case k:
									if (u) {
										if (I.x >= 0 && (x >= T || F >= R)) {
											U = !1;
											break
										}
										B(y), E = (h += I.x) / u
									} else B(b), B(y), I.x >= 0 ? x < T ? h += I.x : I.y >= 0 && F >= R && (U = !1) : h += I.x, I.y >= 0 ? F < R && (E += I.y) : E += I.y;
									h < 0 && E < 0 ? (l = P, c -= E = -E, p -= h = -h) : h < 0 ? (l = C, p -= h = -h) : E < 0 && (l = S, c -= E = -E);
									break;
								case m:
									this.move(I.x, I.y), U = !1;
									break;
								case g:
									this.zoom(function(e) {
										var t = n({}, e),
											i = [];
										return ce(e, (function(e, r) {
											delete t[r], ce(t, (function(t) {
												var r = Math.abs(e.startX - t.startX),
													s = Math.abs(e.startY - t.startY),
													n = Math.abs(e.endX - t.endX),
													o = Math.abs(e.endY - t.endY),
													a = Math.sqrt(r * r + s * s),
													l = (Math.sqrt(n * n + o * o) - a) / a;
												i.push(l)
											}))
										})), i.sort((function(e, t) {
											return Math.abs(e) < Math.abs(t)
										})), i[0]
									}(a), e), U = !1;
									break;
								case f:
									if (!I.x || !I.y) {
										U = !1;
										break
									}
									t = Oe(this.cropper), p = D.startX - t.left, c = D.startY - t.top, h = o.minWidth, E = o.minHeight, I.x > 0 ? l = I.y > 0 ? k : S : I.x < 0 && (p -= h, l = I.y > 0 ? C : P), I.y < 0 && (c -= E), this.cropped || (ve(this.cropBox, _), this.cropped = !0, this.limited && this.limitCropBox(!0, !0))
							}
							U && (o.width = h, o.height = E, o.left = p, o.top = c, this.action = l, this.renderCropBox()), ce(a, (function(e) {
								e.startX = e.endX, e.startY = e.endY
							}))
						}
					},
					We = {
						crop: function() {
							return !this.ready || this.cropped || this.disabled || (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && ye(this.dragBox, A), ve(this.cropBox, _), this.setCropBoxData(this.initialCropBoxData)), this
						},
						reset: function() {
							return this.ready && !this.disabled && (this.imageData = he({}, this.initialImageData), this.canvasData = he({}, this.initialCanvasData), this.cropBoxData = he({}, this.initialCropBoxData), this.renderCanvas(), this.cropped && this.renderCropBox()), this
						},
						clear: function() {
							return this.cropped && !this.disabled && (he(this.cropBoxData, {
								left: 0,
								top: 0,
								width: 0,
								height: 0
							}), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), ve(this.dragBox, A), ye(this.cropBox, _)), this
						},
						replace: function(e) {
							var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
							return !this.disabled && e && (this.isImg && (this.element.src = e), t ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, ce(this.previews, (function(t) {
								t.getElementsByTagName("img")[0].src = e
							})))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this
						},
						enable: function() {
							return this.ready && this.disabled && (this.disabled = !1, ve(this.cropper, x)), this
						},
						disable: function() {
							return this.ready && !this.disabled && (this.disabled = !0, ye(this.cropper, x)), this
						},
						destroy: function() {
							var e = this.element;
							return e.cropper ? (e.cropper = void 0, this.isImg && this.replaced && (e.src = this.originalUrl), this.uncreate(), this) : this
						},
						move: function(e) {
							var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e,
								i = this.canvasData,
								r = i.left,
								s = i.top;
							return this.moveTo(se(e) ? e : r + Number(e), se(t) ? t : s + Number(t))
						},
						moveTo: function(e) {
							var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e,
								i = this.canvasData,
								r = !1;
							return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.movable && (ie(e) && (i.left = e, r = !0), ie(t) && (i.top = t, r = !0), r && this.renderCanvas(!0)), this
						},
						zoom: function(e, t) {
							var i = this.canvasData;
							return e = (e = Number(e)) < 0 ? 1 / (1 - e) : 1 + e, this.zoomTo(i.width * e / i.naturalWidth, null, t)
						},
						zoomTo: function(e, t, i) {
							var r = this.options,
								s = this.canvasData,
								n = s.width,
								o = s.height,
								a = s.naturalWidth,
								l = s.naturalHeight;
							if ((e = Number(e)) >= 0 && this.ready && !this.disabled && r.zoomable) {
								var u = a * e,
									p = l * e;
								if (!1 === Fe(this.element, G, {
										ratio: e,
										oldRatio: n / a,
										originalEvent: i
									})) return this;
								if (i) {
									var c = this.pointers,
										h = Oe(this.cropper),
										d = c && Object.keys(c).length ? function(e) {
											var t = 0,
												i = 0,
												r = 0;
											return ce(e, (function(e) {
												var s = e.startX,
													n = e.startY;
												t += s, i += n, r += 1
											})), {
												pageX: t /= r,
												pageY: i /= r
											}
										}(c) : {
											pageX: i.pageX,
											pageY: i.pageY
										};
									s.left -= (u - n) * ((d.pageX - h.left - s.left) / n), s.top -= (p - o) * ((d.pageY - h.top - s.top) / o)
								} else ae(t) && ie(t.x) && ie(t.y) ? (s.left -= (u - n) * ((t.x - s.left) / n), s.top -= (p - o) * ((t.y - s.top) / o)) : (s.left -= (u - n) / 2, s.top -= (p - o) / 2);
								s.width = u, s.height = p, this.renderCanvas(!0)
							}
							return this
						},
						rotate: function(e) {
							return this.rotateTo((this.imageData.rotate || 0) + Number(e))
						},
						rotateTo: function(e) {
							return ie(e = Number(e)) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = e % 360, this.renderCanvas(!0, !0)), this
						},
						scaleX: function(e) {
							var t = this.imageData.scaleY;
							return this.scale(e, ie(t) ? t : 1)
						},
						scaleY: function(e) {
							var t = this.imageData.scaleX;
							return this.scale(ie(t) ? t : 1, e)
						},
						scale: function(e) {
							var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e,
								i = this.imageData,
								r = !1;
							return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.scalable && (ie(e) && (i.scaleX = e, r = !0), ie(t) && (i.scaleY = t, r = !0), r && this.renderCanvas(!0, !0)), this
						},
						getData: function() {
							var e, t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
								i = this.options,
								r = this.imageData,
								s = this.canvasData,
								n = this.cropBoxData;
							if (this.ready && this.cropped) {
								e = {
									x: n.left - s.left,
									y: n.top - s.top,
									width: n.width,
									height: n.height
								};
								var o = r.width / r.naturalWidth;
								if (ce(e, (function(t, i) {
										e[i] = t / o
									})), t) {
									var a = Math.round(e.y + e.height),
										l = Math.round(e.x + e.width);
									e.x = Math.round(e.x), e.y = Math.round(e.y), e.width = l - e.x, e.height = a - e.y
								}
							} else e = {
								x: 0,
								y: 0,
								width: 0,
								height: 0
							};
							return i.rotatable && (e.rotate = r.rotate || 0), i.scalable && (e.scaleX = r.scaleX || 1, e.scaleY = r.scaleY || 1), e
						},
						setData: function(e) {
							var t = this.options,
								i = this.imageData,
								r = this.canvasData,
								s = {};
							if (this.ready && !this.disabled && ae(e)) {
								var n = !1;
								t.rotatable && ie(e.rotate) && e.rotate !== i.rotate && (i.rotate = e.rotate, n = !0), t.scalable && (ie(e.scaleX) && e.scaleX !== i.scaleX && (i.scaleX = e.scaleX, n = !0), ie(e.scaleY) && e.scaleY !== i.scaleY && (i.scaleY = e.scaleY, n = !0)), n && this.renderCanvas(!0, !0);
								var o = i.width / i.naturalWidth;
								ie(e.x) && (s.left = e.x * o + r.left), ie(e.y) && (s.top = e.y * o + r.top), ie(e.width) && (s.width = e.width * o), ie(e.height) && (s.height = e.height * o), this.setCropBoxData(s)
							}
							return this
						},
						getContainerData: function() {
							return this.ready ? he({}, this.containerData) : {}
						},
						getImageData: function() {
							return this.sized ? he({}, this.imageData) : {}
						},
						getCanvasData: function() {
							var e = this.canvasData,
								t = {};
							return this.ready && ce(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], (function(i) {
								t[i] = e[i]
							})), t
						},
						setCanvasData: function(e) {
							var t = this.canvasData,
								i = t.aspectRatio;
							return this.ready && !this.disabled && ae(e) && (ie(e.left) && (t.left = e.left), ie(e.top) && (t.top = e.top), ie(e.width) ? (t.width = e.width, t.height = e.width / i) : ie(e.height) && (t.height = e.height, t.width = e.height * i), this.renderCanvas(!0)), this
						},
						getCropBoxData: function() {
							var e, t = this.cropBoxData;
							return this.ready && this.cropped && (e = {
								left: t.left,
								top: t.top,
								width: t.width,
								height: t.height
							}), e || {}
						},
						setCropBoxData: function(e) {
							var t, i, r = this.cropBoxData,
								s = this.options.aspectRatio;
							return this.ready && this.cropped && !this.disabled && ae(e) && (ie(e.left) && (r.left = e.left), ie(e.top) && (r.top = e.top), ie(e.width) && e.width !== r.width && (t = !0, r.width = e.width), ie(e.height) && e.height !== r.height && (i = !0, r.height = e.height), s && (t ? r.height = r.width / s : i && (r.width = r.height * s)), this.renderCropBox()), this
						},
						getCroppedCanvas: function() {
							var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
							if (!this.ready || !window.HTMLCanvasElement) return null;
							var t = this.canvasData,
								i = Ne(this.image, this.imageData, t, e);
							if (!this.cropped) return i;
							var r = this.getData(),
								s = r.x,
								n = r.y,
								a = r.width,
								l = r.height,
								u = i.width / Math.floor(t.naturalWidth);
							1 !== u && (s *= u, n *= u, a *= u, l *= u);
							var p = a / l,
								c = Be({
									aspectRatio: p,
									width: e.maxWidth || 1 / 0,
									height: e.maxHeight || 1 / 0
								}),
								h = Be({
									aspectRatio: p,
									width: e.minWidth || 0,
									height: e.minHeight || 0
								}, "cover"),
								d = Be({
									aspectRatio: p,
									width: e.width || (1 !== u ? i.width : a),
									height: e.height || (1 !== u ? i.height : l)
								}),
								f = d.width,
								m = d.height;
							f = Math.min(c.width, Math.max(h.width, f)), m = Math.min(c.height, Math.max(h.height, m));
							var g = document.createElement("canvas"),
								y = g.getContext("2d");
							g.width = fe(f), g.height = fe(m), y.fillStyle = e.fillColor || "transparent", y.fillRect(0, 0, f, m);
							var v = e.imageSmoothingEnabled,
								b = void 0 === v || v,
								w = e.imageSmoothingQuality;
							y.imageSmoothingEnabled = b, w && (y.imageSmoothingQuality = w);
							var S, P, k, C, E, x, _ = i.width,
								F = i.height,
								O = s,
								A = n;
							O <= -a || O > _ ? (O = 0, S = 0, k = 0, E = 0) : O <= 0 ? (k = -O, O = 0, E = S = Math.min(_, a + O)) : O <= _ && (k = 0, E = S = Math.min(a, _ - O)), S <= 0 || A <= -l || A > F ? (A = 0, P = 0, C = 0, x = 0) : A <= 0 ? (C = -A, A = 0, x = P = Math.min(F, l + A)) : A <= F && (C = 0, x = P = Math.min(l, F - A));
							var T = [O, A, S, P];
							if (E > 0 && x > 0) {
								var R = f / a;
								T.push(k * R, C * R, E * R, x * R)
							}
							return y.drawImage.apply(y, [i].concat(o(T.map((function(e) {
								return Math.floor(fe(e))
							}))))), g
						},
						setAspectRatio: function(e) {
							var t = this.options;
							return this.disabled || se(e) || (t.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this
						},
						setDragMode: function(e) {
							var t = this.options,
								i = this.dragBox,
								r = this.face;
							if (this.ready && !this.disabled) {
								var s = e === D,
									n = t.movable && e === I;
								e = s || n ? e : B, t.dragMode = e, ke(i, R, e), be(i, E, s), be(i, T, n), t.cropBoxMovable || (ke(r, R, e), be(r, E, s), be(r, T, n))
							}
							return this
						}
					},
					Xe = u.Cropper,
					Ge = function() {
						function e(i) {
							var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
							if (t(this, e), !i || !Z.test(i.tagName)) throw new Error("The first argument is required and must be an <img> or <canvas> element.");
							this.element = i, this.options = he({}, ee, ae(r) && r), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init()
						}
						var r, s, n;
						return r = e, n = [{
							key: "noConflict",
							value: function() {
								return window.Cropper = Xe, e
							}
						}, {
							key: "setDefaults",
							value: function(e) {
								he(ee, ae(e) && e)
							}
						}], (s = [{
							key: "init",
							value: function() {
								var e, t = this.element,
									i = t.tagName.toLowerCase();
								if (!t.cropper) {
									if (t.cropper = this, "img" === i) {
										if (this.isImg = !0, e = t.getAttribute("src") || "", this.originalUrl = e, !e) return;
										e = t.src
									} else "canvas" === i && window.HTMLCanvasElement && (e = t.toDataURL());
									this.load(e)
								}
							}
						}, {
							key: "load",
							value: function(e) {
								var t = this;
								if (e) {
									this.url = e, this.imageData = {};
									var i = this.element,
										r = this.options;
									if (r.rotatable || r.scalable || (r.checkOrientation = !1), r.checkOrientation && window.ArrayBuffer)
										if (Q.test(e)) J.test(e) ? this.read((s = e.replace(je, ""), n = atob(s), o = new ArrayBuffer(n.length), ce(a = new Uint8Array(o), (function(e, t) {
											a[t] = n.charCodeAt(t)
										})), o)) : this.clone();
										else {
											var s, n, o, a, l = new XMLHttpRequest,
												u = this.clone.bind(this);
											this.reloading = !0, this.xhr = l, l.onabort = u, l.onerror = u, l.ontimeout = u, l.onprogress = function() {
												l.getResponseHeader("content-type") !== K && l.abort()
											}, l.onload = function() {
												t.read(l.response)
											}, l.onloadend = function() {
												t.reloading = !1, t.xhr = null
											}, r.checkCrossOrigin && Re(e) && i.crossOrigin && (e = Ue(e)), l.open("GET", e), l.responseType = "arraybuffer", l.withCredentials = "use-credentials" === i.crossOrigin, l.send()
										}
									else this.clone()
								}
							}
						}, {
							key: "read",
							value: function(e) {
								var t = this.options,
									i = this.imageData,
									r = Le(e),
									s = 0,
									n = 1,
									o = 1;
								if (r > 1) {
									this.url = function(e, t) {
										for (var i = [], r = new Uint8Array(e); r.length > 0;) i.push(Me.apply(null, pe(r.subarray(0, 8192)))), r = r.subarray(8192);
										return "data:".concat(t, ";base64,").concat(btoa(i.join("")))
									}(e, K);
									var a = function(e) {
										var t = 0,
											i = 1,
											r = 1;
										switch (e) {
											case 2:
												i = -1;
												break;
											case 3:
												t = -180;
												break;
											case 4:
												r = -1;
												break;
											case 5:
												t = 90, r = -1;
												break;
											case 6:
												t = 90;
												break;
											case 7:
												t = 90, i = -1;
												break;
											case 8:
												t = -90
										}
										return {
											rotate: t,
											scaleX: i,
											scaleY: r
										}
									}(r);
									s = a.rotate, n = a.scaleX, o = a.scaleY
								}
								t.rotatable && (i.rotate = s), t.scalable && (i.scaleX = n, i.scaleY = o), this.clone()
							}
						}, {
							key: "clone",
							value: function() {
								var e = this.element,
									t = this.url,
									i = e.crossOrigin,
									r = t;
								this.options.checkCrossOrigin && Re(t) && (i || (i = "anonymous"), r = Ue(t)), this.crossOrigin = i, this.crossOriginUrl = r;
								var s = document.createElement("img");
								i && (s.crossOrigin = i), s.src = r || t, s.alt = e.alt || "The image to crop", this.image = s, s.onload = this.start.bind(this), s.onerror = this.stop.bind(this), ye(s, F), e.parentNode.insertBefore(s, e.nextSibling)
							}
						}, {
							key: "start",
							value: function() {
								var e = this,
									t = this.image;
								t.onload = null, t.onerror = null, this.sizing = !0;
								var i = u.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(u.navigator.userAgent),
									r = function(t, i) {
										he(e.imageData, {
											naturalWidth: t,
											naturalHeight: i,
											aspectRatio: t / i
										}), e.sizing = !1, e.sized = !0, e.build()
									};
								if (!t.naturalWidth || i) {
									var s = document.createElement("img"),
										n = document.body || document.documentElement;
									this.sizingImage = s, s.onload = function() {
										r(s.width, s.height), i || n.removeChild(s)
									}, s.src = t.src, i || (s.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", n.appendChild(s))
								} else r(t.naturalWidth, t.naturalHeight)
							}
						}, {
							key: "stop",
							value: function() {
								var e = this.image;
								e.onload = null, e.onerror = null, e.parentNode.removeChild(e), this.image = null
							}
						}, {
							key: "build",
							value: function() {
								if (this.sized && !this.ready) {
									var e = this.element,
										t = this.options,
										i = this.image,
										r = e.parentNode,
										s = document.createElement("div");
									s.innerHTML = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>';
									var n = s.querySelector(".".concat(h, "-container")),
										o = n.querySelector(".".concat(h, "-canvas")),
										a = n.querySelector(".".concat(h, "-drag-box")),
										l = n.querySelector(".".concat(h, "-crop-box")),
										u = l.querySelector(".".concat(h, "-face"));
									this.container = r, this.cropper = n, this.canvas = o, this.dragBox = a, this.cropBox = l, this.viewBox = n.querySelector(".".concat(h, "-view-box")), this.face = u, o.appendChild(i), ye(e, _), r.insertBefore(n, e.nextSibling), this.isImg || ve(i, F), this.initPreview(), this.bind(), t.initialAspectRatio = Math.max(0, t.initialAspectRatio) || NaN, t.aspectRatio = Math.max(0, t.aspectRatio) || NaN, t.viewMode = Math.max(0, Math.min(3, Math.round(t.viewMode))) || 0, ye(l, _), t.guides || ye(l.getElementsByClassName("".concat(h, "-dashed")), _), t.center || ye(l.getElementsByClassName("".concat(h, "-center")), _), t.background && ye(n, "".concat(h, "-bg")), t.highlight || ye(u, O), t.cropBoxMovable && (ye(u, T), ke(u, R, d)), t.cropBoxResizable || (ye(l.getElementsByClassName("".concat(h, "-line")), _), ye(l.getElementsByClassName("".concat(h, "-point")), _)), this.render(), this.ready = !0, this.setDragMode(t.dragMode), t.autoCrop && this.crop(), this.setData(t.data), le(t.ready) && _e(e, V, t.ready, {
										once: !0
									}), Fe(e, V)
								}
							}
						}, {
							key: "unbuild",
							value: function() {
								this.ready && (this.ready = !1, this.unbind(), this.resetPreview(), this.cropper.parentNode.removeChild(this.cropper), ve(this.element, _))
							}
						}, {
							key: "uncreate",
							value: function() {
								this.ready ? (this.unbuild(), this.ready = !1, this.cropped = !1) : this.sizing ? (this.sizingImage.onload = null, this.sizing = !1, this.sized = !1) : this.reloading ? (this.xhr.onabort = null, this.xhr.abort()) : this.image && this.stop()
							}
						}]) && i(r.prototype, s), n && i(r, n), e
					}();
				return he(Ge.prototype, ze, He, $e, qe, Ve, We), Ge
			}))
		}, {}],
		9: [function(e, t, i) {
			(function(r) {
				(function() {
					i.formatArgs = function(e) {
						if (e[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + e[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors) return;
						const i = "color: " + this.color;
						e.splice(1, 0, i, "color: inherit");
						let r = 0,
							s = 0;
						e[0].replace(/%[a-zA-Z%]/g, (e => {
							"%%" !== e && (r++, "%c" === e && (s = r))
						})), e.splice(s, 0, i)
					}, i.save = function(e) {
						try {
							e ? i.storage.setItem("debug", e) : i.storage.removeItem("debug")
						} catch (e) {}
					}, i.load = function() {
						let e;
						try {
							e = i.storage.getItem("debug")
						} catch (e) {}!e && void 0 !== r && "env" in r && (e = r.env.DEBUG);
						return e
					}, i.useColors = function() {
						if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return !0;
						if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
						return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
					}, i.storage = function() {
						try {
							return localStorage
						} catch (e) {}
					}(), i.destroy = (() => {
						let e = !1;
						return () => {
							e || (e = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))
						}
					})(), i.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], i.log = console.debug || console.log || (() => {}), t.exports = e("./common")(i);
					const {
						formatters: s
					} = t.exports;
					s.j = function(e) {
						try {
							return JSON.stringify(e)
						} catch (e) {
							return "[UnexpectedJSONParseError]: " + e.message
						}
					}
				}).call(this)
			}).call(this, e("_process"))
		}, {
			"./common": 10,
			_process: 29
		}],
		10: [function(e, t, i) {
			t.exports = function(t) {
				function i(e) {
					let t, s, n, o = null;

					function a(...e) {
						if (!a.enabled) return;
						const r = a,
							s = Number(new Date),
							n = s - (t || s);
						r.diff = n, r.prev = t, r.curr = s, t = s, e[0] = i.coerce(e[0]), "string" != typeof e[0] && e.unshift("%O");
						let o = 0;
						e[0] = e[0].replace(/%([a-zA-Z%])/g, ((t, s) => {
							if ("%%" === t) return "%";
							o++;
							const n = i.formatters[s];
							if ("function" == typeof n) {
								const i = e[o];
								t = n.call(r, i), e.splice(o, 1), o--
							}
							return t
						})), i.formatArgs.call(r, e);
						(r.log || i.log).apply(r, e)
					}
					return a.namespace = e, a.useColors = i.useColors(), a.color = i.selectColor(e), a.extend = r, a.destroy = i.destroy, Object.defineProperty(a, "enabled", {
						enumerable: !0,
						configurable: !1,
						get: () => null !== o ? o : (s !== i.namespaces && (s = i.namespaces, n = i.enabled(e)), n),
						set: e => {
							o = e
						}
					}), "function" == typeof i.init && i.init(a), a
				}

				function r(e, t) {
					const r = i(this.namespace + (void 0 === t ? ":" : t) + e);
					return r.log = this.log, r
				}

				function s(e) {
					return e.toString().substring(2, e.toString().length - 2).replace(/\.\*\?$/, "*")
				}
				return i.debug = i, i.default = i, i.coerce = function(e) {
					if (e instanceof Error) return e.stack || e.message;
					return e
				}, i.disable = function() {
					const e = [...i.names.map(s), ...i.skips.map(s).map((e => "-" + e))].join(",");
					return i.enable(""), e
				}, i.enable = function(e) {
					let t;
					i.save(e), i.namespaces = e, i.names = [], i.skips = [];
					const r = ("string" == typeof e ? e : "").split(/[\s,]+/),
						s = r.length;
					for (t = 0; t < s; t++) r[t] && ("-" === (e = r[t].replace(/\*/g, ".*?"))[0] ? i.skips.push(new RegExp("^" + e.substr(1) + "$")) : i.names.push(new RegExp("^" + e + "$")))
				}, i.enabled = function(e) {
					if ("*" === e[e.length - 1]) return !0;
					let t, r;
					for (t = 0, r = i.skips.length; t < r; t++)
						if (i.skips[t].test(e)) return !1;
					for (t = 0, r = i.names.length; t < r; t++)
						if (i.names[t].test(e)) return !0;
					return !1
				}, i.humanize = e("ms"), i.destroy = function() {
					console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")
				}, Object.keys(t).forEach((e => {
					i[e] = t[e]
				})), i.names = [], i.skips = [], i.formatters = {}, i.selectColor = function(e) {
					let t = 0;
					for (let i = 0; i < e.length; i++) t = (t << 5) - t + e.charCodeAt(i), t |= 0;
					return i.colors[Math.abs(t) % i.colors.length]
				}, i.enable(i.load()), i
			}
		}, {
			ms: 22
		}],
		11: [function(e, t, i) {
			(function(e, r, s) {
				(function() {
					var n, o;
					n = this, o = function(t) {
						"use strict";

						function i(e, t) {
							if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
						}

						function n(e, t) {
							for (var i = 0; i < t.length; i++) {
								var r = t[i];
								r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
							}
						}

						function o(e, t, i) {
							return t && n(e.prototype, t), i && n(e, i), e
						}

						function a(e, t, i) {
							return t in e ? Object.defineProperty(e, t, {
								value: i,
								enumerable: !0,
								configurable: !0,
								writable: !0
							}) : e[t] = i, e
						}

						function l(e, t) {
							if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
							e.prototype = Object.create(t && t.prototype, {
								constructor: {
									value: e,
									writable: !0,
									configurable: !0
								}
							});
							var i = ["prototype", "__proto__", "caller", "arguments", "length", "name"];
							Object.getOwnPropertyNames(t).forEach((function(r) {
								-1 === i.indexOf(r) && e[r] !== t[r] && (e[r] = t[r])
							})), t && p(e, t)
						}

						function u(e) {
							return (u = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
								return e.__proto__ || Object.getPrototypeOf(e)
							})(e)
						}

						function p(e, t) {
							return (p = Object.setPrototypeOf || function(e, t) {
								return e.__proto__ = t, e
							})(e, t)
						}

						function c() {
							if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
							if (Reflect.construct.sham) return !1;
							if ("function" == typeof Proxy) return !0;
							try {
								return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
							} catch (e) {
								return !1
							}
						}

						function h(e, t, i) {
							return (h = c() ? Reflect.construct : function(e, t, i) {
								var r = [null];
								r.push.apply(r, t);
								var s = new(Function.bind.apply(e, r));
								return i && p(s, i.prototype), s
							}).apply(null, arguments)
						}

						function d(e) {
							var t = "function" == typeof Map ? new Map : void 0;
							return (d = function(e) {
								if (null === e || (i = e, -1 === Function.toString.call(i).indexOf("[native code]"))) return e;
								var i;
								if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
								if (void 0 !== t) {
									if (t.has(e)) return t.get(e);
									t.set(e, r)
								}

								function r() {
									return h(e, arguments, u(this).constructor)
								}
								return r.prototype = Object.create(e.prototype, {
									constructor: {
										value: r,
										enumerable: !1,
										writable: !0,
										configurable: !0
									}
								}), p(r, e)
							})(e)
						}

						function f(e) {
							if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
							return e
						}

						function m(e, t) {
							return !t || "object" != typeof t && "function" != typeof t ? f(e) : t
						}

						function g(e) {
							var t = c();
							return function() {
								var i, r = u(e);
								if (t) {
									var s = u(this).constructor;
									i = Reflect.construct(r, arguments, s)
								} else i = r.apply(this, arguments);
								return m(this, i)
							}
						}

						function y(e, t, i) {
							return (y = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, i) {
								var r = function(e, t) {
									for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = u(e)););
									return e
								}(e, t);
								if (r) {
									var s = Object.getOwnPropertyDescriptor(r, t);
									return s.get ? s.get.call(i) : s.value
								}
							})(e, t, i || e)
						}
						var v = Object.values || function(e) {
								var t = [];
								for (var i in e) t.push(e[i]);
								return t
							},
							b = Object.entries || function(e) {
								var t = [];
								for (var i in e) t.push([i, e[i]]);
								return t
							},
							w = Object.assign || function(e) {
								for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) i[r - 1] = arguments[r];
								return i.forEach((function(t) {
									for (var i in t) e[i] = t[i]
								})), e
							},
							S = Object.fromEntries || function(e) {
								var t = {};
								return P(e).forEach((function(e) {
									var i = e[0],
										r = e[1];
									t[i] = r
								})), t
							},
							P = Array.from || function(e) {
								if (e instanceof F) {
									var t = [];
									return e.forEach((function(e, i) {
										return t.push([i, e])
									})), t
								}
								return Array.prototype.slice.call(e)
							};

						function k(e) {
							return -1 !== this.indexOf(e)
						}
						Array.prototype.includes || (Array.prototype.includes = k), String.prototype.includes || (String.prototype.includes = k), String.prototype.startsWith || (String.prototype.startsWith = function(e) {
							var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
							return this.substring(t, t + e.length) === e
						}), String.prototype.endsWith || (String.prototype.endsWith = function(e) {
							var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.length;
							return this.substring(t - e.length, t) === e
						});
						var C = "undefined" != typeof self ? self : r,
							E = C.fetch || function(e) {
								var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
								return new Promise((function(i, r) {
									var s = new XMLHttpRequest;
									if (s.open("get", e, !0), s.responseType = "arraybuffer", s.onerror = r, t.headers)
										for (var n in t.headers) s.setRequestHeader(n, t.headers[n]);
									s.onload = function() {
										i({
											ok: s.status >= 200 && s.status < 300,
											status: s.status,
											arrayBuffer: function() {
												return Promise.resolve(s.response)
											}
										})
									}, s.send(null)
								}))
							},
							x = function(e) {
								var t = [];
								if (Object.defineProperties(t, {
										size: {
											get: function() {
												return this.length
											}
										},
										has: {
											value: function(e) {
												return -1 !== this.indexOf(e)
											}
										},
										add: {
											value: function(e) {
												this.has(e) || this.push(e)
											}
										},
										delete: {
											value: function(e) {
												if (this.has(e)) {
													var t = this.indexOf(e);
													this.splice(t, 1)
												}
											}
										}
									}), Array.isArray(e))
									for (var i = 0; i < e.length; i++) t.add(e[i]);
								return t
							},
							_ = function(e) {
								return new F(e)
							},
							F = void 0 !== C.Map && void 0 !== C.Map.prototype.keys ? C.Map : function() {
								function e(t) {
									if (i(this, e), this.clear(), t)
										for (var r = 0; r < t.length; r++) this.set(t[r][0], t[r][1])
								}
								return o(e, [{
									key: "clear",
									value: function() {
										this._map = {}, this._keys = []
									}
								}, {
									key: "size",
									get: function() {
										return this._keys.length
									}
								}, {
									key: "get",
									value: function(e) {
										return this._map["map_" + e]
									}
								}, {
									key: "set",
									value: function(e, t) {
										return this._map["map_" + e] = t, this._keys.indexOf(e) < 0 && this._keys.push(e), this
									}
								}, {
									key: "has",
									value: function(e) {
										return this._keys.indexOf(e) >= 0
									}
								}, {
									key: "delete",
									value: function(e) {
										var t = this._keys.indexOf(e);
										return !(t < 0 || (delete this._map["map_" + e], this._keys.splice(t, 1), 0))
									}
								}, {
									key: "keys",
									value: function() {
										return this._keys.slice(0)
									}
								}, {
									key: "values",
									value: function() {
										var e = this;
										return this._keys.map((function(t) {
											return e.get(t)
										}))
									}
								}, {
									key: "entries",
									value: function() {
										var e = this;
										return this._keys.map((function(t) {
											return [t, e.get(t)]
										}))
									}
								}, {
									key: "forEach",
									value: function(e, t) {
										for (var i = 0; i < this._keys.length; i++) e.call(t, this._map["map_" + this._keys[i]], this._keys[i], this)
									}
								}]), e
							}(),
							O = "undefined" != typeof self ? self : r,
							A = "undefined" != typeof navigator,
							T = A && "undefined" == typeof HTMLImageElement,
							R = !(void 0 === r || void 0 === e || !e.versions || !e.versions.node),
							U = O.Buffer,
							D = !!U,
							I = function(e) {
								return void 0 !== e
							};

						function B(e) {
							return void 0 === e || (e instanceof F ? 0 === e.size : 0 === v(e).filter(I).length)
						}

						function N(e) {
							var t = new Error(e);
							throw delete t.stack, t
						}

						function M(e) {
							var t = function(e) {
								var t = 0;
								return e.ifd0.enabled && (t += 1024), e.exif.enabled && (t += 2048), e.makerNote && (t += 2048), e.userComment && (t += 1024), e.gps.enabled && (t += 512), e.interop.enabled && (t += 100), e.ifd1.enabled && (t += 1024), t + 2048
							}(e);
							return e.jfif.enabled && (t += 50), e.xmp.enabled && (t += 2e4), e.iptc.enabled && (t += 14e3), e.icc.enabled && (t += 6e3), t
						}
						var j = function(e) {
								return String.fromCharCode.apply(null, e)
							},
							L = "undefined" != typeof TextDecoder ? new TextDecoder("utf-8") : void 0;

						function z(e) {
							return L ? L.decode(e) : D ? s.from(e).toString("utf8") : decodeURIComponent(escape(j(e)))
						}
						var H = function() {
							function e(t) {
								var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
									s = arguments.length > 2 ? arguments[2] : void 0,
									n = arguments.length > 3 ? arguments[3] : void 0;
								if (i(this, e), "boolean" == typeof n && (this.le = n), Array.isArray(t) && (t = new Uint8Array(t)), 0 === t) this.byteOffset = 0, this.byteLength = 0;
								else if (t instanceof ArrayBuffer) {
									void 0 === s && (s = t.byteLength - r);
									var o = new DataView(t, r, s);
									this._swapDataView(o)
								} else if (t instanceof Uint8Array || t instanceof DataView || t instanceof e) {
									void 0 === s && (s = t.byteLength - r), (r += t.byteOffset) + s > t.byteOffset + t.byteLength && N("Creating view outside of available memory in ArrayBuffer");
									var a = new DataView(t.buffer, r, s);
									this._swapDataView(a)
								} else if ("number" == typeof t) {
									var l = new DataView(new ArrayBuffer(t));
									this._swapDataView(l)
								} else N("Invalid input argument for BufferView: " + t)
							}
							return o(e, [{
								key: "_swapArrayBuffer",
								value: function(e) {
									this._swapDataView(new DataView(e))
								}
							}, {
								key: "_swapBuffer",
								value: function(e) {
									this._swapDataView(new DataView(e.buffer, e.byteOffset, e.byteLength))
								}
							}, {
								key: "_swapDataView",
								value: function(e) {
									this.dataView = e, this.buffer = e.buffer, this.byteOffset = e.byteOffset, this.byteLength = e.byteLength
								}
							}, {
								key: "_lengthToEnd",
								value: function(e) {
									return this.byteLength - e
								}
							}, {
								key: "set",
								value: function(t, i) {
									var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e;
									t instanceof DataView || t instanceof e ? t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : t instanceof ArrayBuffer && (t = new Uint8Array(t)), t instanceof Uint8Array || N("BufferView.set(): Invalid data argument.");
									var s = this.toUint8();
									return s.set(t, i), new r(this, i, t.byteLength)
								}
							}, {
								key: "subarray",
								value: function(t, i) {
									return new e(this, t, i = i || this._lengthToEnd(t))
								}
							}, {
								key: "toUint8",
								value: function() {
									return new Uint8Array(this.buffer, this.byteOffset, this.byteLength)
								}
							}, {
								key: "getUint8Array",
								value: function(e, t) {
									return new Uint8Array(this.buffer, this.byteOffset + e, t)
								}
							}, {
								key: "getString",
								value: function() {
									var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
										t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.byteLength,
										i = this.getUint8Array(e, t);
									return z(i)
								}
							}, {
								key: "getLatin1String",
								value: function() {
									var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
										t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.byteLength,
										i = this.getUint8Array(e, t);
									return j(i)
								}
							}, {
								key: "getUnicodeString",
								value: function() {
									for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.byteLength, i = [], r = 0; r < t && e + r < this.byteLength; r += 2) i.push(this.getUint16(e + r));
									return j(i)
								}
							}, {
								key: "getInt8",
								value: function(e) {
									return this.dataView.getInt8(e)
								}
							}, {
								key: "getUint8",
								value: function(e) {
									return this.dataView.getUint8(e)
								}
							}, {
								key: "getInt16",
								value: function(e) {
									var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
									return this.dataView.getInt16(e, t)
								}
							}, {
								key: "getInt32",
								value: function(e) {
									var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
									return this.dataView.getInt32(e, t)
								}
							}, {
								key: "getUint16",
								value: function(e) {
									var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
									return this.dataView.getUint16(e, t)
								}
							}, {
								key: "getUint32",
								value: function(e) {
									var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
									return this.dataView.getUint32(e, t)
								}
							}, {
								key: "getFloat32",
								value: function(e) {
									var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
									return this.dataView.getFloat32(e, t)
								}
							}, {
								key: "getFloat64",
								value: function(e) {
									var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
									return this.dataView.getFloat64(e, t)
								}
							}, {
								key: "getFloat",
								value: function(e) {
									var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
									return this.dataView.getFloat32(e, t)
								}
							}, {
								key: "getDouble",
								value: function(e) {
									var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.le;
									return this.dataView.getFloat64(e, t)
								}
							}, {
								key: "getUintBytes",
								value: function(e, t, i) {
									switch (t) {
										case 1:
											return this.getUint8(e, i);
										case 2:
											return this.getUint16(e, i);
										case 4:
											return this.getUint32(e, i);
										case 8:
											return this.getUint64 && this.getUint64(e, i)
									}
								}
							}, {
								key: "getUint",
								value: function(e, t, i) {
									switch (t) {
										case 8:
											return this.getUint8(e, i);
										case 16:
											return this.getUint16(e, i);
										case 32:
											return this.getUint32(e, i);
										case 64:
											return this.getUint64 && this.getUint64(e, i)
									}
								}
							}, {
								key: "toString",
								value: function(e) {
									return this.dataView.toString(e, this.constructor.name)
								}
							}, {
								key: "ensureChunk",
								value: function() {}
							}], [{
								key: "from",
								value: function(t, i) {
									return t instanceof this && t.le === i ? t : new e(t, void 0, void 0, i)
								}
							}]), e
						}();

						function $(e, t) {
							N("".concat(e, " '").concat(t, "' was not loaded, try using full build of exifr."))
						}
						var q = function(e) {
								l(r, e);
								var t = g(r);

								function r(e) {
									var s;
									return i(this, r), (s = t.call(this)).kind = e, s
								}
								return o(r, [{
									key: "get",
									value: function(e, t) {
										return this.has(e) || $(this.kind, e), t && (e in t || function(e, t) {
											N("Unknown ".concat(e, " '").concat(t, "'."))
										}(this.kind, e), t[e].enabled || $(this.kind, e)), y(u(r.prototype), "get", this).call(this, e)
									}
								}, {
									key: "keyList",
									value: function() {
										return P(this.keys())
									}
								}]), r
							}(d(F)),
							V = new q("file parser"),
							W = new q("segment parser"),
							X = new q("file reader");

						function G(e) {
							return function() {
								for (var t = [], i = 0; i < arguments.length; i++) t[i] = arguments[i];
								try {
									return Promise.resolve(e.apply(this, t))
								} catch (e) {
									return Promise.reject(e)
								}
							}
						}

						function K(e, t, i) {
							return i ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e)
						}
						var Y = G((function(e) {
								return new Promise((function(t, i) {
									var r = new FileReader;
									r.onloadend = function() {
										return t(r.result || new ArrayBuffer)
									}, r.onerror = i, r.readAsArrayBuffer(e)
								}))
							})),
							Q = G((function(e) {
								return E(e).then((function(e) {
									return e.arrayBuffer()
								}))
							})),
							J = G((function(e, t) {
								return K(t(e), (function(e) {
									return new H(e)
								}))
							})),
							Z = G((function(e, t, i) {
								var r = new(X.get(i))(e, t);
								return K(r.read(), (function() {
									return r
								}))
							})),
							ee = G((function(e, t, i, r) {
								return X.has(i) ? Z(e, t, i) : r ? J(e, r) : (N("Parser ".concat(i, " is not loaded")), K())
							})),
							te = "Invalid input argument";

						function ie(e, t) {
							return (i = e).startsWith("data:") || i.length > 1e4 ? Z(e, t, "base64") : A ? ee(e, t, "url", Q) : R ? Z(e, t, "fs") : void N(te);
							var i
						}
						var re = function(e) {
							l(r, e);
							var t = g(r);

							function r() {
								return i(this, r), t.apply(this, arguments)
							}
							return o(r, [{
								key: "tagKeys",
								get: function() {
									return this.allKeys || (this.allKeys = P(this.keys())), this.allKeys
								}
							}, {
								key: "tagValues",
								get: function() {
									return this.allValues || (this.allValues = P(this.values())), this.allValues
								}
							}]), r
						}(d(F));

						function se(e, t, i) {
							var r = new re,
								s = i;
							Array.isArray(s) || ("function" == typeof s.entries && (s = s.entries()), s = P(s));
							for (var n = 0; n < s.length; n++) {
								var o = s[n],
									a = o[0],
									l = o[1];
								r.set(a, l)
							}
							if (Array.isArray(t)) {
								var u = t;
								Array.isArray(u) || ("function" == typeof u.entries && (u = u.entries()), u = P(u));
								for (var p = 0; p < u.length; p++) {
									var c = u[p];
									e.set(c, r)
								}
							} else e.set(t, r);
							return r
						}

						function ne(e, t, i) {
							var r, s = e.get(t),
								n = i;
							Array.isArray(n) || ("function" == typeof n.entries && (n = n.entries()), n = P(n));
							for (var o = 0; o < n.length; o++) r = n[o], s.set(r[0], r[1])
						}
						var oe = _(),
							ae = _(),
							le = _(),
							ue = 37500,
							pe = 37510,
							ce = 33723,
							he = 34675,
							de = 34665,
							fe = 34853,
							me = 40965,
							ge = ["chunked", "firstChunkSize", "firstChunkSizeNode", "firstChunkSizeBrowser", "chunkSize", "chunkLimit"],
							ye = ["jfif", "xmp", "icc", "iptc", "ihdr"],
							ve = ["tiff"].concat(ye),
							be = ["ifd0", "ifd1", "exif", "gps", "interop"],
							we = [].concat(ve, be),
							Se = ["makerNote", "userComment"],
							Pe = ["translateKeys", "translateValues", "reviveValues", "multiSegment"],
							ke = [].concat(Pe, ["sanitize", "mergeOutput", "silentErrors"]),
							Ce = function() {
								function e() {
									i(this, e)
								}
								return o(e, [{
									key: "translate",
									get: function() {
										return this.translateKeys || this.translateValues || this.reviveValues
									}
								}]), e
							}(),
							Ee = function(e) {
								l(r, e);
								var t = g(r);

								function r(e, s, n, o) {
									var l;
									if (i(this, r), a(f(l = t.call(this)), "enabled", !1), a(f(l), "skip", x()), a(f(l), "pick", x()), a(f(l), "deps", x()), a(f(l), "translateKeys", !1), a(f(l), "translateValues", !1), a(f(l), "reviveValues", !1), l.key = e, l.enabled = s, l.parse = l.enabled, l.applyInheritables(o), l.canBeFiltered = be.includes(e), l.canBeFiltered && (l.dict = oe.get(e)), void 0 !== n)
										if (Array.isArray(n)) l.parse = l.enabled = !0, l.canBeFiltered && n.length > 0 && l.translateTagSet(n, l.pick);
										else if ("object" == typeof n) {
										if (l.enabled = !0, l.parse = !1 !== n.parse, l.canBeFiltered) {
											var u = n.pick,
												p = n.skip;
											u && u.length > 0 && l.translateTagSet(u, l.pick), p && p.length > 0 && l.translateTagSet(p, l.skip)
										}
										l.applyInheritables(n)
									} else !0 === n || !1 === n ? l.parse = l.enabled = n : N("Invalid options argument: ".concat(n));
									return l
								}
								return o(r, [{
									key: "needed",
									get: function() {
										return this.enabled || this.deps.size > 0
									}
								}, {
									key: "applyInheritables",
									value: function(e) {
										var t, i, r = Pe;
										Array.isArray(r) || ("function" == typeof r.entries && (r = r.entries()), r = P(r));
										for (var s = 0; s < r.length; s++) void 0 !== (i = e[t = r[s]]) && (this[t] = i)
									}
								}, {
									key: "translateTagSet",
									value: function(e, t) {
										if (this.dict) {
											var i, r, s = this.dict,
												n = s.tagKeys,
												o = s.tagValues,
												a = e;
											Array.isArray(a) || ("function" == typeof a.entries && (a = a.entries()), a = P(a));
											for (var l = 0; l < a.length; l++) "string" == typeof(i = a[l]) ? (-1 === (r = o.indexOf(i)) && (r = n.indexOf(Number(i))), -1 !== r && t.add(Number(n[r]))) : t.add(i)
										} else {
											var u = e;
											Array.isArray(u) || ("function" == typeof u.entries && (u = u.entries()), u = P(u));
											for (var p = 0; p < u.length; p++) {
												var c = u[p];
												t.add(c)
											}
										}
									}
								}, {
									key: "finalizeFilters",
									value: function() {
										!this.enabled && this.deps.size > 0 ? (this.enabled = !0, Te(this.pick, this.deps)) : this.enabled && this.pick.size > 0 && Te(this.pick, this.deps)
									}
								}]), r
							}(Ce),
							xe = {
								jfif: !1,
								tiff: !0,
								xmp: !1,
								icc: !1,
								iptc: !1,
								ifd0: !0,
								ifd1: !1,
								exif: !0,
								gps: !0,
								interop: !1,
								ihdr: void 0,
								makerNote: !1,
								userComment: !1,
								multiSegment: !1,
								skip: [],
								pick: [],
								translateKeys: !0,
								translateValues: !0,
								reviveValues: !0,
								sanitize: !0,
								mergeOutput: !0,
								silentErrors: !0,
								chunked: !0,
								firstChunkSize: void 0,
								firstChunkSizeNode: 512,
								firstChunkSizeBrowser: 65536,
								chunkSize: 65536,
								chunkLimit: 5
							},
							_e = _(),
							Fe = function(e) {
								l(r, e);
								var t = g(r);

								function r(e) {
									var s;
									return i(this, r), s = t.call(this), !0 === e ? s.setupFromTrue() : void 0 === e ? s.setupFromUndefined() : Array.isArray(e) ? s.setupFromArray(e) : "object" == typeof e ? s.setupFromObject(e) : N("Invalid options argument ".concat(e)), void 0 === s.firstChunkSize && (s.firstChunkSize = A ? s.firstChunkSizeBrowser : s.firstChunkSizeNode), s.mergeOutput && (s.ifd1.enabled = !1), s.filterNestedSegmentTags(), s.traverseTiffDependencyTree(), s.checkLoadedPlugins(), s
								}
								return o(r, [{
									key: "setupFromUndefined",
									value: function() {
										var e, t = ge;
										Array.isArray(t) || ("function" == typeof t.entries && (t = t.entries()), t = P(t));
										for (var i = 0; i < t.length; i++) this[e = t[i]] = xe[e];
										var r = ke;
										Array.isArray(r) || ("function" == typeof r.entries && (r = r.entries()), r = P(r));
										for (var s = 0; s < r.length; s++) this[e = r[s]] = xe[e];
										var n = Se;
										Array.isArray(n) || ("function" == typeof n.entries && (n = n.entries()), n = P(n));
										for (var o = 0; o < n.length; o++) this[e = n[o]] = xe[e];
										var a = we;
										Array.isArray(a) || ("function" == typeof a.entries && (a = a.entries()), a = P(a));
										for (var l = 0; l < a.length; l++) this[e = a[l]] = new Ee(e, xe[e], void 0, this)
									}
								}, {
									key: "setupFromTrue",
									value: function() {
										var e, t = ge;
										Array.isArray(t) || ("function" == typeof t.entries && (t = t.entries()), t = P(t));
										for (var i = 0; i < t.length; i++) this[e = t[i]] = xe[e];
										var r = ke;
										Array.isArray(r) || ("function" == typeof r.entries && (r = r.entries()), r = P(r));
										for (var s = 0; s < r.length; s++) this[e = r[s]] = xe[e];
										var n = Se;
										Array.isArray(n) || ("function" == typeof n.entries && (n = n.entries()), n = P(n));
										for (var o = 0; o < n.length; o++) this[e = n[o]] = !0;
										var a = we;
										Array.isArray(a) || ("function" == typeof a.entries && (a = a.entries()), a = P(a));
										for (var l = 0; l < a.length; l++) this[e = a[l]] = new Ee(e, !0, void 0, this)
									}
								}, {
									key: "setupFromArray",
									value: function(e) {
										var t, i = ge;
										Array.isArray(i) || ("function" == typeof i.entries && (i = i.entries()), i = P(i));
										for (var r = 0; r < i.length; r++) this[t = i[r]] = xe[t];
										var s = ke;
										Array.isArray(s) || ("function" == typeof s.entries && (s = s.entries()), s = P(s));
										for (var n = 0; n < s.length; n++) this[t = s[n]] = xe[t];
										var o = Se;
										Array.isArray(o) || ("function" == typeof o.entries && (o = o.entries()), o = P(o));
										for (var a = 0; a < o.length; a++) this[t = o[a]] = xe[t];
										var l = we;
										Array.isArray(l) || ("function" == typeof l.entries && (l = l.entries()), l = P(l));
										for (var u = 0; u < l.length; u++) this[t = l[u]] = new Ee(t, !1, void 0, this);
										this.setupGlobalFilters(e, void 0, be)
									}
								}, {
									key: "setupFromObject",
									value: function(e) {
										var t;
										be.ifd0 = be.ifd0 || be.image, be.ifd1 = be.ifd1 || be.thumbnail, w(this, e);
										var i = ge;
										Array.isArray(i) || ("function" == typeof i.entries && (i = i.entries()), i = P(i));
										for (var r = 0; r < i.length; r++) this[t = i[r]] = Ae(e[t], xe[t]);
										var s = ke;
										Array.isArray(s) || ("function" == typeof s.entries && (s = s.entries()), s = P(s));
										for (var n = 0; n < s.length; n++) this[t = s[n]] = Ae(e[t], xe[t]);
										var o = Se;
										Array.isArray(o) || ("function" == typeof o.entries && (o = o.entries()), o = P(o));
										for (var a = 0; a < o.length; a++) this[t = o[a]] = Ae(e[t], xe[t]);
										var l = ve;
										Array.isArray(l) || ("function" == typeof l.entries && (l = l.entries()), l = P(l));
										for (var u = 0; u < l.length; u++) this[t = l[u]] = new Ee(t, xe[t], e[t], this);
										var p = be;
										Array.isArray(p) || ("function" == typeof p.entries && (p = p.entries()), p = P(p));
										for (var c = 0; c < p.length; c++) this[t = p[c]] = new Ee(t, xe[t], e[t], this.tiff);
										this.setupGlobalFilters(e.pick, e.skip, be, we), !0 === e.tiff ? this.batchEnableWithBool(be, !0) : !1 === e.tiff ? this.batchEnableWithUserValue(be, e) : Array.isArray(e.tiff) ? this.setupGlobalFilters(e.tiff, void 0, be) : "object" == typeof e.tiff && this.setupGlobalFilters(e.tiff.pick, e.tiff.skip, be)
									}
								}, {
									key: "batchEnableWithBool",
									value: function(e, t) {
										var i = e;
										Array.isArray(i) || ("function" == typeof i.entries && (i = i.entries()), i = P(i));
										for (var r = 0; r < i.length; r++) this[i[r]].enabled = t
									}
								}, {
									key: "batchEnableWithUserValue",
									value: function(e, t) {
										var i = e;
										Array.isArray(i) || ("function" == typeof i.entries && (i = i.entries()), i = P(i));
										for (var r = 0; r < i.length; r++) {
											var s = i[r],
												n = t[s];
											this[s].enabled = !1 !== n && void 0 !== n
										}
									}
								}, {
									key: "setupGlobalFilters",
									value: function(e, t, i) {
										var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : i;
										if (e && e.length) {
											var s = r;
											Array.isArray(s) || ("function" == typeof s.entries && (s = s.entries()), s = P(s));
											for (var n = 0; n < s.length; n++) {
												var o = s[n];
												this[o].enabled = !1
											}
											var a = Oe(e, i),
												l = a;
											Array.isArray(l) || ("function" == typeof l.entries && (l = l.entries()), l = P(l));
											for (var u = 0; u < l.length; u++) {
												var p = l[u],
													c = p[0],
													h = p[1];
												Te(this[c].pick, h), this[c].enabled = !0
											}
										} else if (t && t.length) {
											var d = Oe(t, i),
												f = d;
											Array.isArray(f) || ("function" == typeof f.entries && (f = f.entries()), f = P(f));
											for (var m = 0; m < f.length; m++) {
												var g = f[m],
													y = g[0],
													v = g[1];
												Te(this[y].skip, v)
											}
										}
									}
								}, {
									key: "filterNestedSegmentTags",
									value: function() {
										var e = this.ifd0,
											t = this.exif,
											i = this.xmp,
											r = this.iptc,
											s = this.icc;
										this.makerNote ? t.deps.add(ue) : t.skip.add(ue), this.userComment ? t.deps.add(pe) : t.skip.add(pe), i.enabled || e.skip.add(700), r.enabled || e.skip.add(ce), s.enabled || e.skip.add(he)
									}
								}, {
									key: "traverseTiffDependencyTree",
									value: function() {
										var e = this,
											t = this.ifd0,
											i = this.exif,
											r = this.gps;
										this.interop.needed && (i.deps.add(me), t.deps.add(me)), i.needed && t.deps.add(de), r.needed && t.deps.add(fe), this.tiff.enabled = be.some((function(t) {
											return !0 === e[t].enabled
										})) || this.makerNote || this.userComment;
										var s = be;
										Array.isArray(s) || ("function" == typeof s.entries && (s = s.entries()), s = P(s));
										for (var n = 0; n < s.length; n++) this[s[n]].finalizeFilters()
									}
								}, {
									key: "onlyTiff",
									get: function() {
										var e = this;
										return !ye.map((function(t) {
											return e[t].enabled
										})).some((function(e) {
											return !0 === e
										})) && this.tiff.enabled
									}
								}, {
									key: "checkLoadedPlugins",
									value: function() {
										var e = ve;
										Array.isArray(e) || ("function" == typeof e.entries && (e = e.entries()), e = P(e));
										for (var t = 0; t < e.length; t++) {
											var i = e[t];
											this[i].enabled && !W.has(i) && $("segment parser", i)
										}
									}
								}], [{
									key: "useCached",
									value: function(e) {
										var t = _e.get(e);
										return void 0 !== t || (t = new this(e), _e.set(e, t)), t
									}
								}]), r
							}(Ce);

						function Oe(e, t) {
							var i, r, s, n = [],
								o = t;
							Array.isArray(o) || ("function" == typeof o.entries && (o = o.entries()), o = P(o));
							for (var a = 0; a < o.length; a++) {
								r = o[a], i = [];
								var l = oe.get(r);
								Array.isArray(l) || ("function" == typeof l.entries && (l = l.entries()), l = P(l));
								for (var u = 0; u < l.length; u++) s = l[u], (e.includes(s[0]) || e.includes(s[1])) && i.push(s[0]);
								i.length && n.push([r, i])
							}
							return n
						}

						function Ae(e, t) {
							return void 0 !== e ? e : void 0 !== t ? t : void 0
						}

						function Te(e, t) {
							var i = t;
							Array.isArray(i) || ("function" == typeof i.entries && (i = i.entries()), i = P(i));
							for (var r = 0; r < i.length; r++) {
								var s = i[r];
								e.add(s)
							}
						}

						function Re(e, t, i) {
							return i ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e)
						}

						function Ue() {}

						function De(e, t) {
							if (!t) return e && e.then ? e.then(Ue) : Promise.resolve()
						}

						function Ie(e, t) {
							var i = e();
							return i && i.then ? i.then(t) : t(i)
						}
						a(Fe, "default", xe);
						var Be, Ne = function() {
								function e(t) {
									i(this, e), a(this, "parsers", {}), this.options = Fe.useCached(t)
								}
								return o(e, [{
									key: "setup",
									value: function() {
										if (!this.fileParser) {
											var e = this.file,
												t = e.getUint16(0),
												i = V;
											Array.isArray(i) || ("function" == typeof i.entries && (i = i.entries()), i = P(i));
											for (var r = 0; r < i.length; r++) {
												var s = i[r],
													n = s[0],
													o = s[1];
												if (o.canHandle(e, t)) return this.fileParser = new o(this.options, this.file, this.parsers), e[n] = !0
											}
											N("Unknown file format")
										}
									}
								}, {
									key: "read",
									value: function(e) {
										try {
											var t = this;
											return Re(function(e, t) {
												return "string" == typeof e ? ie(e, t) : A && !T && e instanceof HTMLImageElement ? ie(e.src, t) : e instanceof Uint8Array || e instanceof ArrayBuffer || e instanceof DataView ? new H(e) : A && e instanceof Blob ? ee(e, t, "blob", Y) : void N(te)
											}(e, t.options), (function(e) {
												t.file = e
											}))
										} catch (e) {
											return Promise.reject(e)
										}
									}
								}, {
									key: "parse",
									value: function() {
										try {
											var e = this;
											e.setup();
											var t = {},
												i = [];
											return Ie((function() {
												return e.options.silentErrors ? Re(e.doParse(t, i).catch((function(e) {
													return i.push(e)
												})), (function() {
													i.push.apply(i, e.fileParser.errors)
												})) : De(e.doParse(t, i))
											}), (function() {
												return e.file.close && e.file.close(), e.options.silentErrors && i.length > 0 && (t.errors = i), B(r = t) ? void 0 : r;
												var r
											}))
										} catch (e) {
											return Promise.reject(e)
										}
									}
								}, {
									key: "doParse",
									value: function(e, t) {
										try {
											var i = this;
											return Re(i.fileParser.parse(), (function() {
												var r, s = v(i.parsers).map((r = function(t) {
													return Re(t.parse(), (function(i) {
														t.assignToOutput(e, i)
													}))
												}, function() {
													for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
													try {
														return Promise.resolve(r.apply(this, e))
													} catch (e) {
														return Promise.reject(e)
													}
												}));
												if (i.options.silentErrors) {
													var n = function(e) {
														return t.push(e)
													};
													s = s.map((function(e) {
														return e.catch(n)
													}))
												}
												return De(Promise.all(s))
											}))
										} catch (e) {
											return Promise.reject(e)
										}
									}
								}, {
									key: "extractThumbnail",
									value: function() {
										try {
											var e = this;
											e.setup();
											var t, i = e.options,
												r = e.file,
												s = W.get("tiff", i);
											return Ie((function() {
												if (!r.tiff) return function(e) {
													var t = e();
													if (t && t.then) return t.then(Ue)
												}((function() {
													if (r.jpeg) return Re(e.fileParser.getOrFindSegment("tiff"), (function(e) {
														t = e
													}))
												}));
												t = {
													start: 0,
													type: "tiff"
												}
											}), (function() {
												if (void 0 !== t) return Re(e.fileParser.ensureSegmentChunk(t), (function(t) {
													return Re((e.parsers.tiff = new s(t, i, r)).extractThumbnail(), (function(e) {
														return r.close && r.close(), e
													}))
												}))
											}))
										} catch (e) {
											return Promise.reject(e)
										}
									}
								}]), e
							}(),
							Me = (Be = function(e, t) {
								var i, r, s = new Ne(t);
								return r = function() {
									return s.parse()
								}, (i = s.read(e)) && i.then || (i = Promise.resolve(i)), r ? i.then(r) : i
							}, function() {
								for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
								try {
									return Promise.resolve(Be.apply(this, e))
								} catch (e) {
									return Promise.reject(e)
								}
							}),
							je = Object.freeze({
								__proto__: null,
								parse: Me,
								Exifr: Ne,
								fileParsers: V,
								segmentParsers: W,
								fileReaders: X,
								tagKeys: oe,
								tagValues: ae,
								tagRevivers: le,
								createDictionary: se,
								extendDictionary: ne,
								fetchUrlAsArrayBuffer: Q,
								readBlobAsArrayBuffer: Y,
								chunkedProps: ge,
								otherSegments: ye,
								segments: ve,
								tiffBlocks: be,
								segmentsAndBlocks: we,
								tiffExtractables: Se,
								inheritables: Pe,
								allFormatters: ke,
								Options: Fe
							});

						function Le() {}
						var ze = function() {
								function e(t, r, s) {
									var n = this;
									i(this, e), a(this, "errors", []), a(this, "ensureSegmentChunk", function(e) {
										return function() {
											for (var t = [], i = 0; i < arguments.length; i++) t[i] = arguments[i];
											try {
												return Promise.resolve(e.apply(this, t))
											} catch (e) {
												return Promise.reject(e)
											}
										}
									}((function(e) {
										var t, i, r, s = e.start,
											o = e.size || 65536;
										return t = function() {
											if (n.file.chunked) return function(e) {
												var t = e();
												if (t && t.then) return t.then(Le)
											}((function() {
												if (!n.file.available(s, o)) return function(e) {
													if (e && e.then) return e.then(Le)
												}(function(e, t) {
													try {
														var i = e()
													} catch (e) {
														return t(e)
													}
													return i && i.then ? i.then(void 0, t) : i
												}((function() {
													return i = function(t) {
														e.chunk = t
													}, (t = n.file.readChunk(s, o)) && t.then || (t = Promise.resolve(t)), i ? t.then(i) : t;
													var t, i
												}), (function(t) {
													N("Couldn't read segment: ".concat(JSON.stringify(e), ". ").concat(t.message))
												})));
												e.chunk = n.file.subarray(s, o)
											}));
											n.file.byteLength > s + o ? e.chunk = n.file.subarray(s, o) : void 0 === e.size ? e.chunk = n.file.subarray(s) : N("Segment unreachable: " + JSON.stringify(e))
										}, i = function() {
											return e.chunk
										}, (r = t()) && r.then ? r.then(i) : i()
									}))), this.extendOptions && this.extendOptions(t), this.options = t, this.file = r, this.parsers = s
								}
								return o(e, [{
									key: "injectSegment",
									value: function(e, t) {
										this.options[e].enabled && this.createParser(e, t)
									}
								}, {
									key: "createParser",
									value: function(e, t) {
										var i = new(W.get(e))(t, this.options, this.file);
										return this.parsers[e] = i
									}
								}, {
									key: "createParsers",
									value: function(e) {
										var t = e;
										Array.isArray(t) || ("function" == typeof t.entries && (t = t.entries()), t = P(t));
										for (var i = 0; i < t.length; i++) {
											var r = t[i],
												s = r.type,
												n = r.chunk,
												o = this.options[s];
											if (o && o.enabled) {
												var a = this.parsers[s];
												a && a.append || a || this.createParser(s, n)
											}
										}
									}
								}, {
									key: "readSegments",
									value: function(e) {
										try {
											var t = e.map(this.ensureSegmentChunk);
											return function(e, t) {
												return e && e.then ? e.then(Le) : Promise.resolve()
											}(Promise.all(t))
										} catch (e) {
											return Promise.reject(e)
										}
									}
								}]), e
							}(),
							He = function() {
								function e(t) {
									var r = this,
										s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
										n = arguments.length > 2 ? arguments[2] : void 0;
									i(this, e), a(this, "errors", []), a(this, "raw", _()), a(this, "handleError", (function(e) {
										if (!r.options.silentErrors) throw e;
										r.errors.push(e.message)
									})), this.chunk = this.normalizeInput(t), this.file = n, this.type = this.constructor.type, this.globalOptions = this.options = s, this.localOptions = s[this.type], this.canTranslate = this.localOptions && this.localOptions.translate
								}
								return o(e, [{
									key: "normalizeInput",
									value: function(e) {
										return e instanceof H ? e : new H(e)
									}
								}, {
									key: "translate",
									value: function() {
										this.canTranslate && (this.translated = this.translateBlock(this.raw, this.type))
									}
								}, {
									key: "output",
									get: function() {
										return this.translated ? this.translated : this.raw ? S(this.raw) : void 0
									}
								}, {
									key: "translateBlock",
									value: function(e, t) {
										var i = le.get(t),
											r = ae.get(t),
											s = oe.get(t),
											n = this.options[t],
											o = n.reviveValues && !!i,
											a = n.translateValues && !!r,
											l = n.translateKeys && !!s,
											u = {},
											p = e;
										Array.isArray(p) || ("function" == typeof p.entries && (p = p.entries()), p = P(p));
										for (var c = 0; c < p.length; c++) {
											var h = p[c],
												d = h[0],
												f = h[1];
											o && i.has(d) ? f = i.get(d)(f) : a && r.has(d) && (f = this.translateValue(f, r.get(d))), l && s.has(d) && (d = s.get(d) || d), u[d] = f
										}
										return u
									}
								}, {
									key: "translateValue",
									value: function(e, t) {
										return t[e] || t.DEFAULT || e
									}
								}, {
									key: "assignToOutput",
									value: function(e, t) {
										this.assignObjectToOutput(e, this.constructor.type, t)
									}
								}, {
									key: "assignObjectToOutput",
									value: function(e, t, i) {
										if (this.globalOptions.mergeOutput) return w(e, i);
										e[t] ? w(e[t], i) : e[t] = i
									}
								}], [{
									key: "findPosition",
									value: function(e, t) {
										var i = e.getUint16(t + 2) + 2,
											r = "function" == typeof this.headerLength ? this.headerLength(e, t, i) : this.headerLength,
											s = t + r,
											n = i - r;
										return {
											offset: t,
											length: i,
											headerLength: r,
											start: s,
											size: n,
											end: s + n
										}
									}
								}, {
									key: "parse",
									value: function(e) {
										var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
											i = new Fe(a({}, this.type, t)),
											r = new this(e, i);
										return r.parse()
									}
								}]), e
							}();

						function $e(e, t, i) {
							return i ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e)
						}

						function qe() {}

						function Ve(e, t) {
							if (!t) return e && e.then ? e.then(qe) : Promise.resolve()
						}

						function We(e) {
							var t = e();
							if (t && t.then) return t.then(qe)
						}

						function Xe(e, t) {
							var i = e();
							return i && i.then ? i.then(t) : t(i)
						}

						function Ge(e, t, i) {
							if (!e.s) {
								if (i instanceof Ke) {
									if (!i.s) return void(i.o = Ge.bind(null, e, t));
									1 & t && (t = i.s), i = i.v
								}
								if (i && i.then) return void i.then(Ge.bind(null, e, t), Ge.bind(null, e, 2));
								e.s = t, e.v = i;
								var r = e.o;
								r && r(e)
							}
						}
						a(He, "headerLength", 4), a(He, "type", void 0), a(He, "multiSegment", !1), a(He, "canHandle", (function() {
							return !1
						}));
						var Ke = function() {
							function e() {}
							return e.prototype.then = function(t, i) {
								var r = new e,
									s = this.s;
								if (s) {
									var n = 1 & s ? t : i;
									if (n) {
										try {
											Ge(r, 1, n(this.v))
										} catch (e) {
											Ge(r, 2, e)
										}
										return r
									}
									return this
								}
								return this.o = function(e) {
									try {
										var s = e.v;
										1 & e.s ? Ge(r, 1, t ? t(s) : s) : i ? Ge(r, 1, i(s)) : Ge(r, 2, s)
									} catch (e) {
										Ge(r, 2, e)
									}
								}, r
							}, e
						}();

						function Ye(e) {
							return e instanceof Ke && 1 & e.s
						}

						function Qe(e, t, i) {
							for (var r;;) {
								var s = e();
								if (Ye(s) && (s = s.v), !s) return n;
								if (s.then) {
									r = 0;
									break
								}
								var n = i();
								if (n && n.then) {
									if (!Ye(n)) {
										r = 1;
										break
									}
									n = n.s
								}
								if (t) {
									var o = t();
									if (o && o.then && !Ye(o)) {
										r = 2;
										break
									}
								}
							}
							var a = new Ke,
								l = Ge.bind(null, a, 2);
							return (0 === r ? s.then(p) : 1 === r ? n.then(u) : o.then(c)).then(void 0, l), a;

							function u(r) {
								n = r;
								do {
									if (t && (o = t()) && o.then && !Ye(o)) return void o.then(c).then(void 0, l);
									if (!(s = e()) || Ye(s) && !s.v) return void Ge(a, 1, n);
									if (s.then) return void s.then(p).then(void 0, l);
									Ye(n = i()) && (n = n.v)
								} while (!n || !n.then);
								n.then(u).then(void 0, l)
							}

							function p(e) {
								e ? (n = i()) && n.then ? n.then(u).then(void 0, l) : u(n) : Ge(a, 1, n)
							}

							function c() {
								(s = e()) ? s.then ? s.then(p).then(void 0, l) : p(s): Ge(a, 1, n)
							}
						}

						function Je(e) {
							return 192 === e || 194 === e || 196 === e || 219 === e || 221 === e || 218 === e || 254 === e
						}

						function Ze(e) {
							return e >= 224 && e <= 239
						}

						function et(e, t, i) {
							var r = W;
							Array.isArray(r) || ("function" == typeof r.entries && (r = r.entries()), r = P(r));
							for (var s = 0; s < r.length; s++) {
								var n = r[s],
									o = n[0];
								if (n[1].canHandle(e, t, i)) return o
							}
						}
						var tt = function(e) {
							l(r, e);
							var t = g(r);

							function r() {
								var e;
								i(this, r);
								for (var s = arguments.length, n = new Array(s), o = 0; o < s; o++) n[o] = arguments[o];
								return a(f(e = t.call.apply(t, [this].concat(n))), "appSegments", []), a(f(e), "jpegSegments", []), a(f(e), "unknownSegments", []), e
							}
							return o(r, [{
								key: "parse",
								value: function() {
									try {
										var e = this;
										return $e(e.findAppSegments(), (function() {
											return $e(e.readSegments(e.appSegments), (function() {
												e.mergeMultiSegments(), e.createParsers(e.mergedAppSegments || e.appSegments)
											}))
										}))
									} catch (e) {
										return Promise.reject(e)
									}
								}
							}, {
								key: "setupSegmentFinderArgs",
								value: function(e) {
									var t = this;
									!0 === e ? (this.findAll = !0, this.wanted = x(W.keyList())) : (e = void 0 === e ? W.keyList().filter((function(e) {
										return t.options[e].enabled
									})) : e.filter((function(e) {
										return t.options[e].enabled && W.has(e)
									})), this.findAll = !1, this.remaining = x(e), this.wanted = x(e)), this.unfinishedMultiSegment = !1
								}
							}, {
								key: "findAppSegments",
								value: function() {
									var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
										t = arguments.length > 1 ? arguments[1] : void 0;
									try {
										var i = this;
										i.setupSegmentFinderArgs(t);
										var r = i.file,
											s = i.findAll,
											n = i.wanted,
											o = i.remaining;
										return Xe((function() {
											if (!s && i.file.chunked) return s = P(n).some((function(e) {
												var t = W.get(e),
													r = i.options[e];
												return t.multiSegment && r.multiSegment
											})), We((function() {
												if (s) return Ve(i.file.readWhole())
											}))
										}), (function() {
											var t = !1;
											if (e = i.findAppSegmentsInRange(e, r.byteLength), !i.options.onlyTiff) return function() {
												if (r.chunked) {
													var s = !1;
													return Qe((function() {
														return !t && o.size > 0 && !s && (!!r.canReadNextChunk || !!i.unfinishedMultiSegment)
													}), void 0, (function() {
														var n = r.nextChunkOffset,
															o = i.appSegments.some((function(e) {
																return !i.file.available(e.offset || e.start, e.length || e.size)
															}));
														return Xe((function() {
															return $e(e > n && !o ? r.readNextChunk(e) : r.readNextChunk(n), (function(e) {
																s = !e
															}))
														}), (function() {
															void 0 === (e = i.findAppSegmentsInRange(e, r.byteLength)) && (t = !0)
														}))
													}))
												}
											}()
										}))
									} catch (e) {
										return Promise.reject(e)
									}
								}
							}, {
								key: "findAppSegmentsInRange",
								value: function(e, t) {
									t -= 2;
									for (var i, r, s, n, o, a, l = this.file, u = this.findAll, p = this.wanted, c = this.remaining, h = this.options; e < t; e++)
										if (255 === l.getUint8(e))
											if (Ze(i = l.getUint8(e + 1))) {
												if (r = l.getUint16(e + 2), (s = et(l, e, r)) && p.has(s) && (o = (n = W.get(s)).findPosition(l, e), a = h[s], o.type = s, this.appSegments.push(o), !u && (n.multiSegment && a.multiSegment ? (this.unfinishedMultiSegment = o.chunkNumber < o.chunkCount, this.unfinishedMultiSegment || c.delete(s)) : c.delete(s), 0 === c.size))) break;
												h.recordUnknownSegments && ((o = He.findPosition(l, e)).marker = i, this.unknownSegments.push(o)), e += r + 1
											} else if (Je(i)) {
										if (r = l.getUint16(e + 2), 218 === i && !1 !== h.stopAfterSos) return;
										h.recordJpegSegments && this.jpegSegments.push({
											offset: e,
											length: r,
											marker: i
										}), e += r + 1
									}
									return e
								}
							}, {
								key: "mergeMultiSegments",
								value: function() {
									var e = this;
									if (this.appSegments.some((function(e) {
											return e.multiSegment
										}))) {
										var t = function(e, t) {
											for (var i, r, s, n = _(), o = 0; o < e.length; o++) r = (i = e[o]).type, n.has(r) ? s = n.get(r) : n.set(r, s = []), s.push(i);
											return P(n)
										}(this.appSegments);
										this.mergedAppSegments = t.map((function(t) {
											var i = t[0],
												r = t[1],
												s = W.get(i, e.options);
											return s.handleMultiSegments ? {
												type: i,
												chunk: s.handleMultiSegments(r)
											} : r[0]
										}))
									}
								}
							}, {
								key: "getSegment",
								value: function(e) {
									return this.appSegments.find((function(t) {
										return t.type === e
									}))
								}
							}, {
								key: "getOrFindSegment",
								value: function(e) {
									try {
										var t = this,
											i = t.getSegment(e);
										return Xe((function() {
											if (void 0 === i) return $e(t.findAppSegments(0, [e]), (function() {
												i = t.getSegment(e)
											}))
										}), (function() {
											return i
										}))
									} catch (e) {
										return Promise.reject(e)
									}
								}
							}], [{
								key: "canHandle",
								value: function(e, t) {
									return 65496 === t
								}
							}]), r
						}(ze);

						function it() {}

						function rt(e, t) {
							if (!t) return e && e.then ? e.then(it) : Promise.resolve()
						}

						function st(e, t) {
							var i = e();
							return i && i.then ? i.then(t) : t(i)
						}
						a(tt, "type", "jpeg"), V.set("jpeg", tt);
						var nt = [void 0, 1, 1, 2, 4, 8, 1, 1, 2, 4, 8, 4, 8, 4],
							ot = function(e) {
								l(r, e);
								var t = g(r);

								function r() {
									return i(this, r), t.apply(this, arguments)
								}
								return o(r, [{
									key: "parse",
									value: function() {
										try {
											var e = this;
											e.parseHeader();
											var t = e.options;
											return st((function() {
												if (t.ifd0.enabled) return rt(e.parseIfd0Block())
											}), (function() {
												return st((function() {
													if (t.exif.enabled) return rt(e.safeParse("parseExifBlock"))
												}), (function() {
													return st((function() {
														if (t.gps.enabled) return rt(e.safeParse("parseGpsBlock"))
													}), (function() {
														return st((function() {
															if (t.interop.enabled) return rt(e.safeParse("parseInteropBlock"))
														}), (function() {
															return st((function() {
																if (t.ifd1.enabled) return rt(e.safeParse("parseThumbnailBlock"))
															}), (function() {
																return e.createOutput()
															}))
														}))
													}))
												}))
											}))
										} catch (e) {
											return Promise.reject(e)
										}
									}
								}, {
									key: "safeParse",
									value: function(e) {
										var t = this[e]();
										return void 0 !== t.catch && (t = t.catch(this.handleError)), t
									}
								}, {
									key: "findIfd0Offset",
									value: function() {
										void 0 === this.ifd0Offset && (this.ifd0Offset = this.chunk.getUint32(4))
									}
								}, {
									key: "findIfd1Offset",
									value: function() {
										if (void 0 === this.ifd1Offset) {
											this.findIfd0Offset();
											var e = this.chunk.getUint16(this.ifd0Offset),
												t = this.ifd0Offset + 2 + 12 * e;
											this.ifd1Offset = this.chunk.getUint32(t)
										}
									}
								}, {
									key: "parseBlock",
									value: function(e, t) {
										var i = _();
										return this[t] = i, this.parseTags(e, t, i), i
									}
								}, {
									key: "parseIfd0Block",
									value: function() {
										try {
											var e = this;
											if (e.ifd0) return;
											var t = e.file;
											return e.findIfd0Offset(), e.ifd0Offset < 8 && N("Malformed EXIF data"), !t.chunked && e.ifd0Offset > t.byteLength && N("IFD0 offset points to outside of file.\nthis.ifd0Offset: ".concat(e.ifd0Offset, ", file.byteLength: ").concat(t.byteLength)), st((function() {
												if (t.tiff) return rt(t.ensureChunk(e.ifd0Offset, M(e.options)))
											}), (function() {
												var t = e.parseBlock(e.ifd0Offset, "ifd0");
												if (0 !== t.size) return e.exifOffset = t.get(de), e.interopOffset = t.get(me), e.gpsOffset = t.get(fe), e.xmp = t.get(700), e.iptc = t.get(ce), e.icc = t.get(he), e.options.sanitize && (t.delete(de), t.delete(me), t.delete(fe), t.delete(700), t.delete(ce), t.delete(he)), t
											}))
										} catch (e) {
											return Promise.reject(e)
										}
									}
								}, {
									key: "parseExifBlock",
									value: function() {
										try {
											var e = this;
											if (e.exif) return;
											return st((function() {
												if (!e.ifd0) return rt(e.parseIfd0Block())
											}), (function() {
												if (void 0 !== e.exifOffset) return st((function() {
													if (e.file.tiff) return rt(e.file.ensureChunk(e.exifOffset, M(e.options)))
												}), (function() {
													var t = e.parseBlock(e.exifOffset, "exif");
													return e.interopOffset || (e.interopOffset = t.get(me)), e.makerNote = t.get(ue), e.userComment = t.get(pe), e.options.sanitize && (t.delete(me), t.delete(ue), t.delete(pe)), e.unpack(t, 41728), e.unpack(t, 41729), t
												}))
											}))
										} catch (e) {
											return Promise.reject(e)
										}
									}
								}, {
									key: "unpack",
									value: function(e, t) {
										var i = e.get(t);
										i && 1 === i.length && e.set(t, i[0])
									}
								}, {
									key: "parseGpsBlock",
									value: function() {
										try {
											var e = this;
											if (e.gps) return;
											return st((function() {
												if (!e.ifd0) return rt(e.parseIfd0Block())
											}), (function() {
												if (void 0 !== e.gpsOffset) {
													var t = e.parseBlock(e.gpsOffset, "gps");
													return t && t.has(2) && t.has(4) && (t.set("latitude", at.apply(void 0, t.get(2).concat([t.get(1)]))), t.set("longitude", at.apply(void 0, t.get(4).concat([t.get(3)])))), t
												}
											}))
										} catch (e) {
											return Promise.reject(e)
										}
									}
								}, {
									key: "parseInteropBlock",
									value: function() {
										try {
											var e = this;
											if (e.interop) return;
											return st((function() {
												if (!e.ifd0) return rt(e.parseIfd0Block())
											}), (function() {
												return st((function() {
													if (void 0 === e.interopOffset && !e.exif) return rt(e.parseExifBlock())
												}), (function() {
													if (void 0 !== e.interopOffset) return e.parseBlock(e.interopOffset, "interop")
												}))
											}))
										} catch (e) {
											return Promise.reject(e)
										}
									}
								}, {
									key: "parseThumbnailBlock",
									value: function() {
										var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
										try {
											var t = this;
											if (t.ifd1 || t.ifd1Parsed) return;
											if (t.options.mergeOutput && !e) return;
											return t.findIfd1Offset(), t.ifd1Offset > 0 && (t.parseBlock(t.ifd1Offset, "ifd1"), t.ifd1Parsed = !0), t.ifd1
										} catch (e) {
											return Promise.reject(e)
										}
									}
								}, {
									key: "extractThumbnail",
									value: function() {
										try {
											var e = this;
											return e.headerParsed || e.parseHeader(), st((function() {
												if (!e.ifd1Parsed) return rt(e.parseThumbnailBlock(!0))
											}), (function() {
												if (void 0 !== e.ifd1) {
													var t = e.ifd1.get(513),
														i = e.ifd1.get(514);
													return e.chunk.getUint8Array(t, i)
												}
											}))
										} catch (e) {
											return Promise.reject(e)
										}
									}
								}, {
									key: "image",
									get: function() {
										return this.ifd0
									}
								}, {
									key: "thumbnail",
									get: function() {
										return this.ifd1
									}
								}, {
									key: "createOutput",
									value: function() {
										var e, t, i, r = {},
											s = be;
										Array.isArray(s) || ("function" == typeof s.entries && (s = s.entries()), s = P(s));
										for (var n = 0; n < s.length; n++)
											if (!B(e = this[t = s[n]]))
												if (i = this.canTranslate ? this.translateBlock(e, t) : S(e), this.options.mergeOutput) {
													if ("ifd1" === t) continue;
													w(r, i)
												} else r[t] = i;
										return this.makerNote && (r.makerNote = this.makerNote), this.userComment && (r.userComment = this.userComment), r
									}
								}, {
									key: "assignToOutput",
									value: function(e, t) {
										if (this.globalOptions.mergeOutput) w(e, t);
										else {
											var i = b(t);
											Array.isArray(i) || ("function" == typeof i.entries && (i = i.entries()), i = P(i));
											for (var r = 0; r < i.length; r++) {
												var s = i[r],
													n = s[0],
													o = s[1];
												this.assignObjectToOutput(e, n, o)
											}
										}
									}
								}], [{
									key: "canHandle",
									value: function(e, t) {
										return 225 === e.getUint8(t + 1) && 1165519206 === e.getUint32(t + 4) && 0 === e.getUint16(t + 8)
									}
								}]), r
							}(function(e) {
								l(r, e);
								var t = g(r);

								function r() {
									return i(this, r), t.apply(this, arguments)
								}
								return o(r, [{
									key: "parseHeader",
									value: function() {
										var e = this.chunk.getUint16();
										18761 === e ? this.le = !0 : 19789 === e && (this.le = !1), this.chunk.le = this.le, this.headerParsed = !0
									}
								}, {
									key: "parseTags",
									value: function(e, t) {
										var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : _(),
											r = this.options[t],
											s = r.pick,
											n = r.skip,
											o = (s = x(s)).size > 0,
											a = 0 === n.size,
											l = this.chunk.getUint16(e);
										e += 2;
										for (var u = 0; u < l; u++) {
											var p = this.chunk.getUint16(e);
											if (o) {
												if (s.has(p) && (i.set(p, this.parseTag(e, p, t)), s.delete(p), 0 === s.size)) break
											} else !a && n.has(p) || i.set(p, this.parseTag(e, p, t));
											e += 12
										}
										return i
									}
								}, {
									key: "parseTag",
									value: function(e, t, i) {
										var r, s = this.chunk,
											n = s.getUint16(e + 2),
											o = s.getUint32(e + 4),
											a = nt[n];
										if (a * o <= 4 ? e += 8 : e = s.getUint32(e + 8), (n < 1 || n > 13) && N("Invalid TIFF value type. block: ".concat(i.toUpperCase(), ", tag: ").concat(t.toString(16), ", type: ").concat(n, ", offset ").concat(e)), e > s.byteLength && N("Invalid TIFF value offset. block: ".concat(i.toUpperCase(), ", tag: ").concat(t.toString(16), ", type: ").concat(n, ", offset ").concat(e, " is outside of chunk size ").concat(s.byteLength)), 1 === n) return s.getUint8Array(e, o);
										if (2 === n) return "" === (r = function(e) {
											for (; e.endsWith("\0");) e = e.slice(0, -1);
											return e
										}(r = s.getString(e, o)).trim()) ? void 0 : r;
										if (7 === n) return s.getUint8Array(e, o);
										if (1 === o) return this.parseTagValue(n, e);
										for (var l = new(function(e) {
												switch (e) {
													case 1:
														return Uint8Array;
													case 3:
														return Uint16Array;
													case 4:
														return Uint32Array;
													default:
														return Array;
													case 6:
														return Int8Array;
													case 8:
														return Int16Array;
													case 9:
														return Int32Array;
													case 11:
														return Float32Array;
													case 12:
														return Float64Array
												}
											}(n))(o), u = a, p = 0; p < o; p++) l[p] = this.parseTagValue(n, e), e += u;
										return l
									}
								}, {
									key: "parseTagValue",
									value: function(e, t) {
										var i = this.chunk;
										switch (e) {
											case 1:
												return i.getUint8(t);
											case 3:
												return i.getUint16(t);
											case 4:
											case 13:
												return i.getUint32(t);
											case 5:
												return i.getUint32(t) / i.getUint32(t + 4);
											case 6:
												return i.getInt8(t);
											case 8:
												return i.getInt16(t);
											case 9:
												return i.getInt32(t);
											case 10:
												return i.getInt32(t) / i.getInt32(t + 4);
											case 11:
												return i.getFloat(t);
											case 12:
												return i.getDouble(t);
											default:
												N("Invalid tiff type ".concat(e))
										}
									}
								}]), r
							}(He));

						function at(e, t, i, r) {
							var s = e + t / 60 + i / 3600;
							return "S" !== r && "W" !== r || (s *= -1), s
						}
						a(ot, "type", "tiff"), a(ot, "headerLength", 10), W.set("tiff", ot);
						var lt = Object.freeze({
							__proto__: null,
							default: je,
							Exifr: Ne,
							fileParsers: V,
							segmentParsers: W,
							fileReaders: X,
							tagKeys: oe,
							tagValues: ae,
							tagRevivers: le,
							createDictionary: se,
							extendDictionary: ne,
							fetchUrlAsArrayBuffer: Q,
							readBlobAsArrayBuffer: Y,
							chunkedProps: ge,
							otherSegments: ye,
							segments: ve,
							tiffBlocks: be,
							segmentsAndBlocks: we,
							tiffExtractables: Se,
							inheritables: Pe,
							allFormatters: ke,
							Options: Fe,
							parse: Me
						});

						function ut(e, t, i) {
							return i ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e)
						}

						function pt(e) {
							return function() {
								for (var t = [], i = 0; i < arguments.length; i++) t[i] = arguments[i];
								try {
									return Promise.resolve(e.apply(this, t))
								} catch (e) {
									return Promise.reject(e)
								}
							}
						}
						var ct = pt((function(e) {
								var t = new Ne(yt);
								return ut(t.read(e), (function() {
									return ut(t.parse(), (function(e) {
										if (e && e.ifd0) return e.ifd0[274]
									}))
								}))
							})),
							ht = pt((function(e) {
								var t = new Ne(gt);
								return ut(t.read(e), (function() {
									return ut(t.parse(), (function(e) {
										if (e && e.gps) {
											var t = e.gps;
											return {
												latitude: t.latitude,
												longitude: t.longitude
											}
										}
									}))
								}))
							})),
							dt = pt((function(e) {
								return ut(this.thumbnail(e), (function(e) {
									if (void 0 !== e) {
										var t = new Blob([e]);
										return URL.createObjectURL(t)
									}
								}))
							})),
							ft = pt((function(e) {
								var t = new Ne(vt);
								return ut(t.read(e), (function() {
									return ut(t.extractThumbnail(), (function(e) {
										return e && D ? U.from(e) : e
									}))
								}))
							})),
							mt = {
								ifd0: !1,
								ifd1: !1,
								exif: !1,
								gps: !1,
								interop: !1,
								sanitize: !1,
								reviveValues: !0,
								translateKeys: !1,
								translateValues: !1,
								mergeOutput: !1
							},
							gt = w({}, mt, {
								firstChunkSize: 4e4,
								gps: [1, 2, 3, 4]
							}),
							yt = w({}, mt, {
								firstChunkSize: 4e4,
								ifd0: [274]
							}),
							vt = w({}, mt, {
								tiff: !1,
								ifd1: !0,
								mergeOutput: !1
							}),
							bt = Object.freeze({
								1: {
									dimensionSwapped: !1,
									scaleX: 1,
									scaleY: 1,
									deg: 0,
									rad: 0
								},
								2: {
									dimensionSwapped: !1,
									scaleX: -1,
									scaleY: 1,
									deg: 0,
									rad: 0
								},
								3: {
									dimensionSwapped: !1,
									scaleX: 1,
									scaleY: 1,
									deg: 180,
									rad: 180 * Math.PI / 180
								},
								4: {
									dimensionSwapped: !1,
									scaleX: -1,
									scaleY: 1,
									deg: 180,
									rad: 180 * Math.PI / 180
								},
								5: {
									dimensionSwapped: !0,
									scaleX: 1,
									scaleY: -1,
									deg: 90,
									rad: 90 * Math.PI / 180
								},
								6: {
									dimensionSwapped: !0,
									scaleX: 1,
									scaleY: 1,
									deg: 90,
									rad: 90 * Math.PI / 180
								},
								7: {
									dimensionSwapped: !0,
									scaleX: 1,
									scaleY: -1,
									deg: 270,
									rad: 270 * Math.PI / 180
								},
								8: {
									dimensionSwapped: !0,
									scaleX: 1,
									scaleY: 1,
									deg: 270,
									rad: 270 * Math.PI / 180
								}
							});
						if (t.rotateCanvas = !0, t.rotateCss = !0, "object" == typeof navigator) {
							var wt = navigator.userAgent;
							if (wt.includes("iPad") || wt.includes("iPhone")) {
								var St = wt.match(/OS (\d+)_(\d+)/);
								if (St) {
									var Pt = St[1],
										kt = St[2],
										Ct = Number(Pt) + .1 * Number(kt);
									t.rotateCanvas = Ct < 13.4, t.rotateCss = !1
								}
							} else if (wt.includes("OS X 10")) {
								var Et = wt.match(/OS X 10[_.](\d+)/)[1];
								t.rotateCanvas = t.rotateCss = Number(Et) < 15
							}
							if (wt.includes("Chrome/")) {
								var xt = wt.match(/Chrome\/(\d+)/)[1];
								t.rotateCanvas = t.rotateCss = Number(xt) < 81
							} else if (wt.includes("Firefox/")) {
								var _t = wt.match(/Firefox\/(\d+)/)[1];
								t.rotateCanvas = t.rotateCss = Number(_t) < 77
							}
						}

						function Ft() {}
						var Ot = function(e) {
								l(r, e);
								var t = g(r);

								function r() {
									var e;
									i(this, r);
									for (var s = arguments.length, n = new Array(s), o = 0; o < s; o++) n[o] = arguments[o];
									return a(f(e = t.call.apply(t, [this].concat(n))), "ranges", new At), 0 !== e.byteLength && e.ranges.add(0, e.byteLength), e
								}
								return o(r, [{
									key: "_tryExtend",
									value: function(e, t, i) {
										if (0 === e && 0 === this.byteLength && i) {
											var r = new DataView(i.buffer || i, i.byteOffset, i.byteLength);
											this._swapDataView(r)
										} else {
											var s = e + t;
											if (s > this.byteLength) {
												var n = this._extend(s).dataView;
												this._swapDataView(n)
											}
										}
									}
								}, {
									key: "_extend",
									value: function(e) {
										var t;
										t = D ? U.allocUnsafe(e) : new Uint8Array(e);
										var i = new DataView(t.buffer, t.byteOffset, t.byteLength);
										return t.set(new Uint8Array(this.buffer, this.byteOffset, this.byteLength), 0), {
											uintView: t,
											dataView: i
										}
									}
								}, {
									key: "subarray",
									value: function(e, t) {
										var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
										return t = t || this._lengthToEnd(e), i && this._tryExtend(e, t), this.ranges.add(e, t), y(u(r.prototype), "subarray", this).call(this, e, t)
									}
								}, {
									key: "set",
									value: function(e, t) {
										var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
										i && this._tryExtend(t, e.byteLength, e);
										var s = y(u(r.prototype), "set", this).call(this, e, t);
										return this.ranges.add(t, s.byteLength), s
									}
								}, {
									key: "ensureChunk",
									value: function(e, t) {
										try {
											var i = this;
											if (!i.chunked) return;
											if (i.ranges.available(e, t)) return;
											return function(e, t) {
												return e && e.then ? e.then(Ft) : Promise.resolve()
											}(i.readChunk(e, t))
										} catch (e) {
											return Promise.reject(e)
										}
									}
								}, {
									key: "available",
									value: function(e, t) {
										return this.ranges.available(e, t)
									}
								}]), r
							}(H),
							At = function() {
								function e() {
									i(this, e), a(this, "list", [])
								}
								return o(e, [{
									key: "length",
									get: function() {
										return this.list.length
									}
								}, {
									key: "add",
									value: function(e, t) {
										var i = e + t,
											r = this.list.filter((function(t) {
												return Tt(e, t.offset, i) || Tt(e, t.end, i)
											}));
										if (r.length > 0) {
											e = Math.min.apply(Math, [e].concat(r.map((function(e) {
												return e.offset
											})))), t = (i = Math.max.apply(Math, [i].concat(r.map((function(e) {
												return e.end
											}))))) - e;
											var s = r.shift();
											s.offset = e, s.length = t, s.end = i, this.list = this.list.filter((function(e) {
												return !r.includes(e)
											}))
										} else this.list.push({
											offset: e,
											length: t,
											end: i
										})
									}
								}, {
									key: "available",
									value: function(e, t) {
										var i = e + t;
										return this.list.some((function(t) {
											return t.offset <= e && i <= t.end
										}))
									}
								}]), e
							}();

						function Tt(e, t, i) {
							return e <= t && t <= i
						}

						function Rt() {}

						function Ut(e, t) {
							if (!t) return e && e.then ? e.then(Rt) : Promise.resolve()
						}

						function Dt(e, t, i) {
							return i ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e)
						}
						var It = function(e) {
							l(r, e);
							var t = g(r);

							function r() {
								return i(this, r), t.apply(this, arguments)
							}
							return o(r, [{
								key: "readWhole",
								value: function() {
									try {
										var e = this;
										return e.chunked = !1, Dt(Y(e.input), (function(t) {
											e._swapArrayBuffer(t)
										}))
									} catch (e) {
										return Promise.reject(e)
									}
								}
							}, {
								key: "readChunked",
								value: function() {
									return this.chunked = !0, this.size = this.input.size, y(u(r.prototype), "readChunked", this).call(this)
								}
							}, {
								key: "_readChunk",
								value: function(e, t) {
									try {
										var i = this,
											r = t ? e + t : void 0,
											s = i.input.slice(e, r);
										return Dt(Y(s), (function(t) {
											return i.set(t, e, !0)
										}))
									} catch (e) {
										return Promise.reject(e)
									}
								}
							}]), r
						}(function(e) {
							l(r, e);
							var t = g(r);

							function r(e, s) {
								var n;
								return i(this, r), a(f(n = t.call(this, 0)), "chunksRead", 0), n.input = e, n.options = s, n
							}
							return o(r, [{
								key: "readWhole",
								value: function() {
									try {
										var e = this;
										return e.chunked = !1, Ut(e.readChunk(e.nextChunkOffset))
									} catch (e) {
										return Promise.reject(e)
									}
								}
							}, {
								key: "readChunked",
								value: function() {
									try {
										var e = this;
										return e.chunked = !0, Ut(e.readChunk(0, e.options.firstChunkSize))
									} catch (e) {
										return Promise.reject(e)
									}
								}
							}, {
								key: "readNextChunk",
								value: function(e) {
									try {
										var t = this;
										if (void 0 === e && (e = t.nextChunkOffset), t.fullyRead) return t.chunksRead++, !1;
										var i = t.options.chunkSize;
										return r = t.readChunk(e, i), s = function(e) {
											return !!e && e.byteLength === i
										}, r && r.then || (r = Promise.resolve(r)), s ? r.then(s) : r
									} catch (e) {
										return Promise.reject(e)
									}
									var r, s
								}
							}, {
								key: "readChunk",
								value: function(e, t) {
									try {
										var i = this;
										if (i.chunksRead++, 0 === (t = i.safeWrapAddress(e, t))) return;
										return i._readChunk(e, t)
									} catch (e) {
										return Promise.reject(e)
									}
								}
							}, {
								key: "safeWrapAddress",
								value: function(e, t) {
									return void 0 !== this.size && e + t > this.size ? Math.max(0, this.size - e) : t
								}
							}, {
								key: "nextChunkOffset",
								get: function() {
									if (0 !== this.ranges.list.length) return this.ranges.list[0].length
								}
							}, {
								key: "canReadNextChunk",
								get: function() {
									return this.chunksRead < this.options.chunkLimit
								}
							}, {
								key: "fullyRead",
								get: function() {
									return void 0 !== this.size && this.nextChunkOffset === this.size
								}
							}, {
								key: "read",
								value: function() {
									return this.options.chunked ? this.readChunked() : this.readWhole()
								}
							}, {
								key: "close",
								value: function() {}
							}]), r
						}(Ot));
						X.set("blob", It), t.Exifr = Ne, t.Options = Fe, t.allFormatters = ke, t.chunkedProps = ge, t.createDictionary = se, t.default = lt, t.disableAllOptions = mt, t.extendDictionary = ne, t.fetchUrlAsArrayBuffer = Q, t.fileParsers = V, t.fileReaders = X, t.gps = ht, t.gpsOnlyOptions = gt, t.inheritables = Pe, t.orientation = ct, t.orientationOnlyOptions = yt, t.otherSegments = ye, t.parse = Me, t.readBlobAsArrayBuffer = Y, t.rotation = function(e) {
							return ut(ct(e), (function(e) {
								return w({
									canvas: t.rotateCanvas,
									css: t.rotateCss
								}, bt[e])
							}))
						}, t.rotations = bt, t.segmentParsers = W, t.segments = ve, t.segmentsAndBlocks = we, t.tagKeys = oe, t.tagRevivers = le, t.tagValues = ae, t.thumbnail = ft, t.thumbnailOnlyOptions = vt, t.thumbnailUrl = dt, t.tiffBlocks = be, t.tiffExtractables = Se, Object.defineProperty(t, "__esModule", {
							value: !0
						})
					}, o("object" == typeof i && void 0 !== t ? i : (n = "undefined" != typeof globalThis ? globalThis : n || self).exifr = {})
				}).call(this)
			}).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer)
		}, {
			_process: 29,
			buffer: 5
		}],
		12: [function(e, t, i) {
			"use strict";
			i.__esModule = !0, i.default = u, i.getFieldData = p;
			var r = {
					"[object HTMLCollection]": !0,
					"[object NodeList]": !0,
					"[object RadioNodeList]": !0
				},
				s = {
					button: !0,
					fieldset: !0,
					reset: !0,
					submit: !0
				},
				n = {
					checkbox: !0,
					radio: !0
				},
				o = /^\s+|\s+$/g,
				a = Array.prototype.slice,
				l = Object.prototype.toString;

			function u(e) {
				var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
					trim: !1
				};
				if (!e) throw new Error("A form is required by getFormData, was given form=" + e);
				for (var i = {}, r = void 0, n = [], o = {}, a = 0, l = e.elements.length; a < l; a++) {
					var u = e.elements[a];
					s[u.type] || u.disabled || (r = u.name || u.id) && !o[r] && (n.push(r), o[r] = !0)
				}
				for (var c = 0, h = n.length; c < h; c++) {
					var d = p(e, r = n[c], t);
					null != d && (i[r] = d)
				}
				return i
			}

			function p(e, t) {
				var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
					trim: !1
				};
				if (!e) throw new Error("A form is required by getFieldData, was given form=" + e);
				if (!t && "[object String]" !== l.call(t)) throw new Error("A field name is required by getFieldData, was given fieldName=" + t);
				var s = e.elements[t];
				if (!s || s.disabled) return null;
				if (!r[l.call(s)]) return c(s, i.trim);
				for (var n = [], o = !0, a = 0, u = s.length; a < u; a++)
					if (!s[a].disabled) {
						o && "radio" !== s[a].type && (o = !1);
						var p = c(s[a], i.trim);
						null != p && (n = n.concat(p))
					} return o && 1 === n.length ? n[0] : n.length > 0 ? n : null
			}

			function c(e, t) {
				var i = null,
					r = e.type;
				if ("select-one" === r) return e.options.length && (i = e.options[e.selectedIndex].value), i;
				if ("select-multiple" === r) {
					i = [];
					for (var s = 0, l = e.options.length; s < l; s++) e.options[s].selected && i.push(e.options[s].value);
					return 0 === i.length && (i = null), i
				}
				return "file" === r && "files" in e ? (e.multiple ? 0 === (i = a.call(e.files)).length && (i = null) : i = e.files[0], i) : (n[r] ? e.checked && (i = e.value) : i = t ? e.value.replace(o, "") : e.value, i)
			}
			u.getFieldData = p
		}, {}],
		13: [function(e, t, i) {
			try {
				t.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
			} catch (e) {
				t.exports = !1
			}
		}, {}],
		14: [function(e, t, i) {
			/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
			i.read = function(e, t, i, r, s) {
				var n, o, a = 8 * s - r - 1,
					l = (1 << a) - 1,
					u = l >> 1,
					p = -7,
					c = i ? s - 1 : 0,
					h = i ? -1 : 1,
					d = e[t + c];
				for (c += h, n = d & (1 << -p) - 1, d >>= -p, p += a; p > 0; n = 256 * n + e[t + c], c += h, p -= 8);
				for (o = n & (1 << -p) - 1, n >>= -p, p += r; p > 0; o = 256 * o + e[t + c], c += h, p -= 8);
				if (0 === n) n = 1 - u;
				else {
					if (n === l) return o ? NaN : 1 / 0 * (d ? -1 : 1);
					o += Math.pow(2, r), n -= u
				}
				return (d ? -1 : 1) * o * Math.pow(2, n - r)
			}, i.write = function(e, t, i, r, s, n) {
				var o, a, l, u = 8 * n - s - 1,
					p = (1 << u) - 1,
					c = p >> 1,
					h = 23 === s ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
					d = r ? 0 : n - 1,
					f = r ? 1 : -1,
					m = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
				for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, o = p) : (o = Math.floor(Math.log(t) / Math.LN2), t * (l = Math.pow(2, -o)) < 1 && (o--, l *= 2), (t += o + c >= 1 ? h / l : h * Math.pow(2, 1 - c)) * l >= 2 && (o++, l /= 2), o + c >= p ? (a = 0, o = p) : o + c >= 1 ? (a = (t * l - 1) * Math.pow(2, s), o += c) : (a = t * Math.pow(2, c - 1) * Math.pow(2, s), o = 0)); s >= 8; e[i + d] = 255 & a, d += f, a /= 256, s -= 8);
				for (o = o << s | a, u += s; u > 0; e[i + d] = 255 & o, d += f, o /= 256, u -= 8);
				e[i + d - f] |= 128 * m
			}
		}, {}],
		15: [function(e, t, i) {
			t.exports = function(e, t) {
				if (e === t) return !0;
				for (var i in e)
					if (!(i in t)) return !1;
				for (var i in t)
					if (e[i] !== t[i]) return !1;
				return !0
			}
		}, {}],
		16: [function(e, t, i) {
			(function(e) {
				(function() {
					! function(e, r) {
						"object" == typeof i && void 0 !== t ? t.exports = r(e) : r(e)
					}("undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== e ? e : this, (function(e) {
						"use strict";
						var i, r = (e = e || {}).Base64,
							s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
							n = function(e) {
								for (var t = {}, i = 0, r = e.length; i < r; i++) t[e.charAt(i)] = i;
								return t
							}(s),
							o = String.fromCharCode,
							a = function(e) {
								if (e.length < 2) return (t = e.charCodeAt(0)) < 128 ? e : t < 2048 ? o(192 | t >>> 6) + o(128 | 63 & t) : o(224 | t >>> 12 & 15) + o(128 | t >>> 6 & 63) + o(128 | 63 & t);
								var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
								return o(240 | t >>> 18 & 7) + o(128 | t >>> 12 & 63) + o(128 | t >>> 6 & 63) + o(128 | 63 & t)
							},
							l = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
							u = function(e) {
								return e.replace(l, a)
							},
							p = function(e) {
								var t = [0, 2, 1][e.length % 3],
									i = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0);
								return [s.charAt(i >>> 18), s.charAt(i >>> 12 & 63), t >= 2 ? "=" : s.charAt(i >>> 6 & 63), t >= 1 ? "=" : s.charAt(63 & i)].join("")
							},
							c = e.btoa && "function" == typeof e.btoa ? function(t) {
								return e.btoa(t)
							} : function(e) {
								if (e.match(/[^\x00-\xFF]/)) throw new RangeError("The string contains invalid characters.");
								return e.replace(/[\s\S]{1,3}/g, p)
							},
							h = function(e) {
								return c(u(String(e)))
							},
							d = function(e) {
								return e.replace(/[+\/]/g, (function(e) {
									return "+" == e ? "-" : "_"
								})).replace(/=/g, "")
							},
							f = function(e, t) {
								return t ? d(h(e)) : h(e)
							};
						e.Uint8Array && (i = function(e, t) {
							for (var i = "", r = 0, n = e.length; r < n; r += 3) {
								var o = e[r],
									a = e[r + 1],
									l = e[r + 2],
									u = o << 16 | a << 8 | l;
								i += s.charAt(u >>> 18) + s.charAt(u >>> 12 & 63) + (void 0 !== a ? s.charAt(u >>> 6 & 63) : "=") + (void 0 !== l ? s.charAt(63 & u) : "=")
							}
							return t ? d(i) : i
						});
						var m, g = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,
							y = function(e) {
								switch (e.length) {
									case 4:
										var t = ((7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)) - 65536;
										return o(55296 + (t >>> 10)) + o(56320 + (1023 & t));
									case 3:
										return o((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
									default:
										return o((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1))
								}
							},
							v = function(e) {
								return e.replace(g, y)
							},
							b = function(e) {
								var t = e.length,
									i = t % 4,
									r = (t > 0 ? n[e.charAt(0)] << 18 : 0) | (t > 1 ? n[e.charAt(1)] << 12 : 0) | (t > 2 ? n[e.charAt(2)] << 6 : 0) | (t > 3 ? n[e.charAt(3)] : 0),
									s = [o(r >>> 16), o(r >>> 8 & 255), o(255 & r)];
								return s.length -= [0, 0, 2, 1][i], s.join("")
							},
							w = e.atob && "function" == typeof e.atob ? function(t) {
								return e.atob(t)
							} : function(e) {
								return e.replace(/\S{1,4}/g, b)
							},
							S = function(e) {
								return w(String(e).replace(/[^A-Za-z0-9\+\/]/g, ""))
							},
							P = function(e) {
								return String(e).replace(/[-_]/g, (function(e) {
									return "-" == e ? "+" : "/"
								})).replace(/[^A-Za-z0-9\+\/]/g, "")
							},
							k = function(e) {
								return function(e) {
									return v(w(e))
								}(P(e))
							};
						e.Uint8Array && (m = function(e) {
							return Uint8Array.from(S(P(e)), (function(e) {
								return e.charCodeAt(0)
							}))
						});
						if (e.Base64 = {
								VERSION: "2.6.4",
								atob: S,
								btoa: c,
								fromBase64: k,
								toBase64: f,
								utob: u,
								encode: f,
								encodeURI: function(e) {
									return f(e, !0)
								},
								btou: v,
								decode: k,
								noConflict: function() {
									var t = e.Base64;
									return e.Base64 = r, t
								},
								fromUint8Array: i,
								toUint8Array: m
							}, "function" == typeof Object.defineProperty) {
							var C = function(e) {
								return {
									value: e,
									enumerable: !1,
									writable: !0,
									configurable: !0
								}
							};
							e.Base64.extendString = function() {
								Object.defineProperty(String.prototype, "fromBase64", C((function() {
									return k(this)
								}))), Object.defineProperty(String.prototype, "toBase64", C((function(e) {
									return f(this, e)
								}))), Object.defineProperty(String.prototype, "toBase64URI", C((function() {
									return f(this, !0)
								})))
							}
						}
						return e.Meteor && (Base64 = e.Base64), void 0 !== t && t.exports && (t.exports.Base64 = e.Base64), {
							Base64: e.Base64
						}
					}))
				}).call(this)
			}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {}],
		17: [function(e, t, i) {
			(function(e) {
				(function() {
					var i = /^\s+|\s+$/g,
						r = /^[-+]0x[0-9a-f]+$/i,
						s = /^0b[01]+$/i,
						n = /^0o[0-7]+$/i,
						o = parseInt,
						a = "object" == typeof e && e && e.Object === Object && e,
						l = "object" == typeof self && self && self.Object === Object && self,
						u = a || l || Function("return this")(),
						p = Object.prototype.toString,
						c = Math.max,
						h = Math.min,
						d = function() {
							return u.Date.now()
						};

					function f(e) {
						var t = typeof e;
						return !!e && ("object" == t || "function" == t)
					}

					function m(e) {
						if ("number" == typeof e) return e;
						if (function(e) {
								return "symbol" == typeof e || function(e) {
									return !!e && "object" == typeof e
								}(e) && "[object Symbol]" == p.call(e)
							}(e)) return NaN;
						if (f(e)) {
							var t = "function" == typeof e.valueOf ? e.valueOf() : e;
							e = f(t) ? t + "" : t
						}
						if ("string" != typeof e) return 0 === e ? e : +e;
						e = e.replace(i, "");
						var a = s.test(e);
						return a || n.test(e) ? o(e.slice(2), a ? 2 : 8) : r.test(e) ? NaN : +e
					}
					t.exports = function(e, t, i) {
						var r, s, n, o, a, l, u = 0,
							p = !1,
							g = !1,
							y = !0;
						if ("function" != typeof e) throw new TypeError("Expected a function");

						function v(t) {
							var i = r,
								n = s;
							return r = s = void 0, u = t, o = e.apply(n, i)
						}

						function b(e) {
							return u = e, a = setTimeout(S, t), p ? v(e) : o
						}

						function w(e) {
							var i = e - l;
							return void 0 === l || i >= t || i < 0 || g && e - u >= n
						}

						function S() {
							var e = d();
							if (w(e)) return P(e);
							a = setTimeout(S, function(e) {
								var i = t - (e - l);
								return g ? h(i, n - (e - u)) : i
							}(e))
						}

						function P(e) {
							return a = void 0, y && r ? v(e) : (r = s = void 0, o)
						}

						function k() {
							var e = d(),
								i = w(e);
							if (r = arguments, s = this, l = e, i) {
								if (void 0 === a) return b(l);
								if (g) return a = setTimeout(S, t), v(l)
							}
							return void 0 === a && (a = setTimeout(S, t)), o
						}
						return t = m(t) || 0, f(i) && (p = !!i.leading, n = (g = "maxWait" in i) ? c(m(i.maxWait) || 0, t) : n, y = "trailing" in i ? !!i.trailing : y), k.cancel = function() {
							void 0 !== a && clearTimeout(a), u = 0, r = l = s = a = void 0
						}, k.flush = function() {
							return void 0 === a ? o : P(d())
						}, k
					}
				}).call(this)
			}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {}],
		18: [function(e, t, i) {
			(function(e) {
				(function() {
					var i = "Expected a function",
						r = /^\s+|\s+$/g,
						s = /^[-+]0x[0-9a-f]+$/i,
						n = /^0b[01]+$/i,
						o = /^0o[0-7]+$/i,
						a = parseInt,
						l = "object" == typeof e && e && e.Object === Object && e,
						u = "object" == typeof self && self && self.Object === Object && self,
						p = l || u || Function("return this")(),
						c = Object.prototype.toString,
						h = Math.max,
						d = Math.min,
						f = function() {
							return p.Date.now()
						};

					function m(e, t, r) {
						var s, n, o, a, l, u, p = 0,
							c = !1,
							m = !1,
							v = !0;
						if ("function" != typeof e) throw new TypeError(i);

						function b(t) {
							var i = s,
								r = n;
							return s = n = void 0, p = t, a = e.apply(r, i)
						}

						function w(e) {
							return p = e, l = setTimeout(P, t), c ? b(e) : a
						}

						function S(e) {
							var i = e - u;
							return void 0 === u || i >= t || i < 0 || m && e - p >= o
						}

						function P() {
							var e = f();
							if (S(e)) return k(e);
							l = setTimeout(P, function(e) {
								var i = t - (e - u);
								return m ? d(i, o - (e - p)) : i
							}(e))
						}

						function k(e) {
							return l = void 0, v && s ? b(e) : (s = n = void 0, a)
						}

						function C() {
							var e = f(),
								i = S(e);
							if (s = arguments, n = this, u = e, i) {
								if (void 0 === l) return w(u);
								if (m) return l = setTimeout(P, t), b(u)
							}
							return void 0 === l && (l = setTimeout(P, t)), a
						}
						return t = y(t) || 0, g(r) && (c = !!r.leading, o = (m = "maxWait" in r) ? h(y(r.maxWait) || 0, t) : o, v = "trailing" in r ? !!r.trailing : v), C.cancel = function() {
							void 0 !== l && clearTimeout(l), p = 0, s = u = n = l = void 0
						}, C.flush = function() {
							return void 0 === l ? a : k(f())
						}, C
					}

					function g(e) {
						var t = typeof e;
						return !!e && ("object" == t || "function" == t)
					}

					function y(e) {
						if ("number" == typeof e) return e;
						if (function(e) {
								return "symbol" == typeof e || function(e) {
									return !!e && "object" == typeof e
								}(e) && "[object Symbol]" == c.call(e)
							}(e)) return NaN;
						if (g(e)) {
							var t = "function" == typeof e.valueOf ? e.valueOf() : e;
							e = g(t) ? t + "" : t
						}
						if ("string" != typeof e) return 0 === e ? e : +e;
						e = e.replace(r, "");
						var i = n.test(e);
						return i || o.test(e) ? a(e.slice(2), i ? 2 : 8) : s.test(e) ? NaN : +e
					}
					t.exports = function(e, t, r) {
						var s = !0,
							n = !0;
						if ("function" != typeof e) throw new TypeError(i);
						return g(r) && (s = "leading" in r ? !!r.leading : s, n = "trailing" in r ? !!r.trailing : n), m(e, t, {
							leading: s,
							maxWait: t,
							trailing: n
						})
					}
				}).call(this)
			}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {}],
		19: [function(e, t, i) {
			"use strict";
			var r = Number.isNaN || function(e) {
				return "number" == typeof e && e != e
			};

			function s(e, t) {
				if (e.length !== t.length) return !1;
				for (var i = 0; i < e.length; i++)
					if (s = e[i], n = t[i], !(s === n || r(s) && r(n))) return !1;
				var s, n;
				return !0
			}
			t.exports = function(e, t) {
				var i;
				void 0 === t && (t = s);
				var r, n = [],
					o = !1;
				return function() {
					for (var s = [], a = 0; a < arguments.length; a++) s[a] = arguments[a];
					return o && i === this && t(s, n) || (r = e.apply(this, s), o = !0, i = this, n = s), r
				}
			}
		}, {}],
		20: [function(e, t, i) {
			var r = e("wildcard"),
				s = /[\/\+\.]/;
			t.exports = function(e, t) {
				function i(t) {
					var i = r(t, e, s);
					return i && i.length >= 2
				}
				return t ? i(t.split(";")[0]) : i
			}
		}, {
			wildcard: 21
		}],
		21: [function(e, t, i) {
			"use strict";

			function r(e, t) {
				this.text = e = e || "", this.hasWild = ~e.indexOf("*"), this.separator = t, this.parts = e.split(t)
			}
			r.prototype.match = function(e) {
				var t, i, r = !0,
					s = this.parts,
					n = s.length;
				if ("string" == typeof e || e instanceof String)
					if (this.hasWild || this.text == e) {
						for (i = (e || "").split(this.separator), t = 0; r && t < n; t++) "*" !== s[t] && (r = t < i.length && s[t] === i[t]);
						r = r && i
					} else r = !1;
				else if ("function" == typeof e.splice)
					for (r = [], t = e.length; t--;) this.match(e[t]) && (r[r.length] = e[t]);
				else if ("object" == typeof e)
					for (var o in r = {}, e) this.match(o) && (r[o] = e[o]);
				return r
			}, t.exports = function(e, t, i) {
				var s = new r(e, i || /[\/\.]/);
				return void 0 !== t ? s.match(t) : s
			}
		}, {}],
		22: [function(e, t, i) {
			var r = 1e3,
				s = 60 * r,
				n = 60 * s,
				o = 24 * n,
				a = 7 * o,
				l = 365.25 * o;

			function u(e, t, i, r) {
				var s = t >= 1.5 * i;
				return Math.round(e / i) + " " + r + (s ? "s" : "")
			}
			t.exports = function(e, t) {
				t = t || {};
				var i = typeof e;
				if ("string" === i && e.length > 0) return function(e) {
					if ((e = String(e)).length > 100) return;
					var t = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);
					if (!t) return;
					var i = parseFloat(t[1]);
					switch ((t[2] || "ms").toLowerCase()) {
						case "years":
						case "year":
						case "yrs":
						case "yr":
						case "y":
							return i * l;
						case "weeks":
						case "week":
						case "w":
							return i * a;
						case "days":
						case "day":
						case "d":
							return i * o;
						case "hours":
						case "hour":
						case "hrs":
						case "hr":
						case "h":
							return i * n;
						case "minutes":
						case "minute":
						case "mins":
						case "min":
						case "m":
							return i * s;
						case "seconds":
						case "second":
						case "secs":
						case "sec":
						case "s":
							return i * r;
						case "milliseconds":
						case "millisecond":
						case "msecs":
						case "msec":
						case "ms":
							return i;
						default:
							return
					}
				}(e);
				if ("number" === i && isFinite(e)) return t.long ? function(e) {
					var t = Math.abs(e);
					if (t >= o) return u(e, t, o, "day");
					if (t >= n) return u(e, t, n, "hour");
					if (t >= s) return u(e, t, s, "minute");
					if (t >= r) return u(e, t, r, "second");
					return e + " ms"
				}(e) : function(e) {
					var t = Math.abs(e);
					if (t >= o) return Math.round(e / o) + "d";
					if (t >= n) return Math.round(e / n) + "h";
					if (t >= s) return Math.round(e / s) + "m";
					if (t >= r) return Math.round(e / r) + "s";
					return e + "ms"
				}(e);
				throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
			}
		}, {}],
		23: [function(e, t, i) {
			t.exports = function() {
				var e = {},
					t = e._fns = {};
				return e.emit = function(e, i, r, s, n, o, a) {
					var l = function(e) {
						var i = t[e] ? t[e] : [],
							r = e.indexOf(":"),
							s = -1 === r ? [e] : [e.substring(0, r), e.substring(r + 1)],
							n = Object.keys(t),
							o = 0,
							a = n.length;
						for (; o < a; o++) {
							var l = n[o];
							if ("*" === l && (i = i.concat(t[l])), 2 === s.length && s[0] === l) {
								i = i.concat(t[l]);
								break
							}
						}
						return i
					}(e);
					l.length && function(e, t, i) {
						var r = 0,
							s = t.length;
						for (; r < s && t[r]; r++) t[r].event = e, t[r].apply(t[r], i)
					}(e, l, [i, r, s, n, o, a])
				}, e.on = function(e, i) {
					t[e] || (t[e] = []), t[e].push(i)
				}, e.once = function(t, i) {
					this.on(t, (function r() {
						i.apply(this, arguments), e.off(t, r)
					}))
				}, e.off = function(e, t) {
					var i = [];
					if (e && t)
						for (var r = this._fns[e], s = 0, n = r ? r.length : 0; s < n; s++) r[s] !== t && i.push(r[s]);
					i.length ? this._fns[e] = i : delete this._fns[e]
				}, e
			}
		}, {}],
		24: [function(e, t, i) {
			(function(i) {
				(function() {
					let {
						urlAlphabet: r
					} = e("./url-alphabet/index.cjs");
					if ("production" !== i.env.NODE_ENV) {
						if ("undefined" != typeof navigator && "ReactNative" === navigator.product && "undefined" == typeof crypto) throw new Error("React Native does not have a built-in secure random generator. If you don’t need unpredictable IDs use `nanoid/non-secure`. For secure IDs, import `react-native-get-random-values` before Nano ID.");
						if ("undefined" != typeof msCrypto && "undefined" == typeof crypto) throw new Error("Import file with `if (!window.crypto) window.crypto = window.msCrypto` before importing Nano ID to fix IE 11 support");
						if ("undefined" == typeof crypto) throw new Error("Your browser does not have secure random generator. If you don’t need unpredictable IDs, you can use nanoid/non-secure.")
					}
					let s = e => crypto.getRandomValues(new Uint8Array(e)),
						n = (e, t, i) => {
							let r = (2 << Math.log(e.length - 1) / Math.LN2) - 1,
								s = -~(1.6 * r * t / e.length);
							return () => {
								let n = "";
								for (;;) {
									let o = i(s),
										a = s;
									for (; a--;)
										if (n += e[o[a] & r] || "", n.length === t) return n
								}
							}
						};
					t.exports = {
						nanoid: (e = 21) => {
							let t = "",
								i = crypto.getRandomValues(new Uint8Array(e));
							for (; e--;) {
								let r = 63 & i[e];
								t += r < 36 ? r.toString(36) : r < 62 ? (r - 26).toString(36).toUpperCase() : r < 63 ? "_" : "-"
							}
							return t
						},
						customAlphabet: (e, t) => n(e, t, s),
						customRandom: n,
						urlAlphabet: r,
						random: s
					}
				}).call(this)
			}).call(this, e("_process"))
		}, {
			"./url-alphabet/index.cjs": 25,
			_process: 29
		}],
		25: [function(e, t, i) {
			t.exports = {
				urlAlphabet: "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"
			}
		}, {}],
		26: [function(e, t, i) {
			i.encode = function(e) {
				var t = "";
				for (var i in e) e.hasOwnProperty(i) && (t.length && (t += "&"), t += encodeURIComponent(i) + "=" + encodeURIComponent(e[i]));
				return t
			}, i.decode = function(e) {
				for (var t = {}, i = e.split("&"), r = 0, s = i.length; r < s; r++) {
					var n = i[r].split("=");
					t[decodeURIComponent(n[0])] = decodeURIComponent(n[1])
				}
				return t
			}
		}, {}],
		27: [function(e, t, i) {
			var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
				s = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
			t.exports = function(e) {
				var t = e,
					i = e.indexOf("["),
					n = e.indexOf("]"); - 1 != i && -1 != n && (e = e.substring(0, i) + e.substring(i, n).replace(/:/g, ";") + e.substring(n, e.length));
				for (var o, a, l = r.exec(e || ""), u = {}, p = 14; p--;) u[s[p]] = l[p] || "";
				return -1 != i && -1 != n && (u.source = t, u.host = u.host.substring(1, u.host.length - 1).replace(/;/g, ":"), u.authority = u.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), u.ipv6uri = !0), u.pathNames = function(e, t) {
					var i = /\/{2,9}/g,
						r = t.replace(i, "/").split("/");
					"/" != t.substr(0, 1) && 0 !== t.length || r.splice(0, 1);
					"/" == t.substr(t.length - 1, 1) && r.splice(r.length - 1, 1);
					return r
				}(0, u.path), u.queryKey = (o = u.query, a = {}, o.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, (function(e, t, i) {
					t && (a[t] = i)
				})), a), u
			}
		}, {}],
		28: [function(e, t, i) {
			var r, s, n, o, a, l, u, p, c = {},
				h = [],
				d = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

			function f(e, t) {
				for (var i in t) e[i] = t[i];
				return e
			}

			function m(e) {
				var t = e.parentNode;
				t && t.removeChild(e)
			}

			function g(e, t, i) {
				var s, n, o, a = {};
				for (o in t) "key" == o ? s = t[o] : "ref" == o ? n = t[o] : a[o] = t[o];
				if (arguments.length > 2 && (a.children = arguments.length > 3 ? r.call(arguments, 2) : i), "function" == typeof e && null != e.defaultProps)
					for (o in e.defaultProps) void 0 === a[o] && (a[o] = e.defaultProps[o]);
				return y(e, a, s, n, null)
			}

			function y(e, t, i, r, o) {
				var a = {
					type: e,
					props: t,
					key: i,
					ref: r,
					__k: null,
					__: null,
					__b: 0,
					__e: null,
					__d: void 0,
					__c: null,
					__h: null,
					constructor: void 0,
					__v: null == o ? ++n : o
				};
				return null == o && null != s.vnode && s.vnode(a), a
			}

			function v(e) {
				return e.children
			}

			function b(e, t) {
				this.props = e, this.context = t
			}

			function w(e, t) {
				if (null == t) return e.__ ? w(e.__, e.__.__k.indexOf(e) + 1) : null;
				for (var i; t < e.__k.length; t++)
					if (null != (i = e.__k[t]) && null != i.__e) return i.__e;
				return "function" == typeof e.type ? w(e) : null
			}

			function S(e) {
				var t, i;
				if (null != (e = e.__) && null != e.__c) {
					for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
						if (null != (i = e.__k[t]) && null != i.__e) {
							e.__e = e.__c.base = i.__e;
							break
						} return S(e)
				}
			}

			function P(e) {
				(!e.__d && (e.__d = !0) && a.push(e) && !k.__r++ || u !== s.debounceRendering) && ((u = s.debounceRendering) || l)(k)
			}

			function k() {
				for (var e; k.__r = a.length;) e = a.sort((function(e, t) {
					return e.__v.__b - t.__v.__b
				})), a = [], e.some((function(e) {
					var t, i, r, s, n, o;
					e.__d && (n = (s = (t = e).__v).__e, (o = t.__P) && (i = [], (r = f({}, s)).__v = s.__v + 1, T(o, s, r, t.__n, void 0 !== o.ownerSVGElement, null != s.__h ? [n] : null, i, null == n ? w(s) : n, s.__h), R(i, s), s.__e != n && S(s)))
				}))
			}

			function C(e, t, i, r, s, n, o, a, l, u) {
				var p, d, f, m, g, b, S, P = r && r.__k || h,
					k = P.length;
				for (i.__k = [], p = 0; p < t.length; p++)
					if (null != (m = i.__k[p] = null == (m = t[p]) || "boolean" == typeof m ? null : "string" == typeof m || "number" == typeof m || "bigint" == typeof m ? y(null, m, null, null, m) : Array.isArray(m) ? y(v, {
							children: m
						}, null, null, null) : m.__b > 0 ? y(m.type, m.props, m.key, null, m.__v) : m)) {
						if (m.__ = i, m.__b = i.__b + 1, null === (f = P[p]) || f && m.key == f.key && m.type === f.type) P[p] = void 0;
						else
							for (d = 0; d < k; d++) {
								if ((f = P[d]) && m.key == f.key && m.type === f.type) {
									P[d] = void 0;
									break
								}
								f = null
							}
						T(e, m, f = f || c, s, n, o, a, l, u), g = m.__e, (d = m.ref) && f.ref != d && (S || (S = []), f.ref && S.push(f.ref, null, m), S.push(d, m.__c || g, m)), null != g ? (null == b && (b = g), "function" == typeof m.type && m.__k === f.__k ? m.__d = l = E(m, l, e) : l = x(e, m, f, P, g, l), "function" == typeof i.type && (i.__d = l)) : l && f.__e == l && l.parentNode != e && (l = w(f))
					} for (i.__e = b, p = k; p--;) null != P[p] && ("function" == typeof i.type && null != P[p].__e && P[p].__e == i.__d && (i.__d = w(r, p + 1)), I(P[p], P[p]));
				if (S)
					for (p = 0; p < S.length; p++) D(S[p], S[++p], S[++p])
			}

			function E(e, t, i) {
				for (var r, s = e.__k, n = 0; s && n < s.length; n++)(r = s[n]) && (r.__ = e, t = "function" == typeof r.type ? E(r, t, i) : x(i, r, r, s, r.__e, t));
				return t
			}

			function x(e, t, i, r, s, n) {
				var o, a, l;
				if (void 0 !== t.__d) o = t.__d, t.__d = void 0;
				else if (null == i || s != n || null == s.parentNode) e: if (null == n || n.parentNode !== e) e.appendChild(s), o = null;
					else {
						for (a = n, l = 0;
							(a = a.nextSibling) && l < r.length; l += 2)
							if (a == s) break e;
						e.insertBefore(s, n), o = n
					} return void 0 !== o ? o : s.nextSibling
			}

			function _(e, t, i) {
				"-" === t[0] ? e.setProperty(t, i) : e[t] = null == i ? "" : "number" != typeof i || d.test(t) ? i : i + "px"
			}

			function F(e, t, i, r, s) {
				var n;
				e: if ("style" === t)
					if ("string" == typeof i) e.style.cssText = i;
					else {
						if ("string" == typeof r && (e.style.cssText = r = ""), r)
							for (t in r) i && t in i || _(e.style, t, "");
						if (i)
							for (t in i) r && i[t] === r[t] || _(e.style, t, i[t])
					}
				else if ("o" === t[0] && "n" === t[1]) n = t !== (t = t.replace(/Capture$/, "")), t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + n] = i, i ? r || e.addEventListener(t, n ? A : O, n) : e.removeEventListener(t, n ? A : O, n);
				else if ("dangerouslySetInnerHTML" !== t) {
					if (s) t = t.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
					else if ("href" !== t && "list" !== t && "form" !== t && "tabIndex" !== t && "download" !== t && t in e) try {
						e[t] = null == i ? "" : i;
						break e
					} catch (e) {}
					"function" == typeof i || (null != i && (!1 !== i || "a" === t[0] && "r" === t[1]) ? e.setAttribute(t, i) : e.removeAttribute(t))
				}
			}

			function O(e) {
				this.l[e.type + !1](s.event ? s.event(e) : e)
			}

			function A(e) {
				this.l[e.type + !0](s.event ? s.event(e) : e)
			}

			function T(e, t, i, r, n, o, a, l, u) {
				var p, c, h, d, m, g, y, w, S, P, k, E = t.type;
				if (void 0 !== t.constructor) return null;
				null != i.__h && (u = i.__h, l = t.__e = i.__e, t.__h = null, o = [l]), (p = s.__b) && p(t);
				try {
					e: if ("function" == typeof E) {
						if (w = t.props, S = (p = E.contextType) && r[p.__c], P = p ? S ? S.props.value : p.__ : r, i.__c ? y = (c = t.__c = i.__c).__ = c.__E : ("prototype" in E && E.prototype.render ? t.__c = c = new E(w, P) : (t.__c = c = new b(w, P), c.constructor = E, c.render = B), S && S.sub(c), c.props = w, c.state || (c.state = {}), c.context = P, c.__n = r, h = c.__d = !0, c.__h = []), null == c.__s && (c.__s = c.state), null != E.getDerivedStateFromProps && (c.__s == c.state && (c.__s = f({}, c.__s)), f(c.__s, E.getDerivedStateFromProps(w, c.__s))), d = c.props, m = c.state, h) null == E.getDerivedStateFromProps && null != c.componentWillMount && c.componentWillMount(), null != c.componentDidMount && c.__h.push(c.componentDidMount);
						else {
							if (null == E.getDerivedStateFromProps && w !== d && null != c.componentWillReceiveProps && c.componentWillReceiveProps(w, P), !c.__e && null != c.shouldComponentUpdate && !1 === c.shouldComponentUpdate(w, c.__s, P) || t.__v === i.__v) {
								c.props = w, c.state = c.__s, t.__v !== i.__v && (c.__d = !1), c.__v = t, t.__e = i.__e, t.__k = i.__k, t.__k.forEach((function(e) {
									e && (e.__ = t)
								})), c.__h.length && a.push(c);
								break e
							}
							null != c.componentWillUpdate && c.componentWillUpdate(w, c.__s, P), null != c.componentDidUpdate && c.__h.push((function() {
								c.componentDidUpdate(d, m, g)
							}))
						}
						c.context = P, c.props = w, c.state = c.__s, (p = s.__r) && p(t), c.__d = !1, c.__v = t, c.__P = e, p = c.render(c.props, c.state, c.context), c.state = c.__s, null != c.getChildContext && (r = f(f({}, r), c.getChildContext())), h || null == c.getSnapshotBeforeUpdate || (g = c.getSnapshotBeforeUpdate(d, m)), k = null != p && p.type === v && null == p.key ? p.props.children : p, C(e, Array.isArray(k) ? k : [k], t, i, r, n, o, a, l, u), c.base = t.__e, t.__h = null, c.__h.length && a.push(c), y && (c.__E = c.__ = null), c.__e = !1
					} else null == o && t.__v === i.__v ? (t.__k = i.__k, t.__e = i.__e) : t.__e = U(i.__e, t, i, r, n, o, a, u);
					(p = s.diffed) && p(t)
				}
				catch (e) {
					t.__v = null, (u || null != o) && (t.__e = l, t.__h = !!u, o[o.indexOf(l)] = null), s.__e(e, t, i)
				}
			}

			function R(e, t) {
				s.__c && s.__c(t, e), e.some((function(t) {
					try {
						e = t.__h, t.__h = [], e.some((function(e) {
							e.call(t)
						}))
					} catch (e) {
						s.__e(e, t.__v)
					}
				}))
			}

			function U(e, t, i, s, n, o, a, l) {
				var u, p, h, d = i.props,
					f = t.props,
					g = t.type,
					y = 0;
				if ("svg" === g && (n = !0), null != o)
					for (; y < o.length; y++)
						if ((u = o[y]) && (u === e || (g ? u.localName == g : 3 == u.nodeType))) {
							e = u, o[y] = null;
							break
						} if (null == e) {
					if (null === g) return document.createTextNode(f);
					e = n ? document.createElementNS("http://www.w3.org/2000/svg", g) : document.createElement(g, f.is && f), o = null, l = !1
				}
				if (null === g) d === f || l && e.data === f || (e.data = f);
				else {
					if (o = o && r.call(e.childNodes), p = (d = i.props || c).dangerouslySetInnerHTML, h = f.dangerouslySetInnerHTML, !l) {
						if (null != o)
							for (d = {}, y = 0; y < e.attributes.length; y++) d[e.attributes[y].name] = e.attributes[y].value;
						(h || p) && (h && (p && h.__html == p.__html || h.__html === e.innerHTML) || (e.innerHTML = h && h.__html || ""))
					}
					if (function(e, t, i, r, s) {
							var n;
							for (n in i) "children" === n || "key" === n || n in t || F(e, n, null, i[n], r);
							for (n in t) s && "function" != typeof t[n] || "children" === n || "key" === n || "value" === n || "checked" === n || i[n] === t[n] || F(e, n, t[n], i[n], r)
						}(e, f, d, n, l), h) t.__k = [];
					else if (y = t.props.children, C(e, Array.isArray(y) ? y : [y], t, i, s, n && "foreignObject" !== g, o, a, o ? o[0] : i.__k && w(i, 0), l), null != o)
						for (y = o.length; y--;) null != o[y] && m(o[y]);
					l || ("value" in f && void 0 !== (y = f.value) && (y !== e.value || "progress" === g && !y) && F(e, "value", y, d.value, !1), "checked" in f && void 0 !== (y = f.checked) && y !== e.checked && F(e, "checked", y, d.checked, !1))
				}
				return e
			}

			function D(e, t, i) {
				try {
					"function" == typeof e ? e(t) : e.current = t
				} catch (e) {
					s.__e(e, i)
				}
			}

			function I(e, t, i) {
				var r, n;
				if (s.unmount && s.unmount(e), (r = e.ref) && (r.current && r.current !== e.__e || D(r, null, t)), null != (r = e.__c)) {
					if (r.componentWillUnmount) try {
						r.componentWillUnmount()
					} catch (e) {
						s.__e(e, t)
					}
					r.base = r.__P = null
				}
				if (r = e.__k)
					for (n = 0; n < r.length; n++) r[n] && I(r[n], t, "function" != typeof e.type);
				i || null == e.__e || m(e.__e), e.__e = e.__d = void 0
			}

			function B(e, t, i) {
				return this.constructor(e, i)
			}

			function N(e, t, i) {
				var n, o, a;
				s.__ && s.__(e, t), o = (n = "function" == typeof i) ? null : i && i.__k || t.__k, a = [], T(t, e = (!n && i || t).__k = g(v, null, [e]), o || c, c, void 0 !== t.ownerSVGElement, !n && i ? [i] : o ? null : t.firstChild ? r.call(t.childNodes) : null, a, !n && i ? i : o ? o.__e : t.firstChild, n), R(a, e)
			}
			r = h.slice, s = {
				__e: function(e, t) {
					for (var i, r, s; t = t.__;)
						if ((i = t.__c) && !i.__) try {
							if ((r = i.constructor) && null != r.getDerivedStateFromError && (i.setState(r.getDerivedStateFromError(e)), s = i.__d), null != i.componentDidCatch && (i.componentDidCatch(e), s = i.__d), s) return i.__E = i
						} catch (t) {
							e = t
						}
					throw e
				}
			}, n = 0, o = function(e) {
				return null != e && void 0 === e.constructor
			}, b.prototype.setState = function(e, t) {
				var i;
				i = null != this.__s && this.__s !== this.state ? this.__s : this.__s = f({}, this.state), "function" == typeof e && (e = e(f({}, i), this.props)), e && f(i, e), null != e && this.__v && (t && this.__h.push(t), P(this))
			}, b.prototype.forceUpdate = function(e) {
				this.__v && (this.__e = !0, e && this.__h.push(e), P(this))
			}, b.prototype.render = v, a = [], l = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, k.__r = 0, p = 0, i.render = N, i.hydrate = function e(t, i) {
				N(t, i, e)
			}, i.createElement = g, i.h = g, i.Fragment = v, i.createRef = function() {
				return {
					current: null
				}
			}, i.isValidElement = o, i.Component = b, i.cloneElement = function(e, t, i) {
				var s, n, o, a = f({}, e.props);
				for (o in t) "key" == o ? s = t[o] : "ref" == o ? n = t[o] : a[o] = t[o];
				return arguments.length > 2 && (a.children = arguments.length > 3 ? r.call(arguments, 2) : i), y(e.type, a, s || e.key, n || e.ref, null)
			}, i.createContext = function(e, t) {
				var i = {
					__c: t = "__cC" + p++,
					__: e,
					Consumer: function(e, t) {
						return e.children(t)
					},
					Provider: function(e) {
						var i, r;
						return this.getChildContext || (i = [], (r = {})[t] = this, this.getChildContext = function() {
							return r
						}, this.shouldComponentUpdate = function(e) {
							this.props.value !== e.value && i.some(P)
						}, this.sub = function(e) {
							i.push(e);
							var t = e.componentWillUnmount;
							e.componentWillUnmount = function() {
								i.splice(i.indexOf(e), 1), t && t.call(e)
							}
						}), e.children
					}
				};
				return i.Provider.__ = i.Consumer.contextType = i
			}, i.toChildArray = function e(t, i) {
				return i = i || [], null == t || "boolean" == typeof t || (Array.isArray(t) ? t.some((function(t) {
					e(t, i)
				})) : i.push(t)), i
			}, i.options = s
		}, {}],
		29: [function(e, t, i) {
			var r, s, n = t.exports = {};

			function o() {
				throw new Error("setTimeout has not been defined")
			}

			function a() {
				throw new Error("clearTimeout has not been defined")
			}

			function l(e) {
				if (r === setTimeout) return setTimeout(e, 0);
				if ((r === o || !r) && setTimeout) return r = setTimeout, setTimeout(e, 0);
				try {
					return r(e, 0)
				} catch (t) {
					try {
						return r.call(null, e, 0)
					} catch (t) {
						return r.call(this, e, 0)
					}
				}
			}! function() {
				try {
					r = "function" == typeof setTimeout ? setTimeout : o
				} catch (e) {
					r = o
				}
				try {
					s = "function" == typeof clearTimeout ? clearTimeout : a
				} catch (e) {
					s = a
				}
			}();
			var u, p = [],
				c = !1,
				h = -1;

			function d() {
				c && u && (c = !1, u.length ? p = u.concat(p) : h = -1, p.length && f())
			}

			function f() {
				if (!c) {
					var e = l(d);
					c = !0;
					for (var t = p.length; t;) {
						for (u = p, p = []; ++h < t;) u && u[h].run();
						h = -1, t = p.length
					}
					u = null, c = !1,
						function(e) {
							if (s === clearTimeout) return clearTimeout(e);
							if ((s === a || !s) && clearTimeout) return s = clearTimeout, clearTimeout(e);
							try {
								s(e)
							} catch (t) {
								try {
									return s.call(null, e)
								} catch (t) {
									return s.call(this, e)
								}
							}
						}(e)
				}
			}

			function m(e, t) {
				this.fun = e, this.array = t
			}

			function g() {}
			n.nextTick = function(e) {
				var t = new Array(arguments.length - 1);
				if (arguments.length > 1)
					for (var i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
				p.push(new m(e, t)), 1 !== p.length || c || l(f)
			}, m.prototype.run = function() {
				this.fun.apply(null, this.array)
			}, n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.version = "", n.versions = {}, n.on = g, n.addListener = g, n.once = g, n.off = g, n.removeListener = g, n.removeAllListeners = g, n.emit = g, n.prependListener = g, n.prependOnceListener = g, n.listeners = function(e) {
				return []
			}, n.binding = function(e) {
				throw new Error("process.binding is not supported")
			}, n.cwd = function() {
				return "/"
			}, n.chdir = function(e) {
				throw new Error("process.chdir is not supported")
			}, n.umask = function() {
				return 0
			}
		}, {}],
		30: [function(e, t, i) {
			"use strict";
			var r = Object.prototype.hasOwnProperty;

			function s(e) {
				try {
					return decodeURIComponent(e.replace(/\+/g, " "))
				} catch (e) {
					return null
				}
			}

			function n(e) {
				try {
					return encodeURIComponent(e)
				} catch (e) {
					return null
				}
			}
			i.stringify = function(e, t) {
				t = t || "";
				var i, s, o = [];
				for (s in "string" != typeof t && (t = "?"), e)
					if (r.call(e, s)) {
						if ((i = e[s]) || null != i && !isNaN(i) || (i = ""), s = n(s), i = n(i), null === s || null === i) continue;
						o.push(s + "=" + i)
					} return o.length ? t + o.join("&") : ""
			}, i.parse = function(e) {
				for (var t, i = /([^=?#&]+)=?([^&]*)/g, r = {}; t = i.exec(e);) {
					var n = s(t[1]),
						o = s(t[2]);
					null === n || null === o || n in r || (r[n] = o)
				}
				return r
			}
		}, {}],
		31: [function(e, t, i) {
			"use strict";
			t.exports = function(e, t) {
				if (t = t.split(":")[0], !(e = +e)) return !1;
				switch (t) {
					case "http":
					case "ws":
						return 80 !== e;
					case "https":
					case "wss":
						return 443 !== e;
					case "ftp":
						return 21 !== e;
					case "gopher":
						return 70 !== e;
					case "file":
						return !1
				}
				return 0 !== e
			}
		}, {}],
		32: [function(e, t, i) {
			"use strict";
			var r = this && this.__importDefault || function(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			};
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = i.connect = i.io = i.Socket = i.Manager = i.protocol = void 0;
			const s = e("./url.js"),
				n = e("./manager.js");
			Object.defineProperty(i, "Manager", {
				enumerable: !0,
				get: function() {
					return n.Manager
				}
			});
			const o = e("./socket.js");
			Object.defineProperty(i, "Socket", {
				enumerable: !0,
				get: function() {
					return o.Socket
				}
			});
			const a = r(e("debug")).default("socket.io-client"),
				l = {};

			function u(e, t) {
				"object" == typeof e && (t = e, e = void 0), t = t || {};
				const i = s.url(e, t.path || "/socket.io"),
					r = i.source,
					o = i.id,
					u = i.path,
					p = l[o] && u in l[o].nsps;
				let c;
				return t.forceNew || t["force new connection"] || !1 === t.multiplex || p ? (a("ignoring socket cache for %s", r), c = new n.Manager(r, t)) : (l[o] || (a("new io instance for %s", r), l[o] = new n.Manager(r, t)), c = l[o]), i.query && !t.query && (t.query = i.queryKey), c.socket(i.path, t)
			}
			i.io = u, i.connect = u, i.default = u, Object.assign(u, {
				Manager: n.Manager,
				Socket: o.Socket,
				io: u,
				connect: u
			});
			var p = e("socket.io-parser");
			Object.defineProperty(i, "protocol", {
				enumerable: !0,
				get: function() {
					return p.protocol
				}
			}), t.exports = u
		}, {
			"./manager.js": 33,
			"./socket.js": 35,
			"./url.js": 36,
			debug: 9,
			"socket.io-parser": 54
		}],
		33: [function(e, t, i) {
			"use strict";
			var r = this && this.__createBinding || (Object.create ? function(e, t, i, r) {
					void 0 === r && (r = i), Object.defineProperty(e, r, {
						enumerable: !0,
						get: function() {
							return t[i]
						}
					})
				} : function(e, t, i, r) {
					void 0 === r && (r = i), e[r] = t[i]
				}),
				s = this && this.__setModuleDefault || (Object.create ? function(e, t) {
					Object.defineProperty(e, "default", {
						enumerable: !0,
						value: t
					})
				} : function(e, t) {
					e.default = t
				}),
				n = this && this.__importStar || function(e) {
					if (e && e.__esModule) return e;
					var t = {};
					if (null != e)
						for (var i in e) "default" !== i && Object.prototype.hasOwnProperty.call(e, i) && r(t, e, i);
					return s(t, e), t
				},
				o = this && this.__importDefault || function(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				};
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.Manager = void 0;
			const a = e("engine.io-client"),
				l = e("./socket.js"),
				u = n(e("socket.io-parser")),
				p = e("./on.js"),
				c = o(e("backo2")),
				h = e("@socket.io/component-emitter"),
				d = o(e("debug")).default("socket.io-client:manager");
			class f extends h.Emitter {
				constructor(e, t) {
					var i;
					super(), this.nsps = {}, this.subs = [], e && "object" == typeof e && (t = e, e = void 0), (t = t || {}).path = t.path || "/socket.io", this.opts = t, a.installTimerFunctions(this, t), this.reconnection(!1 !== t.reconnection), this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0), this.reconnectionDelay(t.reconnectionDelay || 1e3), this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3), this.randomizationFactor(null !== (i = t.randomizationFactor) && void 0 !== i ? i : .5), this.backoff = new c.default({
						min: this.reconnectionDelay(),
						max: this.reconnectionDelayMax(),
						jitter: this.randomizationFactor()
					}), this.timeout(null == t.timeout ? 2e4 : t.timeout), this._readyState = "closed", this.uri = e;
					const r = t.parser || u;
					this.encoder = new r.Encoder, this.decoder = new r.Decoder, this._autoConnect = !1 !== t.autoConnect, this._autoConnect && this.open()
				}
				reconnection(e) {
					return arguments.length ? (this._reconnection = !!e, this) : this._reconnection
				}
				reconnectionAttempts(e) {
					return void 0 === e ? this._reconnectionAttempts : (this._reconnectionAttempts = e, this)
				}
				reconnectionDelay(e) {
					var t;
					return void 0 === e ? this._reconnectionDelay : (this._reconnectionDelay = e, null === (t = this.backoff) || void 0 === t || t.setMin(e), this)
				}
				randomizationFactor(e) {
					var t;
					return void 0 === e ? this._randomizationFactor : (this._randomizationFactor = e, null === (t = this.backoff) || void 0 === t || t.setJitter(e), this)
				}
				reconnectionDelayMax(e) {
					var t;
					return void 0 === e ? this._reconnectionDelayMax : (this._reconnectionDelayMax = e, null === (t = this.backoff) || void 0 === t || t.setMax(e), this)
				}
				timeout(e) {
					return arguments.length ? (this._timeout = e, this) : this._timeout
				}
				maybeReconnectOnOpen() {
					!this._reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
				}
				open(e) {
					if (d("readyState %s", this._readyState), ~this._readyState.indexOf("open")) return this;
					d("opening %s", this.uri), this.engine = new a.Socket(this.uri, this.opts);
					const t = this.engine,
						i = this;
					this._readyState = "opening", this.skipReconnect = !1;
					const r = p.on(t, "open", (function() {
							i.onopen(), e && e()
						})),
						s = p.on(t, "error", (t => {
							d("error"), i.cleanup(), i._readyState = "closed", this.emitReserved("error", t), e ? e(t) : i.maybeReconnectOnOpen()
						}));
					if (!1 !== this._timeout) {
						const e = this._timeout;
						d("connect attempt will timeout after %d", e), 0 === e && r();
						const i = this.setTimeoutFn((() => {
							d("connect attempt timed out after %d", e), r(), t.close(), t.emit("error", new Error("timeout"))
						}), e);
						this.opts.autoUnref && i.unref(), this.subs.push((function() {
							clearTimeout(i)
						}))
					}
					return this.subs.push(r), this.subs.push(s), this
				}
				connect(e) {
					return this.open(e)
				}
				onopen() {
					d("open"), this.cleanup(), this._readyState = "open", this.emitReserved("open");
					const e = this.engine;
					this.subs.push(p.on(e, "ping", this.onping.bind(this)), p.on(e, "data", this.ondata.bind(this)), p.on(e, "error", this.onerror.bind(this)), p.on(e, "close", this.onclose.bind(this)), p.on(this.decoder, "decoded", this.ondecoded.bind(this)))
				}
				onping() {
					this.emitReserved("ping")
				}
				ondata(e) {
					this.decoder.add(e)
				}
				ondecoded(e) {
					this.emitReserved("packet", e)
				}
				onerror(e) {
					d("error", e), this.emitReserved("error", e)
				}
				socket(e, t) {
					let i = this.nsps[e];
					return i || (i = new l.Socket(this, e, t), this.nsps[e] = i), i
				}
				_destroy(e) {
					const t = Object.keys(this.nsps);
					for (const e of t) {
						if (this.nsps[e].active) return void d("socket %s is still active, skipping close", e)
					}
					this._close()
				}
				_packet(e) {
					d("writing packet %j", e);
					const t = this.encoder.encode(e);
					for (let i = 0; i < t.length; i++) this.engine.write(t[i], e.options)
				}
				cleanup() {
					d("cleanup"), this.subs.forEach((e => e())), this.subs.length = 0, this.decoder.destroy()
				}
				_close() {
					d("disconnect"), this.skipReconnect = !0, this._reconnecting = !1, "opening" === this._readyState && this.cleanup(), this.backoff.reset(), this._readyState = "closed", this.engine && this.engine.close()
				}
				disconnect() {
					return this._close()
				}
				onclose(e) {
					d("onclose"), this.cleanup(), this.backoff.reset(), this._readyState = "closed", this.emitReserved("close", e), this._reconnection && !this.skipReconnect && this.reconnect()
				}
				reconnect() {
					if (this._reconnecting || this.skipReconnect) return this;
					const e = this;
					if (this.backoff.attempts >= this._reconnectionAttempts) d("reconnect failed"), this.backoff.reset(), this.emitReserved("reconnect_failed"), this._reconnecting = !1;
					else {
						const t = this.backoff.duration();
						d("will wait %dms before reconnect attempt", t), this._reconnecting = !0;
						const i = this.setTimeoutFn((() => {
							e.skipReconnect || (d("attempting reconnect"), this.emitReserved("reconnect_attempt", e.backoff.attempts), e.skipReconnect || e.open((t => {
								t ? (d("reconnect attempt error"), e._reconnecting = !1, e.reconnect(), this.emitReserved("reconnect_error", t)) : (d("reconnect success"), e.onreconnect())
							})))
						}), t);
						this.opts.autoUnref && i.unref(), this.subs.push((function() {
							clearTimeout(i)
						}))
					}
				}
				onreconnect() {
					const e = this.backoff.attempts;
					this._reconnecting = !1, this.backoff.reset(), this.emitReserved("reconnect", e)
				}
			}
			i.Manager = f
		}, {
			"./on.js": 34,
			"./socket.js": 35,
			"@socket.io/component-emitter": 1,
			backo2: 3,
			debug: 9,
			"engine.io-client": 39,
			"socket.io-parser": 54
		}],
		34: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.on = void 0, i.on = function(e, t, i) {
				return e.on(t, i),
					function() {
						e.off(t, i)
					}
			}
		}, {}],
		35: [function(e, t, i) {
			"use strict";
			var r = this && this.__importDefault || function(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			};
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.Socket = void 0;
			const s = e("socket.io-parser"),
				n = e("./on.js"),
				o = e("@socket.io/component-emitter"),
				a = r(e("debug")).default("socket.io-client:socket"),
				l = Object.freeze({
					connect: 1,
					connect_error: 1,
					disconnect: 1,
					disconnecting: 1,
					newListener: 1,
					removeListener: 1
				});
			class u extends o.Emitter {
				constructor(e, t, i) {
					super(), this.connected = !1, this.disconnected = !0, this.receiveBuffer = [], this.sendBuffer = [], this.ids = 0, this.acks = {}, this.flags = {}, this.io = e, this.nsp = t, i && i.auth && (this.auth = i.auth), this.io._autoConnect && this.open()
				}
				subEvents() {
					if (this.subs) return;
					const e = this.io;
					this.subs = [n.on(e, "open", this.onopen.bind(this)), n.on(e, "packet", this.onpacket.bind(this)), n.on(e, "error", this.onerror.bind(this)), n.on(e, "close", this.onclose.bind(this))]
				}
				get active() {
					return !!this.subs
				}
				connect() {
					return this.connected || (this.subEvents(), this.io._reconnecting || this.io.open(), "open" === this.io._readyState && this.onopen()), this
				}
				open() {
					return this.connect()
				}
				send(...e) {
					return e.unshift("message"), this.emit.apply(this, e), this
				}
				emit(e, ...t) {
					if (l.hasOwnProperty(e)) throw new Error('"' + e + '" is a reserved event name');
					t.unshift(e);
					const i = {
						type: s.PacketType.EVENT,
						data: t,
						options: {}
					};
					i.options.compress = !1 !== this.flags.compress, "function" == typeof t[t.length - 1] && (a("emitting packet with ack id %d", this.ids), this.acks[this.ids] = t.pop(), i.id = this.ids++);
					const r = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
					return this.flags.volatile && (!r || !this.connected) ? a("discard packet as the transport is not currently writable") : this.connected ? this.packet(i) : this.sendBuffer.push(i), this.flags = {}, this
				}
				packet(e) {
					e.nsp = this.nsp, this.io._packet(e)
				}
				onopen() {
					a("transport is open - connecting"), "function" == typeof this.auth ? this.auth((e => {
						this.packet({
							type: s.PacketType.CONNECT,
							data: e
						})
					})) : this.packet({
						type: s.PacketType.CONNECT,
						data: this.auth
					})
				}
				onerror(e) {
					this.connected || this.emitReserved("connect_error", e)
				}
				onclose(e) {
					a("close (%s)", e), this.connected = !1, this.disconnected = !0, delete this.id, this.emitReserved("disconnect", e)
				}
				onpacket(e) {
					if (e.nsp === this.nsp) switch (e.type) {
						case s.PacketType.CONNECT:
							if (e.data && e.data.sid) {
								const t = e.data.sid;
								this.onconnect(t)
							} else this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
							break;
						case s.PacketType.EVENT:
						case s.PacketType.BINARY_EVENT:
							this.onevent(e);
							break;
						case s.PacketType.ACK:
						case s.PacketType.BINARY_ACK:
							this.onack(e);
							break;
						case s.PacketType.DISCONNECT:
							this.ondisconnect();
							break;
						case s.PacketType.CONNECT_ERROR:
							const t = new Error(e.data.message);
							t.data = e.data.data, this.emitReserved("connect_error", t)
					}
				}
				onevent(e) {
					const t = e.data || [];
					a("emitting event %j", t), null != e.id && (a("attaching ack callback to event"), t.push(this.ack(e.id))), this.connected ? this.emitEvent(t) : this.receiveBuffer.push(Object.freeze(t))
				}
				emitEvent(e) {
					if (this._anyListeners && this._anyListeners.length) {
						const t = this._anyListeners.slice();
						for (const i of t) i.apply(this, e)
					}
					super.emit.apply(this, e)
				}
				ack(e) {
					const t = this;
					let i = !1;
					return function(...r) {
						i || (i = !0, a("sending ack %j", r), t.packet({
							type: s.PacketType.ACK,
							id: e,
							data: r
						}))
					}
				}
				onack(e) {
					const t = this.acks[e.id];
					"function" == typeof t ? (a("calling ack %s with %j", e.id, e.data), t.apply(this, e.data), delete this.acks[e.id]) : a("bad ack %s", e.id)
				}
				onconnect(e) {
					a("socket connected with id %s", e), this.id = e, this.connected = !0, this.disconnected = !1, this.emitBuffered(), this.emitReserved("connect")
				}
				emitBuffered() {
					this.receiveBuffer.forEach((e => this.emitEvent(e))), this.receiveBuffer = [], this.sendBuffer.forEach((e => this.packet(e))), this.sendBuffer = []
				}
				ondisconnect() {
					a("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect")
				}
				destroy() {
					this.subs && (this.subs.forEach((e => e())), this.subs = void 0), this.io._destroy(this)
				}
				disconnect() {
					return this.connected && (a("performing disconnect (%s)", this.nsp), this.packet({
						type: s.PacketType.DISCONNECT
					})), this.destroy(), this.connected && this.onclose("io client disconnect"), this
				}
				close() {
					return this.disconnect()
				}
				compress(e) {
					return this.flags.compress = e, this
				}
				get volatile() {
					return this.flags.volatile = !0, this
				}
				onAny(e) {
					return this._anyListeners = this._anyListeners || [], this._anyListeners.push(e), this
				}
				prependAny(e) {
					return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(e), this
				}
				offAny(e) {
					if (!this._anyListeners) return this;
					if (e) {
						const t = this._anyListeners;
						for (let i = 0; i < t.length; i++)
							if (e === t[i]) return t.splice(i, 1), this
					} else this._anyListeners = [];
					return this
				}
				listenersAny() {
					return this._anyListeners || []
				}
			}
			i.Socket = u
		}, {
			"./on.js": 34,
			"@socket.io/component-emitter": 1,
			debug: 9,
			"socket.io-parser": 54
		}],
		36: [function(e, t, i) {
			"use strict";
			var r = this && this.__importDefault || function(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			};
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.url = void 0;
			const s = r(e("parseuri")),
				n = r(e("debug")).default("socket.io-client:url");
			i.url = function(e, t = "", i) {
				let r = e;
				i = i || "undefined" != typeof location && location, null == e && (e = i.protocol + "//" + i.host), "string" == typeof e && ("/" === e.charAt(0) && (e = "/" === e.charAt(1) ? i.protocol + e : i.host + e), /^(https?|wss?):\/\//.test(e) || (n("protocol-less url %s", e), e = void 0 !== i ? i.protocol + "//" + e : "https://" + e), n("parse %s", e), r = s.default(e)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")), r.path = r.path || "/";
				const o = -1 !== r.host.indexOf(":") ? "[" + r.host + "]" : r.host;
				return r.id = r.protocol + "://" + o + ":" + r.port + t, r.href = r.protocol + "://" + o + (i && i.port === r.port ? "" : ":" + r.port), r
			}
		}, {
			debug: 9,
			parseuri: 27
		}],
		37: [function(e, t, i) {
			! function(e, r) {
				"object" == typeof i && void 0 !== t ? r(i) : r((e = "undefined" != typeof globalThis ? globalThis : e || self)["base64-arraybuffer"] = {})
			}(this, (function(e) {
				"use strict";
				for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), r = 0; r < t.length; r++) i[t.charCodeAt(r)] = r;
				e.decode = function(e) {
					var t, r, s, n, o, a = .75 * e.length,
						l = e.length,
						u = 0;
					"=" === e[e.length - 1] && (a--, "=" === e[e.length - 2] && a--);
					var p = new ArrayBuffer(a),
						c = new Uint8Array(p);
					for (t = 0; t < l; t += 4) r = i[e.charCodeAt(t)], s = i[e.charCodeAt(t + 1)], n = i[e.charCodeAt(t + 2)], o = i[e.charCodeAt(t + 3)], c[u++] = r << 2 | s >> 4, c[u++] = (15 & s) << 4 | n >> 2, c[u++] = (3 & n) << 6 | 63 & o;
					return p
				}, e.encode = function(e) {
					var i, r = new Uint8Array(e),
						s = r.length,
						n = "";
					for (i = 0; i < s; i += 3) n += t[r[i] >> 2], n += t[(3 & r[i]) << 4 | r[i + 1] >> 4], n += t[(15 & r[i + 1]) << 2 | r[i + 2] >> 6], n += t[63 & r[i + 2]];
					return s % 3 == 2 ? n = n.substring(0, n.length - 1) + "=" : s % 3 == 1 && (n = n.substring(0, n.length - 2) + "=="), n
				}, Object.defineProperty(e, "__esModule", {
					value: !0
				})
			}))
		}, {}],
		38: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = "undefined" != typeof self ? self : "undefined" != typeof window ? window : Function("return this")()
		}, {}],
		39: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.installTimerFunctions = i.transports = i.Transport = i.protocol = i.Socket = void 0;
			const r = e("./socket.js");
			Object.defineProperty(i, "Socket", {
				enumerable: !0,
				get: function() {
					return r.Socket
				}
			}), i.protocol = r.Socket.protocol;
			var s = e("./transport.js");
			Object.defineProperty(i, "Transport", {
				enumerable: !0,
				get: function() {
					return s.Transport
				}
			});
			var n = e("./transports/index.js");
			Object.defineProperty(i, "transports", {
				enumerable: !0,
				get: function() {
					return n.transports
				}
			});
			var o = e("./util.js");
			Object.defineProperty(i, "installTimerFunctions", {
				enumerable: !0,
				get: function() {
					return o.installTimerFunctions
				}
			})
		}, {
			"./socket.js": 40,
			"./transport.js": 41,
			"./transports/index.js": 42,
			"./util.js": 48
		}],
		40: [function(e, t, i) {
			"use strict";
			var r = this && this.__importDefault || function(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			};
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.Socket = void 0;
			const s = e("./transports/index.js"),
				n = e("./util.js"),
				o = r(e("parseqs")),
				a = r(e("parseuri")),
				l = r(e("debug")),
				u = e("@socket.io/component-emitter"),
				p = e("engine.io-parser"),
				c = (0, l.default)("engine.io-client:socket");
			class h extends u.Emitter {
				constructor(e, t = {}) {
					super(), e && "object" == typeof e && (t = e, e = null), e ? (e = (0, a.default)(e), t.hostname = e.host, t.secure = "https" === e.protocol || "wss" === e.protocol, t.port = e.port, e.query && (t.query = e.query)) : t.host && (t.hostname = (0, a.default)(t.host).host), (0, n.installTimerFunctions)(this, t), this.secure = null != t.secure ? t.secure : "undefined" != typeof location && "https:" === location.protocol, t.hostname && !t.port && (t.port = this.secure ? "443" : "80"), this.hostname = t.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), this.port = t.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? "443" : "80"), this.transports = t.transports || ["polling", "websocket"], this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.opts = Object.assign({
						path: "/engine.io",
						agent: !1,
						withCredentials: !1,
						upgrade: !0,
						timestampParam: "t",
						rememberUpgrade: !1,
						rejectUnauthorized: !0,
						perMessageDeflate: {
							threshold: 1024
						},
						transportOptions: {},
						closeOnBeforeunload: !0
					}, t), this.opts.path = this.opts.path.replace(/\/$/, "") + "/", "string" == typeof this.opts.query && (this.opts.query = o.default.decode(this.opts.query)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingTimeoutTimer = null, "function" == typeof addEventListener && (this.opts.closeOnBeforeunload && addEventListener("beforeunload", (() => {
						this.transport && (this.transport.removeAllListeners(), this.transport.close())
					}), !1), "localhost" !== this.hostname && (this.offlineEventListener = () => {
						this.onClose("transport close")
					}, addEventListener("offline", this.offlineEventListener, !1))), this.open()
				}
				createTransport(e) {
					c('creating transport "%s"', e);
					const t = function(e) {
						const t = {};
						for (let i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
						return t
					}(this.opts.query);
					t.EIO = p.protocol, t.transport = e, this.id && (t.sid = this.id);
					const i = Object.assign({}, this.opts.transportOptions[e], this.opts, {
						query: t,
						socket: this,
						hostname: this.hostname,
						secure: this.secure,
						port: this.port
					});
					return c("options: %j", i), new s.transports[e](i)
				}
				open() {
					let e;
					if (this.opts.rememberUpgrade && h.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) e = "websocket";
					else {
						if (0 === this.transports.length) return void this.setTimeoutFn((() => {
							this.emitReserved("error", "No transports available")
						}), 0);
						e = this.transports[0]
					}
					this.readyState = "opening";
					try {
						e = this.createTransport(e)
					} catch (e) {
						return c("error while creating transport: %s", e), this.transports.shift(), void this.open()
					}
					e.open(), this.setTransport(e)
				}
				setTransport(e) {
					c("setting transport %s", e.name), this.transport && (c("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = e, e.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", (() => {
						this.onClose("transport close")
					}))
				}
				probe(e) {
					c('probing transport "%s"', e);
					let t = this.createTransport(e),
						i = !1;
					h.priorWebsocketSuccess = !1;
					const r = () => {
						i || (c('probe transport "%s" opened', e), t.send([{
							type: "ping",
							data: "probe"
						}]), t.once("packet", (r => {
							if (!i)
								if ("pong" === r.type && "probe" === r.data) {
									if (c('probe transport "%s" pong', e), this.upgrading = !0, this.emitReserved("upgrading", t), !t) return;
									h.priorWebsocketSuccess = "websocket" === t.name, c('pausing current transport "%s"', this.transport.name), this.transport.pause((() => {
										i || "closed" !== this.readyState && (c("changing transport and sending upgrade packet"), u(), this.setTransport(t), t.send([{
											type: "upgrade"
										}]), this.emitReserved("upgrade", t), t = null, this.upgrading = !1, this.flush())
									}))
								} else {
									c('probe transport "%s" failed', e);
									const i = new Error("probe error");
									i.transport = t.name, this.emitReserved("upgradeError", i)
								}
						})))
					};

					function s() {
						i || (i = !0, u(), t.close(), t = null)
					}
					const n = i => {
						const r = new Error("probe error: " + i);
						r.transport = t.name, s(), c('probe transport "%s" failed because of error: %s', e, i), this.emitReserved("upgradeError", r)
					};

					function o() {
						n("transport closed")
					}

					function a() {
						n("socket closed")
					}

					function l(e) {
						t && e.name !== t.name && (c('"%s" works - aborting "%s"', e.name, t.name), s())
					}
					const u = () => {
						t.removeListener("open", r), t.removeListener("error", n), t.removeListener("close", o), this.off("close", a), this.off("upgrading", l)
					};
					t.once("open", r), t.once("error", n), t.once("close", o), this.once("close", a), this.once("upgrading", l), t.open()
				}
				onOpen() {
					if (c("socket open"), this.readyState = "open", h.priorWebsocketSuccess = "websocket" === this.transport.name, this.emitReserved("open"), this.flush(), "open" === this.readyState && this.opts.upgrade && this.transport.pause) {
						c("starting upgrade probes");
						let e = 0;
						const t = this.upgrades.length;
						for (; e < t; e++) this.probe(this.upgrades[e])
					}
				}
				onPacket(e) {
					if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (c('socket receive: type "%s", data "%s"', e.type, e.data), this.emitReserved("packet", e), this.emitReserved("heartbeat"), e.type) {
						case "open":
							this.onHandshake(JSON.parse(e.data));
							break;
						case "ping":
							this.resetPingTimeout(), this.sendPacket("pong"), this.emitReserved("ping"), this.emitReserved("pong");
							break;
						case "error":
							const t = new Error("server error");
							t.code = e.data, this.onError(t);
							break;
						case "message":
							this.emitReserved("data", e.data), this.emitReserved("message", e.data)
					} else c('packet received with socket readyState "%s"', this.readyState)
				}
				onHandshake(e) {
					this.emitReserved("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this.upgrades = this.filterUpgrades(e.upgrades), this.pingInterval = e.pingInterval, this.pingTimeout = e.pingTimeout, this.onOpen(), "closed" !== this.readyState && this.resetPingTimeout()
				}
				resetPingTimeout() {
					this.clearTimeoutFn(this.pingTimeoutTimer), this.pingTimeoutTimer = this.setTimeoutFn((() => {
						this.onClose("ping timeout")
					}), this.pingInterval + this.pingTimeout), this.opts.autoUnref && this.pingTimeoutTimer.unref()
				}
				onDrain() {
					this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emitReserved("drain") : this.flush()
				}
				flush() {
					"closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (c("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emitReserved("flush"))
				}
				write(e, t, i) {
					return this.sendPacket("message", e, t, i), this
				}
				send(e, t, i) {
					return this.sendPacket("message", e, t, i), this
				}
				sendPacket(e, t, i, r) {
					if ("function" == typeof t && (r = t, t = void 0), "function" == typeof i && (r = i, i = null), "closing" === this.readyState || "closed" === this.readyState) return;
					(i = i || {}).compress = !1 !== i.compress;
					const s = {
						type: e,
						data: t,
						options: i
					};
					this.emitReserved("packetCreate", s), this.writeBuffer.push(s), r && this.once("flush", r), this.flush()
				}
				close() {
					const e = () => {
							this.onClose("forced close"), c("socket closing - telling transport to close"), this.transport.close()
						},
						t = () => {
							this.off("upgrade", t), this.off("upgradeError", t), e()
						},
						i = () => {
							this.once("upgrade", t), this.once("upgradeError", t)
						};
					return "opening" !== this.readyState && "open" !== this.readyState || (this.readyState = "closing", this.writeBuffer.length ? this.once("drain", (() => {
						this.upgrading ? i() : e()
					})) : this.upgrading ? i() : e()), this
				}
				onError(e) {
					c("socket error %j", e), h.priorWebsocketSuccess = !1, this.emitReserved("error", e), this.onClose("transport error", e)
				}
				onClose(e, t) {
					"opening" !== this.readyState && "open" !== this.readyState && "closing" !== this.readyState || (c('socket close with reason: "%s"', e), this.clearTimeoutFn(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), "function" == typeof removeEventListener && removeEventListener("offline", this.offlineEventListener, !1), this.readyState = "closed", this.id = null, this.emitReserved("close", e, t), this.writeBuffer = [], this.prevBufferLen = 0)
				}
				filterUpgrades(e) {
					const t = [];
					let i = 0;
					const r = e.length;
					for (; i < r; i++) ~this.transports.indexOf(e[i]) && t.push(e[i]);
					return t
				}
			}
			i.Socket = h, h.protocol = p.protocol
		}, {
			"./transports/index.js": 42,
			"./util.js": 48,
			"@socket.io/component-emitter": 1,
			debug: 9,
			"engine.io-parser": 52,
			parseqs: 26,
			parseuri: 27
		}],
		41: [function(e, t, i) {
			"use strict";
			var r = this && this.__importDefault || function(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			};
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.Transport = void 0;
			const s = e("engine.io-parser"),
				n = e("@socket.io/component-emitter"),
				o = e("./util.js"),
				a = (0, r(e("debug")).default)("engine.io-client:transport");
			class l extends n.Emitter {
				constructor(e) {
					super(), this.writable = !1, (0, o.installTimerFunctions)(this, e), this.opts = e, this.query = e.query, this.readyState = "", this.socket = e.socket
				}
				onError(e, t) {
					const i = new Error(e);
					return i.type = "TransportError", i.description = t, super.emit("error", i), this
				}
				open() {
					return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this
				}
				close() {
					return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this
				}
				send(e) {
					"open" === this.readyState ? this.write(e) : a("transport is not open, discarding packets")
				}
				onOpen() {
					this.readyState = "open", this.writable = !0, super.emit("open")
				}
				onData(e) {
					const t = (0, s.decodePacket)(e, this.socket.binaryType);
					this.onPacket(t)
				}
				onPacket(e) {
					super.emit("packet", e)
				}
				onClose() {
					this.readyState = "closed", super.emit("close")
				}
			}
			i.Transport = l
		}, {
			"./util.js": 48,
			"@socket.io/component-emitter": 1,
			debug: 9,
			"engine.io-parser": 52
		}],
		42: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.transports = void 0;
			const r = e("./polling-xhr.js"),
				s = e("./websocket.js");
			i.transports = {
				websocket: s.WS,
				polling: r.XHR
			}
		}, {
			"./polling-xhr.js": 43,
			"./websocket.js": 46
		}],
		43: [function(e, t, i) {
			"use strict";
			var r = this && this.__importDefault || function(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			};
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.Request = i.XHR = void 0;
			const s = r(e("./xmlhttprequest.js")),
				n = r(e("debug")),
				o = r(e("../globalThis.js")),
				a = e("../util.js"),
				l = e("@socket.io/component-emitter"),
				u = e("./polling.js"),
				p = (0, n.default)("engine.io-client:polling-xhr");

			function c() {}
			const h = null != new s.default({
				xdomain: !1
			}).responseType;
			class d extends u.Polling {
				constructor(e) {
					if (super(e), "undefined" != typeof location) {
						const t = "https:" === location.protocol;
						let i = location.port;
						i || (i = t ? "443" : "80"), this.xd = "undefined" != typeof location && e.hostname !== location.hostname || i !== e.port, this.xs = e.secure !== t
					}
					const t = e && e.forceBase64;
					this.supportsBinary = h && !t
				}
				request(e = {}) {
					return Object.assign(e, {
						xd: this.xd,
						xs: this.xs
					}, this.opts), new f(this.uri(), e)
				}
				doWrite(e, t) {
					const i = this.request({
						method: "POST",
						data: e
					});
					i.on("success", t), i.on("error", (e => {
						this.onError("xhr post error", e)
					}))
				}
				doPoll() {
					p("xhr poll");
					const e = this.request();
					e.on("data", this.onData.bind(this)), e.on("error", (e => {
						this.onError("xhr poll error", e)
					})), this.pollXhr = e
				}
			}
			i.XHR = d;
			class f extends l.Emitter {
				constructor(e, t) {
					super(), (0, a.installTimerFunctions)(this, t), this.opts = t, this.method = t.method || "GET", this.uri = e, this.async = !1 !== t.async, this.data = void 0 !== t.data ? t.data : null, this.create()
				}
				create() {
					const e = (0, a.pick)(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
					e.xdomain = !!this.opts.xd, e.xscheme = !!this.opts.xs;
					const t = this.xhr = new s.default(e);
					try {
						p("xhr open %s: %s", this.method, this.uri), t.open(this.method, this.uri, this.async);
						try {
							if (this.opts.extraHeaders) {
								t.setDisableHeaderCheck && t.setDisableHeaderCheck(!0);
								for (let e in this.opts.extraHeaders) this.opts.extraHeaders.hasOwnProperty(e) && t.setRequestHeader(e, this.opts.extraHeaders[e])
							}
						} catch (e) {}
						if ("POST" === this.method) try {
							t.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
						} catch (e) {}
						try {
							t.setRequestHeader("Accept", "*/*")
						} catch (e) {}
						"withCredentials" in t && (t.withCredentials = this.opts.withCredentials), this.opts.requestTimeout && (t.timeout = this.opts.requestTimeout), t.onreadystatechange = () => {
							4 === t.readyState && (200 === t.status || 1223 === t.status ? this.onLoad() : this.setTimeoutFn((() => {
								this.onError("number" == typeof t.status ? t.status : 0)
							}), 0))
						}, p("xhr data %s", this.data), t.send(this.data)
					} catch (e) {
						return void this.setTimeoutFn((() => {
							this.onError(e)
						}), 0)
					}
					"undefined" != typeof document && (this.index = f.requestsCount++, f.requests[this.index] = this)
				}
				onSuccess() {
					this.emit("success"), this.cleanup()
				}
				onData(e) {
					this.emit("data", e), this.onSuccess()
				}
				onError(e) {
					this.emit("error", e), this.cleanup(!0)
				}
				cleanup(e) {
					if (void 0 !== this.xhr && null !== this.xhr) {
						if (this.xhr.onreadystatechange = c, e) try {
							this.xhr.abort()
						} catch (e) {}
						"undefined" != typeof document && delete f.requests[this.index], this.xhr = null
					}
				}
				onLoad() {
					const e = this.xhr.responseText;
					null !== e && this.onData(e)
				}
				abort() {
					this.cleanup()
				}
			}
			if (i.Request = f, f.requestsCount = 0, f.requests = {}, "undefined" != typeof document)
				if ("function" == typeof attachEvent) attachEvent("onunload", m);
				else if ("function" == typeof addEventListener) {
				const e = "onpagehide" in o.default ? "pagehide" : "unload";
				addEventListener(e, m, !1)
			}

			function m() {
				for (let e in f.requests) f.requests.hasOwnProperty(e) && f.requests[e].abort()
			}
		}, {
			"../globalThis.js": 38,
			"../util.js": 48,
			"./polling.js": 44,
			"./xmlhttprequest.js": 47,
			"@socket.io/component-emitter": 1,
			debug: 9
		}],
		44: [function(e, t, i) {
			"use strict";
			var r = this && this.__importDefault || function(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			};
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.Polling = void 0;
			const s = e("../transport.js"),
				n = r(e("debug")),
				o = r(e("yeast")),
				a = r(e("parseqs")),
				l = e("engine.io-parser"),
				u = (0, n.default)("engine.io-client:polling");
			class p extends s.Transport {
				constructor() {
					super(...arguments), this.polling = !1
				}
				get name() {
					return "polling"
				}
				doOpen() {
					this.poll()
				}
				pause(e) {
					this.readyState = "pausing";
					const t = () => {
						u("paused"), this.readyState = "paused", e()
					};
					if (this.polling || !this.writable) {
						let e = 0;
						this.polling && (u("we are currently polling - waiting to pause"), e++, this.once("pollComplete", (function() {
							u("pre-pause polling complete"), --e || t()
						}))), this.writable || (u("we are currently writing - waiting to pause"), e++, this.once("drain", (function() {
							u("pre-pause writing complete"), --e || t()
						})))
					} else t()
				}
				poll() {
					u("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
				}
				onData(e) {
					u("polling got data %s", e);
					(0, l.decodePayload)(e, this.socket.binaryType).forEach((e => {
						if ("opening" === this.readyState && "open" === e.type && this.onOpen(), "close" === e.type) return this.onClose(), !1;
						this.onPacket(e)
					})), "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" === this.readyState ? this.poll() : u('ignoring poll - transport state "%s"', this.readyState))
				}
				doClose() {
					const e = () => {
						u("writing close packet"), this.write([{
							type: "close"
						}])
					};
					"open" === this.readyState ? (u("transport open - closing"), e()) : (u("transport not open - deferring close"), this.once("open", e))
				}
				write(e) {
					this.writable = !1, (0, l.encodePayload)(e, (e => {
						this.doWrite(e, (() => {
							this.writable = !0, this.emit("drain")
						}))
					}))
				}
				uri() {
					let e = this.query || {};
					const t = this.opts.secure ? "https" : "http";
					let i = "";
					!1 !== this.opts.timestampRequests && (e[this.opts.timestampParam] = (0, o.default)()), this.supportsBinary || e.sid || (e.b64 = 1), this.opts.port && ("https" === t && 443 !== Number(this.opts.port) || "http" === t && 80 !== Number(this.opts.port)) && (i = ":" + this.opts.port);
					const r = a.default.encode(e);
					return t + "://" + (-1 !== this.opts.hostname.indexOf(":") ? "[" + this.opts.hostname + "]" : this.opts.hostname) + i + this.opts.path + (r.length ? "?" + r : "")
				}
			}
			i.Polling = p
		}, {
			"../transport.js": 41,
			debug: 9,
			"engine.io-parser": 52,
			parseqs: 26,
			yeast: 71
		}],
		45: [function(e, t, i) {
			"use strict";
			var r = this && this.__importDefault || function(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			};
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.defaultBinaryType = i.usingBrowserWebSocket = i.WebSocket = i.nextTick = void 0;
			const s = r(e("../globalThis.js"));
			i.nextTick = "function" == typeof Promise && "function" == typeof Promise.resolve ? e => Promise.resolve().then(e) : (e, t) => t(e, 0), i.WebSocket = s.default.WebSocket || s.default.MozWebSocket, i.usingBrowserWebSocket = !0, i.defaultBinaryType = "arraybuffer"
		}, {
			"../globalThis.js": 38
		}],
		46: [function(e, t, i) {
			(function(t) {
				(function() {
					"use strict";
					var r = this && this.__importDefault || function(e) {
						return e && e.__esModule ? e : {
							default: e
						}
					};
					Object.defineProperty(i, "__esModule", {
						value: !0
					}), i.WS = void 0;
					const s = e("../transport.js"),
						n = r(e("parseqs")),
						o = r(e("yeast")),
						a = e("../util.js"),
						l = e("./websocket-constructor.js"),
						u = r(e("debug")),
						p = e("engine.io-parser"),
						c = (0, u.default)("engine.io-client:websocket"),
						h = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase();
					class d extends s.Transport {
						constructor(e) {
							super(e), this.supportsBinary = !e.forceBase64
						}
						get name() {
							return "websocket"
						}
						doOpen() {
							if (!this.check()) return;
							const e = this.uri(),
								t = this.opts.protocols,
								i = h ? {} : (0, a.pick)(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
							this.opts.extraHeaders && (i.headers = this.opts.extraHeaders);
							try {
								this.ws = l.usingBrowserWebSocket && !h ? t ? new l.WebSocket(e, t) : new l.WebSocket(e) : new l.WebSocket(e, t, i)
							} catch (e) {
								return this.emit("error", e)
							}
							this.ws.binaryType = this.socket.binaryType || l.defaultBinaryType, this.addEventListeners()
						}
						addEventListeners() {
							this.ws.onopen = () => {
								this.opts.autoUnref && this.ws._socket.unref(), this.onOpen()
							}, this.ws.onclose = this.onClose.bind(this), this.ws.onmessage = e => this.onData(e.data), this.ws.onerror = e => this.onError("websocket error", e)
						}
						write(e) {
							this.writable = !1;
							for (let i = 0; i < e.length; i++) {
								const r = e[i],
									s = i === e.length - 1;
								(0, p.encodePacket)(r, this.supportsBinary, (e => {
									const i = {};
									if (!l.usingBrowserWebSocket && (r.options && (i.compress = r.options.compress), this.opts.perMessageDeflate)) {
										("string" == typeof e ? t.byteLength(e) : e.length) < this.opts.perMessageDeflate.threshold && (i.compress = !1)
									}
									try {
										l.usingBrowserWebSocket ? this.ws.send(e) : this.ws.send(e, i)
									} catch (e) {
										c("websocket closed before onclose event")
									}
									s && (0, l.nextTick)((() => {
										this.writable = !0, this.emit("drain")
									}), this.setTimeoutFn)
								}))
							}
						}
						doClose() {
							void 0 !== this.ws && (this.ws.close(), this.ws = null)
						}
						uri() {
							let e = this.query || {};
							const t = this.opts.secure ? "wss" : "ws";
							let i = "";
							this.opts.port && ("wss" === t && 443 !== Number(this.opts.port) || "ws" === t && 80 !== Number(this.opts.port)) && (i = ":" + this.opts.port), this.opts.timestampRequests && (e[this.opts.timestampParam] = (0, o.default)()), this.supportsBinary || (e.b64 = 1);
							const r = n.default.encode(e);
							return t + "://" + (-1 !== this.opts.hostname.indexOf(":") ? "[" + this.opts.hostname + "]" : this.opts.hostname) + i + this.opts.path + (r.length ? "?" + r : "")
						}
						check() {
							return !(!l.WebSocket || "__initialize" in l.WebSocket && this.name === d.prototype.name)
						}
					}
					i.WS = d
				}).call(this)
			}).call(this, e("buffer").Buffer)
		}, {
			"../transport.js": 41,
			"../util.js": 48,
			"./websocket-constructor.js": 45,
			buffer: 5,
			debug: 9,
			"engine.io-parser": 52,
			parseqs: 26,
			yeast: 71
		}],
		47: [function(e, t, i) {
			"use strict";
			var r = this && this.__importDefault || function(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			};
			Object.defineProperty(i, "__esModule", {
				value: !0
			});
			const s = r(e("has-cors")),
				n = r(e("../globalThis.js"));
			i.default = function(e) {
				const t = e.xdomain;
				try {
					if ("undefined" != typeof XMLHttpRequest && (!t || s.default)) return new XMLHttpRequest
				} catch (e) {}
				if (!t) try {
					return new(n.default[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
				} catch (e) {}
			}
		}, {
			"../globalThis.js": 38,
			"has-cors": 13
		}],
		48: [function(e, t, i) {
			"use strict";
			var r = this && this.__importDefault || function(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			};
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.installTimerFunctions = i.pick = void 0;
			const s = r(e("./globalThis.js"));
			i.pick = function(e, ...t) {
				return t.reduce(((t, i) => (e.hasOwnProperty(i) && (t[i] = e[i]), t)), {})
			};
			const n = setTimeout,
				o = clearTimeout;
			i.installTimerFunctions = function(e, t) {
				t.useNativeTimers ? (e.setTimeoutFn = n.bind(s.default), e.clearTimeoutFn = o.bind(s.default)) : (e.setTimeoutFn = setTimeout.bind(s.default), e.clearTimeoutFn = clearTimeout.bind(s.default))
			}
		}, {
			"./globalThis.js": 38
		}],
		49: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.ERROR_PACKET = i.PACKET_TYPES_REVERSE = i.PACKET_TYPES = void 0;
			const r = Object.create(null);
			i.PACKET_TYPES = r, r.open = "0", r.close = "1", r.ping = "2", r.pong = "3", r.message = "4", r.upgrade = "5", r.noop = "6";
			const s = Object.create(null);
			i.PACKET_TYPES_REVERSE = s, Object.keys(r).forEach((e => {
				s[r[e]] = e
			}));
			i.ERROR_PACKET = {
				type: "error",
				data: "parser error"
			}
		}, {}],
		50: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			});
			const r = e("./commons.js"),
				s = e("base64-arraybuffer"),
				n = "function" == typeof ArrayBuffer,
				o = (e, t) => {
					if (n) {
						const i = (0, s.decode)(e);
						return a(i, t)
					}
					return {
						base64: !0,
						data: e
					}
				},
				a = (e, t) => "blob" === t && e instanceof ArrayBuffer ? new Blob([e]) : e;
			i.default = (e, t) => {
				if ("string" != typeof e) return {
					type: "message",
					data: a(e, t)
				};
				const i = e.charAt(0);
				if ("b" === i) return {
					type: "message",
					data: o(e.substring(1), t)
				};
				return r.PACKET_TYPES_REVERSE[i] ? e.length > 1 ? {
					type: r.PACKET_TYPES_REVERSE[i],
					data: e.substring(1)
				} : {
					type: r.PACKET_TYPES_REVERSE[i]
				} : r.ERROR_PACKET
			}
		}, {
			"./commons.js": 49,
			"base64-arraybuffer": 37
		}],
		51: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			});
			const r = e("./commons.js"),
				s = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === Object.prototype.toString.call(Blob),
				n = "function" == typeof ArrayBuffer,
				o = (e, t) => {
					const i = new FileReader;
					return i.onload = function() {
						const e = i.result.split(",")[1];
						t("b" + e)
					}, i.readAsDataURL(e)
				};
			i.default = ({
				type: e,
				data: t
			}, i, a) => {
				return s && t instanceof Blob ? i ? a(t) : o(t, a) : n && (t instanceof ArrayBuffer || (l = t, "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(l) : l && l.buffer instanceof ArrayBuffer)) ? i ? a(t) : o(new Blob([t]), a) : a(r.PACKET_TYPES[e] + (t || ""));
				var l
			}
		}, {
			"./commons.js": 49
		}],
		52: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.decodePayload = i.decodePacket = i.encodePayload = i.encodePacket = i.protocol = void 0;
			const r = e("./encodePacket.js");
			i.encodePacket = r.default;
			const s = e("./decodePacket.js");
			i.decodePacket = s.default;
			const n = String.fromCharCode(30);
			i.encodePayload = (e, t) => {
				const i = e.length,
					s = new Array(i);
				let o = 0;
				e.forEach(((e, a) => {
					(0, r.default)(e, !1, (e => {
						s[a] = e, ++o === i && t(s.join(n))
					}))
				}))
			};
			i.decodePayload = (e, t) => {
				const i = e.split(n),
					r = [];
				for (let e = 0; e < i.length; e++) {
					const n = (0, s.default)(i[e], t);
					if (r.push(n), "error" === n.type) break
				}
				return r
			}, i.protocol = 4
		}, {
			"./decodePacket.js": 50,
			"./encodePacket.js": 51
		}],
		53: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.reconstructPacket = i.deconstructPacket = void 0;
			const r = e("./is-binary.js");

			function s(e, t) {
				if (!e) return e;
				if (r.isBinary(e)) {
					const i = {
						_placeholder: !0,
						num: t.length
					};
					return t.push(e), i
				}
				if (Array.isArray(e)) {
					const i = new Array(e.length);
					for (let r = 0; r < e.length; r++) i[r] = s(e[r], t);
					return i
				}
				if ("object" == typeof e && !(e instanceof Date)) {
					const i = {};
					for (const r in e) e.hasOwnProperty(r) && (i[r] = s(e[r], t));
					return i
				}
				return e
			}

			function n(e, t) {
				if (!e) return e;
				if (e && e._placeholder) return t[e.num];
				if (Array.isArray(e))
					for (let i = 0; i < e.length; i++) e[i] = n(e[i], t);
				else if ("object" == typeof e)
					for (const i in e) e.hasOwnProperty(i) && (e[i] = n(e[i], t));
				return e
			}
			i.deconstructPacket = function(e) {
				const t = [],
					i = e.data,
					r = e;
				return r.data = s(i, t), r.attachments = t.length, {
					packet: r,
					buffers: t
				}
			}, i.reconstructPacket = function(e, t) {
				return e.data = n(e.data, t), e.attachments = void 0, e
			}
		}, {
			"./is-binary.js": 55
		}],
		54: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.Decoder = i.Encoder = i.PacketType = i.protocol = void 0;
			const r = e("@socket.io/component-emitter"),
				s = e("./binary.js"),
				n = e("./is-binary.js"),
				o = e("debug").default("socket.io-parser");
			var a;
			i.protocol = 5,
				function(e) {
					e[e.CONNECT = 0] = "CONNECT", e[e.DISCONNECT = 1] = "DISCONNECT", e[e.EVENT = 2] = "EVENT", e[e.ACK = 3] = "ACK", e[e.CONNECT_ERROR = 4] = "CONNECT_ERROR", e[e.BINARY_EVENT = 5] = "BINARY_EVENT", e[e.BINARY_ACK = 6] = "BINARY_ACK"
				}(a = i.PacketType || (i.PacketType = {}));
			i.Encoder = class {
				encode(e) {
					return o("encoding packet %j", e), e.type !== a.EVENT && e.type !== a.ACK || !n.hasBinary(e) ? [this.encodeAsString(e)] : (e.type = e.type === a.EVENT ? a.BINARY_EVENT : a.BINARY_ACK, this.encodeAsBinary(e))
				}
				encodeAsString(e) {
					let t = "" + e.type;
					return e.type !== a.BINARY_EVENT && e.type !== a.BINARY_ACK || (t += e.attachments + "-"), e.nsp && "/" !== e.nsp && (t += e.nsp + ","), null != e.id && (t += e.id), null != e.data && (t += JSON.stringify(e.data)), o("encoded %j as %s", e, t), t
				}
				encodeAsBinary(e) {
					const t = s.deconstructPacket(e),
						i = this.encodeAsString(t.packet),
						r = t.buffers;
					return r.unshift(i), r
				}
			};
			class l extends r.Emitter {
				constructor() {
					super()
				}
				add(e) {
					let t;
					if ("string" == typeof e) t = this.decodeString(e), t.type === a.BINARY_EVENT || t.type === a.BINARY_ACK ? (this.reconstructor = new u(t), 0 === t.attachments && super.emitReserved("decoded", t)) : super.emitReserved("decoded", t);
					else {
						if (!n.isBinary(e) && !e.base64) throw new Error("Unknown type: " + e);
						if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
						t = this.reconstructor.takeBinaryData(e), t && (this.reconstructor = null, super.emitReserved("decoded", t))
					}
				}
				decodeString(e) {
					let t = 0;
					const i = {
						type: Number(e.charAt(0))
					};
					if (void 0 === a[i.type]) throw new Error("unknown packet type " + i.type);
					if (i.type === a.BINARY_EVENT || i.type === a.BINARY_ACK) {
						const r = t + 1;
						for (;
							"-" !== e.charAt(++t) && t != e.length;);
						const s = e.substring(r, t);
						if (s != Number(s) || "-" !== e.charAt(t)) throw new Error("Illegal attachments");
						i.attachments = Number(s)
					}
					if ("/" === e.charAt(t + 1)) {
						const r = t + 1;
						for (; ++t;) {
							if ("," === e.charAt(t)) break;
							if (t === e.length) break
						}
						i.nsp = e.substring(r, t)
					} else i.nsp = "/";
					const r = e.charAt(t + 1);
					if ("" !== r && Number(r) == r) {
						const r = t + 1;
						for (; ++t;) {
							const i = e.charAt(t);
							if (null == i || Number(i) != i) {
								--t;
								break
							}
							if (t === e.length) break
						}
						i.id = Number(e.substring(r, t + 1))
					}
					if (e.charAt(++t)) {
						const r = function(e) {
							try {
								return JSON.parse(e)
							} catch (e) {
								return !1
							}
						}(e.substr(t));
						if (!l.isPayloadValid(i.type, r)) throw new Error("invalid payload");
						i.data = r
					}
					return o("decoded %s as %j", e, i), i
				}
				static isPayloadValid(e, t) {
					switch (e) {
						case a.CONNECT:
							return "object" == typeof t;
						case a.DISCONNECT:
							return void 0 === t;
						case a.CONNECT_ERROR:
							return "string" == typeof t || "object" == typeof t;
						case a.EVENT:
						case a.BINARY_EVENT:
							return Array.isArray(t) && t.length > 0;
						case a.ACK:
						case a.BINARY_ACK:
							return Array.isArray(t)
					}
				}
				destroy() {
					this.reconstructor && this.reconstructor.finishedReconstruction()
				}
			}
			i.Decoder = l;
			class u {
				constructor(e) {
					this.packet = e, this.buffers = [], this.reconPack = e
				}
				takeBinaryData(e) {
					if (this.buffers.push(e), this.buffers.length === this.reconPack.attachments) {
						const e = s.reconstructPacket(this.reconPack, this.buffers);
						return this.finishedReconstruction(), e
					}
					return null
				}
				finishedReconstruction() {
					this.reconPack = null, this.buffers = []
				}
			}
		}, {
			"./binary.js": 53,
			"./is-binary.js": 55,
			"@socket.io/component-emitter": 1,
			debug: 9
		}],
		55: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.hasBinary = i.isBinary = void 0;
			const r = "function" == typeof ArrayBuffer,
				s = Object.prototype.toString,
				n = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === s.call(Blob),
				o = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === s.call(File);

			function a(e) {
				return r && (e instanceof ArrayBuffer || (e => "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer)(e)) || n && e instanceof Blob || o && e instanceof File
			}
			i.isBinary = a, i.hasBinary = function e(t, i) {
				if (!t || "object" != typeof t) return !1;
				if (Array.isArray(t)) {
					for (let i = 0, r = t.length; i < r; i++)
						if (e(t[i])) return !0;
					return !1
				}
				if (a(t)) return !0;
				if (t.toJSON && "function" == typeof t.toJSON && 1 === arguments.length) return e(t.toJSON(), !0);
				for (const i in t)
					if (Object.prototype.hasOwnProperty.call(t, i) && e(t[i])) return !0;
				return !1
			}
		}, {}],
		56: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = void 0;
			var r = a(e("./isReactNative")),
				s = a(e("./uriToBlob")),
				n = a(e("./isCordova")),
				o = a(e("./readAsByteArray"));

			function a(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}

			function l(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}

			function u(e, t) {
				for (var i = 0; i < t.length; i++) {
					var r = t[i];
					r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
				}
			}

			function p(e, t, i) {
				return t && u(e.prototype, t), i && u(e, i), e
			}
			var c = function() {
					function e(t) {
						l(this, e), this._file = t, this.size = t.size
					}
					return p(e, [{
						key: "slice",
						value: function(e, t) {
							if ((0, n.default)()) return (0, o.default)(this._file.slice(e, t));
							var i = this._file.slice(e, t);
							return Promise.resolve({
								value: i
							})
						}
					}, {
						key: "close",
						value: function() {}
					}]), e
				}(),
				h = function() {
					function e(t, i) {
						l(this, e), this._chunkSize = i, this._buffer = void 0, this._bufferOffset = 0, this._reader = t, this._done = !1
					}
					return p(e, [{
						key: "slice",
						value: function(e, t) {
							return e < this._bufferOffset ? Promise.reject(new Error("Requested data is before the reader's current offset")) : this._readUntilEnoughDataOrDone(e, t)
						}
					}, {
						key: "_readUntilEnoughDataOrDone",
						value: function(e, t) {
							var i = this,
								r = t <= this._bufferOffset + d(this._buffer);
							if (this._done || r) {
								var s = this._getDataFromBuffer(e, t),
									n = null == s && this._done;
								return Promise.resolve({
									value: s,
									done: n
								})
							}
							return this._reader.read().then((function(r) {
								var s = r.value;
								return r.done ? i._done = !0 : void 0 === i._buffer ? i._buffer = s : i._buffer = function(e, t) {
									if (e.concat) return e.concat(t);
									if (e instanceof Blob) return new Blob([e, t], {
										type: e.type
									});
									if (e.set) {
										var i = new e.constructor(e.length + t.length);
										return i.set(e), i.set(t, e.length), i
									}
									throw new Error("Unknown data type")
								}(i._buffer, s), i._readUntilEnoughDataOrDone(e, t)
							}))
						}
					}, {
						key: "_getDataFromBuffer",
						value: function(e, t) {
							e > this._bufferOffset && (this._buffer = this._buffer.slice(e - this._bufferOffset), this._bufferOffset = e);
							var i = 0 === d(this._buffer);
							return this._done && i ? null : this._buffer.slice(0, t - e)
						}
					}, {
						key: "close",
						value: function() {
							this._reader.cancel && this._reader.cancel()
						}
					}]), e
				}();

			function d(e) {
				return void 0 === e ? 0 : void 0 !== e.size ? e.size : e.length
			}
			var f = function() {
				function e() {
					l(this, e)
				}
				return p(e, [{
					key: "openFile",
					value: function(e, t) {
						return (0, r.default)() && e && void 0 !== e.uri ? (0, s.default)(e.uri).then((function(e) {
							return new c(e)
						})).catch((function(e) {
							throw new Error("tus: cannot fetch `file.uri` as Blob, make sure the uri is correct and accessible. ".concat(e))
						})) : "function" == typeof e.slice && void 0 !== e.size ? Promise.resolve(new c(e)) : "function" == typeof e.read ? (t = +t, isFinite(t) ? Promise.resolve(new h(e, t)) : Promise.reject(new Error("cannot create source for stream without a finite value for the `chunkSize` option"))) : Promise.reject(new Error("source object may only be an instance of File, Blob, or Reader in this environment"))
					}
				}]), e
			}();
			i.default = f
		}, {
			"./isCordova": 60,
			"./isReactNative": 61,
			"./readAsByteArray": 62,
			"./uriToBlob": 63
		}],
		57: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = function(e, t) {
				if ((0, s.default)()) return Promise.resolve(function(e, t) {
					var i = e.exif ? function(e) {
						var t = 0;
						if (0 === e.length) return t;
						for (var i = 0; i < e.length; i++) {
							t = (t << 5) - t + e.charCodeAt(i), t &= t
						}
						return t
					}(JSON.stringify(e.exif)) : "noexif";
					return ["tus-rn", e.name || "noname", e.size || "nosize", i, t.endpoint].join("/")
				}(e, t));
				return Promise.resolve(["tus-br", e.name, e.type, e.size, e.lastModified, t.endpoint].join("-"))
			};
			var r, s = (r = e("./isReactNative")) && r.__esModule ? r : {
				default: r
			}
		}, {
			"./isReactNative": 61
		}],
		58: [function(e, t, i) {
			"use strict";

			function r(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}

			function s(e, t) {
				for (var i = 0; i < t.length; i++) {
					var r = t[i];
					r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
				}
			}

			function n(e, t, i) {
				return t && s(e.prototype, t), i && s(e, i), e
			}
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = void 0;
			var o = function() {
				function e() {
					r(this, e)
				}
				return n(e, [{
					key: "createRequest",
					value: function(e, t) {
						return new a(e, t)
					}
				}, {
					key: "getName",
					value: function() {
						return "XHRHttpStack"
					}
				}]), e
			}();
			i.default = o;
			var a = function() {
					function e(t, i) {
						r(this, e), this._xhr = new XMLHttpRequest, this._xhr.open(t, i, !0), this._method = t, this._url = i, this._headers = {}
					}
					return n(e, [{
						key: "getMethod",
						value: function() {
							return this._method
						}
					}, {
						key: "getURL",
						value: function() {
							return this._url
						}
					}, {
						key: "setHeader",
						value: function(e, t) {
							this._xhr.setRequestHeader(e, t), this._headers[e] = t
						}
					}, {
						key: "getHeader",
						value: function(e) {
							return this._headers[e]
						}
					}, {
						key: "setProgressHandler",
						value: function(e) {
							"upload" in this._xhr && (this._xhr.upload.onprogress = function(t) {
								t.lengthComputable && e(t.loaded)
							})
						}
					}, {
						key: "send",
						value: function() {
							var e = this,
								t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
							return new Promise((function(i, r) {
								e._xhr.onload = function() {
									i(new l(e._xhr))
								}, e._xhr.onerror = function(e) {
									r(e)
								}, e._xhr.send(t)
							}))
						}
					}, {
						key: "abort",
						value: function() {
							return this._xhr.abort(), Promise.resolve()
						}
					}, {
						key: "getUnderlyingObject",
						value: function() {
							return this._xhr
						}
					}]), e
				}(),
				l = function() {
					function e(t) {
						r(this, e), this._xhr = t
					}
					return n(e, [{
						key: "getStatus",
						value: function() {
							return this._xhr.status
						}
					}, {
						key: "getHeader",
						value: function(e) {
							return this._xhr.getResponseHeader(e)
						}
					}, {
						key: "getBody",
						value: function() {
							return this._xhr.responseText
						}
					}, {
						key: "getUnderlyingObject",
						value: function() {
							return this._xhr
						}
					}]), e
				}()
		}, {}],
		59: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), Object.defineProperty(i, "enableDebugLog", {
				enumerable: !0,
				get: function() {
					return n.enableDebugLog
				}
			}), Object.defineProperty(i, "canStoreURLs", {
				enumerable: !0,
				get: function() {
					return o.canStoreURLs
				}
			}), Object.defineProperty(i, "HttpStack", {
				enumerable: !0,
				get: function() {
					return a.default
				}
			}), i.isSupported = i.defaultOptions = i.Upload = void 0;
			var r = p(e("../upload")),
				s = p(e("../noopUrlStorage")),
				n = e("../logger"),
				o = e("./urlStorage"),
				a = p(e("./httpStack")),
				l = p(e("./fileReader")),
				u = p(e("./fingerprint"));

			function p(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}

			function c(e) {
				return c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
					return typeof e
				} : function(e) {
					return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
				}, c(e)
			}

			function h(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}

			function d(e, t) {
				for (var i = 0; i < t.length; i++) {
					var r = t[i];
					r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
				}
			}

			function f(e, t) {
				return f = Object.setPrototypeOf || function(e, t) {
					return e.__proto__ = t, e
				}, f(e, t)
			}

			function m(e, t) {
				return !t || "object" !== c(t) && "function" != typeof t ? function(e) {
					if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
					return e
				}(e) : t
			}

			function g() {
				if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
				if (Reflect.construct.sham) return !1;
				if ("function" == typeof Proxy) return !0;
				try {
					return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0
				} catch (e) {
					return !1
				}
			}

			function y(e) {
				return y = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
					return e.__proto__ || Object.getPrototypeOf(e)
				}, y(e)
			}

			function v(e, t) {
				var i = Object.keys(e);
				if (Object.getOwnPropertySymbols) {
					var r = Object.getOwnPropertySymbols(e);
					t && (r = r.filter((function(t) {
						return Object.getOwnPropertyDescriptor(e, t).enumerable
					}))), i.push.apply(i, r)
				}
				return i
			}

			function b(e) {
				for (var t = 1; t < arguments.length; t++) {
					var i = null != arguments[t] ? arguments[t] : {};
					t % 2 ? v(Object(i), !0).forEach((function(t) {
						w(e, t, i[t])
					})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : v(Object(i)).forEach((function(t) {
						Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
					}))
				}
				return e
			}

			function w(e, t, i) {
				return t in e ? Object.defineProperty(e, t, {
					value: i,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : e[t] = i, e
			}
			var S = b({}, r.default.defaultOptions, {
				httpStack: new a.default,
				fileReader: new l.default,
				urlStorage: o.canStoreURLs ? new o.WebStorageUrlStorage : new s.default,
				fingerprint: u.default
			});
			i.defaultOptions = S;
			var P = function(e) {
				! function(e, t) {
					if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
					e.prototype = Object.create(t && t.prototype, {
						constructor: {
							value: e,
							writable: !0,
							configurable: !0
						}
					}), t && f(e, t)
				}(a, e);
				var t, i, s, n, o = (t = a, function() {
					var e, i = y(t);
					if (g()) {
						var r = y(this).constructor;
						e = Reflect.construct(i, arguments, r)
					} else e = i.apply(this, arguments);
					return m(this, e)
				});

				function a() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
						t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
					return h(this, a), t = b({}, S, {}, t), o.call(this, e, t)
				}
				return i = a, n = [{
					key: "terminate",
					value: function(e, t, i) {
						return t = b({}, S, {}, t), r.default.terminate(e, t, i)
					}
				}], (s = null) && d(i.prototype, s), n && d(i, n), a
			}(r.default);
			i.Upload = P;
			var k = window,
				C = k.XMLHttpRequest,
				E = k.Blob,
				x = C && E && "function" == typeof E.prototype.slice;
			i.isSupported = x
		}, {
			"../logger": 66,
			"../noopUrlStorage": 67,
			"../upload": 68,
			"./fileReader": 56,
			"./fingerprint": 57,
			"./httpStack": 58,
			"./urlStorage": 64
		}],
		60: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = void 0;
			var r = function() {
				return "undefined" != typeof window && (void 0 !== window.PhoneGap || void 0 !== window.Cordova || void 0 !== window.cordova)
			};
			i.default = r
		}, {}],
		61: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = void 0;
			var r = function() {
				return "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase()
			};
			i.default = r
		}, {}],
		62: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = function(e) {
				return new Promise((function(t, i) {
					var r = new FileReader;
					r.onload = function() {
						var e = new Uint8Array(r.result);
						t({
							value: e
						})
					}, r.onerror = function(e) {
						i(e)
					}, r.readAsArrayBuffer(e)
				}))
			}
		}, {}],
		63: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = function(e) {
				return new Promise((function(t, i) {
					var r = new XMLHttpRequest;
					r.responseType = "blob", r.onload = function() {
						var e = r.response;
						t(e)
					}, r.onerror = function(e) {
						i(e)
					}, r.open("GET", e), r.send()
				}))
			}
		}, {}],
		64: [function(e, t, i) {
			"use strict";

			function r(e, t) {
				for (var i = 0; i < t.length; i++) {
					var r = t[i];
					r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
				}
			}
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.WebStorageUrlStorage = i.canStoreURLs = void 0;
			var s = !1;
			try {
				s = "localStorage" in window;
				var n = "tusSupport";
				localStorage.setItem(n, localStorage.getItem(n))
			} catch (e) {
				if (e.code !== e.SECURITY_ERR && e.code !== e.QUOTA_EXCEEDED_ERR) throw e;
				s = !1
			}
			var o = s;
			i.canStoreURLs = o;
			var a = function() {
				function e() {
					! function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, e)
				}
				var t, i, s;
				return t = e, i = [{
					key: "findAllUploads",
					value: function() {
						var e = this._findEntries("tus::");
						return Promise.resolve(e)
					}
				}, {
					key: "findUploadsByFingerprint",
					value: function(e) {
						var t = this._findEntries("tus::".concat(e, "::"));
						return Promise.resolve(t)
					}
				}, {
					key: "removeUpload",
					value: function(e) {
						return localStorage.removeItem(e), Promise.resolve()
					}
				}, {
					key: "addUpload",
					value: function(e, t) {
						var i = Math.round(1e12 * Math.random()),
							r = "tus::".concat(e, "::").concat(i);
						return localStorage.setItem(r, JSON.stringify(t)), Promise.resolve(r)
					}
				}, {
					key: "_findEntries",
					value: function(e) {
						for (var t = [], i = 0; i < localStorage.length; i++) {
							var r = localStorage.key(i);
							if (0 === r.indexOf(e)) try {
								var s = JSON.parse(localStorage.getItem(r));
								s.urlStorageKey = r, t.push(s)
							} catch (e) {}
						}
						return t
					}
				}], i && r(t.prototype, i), s && r(t, s), e
			}();
			i.WebStorageUrlStorage = a
		}, {}],
		65: [function(e, t, i) {
			"use strict";

			function r(e) {
				return r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
					return typeof e
				} : function(e) {
					return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
				}, r(e)
			}

			function s(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}

			function n(e, t) {
				return !t || "object" !== r(t) && "function" != typeof t ? function(e) {
					if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
					return e
				}(e) : t
			}

			function o(e) {
				var t = "function" == typeof Map ? new Map : void 0;
				return o = function(e) {
					if (null === e || (i = e, -1 === Function.toString.call(i).indexOf("[native code]"))) return e;
					var i;
					if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
					if (void 0 !== t) {
						if (t.has(e)) return t.get(e);
						t.set(e, r)
					}

					function r() {
						return a(e, arguments, p(this).constructor)
					}
					return r.prototype = Object.create(e.prototype, {
						constructor: {
							value: r,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), u(r, e)
				}, o(e)
			}

			function a(e, t, i) {
				return a = l() ? Reflect.construct : function(e, t, i) {
					var r = [null];
					r.push.apply(r, t);
					var s = new(Function.bind.apply(e, r));
					return i && u(s, i.prototype), s
				}, a.apply(null, arguments)
			}

			function l() {
				if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
				if (Reflect.construct.sham) return !1;
				if ("function" == typeof Proxy) return !0;
				try {
					return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0
				} catch (e) {
					return !1
				}
			}

			function u(e, t) {
				return u = Object.setPrototypeOf || function(e, t) {
					return e.__proto__ = t, e
				}, u(e, t)
			}

			function p(e) {
				return p = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
					return e.__proto__ || Object.getPrototypeOf(e)
				}, p(e)
			}
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = void 0;
			var c = function(e) {
					! function(e, t) {
						if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
						e.prototype = Object.create(t && t.prototype, {
							constructor: {
								value: e,
								writable: !0,
								configurable: !0
							}
						}), t && u(e, t)
					}(r, e);
					var t, i = (t = r, function() {
						var e, i = p(t);
						if (l()) {
							var r = p(this).constructor;
							e = Reflect.construct(i, arguments, r)
						} else e = i.apply(this, arguments);
						return n(this, e)
					});

					function r(e) {
						var t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
							o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
							a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
						if (s(this, r), (t = i.call(this, e)).originalRequest = o, t.originalResponse = a, t.causingError = n, null != n && (e += ", caused by ".concat(n.toString())), null != o) {
							var l = o.getHeader("X-Request-ID") || "n/a",
								u = o.getMethod(),
								p = o.getURL(),
								c = a ? a.getStatus() : "n/a",
								h = a ? a.getBody() || "" : "n/a";
							e += ", originated from request (method: ".concat(u, ", url: ").concat(p, ", response code: ").concat(c, ", response text: ").concat(h, ", request id: ").concat(l, ")")
						}
						return t.message = e, t
					}
					return r
				}(o(Error)),
				h = c;
			i.default = h
		}, {}],
		66: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.enableDebugLog = function() {
				r = !0
			}, i.log = function(e) {
				if (!r) return;
				console.log(e)
			};
			var r = !1
		}, {}],
		67: [function(e, t, i) {
			"use strict";

			function r(e, t) {
				for (var i = 0; i < t.length; i++) {
					var r = t[i];
					r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
				}
			}
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = void 0;
			var s = function() {
				function e() {
					! function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, e)
				}
				var t, i, s;
				return t = e, (i = [{
					key: "listAllUploads",
					value: function() {
						return Promise.resolve([])
					}
				}, {
					key: "findUploadsByFingerprint",
					value: function(e) {
						return Promise.resolve([])
					}
				}, {
					key: "removeUpload",
					value: function(e) {
						return Promise.resolve()
					}
				}, {
					key: "addUpload",
					value: function(e, t) {
						return Promise.resolve(null)
					}
				}]) && r(t.prototype, i), s && r(t, s), e
			}();
			i.default = s
		}, {}],
		68: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = void 0;
			var r = e("js-base64"),
				s = l(e("url-parse")),
				n = l(e("./error")),
				o = e("./logger"),
				a = l(e("./uuid"));

			function l(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}

			function u(e, t) {
				var i = Object.keys(e);
				if (Object.getOwnPropertySymbols) {
					var r = Object.getOwnPropertySymbols(e);
					t && (r = r.filter((function(t) {
						return Object.getOwnPropertyDescriptor(e, t).enumerable
					}))), i.push.apply(i, r)
				}
				return i
			}

			function p(e) {
				for (var t = 1; t < arguments.length; t++) {
					var i = null != arguments[t] ? arguments[t] : {};
					t % 2 ? u(Object(i), !0).forEach((function(t) {
						c(e, t, i[t])
					})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : u(Object(i)).forEach((function(t) {
						Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
					}))
				}
				return e
			}

			function c(e, t, i) {
				return t in e ? Object.defineProperty(e, t, {
					value: i,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : e[t] = i, e
			}

			function h(e, t) {
				for (var i = 0; i < t.length; i++) {
					var r = t[i];
					r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
				}
			}
			var d = {
					endpoint: null,
					uploadUrl: null,
					metadata: {},
					fingerprint: null,
					uploadSize: null,
					onProgress: null,
					onChunkComplete: null,
					onSuccess: null,
					onError: null,
					_onUploadUrlAvailable: null,
					overridePatchMethod: !1,
					headers: {},
					addRequestId: !1,
					onBeforeRequest: null,
					onAfterResponse: null,
					onShouldRetry: null,
					chunkSize: 1 / 0,
					retryDelays: [0, 1e3, 3e3, 5e3],
					parallelUploads: 1,
					storeFingerprintForResuming: !0,
					removeFingerprintOnSuccess: !1,
					uploadLengthDeferred: !1,
					uploadDataDuringCreation: !1,
					urlStorage: null,
					fileReader: null,
					httpStack: null
				},
				f = function() {
					function e(t, i) {
						! function(e, t) {
							if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
						}(this, e), "resume" in i && console.log("tus: The `resume` option has been removed in tus-js-client v2. Please use the URL storage API instead."), this.options = i, this._urlStorage = this.options.urlStorage, this.file = t, this.url = null, this._req = null, this._fingerprint = null, this._urlStorageKey = null, this._offset = null, this._aborted = !1, this._size = null, this._source = null, this._retryAttempt = 0, this._retryTimeout = null, this._offsetBeforeRetry = 0, this._parallelUploads = null, this._parallelUploadUrls = null
					}
					var t, i, r;
					return t = e, i = [{
						key: "findPreviousUploads",
						value: function() {
							var e = this;
							return this.options.fingerprint(this.file, this.options).then((function(t) {
								return e._urlStorage.findUploadsByFingerprint(t)
							}))
						}
					}, {
						key: "resumeFromPreviousUpload",
						value: function(e) {
							this.url = e.uploadUrl || null, this._parallelUploadUrls = e.parallelUploadUrls || null, this._urlStorageKey = e.urlStorageKey
						}
					}, {
						key: "start",
						value: function() {
							var e = this,
								t = this.file;
							if (t)
								if (this.options.endpoint || this.options.uploadUrl) {
									var i = this.options.retryDelays;
									null == i || "[object Array]" === Object.prototype.toString.call(i) ? (this.options.parallelUploads > 1 && ["uploadUrl", "uploadSize", "uploadLengthDeferred"].forEach((function(t) {
										e.options[t] && e._emitError(new Error("tus: cannot use the ".concat(t, " option when parallelUploads is enabled")))
									})), this.options.fingerprint(t, this.options).then((function(i) {
										return null == i ? (0, o.log)("No fingerprint was calculated meaning that the upload cannot be stored in the URL storage.") : (0, o.log)("Calculated fingerprint: ".concat(i)), e._fingerprint = i, e._source ? e._source : e.options.fileReader.openFile(t, e.options.chunkSize)
									})).then((function(t) {
										e._source = t, e.options.parallelUploads > 1 || null != e._parallelUploadUrls ? e._startParallelUpload() : e._startSingleUpload()
									})).catch((function(t) {
										e._emitError(t)
									}))) : this._emitError(new Error("tus: the `retryDelays` option must either be an array or null"))
								} else this._emitError(new Error("tus: neither an endpoint or an upload URL is provided"));
							else this._emitError(new Error("tus: no file or stream to upload provided"))
						}
					}, {
						key: "_startParallelUpload",
						value: function() {
							var t = this,
								i = this._size = this._source.size,
								r = 0;
							this._parallelUploads = [];
							var s = null != this._parallelUploadUrls ? this._parallelUploadUrls.length : this.options.parallelUploads,
								n = function(e, t, i) {
									for (var r = Math.floor(e / t), s = [], n = 0; n < t; n++) s.push({
										start: r * n,
										end: r * (n + 1)
									});
									return s[t - 1].end = e, i && s.forEach((function(e, t) {
										e.uploadUrl = i[t] || null
									})), s
								}(this._source.size, s, this._parallelUploadUrls);
							this._parallelUploadUrls = new Array(n.length);
							var a, l = n.map((function(s, o) {
								var a = 0;
								return t._source.slice(s.start, s.end).then((function(l) {
									var u = l.value;
									return new Promise((function(l, c) {
										var h = p({}, t.options, {
												uploadUrl: s.uploadUrl || null,
												storeFingerprintForResuming: !1,
												removeFingerprintOnSuccess: !1,
												parallelUploads: 1,
												metadata: {},
												headers: p({}, t.options.headers, {
													"Upload-Concat": "partial"
												}),
												onSuccess: l,
												onError: c,
												onProgress: function(e) {
													r = r - a + e, a = e, t._emitProgress(r, i)
												},
												_onUploadUrlAvailable: function() {
													t._parallelUploadUrls[o] = d.url, t._parallelUploadUrls.filter((function(e) {
														return !!e
													})).length === n.length && t._saveUploadInUrlStorage()
												}
											}),
											d = new e(u, h);
										d.start(), t._parallelUploads.push(d)
									}))
								}))
							}));
							Promise.all(l).then((function() {
								(a = t._openRequest("POST", t.options.endpoint)).setHeader("Upload-Concat", "final;".concat(t._parallelUploadUrls.join(" ")));
								var e = m(t.options.metadata);
								return "" !== e && a.setHeader("Upload-Metadata", e), t._sendRequest(a, null)
							})).then((function(e) {
								if (g(e.getStatus(), 200)) {
									var i = e.getHeader("Location");
									null != i ? (t.url = w(t.options.endpoint, i), (0, o.log)("Created upload at ".concat(t.url)), t._emitSuccess()) : t._emitHttpError(a, e, "tus: invalid or missing Location header")
								} else t._emitHttpError(a, e, "tus: unexpected response while creating upload")
							})).catch((function(e) {
								t._emitError(e)
							}))
						}
					}, {
						key: "_startSingleUpload",
						value: function() {
							if (this.options.uploadLengthDeferred) this._size = null;
							else if (null != this.options.uploadSize) {
								if (this._size = +this.options.uploadSize, isNaN(this._size)) return void this._emitError(new Error("tus: cannot convert `uploadSize` option into a number"))
							} else if (this._size = this._source.size, null == this._size) return void this._emitError(new Error("tus: cannot automatically derive upload's size from input and must be specified manually using the `uploadSize` option"));
							return this._aborted = !1, null != this.url ? ((0, o.log)("Resuming upload from previous URL: ".concat(this.url)), void this._resumeUpload()) : null != this.options.uploadUrl ? ((0, o.log)("Resuming upload from provided URL: ".concat(this.options.url)), this.url = this.options.uploadUrl, void this._resumeUpload()) : ((0, o.log)("Creating a new upload"), void this._createUpload())
						}
					}, {
						key: "abort",
						value: function(t) {
							var i = this;
							if (arguments.length > 1 && "function" == typeof arguments[1]) throw new Error("tus: the abort function does not accept a callback since v2 anymore; please use the returned Promise instead");
							return null != this._parallelUploads && this._parallelUploads.forEach((function(e) {
								e.abort(t)
							})), null !== this._req && (this._req.abort(), this._source.close()), this._aborted = !0, null != this._retryTimeout && (clearTimeout(this._retryTimeout), this._retryTimeout = null), t && null != this.url ? e.terminate(this.url, this.options).then((function() {
								return i._removeFromUrlStorage()
							})) : Promise.resolve()
						}
					}, {
						key: "_emitHttpError",
						value: function(e, t, i, r) {
							this._emitError(new n.default(i, r, e, t))
						}
					}, {
						key: "_emitError",
						value: function(e) {
							var t = this;
							if (!this._aborted) {
								if (null != this.options.retryDelays && (null != this._offset && this._offset > this._offsetBeforeRetry && (this._retryAttempt = 0), b(e, this._retryAttempt, this.options))) {
									var i = this.options.retryDelays[this._retryAttempt++];
									return this._offsetBeforeRetry = this._offset, void(this._retryTimeout = setTimeout((function() {
										t.start()
									}), i))
								}
								if ("function" != typeof this.options.onError) throw e;
								this.options.onError(e)
							}
						}
					}, {
						key: "_emitSuccess",
						value: function() {
							this.options.removeFingerprintOnSuccess && this._removeFromUrlStorage(), "function" == typeof this.options.onSuccess && this.options.onSuccess()
						}
					}, {
						key: "_emitProgress",
						value: function(e, t) {
							"function" == typeof this.options.onProgress && this.options.onProgress(e, t)
						}
					}, {
						key: "_emitChunkComplete",
						value: function(e, t, i) {
							"function" == typeof this.options.onChunkComplete && this.options.onChunkComplete(e, t, i)
						}
					}, {
						key: "_createUpload",
						value: function() {
							var e = this;
							if (this.options.endpoint) {
								var t = this._openRequest("POST", this.options.endpoint);
								this.options.uploadLengthDeferred ? t.setHeader("Upload-Defer-Length", 1) : t.setHeader("Upload-Length", this._size);
								var i, r = m(this.options.metadata);
								"" !== r && t.setHeader("Upload-Metadata", r), this.options.uploadDataDuringCreation && !this.options.uploadLengthDeferred ? (this._offset = 0, i = this._addChunkToRequest(t)) : i = this._sendRequest(t, null), i.then((function(i) {
									if (g(i.getStatus(), 200)) {
										var r = i.getHeader("Location");
										if (null != r) {
											if (e.url = w(e.options.endpoint, r), (0, o.log)("Created upload at ".concat(e.url)), "function" == typeof e.options._onUploadUrlAvailable && e.options._onUploadUrlAvailable(), 0 === e._size) return e._emitSuccess(), void e._source.close();
											e._saveUploadInUrlStorage(), e.options.uploadDataDuringCreation ? e._handleUploadResponse(t, i) : (e._offset = 0, e._performUpload())
										} else e._emitHttpError(t, i, "tus: invalid or missing Location header")
									} else e._emitHttpError(t, i, "tus: unexpected response while creating upload")
								})).catch((function(i) {
									e._emitHttpError(t, null, "tus: failed to create upload", i)
								}))
							} else this._emitError(new Error("tus: unable to create upload because no endpoint is provided"))
						}
					}, {
						key: "_resumeUpload",
						value: function() {
							var e = this,
								t = this._openRequest("HEAD", this.url);
							this._sendRequest(t, null).then((function(i) {
								var r = i.getStatus();
								if (!g(r, 200)) return g(r, 400) && e._removeFromUrlStorage(), 423 === r ? void e._emitHttpError(t, i, "tus: upload is currently locked; retry later") : e.options.endpoint ? (e.url = null, void e._createUpload()) : void e._emitHttpError(t, i, "tus: unable to resume upload (new upload cannot be created without an endpoint)");
								var s = parseInt(i.getHeader("Upload-Offset"), 10);
								if (isNaN(s)) e._emitHttpError(t, i, "tus: invalid or missing offset value");
								else {
									var n = parseInt(i.getHeader("Upload-Length"), 10);
									if (!isNaN(n) || e.options.uploadLengthDeferred) {
										if ("function" == typeof e.options._onUploadUrlAvailable && e.options._onUploadUrlAvailable(), s === n) return e._emitProgress(n, n), void e._emitSuccess();
										e._offset = s, e._performUpload()
									} else e._emitHttpError(t, i, "tus: invalid or missing length value")
								}
							})).catch((function(i) {
								e._emitHttpError(t, null, "tus: failed to resume upload", i)
							}))
						}
					}, {
						key: "_performUpload",
						value: function() {
							var e, t = this;
							this._aborted || (this.options.overridePatchMethod ? (e = this._openRequest("POST", this.url)).setHeader("X-HTTP-Method-Override", "PATCH") : e = this._openRequest("PATCH", this.url), e.setHeader("Upload-Offset", this._offset), this._addChunkToRequest(e).then((function(i) {
								g(i.getStatus(), 200) ? t._handleUploadResponse(e, i) : t._emitHttpError(e, i, "tus: unexpected response while uploading chunk")
							})).catch((function(i) {
								t._aborted || t._emitHttpError(e, null, "tus: failed to upload chunk at offset ".concat(t._offset), i)
							})))
						}
					}, {
						key: "_addChunkToRequest",
						value: function(e) {
							var t = this,
								i = this._offset,
								r = this._offset + this.options.chunkSize;
							return e.setProgressHandler((function(e) {
								t._emitProgress(i + e, t._size)
							})), e.setHeader("Content-Type", "application/offset+octet-stream"), (r === 1 / 0 || r > this._size) && !this.options.uploadLengthDeferred && (r = this._size), this._source.slice(i, r).then((function(i) {
								var r = i.value,
									s = i.done;
								return t.options.uploadLengthDeferred && s && (t._size = t._offset + (r && r.size ? r.size : 0), e.setHeader("Upload-Length", t._size)), null === r ? t._sendRequest(e) : (t._emitProgress(t._offset, t._size), t._sendRequest(e, r))
							}))
						}
					}, {
						key: "_handleUploadResponse",
						value: function(e, t) {
							var i = parseInt(t.getHeader("Upload-Offset"), 10);
							if (isNaN(i)) this._emitHttpError(e, t, "tus: invalid or missing offset value");
							else {
								if (this._emitProgress(i, this._size), this._emitChunkComplete(i - this._offset, i, this._size), this._offset = i, i == this._size) return this._emitSuccess(), void this._source.close();
								this._performUpload()
							}
						}
					}, {
						key: "_openRequest",
						value: function(e, t) {
							var i = y(e, t, this.options);
							return this._req = i, i
						}
					}, {
						key: "_removeFromUrlStorage",
						value: function() {
							var e = this;
							this._urlStorageKey && (this._urlStorage.removeUpload(this._urlStorageKey).catch((function(t) {
								e._emitError(t)
							})), this._urlStorageKey = null)
						}
					}, {
						key: "_saveUploadInUrlStorage",
						value: function() {
							var e = this;
							if (this.options.storeFingerprintForResuming && this._fingerprint) {
								var t = {
									size: this._size,
									metadata: this.options.metadata,
									creationTime: (new Date).toString()
								};
								this._parallelUploads ? t.parallelUploadUrls = this._parallelUploadUrls : t.uploadUrl = this.url, this._urlStorage.addUpload(this._fingerprint, t).then((function(t) {
									return e._urlStorageKey = t
								})).catch((function(t) {
									e._emitError(t)
								}))
							}
						}
					}, {
						key: "_sendRequest",
						value: function(e) {
							var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
							return v(e, t, this.options)
						}
					}], r = [{
						key: "terminate",
						value: function(t, i) {
							if (arguments.length > 1 && "function" == typeof arguments[arguments.length - 1]) throw new Error("tus: the terminate function does not accept a callback since v2 anymore; please use the returned Promise instead");
							void 0 === i && (i = {});
							var r = y("DELETE", t, i);
							return v(r, null, i).then((function(e) {
								if (204 !== e.getStatus()) throw new n.default("tus: unexpected response while terminating upload", null, r, e)
							})).catch((function(s) {
								if (s instanceof n.default || (s = new n.default("tus: failed to terminate upload", s, r, null)), !b(s, 0, i)) throw s;
								var o = i.retryDelays[0],
									a = i.retryDelays.slice(1),
									l = p({}, i, {
										retryDelays: a
									});
								return new Promise((function(e) {
									return setTimeout(e, o)
								})).then((function() {
									return e.terminate(t, l)
								}))
							}))
						}
					}], i && h(t.prototype, i), r && h(t, r), e
				}();

			function m(e) {
				var t = [];
				for (var i in e) t.push("".concat(i, " ").concat(r.Base64.encode(e[i])));
				return t.join(",")
			}

			function g(e, t) {
				return e >= t && e < t + 100
			}

			function y(e, t, i) {
				var r = i.httpStack.createRequest(e, t);
				r.setHeader("Tus-Resumable", "1.0.0");
				var s = i.headers || {};
				for (var n in s) r.setHeader(n, s[n]);
				if (i.addRequestId) {
					var o = (0, a.default)();
					r.setHeader("X-Request-ID", o)
				}
				return r
			}

			function v(e, t, i) {
				return ("function" == typeof i.onBeforeRequest ? Promise.resolve(i.onBeforeRequest(e)) : Promise.resolve()).then((function() {
					return e.send(t).then((function(t) {
						return ("function" == typeof i.onAfterResponse ? Promise.resolve(i.onAfterResponse(e, t)) : Promise.resolve()).then((function() {
							return t
						}))
					}))
				}))
			}

			function b(e, t, i) {
				if (null == i.retryDelays || t >= i.retryDelays.length || null == e.originalRequest) return !1;
				if (i && "function" == typeof i.onShouldRetry) return i.onShouldRetry(e, t, i);
				var r, s = e.originalResponse ? e.originalResponse.getStatus() : 0;
				return (!g(s, 400) || 409 === s || 423 === s) && (r = !0, "undefined" != typeof window && "navigator" in window && !1 === window.navigator.onLine && (r = !1), r)
			}

			function w(e, t) {
				return new s.default(t, e).toString()
			}
			f.defaultOptions = d;
			var S = f;
			i.default = S
		}, {
			"./error": 65,
			"./logger": 66,
			"./uuid": 69,
			"js-base64": 16,
			"url-parse": 70
		}],
		69: [function(e, t, i) {
			"use strict";
			Object.defineProperty(i, "__esModule", {
				value: !0
			}), i.default = function() {
				return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
					var t = 16 * Math.random() | 0;
					return ("x" == e ? t : 3 & t | 8).toString(16)
				}))
			}
		}, {}],
		70: [function(e, t, i) {
			(function(i) {
				(function() {
					"use strict";
					var r = e("requires-port"),
						s = e("querystringify"),
						n = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//,
						o = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,
						a = /^[a-zA-Z]:/,
						l = new RegExp("^[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]+");

					function u(e) {
						return (e || "").toString().replace(l, "")
					}
					var p = [
							["#", "hash"],
							["?", "query"],
							function(e, t) {
								return d(t.protocol) ? e.replace(/\\/g, "/") : e
							},
							["/", "pathname"],
							["@", "auth", 1],
							[NaN, "host", void 0, 1, 1],
							[/:(\d+)$/, "port", void 0, 1],
							[NaN, "hostname", void 0, 1, 1]
						],
						c = {
							hash: 1,
							query: 1
						};

					function h(e) {
						var t, r = ("undefined" != typeof window ? window : void 0 !== i ? i : "undefined" != typeof self ? self : {}).location || {},
							s = {},
							o = typeof(e = e || r);
						if ("blob:" === e.protocol) s = new m(unescape(e.pathname), {});
						else if ("string" === o)
							for (t in s = new m(e, {}), c) delete s[t];
						else if ("object" === o) {
							for (t in e) t in c || (s[t] = e[t]);
							void 0 === s.slashes && (s.slashes = n.test(e.href))
						}
						return s
					}

					function d(e) {
						return "file:" === e || "ftp:" === e || "http:" === e || "https:" === e || "ws:" === e || "wss:" === e
					}

					function f(e, t) {
						e = u(e), t = t || {};
						var i, r = o.exec(e),
							s = r[1] ? r[1].toLowerCase() : "",
							n = !!r[2],
							a = !!r[3],
							l = 0;
						return n ? a ? (i = r[2] + r[3] + r[4], l = r[2].length + r[3].length) : (i = r[2] + r[4], l = r[2].length) : a ? (i = r[3] + r[4], l = r[3].length) : i = r[4], "file:" === s ? l >= 2 && (i = i.slice(2)) : d(s) ? i = r[4] : s ? n && (i = i.slice(2)) : l >= 2 && d(t.protocol) && (i = r[4]), {
							protocol: s,
							slashes: n || d(s),
							slashesCount: l,
							rest: i
						}
					}

					function m(e, t, i) {
						if (e = u(e), !(this instanceof m)) return new m(e, t, i);
						var n, o, l, c, g, y, v = p.slice(),
							b = typeof t,
							w = this,
							S = 0;
						for ("object" !== b && "string" !== b && (i = t, t = null), i && "function" != typeof i && (i = s.parse), n = !(o = f(e || "", t = h(t))).protocol && !o.slashes, w.slashes = o.slashes || n && t.slashes, w.protocol = o.protocol || t.protocol || "", e = o.rest, ("file:" === o.protocol && (2 !== o.slashesCount || a.test(e)) || !o.slashes && (o.protocol || o.slashesCount < 2 || !d(w.protocol))) && (v[3] = [/(.*)/, "pathname"]); S < v.length; S++) "function" != typeof(c = v[S]) ? (l = c[0], y = c[1], l != l ? w[y] = e : "string" == typeof l ? ~(g = e.indexOf(l)) && ("number" == typeof c[2] ? (w[y] = e.slice(0, g), e = e.slice(g + c[2])) : (w[y] = e.slice(g), e = e.slice(0, g))) : (g = l.exec(e)) && (w[y] = g[1], e = e.slice(0, g.index)), w[y] = w[y] || n && c[3] && t[y] || "", c[4] && (w[y] = w[y].toLowerCase())) : e = c(e, w);
						i && (w.query = i(w.query)), n && t.slashes && "/" !== w.pathname.charAt(0) && ("" !== w.pathname || "" !== t.pathname) && (w.pathname = function(e, t) {
							if ("" === e) return t;
							for (var i = (t || "/").split("/").slice(0, -1).concat(e.split("/")), r = i.length, s = i[r - 1], n = !1, o = 0; r--;) "." === i[r] ? i.splice(r, 1) : ".." === i[r] ? (i.splice(r, 1), o++) : o && (0 === r && (n = !0), i.splice(r, 1), o--);
							return n && i.unshift(""), "." !== s && ".." !== s || i.push(""), i.join("/")
						}(w.pathname, t.pathname)), "/" !== w.pathname.charAt(0) && d(w.protocol) && (w.pathname = "/" + w.pathname), r(w.port, w.protocol) || (w.host = w.hostname, w.port = ""), w.username = w.password = "", w.auth && (c = w.auth.split(":"), w.username = c[0] || "", w.password = c[1] || ""), w.origin = "file:" !== w.protocol && d(w.protocol) && w.host ? w.protocol + "//" + w.host : "null", w.href = w.toString()
					}
					m.prototype = {
						set: function(e, t, i) {
							var n = this;
							switch (e) {
								case "query":
									"string" == typeof t && t.length && (t = (i || s.parse)(t)), n[e] = t;
									break;
								case "port":
									n[e] = t, r(t, n.protocol) ? t && (n.host = n.hostname + ":" + t) : (n.host = n.hostname, n[e] = "");
									break;
								case "hostname":
									n[e] = t, n.port && (t += ":" + n.port), n.host = t;
									break;
								case "host":
									n[e] = t, /:\d+$/.test(t) ? (t = t.split(":"), n.port = t.pop(), n.hostname = t.join(":")) : (n.hostname = t, n.port = "");
									break;
								case "protocol":
									n.protocol = t.toLowerCase(), n.slashes = !i;
									break;
								case "pathname":
								case "hash":
									if (t) {
										var o = "pathname" === e ? "/" : "#";
										n[e] = t.charAt(0) !== o ? o + t : t
									} else n[e] = t;
									break;
								default:
									n[e] = t
							}
							for (var a = 0; a < p.length; a++) {
								var l = p[a];
								l[4] && (n[l[1]] = n[l[1]].toLowerCase())
							}
							return n.origin = "file:" !== n.protocol && d(n.protocol) && n.host ? n.protocol + "//" + n.host : "null", n.href = n.toString(), n
						},
						toString: function(e) {
							e && "function" == typeof e || (e = s.stringify);
							var t, i = this,
								r = i.protocol;
							r && ":" !== r.charAt(r.length - 1) && (r += ":");
							var n = r + (i.slashes || d(i.protocol) ? "//" : "");
							return i.username && (n += i.username, i.password && (n += ":" + i.password), n += "@"), n += i.host + i.pathname, (t = "object" == typeof i.query ? e(i.query) : i.query) && (n += "?" !== t.charAt(0) ? "?" + t : t), i.hash && (n += i.hash), n
						}
					}, m.extractProtocol = f, m.location = h, m.trimLeft = u, m.qs = s, t.exports = m
				}).call(this)
			}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {
			querystringify: 30,
			"requires-port": 31
		}],
		71: [function(e, t, i) {
			"use strict";
			var r, s = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
				n = {},
				o = 0,
				a = 0;

			function l(e) {
				var t = "";
				do {
					t = s[e % 64] + t, e = Math.floor(e / 64)
				} while (e > 0);
				return t
			}

			function u() {
				var e = l(+new Date);
				return e !== r ? (o = 0, r = e) : e + "." + l(o++)
			}
			for (; a < 64; a++) n[s[a]] = a;
			u.encode = l, u.decode = function(e) {
				var t = 0;
				for (a = 0; a < e.length; a++) t = 64 * t + n[e.charAt(a)];
				return t
			}, t.exports = u
		}, {}],
		72: [function(e, t, i) {
			"use strict";

			function r(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var s = 0;

			function n(e) {
				return "__private_" + s++ + "_" + e
			}
			const {
				AbortController: o,
				createAbortError: a
			} = e("@uppy/utils/lib/AbortController"), l = e("@uppy/utils/lib/delay"), u = {
				limit: 1,
				retryDelays: [0, 1e3, 3e3, 5e3],
				getChunkSize: e => Math.ceil(e.size / 1e4),
				onStart() {},
				onProgress() {},
				onPartComplete() {},
				onSuccess() {},
				onError(e) {
					throw e
				}
			};

			function p(e) {
				if ("string" == typeof e) return parseInt(e, 10);
				if ("number" == typeof e) return e;
				throw new TypeError("Expected a number")
			}
			var c = n("aborted"),
				h = n("initChunks"),
				d = n("createUpload"),
				f = n("resumeUpload"),
				m = n("uploadParts"),
				g = n("retryable"),
				y = n("prepareUploadParts"),
				v = n("uploadPartRetryable"),
				b = n("uploadPart"),
				w = n("onPartProgress"),
				S = n("onPartComplete"),
				P = n("uploadPartBytes"),
				k = n("completeUpload"),
				C = n("abortUpload"),
				E = n("onError");

			function x() {
				return this.abortController.signal.aborted
			}

			function _() {
				const e = [],
					t = this.options.getChunkSize(this.file),
					i = Math.max(5242880, Math.ceil(this.file.size / 1e4)),
					r = Math.max(t, i);
				if (0 === this.file.size) e.push(this.file);
				else
					for (let t = 0; t < this.file.size; t += r) {
						const i = Math.min(this.file.size, t + r);
						e.push(this.file.slice(t, i))
					}
				this.chunks = e, this.chunkState = e.map((() => ({
					uploaded: 0,
					busy: !1,
					done: !1
				})))
			}

			function F() {
				return this.createdPromise = Promise.resolve().then((() => this.options.createMultipartUpload())), this.createdPromise.then((e => {
					if (r(this, c)[c]()) throw a();
					if (!("object" == typeof e && e && "string" == typeof e.uploadId && "string" == typeof e.key)) throw new TypeError("AwsS3/Multipart: Got incorrect result from `createMultipartUpload()`, expected an object `{ uploadId, key }`.");
					this.key = e.key, this.uploadId = e.uploadId, this.options.onStart(e), r(this, m)[m]()
				})).catch((e => {
					r(this, E)[E](e)
				}))
			}
			async function O() {
				try {
					const e = await this.options.listParts({
						uploadId: this.uploadId,
						key: this.key
					});
					if (r(this, c)[c]()) throw a();
					e.forEach((e => {
						const t = e.PartNumber - 1;
						this.chunkState[t] = {
							uploaded: p(e.Size),
							etag: e.ETag,
							done: !0
						}, this.parts.some((t => t.PartNumber === e.PartNumber)) || this.parts.push({
							PartNumber: e.PartNumber,
							ETag: e.ETag
						})
					})), r(this, m)[m]()
				} catch (e) {
					r(this, E)[E](e)
				}
			}

			function A() {
				if (this.isPaused) return;
				if (this.chunkState.every((e => e.done))) return void r(this, k)[k]();
				const e = this.options.limit - this.partsInProgress,
					t = this.chunkState.filter((e => e.done)).length,
					i = this.chunks.length - t;
				let s = Math.ceil(this.options.limit / 2);
				if (s > i && (s = i), e < s) return;
				const n = [];
				for (let t = 0; t < this.chunkState.length; t++) {
					if (this.lockedCandidatesForBatch.includes(t)) continue;
					const i = this.chunkState[t];
					if (!i.done && !i.busy && (n.push(t), n.length >= e)) break
				}
				0 !== n.length && r(this, y)[y](n).then((e => {
					n.forEach((t => {
						const i = t + 1,
							s = {
								url: e.presignedUrls[i],
								headers: e.headers
							};
						r(this, v)[v](t, s).then((() => {
							r(this, m)[m]()
						}), (e => {
							r(this, E)[E](e)
						}))
					}))
				}))
			}

			function T({
				before: e,
				attempt: t,
				after: i
			}) {
				const {
					retryDelays: s
				} = this.options, {
					signal: n
				} = this.abortController;
				e && e();
				const o = e => t().catch((t => {
					if (r(this, c)[c]()) throw a();
					if (function(e) {
							if (e.source && "number" == typeof e.source.status) {
								const {
									status: t
								} = e.source;
								return 0 === t || 409 === t || 423 === t || t >= 500 && t < 600
							}
							return !1
						}(t) && e < s.length) return l(s[e], {
						signal: n
					}).then((() => o(e + 1)));
					throw t
				}));
				return o(0).then((e => (i && i(), e)), (e => {
					throw i && i(), e
				}))
			}
			async function R(e) {
				this.lockedCandidatesForBatch.push(...e);
				const t = await r(this, g)[g]({
					attempt: () => this.options.prepareUploadParts({
						key: this.key,
						uploadId: this.uploadId,
						partNumbers: e.map((e => e + 1))
					})
				});
				if ("object" != typeof(null == t ? void 0 : t.presignedUrls)) throw new TypeError("AwsS3/Multipart: Got incorrect result from `prepareUploadParts()`, expected an object `{ presignedUrls }`.");
				return t
			}

			function U(e, t) {
				return r(this, g)[g]({
					before: () => {
						this.partsInProgress += 1
					},
					attempt: () => r(this, b)[b](e, t),
					after: () => {
						this.partsInProgress -= 1
					}
				})
			}

			function D(e, t) {
				this.chunkState[e].busy = !0;
				if (!("string" == typeof(null == t ? void 0 : t.url))) throw new TypeError("AwsS3/Multipart: Got incorrect result for `prePreparedPart`, expected an object `{ url }`.");
				const {
					url: i,
					headers: s
				} = t;
				if (r(this, c)[c]()) throw this.chunkState[e].busy = !1, a();
				return r(this, P)[P](e, i, s)
			}

			function I(e, t) {
				this.chunkState[e].uploaded = p(t);
				const i = this.chunkState.reduce(((e, t) => e + t.uploaded), 0);
				this.options.onProgress(i, this.file.size)
			}

			function B(e, t) {
				this.chunkState[e].etag = t, this.chunkState[e].done = !0;
				const i = {
					PartNumber: e + 1,
					ETag: t
				};
				this.parts.push(i), this.options.onPartComplete(i)
			}

			function N(e, t, i) {
				const s = this.chunks[e],
					{
						signal: n
					} = this.abortController;
				let o;
				const l = new Promise(((e, t) => {
						o = {
							resolve: e,
							reject: t
						}
					})),
					u = new XMLHttpRequest;

				function p() {
					n.removeEventListener("abort", c)
				}

				function c() {
					u.abort()
				}
				return u.open("PUT", t, !0), i && Object.keys(i).forEach((e => {
					u.setRequestHeader(e, i[e])
				})), u.responseType = "text", n.addEventListener("abort", c), u.upload.addEventListener("progress", (t => {
					t.lengthComputable && r(this, w)[w](e, t.loaded, t.total)
				})), u.addEventListener("abort", (() => {
					p(), this.chunkState[e].busy = !1, o.reject(a())
				})), u.addEventListener("load", (t => {
					if (p(), this.chunkState[e].busy = !1, t.target.status < 200 || t.target.status >= 300) {
						const e = new Error("Non 2xx");
						return e.source = t.target, void o.reject(e)
					}
					this.chunks[e] = null, r(this, w)[w](e, s.size, s.size);
					const i = t.target.getResponseHeader("ETag");
					null !== i ? (r(this, S)[S](e, i), o.resolve()) : o.reject(new Error("AwsS3/Multipart: Could not read the ETag header. This likely means CORS is not configured correctly on the S3 Bucket. See https://uppy.io/docs/aws-s3-multipart#S3-Bucket-Configuration for instructions."))
				})), u.addEventListener("error", (t => {
					p(), this.chunkState[e].busy = !1;
					const i = new Error("Unknown error");
					i.source = t.target, o.reject(i)
				})), u.send(s), l
			}
			async function M() {
				this.parts.sort(((e, t) => e.PartNumber - t.PartNumber));
				try {
					const e = await this.options.completeMultipartUpload({
						key: this.key,
						uploadId: this.uploadId,
						parts: this.parts
					});
					this.options.onSuccess(e)
				} catch (e) {
					r(this, E)[E](e)
				}
			}

			function j() {
				this.abortController.abort(), this.createdPromise.then((() => {
					this.options.abortMultipartUpload({
						key: this.key,
						uploadId: this.uploadId
					})
				}), (() => {}))
			}

			function L(e) {
				e && "AbortError" === e.name || this.options.onError(e)
			}
			t.exports = class {
				constructor(e, t) {
					Object.defineProperty(this, E, {
						value: L
					}), Object.defineProperty(this, C, {
						value: j
					}), Object.defineProperty(this, k, {
						value: M
					}), Object.defineProperty(this, P, {
						value: N
					}), Object.defineProperty(this, S, {
						value: B
					}), Object.defineProperty(this, w, {
						value: I
					}), Object.defineProperty(this, b, {
						value: D
					}), Object.defineProperty(this, v, {
						value: U
					}), Object.defineProperty(this, y, {
						value: R
					}), Object.defineProperty(this, g, {
						value: T
					}), Object.defineProperty(this, m, {
						value: A
					}), Object.defineProperty(this, f, {
						value: O
					}), Object.defineProperty(this, d, {
						value: F
					}), Object.defineProperty(this, h, {
						value: _
					}), Object.defineProperty(this, c, {
						value: x
					}), this.options = {
						...u,
						...t
					}, this.options.getChunkSize || (this.options.getChunkSize = u.getChunkSize), this.file = e, this.abortController = new o, this.key = this.options.key || null, this.uploadId = this.options.uploadId || null, this.parts = [], this.createdPromise = Promise.reject(), this.isPaused = !1, this.partsInProgress = 0, this.chunks = null, this.chunkState = null, this.lockedCandidatesForBatch = [], r(this, h)[h](), this.createdPromise.catch((() => {}))
				}
				start() {
					this.isPaused = !1, this.uploadId ? r(this, f)[f]() : r(this, d)[d]()
				}
				pause() {
					this.abortController.abort(), this.abortController = new o, this.isPaused = !0
				}
				abort(e) {
					null != e && e.really ? r(this, C)[C]() : this.pause()
				}
			}
		}, {
			"@uppy/utils/lib/AbortController": 185,
			"@uppy/utils/lib/delay": 194
		}],
		73: [function(e, t, i) {
			"use strict";
			var r, s;
			const n = e("@uppy/core/lib/BasePlugin"),
				{
					Socket: o,
					Provider: a,
					RequestClient: l
				} = e("@uppy/companion-client"),
				u = e("@uppy/utils/lib/EventTracker"),
				p = e("@uppy/utils/lib/emitSocketProgress"),
				c = e("@uppy/utils/lib/getSocketHost"),
				{
					RateLimitedQueue: h
				} = e("@uppy/utils/lib/RateLimitedQueue"),
				d = e("./MultipartUploader");

			function f(e) {
				if (e && e.error) {
					const t = new Error(e.message);
					throw Object.assign(t, e.error), t
				}
				return e
			}
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					super(e, t), this.type = "uploader", this.id = this.opts.id || "AwsS3Multipart", this.title = "AWS S3 Multipart", this.client = new l(e, t);
					const i = {
						timeout: 3e4,
						limit: 0,
						retryDelays: [0, 1e3, 3e3, 5e3],
						createMultipartUpload: this.createMultipartUpload.bind(this),
						listParts: this.listParts.bind(this),
						prepareUploadParts: this.prepareUploadParts.bind(this),
						abortMultipartUpload: this.abortMultipartUpload.bind(this),
						completeMultipartUpload: this.completeMultipartUpload.bind(this)
					};
					this.opts = {
						...i,
						...t
					}, this.upload = this.upload.bind(this), this.requests = new h(this.opts.limit), this.uploaders = Object.create(null), this.uploaderEvents = Object.create(null), this.uploaderSockets = Object.create(null)
				}
				resetUploaderReferences(e, t = {}) {
					this.uploaders[e] && (this.uploaders[e].abort({
						really: t.abort || !1
					}), this.uploaders[e] = null), this.uploaderEvents[e] && (this.uploaderEvents[e].remove(), this.uploaderEvents[e] = null), this.uploaderSockets[e] && (this.uploaderSockets[e].close(), this.uploaderSockets[e] = null)
				}
				assertHost(e) {
					if (!this.opts.companionUrl) throw new Error(`Expected a \`companionUrl\` option containing a Companion address, or if you are not using Companion, a custom \`${e}\` implementation.`)
				}
				createMultipartUpload(e) {
					this.assertHost("createMultipartUpload");
					const t = {};
					return Object.keys(e.meta).forEach((i => {
						null != e.meta[i] && (t[i] = e.meta[i].toString())
					})), this.client.post("s3/multipart", {
						filename: e.name,
						type: e.type,
						metadata: t
					}).then(f)
				}
				listParts(e, {
					key: t,
					uploadId: i
				}) {
					this.assertHost("listParts");
					const r = encodeURIComponent(t);
					return this.client.get(`s3/multipart/${i}?key=${r}`).then(f)
				}
				prepareUploadParts(e, {
					key: t,
					uploadId: i,
					partNumbers: r
				}) {
					this.assertHost("prepareUploadParts");
					const s = encodeURIComponent(t);
					return this.client.get(`s3/multipart/${i}/batch?key=${s}&partNumbers=${r.join(",")}`).then(f)
				}
				completeMultipartUpload(e, {
					key: t,
					uploadId: i,
					parts: r
				}) {
					this.assertHost("completeMultipartUpload");
					const s = encodeURIComponent(t),
						n = encodeURIComponent(i);
					return this.client.post(`s3/multipart/${n}/complete?key=${s}`, {
						parts: r
					}).then(f)
				}
				abortMultipartUpload(e, {
					key: t,
					uploadId: i
				}) {
					this.assertHost("abortMultipartUpload");
					const r = encodeURIComponent(t),
						s = encodeURIComponent(i);
					return this.client.delete(`s3/multipart/${s}?key=${r}`).then(f)
				}
				uploadFile(e) {
					return new Promise(((t, i) => {
						const r = new d(e.data, {
							createMultipartUpload: this.opts.createMultipartUpload.bind(this, e),
							listParts: this.opts.listParts.bind(this, e),
							prepareUploadParts: this.opts.prepareUploadParts.bind(this, e),
							completeMultipartUpload: this.opts.completeMultipartUpload.bind(this, e),
							abortMultipartUpload: this.opts.abortMultipartUpload.bind(this, e),
							getChunkSize: this.opts.getChunkSize ? this.opts.getChunkSize.bind(this) : null,
							onStart: t => {
								const i = this.uppy.getFile(e.id);
								this.uppy.setFileState(e.id, {
									s3Multipart: {
										...i.s3Multipart,
										key: t.key,
										uploadId: t.uploadId
									}
								})
							},
							onProgress: (t, i) => {
								this.uppy.emit("upload-progress", e, {
									uploader: this,
									bytesUploaded: t,
									bytesTotal: i
								})
							},
							onError: t => {
								this.uppy.log(t), this.uppy.emit("upload-error", e, t), s.done(), this.resetUploaderReferences(e.id), i(t)
							},
							onSuccess: i => {
								const n = {
									body: {
										...i
									},
									uploadURL: i.location
								};
								s.done(), this.resetUploaderReferences(e.id);
								const o = this.uppy.getFile(e.id);
								this.uppy.emit("upload-success", o || e, n), i.location && this.uppy.log(`Download ${r.file.name} from ${i.location}`), t(r)
							},
							onPartComplete: t => {
								const i = this.uppy.getFile(e.id);
								i && this.uppy.emit("s3-multipart:part-uploaded", i, t)
							},
							limit: this.opts.limit || 5,
							retryDelays: this.opts.retryDelays || [],
							...e.s3Multipart
						});
						this.uploaders[e.id] = r, this.uploaderEvents[e.id] = new u(this.uppy);
						let s = this.requests.run((() => (e.isPaused || r.start(), () => {})));
						this.onFileRemove(e.id, (i => {
							s.abort(), this.resetUploaderReferences(e.id, {
								abort: !0
							}), t(`upload ${i.id} was removed`)
						})), this.onCancelAll(e.id, (() => {
							s.abort(), this.resetUploaderReferences(e.id, {
								abort: !0
							}), t(`upload ${e.id} was canceled`)
						})), this.onFilePause(e.id, (e => {
							e ? (s.abort(), r.pause()) : (s.abort(), s = this.requests.run((() => (r.start(), () => {}))))
						})), this.onPauseAll(e.id, (() => {
							s.abort(), r.pause()
						})), this.onResumeAll(e.id, (() => {
							s.abort(), e.error && r.abort(), s = this.requests.run((() => (r.start(), () => {})))
						})), e.progress.uploadStarted && e.isRestored || this.uppy.emit("upload-started", e)
					}))
				}
				uploadRemote(e) {
					return this.resetUploaderReferences(e.id), e.progress.uploadStarted && e.isRestored || this.uppy.emit("upload-started", e), e.serverToken ? this.connectToServerSocket(e) : new Promise(((t, i) => {
						new(e.remote.providerOptions.provider ? a : l)(this.uppy, e.remote.providerOptions).post(e.remote.url, {
							...e.remote.body,
							protocol: "s3-multipart",
							size: e.data.size,
							metadata: e.meta
						}).then((t => (this.uppy.setFileState(e.id, {
							serverToken: t.token
						}), e = this.uppy.getFile(e.id)))).then((e => this.connectToServerSocket(e))).then((() => {
							t()
						})).catch((t => {
							this.uppy.emit("upload-error", e, t), i(t)
						}))
					}))
				}
				connectToServerSocket(e) {
					return new Promise(((t, i) => {
						const r = e.serverToken,
							s = c(e.remote.companionUrl),
							n = new o({
								target: `${s}/api/${r}`,
								autoOpen: !1
							});
						this.uploaderSockets[e.id] = n, this.uploaderEvents[e.id] = new u(this.uppy), this.onFileRemove(e.id, (() => {
							a.abort(), n.send("cancel", {}), this.resetUploaderReferences(e.id, {
								abort: !0
							}), t(`upload ${e.id} was removed`)
						})), this.onFilePause(e.id, (e => {
							e ? (a.abort(), n.send("pause", {})) : (a.abort(), a = this.requests.run((() => (n.send("resume", {}), () => {}))))
						})), this.onPauseAll(e.id, (() => {
							a.abort(), n.send("pause", {})
						})), this.onCancelAll(e.id, (() => {
							a.abort(), n.send("cancel", {}), this.resetUploaderReferences(e.id), t(`upload ${e.id} was canceled`)
						})), this.onResumeAll(e.id, (() => {
							a.abort(), e.error && n.send("pause", {}), a = this.requests.run((() => {
								n.send("resume", {})
							}))
						})), this.onRetry(e.id, (() => {
							n.isOpen && (n.send("pause", {}), n.send("resume", {}))
						})), this.onRetryAll(e.id, (() => {
							n.isOpen && (n.send("pause", {}), n.send("resume", {}))
						})), n.on("progress", (t => p(this, t, e))), n.on("error", (t => {
							this.uppy.emit("upload-error", e, new Error(t.error)), this.resetUploaderReferences(e.id), a.done(), i(new Error(t.error))
						})), n.on("success", (i => {
							const r = {
								uploadURL: i.url
							};
							this.uppy.emit("upload-success", e, r), this.resetUploaderReferences(e.id), a.done(), t()
						}));
						let a = this.requests.run((() => (n.open(), e.isPaused && n.send("pause", {}), () => {})))
					}))
				}
				upload(e) {
					if (0 === e.length) return Promise.resolve();
					const t = e.map((e => {
						const t = this.uppy.getFile(e);
						return t.isRemote ? this.uploadRemote(t) : this.uploadFile(t)
					}));
					return Promise.all(t)
				}
				onFileRemove(e, t) {
					this.uploaderEvents[e].on("file-removed", (i => {
						e === i.id && t(i.id)
					}))
				}
				onFilePause(e, t) {
					this.uploaderEvents[e].on("upload-pause", ((i, r) => {
						e === i && t(r)
					}))
				}
				onRetry(e, t) {
					this.uploaderEvents[e].on("upload-retry", (i => {
						e === i && t()
					}))
				}
				onRetryAll(e, t) {
					this.uploaderEvents[e].on("retry-all", (() => {
						this.uppy.getFile(e) && t()
					}))
				}
				onPauseAll(e, t) {
					this.uploaderEvents[e].on("pause-all", (() => {
						this.uppy.getFile(e) && t()
					}))
				}
				onCancelAll(e, t) {
					this.uploaderEvents[e].on("cancel-all", (() => {
						this.uppy.getFile(e) && t()
					}))
				}
				onResumeAll(e, t) {
					this.uploaderEvents[e].on("resume-all", (() => {
						this.uppy.getFile(e) && t()
					}))
				}
				install() {
					const {
						capabilities: e
					} = this.uppy.getState();
					this.uppy.setState({
						capabilities: {
							...e,
							resumableUploads: !0
						}
					}), this.uppy.addUploader(this.upload)
				}
				uninstall() {
					const {
						capabilities: e
					} = this.uppy.getState();
					this.uppy.setState({
						capabilities: {
							...e,
							resumableUploads: !1
						}
					}), this.uppy.removeUploader(this.upload)
				}
			}, r.VERSION = "2.1.1", s)
		}, {
			"./MultipartUploader": 72,
			"@uppy/companion-client": 83,
			"@uppy/core/lib/BasePlugin": 85,
			"@uppy/utils/lib/EventTracker": 186,
			"@uppy/utils/lib/RateLimitedQueue": 190,
			"@uppy/utils/lib/emitSocketProgress": 195,
			"@uppy/utils/lib/getSocketHost": 209
		}],
		74: [function(e, t, i) {
			"use strict";
			var r, s, n, o, a;

			function l(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var u = 0;

			function p(e) {
				return "__private_" + u++ + "_" + e
			}
			const {
				nanoid: c
			} = e("nanoid"), {
				Provider: h,
				RequestClient: d,
				Socket: f
			} = e("@uppy/companion-client"), m = e("@uppy/utils/lib/emitSocketProgress"), g = e("@uppy/utils/lib/getSocketHost"), y = e("@uppy/utils/lib/EventTracker"), v = e("@uppy/utils/lib/ProgressTimeout"), b = e("@uppy/utils/lib/NetworkError"), w = e("@uppy/utils/lib/isNetworkError"), {
				internalRateLimitedQueue: S
			} = e("@uppy/utils/lib/RateLimitedQueue");

			function P(e, t) {
				if (w(e)) return new b(t, e);
				const i = new Error("Upload error");
				return i.cause = t, i.request = e, i
			}

			function k(e, t) {
				const i = new FormData;
				! function(e, t, i) {
					(Array.isArray(i.metaFields) ? i.metaFields : Object.keys(t)).forEach((i => {
						e.append(i, t[i])
					}))
				}(i, e.meta, t);
				const r = function(e) {
					return e.data.slice(0, e.data.size, e.meta.type)
				}(e);
				return e.name ? i.append(t.fieldName, r, e.meta.name) : i.append(t.fieldName, r), i
			}

			function C(e) {
				var t;
				const {
					uppy: i
				} = this, r = i.getState().xhrUpload;
				return {
					...this.opts,
					...r || {},
					...e.xhrUpload || {},
					headers: {
						...this.opts.headers,
						...null == r ? void 0 : r.headers,
						...null == (t = e.xhrUpload) ? void 0 : t.headers
					}
				}
			}

			function E(e, t, i) {
				this.uploaderEvents[t].on(e, (e => {
					t === e && i()
				}))
			}

			function x(e, t, i) {
				this.uploaderEvents[t].on(e, (() => {
					this.uppy.getFile(t) && i()
				}))
			}

			function _(e, t, i) {
				const o = l(this, r)[r](e);
				return this.uppy.log(`uploading ${t} of ${i}`), new Promise(((t, i) => {
					const r = o.formData ? k(e, o) : (e => e.data)(e),
						a = new XMLHttpRequest;
					this.uploaderEvents[e.id] = new y(this.uppy);
					const u = new v(o.timeout, (() => {
							a.abort(), h.done();
							const t = new Error(this.i18n("timedOut", {
								seconds: Math.ceil(o.timeout / 1e3)
							}));
							this.uppy.emit("upload-error", e, t), i(t)
						})),
						p = c();
					a.upload.addEventListener("loadstart", (() => {
						this.uppy.log(`[AwsS3/XHRUpload] ${p} started`)
					})), a.upload.addEventListener("progress", (t => {
						this.uppy.log(`[AwsS3/XHRUpload] ${p} progress: ${t.loaded} / ${t.total}`), u.progress(), t.lengthComputable && this.uppy.emit("upload-progress", e, {
							uploader: this,
							bytesUploaded: t.loaded,
							bytesTotal: t.total
						})
					})), a.addEventListener("load", (r => {
						if (this.uppy.log(`[AwsS3/XHRUpload] ${p} finished`), u.done(), h.done(), this.uploaderEvents[e.id] && (this.uploaderEvents[e.id].remove(), this.uploaderEvents[e.id] = null), o.validateStatus(r.target.status, a.responseText, a)) {
							const i = o.getResponseData(a.responseText, a),
								s = i[o.responseUrlFieldName],
								n = {
									status: r.target.status,
									body: i,
									uploadURL: s
								};
							return this.uppy.emit("upload-success", e, n), s && this.uppy.log(`Download ${e.name} from ${s}`), t(e)
						}
						const s = o.getResponseData(a.responseText, a),
							n = P(a, o.getResponseError(a.responseText, a)),
							l = {
								status: r.target.status,
								body: s
							};
						return this.uppy.emit("upload-error", e, n, l), i(n)
					})), a.addEventListener("error", (() => {
						this.uppy.log(`[AwsS3/XHRUpload] ${p} errored`), u.done(), h.done(), this.uploaderEvents[e.id] && (this.uploaderEvents[e.id].remove(), this.uploaderEvents[e.id] = null);
						const t = P(a, o.getResponseError(a.responseText, a));
						return this.uppy.emit("upload-error", e, t), i(t)
					})), a.open(o.method.toUpperCase(), o.endpoint, !0), a.withCredentials = Boolean(o.withCredentials), "" !== o.responseType && (a.responseType = o.responseType), Object.keys(o.headers).forEach((e => {
						a.setRequestHeader(e, o.headers[e])
					}));
					const h = this.requests.run((() => (a.send(r), () => {
						u.done(), a.abort()
					})), {
						priority: 1
					});
					l(this, s)[s]("file-removed", e.id, (() => {
						h.abort(), i(new Error("File removed"))
					})), l(this, n)[n]("cancel-all", e.id, (() => {
						h.abort(), i(new Error("Upload cancelled"))
					}))
				}))
			}

			function F(e) {
				const t = l(this, r)[r](e),
					i = Array.isArray(t.metaFields) ? t.metaFields : Object.keys(e.meta);
				return new(e.remote.providerOptions.provider ? h : d)(this.uppy, e.remote.providerOptions).post(e.remote.url, {
					...e.remote.body,
					endpoint: t.endpoint,
					size: e.data.size,
					fieldname: t.fieldName,
					metadata: Object.fromEntries(i.map((t => [t, e.meta[t]]))),
					httpMethod: t.method,
					useFormData: t.formData,
					headers: t.headers
				}).then((i => new Promise(((r, o) => {
					const {
						token: a
					} = i, u = g(e.remote.companionUrl), p = new f({
						target: `${u}/api/${a}`,
						autoOpen: !1
					});
					this.uploaderEvents[e.id] = new y(this.uppy);
					const c = this.requests.run((() => (p.open(), e.isPaused && p.send("pause", {}), () => p.close())));
					l(this, s)[s]("file-removed", e.id, (() => {
						p.send("pause", {}), c.abort(), r(`upload ${e.id} was removed`)
					})), l(this, n)[n]("cancel-all", e.id, (() => {
						p.send("pause", {}), c.abort(), r(`upload ${e.id} was canceled`)
					})), l(this, s)[s]("upload-retry", e.id, (() => {
						p.send("pause", {}), p.send("resume", {})
					})), l(this, n)[n]("retry-all", e.id, (() => {
						p.send("pause", {}), p.send("resume", {})
					})), p.on("progress", (t => m(this, t, e))), p.on("success", (i => {
						const s = t.getResponseData(i.response.responseText, i.response),
							n = s[t.responseUrlFieldName],
							o = {
								status: i.response.status,
								body: s,
								uploadURL: n,
								bytesUploaded: i.bytesUploaded
							};
						return this.uppy.emit("upload-success", e, o), c.done(), this.uploaderEvents[e.id] && (this.uploaderEvents[e.id].remove(), this.uploaderEvents[e.id] = null), r()
					})), p.on("error", (i => {
						const r = i.response,
							s = r ? t.getResponseError(r.responseText, r) : Object.assign(new Error(i.error.message), {
								cause: i.error
							});
						this.uppy.emit("upload-error", e, s), c.done(), this.uploaderEvents[e.id] && (this.uploaderEvents[e.id].remove(), this.uploaderEvents[e.id] = null), o(s)
					}))
				})).catch((t => (this.uppy.emit("upload-error", e, t), Promise.reject(t))))))
			}
			t.exports = (r = p("getOptions"), s = p("addEventHandlerForFile"), n = p("addEventHandlerIfFileStillExists"), o = p("uploadLocalFile"), a = p("uploadRemoteFile"), class {
				constructor(e, t) {
					Object.defineProperty(this, a, {
						value: F
					}), Object.defineProperty(this, o, {
						value: _
					}), Object.defineProperty(this, n, {
						value: x
					}), Object.defineProperty(this, s, {
						value: E
					}), Object.defineProperty(this, r, {
						value: C
					}), this.uppy = e, this.opts = {
						validateStatus: e => e >= 200 && e < 300,
						...t
					}, this.requests = t[S], this.uploaderEvents = Object.create(null), this.i18n = t.i18n
				}
				uploadFile(e, t, i) {
					const r = this.uppy.getFile(e);
					if (r.error) throw new Error(r.error);
					return r.isRemote ? l(this, a)[a](r, t, i) : l(this, o)[o](r, t, i)
				}
			})
		}, {
			"@uppy/companion-client": 83,
			"@uppy/utils/lib/EventTracker": 186,
			"@uppy/utils/lib/NetworkError": 188,
			"@uppy/utils/lib/ProgressTimeout": 189,
			"@uppy/utils/lib/RateLimitedQueue": 190,
			"@uppy/utils/lib/emitSocketProgress": 195,
			"@uppy/utils/lib/getSocketHost": 209,
			"@uppy/utils/lib/isNetworkError": 216,
			nanoid: 24
		}],
		75: [function(e, t, i) {
			"use strict";
			var r, s, n, o, a, l;

			function u(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var p = 0;

			function c(e) {
				return "__private_" + p++ + "_" + e
			}
			const h = e("@uppy/core/lib/BasePlugin"),
				{
					RateLimitedQueue: d,
					internalRateLimitedQueue: f
				} = e("@uppy/utils/lib/RateLimitedQueue"),
				m = e("@uppy/utils/lib/settle"),
				{
					RequestClient: g
				} = e("@uppy/companion-client"),
				y = e("./MiniXHRUpload"),
				v = e("./isXml");

			function b(e, t) {
				const i = e.indexOf(`<${t}>`),
					r = e.indexOf(`</${t}>`, i);
				return -1 !== i && -1 !== r ? e.slice(i + t.length + 2, r) : ""
			}

			function w(e) {
				if (e && e.error) {
					const t = new Error(e.message);
					throw Object.assign(t, e.error), t
				}
				return e
			}

			function S(e, t) {
				if (!v(e, t)) return;
				const i = b(e, "Message");
				return new Error(i)
			}
			let P = !1;
			t.exports = (s = c("client"), n = c("requests"), o = c("uploader"), a = c("handleUpload"), l = r = class extends h {
				constructor(e, t) {
					super(e, t), Object.defineProperty(this, s, {
						writable: !0,
						value: void 0
					}), Object.defineProperty(this, n, {
						writable: !0,
						value: void 0
					}), Object.defineProperty(this, o, {
						writable: !0,
						value: void 0
					}), Object.defineProperty(this, a, {
						writable: !0,
						value: e => {
							const t = Object.create(null);

							function i(e) {
								var i;
								const {
									id: r
								} = e;
								null == (i = t[r]) || i.abort()
							}
							this.uppy.on("file-removed", i), e.forEach((e => {
								const t = this.uppy.getFile(e);
								this.uppy.emit("upload-started", t)
							}));
							const r = u(this, n)[n].wrapPromiseFunction((e => this.opts.getUploadParameters(e))),
								s = e.length;
							return m(e.map(((e, i) => (t[e] = r(this.uppy.getFile(e)), t[e].then((r => {
								delete t[e];
								const n = this.uppy.getFile(e);
								! function(e, t) {
									if (null == t || "string" != typeof t.url || "object" != typeof t.fields && null != t.fields) throw new TypeError(`AwsS3: got incorrect result from 'getUploadParameters()' for file '${e.name}', expected an object '{ url, method, fields, headers }' but got '${JSON.stringify(t)}' instead.\nSee https://uppy.io/docs/aws-s3/#getUploadParameters-file for more on the expected format.`);
									if (null != t.method && !/^p(u|os)t$/i.test(t.method)) throw new TypeError(`AwsS3: got incorrect method from 'getUploadParameters()' for file '${e.name}', expected  'put' or 'post' but got '${t.method}' instead.\nSee https://uppy.io/docs/aws-s3/#getUploadParameters-file for more on the expected format.`)
								}(n, r);
								const {
									method: a = "post",
									url: l,
									fields: p,
									headers: c
								} = r, h = {
									method: a,
									formData: "post" === a.toLowerCase(),
									endpoint: l,
									metaFields: p ? Object.keys(p) : []
								};
								return c && (h.headers = c), this.uppy.setFileState(n.id, {
									meta: {
										...n.meta,
										...p
									},
									xhrUpload: h
								}), u(this, o)[o].uploadFile(n.id, i, s)
							})).catch((i => {
								delete t[e];
								const r = this.uppy.getFile(e);
								this.uppy.emit("upload-error", r, i)
							})))))).finally((() => {
								this.uppy.off("file-removed", i)
							}))
						}
					}), this.type = "uploader", this.id = this.opts.id || "AwsS3", this.title = "AWS S3", this.defaultLocale = {
						strings: {
							timedOut: "Upload stalled for %{seconds} seconds, aborting."
						}
					};
					const i = {
						timeout: 3e4,
						limit: 0,
						metaFields: [],
						getUploadParameters: this.getUploadParameters.bind(this)
					};
					this.opts = {
						...i,
						...t
					}, this.i18nInit(), u(this, s)[s] = new g(e, t), u(this, n)[n] = new d(this.opts.limit)
				}
				getUploadParameters(e) {
					if (!this.opts.companionUrl) throw new Error("Expected a `companionUrl` option containing a Companion address.");
					const t = e.meta.name,
						{
							type: i
						} = e.meta,
						r = Object.fromEntries(this.opts.metaFields.filter((t => null != e.meta[t])).map((t => [`metadata[${t}]`, e.meta[t].toString()]))),
						n = new URLSearchParams({
							filename: t,
							type: i,
							...r
						});
					return u(this, s)[s].get(`s3/params?${n}`).then(w)
				}
				install() {
					const {
						uppy: e
					} = this;
					e.addUploader(u(this, a)[a]);
					const t = {
						fieldName: "file",
						responseUrlFieldName: "location",
						timeout: this.opts.timeout,
						[f]: u(this, n)[n],
						responseType: "text",
						getResponseData: this.opts.getResponseData || function(t, i) {
							const r = this;
							return v(t, i) ? {
								location: (s = i.responseURL, n = b(t, "Location"), new URL(n, s || void 0).toString()),
								bucket: b(t, "Bucket"),
								key: b(t, "Key"),
								etag: b(t, "ETag")
							} : "POST" === r.method.toUpperCase() ? (P || (e.log("[AwsS3] No response data found, make sure to set the success_action_status AWS SDK option to 201. See https://uppy.io/docs/aws-s3/#POST-Uploads", "warning"), P = !0), {
								location: null
							}) : i.responseURL ? {
								location: i.responseURL.replace(/\?.*$/, "")
							} : {
								location: null
							};
							var s, n
						},
						getResponseError: S
					};
					t.i18n = this.i18n, u(this, o)[o] = new y(e, t)
				}
				uninstall() {
					this.uppy.removeUploader(u(this, a)[a])
				}
			}, r.VERSION = "2.0.5", l)
		}, {
			"./MiniXHRUpload": 74,
			"./isXml": 76,
			"@uppy/companion-client": 83,
			"@uppy/core/lib/BasePlugin": 85,
			"@uppy/utils/lib/RateLimitedQueue": 190,
			"@uppy/utils/lib/settle": 223
		}],
		76: [function(e, t, i) {
			"use strict";
			t.exports = function(e, t) {
				const i = t.headers ? t.headers["content-type"] : t.getResponseHeader("Content-Type");
				if ("string" == typeof i) {
					const t = (r = i, r.replace(/;.*$/, "")).toLowerCase();
					if ("application/xml" === t || "text/xml" === t) return !0;
					if ("text/html" === t && /^<\?xml /.test(e)) return !0
				}
				var r;
				return !1
			}
		}, {}],
		77: [function(e, t, i) {
			"use strict";
			var r, s;
			const {
				UIPlugin: n
			} = e("@uppy/core"), {
				Provider: o
			} = e("@uppy/companion-client"), {
				ProviderViews: a
			} = e("@uppy/provider-views"), {
				h: l
			} = e("preact");
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					super(e, t), this.id = this.opts.id || "Box", o.initPlugin(this, t), this.title = this.opts.title || "Box", this.icon = () => l("svg", {
						"aria-hidden": "true",
						focusable: "false",
						width: "32",
						height: "32",
						viewBox: "0 0 32 32"
					}, l("g", {
						fill: "none",
						fillRule: "evenodd"
					}, l("rect", {
						className: "uppy-ProviderIconBg",
						fill: "#0061D5",
						width: "32",
						height: "32",
						rx: "16"
					}), l("g", {
						fill: "#fff",
						fillRule: "nonzero"
					}, l("path", {
						d: "m16.4 13.5c-1.6 0-3 0.9-3.7 2.2-0.7-1.3-2.1-2.2-3.7-2.2-1 0-1.8 0.3-2.5 0.8v-3.6c-0.1-0.3-0.5-0.7-1-0.7s-0.8 0.4-0.8 0.8v7c0 2.3 1.9 4.2 4.2 4.2 1.6 0 3-0.9 3.7-2.2 0.7 1.3 2.1 2.2 3.7 2.2 2.3 0 4.2-1.9 4.2-4.2 0.1-2.4-1.8-4.3-4.1-4.3m-7.5 6.8c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5m7.5 0c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5"
					}), l("path", {
						d: "m27.2 20.6l-2.3-2.8 2.3-2.8c0.3-0.4 0.2-0.9-0.2-1.2s-1-0.2-1.3 0.2l-2 2.4-2-2.4c-0.3-0.4-0.9-0.4-1.3-0.2-0.4 0.3-0.5 0.8-0.2 1.2l2.3 2.8-2.3 2.8c-0.3 0.4-0.2 0.9 0.2 1.2s1 0.2 1.3-0.2l2-2.4 2 2.4c0.3 0.4 0.9 0.4 1.3 0.2 0.4-0.3 0.4-0.8 0.2-1.2"
					})))), this.provider = new o(e, {
						companionUrl: this.opts.companionUrl,
						companionHeaders: this.opts.companionHeaders,
						companionKeysParams: this.opts.companionKeysParams,
						companionCookiesRule: this.opts.companionCookiesRule,
						provider: "box",
						pluginId: this.id
					}), this.defaultLocale = {
						strings: {
							pluginNameBox: "Box"
						}
					}, this.i18nInit(), this.title = this.i18n("pluginNameBox"), this.onFirstRender = this.onFirstRender.bind(this), this.render = this.render.bind(this)
				}
				install() {
					this.view = new a(this, {
						provider: this.provider
					});
					const {
						target: e
					} = this.opts;
					e && this.mount(e, this)
				}
				uninstall() {
					this.view.tearDown(), this.unmount()
				}
				onFirstRender() {
					return this.view.getFolder()
				}
				render(e) {
					return this.view.render(e)
				}
			}, r.VERSION = "1.0.4", s)
		}, {
			"@uppy/companion-client": 83,
			"@uppy/core": 89,
			"@uppy/provider-views": 156,
			preact: 28
		}],
		78: [function(e, t, i) {
			"use strict";
			class r extends Error {
				constructor() {
					super("Authorization required"), this.name = "AuthError", this.isAuthError = !0
				}
			}
			t.exports = r
		}, {}],
		79: [function(e, t, i) {
			"use strict";
			const r = e("./RequestClient"),
				s = e("./tokenStorage");
			t.exports = class extends r {
				constructor(e, t) {
					super(e, t), this.provider = t.provider, this.id = this.provider, this.name = this.opts.name || this.id.split("-").map((e => e.charAt(0).toUpperCase() + e.slice(1))).join(" "), this.pluginId = this.opts.pluginId, this.tokenKey = `companion-${this.pluginId}-auth-token`, this.companionKeysParams = this.opts.companionKeysParams, this.preAuthToken = null
				}
				headers() {
					return Promise.all([super.headers(), this.getAuthToken()]).then((([e, t]) => {
						const i = {};
						return t && (i["uppy-auth-token"] = t), this.companionKeysParams && (i["uppy-credentials-params"] = btoa(JSON.stringify({
							params: this.companionKeysParams
						}))), {
							...e,
							...i
						}
					}))
				}
				onReceiveResponse(e) {
					e = super.onReceiveResponse(e);
					const t = this.uppy.getPlugin(this.pluginId),
						i = t.getPluginState().authenticated ? 401 !== e.status : e.status < 400;
					return t.setPluginState({
						authenticated: i
					}), e
				}
				setAuthToken(e) {
					return this.uppy.getPlugin(this.pluginId).storage.setItem(this.tokenKey, e)
				}
				getAuthToken() {
					return this.uppy.getPlugin(this.pluginId).storage.getItem(this.tokenKey)
				}
				authUrl(e = {}) {
					return this.preAuthToken && (e.uppyPreAuthToken = this.preAuthToken), `${this.hostname}/${this.id}/connect?${new URLSearchParams(e)}`
				}
				fileUrl(e) {
					return `${this.hostname}/${this.id}/get/${e}`
				}
				fetchPreAuthToken() {
					return this.companionKeysParams ? this.post(`${this.id}/preauth/`, {
						params: this.companionKeysParams
					}).then((e => {
						this.preAuthToken = e.token
					})).catch((e => {
						this.uppy.log(`[CompanionClient] unable to fetch preAuthToken ${e}`, "warning")
					})) : Promise.resolve()
				}
				list(e) {
					return this.get(`${this.id}/list/${e||""}`)
				}
				logout() {
					return this.get(`${this.id}/logout`).then((e => Promise.all([e, this.uppy.getPlugin(this.pluginId).storage.removeItem(this.tokenKey)]))).then((([e]) => e))
				}
				static initPlugin(e, t, i) {
					if (e.type = "acquirer", e.files = [], i && (e.opts = {
							...i,
							...t
						}), t.serverUrl || t.serverPattern) throw new Error("`serverUrl` and `serverPattern` have been renamed to `companionUrl` and `companionAllowedHosts` respectively in the 0.30.5 release. Please consult the docs (for example, https://uppy.io/docs/instagram/ for the Instagram plugin) and use the updated options.`");
					if (t.companionAllowedHosts) {
						const i = t.companionAllowedHosts;
						if (!("string" == typeof i || Array.isArray(i) || i instanceof RegExp)) throw new TypeError(`${e.id}: the option "companionAllowedHosts" must be one of string, Array, RegExp`);
						e.opts.companionAllowedHosts = i
					} else /^(?!https?:\/\/).*$/i.test(t.companionUrl) ? e.opts.companionAllowedHosts = `https://${t.companionUrl.replace(/^\/\//,"")}` : e.opts.companionAllowedHosts = new URL(t.companionUrl).origin;
					e.storage = e.opts.storage || s
				}
			}
		}, {
			"./RequestClient": 80,
			"./tokenStorage": 84
		}],
		80: [function(e, t, i) {
			"use strict";
			var r, s, n, o, a;

			function l(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var u = 0;

			function p(e) {
				return "__private_" + u++ + "_" + e
			}
			const c = e("@uppy/utils/lib/fetchWithNetworkError"),
				h = e("./AuthError");
			async function d(e) {
				if (401 === e.status) throw new h;
				const t = e.json();
				if (e.status < 200 || e.status > 300) {
					let i = `Failed request with status: ${e.status}. ${e.statusText}`;
					try {
						const e = await t;
						i = e.message ? `${i} message: ${e.message}` : i, i = e.requestId ? `${i} request-Id: ${e.requestId}` : i
					} finally {
						throw new Error(i)
					}
				}
				return t
			}

			function f(e) {
				return /^(https?:|)\/\//.test(e) ? e : `${this.hostname}/${e}`
			}

			function m(e, t) {
				return i => {
					var r;
					if (null == (r = i) || !r.isAuthError) {
						const r = new Error(`Could not ${e} ${l(this,n)[n](t)}`);
						r.cause = i, i = r
					}
					return Promise.reject(i)
				}
			}
			t.exports = (s = p("getPostResponseFunc"), n = p("getUrl"), o = p("errorHandler"), a = r = class e {
				constructor(e, t) {
					Object.defineProperty(this, o, {
						value: m
					}), Object.defineProperty(this, n, {
						value: f
					}), Object.defineProperty(this, s, {
						writable: !0,
						value: e => t => e ? t : this.onReceiveResponse(t)
					}), this.uppy = e, this.opts = t, this.onReceiveResponse = this.onReceiveResponse.bind(this), this.allowedHeaders = ["accept", "content-type", "uppy-auth-token"], this.preflightDone = !1
				}
				get hostname() {
					const {
						companion: e
					} = this.uppy.getState(), t = this.opts.companionUrl;
					return (e && e[t] ? e[t] : t).replace(/\/$/, "")
				}
				headers() {
					const t = this.opts.companionHeaders || {};
					return Promise.resolve({
						...e.defaultHeaders,
						...t
					})
				}
				onReceiveResponse(e) {
					const t = this.uppy.getState().companion || {},
						i = this.opts.companionUrl,
						{
							headers: r
						} = e;
					return r.has("i-am") && r.get("i-am") !== t[i] && this.uppy.setState({
						companion: {
							...t,
							[i]: r.get("i-am")
						}
					}), e
				}
				preflight(e) {
					return this.preflightDone ? Promise.resolve(this.allowedHeaders.slice()) : fetch(l(this, n)[n](e), {
						method: "OPTIONS"
					}).then((e => (e.headers.has("access-control-allow-headers") && (this.allowedHeaders = e.headers.get("access-control-allow-headers").split(",").map((e => e.trim().toLowerCase()))), this.preflightDone = !0, this.allowedHeaders.slice()))).catch((e => (this.uppy.log(`[CompanionClient] unable to make preflight request ${e}`, "warning"), this.preflightDone = !0, this.allowedHeaders.slice())))
				}
				preflightAndHeaders(e) {
					return Promise.all([this.preflight(e), this.headers()]).then((([e, t]) => (Object.keys(t).forEach((i => {
						e.includes(i.toLowerCase()) || (this.uppy.log(`[CompanionClient] excluding disallowed header ${i}`), delete t[i])
					})), t)))
				}
				get(e, t) {
					return this.preflightAndHeaders(e).then((t => c(l(this, n)[n](e), {
						method: "get",
						headers: t,
						credentials: this.opts.companionCookiesRule || "same-origin"
					}))).then(l(this, s)[s](t)).then(d).catch(l(this, o)[o]("get", e))
				}
				post(e, t, i) {
					const r = "post";
					return this.preflightAndHeaders(e).then((i => c(l(this, n)[n](e), {
						method: r,
						headers: i,
						credentials: this.opts.companionCookiesRule || "same-origin",
						body: JSON.stringify(t)
					}))).then(l(this, s)[s](i)).then(d).catch(l(this, o)[o](r, e))
				}
				delete(e, t, i) {
					const r = "delete";
					return this.preflightAndHeaders(e).then((i => c(`${this.hostname}/${e}`, {
						method: r,
						headers: i,
						credentials: this.opts.companionCookiesRule || "same-origin",
						body: t ? JSON.stringify(t) : null
					}))).then(l(this, s)[s](i)).then(d).catch(l(this, o)[o](r, e))
				}
			}, r.VERSION = "2.0.3", r.defaultHeaders = {
				Accept: "application/json",
				"Content-Type": "application/json",
				"Uppy-Versions": `@uppy/companion-client=${r.VERSION}`
			}, a)
		}, {
			"./AuthError": 78,
			"@uppy/utils/lib/fetchWithNetworkError": 196
		}],
		81: [function(e, t, i) {
			"use strict";
			const r = e("./RequestClient");
			t.exports = class extends r {
				constructor(e, t) {
					super(e, t), this.provider = t.provider, this.id = this.provider, this.name = this.opts.name || this.id.split("-").map((e => e.charAt(0).toUpperCase() + e.slice(1))).join(" "), this.pluginId = this.opts.pluginId
				}
				fileUrl(e) {
					return `${this.hostname}/search/${this.id}/get/${e}`
				}
				search(e, t) {
					return t = t ? `&${t}` : "", this.get(`search/${this.id}/list?q=${encodeURIComponent(e)}${t}`)
				}
			}
		}, {
			"./RequestClient": 80
		}],
		82: [function(e, t, i) {
			"use strict";
			var r, s, n, o, a;
			let l, u;

			function p(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var c = 0;

			function h(e) {
				return "__private_" + c++ + "_" + e
			}
			const d = e("namespace-emitter");
			t.exports = (r = h("queued"), s = h("emitter"), n = h("isOpen"), o = h("socket"), a = h("handleMessage"), l = Symbol.for("uppy test: getSocket"), u = Symbol.for("uppy test: getQueued"), class {
				constructor(e) {
					Object.defineProperty(this, r, {
						writable: !0,
						value: []
					}), Object.defineProperty(this, s, {
						writable: !0,
						value: d()
					}), Object.defineProperty(this, n, {
						writable: !0,
						value: !1
					}), Object.defineProperty(this, o, {
						writable: !0,
						value: void 0
					}), Object.defineProperty(this, a, {
						writable: !0,
						value: e => {
							try {
								const t = JSON.parse(e.data);
								this.emit(t.action, t.payload)
							} catch (e) {
								console.log(e)
							}
						}
					}), this.opts = e, e && !1 === e.autoOpen || this.open()
				}
				get isOpen() {
					return p(this, n)[n]
				} [l]() {
					return p(this, o)[o]
				} [u]() {
					return p(this, r)[r]
				}
				open() {
					p(this, o)[o] = new WebSocket(this.opts.target), p(this, o)[o].onopen = () => {
						for (p(this, n)[n] = !0; p(this, r)[r].length > 0 && p(this, n)[n];) {
							const e = p(this, r)[r].shift();
							this.send(e.action, e.payload)
						}
					}, p(this, o)[o].onclose = () => {
						p(this, n)[n] = !1
					}, p(this, o)[o].onmessage = p(this, a)[a]
				}
				close() {
					var e;
					null == (e = p(this, o)[o]) || e.close()
				}
				send(e, t) {
					p(this, n)[n] ? p(this, o)[o].send(JSON.stringify({
						action: e,
						payload: t
					})) : p(this, r)[r].push({
						action: e,
						payload: t
					})
				}
				on(e, t) {
					p(this, s)[s].on(e, t)
				}
				emit(e, t) {
					p(this, s)[s].emit(e, t)
				}
				once(e, t) {
					p(this, s)[s].once(e, t)
				}
			})
		}, {
			"namespace-emitter": 23
		}],
		83: [function(e, t, i) {
			"use strict";
			const r = e("./RequestClient"),
				s = e("./Provider"),
				n = e("./SearchProvider"),
				o = e("./Socket");
			t.exports = {
				RequestClient: r,
				Provider: s,
				SearchProvider: n,
				Socket: o
			}
		}, {
			"./Provider": 79,
			"./RequestClient": 80,
			"./SearchProvider": 81,
			"./Socket": 82
		}],
		84: [function(e, t, i) {
			"use strict";
			t.exports.setItem = (e, t) => new Promise((i => {
				localStorage.setItem(e, t), i()
			})), t.exports.getItem = e => Promise.resolve(localStorage.getItem(e)), t.exports.removeItem = e => new Promise((t => {
				localStorage.removeItem(e), t()
			}))
		}, {}],
		85: [function(e, t, i) {
			"use strict";
			const r = e("@uppy/utils/lib/Translator");
			t.exports = class {
				constructor(e, t = {}) {
					this.uppy = e, this.opts = t
				}
				getPluginState() {
					const {
						plugins: e
					} = this.uppy.getState();
					return e[this.id] || {}
				}
				setPluginState(e) {
					const {
						plugins: t
					} = this.uppy.getState();
					this.uppy.setState({
						plugins: {
							...t,
							[this.id]: {
								...t[this.id],
								...e
							}
						}
					})
				}
				setOptions(e) {
					this.opts = {
						...this.opts,
						...e
					}, this.setPluginState(), this.i18nInit()
				}
				i18nInit() {
					const e = new r([this.defaultLocale, this.uppy.locale, this.opts.locale]);
					this.i18n = e.translate.bind(e), this.i18nArray = e.translateArray.bind(e), this.setPluginState()
				}
				addTarget() {
					throw new Error("Extend the addTarget method to add your plugin to another plugin's target")
				}
				install() {}
				uninstall() {}
				render() {
					throw new Error("Extend the render method to add your plugin to a DOM element")
				}
				update() {}
				afterUpdate() {}
			}
		}, {
			"@uppy/utils/lib/Translator": 191
		}],
		86: [function(e, t, i) {
			"use strict";

			function r(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var s = 0;

			function n(e) {
				return "__private_" + s++ + "_" + e
			}
			const {
				render: o
			} = e("preact"), a = e("@uppy/utils/lib/findDOMElement"), l = e("./BasePlugin");
			var u = n("updateUI");
			class p extends l {
				constructor(...e) {
					super(...e), Object.defineProperty(this, u, {
						writable: !0,
						value: void 0
					})
				}
				mount(e, t) {
					const i = t.id,
						s = a(e);
					if (s) {
						this.isTargetDOMEl = !0;
						const t = document.createDocumentFragment();
						return r(this, u)[u] = function(e) {
							let t = null,
								i = null;
							return (...r) => (i = r, t || (t = Promise.resolve().then((() => (t = null, e(...i))))), t)
						}((e => {
							this.uppy.getPlugin(this.id) && (o(this.render(e), t), this.afterUpdate())
						})), this.uppy.log(`Installing ${i} to a DOM element '${e}'`), this.opts.replaceTargetContent && (s.innerHTML = ""), o(this.render(this.uppy.getState()), t), this.el = t.firstElementChild, s.appendChild(t), this.onMount(), this.el
					}
					let n;
					if ("object" == typeof e && e instanceof p) n = e;
					else if ("function" == typeof e) {
						const t = e;
						this.uppy.iteratePlugins((e => {
							if (e instanceof t) return n = e, !1
						}))
					}
					if (n) return this.uppy.log(`Installing ${i} to ${n.id}`), this.parent = n, this.el = n.addTarget(t), this.onMount(), this.el;
					this.uppy.log(`Not installing ${i}`);
					let l = `Invalid target option given to ${i}.`;
					throw l += "function" == typeof e ? " The given target is not a Plugin class. Please check that you're not specifying a React Component instead of a plugin. If you are using @uppy/* packages directly, make sure you have only 1 version of @uppy/core installed: run `npm ls @uppy/core` on the command line and verify that all the versions match and are deduped correctly." : "If you meant to target an HTML element, please make sure that the element exists. Check that the <script> tag initializing Uppy is right before the closing </body> tag at the end of the page. (see https://github.com/transloadit/uppy/issues/1042)\n\nIf you meant to target a plugin, please confirm that your `import` statements or `require` calls are correct.", new Error(l)
				}
				update(e) {
					var t, i;
					null != this.el && (null == (t = (i = r(this, u))[u]) || t.call(i, e))
				}
				unmount() {
					var e;
					this.isTargetDOMEl && (null == (e = this.el) || e.remove());
					this.onUnmount()
				}
				onMount() {}
				onUnmount() {}
			}
			t.exports = p
		}, {
			"./BasePlugin": 85,
			"@uppy/utils/lib/findDOMElement": 198,
			preact: 28
		}],
		87: [function(e, t, i) {
			"use strict";
			let r, s;

			function n(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var o = 0;

			function a(e) {
				return "__private_" + o++ + "_" + e
			}
			const l = e("@uppy/utils/lib/Translator"),
				u = e("namespace-emitter"),
				{
					nanoid: p
				} = e("nanoid"),
				c = e("lodash.throttle"),
				h = e("@transloadit/prettier-bytes"),
				d = e("mime-match"),
				f = e("@uppy/store-default"),
				m = e("@uppy/utils/lib/getFileType"),
				g = e("@uppy/utils/lib/getFileNameAndExtension"),
				y = e("@uppy/utils/lib/generateFileID"),
				v = e("./supportsUploadProgress"),
				b = e("./getFileName"),
				{
					justErrorsLogger: w,
					debugLogger: S
				} = e("./loggers");
			class P extends Error {
				constructor(...e) {
					super(...e), this.isRestriction = !0
				}
			}
			"undefined" == typeof AggregateError && (globalThis.AggregateError = class extends Error {
				constructor(e, t) {
					super(e), this.errors = t
				}
			});
			class k extends AggregateError {
				constructor(...e) {
					super(...e), this.isRestriction = !0
				}
			}
			var C = a("plugins"),
				E = a("storeUnsubscribe"),
				x = a("emitter"),
				_ = a("preProcessors"),
				F = a("uploaders"),
				O = a("postProcessors"),
				A = a("checkRestrictions"),
				T = a("checkMinNumberOfFiles"),
				R = a("checkRequiredMetaFields"),
				U = a("showOrLogErrorAndThrow"),
				D = a("assertNewUploadAllowed"),
				I = a("checkAndCreateFileStateObject"),
				B = a("startIfAutoProceed"),
				N = a("addListeners"),
				M = a("updateOnlineStatus"),
				j = a("createUpload"),
				L = a("getUpload"),
				z = a("removeUpload"),
				H = a("runUpload");
			r = Symbol.for("uppy test: getPlugins"), s = Symbol.for("uppy test: createUpload");
			class $ {
				constructor(e) {
					Object.defineProperty(this, H, {
						value: te
					}), Object.defineProperty(this, z, {
						value: ee
					}), Object.defineProperty(this, L, {
						value: Z
					}), Object.defineProperty(this, j, {
						value: J
					}), Object.defineProperty(this, N, {
						value: Q
					}), Object.defineProperty(this, B, {
						value: Y
					}), Object.defineProperty(this, I, {
						value: K
					}), Object.defineProperty(this, D, {
						value: G
					}), Object.defineProperty(this, U, {
						value: X
					}), Object.defineProperty(this, R, {
						value: W
					}), Object.defineProperty(this, T, {
						value: V
					}), Object.defineProperty(this, A, {
						value: q
					}), Object.defineProperty(this, C, {
						writable: !0,
						value: Object.create(null)
					}), Object.defineProperty(this, E, {
						writable: !0,
						value: void 0
					}), Object.defineProperty(this, x, {
						writable: !0,
						value: u()
					}), Object.defineProperty(this, _, {
						writable: !0,
						value: new Set
					}), Object.defineProperty(this, F, {
						writable: !0,
						value: new Set
					}), Object.defineProperty(this, O, {
						writable: !0,
						value: new Set
					}), Object.defineProperty(this, M, {
						writable: !0,
						value: this.updateOnlineStatus.bind(this)
					}), this.defaultLocale = {
						strings: {
							addBulkFilesFailed: {
								0: "Failed to add %{smart_count} file due to an internal error",
								1: "Failed to add %{smart_count} files due to internal errors"
							},
							youCanOnlyUploadX: {
								0: "You can only upload %{smart_count} file",
								1: "You can only upload %{smart_count} files"
							},
							youHaveToAtLeastSelectX: {
								0: "You have to select at least %{smart_count} file",
								1: "You have to select at least %{smart_count} files"
							},
							exceedsSize: "%{file} exceeds maximum allowed size of %{size}",
							missingRequiredMetaField: "Missing required meta fields",
							missingRequiredMetaFieldOnFile: "Missing required meta fields in %{fileName}",
							inferiorSize: "This file is smaller than the allowed size of %{size}",
							youCanOnlyUploadFileTypes: "You can only upload: %{types}",
							noMoreFilesAllowed: "Cannot add more files",
							noDuplicates: "Cannot add the duplicate file '%{fileName}', it already exists",
							companionError: "Connection with Companion failed",
							authAborted: "Authentication aborted",
							companionUnauthorizeHint: "To unauthorize to your %{provider} account, please go to %{url}",
							failedToUpload: "Failed to upload %{file}",
							noInternetConnection: "No Internet connection",
							connectedToInternet: "Connected to the Internet",
							noFilesFound: "You have no files or folders here",
							selectX: {
								0: "Select %{smart_count}",
								1: "Select %{smart_count}"
							},
							allFilesFromFolderNamed: "All files from folder %{name}",
							openFolderNamed: "Open folder %{name}",
							cancel: "Cancel",
							logOut: "Log out",
							filter: "Filter",
							resetFilter: "Reset filter",
							loading: "Loading...",
							authenticateWithTitle: "Please authenticate with %{pluginName} to select files",
							authenticateWith: "Connect to %{pluginName}",
							signInWithGoogle: "Sign in with Google",
							searchImages: "Search for images",
							enterTextToSearch: "Enter text to search for images",
							backToSearch: "Back to Search",
							emptyFolderAdded: "No files were added from empty folder",
							folderAlreadyAdded: 'The folder "%{folder}" was already added',
							folderAdded: {
								0: "Added %{smart_count} file from %{folder}",
								1: "Added %{smart_count} files from %{folder}"
							}
						}
					};
					const t = {
						id: "uppy",
						autoProceed: !1,
						allowMultipleUploads: !0,
						allowMultipleUploadBatches: !0,
						debug: !1,
						restrictions: {
							maxFileSize: null,
							minFileSize: null,
							maxTotalFileSize: null,
							maxNumberOfFiles: null,
							minNumberOfFiles: null,
							allowedFileTypes: null,
							requiredMetaFields: []
						},
						meta: {},
						onBeforeFileAdded: e => e,
						onBeforeUpload: e => e,
						store: f(),
						logger: w,
						infoTimeout: 5e3
					};
					if (this.opts = {
							...t,
							...e,
							restrictions: {
								...t.restrictions,
								...e && e.restrictions
							}
						}, e && e.logger && e.debug ? this.log("You are using a custom `logger`, but also set `debug: true`, which uses built-in logger to output logs to console. Ignoring `debug: true` and using your custom `logger`.", "warning") : e && e.debug && (this.opts.logger = S), this.log(`Using Core v${this.constructor.VERSION}`), this.opts.restrictions.allowedFileTypes && null !== this.opts.restrictions.allowedFileTypes && !Array.isArray(this.opts.restrictions.allowedFileTypes)) throw new TypeError("`restrictions.allowedFileTypes` must be an array");
					this.i18nInit(), this.calculateProgress = c(this.calculateProgress.bind(this), 500, {
						leading: !0,
						trailing: !0
					}), this.store = this.opts.store, this.setState({
						plugins: {},
						files: {},
						currentUploads: {},
						allowNewUpload: !0,
						capabilities: {
							uploadProgress: v(),
							individualCancellation: !0,
							resumableUploads: !1
						},
						totalProgress: 0,
						meta: {
							...this.opts.meta
						},
						info: [],
						recoveredState: null
					}), n(this, E)[E] = this.store.subscribe(((e, t, i) => {
						this.emit("state-update", e, t, i), this.updateAll(t)
					})), this.opts.debug && "undefined" != typeof window && (window[this.opts.id] = this), n(this, N)[N]()
				}
				emit(e, ...t) {
					n(this, x)[x].emit(e, ...t)
				}
				on(e, t) {
					return n(this, x)[x].on(e, t), this
				}
				once(e, t) {
					return n(this, x)[x].once(e, t), this
				}
				off(e, t) {
					return n(this, x)[x].off(e, t), this
				}
				updateAll(e) {
					this.iteratePlugins((t => {
						t.update(e)
					}))
				}
				setState(e) {
					this.store.setState(e)
				}
				getState() {
					return this.store.getState()
				}
				get state() {
					return this.getState()
				}
				setFileState(e, t) {
					if (!this.getState().files[e]) throw new Error(`Can’t set state for ${e} (the file could have been removed)`);
					this.setState({
						files: {
							...this.getState().files,
							[e]: {
								...this.getState().files[e],
								...t
							}
						}
					})
				}
				i18nInit() {
					const e = new l([this.defaultLocale, this.opts.locale]);
					this.i18n = e.translate.bind(e), this.i18nArray = e.translateArray.bind(e), this.locale = e.locale
				}
				setOptions(e) {
					this.opts = {
						...this.opts,
						...e,
						restrictions: {
							...this.opts.restrictions,
							...e && e.restrictions
						}
					}, e.meta && this.setMeta(e.meta), this.i18nInit(), e.locale && this.iteratePlugins((e => {
						e.setOptions()
					})), this.setState()
				}
				resetProgress() {
					const e = {
							percentage: 0,
							bytesUploaded: 0,
							uploadComplete: !1,
							uploadStarted: null
						},
						t = {
							...this.getState().files
						},
						i = {};
					Object.keys(t).forEach((r => {
						const s = {
							...t[r]
						};
						s.progress = {
							...s.progress,
							...e
						}, i[r] = s
					})), this.setState({
						files: i,
						totalProgress: 0
					}), this.emit("reset-progress")
				}
				addPreProcessor(e) {
					n(this, _)[_].add(e)
				}
				removePreProcessor(e) {
					return n(this, _)[_].delete(e)
				}
				addPostProcessor(e) {
					n(this, O)[O].add(e)
				}
				removePostProcessor(e) {
					return n(this, O)[O].delete(e)
				}
				addUploader(e) {
					n(this, F)[F].add(e)
				}
				removeUploader(e) {
					return n(this, F)[F].delete(e)
				}
				setMeta(e) {
					const t = {
							...this.getState().meta,
							...e
						},
						i = {
							...this.getState().files
						};
					Object.keys(i).forEach((t => {
						i[t] = {
							...i[t],
							meta: {
								...i[t].meta,
								...e
							}
						}
					})), this.log("Adding metadata:"), this.log(e), this.setState({
						meta: t,
						files: i
					})
				}
				setFileMeta(e, t) {
					const i = {
						...this.getState().files
					};
					if (!i[e]) return void this.log("Was trying to set metadata for a file that has been removed: ", e);
					const r = {
						...i[e].meta,
						...t
					};
					i[e] = {
						...i[e],
						meta: r
					}, this.setState({
						files: i
					})
				}
				getFile(e) {
					return this.getState().files[e]
				}
				getFiles() {
					const {
						files: e
					} = this.getState();
					return Object.values(e)
				}
				getObjectOfFilesPerState() {
					const {
						files: e,
						totalProgress: t,
						error: i
					} = this.getState(), r = Object.values(e), s = r.filter((({
						progress: e
					}) => !e.uploadComplete && e.uploadStarted)), n = r.filter((e => !e.progress.uploadStarted)), o = r.filter((e => e.progress.uploadStarted || e.progress.preprocess || e.progress.postprocess)), a = r.filter((e => e.progress.uploadStarted)), l = r.filter((e => e.isPaused)), u = r.filter((e => e.progress.uploadComplete)), p = r.filter((e => e.error)), c = s.filter((e => !e.isPaused)), h = r.filter((e => e.progress.preprocess || e.progress.postprocess));
					return {
						newFiles: n,
						startedFiles: o,
						uploadStartedFiles: a,
						pausedFiles: l,
						completeFiles: u,
						erroredFiles: p,
						inProgressFiles: s,
						inProgressNotPausedFiles: c,
						processingFiles: h,
						isUploadStarted: a.length > 0,
						isAllComplete: 100 === t && u.length === r.length && 0 === h.length,
						isAllErrored: !!i && p.length === r.length,
						isAllPaused: 0 !== s.length && l.length === s.length,
						isUploadInProgress: s.length > 0,
						isSomeGhost: r.some((e => e.isGhost))
					}
				}
				validateRestrictions(e, t) {
					try {
						return n(this, A)[A](e, t), {
							result: !0
						}
					} catch (e) {
						return {
							result: !1,
							reason: e.message
						}
					}
				}
				checkIfFileAlreadyExists(e) {
					const {
						files: t
					} = this.getState();
					return !(!t[e] || t[e].isGhost)
				}
				addFile(e) {
					n(this, D)[D](e);
					const {
						files: t
					} = this.getState();
					let i = n(this, I)[I](t, e);
					return t[i.id] && t[i.id].isGhost && (i = {
						...t[i.id],
						data: e.data,
						isGhost: !1
					}, this.log(`Replaced the blob in the restored ghost file: ${i.name}, ${i.id}`)), this.setState({
						files: {
							...t,
							[i.id]: i
						}
					}), this.emit("file-added", i), this.emit("files-added", [i]), this.log(`Added file: ${i.name}, ${i.id}, mime type: ${i.type}`), n(this, B)[B](), i.id
				}
				addFiles(e) {
					n(this, D)[D]();
					const t = {
							...this.getState().files
						},
						i = [],
						r = [];
					for (let s = 0; s < e.length; s++) try {
						let r = n(this, I)[I](t, e[s]);
						t[r.id] && t[r.id].isGhost && (r = {
							...t[r.id],
							data: e[s].data,
							isGhost: !1
						}, this.log(`Replaced blob in a ghost file: ${r.name}, ${r.id}`)), t[r.id] = r, i.push(r)
					} catch (e) {
						e.isRestriction || r.push(e)
					}
					if (this.setState({
							files: t
						}), i.forEach((e => {
							this.emit("file-added", e)
						})), this.emit("files-added", i), i.length > 5 ? this.log(`Added batch of ${i.length} files`) : Object.keys(i).forEach((e => {
							this.log(`Added file: ${i[e].name}\n id: ${i[e].id}\n type: ${i[e].type}`)
						})), i.length > 0 && n(this, B)[B](), r.length > 0) {
						let e = "Multiple errors occurred while adding files:\n";
						if (r.forEach((t => {
								e += `\n * ${t.message}`
							})), this.info({
								message: this.i18n("addBulkFilesFailed", {
									smart_count: r.length
								}),
								details: e
							}, "error", this.opts.infoTimeout), "function" == typeof AggregateError) throw new AggregateError(r, e); {
							const t = new Error(e);
							throw t.errors = r, t
						}
					}
				}
				removeFiles(e, t) {
					const {
						files: i,
						currentUploads: r
					} = this.getState(), s = {
						...i
					}, n = {
						...r
					}, o = Object.create(null);

					function a(e) {
						return void 0 === o[e]
					}
					e.forEach((e => {
						i[e] && (o[e] = i[e], delete s[e])
					})), Object.keys(n).forEach((e => {
						const t = r[e].fileIDs.filter(a);
						0 !== t.length ? n[e] = {
							...r[e],
							fileIDs: t
						} : delete n[e]
					}));
					const l = {
						currentUploads: n,
						files: s
					};
					0 === Object.keys(s).length && (l.allowNewUpload = !0, l.error = null, l.recoveredState = null), this.setState(l), this.calculateTotalProgress();
					const u = Object.keys(o);
					u.forEach((e => {
						this.emit("file-removed", o[e], t)
					})), u.length > 5 ? this.log(`Removed ${u.length} files`) : this.log(`Removed files: ${u.join(", ")}`)
				}
				removeFile(e, t = null) {
					this.removeFiles([e], t)
				}
				pauseResume(e) {
					if (!this.getState().capabilities.resumableUploads || this.getFile(e).uploadComplete) return;
					const t = !(this.getFile(e).isPaused || !1);
					return this.setFileState(e, {
						isPaused: t
					}), this.emit("upload-pause", e, t), t
				}
				pauseAll() {
					const e = {
						...this.getState().files
					};
					Object.keys(e).filter((t => !e[t].progress.uploadComplete && e[t].progress.uploadStarted)).forEach((t => {
						const i = {
							...e[t],
							isPaused: !0
						};
						e[t] = i
					})), this.setState({
						files: e
					}), this.emit("pause-all")
				}
				resumeAll() {
					const e = {
						...this.getState().files
					};
					Object.keys(e).filter((t => !e[t].progress.uploadComplete && e[t].progress.uploadStarted)).forEach((t => {
						const i = {
							...e[t],
							isPaused: !1,
							error: null
						};
						e[t] = i
					})), this.setState({
						files: e
					}), this.emit("resume-all")
				}
				retryAll() {
					const e = {
							...this.getState().files
						},
						t = Object.keys(e).filter((t => e[t].error));
					if (t.forEach((t => {
							const i = {
								...e[t],
								isPaused: !1,
								error: null
							};
							e[t] = i
						})), this.setState({
							files: e,
							error: null
						}), this.emit("retry-all", t), 0 === t.length) return Promise.resolve({
						successful: [],
						failed: []
					});
					const i = n(this, j)[j](t, {
						forceAllowNewUpload: !0
					});
					return n(this, H)[H](i)
				}
				cancelAll() {
					this.emit("cancel-all");
					const {
						files: e
					} = this.getState(), t = Object.keys(e);
					t.length && this.removeFiles(t, "cancel-all"), this.setState({
						totalProgress: 0,
						error: null,
						recoveredState: null
					})
				}
				retryUpload(e) {
					this.setFileState(e, {
						error: null,
						isPaused: !1
					}), this.emit("upload-retry", e);
					const t = n(this, j)[j]([e], {
						forceAllowNewUpload: !0
					});
					return n(this, H)[H](t)
				}
				reset() {
					this.cancelAll()
				}
				logout() {
					this.iteratePlugins((e => {
						e.provider && e.provider.logout && e.provider.logout()
					}))
				}
				calculateProgress(e, t) {
					if (!this.getFile(e.id)) return void this.log(`Not setting progress for a file that has been removed: ${e.id}`);
					const i = Number.isFinite(t.bytesTotal) && t.bytesTotal > 0;
					this.setFileState(e.id, {
						progress: {
							...this.getFile(e.id).progress,
							bytesUploaded: t.bytesUploaded,
							bytesTotal: t.bytesTotal,
							percentage: i ? Math.round(t.bytesUploaded / t.bytesTotal * 100) : 0
						}
					}), this.calculateTotalProgress()
				}
				calculateTotalProgress() {
					const e = this.getFiles().filter((e => e.progress.uploadStarted || e.progress.preprocess || e.progress.postprocess));
					if (0 === e.length) return this.emit("progress", 0), void this.setState({
						totalProgress: 0
					});
					const t = e.filter((e => null != e.progress.bytesTotal)),
						i = e.filter((e => null == e.progress.bytesTotal));
					if (0 === t.length) {
						const t = 100 * e.length,
							r = i.reduce(((e, t) => e + t.progress.percentage), 0),
							s = Math.round(r / t * 100);
						return void this.setState({
							totalProgress: s
						})
					}
					let r = t.reduce(((e, t) => e + t.progress.bytesTotal), 0);
					const s = r / t.length;
					r += s * i.length;
					let n = 0;
					t.forEach((e => {
						n += e.progress.bytesUploaded
					})), i.forEach((e => {
						n += s * (e.progress.percentage || 0) / 100
					}));
					let o = 0 === r ? 0 : Math.round(n / r * 100);
					o > 100 && (o = 100), this.setState({
						totalProgress: o
					}), this.emit("progress", o)
				}
				updateOnlineStatus() {
					void 0 === window.navigator.onLine || window.navigator.onLine ? (this.emit("is-online"), this.wasOffline && (this.emit("back-online"), this.info(this.i18n("connectedToInternet"), "success", 3e3), this.wasOffline = !1)) : (this.emit("is-offline"), this.info(this.i18n("noInternetConnection"), "error", 0), this.wasOffline = !0)
				}
				getID() {
					return this.opts.id
				}
				use(e, t) {
					if ("function" != typeof e) {
						throw new TypeError(`Expected a plugin class, but got ${null===e?"null":typeof e}. Please verify that the plugin was imported and spelled correctly.`)
					}
					const i = new e(this, t),
						r = i.id;
					if (!r) throw new Error("Your plugin must have an id");
					if (!i.type) throw new Error("Your plugin must have a type");
					const s = this.getPlugin(r);
					if (s) {
						const e = `Already found a plugin named '${s.id}'. Tried to use: '${r}'.\nUppy plugins must have unique \`id\` options. See https://uppy.io/docs/plugins/#id.`;
						throw new Error(e)
					}
					return e.VERSION && this.log(`Using ${r} v${e.VERSION}`), i.type in n(this, C)[C] ? n(this, C)[C][i.type].push(i) : n(this, C)[C][i.type] = [i], i.install(), this
				}
				getPlugin(e) {
					for (const t of Object.values(n(this, C)[C])) {
						const i = t.find((t => t.id === e));
						if (null != i) return i
					}
				} [r](e) {
					return n(this, C)[C][e]
				}
				iteratePlugins(e) {
					Object.values(n(this, C)[C]).flat(1).forEach(e)
				}
				removePlugin(e) {
					this.log(`Removing plugin ${e.id}`), this.emit("plugin-remove", e), e.uninstall && e.uninstall();
					const t = n(this, C)[C][e.type],
						i = t.findIndex((t => t.id === e.id)); - 1 !== i && t.splice(i, 1);
					const r = {
						plugins: {
							...this.getState().plugins,
							[e.id]: void 0
						}
					};
					this.setState(r)
				}
				close() {
					this.log(`Closing Uppy instance ${this.opts.id}: removing all files and uninstalling plugins`), this.reset(), n(this, E)[E](), this.iteratePlugins((e => {
						this.removePlugin(e)
					})), "undefined" != typeof window && window.removeEventListener && (window.removeEventListener("online", n(this, M)[M]), window.removeEventListener("offline", n(this, M)[M]))
				}
				hideInfo() {
					const {
						info: e
					} = this.getState();
					this.setState({
						info: e.slice(1)
					}), this.emit("info-hidden")
				}
				info(e, t = "info", i = 3e3) {
					const r = "object" == typeof e;
					this.setState({
						info: [...this.getState().info, {
							type: t,
							message: r ? e.message : e,
							details: r ? e.details : null
						}]
					}), setTimeout((() => this.hideInfo()), i), this.emit("info-visible")
				}
				log(e, t) {
					const {
						logger: i
					} = this.opts;
					switch (t) {
						case "error":
							i.error(e);
							break;
						case "warning":
							i.warn(e);
							break;
						default:
							i.debug(e)
					}
				}
				restore(e) {
					return this.log(`Core: attempting to restore upload "${e}"`), this.getState().currentUploads[e] ? n(this, H)[H](e) : (n(this, z)[z](e), Promise.reject(new Error("Nonexistent upload")))
				} [s](...e) {
					return n(this, j)[j](...e)
				}
				addResultData(e, t) {
					if (!n(this, L)[L](e)) return void this.log(`Not setting result for an upload that has been removed: ${e}`);
					const {
						currentUploads: i
					} = this.getState(), r = {
						...i[e],
						result: {
							...i[e].result,
							...t
						}
					};
					this.setState({
						currentUploads: {
							...i,
							[e]: r
						}
					})
				}
				upload() {
					var e;
					null != (e = n(this, C)[C].uploader) && e.length || this.log("No uploader type plugins are used", "warning");
					let {
						files: t
					} = this.getState();
					const i = this.opts.onBeforeUpload(t);
					return !1 === i ? Promise.reject(new Error("Not starting the upload because onBeforeUpload returned false")) : (i && "object" == typeof i && (t = i, this.setState({
						files: t
					})), Promise.resolve().then((() => {
						n(this, T)[T](t), n(this, R)[R](t)
					})).catch((e => {
						n(this, U)[U](e)
					})).then((() => {
						const {
							currentUploads: e
						} = this.getState(), i = Object.values(e).flatMap((e => e.fileIDs)), r = [];
						Object.keys(t).forEach((e => {
							const t = this.getFile(e);
							t.progress.uploadStarted || -1 !== i.indexOf(e) || r.push(t.id)
						}));
						const s = n(this, j)[j](r);
						return n(this, H)[H](s)
					})).catch((e => {
						n(this, U)[U](e, {
							showInformer: !1
						})
					})))
				}
			}

			function q(e, t = this.getFiles()) {
				const {
					maxFileSize: i,
					minFileSize: r,
					maxTotalFileSize: s,
					maxNumberOfFiles: n,
					allowedFileTypes: o
				} = this.opts.restrictions;
				if (n && t.length + 1 > n) throw new P(`${this.i18n("youCanOnlyUploadX",{smart_count:n})}`);
				if (o) {
					if (!o.some((t => t.indexOf("/") > -1 ? !!e.type && d(e.type.replace(/;.*?$/, ""), t) : !("." !== t[0] || !e.extension) && e.extension.toLowerCase() === t.substr(1).toLowerCase()))) {
						const e = o.join(", ");
						throw new P(this.i18n("youCanOnlyUploadFileTypes", {
							types: e
						}))
					}
				}
				if (s && null != e.size) {
					let i = 0;
					if (i += e.size, t.forEach((e => {
							i += e.size
						})), i > s) throw new P(this.i18n("exceedsSize", {
						size: h(s),
						file: e.name
					}))
				}
				if (i && null != e.size && e.size > i) throw new P(this.i18n("exceedsSize", {
					size: h(i),
					file: e.name
				}));
				if (r && null != e.size && e.size < r) throw new P(this.i18n("inferiorSize", {
					size: h(r)
				}))
			}

			function V(e) {
				const {
					minNumberOfFiles: t
				} = this.opts.restrictions;
				if (Object.keys(e).length < t) throw new P(`${this.i18n("youHaveToAtLeastSelectX",{smart_count:t})}`)
			}

			function W(e) {
				const {
					requiredMetaFields: t
				} = this.opts.restrictions, {
					hasOwnProperty: i
				} = Object.prototype, r = [];
				for (const s of Object.keys(e)) {
					const e = this.getFile(s);
					for (let s = 0; s < t.length; s++)
						if (!i.call(e.meta, t[s]) || "" === e.meta[t[s]]) {
							const t = new P(`${this.i18n("missingRequiredMetaFieldOnFile",{fileName:e.name})}`);
							r.push(t), n(this, U)[U](t, {
								file: e,
								showInformer: !1,
								throwErr: !1
							})
						}
				}
				if (r.length) throw new k(`${this.i18n("missingRequiredMetaField")}`, r)
			}

			function X(e, {
				showInformer: t = !0,
				file: i = null,
				throwErr: r = !0
			} = {}) {
				const s = "object" == typeof e ? e.message : e,
					n = "object" == typeof e && e.details ? e.details : "";
				let o = s;
				if (n && (o += ` ${n}`), e.isRestriction ? (this.log(o), this.emit("restriction-failed", i, e)) : this.log(o, "error"), t && this.info({
						message: s,
						details: n
					}, "error", this.opts.infoTimeout), r) throw "object" == typeof e ? e : new Error(e)
			}

			function G(e) {
				const {
					allowNewUpload: t
				} = this.getState();
				!1 === t && n(this, U)[U](new P(this.i18n("noMoreFilesAllowed")), {
					file: e
				})
			}

			function K(e, t) {
				const i = m(t),
					r = b(i, t),
					s = g(r).extension,
					o = Boolean(t.isRemote),
					a = y({
						...t,
						type: i
					});
				if (this.checkIfFileAlreadyExists(a)) {
					const e = new P(this.i18n("noDuplicates", {
						fileName: r
					}));
					n(this, U)[U](e, {
						file: t
					})
				}
				const l = t.meta || {};
				l.name = r, l.type = i;
				const u = Number.isFinite(t.data.size) ? t.data.size : null;
				let p = {
					source: t.source || "",
					id: a,
					name: r,
					extension: s || "",
					meta: {
						...this.getState().meta,
						...l
					},
					type: i,
					data: t.data,
					progress: {
						percentage: 0,
						bytesUploaded: 0,
						bytesTotal: u,
						uploadComplete: !1,
						uploadStarted: null
					},
					size: u,
					isRemote: o,
					remote: t.remote || "",
					preview: t.preview
				};
				const c = this.opts.onBeforeFileAdded(p, e);
				!1 === c ? n(this, U)[U](new P("Cannot add the file because onBeforeFileAdded returned false."), {
					showInformer: !1,
					fileDescriptor: t
				}) : "object" == typeof c && null !== c && (p = c);
				try {
					const t = Object.keys(e).map((t => e[t]));
					n(this, A)[A](p, t)
				} catch (e) {
					n(this, U)[U](e, {
						file: p
					})
				}
				return p
			}

			function Y() {
				this.opts.autoProceed && !this.scheduledAutoProceed && (this.scheduledAutoProceed = setTimeout((() => {
					this.scheduledAutoProceed = null, this.upload().catch((e => {
						e.isRestriction || this.log(e.stack || e.message || e)
					}))
				}), 4))
			}

			function Q() {
				const e = (e, t, i) => {
					let r = e.message || "Unknown error";
					e.details && (r += ` ${e.details}`), this.setState({
						error: r
					}), null != t && t.id in this.getState().files && this.setFileState(t.id, {
						error: r,
						response: i
					})
				};
				this.on("error", e), this.on("upload-error", ((t, i, r) => {
					if (e(i, t, r), "object" == typeof i && i.message) {
						const e = new Error(i.message);
						e.details = i.message, i.details && (e.details += ` ${i.details}`), e.message = this.i18n("failedToUpload", {
							file: t.name
						}), n(this, U)[U](e, {
							throwErr: !1
						})
					} else n(this, U)[U](i, {
						throwErr: !1
					})
				})), this.on("upload", (() => {
					this.setState({
						error: null
					})
				})), this.on("upload-started", (e => {
					this.getFile(e.id) ? this.setFileState(e.id, {
						progress: {
							uploadStarted: Date.now(),
							uploadComplete: !1,
							percentage: 0,
							bytesUploaded: 0,
							bytesTotal: e.size
						}
					}) : this.log(`Not setting progress for a file that has been removed: ${e.id}`)
				})), this.on("upload-progress", this.calculateProgress), this.on("upload-success", ((e, t) => {
					if (!this.getFile(e.id)) return void this.log(`Not setting progress for a file that has been removed: ${e.id}`);
					const i = this.getFile(e.id).progress;
					this.setFileState(e.id, {
						progress: {
							...i,
							postprocess: n(this, O)[O].size > 0 ? {
								mode: "indeterminate"
							} : null,
							uploadComplete: !0,
							percentage: 100,
							bytesUploaded: i.bytesTotal
						},
						response: t,
						uploadURL: t.uploadURL,
						isPaused: !1
					}), null == e.size && this.setFileState(e.id, {
						size: t.bytesUploaded || i.bytesTotal
					}), this.calculateTotalProgress()
				})), this.on("preprocess-progress", ((e, t) => {
					this.getFile(e.id) ? this.setFileState(e.id, {
						progress: {
							...this.getFile(e.id).progress,
							preprocess: t
						}
					}) : this.log(`Not setting progress for a file that has been removed: ${e.id}`)
				})), this.on("preprocess-complete", (e => {
					if (!this.getFile(e.id)) return void this.log(`Not setting progress for a file that has been removed: ${e.id}`);
					const t = {
						...this.getState().files
					};
					t[e.id] = {
						...t[e.id],
						progress: {
							...t[e.id].progress
						}
					}, delete t[e.id].progress.preprocess, this.setState({
						files: t
					})
				})), this.on("postprocess-progress", ((e, t) => {
					this.getFile(e.id) ? this.setFileState(e.id, {
						progress: {
							...this.getState().files[e.id].progress,
							postprocess: t
						}
					}) : this.log(`Not setting progress for a file that has been removed: ${e.id}`)
				})), this.on("postprocess-complete", (e => {
					if (!this.getFile(e.id)) return void this.log(`Not setting progress for a file that has been removed: ${e.id}`);
					const t = {
						...this.getState().files
					};
					t[e.id] = {
						...t[e.id],
						progress: {
							...t[e.id].progress
						}
					}, delete t[e.id].progress.postprocess, this.setState({
						files: t
					})
				})), this.on("restored", (() => {
					this.calculateTotalProgress()
				})), "undefined" != typeof window && window.addEventListener && (window.addEventListener("online", n(this, M)[M]), window.addEventListener("offline", n(this, M)[M]), setTimeout(n(this, M)[M], 3e3))
			}

			function J(e, t = {}) {
				const {
					forceAllowNewUpload: i = !1
				} = t, {
					allowNewUpload: r,
					currentUploads: s
				} = this.getState();
				if (!r && !i) throw new Error("Cannot create a new upload: already uploading.");
				const n = p();
				return this.emit("upload", {
					id: n,
					fileIDs: e
				}), this.setState({
					allowNewUpload: !1 !== this.opts.allowMultipleUploadBatches && !1 !== this.opts.allowMultipleUploads,
					currentUploads: {
						...s,
						[n]: {
							fileIDs: e,
							step: 0,
							result: {}
						}
					}
				}), n
			}

			function Z(e) {
				const {
					currentUploads: t
				} = this.getState();
				return t[e]
			}

			function ee(e) {
				const t = {
					...this.getState().currentUploads
				};
				delete t[e], this.setState({
					currentUploads: t
				})
			}
			async function te(e) {
				let {
					currentUploads: t
				} = this.getState(), i = t[e];
				const r = i.step || 0,
					s = [...n(this, _)[_], ...n(this, F)[F], ...n(this, O)[O]];
				try {
					for (let n = r; n < s.length && i; n++) {
						const r = s[n],
							o = {
								...i,
								step: n
							};
						this.setState({
							currentUploads: {
								...t,
								[e]: o
							}
						}), await r(o.fileIDs, e), t = this.getState().currentUploads, i = t[e]
					}
				} catch (t) {
					throw this.emit("error", t), n(this, z)[z](e), t
				}
				if (i) {
					i.fileIDs.forEach((e => {
						const t = this.getFile(e);
						t && t.progress.postprocess && this.emit("postprocess-complete", t)
					}));
					const r = i.fileIDs.map((e => this.getFile(e))),
						s = r.filter((e => !e.error)),
						n = r.filter((e => e.error));
					await this.addResultData(e, {
						successful: s,
						failed: n,
						uploadID: e
					}), t = this.getState().currentUploads, i = t[e]
				}
				let o;
				return i && (o = i.result, this.emit("complete", o), n(this, z)[z](e)), null == o && this.log(`Not setting result for an upload that has been removed: ${e}`), o
			}
			$.VERSION = "2.1.1", t.exports = $
		}, {
			"./getFileName": 88,
			"./loggers": 90,
			"./supportsUploadProgress": 91,
			"@transloadit/prettier-bytes": 2,
			"@uppy/store-default": 170,
			"@uppy/utils/lib/Translator": 191,
			"@uppy/utils/lib/generateFileID": 199,
			"@uppy/utils/lib/getFileNameAndExtension": 206,
			"@uppy/utils/lib/getFileType": 207,
			"lodash.throttle": 18,
			"mime-match": 20,
			"namespace-emitter": 23,
			nanoid: 24
		}],
		88: [function(e, t, i) {
			"use strict";
			t.exports = function(e, t) {
				return t.name ? t.name : "image" === e.split("/")[0] ? `${e.split("/")[0]}.${e.split("/")[1]}` : "noname"
			}
		}, {}],
		89: [function(e, t, i) {
			"use strict";
			const r = e("./Uppy"),
				s = e("./UIPlugin"),
				n = e("./BasePlugin"),
				{
					debugLogger: o
				} = e("./loggers");
			t.exports = r, t.exports.Uppy = r, t.exports.UIPlugin = s, t.exports.BasePlugin = n, t.exports.debugLogger = o
		}, {
			"./BasePlugin": 85,
			"./UIPlugin": 86,
			"./Uppy": 87,
			"./loggers": 90
		}],
		90: [function(e, t, i) {
			"use strict";
			const r = e("@uppy/utils/lib/getTimeStamp"),
				s = {
					debug: () => {},
					warn: () => {},
					error: (...e) => console.error(`[Uppy] [${r()}]`, ...e)
				},
				n = {
					debug: (...e) => console.debug(`[Uppy] [${r()}]`, ...e),
					warn: (...e) => console.warn(`[Uppy] [${r()}]`, ...e),
					error: (...e) => console.error(`[Uppy] [${r()}]`, ...e)
				};
			t.exports = {
				justErrorsLogger: s,
				debugLogger: n
			}
		}, {
			"@uppy/utils/lib/getTimeStamp": 212
		}],
		91: [function(e, t, i) {
			"use strict";
			t.exports = function(e) {
				if (null == e && (e = "undefined" != typeof navigator ? navigator.userAgent : null), !e) return !0;
				const t = /Edge\/(\d+\.\d+)/.exec(e);
				if (!t) return !0;
				const i = t[1];
				let [r, s] = i.split(".");
				return r = parseInt(r, 10), s = parseInt(s, 10), r < 15 || 15 === r && s < 15063 || (r > 18 || 18 === r && s >= 18218)
			}
		}, {}],
		92: [function(e, t, i) {
			"use strict";
			let r;
			const {
				h: s,
				Component: n
			} = e("preact");
			r = Symbol.for("uppy test: disable unused locale key warning");
			t.exports = class extends n {
				constructor(...e) {
					super(...e), this.triggerFileInputClick = () => {
						this.fileInput.click()
					}, this.triggerFolderInputClick = () => {
						this.folderInput.click()
					}, this.onFileInputChange = e => {
						this.props.handleInputChange(e), e.target.value = null
					}, this.renderHiddenInput = (e, t) => s("input", {
						className: "uppy-Dashboard-input",
						hidden: !0,
						"aria-hidden": "true",
						tabIndex: -1,
						webkitdirectory: e,
						type: "file",
						name: "files[]",
						multiple: 1 !== this.props.maxNumberOfFiles,
						onChange: this.onFileInputChange,
						accept: this.props.allowedFileTypes,
						ref: t
					}), this.renderMyDeviceAcquirer = () => s("div", {
						className: "uppy-DashboardTab",
						role: "presentation",
						"data-uppy-acquirer-id": "MyDevice"
					}, s("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
						role: "tab",
						tabIndex: 0,
						"data-uppy-super-focusable": !0,
						onClick: this.triggerFileInputClick
					}, s("svg", {
						"aria-hidden": "true",
						focusable: "false",
						width: "32",
						height: "32",
						viewBox: "0 0 32 32"
					}, s("g", {
						fill: "none",
						fillRule: "evenodd"
					}, s("rect", {
						className: "uppy-ProviderIconBg",
						width: "32",
						height: "32",
						rx: "16",
						fill: "#2275D7"
					}), s("path", {
						d: "M21.973 21.152H9.863l-1.108-5.087h14.464l-1.246 5.087zM9.935 11.37h3.958l.886 1.444a.673.673 0 0 0 .585.316h6.506v1.37H9.935v-3.13zm14.898 3.44a.793.793 0 0 0-.616-.31h-.978v-2.126c0-.379-.275-.613-.653-.613H15.75l-.886-1.445a.673.673 0 0 0-.585-.316H9.232c-.378 0-.667.209-.667.587V14.5h-.782a.793.793 0 0 0-.61.303.795.795 0 0 0-.155.663l1.45 6.633c.078.36.396.618.764.618h13.354c.36 0 .674-.246.76-.595l1.631-6.636a.795.795 0 0 0-.144-.675z",
						fill: "#FFF"
					}))), s("div", {
						className: "uppy-DashboardTab-name"
					}, this.props.i18n("myDevice")))), this.renderBrowseButton = (e, t) => {
						const i = this.props.acquirers.length;
						return s("button", {
							type: "button",
							className: "uppy-u-reset uppy-Dashboard-browse",
							onClick: t,
							"data-uppy-super-focusable": 0 === i
						}, e)
					}, this.renderDropPasteBrowseTagline = () => {
						const e = this.props.acquirers.length,
							t = this.renderBrowseButton(this.props.i18n("browseFiles"), this.triggerFileInputClick),
							i = this.renderBrowseButton(this.props.i18n("browseFolders"), this.triggerFolderInputClick),
							r = this.props.fileManagerSelectionType,
							n = r.charAt(0).toUpperCase() + r.slice(1);
						return s("div", {
							class: "uppy-Dashboard-AddFiles-title"
						}, this.props.disableLocalFiles ? this.props.i18n("importFiles") : e > 0 ? this.props.i18nArray(`dropPasteImport${n}`, {
							browseFiles: t,
							browseFolders: i,
							browse: t
						}) : this.props.i18nArray(`dropPaste${n}`, {
							browseFiles: t,
							browseFolders: i,
							browse: t
						}))
					}, this.renderAcquirer = e => s("div", {
						className: "uppy-DashboardTab",
						role: "presentation",
						"data-uppy-acquirer-id": e.id
					}, s("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
						role: "tab",
						tabIndex: 0,
						"aria-controls": `uppy-DashboardContent-panel--${e.id}`,
						"aria-selected": this.props.activePickerPanel.id === e.id,
						"data-uppy-super-focusable": !0,
						onClick: () => this.props.showPanel(e.id)
					}, e.icon(), s("div", {
						className: "uppy-DashboardTab-name"
					}, e.name))), this.renderAcquirers = (e, t) => {
						const i = [...e],
							r = i.splice(e.length - 2, e.length);
						return s("div", {
							className: "uppy-Dashboard-AddFiles-list",
							role: "tablist"
						}, !t && this.renderMyDeviceAcquirer(), i.map((e => this.renderAcquirer(e))), s("span", {
							role: "presentation",
							style: {
								"white-space": "nowrap"
							}
						}, r.map((e => this.renderAcquirer(e)))))
					}
				} [r]() {
					this.props.i18nArray("dropPasteBoth"), this.props.i18nArray("dropPasteFiles"), this.props.i18nArray("dropPasteFolders"), this.props.i18nArray("dropPasteImportBoth"), this.props.i18nArray("dropPasteImportFiles"), this.props.i18nArray("dropPasteImportFolders")
				}
				renderPoweredByUppy() {
					const {
						i18nArray: e
					} = this.props, t = e("poweredBy", {
						uppy: s("span", null, s("svg", {
							"aria-hidden": "true",
							focusable: "false",
							className: "uppy-c-icon uppy-Dashboard-poweredByIcon",
							width: "11",
							height: "11",
							viewBox: "0 0 11 11"
						}, s("path", {
							d: "M7.365 10.5l-.01-4.045h2.612L5.5.806l-4.467 5.65h2.604l.01 4.044h3.718z",
							fillRule: "evenodd"
						})), s("span", {
							className: "uppy-Dashboard-poweredByUppy"
						}, "Uppy"))
					});
					return s("a", {
						tabIndex: "-1",
						href: "https://uppy.io",
						rel: "noreferrer noopener",
						target: "_blank",
						className: "uppy-Dashboard-poweredBy"
					}, t)
				}
				render() {
					return s("div", {
						className: "uppy-Dashboard-AddFiles"
					}, this.renderHiddenInput(!1, (e => {
						this.fileInput = e
					})), this.renderHiddenInput(!0, (e => {
						this.folderInput = e
					})), this.renderDropPasteBrowseTagline(), this.props.acquirers.length > 0 && this.renderAcquirers(this.props.acquirers, this.props.disableLocalFiles), s("div", {
						className: "uppy-Dashboard-AddFiles-info"
					}, this.props.note && s("div", {
						className: "uppy-Dashboard-note"
					}, this.props.note), this.props.proudlyDisplayPoweredByUppy && this.renderPoweredByUppy(this.props)))
				}
			}
		}, {
			preact: 28
		}],
		93: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact"), s = e("classnames"), n = e("./AddFiles");
			t.exports = e => r("div", {
				className: s("uppy-Dashboard-AddFilesPanel", e.className),
				"data-uppy-panelType": "AddFiles",
				"aria-hidden": e.showAddFilesPanel
			}, r("div", {
				className: "uppy-DashboardContent-bar"
			}, r("div", {
				className: "uppy-DashboardContent-title",
				role: "heading",
				"aria-level": "1"
			}, e.i18n("addingMoreFiles")), r("button", {
				className: "uppy-DashboardContent-back",
				type: "button",
				onClick: () => e.toggleAddFilesPanel(!1)
			}, e.i18n("back"))), r(n, e))
		}, {
			"./AddFiles": 92,
			classnames: 6,
			preact: 28
		}],
		94: [function(e, t, i) {
			"use strict";

			function r() {
				return r = Object.assign || function(e) {
					for (var t = 1; t < arguments.length; t++) {
						var i = arguments[t];
						for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r])
					}
					return e
				}, r.apply(this, arguments)
			}
			const {
				h: s
			} = e("preact"), n = e("classnames"), o = e("@uppy/utils/lib/isDragDropSupported"), a = e("./FileList"), l = e("./AddFiles"), u = e("./AddFilesPanel"), p = e("./PickerPanelContent"), c = e("./EditorPanel"), h = e("./PickerPanelTopBar"), d = e("./FileCard"), f = e("./Slide");
			t.exports = function(e) {
				const t = 0 === e.totalFileCount,
					i = e.containerWidth > 576,
					m = n({
						"uppy-Root": e.isTargetDOMEl
					}),
					g = n({
						"uppy-Dashboard": !0,
						"uppy-Dashboard--isDisabled": e.disabled,
						"uppy-Dashboard--animateOpenClose": e.animateOpenClose,
						"uppy-Dashboard--isClosing": e.isClosing,
						"uppy-Dashboard--isDraggingOver": e.isDraggingOver,
						"uppy-Dashboard--modal": !e.inline,
						"uppy-size--md": e.containerWidth > 576,
						"uppy-size--lg": e.containerWidth > 700,
						"uppy-size--xl": e.containerWidth > 900,
						"uppy-size--height-md": e.containerHeight > 400,
						"uppy-Dashboard--isAddFilesPanelVisible": e.showAddFilesPanel,
						"uppy-Dashboard--isInnerWrapVisible": e.areInsidesReadyToBeVisible
					});
				let y = 1;
				e.containerWidth > 900 ? y = 5 : e.containerWidth > 700 ? y = 4 : e.containerWidth > 576 && (y = 3);
				const v = e.showSelectedFiles && !t,
					b = e.recoveredState ? Object.keys(e.recoveredState.files).length : null,
					w = e.files ? Object.keys(e.files).filter((t => e.files[t].isGhost)).length : null,
					S = s("div", {
						className: g,
						"data-uppy-theme": e.theme,
						"data-uppy-num-acquirers": e.acquirers.length,
						"data-uppy-drag-drop-supported": !e.disableLocalFiles && o(),
						"aria-hidden": e.inline ? "false" : e.isHidden,
						"aria-disabled": e.disabled,
						"aria-label": e.inline ? e.i18n("dashboardTitle") : e.i18n("dashboardWindowTitle"),
						onPaste: e.handlePaste,
						onDragOver: e.handleDragOver,
						onDragLeave: e.handleDragLeave,
						onDrop: e.handleDrop
					}, s("div", {
						"aria-hidden": "true",
						className: "uppy-Dashboard-overlay",
						tabIndex: -1,
						onClick: e.handleClickOutside
					}), s("div", {
						className: "uppy-Dashboard-inner",
						"aria-modal": !e.inline && "true",
						role: !e.inline && "dialog",
						style: {
							width: e.inline && e.width ? e.width : "",
							height: e.inline && e.height ? e.height : ""
						}
					}, e.inline ? null : s("button", {
						className: "uppy-u-reset uppy-Dashboard-close",
						type: "button",
						"aria-label": e.i18n("closeModal"),
						title: e.i18n("closeModal"),
						onClick: e.closeModal
					}, s("span", {
						"aria-hidden": "true"
					}, "×")), s("div", {
						className: "uppy-Dashboard-innerWrap"
					}, s("div", {
						className: "uppy-Dashboard-dropFilesHereHint"
					}, e.i18n("dropHint")), v && s(h, e), b && s("div", {
						className: "uppy-Dashboard-serviceMsg"
					}, s("svg", {
						className: "uppy-Dashboard-serviceMsg-icon",
						"aria-hidden": "true",
						focusable: "false",
						width: "21",
						height: "16",
						viewBox: "0 0 24 19"
					}, s("g", {
						transform: "translate(0 -1)",
						fill: "none",
						fillRule: "evenodd"
					}, s("path", {
						d: "M12.857 1.43l10.234 17.056A1 1 0 0122.234 20H1.766a1 1 0 01-.857-1.514L11.143 1.429a1 1 0 011.714 0z",
						fill: "#FFD300"
					}), s("path", {
						fill: "#000",
						d: "M11 6h2l-.3 8h-1.4z"
					}), s("circle", {
						fill: "#000",
						cx: "12",
						cy: "17",
						r: "1"
					}))), s("strong", {
						className: "uppy-Dashboard-serviceMsg-title"
					}, e.i18n("sessionRestored")), s("div", {
						className: "uppy-Dashboard-serviceMsg-text"
					}, w > 0 ? e.i18n("recoveredXFiles", {
						smart_count: w
					}) : e.i18n("recoveredAllFiles"))), v ? s(a, r({}, e, {
						itemsPerRow: y
					})) : s(l, r({}, e, {
						isSizeMD: i
					})), s(f, null, e.showAddFilesPanel ? s(u, r({
						key: "AddFiles"
					}, e, {
						isSizeMD: i
					})) : null), s(f, null, e.fileCardFor ? s(d, r({
						key: "FileCard"
					}, e)) : null), s(f, null, e.activePickerPanel ? s(p, r({
						key: "Picker"
					}, e)) : null), s(f, null, e.showFileEditor ? s(c, r({
						key: "Editor"
					}, e)) : null), s("div", {
						className: "uppy-Dashboard-progressindicators"
					}, e.progressindicators.map((t => e.uppy.getPlugin(t.id).render(e.state)))))));
				return s("div", {
					className: m,
					dir: e.direction
				}, S)
			}
		}, {
			"./AddFiles": 92,
			"./AddFilesPanel": 93,
			"./EditorPanel": 95,
			"./FileCard": 96,
			"./FileList": 102,
			"./PickerPanelContent": 104,
			"./PickerPanelTopBar": 105,
			"./Slide": 106,
			"@uppy/utils/lib/isDragDropSupported": 215,
			classnames: 6,
			preact: 28
		}],
		95: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact"), s = e("classnames");
			t.exports = function(e) {
				const t = e.files[e.fileCardFor];
				return r("div", {
					className: s("uppy-DashboardContent-panel", e.className),
					role: "tabpanel",
					"data-uppy-panelType": "FileEditor",
					id: "uppy-DashboardContent-panel--editor"
				}, r("div", {
					className: "uppy-DashboardContent-bar"
				}, r("div", {
					className: "uppy-DashboardContent-title",
					role: "heading",
					"aria-level": "1"
				}, e.i18nArray("editing", {
					file: r("span", {
						className: "uppy-DashboardContent-titleFile"
					}, t.meta ? t.meta.name : t.name)
				})), r("button", {
					className: "uppy-DashboardContent-back",
					type: "button",
					onClick: e.hideAllPanels
				}, e.i18n("cancel")), r("button", {
					className: "uppy-DashboardContent-save",
					type: "button",
					onClick: e.saveFileEditor
				}, e.i18n("save"))), r("div", {
					className: "uppy-DashboardContent-panelBody"
				}, e.editors.map((t => e.uppy.getPlugin(t.id).render(e.state)))))
			}
		}, {
			classnames: 6,
			preact: 28
		}],
		96: [function(e, t, i) {
			"use strict";
			const {
				h: r,
				Component: s
			} = e("preact"), n = e("classnames"), {
				nanoid: o
			} = e("nanoid"), a = e("../../utils/getFileTypeIcon"), l = e("../../utils/ignoreEvent.js"), u = e("../FilePreview");
			t.exports = class extends s {
				constructor(e) {
					super(e), this.form = document.createElement("form"), this.updateMeta = (e, t) => {
						this.setState((({
							formState: i
						}) => ({
							formState: {
								...i,
								[t]: e
							}
						})))
					}, this.handleSave = e => {
						e.preventDefault();
						const t = this.props.fileCardFor;
						this.props.saveFileCard(this.state.formState, t)
					}, this.handleCancel = () => {
						this.props.toggleFileCard(!1)
					}, this.saveOnEnter = e => {
						if (13 === e.keyCode) {
							e.stopPropagation(), e.preventDefault();
							const t = this.props.files[this.props.fileCardFor];
							this.props.saveFileCard(this.state.formState, t.id)
						}
					}, this.renderMetaFields = () => {
						const e = this.getMetaFields() || [],
							t = {
								text: "uppy-u-reset uppy-c-textInput uppy-Dashboard-FileCard-input"
							};
						return e.map((e => {
							const i = `uppy-Dashboard-FileCard-input-${e.id}`,
								s = this.props.requiredMetaFields.includes(e.id);
							return r("fieldset", {
								key: e.id,
								className: "uppy-Dashboard-FileCard-fieldset"
							}, r("label", {
								className: "uppy-Dashboard-FileCard-label",
								htmlFor: i
							}, e.name), void 0 !== e.render ? e.render({
								value: this.state.formState[e.id],
								onChange: t => this.updateMeta(t, e.id),
								fieldCSSClasses: t,
								required: s,
								form: this.form.id
							}, r) : r("input", {
								className: t.text,
								id: i,
								form: this.form.id,
								type: e.type || "text",
								required: s,
								value: this.state.formState[e.id],
								placeholder: e.placeholder,
								onKeyUp: "form" in HTMLInputElement.prototype ? void 0 : this.saveOnEnter,
								onKeyDown: "form" in HTMLInputElement.prototype ? void 0 : this.saveOnEnter,
								onKeyPress: "form" in HTMLInputElement.prototype ? void 0 : this.saveOnEnter,
								onInput: t => this.updateMeta(t.target.value, e.id),
								"data-uppy-super-focusable": !0
							}))
						}))
					};
					const t = this.props.files[this.props.fileCardFor],
						i = this.getMetaFields() || [],
						s = {};
					i.forEach((e => {
						s[e.id] = t.meta[e.id] || ""
					})), this.state = {
						formState: s
					}, this.form.id = o()
				}
				componentWillMount() {
					this.form.addEventListener("submit", this.handleSave), document.body.appendChild(this.form)
				}
				componentWillUnmount() {
					this.form.removeEventListener("submit", this.handleSave), document.body.removeChild(this.form)
				}
				getMetaFields() {
					return "function" == typeof this.props.metaFields ? this.props.metaFields(this.props.files[this.props.fileCardFor]) : this.props.metaFields
				}
				render() {
					const e = this.props.files[this.props.fileCardFor],
						t = this.props.canEditFile(e);
					return r("div", {
						className: n("uppy-Dashboard-FileCard", this.props.className),
						"data-uppy-panelType": "FileCard",
						onDragOver: l,
						onDragLeave: l,
						onDrop: l,
						onPaste: l
					}, r("div", {
						className: "uppy-DashboardContent-bar"
					}, r("div", {
						className: "uppy-DashboardContent-title",
						role: "heading",
						"aria-level": "1"
					}, this.props.i18nArray("editing", {
						file: r("span", {
							className: "uppy-DashboardContent-titleFile"
						}, e.meta ? e.meta.name : e.name)
					})), r("button", {
						className: "uppy-DashboardContent-back",
						type: "button",
						form: this.form.id,
						title: this.props.i18n("finishEditingFile"),
						onClick: this.handleCancel
					}, this.props.i18n("cancel"))), r("div", {
						className: "uppy-Dashboard-FileCard-inner"
					}, r("div", {
						className: "uppy-Dashboard-FileCard-preview",
						style: {
							backgroundColor: a(e.type).color
						}
					}, r(u, {
						file: e
					}), t && r("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn uppy-Dashboard-FileCard-edit",
						onClick: () => this.props.openFileEditor(e),
						form: this.form.id
					}, this.props.i18n("editFile"))), r("div", {
						className: "uppy-Dashboard-FileCard-info"
					}, this.renderMetaFields()), r("div", {
						className: "uppy-Dashboard-FileCard-actions"
					}, r("button", {
						className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-FileCard-actionsBtn",
						type: "form" in HTMLButtonElement.prototype ? "submit" : "button",
						onClick: "form" in HTMLButtonElement.prototype ? void 0 : this.handleSave,
						form: this.form.id
					}, this.props.i18n("saveChanges")), r("button", {
						className: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-FileCard-actionsBtn",
						type: "button",
						onClick: this.handleCancel,
						form: this.form.id
					}, this.props.i18n("cancel")))))
				}
			}
		}, {
			"../../utils/getFileTypeIcon": 112,
			"../../utils/ignoreEvent.js": 113,
			"../FilePreview": 103,
			classnames: 6,
			nanoid: 24,
			preact: 28
		}],
		97: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact"), s = e("../../../utils/copyToClipboard");

			function n({
				file: e,
				uploadInProgressOrComplete: t,
				metaFields: i,
				canEditFile: s,
				i18n: n,
				onClick: o
			}) {
				return !t && i && i.length > 0 || !t && s(e) ? r("button", {
					className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit",
					type: "button",
					"aria-label": n("editFileWithFilename", {
						file: e.meta.name
					}),
					title: n("editFileWithFilename", {
						file: e.meta.name
					}),
					onClick: () => o()
				}, r("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon",
					width: "14",
					height: "14",
					viewBox: "0 0 14 14"
				}, r("g", {
					fillRule: "evenodd"
				}, r("path", {
					d: "M1.5 10.793h2.793A1 1 0 0 0 5 10.5L11.5 4a1 1 0 0 0 0-1.414L9.707.793a1 1 0 0 0-1.414 0l-6.5 6.5A1 1 0 0 0 1.5 8v2.793zm1-1V8L9 1.5l1.793 1.793-6.5 6.5H2.5z",
					fillRule: "nonzero"
				}), r("rect", {
					x: "1",
					y: "12.293",
					width: "11",
					height: "1",
					rx: ".5"
				}), r("path", {
					fillRule: "nonzero",
					d: "M6.793 2.5L9.5 5.207l.707-.707L7.5 1.793z"
				})))) : null
			}

			function o({
				i18n: e,
				onClick: t,
				file: i
			}) {
				return r("button", {
					className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--remove",
					type: "button",
					"aria-label": e("removeFile", {
						file: i.meta.name
					}),
					title: e("removeFile", {
						file: i.meta.name
					}),
					onClick: () => t()
				}, r("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon",
					width: "18",
					height: "18",
					viewBox: "0 0 18 18"
				}, r("path", {
					d: "M9 0C4.034 0 0 4.034 0 9s4.034 9 9 9 9-4.034 9-9-4.034-9-9-9z"
				}), r("path", {
					fill: "#FFF",
					d: "M13 12.222l-.778.778L9 9.778 5.778 13 5 12.222 8.222 9 5 5.778 5.778 5 9 8.222 12.222 5l.778.778L9.778 9z"
				})))
			}

			function a(e) {
				const {
					i18n: t
				} = e;
				return r("button", {
					className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--copyLink",
					type: "button",
					"aria-label": t("copyLink"),
					title: t("copyLink"),
					onClick: t => ((e, t) => {
						s(t.file.uploadURL, t.i18n("copyLinkToClipboardFallback")).then((() => {
							t.uppy.log("Link copied to clipboard."), t.uppy.info(t.i18n("copyLinkToClipboardSuccess"), "info", 3e3)
						})).catch(t.uppy.log).then((() => e.target.focus({
							preventScroll: !0
						})))
					})(t, e)
				}, r("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon",
					width: "14",
					height: "14",
					viewBox: "0 0 14 12"
				}, r("path", {
					d: "M7.94 7.703a2.613 2.613 0 0 1-.626 2.681l-.852.851a2.597 2.597 0 0 1-1.849.766A2.616 2.616 0 0 1 2.764 7.54l.852-.852a2.596 2.596 0 0 1 2.69-.625L5.267 7.099a1.44 1.44 0 0 0-.833.407l-.852.851a1.458 1.458 0 0 0 1.03 2.486c.39 0 .755-.152 1.03-.426l.852-.852c.231-.231.363-.522.406-.824l1.04-1.038zm4.295-5.937A2.596 2.596 0 0 0 10.387 1c-.698 0-1.355.272-1.849.766l-.852.851a2.614 2.614 0 0 0-.624 2.688l1.036-1.036c.041-.304.173-.6.407-.833l.852-.852c.275-.275.64-.426 1.03-.426a1.458 1.458 0 0 1 1.03 2.486l-.852.851a1.442 1.442 0 0 1-.824.406l-1.04 1.04a2.596 2.596 0 0 0 2.683-.628l.851-.85a2.616 2.616 0 0 0 0-3.697zm-6.88 6.883a.577.577 0 0 0 .82 0l3.474-3.474a.579.579 0 1 0-.819-.82L5.355 7.83a.579.579 0 0 0 0 .819z"
				})))
			}
			t.exports = function(e) {
				const {
					uppy: t,
					file: i,
					uploadInProgressOrComplete: s,
					canEditFile: l,
					metaFields: u,
					showLinkToFileUploadResult: p,
					showRemoveButton: c,
					i18n: h,
					toggleFileCard: d,
					openFileEditor: f
				} = e;
				return r("div", {
					className: "uppy-Dashboard-Item-actionWrapper"
				}, r(n, {
					i18n: h,
					file: i,
					uploadInProgressOrComplete: s,
					canEditFile: l,
					metaFields: u,
					onClick: () => {
						u && u.length > 0 ? d(!0, i.id) : f(i)
					}
				}), p && i.uploadURL ? r(a, {
					file: i,
					uppy: t,
					i18n: h
				}) : null, c ? r(o, {
					i18n: h,
					file: i,
					uppy: t,
					onClick: () => e.uppy.removeFile(i.id, "removed-by-user")
				}) : null)
			}
		}, {
			"../../../utils/copyToClipboard": 109,
			preact: 28
		}],
		98: [function(e, t, i) {
			"use strict";
			const {
				h: r,
				Fragment: s
			} = e("preact"), n = e("@transloadit/prettier-bytes"), o = e("@uppy/utils/lib/truncateString"), a = ({
				file: e,
				onClick: t
			}) => e.error ? r("button", {
				className: "uppy-Dashboard-Item-errorDetails",
				"aria-label": e.error,
				"data-microtip-position": "bottom",
				"data-microtip-size": "medium",
				onClick: t,
				type: "button"
			}, "?") : null;
			t.exports = function(e) {
				return r("div", {
					className: "uppy-Dashboard-Item-fileInfo",
					"data-uppy-file-source": e.file.source
				}, (e => {
					const {
						author: t,
						name: i
					} = e.file.meta;
					return r("div", {
						className: "uppy-Dashboard-Item-name",
						title: i
					}, o(i, e.containerWidth <= 352 ? 35 : e.containerWidth <= 576 ? 60 : t ? 20 : 30))
				})(e), r("div", {
					className: "uppy-Dashboard-Item-status"
				}, (e => {
					const {
						author: t
					} = e.file.meta, {
						providerName: i
					} = e.file.remote;
					return t ? r("div", {
						className: "uppy-Dashboard-Item-author"
					}, r("a", {
						href: `${t.url}?utm_source=Companion&utm_medium=referral`,
						target: "_blank",
						rel: "noopener noreferrer"
					}, o(t.name, 13)), i ? r(s, null, " · ", i) : null) : null
				})(e), (e => e.file.size && r("div", {
					className: "uppy-Dashboard-Item-statusSize"
				}, n(e.file.size)))(e), (e => e.file.isGhost && r("span", null, " • ", r("button", {
					className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-reSelect",
					type: "button",
					onClick: e.toggleAddFilesPanel
				}, e.i18n("reSelect"))))(e), r(a, {
					file: e.file,
					onClick: () => alert(e.file.error)
				})))
			}
		}, {
			"@transloadit/prettier-bytes": 2,
			"@uppy/utils/lib/truncateString": 225,
			preact: 28
		}],
		99: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact"), s = e("../../FilePreview"), n = e("../../../utils/getFileTypeIcon");
			t.exports = function(e) {
				return r("div", {
					className: "uppy-Dashboard-Item-previewInnerWrap",
					style: {
						backgroundColor: n(e.file.type).color
					}
				}, e.showLinkToFileUploadResult && e.file.uploadURL && r("a", {
					className: "uppy-Dashboard-Item-previewLink",
					href: e.file.uploadURL,
					rel: "noreferrer noopener",
					target: "_blank",
					"aria-label": e.file.meta.name
				}, r("span", {
					hidden: !0
				}, "props.file.meta.name")), r(s, {
					file: e.file
				}))
			}
		}, {
			"../../../utils/getFileTypeIcon": 112,
			"../../FilePreview": 103,
			preact: 28
		}],
		100: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");

			function s(e) {
				return e.isUploaded ? e.i18n("uploadComplete") : e.error ? e.i18n("retryUpload") : e.resumableUploads ? e.file.isPaused ? e.i18n("resumeUpload") : e.i18n("pauseUpload") : e.individualCancellation ? e.i18n("cancelUpload") : ""
			}

			function n(e) {
				return r("div", {
					className: "uppy-Dashboard-Item-progress"
				}, r("button", {
					className: "uppy-u-reset uppy-Dashboard-Item-progressIndicator",
					type: "button",
					"aria-label": s(e),
					title: s(e),
					onClick: () => function(e) {
						e.isUploaded || (!e.error || e.hideRetryButton ? e.resumableUploads && !e.hidePauseResumeButton ? e.uppy.pauseResume(e.file.id) : e.individualCancellation && !e.hideCancelButton && e.uppy.removeFile(e.file.id) : e.uppy.retryUpload(e.file.id))
					}(e)
				}, e.children))
			}

			function o({
				children: e
			}) {
				return r("svg", {
					"aria-hidden": "true",
					focusable: "false",
					width: "70",
					height: "70",
					viewBox: "0 0 36 36",
					className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--circle"
				}, e)
			}

			function a({
				progress: e
			}) {
				const t = 2 * Math.PI * 15;
				return r("g", null, r("circle", {
					className: "uppy-Dashboard-Item-progressIcon--bg",
					r: "15",
					cx: "18",
					cy: "18",
					"stroke-width": "2",
					fill: "none"
				}), r("circle", {
					className: "uppy-Dashboard-Item-progressIcon--progress",
					r: "15",
					cx: "18",
					cy: "18",
					transform: "rotate(-90, 18, 18)",
					fill: "none",
					"stroke-width": "2",
					"stroke-dasharray": t,
					"stroke-dashoffset": t - t / 100 * e
				}))
			}
			t.exports = function(e) {
				return e.file.progress.uploadStarted ? e.isUploaded ? r("div", {
					className: "uppy-Dashboard-Item-progress"
				}, r("div", {
					className: "uppy-Dashboard-Item-progressIndicator"
				}, r(o, null, r("circle", {
					r: "15",
					cx: "18",
					cy: "18",
					fill: "#1bb240"
				}), r("polygon", {
					className: "uppy-Dashboard-Item-progressIcon--check",
					transform: "translate(2, 3)",
					points: "14 22.5 7 15.2457065 8.99985857 13.1732815 14 18.3547104 22.9729883 9 25 11.1005634"
				})))) : e.recoveredState ? void 0 : e.error && !e.hideRetryButton ? r(n, e, r("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--retry",
					width: "28",
					height: "31",
					viewBox: "0 0 16 19"
				}, r("path", {
					d: "M16 11a8 8 0 1 1-8-8v2a6 6 0 1 0 6 6h2z"
				}), r("path", {
					d: "M7.9 3H10v2H7.9z"
				}), r("path", {
					d: "M8.536.5l3.535 3.536-1.414 1.414L7.12 1.914z"
				}), r("path", {
					d: "M10.657 2.621l1.414 1.415L8.536 7.57 7.12 6.157z"
				}))) : e.resumableUploads && !e.hidePauseResumeButton ? r(n, e, r(o, null, r(a, {
					progress: e.file.progress.percentage
				}), e.file.isPaused ? r("polygon", {
					className: "uppy-Dashboard-Item-progressIcon--play",
					transform: "translate(3, 3)",
					points: "12 20 12 10 20 15"
				}) : r("g", {
					className: "uppy-Dashboard-Item-progressIcon--pause",
					transform: "translate(14.5, 13)"
				}, r("rect", {
					x: "0",
					y: "0",
					width: "2",
					height: "10",
					rx: "0"
				}), r("rect", {
					x: "5",
					y: "0",
					width: "2",
					height: "10",
					rx: "0"
				})))) : e.resumableUploads || !e.individualCancellation || e.hideCancelButton ? r("div", {
					className: "uppy-Dashboard-Item-progress"
				}, r("div", {
					className: "uppy-Dashboard-Item-progressIndicator"
				}, r(o, null, r(a, {
					progress: e.file.progress.percentage
				})))) : r(n, e, r(o, null, r(a, {
					progress: e.file.progress.percentage
				}), r("polygon", {
					className: "cancel",
					transform: "translate(2, 2)",
					points: "19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12"
				}))) : null
			}
		}, {
			preact: 28
		}],
		101: [function(e, t, i) {
			"use strict";
			const {
				h: r,
				Component: s
			} = e("preact"), n = e("classnames"), o = e("is-shallow-equal"), a = e("./FilePreviewAndLink"), l = e("./FileProgress"), u = e("./FileInfo"), p = e("./Buttons");
			t.exports = class extends s {
				componentDidMount() {
					const {
						file: e
					} = this.props;
					e.preview || this.props.handleRequestThumbnail(e)
				}
				shouldComponentUpdate(e) {
					return !o(this.props, e)
				}
				componentDidUpdate() {
					const {
						file: e
					} = this.props;
					e.preview || this.props.handleRequestThumbnail(e)
				}
				componentWillUnmount() {
					const {
						file: e
					} = this.props;
					e.preview || this.props.handleCancelThumbnail(e)
				}
				render() {
					const {
						file: e
					} = this.props, t = e.progress.preprocess || e.progress.postprocess, i = e.progress.uploadComplete && !t && !e.error, s = e.progress.uploadStarted || t, o = e.progress.uploadStarted && !e.progress.uploadComplete || t, c = e.error || !1, {
						isGhost: h
					} = e;
					let d = (this.props.individualCancellation || !o) && !i;
					i && this.props.showRemoveButtonAfterComplete && (d = !0);
					const f = n({
						"uppy-Dashboard-Item": !0,
						"is-inprogress": o && !this.props.recoveredState,
						"is-processing": t,
						"is-complete": i,
						"is-error": !!c,
						"is-resumable": this.props.resumableUploads,
						"is-noIndividualCancellation": !this.props.individualCancellation,
						"is-ghost": h
					});
					return r("div", {
						className: f,
						id: `uppy_${e.id}`,
						role: this.props.role
					}, r("div", {
						className: "uppy-Dashboard-Item-preview"
					}, r(a, {
						file: e,
						showLinkToFileUploadResult: this.props.showLinkToFileUploadResult
					}), r(l, {
						uppy: this.props.uppy,
						file: e,
						error: c,
						isUploaded: i,
						hideRetryButton: this.props.hideRetryButton,
						hideCancelButton: this.props.hideCancelButton,
						hidePauseResumeButton: this.props.hidePauseResumeButton,
						recoveredState: this.props.recoveredState,
						showRemoveButtonAfterComplete: this.props.showRemoveButtonAfterComplete,
						resumableUploads: this.props.resumableUploads,
						individualCancellation: this.props.individualCancellation,
						i18n: this.props.i18n
					})), r("div", {
						className: "uppy-Dashboard-Item-fileInfoAndButtons"
					}, r(u, {
						file: e,
						id: this.props.id,
						acquirers: this.props.acquirers,
						containerWidth: this.props.containerWidth,
						i18n: this.props.i18n,
						toggleAddFilesPanel: this.props.toggleAddFilesPanel
					}), r(p, {
						file: e,
						metaFields: this.props.metaFields,
						showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
						showRemoveButton: d,
						canEditFile: this.props.canEditFile,
						uploadInProgressOrComplete: s,
						toggleFileCard: this.props.toggleFileCard,
						openFileEditor: this.props.openFileEditor,
						uppy: this.props.uppy,
						i18n: this.props.i18n
					})))
				}
			}
		}, {
			"./Buttons": 97,
			"./FileInfo": 98,
			"./FilePreviewAndLink": 99,
			"./FileProgress": 100,
			classnames: 6,
			"is-shallow-equal": 15,
			preact: 28
		}],
		102: [function(e, t, i) {
			"use strict";

			function r() {
				return r = Object.assign || function(e) {
					for (var t = 1; t < arguments.length; t++) {
						var i = arguments[t];
						for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r])
					}
					return e
				}, r.apply(this, arguments)
			}
			const s = e("classnames"),
				{
					h: n
				} = e("preact"),
				o = e("./FileItem/index.js"),
				a = e("./VirtualList");
			t.exports = e => {
				const t = 0 === e.totalFileCount,
					i = s("uppy-Dashboard-files", {
						"uppy-Dashboard-files--noFiles": t
					}),
					l = 1 === e.itemsPerRow ? 71 : 200,
					u = {
						id: e.id,
						error: e.error,
						i18n: e.i18n,
						uppy: e.uppy,
						acquirers: e.acquirers,
						resumableUploads: e.resumableUploads,
						individualCancellation: e.individualCancellation,
						hideRetryButton: e.hideRetryButton,
						hidePauseResumeButton: e.hidePauseResumeButton,
						hideCancelButton: e.hideCancelButton,
						showLinkToFileUploadResult: e.showLinkToFileUploadResult,
						showRemoveButtonAfterComplete: e.showRemoveButtonAfterComplete,
						isWide: e.isWide,
						metaFields: e.metaFields,
						recoveredState: e.recoveredState,
						toggleFileCard: e.toggleFileCard,
						handleRequestThumbnail: e.handleRequestThumbnail,
						handleCancelThumbnail: e.handleCancelThumbnail
					},
					p = Object.keys(e.files);
				e.recoveredState && p.sort(((t, i) => e.files[i].isGhost - e.files[t].isGhost));
				const c = function(e, t) {
					const i = [];
					let r = [];
					return e.forEach((e => {
						r.length < t ? r.push(e) : (i.push(r), r = [e])
					})), r.length && i.push(r), i
				}(p, e.itemsPerRow);
				return n(a, {
					class: i,
					role: "list",
					data: c,
					renderRow: t => n("div", {
						role: "presentation",
						key: t[0]
					}, t.map((t => n(o, r({
						key: t,
						uppy: e.uppy
					}, u, {
						role: "listitem",
						openFileEditor: e.openFileEditor,
						canEditFile: e.canEditFile,
						toggleAddFilesPanel: e.toggleAddFilesPanel,
						file: e.files[t]
					}))))),
					rowHeight: l
				})
			}
		}, {
			"./FileItem/index.js": 101,
			"./VirtualList": 107,
			classnames: 6,
			preact: 28
		}],
		103: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact"), s = e("../utils/getFileTypeIcon");
			t.exports = function(e) {
				const {
					file: t
				} = e;
				if (t.preview) return r("img", {
					className: "uppy-Dashboard-Item-previewImg",
					alt: t.name,
					src: t.preview
				});
				const {
					color: i,
					icon: n
				} = s(t.type);
				return r("div", {
					className: "uppy-Dashboard-Item-previewIconWrap"
				}, r("span", {
					className: "uppy-Dashboard-Item-previewIcon",
					style: {
						color: i
					}
				}, n), r("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-Dashboard-Item-previewIconBg",
					width: "58",
					height: "76",
					viewBox: "0 0 58 76"
				}, r("rect", {
					fill: "#FFF",
					width: "58",
					height: "76",
					rx: "3",
					fillRule: "evenodd"
				})))
			}
		}, {
			"../utils/getFileTypeIcon": 112,
			preact: 28
		}],
		104: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact"), s = e("classnames"), n = e("../utils/ignoreEvent.js");
			t.exports = function(e) {
				return r("div", {
					className: s("uppy-DashboardContent-panel", e.className),
					role: "tabpanel",
					"data-uppy-panelType": "PickerPanel",
					id: `uppy-DashboardContent-panel--${e.activePickerPanel.id}`,
					onDragOver: n,
					onDragLeave: n,
					onDrop: n,
					onPaste: n
				}, r("div", {
					className: "uppy-DashboardContent-bar"
				}, r("div", {
					className: "uppy-DashboardContent-title",
					role: "heading",
					"aria-level": "1"
				}, e.i18n("importFrom", {
					name: e.activePickerPanel.name
				})), r("button", {
					className: "uppy-DashboardContent-back",
					type: "button",
					onClick: e.hideAllPanels
				}, e.i18n("cancel"))), r("div", {
					className: "uppy-DashboardContent-panelBody"
				}, e.uppy.getPlugin(e.activePickerPanel.id).render(e.state)))
			}
		}, {
			"../utils/ignoreEvent.js": 113,
			classnames: 6,
			preact: 28
		}],
		105: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact"), s = "error", n = "waiting", o = "preprocessing", a = "uploading", l = "postprocessing", u = "complete", p = "paused";

			function c(e) {
				switch (function(e, t, i, r = {}) {
					if (e) return s;
					if (t) return u;
					if (i) return p;
					let c = n;
					const h = Object.keys(r);
					for (let e = 0; e < h.length; e++) {
						const {
							progress: t
						} = r[h[e]];
						if (t.uploadStarted && !t.uploadComplete) return a;
						t.preprocess && c !== a && (c = o), t.postprocess && c !== a && c !== o && (c = l)
					}
					return c
				}(e.isAllErrored, e.isAllComplete, e.isAllPaused, e.files)) {
					case "uploading":
						return e.i18n("uploadingXFiles", {
							smart_count: e.inProgressNotPausedFiles.length
						});
					case "preprocessing":
					case "postprocessing":
						return e.i18n("processingXFiles", {
							smart_count: e.processingFiles.length
						});
					case "paused":
						return e.i18n("uploadPaused");
					case "waiting":
						return e.i18n("xFilesSelected", {
							smart_count: e.newFiles.length
						});
					case "complete":
						return e.i18n("uploadComplete")
				}
			}
			t.exports = function(e) {
				let {
					allowNewUpload: t
				} = e;
				return t && e.maxNumberOfFiles && (t = e.totalFileCount < e.maxNumberOfFiles), r("div", {
					className: "uppy-DashboardContent-bar"
				}, e.isAllComplete || e.hideCancelButton ? r("div", null) : r("button", {
					className: "uppy-DashboardContent-back",
					type: "button",
					onClick: () => e.uppy.cancelAll()
				}, e.i18n("cancel")), r("div", {
					className: "uppy-DashboardContent-title",
					role: "heading",
					"aria-level": "1"
				}, r(c, e)), t ? r("button", {
					className: "uppy-DashboardContent-addMore",
					type: "button",
					"aria-label": e.i18n("addMoreFiles"),
					title: e.i18n("addMoreFiles"),
					onClick: () => e.toggleAddFilesPanel(!0)
				}, r("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon",
					width: "15",
					height: "15",
					viewBox: "0 0 15 15"
				}, r("path", {
					d: "M8 6.5h6a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8v6a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V8h-6a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5h6v-6A.5.5 0 0 1 7 0h.5a.5.5 0 0 1 .5.5v6z"
				})), r("span", {
					className: "uppy-DashboardContent-addMoreCaption"
				}, e.i18n("addMore"))) : r("div", null))
			}
		}, {
			preact: 28
		}],
		106: [function(e, t, i) {
			"use strict";
			const {
				cloneElement: r,
				Component: s,
				toChildArray: n
			} = e("preact"), o = e("classnames"), a = "uppy-transition-slideDownUp";
			t.exports = class extends s {
				constructor(e) {
					super(e), this.state = {
						cachedChildren: null,
						className: ""
					}
				}
				componentWillUpdate(e) {
					const {
						cachedChildren: t
					} = this.state, i = n(e.children)[0];
					if (t === i) return null;
					const r = {
						cachedChildren: i
					};
					i && !t && (r.className = `${a}-enter`, cancelAnimationFrame(this.animationFrame), clearTimeout(this.leaveTimeout), this.leaveTimeout = void 0, this.animationFrame = requestAnimationFrame((() => {
						this.setState({
							className: `${a}-enter ${a}-enter-active`
						}), this.enterTimeout = setTimeout((() => {
							this.setState({
								className: ""
							})
						}), 250)
					}))), t && !i && void 0 === this.leaveTimeout && (r.cachedChildren = t, r.className = `${a}-leave`, cancelAnimationFrame(this.animationFrame), clearTimeout(this.enterTimeout), this.enterTimeout = void 0, this.animationFrame = requestAnimationFrame((() => {
						this.setState({
							className: `${a}-leave ${a}-leave-active`
						}), this.leaveTimeout = setTimeout((() => {
							this.setState({
								cachedChildren: null,
								className: ""
							})
						}), 250)
					}))), this.setState(r)
				}
				render() {
					const {
						cachedChildren: e,
						className: t
					} = this.state;
					return e ? r(e, {
						className: o(t, e.props.className)
					}) : null
				}
			}
		}, {
			classnames: 6,
			preact: 28
		}],
		107: [function(e, t, i) {
			"use strict";

			function r() {
				return r = Object.assign || function(e) {
					for (var t = 1; t < arguments.length; t++) {
						var i = arguments[t];
						for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r])
					}
					return e
				}, r.apply(this, arguments)
			}
			const {
				h: s,
				Component: n
			} = e("preact"), o = {
				position: "relative",
				width: "100%",
				minHeight: "100%"
			}, a = {
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				overflow: "visible"
			};
			t.exports = class extends n {
				constructor(e) {
					super(e), this.handleScroll = () => {
						this.setState({
							offset: this.base.scrollTop
						})
					}, this.handleResize = () => {
						this.resize()
					}, this.focusElement = null, this.state = {
						offset: 0,
						height: 0
					}
				}
				componentDidMount() {
					this.resize(), window.addEventListener("resize", this.handleResize)
				}
				componentWillUpdate() {
					this.base.contains(document.activeElement) && (this.focusElement = document.activeElement)
				}
				componentDidUpdate() {
					this.focusElement && this.focusElement.parentNode && document.activeElement !== this.focusElement && this.focusElement.focus(), this.focusElement = null, this.resize()
				}
				componentWillUnmount() {
					window.removeEventListener("resize", this.handleResize)
				}
				resize() {
					const {
						height: e
					} = this.state;
					e !== this.base.offsetHeight && this.setState({
						height: this.base.offsetHeight
					})
				}
				render({
					data: e,
					rowHeight: t,
					renderRow: i,
					overscanCount: n = 10,
					...l
				}) {
					const {
						offset: u,
						height: p
					} = this.state;
					let c = Math.floor(u / t),
						h = Math.floor(p / t);
					n && (c = Math.max(0, c - c % n), h += n);
					const d = c + h + 4,
						f = e.slice(c, d),
						m = {
							...o,
							height: e.length * t
						},
						g = {
							...a,
							top: c * t
						};
					return s("div", r({
						onScroll: this.handleScroll
					}, l), s("div", {
						role: "presentation",
						style: m
					}, s("div", {
						role: "presentation",
						style: g
					}, f.map(i))))
				}
			}
		}, {
			preact: 28
		}],
		108: [function(e, t, i) {
			"use strict";
			var r, s, n, o, a, l, u, p;

			function c(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var h = 0;

			function d(e) {
				return "__private_" + h++ + "_" + e
			}
			const {
				h: f
			} = e("preact"), {
				UIPlugin: m
			} = e("@uppy/core"), g = e("@uppy/status-bar"), y = e("@uppy/informer"), v = e("@uppy/thumbnail-generator"), b = e("@uppy/utils/lib/findAllDOMElements"), w = e("@uppy/utils/lib/toArray"), S = e("@uppy/utils/lib/getDroppedFiles"), P = e("@uppy/utils/lib/getTextDirection"), {
				nanoid: k
			} = e("nanoid"), C = e("./utils/trapFocus"), E = e("./utils/createSuperFocus"), x = e("memoize-one").default || e("memoize-one"), _ = e("@uppy/utils/lib/FOCUSABLE_ELEMENTS"), F = e("./components/Dashboard");

			function O() {
				const e = {};
				return e.promise = new Promise(((t, i) => {
					e.resolve = t, e.reject = i
				})), e
			}

			function A() {
				return f("svg", {
					"aria-hidden": "true",
					focusable: "false",
					width: "30",
					height: "30",
					viewBox: "0 0 30 30"
				}, f("path", {
					d: "M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm4.258-12.676v6.846h-8.426v-6.846H5.204l9.82-12.364 9.82 12.364H19.26z"
				}))
			}
			t.exports = (s = d("openFileEditorWhenFilesAdded"), n = d("attachRenderFunctionToTarget"), o = d("isTargetSupported"), a = d("getAcquirers"), l = d("getProgressIndicators"), u = d("getEditors"), p = r = class extends m {
				constructor(e, t) {
					super(e, t), this.removeTarget = e => {
						const t = this.getPluginState().targets.filter((t => t.id !== e.id));
						this.setPluginState({
							targets: t
						})
					}, this.addTarget = e => {
						const t = e.id || e.constructor.name,
							i = e.title || t,
							r = e.type;
						if ("acquirer" !== r && "progressindicator" !== r && "editor" !== r) {
							const e = "Dashboard: can only be targeted by plugins of types: acquirer, progressindicator, editor";
							return void this.uppy.log(e, "error")
						}
						const s = {
								id: t,
								name: i,
								type: r
							},
							n = this.getPluginState().targets.slice();
						return n.push(s), this.setPluginState({
							targets: n
						}), this.el
					}, this.hideAllPanels = () => {
						const e = this.getPluginState(),
							t = {
								activePickerPanel: !1,
								showAddFilesPanel: !1,
								activeOverlayType: null,
								fileCardFor: null,
								showFileEditor: !1
							};
						e.activePickerPanel === t.activePickerPanel && e.showAddFilesPanel === t.showAddFilesPanel && e.showFileEditor === t.showFileEditor && e.activeOverlayType === t.activeOverlayType || this.setPluginState(t)
					}, this.showPanel = e => {
						const {
							targets: t
						} = this.getPluginState(), i = t.filter((t => "acquirer" === t.type && t.id === e))[0];
						this.setPluginState({
							activePickerPanel: i,
							activeOverlayType: "PickerPanel"
						})
					}, this.canEditFile = e => {
						const {
							targets: t
						} = this.getPluginState();
						return c(this, u)[u](t).some((t => this.uppy.getPlugin(t.id).canEditFile(e)))
					}, this.openFileEditor = e => {
						const {
							targets: t
						} = this.getPluginState(), i = c(this, u)[u](t);
						this.setPluginState({
							showFileEditor: !0,
							fileCardFor: e.id || null,
							activeOverlayType: "FileEditor"
						}), i.forEach((t => {
							this.uppy.getPlugin(t.id).selectFile(e)
						}))
					}, this.saveFileEditor = () => {
						const {
							targets: e
						} = this.getPluginState();
						c(this, u)[u](e).forEach((e => {
							this.uppy.getPlugin(e.id).save()
						})), this.hideAllPanels()
					}, this.openModal = () => {
						const {
							promise: e,
							resolve: t
						} = O();
						if (this.savedScrollPosition = window.pageYOffset, this.savedActiveElement = document.activeElement, this.opts.disablePageScrollWhenModalOpen && document.body.classList.add("uppy-Dashboard-isFixed"), this.opts.animateOpenClose && this.getPluginState().isClosing) {
							const e = () => {
								this.setPluginState({
									isHidden: !1
								}), this.el.removeEventListener("animationend", e, !1), t()
							};
							this.el.addEventListener("animationend", e, !1)
						} else this.setPluginState({
							isHidden: !1
						}), t();
						return this.opts.browserBackButtonClose && this.updateBrowserHistory(), document.addEventListener("keydown", this.handleKeyDownInModal), this.uppy.emit("dashboard:modal-open"), e
					}, this.closeModal = (e = {}) => {
						const {
							manualClose: t = !0
						} = e, {
							isHidden: i,
							isClosing: r
						} = this.getPluginState();
						if (i || r) return;
						const {
							promise: s,
							resolve: n
						} = O();
						if (this.opts.disablePageScrollWhenModalOpen && document.body.classList.remove("uppy-Dashboard-isFixed"), this.opts.animateOpenClose) {
							this.setPluginState({
								isClosing: !0
							});
							const e = () => {
								this.setPluginState({
									isHidden: !0,
									isClosing: !1
								}), this.superFocus.cancel(), this.savedActiveElement.focus(), this.el.removeEventListener("animationend", e, !1), n()
							};
							this.el.addEventListener("animationend", e, !1)
						} else this.setPluginState({
							isHidden: !0
						}), this.superFocus.cancel(), this.savedActiveElement.focus(), n();
						var o;
						(document.removeEventListener("keydown", this.handleKeyDownInModal), t) && (this.opts.browserBackButtonClose && null != (o = history.state) && o[this.modalName] && history.back());
						return this.uppy.emit("dashboard:modal-closed"), s
					}, this.isModalOpen = () => !this.getPluginState().isHidden || !1, this.requestCloseModal = () => this.opts.onRequestCloseModal ? this.opts.onRequestCloseModal() : this.closeModal(), this.setDarkModeCapability = e => {
						const {
							capabilities: t
						} = this.uppy.getState();
						this.uppy.setState({
							capabilities: {
								...t,
								darkMode: e
							}
						})
					}, this.handleSystemDarkModeChange = e => {
						const t = e.matches;
						this.uppy.log("[Dashboard] Dark mode is " + (t ? "on" : "off")), this.setDarkModeCapability(t)
					}, this.toggleFileCard = (e, t) => {
						const i = this.uppy.getFile(t);
						e ? this.uppy.emit("dashboard:file-edit-start", i) : this.uppy.emit("dashboard:file-edit-complete", i), this.setPluginState({
							fileCardFor: e ? t : null,
							activeOverlayType: e ? "FileCard" : null
						})
					}, this.toggleAddFilesPanel = e => {
						this.setPluginState({
							showAddFilesPanel: e,
							activeOverlayType: e ? "AddFiles" : null
						})
					}, this.addFiles = e => {
						const t = e.map((e => ({
							source: this.id,
							name: e.name,
							type: e.type,
							data: e,
							meta: {
								relativePath: e.relativePath || null
							}
						})));
						try {
							this.uppy.addFiles(t)
						} catch (e) {
							this.uppy.log(e)
						}
					}, this.startListeningToResize = () => {
						this.resizeObserver = new ResizeObserver((e => {
							const t = e[0],
								{
									width: i,
									height: r
								} = t.contentRect;
							this.uppy.log(`[Dashboard] resized: ${i} / ${r}`, "debug"), this.setPluginState({
								containerWidth: i,
								containerHeight: r,
								areInsidesReadyToBeVisible: !0
							})
						})), this.resizeObserver.observe(this.el.querySelector(".uppy-Dashboard-inner")), this.makeDashboardInsidesVisibleAnywayTimeout = setTimeout((() => {
							const e = this.getPluginState(),
								t = !this.opts.inline && e.isHidden;
							e.areInsidesReadyToBeVisible || t || (this.uppy.log("[Dashboard] resize event didn't fire on time: defaulted to mobile layout", "debug"), this.setPluginState({
								areInsidesReadyToBeVisible: !0
							}))
						}), 1e3)
					}, this.stopListeningToResize = () => {
						this.resizeObserver.disconnect(), clearTimeout(this.makeDashboardInsidesVisibleAnywayTimeout)
					}, this.recordIfFocusedOnUppyRecently = e => {
						this.el.contains(e.target) ? this.ifFocusedOnUppyRecently = !0 : (this.ifFocusedOnUppyRecently = !1, this.superFocus.cancel())
					}, this.disableAllFocusableElements = e => {
						const t = w(this.el.querySelectorAll(_));
						e ? t.forEach((e => {
							const t = e.getAttribute("tabindex");
							t && (e.dataset.inertTabindex = t), e.setAttribute("tabindex", "-1")
						})) : t.forEach((e => {
							"inertTabindex" in e.dataset ? e.setAttribute("tabindex", e.dataset.inertTabindex) : e.removeAttribute("tabindex")
						})), this.dashboardIsDisabled = e
					}, this.updateBrowserHistory = () => {
						var e;
						null != (e = history.state) && e[this.modalName] || history.pushState({
							...history.state,
							[this.modalName]: !0
						}, ""), window.addEventListener("popstate", this.handlePopState, !1)
					}, this.handlePopState = e => {
						var t;
						!this.isModalOpen() || e.state && e.state[this.modalName] || this.closeModal({
							manualClose: !1
						}), !this.isModalOpen() && null != (t = e.state) && t[this.modalName] && history.back()
					}, this.handleKeyDownInModal = e => {
						27 === e.keyCode && this.requestCloseModal(e), 9 === e.keyCode && C.forModal(e, this.getPluginState().activeOverlayType, this.el)
					}, this.handleClickOutside = () => {
						this.opts.closeModalOnClickOutside && this.requestCloseModal()
					}, this.handlePaste = e => {
						this.uppy.iteratePlugins((t => {
							"acquirer" === t.type && (null == t.handleRootPaste || t.handleRootPaste(e))
						}));
						const t = w(e.clipboardData.files);
						t.length > 0 && (this.uppy.log("[Dashboard] Files pasted"), this.addFiles(t))
					}, this.handleInputChange = e => {
						e.preventDefault();
						const t = w(e.target.files);
						t.length > 0 && (this.uppy.log("[Dashboard] Files selected through input"), this.addFiles(t))
					}, this.handleDragOver = e => {
						var t, i;
						e.preventDefault(), e.stopPropagation();
						const r = (() => {
								let t = !0;
								return this.uppy.iteratePlugins((i => {
									null != i.canHandleRootDrop && i.canHandleRootDrop(e) && (t = !0)
								})), t
							})(),
							s = (() => {
								const {
									types: t
								} = e.dataTransfer;
								return t.some((e => "Files" === e))
							})();
						if (!r && !s || this.opts.disabled || this.opts.disableLocalFiles && (s || !r) || !this.uppy.getState().allowNewUpload) return e.dataTransfer.dropEffect = "none", void clearTimeout(this.removeDragOverClassTimeout);
						e.dataTransfer.dropEffect = "copy", clearTimeout(this.removeDragOverClassTimeout), this.setPluginState({
							isDraggingOver: !0
						}), null == (t = (i = this.opts).onDragOver) || t.call(i, e)
					}, this.handleDragLeave = e => {
						var t, i;
						e.preventDefault(), e.stopPropagation(), clearTimeout(this.removeDragOverClassTimeout), this.removeDragOverClassTimeout = setTimeout((() => {
							this.setPluginState({
								isDraggingOver: !1
							})
						}), 50), null == (t = (i = this.opts).onDragLeave) || t.call(i, e)
					}, this.handleDrop = async e => {
						var t, i;
						e.preventDefault(), e.stopPropagation(), clearTimeout(this.removeDragOverClassTimeout), this.setPluginState({
							isDraggingOver: !1
						}), this.uppy.iteratePlugins((t => {
							"acquirer" === t.type && (null == t.handleRootDrop || t.handleRootDrop(e))
						}));
						let r = !1;
						const s = await S(e.dataTransfer, {
							logDropError: e => {
								this.uppy.log(e, "error"), r || (this.uppy.info(e.message, "error"), r = !0)
							}
						});
						s.length > 0 && (this.uppy.log("[Dashboard] Files dropped"), this.addFiles(s)), null == (t = (i = this.opts).onDrop) || t.call(i, e)
					}, this.handleRequestThumbnail = e => {
						this.opts.waitForThumbnailsBeforeUpload || this.uppy.emit("thumbnail:request", e)
					}, this.handleCancelThumbnail = e => {
						this.opts.waitForThumbnailsBeforeUpload || this.uppy.emit("thumbnail:cancel", e)
					}, this.handleKeyDownInInline = e => {
						9 === e.keyCode && C.forInline(e, this.getPluginState().activeOverlayType, this.el)
					}, this.handlePasteOnBody = e => {
						this.el.contains(document.activeElement) && this.handlePaste(e)
					}, this.handleComplete = ({
						failed: e
					}) => {
						this.opts.closeAfterFinish && 0 === e.length && this.requestCloseModal()
					}, this.handleCancelRestore = () => {
						this.uppy.emit("restore-canceled")
					}, Object.defineProperty(this, s, {
						writable: !0,
						value: e => {
							const t = e[0];
							this.canEditFile(t) && this.openFileEditor(t)
						}
					}), this.initEvents = () => {
						if (this.opts.trigger && !this.opts.inline) {
							const e = b(this.opts.trigger);
							e ? e.forEach((e => e.addEventListener("click", this.openModal))) : this.uppy.log("Dashboard modal trigger not found. Make sure `trigger` is set in Dashboard options, unless you are planning to call `dashboard.openModal()` method yourself", "warning")
						}
						this.startListeningToResize(), document.addEventListener("paste", this.handlePasteOnBody), this.uppy.on("plugin-remove", this.removeTarget), this.uppy.on("file-added", this.hideAllPanels), this.uppy.on("dashboard:modal-closed", this.hideAllPanels), this.uppy.on("file-editor:complete", this.hideAllPanels), this.uppy.on("complete", this.handleComplete), document.addEventListener("focus", this.recordIfFocusedOnUppyRecently, !0), document.addEventListener("click", this.recordIfFocusedOnUppyRecently, !0), this.opts.inline && this.el.addEventListener("keydown", this.handleKeyDownInInline), this.opts.autoOpenFileEditor && this.uppy.on("files-added", c(this, s)[s])
					}, this.removeEvents = () => {
						const e = b(this.opts.trigger);
						!this.opts.inline && e && e.forEach((e => e.removeEventListener("click", this.openModal))), this.stopListeningToResize(), document.removeEventListener("paste", this.handlePasteOnBody), window.removeEventListener("popstate", this.handlePopState, !1), this.uppy.off("plugin-remove", this.removeTarget), this.uppy.off("file-added", this.hideAllPanels), this.uppy.off("dashboard:modal-closed", this.hideAllPanels), this.uppy.off("file-editor:complete", this.hideAllPanels), this.uppy.off("complete", this.handleComplete), document.removeEventListener("focus", this.recordIfFocusedOnUppyRecently), document.removeEventListener("click", this.recordIfFocusedOnUppyRecently), this.opts.inline && this.el.removeEventListener("keydown", this.handleKeyDownInInline), this.opts.autoOpenFileEditor && this.uppy.off("files-added", c(this, s)[s])
					}, this.superFocusOnEachUpdate = () => {
						const e = this.el.contains(document.activeElement),
							t = document.activeElement === document.body || null === document.activeElement,
							i = this.uppy.getState().info.isHidden,
							r = !this.opts.inline;
						i && (r || e || t && this.ifFocusedOnUppyRecently) ? this.superFocus(this.el, this.getPluginState().activeOverlayType) : this.superFocus.cancel()
					}, this.afterUpdate = () => {
						!this.opts.disabled || this.dashboardIsDisabled ? (!this.opts.disabled && this.dashboardIsDisabled && this.disableAllFocusableElements(!1), this.superFocusOnEachUpdate()) : this.disableAllFocusableElements(!0)
					}, this.saveFileCard = (e, t) => {
						this.uppy.setFileMeta(t, e), this.toggleFileCard(!1, t)
					}, Object.defineProperty(this, n, {
						writable: !0,
						value: e => {
							const t = this.uppy.getPlugin(e.id);
							return {
								...e,
								icon: t.icon || this.opts.defaultPickerIcon,
								render: t.render
							}
						}
					}), Object.defineProperty(this, o, {
						writable: !0,
						value: e => {
							const t = this.uppy.getPlugin(e.id);
							return "function" != typeof t.isSupported || t.isSupported()
						}
					}), Object.defineProperty(this, a, {
						writable: !0,
						value: x((e => e.filter((e => "acquirer" === e.type && c(this, o)[o](e))).map(c(this, n)[n])))
					}), Object.defineProperty(this, l, {
						writable: !0,
						value: x((e => e.filter((e => "progressindicator" === e.type)).map(c(this, n)[n])))
					}), Object.defineProperty(this, u, {
						writable: !0,
						value: x((e => e.filter((e => "editor" === e.type)).map(c(this, n)[n])))
					}), this.render = e => {
						const t = this.getPluginState(),
							{
								files: i,
								capabilities: r,
								allowNewUpload: s
							} = e,
							{
								newFiles: n,
								uploadStartedFiles: o,
								completeFiles: p,
								erroredFiles: h,
								inProgressFiles: d,
								inProgressNotPausedFiles: f,
								processingFiles: m,
								isUploadStarted: g,
								isAllComplete: y,
								isAllErrored: v,
								isAllPaused: b
							} = this.uppy.getObjectOfFilesPerState(),
							w = c(this, a)[a](t.targets),
							S = c(this, l)[l](t.targets),
							P = c(this, u)[u](t.targets);
						let k;
						return k = "auto" === this.opts.theme ? r.darkMode ? "dark" : "light" : this.opts.theme, ["files", "folders", "both"].indexOf(this.opts.fileManagerSelectionType) < 0 && (this.opts.fileManagerSelectionType = "files", console.warn(`Unsupported option for "fileManagerSelectionType". Using default of "${this.opts.fileManagerSelectionType}".`)), F({
							state: e,
							isHidden: t.isHidden,
							files: i,
							newFiles: n,
							uploadStartedFiles: o,
							completeFiles: p,
							erroredFiles: h,
							inProgressFiles: d,
							inProgressNotPausedFiles: f,
							processingFiles: m,
							isUploadStarted: g,
							isAllComplete: y,
							isAllErrored: v,
							isAllPaused: b,
							totalFileCount: Object.keys(i).length,
							totalProgress: e.totalProgress,
							allowNewUpload: s,
							acquirers: w,
							theme: k,
							disabled: this.opts.disabled,
							disableLocalFiles: this.opts.disableLocalFiles,
							direction: this.opts.direction,
							activePickerPanel: t.activePickerPanel,
							showFileEditor: t.showFileEditor,
							saveFileEditor: this.saveFileEditor,
							disableAllFocusableElements: this.disableAllFocusableElements,
							animateOpenClose: this.opts.animateOpenClose,
							isClosing: t.isClosing,
							progressindicators: S,
							editors: P,
							autoProceed: this.uppy.opts.autoProceed,
							id: this.id,
							closeModal: this.requestCloseModal,
							handleClickOutside: this.handleClickOutside,
							handleInputChange: this.handleInputChange,
							handlePaste: this.handlePaste,
							inline: this.opts.inline,
							showPanel: this.showPanel,
							hideAllPanels: this.hideAllPanels,
							i18n: this.i18n,
							i18nArray: this.i18nArray,
							uppy: this.uppy,
							note: this.opts.note,
							recoveredState: e.recoveredState,
							metaFields: t.metaFields,
							resumableUploads: r.resumableUploads || !1,
							individualCancellation: r.individualCancellation,
							isMobileDevice: r.isMobileDevice,
							fileCardFor: t.fileCardFor,
							toggleFileCard: this.toggleFileCard,
							toggleAddFilesPanel: this.toggleAddFilesPanel,
							showAddFilesPanel: t.showAddFilesPanel,
							saveFileCard: this.saveFileCard,
							openFileEditor: this.openFileEditor,
							canEditFile: this.canEditFile,
							width: this.opts.width,
							height: this.opts.height,
							showLinkToFileUploadResult: this.opts.showLinkToFileUploadResult,
							fileManagerSelectionType: this.opts.fileManagerSelectionType,
							proudlyDisplayPoweredByUppy: this.opts.proudlyDisplayPoweredByUppy,
							hideCancelButton: this.opts.hideCancelButton,
							hideRetryButton: this.opts.hideRetryButton,
							hidePauseResumeButton: this.opts.hidePauseResumeButton,
							showRemoveButtonAfterComplete: this.opts.showRemoveButtonAfterComplete,
							containerWidth: t.containerWidth,
							containerHeight: t.containerHeight,
							areInsidesReadyToBeVisible: t.areInsidesReadyToBeVisible,
							isTargetDOMEl: this.isTargetDOMEl,
							parentElement: this.el,
							allowedFileTypes: this.uppy.opts.restrictions.allowedFileTypes,
							maxNumberOfFiles: this.uppy.opts.restrictions.maxNumberOfFiles,
							requiredMetaFields: this.uppy.opts.restrictions.requiredMetaFields,
							showSelectedFiles: this.opts.showSelectedFiles,
							handleCancelRestore: this.handleCancelRestore,
							handleRequestThumbnail: this.handleRequestThumbnail,
							handleCancelThumbnail: this.handleCancelThumbnail,
							isDraggingOver: t.isDraggingOver,
							handleDragOver: this.handleDragOver,
							handleDragLeave: this.handleDragLeave,
							handleDrop: this.handleDrop
						})
					}, this.discoverProviderPlugins = () => {
						this.uppy.iteratePlugins((e => {
							e && !e.target && e.opts && e.opts.target === this.constructor && this.addTarget(e)
						}))
					}, this.install = () => {
						this.setPluginState({
							isHidden: !0,
							fileCardFor: null,
							activeOverlayType: null,
							showAddFilesPanel: !1,
							activePickerPanel: !1,
							showFileEditor: !1,
							metaFields: this.opts.metaFields,
							targets: [],
							areInsidesReadyToBeVisible: !1,
							isDraggingOver: !1
						});
						const {
							inline: e,
							closeAfterFinish: t
						} = this.opts;
						if (e && t) throw new Error("[Dashboard] `closeAfterFinish: true` cannot be used on an inline Dashboard, because an inline Dashboard cannot be closed at all. Either set `inline: false`, or disable the `closeAfterFinish` option.");
						const {
							allowMultipleUploads: i,
							allowMultipleUploadBatches: r
						} = this.uppy.opts;
						(i || r) && t && this.uppy.log("[Dashboard] When using `closeAfterFinish`, we recommended setting the `allowMultipleUploadBatches` option to `false` in the Uppy constructor. See https://uppy.io/docs/uppy/#allowMultipleUploads-true", "warning");
						const {
							target: s
						} = this.opts;
						s && this.mount(s, this);
						(this.opts.plugins || []).forEach((e => {
							const t = this.uppy.getPlugin(e);
							t && t.mount(this, t)
						})), this.opts.disableStatusBar || this.uppy.use(g, {
							id: `${this.id}:StatusBar`,
							target: this,
							hideUploadButton: this.opts.hideUploadButton,
							hideRetryButton: this.opts.hideRetryButton,
							hidePauseResumeButton: this.opts.hidePauseResumeButton,
							hideCancelButton: this.opts.hideCancelButton,
							showProgressDetails: this.opts.showProgressDetails,
							hideAfterFinish: this.opts.hideProgressAfterFinish,
							locale: this.opts.locale,
							doneButtonHandler: this.opts.doneButtonHandler
						}), this.opts.disableInformer || this.uppy.use(y, {
							id: `${this.id}:Informer`,
							target: this
						}), this.opts.disableThumbnailGenerator || this.uppy.use(v, {
							id: `${this.id}:ThumbnailGenerator`,
							thumbnailWidth: this.opts.thumbnailWidth,
							thumbnailType: this.opts.thumbnailType,
							waitForThumbnailsBeforeUpload: this.opts.waitForThumbnailsBeforeUpload,
							lazy: !this.opts.waitForThumbnailsBeforeUpload
						}), this.darkModeMediaQuery = "undefined" != typeof window && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
						const n = !!this.darkModeMediaQuery && this.darkModeMediaQuery.matches;
						this.uppy.log("[Dashboard] Dark mode is " + (n ? "on" : "off")), this.setDarkModeCapability(n), "auto" === this.opts.theme && this.darkModeMediaQuery.addListener(this.handleSystemDarkModeChange), this.discoverProviderPlugins(), this.initEvents()
					}, this.uninstall = () => {
						if (!this.opts.disableInformer) {
							const e = this.uppy.getPlugin(`${this.id}:Informer`);
							e && this.uppy.removePlugin(e)
						}
						if (!this.opts.disableStatusBar) {
							const e = this.uppy.getPlugin(`${this.id}:StatusBar`);
							e && this.uppy.removePlugin(e)
						}
						if (!this.opts.disableThumbnailGenerator) {
							const e = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
							e && this.uppy.removePlugin(e)
						}(this.opts.plugins || []).forEach((e => {
							const t = this.uppy.getPlugin(e);
							t && t.unmount()
						})), "auto" === this.opts.theme && this.darkModeMediaQuery.removeListener(this.handleSystemDarkModeChange), this.unmount(), this.removeEvents()
					}, this.id = this.opts.id || "Dashboard", this.title = "Dashboard", this.type = "orchestrator", this.modalName = `uppy-Dashboard-${k()}`, this.defaultLocale = {
						strings: {
							closeModal: "Close Modal",
							importFrom: "Import from %{name}",
							addingMoreFiles: "Adding more files",
							addMoreFiles: "Add more files",
							dashboardWindowTitle: "File Uploader Window (Press escape to close)",
							dashboardTitle: "File Uploader",
							copyLinkToClipboardSuccess: "Link copied to clipboard",
							copyLinkToClipboardFallback: "Copy the URL below",
							copyLink: "Copy link",
							back: "Back",
							addMore: "Add more",
							removeFile: "Remove file %{file}",
							editFile: "Edit file",
							editFileWithFilename: "Edit file %{file}",
							editing: "Editing %{file}",
							finishEditingFile: "Finish editing file",
							save: "Save",
							saveChanges: "Save changes",
							cancel: "Cancel",
							myDevice: "My Device",
							dropPasteFiles: "Drop files here or %{browseFiles}",
							dropPasteFolders: "Drop files here or %{browseFolders}",
							dropPasteBoth: "Drop files here, %{browseFiles} or %{browseFolders}",
							dropPasteImportFiles: "Drop files here, %{browseFiles} or import from:",
							dropPasteImportFolders: "Drop files here, %{browseFolders} or import from:",
							dropPasteImportBoth: "Drop files here, %{browseFiles}, %{browseFolders} or import from:",
							importFiles: "Import files from:",
							dropHint: "Drop your files here",
							browseFiles: "browse files",
							browseFolders: "browse folders",
							uploadComplete: "Upload complete",
							uploadPaused: "Upload paused",
							resumeUpload: "Resume upload",
							pauseUpload: "Pause upload",
							retryUpload: "Retry upload",
							cancelUpload: "Cancel upload",
							xFilesSelected: {
								0: "%{smart_count} file selected",
								1: "%{smart_count} files selected"
							},
							uploadingXFiles: {
								0: "Uploading %{smart_count} file",
								1: "Uploading %{smart_count} files"
							},
							processingXFiles: {
								0: "Processing %{smart_count} file",
								1: "Processing %{smart_count} files"
							},
							recoveredXFiles: {
								0: "We could not fully recover 1 file. Please re-select it and resume the upload.",
								1: "We could not fully recover %{smart_count} files. Please re-select them and resume the upload."
							},
							recoveredAllFiles: "We restored all files. You can now resume the upload.",
							sessionRestored: "Session restored",
							reSelect: "Re-select",
							poweredBy: "Powered by %{uppy}"
						}
					};
					const i = {
						target: "body",
						metaFields: [],
						trigger: null,
						inline: !1,
						width: 750,
						height: 550,
						thumbnailWidth: 280,
						thumbnailType: "image/jpeg",
						waitForThumbnailsBeforeUpload: !1,
						defaultPickerIcon: A,
						showLinkToFileUploadResult: !1,
						showProgressDetails: !1,
						hideUploadButton: !1,
						hideCancelButton: !1,
						hideRetryButton: !1,
						hidePauseResumeButton: !1,
						hideProgressAfterFinish: !1,
						doneButtonHandler: () => {
							this.uppy.reset(), this.requestCloseModal()
						},
						note: null,
						closeModalOnClickOutside: !1,
						closeAfterFinish: !1,
						disableStatusBar: !1,
						disableInformer: !1,
						disableThumbnailGenerator: !1,
						disablePageScrollWhenModalOpen: !0,
						animateOpenClose: !0,
						fileManagerSelectionType: "files",
						proudlyDisplayPoweredByUppy: !0,
						onRequestCloseModal: () => this.closeModal(),
						showSelectedFiles: !0,
						showRemoveButtonAfterComplete: !1,
						browserBackButtonClose: !1,
						theme: "light",
						autoOpenFileEditor: !1,
						disabled: !1,
						disableLocalFiles: !1
					};
					this.opts = {
						...i,
						...t
					}, this.i18nInit(), this.superFocus = E(), this.ifFocusedOnUppyRecently = !1, this.makeDashboardInsidesVisibleAnywayTimeout = null, this.removeDragOverClassTimeout = null
				}
				onMount() {
					const e = this.el;
					P(e) || (e.dir = "ltr")
				}
			}, r.VERSION = "2.1.1", p)
		}, {
			"./components/Dashboard": 94,
			"./utils/createSuperFocus": 110,
			"./utils/trapFocus": 114,
			"@uppy/core": 89,
			"@uppy/informer": 131,
			"@uppy/status-bar": 169,
			"@uppy/thumbnail-generator": 172,
			"@uppy/utils/lib/FOCUSABLE_ELEMENTS": 187,
			"@uppy/utils/lib/findAllDOMElements": 197,
			"@uppy/utils/lib/getDroppedFiles": 201,
			"@uppy/utils/lib/getTextDirection": 211,
			"@uppy/utils/lib/toArray": 224,
			"memoize-one": 19,
			nanoid: 24,
			preact: 28
		}],
		109: [function(e, t, i) {
			"use strict";
			t.exports = function(e, t) {
				return t = t || "Copy the URL below", new Promise((i => {
					const r = document.createElement("textarea");
					r.setAttribute("style", {
						position: "fixed",
						top: 0,
						left: 0,
						width: "2em",
						height: "2em",
						padding: 0,
						border: "none",
						outline: "none",
						boxShadow: "none",
						background: "transparent"
					}), r.value = e, document.body.appendChild(r), r.select();
					const s = () => {
						document.body.removeChild(r), window.prompt(t, e), i()
					};
					try {
						return document.execCommand("copy") ? (document.body.removeChild(r), i()) : s()
					} catch (e) {
						return document.body.removeChild(r), s()
					}
				}))
			}
		}, {}],
		110: [function(e, t, i) {
			"use strict";
			const r = e("lodash.debounce"),
				s = e("@uppy/utils/lib/FOCUSABLE_ELEMENTS"),
				n = e("./getActiveOverlayEl");
			t.exports = function() {
				let e = !1;
				return r(((t, i) => {
					const r = n(t, i),
						o = r.contains(document.activeElement);
					if (o && e) return;
					const a = r.querySelector("[data-uppy-super-focusable]");
					if (!o || a)
						if (a) a.focus({
							preventScroll: !0
						}), e = !0;
						else {
							const t = r.querySelector(s);
							null == t || t.focus({
								preventScroll: !0
							}), e = !1
						}
				}), 260)
			}
		}, {
			"./getActiveOverlayEl": 111,
			"@uppy/utils/lib/FOCUSABLE_ELEMENTS": 187,
			"lodash.debounce": 17
		}],
		111: [function(e, t, i) {
			"use strict";
			t.exports = function(e, t) {
				if (t) {
					const i = e.querySelector(`[data-uppy-paneltype="${t}"]`);
					if (i) return i
				}
				return e
			}
		}, {}],
		112: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");
			t.exports = function(e) {
				const t = {
					color: "#838999",
					icon: r("svg", {
						"aria-hidden": "true",
						focusable: "false",
						className: "uppy-c-icon",
						width: "25",
						height: "25",
						viewBox: "0 0 25 25"
					}, r("g", {
						fill: "#A7AFB7",
						fillRule: "nonzero"
					}, r("path", {
						d: "M5.5 22a.5.5 0 0 1-.5-.5v-18a.5.5 0 0 1 .5-.5h10.719a.5.5 0 0 1 .367.16l3.281 3.556a.5.5 0 0 1 .133.339V21.5a.5.5 0 0 1-.5.5h-14zm.5-1h13V7.25L16 4H6v17z"
					}), r("path", {
						d: "M15 4v3a1 1 0 0 0 1 1h3V7h-3V4h-1z"
					})))
				};
				if (!e) return t;
				const i = e.split("/")[0],
					s = e.split("/")[1];
				if ("text" === i) return {
					color: "#5a5e69",
					icon: r("svg", {
						"aria-hidden": "true",
						focusable: "false",
						className: "uppy-c-icon",
						width: "25",
						height: "25",
						viewBox: "0 0 25 25"
					}, r("path", {
						d: "M4.5 7h13a.5.5 0 1 1 0 1h-13a.5.5 0 0 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z",
						fill: "#5A5E69",
						fillRule: "nonzero"
					}))
				};
				if ("image" === i) return {
					color: "#686de0",
					icon: r("svg", {
						"aria-hidden": "true",
						focusable: "false",
						width: "25",
						height: "25",
						viewBox: "0 0 25 25"
					}, r("g", {
						fill: "#686DE0",
						fillRule: "evenodd"
					}, r("path", {
						d: "M5 7v10h15V7H5zm0-1h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
						fillRule: "nonzero"
					}), r("path", {
						d: "M6.35 17.172l4.994-5.026a.5.5 0 0 1 .707 0l2.16 2.16 3.505-3.505a.5.5 0 0 1 .707 0l2.336 2.31-.707.72-1.983-1.97-3.505 3.505a.5.5 0 0 1-.707 0l-2.16-2.159-3.938 3.939-1.409.026z",
						fillRule: "nonzero"
					}), r("circle", {
						cx: "7.5",
						cy: "9.5",
						r: "1.5"
					})))
				};
				if ("audio" === i) return {
					color: "#068dbb",
					icon: r("svg", {
						"aria-hidden": "true",
						focusable: "false",
						className: "uppy-c-icon",
						width: "25",
						height: "25",
						viewBox: "0 0 25 25"
					}, r("path", {
						d: "M9.5 18.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V7.25a.5.5 0 0 1 .379-.485l9-2.25A.5.5 0 0 1 18.5 5v11.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V8.67l-8 2v7.97zm8-11v-2l-8 2v2l8-2zM7 19.64c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1zm9-2c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1z",
						fill: "#049BCF",
						fillRule: "nonzero"
					}))
				};
				if ("video" === i) return {
					color: "#19af67",
					icon: r("svg", {
						"aria-hidden": "true",
						focusable: "false",
						className: "uppy-c-icon",
						width: "25",
						height: "25",
						viewBox: "0 0 25 25"
					}, r("path", {
						d: "M16 11.834l4.486-2.691A1 1 0 0 1 22 10v6a1 1 0 0 1-1.514.857L16 14.167V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2.834zM15 9H5v8h10V9zm1 4l5 3v-6l-5 3z",
						fill: "#19AF67",
						fillRule: "nonzero"
					}))
				};
				if ("application" === i && "pdf" === s) return {
					color: "#e25149",
					icon: r("svg", {
						"aria-hidden": "true",
						focusable: "false",
						className: "uppy-c-icon",
						width: "25",
						height: "25",
						viewBox: "0 0 25 25"
					}, r("path", {
						d: "M9.766 8.295c-.691-1.843-.539-3.401.747-3.726 1.643-.414 2.505.938 2.39 3.299-.039.79-.194 1.662-.537 3.148.324.49.66.967 1.055 1.51.17.231.382.488.629.757 1.866-.128 3.653.114 4.918.655 1.487.635 2.192 1.685 1.614 2.84-.566 1.133-1.839 1.084-3.416.249-1.141-.604-2.457-1.634-3.51-2.707a13.467 13.467 0 0 0-2.238.426c-1.392 4.051-4.534 6.453-5.707 4.572-.986-1.58 1.38-4.206 4.914-5.375.097-.322.185-.656.264-1.001.08-.353.306-1.31.407-1.737-.678-1.059-1.2-2.031-1.53-2.91zm2.098 4.87c-.033.144-.068.287-.104.427l.033-.01-.012.038a14.065 14.065 0 0 1 1.02-.197l-.032-.033.052-.004a7.902 7.902 0 0 1-.208-.271c-.197-.27-.38-.526-.555-.775l-.006.028-.002-.003c-.076.323-.148.632-.186.8zm5.77 2.978c1.143.605 1.832.632 2.054.187.26-.519-.087-1.034-1.113-1.473-.911-.39-2.175-.608-3.55-.608.845.766 1.787 1.459 2.609 1.894zM6.559 18.789c.14.223.693.16 1.425-.413.827-.648 1.61-1.747 2.208-3.206-2.563 1.064-4.102 2.867-3.633 3.62zm5.345-10.97c.088-1.793-.351-2.48-1.146-2.28-.473.119-.564 1.05-.056 2.405.213.566.52 1.188.908 1.859.18-.858.268-1.453.294-1.984z",
						fill: "#E2514A",
						fillRule: "nonzero"
					}))
				};
				return "application" === i && -1 !== ["zip", "x-7z-compressed", "x-rar-compressed", "x-tar", "x-gzip", "x-apple-diskimage"].indexOf(s) ? {
					color: "#00C469",
					icon: r("svg", {
						"aria-hidden": "true",
						focusable: "false",
						width: "25",
						height: "25",
						viewBox: "0 0 25 25"
					}, r("path", {
						d: "M10.45 2.05h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V2.55a.5.5 0 0 1 .5-.5zm2.05 1.024h1.05a.5.5 0 0 1 .5.5V3.6a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5v-.001zM10.45 0h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 3.074h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 1.024h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm-2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-1.656 3.074l-.82 5.946c.52.302 1.174.458 1.976.458.803 0 1.455-.156 1.975-.458l-.82-5.946h-2.311zm0-1.025h2.312c.512 0 .946.378 1.015.885l.82 5.946c.056.412-.142.817-.501 1.026-.686.398-1.515.597-2.49.597-.974 0-1.804-.199-2.49-.597a1.025 1.025 0 0 1-.5-1.026l.819-5.946c.07-.507.503-.885 1.015-.885zm.545 6.6a.5.5 0 0 1-.397-.561l.143-.999a.5.5 0 0 1 .495-.429h.74a.5.5 0 0 1 .495.43l.143.998a.5.5 0 0 1-.397.561c-.404.08-.819.08-1.222 0z",
						fill: "#00C469",
						fillRule: "nonzero"
					}))
				} : t
			}
		}, {
			preact: 28
		}],
		113: [function(e, t, i) {
			"use strict";
			t.exports = function(e) {
				const {
					tagName: t
				} = e.target;
				"INPUT" !== t && "TEXTAREA" !== t ? (e.preventDefault(), e.stopPropagation()) : e.stopPropagation()
			}
		}, {}],
		114: [function(e, t, i) {
			"use strict";
			const r = e("@uppy/utils/lib/toArray"),
				s = e("@uppy/utils/lib/FOCUSABLE_ELEMENTS"),
				n = e("./getActiveOverlayEl");

			function o(e, t) {
				const i = t[0];
				i && (i.focus(), e.preventDefault())
			}

			function a(e, t, i) {
				const a = n(i, t),
					l = r(a.querySelectorAll(s)),
					u = l.indexOf(document.activeElement);
				! function(e) {
					return e.contains(document.activeElement)
				}(a) ? o(e, l): e.shiftKey && 0 === u ? function(e, t) {
					const i = t[t.length - 1];
					i && (i.focus(), e.preventDefault())
				}(e, l) : e.shiftKey || u !== l.length - 1 || o(e, l)
			}
			t.exports = {
				forModal: (e, t, i) => {
					a(e, t, i)
				},
				forInline: (e, t, i) => {
					null === t || a(e, t, i)
				}
			}
		}, {
			"./getActiveOverlayEl": 111,
			"@uppy/utils/lib/FOCUSABLE_ELEMENTS": 187,
			"@uppy/utils/lib/toArray": 224
		}],
		115: [function(e, t, i) {
			"use strict";
			var r, s;
			const {
				UIPlugin: n
			} = e("@uppy/core"), o = e("@uppy/utils/lib/toArray"), a = e("@uppy/utils/lib/isDragDropSupported"), l = e("@uppy/utils/lib/getDroppedFiles"), {
				h: u
			} = e("preact");
			t.exports = (s = r = class e extends n {
				constructor(e, t) {
					super(e, t), this.handleDrop = async e => {
						var t, i;
						e.preventDefault(), e.stopPropagation(), clearTimeout(this.removeDragOverClassTimeout), this.setPluginState({
							isDraggingOver: !1
						});
						const r = await l(e.dataTransfer, {
							logDropError: e => {
								this.uppy.log(e, "error")
							}
						});
						r.length > 0 && (this.uppy.log("[DragDrop] Files dropped"), this.addFiles(r)), null == (t = (i = this.opts).onDrop) || t.call(i, e)
					}, this.type = "acquirer", this.id = this.opts.id || "DragDrop", this.title = "Drag & Drop", this.defaultLocale = {
						strings: {
							dropHereOr: "Drop files here or %{browse}",
							browse: "browse"
						}
					};
					this.opts = {
						target: null,
						inputName: "files[]",
						width: "100%",
						height: "100%",
						note: null,
						...t
					}, this.i18nInit(), this.isDragDropSupported = a(), this.removeDragOverClassTimeout = null, this.onInputChange = this.onInputChange.bind(this), this.handleDragOver = this.handleDragOver.bind(this), this.handleDragLeave = this.handleDragLeave.bind(this), this.handleDrop = this.handleDrop.bind(this), this.addFiles = this.addFiles.bind(this), this.render = this.render.bind(this)
				}
				addFiles(e) {
					const t = e.map((e => ({
						source: this.id,
						name: e.name,
						type: e.type,
						data: e,
						meta: {
							relativePath: e.relativePath || null
						}
					})));
					try {
						this.uppy.addFiles(t)
					} catch (e) {
						this.uppy.log(e)
					}
				}
				onInputChange(e) {
					const t = o(e.target.files);
					t.length > 0 && (this.uppy.log("[DragDrop] Files selected through input"), this.addFiles(t)), e.target.value = null
				}
				handleDragOver(e) {
					var t;
					e.preventDefault(), e.stopPropagation();
					const {
						types: i
					} = e.dataTransfer, r = i.some((e => "Files" === e)), {
						allowNewUpload: s
					} = this.uppy.getState();
					if (!r || !s) return e.dataTransfer.dropEffect = "none", void clearTimeout(this.removeDragOverClassTimeout);
					e.dataTransfer.dropEffect = "copy", clearTimeout(this.removeDragOverClassTimeout), this.setPluginState({
						isDraggingOver: !0
					}), null == (t = this.opts) || t.onDragOver(e)
				}
				handleDragLeave(e) {
					var t;
					e.preventDefault(), e.stopPropagation(), clearTimeout(this.removeDragOverClassTimeout), this.removeDragOverClassTimeout = setTimeout((() => {
						this.setPluginState({
							isDraggingOver: !1
						})
					}), 50), null == (t = this.opts) || t.onDragLeave(e)
				}
				renderHiddenFileInput() {
					const {
						restrictions: e
					} = this.uppy.opts;
					return u("input", {
						className: "uppy-DragDrop-input",
						type: "file",
						hidden: !0,
						ref: e => {
							this.fileInputRef = e
						},
						name: this.opts.inputName,
						multiple: 1 !== e.maxNumberOfFiles,
						accept: e.allowedFileTypes,
						onChange: this.onInputChange
					})
				}
				static renderArrowSvg() {
					return u("svg", {
						"aria-hidden": "true",
						focusable: "false",
						className: "uppy-c-icon uppy-DragDrop-arrow",
						width: "16",
						height: "16",
						viewBox: "0 0 16 16"
					}, u("path", {
						d: "M11 10V0H5v10H2l6 6 6-6h-3zm0 0",
						fillRule: "evenodd"
					}))
				}
				renderLabel() {
					return u("div", {
						className: "uppy-DragDrop-label"
					}, this.i18nArray("dropHereOr", {
						browse: u("span", {
							className: "uppy-DragDrop-browse"
						}, this.i18n("browse"))
					}))
				}
				renderNote() {
					return u("span", {
						className: "uppy-DragDrop-note"
					}, this.opts.note)
				}
				render() {
					const t = `uppy-Root\n      uppy-u-reset\n      uppy-DragDrop-container\n      ${this.isDragDropSupported?"uppy-DragDrop--isDragDropSupported":""}\n      ${this.getPluginState().isDraggingOver?"uppy-DragDrop--isDraggingOver":""}\n    `,
						i = {
							width: this.opts.width,
							height: this.opts.height
						};
					return u("button", {
						type: "button",
						className: t,
						style: i,
						onClick: () => this.fileInputRef.click(),
						onDragOver: this.handleDragOver,
						onDragLeave: this.handleDragLeave,
						onDrop: this.handleDrop
					}, this.renderHiddenFileInput(), u("div", {
						className: "uppy-DragDrop-inner"
					}, e.renderArrowSvg(), this.renderLabel(), this.renderNote()))
				}
				install() {
					const {
						target: e
					} = this.opts;
					this.setPluginState({
						isDraggingOver: !1
					}), e && this.mount(e, this)
				}
				uninstall() {
					this.unmount()
				}
			}, r.VERSION = "2.0.4", s)
		}, {
			"@uppy/core": 89,
			"@uppy/utils/lib/getDroppedFiles": 201,
			"@uppy/utils/lib/isDragDropSupported": 215,
			"@uppy/utils/lib/toArray": 224,
			preact: 28
		}],
		116: [function(e, t, i) {
			"use strict";
			var r, s;
			const n = e("@uppy/core/lib/BasePlugin"),
				o = e("@uppy/utils/lib/getDroppedFiles"),
				a = e("@uppy/utils/lib/toArray");
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					super(e, t), this.addFiles = e => {
						const t = e.map((e => ({
							source: this.id,
							name: e.name,
							type: e.type,
							data: e,
							meta: {
								relativePath: e.relativePath || null
							}
						})));
						try {
							this.uppy.addFiles(t)
						} catch (e) {
							this.uppy.log(e)
						}
					}, this.handleDrop = async e => {
						var t, i;
						e.preventDefault(), e.stopPropagation(), clearTimeout(this.removeDragOverClassTimeout), e.currentTarget.classList.remove("uppy-is-drag-over"), this.setPluginState({
							isDraggingOver: !1
						}), this.uppy.iteratePlugins((t => {
							"acquirer" === t.type && (null == t.handleRootDrop || t.handleRootDrop(e))
						}));
						let r = !1;
						const s = await o(e.dataTransfer, {
							logDropError: e => {
								this.uppy.log(e, "error"), r || (this.uppy.info(e.message, "error"), r = !0)
							}
						});
						s.length > 0 && (this.uppy.log("[DropTarget] Files were dropped"), this.addFiles(s)), null == (t = (i = this.opts).onDrop) || t.call(i, e)
					}, this.handleDragOver = e => {
						var t, i;
						e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy", clearTimeout(this.removeDragOverClassTimeout), e.currentTarget.classList.add("uppy-is-drag-over"), this.setPluginState({
							isDraggingOver: !0
						}), null == (t = (i = this.opts).onDragOver) || t.call(i, e)
					}, this.handleDragLeave = e => {
						var t, i;
						e.preventDefault(), e.stopPropagation();
						const {
							currentTarget: r
						} = e;
						clearTimeout(this.removeDragOverClassTimeout), this.removeDragOverClassTimeout = setTimeout((() => {
							r.classList.remove("uppy-is-drag-over"), this.setPluginState({
								isDraggingOver: !1
							})
						}), 50), null == (t = (i = this.opts).onDragLeave) || t.call(i, e)
					}, this.addListeners = () => {
						const {
							target: e
						} = this.opts;
						if (e instanceof Element ? this.nodes = [e] : "string" == typeof e && (this.nodes = a(document.querySelectorAll(e))), !this.nodes && !this.nodes.length > 0) throw new Error(`"${e}" does not match any HTML elements`);
						this.nodes.forEach((e => {
							e.addEventListener("dragover", this.handleDragOver, !1), e.addEventListener("dragleave", this.handleDragLeave, !1), e.addEventListener("drop", this.handleDrop, !1)
						}))
					}, this.removeListeners = () => {
						this.nodes && this.nodes.forEach((e => {
							e.removeEventListener("dragover", this.handleDragOver, !1), e.removeEventListener("dragleave", this.handleDragLeave, !1), e.removeEventListener("drop", this.handleDrop, !1)
						}))
					}, this.type = "acquirer", this.id = this.opts.id || "DropTarget", this.title = "Drop Target";
					this.opts = {
						target: null,
						...t
					}, this.removeDragOverClassTimeout = null
				}
				install() {
					this.setPluginState({
						isDraggingOver: !1
					}), this.addListeners()
				}
				uninstall() {
					this.removeListeners()
				}
			}, r.VERSION = "1.1.1", s)
		}, {
			"@uppy/core/lib/BasePlugin": 85,
			"@uppy/utils/lib/getDroppedFiles": 201,
			"@uppy/utils/lib/toArray": 224
		}],
		117: [function(e, t, i) {
			"use strict";
			var r, s;
			const {
				UIPlugin: n
			} = e("@uppy/core"), {
				Provider: o
			} = e("@uppy/companion-client"), {
				ProviderViews: a
			} = e("@uppy/provider-views"), {
				h: l
			} = e("preact");
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					super(e, t), this.id = this.opts.id || "Dropbox", o.initPlugin(this, t), this.title = this.opts.title || "Dropbox", this.icon = () => l("svg", {
						"aria-hidden": "true",
						focusable: "false",
						width: "32",
						height: "32",
						viewBox: "0 0 32 32"
					}, l("g", {
						fill: "none",
						fillRule: "evenodd"
					}, l("rect", {
						className: "uppy-ProviderIconBg",
						fill: "#0D2481",
						width: "32",
						height: "32",
						rx: "16"
					}), l("path", {
						d: "M11 8l5 3.185-5 3.186-5-3.186L11 8zm10 0l5 3.185-5 3.186-5-3.186L21 8zM6 17.556l5-3.185 5 3.185-5 3.186-5-3.186zm15-3.185l5 3.185-5 3.186-5-3.186 5-3.185zm-10 7.432l5-3.185 5 3.185-5 3.186-5-3.186z",
						fill: "#FFF",
						fillRule: "nonzero"
					}))), this.provider = new o(e, {
						companionUrl: this.opts.companionUrl,
						companionHeaders: this.opts.companionHeaders,
						companionKeysParams: this.opts.companionKeysParams,
						companionCookiesRule: this.opts.companionCookiesRule,
						provider: "dropbox",
						pluginId: this.id
					}), this.defaultLocale = {
						strings: {
							pluginNameDropbox: "Dropbox"
						}
					}, this.i18nInit(), this.title = this.i18n("pluginNameDropbox"), this.onFirstRender = this.onFirstRender.bind(this), this.render = this.render.bind(this)
				}
				install() {
					this.view = new a(this, {
						provider: this.provider
					});
					const {
						target: e
					} = this.opts;
					e && this.mount(e, this)
				}
				uninstall() {
					this.view.tearDown(), this.unmount()
				}
				onFirstRender() {
					return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder()])
				}
				render(e) {
					return this.view.render(e)
				}
			}, r.VERSION = "2.0.4", s)
		}, {
			"@uppy/companion-client": 83,
			"@uppy/core": 89,
			"@uppy/provider-views": 156,
			preact: 28
		}],
		118: [function(e, t, i) {
			"use strict";
			var r, s;
			const {
				UIPlugin: n
			} = e("@uppy/core"), {
				Provider: o
			} = e("@uppy/companion-client"), {
				ProviderViews: a
			} = e("@uppy/provider-views"), {
				h: l
			} = e("preact");
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					super(e, t), this.id = this.opts.id || "Facebook", o.initPlugin(this, t), this.title = this.opts.title || "Facebook", this.icon = () => l("svg", {
						"aria-hidden": "true",
						focusable: "false",
						width: "32",
						height: "32",
						viewBox: "0 0 32 32"
					}, l("g", {
						fill: "none",
						fillRule: "evenodd"
					}, l("rect", {
						className: "uppy-ProviderIconBg",
						width: "32",
						height: "32",
						rx: "16",
						fill: "#3C5A99"
					}), l("path", {
						d: "M17.842 26v-8.667h2.653l.398-3.377h-3.051v-2.157c0-.978.248-1.644 1.527-1.644H21V7.132A19.914 19.914 0 0 0 18.623 7c-2.352 0-3.963 1.574-3.963 4.465v2.49H12v3.378h2.66V26h3.182z",
						fill: "#FFF",
						fillRule: "nonzero"
					}))), this.provider = new o(e, {
						companionUrl: this.opts.companionUrl,
						companionHeaders: this.opts.companionHeaders,
						companionKeysParams: this.opts.companionKeysParams,
						companionCookiesRule: this.opts.companionCookiesRule,
						provider: "facebook",
						pluginId: this.id
					}), this.defaultLocale = {
						strings: {
							pluginNameFacebook: "Facebook"
						}
					}, this.i18nInit(), this.title = this.i18n("pluginNameFacebook"), this.onFirstRender = this.onFirstRender.bind(this), this.render = this.render.bind(this)
				}
				install() {
					this.view = new a(this, {
						provider: this.provider
					});
					const {
						target: e
					} = this.opts;
					e && this.mount(e, this)
				}
				uninstall() {
					this.view.tearDown(), this.unmount()
				}
				onFirstRender() {
					return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder()])
				}
				render(e) {
					const t = {};
					return this.getPluginState().files.length && !this.getPluginState().folders.length && (t.viewType = "grid", t.showFilter = !1, t.showTitles = !1), this.view.render(e, t)
				}
			}, r.VERSION = "2.0.4", s)
		}, {
			"@uppy/companion-client": 83,
			"@uppy/core": 89,
			"@uppy/provider-views": 156,
			preact: 28
		}],
		119: [function(e, t, i) {
			"use strict";
			var r, s;
			const {
				UIPlugin: n
			} = e("@uppy/core"), o = e("@uppy/utils/lib/toArray"), {
				h: a
			} = e("preact");
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					super(e, t), this.id = this.opts.id || "FileInput", this.title = "File Input", this.type = "acquirer", this.defaultLocale = {
						strings: {
							chooseFiles: "Choose files"
						}
					};
					this.opts = {
						target: null,
						pretty: !0,
						inputName: "files[]",
						...t
					}, this.i18nInit(), this.render = this.render.bind(this), this.handleInputChange = this.handleInputChange.bind(this), this.handleClick = this.handleClick.bind(this)
				}
				addFiles(e) {
					const t = e.map((e => ({
						source: this.id,
						name: e.name,
						type: e.type,
						data: e
					})));
					try {
						this.uppy.addFiles(t)
					} catch (e) {
						this.uppy.log(e)
					}
				}
				handleInputChange(e) {
					this.uppy.log("[FileInput] Something selected through input...");
					const t = o(e.target.files);
					this.addFiles(t), e.target.value = null
				}
				handleClick() {
					this.input.click()
				}
				render() {
					const {
						restrictions: e
					} = this.uppy.opts, t = e.allowedFileTypes ? e.allowedFileTypes.join(",") : null;
					return a("div", {
						className: "uppy-Root uppy-FileInput-container"
					}, a("input", {
						className: "uppy-FileInput-input",
						style: this.opts.pretty && {
							width: "0.1px",
							height: "0.1px",
							opacity: 0,
							overflow: "hidden",
							position: "absolute",
							zIndex: -1
						},
						type: "file",
						name: this.opts.inputName,
						onChange: this.handleInputChange,
						multiple: 1 !== e.maxNumberOfFiles,
						accept: t,
						ref: e => {
							this.input = e
						}
					}), this.opts.pretty && a("button", {
						className: "uppy-FileInput-btn",
						type: "button",
						onClick: this.handleClick
					}, this.i18n("chooseFiles")))
				}
				install() {
					const {
						target: e
					} = this.opts;
					e && this.mount(e, this)
				}
				uninstall() {
					this.unmount()
				}
			}, r.VERSION = "2.0.4", s)
		}, {
			"@uppy/core": 89,
			"@uppy/utils/lib/toArray": 224,
			preact: 28
		}],
		120: [function(e, t, i) {
			"use strict";
			var r, s;
			const n = e("@uppy/core/lib/BasePlugin"),
				o = e("@uppy/utils/lib/findDOMElement"),
				a = e("@uppy/utils/lib/toArray"),
				l = e("get-form-data").default || e("get-form-data");
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					super(e, t), this.type = "acquirer", this.id = this.opts.id || "Form", this.title = "Form";
					this.opts = {
						target: null,
						resultName: "uppyResult",
						getMetaFromForm: !0,
						addResultToForm: !0,
						submitOnSuccess: !1,
						triggerUploadOnSubmit: !1,
						...t
					}, this.handleFormSubmit = this.handleFormSubmit.bind(this), this.handleUploadStart = this.handleUploadStart.bind(this), this.handleSuccess = this.handleSuccess.bind(this), this.addResultToForm = this.addResultToForm.bind(this), this.getMetaFromForm = this.getMetaFromForm.bind(this)
				}
				handleUploadStart() {
					this.opts.getMetaFromForm && this.getMetaFromForm()
				}
				handleSuccess(e) {
					this.opts.addResultToForm && this.addResultToForm(e), this.opts.submitOnSuccess && this.form.submit()
				}
				handleFormSubmit(e) {
					if (this.opts.triggerUploadOnSubmit) {
						e.preventDefault();
						const t = a(e.target.elements),
							i = [];
						t.forEach((e => {
							("BUTTON" === e.tagName || "INPUT" === e.tagName && "submit" === e.type) && !e.disabled && (e.disabled = !0, i.push(e))
						})), this.uppy.upload().then((() => {
							i.forEach((e => {
								e.disabled = !1
							}))
						}), (e => (i.forEach((e => {
							e.disabled = !1
						})), Promise.reject(e)))).catch((e => {
							this.uppy.log(e.stack || e.message || e)
						}))
					}
				}
				addResultToForm(e) {
					this.uppy.log("[Form] Adding result to the original form:"), this.uppy.log(e);
					let t = this.form.querySelector(`[name="${this.opts.resultName}"]`);
					if (t) {
						let i;
						try {
							i = JSON.parse(t.value)
						} catch (e) {}
						return Array.isArray(i) || (i = []), i.push(e), void(t.value = JSON.stringify(i))
					}
					t = document.createElement("input"), t.name = this.opts.resultName, t.type = "hidden", t.value = JSON.stringify([e]), this.form.appendChild(t)
				}
				getMetaFromForm() {
					const e = l(this.form);
					delete e[this.opts.resultName], this.uppy.setMeta(e)
				}
				install() {
					this.form = o(this.opts.target), this.form && "FORM" === this.form.nodeName ? (this.form.addEventListener("submit", this.handleFormSubmit), this.uppy.on("upload", this.handleUploadStart), this.uppy.on("complete", this.handleSuccess)) : this.uppy.log("Form plugin requires a <form> target element passed in options to operate, none was found", "error")
				}
				uninstall() {
					this.form.removeEventListener("submit", this.handleFormSubmit), this.uppy.off("upload", this.handleUploadStart), this.uppy.off("complete", this.handleSuccess)
				}
			}, r.VERSION = "2.0.4", s)
		}, {
			"@uppy/core/lib/BasePlugin": 85,
			"@uppy/utils/lib/findDOMElement": 198,
			"@uppy/utils/lib/toArray": 224,
			"get-form-data": 12
		}],
		121: [function(e, t, i) {
			"use strict";
			const r = "undefined" != typeof window && (window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB),
				s = !!r,
				n = "uppy-blobs",
				o = "files",
				a = 864e5;

			function l(e) {
				const t = r.open(e, 3);
				return new Promise(((e, i) => {
					t.onupgradeneeded = t => {
						const i = t.target.result,
							{
								transaction: r
							} = t.currentTarget;
						if (t.oldVersion < 2) {
							i.createObjectStore(o, {
								keyPath: "id"
							}).createIndex("store", "store", {
								unique: !1
							})
						}
						if (t.oldVersion < 3) {
							const e = r.objectStore(o);
							e.createIndex("expires", "expires", {
									unique: !1
								}),
								function(e) {
									e.openCursor().onsuccess = e => {
										const t = e.target.result;
										if (!t) return;
										const i = t.value;
										i.expires = Date.now() + a, t.update(i)
									}
								}(e)
						}
						r.oncomplete = () => {
							e(i)
						}
					}, t.onsuccess = t => {
						e(t.target.result)
					}, t.onerror = i
				}))
			}

			function u(e) {
				return new Promise(((t, i) => {
					e.onsuccess = e => {
						t(e.target.result)
					}, e.onerror = i
				}))
			}
			let p = !1;
			class c {
				constructor(e) {
					this.opts = {
						dbName: n,
						storeName: "default",
						expires: a,
						maxFileSize: 10485760,
						maxTotalSize: 314572800,
						...e
					}, this.name = this.opts.storeName;
					const t = () => l(this.opts.dbName);
					p ? this.ready = t() : (p = !0, this.ready = c.cleanup().then(t, t))
				}
				key(e) {
					return `${this.name}!${e}`
				}
				list() {
					return this.ready.then((e => u(e.transaction([o], "readonly").objectStore(o).index("store").getAll(IDBKeyRange.only(this.name))))).then((e => {
						const t = {};
						return e.forEach((e => {
							t[e.fileID] = e.data
						})), t
					}))
				}
				get(e) {
					return this.ready.then((t => u(t.transaction([o], "readonly").objectStore(o).get(this.key(e))))).then((e => ({
						id: e.data.fileID,
						data: e.data.data
					})))
				}
				getSize() {
					return this.ready.then((e => {
						const t = e.transaction([o], "readonly").objectStore(o).index("store").openCursor(IDBKeyRange.only(this.name));
						return new Promise(((e, i) => {
							let r = 0;
							t.onsuccess = t => {
								const i = t.target.result;
								i ? (r += i.value.data.size, i.continue()) : e(r)
							}, t.onerror = () => {
								i(new Error("Could not retrieve stored blobs size"))
							}
						}))
					}))
				}
				put(e) {
					return e.data.size > this.opts.maxFileSize ? Promise.reject(new Error("File is too big to store.")) : this.getSize().then((e => e > this.opts.maxTotalSize ? Promise.reject(new Error("No space left")) : this.ready)).then((t => u(t.transaction([o], "readwrite").objectStore(o).add({
						id: this.key(e.id),
						fileID: e.id,
						store: this.name,
						expires: Date.now() + this.opts.expires,
						data: e.data
					}))))
				}
				delete(e) {
					return this.ready.then((t => u(t.transaction([o], "readwrite").objectStore(o).delete(this.key(e)))))
				}
				static cleanup() {
					return l(n).then((e => {
						const t = e.transaction([o], "readwrite").objectStore(o).index("expires").openCursor(IDBKeyRange.upperBound(Date.now()));
						return new Promise(((i, r) => {
							t.onsuccess = t => {
								const r = t.target.result;
								r ? (r.delete(), r.continue()) : i(e)
							}, t.onerror = r
						}))
					})).then((e => {
						e.close()
					}))
				}
			}
			c.isSupported = s, t.exports = c
		}, {}],
		122: [function(e, t, i) {
			"use strict";

			function r(e) {
				try {
					return JSON.parse(e)
				} catch (e) {
					return null
				}
			}
			let s = !1;
			t.exports = class e {
				constructor(t) {
					this.opts = {
						expires: 864e5,
						...t
					}, this.name = `uppyState:${t.storeName}`, s || (s = !0, e.cleanup())
				}
				load() {
					const e = localStorage.getItem(this.name);
					if (!e) return null;
					const t = r(e);
					return t ? t.metadata ? t.metadata : (this.save(t), t) : null
				}
				save(e) {
					const t = Date.now() + this.opts.expires,
						i = JSON.stringify({
							metadata: e,
							expires: t
						});
					localStorage.setItem(this.name, i)
				}
				static cleanup(e) {
					if (e) return void localStorage.removeItem(`uppyState:${e}`);
					const t = function() {
							const e = [];
							for (let t = 0; t < localStorage.length; t++) {
								const i = localStorage.key(t);
								/^uppyState:/.test(i) && e.push(i.slice("uppyState:".length))
							}
							return e
						}(),
						i = Date.now();
					t.forEach((e => {
						const t = localStorage.getItem(`uppyState:${e}`);
						if (!t) return null;
						const s = r(t);
						if (!s) return null;
						s.expires && s.expires < i && localStorage.removeItem(`uppyState:${e}`)
					}))
				}
			}
		}, {}],
		123: [function(e, t, i) {
			"use strict";
			const r = "undefined" != typeof navigator && "serviceWorker" in navigator;
			class s {
				constructor(e) {
					this.ready = new Promise(((e, t) => {
						r ? navigator.serviceWorker.controller ? e() : navigator.serviceWorker.addEventListener("controllerchange", (() => {
							e()
						})) : t(new Error("Unsupported"))
					})), this.name = e.storeName
				}
				list() {
					const e = {},
						t = new Promise(((t, i) => {
							e.resolve = t, e.reject = i
						}));
					console.log("Loading stored blobs from Service Worker");
					const i = t => {
						if (t.data.store === this.name)
							if ("uppy/ALL_FILES" === t.data.type) e.resolve(t.data.files), navigator.serviceWorker.removeEventListener("message", i);
							else e.reject()
					};
					return this.ready.then((() => {
						navigator.serviceWorker.addEventListener("message", i), navigator.serviceWorker.controller.postMessage({
							type: "uppy/GET_FILES",
							store: this.name
						})
					})), t
				}
				put(e) {
					return this.ready.then((() => {
						navigator.serviceWorker.controller.postMessage({
							type: "uppy/ADD_FILE",
							store: this.name,
							file: e
						})
					}))
				}
				delete(e) {
					return this.ready.then((() => {
						navigator.serviceWorker.controller.postMessage({
							type: "uppy/REMOVE_FILE",
							store: this.name,
							fileID: e
						})
					}))
				}
			}
			s.isSupported = r, t.exports = s
		}, {}],
		124: [function(e, t, i) {
			"use strict";
			var r, s;
			const n = e("lodash.throttle"),
				o = e("@uppy/core/lib/BasePlugin"),
				a = e("./ServiceWorkerStore"),
				l = e("./IndexedDBStore"),
				u = e("./MetaDataStore");
			t.exports = (s = r = class extends o {
				constructor(e, t) {
					super(e, t), this.addBlobToStores = e => {
						e.isRemote || (this.ServiceWorkerStore && this.ServiceWorkerStore.put(e).catch((e => {
							this.uppy.log("[GoldenRetriever] Could not store file", "warning"), this.uppy.log(e)
						})), this.IndexedDBStore.put(e).catch((e => {
							this.uppy.log("[GoldenRetriever] Could not store file", "warning"), this.uppy.log(e)
						})))
					}, this.removeBlobFromStores = e => {
						this.ServiceWorkerStore && this.ServiceWorkerStore.delete(e.id).catch((e => {
							this.uppy.log("[GoldenRetriever] Failed to remove file", "warning"), this.uppy.log(e)
						})), this.IndexedDBStore.delete(e.id).catch((e => {
							this.uppy.log("[GoldenRetriever] Failed to remove file", "warning"), this.uppy.log(e)
						}))
					}, this.replaceBlobInStores = e => {
						this.removeBlobFromStores(e), this.addBlobToStores(e)
					}, this.handleRestoreConfirmed = () => {
						this.uppy.log("[GoldenRetriever] Restore confirmed, proceeding...");
						const {
							currentUploads: e
						} = this.uppy.getState();
						e && (Object.keys(e).forEach((t => {
							this.uppy.restore(t, e[t])
						})), this.uppy.resumeAll()), this.uppy.upload(), this.uppy.setState({
							recoveredState: null
						})
					}, this.abortRestore = () => {
						this.uppy.log("[GoldenRetriever] Aborting restore...");
						const e = Object.keys(this.uppy.getState().files);
						this.deleteBlobs(e).then((() => {
							this.uppy.log(`[GoldenRetriever] Removed ${e.length} files`)
						})).catch((t => {
							this.uppy.log(`[GoldenRetriever] Could not remove ${e.length} files`, "warning"), this.uppy.log(t)
						})), this.uppy.cancelAll(), this.uppy.setState({
							recoveredState: null
						}), u.cleanup(this.uppy.opts.id)
					}, this.handleComplete = ({
						successful: e
					}) => {
						const t = e.map((e => e.id));
						this.deleteBlobs(t).then((() => {
							this.uppy.log(`[GoldenRetriever] Removed ${e.length} files that finished uploading`)
						})).catch((t => {
							this.uppy.log(`[GoldenRetriever] Could not remove ${e.length} files that finished uploading`, "warning"), this.uppy.log(t)
						})), this.uppy.setState({
							recoveredState: null
						}), u.cleanup(this.uppy.opts.id)
					}, this.restoreBlobs = () => {
						this.uppy.getFiles().length > 0 ? Promise.all([this.loadFileBlobsFromServiceWorker(), this.loadFileBlobsFromIndexedDB()]).then((e => {
							const t = {
								...e[0],
								...e[1]
							};
							this.onBlobsLoaded(t)
						})) : (this.uppy.log("[GoldenRetriever] No files need to be loaded, only restoring processing state..."), this.onBlobsLoaded([]))
					}, this.type = "debugger", this.id = this.opts.id || "GoldenRetriever", this.title = "Golden Retriever";
					this.opts = {
						expires: 864e5,
						serviceWorker: !1,
						...t
					}, this.MetaDataStore = new u({
						expires: this.opts.expires,
						storeName: e.getID()
					}), this.ServiceWorkerStore = null, this.opts.serviceWorker && (this.ServiceWorkerStore = new a({
						storeName: e.getID()
					})), this.IndexedDBStore = new l({
						expires: this.opts.expires,
						...this.opts.indexedDB || {},
						storeName: e.getID()
					}), this.saveFilesStateToLocalStorage = n(this.saveFilesStateToLocalStorage.bind(this), 500, {
						leading: !0,
						trailing: !0
					}), this.restoreState = this.restoreState.bind(this), this.loadFileBlobsFromServiceWorker = this.loadFileBlobsFromServiceWorker.bind(this), this.loadFileBlobsFromIndexedDB = this.loadFileBlobsFromIndexedDB.bind(this), this.onBlobsLoaded = this.onBlobsLoaded.bind(this)
				}
				restoreState() {
					const e = this.MetaDataStore.load();
					e && (this.uppy.log("[GoldenRetriever] Recovered some state from Local Storage"), this.uppy.setState({
						currentUploads: e.currentUploads || {},
						files: e.files || {},
						recoveredState: e
					}), this.savedPluginData = e.pluginData)
				}
				getWaitingFiles() {
					const e = {};
					return this.uppy.getFiles().forEach((t => {
						t.progress && t.progress.uploadStarted || (e[t.id] = t)
					})), e
				}
				getUploadingFiles() {
					const e = {},
						{
							currentUploads: t
						} = this.uppy.getState();
					if (t) {
						Object.keys(t).forEach((i => {
							t[i].fileIDs.forEach((t => {
								e[t] = this.uppy.getFile(t)
							}))
						}))
					}
					return e
				}
				saveFilesStateToLocalStorage() {
					const e = {
						...this.getWaitingFiles(),
						...this.getUploadingFiles()
					};
					if (0 === Object.keys(e).length) return this.uppy.setState({
						recoveredState: null
					}), void u.cleanup(this.uppy.opts.id);
					const t = {};
					Object.keys(e).forEach((i => {
						e[i].isRemote ? t[i] = {
							...e[i],
							isRestored: !0
						} : t[i] = {
							...e[i],
							isRestored: !0,
							data: null,
							preview: null
						}
					}));
					const i = {};
					this.uppy.emit("restore:get-data", (e => {
						Object.assign(i, e)
					}));
					const {
						currentUploads: r
					} = this.uppy.getState();
					this.MetaDataStore.save({
						currentUploads: r,
						files: t,
						pluginData: i
					})
				}
				loadFileBlobsFromServiceWorker() {
					return this.ServiceWorkerStore ? this.ServiceWorkerStore.list().then((e => {
						const t = this.uppy.getFiles().filter((e => !e.isRemote)),
							i = Object.keys(e).length;
						return i === t.length ? (this.uppy.log(`[GoldenRetriever] Successfully recovered ${i} blobs from Service Worker!`), e) : (this.uppy.log("[GoldenRetriever] No blobs found in Service Worker, trying IndexedDB now..."), {})
					})).catch((e => (this.uppy.log("[GoldenRetriever] Failed to recover blobs from Service Worker", "warning"), this.uppy.log(e), {}))) : Promise.resolve({})
				}
				loadFileBlobsFromIndexedDB() {
					return this.IndexedDBStore.list().then((e => {
						const t = Object.keys(e).length;
						return t > 0 ? (this.uppy.log(`[GoldenRetriever] Successfully recovered ${t} blobs from IndexedDB!`), e) : (this.uppy.log("[GoldenRetriever] No blobs found in IndexedDB"), {})
					})).catch((e => (this.uppy.log("[GoldenRetriever] Failed to recover blobs from IndexedDB", "warning"), this.uppy.log(e), {})))
				}
				onBlobsLoaded(e) {
					const t = [],
						i = {
							...this.uppy.getState().files
						};
					Object.keys(e).forEach((r => {
						const s = this.uppy.getFile(r);
						if (!s) return void t.push(r);
						const n = {
							data: e[r],
							isRestored: !0,
							isGhost: !1
						};
						i[r] = {
							...s,
							...n
						}
					})), Object.keys(i).forEach((e => {
						null === i[e].data && (i[e] = {
							...i[e],
							isGhost: !0
						})
					})), this.uppy.setState({
						files: i
					}), this.uppy.emit("restored", this.savedPluginData), t.length && this.deleteBlobs(t).then((() => {
						this.uppy.log(`[GoldenRetriever] Cleaned up ${t.length} old files`)
					})).catch((e => {
						this.uppy.log(`[GoldenRetriever] Could not clean up ${t.length} old files`, "warning"), this.uppy.log(e)
					}))
				}
				deleteBlobs(e) {
					const t = [];
					return e.forEach((e => {
						this.ServiceWorkerStore && t.push(this.ServiceWorkerStore.delete(e)), this.IndexedDBStore && t.push(this.IndexedDBStore.delete(e))
					})), Promise.all(t)
				}
				install() {
					this.restoreState(), this.restoreBlobs(), this.uppy.on("file-added", this.addBlobToStores), this.uppy.on("file-editor:complete", this.replaceBlobInStores), this.uppy.on("file-removed", this.removeBlobFromStores), this.uppy.on("state-update", this.saveFilesStateToLocalStorage), this.uppy.on("restore-confirmed", this.handleRestoreConfirmed), this.uppy.on("restore-canceled", this.abortRestore), this.uppy.on("complete", this.handleComplete)
				}
				uninstall() {
					this.uppy.off("file-added", this.addBlobToStores), this.uppy.off("file-editor:complete", this.replaceBlobInStores), this.uppy.off("file-removed", this.removeBlobFromStores), this.uppy.off("state-update", this.saveFilesStateToLocalStorage), this.uppy.off("restore-confirmed", this.handleRestoreConfirmed), this.uppy.off("restore-canceled", this.abortRestore), this.uppy.off("complete", this.handleComplete)
				}
			}, r.VERSION = "2.0.5", s)
		}, {
			"./IndexedDBStore": 121,
			"./MetaDataStore": 122,
			"./ServiceWorkerStore": 123,
			"@uppy/core/lib/BasePlugin": 85,
			"lodash.throttle": 18
		}],
		125: [function(e, t, i) {
			"use strict";
			const {
				ProviderViews: r
			} = e("@uppy/provider-views");
			t.exports = class extends r {
				toggleCheckbox(e, t) {
					e.stopPropagation(), e.preventDefault(), t.custom.isSharedDrive || super.toggleCheckbox(e, t)
				}
			}
		}, {
			"@uppy/provider-views": 156
		}],
		126: [function(e, t, i) {
			"use strict";
			var r, s;
			const {
				UIPlugin: n
			} = e("@uppy/core"), {
				Provider: o
			} = e("@uppy/companion-client"), {
				h: a
			} = e("preact"), l = e("./DriveProviderViews");
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					super(e, t), this.id = this.opts.id || "GoogleDrive", this.title = this.opts.title || "Google Drive", o.initPlugin(this, t), this.title = this.opts.title || "Google Drive", this.icon = () => a("svg", {
						"aria-hidden": "true",
						focusable: "false",
						width: "32",
						height: "32",
						viewBox: "0 0 32 32"
					}, a("g", {
						fill: "none",
						fillRule: "evenodd"
					}, a("rect", {
						className: "uppy-ProviderIconBg",
						fill: "#4285F4",
						width: "32",
						height: "32",
						rx: "16"
					}), a("path", {
						d: "M25.216 17.736L19.043 7h-6.086l6.175 10.736h6.084zm-11.275.896L10.9 24h11.723l3.04-5.368H13.942zm-1.789-10.29l-5.816 10.29L9.38 24l5.905-10.29-3.132-5.369z",
						fill: "#FFF"
					}))), this.provider = new o(e, {
						companionUrl: this.opts.companionUrl,
						companionHeaders: this.opts.companionHeaders,
						companionKeysParams: this.opts.companionKeysParams,
						companionCookiesRule: this.opts.companionCookiesRule,
						provider: "drive",
						pluginId: this.id
					}), this.defaultLocale = {
						strings: {
							pluginNameGoogleDrive: "Google Drive"
						}
					}, this.i18nInit(), this.title = this.i18n("pluginNameGoogleDrive"), this.onFirstRender = this.onFirstRender.bind(this), this.render = this.render.bind(this)
				}
				install() {
					this.view = new l(this, {
						provider: this.provider
					});
					const {
						target: e
					} = this.opts;
					e && this.mount(e, this)
				}
				uninstall() {
					this.view.tearDown(), this.unmount()
				}
				onFirstRender() {
					return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder("root", "/")])
				}
				render(e) {
					return this.view.render(e)
				}
			}, r.VERSION = "2.0.4", s)
		}, {
			"./DriveProviderViews": 125,
			"@uppy/companion-client": 83,
			"@uppy/core": 89,
			preact: 28
		}],
		127: [function(e, t, i) {
			"use strict";
			const r = e("cropperjs"),
				{
					h: s,
					Component: n
				} = e("preact"),
				o = r.__esModule ? r.default : r;
			t.exports = class extends n {
				constructor(e) {
					super(e), this.save = () => {
						const {
							opts: e,
							save: t,
							currentImage: i
						} = this.props;
						this.cropper.getCroppedCanvas(e.cropperOptions.croppedCanvasOptions).toBlob((e => t(e)), i.type, e.quality)
					}, this.granularRotateOnChange = e => {
						const {
							rotationAngle: t,
							rotationDelta: i
						} = this.state, r = Number(e.target.value) - i;
						if (cancelAnimationFrame(this.granularRotateOnInputNextFrame), 0 !== r) {
							const e = t + r;
							this.granularRotateOnInputNextFrame = requestAnimationFrame((() => {
								this.cropper.rotateTo(e)
							}))
						}
					}, this.state = {
						rotationAngle: 0,
						rotationDelta: 0
					}
				}
				componentDidMount() {
					const {
						opts: e,
						storeCropperInstance: t
					} = this.props;
					this.cropper = new o(this.imgElement, e.cropperOptions), t(this.cropper), e.actions.granularRotate && this.imgElement.addEventListener("crop", (e => {
						const t = e.detail.rotate;
						this.setState({
							rotationAngle: t,
							rotationDelta: (t + 405) % 90 - 45
						})
					}))
				}
				componentWillUnmount() {
					this.cropper.destroy()
				}
				renderGranularRotate() {
					const {
						i18n: e
					} = this.props, {
						rotationDelta: t,
						rotationAngle: i
					} = this.state;
					return s("label", {
						"data-microtip-position": "top",
						role: "tooltip",
						"aria-label": `${i}º`,
						className: "uppy-ImageCropper-rangeWrapper uppy-u-reset"
					}, s("input", {
						className: "uppy-ImageCropper-range uppy-u-reset",
						type: "range",
						onInput: this.granularRotateOnChange,
						onChange: this.granularRotateOnChange,
						value: t,
						min: "-45",
						max: "44",
						"aria-label": e("rotate")
					}))
				}
				renderRevert() {
					const {
						i18n: e
					} = this.props;
					return s("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn",
						"aria-label": e("revert"),
						"data-microtip-position": "top",
						onClick: () => {
							this.cropper.reset(), this.cropper.setAspectRatio(0)
						}
					}, s("svg", {
						"aria-hidden": "true",
						className: "uppy-c-icon",
						width: "24",
						height: "24",
						viewBox: "0 0 24 24"
					}, s("path", {
						d: "M0 0h24v24H0z",
						fill: "none"
					}), s("path", {
						d: "M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"
					})))
				}
				renderRotate() {
					const {
						i18n: e
					} = this.props;
					return s("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn",
						onClick: () => this.cropper.rotate(-90),
						"aria-label": e("rotate"),
						"data-microtip-position": "top"
					}, s("svg", {
						"aria-hidden": "true",
						className: "uppy-c-icon",
						width: "24",
						height: "24",
						viewBox: "0 0 24 24"
					}, s("path", {
						d: "M0 0h24v24H0V0zm0 0h24v24H0V0z",
						fill: "none"
					}), s("path", {
						d: "M14 10a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2h8zm0 1.75H6a.25.25 0 00-.243.193L5.75 12v7a.25.25 0 00.193.243L6 19.25h8a.25.25 0 00.243-.193L14.25 19v-7a.25.25 0 00-.193-.243L14 11.75zM12 .76V4c2.3 0 4.61.88 6.36 2.64a8.95 8.95 0 012.634 6.025L21 13a1 1 0 01-1.993.117L19 13h-.003a6.979 6.979 0 00-2.047-4.95 6.97 6.97 0 00-4.652-2.044L12 6v3.24L7.76 5 12 .76z"
					})))
				}
				renderFlip() {
					const {
						i18n: e
					} = this.props;
					return s("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn",
						"aria-label": e("flipHorizontal"),
						"data-microtip-position": "top",
						onClick: () => this.cropper.scaleX(-this.cropper.getData().scaleX || -1)
					}, s("svg", {
						"aria-hidden": "true",
						className: "uppy-c-icon",
						width: "24",
						height: "24",
						viewBox: "0 0 24 24"
					}, s("path", {
						d: "M0 0h24v24H0z",
						fill: "none"
					}), s("path", {
						d: "M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z"
					})))
				}
				renderZoomIn() {
					const {
						i18n: e
					} = this.props;
					return s("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn",
						"aria-label": e("zoomIn"),
						"data-microtip-position": "top",
						onClick: () => this.cropper.zoom(.1)
					}, s("svg", {
						"aria-hidden": "true",
						className: "uppy-c-icon",
						height: "24",
						viewBox: "0 0 24 24",
						width: "24"
					}, s("path", {
						d: "M0 0h24v24H0V0z",
						fill: "none"
					}), s("path", {
						d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
					}), s("path", {
						d: "M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"
					})))
				}
				renderZoomOut() {
					const {
						i18n: e
					} = this.props;
					return s("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn",
						"aria-label": e("zoomOut"),
						"data-microtip-position": "top",
						onClick: () => this.cropper.zoom(-.1)
					}, s("svg", {
						"aria-hidden": "true",
						className: "uppy-c-icon",
						width: "24",
						height: "24",
						viewBox: "0 0 24 24"
					}, s("path", {
						d: "M0 0h24v24H0V0z",
						fill: "none"
					}), s("path", {
						d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"
					})))
				}
				renderCropSquare() {
					const {
						i18n: e
					} = this.props;
					return s("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn",
						"aria-label": e("aspectRatioSquare"),
						"data-microtip-position": "top",
						onClick: () => this.cropper.setAspectRatio(1)
					}, s("svg", {
						"aria-hidden": "true",
						className: "uppy-c-icon",
						width: "24",
						height: "24",
						viewBox: "0 0 24 24"
					}, s("path", {
						d: "M0 0h24v24H0z",
						fill: "none"
					}), s("path", {
						d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
					})))
				}
				renderCropWidescreen() {
					const {
						i18n: e
					} = this.props;
					return s("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn",
						"aria-label": e("aspectRatioLandscape"),
						"data-microtip-position": "top",
						onClick: () => this.cropper.setAspectRatio(16 / 9)
					}, s("svg", {
						"aria-hidden": "true",
						className: "uppy-c-icon",
						width: "24",
						height: "24",
						viewBox: "0 0 24 24"
					}, s("path", {
						d: "M 19,4.9999992 V 17.000001 H 4.9999998 V 6.9999992 H 19 m 0,-2 H 4.9999998 c -1.0999999,0 -1.9999999,0.9000001 -1.9999999,2 V 17.000001 c 0,1.1 0.9,2 1.9999999,2 H 19 c 1.1,0 2,-0.9 2,-2 V 6.9999992 c 0,-1.0999999 -0.9,-2 -2,-2 z"
					}), s("path", {
						fill: "none",
						d: "M0 0h24v24H0z"
					})))
				}
				renderCropWidescreenVertical() {
					const {
						i18n: e
					} = this.props;
					return s("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn",
						"aria-label": e("aspectRatioPortrait"),
						"data-microtip-position": "top",
						onClick: () => this.cropper.setAspectRatio(9 / 16)
					}, s("svg", {
						"aria-hidden": "true",
						className: "uppy-c-icon",
						width: "24",
						height: "24",
						viewBox: "0 0 24 24"
					}, s("path", {
						d: "M 19.000001,19 H 6.999999 V 5 h 10.000002 v 14 m 2,0 V 5 c 0,-1.0999999 -0.9,-1.9999999 -2,-1.9999999 H 6.999999 c -1.1,0 -2,0.9 -2,1.9999999 v 14 c 0,1.1 0.9,2 2,2 h 10.000002 c 1.1,0 2,-0.9 2,-2 z"
					}), s("path", {
						d: "M0 0h24v24H0z",
						fill: "none"
					})))
				}
				render() {
					const {
						currentImage: e,
						opts: t
					} = this.props, {
						actions: i
					} = t, r = URL.createObjectURL(e.data);
					return s("div", {
						className: "uppy-ImageCropper"
					}, s("div", {
						className: "uppy-ImageCropper-container"
					}, s("img", {
						className: "uppy-ImageCropper-image",
						alt: e.name,
						src: r,
						ref: e => {
							this.imgElement = e
						}
					})), s("div", {
						className: "uppy-ImageCropper-controls"
					}, i.revert && this.renderRevert(), i.rotate && this.renderRotate(), i.granularRotate && this.renderGranularRotate(), i.flip && this.renderFlip(), i.zoomIn && this.renderZoomIn(), i.zoomOut && this.renderZoomOut(), i.cropSquare && this.renderCropSquare(), i.cropWidescreen && this.renderCropWidescreen(), i.cropWidescreenVertical && this.renderCropWidescreenVertical()))
				}
			}
		}, {
			cropperjs: 8,
			preact: 28
		}],
		128: [function(e, t, i) {
			"use strict";
			var r, s;
			const {
				UIPlugin: n
			} = e("@uppy/core"), {
				h: o
			} = e("preact"), a = e("./Editor");
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					super(e, t), this.save = () => {
						const {
							currentImage: e
						} = this.getPluginState();
						this.cropper.getCroppedCanvas().toBlob((e => {
							const {
								currentImage: t
							} = this.getPluginState();
							this.uppy.setFileState(t.id, {
								data: e,
								size: e.size,
								preview: null
							});
							const i = this.uppy.getFile(t.id);
							this.uppy.emit("thumbnail:request", i), this.setPluginState({
								currentImage: i
							}), this.uppy.emit("file-editor:complete", i)
						}), e.type, this.opts.quality)
					}, this.storeCropperInstance = e => {
						this.cropper = e
					}, this.selectFile = e => {
						this.uppy.emit("file-editor:start", e), this.setPluginState({
							currentImage: e
						})
					}, this.id = this.opts.id || "ImageEditor", this.title = "Image Editor", this.type = "editor", this.defaultLocale = {
						strings: {
							revert: "Revert",
							rotate: "Rotate",
							zoomIn: "Zoom in",
							zoomOut: "Zoom out",
							flipHorizontal: "Flip horizontal",
							aspectRatioSquare: "Crop square",
							aspectRatioLandscape: "Crop landscape (16:9)",
							aspectRatioPortrait: "Crop portrait (9:16)"
						}
					};
					this.opts = {
						quality: .8,
						...t,
						actions: {
							revert: !0,
							rotate: !0,
							granularRotate: !0,
							flip: !0,
							zoomIn: !0,
							zoomOut: !0,
							cropSquare: !0,
							cropWidescreen: !0,
							cropWidescreenVertical: !0,
							...t.actions
						},
						cropperOptions: {
							viewMode: 1,
							background: !1,
							autoCropArea: 1,
							responsive: !0,
							croppedCanvasOptions: {},
							...t.cropperOptions
						}
					}, this.i18nInit()
				}
				canEditFile(e) {
					if (!e.type || e.isRemote) return !1;
					const t = e.type.split("/")[1];
					return !!/^(jpe?g|gif|png|bmp|webp)$/.test(t)
				}
				install() {
					this.setPluginState({
						currentImage: null
					});
					const {
						target: e
					} = this.opts;
					e && this.mount(e, this)
				}
				uninstall() {
					this.unmount()
				}
				render() {
					const {
						currentImage: e
					} = this.getPluginState();
					return null === e || e.isRemote ? null : o(a, {
						currentImage: e,
						storeCropperInstance: this.storeCropperInstance,
						save: this.save,
						opts: this.opts,
						i18n: this.i18n
					})
				}
			}, r.VERSION = "1.0.4", s)
		}, {
			"./Editor": 127,
			"@uppy/core": 89,
			preact: 28
		}],
		129: [function(e, t, i) {
			"use strict";
			const {
				h: r,
				Component: s,
				createRef: n
			} = e("preact");
			t.exports = class extends s {
				constructor(...e) {
					super(...e), this.ref = n()
				}
				componentWillEnter(e) {
					this.ref.current.style.opacity = "1", this.ref.current.style.transform = "none", setTimeout(e, 300)
				}
				componentWillLeave(e) {
					this.ref.current.style.opacity = "0", this.ref.current.style.transform = "translateY(350%)", setTimeout(e, 300)
				}
				render() {
					const {
						children: e
					} = this.props;
					return r("div", {
						className: "uppy-Informer-animated",
						ref: this.ref
					}, e)
				}
			}
		}, {
			preact: 28
		}],
		130: [function(e, t, i) {
			"use strict";
			const {
				Component: r,
				cloneElement: s,
				h: n,
				toChildArray: o
			} = e("preact");

			function a(e, t) {
				const i = e._ptgLinkedRefs || (e._ptgLinkedRefs = {});
				return i[t] || (i[t] = i => {
					e.refs[t] = i
				})
			}

			function l(e) {
				const t = {};
				for (let n = 0; n < e.length; n++)
					if (null != e[n]) {
						t[(i = e[n], r = n.toString(36), s = void 0, null != (s = null == i ? void 0 : i.key) ? s : r)] = e[n]
					} var i, r, s;
				return t
			}

			function u(e, t) {
				e = e || {}, t = t || {};
				const i = i => t.hasOwnProperty(i) ? t[i] : e[i],
					r = {};
				let s = [];
				for (const i in e) t.hasOwnProperty(i) ? s.length && (r[i] = s, s = []) : s.push(i);
				const n = {};
				for (const e in t) {
					if (r.hasOwnProperty(e))
						for (let t = 0; t < r[e].length; t++) {
							const s = r[e][t];
							n[r[e][t]] = i(s)
						}
					n[e] = i(e)
				}
				for (let e = 0; e < s.length; e++) n[s[e]] = i(s[e]);
				return n
			}
			class p extends r {
				constructor(e, t) {
					super(e, t), this.refs = {}, this.state = {
						children: l(o(o(this.props.children)) || [])
					}, this.performAppear = this.performAppear.bind(this), this.performEnter = this.performEnter.bind(this), this.performLeave = this.performLeave.bind(this)
				}
				componentWillMount() {
					this.currentlyTransitioningKeys = {}, this.keysToAbortLeave = [], this.keysToEnter = [], this.keysToLeave = []
				}
				componentDidMount() {
					const e = this.state.children;
					for (const t in e) e[t] && this.performAppear(t)
				}
				componentWillReceiveProps(e) {
					const t = l(o(e.children) || []),
						i = this.state.children;
					let r;
					for (r in this.setState((e => ({
							children: u(e.children, t)
						}))), t)
						if (t.hasOwnProperty(r)) {
							const e = i && i.hasOwnProperty(r);
							t[r] && e && this.currentlyTransitioningKeys[r] ? (this.keysToEnter.push(r), this.keysToAbortLeave.push(r)) : !t[r] || e || this.currentlyTransitioningKeys[r] || this.keysToEnter.push(r)
						} for (r in i)
						if (i.hasOwnProperty(r)) {
							const e = t && t.hasOwnProperty(r);
							!i[r] || e || this.currentlyTransitioningKeys[r] || this.keysToLeave.push(r)
						}
				}
				componentDidUpdate() {
					const {
						keysToEnter: e
					} = this;
					this.keysToEnter = [], e.forEach(this.performEnter);
					const {
						keysToLeave: t
					} = this;
					this.keysToLeave = [], t.forEach(this.performLeave)
				}
				_finishAbort(e) {
					const t = this.keysToAbortLeave.indexOf(e); - 1 !== t && this.keysToAbortLeave.splice(t, 1)
				}
				performAppear(e) {
					this.currentlyTransitioningKeys[e] = !0;
					const t = this.refs[e];
					t.componentWillAppear ? t.componentWillAppear(this._handleDoneAppearing.bind(this, e)) : this._handleDoneAppearing(e)
				}
				_handleDoneAppearing(e) {
					const t = this.refs[e];
					t.componentDidAppear && t.componentDidAppear(), delete this.currentlyTransitioningKeys[e], this._finishAbort(e);
					const i = l(o(this.props.children) || []);
					i && i.hasOwnProperty(e) || this.performLeave(e)
				}
				performEnter(e) {
					this.currentlyTransitioningKeys[e] = !0;
					const t = this.refs[e];
					t.componentWillEnter ? t.componentWillEnter(this._handleDoneEntering.bind(this, e)) : this._handleDoneEntering(e)
				}
				_handleDoneEntering(e) {
					const t = this.refs[e];
					t.componentDidEnter && t.componentDidEnter(), delete this.currentlyTransitioningKeys[e], this._finishAbort(e);
					const i = l(o(this.props.children) || []);
					i && i.hasOwnProperty(e) || this.performLeave(e)
				}
				performLeave(e) {
					if (-1 !== this.keysToAbortLeave.indexOf(e)) return;
					this.currentlyTransitioningKeys[e] = !0;
					const t = this.refs[e];
					t.componentWillLeave ? t.componentWillLeave(this._handleDoneLeaving.bind(this, e)) : this._handleDoneLeaving(e)
				}
				_handleDoneLeaving(e) {
					if (-1 !== this.keysToAbortLeave.indexOf(e)) return;
					const t = this.refs[e];
					t.componentDidLeave && t.componentDidLeave(), delete this.currentlyTransitioningKeys[e];
					const i = l(o(this.props.children) || []);
					if (i && i.hasOwnProperty(e)) this.performEnter(e);
					else {
						const t = (r = {}, s = this.state.children, Object.assign(r, s));
						delete t[e], this.setState({
							children: t
						})
					}
					var r, s
				}
				render({
					childFactory: e,
					transitionLeave: t,
					transitionName: i,
					transitionAppear: r,
					transitionEnter: o,
					transitionLeaveTimeout: l,
					transitionEnterTimeout: u,
					transitionAppearTimeout: p,
					component: c,
					...h
				}, {
					children: d
				}) {
					const f = [];
					for (const t in d)
						if (d.hasOwnProperty(t)) {
							const i = d[t];
							if (i) {
								const r = a(this, t),
									n = s(e(i), {
										ref: r,
										key: t
									});
								f.push(n)
							}
						} return n(c, h, f)
				}
			}
			p.defaultProps = {
				component: "span",
				childFactory: e => e
			}, t.exports = p
		}, {
			preact: 28
		}],
		131: [function(e, t, i) {
			"use strict";
			var r, s;
			const {
				h: n
			} = e("preact"), {
				UIPlugin: o
			} = e("@uppy/core"), a = e("./FadeIn"), l = e("./TransitionGroup");
			t.exports = (s = r = class extends o {
				constructor(e, t) {
					super(e, t), this.render = e => n("div", {
						className: "uppy uppy-Informer"
					}, n(l, null, e.info.map((e => n(a, {
						key: e.message
					}, n("p", {
						role: "alert"
					}, e.message, " ", e.details && n("span", {
						"aria-label": e.details,
						"data-microtip-position": "top-left",
						"data-microtip-size": "medium",
						role: "tooltip",
						onClick: () => alert(`${e.message} \n\n ${e.details}`)
					}, "?"))))))), this.type = "progressindicator", this.id = this.opts.id || "Informer", this.title = "Informer";
					this.opts = {
						...t
					}
				}
				install() {
					const {
						target: e
					} = this.opts;
					e && this.mount(e, this)
				}
			}, r.VERSION = "2.0.4", s)
		}, {
			"./FadeIn": 129,
			"./TransitionGroup": 130,
			"@uppy/core": 89,
			preact: 28
		}],
		132: [function(e, t, i) {
			"use strict";
			var r, s;
			const {
				UIPlugin: n
			} = e("@uppy/core"), {
				Provider: o
			} = e("@uppy/companion-client"), {
				ProviderViews: a
			} = e("@uppy/provider-views"), {
				h: l
			} = e("preact");
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					super(e, t), this.id = this.opts.id || "Instagram", o.initPlugin(this, t), this.icon = () => l("svg", {
						"aria-hidden": "true",
						focusable: "false",
						width: "32",
						height: "32",
						viewBox: "0 0 32 32"
					}, l("g", {
						fill: "none",
						fillRule: "evenodd"
					}, l("rect", {
						className: "uppy-ProviderIconBg",
						fill: "#E1306C",
						width: "32",
						height: "32",
						rx: "16"
					}), l("path", {
						d: "M16 8.622c2.403 0 2.688.009 3.637.052.877.04 1.354.187 1.67.31.392.144.745.374 1.036.673.299.29.529.644.673 1.035.123.317.27.794.31 1.671.043.95.052 1.234.052 3.637s-.009 2.688-.052 3.637c-.04.877-.187 1.354-.31 1.671a2.98 2.98 0 0 1-1.708 1.708c-.317.123-.794.27-1.671.31-.95.043-1.234.053-3.637.053s-2.688-.01-3.637-.053c-.877-.04-1.354-.187-1.671-.31a2.788 2.788 0 0 1-1.035-.673 2.788 2.788 0 0 1-.673-1.035c-.123-.317-.27-.794-.31-1.671-.043-.949-.052-1.234-.052-3.637s.009-2.688.052-3.637c.04-.877.187-1.354.31-1.67.144-.392.374-.745.673-1.036.29-.299.644-.529 1.035-.673.317-.123.794-.27 1.671-.31.95-.043 1.234-.052 3.637-.052zM16 7c-2.444 0-2.75.01-3.71.054-.959.044-1.613.196-2.185.419-.6.225-1.145.58-1.594 1.038-.458.45-.813.993-1.039 1.594-.222.572-.374 1.226-.418 2.184C7.01 13.25 7 13.556 7 16s.01 2.75.054 3.71c.044.959.196 1.613.419 2.185.226.6.58 1.145 1.038 1.594.45.458.993.813 1.594 1.038.572.223 1.227.375 2.184.419.96.044 1.267.054 3.711.054s2.75-.01 3.71-.054c.959-.044 1.613-.196 2.185-.419a4.602 4.602 0 0 0 2.632-2.632c.223-.572.375-1.226.419-2.184.044-.96.054-1.267.054-3.711s-.01-2.75-.054-3.71c-.044-.959-.196-1.613-.419-2.185A4.412 4.412 0 0 0 23.49 8.51a4.412 4.412 0 0 0-1.594-1.039c-.572-.222-1.226-.374-2.184-.418C18.75 7.01 18.444 7 16 7zm0 4.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 7.421a2.921 2.921 0 1 1 0-5.842 2.921 2.921 0 0 1 0 5.842zm4.875-6.671a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25z",
						fill: "#FFF"
					}))), this.defaultLocale = {
						strings: {
							pluginNameInstagram: "Instagram"
						}
					}, this.i18nInit(), this.title = this.i18n("pluginNameInstagram"), this.provider = new o(e, {
						companionUrl: this.opts.companionUrl,
						companionHeaders: this.opts.companionHeaders,
						companionKeysParams: this.opts.companionKeysParams,
						companionCookiesRule: this.opts.companionCookiesRule,
						provider: "instagram",
						pluginId: this.id
					}), this.onFirstRender = this.onFirstRender.bind(this), this.render = this.render.bind(this)
				}
				install() {
					this.view = new a(this, {
						provider: this.provider,
						viewType: "grid",
						showTitles: !1,
						showFilter: !1,
						showBreadcrumbs: !1
					});
					const {
						target: e
					} = this.opts;
					e && this.mount(e, this)
				}
				uninstall() {
					this.view.tearDown(), this.unmount()
				}
				onFirstRender() {
					return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder("recent")])
				}
				render(e) {
					return this.view.render(e)
				}
			}, r.VERSION = "2.0.4", s)
		}, {
			"@uppy/companion-client": 83,
			"@uppy/core": 89,
			"@uppy/provider-views": 156,
			preact: 28
		}],
		133: [function(e, t, i) {
			"use strict";
			var r, s;
			const {
				UIPlugin: n
			} = e("@uppy/core"), {
				Provider: o
			} = e("@uppy/companion-client"), {
				ProviderViews: a
			} = e("@uppy/provider-views"), {
				h: l
			} = e("preact");
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					super(e, t), this.id = this.opts.id || "OneDrive", o.initPlugin(this, t), this.title = this.opts.title || "OneDrive", this.icon = () => l("svg", {
						"aria-hidden": "true",
						focusable: "false",
						width: "32",
						height: "32",
						viewBox: "0 0 32 32"
					}, l("g", {
						fill: "none",
						fillRule: "evenodd"
					}, l("rect", {
						className: "uppy-ProviderIconBg",
						width: "32",
						height: "32",
						rx: "16",
						fill: "#0262C0"
					}), l("g", {
						fill: "#FFF",
						fillRule: "nonzero"
					}, l("path", {
						d: "M24.157 22s1.492-.205 1.79-1.655a2.624 2.624 0 0 0 .03-.878c-.22-1.64-1.988-2.01-1.988-2.01s.307-1.765-1.312-2.69c-1.62-.925-3.1 0-3.1 0S18.711 13 16.366 13c-3.016 0-3.519 3.448-3.519 3.448S10 16.618 10 19.14c0 2.523 2.597 2.86 2.597 2.86h11.56z"
					}), l("path", {
						d: "M9.421 19.246c0-2.197 1.606-3.159 2.871-3.472.44-1.477 1.654-3.439 4.135-3.439H16.445c1.721 0 2.79.823 3.368 1.476a3.99 3.99 0 0 1 1.147-.171h.01l.03.002C21.017 13.5 20.691 10 16.757 10c-2.69 0-3.639 2.345-3.639 2.345s-1.95-1.482-3.955.567c-1.028 1.052-.79 2.669-.79 2.669S6 15.824 6 18.412C6 20.757 8.452 21 8.452 21h1.372a3.77 3.77 0 0 1-.403-1.754z"
					})))), this.provider = new o(e, {
						companionUrl: this.opts.companionUrl,
						companionHeaders: this.opts.companionHeaders,
						companionCookiesRule: this.opts.companionCookiesRule,
						provider: "onedrive",
						pluginId: this.id
					}), this.defaultLocale = {
						strings: {
							pluginNameOneDrive: "OneDrive"
						}
					}, this.i18nInit(), this.title = this.i18n("pluginNameOneDrive"), this.onFirstRender = this.onFirstRender.bind(this), this.render = this.render.bind(this)
				}
				install() {
					this.view = new a(this, {
						provider: this.provider
					});
					const {
						target: e
					} = this.opts;
					e && this.mount(e, this)
				}
				uninstall() {
					this.view.tearDown(), this.unmount()
				}
				onFirstRender() {
					return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder()])
				}
				render(e) {
					return this.view.render(e)
				}
			}, r.VERSION = "2.0.4", s)
		}, {
			"@uppy/companion-client": 83,
			"@uppy/core": 89,
			"@uppy/provider-views": 156,
			preact: 28
		}],
		134: [function(e, t, i) {
			"use strict";
			var r, s;
			const {
				UIPlugin: n
			} = e("@uppy/core"), {
				h: o
			} = e("preact");
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					super(e, t), this.id = this.opts.id || "ProgressBar", this.title = "Progress Bar", this.type = "progressindicator";
					this.opts = {
						target: "body",
						fixed: !1,
						hideAfterFinish: !0,
						...t
					}, this.render = this.render.bind(this)
				}
				render(e) {
					const t = e.totalProgress || 0,
						i = (0 === t || 100 === t) && this.opts.hideAfterFinish;
					return o("div", {
						className: "uppy uppy-ProgressBar",
						style: {
							position: this.opts.fixed ? "fixed" : "initial"
						},
						"aria-hidden": i
					}, o("div", {
						className: "uppy-ProgressBar-inner",
						style: {
							width: `${t}%`
						}
					}), o("div", {
						className: "uppy-ProgressBar-percentage"
					}, t))
				}
				install() {
					const {
						target: e
					} = this.opts;
					e && this.mount(e, this)
				}
				uninstall() {
					this.unmount()
				}
			}, r.VERSION = "2.0.4", s)
		}, {
			"@uppy/core": 89,
			preact: 28
		}],
		135: [function(e, t, i) {
			"use strict";
			const {
				h: r,
				Fragment: s
			} = e("preact"), n = e => {
				const {
					getFolder: t,
					title: i,
					isLast: n
				} = e;
				return r(s, null, r("button", {
					type: "button",
					className: "uppy-u-reset",
					onClick: t
				}, i), n ? "" : " / ")
			};
			t.exports = e => {
				const {
					getFolder: t,
					title: i,
					breadcrumbsIcon: s,
					directories: o
				} = e;
				return r("div", {
					className: "uppy-Provider-breadcrumbs"
				}, r("div", {
					className: "uppy-Provider-breadcrumbsIcon"
				}, s), o.map(((e, s) => r(n, {
					key: e.id,
					getFolder: () => t(e.id),
					title: 0 === s ? i : e.title,
					isLast: s + 1 === o.length
				}))))
			}
		}, {
			preact: 28
		}],
		136: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact"), s = e("classnames"), n = e("@uppy/utils/lib/remoteFileObjToLocal"), o = e("./Filter"), a = e("./FooterActions"), l = e("./Item/index");
			t.exports = function(e) {
				const {
					currentSelection: t,
					folders: i,
					files: u,
					uppyFiles: p,
					viewType: c,
					headerComponent: h,
					showBreadcrumbs: d,
					isChecked: f,
					toggleCheckbox: m,
					handleScroll: g,
					showTitles: y,
					i18n: v,
					validateRestrictions: b,
					showFilter: w,
					filterQuery: S,
					filterInput: P,
					getNextFolder: k,
					cancel: C,
					done: E,
					columns: x
				} = e, _ = t.length;
				return r("div", {
					className: s("uppy-ProviderBrowser", `uppy-ProviderBrowser-viewType--${c}`)
				}, r("div", {
					className: "uppy-ProviderBrowser-header"
				}, r("div", {
					className: s("uppy-ProviderBrowser-headerBar", !d && "uppy-ProviderBrowser-headerBar--simple")
				}, h)), w && r(o, {
					i18n: v,
					filterQuery: S,
					filterInput: P
				}), i.length || u.length ? r("div", {
					className: "uppy-ProviderBrowser-body"
				}, r("ul", {
					className: "uppy-ProviderBrowser-list",
					onScroll: g,
					role: "listbox",
					tabIndex: "-1"
				}, i.map((e => {
					var t;
					return l({
						columns: x,
						showTitles: y,
						viewType: c,
						i18n: v,
						id: e.id,
						title: e.name,
						getItemIcon: () => e.icon,
						isChecked: f(e),
						toggleCheckbox: t => m(t, e),
						type: "folder",
						isDisabled: null == (t = f(e)) ? void 0 : t.loading,
						isCheckboxDisabled: "shared-with-me" === e.id,
						handleFolderClick: () => k(e)
					})
				})), u.map((e => {
					const i = b(n(e), [...p, ...t]);
					return l({
						id: e.id,
						title: e.name,
						author: e.author,
						getItemIcon: () => e.icon,
						isChecked: f(e),
						toggleCheckbox: t => m(t, e),
						columns: x,
						showTitles: y,
						viewType: c,
						i18n: v,
						type: "file",
						isDisabled: !i.result && !f(e),
						restrictionReason: i.reason
					})
				})))) : r("div", {
					className: "uppy-Provider-empty"
				}, e.i18n("noFilesFound")), _ > 0 && r(a, {
					selected: _,
					done: E,
					cancel: C,
					i18n: v
				}))
			}
		}, {
			"./Filter": 138,
			"./FooterActions": 139,
			"./Item/index": 143,
			"@uppy/utils/lib/remoteFileObjToLocal": 221,
			classnames: 6,
			preact: 28
		}],
		137: [function(e, t, i) {
			"use strict";
			const {
				Component: r,
				toChildArray: s
			} = e("preact");
			t.exports = class extends r {
				componentWillUnmount() {
					const {
						onUnmount: e
					} = this.props;
					e()
				}
				render() {
					const {
						children: e
					} = this.props;
					return s(e)[0]
				}
			}
		}, {
			preact: 28
		}],
		138: [function(e, t, i) {
			"use strict";
			const {
				h: r,
				Component: s
			} = e("preact");
			t.exports = class extends s {
				constructor(e) {
					super(e), this.preventEnterPress = this.preventEnterPress.bind(this)
				}
				preventEnterPress(e) {
					13 === e.keyCode && (e.stopPropagation(), e.preventDefault())
				}
				render() {
					return r("div", {
						className: "uppy-ProviderBrowser-search"
					}, r("input", {
						className: "uppy-u-reset uppy-ProviderBrowser-searchInput",
						type: "text",
						placeholder: this.props.i18n("filter"),
						"aria-label": this.props.i18n("filter"),
						onKeyUp: this.preventEnterPress,
						onKeyDown: this.preventEnterPress,
						onKeyPress: this.preventEnterPress,
						onInput: e => this.props.filterQuery(e),
						value: this.props.filterInput
					}), r("svg", {
						"aria-hidden": "true",
						focusable: "false",
						className: "uppy-c-icon uppy-ProviderBrowser-searchIcon",
						width: "12",
						height: "12",
						viewBox: "0 0 12 12"
					}, r("path", {
						d: "M8.638 7.99l3.172 3.172a.492.492 0 1 1-.697.697L7.91 8.656a4.977 4.977 0 0 1-2.983.983C2.206 9.639 0 7.481 0 4.819 0 2.158 2.206 0 4.927 0c2.721 0 4.927 2.158 4.927 4.82a4.74 4.74 0 0 1-1.216 3.17zm-3.71.685c2.176 0 3.94-1.726 3.94-3.856 0-2.129-1.764-3.855-3.94-3.855C2.75.964.984 2.69.984 4.819c0 2.13 1.765 3.856 3.942 3.856z"
					})), this.props.filterInput && r("button", {
						className: "uppy-u-reset uppy-ProviderBrowser-searchClose",
						type: "button",
						"aria-label": this.props.i18n("resetFilter"),
						title: this.props.i18n("resetFilter"),
						onClick: this.props.filterQuery
					}, r("svg", {
						"aria-hidden": "true",
						focusable: "false",
						className: "uppy-c-icon",
						viewBox: "0 0 19 19"
					}, r("path", {
						d: "M17.318 17.232L9.94 9.854 9.586 9.5l-.354.354-7.378 7.378h.707l-.62-.62v.706L9.318 9.94l.354-.354-.354-.354L1.94 1.854v.707l.62-.62h-.706l7.378 7.378.354.354.354-.354 7.378-7.378h-.707l.622.62v-.706L9.854 9.232l-.354.354.354.354 7.378 7.378.708-.707-7.38-7.378v.708l7.38-7.38.353-.353-.353-.353-.622-.622-.353-.353-.354.352-7.378 7.38h.708L2.56 1.23 2.208.88l-.353.353-.622.62-.353.355.352.353 7.38 7.38v-.708l-7.38 7.38-.353.353.352.353.622.622.353.353.354-.353 7.38-7.38h-.708l7.38 7.38z"
					}))))
				}
			}
		}, {
			preact: 28
		}],
		139: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");
			t.exports = e => r("div", {
				className: "uppy-ProviderBrowser-footer"
			}, r("button", {
				className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary",
				onClick: e.done,
				type: "button"
			}, e.i18n("selectX", {
				smart_count: e.selected
			})), r("button", {
				className: "uppy-u-reset uppy-c-btn uppy-c-btn-link",
				onClick: e.cancel,
				type: "button"
			}, e.i18n("cancel")))
		}, {
			preact: 28
		}],
		140: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");
			t.exports = function(e) {
				const {
					className: t,
					isDisabled: i,
					restrictionReason: s,
					isChecked: n,
					title: o,
					itemIconEl: a,
					showTitles: l,
					toggleCheckbox: u,
					id: p,
					children: c
				} = e;
				return r("li", {
					className: t,
					title: i ? s : null
				}, r("input", {
					type: "checkbox",
					className: `uppy-u-reset uppy-ProviderBrowserItem-checkbox ${n?"uppy-ProviderBrowserItem-checkbox--is-checked":""} uppy-ProviderBrowserItem-checkbox--grid`,
					onChange: u,
					name: "listitem",
					id: p,
					checked: n,
					disabled: i,
					"data-uppy-super-focusable": !0
				}), r("label", {
					htmlFor: p,
					"aria-label": o,
					className: "uppy-u-reset uppy-ProviderBrowserItem-inner"
				}, r("span", {
					className: "uppy-ProviderBrowserItem-inner-relative"
				}, a, l && o, c)))
			}
		}, {
			preact: 28
		}],
		141: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");

			function s() {
				return r("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon",
					width: 11,
					height: 14.5,
					viewBox: "0 0 44 58"
				}, r("path", {
					d: "M27.437.517a1 1 0 0 0-.094.03H4.25C2.037.548.217 2.368.217 4.58v48.405c0 2.212 1.82 4.03 4.03 4.03H39.03c2.21 0 4.03-1.818 4.03-4.03V15.61a1 1 0 0 0-.03-.28 1 1 0 0 0 0-.093 1 1 0 0 0-.03-.032 1 1 0 0 0 0-.03 1 1 0 0 0-.032-.063 1 1 0 0 0-.03-.063 1 1 0 0 0-.032 0 1 1 0 0 0-.03-.063 1 1 0 0 0-.032-.03 1 1 0 0 0-.03-.063 1 1 0 0 0-.063-.062l-14.593-14a1 1 0 0 0-.062-.062A1 1 0 0 0 28 .708a1 1 0 0 0-.374-.157 1 1 0 0 0-.156 0 1 1 0 0 0-.03-.03l-.003-.003zM4.25 2.547h22.218v9.97c0 2.21 1.82 4.03 4.03 4.03h10.564v36.438a2.02 2.02 0 0 1-2.032 2.032H4.25c-1.13 0-2.032-.9-2.032-2.032V4.58c0-1.13.902-2.032 2.03-2.032zm24.218 1.345l10.375 9.937.75.718H30.5c-1.13 0-2.032-.9-2.032-2.03V3.89z"
				}))
			}

			function n() {
				return r("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon",
					style: {
						minWidth: 16,
						marginRight: 3
					},
					viewBox: "0 0 276.157 276.157"
				}, r("path", {
					d: "M273.08 101.378c-3.3-4.65-8.86-7.32-15.254-7.32h-24.34V67.59c0-10.2-8.3-18.5-18.5-18.5h-85.322c-3.63 0-9.295-2.875-11.436-5.805l-6.386-8.735c-4.982-6.814-15.104-11.954-23.546-11.954H58.73c-9.292 0-18.638 6.608-21.737 15.372l-2.033 5.752c-.958 2.71-4.72 5.37-7.596 5.37H18.5C8.3 49.09 0 57.39 0 67.59v167.07c0 .886.16 1.73.443 2.52.152 3.306 1.18 6.424 3.053 9.064 3.3 4.652 8.86 7.32 15.255 7.32h188.487c11.395 0 23.27-8.425 27.035-19.18l40.677-116.188c2.11-6.035 1.43-12.164-1.87-16.816zM18.5 64.088h8.864c9.295 0 18.64-6.607 21.738-15.37l2.032-5.75c.96-2.712 4.722-5.373 7.597-5.373h29.565c3.63 0 9.295 2.876 11.437 5.806l6.386 8.735c4.982 6.815 15.104 11.954 23.546 11.954h85.322c1.898 0 3.5 1.602 3.5 3.5v26.47H69.34c-11.395 0-23.27 8.423-27.035 19.178L15 191.23V67.59c0-1.898 1.603-3.5 3.5-3.5zm242.29 49.15l-40.676 116.188c-1.674 4.78-7.812 9.135-12.877 9.135H18.75c-1.447 0-2.576-.372-3.02-.997-.442-.625-.422-1.814.057-3.18l40.677-116.19c1.674-4.78 7.812-9.134 12.877-9.134h188.487c1.448 0 2.577.372 3.02.997.443.625.423 1.814-.056 3.18z"
				}))
			}

			function o() {
				return r("svg", {
					"aria-hidden": "true",
					focusable: "false",
					style: {
						width: 16,
						marginRight: 4
					},
					viewBox: "0 0 58 58"
				}, r("path", {
					d: "M36.537 28.156l-11-7a1.005 1.005 0 0 0-1.02-.033C24.2 21.3 24 21.635 24 22v14a1 1 0 0 0 1.537.844l11-7a1.002 1.002 0 0 0 0-1.688zM26 34.18V23.82L34.137 29 26 34.18z"
				}), r("path", {
					d: "M57 6H1a1 1 0 0 0-1 1v44a1 1 0 0 0 1 1h56a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM10 28H2v-9h8v9zm-8 2h8v9H2v-9zm10 10V8h34v42H12V40zm44-12h-8v-9h8v9zm-8 2h8v9h-8v-9zm8-22v9h-8V8h8zM2 8h8v9H2V8zm0 42v-9h8v9H2zm54 0h-8v-9h8v9z"
				}))
			}
			t.exports = e => {
				if (null !== e.itemIconString) switch (e.itemIconString) {
					case "file":
						return r(s, null);
					case "folder":
						return r(n, null);
					case "video":
						return r(o, null);
					default:
						return r("img", {
							src: e.itemIconString,
							alt: e.alt
						})
				}
			}
		}, {
			preact: 28
		}],
		142: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");
			t.exports = function(e) {
				const {
					className: t,
					isDisabled: i,
					restrictionReason: s,
					isCheckboxDisabled: n,
					isChecked: o,
					toggleCheckbox: a,
					type: l,
					id: u,
					itemIconEl: p,
					title: c,
					handleFolderClick: h,
					showTitles: d,
					i18n: f
				} = e;
				return r("li", {
					className: t,
					title: i ? s : null
				}, n ? null : r("input", {
					type: "checkbox",
					className: "uppy-u-reset uppy-ProviderBrowserItem-checkbox " + (o ? "uppy-ProviderBrowserItem-checkbox--is-checked" : ""),
					onChange: a,
					name: "listitem",
					id: u,
					checked: o,
					"aria-label": "file" === l ? null : f("allFilesFromFolderNamed", {
						name: c
					}),
					disabled: i,
					"data-uppy-super-focusable": !0
				}), "file" === l ? r("label", {
					htmlFor: u,
					className: "uppy-u-reset uppy-ProviderBrowserItem-inner"
				}, r("div", {
					className: "uppy-ProviderBrowserItem-iconWrap"
				}, p), d && c) : r("button", {
					type: "button",
					className: "uppy-u-reset uppy-ProviderBrowserItem-inner",
					onClick: h,
					"aria-label": f("openFolderNamed", {
						name: c
					})
				}, r("div", {
					className: "uppy-ProviderBrowserItem-iconWrap"
				}, p), d && r("span", null, c)))
			}
		}, {
			preact: 28
		}],
		143: [function(e, t, i) {
			"use strict";

			function r() {
				return r = Object.assign || function(e) {
					for (var t = 1; t < arguments.length; t++) {
						var i = arguments[t];
						for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r])
					}
					return e
				}, r.apply(this, arguments)
			}
			const {
				h: s
			} = e("preact"), n = e("classnames"), o = e("./components/ItemIcon"), a = e("./components/GridLi"), l = e("./components/ListLi");
			t.exports = e => {
				const {
					author: t
				} = e, i = e.getItemIcon(), u = n("uppy-ProviderBrowserItem", {
					"uppy-ProviderBrowserItem--selected": e.isChecked
				}, {
					"uppy-ProviderBrowserItem--disabled": e.isDisabled
				}, {
					"uppy-ProviderBrowserItem--noPreview": "video" === i
				}), p = s(o, {
					itemIconString: i
				});
				switch (e.viewType) {
					case "grid":
						return s(a, r({}, e, {
							className: u,
							itemIconEl: p
						}));
					case "list":
						return s(l, r({}, e, {
							className: u,
							itemIconEl: p
						}));
					case "unsplash":
						return s(a, r({}, e, {
							className: u,
							itemIconEl: p
						}), s("a", {
							href: `${t.url}?utm_source=Companion&utm_medium=referral`,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "uppy-ProviderBrowserItem-author"
						}, t.name));
					default:
						throw new Error(`There is no such type ${e.viewType}`)
				}
			}
		}, {
			"./components/GridLi": 140,
			"./components/ItemIcon": 141,
			"./components/ListLi": 142,
			classnames: 6,
			preact: 28
		}],
		144: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");
			t.exports = e => r("div", {
				className: "uppy-Provider-loading"
			}, r("span", null, e.i18n("loading")))
		}, {
			preact: 28
		}],
		145: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");

			function s() {
				return r("svg", {
					width: "26",
					height: "26",
					viewBox: "0 0 26 26",
					xmlns: "http://www.w3.org/2000/svg"
				}, r("g", {
					fill: "none",
					"fill-rule": "evenodd"
				}, r("circle", {
					fill: "#FFF",
					cx: "13",
					cy: "13",
					r: "13"
				}), r("path", {
					d: "M21.64 13.205c0-.639-.057-1.252-.164-1.841H13v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z",
					fill: "#4285F4",
					"fill-rule": "nonzero"
				}), r("path", {
					d: "M13 22c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H4.957v2.332A8.997 8.997 0 0013 22z",
					fill: "#34A853",
					"fill-rule": "nonzero"
				}), r("path", {
					d: "M7.964 14.71A5.41 5.41 0 017.682 13c0-.593.102-1.17.282-1.71V8.958H4.957A8.996 8.996 0 004 13c0 1.452.348 2.827.957 4.042l3.007-2.332z",
					fill: "#FBBC05",
					"fill-rule": "nonzero"
				}), r("path", {
					d: "M13 7.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C17.463 4.891 15.426 4 13 4a8.997 8.997 0 00-8.043 4.958l3.007 2.332C8.672 9.163 10.656 7.58 13 7.58z",
					fill: "#EA4335",
					"fill-rule": "nonzero"
				}), r("path", {
					d: "M4 4h18v18H4z"
				})))
			}
			t.exports = function(e) {
				const {
					pluginName: t,
					pluginIcon: i,
					i18nArray: n,
					handleAuth: o
				} = e, a = "Google Drive" === t, l = r("span", {
					className: "uppy-Provider-authTitleName"
				}, t, r("br", null));
				return r("div", {
					className: "uppy-Provider-auth"
				}, r("div", {
					className: "uppy-Provider-authIcon"
				}, i()), r("div", {
					className: "uppy-Provider-authTitle"
				}, n("authenticateWithTitle", {
					pluginName: l
				})), a ? r("button", {
					type: "button",
					className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn uppy-Provider-btn-google",
					onClick: o,
					"data-uppy-super-focusable": !0
				}, r(s, null), n("signInWithGoogle")) : r("button", {
					type: "button",
					className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn",
					onClick: o,
					"data-uppy-super-focusable": !0
				}, n("authenticateWith", {
					pluginName: t
				})))
			}
		}, {
			preact: 28
		}],
		146: [function(e, t, i) {
			"use strict";
			const r = e("./User"),
				s = e("../Breadcrumbs");
			t.exports = e => {
				const t = [];
				return e.showBreadcrumbs && t.push(s({
					getFolder: e.getFolder,
					directories: e.directories,
					breadcrumbsIcon: e.pluginIcon && e.pluginIcon(),
					title: e.title
				})), t.push(r({
					logout: e.logout,
					username: e.username,
					i18n: e.i18n
				})), t
			}
		}, {
			"../Breadcrumbs": 135,
			"./User": 148
		}],
		147: [function(e, t, i) {
			"use strict";
			var r, s, n, o;

			function a(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var l = 0;

			function u(e) {
				return "__private_" + l++ + "_" + e
			}
			const {
				h: p
			} = e("preact"), c = e("./AuthView"), h = e("./Header"), d = e("../Browser"), f = e("../Loader"), m = e("../CloseWrapper"), g = e("../View");

			function y(e, t, i) {
				this.nextPagePath = e.nextPagePath, e.items.forEach((e => {
					e.isFolder ? i.push(e) : t.push(e)
				})), this.plugin.setPluginState({
					folders: i,
					files: t
				})
			}

			function v(e, t) {
				const i = e => "string" == typeof e ? new RegExp(`^${e}$`) : e instanceof RegExp ? e : void 0;
				return (Array.isArray(t) ? t.map(i) : [i(t)]).filter((e => null != e)).some((t => t.test(e) || t.test(`${e}/`)))
			}
			t.exports = (s = u("updateFilesAndFolders"), n = u("isOriginAllowed"), o = r = class e extends g {
				constructor(e, t) {
					super(e, t), Object.defineProperty(this, n, {
						value: v
					}), Object.defineProperty(this, s, {
						value: y
					});
					this.opts = {
						viewType: "list",
						showTitles: !0,
						showFilter: !0,
						showBreadcrumbs: !0,
						...t
					}, this.filterQuery = this.filterQuery.bind(this), this.getFolder = this.getFolder.bind(this), this.getNextFolder = this.getNextFolder.bind(this), this.logout = this.logout.bind(this), this.handleAuth = this.handleAuth.bind(this), this.handleScroll = this.handleScroll.bind(this), this.listAllFiles = this.listAllFiles.bind(this), this.donePicking = this.donePicking.bind(this), this.render = this.render.bind(this), this.plugin.setPluginState({
						authenticated: !1,
						files: [],
						folders: [],
						directories: [],
						filterInput: "",
						isSearchVisible: !1,
						currentSelection: []
					})
				}
				tearDown() {}
				getFolder(e, t) {
					return this.sharedHandler.loaderWrapper(this.provider.list(e), (i => {
						let r;
						const n = this.plugin.getPluginState(),
							o = n.directories.findIndex((t => e === t.id));
						r = -1 !== o ? n.directories.slice(0, o + 1) : n.directories.concat([{
							id: e,
							title: t
						}]), this.username = i.username || this.username, a(this, s)[s](i, [], []), this.plugin.setPluginState({
							directories: r
						})
					}), this.handleError)
				}
				getNextFolder(e) {
					this.getFolder(e.requestPath, e.name), this.lastCheckbox = void 0
				}
				logout() {
					this.provider.logout().then((e => {
						if (e.ok) {
							if (!e.revoked) {
								const t = this.plugin.uppy.i18n("companionUnauthorizeHint", {
									provider: this.plugin.title,
									url: e.manual_revoke_url
								});
								this.plugin.uppy.info(t, "info", 7e3)
							}
							const t = {
								authenticated: !1,
								files: [],
								folders: [],
								directories: []
							};
							this.plugin.setPluginState(t)
						}
					})).catch(this.handleError)
				}
				filterQuery(e) {
					const t = this.plugin.getPluginState();
					this.plugin.setPluginState({
						...t,
						filterInput: e ? e.target.value : ""
					})
				}
				addFolder(e) {
					const t = this.providerFileToId(e),
						i = {
							...this.plugin.getPluginState().selectedFolders
						};
					if (!(t in i) || !i[t].loading) return i[t] = {
						loading: !0,
						files: []
					}, this.plugin.setPluginState({
						selectedFolders: {
							...i
						}
					}), this.listAllFiles(e.requestPath).then((r => {
						let s = 0;
						r.forEach((e => {
							const t = this.providerFileToId(e);
							this.plugin.uppy.checkIfFileAlreadyExists(t) || s++
						})), s > 0 && r.forEach((e => this.addFile(e)));
						const n = r.map(this.providerFileToId);
						let o;
						i[t] = {
							loading: !1,
							files: n
						}, this.plugin.setPluginState({
							selectedFolders: i
						}), o = 0 === s ? this.plugin.uppy.i18n("folderAlreadyAdded", {
							folder: e.name
						}) : r.length ? this.plugin.uppy.i18n("folderAdded", {
							smart_count: s,
							folder: e.name
						}) : this.plugin.uppy.i18n("emptyFolderAdded"), this.plugin.uppy.info(o)
					})).catch((e => {
						const i = {
							...this.plugin.getPluginState().selectedFolders
						};
						delete i[t], this.plugin.setPluginState({
							selectedFolders: i
						}), this.handleError(e)
					}))
				}
				handleAuth() {
					const t = btoa(JSON.stringify({
							origin: location.origin
						})),
						i = `@uppy/provider-views=${e.VERSION}`,
						r = this.provider.authUrl({
							state: t,
							uppyVersions: i
						}),
						s = window.open(r, "_blank"),
						o = e => {
							if (!a(this, n)[n](e.origin, this.plugin.opts.companionAllowedHosts) || e.source !== s) return void this.plugin.uppy.log(`rejecting event from ${e.origin} vs allowed pattern ${this.plugin.opts.companionAllowedHosts}`);
							const t = "string" == typeof e.data ? JSON.parse(e.data) : e.data;
							if (t.error) {
								this.plugin.uppy.log("auth aborted");
								const {
									uppy: e
								} = this.plugin, t = e.i18n("authAborted");
								e.info({
									message: t
								}, "warning", 5e3)
							} else t.token ? (s.close(), window.removeEventListener("message", o), this.provider.setAuthToken(t.token), this.preFirstRender()) : this.plugin.uppy.log("did not receive token from auth window")
						};
					window.addEventListener("message", o)
				}
				async handleScroll(e) {
					const t = this.nextPagePath || null;
					if (this.shouldHandleScroll(e) && t) {
						this.isHandlingScroll = !0;
						try {
							const e = await this.provider.list(t),
								{
									files: i,
									folders: r
								} = this.plugin.getPluginState();
							a(this, s)[s](e, i, r)
						} catch (e) {
							this.handleError(e)
						} finally {
							this.isHandlingScroll = !1
						}
					}
				}
				listAllFiles(e, t = null) {
					return t = t || [], new Promise(((i, r) => {
						this.provider.list(e).then((e => {
							e.items.forEach((e => {
								e.isFolder ? this.addFolder(e) : t.push(e)
							}));
							const s = e.nextPagePath || null;
							return s ? this.listAllFiles(s, t).then((e => i(e))).catch((e => r(e))) : i(t)
						})).catch((e => r(e)))
					}))
				}
				donePicking() {
					const {
						currentSelection: e
					} = this.plugin.getPluginState(), t = e.map((e => e.isFolder ? this.addFolder(e) : this.addFile(e)));
					this.sharedHandler.loaderWrapper(Promise.all(t), (() => {
						this.clearSelection()
					}), (() => {}))
				}
				render(e, t = {}) {
					const {
						authenticated: i,
						didFirstRender: r
					} = this.plugin.getPluginState();
					r || this.preFirstRender();
					const s = {
							...this.opts,
							...t
						},
						{
							files: n,
							folders: o,
							filterInput: a,
							loading: l,
							currentSelection: u
						} = this.plugin.getPluginState(),
						{
							isChecked: g,
							toggleCheckbox: y,
							filterItems: v
						} = this.sharedHandler,
						b = "" !== a,
						w = {
							showBreadcrumbs: s.showBreadcrumbs,
							getFolder: this.getFolder,
							directories: this.plugin.getPluginState().directories,
							pluginIcon: this.plugin.icon,
							title: this.plugin.title,
							logout: this.logout,
							username: this.username,
							i18n: this.plugin.uppy.i18n
						},
						S = {
							isChecked: g,
							toggleCheckbox: y,
							currentSelection: u,
							files: b ? v(n) : n,
							folders: b ? v(o) : o,
							username: this.username,
							getNextFolder: this.getNextFolder,
							getFolder: this.getFolder,
							filterItems: this.sharedHandler.filterItems,
							filterQuery: this.filterQuery,
							logout: this.logout,
							handleScroll: this.handleScroll,
							listAllFiles: this.listAllFiles,
							done: this.donePicking,
							cancel: this.cancelPicking,
							headerComponent: h(w),
							title: this.plugin.title,
							viewType: s.viewType,
							showTitles: s.showTitles,
							showFilter: s.showFilter,
							showBreadcrumbs: s.showBreadcrumbs,
							pluginIcon: this.plugin.icon,
							i18n: this.plugin.uppy.i18n,
							uppyFiles: this.plugin.uppy.getFiles(),
							validateRestrictions: (...e) => this.plugin.uppy.validateRestrictions(...e)
						};
					return p(m, {
						onUnmount: this.clearSelection
					}, l ? p(f, {
						i18n: this.plugin.uppy.i18n
					}) : i ? p(d, S) : p(c, {
						pluginName: this.plugin.title,
						pluginIcon: this.plugin.icon,
						handleAuth: this.handleAuth,
						i18n: this.plugin.uppy.i18n,
						i18nArray: this.plugin.uppy.i18nArray
					}))
				}
			}, r.VERSION = "2.0.5", o)
		}, {
			"../Browser": 136,
			"../CloseWrapper": 137,
			"../Loader": 144,
			"../View": 155,
			"./AuthView": 145,
			"./Header": 146,
			preact: 28
		}],
		148: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");
			t.exports = e => [r("span", {
				className: "uppy-ProviderBrowser-user",
				key: "username"
			}, e.username), r("button", {
				type: "button",
				onClick: e.logout,
				className: "uppy-u-reset uppy-ProviderBrowser-userLogout",
				key: "logout"
			}, e.i18n("logOut"))]
		}, {
			preact: 28
		}],
		149: [function(e, t, i) {
			"use strict";
			t.exports = e("./ProviderView")
		}, {
			"./ProviderView": 147
		}],
		150: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");
			t.exports = e => r("button", {
				type: "button",
				onClick: e.triggerSearchInput,
				className: "uppy-u-reset uppy-ProviderBrowser-userLogout"
			}, e.i18n("backToSearch"))
		}, {
			preact: 28
		}],
		151: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");
			t.exports = e => {
				let t;
				const i = () => {
					t.value && e.search(t.value)
				};
				return r("div", {
					className: "uppy-SearchProvider"
				}, r("input", {
					className: "uppy-u-reset uppy-c-textInput uppy-SearchProvider-input",
					type: "text",
					"aria-label": e.i18n("enterTextToSearch"),
					placeholder: e.i18n("enterTextToSearch"),
					onKeyUp: e => {
						13 === e.keyCode && i()
					},
					ref: e => {
						t = e
					},
					"data-uppy-super-focusable": !0
				}), r("button", {
					className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-SearchProvider-searchButton",
					type: "button",
					onClick: i
				}, e.i18n("searchImages")))
			}
		}, {
			preact: 28
		}],
		152: [function(e, t, i) {
			"use strict";
			var r, s, n, o;

			function a(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var l = 0;

			function u(e) {
				return "__private_" + l++ + "_" + e
			}
			const {
				h: p
			} = e("preact"), c = e("./InputView"), h = e("../Browser"), d = e("../Loader"), f = e("./Header"), m = e("../CloseWrapper"), g = e("../View");

			function y(e, t) {
				this.nextPageQuery = e.nextPageQuery, a(this, s)[s] = e.searchedFor, e.items.forEach((e => {
					t.push(e)
				})), this.plugin.setPluginState({
					isInputMode: !1,
					files: t
				})
			}
			t.exports = (s = u("searchTerm"), n = u("updateFilesAndInputMode"), o = r = class extends g {
				constructor(e, t) {
					super(e, t), Object.defineProperty(this, n, {
						value: y
					}), Object.defineProperty(this, s, {
						writable: !0,
						value: void 0
					});
					this.opts = {
						viewType: "grid",
						showTitles: !1,
						showFilter: !1,
						showBreadcrumbs: !1,
						...t
					}, this.search = this.search.bind(this), this.triggerSearchInput = this.triggerSearchInput.bind(this), this.addFile = this.addFile.bind(this), this.handleScroll = this.handleScroll.bind(this), this.donePicking = this.donePicking.bind(this), this.render = this.render.bind(this), this.plugin.setPluginState({
						isInputMode: !0,
						files: [],
						folders: [],
						directories: [],
						filterInput: "",
						isSearchVisible: !1,
						currentSelection: []
					})
				}
				tearDown() {}
				search(e) {
					if (!e || e !== a(this, s)[s]) return this.sharedHandler.loaderWrapper(this.provider.search(e), (e => {
						a(this, n)[n](e, [])
					}), this.handleError);
					this.plugin.setPluginState({
						isInputMode: !1
					})
				}
				triggerSearchInput() {
					this.plugin.setPluginState({
						isInputMode: !0
					})
				}
				async handleScroll(e) {
					const t = this.nextPageQuery || null;
					if (this.shouldHandleScroll(e) && t) {
						this.isHandlingScroll = !0;
						try {
							const e = await this.provider.search(a(this, s)[s], t),
								{
									files: i
								} = this.plugin.getPluginState();
							a(this, n)[n](e, i)
						} catch (e) {
							this.handleError(e)
						} finally {
							this.isHandlingScroll = !1
						}
					}
				}
				donePicking() {
					const {
						currentSelection: e
					} = this.plugin.getPluginState(), t = e.map((e => this.addFile(e)));
					this.sharedHandler.loaderWrapper(Promise.all(t), (() => {
						this.clearSelection()
					}), (() => {}))
				}
				render(e, t = {}) {
					const {
						didFirstRender: i,
						isInputMode: r
					} = this.plugin.getPluginState();
					i || this.preFirstRender();
					const s = {
							...this.opts,
							...t
						},
						{
							files: n,
							folders: o,
							filterInput: a,
							loading: l,
							currentSelection: u
						} = this.plugin.getPluginState(),
						{
							isChecked: g,
							toggleCheckbox: y,
							filterItems: v
						} = this.sharedHandler,
						b = "" !== a,
						w = {
							isChecked: g,
							toggleCheckbox: y,
							currentSelection: u,
							files: b ? v(n) : n,
							folders: b ? v(o) : o,
							handleScroll: this.handleScroll,
							done: this.donePicking,
							cancel: this.cancelPicking,
							headerComponent: f({
								triggerSearchInput: this.triggerSearchInput,
								i18n: this.plugin.uppy.i18n
							}),
							title: this.plugin.title,
							viewType: s.viewType,
							showTitles: s.showTitles,
							showFilter: s.showFilter,
							showBreadcrumbs: s.showBreadcrumbs,
							pluginIcon: this.plugin.icon,
							i18n: this.plugin.uppy.i18n,
							uppyFiles: this.plugin.uppy.getFiles(),
							validateRestrictions: (...e) => this.plugin.uppy.validateRestrictions(...e)
						};
					return p(m, {
						onUnmount: this.clearSelection
					}, l ? p(d, {
						i18n: this.plugin.uppy.i18n
					}) : r ? p(c, {
						search: this.search,
						i18n: this.plugin.uppy.i18n
					}) : p(h, w))
				}
			}, r.VERSION = "2.0.5", o)
		}, {
			"../Browser": 136,
			"../CloseWrapper": 137,
			"../Loader": 144,
			"../View": 155,
			"./Header": 150,
			"./InputView": 151,
			preact: 28
		}],
		153: [function(e, t, i) {
			"use strict";
			t.exports = e("./SearchProviderView")
		}, {
			"./SearchProviderView": 152
		}],
		154: [function(e, t, i) {
			"use strict";
			const r = e("@uppy/utils/lib/remoteFileObjToLocal");
			t.exports = class {
				constructor(e) {
					this.plugin = e, this.filterItems = this.filterItems.bind(this), this.toggleCheckbox = this.toggleCheckbox.bind(this), this.isChecked = this.isChecked.bind(this), this.loaderWrapper = this.loaderWrapper.bind(this)
				}
				filterItems(e) {
					const t = this.plugin.getPluginState();
					return t.filterInput && "" !== t.filterInput ? e.filter((e => -1 !== e.name.toLowerCase().indexOf(t.filterInput.toLowerCase()))) : e
				}
				toggleCheckbox(e, t) {
					e.stopPropagation(), e.preventDefault(), e.currentTarget.focus();
					const {
						folders: i,
						files: s
					} = this.plugin.getPluginState(), n = this.filterItems(i.concat(s));
					if (this.lastCheckbox && e.shiftKey) {
						const e = n.indexOf(this.lastCheckbox),
							i = n.indexOf(t),
							s = e < i ? n.slice(e, i + 1) : n.slice(i, e + 1),
							o = [];
						for (const e of s) {
							const {
								uppy: t
							} = this.plugin, i = t.validateRestrictions(r(e), [...t.getFiles(), ...o]);
							i.result ? o.push(e) : t.info({
								message: i.reason
							}, "error", t.opts.infoTimeout)
						}
						return void this.plugin.setPluginState({
							currentSelection: o
						})
					}
					this.lastCheckbox = t;
					const {
						currentSelection: o
					} = this.plugin.getPluginState();
					this.isChecked(t) ? this.plugin.setPluginState({
						currentSelection: o.filter((e => e.id !== t.id))
					}) : this.plugin.setPluginState({
						currentSelection: o.concat([t])
					})
				}
				isChecked(e) {
					const {
						currentSelection: t
					} = this.plugin.getPluginState();
					return t.some((t => t.id === e.id))
				}
				loaderWrapper(e, t, i) {
					e.then((e => {
						this.plugin.setPluginState({
							loading: !1
						}), t(e)
					})).catch((e => {
						this.plugin.setPluginState({
							loading: !1
						}), i(e)
					})), this.plugin.setPluginState({
						loading: !0
					})
				}
			}
		}, {
			"@uppy/utils/lib/remoteFileObjToLocal": 221
		}],
		155: [function(e, t, i) {
			"use strict";
			const r = e("@uppy/utils/lib/getFileType"),
				s = e("@uppy/utils/lib/isPreviewSupported"),
				n = e("@uppy/utils/lib/generateFileID"),
				o = e("./SharedHandler");
			t.exports = class {
				constructor(e, t) {
					this.plugin = e, this.provider = t.provider, this.sharedHandler = new o(e), this.isHandlingScroll = !1, this.preFirstRender = this.preFirstRender.bind(this), this.handleError = this.handleError.bind(this), this.addFile = this.addFile.bind(this), this.clearSelection = this.clearSelection.bind(this), this.cancelPicking = this.cancelPicking.bind(this)
				}
				providerFileToId(e) {
					return n({
						data: e,
						name: e.name || e.id,
						type: e.mimetype
					})
				}
				preFirstRender() {
					this.plugin.setPluginState({
						didFirstRender: !0
					}), this.plugin.onFirstRender()
				}
				shouldHandleScroll(e) {
					const {
						scrollHeight: t,
						scrollTop: i,
						offsetHeight: r
					} = e.target;
					return t - (i + r) < 50 && !this.isHandlingScroll
				}
				clearSelection() {
					this.plugin.setPluginState({
						currentSelection: []
					})
				}
				cancelPicking() {
					this.clearSelection();
					const e = this.plugin.uppy.getPlugin("Dashboard");
					e && e.hideAllPanels()
				}
				handleError(e) {
					const {
						uppy: t
					} = this.plugin, i = t.i18n("companionError");
					t.log(e.toString()), e.isAuthError || t.info({
						message: i,
						details: e.toString()
					}, "error", 5e3)
				}
				addFile(e) {
					const t = {
							id: this.providerFileToId(e),
							source: this.plugin.id,
							data: e,
							name: e.name || e.id,
							type: e.mimeType,
							isRemote: !0,
							meta: {},
							body: {
								fileId: e.id
							},
							remote: {
								companionUrl: this.plugin.opts.companionUrl,
								url: `${this.provider.fileUrl(e.requestPath)}`,
								body: {
									fileId: e.id
								},
								providerOptions: this.provider.opts,
								providerName: this.provider.name
							}
						},
						i = r(t);
					i && s(i) && (t.preview = e.thumbnail), e.author && (t.meta.author = e.author), this.plugin.uppy.log("Adding remote file");
					try {
						return this.plugin.uppy.addFile(t), !0
					} catch (e) {
						return e.isRestriction || this.plugin.uppy.log(e), !1
					}
				}
			}
		}, {
			"./SharedHandler": 154,
			"@uppy/utils/lib/generateFileID": 199,
			"@uppy/utils/lib/getFileType": 207,
			"@uppy/utils/lib/isPreviewSupported": 218
		}],
		156: [function(e, t, i) {
			"use strict";
			const r = e("./ProviderView"),
				s = e("./SearchProviderView");
			t.exports = {
				ProviderViews: r,
				SearchProviderViews: s
			}
		}, {
			"./ProviderView": 149,
			"./SearchProviderView": 153
		}],
		157: [function(e, t, i) {
			"use strict";
			var r, s;
			const {
				UIPlugin: n
			} = e("@uppy/core");
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					super(e, t), this.type = "debugger", this.id = this.opts.id || "ReduxDevTools", this.title = "Redux DevTools";
					this.opts = {
						...t
					}, this.handleStateChange = this.handleStateChange.bind(this), this.initDevTools = this.initDevTools.bind(this)
				}
				handleStateChange(e, t) {
					this.devTools.send("UPPY_STATE_UPDATE", t)
				}
				initDevTools() {
					this.devTools = window.devToolsExtension.connect(), this.devToolsUnsubscribe = this.devTools.subscribe((e => {
						if ("DISPATCH" === e.type) switch (e.payload.type) {
							case "RESET":
								return void this.uppy.reset();
							case "IMPORT_STATE": {
								const {
									computedStates: t
								} = e.payload.nextLiftedState;
								return this.uppy.store.state = {
									...this.uppy.getState(),
									...t[t.length - 1].state
								}, void this.uppy.updateAll(this.uppy.getState())
							}
							case "JUMP_TO_STATE":
							case "JUMP_TO_ACTION":
								this.uppy.store.state = {
									...this.uppy.getState(),
									...JSON.parse(e.state)
								}, this.uppy.updateAll(this.uppy.getState())
						}
					}))
				}
				install() {
					this.withDevTools = "undefined" != typeof window && window.__REDUX_DEVTOOLS_EXTENSION__, this.withDevTools && (this.initDevTools(), this.uppy.on("state-update", this.handleStateChange))
				}
				uninstall() {
					this.withDevTools && (this.devToolsUnsubscribe(), this.uppy.off("state-update", this.handleStateUpdate))
				}
			}, r.VERSION = "2.0.3", s)
		}, {
			"@uppy/core": 89
		}],
		158: [function(e, t, i) {
			"use strict";

			function r() {
				return r = Object.assign || function(e) {
					for (var t = 1; t < arguments.length; t++) {
						var i = arguments[t];
						for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r])
					}
					return e
				}, r.apply(this, arguments)
			}
			const {
				h: s,
				Component: n
			} = e("preact"), o = e("./RecordButton"), a = e("./SubmitButton"), l = e("./StopWatch"), u = e("./StreamStatus");
			t.exports = class extends n {
				componentWillUnmount() {
					this.props.onStop()
				}
				render() {
					const {
						recording: e,
						stream: t,
						recordedVideo: i
					} = this.props, n = {
						playsinline: !0
					};
					return (e || !i && !e) && (n.muted = !0, n.autoplay = !0, n.srcObject = t), i && !e && (n.muted = !1, n.controls = !0, n.src = i, this.videoElement && (this.videoElement.srcObject = void 0)), s("div", {
						className: "uppy uppy-ScreenCapture-container"
					}, s("div", {
						className: "uppy-ScreenCapture-videoContainer"
					}, s(u, this.props), s("video", r({
						ref: e => {
							this.videoElement = e
						},
						className: "uppy-ScreenCapture-video"
					}, n)), s(l, this.props)), s("div", {
						className: "uppy-ScreenCapture-buttonContainer"
					}, s(o, this.props), s(a, this.props)))
				}
			}
		}, {
			"./RecordButton": 159,
			"./StopWatch": 161,
			"./StreamStatus": 162,
			"./SubmitButton": 163,
			preact: 28
		}],
		159: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");
			t.exports = function({
				recording: e,
				onStartRecording: t,
				onStopRecording: i,
				i18n: s
			}) {
				return e ? r("button", {
					className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--video uppy-ScreenCapture-button--stop-rec",
					type: "button",
					title: s("stopCapturing"),
					"aria-label": s("stopCapturing"),
					onClick: i,
					"data-uppy-super-focusable": !0
				}, r("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon",
					width: "100",
					height: "100",
					viewBox: "0 0 100 100"
				}, r("rect", {
					x: "15",
					y: "15",
					width: "70",
					height: "70"
				}))) : r("button", {
					className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--video",
					type: "button",
					title: s("startCapturing"),
					"aria-label": s("startCapturing"),
					onClick: t,
					"data-uppy-super-focusable": !0
				}, r("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon",
					width: "100",
					height: "100",
					viewBox: "0 0 100 100"
				}, r("circle", {
					cx: "50",
					cy: "50",
					r: "40"
				})))
			}
		}, {
			preact: 28
		}],
		160: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");
			t.exports = () => r("svg", {
				"aria-hidden": "true",
				focusable: "false",
				width: "32",
				height: "32",
				viewBox: "0 0 32 32"
			}, r("g", {
				fill: "none",
				fillRule: "evenodd"
			}, r("rect", {
				className: "uppy-ProviderIconBg",
				fill: "#2C3E50",
				width: "32",
				height: "32",
				rx: "16"
			}), r("path", {
				d: "M24.182 9H7.818C6.81 9 6 9.742 6 10.667v10c0 .916.81 1.666 1.818 1.666h4.546V24h7.272v-1.667h4.546c1 0 1.809-.75 1.809-1.666l.009-10C26 9.742 25.182 9 24.182 9zM24 21H8V11h16v10z",
				fill: "#FFF",
				fillRule: "nonzero"
			}), r("circle", {
				fill: "#FFF",
				cx: "16",
				cy: "16",
				r: "2"
			})))
		}, {
			preact: 28
		}],
		161: [function(e, t, i) {
			"use strict";
			const {
				h: r,
				Component: s
			} = e("preact");
			t.exports = class extends s {
				constructor(e) {
					super(e), this.state = {
						elapsedTime: 0
					}, this.wrapperStyle = {
						width: "100%",
						height: "100%",
						display: "flex"
					}, this.overlayStyle = {
						position: "absolute",
						width: "100%",
						height: "100%",
						background: "black",
						opacity: .7
					}, this.infoContainerStyle = {
						marginLeft: "auto",
						marginRight: "auto",
						marginTop: "auto",
						marginBottom: "auto",
						zIndex: 1,
						color: "white"
					}, this.infotextStyle = {
						marginLeft: "auto",
						marginRight: "auto",
						marginBottom: "1rem",
						fontSize: "1.5rem"
					}, this.timeStyle = {
						display: "block",
						fontWeight: "bold",
						marginLeft: "auto",
						marginRight: "auto",
						fontSize: "3rem",
						fontFamily: "Courier New"
					}
				}
				startTimer() {
					this.timerTick(), this.timerRunning = !0
				}
				resetTimer() {
					clearTimeout(this.timer), this.setState({
						elapsedTime: 0
					}), this.timerRunning = !1
				}
				timerTick() {
					this.timer = setTimeout((() => {
						this.setState((e => ({
							elapsedTime: e.elapsedTime + 1
						}))), this.timerTick()
					}), 1e3)
				}
				fmtMSS(e) {
					return (e - (e %= 60)) / 60 + (e > 9 ? ":" : ":0") + e
				}
				render() {
					const {
						recording: e,
						i18n: t
					} = {
						...this.props
					}, i = this.fmtMSS(this.state.elapsedTime);
					return e && !this.timerRunning && this.startTimer(), !e && this.timerRunning && this.resetTimer(), e ? r("div", {
						style: this.wrapperStyle
					}, r("div", {
						style: this.overlayStyle
					}), r("div", {
						style: this.infoContainerStyle
					}, r("div", {
						style: this.infotextStyle
					}, t("recording")), r("div", {
						style: this.timeStyle
					}, i))) : null
				}
			}
		}, {
			preact: 28
		}],
		162: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");
			t.exports = ({
				streamActive: e,
				i18n: t
			}) => e ? r("div", {
				title: t("streamActive"),
				"aria-label": t("streamActive"),
				className: "uppy-ScreenCapture-icon--stream uppy-ScreenCapture-icon--streamActive"
			}, r("svg", {
				"aria-hidden": "true",
				focusable: "false",
				width: "24",
				height: "24",
				viewBox: "0 0 24 24"
			}, r("path", {
				d: "M0 0h24v24H0z",
				opacity: ".1",
				fill: "none"
			}), r("path", {
				d: "M0 0h24v24H0z",
				fill: "none"
			}), r("path", {
				d: "M1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm18-7H5v1.63c3.96 1.28 7.09 4.41 8.37 8.37H19V7zM1 10v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zm20-7H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
			}))) : r("div", {
				title: t("streamPassive"),
				"aria-label": t("streamPassive"),
				className: "uppy-ScreenCapture-icon--stream"
			}, r("svg", {
				"aria-hidden": "true",
				focusable: "false",
				width: "24",
				height: "24",
				viewBox: "0 0 24 24"
			}, r("path", {
				d: "M0 0h24v24H0z",
				opacity: ".1",
				fill: "none"
			}), r("path", {
				d: "M0 0h24v24H0z",
				fill: "none"
			}), r("path", {
				d: "M21 3H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11z"
			})))
		}, {
			preact: 28
		}],
		163: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");
			t.exports = function({
				recording: e,
				recordedVideo: t,
				onSubmit: i,
				i18n: s
			}) {
				return t && !e ? r("button", {
					className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--submit",
					type: "button",
					title: s("submitRecordedFile"),
					"aria-label": s("submitRecordedFile"),
					onClick: i,
					"data-uppy-super-focusable": !0
				}, r("svg", {
					width: "12",
					height: "9",
					viewBox: "0 0 12 9",
					xmlns: "http://www.w3.org/2000/svg",
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon"
				}, r("path", {
					fill: "#fff",
					fillRule: "nonzero",
					d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z"
				}))) : null
			}
		}, {
			preact: 28
		}],
		164: [function(e, t, i) {
			"use strict";
			var r, s;

			function n() {
				return n = Object.assign || function(e) {
					for (var t = 1; t < arguments.length; t++) {
						var i = arguments[t];
						for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r])
					}
					return e
				}, n.apply(this, arguments)
			}
			const {
				h: o
			} = e("preact"), {
				UIPlugin: a
			} = e("@uppy/core"), l = e("@uppy/utils/lib/getFileTypeExtension"), u = e("./ScreenRecIcon"), p = e("./CaptureScreen");
			t.exports = (s = r = class extends a {
				constructor(e, t) {
					super(e, t), this.mediaDevices = window.MediaRecorder && navigator.mediaDevices, this.protocol = "https:" === location.protocol ? "https" : "http", this.id = this.opts.id || "ScreenCapture", this.title = this.opts.title || "Screencast", this.type = "acquirer", this.icon = u, this.defaultLocale = {
						strings: {
							startCapturing: "Begin screen capturing",
							stopCapturing: "Stop screen capturing",
							submitRecordedFile: "Submit recorded file",
							streamActive: "Stream active",
							streamPassive: "Stream passive",
							micDisabled: "Microphone access denied by user",
							recording: "Recording"
						}
					};
					this.opts = {
						displayMediaConstraints: {
							video: {
								width: 1280,
								height: 720,
								frameRate: {
									ideal: 3,
									max: 5
								},
								cursor: "motion",
								displaySurface: "monitor"
							}
						},
						userMediaConstraints: {
							audio: !0
						},
						preferredVideoMimeType: "video/webm",
						...t
					}, this.i18nInit(), this.install = this.install.bind(this), this.setPluginState = this.setPluginState.bind(this), this.render = this.render.bind(this), this.start = this.start.bind(this), this.stop = this.stop.bind(this), this.startRecording = this.startRecording.bind(this), this.stopRecording = this.stopRecording.bind(this), this.submit = this.submit.bind(this), this.streamInterrupted = this.streamInactivated.bind(this), this.captureActive = !1, this.capturedMediaFile = null
				}
				install() {
					if (!this.mediaDevices) return this.uppy.log("Screen recorder access is not supported", "error"), null;
					this.setPluginState({
						streamActive: !1,
						audioStreamActive: !1
					});
					const {
						target: e
					} = this.opts;
					e && this.mount(e, this)
				}
				uninstall() {
					this.videoStream && this.stop(), this.unmount()
				}
				start() {
					if (!this.mediaDevices) return Promise.reject(new Error("Screen recorder access not supported"));
					this.captureActive = !0, this.selectAudioStreamSource(), this.selectVideoStreamSource().then((e => {
						!1 === e && this.parent && this.parent.hideAllPanels && (this.parent.hideAllPanels(), this.captureActive = !1)
					}))
				}
				selectVideoStreamSource() {
					return this.videoStream ? new Promise((e => e(this.videoStream))) : this.mediaDevices.getDisplayMedia(this.opts.displayMediaConstraints).then((e => (this.videoStream = e, this.videoStream.addEventListener("inactive", (() => {
						this.streamInactivated()
					})), this.setPluginState({
						streamActive: !0
					}), e))).catch((e => (this.setPluginState({
						screenRecError: e
					}), this.userDenied = !0, setTimeout((() => {
						this.userDenied = !1
					}), 1e3), !1)))
				}
				selectAudioStreamSource() {
					return this.audioStream ? new Promise((e => e(this.audioStream))) : this.mediaDevices.getUserMedia(this.opts.userMediaConstraints).then((e => (this.audioStream = e, this.setPluginState({
						audioStreamActive: !0
					}), e))).catch((e => ("NotAllowedError" === e.name && this.uppy.info(this.i18n("micDisabled"), "error", 5e3), !1)))
				}
				startRecording() {
					const e = {};
					this.capturedMediaFile = null, this.recordingChunks = [];
					const {
						preferredVideoMimeType: t
					} = this.opts;
					this.selectVideoStreamSource().then((i => {
						t && MediaRecorder.isTypeSupported(t) && l(t) && (e.mimeType = t);
						const r = [i.getVideoTracks()[0]];
						this.audioStream && r.push(this.audioStream.getAudioTracks()[0]), this.outputStream = new MediaStream(r), this.recorder = new MediaRecorder(this.outputStream, e), this.recorder.addEventListener("dataavailable", (e => {
							this.recordingChunks.push(e.data)
						})), this.recorder.start(), this.setPluginState({
							recording: !0
						})
					})).catch((e => {
						this.uppy.log(e, "error")
					}))
				}
				streamInactivated() {
					const {
						recordedVideo: e,
						recording: t
					} = {
						...this.getPluginState()
					};
					e || t ? t && (this.uppy.log("Capture stream inactive — stop recording"), this.stopRecording()) : this.parent && this.parent.hideAllPanels && this.parent.hideAllPanels(), this.videoStream = null, this.audioStream = null, this.setPluginState({
						streamActive: !1,
						audioStreamActive: !1
					})
				}
				stopRecording() {
					return new Promise((e => {
						this.recorder.addEventListener("stop", (() => {
							e()
						})), this.recorder.stop()
					})).then((() => (this.setPluginState({
						recording: !1
					}), this.getVideo()))).then((e => {
						this.capturedMediaFile = e, this.setPluginState({
							recordedVideo: URL.createObjectURL(e.data)
						})
					})).then((() => {
						this.recordingChunks = null, this.recorder = null
					}), (e => {
						throw this.recordingChunks = null, this.recorder = null, e
					}))
				}
				submit() {
					try {
						this.capturedMediaFile && this.uppy.addFile(this.capturedMediaFile)
					} catch (e) {
						e.isRestriction || this.uppy.log(e, "error")
					}
				}
				stop() {
					this.videoStream && (this.videoStream.getVideoTracks().forEach((e => {
						e.stop()
					})), this.videoStream.getAudioTracks().forEach((e => {
						e.stop()
					})), this.videoStream = null), this.audioStream && (this.audioStream.getAudioTracks().forEach((e => {
						e.stop()
					})), this.audioStream.getVideoTracks().forEach((e => {
						e.stop()
					})), this.audioStream = null), this.outputStream && (this.outputStream.getAudioTracks().forEach((e => {
						e.stop()
					})), this.outputStream.getVideoTracks().forEach((e => {
						e.stop()
					})), this.outputStream = null), this.setPluginState({
						recordedVideo: null
					}), this.captureActive = !1
				}
				getVideo() {
					const e = this.recordingChunks[0].type,
						t = l(e);
					if (!t) return Promise.reject(new Error(`Could not retrieve recording: Unsupported media type "${e}"`));
					const i = `screencap-${Date.now()}.${t}`,
						r = new Blob(this.recordingChunks, {
							type: e
						}),
						s = {
							source: this.id,
							name: i,
							data: new Blob([r], {
								type: e
							}),
							type: e
						};
					return Promise.resolve(s)
				}
				render() {
					const e = this.getPluginState();
					return e.streamActive || this.captureActive || this.userDenied || this.start(), o(p, n({}, e, {
						onStartRecording: this.startRecording,
						onStopRecording: this.stopRecording,
						onStop: this.stop,
						onSubmit: this.submit,
						i18n: this.i18n,
						stream: this.videoStream
					}))
				}
			}, r.VERSION = "2.0.4", s)
		}, {
			"./CaptureScreen": 158,
			"./ScreenRecIcon": 160,
			"@uppy/core": 89,
			"@uppy/utils/lib/getFileTypeExtension": 208,
			preact: 28
		}],
		165: [function(e, t, i) {
			"use strict";
			const r = e("classnames"),
				s = e("lodash.throttle"),
				n = e("@transloadit/prettier-bytes"),
				o = e("@uppy/utils/lib/prettyETA"),
				{
					h: a
				} = e("preact"),
				l = e("./StatusBarStates");

			function u() {
				return a("svg", {
					className: "uppy-StatusBar-spinner",
					"aria-hidden": "true",
					focusable: "false",
					width: "14",
					height: "14"
				}, a("path", {
					d: "M13.983 6.547c-.12-2.509-1.64-4.893-3.939-5.936-2.48-1.127-5.488-.656-7.556 1.094C.524 3.367-.398 6.048.162 8.562c.556 2.495 2.46 4.52 4.94 5.183 2.932.784 5.61-.602 7.256-3.015-1.493 1.993-3.745 3.309-6.298 2.868-2.514-.434-4.578-2.349-5.153-4.84a6.226 6.226 0 0 1 2.98-6.778C6.34.586 9.74 1.1 11.373 3.493c.407.596.693 1.282.842 1.988.127.598.073 1.197.161 1.794.078.525.543 1.257 1.15.864.525-.341.49-1.05.456-1.592-.007-.15.02.3 0 0",
					fillRule: "evenodd"
				}))
			}

			function p(e) {
				const {
					numUploads: t,
					complete: i,
					totalUploadedSize: r,
					totalSize: s,
					totalETA: l,
					i18n: u
				} = e, p = t > 1;
				return a("div", {
					className: "uppy-StatusBar-statusSecondary"
				}, p && u("filesUploadedOfTotal", {
					complete: i,
					smart_count: t
				}), a("span", {
					className: "uppy-StatusBar-additionalInfo"
				}, p && " · ", u("dataUploadedOfTotal", {
					complete: n(r),
					total: n(s)
				}), " · ", u("xTimeLeft", {
					time: o(l)
				})))
			}

			function c(e) {
				const {
					i18n: t,
					complete: i,
					numUploads: r
				} = e;
				return a("div", {
					className: "uppy-StatusBar-statusSecondary"
				}, t("filesUploadedOfTotal", {
					complete: i,
					smart_count: r
				}))
			}

			function h(e) {
				const {
					i18n: t,
					newFiles: i,
					startUpload: s
				} = e, n = r("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--uploadNewlyAdded");
				return a("div", {
					className: "uppy-StatusBar-statusSecondary"
				}, a("div", {
					className: "uppy-StatusBar-statusSecondaryHint"
				}, t("xMoreFilesAdded", {
					smart_count: i
				})), a("button", {
					type: "button",
					className: n,
					"aria-label": t("uploadXFiles", {
						smart_count: i
					}),
					onClick: s
				}, t("upload")))
			}
			const d = s(p, 500, {
				leading: !0,
				trailing: !0
			});
			t.exports = {
				UploadBtn: function(e) {
					const {
						newFiles: t,
						isUploadStarted: i,
						recoveredState: s,
						i18n: n,
						uploadState: o,
						isSomeGhost: u,
						startUpload: p
					} = e, c = r("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--upload", {
						"uppy-c-btn-primary": o === l.STATE_WAITING
					}, {
						"uppy-StatusBar-actionBtn--disabled": u
					}), h = n(t && i && !s ? "uploadXNewFiles" : "uploadXFiles", {
						smart_count: t
					});
					return a("button", {
						type: "button",
						className: c,
						"aria-label": n("uploadXFiles", {
							smart_count: t
						}),
						onClick: p,
						disabled: u,
						"data-uppy-super-focusable": !0
					}, h)
				},
				RetryBtn: function(e) {
					const {
						i18n: t,
						uppy: i
					} = e;
					return a("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--retry",
						"aria-label": t("retryUpload"),
						onClick: () => i.retryAll(),
						"data-uppy-super-focusable": !0
					}, a("svg", {
						"aria-hidden": "true",
						focusable: "false",
						className: "uppy-c-icon",
						width: "8",
						height: "10",
						viewBox: "0 0 8 10"
					}, a("path", {
						d: "M4 2.408a2.75 2.75 0 1 0 2.75 2.75.626.626 0 0 1 1.25.018v.023a4 4 0 1 1-4-4.041V.25a.25.25 0 0 1 .389-.208l2.299 1.533a.25.25 0 0 1 0 .416l-2.3 1.533A.25.25 0 0 1 4 3.316v-.908z"
					})), t("retry"))
				},
				CancelBtn: function(e) {
					const {
						i18n: t,
						uppy: i
					} = e;
					return a("button", {
						type: "button",
						className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
						title: t("cancel"),
						"aria-label": t("cancel"),
						onClick: () => i.cancelAll(),
						"data-uppy-super-focusable": !0
					}, a("svg", {
						"aria-hidden": "true",
						focusable: "false",
						className: "uppy-c-icon",
						width: "16",
						height: "16",
						viewBox: "0 0 16 16"
					}, a("g", {
						fill: "none",
						fillRule: "evenodd"
					}, a("circle", {
						fill: "#888",
						cx: "8",
						cy: "8",
						r: "8"
					}), a("path", {
						fill: "#FFF",
						d: "M9.283 8l2.567 2.567-1.283 1.283L8 9.283 5.433 11.85 4.15 10.567 6.717 8 4.15 5.433 5.433 4.15 8 6.717l2.567-2.567 1.283 1.283z"
					}))))
				},
				PauseResumeButton: function(e) {
					const {
						isAllPaused: t,
						i18n: i,
						isAllComplete: r,
						resumableUploads: s,
						uppy: n
					} = e, o = i(t ? "resume" : "pause");
					return a("button", {
						title: o,
						"aria-label": o,
						className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
						type: "button",
						onClick: function() {
							return r ? null : s ? t ? n.resumeAll() : n.pauseAll() : n.cancelAll()
						},
						"data-uppy-super-focusable": !0
					}, a("svg", {
						"aria-hidden": "true",
						focusable: "false",
						className: "uppy-c-icon",
						width: "16",
						height: "16",
						viewBox: "0 0 16 16"
					}, a("g", {
						fill: "none",
						fillRule: "evenodd"
					}, a("circle", {
						fill: "#888",
						cx: "8",
						cy: "8",
						r: "8"
					}), a("path", {
						fill: "#FFF",
						d: t ? "M6 4.25L11.5 8 6 11.75z" : "M5 4.5h2v7H5v-7zm4 0h2v7H9v-7z"
					}))))
				},
				DoneBtn: function(e) {
					const {
						i18n: t,
						doneButtonHandler: i
					} = e;
					return a("button", {
						type: "button",
						className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--done",
						onClick: i,
						"data-uppy-super-focusable": !0
					}, t("done"))
				},
				LoadingSpinner: u,
				ProgressDetails: p,
				ProgressBarProcessing: function(e) {
					const {
						progress: t
					} = e, {
						value: i,
						mode: r,
						message: s
					} = t, n = Math.round(100 * i);
					return a("div", {
						className: "uppy-StatusBar-content"
					}, a(u, null), "determinate" === r ? `${n}% · ` : "", s)
				},
				ProgressBarError: function(e) {
					const {
						error: t,
						i18n: i
					} = e;
					return a("div", {
						className: "uppy-StatusBar-content",
						role: "alert",
						title: i("uploadFailed")
					}, a("div", {
						className: "uppy-StatusBar-status"
					}, a("div", {
						className: "uppy-StatusBar-statusPrimary"
					}, a("svg", {
						"aria-hidden": "true",
						focusable: "false",
						className: "uppy-StatusBar-statusIndicator uppy-c-icon",
						width: "11",
						height: "11",
						viewBox: "0 0 11 11"
					}, a("path", {
						d: "M4.278 5.5L0 1.222 1.222 0 5.5 4.278 9.778 0 11 1.222 6.722 5.5 11 9.778 9.778 11 5.5 6.722 1.222 11 0 9.778z"
					})), i("uploadFailed"))), a("button", {
						className: "uppy-StatusBar-details",
						"aria-label": t,
						"data-microtip-position": "top-right",
						"data-microtip-size": "medium",
						onClick: function() {
							const e = `${i("uploadFailed")} \n\n ${t}`;
							alert(e)
						},
						type: "button"
					}, "?"))
				},
				ProgressBarUploading: function(e) {
					const {
						i18n: t,
						supportsUploadProgress: i,
						totalProgress: r,
						showProgressDetails: s,
						isUploadStarted: n,
						isAllComplete: o,
						isAllPaused: l,
						newFiles: p,
						numUploads: f,
						complete: m,
						totalUploadedSize: g,
						totalSize: y,
						totalETA: v,
						startUpload: b
					} = e, w = p && n;
					if (!n || o) return null;
					const S = t(l ? "paused" : "uploading");
					return a("div", {
						className: "uppy-StatusBar-content",
						"aria-label": S,
						title: S
					}, l ? null : a(u, null), a("div", {
						className: "uppy-StatusBar-status"
					}, a("div", {
						className: "uppy-StatusBar-statusPrimary"
					}, i ? `${S}: ${r}%` : S), l || w || !s ? null : i ? a(d, {
						numUploads: f,
						complete: m,
						totalUploadedSize: g,
						totalSize: y,
						totalETA: v,
						i18n: t
					}) : a(c, {
						i18n: t,
						complete: m,
						numUploads: f
					}), w ? a(h, {
						i18n: t,
						newFiles: p,
						startUpload: b
					}) : null))
				},
				ProgressBarComplete: function(e) {
					const {
						i18n: t
					} = e;
					return a("div", {
						className: "uppy-StatusBar-content",
						role: "status",
						title: t("complete")
					}, a("div", {
						className: "uppy-StatusBar-status"
					}, a("div", {
						className: "uppy-StatusBar-statusPrimary"
					}, a("svg", {
						"aria-hidden": "true",
						focusable: "false",
						className: "uppy-StatusBar-statusIndicator uppy-c-icon",
						width: "15",
						height: "11",
						viewBox: "0 0 15 11"
					}, a("path", {
						d: "M.414 5.843L1.627 4.63l3.472 3.472L13.202 0l1.212 1.213L5.1 10.528z"
					})), t("complete"))))
				}
			}
		}, {
			"./StatusBarStates": 167,
			"@transloadit/prettier-bytes": 2,
			"@uppy/utils/lib/prettyETA": 220,
			classnames: 6,
			"lodash.throttle": 18,
			preact: 28
		}],
		166: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact"), s = e("classnames"), n = e("./StatusBarStates"), o = e("./calculateProcessingProgress"), {
				UploadBtn: a,
				RetryBtn: l,
				CancelBtn: u,
				PauseResumeButton: p,
				DoneBtn: c,
				ProgressBarProcessing: h,
				ProgressBarError: d,
				ProgressBarUploading: f,
				ProgressBarComplete: m
			} = e("./Components"), {
				STATE_ERROR: g,
				STATE_WAITING: y,
				STATE_PREPROCESSING: v,
				STATE_UPLOADING: b,
				STATE_POSTPROCESSING: w,
				STATE_COMPLETE: S
			} = n;
			t.exports = function(e) {
				const {
					newFiles: t,
					allowNewUpload: i,
					isUploadInProgress: n,
					isAllPaused: P,
					resumableUploads: k,
					error: C,
					hideUploadButton: E,
					hidePauseResumeButton: x,
					hideCancelButton: _,
					hideRetryButton: F,
					recoveredState: O,
					uploadState: A,
					totalProgress: T,
					files: R,
					supportsUploadProgress: U,
					hideAfterFinish: D,
					isSomeGhost: I,
					isTargetDOMEl: B,
					doneButtonHandler: N,
					isUploadStarted: M,
					i18n: j,
					startUpload: L,
					uppy: z,
					isAllComplete: H,
					showProgressDetails: $,
					numUploads: q,
					complete: V,
					totalSize: W,
					totalETA: X,
					totalUploadedSize: G
				} = e;
				const K = function() {
						switch (A) {
							case w:
							case v: {
								const e = o(R);
								return "determinate" === e.mode ? 100 * e.value : T
							}
							case g:
								return null;
							case b:
								return U ? T : null;
							default:
								return T
						}
					}(),
					Y = function() {
						if (O) return !1;
						switch (A) {
							case y:
								return E || 0 === t;
							case S:
								return D;
							default:
								return !1
						}
					}(),
					Q = null != K ? K : 100,
					J = !C && t && !n && !P && i && !E,
					Z = !_ && A !== y && A !== S,
					ee = k && !x && A === b,
					te = C && !F,
					ie = N && A === S,
					re = s("uppy-StatusBar-progress", {
						"is-indeterminate": function() {
							switch (A) {
								case w:
								case v: {
									const {
										mode: e
									} = o(R);
									return "indeterminate" === e
								}
								case b:
									return !U;
								default:
									return !1
							}
						}()
					}),
					se = s({
						"uppy-Root": B
					}, "uppy-StatusBar", `is-${A}`, {
						"has-ghosts": I
					});
				return r("div", {
					className: se,
					"aria-hidden": Y
				}, r("div", {
					className: re,
					style: {
						width: `${Q}%`
					},
					role: "progressbar",
					"aria-label": `${Q}%`,
					"aria-valuetext": `${Q}%`,
					"aria-valuemin": "0",
					"aria-valuemax": "100",
					"aria-valuenow": K
				}), (() => {
					switch (A) {
						case v:
						case w:
							return r(h, {
								progress: o(R)
							});
						case S:
							return r(m, {
								i18n: j
							});
						case g:
							return r(d, {
								error: C,
								i18n: j
							});
						case b:
							return r(f, {
								i18n: j,
								supportsUploadProgress: U,
								totalProgress: T,
								showProgressDetails: $,
								isUploadStarted: M,
								isAllComplete: H,
								isAllPaused: P,
								newFiles: t,
								numUploads: q,
								complete: V,
								totalUploadedSize: G,
								totalSize: W,
								totalETA: X,
								startUpload: L
							});
						default:
							return null
					}
				})(), r("div", {
					className: "uppy-StatusBar-actions"
				}, O || J ? r(a, {
					newFiles: t,
					isUploadStarted: M,
					recoveredState: O,
					i18n: j,
					isSomeGhost: I,
					startUpload: L,
					uploadState: A
				}) : null, te ? r(l, {
					i18n: j,
					uppy: z
				}) : null, ee ? r(p, {
					isAllPaused: P,
					i18n: j,
					isAllComplete: H,
					resumableUploads: k,
					uppy: z
				}) : null, Z ? r(u, {
					i18n: j,
					uppy: z
				}) : null, ie ? r(c, {
					i18n: j,
					doneButtonHandler: N
				}) : null))
			}
		}, {
			"./Components": 165,
			"./StatusBarStates": 167,
			"./calculateProcessingProgress": 168,
			classnames: 6,
			preact: 28
		}],
		167: [function(e, t, i) {
			"use strict";
			t.exports = {
				STATE_ERROR: "error",
				STATE_WAITING: "waiting",
				STATE_PREPROCESSING: "preprocessing",
				STATE_UPLOADING: "uploading",
				STATE_POSTPROCESSING: "postprocessing",
				STATE_COMPLETE: "complete"
			}
		}, {}],
		168: [function(e, t, i) {
			"use strict";
			t.exports = function(e) {
				const t = [];
				let i, r;
				for (const {
						progress: s
					} of Object.values(e)) {
					const {
						preprocess: e,
						postprocess: n
					} = s;
					null == r && (e || n) && ({
						mode: i,
						message: r
					} = e || n), "determinate" === (null == e ? void 0 : e.mode) && t.push(e.value), "determinate" === (null == n ? void 0 : n.mode) && t.push(n.value)
				}
				return {
					mode: i,
					message: r,
					value: t.reduce(((e, i) => e + i / t.length), 0)
				}
			}
		}, {}],
		169: [function(e, t, i) {
			"use strict";
			var r, s;
			const {
				UIPlugin: n
			} = e("@uppy/core"), o = e("@uppy/utils/lib/getSpeed"), a = e("@uppy/utils/lib/getBytesRemaining"), l = e("@uppy/utils/lib/getTextDirection"), u = e("./StatusBarStates"), p = e("./StatusBar");

			function c(e, t, i, r) {
				if (e) return u.STATE_ERROR;
				if (t) return u.STATE_COMPLETE;
				if (i) return u.STATE_WAITING;
				let s = u.STATE_WAITING;
				const n = Object.keys(r);
				for (let e = 0; e < n.length; e++) {
					const {
						progress: t
					} = r[n[e]];
					if (t.uploadStarted && !t.uploadComplete) return u.STATE_UPLOADING;
					t.preprocess && s !== u.STATE_UPLOADING && (s = u.STATE_PREPROCESSING), t.postprocess && s !== u.STATE_UPLOADING && s !== u.STATE_PREPROCESSING && (s = u.STATE_POSTPROCESSING)
				}
				return s
			}
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					super(e, t), this.startUpload = () => {
						const {
							recoveredState: e
						} = this.uppy.getState();
						if (!e) return this.uppy.upload().catch((() => {}));
						this.uppy.emit("restore-confirmed")
					}, this.id = this.opts.id || "StatusBar", this.title = "StatusBar", this.type = "progressindicator", this.defaultLocale = {
						strings: {
							uploading: "Uploading",
							upload: "Upload",
							complete: "Complete",
							uploadFailed: "Upload failed",
							paused: "Paused",
							retry: "Retry",
							retryUpload: "Retry upload",
							cancel: "Cancel",
							pause: "Pause",
							resume: "Resume",
							done: "Done",
							filesUploadedOfTotal: {
								0: "%{complete} of %{smart_count} file uploaded",
								1: "%{complete} of %{smart_count} files uploaded"
							},
							dataUploadedOfTotal: "%{complete} of %{total}",
							xTimeLeft: "%{time} left",
							uploadXFiles: {
								0: "Upload %{smart_count} file",
								1: "Upload %{smart_count} files"
							},
							uploadXNewFiles: {
								0: "Upload +%{smart_count} file",
								1: "Upload +%{smart_count} files"
							},
							xMoreFilesAdded: {
								0: "%{smart_count} more file added",
								1: "%{smart_count} more files added"
							}
						}
					};
					this.opts = {
						target: "body",
						hideUploadButton: !1,
						hideRetryButton: !1,
						hidePauseResumeButton: !1,
						hideCancelButton: !1,
						showProgressDetails: !1,
						hideAfterFinish: !0,
						doneButtonHandler: null,
						...t
					}, this.i18nInit(), this.render = this.render.bind(this), this.install = this.install.bind(this)
				}
				render(e) {
					const {
						capabilities: t,
						files: i,
						allowNewUpload: r,
						totalProgress: s,
						error: n,
						recoveredState: l
					} = e, {
						newFiles: u,
						startedFiles: h,
						completeFiles: d,
						inProgressNotPausedFiles: f,
						isUploadStarted: m,
						isAllComplete: g,
						isAllErrored: y,
						isAllPaused: v,
						isUploadInProgress: b,
						isSomeGhost: w
					} = this.uppy.getObjectOfFilesPerState(), S = l ? Object.values(i) : u, P = function(e) {
						const t = function(e) {
							let t = 0;
							return e.forEach((e => {
								t += o(e.progress)
							})), t
						}(e);
						if (0 === t) return 0;
						const i = e.reduce(((e, t) => e + a(t.progress)), 0);
						return Math.round(i / t * 10) / 10
					}(f), k = !!t.resumableUploads, C = !1 !== t.uploadProgress;
					let E = 0,
						x = 0;
					return h.forEach((e => {
						E += e.progress.bytesTotal || 0, x += e.progress.bytesUploaded || 0
					})), p({
						error: n,
						uploadState: c(y, g, l, e.files || {}),
						allowNewUpload: r,
						totalProgress: s,
						totalSize: E,
						totalUploadedSize: x,
						isAllComplete: !1,
						isAllPaused: v,
						isAllErrored: y,
						isUploadStarted: m,
						isUploadInProgress: b,
						isSomeGhost: w,
						recoveredState: l,
						complete: d.length,
						newFiles: S.length,
						numUploads: h.length,
						totalETA: P,
						files: i,
						i18n: this.i18n,
						uppy: this.uppy,
						startUpload: this.startUpload,
						doneButtonHandler: this.opts.doneButtonHandler,
						resumableUploads: k,
						supportsUploadProgress: C,
						showProgressDetails: this.opts.showProgressDetails,
						hideUploadButton: this.opts.hideUploadButton,
						hideRetryButton: this.opts.hideRetryButton,
						hidePauseResumeButton: this.opts.hidePauseResumeButton,
						hideCancelButton: this.opts.hideCancelButton,
						hideAfterFinish: this.opts.hideAfterFinish,
						isTargetDOMEl: this.isTargetDOMEl
					})
				}
				onMount() {
					const e = this.el;
					l(e) || (e.dir = "ltr")
				}
				install() {
					const {
						target: e
					} = this.opts;
					e && this.mount(e, this)
				}
				uninstall() {
					this.unmount()
				}
			}, r.VERSION = "2.1.1", s)
		}, {
			"./StatusBar": 166,
			"./StatusBarStates": 167,
			"@uppy/core": 89,
			"@uppy/utils/lib/getBytesRemaining": 200,
			"@uppy/utils/lib/getSpeed": 210,
			"@uppy/utils/lib/getTextDirection": 211
		}],
		170: [function(e, t, i) {
			"use strict";
			var r = 0;

			function s(e) {
				return "__private_" + r++ + "_" + e
			}
			var n = s("publish");
			class o {
				constructor() {
					Object.defineProperty(this, n, {
						value: a
					}), this.state = {}, this.callbacks = []
				}
				getState() {
					return this.state
				}
				setState(e) {
					const t = {
							...this.state
						},
						i = {
							...this.state,
							...e
						};
					this.state = i,
						function(e, t) {
							if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
							return e
						}(this, n)[n](t, i, e)
				}
				subscribe(e) {
					return this.callbacks.push(e), () => {
						this.callbacks.splice(this.callbacks.indexOf(e), 1)
					}
				}
			}

			function a(...e) {
				this.callbacks.forEach((t => {
					t(...e)
				}))
			}
			o.VERSION = "2.0.2", t.exports = function() {
				return new o
			}
		}, {}],
		171: [function(e, t, i) {
			"use strict";
			let r;

			function s(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var n = 0;

			function o(e) {
				return "__private_" + n++ + "_" + e
			}
			const {
				nanoid: a
			} = e("nanoid"), l = "uppy/STATE_UPDATE";
			var u = o("id"),
				p = o("selector"),
				c = o("store");
			r = Symbol.for("uppy test: get id");
			class h {
				constructor(e) {
					Object.defineProperty(this, u, {
						writable: !0,
						value: void 0
					}), Object.defineProperty(this, p, {
						writable: !0,
						value: void 0
					}), Object.defineProperty(this, c, {
						writable: !0,
						value: void 0
					}), s(this, c)[c] = e.store, s(this, u)[u] = e.id || a(), s(this, p)[p] = e.selector || (e => t => t.uppy[e])(s(this, u)[u]), this.setState({})
				}
				setState(e) {
					s(this, c)[c].dispatch({
						type: l,
						id: s(this, u)[u],
						payload: e
					})
				}
				getState() {
					return s(this, p)[p](s(this, c)[c].getState())
				}
				subscribe(e) {
					let t = this.getState();
					return s(this, c)[c].subscribe((() => {
						const i = this.getState();
						if (t !== i) {
							const r = function(e, t) {
								const i = Object.keys(t),
									r = {};
								return i.forEach((i => {
									e[i] !== t[i] && (r[i] = t[i])
								})), r
							}(t, i);
							e(t, i, r), t = i
						}
					}))
				} [r]() {
					return s(this, u)[u]
				}
			}
			h.VERSION = "2.0.2", t.exports = h, t.exports.ReduxStore = h, t.exports.STATE_UPDATE = l, t.exports.reducer = function(e = {}, t) {
				if (t.type === l) {
					const i = {
						...e[t.id],
						...t.payload
					};
					return {
						...e,
						[t.id]: i
					}
				}
				return e
			}, t.exports.middleware = function() {
				return () => e => t => {
					e(t)
				}
			}
		}, {
			nanoid: 24
		}],
		172: [function(e, t, i) {
			"use strict";
			var r, s;
			const {
				UIPlugin: n
			} = e("@uppy/core"), o = e("@uppy/utils/lib/dataURItoBlob"), a = e("@uppy/utils/lib/isObjectURL"), l = e("@uppy/utils/lib/isPreviewSupported"), u = e("exifr/dist/mini.legacy.umd.js");
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					super(e, t), this.onFileAdded = e => {
						!e.preview && e.data && l(e.type) && !e.isRemote && this.addToQueue(e.id)
					}, this.onCancelRequest = e => {
						const t = this.queue.indexOf(e.id); - 1 !== t && this.queue.splice(t, 1)
					}, this.onFileRemoved = e => {
						const t = this.queue.indexOf(e.id); - 1 !== t && this.queue.splice(t, 1), e.preview && a(e.preview) && URL.revokeObjectURL(e.preview)
					}, this.onRestored = () => {
						this.uppy.getFiles().filter((e => e.isRestored)).forEach((e => {
							e.preview && !a(e.preview) || this.addToQueue(e.id)
						}))
					}, this.waitUntilAllProcessed = e => {
						e.forEach((e => {
							const t = this.uppy.getFile(e);
							this.uppy.emit("preprocess-progress", t, {
								mode: "indeterminate",
								message: this.i18n("generatingThumbnails")
							})
						}));
						const t = () => {
							e.forEach((e => {
								const t = this.uppy.getFile(e);
								this.uppy.emit("preprocess-complete", t)
							}))
						};
						return new Promise((e => {
							this.queueProcessing ? this.uppy.once("thumbnail:all-generated", (() => {
								t(), e()
							})) : (t(), e())
						}))
					}, this.type = "modifier", this.id = this.opts.id || "ThumbnailGenerator", this.title = "Thumbnail Generator", this.queue = [], this.queueProcessing = !1, this.defaultThumbnailDimension = 200, this.thumbnailType = this.opts.thumbnailType || "image/jpeg", this.defaultLocale = {
						strings: {
							generatingThumbnails: "Generating thumbnails..."
						}
					};
					if (this.opts = {
							thumbnailWidth: null,
							thumbnailHeight: null,
							waitForThumbnailsBeforeUpload: !1,
							lazy: !1,
							...t
						}, this.i18nInit(), this.opts.lazy && this.opts.waitForThumbnailsBeforeUpload) throw new Error("ThumbnailGenerator: The `lazy` and `waitForThumbnailsBeforeUpload` options are mutually exclusive. Please ensure at most one of them is set to `true`.")
				}
				createThumbnail(e, t, i) {
					const r = URL.createObjectURL(e.data),
						s = new Promise(((e, t) => {
							const i = new Image;
							i.src = r, i.addEventListener("load", (() => {
								URL.revokeObjectURL(r), e(i)
							})), i.addEventListener("error", (e => {
								URL.revokeObjectURL(r), t(e.error || new Error("Could not create thumbnail"))
							}))
						})),
						n = u.rotation(e.data).catch((() => 1));
					return Promise.all([s, n]).then((([e, r]) => {
						const s = this.getProportionalDimensions(e, t, i, r.deg),
							n = this.rotateImage(e, r),
							o = this.resizeImage(n, s.width, s.height);
						return this.canvasToBlob(o, this.thumbnailType, 80)
					})).then((e => URL.createObjectURL(e)))
				}
				getProportionalDimensions(e, t, i, r) {
					let s = e.width / e.height;
					return 90 !== r && 270 !== r || (s = e.height / e.width), null != t ? {
						width: t,
						height: Math.round(t / s)
					} : null != i ? {
						width: Math.round(i * s),
						height: i
					} : {
						width: this.defaultThumbnailDimension,
						height: Math.round(this.defaultThumbnailDimension / s)
					}
				}
				protect(e) {
					const t = e.width / e.height,
						i = 5e6,
						r = 4096;
					let s = Math.floor(Math.sqrt(i * t)),
						n = Math.floor(i / Math.sqrt(i * t));
					if (s > r && (s = r, n = Math.round(s / t)), n > r && (n = r, s = Math.round(t * n)), e.width > s) {
						const t = document.createElement("canvas");
						t.width = s, t.height = n, t.getContext("2d").drawImage(e, 0, 0, s, n), e = t
					}
					return e
				}
				resizeImage(e, t, i) {
					e = this.protect(e);
					let r = Math.ceil(Math.log2(e.width / t));
					r < 1 && (r = 1);
					let s = t * 2 ** (r - 1),
						n = i * 2 ** (r - 1);
					for (; r--;) {
						const t = document.createElement("canvas");
						t.width = s, t.height = n, t.getContext("2d").drawImage(e, 0, 0, s, n), e = t, s = Math.round(s / 2), n = Math.round(n / 2)
					}
					return e
				}
				rotateImage(e, t) {
					let i = e.width,
						r = e.height;
					90 !== t.deg && 270 !== t.deg || (i = e.height, r = e.width);
					const s = document.createElement("canvas");
					s.width = i, s.height = r;
					const n = s.getContext("2d");
					return n.translate(i / 2, r / 2), t.canvas && (n.rotate(t.rad), n.scale(t.scaleX, t.scaleY)), n.drawImage(e, -e.width / 2, -e.height / 2, e.width, e.height), s
				}
				canvasToBlob(e, t, i) {
					try {
						e.getContext("2d").getImageData(0, 0, 1, 1)
					} catch (e) {
						if (18 === e.code) return Promise.reject(new Error("cannot read image, probably an svg with external resources"))
					}
					return e.toBlob ? new Promise((r => {
						e.toBlob(r, t, i)
					})).then((e => {
						if (null === e) throw new Error("cannot read image, probably an svg with external resources");
						return e
					})) : Promise.resolve().then((() => o(e.toDataURL(t, i), {}))).then((e => {
						if (null === e) throw new Error("could not extract blob, probably an old browser");
						return e
					}))
				}
				setPreviewURL(e, t) {
					this.uppy.setFileState(e, {
						preview: t
					})
				}
				addToQueue(e) {
					this.queue.push(e), !1 === this.queueProcessing && this.processQueue()
				}
				processQueue() {
					if (this.queueProcessing = !0, this.queue.length > 0) {
						const e = this.uppy.getFile(this.queue.shift());
						return e ? this.requestThumbnail(e).catch((() => {})).then((() => this.processQueue())) : void this.uppy.log("[ThumbnailGenerator] file was removed before a thumbnail could be generated, but not removed from the queue. This is probably a bug", "error")
					}
					this.queueProcessing = !1, this.uppy.log("[ThumbnailGenerator] Emptied thumbnail queue"), this.uppy.emit("thumbnail:all-generated")
				}
				requestThumbnail(e) {
					return l(e.type) && !e.isRemote ? this.createThumbnail(e, this.opts.thumbnailWidth, this.opts.thumbnailHeight).then((t => {
						this.setPreviewURL(e.id, t), this.uppy.log(`[ThumbnailGenerator] Generated thumbnail for ${e.id}`), this.uppy.emit("thumbnail:generated", this.uppy.getFile(e.id), t)
					})).catch((t => {
						this.uppy.log(`[ThumbnailGenerator] Failed thumbnail for ${e.id}:`, "warning"), this.uppy.log(t, "warning"), this.uppy.emit("thumbnail:error", this.uppy.getFile(e.id), t)
					})) : Promise.resolve()
				}
				install() {
					this.uppy.on("file-removed", this.onFileRemoved), this.opts.lazy ? (this.uppy.on("thumbnail:request", this.onFileAdded), this.uppy.on("thumbnail:cancel", this.onCancelRequest)) : (this.uppy.on("file-added", this.onFileAdded), this.uppy.on("restored", this.onRestored)), this.opts.waitForThumbnailsBeforeUpload && this.uppy.addPreProcessor(this.waitUntilAllProcessed)
				}
				uninstall() {
					this.uppy.off("file-removed", this.onFileRemoved), this.opts.lazy ? (this.uppy.off("thumbnail:request", this.onFileAdded), this.uppy.off("thumbnail:cancel", this.onCancelRequest)) : (this.uppy.off("file-added", this.onFileAdded), this.uppy.off("restored", this.onRestored)), this.opts.waitForThumbnailsBeforeUpload && this.uppy.removePreProcessor(this.waitUntilAllProcessed)
				}
			}, r.VERSION = "2.0.5", s)
		}, {
			"@uppy/core": 89,
			"@uppy/utils/lib/dataURItoBlob": 193,
			"@uppy/utils/lib/isObjectURL": 217,
			"@uppy/utils/lib/isPreviewSupported": 218,
			"exifr/dist/mini.legacy.umd.js": 11
		}],
		173: [function(e, t, i) {
			"use strict";

			function r(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var s = 0;

			function n(e) {
				return "__private_" + s++ + "_" + e
			}
			const o = e("component-emitter"),
				a = e("@uppy/utils/lib/hasProperty"),
				l = e("@uppy/utils/lib/NetworkError"),
				u = e("@uppy/utils/lib/fetchWithNetworkError"),
				p = e("./parseUrl");
			let c;
			const h = "ASSEMBLY_EXECUTING",
				d = "ASSEMBLY_COMPLETED",
				f = ["ASSEMBLY_UPLOADING", h, d];

			function m(e, t) {
				return f.indexOf(e) >= f.indexOf(t)
			}
			var g = n("onFinished"),
				y = n("connectSocket"),
				v = n("onError"),
				b = n("beginPolling"),
				w = n("fetchStatus"),
				S = n("diffStatus");

			function P() {
				this.emit("finished"), this.close()
			}

			function k() {
				const t = p(this.status.websocket_url),
					i = (null != c || (c = e("socket.io-client")), c).connect(t.origin, {
						transports: ["websocket"],
						path: t.pathname
					});
				i.on("connect", (() => {
					i.emit("assembly_connect", {
						id: this.status.assembly_id
					}), this.emit("connect")
				})), i.on("connect_failed", (() => {
					r(this, v)[v](new l("Transloadit Socket.io connection error")), this.socket = null
				})), i.on("connect_error", (() => {
					i.disconnect(), this.socket = null
				})), i.on("assembly_finished", (() => {
					r(this, g)[g]()
				})), i.on("assembly_upload_finished", (e => {
					this.emit("upload", e), this.status.uploads.push(e)
				})), i.on("assembly_uploading_finished", (() => {
					this.emit("executing")
				})), i.on("assembly_upload_meta_data_extracted", (() => {
					this.emit("metadata"), r(this, w)[w]({
						diff: !1
					})
				})), i.on("assembly_result_finished", ((e, t) => {
					this.emit("result", e, t), this.status.results[e] || (this.status.results[e] = []), this.status.results[e].push(t)
				})), i.on("assembly_error", (e => {
					r(this, v)[v](e), r(this, w)[w]({
						diff: !1
					})
				})), this.socket = i
			}

			function C(e) {
				this.emit("error", Object.assign(new Error(e.message), e))
			}

			function E() {
				this.pollInterval = setInterval((() => {
					this.socket && this.socket.connected || r(this, w)[w]()
				}), 2e3)
			}

			function x({
				diff: e = !0
			} = {}) {
				return u(this.status.assembly_ssl_url).then((e => e.json())).then((t => {
					this.closed || (this.emit("status", t), e ? this.updateStatus(t) : this.status = t)
				})).catch((e => r(this, v)[v](e)))
			}

			function _(e, t) {
				const i = e.ok,
					s = t.ok;
				if (t.error && !e.error) return r(this, v)[v](t);
				const n = m(s, h) && !m(i, h);
				n && this.emit("executing"), Object.keys(t.uploads).filter((t => !a(e.uploads, t))).forEach((e => {
					this.emit("upload", t.uploads[e])
				})), n && this.emit("metadata"), Object.keys(t.results).forEach((i => {
					const r = t.results[i],
						s = e.results[i];
					r.filter((e => !s || !s.some((t => t.id === e.id)))).forEach((e => {
						this.emit("result", i, e)
					}))
				})), m(s, d) && !m(i, d) && this.emit("finished")
			}
			t.exports = class extends o {
				constructor(e) {
					super(), Object.defineProperty(this, S, {
						value: _
					}), Object.defineProperty(this, w, {
						value: x
					}), Object.defineProperty(this, b, {
						value: E
					}), Object.defineProperty(this, v, {
						value: C
					}), Object.defineProperty(this, y, {
						value: k
					}), Object.defineProperty(this, g, {
						value: P
					}), this.status = e, this.socket = null, this.pollInterval = null, this.closed = !1
				}
				connect() {
					r(this, y)[y](), r(this, b)[b]()
				}
				update() {
					return r(this, w)[w]({
						diff: !0
					})
				}
				updateStatus(e) {
					r(this, S)[S](this.status, e), this.status = e
				}
				close() {
					this.closed = !0, this.socket && (this.socket.disconnect(), this.socket = null), clearInterval(this.pollInterval)
				}
			}
		}, {
			"./parseUrl": 178,
			"@uppy/utils/lib/NetworkError": 188,
			"@uppy/utils/lib/fetchWithNetworkError": 196,
			"@uppy/utils/lib/hasProperty": 213,
			"component-emitter": 7,
			"socket.io-client": 32
		}],
		174: [function(e, t, i) {
			"use strict";
			var r = 0;

			function s(e) {
				return "__private_" + r++ + "_" + e
			}

			function n(e) {
				if (null == e) throw new Error("Transloadit: The `params` option is required.");
				if ("string" == typeof e) try {
					e = JSON.parse(e)
				} catch (e) {
					const t = new Error("Transloadit: The `params` option is a malformed JSON string.");
					throw e.cause = e, t
				}
				if (!e.auth || !e.auth.key) throw new Error("Transloadit: The `params.auth.key` option is required. You can find your Transloadit API key at https://transloadit.com/c/template-credentials")
			}

			function o(e) {
				const t = Object.create(null);
				for (const {
						fileIDs: i,
						options: r
					} of e) {
					const e = JSON.stringify(r);
					e in t ? t[e].fileIDArrays.push(i) : t[e] = {
						options: r,
						fileIDArrays: [i]
					}
				}
				return Object.values(t).map((({
					options: e,
					fileIDArrays: t
				}) => ({
					options: e,
					fileIDs: t.flat(1)
				})))
			}
			var a = s("getAssemblyOptions");
			async function l(e) {
				const t = this.opts,
					i = await t.getAssemblyOptions(e, t);
				return Array.isArray(i.fields) ? i.fields = Object.fromEntries(i.fields.map((t => [t, e.meta[t]]))) : null == i.fields && (i.fields = {}), n(i.params), {
					fileIDs: [e.id],
					options: i
				}
			}
			t.exports = class {
				constructor(e, t) {
					Object.defineProperty(this, a, {
						value: l
					}), this.files = e, this.opts = t
				}
				async build() {
					const e = this.opts;
					if (this.files.length > 0) return Promise.all(this.files.map((e => function(e, t) {
						if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
						return e
					}(this, a)[a](e)))).then(o);
					if (e.alwaysRunAssembly) {
						const t = await e.getAssemblyOptions(null, e);
						return n(t.params), [{
							fileIDs: this.files.map((e => e.id)),
							options: t
						}]
					}
					return []
				}
			}, t.exports.validateParams = n
		}, {}],
		175: [function(e, t, i) {
			"use strict";

			function r(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var s = 0;

			function n(e) {
				return "__private_" + s++ + "_" + e
			}
			const o = e("component-emitter");
			var a = n("assemblyIDs"),
				l = n("reject"),
				u = n("remaining"),
				p = n("resolve"),
				c = n("uppy"),
				h = n("watching"),
				d = n("onAssemblyComplete"),
				f = n("onAssemblyCancel"),
				m = n("onAssemblyError"),
				g = n("onImportError"),
				y = n("checkAllComplete"),
				v = n("removeListeners"),
				b = n("addListeners");

			function w(e) {
				return -1 !== r(this, a)[a].indexOf(e)
			}

			function S() {
				r(this, u)[u] -= 1, 0 === r(this, u)[u] && (r(this, v)[v](), r(this, p)[p]())
			}

			function P() {
				r(this, c)[c].off("transloadit:complete", r(this, d)[d]), r(this, c)[c].off("transloadit:assembly-cancel", r(this, f)[f]), r(this, c)[c].off("transloadit:assembly-error", r(this, m)[m]), r(this, c)[c].off("transloadit:import-error", r(this, g)[g])
			}

			function k() {
				r(this, c)[c].on("transloadit:complete", r(this, d)[d]), r(this, c)[c].on("transloadit:assembly-cancel", r(this, f)[f]), r(this, c)[c].on("transloadit:assembly-error", r(this, m)[m]), r(this, c)[c].on("transloadit:import-error", r(this, g)[g])
			}
			t.exports = class extends o {
				constructor(e, t) {
					super(), Object.defineProperty(this, b, {
						value: k
					}), Object.defineProperty(this, v, {
						value: P
					}), Object.defineProperty(this, y, {
						value: S
					}), Object.defineProperty(this, h, {
						value: w
					}), Object.defineProperty(this, a, {
						writable: !0,
						value: void 0
					}), Object.defineProperty(this, l, {
						writable: !0,
						value: void 0
					}), Object.defineProperty(this, u, {
						writable: !0,
						value: void 0
					}), Object.defineProperty(this, p, {
						writable: !0,
						value: void 0
					}), Object.defineProperty(this, c, {
						writable: !0,
						value: void 0
					}), Object.defineProperty(this, d, {
						writable: !0,
						value: e => {
							r(this, h)[h](e.assembly_id) && (r(this, c)[c].log(`[Transloadit] AssemblyWatcher: Got Assembly finish ${e.assembly_id}`), this.emit("assembly-complete", e.assembly_id), r(this, y)[y]())
						}
					}), Object.defineProperty(this, f, {
						writable: !0,
						value: e => {
							r(this, h)[h](e.assembly_id) && r(this, y)[y]()
						}
					}), Object.defineProperty(this, m, {
						writable: !0,
						value: (e, t) => {
							r(this, h)[h](e.assembly_id) && (r(this, c)[c].log(`[Transloadit] AssemblyWatcher: Got Assembly error ${e.assembly_id}`), r(this, c)[c].log(t), this.emit("assembly-error", e.assembly_id, t), r(this, y)[y]())
						}
					}), Object.defineProperty(this, g, {
						writable: !0,
						value: (e, t, i) => {
							r(this, h)[h](e.assembly_id) && r(this, m)[m](e, i)
						}
					}), r(this, c)[c] = e, r(this, a)[a] = t, r(this, u)[u] = t.length, this.promise = new Promise(((e, t) => {
						r(this, p)[p] = e, r(this, l)[l] = t
					})), r(this, b)[b]()
				}
			}
		}, {
			"component-emitter": 7
		}],
		176: [function(e, t, i) {
			"use strict";
			var r, s;

			function n(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var o = 0;

			function a(e) {
				return "__private_" + o++ + "_" + e
			}
			const l = e("@uppy/utils/lib/fetchWithNetworkError");
			t.exports = (r = a("headers"), s = a("reportError"), class {
				constructor(e = {}) {
					Object.defineProperty(this, r, {
						writable: !0,
						value: {}
					}), Object.defineProperty(this, s, {
						writable: !0,
						value: (e, t) => {
							if (!1 === this.opts.errorReporting) throw e;
							const i = {
								type: t.type
							};
							throw t.assembly && (i.assembly = t.assembly.assembly_id, i.instance = t.assembly.instance), t.url && (i.endpoint = t.url), this.submitError(e, i).catch((() => {})), e
						}
					}), this.opts = e, null != this.opts.client && (n(this, r)[r]["Transloadit-Client"] = this.opts.client)
				}
				createAssembly({
					params: e,
					fields: t,
					signature: i,
					expectedFiles: o
				}) {
					const a = new FormData;
					a.append("params", "string" == typeof e ? e : JSON.stringify(e)), i && a.append("signature", i), Object.keys(t).forEach((e => {
						a.append(e, t[e])
					})), a.append("num_expected_upload_files", o);
					const u = new URL("/assemblies", `${this.opts.service}`).href;
					return l(u, {
						method: "post",
						headers: n(this, r)[r],
						body: a
					}).then((e => e.json())).then((e => {
						if (e.error) {
							const t = new Error(e.error);
							throw t.details = e.message, t.assembly = e, e.assembly_id && (t.details += ` Assembly ID: ${e.assembly_id}`), t
						}
						return e
					})).catch((e => n(this, s)[s](e, {
						url: u,
						type: "API_ERROR"
					})))
				}
				reserveFile(e, t) {
					const i = encodeURIComponent(t.size),
						o = `${e.assembly_ssl_url}/reserve_file?size=${i}`;
					return l(o, {
						method: "post",
						headers: n(this, r)[r]
					}).then((e => e.json())).catch((i => n(this, s)[s](i, {
						assembly: e,
						file: t,
						url: o,
						type: "API_ERROR"
					})))
				}
				addFile(e, t) {
					if (!t.uploadURL) return Promise.reject(new Error("File does not have an `uploadURL`."));
					const i = encodeURIComponent(t.size),
						o = encodeURIComponent(t.uploadURL),
						a = `size=${i}&filename=${encodeURIComponent(t.name)}&fieldname=file&s3Url=${o}`,
						u = `${e.assembly_ssl_url}/add_file?${a}`;
					return l(u, {
						method: "post",
						headers: n(this, r)[r]
					}).then((e => e.json())).catch((i => n(this, s)[s](i, {
						assembly: e,
						file: t,
						url: u,
						type: "API_ERROR"
					})))
				}
				cancelAssembly(e) {
					const t = e.assembly_ssl_url;
					return l(t, {
						method: "delete",
						headers: n(this, r)[r]
					}).then((e => e.json())).catch((e => n(this, s)[s](e, {
						url: t,
						type: "API_ERROR"
					})))
				}
				getAssemblyStatus(e) {
					return l(e, {
						headers: n(this, r)[r]
					}).then((e => e.json())).catch((t => n(this, s)[s](t, {
						url: e,
						type: "STATUS_ERROR"
					})))
				}
				submitError(e, {
					endpoint: t,
					instance: i,
					assembly: r
				} = {}) {
					const s = e.details ? `${e.message} (${e.details})` : e.message;
					return l("https://transloaditstatus.com/client_error", {
						method: "post",
						body: JSON.stringify({
							endpoint: t,
							instance: i,
							assembly_id: r,
							agent: "undefined" != typeof navigator ? navigator.userAgent : "",
							client: this.opts.client,
							error: s
						})
					}).then((e => e.json()))
				}
			})
		}, {
			"@uppy/utils/lib/fetchWithNetworkError": 196
		}],
		177: [function(e, t, i) {
			"use strict";
			var r, s, n, o, a, l, u, p, c, h, d, f, m, g, y, v, b, w, S, P, k, C;

			function E(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var x = 0;

			function _(e) {
				return "__private_" + x++ + "_" + e
			}
			const F = e("@uppy/utils/lib/hasProperty"),
				O = e("@uppy/core/lib/BasePlugin"),
				A = e("@uppy/tus"),
				T = e("./Assembly"),
				R = e("./Client"),
				U = e("./AssemblyOptions"),
				D = e("./AssemblyWatcher");

			function I(e, t) {
				return {
					params: t.params,
					signature: t.signature,
					fields: t.fields
				}
			}
			const B = e => t => {
					const i = new Error("Failed to send error to the client");
					i.cause = t, console.error(i, e)
				},
				N = /https?:\/\/api2(?:-\w+)?\.transloadit\.com\/companion/;

			function M() {
				const e = [`uppy-core:${this.uppy.constructor.VERSION}`, `uppy-transloadit:${this.constructor.VERSION}`, `uppy-tus:${A.VERSION}`],
					t = (t, i) => {
						const r = this.uppy.getPlugin(t);
						r && e.push(`${i}:${r.constructor.VERSION}`)
					};
				return this.opts.importFromUploadURLs && (t("XHRUpload", "uppy-xhr-upload"), t("AwsS3", "uppy-aws-s3"), t("AwsS3Multipart", "uppy-aws-s3-multipart")), t("Dropbox", "uppy-dropbox"), t("Box", "uppy-box"), t("Facebook", "uppy-facebook"), t("GoogleDrive", "uppy-google-drive"), t("Instagram", "uppy-instagram"), t("OneDrive", "uppy-onedrive"), t("Zoom", "uppy-zoom"), t("Url", "uppy-url"), e.join(",")
			}

			function j(e, t) {
				const i = {
						...e.meta,
						assembly_url: t.assembly_url,
						filename: e.name,
						fieldname: "file"
					},
					r = {
						...e.tus,
						endpoint: t.tus_url,
						addRequestId: !0
					};
				let {
					remote: s
				} = e;
				if (e.remote && N.test(e.remote.companionUrl)) {
					const i = t.companion_url.replace(/\/$/, ""),
						r = e.remote.url.replace(e.remote.companionUrl, "").replace(/^\//, "");
					s = {
						...e.remote,
						companionUrl: i,
						url: `${i}/${r}`
					}
				}
				const n = {
					...e,
					transloadit: {
						assembly: t.assembly_id
					}
				};
				return this.opts.importFromUploadURLs || Object.assign(n, {
					meta: i,
					tus: r,
					remote: s
				}), n
			}

			function L(e, t, i) {
				return this.uppy.log("[Transloadit] Create Assembly"), this.client.createAssembly({
					params: i.params,
					fields: i.fields,
					expectedFiles: e.length,
					signature: i.signature
				}).then((i => {
					const r = new T(i),
						{
							status: s
						} = r,
						o = s.assembly_id,
						{
							assemblies: a,
							uploadsAssemblies: l
						} = this.getPluginState();
					this.setPluginState({
						assemblies: {
							...a,
							[o]: s
						},
						uploadsAssemblies: {
							...l,
							[t]: [...l[t], o]
						}
					});
					const {
						files: u
					} = this.uppy.getState(), p = {};
					return e.forEach((e => {
						p[e] = E(this, n)[n](this.uppy.getFile(e), s)
					})), this.uppy.setState({
						files: {
							...u,
							...p
						}
					}), this.uppy.emit("transloadit:assembly-created", s, e), this.uppy.log(`[Transloadit] Created Assembly ${o}`), r
				})).catch((e => {
					const t = new Error(`${this.i18n("creatingAssemblyFailed")}: ${e.message}`);
					throw t.cause = e, t
				}))
			}

			function z(e, t, i) {
				const r = new D(this.uppy, e);
				r.on("assembly-complete", (e => {
					this.getAssemblyFiles(e).forEach((e => {
						this.completedFiles[e.id] = !0, this.uppy.emit("postprocess-complete", e)
					}))
				})), r.on("assembly-error", ((e, t) => {
					this.getAssemblyFiles(e).forEach((e => {
						this.uppy.emit("upload-error", e, t), this.uppy.emit("postprocess-complete", e)
					}))
				})), this.assemblyWatchers[i] = r
			}

			function H() {
				return this.opts.waitForEncoding || this.opts.waitForMetadata
			}

			function $(e, t) {
				return Promise.all(t.map((t => {
					const i = this.uppy.getFile(t);
					return this.client.reserveFile(e.status, i)
				})))
			}

			function q(e) {
				const t = this.uppy.getFiles();
				for (let i = 0; i < t.length; i++) {
					const r = t[i];
					if (r.uploadURL === e.tus_upload_url) return r;
					if (r.tus && r.tus.uploadUrl === e.tus_upload_url) return r;
					if (!e.is_tus_file && r.name === e.name && r.size === e.size) return r
				}
			}

			function V(e, t) {
				const i = this.getPluginState(),
					r = E(this, c)[c](t);
				r ? (this.setPluginState({
					files: {
						...i.files,
						[t.id]: {
							assembly: e,
							id: r.id,
							uploadedFile: t
						}
					}
				}), this.uppy.emit("transloadit:upload", t, this.getAssembly(e))) : this.uppy.log("[Transloadit] Couldn’t file the file, it was likely removed in the process")
			}

			function W(e, t, i) {
				const r = this.getPluginState(),
					s = r.files[i.original_id];
				i.localId = s ? s.id : null;
				const n = {
					result: i,
					stepName: t,
					id: i.id,
					assembly: e
				};
				this.setPluginState({
					results: [...r.results, n]
				}), this.uppy.emit("transloadit:result", t, i, this.getAssembly(e))
			}

			function X(e) {
				const t = e.assembly_ssl_url;
				this.client.getAssemblyStatus(t).then((e => {
					const t = e.assembly_id,
						i = this.getPluginState();
					this.setPluginState({
						assemblies: {
							...i.assemblies,
							[t]: e
						}
					}), this.uppy.emit("transloadit:complete", e)
				}))
			}
			async function G(e) {
				await this.client.cancelAssembly(e), this.uppy.emit("transloadit:assembly-cancelled", e)
			}

			function K(e) {
				const {
					status: t
				} = e, i = t.assembly_id;
				return this.activeAssemblies[i] = e, e.on("status", (e => {
					const {
						assemblies: t
					} = this.getPluginState();
					this.setPluginState({
						assemblies: {
							...t,
							[i]: e
						}
					})
				})), e.on("upload", (e => {
					E(this, h)[h](i, e)
				})), e.on("error", (t => {
					t.assembly = e.status, this.uppy.emit("transloadit:assembly-error", e.status, t)
				})), e.on("executing", (() => {
					this.uppy.emit("transloadit:assembly-executing", e.status)
				})), this.opts.waitForEncoding && e.on("result", ((e, t) => {
					E(this, d)[d](i, e, t)
				})), this.opts.waitForEncoding ? e.on("finished", (() => {
					E(this, f)[f](e.status)
				})) : this.opts.waitForMetadata && e.on("metadata", (() => {
					E(this, f)[f](e.status)
				})), "ASSEMBLY_COMPLETE" === e.ok || e.connect(), e
			}
			t.exports = (s = _("getClientVersion"), n = _("attachAssemblyMetadata"), o = _("createAssembly"), a = _("createAssemblyWatcher"), l = _("shouldWaitAfterUpload"), u = _("reserveFiles"), p = _("onFileUploadURLAvailable"), c = _("findFile"), h = _("onFileUploadComplete"), d = _("onResult"), f = _("onAssemblyFinished"), m = _("cancelAssembly"), g = _("onCancelAll"), y = _("getPersistentData"), v = _("onRestored"), b = _("connectAssembly"), w = _("prepareUpload"), S = _("afterUpload"), P = _("onError"), k = _("onTusError"), C = r = class extends O {
				constructor(e, t) {
					super(e, t), Object.defineProperty(this, b, {
						value: K
					}), Object.defineProperty(this, m, {
						value: G
					}), Object.defineProperty(this, f, {
						value: X
					}), Object.defineProperty(this, d, {
						value: W
					}), Object.defineProperty(this, h, {
						value: V
					}), Object.defineProperty(this, c, {
						value: q
					}), Object.defineProperty(this, u, {
						value: $
					}), Object.defineProperty(this, l, {
						value: H
					}), Object.defineProperty(this, a, {
						value: z
					}), Object.defineProperty(this, o, {
						value: L
					}), Object.defineProperty(this, n, {
						value: j
					}), Object.defineProperty(this, s, {
						value: M
					}), Object.defineProperty(this, p, {
						writable: !0,
						value: e => {
							const t = this.uppy.getFile(e.id);
							if (!t || !t.transloadit || !t.transloadit.assembly) return;
							const {
								assemblies: i
							} = this.getPluginState(), r = i[t.transloadit.assembly];
							this.client.addFile(r, t).catch((e => {
								this.uppy.log(e), this.uppy.emit("transloadit:import-error", r, t.id, e)
							}))
						}
					}), Object.defineProperty(this, g, {
						writable: !0,
						value: () => {
							const {
								uploadsAssemblies: e
							} = this.getPluginState(), t = Object.values(e).flat(1).map((e => {
								const t = this.getAssembly(e);
								return E(this, m)[m](t)
							}));
							Promise.all(t).catch((e => {
								this.uppy.log(e)
							}))
						}
					}), Object.defineProperty(this, y, {
						writable: !0,
						value: e => {
							const {
								assemblies: t,
								uploadsAssemblies: i
							} = this.getPluginState();
							e({
								[this.id]: {
									assemblies: t,
									uploadsAssemblies: i
								}
							})
						}
					}), Object.defineProperty(this, v, {
						writable: !0,
						value: e => {
							const t = e && e[this.id] ? e[this.id] : {},
								i = t.assemblies || {},
								r = t.uploadsAssemblies || {};
							if (0 === Object.keys(r).length) return;
							const s = e => {
									const t = {},
										i = [];
									for (const [r, s] of Object.entries(e)) {
										s.uploads.forEach((e => {
											const i = E(this, c)[c](e);
											t[e.id] = {
												id: i.id,
												assembly: r,
												uploadedFile: e
											}
										}));
										const e = this.getPluginState();
										Object.keys(s.results).forEach((t => {
											for (const n of s.results[t]) {
												const s = e.files[n.original_id];
												n.localId = s ? s.id : null, i.push({
													id: n.id,
													result: n,
													stepName: t,
													assembly: r
												})
											}
										}))
									}
									this.setPluginState({
										assemblies: e,
										files: t,
										results: i,
										uploadsAssemblies: r
									})
								},
								n = () => {
									const {
										assemblies: e,
										uploadsAssemblies: t
									} = this.getPluginState();
									Object.keys(t).forEach((e => {
										const i = t[e],
											r = i.flatMap((e => this.getAssemblyFiles(e).map((e => e.id))));
										E(this, a)[a](i, r, e)
									}));
									Object.keys(e).forEach((t => {
										const i = new T(e[t]);
										E(this, b)[b](i)
									}))
								},
								o = () => {
									const {
										assemblies: e
									} = this.getPluginState();
									return Promise.all(Object.keys(e).map((e => this.activeAssemblies[e].update())))
								};
							this.restored = Promise.resolve().then((() => (s(i), n(), o()))), this.restored.then((() => {
								this.restored = null
							}))
						}
					}), Object.defineProperty(this, w, {
						writable: !0,
						value: (e, t) => {
							const i = e.filter((e => !e.error)),
								r = i.map((e => {
									const t = this.uppy.getFile(e);
									return this.uppy.emit("preprocess-progress", t, {
										mode: "indeterminate",
										message: this.i18n("creatingAssembly")
									}), t
								})),
								s = async ({
									fileIDs: e,
									options: i
								}) => {
									try {
										const r = await E(this, o)[o](e, t, i);
										return this.opts.importFromUploadURLs && await E(this, u)[u](r, e), e.forEach((e => {
											const t = this.uppy.getFile(e);
											this.uppy.emit("preprocess-complete", t)
										})), r
									} catch (t) {
										throw e.forEach((e => {
											const i = this.uppy.getFile(e);
											this.uppy.emit("preprocess-complete", i), this.uppy.emit("upload-error", i, t)
										})), t
									}
								}, {
									uploadsAssemblies: n
								} = this.getPluginState();
							this.setPluginState({
								uploadsAssemblies: {
									...n,
									[t]: []
								}
							});
							return new U(r, this.opts).build().then((e => Promise.all(e.map(s)))).then((e => {
								const r = e.map((e => e.status.assembly_id));
								return E(this, a)[a](r, i, t), Promise.all(e.map((e => E(this, b)[b](e))))
							})).catch((e => {
								throw r.forEach((t => {
									this.uppy.emit("preprocess-complete", t), this.uppy.emit("upload-error", t, e)
								})), e
							}))
						}
					}), Object.defineProperty(this, S, {
						writable: !0,
						value: (e, t) => {
							const i = e.map((e => this.uppy.getFile(e))),
								r = i.filter((e => !e.error)).map((e => e.id)),
								s = this.getPluginState();
							if (this.restored) return this.restored.then((() => E(this, S)[S](r, t)));
							const n = s.uploadsAssemblies[t],
								o = () => {
									n.forEach((e => {
										this.activeAssemblies[e].close(), delete this.activeAssemblies[e]
									}))
								};
							if (!E(this, l)[l]()) {
								o();
								const e = n.map((e => this.getAssembly(e)));
								return this.uppy.addResultData(t, {
									transloadit: e
								}), Promise.resolve()
							}
							if (0 === n.length) return this.uppy.addResultData(t, {
								transloadit: []
							}), Promise.resolve();
							i.filter((e => !F(this.completedFiles, e.id))).forEach((e => {
								this.uppy.emit("postprocess-progress", e, {
									mode: "indeterminate",
									message: this.i18n("encoding")
								})
							}));
							return this.assemblyWatchers[t].promise.then((() => {
								o();
								const e = n.map((e => this.getAssembly(e))),
									i = {
										...this.getPluginState().uploadsAssemblies
									};
								delete i[t], this.setPluginState({
									uploadsAssemblies: i
								}), this.uppy.addResultData(t, {
									transloadit: e
								})
							}))
						}
					}), Object.defineProperty(this, P, {
						writable: !0,
						value: (e = null, t) => {
							const i = this.getPluginState().uploadsAssemblies[t];
							null == i || i.forEach((e => {
								this.activeAssemblies[e] && this.activeAssemblies[e].close()
							})), this.client.submitError(e).catch(B(e))
						}
					}), Object.defineProperty(this, k, {
						writable: !0,
						value: e => {
							if (e && /^tus: /.test(e.message)) {
								const t = e.originalRequest ? e.originalRequest.getUnderlyingObject() : null,
									i = t && t.responseURL ? t.responseURL : null;
								this.client.submitError(e, {
									url: i,
									type: "TUS_ERROR"
								}).catch(B(e))
							}
						}
					}), this.type = "uploader", this.id = this.opts.id || "Transloadit", this.title = "Transloadit", this.defaultLocale = {
						strings: {
							creatingAssembly: "Preparing upload...",
							creatingAssemblyFailed: "Transloadit: Could not create Assembly",
							encoding: "Encoding..."
						}
					};
					const i = {
						service: "https://api2.transloadit.com",
						errorReporting: !0,
						waitForEncoding: !1,
						waitForMetadata: !1,
						alwaysRunAssembly: !1,
						importFromUploadURLs: !1,
						signature: null,
						params: null,
						fields: {},
						getAssemblyOptions: I,
						limit: 0
					};
					this.opts = {
						...i,
						...t
					}, this.i18nInit();
					const r = this.opts.getAssemblyOptions !== i.getAssemblyOptions;
					this.opts.params ? U.validateParams(this.opts.params) : r || U.validateParams(null), this.client = new R({
						service: this.opts.service,
						client: E(this, s)[s](),
						errorReporting: this.opts.errorReporting
					}), this.activeAssemblies = {}, this.assemblyWatchers = {}, this.completedFiles = Object.create(null)
				}
				install() {
					this.uppy.addPreProcessor(E(this, w)[w]), this.uppy.addPostProcessor(E(this, S)[S]), this.uppy.on("error", E(this, P)[P]), this.uppy.on("cancel-all", E(this, g)[g]), this.uppy.on("upload-error", E(this, k)[k]), this.opts.importFromUploadURLs ? this.uppy.on("upload-success", E(this, p)[p]) : this.uppy.use(A, {
						storeFingerprintForResuming: !1,
						useFastRemoteRetry: !1,
						metaFields: ["assembly_url", "filename", "fieldname"],
						limit: this.opts.limit
					}), this.uppy.on("restore:get-data", E(this, y)[y]), this.uppy.on("restored", E(this, v)[v]), this.setPluginState({
						assemblies: {},
						uploadsAssemblies: {},
						files: {},
						results: []
					});
					const {
						capabilities: e
					} = this.uppy.getState();
					this.uppy.setState({
						capabilities: {
							...e,
							individualCancellation: !1
						}
					})
				}
				uninstall() {
					this.uppy.removePreProcessor(E(this, w)[w]), this.uppy.removePostProcessor(E(this, S)[S]), this.uppy.off("error", E(this, P)[P]), this.opts.importFromUploadURLs && this.uppy.off("upload-success", E(this, p)[p]);
					const {
						capabilities: e
					} = this.uppy.getState();
					this.uppy.setState({
						capabilities: {
							...e,
							individualCancellation: !0
						}
					})
				}
				getAssembly(e) {
					const {
						assemblies: t
					} = this.getPluginState();
					return t[e]
				}
				getAssemblyFiles(e) {
					return this.uppy.getFiles().filter((t => t && t.transloadit && t.transloadit.assembly === e))
				}
			}, r.VERSION = "2.0.4", C), t.exports.COMPANION = "https://api2.transloadit.com/companion", t.exports.COMPANION_PATTERN = /\.transloadit\.com$/
		}, {
			"./Assembly": 173,
			"./AssemblyOptions": 174,
			"./AssemblyWatcher": 175,
			"./Client": 176,
			"@uppy/core/lib/BasePlugin": 85,
			"@uppy/tus": 180,
			"@uppy/utils/lib/hasProperty": 213
		}],
		178: [function(e, t, i) {
			"use strict";
			t.exports = function(e) {
				const t = /^\w+:\/\//.exec(e);
				let i = 0;
				t && (i = t[0].length + 1);
				const r = e.indexOf("/", i);
				return -1 === r ? {
					origin: e,
					pathname: "/"
				} : {
					origin: e.slice(0, r),
					pathname: e.slice(r)
				}
			}
		}, {}],
		179: [function(e, t, i) {
			"use strict";
			const r = e("tus-js-client");
			t.exports = function(e) {
				return (t, i) => {
					if ("undefined" != typeof window && (void 0 !== window.PhoneGap || void 0 !== window.Cordova || void 0 !== window.cordova) || "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase()) return r.defaultOptions.fingerprint(t, i);
					const s = ["tus", e.id, i.endpoint].join("-");
					return Promise.resolve(s)
				}
			}
		}, {
			"tus-js-client": 59
		}],
		180: [function(e, t, i) {
			"use strict";
			var r, s;
			const n = e("@uppy/core/lib/BasePlugin"),
				o = e("tus-js-client"),
				{
					Provider: a,
					RequestClient: l,
					Socket: u
				} = e("@uppy/companion-client"),
				p = e("@uppy/utils/lib/emitSocketProgress"),
				c = e("@uppy/utils/lib/getSocketHost"),
				h = e("@uppy/utils/lib/settle"),
				d = e("@uppy/utils/lib/EventTracker"),
				f = e("@uppy/utils/lib/NetworkError"),
				m = e("@uppy/utils/lib/isNetworkError"),
				{
					RateLimitedQueue: g
				} = e("@uppy/utils/lib/RateLimitedQueue"),
				y = e("@uppy/utils/lib/hasProperty"),
				v = e("./getFingerprint"),
				b = {
					endpoint: "",
					uploadUrl: null,
					metadata: {},
					uploadSize: null,
					onProgress: null,
					onChunkComplete: null,
					onSuccess: null,
					onError: null,
					overridePatchMethod: !1,
					headers: {},
					addRequestId: !1,
					chunkSize: 1 / 0,
					retryDelays: [0, 1e3, 3e3, 5e3],
					parallelUploads: 1,
					removeFingerprintOnSuccess: !1,
					uploadLengthDeferred: !1,
					uploadDataDuringCreation: !1
				};
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					super(e, t), this.type = "uploader", this.id = this.opts.id || "Tus", this.title = "Tus";
					if (this.opts = {
							useFastRemoteRetry: !0,
							limit: 5,
							retryDelays: [0, 1e3, 3e3, 5e3],
							withCredentials: !1,
							...t
						}, "autoRetry" in t) throw new Error("The `autoRetry` option was deprecated and has been removed.");
					this.requests = new g(this.opts.limit), this.uploaders = Object.create(null), this.uploaderEvents = Object.create(null), this.uploaderSockets = Object.create(null), this.handleResetProgress = this.handleResetProgress.bind(this), this.handleUpload = this.handleUpload.bind(this)
				}
				handleResetProgress() {
					const e = {
						...this.uppy.getState().files
					};
					Object.keys(e).forEach((t => {
						if (e[t].tus && e[t].tus.uploadUrl) {
							const i = {
								...e[t].tus
							};
							delete i.uploadUrl, e[t] = {
								...e[t],
								tus: i
							}
						}
					})), this.uppy.setState({
						files: e
					})
				}
				resetUploaderReferences(e, t = {}) {
					if (this.uploaders[e]) {
						const i = this.uploaders[e];
						i.abort(), t.abort && i.abort(!0), this.uploaders[e] = null
					}
					this.uploaderEvents[e] && (this.uploaderEvents[e].remove(), this.uploaderEvents[e] = null), this.uploaderSockets[e] && (this.uploaderSockets[e].close(), this.uploaderSockets[e] = null)
				}
				upload(e) {
					return this.resetUploaderReferences(e.id), new Promise(((t, i) => {
						this.uppy.emit("upload-started", e);
						const r = {
							...this.opts,
							...e.tus || {}
						};
						"function" == typeof r.headers && (r.headers = r.headers(e));
						const s = {
							...b,
							...r
						};
						s.fingerprint = v(e), s.onBeforeRequest = e => {
							e.getUnderlyingObject().withCredentials = !!r.withCredentials, "function" == typeof r.onBeforeRequest && r.onBeforeRequest(e)
						}, s.onError = t => {
							this.uppy.log(t);
							const r = t.originalRequest ? t.originalRequest.getUnderlyingObject() : null;
							m(r) && (t = new f(t, r)), this.resetUploaderReferences(e.id), u.done(), this.uppy.emit("upload-error", e, t), i(t)
						}, s.onProgress = (t, i) => {
							this.onReceiveUploadUrl(e, l.url), this.uppy.emit("upload-progress", e, {
								uploader: this,
								bytesUploaded: t,
								bytesTotal: i
							})
						}, s.onSuccess = () => {
							const i = {
								uploadURL: l.url
							};
							this.resetUploaderReferences(e.id), u.done(), this.uppy.emit("upload-success", e, i), l.url && this.uppy.log(`Download ${l.file.name} from ${l.url}`), t(l)
						};
						const n = (e, t, i) => {
								y(e, t) && !y(e, i) && (e[i] = e[t])
							},
							a = {};
						(Array.isArray(r.metaFields) ? r.metaFields : Object.keys(e.meta)).forEach((t => {
							a[t] = e.meta[t]
						})), n(a, "type", "filetype"), n(a, "name", "filename"), s.metadata = a;
						const l = new o.Upload(e.data, s);
						this.uploaders[e.id] = l, this.uploaderEvents[e.id] = new d(this.uppy), l.findPreviousUploads().then((t => {
							const i = t[0];
							i && (this.uppy.log(`[Tus] Resuming upload of ${e.id} started at ${i.creationTime}`), l.resumeFromPreviousUpload(i))
						}));
						let u = this.requests.run((() => (e.isPaused || l.start(), () => {})));
						this.onFileRemove(e.id, (i => {
							u.abort(), this.resetUploaderReferences(e.id, {
								abort: !!l.url
							}), t(`upload ${i} was removed`)
						})), this.onPause(e.id, (e => {
							e ? (u.abort(), l.abort()) : (u.abort(), u = this.requests.run((() => (l.start(), () => {}))))
						})), this.onPauseAll(e.id, (() => {
							u.abort(), l.abort()
						})), this.onCancelAll(e.id, (() => {
							u.abort(), this.resetUploaderReferences(e.id, {
								abort: !!l.url
							}), t(`upload ${e.id} was canceled`)
						})), this.onResumeAll(e.id, (() => {
							u.abort(), e.error && l.abort(), u = this.requests.run((() => (l.start(), () => {})))
						}))
					})).catch((t => {
						throw this.uppy.emit("upload-error", e, t), t
					}))
				}
				uploadRemote(e) {
					this.resetUploaderReferences(e.id);
					const t = {
						...this.opts
					};
					return e.tus && Object.assign(t, e.tus), this.uppy.emit("upload-started", e), this.uppy.log(e.remote.url), e.serverToken ? this.connectToServerSocket(e) : new Promise(((i, r) => {
						new(e.remote.providerOptions.provider ? a : l)(this.uppy, e.remote.providerOptions).post(e.remote.url, {
							...e.remote.body,
							endpoint: t.endpoint,
							uploadUrl: t.uploadUrl,
							protocol: "tus",
							size: e.data.size,
							headers: t.headers,
							metadata: e.meta
						}).then((t => (this.uppy.setFileState(e.id, {
							serverToken: t.token
						}), e = this.uppy.getFile(e.id), this.connectToServerSocket(e)))).then((() => {
							i()
						})).catch((t => {
							this.uppy.emit("upload-error", e, t), r(t)
						}))
					}))
				}
				connectToServerSocket(e) {
					return new Promise(((t, i) => {
						const r = e.serverToken,
							s = c(e.remote.companionUrl),
							n = new u({
								target: `${s}/api/${r}`,
								autoOpen: !1
							});
						this.uploaderSockets[e.id] = n, this.uploaderEvents[e.id] = new d(this.uppy), this.onFileRemove(e.id, (() => {
							o.abort(), n.send("cancel", {}), this.resetUploaderReferences(e.id), t(`upload ${e.id} was removed`)
						})), this.onPause(e.id, (e => {
							e ? (o.abort(), n.send("pause", {})) : (o.abort(), o = this.requests.run((() => (n.send("resume", {}), () => {}))))
						})), this.onPauseAll(e.id, (() => {
							o.abort(), n.send("pause", {})
						})), this.onCancelAll(e.id, (() => {
							o.abort(), n.send("cancel", {}), this.resetUploaderReferences(e.id), t(`upload ${e.id} was canceled`)
						})), this.onResumeAll(e.id, (() => {
							o.abort(), e.error && n.send("pause", {}), o = this.requests.run((() => (n.send("resume", {}), () => {})))
						})), this.onRetry(e.id, (() => {
							n.isOpen && (n.send("pause", {}), n.send("resume", {}))
						})), this.onRetryAll(e.id, (() => {
							n.isOpen && (n.send("pause", {}), n.send("resume", {}))
						})), n.on("progress", (t => p(this, t, e))), n.on("error", (t => {
							const {
								message: r
							} = t.error, s = Object.assign(new Error(r), {
								cause: t.error
							});
							this.opts.useFastRemoteRetry ? n.close() : (this.resetUploaderReferences(e.id), this.uppy.setFileState(e.id, {
								serverToken: null
							})), this.uppy.emit("upload-error", e, s), o.done(), i(s)
						})), n.on("success", (i => {
							const r = {
								uploadURL: i.url
							};
							this.uppy.emit("upload-success", e, r), this.resetUploaderReferences(e.id), o.done(), t()
						}));
						let o = this.requests.run((() => (n.open(), e.isPaused && n.send("pause", {}), () => {})))
					}))
				}
				onReceiveUploadUrl(e, t) {
					const i = this.uppy.getFile(e.id);
					i && (i.tus && i.tus.uploadUrl === t || (this.uppy.log("[Tus] Storing upload url"), this.uppy.setFileState(i.id, {
						tus: {
							...i.tus,
							uploadUrl: t
						}
					})))
				}
				onFileRemove(e, t) {
					this.uploaderEvents[e].on("file-removed", (i => {
						e === i.id && t(i.id)
					}))
				}
				onPause(e, t) {
					this.uploaderEvents[e].on("upload-pause", ((i, r) => {
						e === i && t(r)
					}))
				}
				onRetry(e, t) {
					this.uploaderEvents[e].on("upload-retry", (i => {
						e === i && t()
					}))
				}
				onRetryAll(e, t) {
					this.uploaderEvents[e].on("retry-all", (() => {
						this.uppy.getFile(e) && t()
					}))
				}
				onPauseAll(e, t) {
					this.uploaderEvents[e].on("pause-all", (() => {
						this.uppy.getFile(e) && t()
					}))
				}
				onCancelAll(e, t) {
					this.uploaderEvents[e].on("cancel-all", (() => {
						this.uppy.getFile(e) && t()
					}))
				}
				onResumeAll(e, t) {
					this.uploaderEvents[e].on("resume-all", (() => {
						this.uppy.getFile(e) && t()
					}))
				}
				uploadFiles(e) {
					const t = e.map(((t, i) => {
						const r = i + 1,
							s = e.length;
						return "error" in t && t.error ? Promise.reject(new Error(t.error)) : t.isRemote ? (t.progress.uploadStarted && t.isRestored || this.uppy.emit("upload-started", t), this.uploadRemote(t, r, s)) : (t.progress.uploadStarted && t.isRestored || this.uppy.emit("upload-started", t), this.upload(t, r, s))
					}));
					return h(t)
				}
				handleUpload(e) {
					if (0 === e.length) return this.uppy.log("[Tus] No files to upload"), Promise.resolve();
					0 === this.opts.limit && this.uppy.log("[Tus] When uploading multiple files at once, consider setting the `limit` option (to `10` for example), to limit the number of concurrent uploads, which helps prevent memory and network issues: https://uppy.io/docs/tus/#limit-0", "warning"), this.uppy.log("[Tus] Uploading...");
					const t = e.map((e => this.uppy.getFile(e)));
					return this.uploadFiles(t).then((() => null))
				}
				install() {
					this.uppy.setState({
						capabilities: {
							...this.uppy.getState().capabilities,
							resumableUploads: !0
						}
					}), this.uppy.addUploader(this.handleUpload), this.uppy.on("reset-progress", this.handleResetProgress)
				}
				uninstall() {
					this.uppy.setState({
						capabilities: {
							...this.uppy.getState().capabilities,
							resumableUploads: !1
						}
					}), this.uppy.removeUploader(this.handleUpload)
				}
			}, r.VERSION = "2.1.1", s)
		}, {
			"./getFingerprint": 179,
			"@uppy/companion-client": 83,
			"@uppy/core/lib/BasePlugin": 85,
			"@uppy/utils/lib/EventTracker": 186,
			"@uppy/utils/lib/NetworkError": 188,
			"@uppy/utils/lib/RateLimitedQueue": 190,
			"@uppy/utils/lib/emitSocketProgress": 195,
			"@uppy/utils/lib/getSocketHost": 209,
			"@uppy/utils/lib/hasProperty": 213,
			"@uppy/utils/lib/isNetworkError": 216,
			"@uppy/utils/lib/settle": 223,
			"tus-js-client": 59
		}],
		181: [function(e, t, i) {
			"use strict";
			var r, s;
			const {
				UIPlugin: n
			} = e("@uppy/core"), {
				h: o
			} = e("preact"), {
				SearchProvider: a,
				Provider: l
			} = e("@uppy/companion-client"), {
				SearchProviderViews: u
			} = e("@uppy/provider-views");
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					if (super(e, t), this.id = this.opts.id || "Unsplash", this.title = this.opts.title || "Unsplash", l.initPlugin(this, t, {}), this.icon = () => o("svg", {
							viewBox: "0 0 32 32",
							height: "32",
							width: "32",
							"aria-hidden": "true"
						}, o("path", {
							d: "M46.575 10.883v-9h12v9zm12 5h10v18h-32v-18h10v9h12z",
							fill: "#fff"
						}), o("rect", {
							className: "uppy-ProviderIconBg",
							width: "32",
							height: "32",
							rx: "16"
						}), o("path", {
							d: "M13 12.5V8h6v4.5zm6 2.5h5v9H8v-9h5v4.5h6z",
							fill: "#fff"
						})), !this.opts.companionUrl) throw new Error("Companion hostname is required, please consult https://uppy.io/docs/companion");
					this.hostname = this.opts.companionUrl, this.provider = new a(e, {
						companionUrl: this.opts.companionUrl,
						companionHeaders: this.opts.companionHeaders,
						companionCookiesRule: this.opts.companionCookiesRule,
						provider: "unsplash",
						pluginId: this.id
					})
				}
				install() {
					this.view = new u(this, {
						provider: this.provider,
						viewType: "unsplash"
					});
					const {
						target: e
					} = this.opts;
					e && this.mount(e, this)
				}
				onFirstRender() {}
				render(e) {
					return this.view.render(e)
				}
				uninstall() {
					this.unmount()
				}
			}, r.VERSION = "2.0.2", s)
		}, {
			"@uppy/companion-client": 83,
			"@uppy/core": 89,
			"@uppy/provider-views": 156,
			preact: 28
		}],
		182: [function(e, t, i) {
			"use strict";
			const {
				h: r,
				Component: s
			} = e("preact");
			t.exports = class extends s {
				constructor(e) {
					super(e), this.handleKeyPress = this.handleKeyPress.bind(this), this.handleClick = this.handleClick.bind(this)
				}
				componentDidMount() {
					this.input.value = ""
				}
				handleKeyPress(e) {
					13 === e.keyCode && this.props.addFile(this.input.value)
				}
				handleClick() {
					this.props.addFile(this.input.value)
				}
				render() {
					return r("div", {
						className: "uppy-Url"
					}, r("input", {
						className: "uppy-u-reset uppy-c-textInput uppy-Url-input",
						type: "text",
						"aria-label": this.props.i18n("enterUrlToImport"),
						placeholder: this.props.i18n("enterUrlToImport"),
						onKeyUp: this.handleKeyPress,
						ref: e => {
							this.input = e
						},
						"data-uppy-super-focusable": !0
					}), r("button", {
						className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Url-importButton",
						type: "button",
						onClick: this.handleClick
					}, this.props.i18n("import")))
				}
			}
		}, {
			preact: 28
		}],
		183: [function(e, t, i) {
			"use strict";
			var r, s;
			const {
				UIPlugin: n
			} = e("@uppy/core"), {
				h: o
			} = e("preact"), {
				RequestClient: a
			} = e("@uppy/companion-client"), l = e("./UrlUI.js"), u = e("@uppy/utils/lib/toArray"), p = e("./utils/forEachDroppedOrPastedUrl");

			function c() {
				return o("svg", {
					"aria-hidden": "true",
					focusable: "false",
					width: "32",
					height: "32",
					viewBox: "0 0 32 32"
				}, o("g", {
					fill: "none",
					fillRule: "evenodd"
				}, o("rect", {
					className: "uppy-ProviderIconBg",
					fill: "#FF753E",
					width: "32",
					height: "32",
					rx: "16"
				}), o("path", {
					d: "M22.788 15.389l-2.199 2.19a3.184 3.184 0 0 1-.513.437c-.806.584-1.686.876-2.638.876a4.378 4.378 0 0 1-3.519-1.752c-.22-.292-.146-.802.147-1.021.293-.22.806-.146 1.026.146.953 1.313 2.785 1.532 4.105.583a.571.571 0 0 0 .293-.292l2.199-2.189c1.1-1.167 1.1-2.992-.073-4.086a2.976 2.976 0 0 0-4.105 0l-1.246 1.24a.71.71 0 0 1-1.026 0 .703.703 0 0 1 0-1.022l1.246-1.24a4.305 4.305 0 0 1 6.083 0c1.833 1.605 1.906 4.451.22 6.13zm-7.183 5.035l-1.246 1.24a2.976 2.976 0 0 1-4.105 0c-1.172-1.094-1.172-2.991-.073-4.086l2.2-2.19.292-.291c.66-.438 1.393-.657 2.2-.584.805.146 1.465.51 1.905 1.168.22.292.733.365 1.026.146.293-.22.367-.73.147-1.022-.733-.949-1.76-1.532-2.859-1.678-1.1-.22-2.272.073-3.225.802l-.44.438-2.199 2.19c-1.686 1.75-1.612 4.524.074 6.202.88.803 1.979 1.241 3.078 1.241 1.1 0 2.199-.438 3.079-1.24l1.246-1.241a.703.703 0 0 0 0-1.022c-.294-.292-.807-.365-1.1-.073z",
					fill: "#FFF",
					fillRule: "nonzero"
				})))
			}
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					super(e, t), this.id = this.opts.id || "Url", this.title = this.opts.title || "Link", this.type = "acquirer", this.icon = () => o(c, null), this.defaultLocale = {
						strings: {
							import: "Import",
							enterUrlToImport: "Enter URL to import a file",
							failedToFetch: "Companion failed to fetch this URL, please make sure it’s correct",
							enterCorrectUrl: "Incorrect URL: Please make sure you are entering a direct link to a file"
						}
					};
					if (this.opts = {
							...t
						}, this.i18nInit(), this.hostname = this.opts.companionUrl, !this.hostname) throw new Error("Companion hostname is required, please consult https://uppy.io/docs/companion");
					this.getMeta = this.getMeta.bind(this), this.addFile = this.addFile.bind(this), this.handleRootDrop = this.handleRootDrop.bind(this), this.handleRootPaste = this.handleRootPaste.bind(this), this.client = new a(e, {
						companionUrl: this.opts.companionUrl,
						companionHeaders: this.opts.companionHeaders,
						companionCookiesRule: this.opts.companionCookiesRule
					})
				}
				getFileNameFromUrl(e) {
					return e.substring(e.lastIndexOf("/") + 1)
				}
				checkIfCorrectURL(e) {
					if (!e) return !1;
					const t = e.match(/^([a-z0-9]+):\/\//)[1];
					return "http" === t || "https" === t
				}
				addProtocolToURL(e) {
					return /^[a-z0-9]+:\/\//.test(e) ? e : "http://" + e
				}
				getMeta(e) {
					return this.client.post("url/meta", {
						url: e
					}).then((e => {
						if (e.error) throw this.uppy.log("[URL] Error:"), this.uppy.log(e.error), new Error("Failed to fetch the file");
						return e
					}))
				}
				addFile(e) {
					return e = this.addProtocolToURL(e), this.checkIfCorrectURL(e) ? this.getMeta(e).then((t => ({
						source: this.id,
						name: this.getFileNameFromUrl(e),
						type: t.type,
						data: {
							size: t.size
						},
						isRemote: !0,
						body: {
							url: e
						},
						remote: {
							companionUrl: this.opts.companionUrl,
							url: `${this.hostname}/url/get`,
							body: {
								fileId: e,
								url: e
							},
							providerOptions: this.client.opts
						}
					}))).then((e => {
						this.uppy.log("[Url] Adding remote file");
						try {
							return this.uppy.addFile(e)
						} catch (e) {
							return e.isRestriction || this.uppy.log(e), e
						}
					})).catch((e => (this.uppy.log(e), this.uppy.info({
						message: this.i18n("failedToFetch"),
						details: e
					}, "error", 4e3), e))) : (this.uppy.log(`[URL] Incorrect URL entered: ${e}`), void this.uppy.info(this.i18n("enterCorrectUrl"), "error", 4e3))
				}
				canHandleRootDrop(e) {
					return u(e.dataTransfer.items).filter((e => "string" === e.kind && "text/uri-list" === e.type)).length > 0
				}
				handleRootDrop(e) {
					p(e.dataTransfer, "drop", (e => {
						this.uppy.log(`[URL] Adding file from dropped url: ${e}`), this.addFile(e)
					}))
				}
				handleRootPaste(e) {
					p(e.clipboardData, "paste", (e => {
						this.uppy.log(`[URL] Adding file from pasted url: ${e}`), this.addFile(e)
					}))
				}
				render() {
					return o(l, {
						i18n: this.i18n,
						addFile: this.addFile
					})
				}
				install() {
					const {
						target: e
					} = this.opts;
					e && this.mount(e, this)
				}
				uninstall() {
					this.unmount()
				}
			}, r.VERSION = "2.0.4", s)
		}, {
			"./UrlUI.js": 182,
			"./utils/forEachDroppedOrPastedUrl": 184,
			"@uppy/companion-client": 83,
			"@uppy/core": 89,
			"@uppy/utils/lib/toArray": 224,
			preact: 28
		}],
		184: [function(e, t, i) {
			"use strict";
			const r = e("@uppy/utils/lib/toArray");
			t.exports = function(e, t, i) {
				const s = r(e.items);
				let n;
				switch (t) {
					case "paste":
						if (s.some((e => "file" === e.kind))) return;
						n = s.filter((e => "string" === e.kind && "text/plain" === e.type));
						break;
					case "drop":
						n = s.filter((e => "string" === e.kind && "text/uri-list" === e.type));
						break;
					default:
						throw new Error(`isDropOrPaste must be either 'drop' or 'paste', but it's ${t}`)
				}
				n.forEach((e => {
					e.getAsString((e => i(e)))
				}))
			}
		}, {
			"@uppy/utils/lib/toArray": 224
		}],
		185: [function(e, t, i) {
			"use strict";
			i.AbortController = globalThis.AbortController, i.AbortSignal = globalThis.AbortSignal, i.createAbortError = (e = "Aborted") => new DOMException(e, "AbortError")
		}, {}],
		186: [function(e, t, i) {
			"use strict";
			var r, s;

			function n(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var o = 0;

			function a(e) {
				return "__private_" + o++ + "_" + e
			}
			t.exports = (r = a("emitter"), s = a("events"), class {
				constructor(e) {
					Object.defineProperty(this, r, {
						writable: !0,
						value: void 0
					}), Object.defineProperty(this, s, {
						writable: !0,
						value: []
					}), n(this, r)[r] = e
				}
				on(e, t) {
					return n(this, s)[s].push([e, t]), n(this, r)[r].on(e, t)
				}
				remove() {
					for (const [e, t] of n(this, s)[s].splice(0)) n(this, r)[r].off(e, t)
				}
			})
		}, {}],
		187: [function(e, t, i) {
			"use strict";
			t.exports = ['a[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'area[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', "input:not([disabled]):not([inert]):not([aria-hidden])", "select:not([disabled]):not([inert]):not([aria-hidden])", "textarea:not([disabled]):not([inert]):not([aria-hidden])", "button:not([disabled]):not([inert]):not([aria-hidden])", 'iframe:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'object:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'embed:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[contenteditable]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[tabindex]:not([tabindex^="-"]):not([inert]):not([aria-hidden])']
		}, {}],
		188: [function(e, t, i) {
			"use strict";
			class r extends Error {
				constructor(e, t = null) {
					super("This looks like a network error, the endpoint might be blocked by an internet provider or a firewall."), this.cause = e, this.isNetworkError = !0, this.request = t
				}
			}
			t.exports = r
		}, {}],
		189: [function(e, t, i) {
			"use strict";

			function r(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var s = 0;

			function n(e) {
				return "__private_" + s++ + "_" + e
			}
			var o = n("aliveTimer"),
				a = n("isDone"),
				l = n("onTimedOut"),
				u = n("timeout");
			t.exports = class {
				constructor(e, t) {
					Object.defineProperty(this, o, {
						writable: !0,
						value: void 0
					}), Object.defineProperty(this, a, {
						writable: !0,
						value: !1
					}), Object.defineProperty(this, l, {
						writable: !0,
						value: void 0
					}), Object.defineProperty(this, u, {
						writable: !0,
						value: void 0
					}), r(this, u)[u] = e, r(this, l)[l] = t
				}
				progress() {
					r(this, a)[a] || r(this, u)[u] > 0 && (clearTimeout(r(this, o)[o]), r(this, o)[o] = setTimeout(r(this, l)[l], r(this, u)[u]))
				}
				done() {
					r(this, a)[a] || (clearTimeout(r(this, o)[o]), r(this, o)[o] = null, r(this, a)[a] = !0)
				}
			}
		}, {}],
		190: [function(e, t, i) {
			"use strict";

			function r(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var s = 0;

			function n(e) {
				return "__private_" + s++ + "_" + e
			}
			var o = n("activeRequests"),
				a = n("queuedHandlers"),
				l = n("call"),
				u = n("queueNext"),
				p = n("next"),
				c = n("queue"),
				h = n("dequeue");

			function d(e) {
				r(this, o)[o] += 1;
				let t, i = !1;
				try {
					t = e()
				} catch (e) {
					throw r(this, o)[o] -= 1, e
				}
				return {
					abort: () => {
						i || (i = !0, r(this, o)[o] -= 1, t(), r(this, u)[u]())
					},
					done: () => {
						i || (i = !0, r(this, o)[o] -= 1, r(this, u)[u]())
					}
				}
			}

			function f() {
				queueMicrotask((() => r(this, p)[p]()))
			}

			function m() {
				if (r(this, o)[o] >= this.limit) return;
				if (0 === r(this, a)[a].length) return;
				const e = r(this, a)[a].shift(),
					t = r(this, l)[l](e.fn);
				e.abort = t.abort, e.done = t.done
			}

			function g(e, t = {}) {
				const i = {
						fn: e,
						priority: t.priority || 0,
						abort: () => {
							r(this, h)[h](i)
						},
						done: () => {
							throw new Error("Cannot mark a queued request as done: this indicates a bug")
						}
					},
					s = r(this, a)[a].findIndex((e => i.priority > e.priority));
				return -1 === s ? r(this, a)[a].push(i) : r(this, a)[a].splice(s, 0, i), i
			}

			function y(e) {
				const t = r(this, a)[a].indexOf(e); - 1 !== t && r(this, a)[a].splice(t, 1)
			}
			t.exports = {
				RateLimitedQueue: class {
					constructor(e) {
						Object.defineProperty(this, h, {
							value: y
						}), Object.defineProperty(this, c, {
							value: g
						}), Object.defineProperty(this, p, {
							value: m
						}), Object.defineProperty(this, u, {
							value: f
						}), Object.defineProperty(this, l, {
							value: d
						}), Object.defineProperty(this, o, {
							writable: !0,
							value: 0
						}), Object.defineProperty(this, a, {
							writable: !0,
							value: []
						}), this.limit = "number" != typeof e || 0 === e ? 1 / 0 : e
					}
					run(e, t) {
						return r(this, o)[o] < this.limit ? r(this, l)[l](e) : r(this, c)[c](e, t)
					}
					wrapPromiseFunction(e, t) {
						return (...i) => {
							let r;
							const s = new Promise(((s, n) => {
								r = this.run((() => {
									let t, o;
									try {
										o = Promise.resolve(e(...i))
									} catch (e) {
										o = Promise.reject(e)
									}
									return o.then((e => {
										t ? n(t) : (r.done(), s(e))
									}), (e => {
										t ? n(t) : (r.done(), n(e))
									})), () => {
										t = new Error("Cancelled")
									}
								}), t)
							}));
							return s.abort = () => {
								r.abort()
							}, s
						}
					}
				},
				internalRateLimitedQueue: Symbol("__queue")
			}
		}, {}],
		191: [function(e, t, i) {
			"use strict";
			var r;

			function s(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var n = 0;

			function o(e) {
				return "__private_" + n++ + "_" + e
			}
			const a = e("./hasProperty");

			function l(e, t, i) {
				const r = [];
				return e.forEach((e => "string" != typeof e ? r.push(e) : t[Symbol.split](e).forEach(((e, t, s) => {
					"" !== e && r.push(e), t < s.length - 1 && r.push(i)
				})))), r
			}
			/**
			 * Takes a string with placeholder variables like `%{smart_count} file selected`
			 * and replaces it with values from options `{smart_count: 5}`
			 *
			 * @license https://github.com/airbnb/polyglot.js/blob/master/LICENSE
			 * taken from https://github.com/airbnb/polyglot.js/blob/master/lib/polyglot.js#L299
			 *
			 * @param {string} phrase that needs interpolation, with placeholders
			 * @param {object} options with values that will be used to replace placeholders
			 * @returns {any[]} interpolated
			 */
			function u(e, t) {
				const i = /\$/g;
				let r = [e];
				if (null == t) return r;
				for (const e of Object.keys(t))
					if ("_" !== e) {
						let s = t[e];
						"string" == typeof s && (s = i[Symbol.replace](s, "$$$$")), r = l(r, new RegExp(`%\\{${e}\\}`, "g"), s)
					} return r
			}

			function p(e) {
				if (null == e || !e.strings) return;
				const t = this.locale;
				this.locale = {
					...t,
					strings: {
						...t.strings,
						...e.strings
					}
				}, this.locale.pluralize = e.pluralize || t.pluralize
			}
			t.exports = (r = o("apply"), class {
				constructor(e) {
					Object.defineProperty(this, r, {
						value: p
					}), this.locale = {
						strings: {},
						pluralize: e => 1 === e ? 0 : 1
					}, Array.isArray(e) ? e.forEach(s(this, r)[r], this) : s(this, r)[r](e)
				}
				translate(e, t) {
					return this.translateArray(e, t).join("")
				}
				translateArray(e, t) {
					if (!a(this.locale.strings, e)) throw new Error(`missing string: ${e}`);
					const i = this.locale.strings[e];
					if ("object" == typeof i) {
						if (t && void 0 !== t.smart_count) {
							return u(i[this.locale.pluralize(t.smart_count)], t)
						}
						throw new Error("Attempted to use a string with plural forms, but no value was given for %{smart_count}")
					}
					return u(i, t)
				}
			})
		}, {
			"./hasProperty": 213
		}],
		192: [function(e, t, i) {
			"use strict";
			t.exports = function(e, t, i) {
				return new Promise((r => {
					e.toBlob(r, t, i)
				}))
			}
		}, {}],
		193: [function(e, t, i) {
			"use strict";
			const r = /^data:([^/]+\/[^,;]+(?:[^,]*?))(;base64)?,([\s\S]*)$/;
			t.exports = function(e, t, i) {
				var s, n;
				const o = r.exec(e),
					a = null != (s = null != (n = t.mimeType) ? n : null == o ? void 0 : o[1]) ? s : "plain/text";
				let l;
				if (null != o[2]) {
					const e = atob(decodeURIComponent(o[3])),
						t = new Uint8Array(e.length);
					for (let i = 0; i < e.length; i++) t[i] = e.charCodeAt(i);
					l = [t]
				} else l = [decodeURIComponent(o[3])];
				return i ? new File(l, t.name || "", {
					type: a
				}) : new Blob(l, {
					type: a
				})
			}
		}, {}],
		194: [function(e, t, i) {
			"use strict";
			const {
				createAbortError: r
			} = e("./AbortController");
			t.exports = function(e, t) {
				return new Promise(((i, s) => {
					var n, o;
					if (null != t && null != (n = t.signal) && n.aborted) return s(r());
					const a = setTimeout((() => {
						u(), i()
					}), e);

					function l() {
						clearTimeout(a), u(), s(r())
					}

					function u() {
						var e;
						null == t || null == (e = t.signal) || e.removeEventListener("abort", l)
					}
					null == t || null == (o = t.signal) || o.addEventListener("abort", l)
				}))
			}
		}, {
			"./AbortController": 185
		}],
		195: [function(e, t, i) {
			"use strict";
			const r = e("lodash.throttle");
			t.exports = r((function(e, t, i) {
				const {
					progress: r,
					bytesUploaded: s,
					bytesTotal: n
				} = t;
				r && (e.uppy.log(`Upload progress: ${r}`), e.uppy.emit("upload-progress", i, {
					uploader: e,
					bytesUploaded: s,
					bytesTotal: n
				}))
			}), 300, {
				leading: !0,
				trailing: !0
			})
		}, {
			"lodash.throttle": 18
		}],
		196: [function(e, t, i) {
			"use strict";
			const r = e("./NetworkError");
			t.exports = function(...e) {
				return fetch(...e).catch((e => {
					throw "AbortError" === e.name ? e : new r(e)
				}))
			}
		}, {
			"./NetworkError": 188
		}],
		197: [function(e, t, i) {
			"use strict";
			const r = e("./isDOMElement");
			t.exports = function(e) {
				if ("string" == typeof e) {
					const t = document.querySelectorAll(e);
					return 0 === t.length ? null : Array.from(t)
				}
				return "object" == typeof e && r(e) ? [e] : null
			}
		}, {
			"./isDOMElement": 214
		}],
		198: [function(e, t, i) {
			"use strict";
			const r = e("./isDOMElement");
			t.exports = function(e, t = document) {
				return "string" == typeof e ? t.querySelector(e) : r(e) ? e : null
			}
		}, {
			"./isDOMElement": 214
		}],
		199: [function(e, t, i) {
			"use strict";

			function r(e) {
				let t = "";
				return e.replace(/[^A-Z0-9]/gi, (e => (t += `-${function(e){return e.charCodeAt(0).toString(32)}(e)}`, "/"))) + t
			}
			t.exports = function(e) {
				let t = "uppy";
				return "string" == typeof e.name && (t += `-${r(e.name.toLowerCase())}`), void 0 !== e.type && (t += `-${e.type}`), e.meta && "string" == typeof e.meta.relativePath && (t += `-${r(e.meta.relativePath.toLowerCase())}`), void 0 !== e.data.size && (t += `-${e.data.size}`), void 0 !== e.data.lastModified && (t += `-${e.data.lastModified}`), t
			}
		}, {}],
		200: [function(e, t, i) {
			"use strict";
			t.exports = function(e) {
				return e.bytesTotal - e.bytesUploaded
			}
		}, {}],
		201: [function(e, t, i) {
			"use strict";
			const r = e("./utils/webkitGetAsEntryApi/index"),
				s = e("./utils/fallbackApi");
			t.exports = function(e, {
				logDropError: t = (() => {})
			} = {}) {
				var i;
				return null != (i = e.items) && i[0] && "webkitGetAsEntry" in e.items[0] ? r(e, t) : s(e)
			}
		}, {
			"./utils/fallbackApi": 202,
			"./utils/webkitGetAsEntryApi/index": 205
		}],
		202: [function(e, t, i) {
			"use strict";
			const r = e("../../toArray");
			t.exports = function(e) {
				const t = r(e.files);
				return Promise.resolve(t)
			}
		}, {
			"../../toArray": 224
		}],
		203: [function(e, t, i) {
			"use strict";
			t.exports = function e(t, i, r, {
				onSuccess: s
			}) {
				t.readEntries((n => {
					const o = [...i, ...n];
					n.length ? setTimeout((() => {
						e(t, o, r, {
							onSuccess: s
						})
					}), 0) : s(o)
				}), (e => {
					r(e), s(i)
				}))
			}
		}, {}],
		204: [function(e, t, i) {
			"use strict";
			t.exports = function(e) {
				return e.fullPath && e.fullPath !== `/${e.name}` ? e.fullPath : null
			}
		}, {}],
		205: [function(e, t, i) {
			"use strict";
			const r = e("../../../toArray"),
				s = e("./getRelativePath"),
				n = e("./getFilesAndDirectoriesFromDirectory");
			t.exports = function(e, t) {
				const i = [],
					o = [],
					a = e => new Promise((r => {
						if (e.isFile) e.file((t => {
							t.relativePath = s(e), i.push(t), r()
						}), (e => {
							t(e), r()
						}));
						else if (e.isDirectory) {
							const i = e.createReader();
							n(i, [], t, {
								onSuccess: e => r(Promise.all(e.map(a)))
							})
						}
					}));
				return r(e.items).forEach((e => {
					const t = e.webkitGetAsEntry();
					t && o.push(a(t))
				})), Promise.all(o).then((() => i))
			}
		}, {
			"../../../toArray": 224,
			"./getFilesAndDirectoriesFromDirectory": 203,
			"./getRelativePath": 204
		}],
		206: [function(e, t, i) {
			"use strict";
			t.exports = function(e) {
				const t = e.lastIndexOf(".");
				return -1 === t || t === e.length - 1 ? {
					name: e,
					extension: void 0
				} : {
					name: e.slice(0, t),
					extension: e.slice(t + 1)
				}
			}
		}, {}],
		207: [function(e, t, i) {
			"use strict";
			const r = e("./getFileNameAndExtension"),
				s = e("./mimeTypes");
			t.exports = function(e) {
				var t;
				if (e.type) return e.type;
				const i = e.name ? null == (t = r(e.name).extension) ? void 0 : t.toLowerCase() : null;
				return i && i in s ? s[i] : "application/octet-stream"
			}
		}, {
			"./getFileNameAndExtension": 206,
			"./mimeTypes": 219
		}],
		208: [function(e, t, i) {
			"use strict";
			const r = {
				"audio/mp3": "mp3",
				"audio/mp4": "mp4",
				"audio/ogg": "ogg",
				"audio/webm": "webm",
				"image/gif": "gif",
				"image/heic": "heic",
				"image/heif": "heif",
				"image/jpeg": "jpg",
				"image/png": "png",
				"image/svg+xml": "svg",
				"video/mp4": "mp4",
				"video/ogg": "ogv",
				"video/quicktime": "mov",
				"video/webm": "webm",
				"video/x-matroska": "mkv",
				"video/x-msvideo": "avi"
			};
			t.exports = function(e) {
				return [e] = e.split(";", 1), r[e] || null
			}
		}, {}],
		209: [function(e, t, i) {
			"use strict";
			t.exports = function(e) {
				const t = /^(?:https?:\/\/|\/\/)?(?:[^@\n]+@)?(?:www\.)?([^\n]+)/i.exec(e)[1];
				return `${/^http:\/\//i.test(e)?"ws":"wss"}://${t}`
			}
		}, {}],
		210: [function(e, t, i) {
			"use strict";
			t.exports = function(e) {
				if (!e.bytesUploaded) return 0;
				const t = Date.now() - e.uploadStarted;
				return e.bytesUploaded / (t / 1e3)
			}
		}, {}],
		211: [function(e, t, i) {
			"use strict";
			t.exports = function(e) {
				for (var t; e && !e.dir;) e = e.parentNode;
				return null == (t = e) ? void 0 : t.dir
			}
		}, {}],
		212: [function(e, t, i) {
			"use strict";

			function r(e) {
				return e < 10 ? `0${e}` : e.toString()
			}
			t.exports = function() {
				const e = new Date;
				return `${r(e.getHours())}:${r(e.getMinutes())}:${r(e.getSeconds())}`
			}
		}, {}],
		213: [function(e, t, i) {
			"use strict";
			t.exports = function(e, t) {
				return Object.prototype.hasOwnProperty.call(e, t)
			}
		}, {}],
		214: [function(e, t, i) {
			"use strict";
			t.exports = function(e) {
				return (null == e ? void 0 : e.nodeType) === Node.ELEMENT_NODE
			}
		}, {}],
		215: [function(e, t, i) {
			"use strict";
			t.exports = function() {
				const e = document.body;
				return "draggable" in e && "ondragstart" in e && "ondrop" in e && ("FormData" in window && "FileReader" in window)
			}
		}, {}],
		216: [function(e, t, i) {
			"use strict";
			t.exports = function(e) {
				return !!e && (0 !== e.readyState && 4 !== e.readyState || 0 === e.status)
			}
		}, {}],
		217: [function(e, t, i) {
			"use strict";
			t.exports = function(e) {
				return e.startsWith("blob:")
			}
		}, {}],
		218: [function(e, t, i) {
			"use strict";
			t.exports = function(e) {
				return !!e && /^[^/]+\/(jpe?g|gif|png|svg|svg\+xml|bmp|webp|avif)$/.test(e)
			}
		}, {}],
		219: [function(e, t, i) {
			"use strict";
			t.exports = {
				md: "text/markdown",
				markdown: "text/markdown",
				mp4: "video/mp4",
				mp3: "audio/mp3",
				svg: "image/svg+xml",
				jpg: "image/jpeg",
				png: "image/png",
				gif: "image/gif",
				heic: "image/heic",
				heif: "image/heif",
				yaml: "text/yaml",
				yml: "text/yaml",
				csv: "text/csv",
				tsv: "text/tab-separated-values",
				tab: "text/tab-separated-values",
				avi: "video/x-msvideo",
				mks: "video/x-matroska",
				mkv: "video/x-matroska",
				mov: "video/quicktime",
				doc: "application/msword",
				docm: "application/vnd.ms-word.document.macroenabled.12",
				docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				dot: "application/msword",
				dotm: "application/vnd.ms-word.template.macroenabled.12",
				dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
				xla: "application/vnd.ms-excel",
				xlam: "application/vnd.ms-excel.addin.macroenabled.12",
				xlc: "application/vnd.ms-excel",
				xlf: "application/x-xliff+xml",
				xlm: "application/vnd.ms-excel",
				xls: "application/vnd.ms-excel",
				xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
				xlsm: "application/vnd.ms-excel.sheet.macroenabled.12",
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				xlt: "application/vnd.ms-excel",
				xltm: "application/vnd.ms-excel.template.macroenabled.12",
				xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
				xlw: "application/vnd.ms-excel",
				txt: "text/plain",
				text: "text/plain",
				conf: "text/plain",
				log: "text/plain",
				pdf: "application/pdf",
				zip: "application/zip",
				"7z": "application/x-7z-compressed",
				rar: "application/x-rar-compressed",
				tar: "application/x-tar",
				gz: "application/gzip",
				dmg: "application/x-apple-diskimage"
			}
		}, {}],
		220: [function(e, t, i) {
			"use strict";
			const r = e("./secondsToTime");
			t.exports = function(e) {
				const t = r(e);
				return `${0===t.hours?"":`${t.hours}h`}${0===t.minutes?"":`${0===t.hours?t.minutes:` ${t.minutes.toString(10).padStart(2,"0")}`}m`}${0!==t.hours?"":`${0===t.minutes?t.seconds:` ${t.seconds.toString(10).padStart(2,"0")}`}s`}`
			}
		}, {
			"./secondsToTime": 222
		}],
		221: [function(e, t, i) {
			"use strict";
			const r = e("./getFileNameAndExtension");
			t.exports = function(e) {
				return {
					...e,
					type: e.mimeType,
					extension: e.name ? r(e.name).extension : null
				}
			}
		}, {
			"./getFileNameAndExtension": 206
		}],
		222: [function(e, t, i) {
			"use strict";
			t.exports = function(e) {
				return {
					hours: Math.floor(e / 3600) % 24,
					minutes: Math.floor(e / 60) % 60,
					seconds: Math.floor(e % 60)
				}
			}
		}, {}],
		223: [function(e, t, i) {
			"use strict";
			t.exports = function(e) {
				const t = [],
					i = [];

				function r(e) {
					t.push(e)
				}

				function s(e) {
					i.push(e)
				}
				return Promise.all(e.map((e => e.then(r, s)))).then((() => ({
					successful: t,
					failed: i
				})))
			}
		}, {}],
		224: [function(e, t, i) {
			"use strict";
			t.exports = Array.from
		}, {}],
		225: [function(e, t, i) {
			"use strict";
			const r = "...";
			t.exports = function(e, t) {
				if (0 === t) return "";
				if (e.length <= t) return e;
				if (t <= r.length + 1) return `${e.slice(0,t-1)}…`;
				const i = t - r.length,
					s = Math.ceil(i / 2),
					n = Math.floor(i / 2);
				return e.slice(0, s) + r + e.slice(-n)
			}
		}, {}],
		226: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");
			t.exports = () => r("svg", {
				"aria-hidden": "true",
				focusable: "false",
				fill: "#0097DC",
				width: "66",
				height: "55",
				viewBox: "0 0 66 55"
			}, r("path", {
				d: "M57.3 8.433c4.59 0 8.1 3.51 8.1 8.1v29.7c0 4.59-3.51 8.1-8.1 8.1H8.7c-4.59 0-8.1-3.51-8.1-8.1v-29.7c0-4.59 3.51-8.1 8.1-8.1h9.45l4.59-7.02c.54-.54 1.35-1.08 2.16-1.08h16.2c.81 0 1.62.54 2.16 1.08l4.59 7.02h9.45zM33 14.64c-8.62 0-15.393 6.773-15.393 15.393 0 8.62 6.773 15.393 15.393 15.393 8.62 0 15.393-6.773 15.393-15.393 0-8.62-6.773-15.393-15.393-15.393zM33 40c-5.648 0-9.966-4.319-9.966-9.967 0-5.647 4.318-9.966 9.966-9.966s9.966 4.319 9.966 9.966C42.966 35.681 38.648 40 33 40z",
				fillRule: "evenodd"
			}))
		}, {
			preact: 28
		}],
		227: [function(e, t, i) {
			"use strict";

			function r() {
				return r = Object.assign || function(e) {
					for (var t = 1; t < arguments.length; t++) {
						var i = arguments[t];
						for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r])
					}
					return e
				}, r.apply(this, arguments)
			}
			const {
				h: s,
				Component: n
			} = e("preact"), o = e("./SnapshotButton"), a = e("./RecordButton"), l = e("./RecordingLength"), u = e("./VideoSourceSelect"), p = e("./SubmitButton"), c = e("./DiscardButton");

			function h(e, t) {
				return -1 !== e.indexOf(t)
			}
			t.exports = class extends n {
				componentDidMount() {
					const {
						onFocus: e
					} = this.props;
					e()
				}
				componentWillUnmount() {
					const {
						onStop: e
					} = this.props;
					e()
				}
				render() {
					const {
						src: e,
						recordedVideo: t,
						recording: i,
						modes: n,
						supportsRecording: d,
						videoSources: f,
						showVideoSourceDropdown: m,
						showRecordingLength: g,
						onSubmit: y,
						i18n: v,
						mirror: b,
						onSnapshot: w,
						onStartRecording: S,
						onStopRecording: P,
						onDiscardRecordedVideo: k,
						recordingLengthSeconds: C
					} = this.props, E = !!t, x = !E && d && (h(n, "video-only") || h(n, "audio-only") || h(n, "video-audio")), _ = !E && h(n, "picture"), F = d && g, O = m && f && f.length > 1, A = {
						playsinline: !0
					};
					return t ? (A.muted = !1, A.controls = !0, A.src = t, this.videoElement && (this.videoElement.srcObject = void 0)) : (A.muted = !0, A.autoplay = !0, A.srcObject = e), s("div", {
						className: "uppy uppy-Webcam-container"
					}, s("div", {
						className: "uppy-Webcam-videoContainer"
					}, s("video", r({
						ref: e => this.videoElement = e,
						className: "uppy-Webcam-video  " + (b ? "uppy-Webcam-video--mirrored" : "")
					}, A))), s("div", {
						className: "uppy-Webcam-footer"
					}, s("div", {
						className: "uppy-Webcam-videoSourceContainer"
					}, O ? u(this.props) : null), s("div", {
						className: "uppy-Webcam-buttonContainer"
					}, _ && s(o, {
						onSnapshot: w,
						i18n: v
					}), x && s(a, {
						recording: i,
						onStartRecording: S,
						onStopRecording: P,
						i18n: v
					}), E && s(p, {
						onSubmit: y,
						i18n: v
					}), E && s(c, {
						onDiscard: k,
						i18n: v
					})), F && s("div", {
						className: "uppy-Webcam-recordingLength"
					}, s(l, {
						recordingLengthSeconds: C,
						i18n: v
					}))))
				}
			}
		}, {
			"./DiscardButton": 228,
			"./RecordButton": 230,
			"./RecordingLength": 231,
			"./SnapshotButton": 232,
			"./SubmitButton": 233,
			"./VideoSourceSelect": 234,
			preact: 28
		}],
		228: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");
			t.exports = function({
				onDiscard: e,
				i18n: t
			}) {
				return r("button", {
					className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--discard",
					type: "button",
					title: t("discardRecordedFile"),
					"aria-label": t("discardRecordedFile"),
					onClick: e,
					"data-uppy-super-focusable": !0
				}, r("svg", {
					width: "13",
					height: "13",
					viewBox: "0 0 13 13",
					xmlns: "http://www.w3.org/2000/svg",
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon"
				}, r("g", {
					fill: "#FFF",
					fillRule: "evenodd"
				}, r("path", {
					d: "M.496 11.367L11.103.76l1.414 1.414L1.911 12.781z"
				}), r("path", {
					d: "M11.104 12.782L.497 2.175 1.911.76l10.607 10.606z"
				}))))
			}
		}, {
			preact: 28
		}],
		229: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");
			t.exports = e => r("div", {
				className: "uppy-Webcam-permissons"
			}, r("div", {
				className: "uppy-Webcam-permissonsIcon"
			}, e.icon()), r("h1", {
				className: "uppy-Webcam-title"
			}, e.hasCamera ? e.i18n("allowAccessTitle") : e.i18n("noCameraTitle")), r("p", null, e.hasCamera ? e.i18n("allowAccessDescription") : e.i18n("noCameraDescription")))
		}, {
			preact: 28
		}],
		230: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");
			t.exports = function({
				recording: e,
				onStartRecording: t,
				onStopRecording: i,
				i18n: s
			}) {
				return e ? r("button", {
					className: "uppy-u-reset uppy-c-btn uppy-Webcam-button",
					type: "button",
					title: s("stopRecording"),
					"aria-label": s("stopRecording"),
					onClick: i,
					"data-uppy-super-focusable": !0
				}, r("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon",
					width: "100",
					height: "100",
					viewBox: "0 0 100 100"
				}, r("rect", {
					x: "15",
					y: "15",
					width: "70",
					height: "70"
				}))) : r("button", {
					className: "uppy-u-reset uppy-c-btn uppy-Webcam-button",
					type: "button",
					title: s("startRecording"),
					"aria-label": s("startRecording"),
					onClick: t,
					"data-uppy-super-focusable": !0
				}, r("svg", {
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon",
					width: "100",
					height: "100",
					viewBox: "0 0 100 100"
				}, r("circle", {
					cx: "50",
					cy: "50",
					r: "40"
				})))
			}
		}, {
			preact: 28
		}],
		231: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact"), s = e("./formatSeconds");
			t.exports = function({
				recordingLengthSeconds: e,
				i18n: t
			}) {
				const i = s(e);
				return r("span", {
					"aria-label": t("recordingLength", {
						recording_length: i
					})
				}, i)
			}
		}, {
			"./formatSeconds": 235,
			preact: 28
		}],
		232: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact"), s = e("./CameraIcon");
			t.exports = ({
				onSnapshot: e,
				i18n: t
			}) => r("button", {
				className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--picture",
				type: "button",
				title: t("takePicture"),
				"aria-label": t("takePicture"),
				onClick: e,
				"data-uppy-super-focusable": !0
			}, s())
		}, {
			"./CameraIcon": 226,
			preact: 28
		}],
		233: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");
			t.exports = function({
				onSubmit: e,
				i18n: t
			}) {
				return r("button", {
					className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--submit",
					type: "button",
					title: t("submitRecordedFile"),
					"aria-label": t("submitRecordedFile"),
					onClick: e,
					"data-uppy-super-focusable": !0
				}, r("svg", {
					width: "12",
					height: "9",
					viewBox: "0 0 12 9",
					xmlns: "http://www.w3.org/2000/svg",
					"aria-hidden": "true",
					focusable: "false",
					className: "uppy-c-icon"
				}, r("path", {
					fill: "#fff",
					fillRule: "nonzero",
					d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z"
				})))
			}
		}, {
			preact: 28
		}],
		234: [function(e, t, i) {
			"use strict";
			const {
				h: r
			} = e("preact");
			t.exports = ({
				currentDeviceId: e,
				videoSources: t,
				onChangeVideoSource: i
			}) => r("div", {
				className: "uppy-Webcam-videoSource"
			}, r("select", {
				className: "uppy-u-reset uppy-Webcam-videoSource-select",
				onChange: e => {
					i(e.target.value)
				}
			}, t.map((t => r("option", {
				key: t.deviceId,
				value: t.deviceId,
				selected: t.deviceId === e
			}, t.label)))))
		}, {
			preact: 28
		}],
		235: [function(e, t, i) {
			"use strict";
			t.exports = function(e) {
				return `${Math.floor(e/60)}:${String(e%60).padStart(2,0)}`
			}
		}, {}],
		236: [function(e, t, i) {
			"use strict";
			var r, s, n;

			function o() {
				return o = Object.assign || function(e) {
					for (var t = 1; t < arguments.length; t++) {
						var i = arguments[t];
						for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r])
					}
					return e
				}, o.apply(this, arguments)
			}

			function a(e, t) {
				if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
				return e
			}
			var l = 0;

			function u(e) {
				return "__private_" + l++ + "_" + e
			}
			const {
				h: p
			} = e("preact"), {
				UIPlugin: c
			} = e("@uppy/core"), h = e("@uppy/utils/lib/getFileTypeExtension"), d = e("@uppy/utils/lib/mimeTypes"), f = e("@uppy/utils/lib/canvasToBlob"), m = e("./supportsMediaRecorder"), g = e("./CameraIcon"), y = e("./CameraScreen"), v = e("./PermissionsScreen");

			function b(e) {
				return "." === e[0] ? d[e.slice(1)] : e
			}

			function w(e) {
				return /^video\/[^*]+$/.test(e)
			}

			function S(e) {
				return /^image\/[^*]+$/.test(e)
			}
			t.exports = (s = u("enableMirror"), n = r = class extends c {
				constructor(e, t) {
					super(e, t), Object.defineProperty(this, s, {
						writable: !0,
						value: void 0
					}), this.mediaDevices = navigator.mediaDevices, this.supportsUserMedia = !!this.mediaDevices, this.protocol = location.protocol.match(/https/i) ? "https" : "http", this.id = this.opts.id || "Webcam", this.type = "acquirer", this.capturedMediaFile = null, this.icon = () => p("svg", {
						"aria-hidden": "true",
						focusable: "false",
						width: "32",
						height: "32",
						viewBox: "0 0 32 32"
					}, p("g", {
						fill: "none",
						fillRule: "evenodd"
					}, p("rect", {
						className: "uppy-ProviderIconBg",
						fill: "#03BFEF",
						width: "32",
						height: "32",
						rx: "16"
					}), p("path", {
						d: "M22 11c1.133 0 2 .867 2 2v7.333c0 1.134-.867 2-2 2H10c-1.133 0-2-.866-2-2V13c0-1.133.867-2 2-2h2.333l1.134-1.733C13.6 9.133 13.8 9 14 9h4c.2 0 .4.133.533.267L19.667 11H22zm-6 1.533a3.764 3.764 0 0 0-3.8 3.8c0 2.129 1.672 3.801 3.8 3.801s3.8-1.672 3.8-3.8c0-2.13-1.672-3.801-3.8-3.801zm0 6.261c-1.395 0-2.46-1.066-2.46-2.46 0-1.395 1.065-2.461 2.46-2.461s2.46 1.066 2.46 2.46c0 1.395-1.065 2.461-2.46 2.461z",
						fill: "#FFF",
						fillRule: "nonzero"
					}))), this.defaultLocale = {
						strings: {
							pluginNameCamera: "Camera",
							smile: "Smile!",
							takePicture: "Take a picture",
							startRecording: "Begin video recording",
							stopRecording: "Stop video recording",
							allowAccessTitle: "Please allow access to your camera",
							allowAccessDescription: "In order to take pictures or record video with your camera, please allow camera access for this site.",
							noCameraTitle: "Camera Not Available",
							noCameraDescription: "In order to take pictures or record video, please connect a camera device",
							recordingStoppedMaxSize: "Recording stopped because the file size is about to exceed the limit",
							recordingLength: "Recording length %{recording_length}",
							submitRecordedFile: "Submit recorded file",
							discardRecordedFile: "Discard recorded file"
						}
					};
					const i = {
						onBeforeSnapshot: () => Promise.resolve(),
						countdown: !1,
						modes: ["video-audio", "video-only", "audio-only", "picture"],
						mirror: !0,
						showVideoSourceDropdown: !1,
						facingMode: "user",
						preferredImageMimeType: null,
						preferredVideoMimeType: null,
						showRecordingLength: !1
					};
					this.opts = {
						...i,
						...t
					}, this.i18nInit(), this.title = this.i18n("pluginNameCamera"), a(this, s)[s] = this.opts.mirror, this.install = this.install.bind(this), this.setPluginState = this.setPluginState.bind(this), this.render = this.render.bind(this), this.start = this.start.bind(this), this.stop = this.stop.bind(this), this.takeSnapshot = this.takeSnapshot.bind(this), this.startRecording = this.startRecording.bind(this), this.stopRecording = this.stopRecording.bind(this), this.discardRecordedVideo = this.discardRecordedVideo.bind(this), this.submit = this.submit.bind(this), this.oneTwoThreeSmile = this.oneTwoThreeSmile.bind(this), this.focus = this.focus.bind(this), this.changeVideoSource = this.changeVideoSource.bind(this), this.webcamActive = !1, this.opts.countdown && (this.opts.onBeforeSnapshot = this.oneTwoThreeSmile), this.setPluginState({
						hasCamera: !1,
						cameraReady: !1,
						cameraError: null,
						recordingLengthSeconds: 0,
						videoSources: [],
						currentDeviceId: null
					})
				}
				setOptions(e) {
					super.setOptions({
						...e,
						videoConstraints: {
							...this.opts.videoConstraints,
							...null == e ? void 0 : e.videoConstraints
						}
					})
				}
				hasCameraCheck() {
					return this.mediaDevices ? this.mediaDevices.enumerateDevices().then((e => e.some((e => "videoinput" === e.kind)))) : Promise.resolve(!1)
				}
				isAudioOnly() {
					return 1 === this.opts.modes.length && "audio-only" === this.opts.modes[0]
				}
				getConstraints(e = null) {
					const t = -1 !== this.opts.modes.indexOf("video-audio") || -1 !== this.opts.modes.indexOf("audio-only"),
						i = !this.isAudioOnly() && (-1 !== this.opts.modes.indexOf("video-audio") || -1 !== this.opts.modes.indexOf("video-only") || -1 !== this.opts.modes.indexOf("picture")),
						r = {
							...this.opts.videoConstraints || {
								facingMode: this.opts.facingMode
							},
							...e ? {
								deviceId: e,
								facingMode: null
							} : {}
						};
					return {
						audio: t,
						video: !!i && r
					}
				}
				start(e = null) {
					if (!this.supportsUserMedia) return Promise.reject(new Error("Webcam access not supported"));
					this.webcamActive = !0, this.opts.mirror && (a(this, s)[s] = !0);
					const t = this.getConstraints(e && e.deviceId ? e.deviceId : null);
					this.hasCameraCheck().then((i => (this.setPluginState({
						hasCamera: i
					}), this.mediaDevices.getUserMedia(t).then((t => {
						this.stream = t;
						let i = null;
						const r = this.isAudioOnly() ? t.getAudioTracks() : t.getVideoTracks();
						e && e.deviceId ? r.forEach((t => {
							t.getSettings().deviceId === e.deviceId && (i = t.getSettings().deviceId)
						})) : i = r[0].getSettings().deviceId, this.updateVideoSources(), this.setPluginState({
							currentDeviceId: i,
							cameraReady: !0
						})
					})).catch((e => {
						this.setPluginState({
							cameraReady: !1,
							cameraError: e
						}), this.uppy.info(e.message, "error")
					})))))
				}
				getMediaRecorderOptions() {
					const e = {};
					if (MediaRecorder.isTypeSupported) {
						const {
							restrictions: t
						} = this.uppy.opts;
						let i = [];
						this.opts.preferredVideoMimeType ? i = [this.opts.preferredVideoMimeType] : t.allowedFileTypes && (i = t.allowedFileTypes.map(b).filter(w));
						const r = e => MediaRecorder.isTypeSupported(e) && h(e),
							s = i.filter(r);
						s.length > 0 && (e.mimeType = s[0])
					}
					return e
				}
				startRecording() {
					this.recorder = new MediaRecorder(this.stream, this.getMediaRecorderOptions()), this.recordingChunks = [];
					let e = !1;
					this.recorder.addEventListener("dataavailable", (t => {
						this.recordingChunks.push(t.data);
						const {
							restrictions: i
						} = this.uppy.opts;
						if (this.recordingChunks.length > 1 && null != i.maxFileSize && !e) {
							const t = this.recordingChunks.reduce(((e, t) => e + t.size), 0),
								r = 3 * ((t - this.recordingChunks[0].size) / (this.recordingChunks.length - 1));
							t > Math.max(0, i.maxFileSize - r) && (e = !0, this.uppy.info(this.i18n("recordingStoppedMaxSize"), "warning", 4e3), this.stopRecording())
						}
					})), this.recorder.start(500), this.opts.showRecordingLength && (this.recordingLengthTimer = setInterval((() => {
						const e = this.getPluginState().recordingLengthSeconds;
						this.setPluginState({
							recordingLengthSeconds: e + 1
						})
					}), 1e3)), this.setPluginState({
						isRecording: !0
					})
				}
				stopRecording() {
					return new Promise((e => {
						this.recorder.addEventListener("stop", (() => {
							e()
						})), this.recorder.stop(), this.opts.showRecordingLength && (clearInterval(this.recordingLengthTimer), this.setPluginState({
							recordingLengthSeconds: 0
						}))
					})).then((() => (this.setPluginState({
						isRecording: !1
					}), this.getVideo()))).then((e => {
						try {
							this.capturedMediaFile = e, this.setPluginState({
								recordedVideo: URL.createObjectURL(e.data)
							}), a(this, s)[s] = !1
						} catch (e) {
							e.isRestriction || this.uppy.log(e)
						}
					})).then((() => {
						this.recordingChunks = null, this.recorder = null
					}), (e => {
						throw this.recordingChunks = null, this.recorder = null, e
					}))
				}
				discardRecordedVideo() {
					this.setPluginState({
						recordedVideo: null
					}), this.opts.mirror && (a(this, s)[s] = !0), this.capturedMediaFile = null
				}
				submit() {
					try {
						this.capturedMediaFile && this.uppy.addFile(this.capturedMediaFile)
					} catch (e) {
						e.isRestriction || this.uppy.log(e, "error")
					}
				}
				async stop() {
					if (this.stream) {
						const e = this.stream.getAudioTracks(),
							t = this.stream.getVideoTracks();
						e.concat(t).forEach((e => e.stop()))
					}
					this.recorder && await new Promise((e => {
						this.recorder.addEventListener("stop", e, {
							once: !0
						}), this.recorder.stop(), this.opts.showRecordingLength && clearInterval(this.recordingLengthTimer)
					})), this.recordingChunks = null, this.recorder = null, this.webcamActive = !1, this.stream = null, this.setPluginState({
						recordedVideo: null,
						isRecording: !1,
						recordingLengthSeconds: 0
					})
				}
				getVideoElement() {
					return this.el.querySelector(".uppy-Webcam-video")
				}
				oneTwoThreeSmile() {
					return new Promise(((e, t) => {
						let i = this.opts.countdown;
						const r = setInterval((() => {
							if (!this.webcamActive) return clearInterval(r), this.captureInProgress = !1, t(new Error("Webcam is not active"));
							i > 0 ? (this.uppy.info(`${i}...`, "warning", 800), i--) : (clearInterval(r), this.uppy.info(this.i18n("smile"), "success", 1500), setTimeout((() => e()), 1500))
						}), 1e3)
					}))
				}
				takeSnapshot() {
					this.captureInProgress || (this.captureInProgress = !0, this.opts.onBeforeSnapshot().catch((e => {
						const t = "object" == typeof e ? e.message : e;
						return this.uppy.info(t, "error", 5e3), Promise.reject(new Error(`onBeforeSnapshot: ${t}`))
					})).then((() => this.getImage())).then((e => {
						this.captureInProgress = !1;
						try {
							this.uppy.addFile(e)
						} catch (e) {
							e.isRestriction || this.uppy.log(e)
						}
					}), (e => {
						throw this.captureInProgress = !1, e
					})))
				}
				getImage() {
					const e = this.getVideoElement();
					if (!e) return Promise.reject(new Error("No video element found, likely due to the Webcam tab being closed."));
					const t = e.videoWidth,
						i = e.videoHeight,
						r = document.createElement("canvas");
					r.width = t, r.height = i;
					r.getContext("2d").drawImage(e, 0, 0);
					const {
						restrictions: s
					} = this.uppy.opts;
					let n = [];
					this.opts.preferredImageMimeType ? n = [this.opts.preferredImageMimeType] : s.allowedFileTypes && (n = s.allowedFileTypes.map(b).filter(S));
					const o = n[0] || "image/jpeg",
						a = h(o) || "jpg",
						l = `cam-${Date.now()}.${a}`;
					return f(r, o).then((e => ({
						source: this.id,
						name: l,
						data: new Blob([e], {
							type: o
						}),
						type: o
					})))
				}
				getVideo() {
					const e = this.recordingChunks.find((e => {
							var t;
							return (null == (t = e.type) ? void 0 : t.length) > 0
						})).type,
						t = h(e);
					if (!t) return Promise.reject(new Error(`Could not retrieve recording: Unsupported media type "${e}"`));
					const i = `webcam-${Date.now()}.${t}`,
						r = new Blob(this.recordingChunks, {
							type: e
						}),
						s = {
							source: this.id,
							name: i,
							data: new Blob([r], {
								type: e
							}),
							type: e
						};
					return Promise.resolve(s)
				}
				focus() {
					this.opts.countdown && setTimeout((() => {
						this.uppy.info(this.i18n("smile"), "success", 1500)
					}), 1e3)
				}
				changeVideoSource(e) {
					this.stop(), this.start({
						deviceId: e
					})
				}
				updateVideoSources() {
					this.mediaDevices.enumerateDevices().then((e => {
						this.setPluginState({
							videoSources: e.filter((e => "videoinput" === e.kind))
						})
					}))
				}
				render() {
					this.webcamActive || this.start();
					const e = this.getPluginState();
					return e.cameraReady && e.hasCamera ? p(y, o({}, e, {
						onChangeVideoSource: this.changeVideoSource,
						onSnapshot: this.takeSnapshot,
						onStartRecording: this.startRecording,
						onStopRecording: this.stopRecording,
						onDiscardRecordedVideo: this.discardRecordedVideo,
						onSubmit: this.submit,
						onFocus: this.focus,
						onStop: this.stop,
						i18n: this.i18n,
						modes: this.opts.modes,
						showRecordingLength: this.opts.showRecordingLength,
						showVideoSourceDropdown: this.opts.showVideoSourceDropdown,
						supportsRecording: m(),
						recording: e.isRecording,
						mirror: a(this, s)[s],
						src: this.stream
					})) : p(v, {
						icon: g,
						i18n: this.i18n,
						hasCamera: e.hasCamera
					})
				}
				install() {
					this.setPluginState({
						cameraReady: !1,
						recordingLengthSeconds: 0
					});
					const {
						target: e
					} = this.opts;
					e && this.mount(e, this), this.mediaDevices && (this.updateVideoSources(), this.mediaDevices.ondevicechange = () => {
						if (this.updateVideoSources(), this.stream) {
							let e = !0;
							const {
								videoSources: t,
								currentDeviceId: i
							} = this.getPluginState();
							t.forEach((t => {
								i === t.deviceId && (e = !1)
							})), e && (this.stop(), this.start())
						}
					})
				}
				uninstall() {
					this.stop(), this.unmount()
				}
				onUnmount() {
					this.stop()
				}
			}, r.VERSION = "2.0.4", n)
		}, {
			"./CameraIcon": 226,
			"./CameraScreen": 227,
			"./PermissionsScreen": 229,
			"./supportsMediaRecorder": 237,
			"@uppy/core": 89,
			"@uppy/utils/lib/canvasToBlob": 192,
			"@uppy/utils/lib/getFileTypeExtension": 208,
			"@uppy/utils/lib/mimeTypes": 219,
			preact: 28
		}],
		237: [function(e, t, i) {
			"use strict";
			t.exports = function() {
				return "function" == typeof MediaRecorder && !!MediaRecorder.prototype && "function" == typeof MediaRecorder.prototype.start
			}
		}, {}],
		238: [function(e, t, i) {
			"use strict";
			var r, s;
			const n = e("@uppy/core/lib/BasePlugin"),
				{
					nanoid: o
				} = e("nanoid"),
				{
					Provider: a,
					RequestClient: l,
					Socket: u
				} = e("@uppy/companion-client"),
				p = e("@uppy/utils/lib/emitSocketProgress"),
				c = e("@uppy/utils/lib/getSocketHost"),
				h = e("@uppy/utils/lib/settle"),
				d = e("@uppy/utils/lib/EventTracker"),
				f = e("@uppy/utils/lib/ProgressTimeout"),
				{
					RateLimitedQueue: m,
					internalRateLimitedQueue: g
				} = e("@uppy/utils/lib/RateLimitedQueue"),
				y = e("@uppy/utils/lib/NetworkError"),
				v = e("@uppy/utils/lib/isNetworkError");

			function b(e, t) {
				let i = t;
				return i || (i = new Error("Upload error")), "string" == typeof i && (i = new Error(i)), i instanceof Error || (i = Object.assign(new Error("Upload error"), {
					data: i
				})), v(e) ? (i = new y(i, e), i) : (i.request = e, i)
			}

			function w(e) {
				return e.data.slice(0, e.data.size, e.meta.type)
			}
			t.exports = (s = r = class extends n {
				constructor(e, t) {
					super(e, t), this.type = "uploader", this.id = this.opts.id || "XHRUpload", this.title = "XHRUpload", this.defaultLocale = {
						strings: {
							timedOut: "Upload stalled for %{seconds} seconds, aborting."
						}
					};
					const i = {
						formData: !0,
						fieldName: t.bundle ? "files[]" : "file",
						method: "post",
						metaFields: null,
						responseUrlFieldName: "url",
						bundle: !1,
						headers: {},
						timeout: 3e4,
						limit: 5,
						withCredentials: !1,
						responseType: "",
						getResponseData(t) {
							let i = {};
							try {
								i = JSON.parse(t)
							} catch (t) {
								e.log(t)
							}
							return i
						},
						getResponseError(e, t) {
							let i = new Error("Upload error");
							return v(t) && (i = new y(i, t)), i
						},
						validateStatus: e => e >= 200 && e < 300
					};
					if (this.opts = {
							...i,
							...t
						}, this.i18nInit(), this.handleUpload = this.handleUpload.bind(this), g in this.opts ? this.requests = this.opts[g] : this.requests = new m(this.opts.limit), this.opts.bundle && !this.opts.formData) throw new Error("`opts.formData` must be true when `opts.bundle` is enabled.");
					this.uploaderEvents = Object.create(null)
				}
				getOptions(e) {
					const t = this.uppy.getState().xhrUpload,
						{
							headers: i
						} = this.opts,
						r = {
							...this.opts,
							...t || {},
							...e.xhrUpload || {},
							headers: {}
						};
					return "function" == typeof i ? r.headers = i(e) : Object.assign(r.headers, this.opts.headers), t && Object.assign(r.headers, t.headers), e.xhrUpload && Object.assign(r.headers, e.xhrUpload.headers), r
				}
				addMetadata(e, t, i) {
					(Array.isArray(i.metaFields) ? i.metaFields : Object.keys(t)).forEach((i => {
						e.append(i, t[i])
					}))
				}
				createFormDataUpload(e, t) {
					const i = new FormData;
					this.addMetadata(i, e.meta, t);
					const r = w(e);
					return e.name ? i.append(t.fieldName, r, e.meta.name) : i.append(t.fieldName, r), i
				}
				createBundledUpload(e, t) {
					const i = new FormData,
						{
							meta: r
						} = this.uppy.getState();
					return this.addMetadata(i, r, t), e.forEach((e => {
						const t = this.getOptions(e),
							r = w(e);
						e.name ? i.append(t.fieldName, r, e.name) : i.append(t.fieldName, r)
					})), i
				}
				upload(e, t, i) {
					const r = this.getOptions(e);
					return this.uppy.log(`uploading ${t} of ${i}`), new Promise(((t, i) => {
						this.uppy.emit("upload-started", e);
						const s = r.formData ? this.createFormDataUpload(e, r) : e.data,
							n = new XMLHttpRequest;
						this.uploaderEvents[e.id] = new d(this.uppy);
						const a = new f(r.timeout, (() => {
								n.abort(), u.done();
								const t = new Error(this.i18n("timedOut", {
									seconds: Math.ceil(r.timeout / 1e3)
								}));
								this.uppy.emit("upload-error", e, t), i(t)
							})),
							l = o();
						n.upload.addEventListener("loadstart", (() => {
							this.uppy.log(`[XHRUpload] ${l} started`)
						})), n.upload.addEventListener("progress", (t => {
							this.uppy.log(`[XHRUpload] ${l} progress: ${t.loaded} / ${t.total}`), a.progress(), t.lengthComputable && this.uppy.emit("upload-progress", e, {
								uploader: this,
								bytesUploaded: t.loaded,
								bytesTotal: t.total
							})
						})), n.addEventListener("load", (s => {
							if (this.uppy.log(`[XHRUpload] ${l} finished`), a.done(), u.done(), this.uploaderEvents[e.id] && (this.uploaderEvents[e.id].remove(), this.uploaderEvents[e.id] = null), r.validateStatus(s.target.status, n.responseText, n)) {
								const i = r.getResponseData(n.responseText, n),
									o = i[r.responseUrlFieldName],
									a = {
										status: s.target.status,
										body: i,
										uploadURL: o
									};
								return this.uppy.emit("upload-success", e, a), o && this.uppy.log(`Download ${e.name} from ${o}`), t(e)
							}
							const o = r.getResponseData(n.responseText, n),
								p = b(n, r.getResponseError(n.responseText, n)),
								c = {
									status: s.target.status,
									body: o
								};
							return this.uppy.emit("upload-error", e, p, c), i(p)
						})), n.addEventListener("error", (() => {
							this.uppy.log(`[XHRUpload] ${l} errored`), a.done(), u.done(), this.uploaderEvents[e.id] && (this.uploaderEvents[e.id].remove(), this.uploaderEvents[e.id] = null);
							const t = b(n, r.getResponseError(n.responseText, n));
							return this.uppy.emit("upload-error", e, t), i(t)
						})), n.open(r.method.toUpperCase(), r.endpoint, !0), n.withCredentials = r.withCredentials, "" !== r.responseType && (n.responseType = r.responseType);
						const u = this.requests.run((() => {
							this.uppy.emit("upload-started", e);
							const t = this.getOptions(e);
							return Object.keys(t.headers).forEach((e => {
								n.setRequestHeader(e, t.headers[e])
							})), n.send(s), () => {
								a.done(), n.abort()
							}
						}));
						this.onFileRemove(e.id, (() => {
							u.abort(), i(new Error("File removed"))
						})), this.onCancelAll(e.id, (() => {
							u.abort(), i(new Error("Upload cancelled"))
						}))
					}))
				}
				uploadRemote(e) {
					const t = this.getOptions(e);
					return new Promise(((i, r) => {
						this.uppy.emit("upload-started", e);
						const s = {};
						(Array.isArray(t.metaFields) ? t.metaFields : Object.keys(e.meta)).forEach((t => {
							s[t] = e.meta[t]
						}));
						new(e.remote.providerOptions.provider ? a : l)(this.uppy, e.remote.providerOptions).post(e.remote.url, {
							...e.remote.body,
							endpoint: t.endpoint,
							size: e.data.size,
							fieldname: t.fieldName,
							metadata: s,
							httpMethod: t.method,
							useFormData: t.formData,
							headers: t.headers
						}).then((s => {
							const {
								token: n
							} = s, o = c(e.remote.companionUrl), a = new u({
								target: `${o}/api/${n}`,
								autoOpen: !1
							});
							this.uploaderEvents[e.id] = new d(this.uppy), this.onFileRemove(e.id, (() => {
								a.send("cancel", {}), l.abort(), i(`upload ${e.id} was removed`)
							})), this.onCancelAll(e.id, (() => {
								a.send("cancel", {}), l.abort(), i(`upload ${e.id} was canceled`)
							})), this.onRetry(e.id, (() => {
								a.send("pause", {}), a.send("resume", {})
							})), this.onRetryAll(e.id, (() => {
								a.send("pause", {}), a.send("resume", {})
							})), a.on("progress", (t => p(this, t, e))), a.on("success", (r => {
								const s = t.getResponseData(r.response.responseText, r.response),
									n = s[t.responseUrlFieldName],
									o = {
										status: r.response.status,
										body: s,
										uploadURL: n
									};
								return this.uppy.emit("upload-success", e, o), l.done(), this.uploaderEvents[e.id] && (this.uploaderEvents[e.id].remove(), this.uploaderEvents[e.id] = null), i()
							})), a.on("error", (i => {
								const s = i.response,
									n = s ? t.getResponseError(s.responseText, s) : Object.assign(new Error(i.error.message), {
										cause: i.error
									});
								this.uppy.emit("upload-error", e, n), l.done(), this.uploaderEvents[e.id] && (this.uploaderEvents[e.id].remove(), this.uploaderEvents[e.id] = null), r(n)
							}));
							const l = this.requests.run((() => (a.open(), e.isPaused && a.send("pause", {}), () => a.close())))
						})).catch((t => {
							this.uppy.emit("upload-error", e, t), r(t)
						}))
					}))
				}
				uploadBundle(e) {
					return new Promise(((t, i) => {
						const {
							endpoint: r
						} = this.opts, {
							method: s
						} = this.opts, n = this.uppy.getState().xhrUpload, o = this.createBundledUpload(e, {
							...this.opts,
							...n || {}
						}), a = new XMLHttpRequest, l = new f(this.opts.timeout, (() => {
							a.abort();
							const e = new Error(this.i18n("timedOut", {
								seconds: Math.ceil(this.opts.timeout / 1e3)
							}));
							u(e), i(e)
						})), u = t => {
							e.forEach((e => {
								this.uppy.emit("upload-error", e, t)
							}))
						};
						a.upload.addEventListener("loadstart", (() => {
							this.uppy.log("[XHRUpload] started uploading bundle"), l.progress()
						})), a.upload.addEventListener("progress", (t => {
							l.progress(), t.lengthComputable && e.forEach((e => {
								this.uppy.emit("upload-progress", e, {
									uploader: this,
									bytesUploaded: t.loaded / t.total * e.size,
									bytesTotal: e.size
								})
							}))
						})), a.addEventListener("load", (r => {
							if (l.done(), this.opts.validateStatus(r.target.status, a.responseText, a)) {
								const i = this.opts.getResponseData(a.responseText, a),
									s = {
										status: r.target.status,
										body: i
									};
								return e.forEach((e => {
									this.uppy.emit("upload-success", e, s)
								})), t()
							}
							const s = this.opts.getResponseError(a.responseText, a) || new Error("Upload error");
							return s.request = a, u(s), i(s)
						})), a.addEventListener("error", (() => {
							l.done();
							const e = this.opts.getResponseError(a.responseText, a) || new Error("Upload error");
							return u(e), i(e)
						})), this.uppy.on("cancel-all", (() => {
							l.done(), a.abort()
						})), a.open(s.toUpperCase(), r, !0), a.withCredentials = this.opts.withCredentials, "" !== this.opts.responseType && (a.responseType = this.opts.responseType), Object.keys(this.opts.headers).forEach((e => {
							a.setRequestHeader(e, this.opts.headers[e])
						})), a.send(o), e.forEach((e => {
							this.uppy.emit("upload-started", e)
						}))
					}))
				}
				uploadFiles(e) {
					const t = e.map(((t, i) => {
						const r = parseInt(i, 10) + 1,
							s = e.length;
						return t.error ? Promise.reject(new Error(t.error)) : t.isRemote ? this.uploadRemote(t, r, s) : this.upload(t, r, s)
					}));
					return h(t)
				}
				onFileRemove(e, t) {
					this.uploaderEvents[e].on("file-removed", (i => {
						e === i.id && t(i.id)
					}))
				}
				onRetry(e, t) {
					this.uploaderEvents[e].on("upload-retry", (i => {
						e === i && t()
					}))
				}
				onRetryAll(e, t) {
					this.uploaderEvents[e].on("retry-all", (() => {
						this.uppy.getFile(e) && t()
					}))
				}
				onCancelAll(e, t) {
					this.uploaderEvents[e].on("cancel-all", (() => {
						this.uppy.getFile(e) && t()
					}))
				}
				handleUpload(e) {
					if (0 === e.length) return this.uppy.log("[XHRUpload] No files to upload!"), Promise.resolve();
					0 !== this.opts.limit || this.opts[g] || this.uppy.log("[XHRUpload] When uploading multiple files at once, consider setting the `limit` option (to `10` for example), to limit the number of concurrent uploads, which helps prevent memory and network issues: https://uppy.io/docs/xhr-upload/#limit-0", "warning"), this.uppy.log("[XHRUpload] Uploading...");
					const t = e.map((e => this.uppy.getFile(e)));
					if (this.opts.bundle) {
						if (t.some((e => e.isRemote))) throw new Error("Can’t upload remote files when the `bundle: true` option is set");
						if ("function" == typeof this.opts.headers) throw new TypeError("`headers` may not be a function when the `bundle: true` option is set");
						return this.uploadBundle(t)
					}
					return this.uploadFiles(t).then((() => null))
				}
				install() {
					if (this.opts.bundle) {
						const {
							capabilities: e
						} = this.uppy.getState();
						this.uppy.setState({
							capabilities: {
								...e,
								individualCancellation: !1
							}
						})
					}
					this.uppy.addUploader(this.handleUpload)
				}
				uninstall() {
					if (this.opts.bundle) {
						const {
							capabilities: e
						} = this.uppy.getState();
						this.uppy.setState({
							capabilities: {
								...e,
								individualCancellation: !0
							}
						})
					}
					this.uppy.removeUploader(this.handleUpload)
				}
			}, r.VERSION = "2.0.5", s)
		}, {
			"@uppy/companion-client": 83,
			"@uppy/core/lib/BasePlugin": 85,
			"@uppy/utils/lib/EventTracker": 186,
			"@uppy/utils/lib/NetworkError": 188,
			"@uppy/utils/lib/ProgressTimeout": 189,
			"@uppy/utils/lib/RateLimitedQueue": 190,
			"@uppy/utils/lib/emitSocketProgress": 195,
			"@uppy/utils/lib/getSocketHost": 209,
			"@uppy/utils/lib/isNetworkError": 216,
			"@uppy/utils/lib/settle": 223,
			nanoid: 24
		}],
		239: [function(e, t, i) {
			"use strict";
			i.Core = e("@uppy/core"), i.debugLogger = i.Core.debugLogger, i.server = e("@uppy/companion-client"), i.views = {
				ProviderView: e("@uppy/provider-views")
			}, i.DefaultStore = e("@uppy/store-default"), i.ReduxStore = e("@uppy/store-redux"), i.Dashboard = e("@uppy/dashboard"), i.DragDrop = e("@uppy/drag-drop"), i.DropTarget = e("@uppy/drop-target"), i.FileInput = e("@uppy/file-input"), i.Informer = e("@uppy/informer"), i.ProgressBar = e("@uppy/progress-bar"), i.StatusBar = e("@uppy/status-bar"), i.ImageEditor = e("@uppy/image-editor"), i.Dropbox = e("@uppy/dropbox"), i.GoogleDrive = e("@uppy/google-drive"), i.Instagram = e("@uppy/instagram"), i.OneDrive = e("@uppy/onedrive"), i.Box = e("@uppy/box"), i.Facebook = e("@uppy/facebook"), i.Unsplash = e("@uppy/unsplash"), i.Url = e("@uppy/url"), i.Webcam = e("@uppy/webcam"), i.ScreenCapture = e("@uppy/screen-capture"), i.AwsS3 = e("@uppy/aws-s3"), i.AwsS3Multipart = e("@uppy/aws-s3-multipart"), i.Transloadit = e("@uppy/transloadit"), i.Tus = e("@uppy/tus"), i.XHRUpload = e("@uppy/xhr-upload"), i.Form = e("@uppy/form"), i.GoldenRetriever = e("@uppy/golden-retriever"), i.ReduxDevTools = e("@uppy/redux-dev-tools"), i.ThumbnailGenerator = e("@uppy/thumbnail-generator"), i.locales = {}
		}, {
			"@uppy/aws-s3": 75,
			"@uppy/aws-s3-multipart": 73,
			"@uppy/box": 77,
			"@uppy/companion-client": 83,
			"@uppy/core": 89,
			"@uppy/dashboard": 108,
			"@uppy/drag-drop": 115,
			"@uppy/drop-target": 116,
			"@uppy/dropbox": 117,
			"@uppy/facebook": 118,
			"@uppy/file-input": 119,
			"@uppy/form": 120,
			"@uppy/golden-retriever": 124,
			"@uppy/google-drive": 126,
			"@uppy/image-editor": 128,
			"@uppy/informer": 131,
			"@uppy/instagram": 132,
			"@uppy/onedrive": 133,
			"@uppy/progress-bar": 134,
			"@uppy/provider-views": 156,
			"@uppy/redux-dev-tools": 157,
			"@uppy/screen-capture": 164,
			"@uppy/status-bar": 169,
			"@uppy/store-default": 170,
			"@uppy/store-redux": 171,
			"@uppy/thumbnail-generator": 172,
			"@uppy/transloadit": 177,
			"@uppy/tus": 180,
			"@uppy/unsplash": 181,
			"@uppy/url": 183,
			"@uppy/webcam": 236,
			"@uppy/xhr-upload": 238
		}]
	}, {}, [239])(239)
}));
//# sourceMappingURL=./packages/uppy/dist/uppy.min.js.map