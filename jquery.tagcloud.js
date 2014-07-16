jQuery.fn.tagCloud = function(cl, givenOptions) { //return this.each( function() { //like a real jQuery plugin: run on on each element
   if (!cl || !cl.length)
      return this;

   // Default settings:
   var defaults = {
      sort: function (a, b) {return a.tag < b.tag ? -1 : (a.tag == b.tag ? 0 : 1)},//default sorting: abc
      click: function(tag) {},
      maxFontSize: 4,
      min: -1,
      max: -1,
      data: {},
      template: false
   }

   var text = '';
   var options = {};
   jQuery.extend(options, defaults, givenOptions);

   // calculating the max and min count values,
   // but we only want to do it if we don't know the max & min values
   var max = options.min,
       min = options.max;
   if (max < 0 && min < 0) {
       max = -1;
       min = cl[0].count;
       $.each(cl, function(i, n) {
          max = Math.max(n.count, max);
          min = Math.min(n.count, min);
       });
   }

   if (options.sort) {
      cl.sort(options.sort);
   }

   // Make sure that we have the correct text for the tagcloud.
   if (options.template) {
       text = options.template;
   } else {
       text = '<a href="{href}" class="tagcloudlink" style="font-size: {size}em">{tag}<\/a>';
   }

   //Normalization helper
   var diff = ( max == min ? 1    // if all values are equal, do not divide by zero
                           : (max - min) / (options.maxFontSize - 1) ); //optimization: Originally we want to divide by diff
                           // and multiple by maxFontSize - 1 in getNormalizedSize.
   function getNormalizedSize(count) {
      return 1 + (count - min) / diff;
   }

   // Generating the output
   this.empty();
   for (var i = 0; i < cl.length; ++i) {
      var tag = cl[i].tag;
      var count = cl[i].count;
      var template_tags = {
          "tag": tag,
          "size": getNormalizedSize(count),
          "count": count
      };

      var _text = text.replace(/{([^{}]+)}/g, function(m, key){
          return template_tags[key] || "";
      });

      var tagEl = jQuery(_text)
                  .data('tag', tag)
                  .data(options.data);

      if (options.click) {
         tagEl.click(function(event) {
            event.preventDefault();
            options.click(jQuery(event.target).data('tag'), event);
         });
      }
      this.append(tagEl).append(" ");
   }
   return this;
//})
}
