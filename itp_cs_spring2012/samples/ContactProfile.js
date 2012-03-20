Ext.namespace("app.southpanel.widgets.contactprofile");

/**
 * Class to render Contact Profile Widget. Creates a panel with a Template and loads
 * Template for a given contact id
 * 
 */
app.southpanel.widgets.contactprofile.ContactProfile = Ext.extend(Ext.Panel, {
	_tpl:null,
	_data:null,
	_contactId:null,
	_contact: null,
	_gcpanel:null,
	initComponent: function() {
		Ext.apply(this, {
			title:'Contact Profile',
			//cls:'contact-profile-panel',
			layout:'fit',
			anchor : '100%',
			frame : true,
			hidden: true,
			autoScroll:true,
			style:'padding-top:10px',
			collapsible : true,
			draggable : true,
			cls : 'x-portlet',
			listeners:{
				afterrender:function(){
					this.initializeData();
				},
				updatedata:function($contact){
					this.updateContactData($contact);
				}
			}
		});
		app.southpanel.widgets.contactprofile.ContactProfile.superclass.initComponent.call(this);
	}
});

/**
 * Method to create default data template
 * @return
 */
app.southpanel.widgets.contactprofile.ContactProfile.prototype.initializeData = function(){
	var _this = this;
	this.createTemplate();
	
	this._data = {};
	this._tpl.overwrite(_this.body, _this._data);
};


/**
 * Method to update contact data when row is clicked
 * @return
 */
app.southpanel.widgets.contactprofile.ContactProfile.prototype.updateContactData = function ($contact) {
	var _this = this;
	if (util.checkEntitlement(this.entitlement)) {
		if (_this.hidden) _this.setVisible(true);


		_this.el.mask('Please wait', 'x-mask-loading');
		this._contactId = $contact.contact_id;
		this._contact = $contact;
		var userState = app.Container.getEffectiveUser();
		Ext.Ajax.request({
			url: serviceConfig.WIDGET_CONTACT_PROFILE_SERVICE,
			componentName: 'ContactProfile',
			success: function ($response) { _this.el.unmask(); _this.afterUpdateContactData($response, _this._tpl, _this); },
			method: 'GET',
			failure: function () { _this.el.unmask(); /*alert('Error getting Contact Profile Info');*/ },
			params: {
				'include_metadata': 1,
				'user_login_name': userState.ntUserName,
				'user_id': userState.partyId,
				'client_name': $contact.client_name,
				'contact_id': $contact.contact_id,
				'client_id': $contact.client_id,
				'person_type_code': $contact.person_type_code,
				'email': $contact.email,
				'core_acct': $contact.core_acct
			}
		});
		//Reload Emp history is already open
		if (Ext.getCmp('contact-win-employment-history')) {
			Ext.getCmp('contact-win-employment-history').loadEmploymentHistoryStore($contact.contact_id, $contact.client_name);
		} 
	}
};

/**
 * Method to call on successful call of updateContactData. Set _data to response
 * @return
 */
app.southpanel.widgets.contactprofile.ContactProfile.prototype.afterUpdateContactData = function ($response, $tpl, $panel) {
	var _response = Ext.util.JSON.decode($response.responseText);
	$panel._data = _response.data;
	$panel._data.person_type_code=this._contact.person_type_code;
	$tpl.overwrite($panel.body, $panel._data);
	this.createGCDataPanel();
	$panel._gcpanel.updateData($panel._data);
	
};


app.southpanel.widgets.contactprofile.ContactProfile.prototype.createGCDataPanel = function () {
	
		this._gcpanel = new app.southpanel.widgets.contactprofile.GlobalCreditData(
	{
		id: 'gc-contact-profile-panel'
	, applyTo: "gc-data-panel"
	, autoScroll: true
	, frame: false
	, listeners: {
		'show': function () {
			var ctl = document.getElementById("btnExpandCollapse");
			ctl.currentState = "expanded"
			ctl.src = ctl.image_path_expanded;
		},
		'hide': function () {
			var ctl = document.getElementById("btnExpandCollapse");
			ctl.currentState = "unexpanded"
			ctl.src = ctl.image_path_unexpanded;
		}
	}
	});
	
};

