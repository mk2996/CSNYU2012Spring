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

/*
 * function loadData(jsonfile) { alert('loadData : '+jsonfile); var
 * clientDataStore = Ext.create('Ext.data.Store', { model : 'ClientAccount',
 * proxy : { type : 'ajax', url : jsonfile, reader : { type : 'json', root :
 * 'Coverage' } }, autoLoad : true });
 * 
 * return clientDataStore; }
 */

var clientDataStore = Ext.create('Ext.data.Store', {
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

Ext.define('Ext.app.ClientDataWidget', {
			extend : 'Ext.grid.Panel',
			alias : 'widget.clientData',
			requires : ['Ext.data.JsonStore'],

			title : 'Client Data',
			frame : true,
			closable : true,
			collapsible : true,
			animCollapse : true,
			draggable : true,
			id : 'ClientDataDisplay',
			

			listeners : {
				updatedata : function(param) {
					// alert('inside update data..' + param);
					this.updateData(param);
				},
			   itemclick: function(grid, record, item, rowIndex, event)   {
              //alert("You clicked row "+rowIndex+record.get('CLIENT_ID'));
              /*
              Ext.getCmp('coverage_visual_widget').fireEvent(
                    'updateSingleData', 'haha');*/
              Ext.getCmp('coverage_visual_widget').updateSingleData(record.get('CLIENT_ID'));
          }
			},
			
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
							Ext.getCmp(this).show()

						}
					}],*/

			cls : 'x-portlet',
			initComponent : function() {
				// alert(this.datafile)
				// var data = loadData(this.datafile);
				// var records = data.getRange();

				// alert(records.length);

				Ext.apply(this, {
							height : 300,
							layout : 'fit',
							store : clientDataStore,
							stripeRows : true,
							columnLines : true,

							columns : [{
										text : 'Client',
										width : 75,
										sortable : true,
										dataIndex : 'CLIENT_NAME'
									}, {
										text : 'Trade Volume',
										width : 75,
										sortable : true,
										dataIndex : 'TRADE_VOLUME'
									}, {
										text : 'Revenue',
										width : 75,
										sortable : true,
										dataIndex : 'REVENUE'

									}, {
										text : 'Travel & Entertainment',
										width : 75,
										sortable : true,
										dataIndex : 'TRAVEL_ENTERTAINMENT'
									}, {
										text : 'Event Count',
										width : 75,
										sortable : true,
										dataIndex : 'EVENT_COUNT'
									}, {
										text : 'Meeting Count',
										width : 75,
										sortable : true,
										dataIndex : 'MEETING_COUNT'
									}]

						});

				this.callParent(arguments);
			},

			selModel : new Ext.selection.Model({
						singleSelect : true,
						 listeners: {
                     click: function(smObj, rowIndex, record) {
                         alert('selected row : '+rowIndex)
                    }
						 }

					}),

			// prviate method
			updateData : function(param) {
				// alert('calling update data again..' + param);
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
								var json_data = Ext
										.decode($response.responseText);
								// alert(json_data.Coverage);
								clientDataStore.loadData(json_data.Coverage);
							},
							method : 'GET',
							failure : function() {
								_this.el.unmask();
								alert('Error gettingContact Profile Info');
							}

						});

			},

			// Override Panel's default doClose to provide a custom fade out
			// effect
			// when a portlet is removed from the portal
			doClose : function() {
				alert('doClose');
			}

		});
