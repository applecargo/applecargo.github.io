## angling / fishing neighbor's open network. with RPi.

---

get openwrt

<http://downloads.openwrt.org/barrier_breaker/14.07/brcm2708/generic/openwrt-brcm2708-sdcard-vfat-ext4.img>

check driver. for the WLAN dongle.

<http://wireless.kernel.org/en/users/Drivers/b43>

b43 probably right.. but confirm.. with 'lsusb'. vender id/ dev. id

---

there is no 'lsusb' command for openwrt distribution.

but i could get the vendor id & device id.

from which i found "USB: 0BDA:8176 Realtek Semiconductor Corp. RTL8188CUS 802.11n WLAN Adapter"

---

they say i need to get kmod-rtl8192cu for RTL8188CUS. which i could not get.

perhaps, if i try with older version of openwrt. (i m now using latest version "Barrier Breaker 14.07")

<http://wiki.openwrt.org/toh/raspberry_pi> : Barrier Breaker 14.07

<http://www.reddit.com/r/linux/comments/1ygsf4/rtl8188cus_on_openwrt/> : a clue.

---

btw, for first login to openwrt.

type 'passwd' in console of openwrt. to make a root password.

this enables ssh login.

sometimes, to log into luci interface, you need to add few characters like below.

{ipaddress of rpi}/cgi-bin/luci

and this ip address of first time login is often 192.168.1.1

<http://wiki.openwrt.org/doc/howto/firstlogin> : general info for firstlogin.

---

about luci. : <http://wiki.openwrt.org/doc/howto/luci.essentials>

---

how to shutdown openwrt.

type 'halt'

<http://superuser.com/questions/694297/how-to-shut-down-openwrt-without-corrupting-file-systems>

---

and now, i want to wrap this up for now..

'cause, i don't have enough time and desire to continue on this.

2014 oct 19.

---

