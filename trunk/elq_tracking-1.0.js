/*
Copyright 2010 Ben Griffith Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License. 
*/

/*
$.fn.elqTrack	: extends jQuery objects, for adding tracking to links going to untracked pages
					- siteid: integer, eloqua site id
					- elqid: string, email recipient id (optional)

$.elq			: base class, instantiate the object
					- siteid: integer, eloqua site id
.pagTrack		: instantiate the elqTracker, i.e. get an eloqua cookie and track the pageview
					- success: function, callback
					- url: string, page to be tracked (optional)
.getGUID		: get the eloqua guid, should be called on pageTrack callback or user event
					- callback: function, callback(guid)
.getData		: get a data lookup, should also be called on pageTrack callback or user event
					- key: string, data lookup key
					- lookup: string, data lookup value (not necessary for lookups using guid)
					- success: function, callback
.redirect		: track and redirect to url
					- url: string, full url you are redirecting to
					- elq: string, email recipient id (optional)
*/

(function($) {

//jQuery function extension
//
//usage:
//$("a.links").elqTrack();
$.fn.elqTrack = function(siteid, elqid) {
	if (typeof elqid == "undefined") elqid = "";
	if (typeof siteid == "undefined") return false;
	
	var elqVer = "v200";
	var url = (document.location.protocol == "https:" ? "https://secure" : "http://now") + ".eloqua.com/visitor/" + elqVer + "/svrGP.aspx";
	var ref2 = document.referrer != "" ? document.referrer : "elqNone";
	
	this.each(function() {
		var ref = this.href;
		if(ref == "") return false;
		
		$(this).click(function() {
			var ms = new Date().getMilliseconds();
			var track = url + "?pps=10&siteid=" + siteid + "&elq=" + elqid + "&ref=" + ref + "&ref2=" + ref2 + "&ms=" + ms;
			
			$.ajax({
				url: track,
				async: false,
				dataType: "script"
			});
			return false;
		});
	});
}

//jQuery function
//
//usage:
//var elqTracker = new jQuery.elq(xxx);
//elqTracker.pageTrack();
$.elq = function(siteid) {
	var elqVer = "v200";
	var url = (document.location.protocol == "https:" ? "https://secure" : "http://now") + ".eloqua.com/visitor/" + elqVer + "/svrGP.aspx";
	var siteid = siteid;
	var elqGUID;
	
	this.pageTrack = function(options) {
		settings = $.extend({
			url: "",
			success: ""
		}, options);
	
		var ref2 = document.referrer != "" ? document.referrer : "elqNone";
		var tzo = new Date(20020101).getTimezoneOffset();
		var ms = new Date().getMilliseconds();
		
		
		
		if(settings.url != "") {
			//track the url specified
			var elqSrc = url + "?pps=31&siteid=" + siteid + "&ref=" + settings.url + "&ref2=" + ref2 + "&tzo=" + tzo + "&ms=" + ms;
		
			if($("#elqFrame").length > 0) {
				$(elqFrame).load(function () {
					if(typeof settings.success == "function"){
						settings.success();
					}
				});
				$("#elqFrame").attr("src", elqSrc);
			} else {
				var elqFrame = document.createElement("iframe");
				elqFrame.style.display = "none";
				elqFrame.id = "elqFrame";
				$(elqFrame).load(function () {
					if(typeof settings.success == "function"){
						settings.success();
					}
				});
				elqFrame.src = elqSrc;
				document.body.appendChild(elqFrame);
			}
		} else {
			//track this page
			var elqSrc = url + "?pps=3&siteid=" + siteid + "&ref2=" + ref2 + "&tzo=" + tzo + "&ms=" + ms;
			
			var elqImg = new Image(1,1);
			$(elqImg).load(function () {
				if(typeof settings.success == "function"){
					settings.success();
				}
			});
			elqImg.src = elqSrc;
		}	
			
		
	};
	
	this.getGUID = function(callback) {
		var ref = location.href;
		var ms = new Date().getMilliseconds();
		var guid = url + "?pps=70&siteid=" + siteid + "&ref=" + ref + "&ms=" + ms;
		var elqGUID;
		
		$.ajax({
			url: guid,
			async: false,
			dataType: "script",
			success: function() {
				var elqGUID;
				if (typeof GetElqCustomerGUID == "function") {
					elqGUID = GetElqCustomerGUID();
				} else {
					return false;
				}

				if (typeof callback == "function") {
					callback(elqGUID);
				} else {
					return false;
				}
			}
		});
	}
	
	this.getData = function(options) {
		settings = $.extend({
			key: "",
			lookup: "",
			success: ""
		}, options);
		
		if(settings.key != "") {
			var ms = new Date().getMilliseconds();
			var dlookup = url + "?pps=50&siteid=" + siteid + "&DLKey=" + settings.key + "&DLLookup=" + settings.lookup + "&ms=" + ms;
			
			$.ajax({
				url: dlookup,
				async: false,
				dataType: "script",
				success: function() {
					if (typeof settings.success == "function") {
						settings.success();
					} else {
						return false;
					}
				}
			});
		}		
	}
	
	this.redirect = function(options) {
		settings = $.extend({
			url: "",
			elq: ""
		}, options);
		
		if(settings.url == "") return false;
		
		var ms = new Date().getMilliseconds();
		var ref2 = document.referrer != "" ? document.referrer : "elqNone";
		var redir = url + "?pps=10&siteid=" + siteid + "&elq=" + settings.elq + "&ref=" + settings.url + "&ref2=" + ref2 + "&ms=" + ms; 
		
		$.ajax({
			url: redir,
			async: false,
			dataType: "script"
		});
	}
};
})(jQuery);