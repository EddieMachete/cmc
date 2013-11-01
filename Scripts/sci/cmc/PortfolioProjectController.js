sci.Require('sci.Calculations');
sci.Require('sci.cmc.MapStyles');
sci.Require('sci.cmc.ProjectList');
sci.Require('sci.cmc.ProjectMap');
sci.Provide('sci.cmc.PortfolioProjectController');

sci.cmc.PortfolioProjectController = function()
{
    this.View = null;
    this.FilmStrip = null;
    this.Container = null;
    this.Slides = null;
        
    this.Interval;
    this.TimeElapsed = 0;
    this.IntervalSpeed = 30;
    
    this.SlideTween = { A:0, B:0, C:0, T:0, Active:false, Start:0, End:0, CurrentSlide:null, CurrentSlideWidth:0, NextSlide:null };
    this.SlideTweenLength = 1500;
    
    this.NextAutomaticTransition = 8000;
    this.NextImageResize = 0;
    
    this.Projects = sci.cmc.ProjectList;
    this.IsIpad = false;
    this.Output = null;
};

sci.cmc.PortfolioProjectController.prototype.Initialize = function(view)
{
    this.View = view;
    this.Container = $(window); //$(window).height();   // returns height of browser viewport //$(document).height(); // returns height of HTML document
    
    var that = this;
    var binds = $('[data-controller=PortfolioProject]');
    this.ContentHeader = binds.filter('[data-name=ContentHeader]');
    this.Thumbnails = binds.filter('[data-name=Thumbnails]');
    this.ThumbnailContainer = binds.filter('[data-name=ThumbnailContainer]');
    var jqueryHelper = this.View.find('.slide');
    this.Slides = jqueryHelper.filter('.slide');
    
    jqueryHelper = $('img.current, img.next, .page-header, #Footer, .filmStrip');
    this.Header = jqueryHelper.filter('.page-header');
    this.Footer = jqueryHelper.filter('#Footer');
    this.FilmStrip = jqueryHelper.filter('.filmStrip');
    
    this.UpdateImageSizes();
    
    var currentSlide = this.Slides.filter(':not(.hidden)');
    var slideDuration = parseInt(currentSlide.attr('data-slide-duration'), 10);
    this.NextAutomaticTransition = isNaN(slideDuration) ? 8000 : slideDuration;
    
    // Initialize project Index value
    this.ProjectIndex = this.GetProjectIndex(binds.filter('[data-name=ProjectId]').attr('data-value'));
    
    // Initialize google maps
    (new sci.cmc.ProjectMap('')).Initialize();
    this.InitializeMap(binds.filter('[data-name=Map]'));
    
    $(window).resize(function (e) { return that.Window_Resize(e); });
    this.IsIpad = navigator.userAgent.match(/iPad/i);
    binds.filter('[data-name=PreviousButton]')
        .bind('click', function (e) { return that.Previous_Click(e); });
    binds.filter('[data-name=NextButton]')
        .bind('click', function (e) { return that.Next_Click(e); });
    binds.filter('[data-name=LeftButton]')
        .bind(this.IsIpad ? "touchstart" : "click", function (e) { return that.LeftButton_Click(e); });
    binds.filter('[data-name=RightButton]')
        .bind(this.IsIpad ? "touchstart" : "click", function (e) { return that.RightButton_Click(e); });
    binds.filter('[data-type=Thumbnail]')
        .bind(this.IsIpad ? "touchstart" : "click", function (e) { return that.Thumbnail_Click(e); });
    this.Interval = setInterval(function (e) { that.Interval_Interval(e); }, this.IntervalSpeed);
};

sci.cmc.PortfolioProjectController.prototype.UpdateImageSizes = function()
{
    var windowWidth = this.Container.width();
    var windowHeight = this.Container.height() - this.Header.height() - this.FilmStrip.height() - this.ContentHeader.height() - (windowWidth > 980 ? this.Footer.height() : 0);
    this.View.height(windowHeight);
    var detailsWidth = this.View.width() - 120;
    detailsWidth = detailsWidth < 450 ? 450 : detailsWidth;
    
    for (var i=0; i<this.Slides.length; i++)
    {
        var slide = $(this.Slides[i]);
        var w = windowHeight * parseInt(slide.attr('data-image-width'), 10) / parseInt(slide.attr('data-image-height'), 10);
        var image = slide.find('img');
        
        if (w > windowWidth)
        {
            image.width(w);
            image.height(windowHeight);
        }
        else
        {
            image.width(windowWidth);
            image.height(windowWidth * parseInt(slide.attr('data-image-height'), 10) / parseInt(slide.attr('data-image-width'), 10));
        }
        
        var offsetTop = (image.height() - windowHeight) / 2;
        var offsetLeft = (image.width() - windowWidth) / 2;
        
        slide.css('top', (-offsetTop) + 'px')
            .css('left', (-offsetLeft) + 'px');
    }
};

