var dbus = require("../lib/dbus");

var dbusConnection = dbus.createConnection("session",
                          "org.designfu.TestService",
                          "/org/designfu/TestService/object",
                          "org.designfu.TestService",
                          function() {console.log("x11")});

process.nextTick(function() {
  console.log("xxx"); 
  console.log(dbusConnection.interface);
  
  dbusConnection.on("HelloSignal", function(args) { console.log("HelloSignal"); console.log(args); });

  timeout = function(ms, func) {
              return setTimeout(func, ms);
            };
  
  timeout(200000, function() {return console.log("ok, that was 2000 seconds");  });

});


//dbus.start( function() {
//  
//  console.log("start test signal");
//
//  dbus.init();
//
//  session = dbus.session_bus();
//  interface = dbus.get_interface(session, "org.designfu.TestService", "/org/designfu/TestService/object", "org.designfu.TestService")
//  
//  interface.HelloSignal.onemit= function(args) { console.log("xxxx");  console.log(args)}
//  interface.HelloSignal.enabled = true;
//  
//  interface.emitHelloSignal();
//
//  timeout = function(ms, func) {
//              return setTimeout(func, ms);
//            };
//  
//  timeout(200000, function() {return console.log("ok, that was 2000 seconds");  });
//
//});

