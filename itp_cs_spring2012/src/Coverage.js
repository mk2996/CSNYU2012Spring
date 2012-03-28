Ext.define('ClientCoverage', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'Type',
						type : 'string'
					}, {
						name : 'Percent_Value',
						type : 'int'
					}, {
						name : 'Actual_Value',
						type : 'int'
					}]
		});
		
var store = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
    data: [
        { 'name': 'metric one',   'data1':10, 'data2':12, 'data3':14, 'data4':8,  'data5':13 },
        { 'name': 'metric two',   'data1':7,  'data2':8,  'data3':16, 'data4':10, 'data5':3  },
        { 'name': 'metric three', 'data1':5,  'data2':2,  'data3':14, 'data4':12, 'data5':7  },
        { 'name': 'metric four',  'data1':2,  'data2':14, 'data3':6,  'data4':1,  'data5':23 },
        { 'name': 'metric five',  'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33 }
    ]
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

			_barChart : null,
			_form : null,
			_clientCoverageData : null,

			requires : ['Ext.data.JsonStore', 'Ext.chart.theme.Base',
					'Ext.chart.series.Series'],

			loadData : function(jsonfile) {
				var store_data = Ext.create('Ext.data.Store', {
							model : 'ClientCoverage',
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
				return store_data;
			},

			genFormComponent : function() {
				var form = Ext.create('Ext.form.Panel', {
							autoHeight : true,
							bodyPadding : 10,
							defaults : {
								anchor : '100%',
								labelWidth : 100
							},

							items : [{
										xtype : 'fieldset',
										id : 'barchart',
										title : 'Client Account',
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
										items : [this._barChart]
									}]

						});

				return form;
			},

			genBarChart : function() {
				var barChart = new Ext.chart.Chart({
					    renderTo: Ext.getBody(),
							id : 'barChart',
							animate : true,
							height : 300,
              store : store,
							axes : [{
										type : 'Category',
										position : 'left',
										fields : ['name'],
										title : 'Clients'
									}, {
										type : 'Numeric',
										position : 'bottom',
										fields : ['data1'],
										title : 'Percent',
										label : {
											renderer : Ext.util.Format
													.numberRenderer('0,0')
										}

									}],
							highlight : true,
              theme : 'Base:gradients',
      
							series : [{
								type : 'bar',
								axis:  'bottom',
								xField : 'data1',
								yField : ['name'],
								tips : {
									trackMouse : true,
									width : 140,
									height : 28,
									renderer : function(storeItem, item) {
										this.setTitle(storeItem.get('name')
												+ ': '
												+ storeItem
														.get('data1'));
									}
								},
								label : {
									display : 'insideEnd',
									field : 'Percent_Value',
									renderer : Ext.util.Format
											.numberRenderer('0'),
									orientation : 'horizontal',
									color : '#333'
								}

							}]

						});
				return barChart;
			},

			initComponent : function() {

				this._clientCoverageData = this.loadData('data/test_data.json');

				this._barChart = this.genBarChart();
				this._form = this.genFormComponent();

				Ext.apply(this, {
							layout : 'fit',
							autoWidth : true,
							autoHeight : true,
							items : this._form
						});

				this.callParent(arguments);
			},

			// Override Panel's default doClose to provide a custom fade out
			// effect
			// when a portlet is removed from the portal
			doClose : function() {
				alert('doClose');
			}
		});
