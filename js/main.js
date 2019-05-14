Date.prototype.format = function (a) {
    var c, b = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    /(y+)/.test(a) && (a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (c in b) new RegExp("(" + c + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length)));
    return a
}, window.TSB = function (a, b, c, d) {
    var e = {
        switchHideShow: function (a, b) {
            a.click(function () {
                b.is(":hidden") ? b.slideDown("fast") : b.slideUp("normal")
            })
        },
        initSwitchCheckBox: function () {
            a(".switch-checkbox")[0] && a(c).find(".switch-checkbox").bootstrapSwitch()
        },
        modalAlert: function (b) {
            var d, e, c = a.extend({
                status: "success",
                msg: "Operation is successful !",
                speed: 2e3
            }, b || {});
            d = "success" == c.status ? '<i class="fa fa-check-circle"></i>' : '<i class="fa fa-times-circle"></i>', e = '<div class="modal-alert" style="display:none;"><div class="alert alert-' + c.status + '">' + d + c.msg + "</div></div>", a(e).appendTo(a("body")).fadeIn().delay(c.speed).fadeOut(function () {
                a(this).remove()
            })
        },
        slider: function (b, c) {
            var e = a(b);
            return a.each(e, function () {
                var e, f, g, h, i, j, k, b = a(this);
                c.start = function (a, b) {
                    "function" == typeof c.startFun && c.startFun.call(this, a, b)
                }, c.slide = function (a, b) {
                    "function" == typeof c.slideFun && c.slideFun.call(this, a, b), c.values != d && k.call(this)
                }, c.change = function (a, b) {
                    "function" == typeof c.changeFun && c.changeFun.call(this, a, b), c.values != d && k.call(this)
                }, c.stop = function (a, b) {
                    "function" == typeof c.stopFun && c.stopFun.call(this, a, b)
                }, e = a(this).attr("js-range"), c.range == d && (c.range = "true" == e ? !0 : e), c.min == d && (c.min = parseInt(a(this).parent("div").find(".slider-widget-range").eq(0).text())), c.max == d && (c.max = parseInt(a(this).parent("div").find(".slider-widget-range").eq(1).text())), c.value == d && c.values == d && (f = a(this).attr("js-target-input"), g = a(this).closest("form"), f.indexOf(",") > 1 ? (h = f.split(","), i = parseInt(g.find('input[name="' + h[0] + '"]').val()), j = parseInt(g.find('input[name="' + h[1] + '"]').val()), c.values = [i, j]) : c.value = parseInt(g.find('input[name="' + f + '"]').val())), b.slider(c), c.values != d && (k = function () {
                    var c = parseInt(b.find(".ui-slider-range")[0].style.width),
                        e = parseInt(b.find(".ui-slider-range")[0].style.left);
                    b.find(".ui-widget-range-left")[0] == d ? a('<div class="ui-widget-range-left" style="width:' + e + '%;"></div>' + '<div class="ui-widget-range-right" style="width:' + (100 - c - e) + '%;"></div>').appendTo(b) : (b.find(".ui-widget-range-left").css("width", e + "%"), b.find(".ui-widget-range-right").css("width", 100 - c - e + "%"))
                }, k())
            })
        },
        initSlider: function () {
            a(".js-ui-slider").each(function () {
                TSB.slider(this, {
                    slideFun: function (b, c) {
                        var f, d = a(this).closest("form"),
                            e = a(this).attr("js-target-input");
                        e.indexOf(",") > 1 ? (f = e.split(","), d.find(".js_data_" + f[0]).text(c.values[0]), d.find('input[name="' + f[0] + '"]').val(c.values[0]), d.find(".js_data_" + f[1]).text(c.values[1]), d.find('input[name="' + f[1] + '"]').val(c.values[1])) : (d.find(".js_data_" + e).text(c.value), d.find('input[name="' + e + '"]').val(c.value), d.find("#" + e).trigger("change"))
                    }
                })
            }), a(".js-ui-slider-with-scale").each(function () {
                var e, b = a(this).closest("form"),
                    c = a(this).attr("js-target-input"),
                    d = b.find('input[name="' + c + '"]').val(),
                    f = new Array,
                    g = new Array;
                a(this).closest("div").parent("div").find(".sacle").each(function (h) {
                    var i = a(this).attr("js-data-scale"),
                        j = a(this).html();
                    f[h + 1] = i, g[h + 1] = j, d == i && (e = h + 1, b.find(".js_data_" + c).text(j))
                }), TSB.slider(this, {
                    min: 1,
                    max: f.length - 1,
                    value: e,
                    slideFun: function (a, d) {
                        if (c.indexOf(",") > 1) {
                            var e = c.split(",");
                            b.find(".js_data_" + e[0]).text(g[d.values[0]]), b.find('input[name="' + e[0] + '"]').val(f[d.values[0]]), b.find(".js_data_" + e[1]).text(g[d.values[1]]), b.find('input[name="' + e[1] + '"]').val(f[d.values[1]])
                        } else b.find(".js_data_" + c).text(g[d.value]), b.find('input[name="' + c + '"]').val(f[d.value])
                    }
                })
            })
        },
        initForm: function (b, c) {
            function e(a) {
                a.find(".switch-checkbox").bootstrapSwitch()
            }
            return c == d ? (e(b), !1) : (b.find("input").each(function (d, e) {
                var g, h, f = a(e).attr("name");
                if (f) {
                    switch (a(e).attr("type")) {
                        case "hidden":
                        case "text":
                        case "select":
                            c.hasOwnProperty(f) && a(e).val(c[f]);
                            break;
                        case "radio":
                            c.hasOwnProperty(f) && b.find('input[name="' + f + '"][value="' + c[f] + '"]').attr("checked", "true");
                            break;
                        case "checkbox":
                            g = f.substring(0, f.length - 2), c.hasOwnProperty(g) && c[g] && a.each(c[g], function (a, c) {
                                b.find('input[name="' + f + '"][value="' + c + '"]').attr("checked", "true")
                            }), c.hasOwnProperty(f) && c[f] && (("status" == f || f.indexOf("_check") > 0) && b.find('input[name="' + f + '"]').val(c[f]), c[f] == app_enum.alert_config_status_normal ? b.find('input[name="' + f + '"]').prop("checked", !0) : b.find('input[name="' + f + '"]').prop("checked", !1))
                    }
                    "[]" != f.substring(f.length - 2, f.length) && (h = b.find(".js_data_" + f), h && h.text(c[f]))
                }
            }), b.find("textarea").each(function (b, d) {
                var e = a(d).attr("name");
                e && c.hasOwnProperty(e) && a(d).html(c[e])
            }), b.find("select").each(function (b, d) {
                var e = a(d).attr("name");
                c.hasOwnProperty(e) && a(d).val(c[e])
            }), e(b), void 0)
        },
        eventManager: {
            events: {},
            addListener: function (a, b, c, d) {
                this.events = this.events || {}, this.events[a] = this.events[a] || [], this.events[a].push({
                    handler: b,
                    scope: c,
                    params: d
                })
            },
            removeListener: function (b, c, d) {
                a.isEmptyObject(this.events) || (this.events[b] = a.grep(this.events[b], function (a) {
                    var b = d || a.scope,
                        e = c || a.handler;
                    return a.scope !== b || a.handler !== e
                }))
            },
            trigger: function (a, b) {
                if (this.events) {
                    var d, e, c = this.events[a];
                    if (!c) return;
                    for (d = 0; e = c[d]; d++)
                        if (e.handler.apply(e.scope || this, b || e.params || []) === !1) return !1
                }
            }
        },
        anchorManager: {
            _processHash: function (c) {
                var d = b.location,
                    e = "#";
                a.each(c, function (a, b) {
                    e = e + a + "=" + b + "&"
                }), d.hash = e
            },
            getParams: function () {
                var e, c = b.location.hash,
                    d = {};
                return c && (c = c.slice(1), e = c.split("&"), e.length > 0 && a(e).each(function (a, b) {
                    var c = b.split("=");
                    c[1] && (d[c[0]] = c[1])
                })), d
            },
            setParam: function (a, b) {
                var c = this.getParams();
                c[a] = b, this._processHash(c)
            },
            removeParam: function (a) {
                var b = this.getParams();
                delete b[a], this._processHash(b)
            }
        },
        harViewerInit: function () {
            a(c).ready(function () {
                var a = c.createElement("script");
                a.src = "/resource/js/harviewer/har.js", a.setAttribute("id", "har"), a.setAttribute("async", "true"), c.documentElement.firstChild.appendChild(a)
            }), "undefined" != typeof harInitialize && harInitialize()
        }
    };
    return e
}(jQuery, window, document, void 0), $(function () {
    TSB.initSwitchCheckBox(), TSB.switchHideShow($(".createNewProject"), $(".createNewProjectTarget"))
});