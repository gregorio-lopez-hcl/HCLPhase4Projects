var myData = [
    {"dealId" : 0, "client_name" : "Oracle Corp. ", "project_name" : "Apollo Project", "project_manager" : "Mary", "project_cost" : 50000},
    {"dealId" : 1, "client_name" : "Advanced Micro Devices", "project_name" : "Hermes Project", "project_manager" : "Bob", "project_cost" : 150000000},
    {"dealId" : 2, "client_name" : "Samsung", "project_name" : "Zeus Project", "project_manager" : "Jane", "project_cost" : 100000}
]


var currentDealId = myData.length;



// localstorage allows us to persist key value pairs in a way that would survive page refreshes, navigation, and user closing/reopening browser.
// localstorage has limits to the size of each object stored.   

localStorage.setItem("myData", "test")

var myDataTest = localStorage.getItem("myData")





function CreateTableFromJSON() {    
    

    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Deal ID', 'Deal Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < myData.length; i++) {
        for (var key in myData[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < myData.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myData[i][col[j]];
        }
        

    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function AddNewDeal() {
    var clientName = document.getElementById("clientNameInput").value;
    var projectName = document.getElementById("projectNameInput").value;
    var projectManager = document.getElementById("projectManagerInput").value;
    var projectCost = document.getElementById("projectCostInput").value;


    document.getElementById("clientNameInput").value = "";
    document.getElementById("projectNameInput").value = "";
    document.getElementById("projectManagerInput").value = "";
    document.getElementById("projectCostInput").value = "";


    InsertRow(currentDealId, clientName, projectName, projectManager, projectCost);
    

}

function InsertRow(dealId, clientName, projectName, projectManager, projectCost) {
    myData.push({"dealId": dealId, "client_name" : clientName, "project_name" : projectName, "project_manager" : projectManager, "project_cost" : projectCost})
    currentDealId++;
    CreateTableFromJSON();

}

function DeleteRow(dealId) {
     
    dealId = document.getElementById("dealId").value; 

    for( var i = 0; i < myData.length; i++){ 

        if ( myData[i].dealId == dealId) { 
    
            myData.splice(i, 1); 
        }
    
    }
    CreateTableFromJSON();
}

function EditRow(dealId) {

    dealId = document.getElementById("dealId").value; 

    for( var i = 0; i < myData.length; i++){ 

        if ( myData[i].dealId == dealId) {
            
            //var newId = document.getElementById("dealId").value; 
            var clientName = document.getElementById("clientNameInput1").value;
            var projectName = document.getElementById("projectNameInput1").value;
            var projectManager = document.getElementById("projectManagerInput1").value;
            var projectCost = document.getElementById("projectCostInput1").value;

           // document.getElementById("dealId").value = " "; 
            document.getElementById("clientNameInput1").value = "";
            document.getElementById("projectNameInput1").value = "";
            document.getElementById("projectManagerInput1").value = "";
            document.getElementById("projectCostInput1").value = "";

            myData.splice(dealId, 1, {"client_name" : clientName, "project_name" : projectName, "project_manager" : projectManager, "project_cost" : projectCost}); 
             
        }
    }
    CreateTableFromJSON();
}



function EditCost(dealId) { 

    dealId = document.getElementById("dealId").value; 

    for( var i = 0; i < myData.length; i++){ 

        if ( myData[i].dealId == dealId) {

            var projectCost = document.getElementById("projectCostInput").value;
            document.getElementById("projectCostInput").value = "";

            myData.splice(dealId, 1, {"project_cost" : projectCost}); 


        }


    }

    CreateTableFromJSON(); 
}