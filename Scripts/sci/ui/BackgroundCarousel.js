sci.Provide('sci.ui.LayoutGrid');

sci.ui.BackgroundCarousel = function()
{
    this.View = null;
    
    this.CurrentImage = null;
    this.NextImage = null;
    this.OriginalImageSize = { Width:800, Height:600 };
    this.Container = null;
    
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
    
    jqueryHelper = $('img.current, img.next, #Header, #Footer');
    this.Header = jqueryHelper.filter('#Header');
    this.Footer = jqueryHelper.filter('#Footer');
    this.Output = $('#Output');
    
    this.OriginalImageSize.Width = this.CurrentImage.width();
    this.OriginalImageSize.Height = this.CurrentImage.height();
    
    this.UpdateImageSize();
    
    var that = this;
    
    if (navigator.platform === 'iPad')
    {
        //window.onorientationchange = function(e) { return that.Ipad_OnOrientationChange(e); };
    }
    
    $(window).resize(function (e) { that.UpdateImageSize(); return true; });
};

sci.ui.BackgroundCarousel.prototype.UpdateImageSize = function()
{
    var windowWidth = document.body.clientWidth; //this.Container.width();
    var windowHeight = this.Container.height() - this.Header.height() - this.Footer.height();
    var w = windowHeight * this.OriginalImageSize.Width / this.OriginalImageSize.Height;
    this.View.height(windowHeight);
    this.CurrentImage.css('display', 'inline-block');
    
    this.Output.text(this.Header.height() + ', ' + this.Footer.height() + ', ' + windowHeight);
    
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