Be sure to check out [PageTracking](PageTracking.md) before looking at this.

# Grabbing the GUID #

To grab the Eloqua cookie GUID, you need to call the getGUID function for the jQuery.elq object.  This function will return the cookie GUID, but since the request is asynchronous you must specify what is to be done with the guid in a callback.

Furthermore, it is best to call this function in a callback to the pageTrack() function as well.  This is because if you don't first have an Eloqua cookie, you will not be able to grab the cookie GUID.

This is how you can use the getGUID functionality:

```
elqTracker.pageTrack({success: function() { 
        elqTracker.getGUID(function(guid) { 
                console.log("guid gotten: " + guid); 
        }); 
}});  
```

If you want to do something with the GUID, like pass it as a hidden form field it is advised that this function is called during the jQuery(document).ready event or at the end of a form submit handler.  If it's called at the end of the form submit handler, you should call form.submit() in the getGUID() callback.

Other Pages:
  * [PageTracking](PageTracking.md)
  * [CustomTracking](CustomTracking.md)
  * [DataLookups](DataLookups.md)