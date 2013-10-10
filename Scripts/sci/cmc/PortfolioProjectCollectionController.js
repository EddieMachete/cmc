sci.Provide('sci.cmc.PortfolioProjectCollectionController');
sci.cmc.PortfolioProjectCollectionController = function(){};

sci.cmc.PortfolioProjectCollectionController.prototype.Initialize = function(view)
{
    this.View = view;
    var bindings = this.View.find('[data-controller=ProjectCollection]');
    this.AllProjects = bindings.filter('[data-name=AllProjects]');
    
    var that = this;
    
    bindings.filter('[data-name=ViewAllButton]')
        .bind('click', function (e) { return that.ShowAll_Click(e); });
        
    this.Status = bindings.filter('[data-name=Status]')
        .bind('click', function (e) { return that.ShowAll_Click(e); });
    
};

sci.cmc.PortfolioProjectCollectionController.prototype.ShowAll_Click = function(e) {
    if (this.View.hasClass('expanded')) {
        this.View.removeClass('expanded');
        //this.AllProjects.hide(400);
        this.AllProjects.slideUp(400);
    }
    else {
        this.View.addClass('expanded');
        //this.AllProjects.show(400);
        this.AllProjects.slideDown(400);
    }
    
    return true;
};

sci.Ready('sci.cmc.PortfolioProjectCollectionController');