/* FIRST BAR CHART */


function trendingValues() {

  var xValues = [];
  var yValues = [];
  const barColors = ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red"];
  var url = "/graphs/trending";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(function (response) {
      // console.log(response.json());
      return response.json();
    })
    .then(function (data) {
      // console.log(response.json());
      for (var i = 0; i < data.length; i++) {
        xValues.push(data[i].tag_name);
        yValues.push(data[i].number);
      }

      new Chart("myChart", {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: ""
          }
        }
      });
    });

}

// Call the function every 5 seconds (5000 milliseconds)
function callALLFunctions() {
  trendingValues();
  reviewValues();
}
setInterval(callALLFunctions, 5000);
// setInterval(trendingValues, 40000);
// setInterval(reviewValues, 40000);

// const xValues = ["Indie", "Action", "Singleplayer", "Adventure", "Simulation", "Strategy", "RPG", "Fantasy", "Multiplayer", "Free to play"];
// const yValues = [55, 49, 44, 24, 15, 20, 59, 12, 33, 77];
// const barColors = ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red"];



/* SECOND BAR CHART */

function reviewValues() {

  var xValues = [];
  var yValues = [];
  const barColors = ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red"];
  var url = "/graphs/review";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(function (response) {
      // console.log(response.json());
      return response.json();
    })
    .then(function (data) {
      // console.log(response.json());
      for (var i = 0; i < data.length; i++) {
        xValues.push(data[i].tag_name);
        yValues.push(data[i].number);
      }

      new Chart("myChart1", {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: ""
          }
        }
      });
    });
}

/*
input.addEventListener("keypress", function(event) {
    if(event.key == "Enter"){
        event.preventDefault();
        document.getElementById('search').click();
    }
});
*/

/* FACTS */

var facts = [
  { fact: '"There are over 2,000 video game design schools worldwide"' },
  { fact: '"The first ever video game was created in 1958"' },
  { fact: '"The average age of a video game designer is between 30-40"' },
  { fact: '"The video game industry is worth over $100 billion"' },
  { fact: '"The first ever commercial video game wasn’t a hit"' },
  { fact: '"The best selling video game of all time is Minecraft"' }
];

let btn = document.querySelector("#button");
let fact = document.querySelector(".fact");

btn.addEventListener("click", function () {
  let random = Math.floor(Math.random() * facts.length);
  fact.innerHTML = facts[random].fact;
})







