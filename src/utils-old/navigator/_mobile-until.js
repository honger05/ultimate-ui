/**
* @function fixScreen
* @memberof navigator
* @description 屏幕动态scale适配
* @example
*/

var fixScreen = function() {
    let metaEl = doc.querySelector('meta[name="viewport"]'),
        metaCtt = metaEl ? metaEl.content : '',
        matchScale = metaCtt.match(/initial\-scale=([\d\.]+)/),
        matchWidth = metaCtt.match(/width=([^,\s]+)/)

    if ( metaEl && !matchScale && ( matchWidth && matchWidth[1] != 'device-width') ) {
        let width = parseInt(matchWidth[1]),
            iw = win.innerWidth || width,
            ow = win.outerWidth || iw,
            sw = win.screen.width || iw,
            saw = win.screen.availWidth || iw,
            ih = win.innerHeight || width,
            oh = win.outerHeight || ih,
            ish = win.screen.height || ih,
            sah = win.screen.availHeight || ih,
            w = Math.min(iw,ow,sw,saw,ih,oh,ish,sah),
            scale = w / width

        if ( ratio < 1) {
            metaEl.content += ',initial-scale=' + ratio + ',maximum-scale=' + ratio + ', minimum-scale=' + scale
        }
    }
}
