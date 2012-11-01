if (navigator.userAgent.match(/mobile/i) && !navigator.platform.match(/ipad/i))
{
    $('meta[name=viewport]').attr("content", "user-scalable=no, initial-scale=" + ($(window).width() / 980) + ", minimum-scale=.2, maximum-scale=1, width=480px");
}