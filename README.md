# hermes-host
The Hermes host. Contains logic for peer to peer streaming of applications and games. Run on individual 'hosts'. Matchmaking between hosts and clients is done by 'hermes-core'


# Includes
- PeerJS library to create the peer to peer WebRTC connection.
- Simple html code to include the elements visible such as boxes, buttons and video window
- JS code adapted from https://jmcker.github.io/Peer-to-Peer-Cue-System/:
    - simplified a lot of the code (removed unnecessary functionality)
    - added functionality to create the streaming such as screen capture, and the PeerJS code for stream sending
- receiver.html file to receive WebRTC stream content
- sender.html file to send WebRTC stream content
# Workflow
1) Open receiver.html on smartphone / PC / laptop (you have to use firefox or chrome-based browser)
2) It loads the PeerJS (https://peerjs.com/) library that is used to built the connection
3) Connects to PeerServer Cloud (https://peerjs.com/peerserver). This is used now in place of the hermes-core but has the same functionality mainly gives out unique IDs for communication and does the initial hello handshake.
4) Then copy the id string.
5) Open in another tab / browser / device (unfortunately on smartphone you cannot share screen in such way, so use a compatible device) the sender.html. In this file paste the ID in the box and press connect. This would initiate the connection to the receiver and prompt you once that is done to share a tab, program or entire screen, choose one and the stream will appear on the receiver device.
# To be included:
- include the sandbox to prevent other people from 
- port it to c++


# Observations: