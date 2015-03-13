How to use eloqua-tracking for page tracking

# Start by including the library and jquery #

```
<script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="js/elq_tracking-1.0-min.js"></script>
```

# Create the eloqua-tracking object with your SiteID #

```
<script type="text/javascript">
	var elqTracker = new jQuery.elq(100);
</script>
```

The SiteID value can be found be looking at the integration details for any of your Eloqua forms.

# Add the page tracking #

This code has instantiated the tracking object, but we have not yet used it to do anything yet.  To add basic page tracking to the page you are working with, you can add the line:

```
	elqTracker.pageTrack();
```

# Other notes #

We have reviewed adding simple page tracking using eloqua-tracking, but there are a few more options you may need to use that eloqua-tracking can help with:

  * [EloquaGUID](EloquaGUID.md)
  * [CustomTracking](CustomTracking.md)
  * [DataLookups](DataLookups.md)