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

function loadData(jsonfile) {
	var clientDataStore = Ext.create('Ext.data.Store', {
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

	return clientDataStore;
}

Ext.define('Ext.app.HeatMapPortlet', {

			extend : 'Ext.panel.Panel', // need to extend the panel

			alias : 'widget.heatmapportlet',

			requires : ['Ext.data.JsonStore'],

			//initialize configurations
			initComponent : function() {
        var data = loadData('coverage2.json');
        var records = data.getRange();

        alert(records.length);
        
				Ext.apply(this, {
							height : this.height,
							layout : 'fit',
							frame : true,
							html : records.length,
							listeners : {
								renderer : {
									element : 'body', 
									fn : function() {
									}
								}
							}
						});

				this.callParent(arguments);
			}

		});

initializeData = function() {
	alert("initializedata");
	var _this = this;
	var _data_store = loadData('coverage2.json');
	
	return _data_store;
	// this.createTemplate();

	// this._data = {};
	// this._tpl.overwrite(_this.body, _this._data);
};

function createTemplate(row_count, col_count){
	var table = "<table>";
	for(var row = 0; row < row_count; row++){
		table += "<tr>";
		for(var col = 0; col < col_count ; col++){
			table += "<td>{}</td>";
		}
		table += "</tr>"
	}
	return table;
}
