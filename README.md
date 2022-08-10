# hermes-host
The Hermes host. Contains logic for peer to peer streaming of applications and games. Run on individual 'hosts'. Matchmaking between hosts and clients is done by 'hermes-core'


# Includes
- PeerJS library to create the peer to peer WebRTC connection.
- Simple html code to include the elements visible such as boxes, buttons and video window
- JS code adapted from https://jmcker.github.io/Peer-to-Peer-Cue-System/:
    - simplified a lot of the code (removed unnecessary functionality)
    - added functionality to create the streaming such as screen capture, and the PeerJS code for stream sending
- client.html file to receive WebRTC stream content
- host.html file to send WebRTC stream content

# Workflow
1) Open client.html on smartphone / PC / laptop (you have to use firefox or chrome-based browser)
2) It loads the PeerJS (https://peerjs.com/) library that is used to built the connection
3) Connects to PeerServer Cloud (https://peerjs.com/peerserver). This is used now in place of the hermes-core but has the same functionality mainly gives out unique IDs for communication and does the initial hello handshake.
4) Then copy the id string.
5) Open in another tab / browser / device (unfortunately on smartphone you cannot share screen in such way, so use a compatible device) the host.html. In this file paste the ID in the box and press connect. This would initiate the connection to the client and prompt you once that is done to share a tab, program or entire screen, choose one and the stream will appear on the client device.

# File structure:
src
- client.js
- host.js

client.html

host.html

# To be included
- Include the sandbox to prevent users from accessing other apps and private information
- Port it to c++
- Think about devices standing behind firewall or some NAT which might cause problems. As far as I read it is solved through using STUNs and TURNs (which are firewall traversal programs)

# Observations
With WebRTC we can send data in any format including: only audio, only video, both audio and video or text data. 

We should think of more use cases!

We can also have bidirectional commucation or semi-directional one. 