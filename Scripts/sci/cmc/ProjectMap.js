sci.Require('sci.cmc.ProjectList');
sci.Provide('sci.cmc.ProjectMap');
sci.cmc.ProjectMap = function(rootPath) {
    this.RootPath = rootPath;
};

sci.cmc.ProjectMap.prototype.Initialize = function() {
    var mapOptions = {
            zoom: this.MapZoomLevel,
            center: this.CanadaCoordinates,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'cmc_map']
            }
        };
        
    var binds = $('[data-controller=ProjectMap]');
    this.InfoWindow = null;
    this.Markers = new Array();
    this.MapZoomLevel = 3;
    this.SelectedCategory = null;
    this.MapStyles = sci.cmc.MapStyles.CmcStyle;
    this.CanadaCoordinates = new google.maps.LatLng(50, -105.3809);
    this.MapContainer = binds.filter('[data-name=MapContainer]');
    
    this.Map = new google.maps.Map(binds.filter('[data-name=MapCanvas]')[0], mapOptions);
    var cmcMapType = new google.maps.StyledMapType(this.MapStyles, {name: 'CMC'});
    this.Map.mapTypes.set('cmc_map', cmcMapType);
    this.Map.setMapTypeId('cmc_map');
    
    var that = this;
    this.MapButton = binds.filter('[data-name=MapButton]')
        .bind('click', function (e) { return that.MapButton_Click(e); });
    
    // Initialize markers
    var projects = sci.cmc.ProjectList;
    
    for (var i=0; i < projects.length; i++) {
        var project = projects[i];
        var marker = this.AddMarker(project.Id,
            project.Category,
            new google.maps.LatLng(project.Latitude, project.Longitude),
            project.Title,
            project.Content);
    }
    
    // Initialize Map Menu
    this.MenuItems = binds.filter('[data-type=MapMenuItem]')
        .bind('click', function(e){return that.MapMenuItem_Click(e);});
};

sci.cmc.ProjectMap.prototype.AddMarker = function(id, category, coordinates, title, content) {
    var that = this;
    var marker = {
        Id: id,
        Marker: new google.maps.Marker({
                    position: coordinates,
                    title: title}),
        Title: title,
        Content: content,
        Category: category
    };
    
    this.Markers[id] = marker;
    
    google.maps.event.addListener(this.Markers[id].Marker, 'click', function() {
        that.Marker_Click(that.Markers[id]);
    });
    
    return marker;
}
    
sci.cmc.ProjectMap.prototype.MapButton_Click = function(e) {
    if (this.MapButton.hasClass('active')) {
        this.MapButton.removeClass('active');
        this.MapContainer.css('display', 'none');
    }
    else {
        this.MapButton.addClass('active');
        this.MapContainer.css('display', 'block');
        google.maps.event.trigger(this.Map, 'resize');
        this.Map.setCenter(this.CanadaCoordinates);
        this.Map.setZoom(this.MapZoomLevel);
        
        if (!this.SelectedCategory)
            this.MenuItems.first().trigger('click');
    }
};
    
sci.cmc.ProjectMap.prototype.MapMenuItem_Click = function(e) {
    var category = $(e.currentTarget);
    var categoryName = category.attr('data-name');
    
    if (this.SelectedCategory && this.SelectedCategory.attr('data-name') == categoryName)
        return;
    
    if (this.SelectedCategory)
        this.SelectedCategory.removeClass('selected');
    
    this.SelectedCategory = category;
    this.SelectedCategory.addClass('selected');
    
    for (var index in this.Markers) {
        var marker = this.Markers[index];
        marker.Marker.setMap(marker.Category == categoryName || categoryName == 'All' ? this.Map : null); 
    }
};
    
sci.cmc.ProjectMap.prototype.Marker_Click = function(marker) {
    if (this.InfoWindow)
        this.InfoWindow.close();
        
    var contentString = '<div id="content"><div id="siteNotice"></div>'
            + '<h2 id="firstHeading" class="firstHeading">' + marker.Title + '</h2>'
            + '<div class="body-content">' + marker.Content + '</div>'
            + '<div class="learn-more"><a href="' + this.RootPath + marker.Id + '.html">Learn more</a></div></div>';
            
    this.InfoWindow = new google.maps.InfoWindow({content: contentString});
    this.InfoWindow.open(this.Map, marker.Marker);
};

sci.Ready('sci.cmc.ProjectMap');