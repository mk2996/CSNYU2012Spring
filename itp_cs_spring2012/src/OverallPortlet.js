
Ext.define('Ext.app.OverallPortlet', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.overallportlet',

	frame : true,
	closable : true,
	collapsible : true,
	animCollapse : true,
	draggable : true,
	listeners : {
		updatedata : function(param) {
			//alert('inside update data..' + param);
			this.updateData(param);
		}
	},
	tools : [ {
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
	} ],

	cls : 'x-portlet',

	_chartStore : null,
	_gridPop : null,
	_chartImg : null,
	_nameStr : null,
	_PieChart : null,
	_form : null,
	_clientAccountData : null,

	requires : [ 'Ext.data.JsonStore', 'Ext.chart.theme.Base',
			'Ext.chart.series.Series', 'Ext.chart.series.Pie' ],

	loadData : function(jsonfile) {
		var storeData = Ext.create('Ext.data.Store', {
			model : 'ClientAccount',
			proxy : {
				type : 'ajax',
				url : jsonfile,
				reader : {
					type : 'json',
					root : 'Coverage'
				}
			},
			autoLoad : true
		});
		return storeData;
	},

	genFormComponent : function() {
		var form = Ext.create('Ext.form.Panel', {
			autoHeight : true,
			bodyPadding : 10,
			defaults : {
				anchor : '100%',
				labelWidth : 100
			},

			items : [ {
				xtype : 'fieldset',
				id : 'chart',
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

				this._PieChart

				]
			} ]

		});

		return form;
	},

	genPieChart : function() {
		var pieChart = new Ext.chart.Chart({
			id : 'pieChart',
			animate : true,
			height : 300,

			store : this._clientAccountData,
			shadow : true,
			legend : {
				position : 'left'
			},
			insetPadding : 20,
			theme : 'Base:gradients',
			series : [ {
				type : 'pie',
				field : 'REVENUE',
				showInLegend : true,
				donut : false,
				tips : {
					trackMouse : true,
					width : 200,
					height : 170,
					items : {
						xtype : 'container',
						layout : 'hbox',
						items : [ this._gridPop ]
					},
					renderer : function(storeItem, item) {
						// calculate percentage.
						var total = 0;
						var value = 0;
						this._clientAccountData.each(function(rec) {
							value = rec.get('REVENUE');
							total += value;
						});
						this.setTitle(storeItem.get('CLIENT_NAME')
								+ ': '
								+ storeItem.get('REVENUE')
								+ ' ('
								+ Math.round(storeItem.get('Value') / total
										* 100) + '%)');
					
						this._gridPop.setSize(480, 130);
					}
				},
				highlight : {
					segment : {
						margin : 20
					}
				},
				label : {
					field : 'CLIENT_NAME',
					display : 'rotate',
					contrast : true,
					font : '18px Arial'
				}
			} ]
		});
		return pieChart;
	},

	genGridPop : function() {
		var grid = Ext.create('Ext.grid.Panel', {
			store : this._gridStore,
			height : 130,
			width : 480,
			columns : [ {
				text : 'Client: ',
				dataIndex : 'CLIENT_NAME'
			}, {
				text : 'Revenue: ',
				dataIndex : 'REVENUE'
			} ]
		});
		return grid;
	},

	initComponent : function() {

		this._clientAccountData = this.loadData('data/coverage_top10.json');
		this._gridPop = this.genGridPop();

		this._PieChart = this.genPieChart();
		this._form = this.genFormComponent();

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
		//alert('calling update data again..' + param);
		if (param == 'top10ByRevenue') {
			this._clientAccountData.proxy.url = 'data/Top10ByRevenue.json';

		}
		if (param == 'bottom10ByRevenue') {
			this._clientAccountData.proxy.url = 'data/Bottom10ByRevenue.json';
		}
		if (param == 'top10ByExpense') {
			this._clientAccountData.proxy.url = 'data/Top10ByExpense.json';

		}
		if (param == 'bottom10ByExpense') {
			this._clientAccountData.proxy.url = 'data/Bottom10ByExpense.json';

		}
		this._clientAccountData.load();
		

	},
	// Override Panel's default doClose to provide a custom fade out effect
	// when a portlet is removed from the portal
	doClose : function() {
		alert('doClose');
	}
});
