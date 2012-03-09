/**
 * Entry point to the application.
 * 
 * This javascript loads necessary class and create a portal
 */
Ext.onReady(function() {
			Ext.Loader.setPath('Ext.app', 'classes');
			Ext.Loader.setConfig({enabled:true});

			Ext.require(['Ext.layout.container.*', 'Ext.resizer.Splitter',
					'Ext.fx.target.Element', 'Ext.fx.target.Component',
					'Ext.window.Window', 'Ext.app.PortalColumn',
					'Ext.app.PortalPanel', 'Ext.app.Portlet',
					'Ext.app.PortalDropZone']);

			/*
			 *  Create a portal class, this portal class is in /classes/portal.js 
			 **/		
			Ext.create('Ext.app.Portal');

		});