Ext.onReady(function() {

var drawComponent = Ext.create('Ext.draw.Component', {
    width: 800,
    height: 600,
    renderTo: document.body
}), surface = drawComponent.surface;

surface.add([{
    type: 'circle',
    radius: 100,
    fill: '#f00',
    x: 100,
    y: 100,
    group: 'circles'
}, {
    type: 'circle',
    radius: 80,
    fill: '#0f0',
    x: 100,
    y: 100,
    group: 'circles'
}, {
    type: 'circle',
    radius: 60,
    fill: '#00f',
    x: 100,
    y: 100,
    group: 'circles'
}]);

// Get references to my groups
circles = surface.getGroup('circles');

// Animate the circles down
circles.animate({
    duration: 1000,
    to: {
        translate: {
            y: 200
        }
    }
});

// Animate the rectangles across
rectangles.animate({
    duration: 1000,
    to: {
        translate: {
            x: 200
        }
    }
});

});