const searchURL = "https://api.open.fec.gov/v1/candidates/search/?sort_nulls_last=false&election_year=2020&per_page=20&sort=name&sort_null_only=false&office=P&page=1&api_key=qz9xwLZBL32E7X9FPi8NE9pfkcMdT5KKNSlRCW9e&sort_hide_null=false";

function watchForm(){
    console.log("page loaded; watchForm function ran");
    $("#formOne").submit(function (event){
        event.preventDefault();
        console.log("the form was submitted");
        let name = $("#inputOne").val();
        console.log(name);
        getInfo(name);
    });
}

function getInfo(name){
    console.log("getInfo function ran");
    console.log(name);

    let params = {
        name: name
    };

    const queryString = formatQueryParams(params);

    const url = searchURL + '&' + queryString;

    console.log(queryString);

    console.log("here is the url to go into fetch:" + url);
    
    fetch(url)
    .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => getId(responseJson))
    .catch(error => alert("Something went wrong. Try again!"));   
}

function getId(responseJson){
    console.log("getId function ran with responseJson as its argument")
    console.log(responseJson);
    console.log(responseJson.results[0].candidate_id);
    id=responseJson.results[0].candidate_id
    console.log("Here is the id again: " + id);
    getMoney(id);
}

function getMoney(id){
    console.log("getMoney function ran with id: " + id);
    urlId = "https://api.open.fec.gov/v1/candidates/totals/?api_key=qz9xwLZBL32E7X9FPi8NE9pfkcMdT5KKNSlRCW9e&page=1&election_full=false&sort_hide_null=false&sort_nulls_last=false&per_page=20&sort_null_only=false&candidate_id=" + id
    
    fetch(urlId)
    .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
    .then(response => response.json())
    .then(responseJson => getResults(responseJson))
    .catch(error => alert("Something went wrong in or after the getMoney function. Try again!"));  
}//getMoney

function getResults(grJ){
    console.log("getResults function ran");
    let name = grJ.results[0].name;
    let cash = grJ.results[0].cash_on_hand_end_period; 
    console.log(name);
    console.log(cash);
   
    fCash = formatNumber(cash);

    display(name, fCash)
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

function display(name, cash){
    console.log("display function ran");
    let results = `Presidential candidate (listed with running mate, if declared) ${name} has the following amount of cash on hand for their campaign: 
    <p>$ ${cash}</p>`
    $("#displayArea").append(results)
   
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

$(watchForm)