sci.Provide('sci.ui.LayoutGrid');

sci.ui.BackgroundCarousel = function()
{
    this.View = null;
    
    this.FilmStrip = null;
    this.CurrentImage = null;
    this.NextImage = null;
    this.OriginalImageSize = { Width:800, Height:600 };
    this.Container = null;
    
    this.Slides = null;
    
    this.Header = null;
    this.Footer = null;
    
    this.Output = null;
};

sci.ui.BackgroundCarousel.prototype.Initialize = function(view)
{
    this.View = view;
    this.Container = $(window); //$(window).height();   // returns height of browser viewport //$(document).height(); // returns height of HTML document
    
    var jqueryHelper = this.View.find('img.current, img.next');
    this.CurrentImage = jqueryHelper.filter('img.current');
    this.NextImage = jqueryHelper.filter('img.next');
    
    jqueryHelper = $('img.current, img.next, #Header, #Footer, .filmStrip');
    this.Header = jqueryHelper.filter('#Header');
    this.Footer = jqueryHelper.filter('#Footer');
    this.FilmStrip = jqueryHelper.filter('.filmStrip');
    this.Output = $('#Output');
    
    this.OriginalImageSize.Width = this.CurrentImage.width();
    this.OriginalImageSize.Height = this.CurrentImage.height();
    
    this.UpdateImageSize();
    this.PreloadImages();
    
    var that = this;
    
    if (navigator.platform === 'iPad')
    {
        //window.onorientationchange = function(e) { return that.Ipad_OnOrientationChange(e); };
    }
    
    $(window).resize(function (e) { that.UpdateImageSize(); return true; });
    
    var ua = navigator.userAgent;
    var event = (ua.match(/iPad/i)) ? "touchstart" : "click";
    
    this.FilmStrip.find('.thumbInner .title').bind(event, function (e) { return that.Thumb_Click(e); });
};

sci.ui.BackgroundCarousel.prototype.InitializeSlides = function(slides)
{
    this.Slides = new Array()
    
    for (var i = 0; i < slides.length; i++)
    {
        var filmstripInner = this.FilmStrip.find('.filmstripInner');
        var slide = slides[i];
        
        this.Slides.push(
        {
            View:filmstripInner.append('<li class="thumb"><div class="thumbInner"><div class="title"><span>' + slide.Title + '</span></div></div></li>')    
        });
    }
};

sci.ui.BackgroundCarousel.prototype.UpdateImageSize = function()
{
    var windowWidth = this.Container.width();
    var windowHeight = this.Container.height() - this.Header.height() - this.Footer.height();
    var w = windowHeight * this.OriginalImageSize.Width / this.OriginalImageSize.Height;
    this.View.height(windowHeight);
    
    this.Output.text(this.OriginalImageSize.Width + ', ' + this.OriginalImageSize.Height);
    
    if (w > windowWidth)
    {
        this.CurrentImage.width(w);
        this.CurrentImage.height(windowHeight);
    }
    else
    {
        this.CurrentImage.width(windowWidth);
        this.CurrentImage.height(windowWidth * this.OriginalImageSize.Height / this.OriginalImageSize.Width);
    }
    
    this.CurrentImage.css('display', 'inline-block')
        .css('top', (-(this.CurrentImage.height() - windowHeight) / 2) + 'px')
        .css('left', (-(this.CurrentImage.width() - windowWidth) / 2) + 'px');
};

sci.ui.BackgroundCarousel.prototype.PreloadImages = function()
{
    var thumbs = this.FilmStrip.find('.thumbInner .title');
    var imgObject = new Image();
    
    for (var i=0; i<thumbs.length; i++)
    {
        imgObject.src = 'Images/Large/' + $(thumbs[i]).data('image');
    }
    
    // function invoked on image load
    // imgObject.onLoad=imagesLoaded();
    // function imagesLoaded() { alert(imgObject.width); }
};

sci.ui.BackgroundCarousel.prototype.Thumb_Click = function(e)
{
    var t = $(e.currentTarget);
    this.CurrentImage.attr('src', 'Images/Large/' + t.data('image'));
    this.OriginalImageSize.Width = parseInt(t.data('image-width'));
    this.OriginalImageSize.Height = parseInt(t.data('image-height'));
    this.UpdateImageSize();
    
    return true;
};

sci.ui.BackgroundCarousel.prototype.Ipad_OnOrientationChange = function(e)
{
    this.UpdateImageSize();
    
    return;
    
    var orientation = window.orientation;
    
    // Look at the value of window.orientation:
    if (orientation === 0)
    {
        // iPad is in Portrait mode.
    }
    else if (orientation === 90)
    {
    // iPad is in Landscape mode. The screen is turned to the left.
    }
    else if (orientation === -90)
    {
    // iPad is in Landscape mode. The screen is turned to the right.
    
    }
    else if (orientation === 180)
    {
    // Upside down portrait.
    
    }
    
    return true;
};

sci.Ready('sci.ui.BackgroundCarousel');