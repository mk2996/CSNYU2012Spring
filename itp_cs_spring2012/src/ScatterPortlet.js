Ext.define('ScatterAttr', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'name',
		type : 'string'
	}, {
		name : 'xpos',
		type : 'int'
	}, {
		name : 'ypos',
		type : 'int'
	}, {
		name : 'value',
		type : 'float'
	}, {
		name : 'text',
		type : 'string'
	} ]
});

var scatterStore = Ext.create('Ext.data.Store', {
	model : 'ScatterAttr',
	proxy : {
		type : 'ajax',
		url : 'data/coverage_top10.json',
		reader : {
			type : 'json',
			root : 'Coverage'
		}
	},
	autoLoad : false
});

/**
 * Returns a random integer between min and max Using Math.round() will give you
 * a non-uniform distribution!
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

Ext
		.define(
				'Ext.app.ScatterPortlet',
				{
					extend : 'Ext.panel.Panel',
					alias : 'widget.scatterportlet',
					title : 'Coverage Visual',
					frame : true,
					closable : true,
					autoScroll : true,
					animCollapse : true,
					draggable : true,

					listeners : {
						updatedata : function(param) {
							this.updateData(param);
						}
					},
					tools : [
							{
								type : 'minimize',
								handler : function() {
									alert('click minimize');
								}
							},
							{
								type : 'maximize',
								handler : function() {
									alert('click maximize');
									var coverageScatterPlot = Ext
											.getCmp('scatter.chart');

									win = Ext.create('widget.window', {
										title : 'Coverage',
										closable : true,
										closeAction : 'hide',
										width : 800,
										minWidth : 500,
										height : 500,
										layout : 'border',
										bodyStyle : 'padding: 5px;',
										items : [ {
											region : 'center',
											xtype : 'panel',
											items : [ coverageScatterPlot ]
										} ]
									});
									win.show(this);

								}
							} ],

					cls : 'x-portlet',

					_nameStr : null,
					_ScatterChart : null,
					_form : null,
					_titleSubcription : null,

					requires : [ 'Ext.data.JsonStore', 'Ext.chart.theme.Base',
							'Ext.chart.series.Series',
							'Ext.chart.series.Scatter', 'Ext.data.Record' ],
					tbar : [
							{
								xtype : 'button',
								text : 'Top 10',
								menu : {
									items : [
											{
												text : 'By Revenue',
												handler : function() {
													Ext
															.getCmp(
																	'scatter_porlet_widget')
															.fireEvent(
																	'updatedata',
																	'top10ByRevenue');
													window.PageBus
															.publish(
																	"com.cs.cmt.overall.title",
																	"Client Account Break Down By Top 10 Revenue");
												}
											},
											{
												text : 'By Travel & Entertaiment',
												handler : function() {
													Ext
															.getCmp(
																	'scatter_porlet_widget')
															.fireEvent(
																	'updatedata',
																	'top10ByExpense');
													window.PageBus
															.publish(
																	"com.cs.cmt.overall.title",
																	"Client Account Break Down By Top 10 T&E");

												}
											},
											{
												text : 'By Trade Volume',
												handler : function() {
													Ext
															.getCmp(
																	'scatter_porlet_widget')
															.fireEvent(
																	'updatedata',
																	'top10ByTradeVol');
													window.PageBus
															.publish(
																	"com.cs.cmt.overall.title",
																	"Client Account Break Down By Top 10 Trade Volume");

												}
											},
											{
												text : 'By Meetings',
												handler : function() {
													Ext
															.getCmp(
																	'scatter_porlet_widget')
															.fireEvent(
																	'updatedata',
																	'top10ByMeeting');
													window.PageBus
															.publish(
																	"com.cs.cmt.overall.title",
																	"Client Account Break Down By Top 10 Meeting");

												}
											},
											{
												text : 'By Events',
												handler : function() {
													Ext
															.getCmp(
																	'scatter_porlet_widget')
															.fireEvent(
																	'updatedata',
																	'top10ByEvent');
													window.PageBus
															.publish(
																	"com.cs.cmt.overall.title",
																	"Client Account Break Down By Top 10 Event");

												}
											} ]
								}
							},
							{
								xtype : 'button',
								text : 'Bottom 10',
								menu : {
									items : [
											{
												text : 'By Revenue',
												handler : function() {
													Ext
															.getCmp(
																	'scatter_porlet_widget')
															.fireEvent(
																	'updatedata',
																	'bottom10ByRevenue');
													window.PageBus
															.publish(
																	"com.cs.cmt.overall.title",
																	"Client Account Break Down By Bottom 10 Revenue");

												}

											},
											{
												text : 'By Travel & Entertaiment',
												handler : function() {
													Ext
															.getCmp(
																	'scatter_porlet_widget')
															.fireEvent(
																	'updatedata',
																	'bottom10ByExpense');
													window.PageBus
															.publish(
																	"com.cs.cmt.overall.title",
																	"Client Account Break Down By Bottom 10 Expense");

												}
											},
											{
												text : 'By Trade Volume',
												handler : function() {
													Ext
															.getCmp(
																	'scatter_porlet_widget')
															.fireEvent(
																	'updatedata',
																	'bottom10ByTradeVol');
													window.PageBus
															.publish(
																	"com.cs.cmt.overall.title",
																	"Client Account Break Down By Bottom 10 Trade Volume");

												}
											},
											{
												text : 'By Meetings',
												handler : function() {
													Ext
															.getCmp(
																	'scatter_porlet_widget')
															.fireEvent(
																	'updatedata',
																	'bottom10ByMeeting');
													window.PageBus
															.publish(
																	"com.cs.cmt.overall.title",
																	"Client Account Break Down By Bottom 10 Meeting");

												}
											},
											{
												text : 'By Events',
												handler : function() {
													Ext
															.getCmp(
																	'scatter_porlet_widget')
															.fireEvent(
																	'updatedata',
																	'bottom10ByEvent');
													window.PageBus
															.publish(
																	"com.cs.cmt.overall.title",
																	"Client Account Break Down By Bottom 10 Event");

												}

											} ]
								}
							} ],

					genFormComponent : function() {
						var form = Ext.create('Ext.form.Panel', {
							autoHeight : true,
							bodyPadding : 10,
							defaults : {
								anchor : '100%',
								labelWidth : 100
							},
							id : 'formPanel',
							layout : 'fit',

							items : [ {
								xtype : 'fieldset',
								id : 'scatter.chart',
								title : 'Client Account Break Down By Revenue',
								collapsible : false,
								defaults : {
									labelWidth : 89,
									anchor : '99%',
									layout : {
										type : 'hbox',
										defaultMargins : {
											top : 0,
											right : 5,
											bottom : 0,
											left : 0
										}
									}
								},
								items : [

								this._ScatterChart

								]
							} ]

						});

						return form;
					},

					/**
					 * Generate Scatter Chart
					 * 
					 * @returns {Ext.chart.Chart} Scatter Chart
					 */
					getScatterChart : function(totalClientView) {

						var ScatterChart = new Ext.chart.Chart(
								{
									height : 300,
									width : 300,
									animate : true,
									store : scatterStore,
									axes : false,
									insetPadding : 20,
									id : 'scatterChartId',
									series : [ {
										type : 'scatter',
										axis : false,
										xField : 'xpos',
										yField : 'ypos',
										label : {
											display : 'middle',
											field : 'text',
											renderer : function(name) {
												return name;
											},
											'text-anchor' : 'middle',
											contrast : true
										},
										tips : {
											trackMouse : true,
											width : 140,
											height : 50,
											hidden : (totalClientView == false),
											renderer : function(storeItem, item) {
												// this.setTitle(storeItem.get('name')
												// + ': '
												// + storeItem.get('value')+"\n
												// Double Click to View
												// Details");
												if (totalClientView == true) {
													this
															.setTitle("Double Click to View Details");
												}

											}
										},
										listeners : {
											itemmouseup : function(a, b, c, d,
													e) {
												if (totalClientView == true) {
													generatePieChart(a.storeItem.data.name);
												}
											},

										},
										renderer : this.createHandler('name'),
										markerCfg : {
											type : 'circle',
											size : 2,
											fill : '#a00',
											'stroke-width' : 0
										}
									} ]
								});
						return ScatterChart;
					},

					createLabelHandler : function(fieldname) {
						return function(sprite, record, attr, index, store) {
							var theText = record.get('name');
							theText = "\n" + theText;
							return Ext.apply(attr, {
								text : theText
							});
						};
					},

					createHandler : function(fieldName) {
						return function(sprite, record, attr, index, store) {
							var circleColor = 0, benchMark_val = 10000, fieldname = record
									.get('name'), value = record.get('value');

							if (fieldname == 'MEETING_COUNT'
									|| fieldname == 'TRAVEL_ENTERTAINMENT'
									|| fieldname == 'EVENT_COUNT') {
								if (value > benchMark_val) {
									circleColor = 0;

								} else if (value == benchMark_val) {
									circleColor = 3;

								} else if (value < benchMark_val) {
									circleColor = 2;
								}
							} else {
								if (value > benchMark_val) {
									circleColor = 1;

								} else if (value == benchMark_val) {
									circleColor = 3;

								} else if (value < benchMark_val) {
									circleColor = 0;
								}
							}
							var fieldValue = 40;
							var color = [ 'rgb(255, 0, 0)', 'rgb(0, 0, 255)',
									'rgb(0, 255, 0)', 'rgb(255, 255, 0)' ][circleColor];
							return Ext.apply(attr, {
								radius : fieldValue,
								fill : color
							});
						};
					},

					initComponent : function() {

						this._ScatterChart = this.getScatterChart(true);
						this._form = this.genFormComponent();

						this._titleSubcription = window.PageBus.subscribe(
								"com.cs.cmt.overall.title", window,
								this.titleCallBackfun, {
									type : "ScatterPortlet"
								});

						Ext.apply(this, {
							layout : 'fit',
							autoWidth : true,
							autoHeight : true,
							items : this._form
						});

						this.callParent(arguments);
					},
					// prviate method
					updateData : function(param) {
						// alert('updateData');
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
						if (param == 'top10ByTradeVol') {
							file_url = 'data/Top10ByTradeVolume.json';
						}
						if (param == 'bottom10ByTradeVol') {
							file_url = 'data/Bottom10ByTradeVolume.json';
						}
						if (param == 'top10ByMeeting') {
							file_url = 'data/Top10ByMeetingCnt.json';
						}
						if (param == 'bottom10ByMeeting') {
							file_url = 'data/Bottom10ByMeetingCnt.json';
						}
						if (param == 'top10ByEvent') {
							file_url = 'data/Top10ByEventCnt.json';
						}
						if (param == 'bottom10ByEvent') {
							file_url = 'data/Bottom10ByEventCnt.json';
						}

						Ext.Ajax.request({
							url : file_url,
							success : function($response) {

								// alert(file_url);
								// _this.el.unmask();
								scatterStore.removeAll();
								var json_data = Ext
										.decode($response.responseText);
								clientDataStore.loadData(json_data.Coverage);

								updateScatterStore();

							},
							method : 'GET',
							failure : function() {
								_this.el.unmask();
								alert('Error gettingContact Profile Info');
							}

						});

					},

					titleCallBackfun : function(subject, message,
							subscriberData) {
						Ext.getCmp('scatter.chart').setTitle(message);
						// scatterStore.removeAll();

						// circle sizes
						// 20,25,30,35,40
						updateScatterStore();
					},

				});

