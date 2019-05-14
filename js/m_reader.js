function hotTag() {
    var a = "/api/search/top";
    T.restGet(a, {}, function (a) {
        var b, c, d;
        if (0 == a.code && a.data.comics.length > 0) {
            for (b = "", c = ["42b5ff", "0096ff", "2775f7", "0096ff", "0096ff", "42b5ff"], d = 0; d < a.data.comics.length; d++) b += '<li><a href="' + (m_global.crcck.length > 0 ? "/" + m_global.crcck : "") + "/comic/" + a.data.comics[d].id + '" ', b += 'style="background: #' + c[d] + '">' + a.data.comics[d].title + "</a></li>";
            $("#HotTag").html(b)
        }
    })
}

function goBack() {
    "" == document.referrer || -1 == document.referrer.indexOf(window.location.host) ? window.location = "/" : window.history.go(-1)
}

function isSubscribe(a) {
    var b, c, d, e, f;
    if (UserCookie(), 1 == m_global.isLogin) {
        for (b = localStorage.mySubscribeData, void 0 == b || "" == b || "" == JSON.parse(b) ? (c = "/api/mysubscribe", T.restGet(c, {}, function (a) {
            0 == a.code && void 0 != a.data.comics && (b = JSON.stringify(a.data.comics), a.data.comics)
        })) : d = JSON.parse(b), e = !1, (void 0 == d || "" == d) && (d = []), f = 0; f < d.length; f++)
            if (d[f]["comic_id"] == a) {
                e = !0;
                break
            }
        e ? ($("#Subscribe").html("取消订阅"), $("#Subscribe").attr("onclick", "unSubscribe('" + a + "')"), $("#subject_" + a).html("已订阅").attr("onclick", "")) : ($("#Subscribe").html("订阅漫画"), $("#Subscribe").attr("onclick", "addSubscribe('" + a + "')"), $("#subject_" + a).html("订阅漫画").attr("onclick", "addSubscribe(" + a + ")"))
    } else localStorage.removeItem("mySubscribeData")
}

function unSubscribe(a) {
    var b = "";
    b += '<div class="layerIcon02" id="subWindow"></div>', b += '<p class="LinHei">您确定要取消该漫画订阅吗？</p>', b += '<a class="PubBtn look" id="okBtn" onclick="subscribeDel(' + a + ')">确定</a>', b += '<a class="PubBtn can" id="Cancel">取消</a>', openwindow(b)
}

function subscribeRmove(a) {
    var d, e, f, b = JSON.parse(localStorage.mySubscribeData),
        c = [];
    for (d = 0; d < b.length; d++)
        for (e in b[d]) c.push(parseInt(b[d][e]));
    f = $.inArray(a, c), b.remove(b[f]), $("#subWindow").parent().remove(), $(".show").remove(), $("#Subscribe").html("订阅漫画").attr("onclick", "addSubscribe('" + a + "')"), $("#mysub_" + a).html("订阅漫画").attr("onclick", "addSubscribe('" + a + "')"), localStorage.mySubscribeData = JSON.stringify(b)
}

function subscribeDel(a) {
    UserCookie();
    var b = "/api/subscribe/del";
    T.restPost(b, {
        comic_id: a,
        sub_type: 0
    }, function (b) {
        0 == b.code ? (subscribeRmove(a), $("#sub_" + a).remove(), 0 == $(".itemBox").length && $(".Introduct_Sub").length < 0 && no_conten()) : 700 == b.code && (subscribeRmove(a), $("#Subscribe").html("订阅漫画").attr("onclick", "addSubscribe('" + a + "')"), $("#mysub_" + a).html("订阅漫画").attr("onclick", "addSubscribe('" + a + "')"), console.log(b.msg))
    })
}

function updateRecommends(a, b) {
    var c = "/api/block/" + a + "/" + b;
    $("#blockbtn_" + a).attr("onclick", "updateRecommends(" + a + "," + (b + 1) + ")"), T.restGet(c, {}, function (b) {
        var c, d, e;
        if (0 == b.code && b.data.comics.length > 0) {
            for (c = "", d = 0; d < b.data.comics.length; d++) e = b.data.comics[d], c += '<li><a class="ImgA autoHeight" href="' + (m_global.crcck.length > 0 ? "/" + m_global.crcck : "") + "/comic/" + e["id"] + '"><img src="' + e["cover"] + '" width="100%"/></a>' + '<a class="txtA">' + e["title"] + "</a>", e["authorstr"] && (c += '<span class="info">作者:' + e["authorstr"] + "</span>"), c += "</li>";
            $("#" + a).html(c)
        }
    })
}

function headSerch(a) {
    $(a).bind("input propertychange", function () {
        var b = $.trim($(a).val()),
            c = $("#messagelist"),
            d = "/api/search/keyword";
        c.show(), "" != b ? T.restGet(d, {
            keywords: b
        }, function (a) {
            var e, d = "";
            if (0 == a.code)
                for (e = 0; e < a.data.comics.length; e++) d += '<li><a href="' + (m_global.crcck.length > 0 ? "/" + m_global.crcck : "") + "/comic/" + a.data.comics[e].title + '">' + a.data.comics[e].title + "</a></li>";
            else d = '<li><a href="javascript:;">无搜索结果</a></li>';
            c.html(d), $("form[id=searchForm]").attr("action", "/search/" + b)
        }, function () {
            c.hide()
        }) : ($("#messagelist").html(""), c.hide())
    })
}

function success() { }

function serchAction() {
    var a = $("#searInput").val();
    "" != a ? location.href = (m_global.crcck.length > 0 ? "/" + m_global.crcck : "") + "/search/" + a : alert("请输入关键词")
}
var update_read_status = function (a) {
    url = "/api/subscribe/upread", T.ajaxJsonp(url, {
        sub_id: a
    }, function () {
        location.href = (m_global.crcck.length > 0 ? "/" + m_global.crcck : "") + "/comic/" + a
    })
};