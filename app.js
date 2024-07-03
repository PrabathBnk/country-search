let array = [];
fetch("https://restcountries.com/v3.1/all").then(res => res.json()).then(data =>{
    data.forEach(element => {
        array.push(element.name.common);
    });
});

let subScreen = false;

allCountries = ()=>{
    fetch("https://restcountries.com/v3.1/all").then(res => res.json()).then(data =>{
        let tblContries = document.getElementById("tbl");
        let tblBody = `<tr id="headers">
                            <th>Name</th>
                            <th>Capital City</th>
                            <th>Contry Code(IDD)</th>
                            <th>Flag</th>
                            <th>Location</th>
                        </tr>`;
    
        data.forEach(element => {
            let suffixes = element.idd.suffixes;
            let root = element.idd.root;
            let idd = root + (suffixes != undefined ? suffixes[0] : "");
            tblBody += `<tr id="${element.name.common}">
                            <td>${element.name.common}</tb>
                            <td>${element.capital}</tb>
                            <td>${(idd)}</tb>
                            <td><img src="${element.flags.png}" width="20%" ></tb>
                            <td><a href="${element.maps.googleMaps}" target="_blank"><i class="fa-solid fa-location-dot"></i></a></tb>
                        </tr>`
            
        });
        tblContries.innerHTML = tblBody;
        popupAction();
    });
}
allCountries();

function search(searchText){
    let tblBody = `<tr id="headers">
                            <th>Name</th>
                            <th>Capital City</th>
                            <th>Contry Code(IDD)</th>
                            <th>Flag</th>
                            <th>Location</th>
                        </tr>`;
    fetch(`https://restcountries.com/v3.1/name/${searchText}`).then(res=> res.json()).then(data=>{
        if(data[0] != undefined){
            let suffixes = data[0].idd.suffixes;
            let root = data[0].idd.root;
            let idd = root + (suffixes != undefined ? suffixes[0] : "");
            tblBody += `<tr id="${data[0].name.common}">
                            <td>${data[0].name.common}</tb>
                            <td>${data[0].capital}</tb>
                            <td>${(idd)}</tb>
                            <td><img src="${data[0].flags.png}" width="20%" ></tb>
                            <td><a href="${data[0].maps.googleMaps}" target="_blank"><i class="fa-solid fa-location-dot"></i></a></tb>
                        </tr>`
            document.getElementById("tbl").innerHTML = tblBody;
            triggerPopup(data[0]);
        }
    })
}

document.getElementById("btnSearch").addEventListener("click", function(){
    search((document.getElementById("txtSearch").value));
});

document.getElementById("txtSearch").addEventListener("keypress", function(event){
    if(event.code == "Enter"){
        search((document.getElementById("txtSearch").value));
    }
});

document.getElementById("txtSearch").addEventListener("keypress", function(event){
    if(event.code == "NumpadEnter"){
        search((document.getElementById("txtSearch").value));
    }
});


function popupAction(){
    fetch("https://restcountries.com/v3.1/all").then(res => res.json()).then(data =>{
        data.forEach(element => {
            triggerPopup(element);
        });
    });
}

function triggerPopup(element){
    document.getElementById(element.name.common).addEventListener("click", function(){
        subScreen = true;
        let popup = document.getElementById("details");

        popup.style.opacity = "1";
        popup.style.zIndex = "10";
        document.getElementById("outside").style.zIndex = "5";
        document.getElementById("outside").style.backgroundColor = "#818e9c49";
        document.getElementById("main").style.filter = "blur(5px)";
        document.getElementById("main").style.position = "fixed";

        popupBody = `<h3 class="d-inline-block mt-5">${element.name.common}</h3>
                    <div class="w-100 h-25">
                        <img src="${element.flags.png}" alt="">
                    </div>
                    <table class="w-100">
                        <tr>
                            <th>Official Name </th>
                            <td>${element.name.official}</td>
                        </tr>
                        <tr>
                            <th>Capital </th>
                            <td>${element.capital}</td>
                        </tr>
                        <tr>
                            <th>Region </th>
                            <td>${element.region}</td>
                        </tr>
                        <tr>
                            <th>Area </th>
                            <td>${element.area}</td>
                        </tr>
                        <tr>
                            <th>Population </th>
                            <td>${element.population}</td>
                        </tr>
                    </table>`

        popup.innerHTML = popupBody;
    });
}

document.getElementById("outside").addEventListener("click", function(){
    if(subScreen == true){
        document.getElementById("details").style.opacity = "0";
        document.getElementById("details").style.zIndex = "0";
        document.getElementById("outside").style.zIndex = "0";
        document.getElementById("main").style.filter = "blur(0px)"
        document.getElementById("main").style.position = "unset";
        subScreen = false;
    }
});

