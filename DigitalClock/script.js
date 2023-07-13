 let hrs=document.getElementById("hrs");
 let min=document.getElementById("min");
 let sec=document.getElementById("sec");
 let session=document.getElementById("session");

 setInterval(()=>{
   
 let currentTime=new Date();
 let h=currentTime.getHours();
 let m=currentTime.getMinutes();
 let s=currentTime.getSeconds();
 if(h>12)
   {
       h-=12;
   }
   if(h<=12)
   {
      session.innerHTML="PM";
   
   }
 hrs.innerHTML=(h<10?"0":"")+h;
 min.innerHTML=(m<10?"0":"")+m;
 sec.innerHTML=(s<10?"0":"")+s;
 },1000)


















//  function showTime(){
//    var d=new Date();
//    var h=d.getHours();
//    var m=d.getMinutes();
//    var s=d.getSeconds();
//    var session="AM"
//    if(h>12)
//    {
//        h-=12;
//    }
//    if(h<=12)
//    {
//        session="PM";
//    }

//    h=h<10 ?"0"+h :h ;
//    m=m<10 ?"0"+m :m ;
//    s=s<10 ?"0"+s :s ;

   
//    var time=h+" : "+m+" : "+s+" "+session;
//    document.getElementsByTagName("h1")[0].innerText= time;
//    setTimeout(showTime,1000);
// }