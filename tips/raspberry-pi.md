
## a0 Powering the RPi
-
```
If you use the micro-USB power input to power the RPi you might encounter sudden reboots when plugging in or unplugging USB devices. If you want to be sure your RPi doesn't reboot in such cases you can try backfeed powering your RPi by connecting the power supply to one of the USB ports or use a powered USB hub that backfeeds. Also make sure your power supply can provide at least 700mA at 5V. If you plan on using an USB interface you might need more power so try to find a power supply that provides 2A or even more.
```

---

## a1 Verify if the the hash key is the same (optional), in the terminal run:

```
shasum ~/Downloads/2012-12-16-wheezy-raspbian.zip
```

---

## a2 making raspberry image

-

```
(WIN32)
Using the Win32DiskImager program
Download the distribution from the raspberrypi.org downloads page or from a mirror or torrent. Make sure the distribution is for the Raspberry Pi, as others will not work. Usually these are zipped (compressed) files ending in .zip or .gz (something like "distribution-name.zip").
Extract the image file from the downloaded .zip file, so you now have "distribution-name.img".
Insert the SD card into your SD card reader and check what drive letter it was assigned. You can easily see the drive letter (for example G:) by looking in the left column of Windows Explorer. You can use the SD Card slot (if you have one) or a cheap Adapter in a USB slot.
Download the Win32DiskImager utility (it is also a zip file). You can run this from a USB drive. 
Extract the executable from the zip file and run the Win32DiskImager utility; you may need to run the utility as Administrator! Right-click on the file, and select 'Run as Administrator'
Select the image file you extracted above.
Select the drive letter of the SD card in the device box. Be careful to select the correct drive; if you get the wrong one you can destroy your data on the computer's hard disk! If you are using the SD Card slot (if you have one) and can't see the drive in the Win32DiskImager window, try using a cheap Adapter in a USB slot.
Click Write and wait for the write to complete.
Exit the imager and eject the SD card.
You are now ready to plug the card into your Raspberry Pi. See RPi_Hardware_Basic_Setup for the other things you need.
In Windows, the SD card will appear only to have a fairly small size - about 55 to 75 MB. This is because most of the card has a partition that is formatted for the Linux operating system that the Raspberry Pi uses which is not visible in Windows. If you don't see this small directory with files such as kernel.img then the copy may not have worked correctly.
- (Ubuntu)
Using ImageWriter (graphical interface)
If you are using Ubuntu and hesitate to use the terminal, you can use the ImageWriter tool (nice graphical user interface) to write the .img file to the SD card.
Download the zip file containing the image from a mirror or torrent
http://www.raspberrypi.org/downloads
Right click the zip file and select "Extract here"
ATTENTION: As of this writing (15 June 2012), there is a bug in the ImageWriter program that causes it to fail if the filename of the image file or its path (i.e. all the names of any parent folders that you extract the image file into) contain any space characters. Before going any further, ensure that neither the file name of the image you're using or the path contain any spaces (or other odd characters, for that matter). A bug has been opened for this issue: https://bugs.launchpad.net/usb-imagewriter/+bug/1013834 Once the issue is fixed, edit this page to advise people to use an updated/patched version of ImageWriter.
Insert the SD card into your computer or connect the SD card reader with the SD card inside
Install the ImageWriter tool from the Ubuntu Software Center
Launch the ImageWriter tool (it needs your administrative password)
Select the image file (example 2012-10-28-wheezy-raspbian.img) to be written to the SD card (note: because you started ImageWriter as administrator the starting point when selecting the image file is the administrator's home folder so you need to change to your own home folder to select the image file)
Select the target device to write the image to (your device will be something like "/dev/mmcblk0" or "/dev/sdc")
Click the "Write to device" button
Wait for the process to finish and then insert the SD card in the Raspberry Pi
```

---

## a3 locale problem of ssh

-

```
Q. perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
   LANGUAGE = (unset),
   LC_ALL = (unset),
   LC_CTYPE = "UTF-8",
   LANG = "en_GB.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").
locale: Cannot set LC_CTYPE to default locale: No such file or directory
locale: Cannot set LC_ALL to default locale: No such file or directory
-
A.
-
Does this problem happen if you are using a particular program on the RPi, or is it when you use SSH from another computer?

If it happens when using SSH, this is a fault on the SSH client, not the RPi. For example using an Ubuntu machine as the SSH client will cause this problem.

To fix this SSH problem, edit the file /etc/ssh/ssh_config on the SSH client (not the RPi) and remove the line
SendEnv LANG LC_*

This stops the client sending invalid locale information to the RPi.
-
Thanks bredman, your tip worked for me.
In my case, however, the conf file is /etc/ssh_config (ssh client on Mac Mountain Lion, 10.8.2). I commented like this:
# SendEnv LANG LC_*
and now I can even run python scripts on the raspberry that earlier caused errors like
"UnicodeEncodeError: 'ascii' codec can't encode character ..."
Great!
```

