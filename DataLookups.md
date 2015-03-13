eloqua-tracking can be used to do data lookups into the Eloqua database

# The Information you Need #

To use the data lookup function, you first must have a data lookup created in Eloqua.  Setting this up is outside the scope of this document, but you should be able to find lots of information on Eloqua's customer central.

Once you have a data lookup setup in Eloqua, you should look to generate the scripts in eloqua to find out two pieces of information:

  1. The data lookup key.  In the eloqua code this will be the value of the elqDLKey variable.
  1. The data lookup query.  In the eloqua code this will be the elqDLLookup value.  Usually it will either be blank (for a visitor record lookup) or `<C_EmailAddress>contact's email address</C_EmailAddress>` (for a contact record lookup).

Once you have these two pieces of information, you can use the getData function of eloqua-tracking.

# Getting Data from Eloqua #

To call the getData() function you can use the following lines of code:

```
        elqTracker.getData({key: "{eawf-waef-afaef332fa}", lookup: "<C_EmailAddress>me@me.com</C_EmailAddress>", success: function() {
                //do something here
                //it's often good to wrap this is an if(typeof eloquaFunction == "function") statement, where eloquaFunction is whatever function gets returned.
        }});
```

# Cookie Lookup #

The general structure of a lookup to a visitor record using the eloqua cookie guid would look like"

```
var elqTracker = new jQuery.elq(123);
//first do the visitor lookup
elqTracker.getData({ key: "{…}", lookup: "", success: function() {
	//then check for an email address on the visitor record and do a contact data lookup if there is one
	if (typeof GetElqContentPersonalizationValue == "function") {
		var email = GetElqContentPersonalizationValue("V_ElqEmailAddress");
		if (email != "") {
			elqTracker.getData({ key: "{…}", lookup: "<C_EmailAddress>" + email + "</C_EmailAddress>", success: function() {
				if (typeof GetElqContentPersonalizationValue == "function") {
					//do all the prepopulation stuff        
				}
			}});
		}
	}
}});
```

Here a visitor data lookup would be checked, followed by a contact data lookup if an email address could be pulled from the visitor record associated with a user's eloqua cookie.

Other Pages:
  * [PageTracking](PageTracking.md)
  * [EloquaGUID](EloquaGUID.md)
  * [CustomTracking](CustomTracking.md)