app.southpanel.widgets.contactprofile.ContactProfile.prototype.toggleExpandCollapse = function ($ctl) {
	if ($ctl.currentState == "unexpanded") {
		
		Ext.getCmp('gc-contact-profile-panel').show();
	}
	else {
		
		Ext.getCmp('gc-contact-profile-panel').hide();
	
	}
};

/**
 * Method to create custom template for contact profile
 * @return
 */
app.southpanel.widgets.contactprofile.ContactProfile.prototype.createTemplate = function () {
	var _this = this;
	this._tpl = new Ext.XTemplate(
						'<table class="contactProfileMainTable" border="0"  style="width:98%! important;">',
							'<tr>',
								'<td valign="top" width="1%">',
	/*LEFT PANE TABLE FOR PHOTO AND RECENT ACTIVITIES*/
									'<table class="leftPane">',
										'<tr>',
											'<td colspan="2"><div id="contact-profile-photo"></div></td>',
										'</tr>',
										'<tr>',
											'<td><b colspan="2">Touchpoints</b></td>',
										'</tr>',
										'<tr>',
											'<td>This Week</td>',
											'<td>{activity_count_week}</td>',
										'</tr>',
										'<tr>',
											'<td>This Month</td>',
											'<td>{activity_count_month}</td>',
										'</tr>',
										'<tr>',
											'<td>This Year</td>',
											'<td>{activity_count_year}</td>',
										'</tr>',
									'</table>',
								'</td>',
								'<td valign="top">',
	/*RIGHT PANE TABLE FOR NAME, DESIGNATION AND REST*/
									'<table class="rightPane" cellspacing="0" width="100%">',
	/*CONTACT NAME ROW*/
										'<tr>',
											'<td class="contact-header" colspan="2">',
												'{person_title:this.formatNull} ',
												'{person_first_name:this.formatNull} ',
												'{person_middle_name:this.formatNull} ',
												'{person_last_name:this.formatNull} ',
											'</td>',
										'</tr>',
	/*CONTACT POSITION ROW*/
										'<tr>',
											'<td class="contact-position" colspan="2">',
												'<tpl if="!util.isEmployee(values.person_type_code)">',
														'<tpl if="!this.isNullOrEmpty(values.position_desc)">{position_desc}</tpl>',
														'<tpl if="!this.isNullOrEmpty(values.job_title)">({job_title})</tpl>',
												'</tpl>',
												'<tpl if="util.isEmployee(values.person_type_code)">',
																'{job_title}',
																'&nbsp;',
												 '</tpl>',
											 '</td>',
										 '</tr>',

	/*ADDRESS and MAIL ROW*/
										 '<tr>',
											'<td class="contact-details-border-ext">',
												'<tpl if="!this.isNullOrEmpty(values.line_1)">',
													'{line_1:this.showMap}</a>',
												'</tpl>',
												'<tpl if="!this.isNullOrEmpty(values.line_2)">',
													'<br/>{line_2:this.showMap}</a>',
												'</tpl>',
												'<tpl if="!this.isNullOrEmpty(values.address_floor)">',
													', {address_floor:this.showMap}',
												'</tpl>',
												'<tpl if="!this.isNullOrEmpty(values.address_dept)">',
													', {address_dept:this.showMap}',
												'</tpl>',
												'<tpl if="!this.isNullOrEmpty(values.line_3)">',
													'<br/>{line_3:this.showMap}</a>',
												'</tpl>',
												'<tpl if="!this.isNullOrEmpty(values.line_4)">',
													'<br/>{line_4:this.showMap}</a>',
												'</tpl>',
												'<tpl if="!this.isNullOrEmpty(values.line_8)">',
													'<br/>{line_8:this.showMap}</a>',
												'</tpl>',
												'<tpl if="!this.isNullOrEmpty(values.line_5)">',
													'<br/>{line_5:this.showMap}</a>',
												'<tpl if="!this.isNullOrEmpty(values.line_6)">',
													', {line_6:this.showMap}</a>',
												'</tpl>',
												'<tpl if="!this.isNullOrEmpty(values.postal_code)">',
													' {postal_code:this.showMap}',
												'</tpl>',
												'</tpl>',
												'<tpl if="!this.isNullOrEmpty(values.country_desc)">',
													'</br>{country_desc:this.showMap}',
												'</tpl>',
												'<tpl if="!this.isNullOrEmpty(values.address_notes)">',
													'</br>',
													'<font color="gray">Note: {address_notes}</font>',
												'</tpl>',
											'</td>',
											'<td class="contact-details-border-ext">',
												'{person_first_name:this.showAddActivityWindow}<br/>',
												'<tpl if="!this.isNullOrEmpty(values.electronic_address_string)">',


	//TODO: this Send Email link should use outlookHelper
	//var fn = "\"javascript:app.Container.outlookHelper.SendEmail('" + personId + "','" + clientId + "','" + clientName + "','" + email + "','" + type + "')\"";
	//return '<a href="javascript:void(0)" onclick=' + fn + ' >' + val + '</a>';
													'<a href="mailto:{electronic_address_string}" target="_blank" >Send Email</a><br>',

												'</tpl>',
												'{person_first_name:this.viewCalendar}',
											'</td>',
										 '</tr>',
	/*TELEPHONE ROW*/

										 '<tr>',
											'<td valign="top" class="contact-details-border-ext"  valign="top">',
											'<tpl if="!this.isNullOrEmpty(values.phones)">',
												'<tpl for="values.phones">',
													'<span >{telecom_type_desc}:</span> {telecom_id:this.connectCall}</br>',
												'</tpl>',
											  '</tpl> &nbsp;',
											'</td>',
											 '<td  class="contact-details-border-ext" valign="top">',
												'<tpl if="!this.isNullOrEmpty(values.emails)">',
												'<tpl for="values.emails">',
												'<span >{electronic_addr_role_desc}: {electronic_address_string:this.showEmailDetails}',
												'<tpl if="values.research_flag==true">',
													'<span class="checked-icon">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></tpl><br>',
											   '</tpl>',
											   '</tpl>',
											   '{person_first_name:this.editContactDetail}',
											   '<br/><br/>{person_first_name:this.getEmploymentHistory}',

											'</td>',
										'</tr>',
										'<tr>',
										'<td colspan="2" >',
										'{person_first_name:this.showGCDatabutton}',
										'<div id="gc-data-panel" />',
										'</td>',
										'</tr>',
									'</table>',
								'</td>',
							'</tr>',
						'</table>'
				, {
					formatNull: function ($value) {
						if ($value == null)
							return '';
						else
							return $value;
					},
					isNullOrEmpty: function ($value) {
						if ($value == null || $value == '' || $value == ' ')
							return true;
						else
							return false;
					},
					isNotEmployee: function ($value) {
						if ($value == null || $value == '')
							return true;
						else if ($value.indexOf('credit-suisse.com') > 0)
							return false;
						else
							return true;
					},
					showAddActivityWindow: function ($value) {
						var _contactArr = [];
						_contactArr.push(_this._contactId);
						var _contactArrStr = Ext.util.JSON.encode(_contactArr);
						return '<a href="javascript:void(0)" onClick="util.showAddActivityWindow(\'' + _contactArrStr + '\',null,null)">Add Activity</a>';
					},
					viewCalendar: function ($value) {
						if (_this._contact) {
							return '<a href="javascript:void(0)" onClick="util.viewCalendar({ contactId : \'' + _this._contact.contact_id + '\',partyId : \'' + _this._contact.contact_id + '\', clientId : \'' + _this._contact.client_id + '\', contactName :  \'' + escape(_this._contact.client_name) + '\', clientName :  \'' + _this._contact.core_acct + '\'})">View Calendar</a>';
						}
					},
					connectCall: function ($telecomId) {
						for (var i = 0; i < _this._data.phones.length; i++) {
							var _phone = _this._data.phones[i];
							if (_phone.telecom_id == $telecomId) {
								return '<a href="javascript:void(0)" onclick="javascript:util.connectCall(\'' + escape(_this._contact.client_name) + '\',\'' + _phone.int_dial_code + '\',\'' + _phone.area_code + '\',\'' + _phone.cti_core_number + '\',\'' + _this._contactId + '\')">' + _phone.phone_display_number + '</a>';
							}
						}
						return '';
					},
					editContactDetail: function ($value) {
						if (_this._contact)
							return '<a href="javascript:void(0)"  onClick="javascript:util.editConactDetils(\'' + _this._contactId + '\',\'' + _this._contact.client_id + '\',\'' + _this._contact.core_acct + '\',\'' + escape(_this._contact.client_name) + '\',\'' + _this._contact.person_type_code + '\',\'' + _this._data.is_europen_flag + '\')">Edit Contact Details</a>';
					},
					getEmploymentHistory: function ($value) {
						//return '<a href="#" id="employment-history-link" onClick="util.showEmploymentHistoryWindow(\''+_this._contactId+'\',event)">Employment History</a>';
						if (_this._contact)
							return '<a href="#" id="employment-history-link" onClick="util.showEmploymentHistoryWindow(\'' + _this._contactId + '\',\'' + escape(_this._contact.client_name) + '\',event)">Employment History</a>';
					},
					showEmailDetails: function ($emailId) {

						var type = _this._contact.person_type_code == -1 ? 'Employee' : 'Contact';
						//debugger;
						//				        if($emailId.indexOf("'")>0)
						//				            $emailId = $emailId.replace("'", "\'");

						var fn = "\"javascript:app.Container.outlookHelper.SendEmail('" + _this._contactId + "','" + escape(_this._contact.client_name) + "','" + _this._contact.client_id + "','" + escape(_this._contact.core_acct) + "','" + escape($emailId) + "','" + type + "')\"";

						return '<a href="javascript:void(0)" onclick=' + fn + ' >' + $emailId + '</a>';
					},
					showGCDatabutton: function ($value) {

						return '<IMG id="btnExpandCollapse" style="CURSOR: hand" onclick="javascript:app.southpanel.widgets.contactprofile.ContactProfile.prototype.toggleExpandCollapse(this)" src="images/icons/plus-border.gif" align="absMiddle"  image_path_expanded="images/icons/minus-border.gif" image_path_unexpanded="images/icons/plus-border.gif" currentState="unexpanded"  /> &nbsp;&nbsp;Global Credit Products';
					},
					showMap: function ($value) {

						var address = "";
						if (!util.isNullOrEmpty(_this._data.line_2)) {
							address += _this._data.line_2 + ",";
						}

						if (!util.isNullOrEmpty(_this._data.line_3)) {
							address += _this._data.line_3 + ",";
						}

						if (!util.isNullOrEmpty(_this._data.line_4)) {
							address += _this._data.line_4 + ",";
						}

						if (!util.isNullOrEmpty(_this._data.line_5)) {
							address += _this._data.line_5 + ",";
						}

						if (!util.isNullOrEmpty(_this._data.line_6)) {
							address += _this._data.line_6 + ",";
						}

						if (!util.isNullOrEmpty(_this._data.line_8)) {
							address += _this._data.line_8 + ",";
						}
						if (!util.isNullOrEmpty(_this._data.postal_code)) {
							address += _this._data.postal_code + ",";
						}
						if (!util.isNullOrEmpty(_this._data.country_desc)) {
							address += _this._data.country_desc;
						}
						if (address.charAt(address.length - 1) == ',') {
							address = address.substring(0, address.length - 2);
						}
						//var name = escape(_this._contact.client_name.replace("'","\'"));
						var name = "";

						var t = String.format("<a style=\"text-decoration: none\" href=\"javascript:util.showMap('{0}','{1}')\"> {2} </a>", address, name, $value);

						return t;

					}



				});



};


