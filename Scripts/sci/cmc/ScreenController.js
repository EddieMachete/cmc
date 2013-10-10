sci.Provide('sci.cmc.ScreenController');
sci.cmc.ScreenController = function(){};

sci.cmc.ScreenController.prototype.Initialize = function(view)
{
    this.View = view;
    var bindings = this.View.find('[data-controller=Screen]');
    
    var that = this;
    this.MainNavigation = bindings.filter('[data-name=MainNavigation]');
    bindings.filter('[data-name=MainNavigationToggle]')
        .bind('click', function (e) { return that.MainNavigationToggle_Click(e); });
    
    return this;
};

sci.cmc.ScreenController.prototype.MainNavigationToggle_Click = function(e)
{
    this.MainNavigation.toggleClass('hidden');
};

sci.Ready('sci.cmc.ScreenController');