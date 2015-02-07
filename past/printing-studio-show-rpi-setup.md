
######2014Nov23 20:37:50+0900

* setup Satellite CCRMA 0.94 for printing-studio-show..

```
ccrma@satellite ~ $ sudo nano /etc/network/interfaces
ccrma@satellite ~ $ cat /etc/network/interfaces
auto lo
iface lo inet loopback

iface eth0 inet static
	address 192.168.2.106
	netmask 255.255.255.0
	gateway 192.168.2.1

allow-hotplug wlan0
iface wlan0 inet manual
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
iface default inet dhcp
ccrma@satellite ~ $ sudo shutdown -r now

Broadcast message from root@satellite (pts/1) (Tue May 28 07:46:20 2013):

The system is going down for reboot NOW!
ccrma@satellite ~ $ exit
logout
Connection to 192.168.105.106 closed.
doohoyis-MacBook-Pro:~ doohoyi$ ssh ccrma@192.168.105.106
^X^C
doohoyis-MacBook-Pro:~ doohoyi$ ssh ccrma@192.168.2.106
^C
doohoyis-MacBook-Pro:~ doohoyi$ ssh ccrma@192.168.2.106
ccrma@192.168.2.106's password: 
Linux satellite 3.6.11+ #1 PREEMPT Thu May 16 02:38:52 CEST 2013 armv6l
Welcome to
---------------
Satellite CCRMA
---------------
This memory image was made by Edgar Berdahl.

Thanks to the other contributors and supporters of the Satellite CCRMA
project including most particularly Wendy Ju as well as Fernando
Lopez-Lezcano, Florian Goltz, Carr Wilkerson, Chris Chafe, Spencer Salazar,
Paul DeMarinis, Myles Borins, Robert Nelson, Gerald Coley, Cathy Wicks,
the Alexander von Humboldt Foundation, the TU Berlin, Chris Jubien, T.I., and 
the Satellite CCRMA user base.

For more info: https://ccrma.stanford.edu/satellite

Last login: Tue May 28 07:44:51 2013 from 192.168.105.105
stop-de
If there is a default pd patch running (see
~/on-startup/load_default_patch for more details),
you can kill it by typing
stop-default
ccrma@satellite ~ $ stop-default
alsa_out: no process found
pdextended: no process found
jackd: no process found
ccrma@satellite ~ $ Write failed: Broken pipe
doohoyis-MacBook-Pro:~ doohoyi$ 
```

internet sharing ON.

