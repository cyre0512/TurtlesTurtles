var turtles = [];
var guid;

function turtle(turtleName, turtleWeapon, turtleColor) {
    this.name = turtleName;
    this.weapon = turtleWeapon;
    this.color = turtleColor;
}

$('#button').click(function () {
    var name = $('#inputTurtleName').val();
    var weapon = $('#inputTurtleWeapon').val();
    var color = $('#inputTurtleColor').val();
    var newTurtle = new turtle(name, weapon, color);

    turtles.push(newTurtle);
    console.log(turtles.sort(function (a, b) { return a.name > b.name; }));
    var tRes = $('#createdturtles');
    tRes.empty();
    for (var i = 0; i < turtles.length; i++) {
        var dis = '<tr><td>' + turtles[i].name + '</td><td>' + turtles[i].weapon + '</td><td>' + turtles[i].color + '</td><td>' + "   " + '<button class="btn btn-info" onclick="editTurtle(' + i + ')">Edit</button>' + "   " + '<button class="btn btn-danger" onclick="turtleDelete(' + i + ')">Delete</button>' + "   " + '<button class="btn btn-success" onclick="AJAX(' + i + ')">Save to Firebase</button></td></tr>';
        
        tRes.append(dis);
        console.log("working button");
    }

})



//Delete
function turtleDelete(i) {
    turtles.splice(i, 1);
    var tRes = $('#createdturtles');
    tRes.empty();
    console.log("workingbutton")
    for(var i = 0; i < turtles.length; i++){

        var dis = '<tr><td>' + turtles[i].name + '</td><td>' + turtles[i].weapon + '</td><td>' + turtles[i].color + '</td><td>' + "   " + '<button class="btn btn-info" onclick="editTurtle(' + i + ')">Edit</button>' + "   " + '<button class="btn btn-danger" onclick="turtleDelete(' + i + ')">Delete</button>' + "   " + '<button class="btn btn-success" onclick="AJAX(' + i + ')">Save to Firebase</button></td></tr>';
        tRes.append(dis);
    }
}

//AJAX POST
function AJAX(i){
    console.log("working");
    var request = new XMLHttpRequest();
    request.open('POST', 'https://ninjaturtlesappeb.firebaseio.com/.json', true);
    request.onload = function (){
        if(this.status >= 200 && this.status < 400){
            console.log("success");
        }
        else {
            console.log("error");
        }
    }
    request.send(JSON.stringify(turtles[i]));
}

//edit
var turtleUpdate;
function editTurtle(tempid){
    turtleUpdate = tempid;
    guid = tempid;
    var tempTurtle = turtles[tempid];
    $("#editName").val(tempTurtle.name);
    $("#editWeapon").val(tempTurtle.weapon);
    $("#editColor").val(tempTurtle.color);
    
    $("#myEditModal").modal("show");
    console.log(tempTurtle);
    console.log(turtleUpdate);
    var tRes = $("#createdturtles");
    tRes.empty();
    for(var i = 0; i < turtles.length; i++){

        var dis = '<tr><td>' + turtles[i].name + '</td><td>' + turtles[i].weapon + '</td><td>' + turtles[i].color + '</td><td>' + "   " + '<button class="btn btn-info" onclick="editTurtle(' + i + ')">Edit</button>' + "   " + '<button class="btn btn-danger" onclick="turtleDelete(' + i + ')">Delete</button>' + "   " + '<button class="btn btn-success" onclick="AJAX(' + i + ')">Save to Firebase</button></td></tr>';
        tRes.append(dis);
    }
}
//save
function doSave(){
    turtles[guid].name = $("#editName").val();
    turtles[guid].weapon = $("#editWeapon").val();
    turtles[guid].color = $("#editColor").val();
    var tRes = $("#createdturtles");
    console.log("working");
    tRes.empty();
    for (var i = 0; i < turtles.length; i++){
        
        var dis = '<tr><td>' + turtles[i].name + '</td><td>' + turtles[i].weapon + '</td><td>' + turtles[i].color + '</td><td>' + "   " + '<button class="btn btn-info" onclick="editTurtle(' + i + ')">Edit</button>' + "   " + '<button class="btn btn-danger" onclick="turtleDelete(' + i + ')">Delete</button>' + "   " + '<button class="btn btn-success" onclick="AJAX(' + i + ')">Save to Firebase</button></td></tr>';
        tRes.append(dis);
    }
}