---

## a4 finding raspberry's ip! --> arp -a

---

## a5 sudo raspi-config / sudo apt-get update+upgrade

-

```
must does
1) expand filesystem
2) time zone
3) overclock?
-
for TV output -> overscan on.
```

for further configuration for TV out..

```
changing monitor settings and testing could be done following command sequence.

sudo mount -o remount,rw /dev/mmcblk0p1
sudo nano /boot/config.txt
sudo mount -o remount,ro /dev/mmcblk0p1 
sudo shutdown -r now

finally chosen parameters are as below. (no-overcan + 390x310) - now the characters on the monitor is much more readable.

'
# uncomment this if your display has a black border of unused pixels visible
# and your display can output without overscan
disable_overscan=1

# uncomment the following to adjust overscan. Use positive numbers if console
# goes off screen, and negative if there is too much border
#overscan_left=-3
#overscan_right=-3
#overscan_top=4
#overscan_bottom=4

# uncomment to force a console size. By default it will be display's size minus
# overscan.
#framebuffer_width=500
#framebuffer_height=400
framebuffer_width=390
framebuffer_height=310
'
```

---

## a6 The VNC Server

-

```
There are various guides for this online, most suggest using the TightVNC server software, here’s my summarised need to know version, run all commands from the command line:
Install tight VNC: “sudo apt-get install tightvncserver”
Run the program: “tightvncserver”
Start a VNC session: “vncserver :1 -geometry 1024x728 -depth 24”
Notes:
Configure the session’s resolution after the -geometry argument. In the above 1024x768 is used. The RPi is capable of full HD so you could try 1920x1080.
```

---

## a7 installing pd extended

-

```
Adding apt.puredata.info manually

You can either add this line to the bottom of /etc/apt/sources.list Or you can add it in the GUI administration program Synaptic (in the Settings -> Repositories menu, then the Third-Party Software tab). Choose the line for your version of Debian or Ubuntu from the options below:

 # Debian/oldstable
 deb http://apt.puredata.info/releases oldstable main
 # Debian/stable
 deb http://apt.puredata.info/releases stable main
 # Debian/testing
 deb http://apt.puredata.info/releases testing main

 # Debian/sarge
 deb http://apt.puredata.info/releases sarge main
 # Debian/etch
 deb http://apt.puredata.info/releases etch main
 # Debian/lenny
 deb http://apt.puredata.info/releases lenny main
 # Debian/squeeze
 deb http://apt.puredata.info/releases squeeze main
 # Debian/wheezy
 deb http://apt.puredata.info/releases wheezy main

sudo nano /etc/apt/sources.list
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-key 9f0fe587374bbe81
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-key D63D3D09C39F5EEB
sudo apt-get update
sudo apt-get install pd-extended
```

---

## a8 assigning UX1-EA (usb audio dev.) as a default dev.

-

