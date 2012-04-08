//Ext.BLANK_IMAGE_URL = 'ext-3.3.1/resources/images/default/s.gif';

//Ext.Ajax.timeout = 90000;

Ext.namespace("app");

/**
 * Container class to initialize CMT application. create a singleton instance
 * and return viewport 1. Tools Panel (formerly North Panel) - CMT search panel
 * 
 * @see northpanel folder for components TODO: change nomenclature to
 *      tools-panel. 2. Widgets Panel (formerly South Panel, deprecated) - CMT
 *      Widgets container
 * @see south panel folder components TODO: change nomenclature to
 *      widgets-panel.
 */
app.Container = function() {
	return {
		id : 'cmtViewPort',
		northPanel : null,
		clientSouthPanel : null,
		viewport : null,
		currentSouthTabId : 'contacts-grid-contactsPortalTab',
		currentNorthtTabId : 'contacts-grid-contactsPortalTab',

		init : function() {
			var _this = this;
			Ext.QuickTips.init();

			_this.northPanel = _this.createNorthPanel();
			_this.southPanel = _this.createSouthPanel();

			var viewport = new Ext.Viewport({
						autoScroll : true,
						items : [_this.northPanel, _this.southPanel]
					});

		}
	};
}();

app.Container.createNorthPanel = function() {
	var _this = this;

	var cmtNorthPanel = Ext.create('Ext.form.Panel', {
				renderTo : 'docbody',
				title : 'North Panel',
				region : 'north',
				autoHeight : true,
				bodyPadding : 10,
				defaults : {
					labelWidth : 100
				},

				items : {
					xtype : 'tabpanel',
					plain : true,
					activeTab : 0,
					defaults : {
						bodyStyle : 'padding:10px'
					},

					items : [{
						title : 'Employees',
						autoHeight : true,
						autoWidth : true,
						bodyPadding : 10,
						defaults : {
							anchor : '100%',
							labelWidth : 100
						},
						items : [{
							xtype : 'button',
							text : 'Top 10 By Revenue',
							handler : function() {
								Ext.getCmp('client_data_widget').fireEvent(
										'updatedata', 'top10ByRevenue');
//								Ext.getCmp('overall_porlet_widget').fireEvent(
//										'updatedata', 'top10ByRevenue');
//								Ext.getCmp('coverage_visual_widget').fireEvent(
//										'updatedata', 'top10ByRevenue');
								window.PageBus.publish("com.cs.cmt.overall.title",
                                "Client Account Break Down By Top 10 Revenue");
							}
						}, {
							xtype : 'button',
							text : 'Bottom 10 By Revenue',
							handler : function() {
								Ext.getCmp('client_data_widget').fireEvent(
										'updatedata', 'bottom10ByRevenue');
//								Ext.getCmp('overall_porlet_widget').fireEvent(
//										'updatedata', 'bottom10ByRevenue');
//								Ext.getCmp('coverage_visual_widget').fireEvent(
//										'updatedata', 'bottom10ByRevenue');
								window.PageBus.publish("com.cs.cmt.overall.title",
                                "Client Account Break Down By Bottom 10 Revenue");
							}
						}, {
							xtype : 'button',
							text : 'Top 10 By Expense',
							handler : function() {
								Ext.getCmp('client_data_widget').fireEvent(
										'updatedata', 'top10ByExpense');
//								Ext.getCmp('overall_porlet_widget').fireEvent(
//										'updatedata', 'top10ByExpense');
//								Ext.getCmp('coverage_visual_widget').fireEvent(
//										'updatedata', 'top10ByExpense');
								window.PageBus.publish("com.cs.cmt.overall.title",
                                "Client Account Break Down By Top 10 Expense");
							}
						}, {
							xtype : 'button',
							text : 'Bottom 10 By Expense',
							handler : function() {
								Ext.getCmp('client_data_widget').fireEvent(
										'updatedata', 'bottom10ByExpense');
//								Ext.getCmp('overall_porlet_widget').fireEvent(
//										'updatedata', 'bottom10ByExpense');
//								Ext.getCmp('coverage_visual_widget').fireEvent(
//										'updatedata', 'bottom10ByExpense');
								window.PageBus.publish("com.cs.cmt.overall.title",
                                "Client Account Break Down By Bottom 10 Expense");
							}
						}]
					}, {
						title : 'Calendar',
						autoHeight : true,
						autoWidth : true,
						bodyPadding : 10,
						defaults : {
							anchor : '100%',
							labelWidth : 100
						}
					}]
				}
			});

	return cmtNorthPanel;
};

/**
 * Create a south panel containing widgets
 * @return south panel
 */
app.Container.createSouthPanel = function() {
	var _this = this;

	_this.clientDataWidget = Ext.create('Ext.app.ClientDataWidget', {
				datafile : 'data/coverage2.json',
				id : 'client_data_widget'
			})

//	_this.coverageVisualPorletWidget = Ext.create(
//			'Ext.app.CoverageVisualPorlet', {
//				id : 'coverage_visual_widget'
//			});
//	_this.overallPortletWidget = Ext.create('Ext.app.OverallPortlet', {
//				datafile : 'data/coverage_top10.json',
//				id : 'overall_porlet_widget'
//
//			});
	
	_this.scatterPortletWidget = Ext.create('Ext.app.ScatterPortlet', {
        datafile : 'data/coverage_top10.json',
        id : 'scatter_porlet_widget'

    });

	var cmtSouthPanel = Ext.create('Ext.form.Panel', {
				renderTo : 'docbody',
				title : 'South Panel',
				region : 'south',
				autoHeight : true,
				bodyPadding : 10,
				activeTab : 0,

				defaults : {
					labelWidth : 100
				},

				items : {
					xtype : 'tabpanel',
					plain : true,
					activeTab : 1,
					defaults : {
						bodyStyle : 'padding:10px'
					},

					items : [{
								id : 'clientAccounts',
								title : 'Client Accounts',
								autoHeight : true,
								autoWidth : true,
								bodyPadding : 10,
								defaults : {
									anchor : '100%',
									labelWidth : 100
								}
							}, {
								id : 'portal',
								title : 'Portal',
								xtype : 'portalpanel',
								autoHeight : true,
								autoWidth : true,
								bodyPadding : 10,
								defaults : {
									anchor : '100%',
									labelWidth : 100
								},
								items : [{
									id : 'col1',
									items : [_this.clientDataWidget]
								}, {
									id : 'col2',
									items : [_this.scatterPortletWidget]
								}]
							}]
				}
			});

	return cmtSouthPanel;
};
