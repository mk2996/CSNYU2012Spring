Ext.BLANK_IMAGE_URL = 'ext-3.3.1/resources/images/default/s.gif';

Ext.Ajax.timeout = 90000;

Ext.namespace("app");

/**
 * Container class to initialize CMT application. create a singleton instance and return viewport
 * 1. Tools Panel (formerly North Panel) - CMT search panel @see northpanel folder for components
 *		TODO:  change nomenclature to tools-panel.
 * 2. Widgets Panel (formerly South Panel, deprecated)  - CMT Widgets container @see south panel folder components
 *		TODO:  change nomenclature to widgets-panel.
 */
app.Container = function() {
	return {
		id:'cmtViewPort',
		northPanel: null,
		clientSouthPanel: null,
		consolePanel: null,
		accountSouthPanel : null,
		viewport: null,
		currentSouthTabId: 'contacts-grid-contactsPortalTab',
		clickSouthTabs: null,
		currentNorthtTabId: 'contacts-grid-contactsPortalTab',
		getRealUser:      function() { return this.realUser; },
		getShadowUser:    function() { return this.shadowUser; },
		getEffectiveUser: function() { return this.effectiveUser; },
		
		init: function() {
			var _this = this;
			Ext.QuickTips.init();
			
			//if (META_ENABLE_INSTRUMENTATION || META_ENABLE_EXT_CONSOLE_LOGGING) {
				_this.consolePanel = _this.getConsolePanel();
			//}
			
			var provider = new Ext.ux.state.SimpleHttpProvider({
				saveUrl: serviceConfig.STATE_SAVE
			});
			provider.submitState = provider.submitState.createInterceptor(function($name, $value){
					// Dont save state if user is shadowed
					if(_this.realUser.ntUserName != _this.effectiveUser.ntUserName){
						return false;
					}
				});
			
			Ext.state.Manager.setProvider(provider);
			
			Ext.Ajax.request({
				url: constantsSrc,
				componentName: 'CMT-INIT',
				success: function(response, options) {

					logTime('init container');
					_this.initUserState(response.responseText);
					logTime('init UserState');
					_this.clientSouthPanel = _this.createSouthPanel('contacts-grid');
					logTime('created SouthPanel');
					//_this.accountSouthPanel = _this.createSouthPanel('accounts-grid');
					_this.northPanel = _this.createNorthPanel();
					logTime('created NorthPanel');
					
					
					
					_this.viewport = new Ext.Viewport({
						layout:'border',
						items:[_this.northPanel, _this.consolePanel]
					});					
					_this.outlookHelper = new OutlookCrm();
					// Initialize CTI
					
					
					CTI.Init(_this.realUser.ntUserName, _this.realUser.partyId, 'test', '/RAPPORT_PROXY');
					
					logTime('end init cmt');					
					
				},
				failure: function(response, options) {
					alert('failure to load user info');
				}
			});
		}
	};
}();

/**
 * Parses environment and user state information and initializes objects that contain it.
 * 
 * @return cmtNorthPanel
 */
app.Container.initUserState = function(responseText) {
	var _this = this;
	
	var stateObj = eval( "(" + responseText + ")" );					
	_this.realUser = stateObj.rows[0];

	// shadow user info arrives in the first element of a stringified json array
	var shadows = eval(stateObj.rows[0].shadows);
	_this.shadowUser = shadows[0];

	// override real user info with shadow user info to get effective user
	_this.effectiveUser = Ext.apply({}, _this.shadowUser, _this.realUser);

Ext.state.Manager.getProvider().initState(_this.effectiveUser.uiState);
	// remove the extraneous shadows node
	delete _this.effectiveUser.shadows;	
}

/**
 * Creates North Panel object. Create tab panel with 2 tabs. Clients Panel and Calendar Panel.
 * For initial run, just create Contacts grid only
 * 
 * @return cmtNorthPanel
 */
