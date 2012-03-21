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

Ext.define('Ext.app.ClientDataWidget', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.clientData',
    requires : ['Ext.data.JsonStore'],
    
    title: 'Client Data',
    frame: true,
    closable: true,
    collapsible: true,
    animCollapse: true,
    draggable: true,
    id: 'ClientDataDisplay',
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
      }],
  
      cls: 'x-portlet',
    initComponent: function() {
        //alert(this.datafile)  
//        var data = loadData(this.datafile);
//        var records = data.getRange();

//        alert(records.length);
    
          Ext.apply(this, {
            height: 500,
            layout: 'fit',
            store: loadData(this.datafile),
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
    },

    // Override Panel's default doClose to provide a custom fade out effect
    // when a portlet is removed from the portal
    doClose: function() {
        alert('doClose');
    }
  
  
});

