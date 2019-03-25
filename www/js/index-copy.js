var readCount = 0;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // Read NDEF formatted NFC Tags

        nfc.addNdefListener (
            app.onNdef,
            function () { // success callback
                alert('Ready. Please scan a NFC tag.\n');
            },
            function (error) { // error callback
                navigator.notification.alert('Error adding NDEF listener ' + JSON.stringify(error));
            }
        );
    },
    onNdef: function (nfcEvent) {
        var tag = nfcEvent.tag,
            ndefMessage = tag.ndefMessage;

        // log the raw json of the message
        console.log(JSON.stringify(ndefMessage));

        // assuming the first record in the message has
        // a payload that can be converted to a string.
        // real apps should read the TNF, type, and leading bytes of payload
        // Hack for demo: removing first 3 bytes, assuming [2, 'e', 'n']
        var text = nfc.bytesToString(ndefMessage[0].payload).substring(3);
		//alert(text);

        //app.log('NFC tag contains: ' + text);

        // increment the read count and write the counter value to the tag
        readCount++;
        var message = [
            ndef.textRecord(readCount)
        ];
		alert("write");

        nfc.write(
            message,
            function() {
				alert(readCount);
                //app.log('\nWrote "' + readCount + '" to the NFC tag.\nScan again to increase the count.\n');
            },
            function() {
				alert("failed");
                navigator.notification.alert('Failed to write "' + readCount + '" to the NFC tag', null, 'ERROR');
            }
        );
		alert(APP.postUrl);
    },
    // log message to the console and HTML
    log: function(message) {
        console.log(message);
        var pre = document.querySelector('pre');
        pre.innerHTML += '\n' + message;
    }
};

app.initialize();
