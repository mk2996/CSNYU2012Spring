Ext.namespace("app.southpanel");

/**
 * Contacts Portal Tab. Extend Ext Portal to create contacts widgets.
 * 
 * Custom Events: repositionwidgets - Event used by the Portal DragDrop zone to
 * notify the component of repositioning of widgets. This event is also used by
 * the state handler to save state.
 * 
 * @see widgets folder for widget details
 */

app.southpanel.ClientsTab =  Ext.extend(Ext.ux.Portal,{
	//_selectedContact : null,
	//_widgetPosition : null,

	initComponent : function() {
		//app.southpanel.ClientsTab.superclass.initComponent.call(this);
	}
});

