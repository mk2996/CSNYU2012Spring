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
	         {name: 'CLIENT_ID',     type: 'int'},
	         {name: 'CLIENT_NAME',     type: 'string'},
	         {name: 'LAST_TRADE_DATE', type: 'string'},
	         {name: 'TRADE_VOLUME',   type: 'int'},
	         {name: 'REVENUE',   type: 'int'},
	         {name: 'TRAVEL_ENTERTAINMENT',   type: 'int'},
	         {name: 'EVENT_COUNT',   type: 'int'},
	         {name: 'MEETING_COUNT',   type: 'int'}
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
				root : 'Coverage'
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
            store: loadData('coverage2.json'),
            stripeRows: true,
            columnLines: true,
            columns: [{
                text   : 'Client',
                width    : 75,
                sortable : true,
                dataIndex: 'CLIENT_NAME'
            },{
                text   : 'Trade Volume',
                width    : 75,
                sortable : true,
                dataIndex: 'TRADE_VOLUME'
            },{
                text   : 'Revenue',
                width    : 75,
                sortable : true,
                dataIndex: 'REVENUE'
                
            },{
                text   : 'Travel & Entertainment',
                width    : 75,
                sortable : true,
                dataIndex: 'TRAVEL_ENTERTAINMENT'
            },{
                text   : 'Event Count',
                width    : 75,
                sortable : true,
                dataIndex: 'EVENT_COUNT'
            },{
                text   : 'Meeting Count',
                width    : 75,
                sortable : true,
                dataIndex: 'MEETING_COUNT'
            }]
        });

        this.callParent(arguments);
    }
});

