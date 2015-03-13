This project aims to provide an easy to use javascript library for implementing eloqua tracking on websites.

It requires jquery.

To get started, download version 1 of the plugin by clicking the link in Featured Downloads to your right.

You'll want to include this file after including the jQuery library on your page and then you can start using it.  To implement simple page tracking you can write this bit of javascript:

```
<script type="text/javascript">
	var elqTracker = new jQuery.elq(*siteid*);
	elqTracker.pageTrack();
</script>
```

Also, drop by my blog to get more details on using the plugin http://ben.grifflabs.com.  A flash version of this library is being developed <a href='http://code.google.com/p/eloqua-flash'>here</a>

What you can do with the plugin:
<ul>
<li>track page views</li>
<li>retrieve a user's Eloqua cookie guid</li>
<li>add redirect link tracking the jQuery way</li>
<li>use data lookups</li>
<li>track custom events (you'll have to specify a "page" for this)</li>
<li>use callbacks with everything (the asynchronous way)</li>
</ul>