generatePieChart = function(fieldname) {
	// alert("generatePieChartAndGridDate : " + fieldname)
	Ext.getCmp('scatter.chart').setTitle("Client Breakdown by " + fieldname);

	var pieChart = Ext.create('Ext.chart.Chart', {
		width : 300,
		height : 300,
		animate : false,
		store : clientDataStore,
		shadow : false,
		insetPadding : 0,
		theme : 'Base:gradients',
		id : 'pieChart',

		series : [ {
			type : 'pie',
			field : fieldname,
			showInLegend : true,
			label : {
				field : 'CLIENT_NAME',
				display : 'rotate',
				contrast : true,
				font : '9px Arial'
			},
			listeners : {
				itemmouseup : function(a, b, c, d, e) {
					// alert(a.storeItem.data.CLIENT_ID);
					generateScatterPlotForClient(a.storeItem.data.CLIENT_ID);
				}

			},
			tips : {
				trackMouse : true,
				width : 300,
				height : 200,
				renderer : function(storeItem, item) {
					var total = 0;
					var value = 0;
					clientDataStore.each(function(rec) {
						value = rec.get(fieldname);
						total += value;
					});
					this.setTitle(storeItem.get('CLIENT_NAME')
							+ '\n'
							+ fieldname
							+ ' : '
							+ storeItem.get(fieldname)
							+ ' ('
							+ Math
									.round(storeItem.get(fieldname) / total
											* 100) + '%)');
				}
			},
		} ]
	});

	var fieldSetScatter = Ext.getCmp('scatter.chart');
	var scatterChart = Ext.getCmp('scatterChartId');
	fieldSetScatter.remove(scatterChart, true);
	fieldSetScatter.add(pieChart);

};

