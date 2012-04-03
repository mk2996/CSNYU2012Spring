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

/**
 * Define colors
 */
var red = new Ext.draw.Color(255, 0, 0);
var blue = new Ext.draw.Color(0, 0, 255);
var green = new Ext.draw.Color(0, 255, 0);
var yellow = new Ext.draw.Color(255, 255, 0);

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
	radius : 50,//default radius
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
	drawComponent : null,

	initComponent : function() {

		var drawComponent = Ext.create('Ext.draw.Component', {
					width : 500,
					height : 300,
					renderTo : Ext.getBody(),
					id : "drawComponent"
				});

		var resource_x_coordinate = drawComponent.width / 2;
		var y_coordinate = drawComponent.height / 2;
		/** REVENUE * */
		var value = getValue('REVENUE');
		var benchmark_val = getBenchmarkValue('REVENUE');
		var revenue_circle = createCircleSprit(this.radius, 40, 40, value,
				benchmark_val, 'revenue_cir_id', 'REVENUE');
		var revenue_text_sprite = createTextSprite(20, 20, 'Revenue\n'
						+ Ext.util.Format.currency(value, '$', 2),
				'revenue_text_id');
		drawComponent.surface.add(revenue_circle).show(true);
		drawComponent.surface.add(revenue_text_sprite).show(true);

		/** TRADE VOLUME **/
		var tradeVol_value = getValue('TRADE_VOLUME');
		var tradeVol_benchmark = getBenchmarkValue('TRADE_VOLUME');
		var tradeVol_circle = createCircleSprit(this.radius, 40, y_coordinate,
				tradeVol_value, tradeVol_benchmark, 'tradeVol_cir_id',
				'TRADE_VOLUME');
		var tradeVol_text_sprite = createTextSprite(20, y_coordinate,
				'Trade Volume\n' + Ext.util.Format.number(tradeVol_value,'000,000.00'), 'tradeVol_text_id');
		drawComponent.surface.add(tradeVol_circle).show(true);
		drawComponent.surface.add(tradeVol_text_sprite).show(true);

		/** TRAVEL & EXPENSE * */
		var expense_val = getValue('TRAVEL_ENTERTAINMENT');
		var expense_benchmark = getBenchmarkValue('TRAVEL_ENTERTAINMENT');
		var expense_circle = createCircleSprit(this.radius, resource_x_coordinate, 40,
				expense_val, expense_benchmark, 'expense_cir_id',
				'TRAVEL_ENTERTAINMENT');
		var expense_text_sprite = createTextSprite(resource_x_coordinate - 40,
				40, 'Travel & Expense\n'
						+ Ext.util.Format.currency(expense_val, '$', 2),
				'expense_text_id');
		drawComponent.surface.add(expense_circle).show(true);
		drawComponent.surface.add(expense_text_sprite).show(true);

		/** MEETING * */
		var meeting_val = getValue('MEETING_COUNT');
		var meeting_benchmark = getBenchmarkValue('MEETING_COUNT');
		var meeting_circle = createCircleSprit(this.radius, resource_x_coordinate + 100,
				120, meeting_val, meeting_benchmark, 'meeting_cir_id',
				'MEETING_COUNT');
		var meeting_text_sprite = createTextSprite(resource_x_coordinate + 60,
				120, 'Meeting Count \n' + meeting_val, 'meeting_text_id');
		drawComponent.surface.add(meeting_circle).show(true);
		drawComponent.surface.add(meeting_text_sprite).show(true);

		/** EVENT * */
		var event_val = getValue('EVENT_COUNT');
		var event_benchmark = getBenchmarkValue('EVENT_COUNT');
		var event_circle = createCircleSprit(this.radius, resource_x_coordinate + 200,
				200, event_val, event_benchmark, 'event_cir_id', 'EVENT_COUNT');
		var event_text_sprite = createTextSprite(resource_x_coordinate + 160,
				200, 'Event Count \n' + event_val, 'event_text_id');
		drawComponent.surface.add(event_circle).show(true);
		drawComponent.surface.add(event_text_sprite).show(true);

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

		Ext.getCmp('drawComponent').surface.removeAll(true);

		var resource_x_coordinate = Ext.getCmp('drawComponent').width / 2;
		var y_coordinate = Ext.getCmp('drawComponent').height / 2;

		var value = getValue('REVENUE');
		var benchmark_val = getBenchmarkValue('REVENUE');
		var revenue_circle = createCircleSprit(this.radius, 40, 40, value,
				benchmark_val, 'REVENUE');
		var revenue_text_sprite = createTextSprite(20, 20, 'Revenue\n'
						+ Ext.util.Format.currency(value, '$', 2));
		Ext.getCmp('drawComponent').surface.add(revenue_circle).show(true);
		Ext.getCmp('drawComponent').surface.add(revenue_text_sprite).show(true);

		/** TRADE VOLUME **/
		var tradeVol_value = getValue('TRADE_VOLUME');
		var tradeVol_benchmark = getBenchmarkValue('TRADE_VOLUME');
		var tradeVol_circle = createCircleSprit(this.radius, 40, y_coordinate,
				tradeVol_value, tradeVol_benchmark, 'tradeVol_cir_id',
				'TRADE_VOLUME');
		var tradeVol_text_sprite = createTextSprite(20, y_coordinate,
				'Trade Volume\n' + Ext.util.Format.number(tradeVol_value,'000,000.00'), 'tradeVol_text_id');
		Ext.getCmp('drawComponent').surface.add(tradeVol_circle).show(true);
		Ext.getCmp('drawComponent').surface.add(tradeVol_text_sprite)
				.show(true);

		/** TRAVEL & EXPENSE * */
		var expense_val = getValue('TRAVEL_ENTERTAINMENT');
		var expense_benchmark = getBenchmarkValue('TRAVEL_ENTERTAINMENT');
		var expense_circle = createCircleSprit(this.radius, resource_x_coordinate, 40,
				expense_val, expense_benchmark, 'expense_cir_id',
				'TRAVEL_ENTERTAINMENT');
		var expense_text_sprite = createTextSprite(resource_x_coordinate - 40,
				40, 'Travel & Expense\n'
						+ Ext.util.Format.currency(expense_val, '$', 2),
				'expense_text_id');
		Ext.getCmp('drawComponent').surface.add(expense_circle).show(true);
		Ext.getCmp('drawComponent').surface.add(expense_text_sprite).show(true);

		/** MEETING * */
		var meeting_val = getValue('MEETING_COUNT');
		var meeting_benchmark = getBenchmarkValue('MEETING_COUNT');
		var meeting_circle = createCircleSprit(this.radius, resource_x_coordinate + 100,
				120, meeting_val, meeting_benchmark, 'meeting_cir_id',
				'MEETING_COUNT');
		var meeting_text_sprite = createTextSprite(resource_x_coordinate + 60,
				120, 'Meeting Count \n' + meeting_val, 'meeting_text_id');
		Ext.getCmp('drawComponent').surface.add(meeting_circle).show(true);
		Ext.getCmp('drawComponent').surface.add(meeting_text_sprite).show(true);

		/** EVENT * */
		var event_val = getValue('EVENT_COUNT');
		var event_benchmark = getBenchmarkValue('EVENT_COUNT');
		var event_circle = createCircleSprit(this.radius, resource_x_coordinate + 200,
				200, event_val, event_benchmark, 'event_cir_id', 'EVENT_COUNT');
		var event_text_sprite = createTextSprite(resource_x_coordinate + 160,
				200, 'Event Count \n' + event_val, 'event_text_id');
		Ext.getCmp('drawComponent').surface.add(event_circle).show(true);
		Ext.getCmp('drawComponent').surface.add(event_text_sprite).show(true);

	},

	// Override Panel's default doClose to provide a custom fade out
	// effect
	// when a portlet is removed from the portal
	doClose : function() {
		alert('doClose');
	}

});

