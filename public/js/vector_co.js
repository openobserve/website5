(function () {
  !(function (e, r) {
    try {
      if (e.vector)
        return void console.log("Vector snippet included more than once.");
      var t = {};
      t.q = t.q || [];
      for (
        var o = ["load", "identify", "on"],
          n = function (e) {
            return function () {
              var r = Array.prototype.slice.call(arguments);
              t.q.push([e, r]);
            };
          },
          c = 0;
        c < o.length;
        c++
      ) {
        var a = o[c];
        t[a] = n(a);
      }
      if (((e.vector = t), !t.loaded)) {
        var i = r.createElement("script");
        (i.type = "text/javascript"),
          (i.async = !0),
          (i.src = "https://cdn.vector.co/pixel.js");
        var l = r.getElementsByTagName("script")[0];
        l.parentNode.insertBefore(i, l), (t.loaded = !0);
      }
    } catch (e) {
      console.error("Error loading Vector:", e);
    }
  })(window, document);
  vector.load("d314ff46-efcd-424e-b0c9-4a9e8f3c5e5b");
})();
