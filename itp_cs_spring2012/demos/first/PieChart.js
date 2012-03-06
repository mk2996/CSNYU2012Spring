/**
 * Created by JetBrains WebStorm. User: MorganCH Date: 2/24/12 Time: 8:17 PM To
 * change this template use File | Settings | File Templates.
 */

Ext.define('ClientAccount', {
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'ID',     type: 'int'},
	         {name: 'Name',     type: 'string'},
	         {name: 'Value',   type: 'int'}
	         ]
});

var charts = Ext.create('Ext.data.JsonStore', {
	fields: ['type', 'value'],
	data : [
	        {type:'Revenue', value:'Revenue (Default)'},
	        {type:'Expense', value:'Expense'},
	        {type:'Phone Calls', value:'Phone Calls'}
	        //...
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
	var store1 = loadData('accounts_expense.json');

	var form = Ext.create('Ext.form.Panel', {
		renderTo: 'docbody',
		title   : 'Client Engagement',
		autoHeight: true,
		width   : 800,
		bodyPadding: 10,
		defaults: {
//			anchor: '100%',
			labelWidth: 100
		},

		items: {
			xtype:'tabpanel',
			plain:true,
			activeTab: 0,
			defaults:{
				bodyStyle:'padding:10px'
			},

			items:[
			       {
			    	   title:'Clients',
			    	   autoHeight: true,
			    	   autoWidth   : true,
			    	   bodyPadding: 10,
			    	   defaults: {
			    		   anchor: '100%',
			    		   labelWidth: 100
			    	   },

			    	   items:[{
			    		   xtype: 'fieldset',
			    		   title: 'Filters',
			    		   collapsible: true,
			    		   defaults: {
			    			   labelWidth: 89,
			    			   anchor: '100%',
			    			   layout: {
			    				   type: 'hbox',
			    				   defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
			    			   }
			    		   },
			    		   items: [
			    		           {
			    		        	   xtype     : 'displayfield',
			    		        	   fieldLabel: 'Filter by date range',
			    		        	   msgTarget: 'side',
			    		        	   allowBlank: true
			    		           },
			    		           {
			    		        	   xtype: 'fieldcontainer',
			    		        	   fieldLabel: 'Start Date',
			    		        	   combineErrors: true,
			    		        	   msgTarget : 'side',
			    		        	   layout: 'hbox',
			    		        	   defaults: {
			    		        		   flex: 1,
			    		        		   hideLabel: true
			    		        	   },
			    		        	   items: [{
			    		        		   xtype     : 'datefield',
			    		        		   name      : 'startDate',
			    		        		   fieldLabel: 'Start',
			    		        		   margin: '0 5 0 0'

			    		        	   }                          
			    		        	   ]
			    		           },
			    		           {
			    		        	   xtype: 'fieldcontainer',
			    		        	   fieldLabel: 'End Date',
			    		        	   combineErrors: true,
			    		        	   msgTarget : 'side',
			    		        	   layout: 'hbox',
			    		        	   defaults: {
			    		        		   flex: 1,
			    		        		   hideLabel: true
			    		        	   },
			    		        	   items: [  {
			    		        		   xtype     : 'datefield',
			    		        		   name      : 'endDate',
			    		        		   fieldLabel: 'End'

			    		        	   }                         
			    		        	   ]
			    		           },
			    		           {
			    		        	   xtype: 'fieldcontainer',
			    		        	   fieldLabel: 'See Chart by',
			    		        	   msgTarget : 'side',
			    		        	   layout: 'hbox',
			    		        	   defaults: {
			    		        		   flex: 1,
			    		        		   hideLabel: true
			    		        	   },
			    		        	   items: [  {
			    		        		   xtype : 'combo',
			    		        		   name  : 'chartType',
			    		        		   store : charts,
			    		        		   value : 'Revenue',
			    		        		   displayField : 'type',
			    		        		   valueField : 'value',
			    		        		   queryMode : 'local',

			    		        		   listeners:{
			    		        			   scope: this,
			    		        			   'select': function(combo, record, index){
			    		        				   var value2 = combo.getValue();
			    		        				   if(value2 == 'Expense'){
			    		        					   var clientExpenseData = loadData('accounts_expense.json');
			    		        					   clientExpenseData.each(function(rec) {
			    		        						   var id = rec.get('ID');
			    		        						   var value = rec.get('Value');
			    		        				
			    		        					   });
			    		        					   Ext.getCmp('pieChart').refresh();

			    		        				   }

			    		        			   }                           
			    		        		   }


			    		        	   }                         
			    		        	   ]
			    		           }

			    		           ]
			    	   },
			    	   {
			    		   xtype: 'fieldset',
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
			    		           {
			    		        	   xtype: 'chart',
			    		        	   id: 'pieChart',
			    		        	   renderTo: Ext.getBody(),
			    		        	   animate: true,
			    		        	   height: 300,
			    		        	   store: clientAccountData,
			    		        	   shadow: true,
			    		        	   legend: {
			    		        		   position: 'right'
			    		        	   },
			    		        	   insetPadding: 10,
			    		        	   theme: 'Base:gradients',
			    		        	   series: [{
			    		        		   type: 'pie',
			    		        		   field: 'Value',
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
			    		        			   field: 'Name',
			    		        			   display: 'rotate',
			    		        			   contrast: true,
			    		        			   font: '18px Arial'
			    		        		   }
			    		        	   }]
			    		           }
			    		           ]
			    	   }]
			       },
			       {
			    	   title:'Coverage',
			    	   defaultType: 'textfield',
			    	   items:[{
			    		   xtype: 'fieldset',
			    		   title: 'Filters',
			    		   collapsible: true,
			    		   defaults: {
			    			   labelWidth: 89,
			    			   anchor: '100%',
			    			   layout: {
			    				   type: 'hbox',
			    				   defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
			    			   }
			    		   },
			    		   items: [

			    		           {
			    		        	   xtype: 'fieldcontainer',
			    		        	   fieldLabel: 'Start Date',
			    		        	   combineErrors: true,
			    		        	   msgTarget : 'side',
			    		        	   layout: 'hbox',
			    		        	   defaults: {
			    		        		   flex: 1,
			    		        		   hideLabel: true
			    		        	   },
			    		        	   items: [{
			    		        		   xtype     : 'datefield',
			    		        		   name      : 'startDate',
			    		        		   fieldLabel: 'Start',
			    		        		   margin: '0 5 0 0'

			    		        	   }                          
			    		        	   ]
			    		           },
			    		           {
			    		        	   xtype: 'fieldcontainer',
			    		        	   fieldLabel: 'End Date',
			    		        	   combineErrors: true,
			    		        	   msgTarget : 'side',
			    		        	   layout: 'hbox',
			    		        	   defaults: {
			    		        		   flex: 1,
			    		        		   hideLabel: true
			    		        	   },
			    		        	   items: [  {
			    		        		   xtype     : 'datefield',
			    		        		   name      : 'endDate',
			    		        		   fieldLabel: 'End'

			    		        	   }                         
			    		        	   ]
			    		           },
			    		           {
			    		        	   items: [  {
			    		        		   xtype : 'combo',
			    		        		   name  : 'chartType',
			    		        		   store : charts,
			    		        		   value : 'Revenue',
			    		        		   displayField : 'type',
			    		        		   valueField : 'value',
			    		        		   queryMode : 'local',

			    		        	   },
			    		        	   {
			    		        		   xtype : 'combo',
			    		        		   name  : 'chartType',
			    		        		   store : charts,
			    		        		   value : 'Expense',
			    		        		   displayField : 'type',
			    		        		   valueField : 'value',
			    		        		   queryMode : 'local',

			    		        	   }                         
			    		        	   ]
			    		           },
			    		           {
			    		        	   items:[ {
			    		        		   xtype: 'chart',
			    		        		   animate: true,
			    		        		   style: 'background:#fff',
			    		        		   shadow: false,
			    		        		   store:  Ext.create('Ext.data.JsonStore', {
			    		        				fields: ['type', 'value'],
			    		        				data : [
			    		        				        {type:'Account 1', value: '0.5'},
			    		        				        {type:'Account 2', value:'0.7'},
			    		        				        {type:'Account 3', value:'0.8'}
			    		        				        ]
			    		        			}),
			    		        		   axes: [{
			    		        			   type: 'Numeric',
			    		        			   position: 'bottom',
			    		        			   fields: ['Value'],
			    		        			   label: {
			    		        				   renderer: Ext.util.Format.numberRenderer('0,0')
			    		        			   },
			    		        			   title: 'Expense-Revenue Ratio',
			    		        			   minimum: 0
			    		        		   }, {
			    		        			   type: 'Client',
			    		        			   position: 'left',
			    		        			   fields: ['Name'],
			    		        			   title: 'Client'
			    		        		   }]
			    		        	   }]
			    		           }]
			    	   }]
			       }



			       ]
		}


	});

});