app.Container.createNorthPanel = function () {
	var _this = this;
	var clientsTab = new app.northpanel.ClientsTab({ id: "clientsTab" });
	

	var taskmanagerTab = new app.northpanel.TaskManagerTab({ id: "taskmanagerTab" });
	//var tabStripPlugin = new app.northpanel.TabStripPlugin();
	//create a tabpanel with contactspanel
	var cmtNorthPanel = new Ext.TabPanel({
		activeTab: 0,
		id: 'northPanel',
		stateId: 'north-panel',
		autoDestroy: false,
		items: [clientsTab],
		region: 'center',
		tabBar: {border:10},
		//height: 400,
		//plugins: [tabStripPlugin],
		listeners: {
			tabchange: function ($thisTabPanel, $currentTab) {
				/* 	Event to show or hide the south panel. 
				*	Hide in case of calendar and show in case of clients grid.
			
				if($currentTab.id == 'clientsTab'){
				_this.getSouthPanel().setVisible(true);
				}else{
				_this.getSouthPanel().setVisible(false);
				}
				if(_this.getCMTPanel())_this.getCMTPanel().doLayout();
				*/
			}
		}
	});

	

	if (util.checkEntitlement(util.CALENDAR_ENTITLEMENT)) {
		var calendarTab = new app.northpanel.CalendarTab({ id: "calendarTab" });
		cmtNorthPanel.add(calendarTab);
	}
	return cmtNorthPanel;
};

/**
 * Creates Client South Panel object. Create tab panel with 2 tabs. Contacts Panel and Accounts Panel.
 * 
 * @return cmtSouthPanel
 */
app.Container.createSouthPanel = function($tabid) {
    var cmtSouthPanel, contactsPortalTab, accountsPortalTab, _this = this;

    if ($tabid == 'contacts-grid') {
        cmtSouthPanel = new Ext.TabPanel({
            activeTab: 0,
            id: $tabid + '-southPanel',
            stateId: 'south-panel',
            autoDestroy: false,
            items: [],
            region: 'south',
            height: 400,
            disabled: false,
            stateful: true,
            listeners: {
	            tabchange: function(tp,newTab){
        	   	app.Container.clickSouthTabs = "tbChanged";
	            },
	            afterrender: function($tabPanel) {
	            	app.Container.clickSouthTabs = null;
	            }
           }
        });


        cmtSouthPanel.on('tabchange', function($tabPanel, $activeItem) {
            $activeItem.updateWidgets();
            _this.currentSouthTabId = $activeItem.id;
        });
        


    } else {
        cmtSouthPanel = new Ext.TabPanel({
            activeTab: 0,
            id: $tabid + '-southPanel',
            stateId: 'south-panel',
            autoDestroy: false,
            items: [],
            region: 'east',
            width: 900,
            disabled: false,
            stateful: true
        });

    }

    accountsPortalTab = new app.southpanel.accountsPortalTab({
        id: $tabid + "-accountsPortalTab",
        stateId: 'accounts-portal-tab',
        stateful: true,
        stateEvents: ['repositionwidgets'],
        getState: function() {
            return this._widgetPosition;
        }
    });




    cmtSouthPanel.add(accountsPortalTab);

    cmtSouthPanel.on('afterrender', function(panel) {
        var el = panel.el.insertFirst(document.createElement('div'));
        el.addClass('x-mask-msg');
        var outerEl = el.wrap({ id: $tabid + '-southpanel-msg', tag: 'div' });
        outerEl.addClass('ext-el-mask');
        outerEl.addClass('x-tab-strip');
        outerEl.applyStyles({ 'opacity': '1', 'background-color': '#eee', 'z-index': '999', 'width': '100%', 'height': '100%' });
        var innerEl = el.appendChild(document.createElement('div'));
        innerEl.addClass('ext-el-mask-msg cmt-southpanel-msg');
        innerEl.applyStyles({ 'position': 'absolute', 'left': '510px', 'top': '169px' });
        
        if(cmtSouthPanel.activeTab.title == 'Account Profile')
            innerEl.dom.innerHTML = '<div>Please select an account to view additional details</div>';
         else
             innerEl.dom.innerHTML = '<div>Please select a contact to view additional details</div>';

    });
    return cmtSouthPanel;
};




/**
 * Convenience method for all other classes to get a reference to the North Panel.
 */
app.Container.getNorthPanel = function(){
	return this.northPanel;
};

/**
 * Convenience method for all other classes to get a reference to the Client South Panel.
 */
app.Container.getSouthPanel = function($tabid){
	if($tabid=='contacts-grid')
		return this.clientSouthPanel;
	else if ($tabid=='accounts-grid') 
		return this.accountSouthPanel;
};


/**
 * Convenience method for all other classes to get a reference to the CMT Panel.
 */
app.Container.getCMTPanel = function(){
	return this.viewport;
};



