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

app.southpanel.ContactsPortalTab = Ext
		.extend(
				Ext.ux.Portal,
				{
					_selectedContact : null,
					_interval : null,
					_firstLoad : true,
					_gridId : null,
					_widgetPosition : null,

					initComponent : function() {

						var _this = this;

						_this._gridId = _this.id.replace('-contactsPortalTab',
								'');
						_this._widgetPosition = [ 'columnDevider',
								this._gridId + '-contact-profile-panel',
								this._gridId + '-fidtier-panel',
								this._gridId + '-research-panel',
								'columnDevider',
								this._gridId + '-activity-panel',
								this._gridId + '-coverage-panel',
								this._gridId + '-notes-grid-contact' ];

						// alert(_this._gridId);

						this.contactProfileWidget = new app.southpanel.widgets.contactprofile.ContactProfile(
								{
									id : _this._gridId
											+ '-contact-profile-panel',
									height : 300,
									stateful : false,
									entitlement : util.CONTACTPROFILE_CONTACT_WIDGET
								});
						this.reseachPanelWidget = new app.southpanel.widgets.research.ResearchInterestPanel(
								{
									id : _this._gridId + '-research-panel',
									height : 300,
									stateful : false,
									entitlement : util.CONTACTPROFILE_RESEARCH_WIDGET
								});
						// this.coverageWidget = new
						// app.southpanel.widgets.CoverageGrid({ id:
						// _this._gridId + '-coverage-grid', height: 300,
						// stateful: false });
						this.notesWidget = new app.southpanel.widgets.NotesGrid(
								{
									id : _this._gridId + '-notes-grid-contact',
									height : 300,
									stateful : false,
									entitlement : util.CONTACTPROFILE_NOTES_WIDGET
								});

						// console.log('<iframe
						// id="'+_this._gridId+'-activity-widget-iframe"
						// src="about:blank" frameborder="0" marginheight="0"
						// srolling="no"
						// style="overflow:hide;height:100%;width:100%"/>');
						this.activityWidget = {
							id : _this._gridId + '-activity-panel',
							xtype : 'panel',
							layout : 'fit',
							header : false,
							border : true,
							// title: 'Activities',
							anchor : '100%',
							frame : true,
							style : 'padding-top:10px;display:none',
							collapsible : true,
							draggable : true,
							/* hidden : true, */
							cls : 'x-portlet',
							height : 300,
							html : '<iframe id="'
									+ _this._gridId
									+ '-activity-widget-iframe" src="about:blank" frameborder="0" marginheight="0" srolling="no" style="overflow:hide;height:100%;width:100%;position: absolute; left: 0px; top: 0px; bottom: 0px; right: 0px"/>',
							stateful : false
						};
						this.coverageWidget = {
							id : _this._gridId + '-coverage-panel',
							xtype : 'panel',
							layout : 'fit',
							header : false,
							border : true,
							// title: 'Activities',
							anchor : '100%',
							frame : true,
							style : 'padding-top:10px;display:none',
							collapsible : true,
							draggable : true,
							/* hidden : true, */
							cls : 'x-portlet',
							height : 300,
							html : '<iframe id="'
									+ _this._gridId
									+ '-coverage-widget-iframe" src="about:blank" frameborder="0" marginheight="0" srolling="no" style="overflow:hide;height:100%;width:100%;position: absolute; left: 0px; top: 0px; bottom: 0px; right: 0px"/>',
							stateful : false
						};
						this.fidtierWidget = {
							id : _this._gridId + '-fidtier-panel',
							xtype : 'panel',
							layout : 'fit',
							header : false,
							border : true,
							// title: 'Activities',
							anchor : '100%',
							frame : true,
							style : 'padding-top:10px;display:none',
							collapsible : true,
							draggable : true,
							/* hidden : true, */
							cls : 'x-portlet',
							height : 300,
							html : '<iframe id="'
									+ _this._gridId
									+ '-fidtier-widget-iframe" src="about:blank" frameborder="0" marginheight="0" srolling="no" style="overflow:hide;height:100%;width:100%;position: absolute; left: 0px; top: 0px; bottom: 0px; right: 0px"/>',
							stateful : false
						};

						Ext
								.apply(
										this,
										{
											/* iconCls:"portal-icon", */
											title : "Contact Profile",
											listeners : {
												// custom function to select
												// contacts
												selectContact : function(
														$contact) {
													this._selectedContact = $contact;
													_this._selectedContact.client_name = Ext.util.Format
															.stripTags(_this._selectedContact.client_name);
													_this
															.setTitle(_this._selectedContact.client_name);
													if (app.Container.currentSouthTabId == 'contacts-grid-contactsPortalTab')
														this.updateWidgets();
												},
												// Custom Event: See component
												// comments for details
												repositionwidgets : function() {

													this._widgetPosition = this.dd
															.getWidgetPositions();
													var state = Ext.state.Manager
															.getProvider();
													state
															.set(
																	this.stateId,
																	this._widgetPosition);
												},
												render : function() {
													// console.log(this.stateId);
													var _this = this;
													$state = Ext.state.Manager
															.get(
																	this.stateId,
																	this._widgetPosition);

													// $state =
													// this._widgetPosition;
													// temporary patch to
													// address deprecated
													// state[] id's
													Ext
															.each(
																	$state,
																	function(
																			item,
																			index) {
																		if (item
																				.indexOf(_this._gridId) < 0
																				&& item != 'columnDevider') {
																			$state[index] = _this._gridId
																					+ '-'
																					+ item;
																		}

																	});

													if ($state == undefined)
														Ext
																.apply(
																		$state,
																		this._widgetPosition);

													if (this._widgetPosition.length > $state.length) { // It
														// means
														// new
														// Wigdget
														// added
														// but
														// it
														// is
														// doesn't
														// present
														// in
														// state

														Ext
																.each(
																		this._widgetPosition,
																		function(
																				$item,
																				$index) {
																			if ($item != 'columnDevider') {
																				if ($state
																						.indexOf($item) < 0) {
																					$state[$state.length + 1] = $item;
																				}
																			}
																		});

													}

													var columnCount = 0;
													Ext
															.each(
																	$state,
																	function(
																			item,
																			index) {
																		if (item == 'columnDevider')
																			columnCount++;
																		if (item != 'columnDevider') {
																			if (columnCount == 1) {
																				_this
																						.initializeWidgetPosition(
																								$state[index],
																								0);
																			} else {
																				_this
																						.initializeWidgetPosition(
																								$state[index],
																								1);
																			}
																		}
																	});
												}
											},
											applyState : function($state) {
												// Keep this empty. The default
												// implementation is giving
												// errors.
											},
											items : [
													{
														columnWidth : .49,
														style : 'padding:5px 0 10px 10px',
														defaults : {
															cls : 'portal'
														},
														id : this._gridId
																+ '-column-contacts-portal-0',
														items : [/*
														 * To be
														 * populated
														 * based on
														 * state.
														 * See:
														 * render
														 * event
														 * implementation.
														 */]
													},
													{
														columnWidth : .49,
														defaults : {
															cls : 'portal'
														},
														id : this._gridId
																+ '-column-contacts-portal-1',
														style : 'padding:5px 0 10px 10px',
														items : [/*
														 * To be
														 * populated
														 * based on
														 * state.
														 * See:
														 * render
														 * event
														 * implementation.
														 */]
													} ],
											frame : false
										});
						app.southpanel.ContactsPortalTab.superclass.initComponent
								.call(this);
					}
				});