```
How to Assign USB Audio as primary sound device in ALSA
-
This is for anyone that has a fried sound card (like me) in their laptop. Instead of replacing the motherboard or tossing your old laptop in the trash, get a pair of USB speakers and follow this procedure:
(This procedure will get sound going without the need of installing pulse audio)
1) Backup the file /etc/modprobe.d/alsa-base.conf
Note: Original alsa-base.conf:
# autoloader aliases
install sound-slot-0 /sbin/modprobe snd-card-0
install sound-slot-1 /sbin/modprobe snd-card-1
install sound-slot-2 /sbin/modprobe snd-card-2
install sound-slot-3 /sbin/modprobe snd-card-3
install sound-slot-4 /sbin/modprobe snd-card-4
install sound-slot-5 /sbin/modprobe snd-card-5
install sound-slot-6 /sbin/modprobe snd-card-6
install sound-slot-7 /sbin/modprobe snd-card-7
# Cause optional modules to be loaded above generic modules
install snd /sbin/modprobe --ignore-install snd && { /sbin/modprobe --quiet snd-ioctl32 ; /sbin/modprobe --quiet snd-seq ; }
install snd-rawmidi /sbin/modprobe --ignore-install snd-rawmidi && { /sbin/modprobe --quiet snd-seq-midi ; : ; }
install snd-emu10k1 /sbin/modprobe --ignore-install snd-emu10k1 && { /sbin/modprobe --quiet snd-emu10k1-synth ; : ; }
# Prevent abnormal drivers from grabbing index 0
options bt87x index=-2
options cx88_alsa index=-2
options snd-atiixp-modem index=-2
options snd-intel8x0m index=-2
options snd-via82xx-modem index=-2
# Keep snd-pcsp from beeing loaded as first soundcard
options snd-pcsp index=-2
# Keep snd-usb-audio from beeing loaded as first soundcard
options snd-usb-audio index=-2

Add:
# Assign USB Audio as default sound card
options snd_usb_audio index=-1

Delete these last TWO lines in the file:
# Keep snd-usb-audio from beeing loaded as first soundcard
options snd-usb-audio index=-2

New file should look like this:
# autoloader aliases
install sound-slot-0 /sbin/modprobe snd-card-0
install sound-slot-1 /sbin/modprobe snd-card-1
install sound-slot-2 /sbin/modprobe snd-card-2
install sound-slot-3 /sbin/modprobe snd-card-3
install sound-slot-4 /sbin/modprobe snd-card-4
install sound-slot-5 /sbin/modprobe snd-card-5
install sound-slot-6 /sbin/modprobe snd-card-6
install sound-slot-7 /sbin/modprobe snd-card-7
# Cause optional modules to be loaded above generic modules
install snd /sbin/modprobe --ignore-install snd && { /sbin/modprobe --quiet snd-ioctl32 ; /sbin/modprobe --quiet snd-seq ; }
install snd-rawmidi /sbin/modprobe --ignore-install snd-rawmidi && { /sbin/modprobe --quiet snd-seq-midi ; : ; }
install snd-emu10k1 /sbin/modprobe --ignore-install snd-emu10k1 && { /sbin/modprobe --quiet snd-emu10k1-synth ; : ; }

# Assign USB Audio as default sound card
options snd_usb_audio index=-1

# Prevent abnormal drivers from grabbing index 0
options bt87x index=-2
options cx88_alsa index=-2
options snd-atiixp-modem index=-2
options snd-intel8x0m index=-2
options snd-via82xx-modem index=-2
# Keep snd-pcsp from beeing loaded as first soundcard
options snd-pcsp index=-2
NOTE 1: If a sound card is not found by ALSA... ALSA config will not make USB the default sound card, so this tells method tells ALSA, USB audio is what you want it to use.
NOTE 2: PCM still needs to be checked in the Alsa Mixer.
NOTE 3: The volume icon will now show up in Tint2 (needs to be unmuted) - reboot may be required.
NOTE 4: The spelling of the word "beeing", it's a typo by the original coder.
```

---

## a9 jackstart script (for performance use this script except jackd & overclock 900MHz)

-

```
#!/bin/bash
sudo service ntp stop
sudo service triggerhappy stop
sudo service dbus stop
sudo killall console-kit-daemon
sudo killall polkitd
## Only needed when Jack2 is compiled with D-Bus support
#export DBUS_SESSION_BUS_ADDRESS=unix:path=/run/dbus/system_bus_socket
sudo mount -o remount,size=128M /dev/shm
killall gvfsd
killall dbus-daemon
killall dbus-launch
## Uncomment if you'd like to disable the network adapter completely
#echo -n "1-1.1:1.0" | sudo tee /sys/bus/usb/drivers/smsc95xx/unbind
echo -n performance | sudo tee /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
jackd -P70 -p16 -t2000 -d alsa -dhw:UA25 -p 128 -n 3 -r 44100 -s &
exit
```

---

## a10 raspberry install jackd2 (patched)
-
```
wget -O - http://rpi.autostatic.com/autostatic.gpg.key |  sudo apt-key add -
sudo wget -O /etc/apt/sources.list.d/autostatic-audio-raspbian.list
http://rpi.autostatic.com/autostatic-audio-raspbian.list
sudo apt-get --no-install-recommends install jackd2
```

---

## a11 Using Bluetooth on RPi. - get internet connection from Satellite CCRMA (RPi)

-

