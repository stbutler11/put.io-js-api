// Using ns as described here: http://yuiblog.com/blog/2007/06/12/module-pattern/#comment-140208

var putdotio = (function() {

    var base_uri = "https://api.put.io/v1/";

    API = function(key, secret) {
        this.key = key;
        this.secret = secret;
    }
    
    /* User */
    API.prototype.user_info = function(callback) {
        post_request("user", "info", new Object(),
                callback, this.key, this.secret);
    }

    API.prototype.friends = function(callback) {
	post_request("user", "friends", new Object(),
		callback, this.key, this.secret);
    }

    /* Files */
    API.prototype.list_files = function(callback, id, parent_id, offset,
	limit, type, orderby) {
	var params = new Object();
	params.callback = callback;
	params.id = id;
	params.parent_id = parent_id;
	params.offset = offset;
	params.limit = limit;
	params.type = type;
	params.orderby = orderby;
	post_request = ("files", "list", params, 
		callback, this.key, this.secret);
    }

    API.prototype.create_dir = function(callback, name, parent_id) {
	var params = new Object();
	params.name = name;
	params.parent_id = parent_id;
	post_request("files", "create_dir", params,
		callback, this.key, this.secret);
    }

    API.prototype.item_info = function(callback, id) {
	var params = new Object();
	params.id = id;
	post_request("files", "info", params,
                callback, this.key, this.secret);
    }

    API.prototype.rename_item = function(callback, id, name) {
	var params = new Object();
        params.id = id;
        params.name = name;
        post_request("files", "rename", params,
                callback, this.key, this.secret);
    }

    API.prototype.move_item = function(callback, id, parent_id) {
        var params = new Object();
        params.id = id;
        params.parent_id = parent_id;
        post_request("files", "move", params,
                callback, this.key, this.secret);
    }

    API.prototype.delete_item = function(callback, id) {
        var params = new Object();
        params.id = id;
        post_request("files", "delete", params,
                callback, this.key, this.secret);
    }

    API.prototype.search = function(callback, query) {
        var params = new Object();
        params.query = query;
        post_request("files", "search", params,
                callback, this.key, this.secret);
    }

    API.prototype.dirmap = function(callback) {
        var params = new Object();
        post_request("files", "dirmap", params,
                callback, this.key, this.secret);
    }

    /* Messages */
    API.prototype.list_messages = function(callback) {
        var params = new Object();
        post_request("messages", "list", params,
                callback, this.key, this.secret);
    }

    API.prototype.delete_message = function(callback, id) {
        var params = new Object();
	params.id = id;
        post_request("messages", "delete", params,
                callback, this.key, this.secret);
    }

    /* Subscriptions */
    API.prototype.list_subscriptions = function(callback) {
        var params = new Object();
        post_request("subscriptions", "list", params,
                callback, this.key, this.secret);
    }

    API.prototype.create_subscription = function(callback, title, url,
		do_filters, dont_filters, parent_folder_id, paused) {
        var params = new Object();
	params.title = title;
	params.url = url;
	params.do_filters = do_filters;
	params.dont_filters = dont_filters;
	params.parent_folder_id = parent_folder_id;
	params.paused = paused;
        post_request("subscriptions", "create", params,
                callback, this.key, this.secret);
    }

    API.prototype.edit_subscription = function(callback, id, title, url,
                do_filters, dont_filters, parent_folder_id, paused) {
        var params = new Object();
	params.id = id;
        params.title = title;
        params.url = url;
        params.do_filters = do_filters;
        params.dont_filters = dont_filters;
        params.parent_folder_id = parent_folder_id;
        params.paused = paused;
        post_request("subscriptions", "edit", params,
                callback, this.key, this.secret);
    }

    API.prototype.delete_subscription = function(callback, id) {
        var params = new Object();
	params.id = id;
        post_request("subscriptions", "delete", params,
                callback, this.key, this.secret);
    }

    API.prototype.pause_subscription = function(callback, id) {
        var params = new Object();
        params.id = id;
        post_request("subscriptions", "pause", params,
                callback, this.key, this.secret);
    }

    API.prototype.subscription_info = function(callback, id) {
        var params = new Object();
        params.id = id;
        post_request("subscriptions", "info", params,
                callback, this.key, this.secret);
    }

    /* Transfers */
    API.prototype.list_transfers = function(callback) {
        var params = new Object();
        post_request("transfers", "list", params,
                callback, this.key, this.secret);
    }

    API.prototype.cancel_transfer = function(callback, id) {
        var params = new Object();
	params.id = id;
        post_request("transfers", "cancel", params,
                callback, this.key, this.secret);
    }

    API.prototype.add_transfer = function(callback, links) {
        var params = new Object();
        params.links = links;
        post_request("transfers", "add", params,
                callback, this.key, this.secret);
    }
    
    /* Urls */
    API.prototype.analyze_urls = function(callback, urls) {
        var params = new Object();
        params.urls = urls;
        post_request("urls", "analyze", params,
                callback, this.key, this.secret);
    }

    API.prototype.extract_urls = function(callback, txt) {
        var params = new Object();
        params.txt = txt;
        post_request("urls", "extracturls", params,
                callback, this.key, this.secret);
    }

    post_request = function(obj_type, method, params, callback, key, secret) {
        var uri = base_uri + obj_type + "?method=" + method;
	request = new Object();
	request.api_key = key;
	request.api_secret = secret;
	request.params = params;
        uri += '&request=' + JSON.stringify(request);
	if (callback.name) {
		// use the name of the callback if it's passed in.
        	uri += '&callback=' + callback.name;
 	} else {
		// FIXME This feels really hacky
		uri += '&callback=' + callback;
	}
	var script = document.createElement('script');
	script.setAttribute('src', uri);

	// load the script
	document.getElementsByTagName('head')[0].appendChild(script); 
    }

    return {
	API:API
    };
})();
