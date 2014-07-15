jQuery.fn.tagCloud = function(cl, givenOptions) { //return this.each( function() { //like a real jQuery plugin: run on on each element
   if (!cl || !cl.length)
      return this;

   // Default settings:
   var defaults = {
      sort: function (a, b) {return a.tag < b.tag ? -1 : (a.tag == b.tag ? 0 : 1)},//default sorting: abc
      click: function(tag) {},
      maxFontSizeEm: 4,
      min: -1,
      max: -1
   }

   var options = {};
   jQuery.extend(options, defaults, givenOptions);

   // calculating the max and min count values,
   // but we only want to do it if we don't know the max & min values
   if (max < 0 && min < 0) {
       var max = -1;
       var min = cl[0].count;
       $.each(cl, function(i, n) {
          max = Math.max(n.count, max);
          min = Math.min(n.count, min);
       });
   }

   if (options.sort) {
      cl.sort(options.sort);
   }

   //Normalization helper
   var diff = ( max == min ? 1    // if all values are equal, do not divide by zero
                           : (max - min) / (options.maxFontSizeEm - 1) ); //optimization: Originally we want to divide by diff
                           // and multiple by maxFontSizeEm - 1 in getNormalizedSize.
   function getNormalizedSize(count) {
      return 1 + (count - min) / diff;
   }

   // Generating the output
   this.empty();
   for (var i = 0; i < cl.length; ++i) {
      var tag = cl[i].tag;
      var tagEl = jQuery('<a href="" class="tagcloudlink" style="font-size: '
                           + getNormalizedSize(cl[i].count)
                           + 'em">' + tag + '<\/a>')
                  .data('tag', tag);

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
