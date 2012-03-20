/*
 * A portlet containing heat map
 */

// Data model that will store client's data coverage
/*
 * Ext.define('ClientCoverage', { extend: 'Ext.data.Model', fields: [ {name:
 * 'Metrics', type: 'string'}, {name: 'Name', type: 'string'}, {name: 'Value',
 * type: 'int'} ] });
 * 
 * function loadData(jsonfile){ var clientDataStore =
 * Ext.create('Ext.data.Store', { model: 'ClientCoverage', proxy: { type:
 * 'ajax', url : jsonfile, reader: { type : 'json', root : 'coverage' } },
 * autoLoad: true });
 * 
 * return clientDataStore; }
 */
/*
 * Ext.define('ClientAccount', { extend: 'Ext.data.Model', fields: [ {name:
 * 'CLIENT_ID', type: 'int'}, {name: 'CLIENT_NAME', type: 'string'}, {name:
 * 'LAST_TRADE_DATE', type: 'string'}, {name: 'TRADE_VOLUME', type: 'int'},
 * {name: 'REVENUE', type: 'int'}, {name: 'TRAVEL_ENTERTAINMENT', type: 'int'},
 * {name: 'EVENT_COUNT', type: 'int'}, {name: 'MEETING_COUNT', type: 'int'} ]
 * });
 * 
 * function loadData(jsonfile){ var clientDataStore =
 * Ext.create('Ext.data.Store', { model: 'ClientAccount', proxy: { type: 'ajax',
 * url : jsonfile, reader: { type : 'json', root : 'Coverage' } }, autoLoad:
 * true });
 * 
 * return clientDataStore; }
 */
Ext.define('Ext.app.HeatMapPortlet', {

			alias : 'widget.heatmapportlet',

			initComponent : function() {

				var drawComponent = Ext.create('Ext.draw.Component', {
							width : 800,
							height : 600,
							renderTo : document.body
						}), surface = drawComponent.surface;

				surface.add([{
							type : 'circle',
							radius : 10,
							fill : '#f00',
							x : 10,
							y : 10,
							group : 'circles'
						}, {
							type : 'circle',
							radius : 10,
							fill : '#0f0',
							x : 50,
							y : 50,
							group : 'circles'
						}, {
							type : 'circle',
							radius : 10,
							fill : '#00f',
							x : 100,
							y : 100,
							group : 'circles'
						}, {
							type : 'rect',
							width : 20,
							height : 20,
							fill : '#f00',
							x : 10,
							y : 10,
							group : 'rectangles'
						}, {
							type : 'rect',
							width : 20,
							height : 20,
							fill : '#0f0',
							x : 50,
							y : 50,
							group : 'rectangles'
						}, {
							type : 'rect',
							width : 20,
							height : 20,
							fill : '#00f',
							x : 100,
							y : 100,
							group : 'rectangles'
						}]);

				// Get references to my groups
				circles = surface.getGroup('circles');
				rectangles = surface.getGroup('rectangles');

				// Animate the circles down
				circles.animate({
							duration : 1000,
							to : {
								translate : {
									y : 200
								}
							}
						});

				// Animate the rectangles across
				rectangles.animate({
							duration : 1000,
							to : {
								translate : {
									x : 200
								}
							}
						});

				this.callParent(arguments);
			}
		});
