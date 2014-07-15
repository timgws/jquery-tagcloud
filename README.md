# TagCloud jQuery plugin

A dynamic JavaScript tag/keyword cloud plugin for jQuery, designed to use with Ajax:
the cloud is generated from an array.

MIT license.

Schaffer Krisztián
http://woophoo.com

Usage:
------

### Basic Usage example.

Call it on a jQuery object created from one element and pass an array of
objects with "tag" and "count" attributes.

        var tags = [
        {
            tag: "computers",
            count: 56
        }, {
            tag: "mobile",
            count :12
        }, ... ];

        $("#tagcloud").tagCloud(tags);

### Advanced usage example

Similar to the Basic Usage, you could perform an AJAX request, and with the
response, then build a tag cloud.

        $.ajax('http://example.org/the-tagcloud/').done(function(response)) {
            $("#tagcloud").tagCloud(response.tags, {
                click: function(tag, e) {
                    alert("You just clicked on: " + tag);
                },
                min: response.min,
                max: response.max
            });
        });

In this example, min & max are calculated inside the JSON data.

Configuration:
--------------
You can pass a configuration object to tagCloud as the second parameter.

### Configuration Settings:

Allowed settings are:

* `sort`: Comparator function used for sort the tags before displaying, or false if no sorting needed.
>  default: sort by tag text using

          function (a, b) {return a.tag < b.tag ? -1 : (a.tag == b.tag ? 0 : 1)

* `click`: Event handler which receives the tag name as first parameter
   and the original click event as second. The preventDefault() is called
   on event before passing so don't bother.
>  default: does nothing:

          function(tag, event) {}

* `maxFontSizeEm`: Size of the largest tag in the cloud in css 'em'. The smallest
   one's size is 1em so this value is the ratio of the smallest and largest
   sizes.
>  default: 4


Styling:
--------
 The plugin adds the "tagcloudlink" class to the generated tag links. Note that
an "&amp;nbsp;" is generated between the links too.


Originally based on DynaCloud v3 by Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>

# CHANGES:
* 15 july 2014 (Tim Groeneveld)
 * Add the ability to set max & min and not have tag cloud calculate values.
 * Improved documentation a little.
* 05 sept. 2008 (Schaffer Krisztián)
 * Improved normalization algorithm - better looking font sizes
 * New settings: click, maxFontSizeEm
 * Documentation
* 04 sept. 2008 (Schaffer Krisztián)
 * Initial version
