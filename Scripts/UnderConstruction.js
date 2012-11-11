$(Body_Load);
        
var hAndF = 500;

function Body_Load()
{
    var jqueryHelper = $('.backgroundImageContainer');
    var backgroundController = new sci.ui.ScalableBackgroundController();
    backgroundController.Initialize(jqueryHelper.filter('.backgroundImageContainer').first());
    
    hAndF = $('#Header').height() + $('#Footer').height();
    RepositionDetails();
    
    $(window).resize(RepositionDetails);
}

function RepositionDetails()
{
    var details = $('#MainContent .details');
    details.css('margin-top', (($(window).height() - hAndF - details.height() - 20) / 2) + 'px');
}