/**
 * Initializes widget position within the portal columns based on the state
 * saved. This method is called from render event handler.
 * 
 * @param $id
 * @param $columnId
 * @return
 */
app.southpanel.ContactsPortalTab.prototype.initializeWidgetPosition = function(
		$id, $columnId) {
	var item = null;
	if ($id == this._gridId + '-contact-profile-panel') {
		item = this.contactProfileWidget;
	} else if ($id == this._gridId + '-activity-panel') {
		item = this.activityWidget;
	} else if ($id == this._gridId + '-coverage-panel') {
		item = this.coverageWidget;
	} else if ($id == this._gridId + '-fidtier-panel') {
		item = this.fidtierWidget;
	} else if ($id == this._gridId + '-research-panel') {
		item = this.reseachPanelWidget;
	} else if ($id == this._gridId + '-notes-grid-contact') {
		item = this.notesWidget;
	}
	var cmp = Ext.getCmp(this._gridId + '-column-contacts-portal-' + $columnId);
	if (typeof (item) != 'undefined' && item != null) {
		cmp.add(item);
	}
};

/**
 * Updates each child panel/grid/container with contact details. For each child
 * to get updated contact details, it would need to implement it own event
 * handler for the event 'updatedata'
 * 
 * @return
 */
app.southpanel.ContactsPortalTab.prototype.updateWidgets = function() {
	var _this = this;
	if (!this._selectedContact) {
		return;
	}

	if (util.isEmployee(this._selectedContact.person_type_code)) {
		this.setIconClass('cs-sails-icon');
	} else {
		this.setIconClass('no-icon');
	}

	Ext.getCmp(this._gridId + '-contact-profile-panel').fireEvent('updatedata',
			this._selectedContact);
	// Ext.getCmp(this._gridId +
	// '-coverage-grid').fireEvent('updatedata',this._selectedContact);
	Ext.getCmp(this._gridId + '-research-panel').fireEvent('updatedata',
			this._selectedContact);
	Ext.getCmp(this._gridId + '-notes-grid-contact').fireEvent('updatedata',
			this._selectedContact);

	// Activity Widget
	if (this.rendered && this._firstLoad) {
		Ext.fly(this._gridId + '-southpanel-msg').hide();
		serviceConfig.WIDGET_ACTIVITY_URL += '&contact_id='
				+ this._selectedContact.contact_id;
		var el = Ext.get(this._gridId + '-activity-widget-iframe');
		var cmp = Ext.getCmp(this._gridId + '-activity-panel');
		cmp.render();
		cmp.el.applyStyles({
			'display' : 'block'
		});
		logTime('init contact profile tab');
		el.dom.src = serviceConfig.WIDGET_ACTIVITY_URL;

		Ext.fly(this._gridId + '-southpanel-msg').hide();

		// serviceConfig.WIDGET_FIDTIER_URL += '&clientId=' +
		// this._selectedContact.client_id;
		// var el2 = Ext.get(this._gridId + '-fidtier-widget-iframe');
		// var cmp2 = Ext.getCmp(this._gridId + '-fidtier-panel');
		// cmp2.render();
		// cmp2.el.applyStyles({ 'display': 'block' });
		// logTime('init contact profile tab');
		// el2.dom.src = serviceConfig.WIDGET_FIDTIER_URL;

		// Ext.fly(this._gridId + '-southpanel-msg').hide();

		util.getEC3Id('ContactsPortalTab', this._selectedContact, function(
				$ec3Id) {

			var params = '&contact_id=' + _this._selectedContact.contact_id
					+ '&client_id=' + _this._selectedContact.client_id
					+ '&client_name=' + _this._selectedContact.core_acct;

			if ($ec3Id != null && Ext.isDefined($ec3Id)) {
				params += '&ec3_client_id=' + $ec3Id;
			} else {
				params += '&ec3_client_id='
			}

			serviceConfig.WIDGET_COVERAGE_URL += params;
			el = Ext.get(_this._gridId + '-coverage-widget-iframe');
			cmp = Ext.getCmp(_this._gridId + '-coverage-panel');
			cmp.render();
			cmp.el.applyStyles({
				'display' : 'block'
			});
			logTime('init contact profile tab');
			el.dom.src = serviceConfig.WIDGET_COVERAGE_URL;

			// Client Tier Widget
			serviceConfig.WIDGET_CLIENT_TIER_URL += params; // '&clientId=' +
			// this._selectedContact.client_id;
			el = Ext.get(_this._gridId + '-fidtier-widget-iframe');
			cmp = Ext.getCmp(_this._gridId + '-fidtier-panel');
			cmp.render();
			cmp.el.applyStyles({
				'display' : 'block'
			});
			logTime('init contact profile tab');
			el.dom.src = serviceConfig.WIDGET_CLIENT_TIER_URL;
		});

		/*
		 * util.getFidTier('ContactsPortalTab', this._selectedContact, function () {
		 * 
		 * debugger; var params = '&contact_id=' +
		 * _this._selectedContact.contact_id + '&client_id=' +
		 * _this._selectedContact.client_id + '&client_name=' +
		 * _this._selectedContact.core_acct;
		 * 
		 * 
		 * serviceConfig.WIDGET_FIDTIER_URL += params;
		 * 
		 * el = Ext.get(_this._gridId + '-fidtier-widget-iframe'); cmp =
		 * Ext.getCmp(_this._gridId + '-fidtier-panel'); cmp.render();
		 * cmp.el.applyStyles({ 'display': 'block' }); logTime('init contact
		 * profile tab'); el.dom.src = serviceConfig.WIDGET_FIDTIER_URL;
		 * 
		 * });
		 */

		this._firstLoad = false;
	}

	util.getEC3Id('ContactsPortalTab', this._selectedContact, function($ec3Id) {
		_this._selectedContact.ec3_client_id = $ec3Id;

		util.getPageBus().publish("com.cs.crm.listmgmt.filters.contact",
				_this._selectedContact);
	});

	/*
	 * util.getFidTier('ContactsPortalTab', this._selectedContact, function () {
	 * util.getPageBus().publish("com.cs.crm.listmgmt.filters.contact",
	 * _this._selectedContact); });
	 */

};
