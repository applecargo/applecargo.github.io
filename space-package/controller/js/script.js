$( document ).ready(function() {

    //network
    var socket = io('http://52.79.203.62:5500'); //temporal ip - amazon aws ec2 server
    var netstat = new Tgl($(".netstat")[0], 'bg-white', 'bg-near-black', null, null);
    socket.on('connect', function() {
	netstat.set();
	socket.on('disconnect', function() {
	    netstat.clear();
	});
    });
    
    //program controller
    var prog_zero = new Btn($(".prog-zero")[0], 'bg-white', 'bg-near-black', 300, function() {
	socket.emit('sound',0);
    });
    var prog_one = new Btn($(".prog-one")[0], 'bg-white', 'bg-near-black', 300, function() {
	socket.emit('sound',1);
    });
    var prog_two = new Btn($(".prog-two")[0], 'bg-white', 'bg-near-black', 300, function() {
	socket.emit('sound',2);
    });
});