app.Container.getConsolePanel = function() {
	var loc = window.location.toString();
	var parts = ( loc.indexOf('?') > 0 ) ? loc.split('?') : [loc,''];
	var domainHostAndPath = parts[0];
	
	var getPathPrefix = function($dhp) {
		if($dhp.indexOf('/qa2')  != -1)  { return '/qa2'; }
		if($dhp.indexOf('/qa1')  != -1)  { return '/qa1'; }
		if($dhp.indexOf('/dev1') != -1)  { return '/dev1'; }
		if($dhp.indexOf('/dev2') != -1)  { return '/dev2'; }
		if($dhp.indexOf('-dev') != -1)  { return '-dev'; }
		if($dhp.indexOf('/uat')  != -1)  { return '/uat'; }
		//if($dhp.indexOf('/index-local.html')  != -1)  { return '/index-local.html'; }
		return '';
	};
	var pathPrefix = "";
	if(domainHostAndPath != undefined && domainHostAndPath.length > 0)
		pathPrefix = getPathPrefix(domainHostAndPath);

	var hideConsole = true;
	
	if(pathPrefix == '-dev' || pathPrefix == '/dev1' || pathPrefix == '/dev2' || pathPrefix == '/index-local.html')
		hideConsole = false;
	else
		hideConsole = true;
	
	var _logger = new meta.Logger();
	return _logger.getConsolePanel({
		region: 'south',
		split: true,
		collapsible: true,
		collapsed: META_COLLAPSE_LOG_PANEL,
		height: 260,
		hidden : hideConsole,
		layout: 'fit'
	});
};


/**
 * Overrid the default DD because of Ext 4 errors.
 */
Ext.define('override.DD', {
	override: 'Ext.panel.DD',

    constructor : function(panel, cfg){
        this.panel = panel;
        this.dragData = {panel: panel};
        this.proxy = Ext.create('Ext.panel.Proxy', panel, cfg);
        this.callParent([panel.el, cfg]);
    },
    listeners: {
    	afterrender: function(){
	    	var header = this.panel.header, el = this.panel.body;
	
		    if(header){
		        this.setHandleElId(header.id);
		        el = header.el;
		    }
		    el.setStyle('cursor', 'move');
		    this.scroll = false;
	    }
    }
});

/**
 * Use like: CSTimer.start('myId'; CSTimer.end('myId');
 */
Ext.define('CSTimer', {
    statics: {
		counter : 0,
        timesMap: [],
        finishedTimesMap:[],
        splitTimesMap:[],
        lastTimesMap:[],
        start: function(desc) {
			var startDate = new Date();
            this.timesMap[desc]= startDate;
            this.lastTimesMap[desc] = startDate;
            var logStr = desc + " timer started.";
            if (Ext.isDefined(console) && Ext.isDefined(console.log)){
    			console.log(logStr);
    		}
    		return logStr;
        },
        end: function(desc){
        	var startTime = this.timesMap[desc], endTime = new Date();
        	if (!startTime){
        		return "No Start Time Found with desc[" + desc + "]";
        	} else {
        		var millis = endTime.getTime() - startTime.getTime();
        		this.finishedTimesMap[desc] = millis;
        		var endStr = desc + " total millis = " + millis;
        		if (Ext.isDefined(console) && Ext.isDefined(console.log)){
        			console.log(endStr);
        		}
        		return endStr;
        	}
        },
        stop: function (desc){
        	return this.end(desc);
        },
        split: function(desc, splitDesc){
        	var startTime = this.timesMap[desc], lastTime = this.lastTimesMap[desc];
        	var splitTime = new Date();
        	if (!startTime){
        		return "No Start Time Found with desc[" + desc + "]";
        	} else {
        		var totalMillis = splitTime.getTime() - startTime.getTime();
        		var splitMiilis = splitTime.getTime() - lastTime.getTime();
        		this.lastTimesMap[desc] = splitTime;
        		splitDesc = !splitDesc ? "" + (++this.counter) : splitDesc;
        		var endStr = desc + " split " + splitDesc 
        			+ " split = " + splitMiilis + " millis (total = " + totalMillis + " millis)";
        		this.splitTimesMap[desc + "-" + splitDesc] = endStr;
        		if (Ext.isDefined(console) && Ext.isDefined(console.log)){
        			console.log(endStr);
        		}
        		return endStr;
        	}
        }
    }
});

//var csTimer = Ext.create('CSTimer');