sci.cmc.PortfolioProjectController.prototype.SwapImages = function(currentSlide, nextSlide)
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
    
    nextSlide.css('left', this.SlideTween.A + this.SlideTween.CurrentSlideWidth)
        .removeClass('hidden');
};

sci.cmc.PortfolioProjectController.prototype.KillSlideTransition = function()
{
    if (!this.SlideTween.Active)
        return;
    
    this.SlideTween.Active = false;
    this.SlideTween.CurrentSlide.addClass('hidden').css('left', '0px');
    this.SlideTween.NextSlide.css('left', (this.SlideTween.C + this.SlideTween.CurrentSlideWidth) + 'px');
};

sci.cmc.PortfolioProjectController.prototype.GetProjectIndex = function(projectId) {
    var index = 0;
    var projectIndex = -1;
    
    while (projectIndex == -1 && index < this.Projects.length) {
        if (this.Projects[index].Id == projectId)
            projectIndex = index;
        
        index++;
    }
    
    return projectIndex;
};

sci.cmc.PortfolioProjectController.prototype.InitializeMap = function(view) {
    if (this.ProjectIndex < 0)
        return;
        
    var project = this.Projects[this.ProjectIndex];
    var url = project.Url;
    var coordinates = new google.maps.LatLng(project.Latitude, project.Longitude);
    var mapOptions = {
            zoom: 10,
            center: coordinates,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'cmc_map']
            }
        };
    
    var map = new google.maps.Map(view.find(':first-child')[0], mapOptions);
    var cmcMapType = new google.maps.StyledMapType(sci.cmc.MapStyles.CmcStyle, {name: 'CMC'});
    map.mapTypes.set('cmc_map', cmcMapType);
    map.setMapTypeId('cmc_map');
    
    var marker = new google.maps.Marker({
                    map: map,
                    position: coordinates,
                    title: project.Title});
    
    google.maps.event.addListener(marker, 'click', function() {
        window.open(url,'_blank');
    });
};

sci.cmc.PortfolioProjectController.prototype.Interval_Interval = function (e)
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
    
    //this.Output.text('interval ' + this.TimeElapsed);
    this.TimeElapsed += this.IntervalSpeed;
};

sci.cmc.PortfolioProjectController.prototype.Window_Resize = function (e)
{
    this.NextImageResize = this.TimeElapsed + 500;
    
    return true;
};

sci.cmc.PortfolioProjectController.prototype.LeftButton_Click = function(e) {
    var w = this.ThumbnailContainer.width() - this.Thumbnails.width();
    
    if (w >= 0)
        return true;
    
    var offset = this.Thumbnails.position();
    var x = offset.left - 73;
    this.Thumbnails.animate({left: w < x ? x + 'px' : w + 'px'}, 300);
    
    return true;
};

sci.cmc.PortfolioProjectController.prototype.RightButton_Click = function(e) {
    var offset = this.Thumbnails.position();
    
    if (offset.left == 0)
        return true;
    
    var x = offset.left + 73;
    this.Thumbnails.animate({left: x < 0 ? x + 'px' : 0}, 300);
    
    return true;
};

sci.cmc.PortfolioProjectController.prototype.Thumbnail_Click = function (e) {
    if (this.SlideTween.Active)
        return true;
    
    var t = $(e.currentTarget);
    var nextSlide = this.Slides.filter('div[data-slide=' + t.attr('data-slide') + ']');
    
    if (nextSlide.is('.hidden'))
        this.SwapImages(this.Slides.filter(':not(.hidden)'), nextSlide);
    
    return true;
};
    
sci.cmc.PortfolioProjectController.prototype.Previous_Click = function(e) {
    var index = this.ProjectIndex == 0 ? this.Projects.length -1 : this.ProjectIndex - 1;
    window.open(this.Projects[index].Id + '.html','_self');
};
    
sci.cmc.PortfolioProjectController.prototype.Next_Click = function(e) {
    var index = this.ProjectIndex == this.Projects.length -1 ? 0 : this.ProjectIndex + 1;
    window.open(this.Projects[index].Id + '.html','_self');
};

sci.Ready('sci.ui.PortfolioProjectController');