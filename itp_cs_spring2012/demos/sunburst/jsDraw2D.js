/*******************************************************************************
 * 
 * Project Name: jsDraw2D (Graphics Library for JavaScript) Version: Beta 1.1.0
 * (17-August-2009) (Uncompressed) Project Homepage:
 * http://jsdraw2d.jsfiction.com Author: Sameer Burle Copyright 2009:
 * jsFiction.com (http://www.jsfiction.com) Licensed Under: LGPL
 * 
 * This program (library) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 * 
 ******************************************************************************/
function jsColor() {
	var c = "#000000";
	switch (arguments.length) {
	case 1:
		k(arguments[0]);
		break;
	case 3:
		var d = arguments[0];
		var f = arguments[1];
		var m = arguments[2];
		c = j(d, f, m);
		if (c == false) {
			c = "#000000"
		}
		break
	}
	this.setHex = k;
	function k(p) {
		if (p.charAt(0) == "#") {
			c = p
		} else {
			if (isNaN(p)) {
				a(p.toLowerCase())
			} else {
				c = "#" + p
			}
		}
		var o = e(c);
		if (!o) {
			c = "#000000"
		}
	}
	this.getHex = n;
	function n() {
		return c
	}
	this.setRGB = h;
	function h(o, q, p) {
		c = j(o, q, p);
		if (c == false) {
			c = "#000000"
		}
	}
	this.getRGB = l;
	function l() {
		return e(c)
	}
	this.getDarkerShade = b;
	function b(s) {
		var p, r, q;
		var o = l();
		if (!isNaN(s)) {
			p = parseInt(o[0] - s);
			r = parseInt(o[1] - s);
			q = parseInt(o[2] - s)
		}
		if (p < 0) {
			p = 0
		}
		if (r < 0) {
			r = 0
		}
		if (q < 0) {
			q = 0
		}
		return new jsColor(p, r, q)
	}
	this.getLighterShade = g;
	function g(s) {
		var p, r, q;
		var o = l();
		if (!isNaN(s)) {
			p = parseInt(o[0] + s);
			r = parseInt(o[1] + s);
			q = parseInt(o[2] + s)
		}
		if (p > 255) {
			p = 255
		}
		if (r > 255) {
			r = 255
		}
		if (q > 255) {
			q = 255
		}
		return new jsColor(p, r, q)
	}
	this.rgbToHex = j;
	function j(o, q, p) {
		if (o < 0 || o > 255 || q < 0 || q > 255 || p < 0 || p > 255) {
			return false
		}
		var r = Math.round(p) + 256 * Math.round(q) + 65536 * Math.round(o);
		return "#" + i(r.toString(16), 6)
	}
	this.hexToRgb = e;
	function e(r) {
		var o, q, p;
		if (r.charAt(0) == "#") {
			r = r.substring(1, 7)
		}
		o = parseInt(r.substring(0, 2), 16);
		q = parseInt(r.substring(2, 4), 16);
		p = parseInt(r.substring(4, 6), 16);
		if (o < 0 || o > 255 || q < 0 || q > 255 || p < 0 || p > 255) {
			return false
		}
		return new Array(o, q, p)
	}
	function a(o) {
		switch (o) {
		case "aqua":
			c = "#00FFFF";
			break;
		case "black":
			c = "#000000";
			break;
		case "blue":
			c = "#0000FF";
			break;
		case "fuchsia":
			c = "#FF00FF";
			break;
		case "green":
			c = "#008000";
			break;
		case "gray":
			c = "#808080";
			break;
		case "lime":
			c = "#00FF00";
			break;
		case "maroon":
			c = "#800000";
			break;
		case "navy":
			c = "#000080";
			break;
		case "olive":
			c = "#808000";
			break;
		case "purple":
			c = "#800080";
			break;
		case "red":
			c = "#FF0000";
			break;
		case "silver":
			c = "#C0C0C0";
			break;
		case "teal":
			c = "#008080";
			break;
		case "white":
			c = "#FFFFFF";
			break;
		case "yellow":
			c = "#FFFF00";
			break
		}
	}
	function i(q, o) {
		var p = q + "";
		while (p.length < o) {
			p = "0" + p
		}
		return p
	}
}
function jsFont(d, e, b, c, a) {
	this.family = null;
	this.weight = null;
	this.size = null;
	this.style = null;
	this.variant = null;
	if (d && d != "") {
		this.family = d
	}
	if (e && e != "") {
		this.weight = e
	}
	if (b && b != "") {
		this.size = b
	}
	if (c && c != "") {
		this.style = c
	}
	if (a && a != "") {
		this.variant = a
	}
}
function jsPen(a, b) {
	this.color = new jsColor();
	this.width = "1px";
	if (arguments.length > 0) {
		this.color = a
	}
	if (arguments.length >= 2) {
		this.width = b
	}
	if (!isNaN(b)) {
		this.width = b + "px"
	}
}
function jsPoint(a, b) {
	this.x = 0;
	this.y = 0;
	if (arguments.length == 2) {
		this.x = a;
		this.y = b
	}
}
function jsGraphics(k) {
	var L = new jsPoint(0, 0);
	var F = 1;
	var A = "default";
	var m;
	if (k) {
		m = k
	} else {
		m = document.body
	}
	var e = null;
	this.drawLine = G;
	this.drawRectangle = R;
	this.fillRectangle = S;
	this.drawCircle = g;
	this.drawEllipse = N;
	this.fillCircle = v;
	this.fillEllipse = I;
	this.fillArc = u;
	this.drawArc = D;
	this.drawPolyline = O;
	this.drawPolygon = n;
	this.fillPolygon = h;
	this.drawBezier = r;
	this.drawPolyBezier = Q;
	this.drawCurve = i;
	this.drawClosedCurve = j;
	this.fillClosedCurve = E;
	this.drawText = a;
	this.drawImage = f;
	this.clear = H;
	this.showGrid = C;
	this.hideGrid = b;
	this.setOrigin = z;
	this.getOrigin = s;
	this.setScale = w;
	this.getScale = B;
	this.setCoordinateSystem = K;
	this.getCoordinateSystem = P;
	this.logicalToPhysicalPoint = M;
	e = document.createElement("div");
	e.style.left = "0px";
	e.style.top = "0px";
	if (m.clientWidth > 0 && m.clientHeight > 0) {
		e.style.width = (parseInt(m.clientWidth) - 1) + "px";
		e.style.height = (parseInt(m.clientHeight) - 1) + "px"
	} else {
		e.style.width = "0px";
		e.style.height = "0px"
	}
	e.style.zIndex = 0;
	e.style.position = "absolute";
	e.style.display = "none";
	m.appendChild(e);
	function z(T) {
		L = T
	}
	function s() {
		return L
	}
	function w(T) {
		F = T
	}
	function B() {
		return F
	}
	function K(T) {
		T = T.toLowerCase();
		if (T.toLowerCase() != "default" && T.toLowerCase() != "cartecian") {
			A = "default"
		} else {
			A = T
		}
	}
	function P() {
		return A = name
	}
	function M(T) {
		if (A == "cartecian") {
			return new jsPoint(T.x * F + L.x, L.y - T.y * F)
		} else {
			return new jsPoint(T.x * F + L.x, T.y * F + L.y)
		}
	}
	function C(ad, an, ah) {
		if (an == null) {
			an = true
		}
		var am, ak, V, T;
		var W = false;
		var aj = false;
		e.innerHTML = "";
		if (!ah) {
			ah = new jsColor(200, 200, 200)
		}
		if (!ad) {
			ad = Math.round(parseInt(e.style.width) / 10)
		} else {
			ad = ad * F
		}
		var U = ah.getHex();
		if (parseInt(e.style.width) <= 0 || parseInt(e.style.height) <= 0) {
			return
		} else {
			e.style.display = ""
		}
		am = parseInt(e.style.left);
		ak = parseInt(e.style.left) + parseInt(e.style.width);
		V = parseInt(e.style.top);
		T = parseInt(e.style.top) + parseInt(e.style.height);
		if (L.x - parseInt(e.style.left) <= parseInt(e.style.left)
				+ e.offsetWidth - L.x) {
			W = true
		}
		if (L.y - parseInt(e.style.top) <= parseInt(e.style.top)
				+ e.offsetHeight - L.y) {
			aj = true
		}
		var ac = new Array();
		var Y = new jsFont("arial", null, "9px");
		var X = ah.getDarkerShade(150);
		var ae = X.getHex();
		ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;z-index:-100;left:'
				+ am
				+ "px;top:"
				+ V
				+ "px;width:"
				+ (ak - am + 1)
				+ "px;height:1px;background-color:" + U + '"></DIV>';
		ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;z-index:-100;left:'
				+ am
				+ "px;top:"
				+ T
				+ "px;width:"
				+ (ak - am + 1)
				+ "px;height:1px;background-color:" + U + '"></DIV>';
		ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;z-index:-100;left:'
				+ am
				+ "px;top:"
				+ V
				+ "px;width:1px;height:"
				+ (T - V + 1)
				+ "px;background-color:" + U + '"></DIV>';
		ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;z-index:-100;left:'
				+ ak
				+ "px;top:"
				+ V
				+ "px;width:1px;height:"
				+ (T - V + 1)
				+ "px;background-color:" + U + '"></DIV>';
		var ab = e.offsetHeight;
		var al = e.offsetWidth;
		var ai;
		var af;
		for ( var aa = (L.x - am) % ad; aa < ak; aa += ad) {
			if (aa == L.x && aa >= am) {
				if (aa >= am && aa <= ak) {
					ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;z-index:-99;left:'
							+ aa
							+ "px;top:"
							+ V
							+ "px;width:1px;height:"
							+ ab
							+ "px;background-color:" + ae + '"></DIV>'
				}
			} else {
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;z-index:-100;left:'
						+ aa
						+ "px;top:"
						+ V
						+ "px;width:1px;height:"
						+ ab
						+ "px;background-color:" + U + '"></DIV>'
			}
			if (an && aa >= am && aa < ak) {
				if (ai && ai.offsetLeft + ai.offsetWidth + 1 < aa) {
					if (ai.offsetWidth < ak - aa) {
						af = ag(Math.round((aa - L.x) / F), new jsPoint(aa + 2,
								V + 1 + L.y), Y, X)
					}
				} else {
					if (!ai) {
						af = ag(Math.round((aa - L.x) / F), new jsPoint(aa + 2,
								V + 1 + L.y), Y, X)
					}
				}
				if (af) {
					if (!aj) {
						if (parseInt(af.style.top) + af.offsetHeight > T) {
							af.style.top = T - af.offsetHeight - 1
						}
					} else {
						if (parseInt(af.style.top) - af.offsetHeight - 1 > V) {
							af.style.top = parseInt(af.style.top)
									- af.offsetHeight - 1
						}
						if (parseInt(af.style.top) <= V) {
							af.style.top = V + 1
						}
					}
					af.style.visibility = "visible";
					ai = af
				}
				af = null
			}
		}
		ai = null;
		for ( var Z = (L.y - V) % ad; Z <= T; Z += ad) {
			if (Z == L.y) {
				if (Z >= V && Z <= T) {
					ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;z-index:-99;left:'
							+ am
							+ "px;top:"
							+ Z
							+ "px;width:"
							+ al
							+ "px;height:1px;background-color:"
							+ ae
							+ '"></DIV>'
				}
			} else {
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;z-index:-100;left:'
						+ am
						+ "px;top:"
						+ Z
						+ "px;width:"
						+ al
						+ "px;height:1px;background-color:" + U + '"></DIV>'
			}
			if (an && Z != L.y && Z >= V && Z < T) {
				if (ai && ai.offsetTop + ai.offsetHeight < Z) {
					if (ai.offsetHeight <= T - Z) {
						if (A == "cartecian") {
							af = ag(Math.round((L.y - Z) / F), new jsPoint(am
									+ 2 + L.x, Z), Y, X)
						} else {
							af = ag(Math.round((Z - L.y) / F), new jsPoint(am
									+ 2 + L.x, Z), Y, X)
						}
					}
				} else {
					if (!ai) {
						if (A == "cartecian") {
							af = ag(Math.round((L.y - Z) / F), new jsPoint(am
									+ 2 + L.x, Z), Y, X)
						} else {
							af = ag(Math.round((Z - L.y) / F), new jsPoint(am
									+ 2 + L.x, Z), Y, X)
						}
					}
				}
				if (af) {
					if (!W) {
						if (parseInt(af.style.left) + 1 + af.offsetWidth < ak) {
							af.style.left = parseInt(af.style.left) + 1
						} else {
							af.style.left = ak - af.offsetWidth - 3
						}
					} else {
						if (parseInt(af.style.left) - af.offsetWidth - 2 > am) {
							af.style.left = parseInt(af.style.left)
									- af.offsetWidth - 2
						} else {
							af.style.left = parseInt(af.style.left) + 1
						}
						if (parseInt(af.style.left) <= am) {
							af.style.left = am + 1
						}
					}
					af.style.visibility = "visible";
					if (aj
							&& parseInt(af.style.top) + af.offsetHeight > L.y
									- af.offsetHeight
							&& parseInt(af.style.top) < L.y) {
						af.style.visibility = "hidden"
					}
					if (aj && parseInt(af.style.top) > L.y
							&& parseInt(af.style.top) < L.y + af.offsetHeight
							&& parseInt(af.style.top) > L.y) {
						af.style.visibility = "hidden"
					}
					if (L.y > T
							&& parseInt(af.style.top) + af.offsetHeight > T
									- af.offsetHeight) {
						af.style.visibility = "hidden"
					}
					if (!aj && parseInt(af.style.top) < L.y + af.offsetHeight
							&& parseInt(af.style.top) > L.y) {
						af.style.visibility = "hidden"
					}
					if (!aj && parseInt(af.style.top) < L.y
							&& parseInt(af.style.top) + af.offsetHeight > L.y
							&& parseInt(af.style.top) < L.y) {
						alert(parseInt(af.style.top));
						af.style.visibility = "hidden"
					}
					if (L.y < V && parseInt(af.style.top) < V + af.offsetHeight) {
						af.style.visibility = "hidden"
					}
					ai = af
				}
				af = null
			}
		}
		e.innerHTML = e.innerHTML + ac.join("");
		function ag(at, ao, ar, aq, au) {
			var ap = document.createElement("div");
			ap.style.position = "absolute";
			ap.style.left = ao.x + "px";
			ap.style.top = ao.y + "px";
			ap.style.color = aq.getHex();
			ap.style.zIndex = -98;
			ap.style.visibility = "hidden";
			e.appendChild(ap);
			if (ar.family) {
				ap.style.fontFamily = ar.family
			}
			if (ar.weight) {
				ap.style.fontWeight = ar.weight
			}
			if (ar.size) {
				ap.style.fontSize = ar.size
			}
			if (ar.style) {
				ap.style.fontStyle = ar.style
			}
			if (ar.variant) {
				ap.style.fontVariant = ar.variant
			}
			if (au) {
				ap.align = au
			}
			ap.innerHTML = at;
			return ap
		}
	}
	function b() {
		e.innerHTML = "";
		e.style.display = "none"
	}
	function G(au, aa, Z) {
		if (!au || !aa || !Z) {
			return false
		}
		var V = m.appendChild(document.createElement("div"));
		if (arguments[3] != "physical") {
			phPoint0 = M(aa);
			phPoint1 = M(Z)
		} else {
			phPoint0 = new jsPoint(aa.x, aa.y);
			phPoint1 = new jsPoint(Z.x, Z.y)
		}
		var ap, ao, Y, W;
		ap = phPoint0.x;
		ao = phPoint1.x;
		Y = phPoint0.y;
		W = phPoint1.y;
		var X = au.color.getHex();
		if (Y == W) {
			if (ap <= ao) {
				V.innerHTML = '<DIV style="position:absolute;overflow:hidden;left:'
						+ ap
						+ "px;top:"
						+ Y
						+ "px;width:"
						+ (ao - ap + 1)
						+ "px;height:"
						+ au.width
						+ ";background-color:"
						+ X
						+ '"></DIV>'
			} else {
				if (ap > ao) {
					V.innerHTML = '<DIV style="position:absolute;overflow:hidden;left:'
							+ ao
							+ "px;top:"
							+ Y
							+ "px;width:"
							+ (ap - ao + 1)
							+ "px;height:"
							+ au.width
							+ ";background-color:"
							+ X + '"></DIV>'
				}
			}
			return V
		}
		if (ap == ao) {
			if (Y <= W) {
				V.innerHTML = '<DIV style="position:absolute;overflow:hidden;left:'
						+ ap
						+ "px;top:"
						+ Y
						+ "px;width:"
						+ au.width
						+ ";height:"
						+ (W - Y + 1)
						+ "px;background-color:"
						+ X
						+ '"></DIV>'
			} else {
				if (Y > W) {
					V.innerHTML = '<DIV style="position:absolute;overflow:hidden;left:'
							+ ap
							+ "px;top:"
							+ W
							+ "px;width:"
							+ au.width
							+ ";height:"
							+ (Y - W + 1)
							+ "px;background-color:"
							+ X + '"></DIV>'
				}
			}
			return V
		}
		var aj = new Array();
		var ak = new Array();
		var ai = Math.abs(ao - ap);
		var ah = Math.abs(W - Y);
		var al, aq;
		var ad = parseInt(au.width);
		al = Math.round(Math.sqrt((ad * ad) / ((ah * ah) / (ai * ai) + 1)));
		aq = Math.round(Math.sqrt(ad * ad - al * al));
		if (aq == 0) {
			aq = 1
		}
		if (al == 0) {
			al = 1
		}
		var U = Math.abs(W - Y) > Math.abs(ao - ap);
		if (U) {
			var ar = ap;
			ap = Y;
			Y = ar;
			ar = ao;
			ao = W;
			W = ar
		}
		if (ap > ao) {
			var ar = ap;
			ap = ao;
			ao = ar;
			ar = Y;
			Y = W;
			W = ar
		}
		var ac = ao - ap;
		var ab = Math.abs(W - Y);
		var am = ac / 2;
		var at;
		var ae = Y;
		if (Y < W) {
			at = 1
		} else {
			at = -1
		}
		var ag, an;
		var T = 0;
		var af = 0;
		if (U) {
			T = aq
		} else {
			af = al
		}
		for (x = ap; x <= ao; x++) {
			if (U) {
				if (x == ap) {
					ag = ae;
					an = x
				} else {
					if (ae == ag) {
						af = af + 1
					} else {
						af = af + al;
						aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ ag
								+ "px;top:"
								+ an
								+ "px;width:"
								+ T
								+ "px;height:"
								+ af
								+ "px;background-color:"
								+ X + '"></DIV>';
						af = 0;
						ag = ae;
						an = x
					}
				}
				if (x == ao) {
					if (af != 0) {
						af = af + al;
						aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ ag
								+ "px;top:"
								+ an
								+ "px;width:"
								+ T
								+ "px;height:"
								+ af
								+ "px;background-color:"
								+ X + '"></DIV>'
					} else {
						af = al;
						aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ ae
								+ "px;top:"
								+ x
								+ "px;width:"
								+ T
								+ "px;height:"
								+ af
								+ "px;background-color:"
								+ X + '"></DIV>'
					}
				}
			} else {
				if (x == ap) {
					ag = x;
					an = ae
				} else {
					if (ae == an) {
						T = T + 1
					} else {
						T = T + aq;
						aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ ag
								+ "px;top:"
								+ an
								+ "px;width:"
								+ T
								+ "px;height:"
								+ af
								+ "px;background-color:"
								+ X + '"></DIV>';
						T = 0;
						ag = x;
						an = ae
					}
				}
				if (x == ao) {
					if (T != 0) {
						T = T + aq;
						aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ ag
								+ "px;top:"
								+ an
								+ "px;width:"
								+ T
								+ "px;height:"
								+ af
								+ "px;background-color:"
								+ X + '"></DIV>'
					} else {
						T = aq;
						aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ x
								+ "px;top:"
								+ ae
								+ "px;width:"
								+ T
								+ "px;height:"
								+ af
								+ "px;background-color:"
								+ X + '"></DIV>'
					}
				}
			}
			am = am - ab;
			if (am < 0) {
				ae = ae + at;
				am = am + ac
			}
		}
		V.innerHTML = aj.join("");
		return V
	}
	function o(ad, ac) {
		function W() {
			this.xMax = 0;
			this.xMin = 0;
			this.isVertex = false
		}
		var U, T, af, ae;
		U = ad.x;
		T = ac.x;
		af = ad.y;
		ae = ac.y;
		var V = new Array();
		var aa = Math.abs(ae - af) > Math.abs(T - U);
		if (aa) {
			var X = U;
			U = af;
			af = X;
			X = T;
			T = ae;
			ae = X
		}
		if (U > T) {
			var X = U;
			U = T;
			T = X;
			X = af;
			af = ae;
			ae = X
		}
		var ah = T - U;
		var ag = Math.abs(ae - af);
		var Z = ah / 2;
		var Y;
		var ab = af;
		if (af < ae) {
			Y = 1
		} else {
			Y = -1
		}
		for (x = U; x <= T; x++) {
			if (aa) {
				V[x] = new W();
				V[x].xMin = ab;
				V[x].xMax = ab;
				if (x == U && ab == af) {
					V[x].isVertex = true
				}
			} else {
				if (!V[ab]) {
					V[ab] = new W();
					V[ab].xMin = x;
					V[ab].xMax = x;
					if (x == U && ab == af) {
						V[ab].isVertex = true
					}
				} else {
					V[ab].xMax = x
				}
			}
			Z = Z - ag;
			if (Z < 0) {
				ab = ab + Y;
				Z = Z + ah
			}
		}
		return V
	}
	function R(aa, U, Z, T) {
		if (!aa || !U || !Z || !T) {
			return false
		}
		Z = Math.round(Z * F);
		T = Math.round(T * F);
		var V = m.appendChild(document.createElement("div"));
		var Y = new Array();
		var X = parseInt(aa.width);
		var W = aa.color.getHex();
		if (X >= T || X >= Z) {
			return this.fillRectangle(aa.color, U, Z, T)
		}
		phPoint = M(U);
		Y[Y.length] = '<DIV style="position:absolute;overflow:hidden;left:'
				+ phPoint.x + "px;top:" + phPoint.y + "px;width:" + Z
				+ "px;height:" + X + "px;background-color:" + W + '"></DIV>';
		Y[Y.length] = '<DIV style="position:absolute;overflow:hidden;left:'
				+ phPoint.x + "px;top:" + (phPoint.y + T - X) + "px;width:" + Z
				+ "px;height:" + X + "px;background-color:" + W + '"></DIV>';
		Y[Y.length] = '<DIV style="position:absolute;overflow:hidden;left:'
				+ phPoint.x + "px;top:" + (phPoint.y + X) + "px;width:" + X
				+ "px;height:" + (T - 2 * X + 1) + "px;background-color:" + W
				+ '"></DIV>';
		Y[Y.length] = '<DIV style="position:absolute;overflow:hidden;left:'
				+ (phPoint.x + Z - X) + "px;top:" + (phPoint.y + X)
				+ "px;width:" + X + "px;height:" + (T - 2 * X + 1)
				+ "px;background-color:" + W + '"></DIV>';
		V.innerHTML = Y.join("");
		return V
	}
	function S(W, U, Y, T) {
		if (!W || !U || !Y || !T) {
			return false
		}
		Y = Math.round(Y * F);
		T = Math.round(T * F);
		var V = m.appendChild(document.createElement("div"));
		phPoint = M(U);
		var X = W.getHex();
		V.innerHTML = '<DIV style="position:absolute;overflow:hidden;left:'
				+ phPoint.x + "px;top:" + phPoint.y + "px;width:" + Y
				+ "px;height:" + T + "px;background-color:" + X + '"></DIV>';
		return V
	}
	function c(am, aj, af, ae) {
		if (!am || !aj || !af || !ae) {
			return false
		}
		var ad = m.appendChild(document.createElement("div"));
		var ac = new Array();
		var X = parseInt(am.width);
		var V = am.color.getHex();
		var ak = Math.round(af / 2);
		var ai = Math.round(ae / 2);
		var ag = aj.x;
		var U = aj.y;
		var Z = 0;
		var Y = ai;
		var al = ak * ak;
		var W = ai * ai;
		var ah = Y;
		var ab = Z;
		var T;
		var aa;
		while (W * Z < al * Y) {
			Z++;
			if ((W * Z * Z + al * (Y - 0.5) * (Y - 0.5) - al * W) >= 0) {
				Y--
			}
			if (Z == 1 && Y != ah) {
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (ag + Z)
						+ "px;top:"
						+ (U + Y)
						+ "px;width:1px;height:1px;background-color:"
						+ V
						+ '"></DIV>';
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (ag + Z)
						+ "px;top:"
						+ (U - Y)
						+ "px;width:1px;height:1px;background-color:"
						+ V
						+ '"></DIV>'
			}
			if (Y != ah) {
				T = Z - ab;
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (ag + ab)
						+ "px;top:"
						+ (U + ah - X + 1)
						+ "px;height:"
						+ X
						+ "px;width:"
						+ T
						+ "px;background-color:" + V + '"></DIV>';
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (ag - ab - T + 1)
						+ "px;top:"
						+ (U + ah - X + 1)
						+ "px;height:"
						+ X
						+ "px;width:"
						+ T
						+ "px;background-color:" + V + '"></DIV>';
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (ag + ab)
						+ "px;top:"
						+ (U - ah)
						+ "px;height:"
						+ X
						+ "px;width:"
						+ T
						+ "px;background-color:"
						+ V
						+ '"></DIV>';
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (ag - ab - T + 1)
						+ "px;top:"
						+ (U - ah)
						+ "px;height:"
						+ X
						+ "px;width:"
						+ T
						+ "px;background-color:" + V + '"></DIV>';
				ah = Y;
				ab = Z
			}
			if (W * Z >= al * Y) {
				T = Z - ab + 1;
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (ag + ab)
						+ "px;top:"
						+ (U + ah - X + 1)
						+ "px;height:"
						+ X
						+ "px;width:"
						+ T
						+ "px;background-color:" + V + '"></DIV>';
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (ag - ab - T + 1)
						+ "px;top:"
						+ (U + ah - X + 1)
						+ "px;height:"
						+ X
						+ "px;width:"
						+ T
						+ "px;background-color:" + V + '"></DIV>';
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (ag + ab)
						+ "px;top:"
						+ (U - ah)
						+ "px;height:"
						+ X
						+ "px;width:"
						+ T
						+ "px;background-color:"
						+ V
						+ '"></DIV>';
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (ag - ab - T + 1)
						+ "px;top:"
						+ (U - ah)
						+ "px;height:"
						+ X
						+ "px;width:"
						+ T
						+ "px;background-color:" + V + '"></DIV>'
			}
		}
		ah = Y;
		ab = Z;
		while (Y != 0) {
			Y--;
			if ((W * (Z + 0.5) * (Z + 0.5) + al * Y * Y - al * W) <= 0) {
				Z++
			}
			if (Z != ab) {
				aa = ah - Y;
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (ag + ab - X + 1)
						+ "px;top:"
						+ (U + ah - aa + 1)
						+ "px;width:"
						+ X
						+ "px;height:"
						+ aa
						+ "px;background-color:" + V + '"></DIV>';
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (ag + ab - X + 1)
						+ "px;top:"
						+ (U - ah)
						+ "px;width:"
						+ X
						+ "px;height:"
						+ aa
						+ "px;background-color:" + V + '"></DIV>';
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (ag - ab)
						+ "px;top:"
						+ (U + ah - aa + 1)
						+ "px;width:"
						+ X
						+ "px;height:"
						+ aa
						+ "px;background-color:" + V + '"></DIV>';
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (ag - ab)
						+ "px;top:"
						+ (U - ah)
						+ "px;width:"
						+ X
						+ "px;height:"
						+ aa
						+ "px;background-color:"
						+ V
						+ '"></DIV>';
				ab = Z;
				ah = Y
			}
			if (Y == 0) {
				aa = ah - Y + 1;
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (ag + ab - X + 1)
						+ "px;top:"
						+ (U + ah - aa + 1)
						+ "px;width:"
						+ X
						+ "px;height:"
						+ aa
						+ "px;background-color:" + V + '"></DIV>';
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (ag + ab - X + 1)
						+ "px;top:"
						+ (U - ah)
						+ "px;width:"
						+ X
						+ "px;height:"
						+ aa
						+ "px;background-color:" + V + '"></DIV>';
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (ag - ab)
						+ "px;top:"
						+ (U + ah - aa + 1)
						+ "px;width:"
						+ X
						+ "px;height:"
						+ aa
						+ "px;background-color:" + V + '"></DIV>';
				ac[ac.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (ag - ab)
						+ "px;top:"
						+ (U - ah)
						+ "px;width:"
						+ X
						+ "px;height:"
						+ aa
						+ "px;background-color:"
						+ V
						+ '"></DIV>';
				ab = Z;
				ah = Y
			}
		}
		ad.innerHTML = ac.join("");
		return ad
	}
	function N(az, au, am, al) {
		if (!az || !au || !am || !al) {
			return false
		}
		am *= F;
		al *= F;
		var ak = m.appendChild(document.createElement("div"));
		var aj = new Array();
		phCenter = M(au);
		var ab = parseInt(az.width);
		if (ab <= 1) {
			return c(az, phCenter, am, al)
		}
		var Y = az.color.getHex();
		var av = Math.round(am / 2);
		var at = Math.round(al / 2);
		var an = phCenter.x;
		var V = phCenter.y;
		var ao = av - ab + 1;
		var W = at - ab + 1;
		var ay = d(phCenter, ao * 2, W * 2);
		var ad = ay[0];
		var X = ay[1];
		var ax = W;
		var ac = ao * ao;
		var ar = W * W;
		var af = 0;
		var ae = at;
		var aw = av * av;
		var aa = at * at;
		var ah, ap;
		ah = 1;
		ap = ae;
		var aq = ax;
		var U;
		var T;
		var ag = 1;
		while (aa * af < aw * ae) {
			af++;
			if ((aa * af * af + aw * (ae - 0.5) * (ae - 0.5) - aw * aa) >= 0) {
				ae--
			}
			if (ae + 1 < W) {
				if (ae != ap) {
					U = an - af + 1;
					T = (af - 1) + 1 - ad[ap];
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ U
							+ "px;top:"
							+ (V - ap)
							+ "px;width:"
							+ T
							+ "px;height:"
							+ ag
							+ "px;background-color:"
							+ Y
							+ '"></DIV>';
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ U
							+ "px;top:"
							+ (V + ap)
							+ "px;width:"
							+ T
							+ "px;height:"
							+ ag
							+ "px;background-color:"
							+ Y
							+ '"></DIV>';
					U = U + 2 * (af - 1) + 1 - T;
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ U
							+ "px;top:"
							+ (V - ap)
							+ "px;width:"
							+ T
							+ "px;height:"
							+ ag
							+ "px;background-color:"
							+ Y
							+ '"></DIV>';
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ U
							+ "px;top:"
							+ (V + ap)
							+ "px;width:"
							+ T
							+ "px;height:"
							+ ag
							+ "px;background-color:"
							+ Y
							+ '"></DIV>';
					ap = ae;
					ah = af
				}
				if (aa * af >= aw * ae) {
					U = an - af;
					T = af + 1 - ad[ap];
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ U
							+ "px;top:"
							+ (V - ae)
							+ "px;width:"
							+ T
							+ "px;height:"
							+ ag
							+ "px;background-color:"
							+ Y
							+ '"></DIV>';
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ U
							+ "px;top:"
							+ (V + ae)
							+ "px;width:"
							+ T
							+ "px;height:"
							+ ag
							+ "px;background-color:"
							+ Y
							+ '"></DIV>';
					U = U + 2 * af + 1 - T;
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ U
							+ "px;top:"
							+ (V - ae)
							+ "px;width:"
							+ T
							+ "px;height:"
							+ ag
							+ "px;background-color:"
							+ Y
							+ '"></DIV>';
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ U
							+ "px;top:"
							+ (V + ae)
							+ "px;width:"
							+ T
							+ "px;height:"
							+ ag
							+ "px;background-color:"
							+ Y
							+ '"></DIV>'
				}
			} else {
				if (af == 1 && ae != ap) {
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;width:1px;height:1px;left:'
							+ an
							+ "px;top:"
							+ (V + ap - 1)
							+ "px;background-color:" + Y + '"></DIV>';
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;width:1px;height:1px;left:'
							+ an
							+ "px;top:"
							+ (V - ap)
							+ "px;background-color:" + Y + '"></DIV>'
				}
				if (ae != ap) {
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ (an - af + 1)
							+ "px;top:"
							+ (V - ap)
							+ "px;width:"
							+ (2 * (af - 1) + 1)
							+ "px;height:"
							+ ag + "px;background-color:" + Y + '"></DIV>';
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ (an - af + 1)
							+ "px;top:"
							+ (V + ap)
							+ "px;width:"
							+ (2 * (af - 1) + 1)
							+ "px;height:"
							+ ag + "px;background-color:" + Y + '"></DIV>';
					ap = ae
				}
				if (ae == W || ae == 0) {
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ (an - af)
							+ "px;top:"
							+ (V - ae)
							+ "px;width:"
							+ (2 * af + 1)
							+ "px;height:"
							+ ag
							+ "px;background-color:" + Y + '"></DIV>';
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ (an - af)
							+ "px;top:"
							+ (V + ae)
							+ "px;width:"
							+ (2 * af + 1)
							+ "px;height:"
							+ ag
							+ "px;background-color:" + Y + '"></DIV>'
				}
			}
		}
		ah = af;
		ap = ae;
		ag = 1;
		var Z = ad[ae];
		while (ae != 0) {
			ae--;
			if ((aa * (af + 0.5) * (af + 0.5) + aw * ae * ae - aw * aa) <= 0) {
				af++
			}
			if (ae + 1 < W) {
				if (af != ah || ad[ae] != Z) {
					ag = ap - ae;
					U = an - ah;
					T = ah + 1 - ad[ae + 1];
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ U
							+ "px;top:"
							+ (V - ap)
							+ "px;width:"
							+ T
							+ "px;height:"
							+ ag
							+ "px;background-color:"
							+ Y
							+ '"></DIV>';
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ U
							+ "px;top:"
							+ (V + ae + 1)
							+ "px;width:"
							+ T
							+ "px;height:"
							+ ag
							+ "px;background-color:"
							+ Y
							+ '"></DIV>';
					U = U + 2 * ah + 1 - T;
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ U
							+ "px;top:"
							+ (V - ap)
							+ "px;width:"
							+ T
							+ "px;height:"
							+ ag
							+ "px;background-color:"
							+ Y
							+ '"></DIV>';
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ U
							+ "px;top:"
							+ (V + ae + 1)
							+ "px;width:"
							+ T
							+ "px;height:"
							+ ag
							+ "px;background-color:"
							+ Y
							+ '"></DIV>';
					ah = af;
					ap = ae;
					Z = ad[ae]
				}
				if (ae == 0) {
					ag = ap - ae + 1;
					U = an - af;
					T = af + 1 - ad[ae];
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ U
							+ "px;top:"
							+ (V - ap)
							+ "px;width:"
							+ T
							+ "px;height:"
							+ ag
							+ "px;background-color:"
							+ Y
							+ '"></DIV>';
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ U
							+ "px;top:"
							+ (V + ae)
							+ "px;width:"
							+ T
							+ "px;height:"
							+ ag
							+ "px;background-color:"
							+ Y
							+ '"></DIV>';
					U = U + 2 * af + 1 - T;
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ U
							+ "px;top:"
							+ (V - ap)
							+ "px;width:"
							+ T
							+ "px;height:"
							+ ag
							+ "px;background-color:"
							+ Y
							+ '"></DIV>';
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ U
							+ "px;top:"
							+ (V + ae)
							+ "px;width:"
							+ T
							+ "px;height:"
							+ ag
							+ "px;background-color:"
							+ Y
							+ '"></DIV>';
					ah = af;
					ap = ae;
					Z = ad[ae]
				}
			} else {
				if (af != ah) {
					ag = ap - ae;
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ (an - ah)
							+ "px;top:"
							+ (V - ap)
							+ "px;width:"
							+ (2 * ah + 1)
							+ "px;height:"
							+ ag
							+ "px;background-color:" + Y + '"></DIV>';
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ (an - ah)
							+ "px;top:"
							+ (V + ae + 1)
							+ "px;width:"
							+ (2 * ah + 1)
							+ "px;height:"
							+ ag
							+ "px;background-color:" + Y + '"></DIV>';
					ah = af;
					ap = ae;
					Z = ad[ae]
				}
				if (ae == W || ae == 0) {
					ag = ap - ae + 1;
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ (an - af)
							+ "px;top:"
							+ (V - ap)
							+ "px;width:"
							+ (2 * af + 1)
							+ "px;height:"
							+ ag
							+ "px;background-color:" + Y + '"></DIV>';
					aj[aj.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ (an - af)
							+ "px;top:"
							+ (V + ae)
							+ "px;width:"
							+ (2 * af + 1)
							+ "px;height:"
							+ ag
							+ "px;background-color:" + Y + '"></DIV>';
					ah = af;
					ap = ae;
					Z = ad[ae]
				}
			}
		}
		ak.innerHTML = aj.join("");
		return ak
	}
	function d(T, ae, X) {
		var ac = Math.round(ae / 2);
		var ab = Math.round(X / 2);
		var af = T.x;
		var Y = T.y;
		xArray = new Array();
		xArrayI = new Array();
		var ad = 0;
		var aa = ab;
		var U = ac * ac;
		var Z = ab * ab;
		xArray[aa] = ad;
		xArrayI[aa] = ad;
		var V;
		var W;
		while (Z * ad < U * aa) {
			ad++;
			if ((Z * ad * ad + U * (aa - 0.5) * (aa - 0.5) - U * Z) >= 0) {
				aa--
			}
			if (!xArray[aa]) {
				xArray[aa] = ad
			}
			xArrayI[aa] = ad
		}
		while (aa != 0) {
			aa--;
			if ((Z * (ad + 0.5) * (ad + 0.5) + U * aa * aa - U * Z) <= 0) {
				ad++
			}
			xArray[aa] = ad;
			xArrayI[aa] = ad
		}
		return new Array(xArray, xArrayI)
	}
	function g(V, U, T) {
		if (!V || !U || !T) {
			return false
		}
		return N(V, U, 2 * T, 2 * T)
	}
	function v(V, U, T) {
		if (!V || !U || !T) {
			return false
		}
		return I(V, U, 2 * T, 2 * T)
	}
	function I(ae, ai, ad, ac) {
		if (!ae || !ai || !ad || !ac) {
			return false
		}
		ad *= F;
		ac *= F;
		var ab = m.appendChild(document.createElement("div"));
		var aa = new Array();
		phCenter = M(ai);
		var aj = Math.round(ad / 2);
		var ah = Math.round(ac / 2);
		var af = phCenter.x;
		var T = phCenter.y;
		var U = ae.getHex();
		var X = 0;
		var W = ah;
		var ak = aj * aj;
		var V = ah * ah;
		var Z, ag;
		Z = 1;
		ag = W;
		while (V * X < ak * W) {
			X++;
			if ((V * X * X + ak * (W - 0.5) * (W - 0.5) - ak * V) >= 0) {
				W--
			}
			if (X == 1 && W != ag) {
				aa[aa.length] = '<DIV style="position:absolute;overflow:hidden;width:1px;height:1px;left:'
						+ af
						+ "px;top:"
						+ (T + ag - 1)
						+ "px;background-color:" + U + '"></DIV>';
				aa[aa.length] = '<DIV style="position:absolute;overflow:hidden;width:1px;height:1px;left:'
						+ af
						+ "px;top:"
						+ (T - ag)
						+ "px;background-color:"
						+ U + '"></DIV>'
			}
			if (W != ag) {
				aa[aa.length] = '<DIV style="position:absolute;overflow:hidden;height:1px;left:'
						+ (af - X + 1)
						+ "px;top:"
						+ (T - ag)
						+ "px;width:"
						+ (2 * X - 1) + "px;background-color:" + U + '"></DIV>';
				aa[aa.length] = '<DIV style="position:absolute;overflow:hidden;height:1px;left:'
						+ (af - X + 1)
						+ "px;top:"
						+ (T + ag)
						+ "px;width:"
						+ (2 * X - 1) + "px;background-color:" + U + '"></DIV>';
				ag = W;
				Z = X
			}
			if (V * X >= ak * W) {
				aa[aa.length] = '<DIV style="position:absolute;overflow:hidden;height:1px;left:'
						+ (af - X)
						+ "px;top:"
						+ (T - ag)
						+ "px;width:"
						+ (2 * X + 1) + "px;background-color:" + U + '"></DIV>';
				aa[aa.length] = '<DIV style="position:absolute;overflow:hidden;height:1px;left:'
						+ (af - X)
						+ "px;top:"
						+ (T + ag)
						+ "px;width:"
						+ (2 * X + 1) + "px;background-color:" + U + '"></DIV>'
			}
		}
		Z = X;
		ag = W;
		var Y = 1;
		while (W != 0) {
			W--;
			if ((V * (X + 0.5) * (X + 0.5) + ak * W * W - ak * V) <= 0) {
				X++
			}
			if (X != Z) {
				Y = ag - W;
				aa[aa.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (af - Z)
						+ "px;top:"
						+ (T - ag)
						+ "px;width:"
						+ (2 * Z + 1)
						+ "px;height:"
						+ Y
						+ "px;background-color:" + U + '"></DIV>';
				aa[aa.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (af - Z)
						+ "px;top:"
						+ (T + W + 1)
						+ "px;width:"
						+ (2 * Z + 1)
						+ "px;height:"
						+ Y
						+ "px;background-color:" + U + '"></DIV>';
				Z = X;
				ag = W
			}
			if (W == 0) {
				Y = ag - W + 1;
				aa[aa.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (af - Z)
						+ "px;top:"
						+ (T - ag)
						+ "px;width:"
						+ (2 * X + 1)
						+ "px;height:"
						+ Y
						+ "px;background-color:" + U + '"></DIV>';
				aa[aa.length] = '<DIV style="position:absolute;overflow:hidden;left:'
						+ (af - Z)
						+ "px;top:"
						+ (T + W)
						+ "px;width:"
						+ (2 * X + 1)
						+ "px;height:"
						+ Y
						+ "px;background-color:" + U + '"></DIV>'
			}
		}
		ab.innerHTML = aa.join("");
		return ab
	}
	function u(aE, U, T, W, af, ax) {
		if (!aE || !U || !T || !W || af == null || ax == null) {
			return false
		}
		T *= F;
		W *= F;
		if (ax == 0) {
			return
		}
		var aa = m.appendChild(document.createElement("div"));
		var aK = new Array();
		phCenter = M(U);
		var al;
		if (af > 360) {
			al = af % 360
		} else {
			al = af
		}
		var ab;
		if (ax > 360) {
			ab = ax % 360
		} else {
			ab = ax
		}
		var aX;
		aX = parseFloat(al) + parseFloat(ab);
		if (aX > 360) {
			aX = aX % 360
		}
		if (A == "cartecian") {
			al = 360 - al;
			aX = 360 - aX;
			var X;
			X = al;
			al = aX;
			aX = X
		}
		var am, a4, ak, a3;
		var ad = al * Math.PI / 180;
		var a1 = ab * Math.PI / 180;
		var aP = aX * Math.PI / 180;
		if ((al <= 45 && al >= 0) || (al >= 135 && al <= 225)
				|| (al >= 315 && al <= 360)) {
			a4 = Math.round(phCenter.y + Math.sin(ad) * T / 2);
			if (al >= 90 && al <= 270) {
				am = Math.round(phCenter.x - T / 2)
			} else {
				am = Math.round(phCenter.x + T / 2)
			}
		} else {
			am = Math.round(phCenter.x + Math.cos(ad) * W / 2);
			if (al >= 0 && al <= 180) {
				a4 = Math.round(phCenter.y + W / 2)
			} else {
				a4 = Math.round(phCenter.y - W / 2)
			}
		}
		if ((aX <= 45 && aX >= 0) || (aX >= 135 && aX <= 225)
				|| (aX >= 315 && aX <= 360)) {
			a3 = Math.round(phCenter.y + Math.sin(aP) * T / 2);
			if (aX >= 90 && aX <= 270) {
				ak = Math.round(phCenter.x - T / 2)
			} else {
				ak = Math.round(phCenter.x + T / 2)
			}
		} else {
			ak = Math.round(phCenter.x + Math.cos(aP) * W / 2);
			if (aX >= 0 && aX <= 180) {
				a3 = Math.round(phCenter.y + W / 2)
			} else {
				a3 = Math.round(phCenter.y - W / 2)
			}
		}
		xDataArraySa = o(phCenter, new jsPoint(am, a4));
		xDataArrayEa = o(phCenter, new jsPoint(ak, a3));
		var aF = aE.getHex();
		var a0 = Math.round(T / 2);
		var aZ = Math.round(W / 2);
		var aQ = phCenter.x;
		var aw = phCenter.y;
		var aO = 0;
		var aN = aZ;
		var aR = a0 * a0;
		var ay = aZ * aZ;
		var aJ, ap;
		var aU, ac, an, aS, V, ah, aA, az, Z, aM, Y, ao, aI, aT, aD, aL;
		var aW, av, au, at, ar, ae, aV, aB, ag, aH;
		var ai, aY, aG, aj;
		aJ = 1;
		ap = aN;
		while (ay * aO < aR * aN) {
			aO++;
			if ((ay * aO * aO + aR * (aN - 0.5) * (aN - 0.5) - aR * ay) >= 0) {
				aN--
			}
			if (aO == 1 && aN != ap) {
				aA = aw + ap - 1;
				az = aw - ap;
				aW = 1;
				av = aW;
				au = aW;
				at = aW;
				ar = aW;
				aU = aQ;
				if (al >= 0 && al < 180 && aX >= 0 && aX < 180) {
					aq(true);
					if (aX <= al) {
						aq(false)
					}
				} else {
					if (al >= 180 && al < 360 && aX >= 180 && aX <= 360) {
						aq(false);
						if (aX <= al) {
							aq(true)
						}
					} else {
						aq(true);
						aq(false)
					}
				}
			} else {
				if (aN != ap) {
					aA = aw + ap;
					az = aw - ap;
					aW = 2 * (aO - 1) + 1;
					av = aW;
					au = aW;
					at = aW;
					ar = aW;
					aU = aQ - aO + 1;
					if (al >= 0 && al < 180 && aX >= 0 && aX < 180) {
						aq(true);
						if (aX <= al) {
							aq(false)
						}
					} else {
						if (al >= 180 && al < 360 && aX >= 180 && aX <= 360) {
							aq(false);
							if (aX <= al) {
								aq(true)
							}
						} else {
							aq(true);
							aq(false)
						}
					}
					ap = aN;
					aJ = aO
				}
			}
			if (ay * aO >= aR * aN) {
				aA = aw + ap;
				az = aw - ap;
				aW = 2 * aO + 1;
				av = aW;
				au = aW;
				at = aW;
				ar = aW;
				aU = aQ - aO;
				if (al >= 0 && al < 180 && aX >= 0 && aX < 180) {
					aq(true);
					if (aX <= al) {
						aq(false)
					}
				} else {
					if (al >= 180 && al < 360 && aX >= 180 && aX <= 360) {
						aq(false);
						if (aX <= al) {
							aq(true)
						}
					} else {
						aq(true);
						aq(false)
					}
				}
			}
		}
		aJ = aO;
		ap = aN;
		aH = 1;
		aA = aw + aN;
		az = aw - aN;
		aW = 2 * aO + 1;
		av = aW;
		au = aW;
		at = aW;
		ar = aW;
		aU = aQ - aO;
		if (al >= 0 && al < 180 && aX >= 0 && aX < 180) {
			xDataArrayEa.pop();
			aC(true, true);
			if (aX <= al) {
				aC(false, true)
			}
		} else {
			if (al >= 180 && al < 360 && aX >= 180 && aX <= 360) {
				xDataArrayEa.pop();
				if (aN != 0) {
					aC(false, true)
				}
				if (aX <= al) {
					aC(true, true)
				}
			} else {
				if (al >= 180 && al < 360) {
					xDataArraySa.pop()
				} else {
					xDataArrayEa.pop()
				}
				aC(true, true);
				if (aN != 0) {
					aU = aQ - aO;
					aC(false, true)
				}
			}
		}
		while (aN != 0) {
			aN--;
			if ((ay * (aO + 0.5) * (aO + 0.5) + aR * aN * aN - aR * ay) <= 0) {
				aO++
			}
			aA = aw + aN;
			az = aw - aN;
			aW = 2 * aO + 1;
			av = aW;
			au = aW;
			at = aW;
			ar = aW;
			aU = aQ - aO;
			if (al >= 0 && al < 180 && aX >= 0 && aX < 180) {
				aC(true);
				if (aX <= al) {
					aC(false)
				}
			} else {
				if (al >= 180 && al < 360 && aX >= 180 && aX <= 360) {
					if (aN != 0) {
						aC(false)
					}
					if (aX <= al) {
						aC(true)
					}
				} else {
					aC(true);
					if (aN != 0) {
						aU = aQ - aO;
						aC(false)
					}
				}
			}
		}
		aa.innerHTML = aK.join("");
		return aa;
		function aC(ba, bc) {
			var be;
			var a7, a7;
			var bb = aW;
			var a9 = aW;
			var a8 = false;
			var bd = false;
			if (ba) {
				var a6 = false;
				var a2 = false;
				be = aA;
				a7 = xDataArraySa;
				xDataArray2 = xDataArrayEa;
				saDvar = al;
				eaDvar = aX
			} else {
				var a5 = false;
				var bf = false;
				be = az;
				xDataArray2 = xDataArraySa;
				a7 = xDataArrayEa;
				saDvar = 360 - aX;
				eaDvar = 360 - al
			}
			if (eaDvar > saDvar) {
				if (xDataArray2[be] && aU + aW >= xDataArray2[be].xMin
						&& aU <= xDataArray2[be].xMin) {
					aM = xDataArray2[be].xMin;
					if (a7[be] && aU + aW >= a7[be].xMax + 1
							&& aU <= a7[be].xMax + 1) {
						Z = a7[be].xMax + 1;
						bb = Z - aM
					} else {
						bb = aU + aW - aM
					}
					aU = aM;
					a8 = true
				} else {
					if (a7[be] && aU + aW >= a7[be].xMax + 1
							&& aU <= a7[be].xMax + 1) {
						Z = a7[be].xMax + 1;
						bb = Z - aU;
						a8 = true
					} else {
						if (eaDvar > 90 && saDvar < 90) {
							a8 = true
						}
					}
				}
			} else {
				if (a7[be] && aU + aW >= a7[be].xMax + 1
						&& aU <= a7[be].xMax + 1) {
					Z = a7[be].xMax + 1;
					bb = Z - aU;
					a8 = true
				} else {
					if (eaDvar < 90 && saDvar < 90) {
						a8 = true
					}
				}
				if (xDataArray2[be] && aU + aW >= xDataArray2[be].xMin
						&& aU <= xDataArray2[be].xMin) {
					aS = xDataArray2[be].xMin;
					a9 = aW - xDataArray2[be].xMin + aU;
					bd = true
				} else {
					if (eaDvar > 90 && saDvar > 90) {
						aS = aU;
						a9 = aW;
						bd = true
					}
				}
			}
			if (ba) {
				if (a8) {
					a6 = true
				}
				if (bd) {
					a2 = true
				}
				av = bb;
				at = a9
			} else {
				if (a8) {
					a5 = true
				}
				if (bd) {
					bf = true
				}
				au = bb;
				ar = a9
			}
			if (al >= 0 && al < 180 && aX >= 0 && aX < 180 && al > aX) {
				a5 = true
			} else {
				if (al >= 180 && al < 360 && aX >= 180 && aX < 360 && al > aX) {
					a6 = true
				}
			}
			if (!aS) {
				aS = ""
			}
			if (!aU) {
				aU = ""
			}
			if (!bc) {
				if (ba) {
					if (aO != aI || ac != aU || V != aS || av != ae || at != aB) {
						aH = aD - aN;
						if (aG) {
							if (V != null) {
								aK[aK.length] = '<DIV style="position:absolute;overflow:hidden;left:'
										+ V
										+ "px;top:"
										+ (aA + 1)
										+ "px;width:"
										+ aB
										+ "px;height:"
										+ aH
										+ "px;background-color:"
										+ aF
										+ '"></DIV>'
							}
						}
						if (ai) {
							if (ac != null) {
								aK[aK.length] = '<DIV style="position:absolute;overflow:hidden;left:'
										+ ac
										+ "px;top:"
										+ (aA + 1)
										+ "px;width:"
										+ ae
										+ "px;height:"
										+ aH
										+ "px;background-color:"
										+ aF
										+ '"></DIV>'
							}
						}
						if (ai || aG) {
							ac = aU;
							ai = a6;
							aG = a2;
							aI = aO;
							aD = aN;
							ae = av;
							aB = at;
							V = aS
						}
					}
				} else {
					if (aO != aT || an != aU || ah != aS || au != aV
							|| ar != ag) {
						aH = aL - aN;
						if (aj) {
							if (ah != null) {
								aK[aK.length] = '<DIV style="position:absolute;overflow:hidden;left:'
										+ ah
										+ "px;top:"
										+ (az - aH)
										+ "px;width:"
										+ ag
										+ "px;height:"
										+ aH
										+ "px;background-color:"
										+ aF
										+ '"></DIV>'
							}
						}
						if (aY) {
							if (an != null) {
								aK[aK.length] = '<DIV style="position:absolute;overflow:hidden;left:'
										+ an
										+ "px;top:"
										+ (az - aH)
										+ "px;width:"
										+ aV
										+ "px;height:"
										+ aH
										+ "px;background-color:"
										+ aF
										+ '"></DIV>'
							}
						}
						if (aY || aj) {
							an = aU;
							aY = a5;
							aj = bf;
							aT = aO;
							aL = aN;
							aV = au;
							ag = ar;
							ah = aS
						}
					}
				}
			}
			if (bc) {
				if (ba) {
					ai = a6;
					aG = a2;
					if (ai) {
						ac = aU
					}
					if (aG) {
						V = aS
					}
					if (ai || aG) {
						aD = aN;
						aI = aO
					} else {
						aD = 0;
						aI = 0
					}
					ae = av;
					aB = at
				} else {
					aY = a5;
					aj = bf;
					if (aY) {
						an = aU
					}
					if (aj) {
						ah = aS
					}
					if (aY || aj) {
						aL = aN;
						aT = aO
					} else {
						aL = 0;
						aT = 0
					}
					aV = au;
					ag = ar
				}
			}
			if (!ba) {
				aY = a5;
				aj = bf
			} else {
				ai = a6;
				aG = a2
			}
			if (aN == 1 && !ba) {
				aH = aL - aN + 1;
				if (bf) {
					aK[aK.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ aS
							+ "px;top:"
							+ (az + 1 - aH)
							+ "px;width:"
							+ ar
							+ "px;height:"
							+ aH
							+ "px;background-color:"
							+ aF
							+ '"></DIV>'
				}
				if (a5) {
					aK[aK.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ aU
							+ "px;top:"
							+ (az + 1 - aH)
							+ "px;width:"
							+ au
							+ "px;height:"
							+ aH
							+ "px;background-color:"
							+ aF
							+ '"></DIV>'
				}
			}
			if (aN == 0 && ba) {
				aH = aD - aN + 1;
				if (a2) {
					aK[aK.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ aS
							+ "px;top:"
							+ (aA)
							+ "px;width:"
							+ at
							+ "px;height:"
							+ aH
							+ "px;background-color:"
							+ aF
							+ '"></DIV>'
				}
				if (a6) {
					aK[aK.length] = '<DIV style="position:absolute;overflow:hidden;left:'
							+ aU
							+ "px;top:"
							+ (aA)
							+ "px;width:"
							+ av
							+ "px;height:"
							+ aH
							+ "px;background-color:"
							+ aF
							+ '"></DIV>'
				}
			}
		}
		function aq(ba) {
			var bd;
			var a7, a7;
			var bb = aW;
			var a9 = aW;
			var a8 = false;
			var bc = false;
			if (ba) {
				var a6 = false;
				var a2 = false;
				bd = aA;
				a7 = xDataArraySa;
				xDataArray2 = xDataArrayEa;
				saDvar = al;
				eaDvar = aX
			} else {
				var a5 = false;
				var be = false;
				bd = az;
				xDataArray2 = xDataArraySa;
				a7 = xDataArrayEa;
				saDvar = 360 - aX;
				eaDvar = 360 - al
			}
			if (eaDvar > saDvar) {
				if (xDataArray2[bd] != null && aU + aW >= xDataArray2[bd].xMin
						&& aU <= xDataArray2[bd].xMin) {
					aM = xDataArray2[bd].xMin;
					if (a7[bd] != null && aU + aW >= a7[bd].xMax + 1
							&& aU <= a7[bd].xMax + 1) {
						Z = a7[bd].xMax + 1;
						bb = Z - aM
					} else {
						bb = aU + aW - aM
					}
					aU = aM;
					a8 = true
				} else {
					if (a7[bd] != null && aU + aW >= a7[bd].xMax + 1
							&& aU <= a7[bd].xMax + 1) {
						Z = a7[bd].xMax + 1;
						bb = Z - aU;
						a8 = true
					} else {
						if (eaDvar > 90 && saDvar < 90) {
							a8 = true
						}
					}
				}
			} else {
				if (a7[bd] != null && aU + aW >= a7[bd].xMax + 1
						&& aU <= a7[bd].xMax + 1) {
					Z = a7[bd].xMax + 1;
					bb = Z - aU;
					a8 = true
				} else {
					if (eaDvar < 90 && saDvar < 90) {
						a8 = true
					}
				}
				if (xDataArray2[bd] != null && aU + aW >= xDataArray2[bd].xMin
						&& aU <= xDataArray2[bd].xMin) {
					aS = xDataArray2[bd].xMin;
					a9 = aW - xDataArray2[bd].xMin + aU;
					bc = true
				} else {
					if (eaDvar > 90 && saDvar > 90) {
						aS = aU;
						a9 = aW;
						bc = true
					}
				}
			}
			if (ba) {
				if (a8) {
					a6 = true
				}
				if (bc) {
					a2 = true
				}
				av = bb;
				at = a9
			} else {
				if (a8) {
					a5 = true
				}
				if (bc) {
					be = true
				}
				au = bb;
				ar = a9
			}
			if (al >= 0 && al < 180 && aX >= 0 && aX < 180 && al > aX) {
				a5 = true
			} else {
				if (al >= 180 && al < 360 && aX >= 180 && aX < 360 && al > aX) {
					a6 = true
				}
			}
			if (aS == null) {
				aS = "X"
			}
			if (aU == null) {
				aU = "X"
			}
			if (ba) {
				aH = 1;
				if (a2) {
					if (aS != "X") {
						aK[aK.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ aS
								+ "px;top:"
								+ aA
								+ "px;width:"
								+ at
								+ "px;height:"
								+ aH
								+ "px;background-color:"
								+ aF + '"></DIV>'
					}
				}
				if (a6) {
					if (aU != "X") {
						aK[aK.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ aU
								+ "px;top:"
								+ aA
								+ "px;width:"
								+ av
								+ "px;height:"
								+ aH
								+ "px;background-color:"
								+ aF + '"></DIV>'
					}
				}
			} else {
				aH = 1;
				if (be) {
					if (aS != "X") {
						aK[aK.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ aS
								+ "px;top:"
								+ (az + 1 - aH)
								+ "px;width:"
								+ ar
								+ "px;height:"
								+ aH
								+ "px;background-color:" + aF + '"></DIV>'
					}
				}
				if (a5) {
					if (aU != "X") {
						aK[aK.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ aU
								+ "px;top:"
								+ (az + 1 - aH)
								+ "px;width:"
								+ au
								+ "px;height:"
								+ aH
								+ "px;background-color:" + aF + '"></DIV>'
					}
				}
			}
		}
	}
	function D(aQ, a1, bd, aj, aR, bl) {
		if (!aQ || !a1 || !bd || !aj || aR == null || bl == null) {
			return false
		}
		bd *= F;
		aj *= F;
		if (bl == 0) {
			return
		}
		var aF = m.appendChild(document.createElement("div"));
		var ag = new Array();
		phCenter = M(a1);
		var ao;
		if (aR > 360) {
			ao = aR % 360
		} else {
			ao = aR
		}
		var a9;
		if (bl > 360) {
			a9 = bl % 360
		} else {
			a9 = bl
		}
		var ba;
		ba = parseFloat(ao) + parseFloat(a9);
		if (ba > 360) {
			ba = ba % 360
		}
		if (A == "cartecian") {
			ao = 360 - ao;
			ba = 360 - ba;
			var aO;
			aO = ao;
			ao = ba;
			ba = aO
		}
		var an, Z, am, X;
		var ak = ao * Math.PI / 180;
		var a0 = a9 * Math.PI / 180;
		var a5 = ba * Math.PI / 180;
		if ((ao <= 45 && ao >= 0) || (ao >= 135 && ao <= 225)
				|| (ao >= 315 && ao <= 360)) {
			Z = Math.round(phCenter.y + Math.sin(ak) * bd / 2);
			if (ao >= 90 && ao <= 270) {
				an = Math.round(phCenter.x - bd / 2)
			} else {
				an = Math.round(phCenter.x + bd / 2)
			}
		} else {
			an = Math.round(phCenter.x + Math.cos(ak) * aj / 2);
			if (ao >= 0 && ao <= 180) {
				Z = Math.round(phCenter.y + aj / 2)
			} else {
				Z = Math.round(phCenter.y - aj / 2)
			}
		}
		if ((ba <= 45 && ba >= 0) || (ba >= 135 && ba <= 225)
				|| (ba >= 315 && ba <= 360)) {
			X = Math.round(phCenter.y + Math.sin(a5) * bd / 2);
			if (ba >= 90 && ba <= 270) {
				am = Math.round(phCenter.x - bd / 2)
			} else {
				am = Math.round(phCenter.x + bd / 2)
			}
		} else {
			am = Math.round(phCenter.x + Math.cos(a5) * aj / 2);
			if (ba >= 0 && ba <= 180) {
				X = Math.round(phCenter.y + aj / 2)
			} else {
				X = Math.round(phCenter.y - aj / 2)
			}
		}
		xDataArraySa = o(phCenter, new jsPoint(an, Z));
		xDataArrayEa = o(phCenter, new jsPoint(am, X));
		var aT = aQ.color.getHex();
		var aM = Math.round(bd / 2);
		var aK = Math.round(aj / 2);
		var T = phCenter.x;
		var bg = phCenter.y;
		var aw = 0;
		var av = aK;
		var bp = aM * aM;
		var bf = aK * aK;
		var aT = aQ.color.getHex();
		var a8 = aM - parseInt(aQ.width) + 1;
		var aU = aK - parseInt(aQ.width) + 1;
		var aD = d(phCenter, a8 * 2, aU * 2);
		var aP = aD[0];
		var ae = aD[1];
		aP.pop();
		ae.pop();
		var bm, bc;
		var a4, aJ, aV, a3, aG, aS, aN, aL, af, aY, W, bb, aX, a7, aW, a6, aZ, aH, aa, bj, ad, bk;
		var ac, aB, aA, az, ax, aE, al, Y, bn, V, aI, ap, ab, bo, aC, ay, at, aq;
		var au, ah, U, bh;
		bm = 1;
		bc = av;
		while (bf * aw < bp * av) {
			aw++;
			if ((bf * aw * aw + bp * (av - 0.5) * (av - 0.5) - bp * bf) >= 0) {
				av--
			}
			if (aw == 1 && av != bc) {
				aN = bg + bc - 1;
				aL = bg - bc;
				ac = 1;
				aB = ac;
				aA = ac;
				az = ac;
				ax = ac;
				a4 = T;
				if (ao >= 0 && ao < 180 && ba >= 0 && ba < 180) {
					ar(true);
					if (ba <= ao) {
						ar(false)
					}
				} else {
					if (ao >= 180 && ao < 360 && ba >= 180 && ba <= 360) {
						ar(false);
						if (ba <= ao) {
							ar(true)
						}
					} else {
						ar(true);
						ar(false)
					}
				}
			} else {
				if (av != bc) {
					aN = bg + bc;
					aL = bg - bc;
					ac = 2 * (aw - 1) + 1;
					aB = ac;
					aA = ac;
					az = ac;
					ax = ac;
					a4 = T - aw + 1;
					if (ao >= 0 && ao < 180 && ba >= 0 && ba < 180) {
						ar(true);
						if (ba <= ao) {
							ar(false)
						}
					} else {
						if (ao >= 180 && ao < 360 && ba >= 180 && ba <= 360) {
							ar(false);
							if (ba <= ao) {
								ar(true)
							}
						} else {
							ar(true);
							ar(false)
						}
					}
					bc = av;
					bm = aw
				}
			}
			if (bf * aw >= bp * av) {
				aN = bg + bc;
				aL = bg - bc;
				ac = 2 * aw + 1;
				aB = ac;
				aA = ac;
				az = ac;
				ax = ac;
				a4 = T - aw;
				if (ao >= 0 && ao < 180 && ba >= 0 && ba < 180) {
					ar(true);
					if (ba <= ao) {
						ar(false)
					}
				} else {
					if (ao >= 180 && ao < 360 && ba >= 180 && ba <= 360) {
						ar(false);
						if (ba <= ao) {
							ar(true)
						}
					} else {
						ar(true);
						ar(false)
					}
				}
			}
		}
		bm = aw;
		bc = av;
		V = 1;
		aN = bg + av;
		aL = bg - av;
		ac = 2 * aw + 1;
		aB = ac;
		aA = ac;
		az = ac;
		ax = ac;
		a4 = T - aw;
		if (ao >= 0 && ao < 180 && ba >= 0 && ba < 180) {
			xDataArrayEa.pop();
			be(true, true);
			if (ba <= ao) {
				be(false, true)
			}
		} else {
			if (ao >= 180 && ao < 360 && ba >= 180 && ba <= 360) {
				xDataArrayEa.pop();
				if (av != 0) {
					be(false, true)
				}
				if (ba <= ao) {
					be(true, true)
				}
			} else {
				if (ao >= 180 && ao < 360) {
					xDataArraySa.pop()
				} else {
					xDataArrayEa.pop()
				}
				be(true, true);
				if (av != 0) {
					a4 = T - aw;
					be(false, true)
				}
			}
		}
		while (av != 0) {
			av--;
			if ((bf * (aw + 0.5) * (aw + 0.5) + bp * av * av - bp * bf) <= 0) {
				aw++
			}
			aN = bg + av;
			aL = bg - av;
			ac = 2 * aw + 1;
			aB = ac;
			aA = ac;
			az = ac;
			ax = ac;
			a4 = T - aw;
			if (ao >= 0 && ao < 180 && ba >= 0 && ba < 180) {
				be(true);
				if (ba <= ao) {
					be(false)
				}
			} else {
				if (ao >= 180 && ao < 360 && ba >= 180 && ba <= 360) {
					if (av != 0) {
						be(false)
					}
					if (ba <= ao) {
						be(true)
					}
				} else {
					be(true);
					if (av != 0) {
						a4 = T - aw;
						be(false)
					}
				}
			}
		}
		aF.innerHTML = ag.join("");
		return aF;
		function be(bt, bv) {
			var bx;
			var bq, bq;
			var bu = ac;
			var bs = ac;
			var br = false;
			var bw = false;
			var by;
			if (bt) {
				var bi = false;
				var ai = false;
				bx = aN;
				bq = xDataArraySa;
				xDataArray2 = xDataArrayEa;
				saDvar = ao;
				eaDvar = ba
			} else {
				var a2 = false;
				var bz = false;
				bx = aL;
				xDataArray2 = xDataArraySa;
				bq = xDataArrayEa;
				saDvar = 360 - ba;
				eaDvar = 360 - ao
			}
			if (eaDvar > saDvar) {
				if (xDataArray2[bx] != null && a4 + ac >= xDataArray2[bx].xMin
						&& a4 <= xDataArray2[bx].xMin) {
					aY = xDataArray2[bx].xMin;
					if (bq[bx] != null && a4 + ac >= bq[bx].xMax + 1
							&& a4 <= bq[bx].xMax + 1) {
						af = bq[bx].xMax + 1;
						bu = af - aY
					} else {
						bu = a4 + ac - aY
					}
					a4 = aY;
					br = true
				} else {
					if (bq[bx] != null && a4 + ac >= bq[bx].xMax + 1
							&& a4 <= bq[bx].xMax + 1) {
						af = bq[bx].xMax + 1;
						bu = af - a4;
						br = true
					} else {
						if (eaDvar > 90 && saDvar < 90) {
							br = true
						}
					}
				}
			} else {
				if (bq[bx] != null && a4 + ac >= bq[bx].xMax + 1
						&& a4 <= bq[bx].xMax + 1) {
					af = bq[bx].xMax + 1;
					bu = af - a4;
					br = true
				} else {
					if (eaDvar < 90 && saDvar < 90) {
						br = true
					}
				}
				if (xDataArray2[bx] != null && a4 + ac >= xDataArray2[bx].xMin
						&& a4 <= xDataArray2[bx].xMin) {
					a3 = xDataArray2[bx].xMin;
					bs = ac - xDataArray2[bx].xMin + a4;
					bw = true
				} else {
					if (eaDvar > 90 && saDvar > 90) {
						a3 = a4;
						bs = ac;
						bw = true
					}
				}
			}
			if (bt) {
				if (br) {
					bi = true
				}
				if (bw) {
					ai = true
				}
				aB = bu;
				az = bs
			} else {
				if (br) {
					a2 = true
				}
				if (bw) {
					bz = true
				}
				aA = bu;
				ax = bs
			}
			if (ao >= 0 && ao < 180 && ba >= 0 && ba < 180 && ao > ba) {
				a2 = true
			} else {
				if (ao >= 180 && ao < 360 && ba >= 180 && ba < 360 && ao > ba) {
					bi = true
				}
			}
			if (bi) {
				if (aP[aN - bg] != null && a4 != null) {
					if (T + aP[aN - bg] <= a4 + aB) {
						if (aB > a4 + aB - T - aP[aN - bg]) {
							aZ = T + aP[aN - bg];
							aI = a4 + aB - T - aP[aN - bg]
						}
					} else {
						aZ = null
					}
					if (a4 <= T - aP[aN - bg] + 1) {
						if (aB > T - aP[aN - bg] - a4 + 1) {
							aB = T - aP[aN - bg] - a4 + 1
						}
					} else {
						if (aB >= a4 + aB - T - aP[aN - bg] + 1) {
							a4 = null
						}
					}
				}
			}
			if (ai) {
				if (aP[aN - bg] != null && a3 != null) {
					if (T + aP[aN - bg] <= a3 + az) {
						if (az > a3 + az - T - aP[aN - bg]) {
							aH = T + aP[aN - bg];
							ab = a3 + az - T - aP[aN - bg]
						}
					} else {
						aH = null
					}
					if (a3 <= T - aP[aN - bg] + 1) {
						if (az > T - aP[aN - bg] - a3 + 1) {
							az = T - aP[aN - bg] - a3 + 1
						}
					} else {
						if (az >= a3 + az - T - aP[aN - bg] + 1) {
							a3 = null
						}
					}
				}
			}
			if (a2) {
				if (aP[aN - bg] != null && a4 != null) {
					if (T + aP[aN - bg] <= a4 + aA) {
						if (aA > a4 + aA - T - aP[aN - bg]) {
							aZ = T + aP[aN - bg];
							ap = a4 + aA - T - aP[aN - bg]
						}
					} else {
						aZ = null
					}
					if (a4 <= T - aP[aN - bg] + 1) {
						if (aA > T - aP[aN - bg] - a4 + 1) {
							aA = T - aP[aN - bg] - a4 + 1
						}
					} else {
						if (aA >= a4 + aA - T - aP[aN - bg] + 1) {
							a4 = null
						}
					}
				}
			}
			if (bz) {
				if (aP[aN - bg] != null && a3 != null) {
					if (T + aP[aN - bg] <= a3 + ax) {
						if (ax > a3 + ax - T - aP[aN - bg]) {
							aH = T + aP[aN - bg];
							bo = a3 + ax - T - aP[aN - bg]
						}
					} else {
						aH = null
					}
					if (a3 <= T - aP[aN - bg] + 1) {
						if (ax > T - aP[aN - bg] - a3 + 1) {
							ax = T - aP[aN - bg] - a3 + 1
						}
					} else {
						if (ax >= a3 + ax - T - aP[aN - bg] + 1) {
							a3 = null
						}
					}
				}
			}
			if (a3 == null) {
				a3 = ""
			}
			if (a4 == null) {
				a4 = ""
			}
			if (!bv) {
				if (bt) {
					if (aw != aX || aJ != a4 || aa != aZ || aG != a3
							|| ad != aH || aB != aE || az != Y || aI != aC
							|| ab != at) {
						V = aW - av;
						if (U) {
							if (aG != null && aG != "") {
								ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
										+ aG
										+ "px;top:"
										+ (aN + 1)
										+ "px;width:"
										+ Y
										+ "px;height:"
										+ V
										+ "px;background-color:"
										+ aT
										+ '"></DIV>'
							}
							if (ad != null && ad != "") {
								ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
										+ ad
										+ "px;top:"
										+ (aN + 1)
										+ "px;width:"
										+ at
										+ "px;height:"
										+ V
										+ "px;background-color:"
										+ aT
										+ '"></DIV>'
							}
						}
						if (au) {
							if (aJ != null && aJ != "") {
								ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
										+ aJ
										+ "px;top:"
										+ (aN + 1)
										+ "px;width:"
										+ aE
										+ "px;height:"
										+ V
										+ "px;background-color:"
										+ aT
										+ '"></DIV>'
							}
							if (aa != null && aa != "") {
								ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
										+ aa
										+ "px;top:"
										+ (aN + 1)
										+ "px;width:"
										+ aC
										+ "px;height:"
										+ V
										+ "px;background-color:"
										+ aT
										+ '"></DIV>'
							}
						}
						if (au || U) {
							aJ = a4;
							aa = aZ;
							au = bi;
							U = ai;
							aX = aw;
							aW = av;
							aE = aB;
							Y = az;
							aG = a3;
							ad = aH;
							aC = aI;
							at = ab
						}
					}
				} else {
					if (aw != a7 || aV != a4 || bj != aZ || aS != a3
							|| aA != al || ap != ay || ax != bn || bo != aq) {
						V = a6 - av;
						if (bh) {
							if (aS != null && aS != "") {
								ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
										+ aS
										+ "px;top:"
										+ (aL - V)
										+ "px;width:"
										+ bn
										+ "px;height:"
										+ V
										+ "px;background-color:"
										+ aT
										+ '"></DIV>'
							}
							if (bk != null && bk != "") {
								ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
										+ bk
										+ "px;top:"
										+ (aL - V)
										+ "px;width:"
										+ aq
										+ "px;height:"
										+ V
										+ "px;background-color:"
										+ aT
										+ '"></DIV>'
							}
						}
						if (ah) {
							if (aV != null && aV != "") {
								ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
										+ aV
										+ "px;top:"
										+ (aL - V)
										+ "px;width:"
										+ al
										+ "px;height:"
										+ V
										+ "px;background-color:"
										+ aT
										+ '"></DIV>'
							}
							if (bj != null && bj != "") {
								ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
										+ bj
										+ "px;top:"
										+ (aL - V)
										+ "px;width:"
										+ ay
										+ "px;height:"
										+ V
										+ "px;background-color:"
										+ aT
										+ '"></DIV>'
							}
						}
						if (ah || bh) {
							aV = a4;
							bj = aZ;
							ah = a2;
							bh = bz;
							a7 = aw;
							a6 = av;
							al = aA;
							bn = ax;
							aS = a3;
							bk = aH;
							ay = ap;
							aq = bo
						}
					}
				}
			}
			if (bv) {
				if (bt) {
					au = bi;
					U = ai;
					if (au) {
						aJ = a4;
						aa = aZ
					}
					if (U) {
						aG = a3;
						ad = aH
					}
					if (au || U) {
						aW = av;
						aX = aw
					} else {
						aW = 0;
						aX = 0
					}
					aE = aB;
					Y = az;
					aC = aI;
					at = ab
				} else {
					ah = a2;
					bh = bz;
					if (ah) {
						aV = a4;
						bj = aZ
					}
					if (bh) {
						aS = a3;
						bk = aH
					}
					if (ah || bh) {
						a6 = av;
						a7 = aw
					} else {
						a6 = 0;
						a7 = 0
					}
					al = aA;
					bn = ax;
					ay = ap;
					aq = bo
				}
			}
			if (!bt) {
				ah = a2;
				bh = bz
			} else {
				au = bi;
				U = ai
			}
			if (av == 1 && !bt) {
				V = a6 - av + 1;
				if (bz) {
					if (a3 != "") {
						ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ a3
								+ "px;top:"
								+ (aL + 1 - V)
								+ "px;width:"
								+ ax
								+ "px;height:"
								+ V
								+ "px;background-color:" + aT + '"></DIV>'
					}
					if (aH != null) {
						ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ aH
								+ "px;top:"
								+ (aL + 1 - V)
								+ "px;width:"
								+ bo
								+ "px;height:"
								+ V
								+ "px;background-color:" + aT + '"></DIV>'
					}
				}
				if (a2) {
					if (a4 != "") {
						ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ a4
								+ "px;top:"
								+ (aL + 1 - V)
								+ "px;width:"
								+ aA
								+ "px;height:"
								+ V
								+ "px;background-color:" + aT + '"></DIV>'
					}
					if (aZ != null) {
						ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ aZ
								+ "px;top:"
								+ (aL + 1 - V)
								+ "px;width:"
								+ ap
								+ "px;height:"
								+ V
								+ "px;background-color:" + aT + '"></DIV>'
					}
				}
			}
			if (av == 0 && bt) {
				V = aW - av + 1;
				if (ai) {
					if (a3 != "") {
						ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ a3
								+ "px;top:"
								+ aN
								+ "px;width:"
								+ az
								+ "px;height:"
								+ V
								+ "px;background-color:"
								+ aT + '"></DIV>'
					}
					if (aH != null) {
						ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ aH
								+ "px;top:"
								+ aN
								+ "px;width:"
								+ ab
								+ "px;height:"
								+ V
								+ "px;background-color:"
								+ aT + '"></DIV>'
					}
				}
				if (bi) {
					if (a4 != "") {
						ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ a4
								+ "px;top:"
								+ aN
								+ "px;width:"
								+ aB
								+ "px;height:"
								+ V
								+ "px;background-color:"
								+ aT + '"></DIV>'
					}
					if (aZ != null) {
						ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ aZ
								+ "px;top:"
								+ aN
								+ "px;width:"
								+ aI
								+ "px;height:"
								+ V
								+ "px;background-color:"
								+ aT + '"></DIV>'
					}
				}
			}
		}
		function ar(bt) {
			var bw;
			var bq, bq;
			var bu = ac;
			var bs = ac;
			var br = false;
			var bv = false;
			if (bt) {
				var bi = false;
				var ai = false;
				bw = aN;
				bq = xDataArraySa;
				xDataArray2 = xDataArrayEa;
				saDvar = ao;
				eaDvar = ba
			} else {
				var a2 = false;
				var bx = false;
				bw = aL;
				xDataArray2 = xDataArraySa;
				bq = xDataArrayEa;
				saDvar = 360 - ba;
				eaDvar = 360 - ao
			}
			if (eaDvar > saDvar) {
				if (xDataArray2[bw] != null && a4 + ac >= xDataArray2[bw].xMin
						&& a4 <= xDataArray2[bw].xMin) {
					aY = xDataArray2[bw].xMin;
					if (bq[bw] && a4 + ac >= bq[bw].xMax + 1
							&& a4 <= bq[bw].xMax + 1) {
						af = bq[bw].xMax + 1;
						bu = af - aY
					} else {
						bu = a4 + ac - aY
					}
					a4 = aY;
					br = true
				} else {
					if (bq[bw] != null && a4 + ac >= bq[bw].xMax + 1
							&& a4 <= bq[bw].xMax + 1) {
						af = bq[bw].xMax + 1;
						bu = af - a4;
						br = true
					} else {
						if (eaDvar > 90 && saDvar < 90) {
							br = true
						}
					}
				}
			} else {
				if (bq[bw] != null && a4 + ac >= bq[bw].xMax + 1
						&& a4 <= bq[bw].xMax + 1) {
					af = bq[bw].xMax + 1;
					bu = af - a4;
					br = true
				} else {
					if (eaDvar < 90 && saDvar < 90) {
						br = true
					}
				}
				if (xDataArray2[bw] != null && a4 + ac >= xDataArray2[bw].xMin
						&& a4 <= xDataArray2[bw].xMin) {
					a3 = xDataArray2[bw].xMin;
					bs = ac - xDataArray2[bw].xMin + a4;
					bv = true
				} else {
					if (eaDvar > 90 && saDvar > 90) {
						a3 = a4;
						bs = ac;
						bv = true
					}
				}
			}
			if (bt) {
				if (br) {
					bi = true
				}
				if (bv) {
					ai = true
				}
				aB = bu;
				az = bs
			} else {
				if (br) {
					a2 = true
				}
				if (bv) {
					bx = true
				}
				aA = bu;
				ax = bs
			}
			if (ao >= 0 && ao < 180 && ba >= 0 && ba < 180 && ao > ba) {
				a2 = true
			} else {
				if (ao >= 180 && ao < 360 && ba >= 180 && ba < 360 && ao > ba) {
					bi = true
				}
			}
			if (bi) {
				if (aP[aN - bg] && a4 != null) {
					if (T + aP[aN - bg] <= a4 + aB) {
						if (aB > a4 + aB - T - aP[aN - bg]) {
							aZ = T + aP[aN - bg];
							aI = a4 + aB - T - aP[aN - bg]
						}
					} else {
						aZ = "X"
					}
					if (a4 < T - aP[aN - bg] + 1) {
						if (aB > T - aP[aN - bg] - a4 + 1) {
							aB = T - aP[aN - bg] - a4 + 1
						}
					} else {
						if (aB >= a4 + aB - T - aP[aN - bg] + 1) {
							a4 = "X"
						}
					}
				}
			}
			if (ai) {
				if (aP[aN - bg] && a3 != null) {
					if (T + aP[aN - bg] <= a3 + az) {
						if (az > a3 + az - T - aP[aN - bg]) {
							aH = T + aP[aN - bg];
							ab = a3 + az - T - aP[aN - bg]
						}
					} else {
						aH = "X"
					}
					if (a3 <= T - aP[aN - bg] + 1) {
						if (az > T - aP[aN - bg] - a3 + 1) {
							az = T - aP[aN - bg] - a3 + 1
						}
					} else {
						if (az >= a3 + az - T - aP[aN - bg] + 1) {
							a3 = "X"
						}
					}
				}
			}
			if (a2) {
				if (aP[aN - bg] && a4 != null) {
					if (T + aP[aN - bg] <= a4 + aA) {
						if (aA > a4 + aA - T - ae[aN - bg]) {
							aZ = T + aP[aN - bg];
							ap = a4 + aA - T - aP[aN - bg]
						}
					} else {
						aZ = "X"
					}
					if (a4 <= T - aP[aN - bg] + 1) {
						if (aA > T - aP[aN - bg] - a4 + 1) {
							aA = T - aP[aN - bg] - a4 + 1
						}
					} else {
						if (aA >= a4 + aA - T - aP[aN - bg] + 1) {
							a4 = "X"
						}
					}
				}
			}
			if (bx) {
				if (ae[aN - bg] && a3 != null) {
					if (T + aP[aN - bg] <= a3 + ax) {
						if (ax > a3 + ax - T - aP[aN - bg]) {
							aH = T + aP[aN - bg];
							bo = a3 + ax - T - aP[aN - bg]
						}
					} else {
						aH = "X"
					}
					if (a3 <= T - aP[aN - bg] + 1) {
						if (ax > T - aP[aN - bg] - a3 + 1) {
							ax = T - aP[aN - bg] - a3 + 1
						}
					} else {
						if (ax >= a3 + ax - T - aP[aN - bg] + 1) {
							a3 = "X"
						}
					}
				}
			}
			if (a3 == null) {
				a3 = "X"
			}
			if (a4 == null) {
				a4 = "X"
			}
			if (aH == null) {
				aH = "X"
			}
			if (aZ == null) {
				aZ = "X"
			}
			if (bt) {
				V = 1;
				if (ai) {
					if (a3 != "X") {
						ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ a3
								+ "px;top:"
								+ aN
								+ "px;width:"
								+ az
								+ "px;height:"
								+ V
								+ "px;background-color:"
								+ aT + '"></DIV>'
					}
					if (aH != "X") {
						ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ aH
								+ "px;top:"
								+ aN
								+ "px;width:"
								+ ab
								+ "px;height:"
								+ V
								+ "px;background-color:"
								+ aT + '"></DIV>'
					}
				}
				if (bi) {
					if (a4 != "X") {
						ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ a4
								+ "px;top:"
								+ aN
								+ "px;width:"
								+ aB
								+ "px;height:"
								+ V
								+ "px;background-color:"
								+ aT + '"></DIV>'
					}
					if (aZ != "X") {
						ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ aZ
								+ "px;top:"
								+ aN
								+ "px;width:"
								+ aI
								+ "px;height:"
								+ V
								+ "px;background-color:"
								+ aT + '"></DIV>'
					}
				}
			} else {
				V = 1;
				if (bx) {
					if (a3 != "X") {
						ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ a3
								+ "px;top:"
								+ (aL + 1 - V)
								+ "px;width:"
								+ ax
								+ "px;height:"
								+ V
								+ "px;background-color:" + aT + '"></DIV>'
					}
					if (aH != "X") {
						ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ aH
								+ "px;top:"
								+ (aL + 1 - V)
								+ "px;width:"
								+ bo
								+ "px;height:"
								+ V
								+ "px;background-color:" + aT + '"></DIV>'
					}
				}
				if (a2) {
					if (a4 != "X") {
						ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ a4
								+ "px;top:"
								+ (aL + 1 - V)
								+ "px;width:"
								+ aA
								+ "px;height:"
								+ V
								+ "px;background-color:" + aT + '"></DIV>'
					}
					if (aZ != "X") {
						ag[ag.length] = '<DIV style="position:absolute;overflow:hidden;left:'
								+ aZ
								+ "px;top:"
								+ (aL + 1 - V)
								+ "px;width:"
								+ ap
								+ "px;height:"
								+ V
								+ "px;background-color:" + aT + '"></DIV>'
					}
				}
			}
		}
	}
	function O(V, U) {
		if (!V || !U) {
			return false
		}
		var W = m.appendChild(document.createElement("div"));
		for ( var T = 1; T < U.length; T++) {
			W.appendChild(this.drawLine(V, U[T - 1], U[T]))
		}
		return W
	}
	function n(V, U) {
		if (!V || !U) {
			return false
		}
		var W = m.appendChild(document.createElement("div"));
		var T;
		for (T = 1; T < U.length; T++) {
			W.appendChild(this.drawLine(V, U[T - 1], U[T]))
		}
		W.appendChild(this.drawLine(V, U[T - 1], U[0]))
	}
	function h(ak, an) {
		if (!ak || !an) {
			return false
		}
		var ab = new Array();
		var ao;
		for (ao = 0; ao < an.length; ao++) {
			ab[ao] = M(an[ao])
		}
		var V = m.appendChild(document.createElement("div"));
		var ac = new Array();
		var W = ak.getHex();
		var af = new Array();
		var T = ab[0].y;
		var U = ab[0].y;
		var ar = new Array();
		var aj, ah, ag;
		var ad;
		ad = ab.length;
		for (ao = 0; ao < ab.length; ao++) {
			if (ao != 0) {
				ah = ao - 1
			} else {
				ah = ad - 1
			}
			if (!(ab[ah].x == ab[ao].x && ab[ah].y == ab[ao].y)) {
				ar[ar.length] = ab[ao]
			}
		}
		ab = ar;
		ar = new Array();
		ad = ab.length;
		for (ao = 0; ao < ab.length; ao++) {
			if (ao != 0) {
				ah = ao - 1
			} else {
				ah = ad - 1
			}
			if (ao != ad - 1) {
				ag = ao + 1
			} else {
				ag = 0
			}
			if (!(ab[ao].y == ab[ag].y && ab[ao].y == ab[ah].y)) {
				ar[ar.length] = ab[ao]
			} else {
				if (ab[ah].x <= ab[ao].x) {
					ac[ac.length] = '<DIV style="position:absolute;height:1px;overflow:hidden;left:';
					ac[ac.length] = ab[ah].x;
					ac[ac.length] = "px;top:";
					ac[ac.length] = ab[ao].y;
					ac[ac.length] = "px;width:";
					ac[ac.length] = ab[ao].x - ab[ah].x;
					ac[ac.length] = "px;background-color:";
					ac[ac.length] = W;
					ac[ac.length] = '"></DIV>'
				} else {
					ac[ac.length] = '<DIV style="position:absolute;height:1px;overflow:hidden;left:';
					ac[ac.length] = ab[ao].x;
					ac[ac.length] = "px;top:";
					ac[ac.length] = ab[ao].y;
					ac[ac.length] = "px;width:";
					ac[ac.length] = ab[ah].x - ab[ao].x;
					ac[ac.length] = "px;background-color:";
					ac[ac.length] = W;
					ac[ac.length] = '"></DIV>'
				}
			}
		}
		ab = ar;
		for (ao = 1; ao < ab.length; ao++) {
			if (T > ab[ao - 1].y) {
				T = ab[ao - 1].y
			}
			if (U < ab[ao - 1].y) {
				U = ab[ao - 1].y
			}
			af[ao - 1] = o(ab[ao - 1], ab[ao]);
			if (ao < ab.length - 1) {
				if ((ab[ao - 1].y < ab[ao].y && ab[ao].y < ab[ao + 1].y)
						|| (ab[ao - 1].y > ab[ao].y && ab[ao].y > ab[ao + 1].y)) {
					af[ao - 1][ab[ao].y] = null
				}
			} else {
				if ((ab[ao - 1].y < ab[ao].y && ab[ao].y < ab[0].y)
						|| (ab[ao - 1].y > ab[ao].y && ab[ao].y > ab[0].y)) {
					af[ao - 1][ab[ao].y] = null
				}
			}
		}
		if (T > ab[ao - 1].y) {
			T = ab[ao - 1].y
		}
		if (U < ab[ao - 1].y) {
			U = ab[ao - 1].y
		}
		af[ao - 1] = o(ab[ao - 1], ab[0]);
		if ((ab[ao - 1].y < ab[0].y && ab[0].y < ab[1].y)
				|| (ab[ao - 1].y > ab[0].y && ab[0].y > ab[1].y)) {
			af[ao - 1][ab[0].y] = null
		}
		var aa;
		var X = "";
		var am;
		ad = ab.length;
		var ai;
		var aq, at;
		var Z, Y, ap;
		for (aa = T; aa <= U; aa++) {
			am = 0;
			var ae = new Array();
			for (ao = 0; ao < ad; ao++) {
				ai = af[ao];
				if (ao != 0) {
					ah = ao - 1
				} else {
					ah = ad - 1
				}
				if (ao != 1 && ao != 0) {
					aj = ao - 2
				} else {
					if (ao == 0) {
						aj = ad - 2
					} else {
						aj = ad - 1
					}
				}
				if (ao != ad - 1) {
					ag = ao + 1
				} else {
					ag = 0
				}
				if ((aa == ab[ao].y && aa == ab[ah].y && aa < ab[aj].y
						&& aa < ab[ag].y && ai[aa])
						|| (aa == ab[ao].y && aa == ab[ah].y && aa > ab[aj].y
								&& aa > ab[ag].y && ai[aa])) {
					ae[am] = ai[aa];
					am++
				}
				if (ai[aa]) {
					ae[am] = ai[aa];
					am++
				}
			}
			ae.sort(al);
			Y = aa;
			for (ao = 0; ao < ae.length; ao += 2) {
				if (ae[ao + 1]) {
					Z = ae[ao].xMin;
					if (ae[ao + 1].xMax > ae[ao].xMax) {
						ap = ae[ao + 1].xMax - ae[ao].xMin + 1
					} else {
						ap = ae[ao].xMax - ae[ao].xMin + 1
					}
				} else {
					Z = ae[ae.length - 1].xMin;
					ap = ae[ae.length - 1].xMax - ae[ae.length - 1].xMin + 1
				}
				ac[ac.length] = '<DIV style="position:absolute;height:1px;overflow:hidden;left:';
				ac[ac.length] = Z;
				ac[ac.length] = "px;top:";
				ac[ac.length] = Y;
				ac[ac.length] = "px;width:";
				ac[ac.length] = ap;
				ac[ac.length] = "px;background-color:";
				ac[ac.length] = W;
				ac[ac.length] = '"></DIV>'
			}
		}
		V.innerHTML = ac.join("");
		return V;
		function al(av, au) {
			return av.xMin - au.xMin
		}
	}
	function r(aB, ao) {
		if (!aB || !ao) {
			return false
		}
		var Z = new Array();
		var aA;
		for (aA = 0; aA < ao.length; aA++) {
			Z[aA] = M(ao[aA])
		}
		if (Z.length > 4) {
			Z = new Array(Z[0], Z[1], Z[2], Z[3])
		} else {
			if (Z.length < 4) {
				return false
			}
		}
		var aE = m.appendChild(document.createElement("div"));
		var al = new Array();
		var aC = Z[0].x;
		var ae = Z[0].x;
		for (aA = 1; aA < Z.length; aA++) {
			if (aC > Z[aA - 1].x) {
				aC = Z[aA - 1].x
			}
			if (ae < Z[aA - 1].x) {
				ae = Z[aA - 1].x
			}
		}
		var av, ag, W, ax, ar, af, V, aw;
		av = Z[0].x;
		ar = Z[0].y;
		ag = Z[1].x;
		af = Z[1].y;
		W = Z[2].x;
		V = Z[2].y;
		ax = Z[3].x;
		aw = Z[3].y;
		var aq, ap, X, au;
		var an = av - 1;
		var ad = ar - 1;
		var ak, ac;
		au = 0;
		var aD = 1;
		var ah = parseInt(aB.width);
		var ai = aB.color.getHex();
		var at = ah;
		var aj = ah;
		ak = av;
		ac = ar;
		var am = false;
		var Y = false;
		var az = 1.1;
		var ay = new Array();
		var aG, aF, ab, aa;
		aG = ac;
		aF = ac;
		ab = ak;
		aa = ak;
		while (au <= 1) {
			aq = 0;
			ap = 0;
			aq = (1 - au) * (1 - au) * (1 - au) * av + 3 * (1 - au) * (1 - au)
					* au * ag + 3 * (1 - au) * au * au * W + au * au * au * ax;
			ap = (1 - au) * (1 - au) * (1 - au) * ar + 3 * (1 - au) * (1 - au)
					* au * af + 3 * (1 - au) * au * au * V + au * au * au * aw;
			aq = Math.round(aq);
			ap = Math.round(ap);
			if (aq != an || ap != ad) {
				if (aq - an > 1 || ap - ad > 1 || an - aq > 1 || ad - ap > 1) {
					au -= aD;
					aD = aD / az
				} else {
					ay[ay.length] = new jsPoint(aq, ap);
					an = aq;
					ad = ap
				}
			} else {
				au -= aD;
				aD = aD * az
			}
			au += aD
		}
		var U = new Array();
		for ( var aA = 0; aA < ay.length; aA++) {
			var T = false;
			aq = ay[aA].x;
			ap = ay[aA].y;
			if (aA != 0 && aA + 1 < ay.length) {
				if (Math.abs(ay[aA - 1].x - ay[aA + 1].x) == 1
						&& Math.abs(ay[aA - 1].y - ay[aA + 1].y) == 1) {
					if (!U[aA - 1]) {
						T = true;
						U[aA] = true
					}
				}
			}
			if (!T) {
				if (ap == ac && !Y) {
					am = true
				}
				if (aq == ak && !am) {
					Y = true
				}
				if (aq != ak && !am) {
					if (aF == aG) {
						al[al.length] = '<DIV style="position:absolute;overflow:hidden;left:';
						al[al.length] = ak;
						al[al.length] = "px;top:";
						al[al.length] = aG;
						al[al.length] = "px;width:";
						al[al.length] = ah;
						al[al.length] = "px;height:";
						al[al.length] = ah;
						al[al.length] = "px;background-color:";
						al[al.length] = ai;
						al[al.length] = '"></DIV>'
					} else {
						al[al.length] = '<DIV style="position:absolute;overflow:hidden;left:';
						al[al.length] = ak;
						al[al.length] = "px;top:";
						al[al.length] = aG;
						al[al.length] = "px;width:";
						al[al.length] = ah;
						al[al.length] = "px;height:";
						al[al.length] = aF - aG + ah;
						al[al.length] = "px;background-color:";
						al[al.length] = ai;
						al[al.length] = '"></DIV>'
					}
					ak = aq;
					ac = ap;
					aG = ac;
					aF = ac;
					Y = false
				}
				if (ap != ac && !Y) {
					if (aa == ab) {
						al[al.length] = '<DIV style="position:absolute;overflow:hidden;left:';
						al[al.length] = ab;
						al[al.length] = "px;top:";
						al[al.length] = ac;
						al[al.length] = "px;width:";
						al[al.length] = ah;
						al[al.length] = "px;height:";
						al[al.length] = ah;
						al[al.length] = "px;background-color:";
						al[al.length] = ai;
						al[al.length] = '"></DIV>'
					} else {
						al[al.length] = '<DIV style="position:absolute;overflow:hidden;left:';
						al[al.length] = ab;
						al[al.length] = "px;top:";
						al[al.length] = ac;
						al[al.length] = "px;width:";
						al[al.length] = aa - ab + ah;
						al[al.length] = "px;height:";
						al[al.length] = ah;
						al[al.length] = "px;background-color:";
						al[al.length] = ai;
						al[al.length] = '"></DIV>'
					}
					ak = aq;
					ac = ap;
					ab = ak;
					aa = ak;
					am = false
				}
				if (Y && !am) {
					if (ap <= aG) {
						aG = ap
					}
					if (ap > aF) {
						aF = ap
					}
				} else {
					aG = ap;
					aF = ap
				}
				if (am && !Y) {
					if (aq <= ab) {
						ab = aq
					}
					if (aq > aa) {
						aa = aq
					}
				} else {
					ab = aq;
					aa = aq
				}
				if (aA == ay.length - 1) {
					if (!Y) {
						if (aa == ab) {
							al[al.length] = '<DIV style="position:absolute;overflow:hidden;left:';
							al[al.length] = ab;
							al[al.length] = "px;top:";
							al[al.length] = ac;
							al[al.length] = "px;width:";
							al[al.length] = ah;
							al[al.length] = "px;height:";
							al[al.length] = ah;
							al[al.length] = "px;background-color:";
							al[al.length] = ai;
							al[al.length] = '"></DIV>'
						} else {
							al[al.length] = '<DIV style="position:absolute;overflow:hidden;left:';
							al[al.length] = ab;
							al[al.length] = "px;top:";
							al[al.length] = ac;
							al[al.length] = "px;width:";
							al[al.length] = aa - ab + ah;
							al[al.length] = "px;height:";
							al[al.length] = ah;
							al[al.length] = "px;background-color:";
							al[al.length] = ai;
							al[al.length] = '"></DIV>'
						}
					}
					if (!am) {
						if (aF == aG) {
							al[al.length] = '<DIV style="position:absolute;overflow:hidden;left:';
							al[al.length] = ak;
							al[al.length] = "px;top:";
							al[al.length] = aG;
							al[al.length] = "px;width:";
							al[al.length] = ah;
							al[al.length] = "px;height:";
							al[al.length] = ah;
							al[al.length] = "px;background-color:";
							al[al.length] = ai;
							al[al.length] = '"></DIV>'
						} else {
							al[al.length] = '<DIV style="position:absolute;overflow:hidden;left:';
							al[al.length] = ak;
							al[al.length] = "px;top:";
							al[al.length] = aG;
							al[al.length] = "px;width:";
							al[al.length] = aa - ab + ah;
							al[al.length] = "px;height:";
							al[al.length] = aF - aG + ah;
							al[al.length] = "px;background-color:";
							al[al.length] = ai;
							al[al.length] = '"></DIV>'
						}
					}
				}
			}
		}
		aE.innerHTML = al.join("");
		return aE
	}
	function Q(ay, an) {
		if (!ay || !an) {
			return false
		}
		if (an.length < 2) {
			return false
		}
		var X = new Array();
		for ( var ax = 0; ax < an.length; ax++) {
			X[ax] = M(an[ax])
		}
		var aA = m.appendChild(document.createElement("div"));
		var ak = new Array();
		var aC = new Array();
		var aB = new Array();
		var au = X.length - 1;
		for ( var ax = 0; ax <= au; ax++) {
			aC[ax] = X[ax].x * V(au) / (V(ax) * V(au - ax));
			aB[ax] = X[ax].y * V(au) / (V(ax) * V(au - ax))
		}
		var am = X[0].x - 1;
		var ab = X[0].y - 1;
		var aj, aa;
		t = 0;
		var az = 1;
		var ae = parseInt(ay.width);
		var af = ay.color.getHex();
		var aq = ae;
		var ah = ae;
		aj = X[0].x;
		aa = X[0].y;
		var al = false;
		var W = false;
		var ad = 0;
		var ag;
		var ai = 0;
		var ap;
		var ao;
		var aw;
		var ar, ac;
		var av = 1.1;
		var at = new Array();
		var aE, aD, Z, Y;
		aE = aa;
		aD = aa;
		Z = aj;
		Y = aj;
		while (t <= 1) {
			ap = 0;
			ao = 0;
			for ( var ax = 0; ax <= au; ax++) {
				ai = Math.pow(1 - t, au - ax) * Math.pow(t, ax);
				ap = ap + aC[ax] * ai;
				ao = ao + aB[ax] * ai
			}
			var ar;
			var ac;
			ar = ap;
			ac = ao;
			ap = Math.round(ap);
			ao = Math.round(ao);
			if (ap != am || ao != ab) {
				if (ap - am > 1 || ao - ab > 1 || am - ap > 1 || ab - ao > 1) {
					t -= az;
					az = az / av
				} else {
					at[at.length] = new jsPoint(ap, ao);
					am = ap;
					ab = ao
				}
			} else {
				t -= az;
				az = az * av
			}
			t += az
		}
		var U = new Array();
		for ( var ax = 0; ax < at.length; ax++) {
			var T = false;
			ap = at[ax].x;
			ao = at[ax].y;
			if (ax != 0 && ax + 1 < at.length) {
				if (Math.abs(at[ax - 1].x - at[ax + 1].x) == 1
						&& Math.abs(at[ax - 1].y - at[ax + 1].y) == 1) {
					if (!U[ax - 1]) {
						T = true;
						U[ax] = true
					}
				}
			}
			if (!T) {
				if (ao == aa && !W) {
					al = true
				}
				if (ap == aj && !al) {
					W = true
				}
				if (ap != aj && !al) {
					if (aD == aE) {
						ak[ak.length] = '<DIV style="position:absolute;overflow:hidden;left:';
						ak[ak.length] = aj;
						ak[ak.length] = "px;top:";
						ak[ak.length] = aE;
						ak[ak.length] = "px;width:";
						ak[ak.length] = ae;
						ak[ak.length] = "px;height:";
						ak[ak.length] = ae;
						ak[ak.length] = "px;background-color:";
						ak[ak.length] = af;
						ak[ak.length] = '"></DIV>'
					} else {
						ak[ak.length] = '<DIV style="position:absolute;overflow:hidden;left:';
						ak[ak.length] = aj;
						ak[ak.length] = "px;top:";
						ak[ak.length] = aE;
						ak[ak.length] = "px;width:";
						ak[ak.length] = ae;
						ak[ak.length] = "px;height:";
						ak[ak.length] = aD - aE + ae;
						ak[ak.length] = "px;background-color:";
						ak[ak.length] = af;
						ak[ak.length] = '"></DIV>'
					}
					aj = ap;
					aa = ao;
					aE = aa;
					aD = aa;
					W = false
				}
				if (ao != aa && !W) {
					if (Y == Z) {
						ak[ak.length] = '<DIV style="position:absolute;overflow:hidden;left:';
						ak[ak.length] = Z;
						ak[ak.length] = "px;top:";
						ak[ak.length] = aa;
						ak[ak.length] = "px;width:";
						ak[ak.length] = ae;
						ak[ak.length] = "px;height:";
						ak[ak.length] = ae;
						ak[ak.length] = "px;background-color:";
						ak[ak.length] = af;
						ak[ak.length] = '"></DIV>'
					} else {
						ak[ak.length] = '<DIV style="position:absolute;overflow:hidden;left:';
						ak[ak.length] = Z;
						ak[ak.length] = "px;top:";
						ak[ak.length] = aa;
						ak[ak.length] = "px;width:";
						ak[ak.length] = Y - Z + ae;
						ak[ak.length] = "px;height:";
						ak[ak.length] = ae;
						ak[ak.length] = "px;background-color:";
						ak[ak.length] = af;
						ak[ak.length] = '"></DIV>'
					}
					aj = ap;
					aa = ao;
					Z = aj;
					Y = aj;
					al = false
				}
				if (W && !al) {
					if (ao <= aE) {
						aE = ao
					}
					if (ao > aD) {
						aD = ao
					}
				} else {
					aE = ao;
					aD = ao
				}
				if (al && !W) {
					if (ap <= Z) {
						Z = ap
					}
					if (ap > Y) {
						Y = ap
					}
				} else {
					Z = ap;
					Y = ap
				}
				if (ax == at.length - 1) {
					if (!W) {
						if (Y == Z) {
							ak[ak.length] = '<DIV style="position:absolute;overflow:hidden;left:';
							ak[ak.length] = Z;
							ak[ak.length] = "px;top:";
							ak[ak.length] = aa;
							ak[ak.length] = "px;width:";
							ak[ak.length] = ae;
							ak[ak.length] = "px;height:";
							ak[ak.length] = ae;
							ak[ak.length] = "px;background-color:";
							ak[ak.length] = af;
							ak[ak.length] = '"></DIV>'
						} else {
							ak[ak.length] = '<DIV style="position:absolute;overflow:hidden;left:';
							ak[ak.length] = Z;
							ak[ak.length] = "px;top:";
							ak[ak.length] = aa;
							ak[ak.length] = "px;width:";
							ak[ak.length] = Y - Z + ae;
							ak[ak.length] = "px;height:";
							ak[ak.length] = ae;
							ak[ak.length] = "px;background-color:";
							ak[ak.length] = af;
							ak[ak.length] = '"></DIV>'
						}
					}
					if (!al) {
						if (aD == aE) {
							ak[ak.length] = '<DIV style="position:absolute;overflow:hidden;left:';
							ak[ak.length] = aj;
							ak[ak.length] = "px;top:";
							ak[ak.length] = aE;
							ak[ak.length] = "px;width:";
							ak[ak.length] = ae;
							ak[ak.length] = "px;height:";
							ak[ak.length] = ae;
							ak[ak.length] = "px;background-color:";
							ak[ak.length] = af;
							ak[ak.length] = '"></DIV>'
						} else {
							ak[ak.length] = '<DIV style="position:absolute;overflow:hidden;left:';
							ak[ak.length] = aj;
							ak[ak.length] = "px;top:";
							ak[ak.length] = aE;
							ak[ak.length] = "px;width:";
							ak[ak.length] = Y - Z + ae;
							ak[ak.length] = "px;height:";
							ak[ak.length] = aD - aE + ae;
							ak[ak.length] = "px;background-color:";
							ak[ak.length] = af;
							ak[ak.length] = '"></DIV>'
						}
					}
				}
			}
		}
		aA.innerHTML = ak.join("");
		return aA;
		function V(aH) {
			var aG = 1;
			for ( var aF = 1; aF <= aH; aF++) {
				aG = aG * aF
			}
			return aG
		}
	}
	function j(V, U, T) {
		return this.drawCurve(V, U, T, true)
	}
	function i(Y, ac, ab, T) {
		if (!Y || !ac) {
			return false
		}
		if (!ab) {
			ab = 0
		}
		if (!T) {
			T = false
		}
		var W = new Array();
		for ( var Z = 0; Z < ac.length; Z++) {
			W[Z] = M(ac[Z])
		}
		var ad = new Array();
		if (!T || !(W[0].x == W[W.length - 1].x && W[0].y == W[W.length - 1].y)) {
			ad[ad.length] = W[0]
		}
		for ( var Z = 1; Z < W.length; Z++) {
			if (!(W[Z].x == W[Z - 1].x && W[Z].y == W[Z - 1].y)) {
				ad[ad.length] = W[Z]
			}
		}
		W = ad;
		if (W.length < 2) {
			return false
		} else {
			if (W.length == 2) {
				return this.drawLine(Y, W[0], W[1], "physical")
			}
		}
		var X = m.appendChild(document.createElement("div"));
		var aa = new Array();
		var V = new Array();
		var U = W.length - 1;
		if (!T) {
			for ( var Z = 0; Z <= U - 1; Z++) {
				if (Z == 0) {
					p(new Array(W[0], W[0], W[1], W[2]), ab, V)
				} else {
					if (Z == U - 1) {
						p(new Array(W[U - 2], W[U - 1], W[U], W[U]), ab, V)
					} else {
						p(new Array(W[Z - 1], W[Z], W[Z + 1], W[Z + 2]), ab, V)
					}
				}
			}
			J(Y, V, aa)
		} else {
			for ( var Z = 0; Z <= U - 1; Z++) {
				if (Z == 0) {
					p(new Array(W[U], W[0], W[1], W[2]), ab, V)
				} else {
					if (Z == U - 1) {
						p(new Array(W[U - 2], W[U - 1], W[U], W[0]), ab, V)
					} else {
						p(new Array(W[Z - 1], W[Z], W[Z + 1], W[Z + 2]), ab, V)
					}
				}
			}
			p(new Array(W[U - 1], W[U], W[0], W[1]), ab, V);
			J(Y, V, aa)
		}
		X.innerHTML = aa.join("");
		return X
	}
	function p(aa, af, V) {
		var ae = 0;
		var ad = 0;
		var ac = aa[1].x - 1;
		var W = aa[1].y - 1;
		var ag = 0;
		var ab = 1;
		var X = 1.1;
		var Z = (1 - af) * (aa[2].x - aa[0].x) / 2;
		var U = (1 - af) * (aa[3].x - aa[1].x) / 2;
		var Y = (1 - af) * (aa[2].y - aa[0].y) / 2;
		var T = (1 - af) * (aa[3].y - aa[1].y) / 2;
		while (ag <= 1) {
			ae = 0;
			ad = 0;
			ae = (2 * ag * ag * ag - 3 * ag * ag + 1) * aa[1].x
					+ (ag * ag * ag - 2 * ag * ag + ag) * Z
					+ (-2 * ag * ag * ag + 3 * ag * ag) * aa[2].x
					+ (ag * ag * ag - ag * ag) * U;
			ad = (2 * ag * ag * ag - 3 * ag * ag + 1) * aa[1].y
					+ (ag * ag * ag - 2 * ag * ag + ag) * Y
					+ (-2 * ag * ag * ag + 3 * ag * ag) * aa[2].y
					+ (ag * ag * ag - ag * ag) * T;
			ae = Math.round(ae);
			ad = Math.round(ad);
			if (ae != ac || ad != W) {
				if (ae - ac > 1 || ad - W > 1 || ac - ae > 1 || W - ad > 1) {
					ag -= ab;
					ab = ab / X
				} else {
					V[V.length] = new jsPoint(ae, ad);
					ac = ae;
					W = ad;
					if (ag + ab > 1) {
						ag = 1 - ab
					}
				}
			} else {
				ab = ab * X
			}
			ag += ab
		}
	}
	function J(ak, ab, ae) {
		var ac = ab[0].x;
		var aj = ab[0].y;
		var aa = false;
		var Y = false;
		var ai, ah, V, U;
		ai = ac;
		ah = ac;
		V = aj;
		U = aj;
		var Z = parseInt(ak.width);
		var W = ak.color.getHex();
		var T = Z;
		var ad = Z;
		var X = new Array();
		for ( var ag = 0; ag < ab.length; ag++) {
			var af = false;
			x = ab[ag].x;
			y = ab[ag].y;
			if (ag != 0 && ag + 1 < ab.length) {
				if (Math.abs(ab[ag - 1].x - ab[ag + 1].x) == 1
						&& Math.abs(ab[ag - 1].y - ab[ag + 1].y) == 1) {
					if (!X[ag - 1]) {
						af = true;
						X[ag] = true
					}
				}
			}
			if (!af) {
				if (y == aj && !Y) {
					aa = true
				}
				if (x == ac && !aa) {
					Y = true
				}
				if (x != ac && !aa) {
					if (U == V) {
						ae[ae.length] = '<DIV style="position:absolute;overflow:hidden;left:';
						ae[ae.length] = ac;
						ae[ae.length] = "px;top:";
						ae[ae.length] = V;
						ae[ae.length] = "px;width:";
						ae[ae.length] = Z;
						ae[ae.length] = "px;height:";
						ae[ae.length] = Z;
						ae[ae.length] = "px;background-color:";
						ae[ae.length] = W;
						ae[ae.length] = '"></DIV>'
					} else {
						ae[ae.length] = '<DIV style="position:absolute;overflow:hidden;left:';
						ae[ae.length] = ac;
						ae[ae.length] = "px;top:";
						ae[ae.length] = V;
						ae[ae.length] = "px;width:";
						ae[ae.length] = Z;
						ae[ae.length] = "px;height:";
						ae[ae.length] = U - V + Z;
						ae[ae.length] = "px;background-color:";
						ae[ae.length] = W;
						ae[ae.length] = '"></DIV>'
					}
					ac = x;
					aj = y;
					V = aj;
					U = aj;
					Y = false
				}
				if (y != aj && !Y) {
					if (ah == ai) {
						ae[ae.length] = '<DIV style="position:absolute;overflow:hidden;left:';
						ae[ae.length] = ai;
						ae[ae.length] = "px;top:";
						ae[ae.length] = aj;
						ae[ae.length] = "px;width:";
						ae[ae.length] = Z;
						ae[ae.length] = "px;height:";
						ae[ae.length] = Z;
						ae[ae.length] = "px;background-color:";
						ae[ae.length] = W;
						ae[ae.length] = '"></DIV>'
					} else {
						ae[ae.length] = '<DIV style="position:absolute;overflow:hidden;left:';
						ae[ae.length] = ai;
						ae[ae.length] = "px;top:";
						ae[ae.length] = aj;
						ae[ae.length] = "px;width:";
						ae[ae.length] = ah - ai + Z;
						ae[ae.length] = "px;height:";
						ae[ae.length] = Z;
						ae[ae.length] = "px;background-color:";
						ae[ae.length] = W;
						ae[ae.length] = '"></DIV>'
					}
					ac = x;
					aj = y;
					ai = ac;
					ah = ac;
					aa = false
				}
				if (Y && !aa) {
					if (y <= V) {
						V = y
					}
					if (y > U) {
						U = y
					}
				} else {
					V = y;
					U = y
				}
				if (aa && !Y) {
					if (x <= ai) {
						ai = x
					}
					if (x > ah) {
						ah = x
					}
				} else {
					ai = x;
					ah = x
				}
				if (ag == ab.length - 1) {
					if (!Y) {
						if (ah == ai) {
							ae[ae.length] = '<DIV style="position:absolute;overflow:hidden;left:';
							ae[ae.length] = ai;
							ae[ae.length] = "px;top:";
							ae[ae.length] = aj;
							ae[ae.length] = "px;width:";
							ae[ae.length] = Z;
							ae[ae.length] = "px;height:";
							ae[ae.length] = Z;
							ae[ae.length] = "px;background-color:";
							ae[ae.length] = W;
							ae[ae.length] = '"></DIV>'
						} else {
							ae[ae.length] = '<DIV style="position:absolute;overflow:hidden;left:';
							ae[ae.length] = ai;
							ae[ae.length] = "px;top:";
							ae[ae.length] = aj;
							ae[ae.length] = "px;width:";
							ae[ae.length] = ah - ai + Z;
							ae[ae.length] = "px;height:";
							ae[ae.length] = Z;
							ae[ae.length] = "px;background-color:";
							ae[ae.length] = W;
							ae[ae.length] = '"></DIV>'
						}
					}
					if (!aa) {
						if (U == V) {
							ae[ae.length] = '<DIV style="position:absolute;overflow:hidden;left:';
							ae[ae.length] = ac;
							ae[ae.length] = "px;top:";
							ae[ae.length] = V;
							ae[ae.length] = "px;width:";
							ae[ae.length] = Z;
							ae[ae.length] = "px;height:";
							ae[ae.length] = Z;
							ae[ae.length] = "px;background-color:";
							ae[ae.length] = W;
							ae[ae.length] = '"></DIV>'
						} else {
							ae[ae.length] = '<DIV style="position:absolute;overflow:hidden;left:';
							ae[ae.length] = ac;
							ae[ae.length] = "px;top:";
							ae[ae.length] = V;
							ae[ae.length] = "px;width:";
							ae[ae.length] = ah - ai + Z;
							ae[ae.length] = "px;height:";
							ae[ae.length] = U - V + Z;
							ae[ae.length] = "px;background-color:";
							ae[ae.length] = W;
							ae[ae.length] = '"></DIV>'
						}
					}
				}
			}
		}
	}
	function E(al, ao, Y) {
		if (!al || !ao) {
			return false
		}
		if (!Y) {
			Y = 0
		}
		var ac = new Array();
		for ( var ap = 0; ap < ao.length; ap++) {
			ac[ap] = M(ao[ap])
		}
		var ar = new Array();
		if (!(ac[0].x == ac[ac.length - 1].x && ac[0].y == ac[ac.length - 1].y)) {
			ar[ar.length] = ac[0]
		}
		for ( var ap = 1; ap < ac.length; ap++) {
			if (!(ac[ap].x == ac[ap - 1].x && ac[ap].y == ac[ap - 1].y)) {
				ar[ar.length] = ac[ap]
			}
		}
		ac = ar;
		if (ac.length < 2) {
			return false
		} else {
			if (ac.length == 2) {
				return this.drawLine(pen, ac[0], ac[1], "physical")
			}
		}
		var ag = m.appendChild(document.createElement("div"));
		var ad = new Array();
		var V = al.getHex();
		var aj = new Array();
		var Z = new Array();
		var ae = new Array();
		var T;
		var U;
		var ai = ac.length - 1;
		var ap;
		for ( var ap = 0; ap <= ai - 1; ap++) {
			if (ap == 0) {
				l(new Array(ac[ai], ac[0], ac[1], ac[2]), Y, Z)
			} else {
				if (ap == ai - 1) {
					l(new Array(ac[ai - 2], ac[ai - 1], ac[ai], ac[0]), Y, Z)
				} else {
					l(new Array(ac[ap - 1], ac[ap], ac[ap + 1], ac[ap + 2]), Y,
							Z)
				}
			}
		}
		l(new Array(ac[ai - 1], ac[ai], ac[0], ac[1]), Y, Z);
		var at = q(aj, ae, Z);
		T = at[0];
		U = at[1];
		var ab;
		var ak;
		var W = "";
		var an;
		var af = ac.length;
		var aa, X, aq;
		for (ab = T; ab <= U; ab++) {
			an = 0;
			var ah = aj[ab];
			ah.sort(am);
			X = ab;
			for (ap = 0; ap < ah.length; ap += 2) {
				if (ah[ap + 1]) {
					aa = ah[ap].xMin;
					if (ah[ap + 1].xMax > ah[ap].xMax) {
						aq = ah[ap + 1].xMax - ah[ap].xMin + 1
					} else {
						aq = ah[ap].xMax - ah[ap].xMin + 1
					}
				} else {
					aa = ah[ah.length - 1].xMin;
					aq = ah[ah.length - 1].xMax - ah[ah.length - 1].xMin + 1
				}
				ad[ad.length] = '<DIV style="position:absolute;height:1px;overflow:hidden;left:';
				ad[ad.length] = aa;
				ad[ad.length] = "px;top:";
				ad[ad.length] = X;
				ad[ad.length] = "px;width:";
				ad[ad.length] = aq;
				ad[ad.length] = "px;background-color:";
				ad[ad.length] = V;
				ad[ad.length] = '"></DIV>'
			}
		}
		ag.innerHTML = ad.join("");
		return ag;
		function am(av, au) {
			return av.xMin - au.xMin
		}
	}
	function l(ad, ai, W) {
		var ah = 0;
		var ag = 0;
		var af = ad[1].x - 1;
		var X = ad[1].y - 1;
		var aj = 0;
		var ae = 1;
		var Y = 1.1;
		var ac = 1;
		var V = 1;
		var aa = 1;
		var ab = (1 - ai) * (ad[2].x - ad[0].x) / 2;
		var U = (1 - ai) * (ad[3].x - ad[1].x) / 2;
		var Z = (1 - ai) * (ad[2].y - ad[0].y) / 2;
		var T = (1 - ai) * (ad[3].y - ad[1].y) / 2;
		while (aj <= 1) {
			ah = 0;
			ag = 0;
			ah = (2 * aj * aj * aj - 3 * aj * aj + 1) * ad[1].x
					+ (aj * aj * aj - 2 * aj * aj + aj) * ab
					+ (-2 * aj * aj * aj + 3 * aj * aj) * ad[2].x
					+ (aj * aj * aj - aj * aj) * U;
			ag = (2 * aj * aj * aj - 3 * aj * aj + 1) * ad[1].y
					+ (aj * aj * aj - 2 * aj * aj + aj) * Z
					+ (-2 * aj * aj * aj + 3 * aj * aj) * ad[2].y
					+ (aj * aj * aj - aj * aj) * T;
			ah = Math.round(ah);
			ag = Math.round(ag);
			if (ah != af || ag != X) {
				if (ah - af > 1 || ag - X > 1 || af - ah > 1 || X - ag > 1) {
					aj -= ae;
					ae = ae / Y
				} else {
					W[W.length] = new jsPoint(ah, ag);
					af = ah;
					X = ag;
					if (aj + ae > 1) {
						aj = 1 - ae
					}
				}
			} else {
				ae = ae * Y
			}
			aj += ae
		}
	}
	function q(ai, ae, aa) {
		function X() {
			this.xMax = 0;
			this.xMin = 0;
			this.i = 0
		}
		var W = new Array();
		var T;
		var U;
		var Y;
		var ac;
		var ab = true;
		var Z;
		var ad = -1;
		var ah, af;
		for ( var aj = 0; aj < aa.length; aj++) {
			var ag = false;
			x = aa[aj].x;
			y = aa[aj].y;
			if (aj != 0 && aj + 1 < aa.length) {
				if ((aa[aj - 1].x - aa[aj + 1].x == 1 || aa[aj + 1].x
						- aa[aj - 1].x == 1)
						&& (aa[aj - 1].y - aa[aj + 1].y == 1 || aa[aj + 1].y
								- aa[aj - 1].y == 1)) {
					if (!W[aj - 1]) {
						ag = true;
						W[aj] = true
					}
				}
			}
			if (!ag) {
				if (!ac) {
					ac = y
				}
				if (!T) {
					T = y
				}
				if (!U) {
					U = y
				}
				if (y < T) {
					T = y
				}
				if (y > U) {
					U = y
				}
				if (!ai[y]) {
					ai[y] = new Array();
					ai[y][0] = new X();
					ai[y][0].xMin = x;
					ai[y][0].xMax = x;
					ai[y][0].i = aj
				} else {
					Z = ai[y][ai[y].length - 1];
					if (aj - Z.i == 1) {
						if (Z.xMin > x) {
							Z.xMin = x
						}
						if (Z.xMax < x) {
							Z.xMax = x
						}
						Z.i = aj
					} else {
						ai[y][ai[y].length] = new X();
						ai[y][ai[y].length - 1].xMin = x;
						ai[y][ai[y].length - 1].xMax = x;
						ai[y][ai[y].length - 1].i = aj
					}
				}
				ah = ae[ae.length - 1];
				af = ae[ae.length - 2];
				if (ah && af) {
					if ((ah > y && af < ah) || (ah < y && af > ah)) {
						ai[ah][ai[ah].length] = ai[ah][ai[ah].length - 1]
					}
				}
				if (!ae[0]) {
					ae[0] = y
				} else {
					if (ae[ae.length - 1] != y) {
						ae[ae.length] = y
					}
				}
				Y = y
			}
		}
		ah = ae[0];
		af = ah;
		var aj = 1;
		while (ah == af) {
			af = ae[ae.length - aj];
			aj++
		}
		if (ah && af) {
			if ((ah > ae[1] && af < ah) || (ah < ae[1] && af > ah)) {
				ai[ah][ai[ah].length] = ai[ah][ai[ah].length - 1]
			}
		}
		if (ac == Y) {
			var ak = ai[ac][0];
			var V = ai[Y][ai[Y].length - 1];
			if (V.xMax > ak.xMax) {
				ai[ac][0].xMax = V.xMax
			}
			if (V.xMin < ak.xMin) {
				ai[ac][0].xMin = V.xMin
			}
			if (ai[Y].length > 1) {
				ai[Y].pop()
			} else {
				ai.pop()
			}
		}
		return new Array(T, U)
	}
	function a(Y, T, W, V, X, Z) {
		if (!Y || !T) {
			return false
		}
		phPoint = M(T);
		if (X != null) {
			X = Math.round(X * F) + "px"
		}
		var U = m.appendChild(document.createElement("div"));
		U.style.position = "absolute";
		U.style.left = phPoint.x + "px";
		U.style.top = phPoint.y + "px";
		if (V) {
			U.style.color = V.getHex()
		}
		if (W) {
			if (W.family) {
				U.style.fontFamily = W.family
			}
			if (W.weight) {
				U.style.fontWeight = W.weight
			}
			if (W.size) {
				U.style.fontSize = W.size
			}
			if (W.style) {
				U.style.fontStyle = W.style
			}
			if (W.variant) {
				U.style.fontVariant = W.variant
			}
		}
		if (X) {
			U.style.width = X
		}
		if (Z) {
			U.style.textAlign = Z
		}
		U.innerHTML = Y;
		return U
	}
	function f(W, U, X, T) {
		if (!W || !U) {
			return false
		}
		phPoint = M(U);
		if (X != null) {
			X = Math.round(X * F) + "px"
		}
		if (T != null) {
			T = Math.round(T * F) + "px"
		}
		var Y = m.appendChild(document.createElement("div"));
		Y.style.position = "absolute";
		Y.style.left = phPoint.x + "px";
		Y.style.top = phPoint.y + "px";
		var V = Y.appendChild(document.createElement("img"));
		V.src = W;
		if (X != null) {
			V.style.width = X;
			Y.style.width = X
		}
		if (T != null) {
			V.style.height = T;
			Y.style.height = T
		}
		return Y
	}
	function H() {
		m.innerHTML = ""
	}
};