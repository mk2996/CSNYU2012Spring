/**
 * Created by JetBrains WebStorm.
 * User: MorganCH
 * Date: 2/24/12
 * Time: 8:17 PM
 * To change this template use File | Settings | File Templates.
 */


var storeData = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
    data: [
        { 'name': 'metric one',   'data1': 10, 'data2': 12, 'data3': 14, 'data4': 8,  'data5': 13 },
        { 'name': 'metric two',   'data1': 7,  'data2': 8,  'data3': 16, 'data4': 10, 'data5': 3  },
        { 'name': 'metric three', 'data1': 5,  'data2': 2,  'data3': 14, 'data4': 12, 'data5': 7  },
        { 'name': 'metric four',  'data1': 2,  'data2': 14, 'data3': 6,  'data4': 1,  'data5': 23 },
        { 'name': 'metric five',  'data1': 27, 'data2': 38, 'data3': 36, 'data4': 13, 'data5': 33 }
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

Ext.onReady(function() {
    Ext.QuickTips.init();

    var clientAccountData = loadData('accounts.json');

    Ext.define('Employee', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'email',     type: 'string'},
            {name: 'title',     type: 'string'},
            {name: 'firstName', type: 'string'},
            {name: 'lastName',  type: 'string'},
            {name: 'phone-1',   type: 'string'},
            {name: 'phone-2',   type: 'string'},
            {name: 'phone-3',   type: 'string'},
            {name: 'hours',     type: 'number'},
            {name: 'minutes',   type: 'number'},
            {name: 'startDate', type: 'date'},
            {name: 'endDate',   type: 'date'}
        ]
    });

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

    var grid = Ext.create('Ext.grid.Panel', {
        store: gridStore,
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

    var chart,nameStr = 'John';
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
                nameStr = combo.getValue();
                if(nameStr == 'revenue'){
//                    Ext.getCmp('chart').removeAll(false);
//                    Ext.getCmp('chart').add(lineChart);
                    Ext.getCmp('lineChart').setVisible(false);
                    Ext.getCmp('pieChart').setVisible(true);
                } else if (nameStr == 'hoursSpent'){
//                    Ext.getCmp('chart').removeAll();
//                    Ext.getCmp('chart').add(Ext.create('Ext.chart.Chart',pieChart.getState()));
//                    Ext.getCmp('chart').add(pieChart);
                    Ext.getCmp('lineChart').setVisible(true);
                    Ext.getCmp('pieChart').setVisible(false);
                }
                Ext.getCmp('saler').setValue(nameStr);

        	}
    	}

    });



