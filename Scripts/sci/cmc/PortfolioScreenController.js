sci.Require('sci.cmc.MapStyles');
sci.Require('sci.cmc.PortfolioProjectCollectionController');
sci.Require('sci.cmc.ProjectMap');
sci.Require('sci.cmc.ScreenController');
sci.Provide('sci.cmc.PortfolioScreenController');
sci.cmc.PortfolioScreenController = function() {};

sci.cmc.PortfolioScreenController.prototype.Initialize = function(view)
{
    this.View = view;
    var that = this;
    var binds = this.View.find('[data-controller=Portfolio]');
        
    // Initialize projects' collections
    var projectCollections = binds.filter('[data-name=ProjectCollection]');
    
    for (var i=0; i < projectCollections.length; i++)
        (new sci.cmc.PortfolioProjectCollectionController()).Initialize($(projectCollections[i]));
    
    // Initialize google maps
    (new sci.cmc.ProjectMap('PortfolioProjects/')).Initialize();
    (new sci.cmc.ScreenController()).Initialize();
};

sci.Ready('sci.cmc.PortfolioScreenController');