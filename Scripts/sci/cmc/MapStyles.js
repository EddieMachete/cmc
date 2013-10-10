sci.Provide('sci.cmc.MapStyles');
sci.cmc.MapStyles.CmcStyle = [
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [
            { hue: '#ff0022' },
            { saturation: 60 },
            { lightness: -20 }
          ]
        },{
          featureType: 'road.arterial',
          elementType: 'all',
          stylers: [
            { hue: '#2200ff' },
            { lightness: -40 },
            { visibility: 'simplified' },
            { saturation: 30 }
          ]
        },{
          featureType: 'road.local',
          elementType: 'all',
          stylers: [
            { hue: '#f6ff00' },
            { saturation: 50 },
            { gamma: 0.7 },
            { visibility: 'simplified' }
          ]
        },{
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            { saturation: 40 },
            { lightness: 40 }
          ]
        },{
          featureType: 'road.highway',
          elementType: 'labels',
          stylers: [
            { visibility: 'on' },
            { saturation: 98 }
          ]
        },{
          featureType: 'administrative.locality',
          elementType: 'labels',
          stylers: [
            { hue: '#0022ff' },
            { saturation: 50 },
            { lightness: -10 },
            { gamma: 0.90 }
          ]
        },{
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [
            { hue: '#ff0000' },
            { visibility: 'on' },
            { lightness: -70 }
          ]
        }
      ];

sci.Ready('sci.cmc.MapStyles');