//    // install resize event listener
//    fieldComboBox.on('select', function(combo, records, eOpts) {
//        nameStr = combo.getValue();
//        if(nameStr == 'revenue'){
//            nameStr = 'Revenue';
//        }
//        Ext.getCmp('saler').setValue(nameStr);
//    });

    var nameField = Ext.create('Ext.form.TextField',{
        id      : 'saler',
        fieldLabel: 'Sales Person',
        value     : nameStr
    });

    var pieChart = new Ext.chart.Chart({
//        xtype: 'chart',
        id: 'pieChart',
        animate: true,
        height: 300,

        store: storeData,
        shadow: true,
        legend: {
            position: 'right'
        },
        insetPadding: 10,
        theme: 'Base:gradients',
        series: [{
            type: 'pie',
            field: 'data2',
            showInLegend: true,
            donut: false,
            tips: {
                trackMouse: true,
                width: 580,
                height: 170,
                items : {
                    xtype : 'container',
                    layout : 'hbox',
                    items: [grid]
                },
                renderer: function(storeItem, item) {
                    // calculate percentage.
                    var total = 0;
                    var value = 0;
                    clientAccountData.each(function(rec) {
                        value = rec.get('Value');
                        total += value;
                    });
                    this.setTitle(storeItem.get('Name') + ': ' +storeItem.get('Value')+ ' ('+Math.round(storeItem.get('Value') / total * 100) + '%)');
//			    		        				   gridStore.loadData(pieModel);

                    grid.setSize(480,130);
                }
            },
            highlight: {
                segment: {
                    margin: 20
                }
            },
            label: {
                field: 'name',
                display: 'rotate',
                contrast: true,
                font: '18px Arial'
            }
        }]
    });

    var lineChart = new Ext.chart.Chart({

//        width: 800,
        id: 'lineChart',
        height: 300,
        animate: true,
        hidden: true,
        store: storeData,
        shadow: true,
        theme: 'Category1',
        legend: {
            position: 'right'
        },
        axes: [{
            type: 'Numeric',
            minimum: 0,
            position: 'left',
            fields: ['data1', 'data2', 'data3'],
            title: 'Number of Hits',
            grid: {
                odd: {
                    opacity: 1,
                    fill: '#ddd',
                    stroke: '#bbb',
                    'stroke-width': 0.5
                }
            }
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: 'Month of the Year'
        }],
        series: [{
            type: 'line',
            highlight: {
                size: 7,
                radius: 7
            },
            axis: 'left',
            xField: 'name',
            yField: 'data1',
            markerCfg: {
                type: 'cross',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        }, {
            type: 'line',
            highlight: {
                size: 7,
                radius: 7
            },
            axis: 'left',
            fill: true,
            xField: 'name',
            yField: 'data3',
            markerCfg: {
                type: 'circle',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        }]
    });


    var form = Ext.create('Ext.form.Panel', {
        renderTo: 'docbody',
        title   : 'FieldContainers',
        autoHeight: true,
        width   : 800,
        bodyPadding: 10,
        defaults: {
//            anchor: '100%',
            labelWidth: 100
        },

        items: {
            xtype:'tabpanel',
            plain:true,
            activeTab: 1,
            defaults:{
                bodyStyle:'padding:10px'
            },

            items:[{
                title:'Client Accounts',
                autoHeight: true,
                autoWidth   : true,
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
                        anchor: '100%',
//                        layout: {
//                            type: 'vbox',
//                            defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
//                        }
                        layoutConfig : {
                            type :'vbox',
                            align : 'stretch',
                            pack : 'start'
                        }

                    },
                    items: [
//                        {
//                            xtype     : 'textfield',
//                            id      : 'saler',
//                            fieldLabel: 'Sales Person',
//                            value     : nameStr
////                            vtype: 'email',
////                            msgTarget: 'side',
////                            allowBlank: false
//                        },
                        nameField,
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Date Range',
                            combineErrors: true,
                            msgTarget : 'side',
//                            layout: 'hbox',
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
                                margin: '0 0 5 0',
//                                allowBlank: false
                            },
                                {
                                    xtype     : 'datefield',
                                    name      : 'endDate',
                                    fieldLabel: 'End',
//                                    allowBlank: false
                                }
                            ]
                        },


                        {
                            xtype : 'fieldcontainer',
                            combineErrors: true,
                            msgTarget: 'side',
//                            fieldLabel: 'Data Field',
                            defaults: {
                                hideLabel: true
                            },
                            items : [
                                fieldComboBox
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
                        anchor: '100%',
                        layout: {
                            type: 'hbox',
                            defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                        }
                    },
                    items: [

                        pieChart,
                        lineChart
                    ]
                }]
            }]
        }

//        buttons: [
//            {
//                text   : 'Load test data',
//                handler: function() {
//                    this.up('form').getForm().loadRecord(Ext.create('Employee', {
//                        'email'    : 'abe@sencha.com',
//                        'title'    : 'mr',
//                        'firstName': 'Abraham',
//                        'lastName' : 'Elias',
//                        'startDate': '01/10/2003',
//                        'endDate'  : '12/11/2009',
//                        'phone-1'  : '555',
//                        'phone-2'  : '123',
//                        'phone-3'  : '4567',
//                        'hours'    : 7,
//                        'minutes'  : 15
//                    }));
//                }
//            },
//            {
//                text   : 'Save',
//                handler: function() {
//                    var form = this.up('form').getForm(),
//                        s = '';
//                    if (form.isValid()) {
//                        Ext.iterate(form.getValues(), function(key, value) {
//                            s += Ext.util.Format.format("{0} = {1}<br />", key, value);
//                        }, this);
//
//                        Ext.Msg.alert('Form Values', s);
//                    }
//                }
//            },
//
//            {
//                text   : 'Reset',
//                handler: function() {
//                    this.up('form').getForm().reset();
//                }
//            }
//        ]
    });

//    Ext.create('widget.window',{
//        title: 'Layout Window',
//        closable: true,
//        closeAction: 'hide',
//        width: 600,
//        minWidth: 350,
//        height: 350,
//        layout: 'border',
//        bodyStyle: 'padding: 5px;',
//        items: form
//    });
    });