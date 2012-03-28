Ext.define('ClientAccount', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'CLIENT_ID',
						type : 'int'
					}, {
						name : 'CLIENT_NAME',
						type : 'string'
					}, {
						name : 'LAST_TRADE_DATE',
						type : 'string'
					}, {
						name : 'TRADE_VOLUME',
						type : 'int'
					}, {
						name : 'REVENUE',
						type : 'int'
					}, {
						name : 'TRAVEL_ENTERTAINMENT',
						type : 'int'
					}, {
						name : 'EVENT_COUNT',
						type : 'int'
					}, {
						name : 'MEETING_COUNT',
						type : 'int'
					}]
		});
var singleDataStore = Ext.create('Ext.data.Store', {
			model : 'ClientAccount',
			proxy : {
				type : 'ajax',
				url : 'data/Client1Data.json',
				reader : {
					type : 'json',
					root : 'Coverage'
				}
			},
			autoLoad : true
		});

var benchmarkDataStore = Ext.create('Ext.data.Store', {
			model : 'ClientAccount',
			proxy : {
				type : 'ajax',
				url : 'data/BenchMarkData.json',
				reader : {
					type : 'json',
					root : 'Coverage'
				}
			},
			autoLoad : true
		});

Ext.define('Ext.app.CoverageVisualPorlet', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.coverageVisualPorlet',

	title : 'Coverage Visual Porlet',
	frame : true,
	closable : true,
	collapsible : true,
	animCollapse : true,
	draggable : true,
	listeners : {
		updatedata : function(param) {
			// alert('inside update data..' + param);
			this.updateData(param);
		}
	},
	tools : [{
				type : 'close',
				handler : function() {
					alert('click close');
				}
			}, {
				type : 'minimize',
				handler : function() {
					alert('click minimize');
				}
			}, {
				type : 'maximize',
				handler : function() {
					alert('click maximize');

					var window = new Ext.Window({
								title : 'Maximized Window'
							});

				}
			}],

	cls : 'x-portlet',

	initComponent : function() {

		var drawComponent = Ext.create('Ext.draw.Component', {
					width : 500,
					height : 300,
					renderTo : Ext.getBody()
				}),

		surface = drawComponent.surface;

		var red = new Ext.draw.Color(255, 0, 0);
		var blue = new Ext.draw.Color(0, 0, 255);
		var green = new Ext.draw.Color(0, 255, 0);
		var yellow = new Ext.draw.Color(255, 255, 0);

		var x = 20, y = 30;
		var x2 = drawComponent.width / 2, y2 = 20;
		var revenue_benchmark = 0;
		var expense_benchmark = 0;
		var tradeVol_benchmark = 0;
		var meeting_benchmark = 0;
		var event_benchmark = 0;

		benchmarkDataStore.each(function(record) {

					record.fields.each(function(field) {

								revenue_benchmark = record.get('REVENUE');
								expense_benchmark = record
										.get('TRAVEL_ENTERTAINMENT');
								tradeVol_benchmark = record.get('TRADE_VOLUME');
								meeting_benchmark = record.get('MEETING_COUNT');
								event_benchmark = record.get('EVENT_COUNT');

							});

				}, this);

		singleDataStore.each(function(record) {

					record.fields.each(function(field) {
								if (field.name == 'REVENUE') {
									var fieldValue = record.get(field.name);
									if (fieldValue > revenue_benchmark) {
										surface.add(createCircleSprit(x, y, 20,
												blue)).show(true);
									} else {
										surface.add(createCircleSprit(x, y, 20,
												blue)).show(true);
									}
								}
								if (field.name == 'TRAVEL_ENTERTAINMENT') {
									var fieldValue = record.get(field.name);
									if (fieldValue > expense_benchmark) {
										surface.add(createCircleSprit(x2, y2,
												20, red)).show(true);
									} else if (fieldValue == expense_benchmark) {
										surface.add(createCircleSprit(x2, y2,
												20, yellow)).show(true);
									} else {
										surface.add(createCircleSprit(x2, y2,
												20, green)).show(true);
									}
                   x2 = x2 + 30;
                  y2 = y2 + 40;
								}
								if (field.name == 'TRADE_VOLUME') {
									var fieldValue = record.get(field.name);
									if (fieldValue > tradeVol_benchmark) {
										surface.add(createCircleSprit(x, y, 20,
												blue)).show(true);
									} else {
										surface.add(createCircleSprit(x, y, 20,
												blue)).show(true);
									}

								}
								if (field.name == 'EVENT_COUNT') {
									var fieldValue = record.get(field.name);
									if (fieldValue > event_benchmark) {
										surface.add(createCircleSprit(x2, y2,
												20, red)).show(true);
									} else if (fieldValue == event_benchmark) {
										surface.add(createCircleSprit(x2, y2,
												20, yellow)).show(true);
									} else {
										surface.add(createCircleSprit(x2, y2,
												20, green)).show(true);
									}
                   x2 = x2 + 30;
                  y2 = y2 + 40;
								}
								if (field.name == 'MEETING_COUNT') {
									var fieldValue = record.get(field.name);
									if (fieldValue > meeting_benchmark) {
										surface.add(createCircleSprit(x2, y2,
												20, red)).show(true);
									} else if (fieldValue == meeting_benchmark) {
										surface.add(createCircleSprit(x2, y2,
												20, yellow)).show(true);
									} else {
										surface.add(createCircleSprit(x2, y2,
												20, green)).show(true);
									}
                  x2 = x2 + 30;
									y2 = y2 + 40;
								}
								x = x + 30;
								y = y + 30;
							});

				}, this);

		// Get references to my groups
		// circles = surface.getGroup('circles');

		// Animate the circles down

		Ext.apply(this, {
					layout : 'fit',
					autoWidth : true,
					autoHeight : true,
					items : drawComponent
				});

		this.callParent(arguments);
	},
	listeners : {
        updatedata : function(param) {
          // alert('inside update data..' + param);
          this.updateData(param);
        }
   },
    // prviate method
      updateData : function(param) {
        var file_url = 'data/BenchMarkData2.json';
        
    
      
        Ext.Ajax.request({
              url : file_url,
              success : function($response) {
                //alert('successs');
                //_this.el.unmask();
                var json_data = Ext.decode($response.responseText);
                //alert(json_data.Coverage);
                singleDataStore.loadData(json_data.Coverage);
              },
              method : 'GET',
              failure : function() {
                _this.el.unmask();
                alert('Error gettingContact Profile Info');
              }

            });
            drawComponent.refresh();

      },

	// Override Panel's default doClose to provide a custom fade out
	// effect
	// when a portlet is removed from the portal
	doClose : function() {
		alert('doClose');
	}

});

createCircleSprit = function(x_coordinate, y_coordinate, r, color) {
	// alert('createCircleSprit ' + x_coordinate + ' ' + y_coordinate);
	var circle = new Ext.draw.Sprite({
				type : 'circle',
				radius : r,
				fill : color,
				x : x_coordinate,
				y : y_coordinate
			});

	return circle;

}
