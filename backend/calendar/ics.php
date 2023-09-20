<?php 
header('Content-Type: text/plain; charset=utf-8');
class calendarEvent{
    public $DTSTART;
    public $DTEND;
    public $DTSTAMP;
    public $summary;
    public $location;

    public function generateVEVENT() {
        return "BEGIN:VEVENT\nDTSTART:".$this->DTSTART."\nDTEND:".$this->DTEND."\nDTSTAMP:".$this->DTSTAMP."\nSUMMARY:".$this->summary."\nLOCATION:".$this->location."\nDESCRIPTION:no description\nEND:VEVENT\n";
    }
    public function __construct($startSTAMP, $endSTAMP, $summary, $location){
        $this->DTSTAMP = gmdate("Ymd\THis\Z");
        $this->DTSTART = gmdate("Ymd\THis\Z", $startSTAMP);
        $this->DTEND = gmdate("Ymd\THis\Z", $endSTAMP);
        $this->summary = $summary;
        $this->location = $location;
    }
}
include 'db.php';
$conn=new mysqli('localhost',$username,$password,'apps');
$time=time();
$timeDelta=($time+28800)%86400;
$time=$time-$timeDelta+28800;

$sql="SELECT * FROM shootManager WHERE eventBegin>$time";
$result=$conn->query($sql);
if($result->num_rows>0){
    while($row=$result->fetch_assoc()){
        $ics=new calendarEvent($row["eventBegin"], $row["eventEnd"], $row["eventSummary"], $row["eventLocation"]);
        echo $ics->generateVEVENT();
    }
}
else{
}