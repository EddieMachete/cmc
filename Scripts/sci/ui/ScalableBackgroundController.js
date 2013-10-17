sci.Require('sci.Calculations');
sci.Provide('sci.ui.ScalableBackgroundController');

sci.ui.ScalableBackgroundController = function()
{
    this.Container = null;
    this.View = null;
    this.Header = null;
    this.MainContent = null;
    this.Footer = null;
    this.Image = null;
    this.ImageSize = { Width:1200, Height:790 };
    this.IsIpad = false;
    this.Output = null;
    
    this.Interval = null;
    this.TimeElapsed = 0;
    this.IntervalSpeed = 30;
    this.NextImageResize = 0;
};

sci.ui.ScalableBackgroundController.prototype.Initialize = function(view)
{
    this.View = view;
    this.Container = $(window);
    this.IsIpad = navigator.userAgent.match(/iPad/i);
    
    this.Image = this.View.find('img');
    this.ImageSize = { Width:parseInt(this.Image.attr('width'), 10), Height:parseInt(this.Image.attr('height'), 10) };
    
    var jqueryHelper = $('img.current, img.next, .page-header, .main-content, #Footer, .filmStrip');
    this.Header = jqueryHelper.filter('.page-header');
    this.MainContent = jqueryHelper.filter('.main-content');
    this.Footer = jqueryHelper.filter('#Footer');
    
    this.Output = $('#Output');
    
    this.UpdateBackgroundSize();
        
    var that = this;
    $(window).resize(function (e) { return that.Window_Resize(e); });
};

sci.ui.ScalableBackgroundController.prototype.UpdateBackgroundSize = function()
{
    var windowWidth = this.Container.width();
    var windowHeight = this.Container.height() - this.Header.height() - this.Footer.height();
    var contentHeight = this.MainContent.find('.content').height();
    windowHeight = windowHeight > contentHeight ? windowHeight : contentHeight;
    
    this.Output.text(contentHeight);
    
    this.MainContent.height(windowHeight);
    this.View.height(windowHeight);
    
    var w = windowHeight * this.ImageSize.Width / this.ImageSize.Height;
        
    if (w > windowWidth)
    {
        this.Image.width(w);
        this.Image.height(windowHeight);
    }
    else
    {
        this.Image.width(windowWidth);
        this.Image.height(windowWidth * this.ImageSize.Height / this.ImageSize.Width);
    }
        
    var offsetTop = (this.Image.height() - windowHeight) / 2;
    var offsetLeft = (this.Image.width() - windowWidth) / 2;
    
    this.Image.css('top', (-offsetTop) + 'px')
        .css('left', (-offsetLeft) + 'px');
};

sci.ui.ScalableBackgroundController.prototype.SwapImages = function(currentSlide, nextSlide)
{
    var currentImage = currentSlide.find('img');
    var nextImage = nextSlide.find('img');
    
    this.SlideTween.CurrentSlideWidth = currentImage.width();
    this.SlideTween.A = currentSlide.position().left;
    this.SlideTween.C = -(this.SlideTween.CurrentSlideWidth + (nextImage.width() - this.Container.width()) / 2);
    this.SlideTween.B = .8 * this.SlideTween.C;
    this.SlideTween.Active = true;
    this.SlideTween.Start = this.TimeElapsed;
    this.SlideTween.End = this.TimeElapsed + this.SlideTweenLength;
    this.SlideTween.CurrentSlide = currentSlide;
    this.SlideTween.NextSlide = nextSlide;
        
    var slideDuration = parseInt(nextSlide.attr('data-slide-duration'), 10);
    this.NextAutomaticTransition = this.TimeElapsed + this.SlideTweenLength + (isNaN(slideDuration) || slideDuration < 500 ? 8000 : slideDuration);
    
    currentSlide.find('.details').fadeOut(500);
    //nextSlide.find('.details').fadeIn(1000);
    nextSlide.css('left', this.SlideTween.A + this.SlideTween.CurrentSlideWidth)
        .removeClass('hidden');
    
    this.FilmStrip.find('.selected').removeClass('selected');
    this.FilmStrip.find('.title[data-slide=' + nextSlide.attr('data-slide') + ']')
        .parent().parent().addClass('selected');
};

sci.ui.ScalableBackgroundController.prototype.Interval_Interval = function (e)
{
    if (this.NextImageResize && this.TimeElapsed >= this.NextImageResize)
    {
        this.NextImageResize = 0;
        this.UpdateBackgroundSize();
        clearInterval(this.Interval);
        this.Interval = null;
    }
    
    //this.Output.text('interval ' + this.TimeElapsed);
    this.TimeElapsed += this.IntervalSpeed;
};

sci.ui.ScalableBackgroundController.prototype.Window_Resize = function (e)
{
    if (!this.Interval)
    {
        var that = this;
        this.Interval = setInterval(function (e) { that.Interval_Interval(e); }, this.IntervalSpeed);
        this.TimeElapsed = 0;
    }
    
    this.NextImageResize = this.TimeElapsed + 500;
    
    return true;
};

sci.Ready('sci.ui.ScalableBackgroundController');