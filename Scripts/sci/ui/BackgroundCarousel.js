sci.Require('sci.Calculations');
sci.Provide('sci.ui.BackgroundCarousel');

sci.ui.BackgroundCarousel = function()
{
    this.View = null;
    this.FilmStrip = null;
    this.Container = null;
    
    this.Slides = null;
    
    this.Header = null;
    this.Footer = null;
        
    this.Interval;
    this.TimeElapsed = 0;
    this.IntervalSpeed = 30;
    
    this.SlideTween = { A:0, B:0, C:0, T:0, Active:false, Start:0, End:0, CurrentSlide:null, CurrentSlideWidth:0, NextSlide:null };
    this.SlideTweenLength = 1500;
    
    this.NextAutomaticTransition = 8000;
    this.NextImageResize = 0;
    
    this.IsIpad = false;
    
    this.Output = null;
};

sci.ui.BackgroundCarousel.prototype.Initialize = function(view)
{
    this.View = view;
    this.Container = $(window); //$(window).height();   // returns height of browser viewport //$(document).height(); // returns height of HTML document
    
    var jqueryHelper = this.View.find('.slide');
    this.Slides = jqueryHelper.filter('.slide');
    
    jqueryHelper = $('img.current, img.next, #Header, #Footer, .filmStrip');
    this.Header = jqueryHelper.filter('#Header');
    this.Footer = jqueryHelper.filter('#Footer');
    this.FilmStrip = jqueryHelper.filter('.filmStrip');
    this.Output = $('#Output');
    
    this.UpdateImageSizes();
    
    var currentSlide = this.Slides.filter(':not(.hidden)');
    currentSlide.find('.details').css('display', 'block');
    var slideDuration = parseInt(currentSlide.attr('data-slide-duration'));
    this.NextAutomaticTransition = isNaN(slideDuration) ? 8000 : slideDuration;
        
    var that = this;
    
    /*if (navigator.platform === 'iPad')
    {
        //window.onorientationchange = function(e) { return that.Ipad_OnOrientationChange(e); };
    }*/
    
    $(window).resize(function (e) { return that.Window_Resize(e); });
    
    this.IsIpad = navigator.userAgent.match(/iPad/i);
    
    this.FilmStrip.find('.thumbInner .title').bind(this.IsIpad ? "touchstart" : "click", function (e) { return that.Thumb_Click(e); });
    
    // This section is part of a test to see if we can detect when an image loads, so we can then proceed to show it.
    //this.CurrentImage.bind('load', function  (e) { that.Image_OnLoad(); });
    this.Interval = setInterval(function (e) { that.Interval_Interval(e); }, this.IntervalSpeed);
    
    //this.FilmStrip.find('.thumb .title').first().trigger(this.IsIpad ? "touchstart" : "click");
};

sci.ui.BackgroundCarousel.prototype.UpdateImageSizes = function()
{
    var windowWidth = this.Container.width();
    var windowHeight = this.Container.height() - this.Header.height() - this.Footer.height();
    this.View.height(windowHeight);
    
    for (var i=0; i<this.Slides.length; i++)
    {
        var slide = $(this.Slides[i]);
        var w = windowHeight * parseInt(slide.attr('data-image-width')) / parseInt(slide.attr('data-image-height'));
        var image = slide.find('img');
        
        if (w > windowWidth)
        {
            image.width(w);
            image.height(windowHeight);
        }
        else
        {
            image.width(windowWidth);
            image.height(windowWidth * parseInt(slide.attr('data-image-height')) / parseInt(slide.attr('data-image-width')));
        }
        
        var offsetTop = (image.height() - windowHeight) / 2;
        var offsetLeft = (image.width() - windowWidth) / 2;
        
        slide.css('top', (-offsetTop) + 'px')
            .css('left', (-offsetLeft) + 'px');
        
        slide.find('.details').css('top', (50 + offsetTop) + 'px')
            .css('left', (50 + offsetLeft) + 'px');
    }
};

sci.ui.BackgroundCarousel.prototype.SwapImages = function(currentSlide, nextSlide)
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
        
    var slideDuration = parseInt(nextSlide.attr('data-slide-duration'));
    this.NextAutomaticTransition = this.TimeElapsed + this.SlideTweenLength + (isNaN(slideDuration) || slideDuration < 500 ? 8000 : slideDuration);
    
    currentSlide.find('.details').fadeOut(500);
    nextSlide.find('.details').fadeIn(1000);
    nextSlide.css('left', this.SlideTween.A + this.SlideTween.CurrentSlideWidth)
        .removeClass('hidden');
    
    this.FilmStrip.find('.selected').removeClass('selected');
    this.FilmStrip.find('.title[data-slide=' + nextSlide.attr('data-slide') + ']')
        .parent().parent().addClass('selected');
}

sci.ui.BackgroundCarousel.prototype.KillSlideTransition = function ()
{
    if (!this.SlideTween.Active)
        return;
    
    this.SlideTween.Active = false;
    this.SlideTween.CurrentSlide.addClass('hidden').css('left', '0px');
    this.SlideTween.NextSlide.css('left', (this.SlideTween.C + this.SlideTween.CurrentSlideWidth) + 'px');
}

sci.ui.BackgroundCarousel.prototype.Interval_Interval = function (e)
{
    if (this.SlideTween.Active)
    {
        this.SlideTween.T = (this.TimeElapsed - this.SlideTween.Start) / (this.SlideTween.End - this.SlideTween.Start);
        
        if (this.SlideTween.T >= 1)
        {
            this.SlideTween.Active = false;
            this.SlideTween.CurrentSlide.addClass('hidden').css('left', '0px');
            this.SlideTween.NextSlide.css('left', (this.SlideTween.C + this.SlideTween.CurrentSlideWidth) + 'px');
        }
        else
        {
            var left = sci.Calculations.GetQuadraticValue(this.SlideTween.T, this.SlideTween.A, this.SlideTween.B, this.SlideTween.C);
            this.SlideTween.CurrentSlide.css('left', left + 'px');
            this.SlideTween.NextSlide.css('left', (left + this.SlideTween.CurrentSlideWidth) + 'px');
        }
    }
    else if (this.TimeElapsed >= this.NextAutomaticTransition)
    {
        var currentSlide = this.Slides.filter(':not(.hidden)');
        this.SwapImages(currentSlide, currentSlide.is(':last-child') ? $(this.Slides[0]) : currentSlide.next());
    }
    
    if (this.NextImageResize && this.TimeElapsed >= this.NextImageResize)
    {
        this.NextImageResize = 0;
        this.KillSlideTransition();
        this.UpdateImageSizes();
    }
    
    this.Output.text('interval ' + this.TimeElapsed);
    this.TimeElapsed += this.IntervalSpeed;
}

sci.ui.BackgroundCarousel.prototype.Thumb_Click = function(e)
{
    if (this.SlideTween.Active)
        return true;
    
    var t = $(e.currentTarget);
    var nextSlide = this.Slides.filter('div[data-slide=' + t.attr('data-slide') + ']');
    
    if (nextSlide.is(':hidden'))
        this.SwapImages(this.Slides.filter(':not(.hidden)'), nextSlide);
    
    return true;
};

sci.ui.BackgroundCarousel.prototype.Window_Resize = function (e)
{
    this.NextImageResize = this.TimeElapsed + 500;
    
    return true;
}

/*sci.ui.BackgroundCarousel.prototype.Ipad_OnOrientationChange = function(e)
{
    this.UpdateImageSizes();
    
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
};*/

sci.Ready('sci.ui.BackgroundCarousel');