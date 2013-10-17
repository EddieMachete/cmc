$(Body_Load);
        
var hAndF = 500;

function Body_Load()
{
    var jqueryHelper = $('.backgroundImageContainer');
    var backgroundController = new sci.ui.ScalableBackgroundController();
    backgroundController.Initialize(jqueryHelper.filter('.backgroundImageContainer').first());
    
    hAndF = $('.page-header').height() + $('#Footer').height();
    RepositionDetails();
    (new sci.cmc.ScreenController()).Initialize();
    
    $(window).resize(RepositionDetails);
}

function RepositionDetails()
{
    var details = $('#MainContent .details');
    details.css('margin-top', (($(window).height() - hAndF - details.height() - 20) / 2) + 'px');
}