```
https://wiki.archlinux.org/index.php/Bluetooth

first, need to get connection from RPi through Mac's Internet Sharing.

Mac's Internet Sharing have some trouble with Satellite CCRMA image because of use of different subnet.
-> http://blog.afkham.org/2013/02/how-to-connect-raspberry-pi-to-internet.html (1)
-> http://blog.chariotsolutions.com/2013/03/configuring-network-used-by-mac-os-x.html (2)

"On Mac OS X, Internet Connection Sharing by default hands out IPs on the 192.168.2.x subnet.  Normally this is fine, but sometimes you might want to change it (because you're at a hotel that uses192.168.2.x or whatever)." - (2)

so, Mac expects Internet sharing devices using subnet of 192.168.2.x. but Satellite CCRMA image's ip setup is static ip of 192.168.105.106 which is in the subnet of 192.168.105.x. which is also different from (1). and RPi won't get access to the internet because of this.

so, apparently, ip of RPi should be changed. (or Mac's Internet Sharing subnet should be changed which sounds more complicated)
if RPi changes his ip, one should be little bit careful because after the change, ssh address also should be changed.

anyway, to change ip of RPi, do..
-> sudo nano /etc/network/interfaces

change the setting. according to …

"
auto lo
iface lo inet loopback
auto eth0
iface eth0 inet static
address 192.168.2.2
netmask 255.255.255.0
"

if done, save and restart the machine to make the changes take effect. : sudo shutdown -r now.

and restart Internet Sharing. with appropriate ip address setting, refer - (1) -> 192.168.2.1 (1 as a matched ip of Internet Sharing's default host ip. (2))

to login, ssh with changed address.
ssh -XY ccrma@192.168.2.2
or..
in my case, i ve used same last number (106), then -> ssh -XY ccrma@192.168.2.106

after you get into again RPi, 
try if the internet works or not by …
-> sudo apt-get update 
or
-> ping 8.8.8.8 (google's dns server)

if you get connection in apt-get update or if you get ping-back from 8.8.8.8. internet connection is well established.
```

---

## a12 Using Bluetooth on RPi. - install bluetooth driver and modules. (Logitech BT audio adaptor TESTED)

-

```
https://wiki.archlinux.org/index.php/Bluetooth

install 'bluez-utils' by… : sudo apt-get install bluez-utils
(will take quite a time according to the speed of internet connection)

HERE you can also do install 'bluez-utils' by… :
sudo apt-get install bluez bluez-utils bluez-alsa python-gobject --no-install-recommends
(will take much shorter time cause skipping alot of recommeded packages)

sudo shutdown -h now and unplug power and plug bluetooth dongle to RPi
and plug the power again.

after start-up done, type -> lsusb and check you see bluetooth dongle recognized in the system.
and, type -> hciconfig to get response from the driver.

"
hci0:   Type: BR/EDR  Bus: USB
       BD Address: 90:4C:E5:DB:E9:77  ACL MTU: 1021:8  SCO MTU: 64:1
       DOWN
       RX bytes:484 acl:0 sco:0 events:20 errors:0
       TX bytes:323 acl:0 sco:0 commands:20 errors:0
"

if the msg. says the module is not active now. then, type -> hciconfig <device-name> up (for example, hciconfig hci0 up)

-> hcitool scan (and make your device discoverable.. )

you should get your device address scanned with this command.

for example..
"
ccrma@satellite ~ $ hcitool scan
Scanning ...
     C8:84:47:03:FC:16     (16)Logitech Adapter
"

to make a pair.. make your device available to be paired.. and type

-> sudo bluez-simple-agent hci0 C8:84:47:03:FC:16

if you've got the device..
let the device to be 'trusted'. with..
-> sudo bluez-test-device trusted C8:84:47:03:FC:16 yes

check this thread if you get pairing problem,
i ve got same problem while making a pair. -> http://forums.gentoo.org/viewtopic-t-945400-start-0.html
which says you should edit the script (bluez-simple-agent) little bit.

connect to the device by…
-> sudo bluez-test-audio connect C8:84:47:03:FC:16
there are different command for different kind of devices. for my case, the device was an audio playback. so here i am using 'bluez-test-audio' script. but if targeting different kind of devices, should try with proper script, of course.

if you can get connection…
edit.. /etc/asound.conf by…
-> sudo nano /etc/asound.conf

and following.. at the end of file…

"
pcm.btheadset {
   type plug
   slave {
       pcm {
           type bluetooth
           device C8:84:47:03:FC:16 (<-- this should be different according to the device)
           profile "auto"
       }
   }
   hint {
       show on
       description "BT Headset"
   }
}
ctl.btheadset {
  type bluetooth
}
"

settings are all done. maybe restart the system… with -> sudo shutdown -r now.

login again. and..

type.. ->sudo bluez-test-audio connect C8:84:47:03:FC:16
the device should be paired already, so this time, just connect to the device should work.

type.. -> aplay -L
will get available audio devices in the list. and there you should see a device named..'btheadset' / 'BT Headset'

test BT playback with..
->
aplay -D btheadset /path/to/audio/file

if you hear sounds from BT device. well done. 

--

(next topic) -> connecting Arduino through BT.. --> should be same but using different script for connection.

(next of next topic) -> connecting Arduino & Audio through BT --> performance test. if this works fine, we don't need to use USB HUB. mechanically much more compact system, we can establish.
```

