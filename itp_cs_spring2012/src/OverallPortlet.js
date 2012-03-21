

Ext.define('Ext.app.OverallPortlet', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.overallportlet',

    frame: true,
    closable: true,
    collapsible: true,
    animCollapse: true,
    draggable: true,
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
                title: 'Maximized Window'
            });

        }
    }],

    cls: 'x-portlet',

    _chartStore:null,
    _gridStore: null,
    _gridPop: null,
    _chartImg: null,
    _nameStr: null,
    _fieldComboBox: null,
    _nameField:null,
    _PieChart:null,
    _form:null,
    _clientAccountData:null,

    requires: [
        'Ext.data.JsonStore',
        'Ext.chart.theme.Base',
        'Ext.chart.series.Series',
        'Ext.chart.series.Pie'
    ],

    loadData: function(jsonfile){
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

    generateData: function(){
        var data = [{
            name: 'x',
            djia: 10000,
            sp500: 1100
        }],
            i;
        for (i = 1; i < 50; i++) {
            data.push({
                name: 'x' + i,
                sp500: data[i - 1].sp500 + ((Math.floor(Math.random() * 2) % 2) ? -1 : 1) * Math.floor(Math.random() * 7),
                djia: data[i - 1].djia + ((Math.floor(Math.random() * 2) % 2) ? -1 : 1) * Math.floor(Math.random() * 7)
            });
        }
        return data;
    },

    genFormComponent: function(){
        var form = Ext.create('Ext.form.Panel', {
            autoHeight: true,
            bodyPadding: 10,
            defaults: {
                anchor: '100%',
                labelWidth: 100
            },



                items:[
                        {
                            xtype: 'fieldset',
                            id : 'chart',
                            title: 'Client Account Break Down By Revenue' ,
                            collapsible: false,
                            defaults: {
                                labelWidth: 89,
                                anchor: '99%',
                                layout: {
                                    type: 'hbox',
                                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                                }
                            },
                            items: [

                                this._PieChart

                            ]
                        }
                    ]


        });

        return form;
    },

    genPieChart: function(){
        var pieChart = new Ext.chart.Chart({
            id: 'pieChart',
            animate: true,
            height: 300,

            store: this._clientAccountData,
            shadow: true,
            legend: {
                position: 'left'
            },
            insetPadding: 20,
            theme: 'Base:gradients',
            series: [{
                type: 'pie',
                field: 'REVENUE',
                showInLegend: true,
                donut: false,
                tips: {
                    trackMouse: true,
                    width: 200,
                    height: 170,
                    items : {
                        xtype : 'container',
                        layout : 'hbox',
                        items: [this._gridPop]
                    },
                    renderer: function(storeItem, item) {
                        // calculate percentage.
                        var total = 0;
                        var value = 0;
                        this._clientAccountData.each(function(rec) {
                            value = rec.get('REVENUE');
                            total += value;
                        });
                        this.setTitle(storeItem.get('CLIENT_NAME') + ': ' +storeItem.get('REVENUE')+ ' ('+Math.round(storeItem.get('Value') / total * 100) + '%)');
//			    		        				   gridStore.loadData(pieModel);

                        this._gridPop.setSize(480,130);
                    }
                },
                highlight: {
                    segment: {
                        margin: 20
                    }
                },
                label: {
                    field: 'CLIENT_NAME',
                    display: 'rotate',
                    contrast: true,
                    font: '18px Arial'
                }
            }]
        });
        return pieChart;
    },

    genNameField: function(){
        var nameField = Ext.create('Ext.form.TextField',{
            id      : 'saler',
            fieldLabel: 'Sales Person',
            value     : this._nameStr
        });
        return nameField;
    },

    genFieldComboBox: function(){
        var fieldComboBox = Ext.create('Ext.form.field.ComboBox',{
            width:          250,
            mode:           'local',
            value:          'revenue',
            triggerAction:  'all',
            forceSelection: true,
            editable:       false,
            fieldLabel:     'Data Field',
            name:           'dataField',
            displayField:   'name',
            valueField:     'value',
            queryMode: 'local',
            store:          Ext.create('Ext.data.Store', {
                fields : ['name', 'value'],
                data   : [
                    {name : 'Revenue',   value: 'revenue'},
                    {name : 'Phone Calls',  value: 'phoneCall'},
                    {name : 'Hours Spent', value: 'hoursSpent'},
                    {name : 'Expense', value: 'expense'},
                    {name : 'Trade Volumn', value: 'tradeVolumn'}
                ]
            }),
            listeners : {
                'select' : function(combo, record){
                    this._nameStr = combo.getValue();
                    if(this._nameStr == 'revenue'){
//                    Ext.getCmp('chart').removeAll(false);
//                    Ext.getCmp('chart').add(lineChart);
//                        Ext.getCmp('lineChart').setVisible(false);
                        Ext.getCmp('pieChart').setVisible(true);
                    } else if (this._nameStr == 'hoursSpent'){
//                    Ext.getCmp('chart').removeAll();
//                    Ext.getCmp('chart').add(Ext.create('Ext.chart.Chart',pieChart.getState()));
//                    Ext.getCmp('chart').add(pieChart);
//                        Ext.getCmp('lineChart').setVisible(true);
                        Ext.getCmp('pieChart').setVisible(false);
                    }
                    Ext.getCmp('saler').setValue(this._nameStr);

                }
            }

        });
        return fieldComboBox;
    },

    genGridPop:function(){
        var grid = Ext.create('Ext.grid.Panel', {
            store: this._gridStore,
            height: 130,
            width: 480,
            columns: [
                {
                    text   : 'Client: ',
                    dataIndex: 'CLIENT_NAME'
                },
                {
                    text   : 'Revenue: ',
                    dataIndex: 'REVENUE'
                }
            ]
        });
        return grid;
    },

    genGridStore:function(){
        var gridStore = Ext.create('Ext.data.JsonStore', {
            fields: ['name', 'data'],
            data: [
                {
                    name: 'Revenue',
                    data: 1000000
                },
                {
                    name: 'Expense',
                    data: 5000
                },
                {
                    name: 'Account Value',
                    data: 180000
                }
            ]
        });
        return gridStore;
    },

    initComponent: function(){

        this._clientAccountData = this.loadData('data/coverage_top10.json');
        this._gridStore = this.genGridStore();
        this._gridPop = this.genGridPop();

     
        this._PieChart = this.genPieChart();
        this._form = this.genFormComponent();

        Ext.apply(this, {
            layout: 'fit',
            autoWidth:true,
            autoHeight: true,
            items: this._form
        });

        this.callParent(arguments);
    },

    // Override Panel's default doClose to provide a custom fade out effect
    // when a portlet is removed from the portal
    doClose: function() {
        alert('doClose');
    }
});

