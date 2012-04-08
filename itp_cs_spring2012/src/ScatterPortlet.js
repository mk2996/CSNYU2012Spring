Ext.define('ScatterAttr', {
    extend : 'Ext.data.Model',
    fields : [{
        name : 'name',
        type : 'string'
    }, {
        name : 'xpos',
        type : 'int'
    }, {
        name : 'ypos',
        type : 'int'
    }, {
        name : 'value',
        type : 'float'
    }, {
        name : 'text',
        type : 'string'
    }]
});

var scatterStore = Ext.create('Ext.data.Store', {
    model: 'ScatterAttr',
    proxy: {
        type: 'ajax',
        url:'data/coverage_top10.json',
        reader: {
            type : 'json',
            root : 'ScatterPortlet'
        }
    },
    autoLoad: false
});
//
//var ScattreRecord = Ext.data.Model.create([ // creates a subclass of Ext.data.Record
//    {
//        name : 'name',
//        type : 'string'
//    }, {
//        name : 'xpos',
//        type : 'int'
//    }, {
//        name : 'ypos',
//        type : 'int'
//    }, {
//        name : 'value',
//        type : 'float'
//    }, {
//        name : 'text',
//        type : 'string'
//    }
//]);

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


Ext.define('Ext.app.ScatterPortlet', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.scatterportlet',
	title : 'Scatter Portlet',
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
	tools : [ {
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
	} ],

	cls : 'x-portlet',

	_chartStore : null,
	_gridPop : null,
	_chartImg : null,
	_nameStr : null,
	_ScatterChart : null,
	_form : null,
    _titleSubcription: null,

	requires : [ 'Ext.data.JsonStore', 'Ext.chart.theme.Base',
			'Ext.chart.series.Series', 'Ext.chart.series.Scatter', 'Ext.data.Record' ],

	genFormComponent : function() {
		var form = Ext.create('Ext.form.Panel', {
			autoHeight : true,
			bodyPadding : 10,
			defaults : {
				anchor : '100%',
				labelWidth : 100
			},

			items : [ {
				xtype : 'fieldset',
				id : 'scatter.chart',
				title : 'Client Account Break Down By Revenue',
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
				items : [

				this._ScatterChart

				]
			} ]

		});

		return form;
	},

store1 : Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'xpos', 'ypos', 'value', 'colorset'],
    data: [
        { 'name': "REVENUE",   'xpos': 100, 'ypos': 120, 'value':36699660, 'colorset': 1 },
        { 'name': "TRADE_VOLUME",   'xpos': 70,  'ypos': 80, 'value':15916642203, 'colorset': 1 },
        { 'name': "TRAVEL_ENTERTAINMENT", 'xpos': 20,  'ypos': 40, 'value':366996.60, 'colorset': 2 },
        { 'name': "MEETING_COUNT",  'xpos': 20,  'ypos': 140, 'value':8510, 'colorset': 2},
        { 'name': "EVENT_COUNT",  'xpos': 50, 'ypos': 38, 'value':170, 'colorset': 2 }
    ]
}),

    convertJsonStore : function(){
        var ScattreRecord = Ext.data.Model.create([ // creates a subclass of Ext.data.Record
            {
                name : 'name',
                type : 'string'
            }, {
                name : 'xpos',
                type : 'int'
            }, {
                name : 'ypos',
                type : 'int'
            }, {
                name : 'value',
                type : 'float'
            }, {
                name : 'text',
                type : 'string'
            }
        ]);

        var revenue=0, tradeVolume=0, expense=0, meeting=0, event=0;
        var xMax = 120, xMin = 30, yMax = 100, yMin = 30, xpos,ypos;
        clientDataStore.each(function(record) {
            revenue = revenue+ record.get('REVENUE');
            tradeVolume = tradeVolume+record.get('TRADE_VOLUME');
            expense = expense+record.get('TRAVEL_ENTERTAINMENT');
            meeting = meeting+record.get('MEETING_COUNT');
            event = event+record.get('EVENT_COUNT');
        }, this);

        scatterStore.add(new ScattreRecord({
            name: 'REVENUE',
            xpos: getRandomInt(xMin, xMax),
            ypos: getRandomInt(yMin, yMax),
            value: revenue,
            text: "REVENUE \n "+revenue
        }));

        scatterStore.add(new ScattreRecord({
            name: 'TRADE_VOLUME',
            xpos: getRandomInt(xMin, xMax),
            ypos: getRandomInt(yMin, yMax),
            value: tradeVolume,
            text: "TRADE_VOLUME \n "+ tradeVolume
        }));
        scatterStore.add(new ScattreRecord({
            name: 'TRAVEL_ENTERTAINMENT',
            xpos: getRandomInt(xMin, xMax),
            ypos: getRandomInt(yMin, yMax),
            value: expense,
            text: "TRAVEL_ENTERTAINMENT \n "+expense
        }));
        scatterStore.add(new ScattreRecord({
            name: 'MEETING_COUNT',
            xpos: getRandomInt(xMin, xMax),
            ypos: getRandomInt(yMin, yMax),
            value: meeting,
            text: "MEETING_COUNT \n "+ meeting
        }));
        scatterStore.add(new ScattreRecord({
            name: 'EVENT_COUNT',
            xpos: getRandomInt(xMin, xMax),
            ypos: getRandomInt(yMin, yMax),
            value: event,
            text: "EVENT_COUNT \n "+ event
        }));
    },

    getScatterChart : function(){


      var ScatterChart = new Ext.chart.Chart({
          height: 300,
          width:300,
          animate: true,
          store: scatterStore,
//          store: this.store1,
          axes: false,
          insetPadding: 20,
          series: [
              {
              type: 'scatter',
              axis: false,
              xField: 'xpos',
              yField: 'ypos',
              label: {
                  display: 'middle',
                  field: 'text',
//                  renderer: function (name) { var record = this.store1.findRecord('name',name);
//                      return name+"\n"+record.get('value'); },
                  renderer: function (name) {
                      return name;},
                  'text-anchor': 'middle',
                  contrast: true
              },
              renderer: this.createHandler('name'),
              markerCfg: {
                  type: 'circle',
                  size: 2,
                  fill: '#a00',
                  'stroke-width': 0
              }
          }
          ]
      });
      return ScatterChart;
    },

    createLabelHandler:function(fieldname){
        return function(sprite, record, attr, index, store) {
            var theText = record.get('name');
            theText = "\n"+theText;
            return Ext.apply(attr, {
                text: theText
            });
        }
    },

    createHandler: function(fieldName) {
        return function(sprite, record, attr, index, store) {
            var circleColor = 0,
                benchMark_val = 10000,
                fieldname = record.get('name'),
                value = record.get('value');

            if (fieldname == 'MEETING_COUNT' || fieldname == 'TRAVEL_ENTERTAINMENT'
                || fieldname == 'EVENT_COUNT') {
                if (value > benchMark_val) {
                    circleColor = 0;

                } else if (value == benchMark_val) {
                    circleColor = 3;

                } else if (value < benchMark_val) {
                    circleColor = 2;
                }
            } else {
                if (value > benchMark_val) {
                    circleColor = 1;

                } else if (value == benchMark_val) {
                    circleColor = 3;

                } else if (value < benchMark_val) {
                    circleColor = 0;
                }
            }
            var fieldValue = 40;
            var color = ['rgb(255, 0, 0)',
                'rgb(0, 0, 255)',
                'rgb(0, 255, 0)',
                'rgb(255, 255, 0)'][circleColor];
            return Ext.apply(attr, {
                radius: fieldValue,
                fill: color
            });
        };
    },




	initComponent : function() {

		//this._gridPop = this.genGridPop();

		this._ScatterChart = this.getScatterChart();
		this._form = this.genFormComponent();
//        this._chartStore = new Ext.data.JsonStore({
//            id:'chartStore',
//            root: 'users',
//            model: 'ScatterAttr'
//
//        });
        this._titleSubcription = window.PageBus.subscribe(
            "com.cs.cmt.scatter.title",
            window,
            this.titleCallBackfun,
            {type:"ScatterPortlet"});


		Ext.apply(this, {
			layout : 'fit',
			autoWidth : true,
			autoHeight : true,
			items : this._form
		});

		this.callParent(arguments);
	},
	// prviate method
	updateData : function(param) {
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
				var json_data = Ext.decode($response.responseText);
				//alert(json_data.Coverage);
				//var store = Ext.StoreMgr.lookup('_clientAccountData');
				clientDataStore.loadData(json_data.Coverage);

			},
			method : 'GET',
			failure : function() {
				_this.el.unmask();
				alert('Error gettingContact Profile Info');
			}

		});

	},

    titleCallBackfun: function(subject, message, subscriberData){
        Ext.getCmp('scatter.chart').setTitle(message);
        scatterStore.removeAll();



        var revenue=0, tradeVolume=0, expense=0, meeting=0, event=0;
        var xMax = 120, xMin = 30, yMax = 100, yMin = 30, xpos,ypos;
        clientDataStore.each(function(record) {
            revenue = revenue+ record.get('REVENUE');
            tradeVolume = tradeVolume+record.get('TRADE_VOLUME');
            expense = expense+record.get('TRAVEL_ENTERTAINMENT');
            meeting = meeting+record.get('MEETING_COUNT');
            event = event+record.get('EVENT_COUNT');
        }, this);

        scatterStore.add(Ext.create('ScatterAttr',{
            name: 'REVENUE',
            xpos: getRandomInt(xMin, xMax),
            ypos: getRandomInt(yMin, yMax),
            value: revenue,
            text: "REVENUE \n "+revenue
        }));

        scatterStore.add(Ext.create('ScatterAttr',{
            name: 'TRADE_VOLUME',
            xpos: getRandomInt(xMin, xMax),
            ypos: getRandomInt(yMin, yMax),
            value: tradeVolume,
            text: "TRADE_VOLUME \n "+ tradeVolume
        }));
        scatterStore.add(Ext.create('ScatterAttr',{
            name: 'TRAVEL_ENTERTAINMENT',
            xpos: getRandomInt(xMin, xMax),
            ypos: getRandomInt(yMin, yMax),
            value: expense,
            text: "TRAVEL_ENTERTAINMENT \n "+expense
        }));
        scatterStore.add(Ext.create('ScatterAttr',{
            name: 'MEETING_COUNT',
            xpos: getRandomInt(xMin, xMax),
            ypos: getRandomInt(yMin, yMax),
            value: meeting,
            text: "MEETING_COUNT \n "+ meeting
        }));
        scatterStore.add(Ext.create('ScatterAttr',{
            name: 'EVENT_COUNT',
            xpos: getRandomInt(xMin, xMax),
            ypos: getRandomInt(yMin, yMax),
            value: event,
            text: "EVENT_COUNT \n "+ event
        }));
    },
	// Override Panel's default doClose to provide a custom fade out effect
	// when a portlet is removed from the portal
	doClose : function() {
		alert('doClose');
	}
});
