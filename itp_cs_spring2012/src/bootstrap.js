//Ext.BLANK_IMAGE_URL = 'ext-3.3.1/resources/images/default/s.gif';

//Ext.Ajax.timeout = 90000;

Ext.namespace("app");

/**
 * Container class to initialize CMT application. create a singleton instance
 * and return viewport 1. Tools Panel (formerly North Panel) - CMT search panel
 * 
 * @see northpanel folder for components TODO: change nomenclature to
 *      tools-panel. 2. Widgets Panel (formerly South Panel, deprecated) - CMT
 *      Widgets container
 * @see south panel folder components TODO: change nomenclature to
 *      widgets-panel.
 */
app.Container = function() {
	return {
		id:'cmtViewPort',
		northPanel: null,
		clientSouthPanel: null,
		viewport: null,
		currentSouthTabId: 'contacts-grid-contactsPortalTab',
		currentNorthtTabId: 'contacts-grid-contactsPortalTab',

		init: function() {
			var _this = this;
			Ext.QuickTips.init();
		
			_this.northPanel = _this.createNorthPanel();
			_this.southPanel = _this.createSouthPanel();

			var viewport = new Ext.Viewport({
                autoScroll:true,
				items:[ _this.northPanel, _this.southPanel]
			});

		}
	};
}();

app.Container.createNorthPanel = function () {
	var _this = this;


 	var cmtNorthPanel = Ext.create('Ext.form.Panel', {
        renderTo: 'docbody',
        title   : 'North Panel',
        region : 'north',
        autoHeight: true,
        bodyPadding: 10,
        defaults: {
            labelWidth: 100
        },

        items: {
            xtype:'tabpanel',
            plain:true,
            activeTab: 0,
            defaults:{
                bodyStyle:'padding:10px'
            },

            items:[{
                title:'Employees',
                autoHeight: true,
                autoWidth   : true,
                bodyPadding: 10,
                defaults: {
                    anchor: '100%',
                    labelWidth: 100
                }
            },{
            	title: 'Calendar',
            	autoHeight: true,
            	autoWidth: true,
            	bodyPadding: 10,
            	defaults: {
            		anchor: '100%',
            		labelWidth: 100
            	}
            }
            ]
        }
	});
        

	return cmtNorthPanel;
};

/**
 * Create a south panel containing widgets
 * @return south panel
 */
app.Container.createSouthPanel = function () {
  var _this = this;
  
  var cmtSouthPanel = Ext.create('Ext.form.Panel', {
        renderTo: 'docbody',
        title   : 'South Panel',
        region : 'south',
        autoHeight: true,
        bodyPadding: 10,
        activeTab: 0,

        defaults: {
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
            	  id: 'clientAccounts',
                title:'Client Accounts',
                autoHeight: true,
                autoWidth   : true,
                bodyPadding: 10,
                defaults: {
                    anchor: '100%',
                    labelWidth: 100
                }
            },{
            	id: 'portal',
            	title:'Portal',
            	xtype: 'portalpanel',
              autoHeight: true,
              autoWidth   : true,
              bodyPadding: 10,
              defaults: {
                  anchor: '100%',
                  labelWidth: 100
              },
              items:[{
                title: 'Coverage',
                id: 'coverage-portlet',
                xtype: 'coverage'
              },{
                  title: 'Overall',
                  id: 'overall-portlet',
                  xtype: 'overallportlet'
              }]
              
           
        }]
  }
  });
        

  return cmtSouthPanel;
};


app.Container.createCoverageWidget = function(){
	 var _this = this;
  
  var coverageWidget = Ext.create('Ext.app.Portlet', {
    
  });
  
  return coverageWidget;

}









