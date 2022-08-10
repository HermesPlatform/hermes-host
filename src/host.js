var lastPeerId = null;
var peer = null; // own peer object
var conn = null;
var recvIdInput = document.getElementById("receiver-id");
var status = document.getElementById("status");
var connectButton = document.getElementById("connect-button");
var textArea = document.getElementById("textbox");

/**
 * Create the Peer object for our end of the connection.
 *
 * Sets up callbacks that handle any events related to our
 * peer object.
 */
function initialize() {
    // Create own peer object with connection to shared PeerJS server
    peer = new Peer({
        debug: 2,
        initialize: true,
    });

    peer.on('open', function (id) {
        // Workaround for peer.reconnect deleting previous id
        if (peer.id === null) {
            console.log('Received null id from peer open');
            peer.id = lastPeerId;
        } else {
            lastPeerId = peer.id;
        }

        console.log('ID: ' + peer.id);
    });
    peer.on('connection', function (c) {
        // Disallow incoming connections
        c.on('open', function () {
            c.send("Sender does not accept incoming connections");
            setTimeout(function () { c.close(); }, 500);
        });
    });
    peer.on('disconnected', function () {
        status.innerHTML = "Connection lost. Please reconnect";
        console.log('Connection lost. Please reconnect');

        // Workaround for peer.reconnect deleting previous id
        peer.id = lastPeerId;
        peer._lastServerId = lastPeerId;
        peer.reconnect();
    });
    peer.on('close', function () {
        conn = null;
        status.innerHTML = "Connection destroyed. Please refresh";
        console.log('Connection destroyed');
    });
    peer.on('error', function (err) {
        console.log(err);
        alert('' + err);
    });
};

/**
 * Create the connection between the two Peers.
 *
 * Sets up callbacks that handle any events related to the
 * connection and data received on it.
 */
function join() {
    // Close old connection
    if (conn) {
        conn.close();
    }

    // Create connection to destination peer specified in the input field
    conn = peer.connect(recvIdInput.value, {
        reliable: true
    });

    conn.on('open', function () {
        status.innerHTML = "Connected to: " + conn.peer;
        console.log("Connected to: " + conn.peer);

        navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: false
        }).then((stream) => {
            const call = peer.call(recvIdInput.value, stream);
        }).catch((er) => { console.error(er); });
    });

    conn.on('data', function (data) {
        textArea.innerHTML += data;
    });

    conn.on('close', function () {
        status.innerHTML = "Connection closed";
    });
};

// Start peer connection on click
connectButton.addEventListener('click', join);

// Since all our callbacks are setup, start the process of obtaining an ID
initialize();