---

## a13 making raspberry pi filesystem - read-only - which helps a lot for overclocking

```
sudo mount -o remount,rw /dev/mmcblk0p1
sudo nano /boot/config.txt

uncomment following line in the config.txt file

initramfs initramfs.cpio

sudo mount -o remount,ro /dev/mmcblk0p1 
sudo shutdown -r now

@ Satellite CCRMA image..

they also have a script for doing this automatically.. but first remount boot partition rw.
```

---

## b01 fsck for raspberry pi

-

```
/dev/mmcblk0p2 is the root file system, so it is not easily unmounted. It could probably be re-mounted as read-only, but a simpler way is to schedule a fsck at the next reboot.

sudo touch /forcefsck
then reboot. Or reboot with

shutdown -rF now
which does the same.
-
Where are fsck results logged at boot time, after /forcefsck?
-
pi@raspberrypi /var/log/fsck $ ls -la
total 16
drwxr-xr-x 2 root root 4096 Feb  9 09:52 .
drwxr-xr-x 9 root root 4096 May 16 23:44 ..
-rw-r----- 1 root adm   125 May 16 23:44 checkfs
-rw-r----- 1 root adm   221 May 16 23:44 checkroot
pi@raspberrypi /var/log/fsck $ cat checkroot 
Log of fsck -C -f -a -t ext4 /dev/mmcblk0p2 
Thu May 16 23:44:09 2013

fsck from util-linux 2.20.1
/dev/mmcblk0p2: 67102/237568 files (0.2% non-contiguous), 384740/937984 blocks

Thu May 16 23:44:17 2013
----------------
pi@raspberrypi /var/log/fsck $ cat checkfs 
Log of fsck -C -R -A -a -f 
Thu May 16 23:44:21 2013

fsck from util-linux 2.20.1

Thu May 16 23:44:21 2013
----------------
```

---

## b02 Using scp to transfer files in Linux

-

```
To copy files from the local system to a remote system:
scp file... user@host.domain:path
```

---

## b03 blocked RPi

-

```
The new overclocking functionality seems to have destroyed my RasPi.

I updated everything in my Debian distro yesterday to try out the new overclocking functionality. Ran raspi_config and selected the "medium" option (900 mHz, 2 volt, etc.)

The unit ran fine, no hiccups. Just a bit faster. I've had the unit up and running for the better part of 2 weeks now without powering it down, so I left it running overnight at the new speed.

This morning it appears to be dead. Open SSH sessions to my desktop were dead, unit wasn't pingable, and no HDMI video. Removed power and rebooted. Nothing. It looks like the network traffic lights show activity when powered up, but nothing else is working.

So now what? Since this seems to have been a "sanctioned" upgrade, is this a warranty issue? Is it warning to others? Did someone not test this stuff properly?
-
Locked up again, on the very lowest raspi-config overclock setting ("modest"). It continues to require a complete unplugging of everything to get it to reboot.
```

---

## b04 dhcp with wlan0

-

```
SSH is enabled by default in Wheezy, which is extremely useful compared to the previous distro. I recommend you reserve a DHCP IP address for your Raspberry Pi in your DHCP Server / Router configuration. This saves the hassle of changing the Raspberry Pi to a fixed IP address. Feel free to upvote my answer at http://raspberrypi.stackexchange.com/questions/1409/easiest-way-to-show-my-ip-address/1481#1481

Reserve an IP address on the Router
Your router should allow linking the Pi’s network adapter’s MAC address with a reserved IP address.
Power up the Pi and look in your router connections page to get the MAC address of the device you don’t recognise (this will be the Raspberry Pi)
I reserved 192.168.0.100 for the MAC starting B8:27:*

Or Set a Fixed IP address
find the IP address your Pi has obtained from the DHCP server. Your broadband router should have a page which shows connected clients and their IP addresses.

Connect to the Pi using Putty (SSH client), with the IP address you obtained.

sudo nano /etc/network/interfaces
replace

 iface etho0 inet dhcp
with… (adjust to your environment, obviously)

iface eth0 inet static
 address 192.168.0.3
 netmask 255.255.255.0
 gateway 192.168.0.2
```

---

## b05 GDBus.Error:org.freedesktop.PolicyKit1.Error.Failed: An authentication agent already exists for the given subject

-

