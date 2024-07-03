

allCountries = ()=>{
    fetch("https://restcountries.com/v3.1/all").then(res => res.json()).then(data =>{
        let tblContries = document.getElementById("tbl");
        let tblBody = `<tr>
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
            tblBody += `<tr>
                            <td>${element.name.common}</tb>
                            <td>${element.capital}</tb>
                            <td>${(idd)}</tb>
                            <td><img src="${element.flags.png}" width="20%" ></tb>
                            <td><a href="${element.maps.googleMaps}" target="_blank"><i class="fa-solid fa-location-dot"></i></a></tb>
                        </tr>`
            
        });
        tblContries.innerHTML = tblBody;
    });
}
allCountries();


search = ()=>{
    let searchText = document.getElementById("txtSearch").value;
    let tblBody = `<tr>
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
            tblBody += `<tr>
                            <td>${data[0].name.common}</tb>
                            <td>${data[0].capital}</tb>
                            <td>${(idd)}</tb>
                            <td><img src="${data[0].flags.png}" width="20%" ></tb>
                            <td><a href="${data[0].maps.googleMaps}" target="_blank"><i class="fa-solid fa-location-dot"></i></a></tb>
                        </tr>`
            document.getElementById("tbl").innerHTML = tblBody;
        }
        
    })
}