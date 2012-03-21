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
//        var _clientDataStore = Ext.create('Ext.data.Store', {
//            model: 'ClientAccount',
//            proxy: {
//                type: 'ajax',
//                url : jsonfile,
//                reader: {
//                    type : 'json',
//                    root : 'ClientAccounts'
//                }
//            },
//            autoLoad: true
//        });
//
//        return _clientDataStore;

        var storeData = Ext.create('Ext.data.JsonStore', {
            fields: ['ID', 'Name', 'Value'],
            data: [
                { "ID" : 123 ,
                    "Name" : "Acct 1",
                    "Value" : 250000},
                { "ID" : 124,
                    "Name" : "Acct 2",
                    "Value" : 70000},
                { "ID" : 125,
                    "Name" : "Acct 3",
                    "Value" : 75000},
                { "ID" : 126,
                    "Name" : "Acct 4",
                    "Value" : 90000},
                { "ID" : 127,
                    "Name" : "Acct 5",
                    "Value" : 120000}

            ]})
        ;
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



                items:[{

                        xtype: 'fieldset',
                        title: 'Filter',

                        collapsible: true,
                        defaults: {
                            labelWidth: 89,
                            anchor: '99%',
                            layoutConfig : {
                                type :'vbox',
                                align : 'stretch',
                                pack : 'start'
                            }

                        },
                        items: [

                            this._nameField,
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Date Range',
                                combineErrors: true,
                                msgTarget : 'side',

                                layoutConfig : {
                                    type :'vbox',
                                    align : 'stretch',
                                    pack : 'start',
                                    defaultMargins: {top: 0, right: 0, bottom: 5, left: 0}
                                },
                                defaults: {
                                    flex: 1,
                                    hideLabel: true
                                },
                                items: [{
                                    xtype     : 'datefield',
                                    name      : 'startDate',
                                    fieldLabel: 'Start',
                                    margin: '0 0 5 0'
                                },
                                    {
                                        xtype     : 'datefield',
                                        name      : 'endDate',
                                        fieldLabel: 'End'
                                    }
                                ]
                            },


                            {
                                xtype : 'fieldcontainer',
                                combineErrors: true,
                                msgTarget: 'side',
                                defaults: {
                                    hideLabel: true
                                },
                                items : [
                                    this._fieldComboBox
                                ]
                            }

                        ]
                    },
                        {
                            xtype: 'fieldset',
                            id : 'chart',
                            title: 'Client Account Break Down' ,
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
                field: 'Value',
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
                            value = rec.get('Value');
                            total += value;
                        });
                        this.setTitle(storeItem.get('Name') + ': ' +storeItem.get('Value')+ ' ('+Math.round(storeItem.get('Value') / total * 100) + '%)');
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
                    field: 'Name',
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
                    text   : 'name',
                    dataIndex: 'name'
                },
                {
                    text   : 'data',
                    dataIndex: 'data'
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

        this._clientAccountData = this.loadData('accounts.json');
        this._gridStore = this.genGridStore();
        this._gridPop = this.genGridPop();

        this._nameStr = 'John';
        this._fieldComboBox = this.genFieldComboBox();
        this._nameField = this.genNameField();

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

