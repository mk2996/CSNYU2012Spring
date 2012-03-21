
Ext.define('Ext.app.coverageWidget', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.coverage',
    
    title: 'Coverage',
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
          Ext.getCmp(this).show()
          
        }
      }],
    
    cls: 'x-portlet',
    initComponent: function() {
    	
          Ext.apply(this, {
            height: 300,
            layout: 'fit',
            html: "<div id='holder'></div>"
            
        });

        this.callParent(arguments);
    },
    contentEl: 'holder',

    // Override Panel's default doClose to provide a custom fade out effect
    // when a portlet is removed from the portal
    doClose: function() {
        alert('doClose');
    }
	
	
});