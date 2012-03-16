var store = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
    data: [
        { 'name': 'Trade Volume',   'data1':159.166, 'data2':12},
        { 'name': 'Revenue',   'data1':372.92,  'data2':36699660 },
        { 'name': 'Travel & Expense', 'data1':367.26,  'data2':2 },
        { 'name': 'Meeting Count',  'data1':170,  'data2':14 },
        { 'name': 'Event Count',  'data1':855.5, 'data2':38 }
    ]
});

Ext.onReady(function() {
Ext.create('Ext.chart.Chart', {
    renderTo: Ext.getBody(),
    width: 500,
    height: 300,
    animate: true,
    store: store,
    axes: [{
        type: 'Numeric',
        position: 'bottom',
        fields: ['data1'],
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        title: 'Sample Values',
        grid: true,
        minimum: 0
    }, {
        type: 'Category',
        position: 'left',
        fields: ['name'],
        title: 'Sample Metrics'
    }],
    series: [{
        type: 'bar',
        axis: 'bottom',
        highlight: true,
        tips: {
          trackMouse: true,
          width: 140,
          height: 28,
          renderer: function(storeItem, item) {
            this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') );
          }
        },
        label: {
          display: 'insideEnd',
            field: 'data1',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'horizontal',
            color: '#333',
            'text-anchor': 'middle'
        },
        xField: 'name',
        yField: ['data1']/['data2']
        
    }]
});
});