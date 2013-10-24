$(Body_Load);
        
var _hAndF = 500;
var _currentNews = null;

function Body_Load()
{
    var jqueryHelper = $('.backgroundImageContainer, .section .news');
    var backgroundController = new sci.ui.ScalableBackgroundController();
    backgroundController.Initialize(jqueryHelper.filter('.backgroundImageContainer').first());
    
    _hAndF = $('.page-header').height() + $('#Footer').height();
    //RepositionDetails();
    
    var news = jqueryHelper.filter('.section .news');
    _currentNews = news.find('li:not(.collapsed)');
    
    news.find('.date').bind('click', Date_Click);
    //$(window).resize(RepositionDetails);
    
    (new sci.cmc.ScreenController()).Initialize();
}

/*function RepositionDetails()
{
    //var details = $('#MainContent .details');
    //details.css('margin-top', (($(window).height() - _hAndF - details.height() - 20) / 2) + 'px');
}*/

function Date_Click(e)
{
    var t = $(e.currentTarget);
    
    if (!t.parent().hasClass('current'))
    {
        if (t.parent().find('~ .current').length == 1)
        {
            _currentNews.removeClass('current').find('.description').hide();
            _currentNews = t.parent().addClass('current');
            _currentNews.find('.description').slideDown(600, Slide_Done);
        }
        else
        {
            _currentNews.removeClass('current').find('.description').slideUp(600, Slide_Done);
            _currentNews = t.parent().addClass('current');
            _currentNews.find('.description').show();
        }
    }
}

function Slide_Done(e)
{
    $(window).trigger('resize');
    $('.backgroundImageContainer img').attr('src', 'Images/Large/' + _currentNews.attr('data-background'));
}