eloqua-tracking can be used to do custom event tracking, for example click tracking and external link tracking.

# Custom Page Tracking #

eloqua-tracking can track custom page values simply by calling the pageTrack() function and specifying what you want to track.  If nothing is specified, the current page is tracked as seen in [PageTracking](PageTracking.md).

Here's how it can be accomplished:

```
        elqTracker.pageTrack({url: "http://www.page_to_track.com/", success: function() { 
                alert("Tracking Complete"); 
        }});
```

This assumes elqTracker is a jQuery.elq object already instantiated with your organization's Eloqua SiteID.

# External Link Tracking #

There are some more options if you would like to add tracking to external links.  Whereas the pageTrack() function tracks custom entered pages and performs no further action on its own, the jQuery extension elqTrack() and function redirect() track pages with Eloqua and automatically redirect to them.

The extension can be applied to jQuery selectors like this:

```
        jQuery("a").elqTrack(100); 
```

The above line will cause every link on a page to be tracked with Eloqua and redirect to it.  The number specified for elqTrack() is again your organization's SiteID.

**It is important to note that when using this, the links that are updated must have absolute referenced href attributes**.  That is `<a href="http://www.mypage.com/info">` is fine, but `<a href="info">` is not.

If you do not want to use jQuery selectors, you can call the redirect function on an jQuery.elq object as well like this:

```
        elqTracker.redirect(url: "http://www.mypage.com/info", elq: "")
```

elqTracker is as usual assumed to be an already instantiated jQuery.elq object.  The elq parameter specified above takes in an Elqoua recipient ID.  So if you are redirecting on a page that is linked to from an Eloqua email, you likely will want to pull the "elq" query string parameter and pass it in here.

Other Pages:
  * [PageTracking](PageTracking.md)
  * [EloquaGUID](EloquaGUID.md)
  * [DataLookups](DataLookups.md)