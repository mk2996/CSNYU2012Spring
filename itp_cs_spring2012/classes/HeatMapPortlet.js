/*
* A portlet containing heat map
*/

//Data model that will store client's data coverage
/*
Ext.define('ClientCoverage', {
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'Metrics',     type: 'string'},
	         {name: 'Name',     type: 'string'},
	         {name: 'Value',   type: 'int'}
	         ]
});

function loadData(jsonfile){
	var clientDataStore = Ext.create('Ext.data.Store', {
		model: 'ClientCoverage',
		proxy: {
			type: 'ajax',
			url : jsonfile,
			reader: {
				type : 'json',
				root : 'coverage'
			}
		},
		autoLoad: true
	});

	return clientDataStore;
}*/

Ext.define('ClientAccount', {
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'ID',     type: 'int'},
	         {name: 'Name',     type: 'string'},
	         {name: 'Value',   type: 'int'}
	         ]
});

function loadData(jsonfile){
	var clientDataStore = Ext.create('Ext.data.Store', {
		model: 'ClientAccount',
		proxy: {
			type: 'ajax',
			url : jsonfile,
			reader: {
				type : 'json',
				root : 'ClientAccounts'
			}
		},
		autoLoad: true
	});

	return clientDataStore;
}

Ext.define('Ext.app.HeatMapPortlet', {

    extend: 'Ext.grid.Panel',
    alias: 'widget.heatmapportlet',

    requires: [
        'Ext.data.JsonStore',
        'Ext.chart.theme.Base',
        'Ext.chart.series.Series',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric'
    ],

    initComponent: function(){

    	Ext.apply(this, {
            height: this.height,
            store: loadData('accounts.json'),
            stripeRows: true,
            columnLines: true,
            columns: [{
                id       :'Id',
                text   : 'ID',
                flex: 1,
                sortable : true,
                dataIndex: 'ID'
            },{
                text   : 'Client',
                width    : 75,
                sortable : true,
                dataIndex: 'Name'
            },{
                text   : 'Value',
                width    : 75,
                sortable : true,
                dataIndex: 'Value'
            }]
        });

        this.callParent(arguments);
    }
});

