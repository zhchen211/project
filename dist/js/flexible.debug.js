<<<<<<< HEAD
!function(i,e){var t,a=i.document,r=a.documentElement,n=a.querySelector('meta[name="viewport"]'),o=a.querySelector('meta[name="flexible"]'),l=0,m=0,s=e.flexible||(e.flexible={});if(n){console.warn("将根据已有的meta标签来设置缩放比例");var d=n.getAttribute("content").match(/initial\-scale=([\d\.]+)/);d&&(m=parseFloat(d[1]),l=parseInt(1/m))}else if(o){var p=o.getAttribute("content");if(p){var c=p.match(/initial\-dpr=([\d\.]+)/),u=p.match(/maximum\-dpr=([\d\.]+)/);c&&(l=parseFloat(c[1]),m=parseFloat((1/l).toFixed(2))),u&&(l=parseFloat(u[1]),m=parseFloat((1/l).toFixed(2)))}}if(!l&&!m){i.navigator.appVersion.match(/android/gi);var f=i.navigator.appVersion.match(/iphone/gi),v=i.devicePixelRatio;m=1/(l=f?3<=v&&(!l||3<=l)?3:2<=v&&(!l||2<=l)?2:1:1)}if(r.setAttribute("data-dpr",l),!n)if((n=a.createElement("meta")).setAttribute("name","viewport"),n.setAttribute("content","initial-scale="+m+", maximum-scale="+m+", minimum-scale="+m+", user-scalable=no"),r.firstElementChild)r.firstElementChild.appendChild(n);else{var h=a.createElement("div");h.appendChild(n),a.write(h.innerHTML)}function x(){var e=r.getBoundingClientRect().width;540<e/l&&(e=540*l);var t=e/10;r.style.fontSize=t+"px",s.rem=i.rem=t}i.addEventListener("resize",function(){clearTimeout(t),t=setTimeout(x,300)},!1),i.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(t),t=setTimeout(x,300))},!1),"complete"===a.readyState?a.body.style.fontSize=12*l+"px":a.addEventListener("DOMContentLoaded",function(e){a.body.style.fontSize=12*l+"px"},!1),x(),s.dpr=i.dpr=l,s.refreshRem=x,s.rem2px=function(e){var t=parseFloat(e)*this.rem;return"string"==typeof e&&e.match(/rem$/)&&(t+="px"),t},s.px2rem=function(e){var t=parseFloat(e)/this.rem;return"string"==typeof e&&e.match(/px$/)&&(t+="rem"),t}}(window,window.lib||(window.lib={}));
=======
;(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});
    
    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));    
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));    
            }
        }
    }

    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem(){
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {
            width = 540 * dpr;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }
    
    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['lib'] || (window['lib'] = {}));
>>>>>>> 1d6225d7a068377467a7797d8c22c743f185ed33
