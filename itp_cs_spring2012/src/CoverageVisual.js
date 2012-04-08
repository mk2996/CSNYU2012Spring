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

var coverageDataStore = Ext.create('Ext.data.Store', {
			model : 'ClientAccount',
			proxy : {
				type : 'ajax',
				url : 'data/coverage_top10.json',
				reader : {
					type : 'json',
					root : 'Coverage'
				}
			},
			autoLoad : true
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
		},
		updateSingleData : function(param) {
			// alert('updateSingleData...' + param);
			this.updateSingleData(param);
		}
	},
	radius : 50,// default radius
	/*
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
			}],*/

	cls : 'x-portlet',
	drawComponent : null,

	initComponent : function() {

		var drawComponent = Ext.create('Ext.draw.Component', {
					width : 700,
					height : 300,
					renderTo : Ext.getBody(),
					id : "drawComponent"
				});

		var resource_x_coordinate = drawComponent.width / 2;
		var rev_x = 70;
		var rev_y = 70;

		var tradeVol_x = 70;
		var tradeVol_y = 210;

		var expense_x = 200;
		var expense_y = 70;
		
		var meeting_x = 250;
    var meeting_y = 210;

    var event_x = 400;
    var event_y = 200;

		/** REVENUE * */
		var value = getValue('REVENUE');
		var benchmark_val = getBenchmarkValue('REVENUE');
		var avg_revenue_value = coverageDataStore.average('REVENUE');
		var std_dev_revenue = calculateStandardDeviation(avg_revenue_value,
				'REVENUE')
		// alert(value + ' ' + avg_revenue_value + ' '+std_dev_revenue);

		var revenue_circle = createCircleSprit(this.radius, rev_x,
				rev_y, value, benchmark_val, 'revenue_cir_id',
				'REVENUE', avg_revenue_value, std_dev_revenue, false);
		var revenue_text_sprite = createTextSprite(rev_x - this.radius, rev_y 
		, 'Revenue\n'
						+ Ext.util.Format.currency(value, '$', 2),
				'revenue_text_id');
		drawComponent.surface.add(revenue_circle).show(true);
		drawComponent.surface.add(revenue_text_sprite).show(true);

		/** TRADE VOLUME * */
		var tradeVol_value = getValue('TRADE_VOLUME');
		var tradeVol_benchmark = getBenchmarkValue('TRADE_VOLUME');
		var avg_tradeVol_value = coverageDataStore.average('TRADE_VOLUME');
		var std_dev_tradeVol = calculateStandardDeviation(avg_revenue_value,
				'TRADE_VOLUME')

		var tradeVol_circle = createCircleSprit(this.radius, tradeVol_x,
				tradeVol_y, tradeVol_value, tradeVol_benchmark,
				'tradeVol_cir_id', 'TRADE_VOLUME', avg_tradeVol_value,
				std_dev_tradeVol, false);
		var tradeVol_text_sprite = createTextSprite(tradeVol_x - this.radius,
				tradeVol_y, 'Trade Volume\n'
						+ Ext.util.Format.number(tradeVol_value, '000,000.00'),
				'tradeVol_text_id');
		drawComponent.surface.add(tradeVol_circle).show(true);
		drawComponent.surface.add(tradeVol_text_sprite).show(true);

		/** TRAVEL & EXPENSE * */
		var expense_val = getValue('TRAVEL_ENTERTAINMENT');
		var expense_benchmark = getBenchmarkValue('TRAVEL_ENTERTAINMENT');
		var avg_expense_value = coverageDataStore
				.average('TRAVEL_ENTERTAINMENT');
		var std_dev_expense = calculateStandardDeviation(avg_expense_value,
				'TRAVEL_ENTERTAINMENT')

		var expense_circle = createCircleSprit(this.radius,
				expense_x, expense_y, expense_val, expense_benchmark,
				'expense_cir_id', 'TRAVEL_ENTERTAINMENT', avg_expense_value,
				std_dev_expense, false);
		var expense_text_sprite = createTextSprite(expense_x - 40,
				expense_y, 'Travel & Expense\n'
						+ Ext.util.Format.currency(expense_val, '$', 2),
				'expense_text_id');
		drawComponent.surface.add(expense_circle).show(true);
		drawComponent.surface.add(expense_text_sprite).show(true);

		/** MEETING * */
		var meeting_val = getValue('MEETING_COUNT');
		var meeting_benchmark = getBenchmarkValue('MEETING_COUNT');
		var avg_meeting_value = coverageDataStore.average('MEETING_COUNT');
		var std_dev_meeting = calculateStandardDeviation(avg_meeting_value,
				'MEETING_COUNT')

		var meeting_circle = createCircleSprit(this.radius,
				meeting_x, meeting_y, meeting_val,
				meeting_benchmark, 'meeting_cir_id', 'MEETING_COUNT',
				avg_meeting_value, std_dev_meeting, false);
		var meeting_text_sprite = createTextSprite(meeting_x - this.radius,
				meeting_y, 'Meeting Count \n'
						+ Ext.util.Format.number(meeting_val, '00,000.00'),
				'meeting_text_id');
		drawComponent.surface.add(meeting_circle).show(true);
		drawComponent.surface.add(meeting_text_sprite).show(true);

		/** EVENT * */
		var event_val = getValue('EVENT_COUNT');
		var event_benchmark = getBenchmarkValue('EVENT_COUNT');
		var avg_event_value = coverageDataStore.average('EVENT_COUNT');
		var std_dev_event = calculateStandardDeviation(avg_event_value,
				'EVENT_COUNT')

		var event_circle = createCircleSprit(this.radius, event_x, event_y, event_val, event_benchmark, 'event_cir_id',
				'EVENT_COUNT', avg_event_value, std_dev_event, false);
		var event_text_sprite = createTextSprite(event_x - this.radius,
				event_y, 'Event Count \n'
						+ Ext.util.Format.number(event_val, '00,000.00'),
				'event_text_id');
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

		var file_url = '';
		if (param == 'top10ByRevenue') {
			file_url = 'data/Top10ByRevenue.json';
		}
		if (param == 'bottom10ByRevenue') {
			file_url = 'data/Bottom10ByRevenue.json';
		}
		if (param == 'top10ByExpense') {
			file_url = 'data/Top10ByExpense.json';
		}
		if (param == 'bottom10ByExpense') {
			file_url = 'data/Bottom10ByExpense.json';
		}

		Ext.Ajax.request({
					url : file_url,
					success : function($response) {
						// alert('successs');
						// _this.el.unmask();
						var json_data = Ext.decode($response.responseText);
						// alert(json_data.Coverage);
						coverageDataStore.loadData(json_data.Coverage);
					},
					method : 'GET',
					failure : function() {
						_this.el.unmask();
						alert('Error gettingContact Profile Info');
					}

				});

		Ext.getCmp('drawComponent').surface.removeAll(true);

		//var resource_x_coordinate = Ext.getCmp('drawComponent').width / 2;
		//var y_coordinate = Ext.getCmp('drawComponent').height / 2;
		
		var rev_x = 70;
    var rev_y = 70;

    var tradeVol_x = 70;
    var tradeVol_y = 210;

    var expense_x = 200;
    var expense_y = 70;
    
    var meeting_x = 250;
    var meeting_y = 210;

    var event_x = 400;
    var event_y = 200;


		var value = getValue('REVENUE');
		var avg_revenue_value = coverageDataStore.average('REVENUE');
		var std_dev_revenue = calculateStandardDeviation(avg_revenue_value,
				'REVENUE')
		var benchmark_val = getBenchmarkValue('REVENUE');
		var revenue_circle = createCircleSprit(this.radius, rev_x, rev_y, value,
				benchmark_val, 'REVENUE', avg_revenue_value, std_dev_revenue, false);
		var revenue_text_sprite = createTextSprite(rev_x - this.radius, rev_y, 'Revenue\n'
						+ Ext.util.Format.currency(value, '$', 2));
		Ext.getCmp('drawComponent').surface.add(revenue_circle).show(true);
		Ext.getCmp('drawComponent').surface.add(revenue_text_sprite).show(true);

		/** TRADE VOLUME * */
		var tradeVol_value = getValue('TRADE_VOLUME');
		var tradeVol_benchmark = getBenchmarkValue('TRADE_VOLUME');
		var avg_tradeVol_value = coverageDataStore.average('TRADE_VOLUME');
		var std_dev_tradeVol = calculateStandardDeviation(avg_revenue_value,
				'TRADE_VOLUME')

		var tradeVol_circle = createCircleSprit(this.radius, tradeVol_x, tradeVol_y,
				tradeVol_value, tradeVol_benchmark, 'tradeVol_cir_id',
				'TRADE_VOLUME', avg_tradeVol_value, std_dev_tradeVol, false);
		var tradeVol_text_sprite = createTextSprite(tradeVol_x- this.radius,
				tradeVol_y, 'Trade Volume\n'
						+ Ext.util.Format.number(tradeVol_value, '000,000.00'),
				'tradeVol_text_id');
		Ext.getCmp('drawComponent').surface.add(tradeVol_circle).show(true);
		Ext.getCmp('drawComponent').surface.add(tradeVol_text_sprite)
				.show(true);

		/** TRAVEL & EXPENSE * */
		var expense_val = getValue('TRAVEL_ENTERTAINMENT');
		var expense_benchmark = getBenchmarkValue('TRAVEL_ENTERTAINMENT');
		var avg_expense_value = coverageDataStore
				.average('TRAVEL_ENTERTAINMENT');
		var std_dev_expense = calculateStandardDeviation(avg_expense_value,
				'TRAVEL_ENTERTAINMENT')

		var expense_circle = createCircleSprit(this.radius,
				expense_x, expense_y, expense_val, expense_benchmark,
				'expense_cir_id', 'TRAVEL_ENTERTAINMENT', false);
		var expense_text_sprite = createTextSprite(expense_x - this.radius,
				expense_y, 'Travel & Expense\n'
						+ Ext.util.Format.currency(expense_val, '$', 2),
				'expense_text_id');
		Ext.getCmp('drawComponent').surface.add(expense_circle).show(true);
		Ext.getCmp('drawComponent').surface.add(expense_text_sprite).show(true);

		/** MEETING * */
		var meeting_val = getValue('MEETING_COUNT');
		var meeting_benchmark = getBenchmarkValue('MEETING_COUNT');
		var avg_meeting_value = coverageDataStore.average('MEETING_COUNT');
		var std_dev_meeting = calculateStandardDeviation(avg_meeting_value,
				'MEETING_COUNT')

		var meeting_circle = createCircleSprit(this.radius,
				meeting_x, meeting_y, meeting_val,
				meeting_benchmark, 'meeting_cir_id', 'MEETING_COUNT',
				avg_meeting_value, std_dev_meeting, false);
		var meeting_text_sprite = createTextSprite(meeting_x - this.radius,
				meeting_y, 'Meeting Count \n'
						+ Ext.util.Format.number(meeting_val, '0,000.00'),
				'meeting_text_id');
		Ext.getCmp('drawComponent').surface.add(meeting_circle).show(true);
		Ext.getCmp('drawComponent').surface.add(meeting_text_sprite).show(true);

		/** EVENT * */
		var event_val = getValue('EVENT_COUNT');
		var event_benchmark = getBenchmarkValue('EVENT_COUNT');
		var avg_event_value = coverageDataStore.average('EVENT_COUNT');
		var std_dev_event = calculateStandardDeviation(avg_event_value,
				'EVENT_COUNT')

		var event_circle = createCircleSprit(this.radius, event_x, event_y, 
		    event_val, event_benchmark, 'event_cir_id',
				'EVENT_COUNT', avg_event_value, std_dev_event, false);
		var event_text_sprite = createTextSprite(event_x - this.radius,
				event_y, 'Event Count \n'
						+ Ext.util.Format.number(event_val, '00,000.00'),
				'event_text_id');
		Ext.getCmp('drawComponent').surface.add(event_circle).show(true);
		Ext.getCmp('drawComponent').surface.add(event_text_sprite).show(true);

	},

	// prviate method
	updateSingleData : function(param) {
		// alert('updateSingleData' + param);
		var file_url = 'data/ClientsJSON/Client' + param + '.json';

		Ext.Ajax.request({
					url : file_url,
					success : function($response) {
						// alert('successs');
						// _this.el.unmask();
						var json_data = Ext.decode($response.responseText);
						// alert(json_data.Coverage);
						coverageDataStore.loadData(json_data.Coverage);
					},
					method : 'GET',
					failure : function() {
						//_this.el.unmask();
						alert('Error gettingContact Profile Info');
					}

				});

		Ext.getCmp('drawComponent').surface.removeAll(true);

		//var resource_x_coordinate = Ext.getCmp('drawComponent').width / 2;
		//var y_coordinate = Ext.getCmp('drawComponent').height / 2;
		
		var rev_x = 70;
    var rev_y = 70;

    var tradeVol_x = 70;
    var tradeVol_y = 210;

    var expense_x = 200;
    var expense_y = 70;
    
    var meeting_x = 250;
    var meeting_y = 210;

    var event_x = 400;
    var event_y = 200;

		var value = getValue('REVENUE');
		var benchmark_val = getBenchmarkValue('REVENUE');
		var revenue_circle = createCircleSprit(this.radius, rev_x, rev_y, value,
				benchmark_val, 'REVENUE', true);
		var revenue_text_sprite = createTextSprite(rev_x - this.radius, rev_y, 'Revenue\n'
						+ Ext.util.Format.currency(value, '$', 2));
		Ext.getCmp('drawComponent').surface.add(revenue_circle).show(true);
		Ext.getCmp('drawComponent').surface.add(revenue_text_sprite).show(true);

		/** TRADE VOLUME * */
		var tradeVol_value = getValue('TRADE_VOLUME');
		var tradeVol_benchmark = getBenchmarkValue('TRADE_VOLUME');
		var tradeVol_circle = createCircleSprit(this.radius, tradeVol_x, tradeVol_y,
				tradeVol_value, tradeVol_benchmark, 'tradeVol_cir_id',
				'TRADE_VOLUME', true);
		var tradeVol_text_sprite = createTextSprite(tradeVol_x - this.radius,
				tradeVol_y, 'Trade Volume\n'
						+ Ext.util.Format.number(tradeVol_value, '000,000.00'),
				'tradeVol_text_id');
		Ext.getCmp('drawComponent').surface.add(tradeVol_circle).show(true);
		Ext.getCmp('drawComponent').surface.add(tradeVol_text_sprite)
				.show(true);

		/** TRAVEL & EXPENSE * */
		var expense_val = getValue('TRAVEL_ENTERTAINMENT');
		var expense_benchmark = getBenchmarkValue('TRAVEL_ENTERTAINMENT');
		var expense_circle = createCircleSprit(this.radius,
				expense_x, expense_y, expense_val, expense_benchmark,
				'expense_cir_id', 'TRAVEL_ENTERTAINMENT', true);
		var expense_text_sprite = createTextSprite(expense_x - this.radius,
				expense_y, 'Travel & Expense\n'
						+ Ext.util.Format.currency(expense_val, '$', 2),
				'expense_text_id');
		Ext.getCmp('drawComponent').surface.add(expense_circle).show(true);
		Ext.getCmp('drawComponent').surface.add(expense_text_sprite).show(true);

		/** MEETING * */
		var meeting_val = getValue('MEETING_COUNT');
		var meeting_benchmark = getBenchmarkValue('MEETING_COUNT');
		var meeting_circle = createCircleSprit(this.radius,
				meeting_x, meeting_y, meeting_val,
				meeting_benchmark, 'meeting_cir_id', 'MEETING_COUNT', true);
		var meeting_text_sprite = createTextSprite(meeting_x - this.radius,
				meeting_y, 'Meeting Count \n'
						+ Ext.util.Format.number(meeting_val, '0,000.00'),
				'meeting_text_id');
		Ext.getCmp('drawComponent').surface.add(meeting_circle).show(true);
		Ext.getCmp('drawComponent').surface.add(meeting_text_sprite).show(true);

		/** EVENT * */
		var event_val = getValue('EVENT_COUNT');
		var event_benchmark = getBenchmarkValue('EVENT_COUNT');
		var event_circle = createCircleSprit(this.radius, event_x,event_y, event_val, event_benchmark, 'event_cir_id',
				'EVENT_COUNT', true);
		var event_text_sprite = createTextSprite(event_x - this.radius,
				event_y, 'Event Count \n'
						+ Ext.util.Format.number(event_val, '00,000.00'),
				'event_text_id');
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
		benchMark_val, sprite_id, fieldname, avg, std_dev, singleClient) {
	// alert('createCircleSprit ' + x_coordinate + ' ' + y_coordinate);

	var circleColor = blue;
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

	if (fieldname == 'REVENUE' || fieldname == 'TRADE_VOLUME') {
	   
		if (value > benchMark_val) {
			circleColor = blue.getDarker(0.15);

		} else if (value == benchMark_val) {
			circleColor = blue;

		} else if (value < benchMark_val) {
			circleColor = blue.getLighter(0.15);
		}
	}

	var rad = r;
	var stdev_1 = Number(avg) + Number(std_dev);
	var stddev_neg_1 = Number(avg) - Number(std_dev);
	var stdev_2 = Number(avg) + (2 * Number(std_dev));
	var stddev_neg_2 = Number(avg) - (2 * Number(std_dev));

	// alert(value + ' ' + avg + ' '+stdev_1);

	if ((value >= avg) && (value < stdev_1)) {
		rad = r + 5;
	}

	if (value >= stdev_2) {
		rad = r + 15;
	}

	if (value <= stddev_neg_2) {
		rad = r - 15;
	}

	if (value < avg && value >= stddev_neg_1) {
		rad = r - 5;
	}

	if (value >= stdev_1 && value < stdev_2) {
		rad = r + 10;
	}

	if (value < stddev_neg_1 && value > stddev_neg_2) {
		rad = r - 10;
	}
	//alert(rad);
	var circle = new Ext.draw.Sprite({
				type : 'circle',
				radius : rad,
				fill : circleColor,
				x : x_coordinate,
				y : y_coordinate,
				id : sprite_id,
				listeners : {
					mouseover : {
						fn : function() {
							if (value != 0  && singleClient == false) {
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
				id : text_sprite_id
			});

	return textSprite;

}

getValue = function(field_name) {
	var totalValue = 0;

	coverageDataStore.each(function(record) {
				// alert(fieldname + ' ' + record.get(field_name));
				totalValue = Number(totalValue)
						+ Number(record.get(field_name));
			}, this);

	/*
	 * coverageDataStore.each(function(record) {
	 * 
	 * totalValue = totalValue + record.get(field_name); }, this);
	 */

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

				store : coverageDataStore,
				shadow : true,
				legend : {
					position : 'right'
				},
				insetPadding : 10,
				theme : 'Base:gradients',

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
								font : '11px Arial'
							}
						}]
			});
	return pieChart;
}

calculateStandardDeviation = function(average, fieldname) {

	var deviation_sum = 0;
	coverageDataStore.each(function(record) {
				// alert(fieldname + ' ' + record.get(field_name));
				var temp_dev = record.get(fieldname) - average
				deviation_sum += (temp_dev * temp_dev);
			}, this);

	var stddevn = Math.sqrt(deviation_sum / (coverageDataStore.getCount()))
			.toFixed(2); // 6 decimal places
	return stddevn;

}