```
I think I found the problem. The solution is so go into "Preferences->Desktop Session Settings" and un-check "PolicyKit Authentication Agent" as LXDE runs it's own LXPolKit Authentication Agent.
```

---

## b06 Running VNCServer at StartupCreated by Simon Monk (makes the RPi unstable?)

-

```
This method will only work if you have set your Pi to automatically log into the desktop environment. See Lesson 2.
Connecting to your Raspberry Pi remotely with VNC is fine as long as your Pi does not reboot. If it does, then you either have to connect with SSH and restart the VNC Server or arrange for the VNC Server to run automatically after the Raspberry Pi reboots.
There are several different methods of arranging for some code to be run as the Pi starts. The method described below is probably the easiest to use. You can adapt it to run other commands instead of starting the VNC server.
Step 1.
Open a Terminal session on the Pi, or connect using SSH. A new terminal or SSH session will automatically start you off in your home directory of /home/pi. If you are not in this directory, change to it by typing:
Copy Code

$ cd /home/pi
Then cd to the .config directory by typing:
Copy Code

$ cd .config
Note the '.' at the start of the folder name. This makes it a hidden folder that will not show up when you type 'ls'.

Step 2.
Issue the command below to create a new directory indide .config called 'autostart'.
Copy Code

$ mkdir autostart
cd into that new directory by typing:
Copy Code

$ cd autostart
 
Step 3.
All that remains is to edit a new configuration file. So type the following command to open the nano editor on the new file:
Copy Code

$ nano tightvnc.desktop
Edit the contents of the file with the following text.
Copy Code

[Desktop Entry]
Type=Application
Name=TightVNC
Exec=vncserver :1 -geometry 640x480
StartupNotify=false
 
Type ctrl-X and then Y to save the changes to the file.
Thats all there is to it. The next time you reboot the VNC server will restart automatically.
```

---

## b07 change ownerships and user groups of files (recursively)

-

```
< chown - change the owner of a file >

You can change the owner and group of a file or a directory with the chown command. Please, keep in mind you can do this only if you are the root user or the owner of the file.
Set the file's owner:
$ chown username somefile
After giving this command, the new owner of a file called somefile will be the user username. The file's group owner will not change. Instead of a user name, you can also give the user's numeric ID here if you want.
You can also set the file's group at the same time. If the user name is followed by a colon and a group name, the file's group will be changed as well.
$ chown username:usergroup somefile
After giving this command, somefile's new owner would be user username and the group usergroup.
You can set the owner of a directory exactly the same way you set the owner of a file:
$ chown username somedir
Note that after giving this command, only the owner of the directory will change. The owner of the files inside of the directory won't change.
In order to set the ownership of a directory and all the files in that directory, you'll need the -R option:
$ chown -R username somedir
Here, R stands for recursive because this command will recursively change the ownership of directories and their contents. After issuing this example command, the user username will be the owner of the directory somedir, as well as every file in that directory.
Tell what happens:
$ chown -v username somefile
changed ownership of 'somefile' to username
Here, v stands for verbose. If you use the -v option, chown will list what it did (or didn't do) to the file.
The verbose mode is especially useful if you change the ownership of several files at once. For example, this could happen when you do it recursively:
$ chown -Rv username somedir
changed ownership of 'somedir/' to username
changed ownership of 'somedir/boringfile' to username
changed ownership of 'somedir/somefile' to username
As you can see, chown nicely reports to you what it did to each file.

< chgrp - change the group ownership of a file >

In addition to chown, you can also use the chgrp command to change the group of a file or a directory. You must, again, be either the root user or the owner of the file in order to change the group ownership.
chgrp works pretty much the same way as chown does, except it changes the file's user group instead of the owner, of course.
$ chgrp usergroup somefile
After issuing this command, the file somefile will be owned by a user group usergroup. Although the file's group has changed to usergroup, the file's owner will still be the same.
The options of using chgrp are the same as using chown. So, for example, the -R and -v options will work with it just like they worked with chown:
$ chgrp -Rv usergroup somedir
changed group of 'somedir/' to usergroup
changed group of 'somedir/boringfile' to usergroup
changed group of 'somedir/somefile' to usergroup
chown nicely reports to you what it did to each file.
```

---

## b08 identifying sound card (ex. hw:0,1)

-

```
Use "aplay -l" to get a list of the devices on your system. The hw:X,Y comes from this mapping of your hardware -- in this case, X is the card number, while Y is the device number.
-
You might be able to get away with using device aliases instead of the "hw:X,Y" -- this is what the output of "aplay -L" shows. The "something:CARD=FOO,DEV=Y" stuff is the alias, and probably won't change between different device plug-ins
```

