**Note: I exported this repo from it's original home at [https://code.google.com/p/eloqua-tracking/](https://code.google.com/p/eloqua-tracking/) since Google Code is going to be shut down. I'm not the original author.**

See the [Wiki](wiki) for more documentation.

This project aims to provide an easy to use javascript library for implementing eloqua tracking on websites.

It requires jquery.

To get started, download version 1 of the plugin by clicking the link in Featured Downloads to your right.

You'll want to include this file after including the jQuery library on your page and then you can start using it. To implement simple page tracking you can write this bit of javascript:

<script type="text/javascript">
        var elqTracker = new jQuery.elq(*siteid*);
        elqTracker.pageTrack();
</script>
Also, drop by my blog to get more details on using the plugin http://ben.grifflabs.com. A flash version of this library is being developed here

What you can do with the plugin:

* track page views
* retrieve a user's Eloqua cookie guid
* add redirect link tracking the jQuery way
* use data lookups
* track custom events (you'll have to specify a "page" for this)
* use callbacks with everything (the asynchronous way)
