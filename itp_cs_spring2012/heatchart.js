/**
 * 
 */

//launch the application
Ext.define('Ext.chart.heatchart', {
    name: 'My Test Application',
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            items: {
                html: 'My App'
            }
        });
    }
});