```
doohoyis-MacBook-Pro:~ doohoyi$ ssh ccrma@192.168.2.106
ccrma@192.168.2.106's password: 
Linux satellite 3.6.11+ #1 PREEMPT Thu May 16 02:38:52 CEST 2013 armv6l
Welcome to
---------------
Satellite CCRMA
---------------
This memory image was made by Edgar Berdahl.

Thanks to the other contributors and supporters of the Satellite CCRMA
project including most particularly Wendy Ju as well as Fernando
Lopez-Lezcano, Florian Goltz, Carr Wilkerson, Chris Chafe, Spencer Salazar,
Paul DeMarinis, Myles Borins, Robert Nelson, Gerald Coley, Cathy Wicks,
the Alexander von Humboldt Foundation, the TU Berlin, Chris Jubien, T.I., and 
the Satellite CCRMA user base.

For more info: https://ccrma.stanford.edu/satellite

Last login: Tue May 28 07:47:26 2013 from 192.168.2.105

If there is a default pd patch running (see
~/on-startup/load_default_patch for more details),
you can kill it by typing
stop-default
ccrma@satellite ~ $ ping 8.8.8.8
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_req=1 ttl=44 time=169 ms
64 bytes from 8.8.8.8: icmp_req=2 ttl=44 time=169 ms
^C
--- 8.8.8.8 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
rtt min/avg/max/mdev = 169.254/169.282/169.310/0.028 ms
ccrma@satellite ~ $ sudo nano /etc/ap
apache2/    apm/        apparmor.d/ apt/        
ccrma@satellite ~ $ sudo nano /etc/ap
apache2/    apm/        apparmor.d/ apt/        
ccrma@satellite ~ $ sudo nano /etc/apt/sources.list
[sudo] password for ccrma: 
ccrma@satellite ~ $ cat /etc/apt/sources.list
deb http://mirrordirector.raspbian.org/raspbian/ wheezy main contrib non-free rpi
deb-src http://mirrordirector.raspbian.org/raspbian/ wheezy main contrib non-free rpi
deb http://apt.puredata.info/releases wheezy main
ccrma@satellite ~ $ sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-key 9f0fe587374bbe81
Executing: gpg --ignore-time-conflict --no-options --no-default-keyring --secret-keyring /tmp/tmp.sqIxiWu8io --trustdb-name /etc/apt//trustdb.gpg --keyring /etc/apt/trusted.gpg --primary-keyring /etc/apt/trusted.gpg --keyserver keyserver.ubuntu.com --recv-key 9f0fe587374bbe81
gpg: requesting key 374BBE81 from hkp server keyserver.ubuntu.com
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-key D63D3D09C39F5EEBgpg: key 374BBE81: public key "Hans-Christoph Steiner <hans@guardianproject.info>" imported
gpg: no ultimately trusted keys found
gpg: Total number processed: 1
gpg:               imported: 1  (RSA: 1)
ccrma@satellite ~ $ sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-key D63D3D09C39F5EEB
Executing: gpg --ignore-time-conflict --no-options --no-default-keyring --secret-keyring /tmp/tmp.GlwJf1LWbY --trustdb-name /etc/apt//trustdb.gpg --keyring /etc/apt/trusted.gpg --primary-keyring /etc/apt/trusted.gpg --keyserver keyserver.ubuntu.com --recv-key D63D3D09C39F5EEB
gpg: requesting key C39F5EEB from hkp server keyserver.ubuntu.com
gpg: key C39F5EEB: public key "Launchpad Pure Data" imported
gpg: Total number processed: 1
gpg:               imported: 1  (RSA: 1)
ccrma@satellite ~ $ sudo apt-get update
Get:1 http://apt.puredata.info wheezy Release.gpg [904 B]                 
Get:2 http://apt.puredata.info wheezy Release [4,870 B]                   
Get:3 http://rpi.autostatic.com wheezy Release.gpg [490 B]                
Get:4 http://mirrordirector.raspbian.org wheezy Release.gpg [490 B]       
Get:5 http://mirrordirector.raspbian.org wheezy Release [14.4 kB]         
Get:6 http://apt.puredata.info wheezy/main armhf Packages [1,276 B]       
Get:7 http://rpi.autostatic.com wheezy Release [940 B]                    
Get:8 http://archive.raspberrypi.org wheezy Release.gpg [490 B]           
Get:9 http://rpi.autostatic.com wheezy/main armhf Packages [18.8 kB]      
Get:10 http://mirrordirector.raspbian.org wheezy/main Sources [6,072 kB]  
Get:11 http://archive.raspberrypi.org wheezy Release [10.2 kB]            
Get:12 http://archive.raspberrypi.org wheezy/main armhf Packages [99.4 kB]
Ign http://apt.puredata.info wheezy/main Translation-en_GB                
Ign http://apt.puredata.info wheezy/main Translation-en                   
Ign http://rpi.autostatic.com wheezy/main Translation-en_GB               
Get:13 http://mirrordirector.raspbian.org wheezy/contrib Sources [53.2 kB]
Ign http://rpi.autostatic.com wheezy/main Translation-en                  
Get:14 http://mirrordirector.raspbian.org wheezy/non-free Sources [98.4 kB]
Get:15 http://mirrordirector.raspbian.org wheezy/rpi Sources [588 B]      
Get:16 http://mirrordirector.raspbian.org wheezy/main armhf Packages [6,893 kB]
Ign http://archive.raspberrypi.org wheezy/main Translation-en_GB          
Ign http://archive.raspberrypi.org wheezy/main Translation-en             
Get:17 http://mirrordirector.raspbian.org wheezy/contrib armhf Packages [23.6 kB]
Get:18 http://mirrordirector.raspbian.org wheezy/non-free armhf Packages [49.3 kB]
Get:19 http://mirrordirector.raspbian.org wheezy/rpi armhf Packages [592 B]
Ign http://mirrordirector.raspbian.org wheezy/contrib Translation-en_GB   
Ign http://mirrordirector.raspbian.org wheezy/contrib Translation-en
Ign http://mirrordirector.raspbian.org wheezy/main Translation-en_GB
Ign http://mirrordirector.raspbian.org wheezy/main Translation-en
Ign http://mirrordirector.raspbian.org wheezy/non-free Translation-en_GB
Ign http://mirrordirector.raspbian.org wheezy/non-free Translation-en
Ign http://mirrordirector.raspbian.org wheezy/rpi Translation-en_GB
Ign http://mirrordirector.raspbian.org wheezy/rpi Translation-en
Fetched 13.3 MB in 1min 17s (172 kB/s)         
Reading package lists... Done
ccrma@satellite ~ $ sudo apt-get install pd-extended
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages were automatically installed and are no longer required:
  libblas3gf liblapack3gf
Use 'apt-get autoremove' to remove them.
The following extra packages will be installed:
  liblua5.1-0 libtk-img pulseaudio-utils ttf-dejavu
Suggested packages:
  libtk-img-doc
Recommended packages:
  x-ttcidfont-conf tkdnd
The following packages will be REMOVED:
  cyclist
The following NEW packages will be installed:
  liblua5.1-0 libtk-img pd-extended pulseaudio-utils ttf-dejavu
0 upgraded, 5 newly installed, 1 to remove and 258 not upgraded.
Need to get 32.8 MB of archives.
After this operation, 78.1 MB of additional disk space will be used.
Do you want to continue [Y/n]? Y
Get:1 http://apt.puredata.info/releases/ wheezy/main pd-extended armhf 0.43.4~extended1-1~raspbian [32.4 MB]
Get:2 http://mirrordirector.raspbian.org/raspbian/ wheezy/main liblua5.1-0 armhf 5.1.5-4+deb7u1 [146 kB]
Get:3 http://mirrordirector.raspbian.org/raspbian/ wheezy/main ttf-dejavu all 2.33-3 [30.6 kB]
Get:4 http://mirrordirector.raspbian.org/raspbian/ wheezy/main libtk-img armhf 1:1.3-release-12 [135 kB]
Get:5 http://mirrordirector.raspbian.org/raspbian/ wheezy/main pulseaudio-utils armhf 2.0-6.1 [74.0 kB]
Fetched 32.8 MB in 43s (755 kB/s)                                                                                                                                                   
(Reading database ... 86157 files and directories currently installed.)
Removing cyclist ...
Processing triggers for man-db ...
Selecting previously unselected package liblua5.1-0:armhf.
(Reading database ... 86151 files and directories currently installed.)
Unpacking liblua5.1-0:armhf (from .../liblua5.1-0_5.1.5-4+deb7u1_armhf.deb) ...
Selecting previously unselected package ttf-dejavu.
Unpacking ttf-dejavu (from .../ttf-dejavu_2.33-3_all.deb) ...
Selecting previously unselected package libtk-img.
Unpacking libtk-img (from .../libtk-img_1%3a1.3-release-12_armhf.deb) ...
Selecting previously unselected package pulseaudio-utils.
Unpacking pulseaudio-utils (from .../pulseaudio-utils_2.0-6.1_armhf.deb) ...
Selecting previously unselected package pd-extended.
Unpacking pd-extended (from .../pd-extended_0.43.4~extended1-1~raspbian_armhf.deb) ...
Processing triggers for man-db ...
Processing triggers for shared-mime-info ...
Processing triggers for menu ...
Processing triggers for desktop-file-utils ...
Processing triggers for hicolor-icon-theme ...
Setting up liblua5.1-0:armhf (5.1.5-4+deb7u1) ...
Setting up ttf-dejavu (2.33-3) ...
Setting up libtk-img (1:1.3-release-12) ...
Setting up pulseaudio-utils (2.0-6.1) ...
Setting up pd-extended (0.43.4~extended1-1~raspbian) ...
update-alternatives: using /usr/bin/pd-extended to provide /usr/bin/pd (pd) in auto mode
update-alternatives: warning: not replacing /usr/bin/pd with a link
update-alternatives: using /usr/bin/pd-extended to provide /usr/bin/pdextended (pdextended) in auto mode
Processing triggers for menu ...
ccrma@satellite ~ $ pd-extended 
priority 6 scheduling enabled.
priority 8 scheduling enabled.
Application initialization failed: no display name and no $DISPLAY environment variable

^CPd: signal 2
ccrma@satellite ~ $ exit
logout
Connection to 192.168.2.106 closed.
doohoyis-MacBook-Pro:~ doohoyi$ ssh -X ccrma@192.168.2.106
ccrma@192.168.2.106's password: 
Linux satellite 3.6.11+ #1 PREEMPT Thu May 16 02:38:52 CEST 2013 armv6l
Welcome to
---------------
Satellite CCRMA
---------------
This memory image was made by Edgar Berdahl.

Thanks to the other contributors and supporters of the Satellite CCRMA
project including most particularly Wendy Ju as well as Fernando
Lopez-Lezcano, Florian Goltz, Carr Wilkerson, Chris Chafe, Spencer Salazar,
Paul DeMarinis, Myles Borins, Robert Nelson, Gerald Coley, Cathy Wicks,
the Alexander von Humboldt Foundation, the TU Berlin, Chris Jubien, T.I., and 
the Satellite CCRMA user base.

For more info: https://ccrma.stanford.edu/satellite

Last login: Sun Nov 23 11:15:07 2014 from 192.168.2.1


If there is a default pd patch running (see
~/on-startup/load_default_patch for more details),
you can kill it by typing
stop-default
ccrma@satellite ~ $ 
ccrma@satellite ~ $ pd-extended 
priority 6 scheduling enabled.
priority 8 scheduling enabled.
open: /etc/pd/gem.conf: No such file or directory
open: /home/ccrma/.pd/gem.conf: No such file or directory
open: ./gem.conf: No such file or directory
ccrma@satellite ~ $ pdsend errorname: >>error writing "sock8": broken pipe<<

ccrma@satellite ~ $ sudo mount -t vfat /dev/sda1 /media
[sudo] password for ccrma: 
ccrma@satellite ~ $ cd /media
ccrma@satellite /media $ pd-extended -rt -nogui printingstudio.pd 
sys_nmidiin 1, nmidiindev 1
verbose(5): Using /usr/lib/pd-extended/startup as startup.
verbose(4): Loading /usr/lib/pd-extended/startup/0.libdir.pd_linux
verbose(3): libdir loader 1.9
verbose(3): 	compiled on Jan 24 2013 at 20:06:34 
verbose(3): 	compiled against Pd version 0.43.4.extended
verbose(4): Loading /usr/lib/pd-extended/startup/1.list.pd_linux
verbose(4): Loading extra in /usr/lib/pd-extended/startup/extra
verbose(3): libdir_loader: added 'extra' to the global objectclass path
verbose(14): Loaded libdir 'extra' from '/usr/lib/pd-extended/extra/extra'
verbose(4): Loading pdlua in /usr/lib/pd-extended/startup/pdlua
verbose(3): pdlua 0.7.1 (GPL) 2012 Martin Peach, based on
verbose(3): lua 0.6~svn (GPL) 2008 Claude Heiland-Allen <claudiusmaximus@goto10.org>
verbose(3): pdlua: compiled for pd-0.43 on Jan 24 2013 20:06:37
verbose(4): Loading tclpd in /usr/lib/pd-extended/startup/tclpd
verbose(3): tclpd loader v0.3.0
verbose(3): tclpd: trying to load /usr/lib/pd-extended/extra/tclpd/tclpd.tcl...
verbose(3): tclpd: loaded /usr/lib/pd-extended/extra/tclpd/tclpd.tcl
verbose(4): Loading vanilla in /usr/lib/pd-extended/startup/vanilla
verbose(3): libdir_loader: added 'vanilla' to the global objectclass path
verbose(14): Loaded libdir 'vanilla' from '/usr/lib/pd-extended/extra/vanilla'
libdir loader $Revision: 1.8 $
	compiled on Nov  9 2012 at 02:54:16 
	compiled against Pd version 0.42.5.extended
verbose(6): not registering [pix_filmQT] again...
verbose(4): GEM: Graphics Environment for Multimedia
verbose(4): GEM: ver: 0.93.3 
verbose(4): GEM: compiled: Jan 25 2013
verbose(4): GEM: maintained by IOhannes m zmoelnig
verbose(4): GEM: Authors :	Mark Danks (original version)
verbose(4): GEM:		Chris Clepper
verbose(4): GEM:		Cyrille Henry
verbose(4): GEM:		IOhannes m zmoelnig
verbose(4): GEM: with help by Guenter Geiger, Daniel Heckenberg, James Tittle, Hans-Christoph Steiner, et al.
verbose(4): GEM: found a bug? miss a feature? please report it:
verbose(4): GEM: 	homepage http://gem.iem.at/
verbose(4): GEM: 	bug-tracker http://sourceforge.net/projects/pd-gem/
verbose(4): GEM: 	mailing-list http://lists.puredata.info/listinfo/gem-dev/
open: /etc/pd/gem.conf: No such file or directory
open: /home/ccrma/.pd/gem.conf: No such file or directory
open: ./gem.conf: No such file or directory
verbose(5): eventually adding Gem path '/usr/lib/pd-extended/extra/Gem' to search-paths
verbose(4): GEM: compiled for SIMD architecture: none
verbose(4): ?K??/usr/lib/pd-extended/extra/Gem/hsv2rgb.pd
verbose(3): libdir_loader: added 'cyclone' to the global objectclass path
verbose(14): Loaded libdir 'cyclone' from '/usr/lib/pd-extended/extra/cyclone'
verbose(3): libdir_loader: added 'zexy' to the global objectclass path
verbose(14): Loaded libdir 'zexy' from '/usr/lib/pd-extended/extra/zexy'
verbose(3): libdir_loader: added 'creb' to the global objectclass path
verbose(14): Loaded libdir 'creb' from '/usr/lib/pd-extended/extra/creb'
verbose(3): libdir_loader: added 'cxc' to the global objectclass path
verbose(14): Loaded libdir 'cxc' from '/usr/lib/pd-extended/extra/cxc'
verbose(3): libdir_loader: added 'iemlib' to the global objectclass path
verbose(14): Loaded libdir 'iemlib' from '/usr/lib/pd-extended/extra/iemlib'
verbose(3): libdir_loader: added 'list-abs' to the global objectclass path
verbose(14): Loaded libdir 'list-abs' from '/usr/lib/pd-extended/extra/list-abs'
verbose(3): libdir_loader: added 'mapping' to the global objectclass path
verbose(14): Loaded libdir 'mapping' from '/usr/lib/pd-extended/extra/mapping'
verbose(3): libdir_loader: added 'markex' to the global objectclass path
verbose(14): Loaded libdir 'markex' from '/usr/lib/pd-extended/extra/markex'
verbose(3): libdir_loader: added 'maxlib' to the global objectclass path
verbose(14): Loaded libdir 'maxlib' from '/usr/lib/pd-extended/extra/maxlib'
verbose(3): libdir_loader: added 'memento' to the global objectclass path
verbose(14): Loaded libdir 'memento' from '/usr/lib/pd-extended/extra/memento'
verbose(3): libdir_loader: added 'mjlib' to the global objectclass path
verbose(14): Loaded libdir 'mjlib' from '/usr/lib/pd-extended/extra/mjlib'
verbose(3): libdir_loader: added 'motex' to the global objectclass path
verbose(14): Loaded libdir 'motex' from '/usr/lib/pd-extended/extra/motex'
verbose(3): libdir_loader: added 'pddp' to the global objectclass path
verbose(14): Loaded libdir 'pddp' from '/usr/lib/pd-extended/extra/pddp'
verbose(3): libdir_loader: added 'pdogg' to the global objectclass path
verbose(14): Loaded libdir 'pdogg' from '/usr/lib/pd-extended/extra/pdogg'
verbose(3): libdir_loader: added 'pixeltango' to the global objectclass path
verbose(14): Loaded libdir 'pixeltango' from '/usr/lib/pd-extended/extra/pixeltango'
verbose(3): libdir_loader: added 'pmpd' to the global objectclass path
verbose(14): Loaded libdir 'pmpd' from '/usr/lib/pd-extended/extra/pmpd'
verbose(3): libdir_loader: added 'rradical' to the global objectclass path
verbose(14): Loaded libdir 'rradical' from '/usr/lib/pd-extended/extra/rradical'
verbose(3): libdir_loader: added 'sigpack' to the global objectclass path
verbose(14): Loaded libdir 'sigpack' from '/usr/lib/pd-extended/extra/sigpack'
verbose(3): libdir_loader: added 'smlib' to the global objectclass path
verbose(14): Loaded libdir 'smlib' from '/usr/lib/pd-extended/extra/smlib'
verbose(3): libdir_loader: added 'toxy' to the global objectclass path
verbose(14): Loaded libdir 'toxy' from '/usr/lib/pd-extended/extra/toxy'
verbose(3): libdir_loader: added 'unauthorized' to the global objectclass path
verbose(14): Loaded libdir 'unauthorized' from '/usr/lib/pd-extended/extra/unauthorized'
verbose(3): libdir_loader: added 'pan' to the global objectclass path
verbose(14): Loaded libdir 'pan' from '/usr/lib/pd-extended/extra/pan'
verbose(3): libdir_loader: added 'hcs' to the global objectclass path
verbose(14): Loaded libdir 'hcs' from '/usr/lib/pd-extended/extra/hcs'
verbose(3): libdir_loader: added 'jmmmp' to the global objectclass path
verbose(14): Loaded libdir 'jmmmp' from '/usr/lib/pd-extended/extra/jmmmp'
verbose(3): libdir_loader: added 'ext13' to the global objectclass path
verbose(14): Loaded libdir 'ext13' from '/usr/lib/pd-extended/extra/ext13'
verbose(3): libdir_loader: added 'ggee' to the global objectclass path
verbose(14): Loaded libdir 'ggee' from '/usr/lib/pd-extended/extra/ggee'
verbose(3): libdir_loader: added 'flib' to the global objectclass path
verbose(14): Loaded libdir 'flib' from '/usr/lib/pd-extended/extra/flib'
verbose(3): libdir_loader: added 'ekext' to the global objectclass path
verbose(14): Loaded libdir 'ekext' from '/usr/lib/pd-extended/extra/ekext'
verbose(3): libdir_loader: added 'flatspace' to the global objectclass path
verbose(14): Loaded libdir 'flatspace' from '/usr/lib/pd-extended/extra/flatspace'
expr, expr~, fexpr~ version 0.4 under GNU General Public License 
verbose(4): [unpack] part of zexy-2.2.5.1pdextended (compiled: Jan 25 2013)
verbose(4): 	Copyright (c) 1999-2012 IOhannes m zmölnig, forum::für::umläute & IEM
comport - PD external for unix/windows
LGPL 1998-2006,  Winfried Ritsch and others (see LICENCE.txt)
Institute for Electronic Music - Graz
error: [comport] ** ERROR ** could not open device /dev/ttyAMA0:
 failure(13): Permission denied

error: [comport] opening serial port 0 failed!
verbose(4): ... you might be able to track this down from the Find menu.
bytes2any: pdstring version 0.10-2 by Bryan Jurish
[arduino]: version_0.5
priority 6 scheduling enabled.
couldn't open MIDI input device 0
couldn't open MIDI output device 0
opened 0 MIDI input device(s) and 0 MIDI output device(s).
priority 8 scheduling enabled.
get_baud_ratebits: 57600
set_baudrate baudbits: 4097
[comport] opened serial line device 1 (/dev/ttyUSB0)

UNKNOWN_INPUT_COMMAND: 0 0
[arduino]pinsetup_msg.: pinMode 2 input
[arduino]pinsetup_msg.: pinMode 3 input
[arduino]pinsetup_msg.: pinMode 4 input
[arduino]pinsetup_msg.: pinMode 5 input
[arduino]pinsetup_msg.: digital 2 1
[arduino]pinsetup_msg.: digital 3 1
[arduino]pinsetup_msg.: digital 4 1
[arduino]pinsetup_msg.: digital 5 1
print: play-shot-one
print: play-shot-one
print: play-shot-two
print: play-shot-two
print: play-shot-two
print: play-shot-one
print: play-shot-two
print: play-shot-one
print: play-shot-one
print: play-shot-one
print: play-shot-one
print: play-shot-two
^CPd: signal 2
ccrma@satellite /media $ cd
ccrma@satellite ~ $ sudo nano /etc/rc.local 
ccrma@satellite ~ $ cat /etc/rc.local
#!/bin/sh -e
#
# rc.local
#
#
#
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












# Stop the screen/projector from going blank when inactive
setterm -blank 0
cpufreq-set -g performance

# Increment the number of recorded boot ups
/home/ccrma/bin/increment-number-boots

# Start monitoring the memory usage over time
/home/ccrma/bin/log-memory-usage &

# First delete the old log file (otherwise it just keeps appending)
#rm /home/ccrma/on-startup/startup-log.txt &
# Then run the startup script from within a screen shell so
# that the text output gets logged.
#sudo -H -E -u ccrma HOME=/home/ccrma screen -L /home/ccrma/on-startup/load_default_patch
#sudo -H -E -u ccrma screen -L /home/ccrma/on-startup/load_default_patch

sudo mount -t vfat /dev/sda1 /media

sudo -H -E -u ccrma /home/ccrma/on-startup/load_default_patch









# Print the IP address (the copyright does not apply to this last 
# part of rc.local -- it was apparently obtained from the Raspbian distribution)
_IP=$(hostname -I) || true
if [ "$_IP" ]; then
  printf "My IP address is %s\n" "$_IP"
fi
exit 0

ccrma@satellite ~ $ nano on-startup/load_default_patch
ccrma@satellite ~ $ cat on-startup/load_default_patch
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
pd-extended -rt -nogui /media/printingstudio.pd &
ccrma@satellite ~ $ mount
/dev/root on / type ext4 (rw,noatime,data=ordered)
devtmpfs on /dev type devtmpfs (rw,relatime,size=224276k,nr_inodes=56069,mode=755)
tmpfs on /run type tmpfs (rw,nosuid,noexec,relatime,size=44872k,mode=755)
tmpfs on /run/lock type tmpfs (rw,nosuid,nodev,noexec,relatime,size=5120k)
proc on /proc type proc (rw,nosuid,nodev,noexec,relatime)
sysfs on /sys type sysfs (rw,nosuid,nodev,noexec,relatime)
tmpfs on /run/shm type tmpfs (rw,nosuid,nodev,noexec,relatime,size=89720k)
devpts on /dev/pts type devpts (rw,nosuid,noexec,relatime,gid=5,mode=620)
/dev/mmcblk0p1 on /boot type vfat (ro,relatime,fmask=0022,dmask=0022,codepage=cp437,iocharset=ascii,shortname=mixed,errors=remount-ro)
/dev/sda1 on /media type vfat (rw,relatime,fmask=0022,dmask=0022,codepage=cp437,iocharset=ascii,shortname=mixed,errors=remount-ro)
ccrma@satellite ~ $ sudo mount -o remount,rw /boot
ccrma@satellite ~ $ sudo nano /boot/config.txt 
ccrma@satellite ~ $ cat /boot/config.txt 
# uncomment if you get no picture on HDMI for a default "safe" mode
#hdmi_safe=1

# uncomment this if your display has a black border of unused pixels visible
# and your display can output without overscan
#disable_overscan=1

# uncomment the following to adjust overscan. Use positive numbers if console
# goes off screen, and negative if there is too much border
#overscan_left=16
#overscan_right=16
#overscan_top=16
#overscan_bottom=16

# uncomment to force a console size. By default it will be display's size minus
# overscan.
#framebuffer_width=1280
#framebuffer_height=720

# uncomment if hdmi display is not detected and composite is being output
#hdmi_force_hotplug=1

# uncomment to force a specific HDMI mode (this will force VGA)
#hdmi_group=1
#hdmi_mode=1

# uncomment to force a HDMI mode rather than DVI. This can make audio work in
# DMT (computer monitor) modes
#hdmi_drive=2

# uncomment to increase signal to HDMI, if you have interference, blanking, or
# no display
#config_hdmi_boost=4

# uncomment for composite PAL
#sdtv_mode=2

#uncomment to overclock the arm. 700 MHz is the default.
#arm_freq=800

# for more options see http://elinux.org/RPi_config.txt
initramfs initramfs.cpio
ccrma@satellite ~ $ sudo shutdown -r now

Broadcast message from root@satellite (pts/2) (Sun Nov 23 11:29:55 2014):

The system is going down for reboot NOW!
ccrma@satellite ~ $ exit
logout
Connection to 192.168.2.106 closed.
doohoyis-MacBook-Pro:~ doohoyi$ ssh -X ccrma@192.168.2.106
ccrma@192.168.2.106's password: 
Linux satellite 3.6.11+ #1 PREEMPT Thu May 16 02:38:52 CEST 2013 armv6l
Welcome to
---------------
Satellite CCRMA
---------------
This memory image was made by Edgar Berdahl.

Thanks to the other contributors and supporters of the Satellite CCRMA
project including most particularly Wendy Ju as well as Fernando
Lopez-Lezcano, Florian Goltz, Carr Wilkerson, Chris Chafe, Spencer Salazar,
Paul DeMarinis, Myles Borins, Robert Nelson, Gerald Coley, Cathy Wicks,
the Alexander von Humboldt Foundation, the TU Berlin, Chris Jubien, T.I., and 
the Satellite CCRMA user base.

For more info: https://ccrma.stanford.edu/satellite

Last login: Sun Nov 23 11:24:11 2014 from 192.168.2.1
sudo
If there is a default pd patch running (see
~/on-startup/load_default_patch for more details),
you can kill it by typing
stop-default
ccrma@satellite ~ $ sudo shutdown -h now
[sudo] password for ccrma: 

Broadcast message from root@satellite (pts/1) (Sun Nov 23 11:31:34 2014):

The system is going down for system halt NOW!
ccrma@satellite ~ $ exit
logout
Connection to 192.168.2.106 closed.
doohoyis-MacBook-Pro:~ doohoyi$ 
```

---

```
pd-extended -rt -nogui /media/printing-studio-show.pd &
```
를
```
pd-extended -rt -nogui /media/printingstudio.pd &
```
로 수정함.