createCircleSprit = function(r, x_coordinate, y_coordinate, value,
		benchMark_val, sprite_id, fieldname) {
	// alert('createCircleSprit ' + x_coordinate + ' ' + y_coordinate);

	var circleColor = null;
	if (fieldname == 'MEETING_COUNT' || fieldname == 'TRAVEL_ENTERTAINMENT'
			|| fieldname == 'EVENT_COUNT') {
		if (value > benchMark_val) {
			circleColor = red;

		} else if (value == benchMark_val) {
			circleColor = yellow;

		} else if (value < benchMark_val) {
			circleColor = green;
		}
	}

	var circle = new Ext.draw.Sprite({
				type : 'circle',
				radius : r,
				fill : circleColor,
				x : x_coordinate,
				y : y_coordinate,
				id : sprite_id,
				listeners : {
					mouseover : {
						fn : function() {
							var pieChart = genPieChart(fieldname);

							var tip = Ext.create('Ext.tip.ToolTip', {
										items : [pieChart],
										title : 'Client Account Breakdown By '
												+ fieldname,
										layout : {
											type : 'fit',
											align : 'stretch'
										},
										target : sprite_id,
										anchor : 'right',
										closable : true,
										closeAction : 'hide'

									});
							tip.show();
						}
					}
				}
			});

	return circle;

}

createTextSprite = function(x_coordinate, y_coordinate, txtToDisplay,
		text_sprite_id) {
	// alert('createCircleSprit ' + x_coordinate + ' ' + y_coordinate);
	// alert("txtToDisplay : " + txtToDisplay);
	var textSprite = new Ext.draw.Sprite({
				type : 'text',
				x : x_coordinate,
				y : y_coordinate,
				text : txtToDisplay,
				font : '11px Arial',
				stroke : '#fff',
				id : text_sprite_id
			});

	return textSprite;

}

getValue = function(field_name) {
	var totalValue = 0;

	clientDataStore.each(function(record) {

				totalValue = totalValue + record.get(field_name);
			}, this);

	return totalValue;
}

getBenchmarkValue = function(field_name) {
	var benchmark_value = 0;

	benchmarkDataStore.each(function(record) {

				benchmark_value = benchmark_value + record.get(field_name);
			}, this);

	return benchmark_value;
}

genPieChart = function(fieldname) {
	// alert('genPieChart '+clientDataStore.count());
	// alert(fieldname);
	var pieChart = new Ext.chart.Chart({
				id : fieldname + '_pieChart',
				animate : true,
				height : 200,
				width : 200,

				store : clientDataStore,
				shadow : true,
				legend : {
					position : 'right'
				},
				insetPadding : 10,
				theme : 'Base:gradients',
				genGridPop : function() {
					var grid = Ext.create('Ext.grid.Panel', {
								store : clientDataStore,
								height : 130,
								width : 480,
								columns : [{
											text : 'Client: ',
											dataIndex : 'CLIENT_NAME'
										}, {
											text : fieldname,
											dataIndex : fieldname
										}]
							});
					return grid;
				},
				series : [{
							type : 'pie',
							field : fieldname,
							showInLegend : false,
							donut : false,
							listeners : {
								itemmousedown : function() {
									alert('afterrender');
								}
							},
							label : {
								field : 'CLIENT_NAME',
								display : 'rotate',
								contrast : true,
								font : '12px Arial'
							}
						}]
			});
	return pieChart;
}