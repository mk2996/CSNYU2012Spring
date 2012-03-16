window.onload = function() {
	var r = Raphael("holder");
	var txt = r.print(10, 50, "print", r.getFont("Museo"), 30).attr({fill: "#fff"});

	// Define the ending colour, which is white
	xr = 255; // Red value
	xg = 255; // Green value
	xb = 255; // Blue value

	r.customAttributes.segment = function(x, y, r, a1, a2, pos, n, yr, yg, yb) {

		// Calculate a specific colour point
		// pos - calculated in the earlier code identifies where on the scale the data point is

		red = parseInt((xr + ((pos * (yr - xr)) / (n - 1))).toFixed(0));
		green = parseInt((xg + ((pos * (yg - xg)) / (n - 1))).toFixed(0));
		blue = parseInt((xb + ((pos * (yb - xb)) / (n - 1))).toFixed(0));

		var flag = (a2 - a1) > 180, clr = (a2 - a1) / 360;
		a1 = (a1 % 360) * Math.PI / 180;
		a2 = (a2 % 360) * Math.PI / 180;
		return {
			path : [
					[ "M", x, y ],
					[ "l", r * Math.cos(a1), r * Math.sin(a1) ],
					[ "A", r, r, 0, +flag, 1, x + r * Math.cos(a2),
							y + r * Math.sin(a2) ], [ "z" ] ],
			fill : "rgb(" + red + "," + green + "," + blue + ")",
			
		};
	};
	

	
	// Define the starting colour #f32075
	yr = 0; // Red value
	yg = 0; // Green value
	yb = 255; // Blue value

    xr = 230; // Red value
    xg = 230; // Green value
    xb = 255; // Blue value

	var data_revenue = [ 36699660, 25672502, 10846684, 13895064, 9977039,
			11503921, 10092243, 16446015, 23130213, 11315673 ], paths = r.set(), total, start, bg = r
			.circle(200, 200, 0).attr({
				stroke : "#fff",
				"stroke-width" : 4
			});
	data_revenue = data_revenue.sort(function(a, b) {
		return b - a;
	});

	total_revenue = 0;
	for ( var i = 0, ii = data_revenue.length; i < ii; i++) {
		total_revenue += data_revenue[i];
	}
	start = 0;
	for (i = 0; i < ii; i++) {
		var val = 360 / total_revenue * data_revenue[i];
		(function(i, val) {
			var p = r.path().attr(
					{
						segment : [ 300, 300, 250, start, start + val, i, ii,
								yr, yg, yb ],
						stroke : "#fff",
						tile : 'blah 2'
					});
			p.mouseover(function() { 
				var text = 'Revenue : $';
				text += data_revenue[i];
				text += "\n\n";
				text += 'Percentage of Total Revenue : ';
				text += (data_revenue[i]*100/total_revenue).toFixed(2);
				text += '%';
				
				tooltip.show(text, 300);
			});
			p.mouseout(function() {
				tooltip.hide();
			});
			paths.push(p);
		})(i, val);
		start += val;
	}

	// Define the starting colour #f32075
	yr = 255; // Red value
	yg = 0; // Green value
	yb = 0; // Blue value

    xr = 255; // Red value
    xg = 230; // Green value
    xb = 230; // Blue value

	var data_trade_vol = [ 15916642203, 4319397380, 1307512583, 1110599486,
			2291433884, 4406505581, 5816711511, 3356391020, 1779901481,
			888639859 ], paths = r.set(), total, start, bg = r.circle(200, 200,
			0).attr({
		stroke : "#fff",
		"stroke-width" : 4
	});
	
	data_trade_vol = data_trade_vol.sort(function(a, b) {
		return b - a;
	});

	var total_trade_vol = 0;
	var trade_vol_revenue_ratio = new Array();
	for ( var i = 0, ii = data_trade_vol.length; i < ii; i++) {
		total_trade_vol += data_trade_vol[i];
		trade_vol_revenue_ratio[i] = data_trade_vol[i]/data_revenue[i];
	}
	
	trade_vol_revenue_ratio = trade_vol_revenue_ratio.sort(function(a, b) {
		return b - a;
	});
	
	
	start = 0;
	for (i = 0; i < ii; i++) {
		var val = 360 / total_trade_vol * data_trade_vol[i];
		var pos_in_ratio = findPos(data_trade_vol[i]/data_revenue[i], trade_vol_revenue_ratio);
		(function(i, val) {
			
			p = r.path().attr(
					{
						segment : [ 300, 300, 200, start, start + val, pos_in_ratio, ii,
								yr, yg, yb ],
						stroke : "#fff"
					});
			p.mouseover(function() { 
				var text = 'Trade Vol : ';
				text += data_trade_vol[i].toFixed(2);
				text += '\n\n Percentage of Total Trade Vol : ';
				text += (data_trade_vol[i] * 100/total_trade_vol).toFixed(2);
				text += " % \n\n Trade Vol / Revenue : ";
				text += (data_trade_vol[i]/data_revenue[i]).toFixed(2);
				tooltip.show(text, 300);
			});
			p.mouseout(function() {
				tooltip.hide();
			});
			paths.push(p);
		})(i, val);
		start += val;
	}

	// Define the starting colour #f32075
	yr = 0; // Red value
	yg = 255; // Green value
	yb = 0; // Blue value

    xr = 230; // Red value
    xg = 255; // Green value
    xb = 230; // Blue value
	var data_trade_expense = [ 366996.60, 256725.02, 108466.84, 138950.64,
			99770.39, 115039.21, 100922.43, 164460.15, 231302.13, 113156.73 ], paths = r
			.set(), total, start, bg = r.circle(200, 200, 0).attr({
		stroke : "#fff",
		"stroke-width" : 4
	});
	
	data_trade_expense = data_trade_expense.sort(function(a, b) {
		return b - a;
	});

	var total_expense = 0;
	var trade_expense_revenue_ratio = new Array();
	for ( var i = 0, ii = data_trade_vol.length; i < ii; i++) {
		total_trade_vol += data_trade_vol[i];
	}
	
	
	for ( var i = 0, ii = data_trade_expense.length; i < ii; i++) {
		total_expense += data_trade_expense[i];
		trade_expense_revenue_ratio[i] = data_trade_expense[i]/data_revenue[i];

	}
	trade_expense_revenue_ratio = trade_expense_revenue_ratio.sort(function(a, b) {
		return b - a;
	});
	
	start = 0;
	for (i = 0; i < ii; i++) {
		var val = 360 / total_expense * data_trade_expense[i];
		pos_in_ratio = findPos(data_trade_expense[i]/data_revenue[i], trade_expense_revenue_ratio);
		
		(function(i, val) {
			
			p = r.path().attr(
					{
						segment : [ 300, 300, 150, start, start + val, i, ii,
									yr, yg, yb ],
							stroke : "#fff"
					});
			p.mouseover(function() { 
				var text = 'Travel and Entertaiment : $ ';
				text += data_trade_expense[i].toFixed(2);
				text += '\n\n Percentage of Total Expense : ';
				text += (data_trade_expense[i] * 100/total_expense).toFixed(2);
				text += " % \n Travel and Expense per $ 1000 Revenue : ";
				text += (data_trade_expense[i] * 1000 /data_revenue[i]).toFixed(2);
				tooltip.show(text, 300);
			});
			p.mouseout(function() {
				tooltip.hide();
			});
			paths.push(p);
			
		})(i, val);
		start += val;
	}



	// define the starting colour #f32075
	yr = 100; // red value
	yg = 100; // green value
	yb = 153; // blue value

    xr = 167; // Red value
    xg = 167; // Green value
    xb = 255; // Blue value

	var data_meeting = [ 170, 42, 12, 46, 30, 85, 46, 22, 29, 21 ], paths = r
			.set(), total, start, bg = r.circle(200, 200, 0).attr({
		stroke : "#fff",
		"stroke-width" : 4
	});
	data_meeting = data_meeting.sort(function(a, b) {
		return b - a;
	});

	var total_meeting = 0;
	for ( var i = 0, ii = data_meeting.length; i < ii; i++) {
		total_meeting += data_meeting[i];
	}
	start = 0;
	for (i = 0; i < ii; i++) {
		var val = 360 / total_meeting * data_meeting[i];
		(function(i, val) {
			p = r.path().attr(
					{
						segment : [ 300, 300, 100, start, start + val, i, ii,
									yr, yg, yb ],
							stroke : "#fff"
					});
			p.mouseover(function() { 
				var text = 'Meeting Count : ';
				text += data_meeting[i];
				text += '\n\n Percentage Over Total Meetings : ';
				text += (data_meeting[i] * 100/total_meeting).toFixed(2);
				text += " % \n Meeting per 1 Million Revenue Earned : ";
				text += (data_meeting[i] * 1000000/(data_revenue[i])).toFixed(2);
				tooltip.show(text, 300);
			});
			p.mouseout(function() {
				tooltip.hide();
			});
			paths.push(r.path().attr(
					{
						
					}).click(function() {
			}));
		})(i, val);
		start += val;
	}

};

function findPos(value, array){
	for(var i = 0; i < array.length; i++){
		if(array[i] == value){
			return i;
		}
	}
	return -1;
}