generateScatterPlotForClient = function(client_id) {
	// alert("generateScatterPlotForClient.." + client_id);

	var file_url = 'data/ClientsJSON/Client' + client_id + '.json';
	Ext.getCmp('scatter.chart').setTitle(
			"Coverage Visual Chart for Client ID : " + client_id)

	Ext.Ajax.request({
		url : file_url,
		success : function($response) {
			// alert('successs');
			var json_data = Ext.decode($response.responseText);
			clientDataStore.loadData(json_data.Coverage);
			updateScatterStore();
		},
		method : 'GET',
		failure : function() {
			// _this.el.unmask();
			alert('Error gettingContact Profile Info');
		}

	});
	var fieldSetScatter = Ext.getCmp('scatter.chart');
	var pieChart = Ext.getCmp('pieChart');
	alert(pieChart);
	fieldSetScatter.remove(pieChart, true);

	var scatterChart = Ext.getCmp('scatter_porlet_widget').getScatterChart(
			false);
	fieldSetScatter.add(scatterChart);

};

updateScatterStore = function() {
	scatterStore.removeAll();
	var revenue = 0, tradeVolume = 0, expense = 0, meeting = 0, event = 0;
	var xMax = 120, xMin = 50, yMax = 100, yMin = 50, xpos, ypos;

	// circle sizes
	// 30, 35, 40, 45, 50
	clientDataStore.each(function(record) {
		revenue = revenue + record.get('REVENUE');
		tradeVolume = tradeVolume + record.get('TRADE_VOLUME');
		expense = expense + record.get('TRAVEL_ENTERTAINMENT');
		meeting = meeting + record.get('MEETING_COUNT');
		event = event + record.get('EVENT_COUNT');
		// alert(record.get('EVENT_COUNT'));
	}, this);

	scatterStore.add(Ext.create('ScatterAttr', {
		name : 'REVENUE',
		xpos : 5,
		ypos : 50,
		value : revenue,
		text : "REVENUE \n " + Ext.util.Format.currency(revenue, '$', 2)
	}));

	scatterStore.add(Ext.create('ScatterAttr', {
		name : 'TRADE_VOLUME',
		xpos : 5,
		ypos : 70,
		value : tradeVolume,
		text : "TRADE_VOLUME \n "
				+ Ext.util.Format.number(tradeVolume, '000,000.00')
	}));
	scatterStore.add(Ext.create('ScatterAttr', {
		name : 'TRAVEL_ENTERTAINMENT',
		xpos : 50,
		ypos : 70,
		value : expense,
		text : "TRAVEL_ENTERTAINMENT \n "
				+ Ext.util.Format.currency(expense, '$', 2)
	}));
	scatterStore.add(Ext.create('ScatterAttr', {
		name : 'MEETING_COUNT',
		xpos : 50,
		ypos : 50,
		value : meeting,
		text : "MEETING_COUNT \n "
				+ Ext.util.Format.number(meeting, '000,000.00')
	}));
	scatterStore.add(Ext.create('ScatterAttr', {
		name : 'EVENT_COUNT',
		xpos : 50,
		ypos : 90,
		value : event,
		text : "EVENT_COUNT \n " + Ext.util.Format.number(event, '000,000.00')
	}));

	var fieldSetScatter = Ext.getCmp('scatter.chart');
	var pieChart = Ext.getCmp('pieChart');
	// alert(pieChart);
	if (pieChart != null) {
		fieldSetScatter.remove(pieChart, true);

		var scatterChart = Ext.getCmp('scatter_porlet_widget').getScatterChart(
				true);
		fieldSetScatter.add(scatterChart);
	}
};

calculateTotal = function(fieldname) {
	var total = 0;
	clientDataStore.each(function(record) {
		total = total + record.get(fieldname);
	}, this);
};
