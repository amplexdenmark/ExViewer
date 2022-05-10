/**
 * @file exviewer.js
 * ABSTRACT HERE << 
 *
 * $Id$
 *
 * (C) Copyright 2022 Amplex, fm at amplex dot dk
 */

(function($) {

  function loadLink(url) {
    $("#ts").empty();
    $("#lines").empty();

    $.getJSON(url, function(data) {
      data.occurrences.each(ts => $("#lines").append(`<div class="row">${ts}</div>`));

      let lines = "\n"+data.lines.join("\n");
      let startPos = data.lines.slice(0, data.startLine-1).join(" ").length;
      let endPos = data.lines.slice(0, data.endLine).join(" ").length;
      
      let LogLead = [... lines.matchAll(/\n[^ ]* *[^,]*,[^ ]* *[0-9]* *[A-Z]+ *\[[^]]+] *(\S+)/g)]
      let FileAndLine = [... lines.matchAll(/\n([a-zA-Z_-]\+\.java:[0-9]\+)/g)]
    });
  }

  document.onload = function() {
    $(document).on('click', 'a', function(e) {
      e.preventDefault(); 
      loadLink(this.href);
    });

    $("ul").after(`
    <h4>Occurrences</h4>
    <div id="ts" class="container-fluid"></div>
    <h4><a href="#exStart">Content</a></h4>
    <pre id="lines"></pre>"
    `);
  };

})(JQuery);


// vim: set sw=2 sts=2 et:
