# Raspberry Pi Switch
Control your lights with a Raspberry Pi and a webbrowser

##Demo on youtube
https://www.youtube.com/watch?v=VFQtGCU3Tfk

##How to install

* Log in on your Raspberry Pi and clone this repositry:

`
git clone https://github.com/leonvandenbeukel/raspberryswitch.git
`

* Change to the directory and then install install the npm gpio library:

`cd raspberryswitch`

Then:

`npm install gpio`

* Start the server:

`sudo nodejs start.js`

* Browse to:

`http://<your raspberry ip address>:3000`

Have fun!

