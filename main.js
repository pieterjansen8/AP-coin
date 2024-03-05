const apcoin_url = "https://lams-aa86c-default-rtdb.europe-west1.firebasedatabase.app/.json"
const apcoin_url_raw = "https://lams-aa86c-default-rtdb.europe-west1.firebasedatabase.app/"
const money= apcoin_url_raw+"coin"+".json"
/* elements */
const coin_worth_div = document.getElementById("coin_worth")

var time = null
var worth = null



async function get_worth(){
    var fetch_worth = await fetch(money)
    var json = await fetch_worth.json()
    worth = json.coin_worth
    coin_worth_div.innerHTML = json.coin_worth
    setTimeout(get_worth, 1000)
}get_worth()
async function get_time(){
    var worth = await fetch(apcoin_url_raw+"time.json")
    var json = await worth.json()
    time = json.time_ap
    setTimeout(get_time,1000)
}get_time()







async function create_graph(){



    const xValues = [0,time];
    const yValues = [0,worth]
    new Chart("graph", {
       type: "line",
       data: { 
         labels: xValues,
         datasets: [{
           fill: false,
           lineTension: 0,
           backgroundColor: "rgba(0,0,255,1.0)",
           borderColor: "rgba(0,0,255,0.1)",
           data: yValues
         }]
       },
       options: {
         legend: {display: false},
         scales: {
           yAxes: [{ticks: {min: 0, max: worth + 100}}],
         }
       }
     });
     if(time==null){ 
        setTimeout(create_graph, 1000)
     }
     if(worth==null){
        setTimeout(create_graph, 1000)
     }
}
create_graph()


async function buy_coin(){
    var back = worth+1
    var f = await fetch(money,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': "application/json"
        },
        method: "PUT",
        body: JSON.stringify({coin_worth: back})
    })
}