---

## b09 setting file for pd

-

```
$ nano /home/derek/.pdsettings

GNU nano 1.2.4                       File: /home/derek/.pdsettings

audioapi: 5
noaudioin: False
audioindev1: 0 4
noaudioout: False
audiooutdev1: 0 4
audiobuf: 50
rate: 44100
nomidiin: False
midiindev1: 0
nomidiout: False
midioutdev1: 0
path1: /home/derek/pd/rradical/memento
path2: /home/derek/pd/ix_toxy
path3: /home/derek/pd/berlin
path4: /home/derek/pd/rradical/memento/tutorial
path5: /home/derek/workshop_patches
path6: /usr/local/lib/pd/doc/5.reference
path7: /usr/local/lib/pd/extra/xjimmies
npath: 7
standardpath: 1
verbose: 0
loadlib1: pool
loadlib2: iemlib1
loadlib3: iemlib2
loadlib4: iem_mp3
loadlib5: iem_t3_lib
loadlib6: OSC
loadlib7: zexy
nloadlib: 7
defeatrt: 0
flags: -alsamidi -rt
```

---

## b10 make a backup of image

-

```
using ubuntu live cd. boot with trial mode.
-
sudo fdisk -l
sudo dd if=/dev/sda of=./OldHD.img
```

---

## b11 gui over X11 service.

-

```
ssh -X pi@192.168.2.3
```

---

## b12 gui over X11 service + wpa_gui

-

```
wireless internet connection establishing..
```

---

## b13 identifying the cards.. (for jack..)

-

```
What is the output of
cat /proc/asound/cards
with the DAC attached?

And could you also post the output of
sudo lsusb -vvv
```

---

## b14 where to find current stream info!

(how can i check what is current playback setup at the moment of playback)

-

```
ccrma@satellite /proc/asound/card0 $ cat stream0 
EDIROL UA-1EX at usb-bcm2708_usb-1.3, full speed : USB Audio

Playback:
  Status: Running
    Interface = 0
    Altset = 1
    Packet Size = 288
    Momentary freq = 44100 Hz (0x2c.199a)
  Interface 0
    Altset 1
    Format: S24_3LE
    Channels: 2
    Endpoint: 1 OUT (ADAPTIVE)
    Rates: 44100

Capture:
  Status: Stop
  Interface 1
    Altset 1
    Format: S24_3LE
    Channels: 2
    Endpoint: 2 IN (ASYNC)
    Rates: 44100
-
reference
-
http://guayadeque.org/index.php?p=/discussion/576/correct-switching-between-16bit-and-24bit-usb-audio-playback/p1
```

---

## b15 starting automatically pd patch.

-

```
ccrma@satellite ~/on-startup $ cat load_default_patch
#!/bin/bash  
#
# This script starts pd with a default patch (please see all the way below)
#
#
#
# Copyright (C) Feb. 2012 Edgar Berdahl for the Satelite CCRMA project
#
# The above copyright notice including the copyright holders and this
# permission notice shall be included in all copies, substantial
# portions, or derivatives of the Software and Software portions.
#
# The end-user documentation included with the redistribution, if any,
# must include the following acknowledgment: "This product includes
# software developed in the course of the Satellite CCRMA project
# (http://ccrma.stanford.edu/satellite/) and its contributors", in the
# same place and form as other third-party acknowledgments. In
# addition, this acknowledgment must appear in the software itself in
# the same form and location as other such third-party acknowledgments.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License version 3 as
# published by the Free Software Foundation except subject to the additional
# attribution requirements described beneath the copyright notice above.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the modified GNU General Public 
# License along with this program.




# It is necessary to specify the complete path of the pd patch:
#pd -nogui /home/ccrma/on-startup/default-patch.pd
pd -nogui /home/ccrma/puredata/paperPerfm2011_B-E_RPi_nogui.pd
```

---

## b16 adding autostart app. @ X of RPi

-

```
How do I get wicd to automatically show me the networks available when my desktop starts?

Add a .desktop file to your ~/.config/autostart directory (create one if not available) with 3 lines saying :
[Desktop Entry] 

Type=Application

Exec=wicd-client -n
```

---

## b17 image transfer - MD5 verification directly with the transferred image on the device (not sure yet)

-

