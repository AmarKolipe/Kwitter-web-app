const firebaseConfig = {
    apiKey: "AIzaSyCp2JJDoAh5FxcvKBSo-7olM2OuxSXEYsM",
    authDomain: "kwitter-1ad40.firebaseapp.com",
    databaseURL: "https://kwitter-1ad40-default-rtdb.firebaseio.com",
    projectId: "kwitter-1ad40",
    storageBucket: "kwitter-1ad40.appspot.com",
    messagingSenderId: "146454665634",
    appId: "1:146454665634:web:427987fa5e411e4c0afafb"
  };
  
  // Initialize Firebase
  

  firebase.initializeApp(firebaseConfig);

  username = localStorage.getItem("username");

  roomname = localStorage.getItem("roomname");

  function send()
  {

    msg = document.getElementById("msg").value;

    firebase.database().ref(roomname).push({

        name:username,
        message:msg,
        like:0

    });

    document.getElementById("msg").value = "";
    


  }


  function logout()
{

      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      window.location = "index.html";
}

function getData() 
{firebase.database().ref("/roomname").on('value', 
function(snapshot) 
{document.getElementById("output").innerHTML = "";
snapshot.forEach(function(childSnapshot) 
{childKey  = childSnapshot.key;
  childData = childSnapshot.val();
  if(childKey != "purpose")
   { firebase_message_id = childKey;
     message_data = childData;
      console.log(message_data);
       name = message_data['name'];
        message = message_data['message'];
         like = message_data['like'];
          row = "<h4> "+ name +"<img class='user_tick' src='tick.png'> class='message_h4'>"+ message +"</h4><button class='btn btn-warning' id='"+firebase_message_id+"' value='"+like+"' onclick='updateLike(this.id)'> class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
           document.getElementById("output").innerHTML += row;
           } }); }); }

   getData();

   function updateLike(message_id) 
   { button_id = message_id; likes = document.getElementById(button_id).value;
     likes_in_number = Number(likes) + 1;
      console.log(likes_in_number);
       firebase.database().ref(room_name).child(message_id).update({ like : likes_in_number });
       }