```
==> DON'T know yet.. exactly how to do this...
THE HASH DOES NOT MATCH
but IMAGE works...
Wrong Comparison? or Actually different? (verity failed?)
-
steps
-
Get the hash of Image.
==>
ls -la SatelliteCCRMA_Rpi_v0.94.dd
-rw-r--r--@ 1 doohoyi  staff  7822376960 Jun 11 01:58 SatelliteCCRMA_Rpi_v0.94.dd
-
md5 SatelliteCCRMA_Rpi_v0.94.dd
==> MD5 (SatelliteCCRMA_Rpi_v0.94.dd) = 1152fce9f2b7cc9bf7b7c5d58768155a
-
Keep in mind following description about size units in OSX
==>
man dd
==>
"
Where sizes are specified, a decimal, octal, or hexadecimal number of bytes is expected.  If the number ends with
     a ``b'', ``k'', ``m'', ``g'', or ``w'', the number is multiplied by 512, 1024 (1K), 1048576 (1M), 1073741824 (1G)
     or the number of bytes in an integer, respectively.
"
=>So, invoke like following (calculation : 7822376960 / 1048576 = 7460)
dd if=/dev/rdisk1 bs=1m count=7460 | md5
==>
7460+0 records in
7460+0 records out
7822376960 bytes transferred in 421.942402 secs (18538969 bytes/sec)
a8d8d9f866cd543bd793059705e3f477 (which is apparently different from original one!! ==> but i can boot from this image... at least... maybe i should try with different SD card)
-
original idea coming from following reference (from Ubuntu forum)
==>
Checking the CD directly

You would think you could simply use a command like this to get the MD5 hash of a burned image: 

md5sum /dev/cdrom
However this will almost NEVER be the same hash as the iso image that was burned to the disk, because this command includes the empty space at the end of the disk, which changes the hash. So you must check only the part of the disk that was on the iso.

Manual method
First we need to know the size of the iso image. You could open up your favorite graphical file manager such as Nautilus or Dolphin, but since you need to use the command line anyways, you might as well use ls.


ls -l ubuntu-8.10-desktop-i386.iso
-rw-r--r-- 1 jsmith jsmith 732766208 2008-10-28 23:24 ubuntu-8.10-desktop-i386.iso
Now that we know the size of our iso image is 732766208, we can use dd to pipe only 732766208 bytes from our cdrom device into md5sum. Use a block size of 1 and set count to the size of the iso image. Note that this will probably take several minutes, so grab a snack and come back in a while.


dd if=/dev/cdrom bs=1 count=732766208 | md5sum
732766208+0 records in
732766208+0 records out
24ea1163ea6c9f5dae77de8c49ee7c03  -
732766208 bytes (733 MB) copied, 563.666 s, 1.3 MB/s
You could probably speed this up by using a larger block size (bs) and dividing count by the new block size. Since all iso images are multiples of 2048, that is an appropriate block size.

Check the calculated hash (in this case 24ea1163ea6c9f5dae77de8c49ee7c03) against UbuntuHashes as shown for the iso file above. Depending on your system, you may need to change cdrom to cdrom0 (or even cdrom1 if you have two CD drives).
```

---

## b18 mounting windows (FAT) partition

-

```
sudo fdisk -l <-- to check the name of the dev.
-
sudo mount -t vfat /dev/sda1 /media <-- mounting
-
put the line above in /etc/rc.local to let this happen automatically.
```

---

## b19 don't use loadbang -> pd dsp 1; on RPi. NEVER!

-

```
Why Doesn't Audio Work When I Start Pd In -Nogui Mode?
When I start Pd from the commandline without the GUI in -nogui mode, it can't connect to the soundcard and no dsp seems to happen?
Currently, there is a bug in Pd where starting in -nogui mode causes patches to be run before it connects to a sound card. When running the graphical user interface (GUI), there is a delay as the GUI is being setup before patches are run and this is enough time for the sound to be connected. Basically, if you are turning on dsp with a loadbang like this:
[loadbang]
|
[; pd dsp 1(
Pd tries to start dsp, but in -nogui mode, it hasn't yet connected to the sound card and you'll get an error similar to this:
snd_pcm_open (input): Device or resource busy 
snd_pcm_open (output): Device or resource busy
If so, you can add a delay before starting the dsp:
[loadbang]
|
[delay 100]
|
[; pd dsp 1(
This should be enough time to mimic the delay taken when the GUI starts and the sound card can be setup before dsp is started.
-
http://puredata.info/docs/faq/why-doesn-t-audio-work-when-i-start-pd-in-nogui-mode
```

---

## b20 Repair a broken SD card “superblock” on a #RaspberryPi

-

```
First, figure out what partition we’re dealing with.

sudo fdisk -l

Here, you can change ext4 to ext3, or ext2 to suit the filesystem.

sudo fsck.ext4 -v /dev/xxx
```

---

