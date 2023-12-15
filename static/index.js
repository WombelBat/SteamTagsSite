
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
        xValues.push(data[i].tag);
        yValues.push(10000 * data[i].number);
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
          scales: {
            // y: {
            //   beginAtZero: true, // Set y-axis to start at zero
            //   max: null,
            //   min: 0
            //   // suggestedMax: null, // Automatically calculate the maximum value
            // },
            yAxes: [{
              ticks: {
                beginAtZero: false,
                // max: null,
                min: yValues[9] - yValues[9] / 10,

                // precision: 1
              }
            }
            ],
            // x: {
            //   beginAtZero: true,
            //   suggestedMax: null, // Automatically calculate the maximum value
            // }
          },
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
  console.log("trending");
  reviewValues();
  // TagByDay();
}





// const barColors = ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red"];
// setInterval(reviewValues, 40000);


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
        xValues.push(data[i].tag);
        yValues.push(100 * data[i].number);
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
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                max: 100,
                min: 0
              }
            }
            ],
            x: {
              beginAtZero: true,
              suggestedMax: null
            }
          },
          legend: { display: false },
          title: {
            display: false,
            text: ""
          },
        }
      });
    });
}

/* THIRD BAR CHART */
document.addEventListener("keypress", function (event) {
  // console.log(document.getElementById("tag").isActive);
  if (event.key == "Enter" && document.getElementById("tag").value != "") {
    console.log("enter");
    event.preventDefault();
    if (document.getElementById("toRem"))
      document.getElementById("toRem").remove();
    var toCre = document.getElementById("toCre");
    var text = "<div class=\'content\'> <h2> Tag Popularity per day</h2>    <table id=\'trending-recent\' class=\"trending common-table\"><tbody>    <tr class=\"odd\"> <td class=\"game-name left\"></td><td class=\"num\"><canvas  id=\"myChart2\"     style=\"width: 100%; max-width: 1600px\"       ></canvas> </td></tr> </tbody ></table >  </div > ";

    toCre.innerHTML = text;
    var data = document.getElementById('tag').value;
    console.log(typeof (data));
    packet = { text: data };
    console.log(packet);

    fetch('/graphs/search', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"

      },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        // console.log(response.json());
        return response.json();
      })
      .then(function (data) {
        // console.log(response.json());
        var xValues = [];
        var yValues = [];
        const barColors = ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red"];
        for (var i = 0; i < data.length; i++) {
          xValues.push(data[i].date);
          // yValues.push(data[i].names);
          yValues.push(data[i].quantity);
          console.log(data[i].date);
        }

        new Chart("myChart2", {
          type: "line",
          data: {
            labels: xValues,
            datasets: [{
              backgroundColor: barColors,
              data: yValues
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  max: 10,
                  min: 0
                }
              }
              ],
              x: {
                beginAtZero: true,
                suggestedMax: null
              }
            },
            legend: { display: false },
            title: {
              display: false,
              text: ""
            },
          }
        });
      });
  }
});

function TagByDay() {

  var xValues = [];
  var yValues = [];
  const barColors = ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red"];
  var url = "/neww";
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
        xValues.push(data[i].tag);
        yValues.push(100 * data[i].number);
      }

      new Chart("myChart2", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                max: 100,
                min: 0
              }
            }
            ],
            x: {
              beginAtZero: true,
              suggestedMax: null
            }
          },
          legend: { display: false },
          title: {
            display: false,
            text: ""
          },
        }
      });
    });
}

/* FACTS */
setInterval(callALLFunctions, 20000);
// RGraph.Ajax.getJSON('/graphs/review', reviewValuesAsync);
// setInterval(trendingValues, 4000);
// 
// const xValue = ["Indie", "Action", "Singleplayer", "Adventure", "Simulation", "Strategy", "RPG", "Fantasy", "Multiplayer", "Free to play"];
// const yValue = [55, 49, 44, 24, 15, 20, 59, 12, 33, 77];

// new RGraph.Bar({
//   id: 'myChart1',
//   data: yValue,
//   options: {
//     xaxisTickmarksCount: 0,
//     xaxisLinewidth: 5,
//     backgroundGridVlines: false,
//     backgroundGridBorder: false,
//     yaxis: false,
//     colors: [
//       'Gradient(#faa:red)'
//     ],
//     textSize: 24,
//     xaxisLabels: '%{global:xValue[%{index}]}',
//     marginLeft: 45,
//     backgroundGrid: true,
//     marginInner: 10, // Decreased marginInner value
//     tooltips: '<b>Results</b><br>%{key}',
//     // tooltipsFormattedKeyLabels: ['06:00', '12:00', '18:00'],
//     // tooltipsFormattedKeyColors: ['red', 'green', 'blue'],
//     tooltipsFormattedUnitsPost: '%',
//     tooltipsCss: {
//       fontSize: '16pt',
//       textAlign: 'left'
//     }
//   }
// }).draw();
// 

// $(RGraph.Ajax.getJSON('/graphs/review', reviewValuesAsync));

function getGraph(id, xValues, yValues) {

  if (!window.obj) {
    window.obj = new RGraph.Bar({
      id: id,
      data: yValues,
      options: {
        xaxisTickmarksCount: 0,
        xaxisLinewidth: 5,
        backgroundGridVlines: false,
        backgroundGridBorder: false,
        yaxis: false,
        colors: [
          'Gradient(#faa:red)'
        ],
        textSize: 24,
        xaxisLabels: '%{global:xValues[%{index}]}',
        marginLeft: 45,
        backgroundGrid: true,
        marginInner: 10,
        tooltips: '<b>Results</b><br>%{key}',
        // tooltipsFormattedKeyLabels: ['06:00', '12:00', '18:00'],
        // tooltipsFormattedKeyColors: ['red', 'green', 'blue'],
        tooltipsFormattedUnitsPost: '%',
        tooltipsCss: {
          fontSize: '16pt',
          textAlign: 'left'
        }
      }
    });
    var grad = window.obj.context.createLinearGradient(0, 0, 0, 250);
    grad.addColorStop(0, '#efefef');
    grad.addColorStop(0.9, 'rgba(0,0,0,0)');

    wndow.obj.set('filledColors', [grad]);

  }
  return window.obj;
}

// Make an AJAX request to fetch the data from the backend
// $.ajax({
//   url: '/graph/review',
//   method: 'GET',
//   success: function (data) {
//     console.log("mesasjjj");
//     var xValues = [];
//     var yValues = [];
//     // Process the data and populate xValues and yValues
//     for (var i = 0; i < data.length; i++) {
//       xValues.push(data[i].tag_name);
//       yValues.push(data[i].number);
//     }
//     // id = 'myChart1';
//     // RGraph.reset(document.getElementById(myChart1));
//     var graph = getGraph('myChart1', xValues, yValues);
//     graph.draw();
//   },
//   error: function (xhr, status, error) {
//     console.error(error);
//   }
// });



function reviewValuesAsync(data) {
  var xValues = [];
  var yValues = [];
  const barColors = ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red"];
  for (var i = 0; i < data.length; i++) {
    xValues.push(data[i].tag_name);
    yValues.push(data[i].number);
  }


  RGraph.reset(document.getElementById('myChart1'));
  var myChart = new RGraph.Bar({
    id: 'myChart1',
    data: yValues,
    options: {
      xaxisTickmarksCount: 0,
      xaxisLinewidth: 5,
      backgroundGridVlines: false,
      backgroundGridBorder: false,
      yaxis: false,
      colors: [
        'Gradient(#faa:red)'
      ],
      textSize: 24,
      xaxisLabels: '%{global:xValues[%{index}]}',
      marginLeft: 45,
      backgroundGrid: true,
      marginInner: 10,
      tooltips: '<b>Results</b><br>%{key}',
      // tooltipsFormattedKeyLabels: ['06:00', '12:00', '18:00'],
      // tooltipsFormattedKeyColors: ['red', 'green', 'blue'],
      tooltipsFormattedUnitsPost: '%',
      tooltipsCss: {
        fontSize: '16pt',
        textAlign: 'left'
      }
    }
  }).draw();
}




// new Chart("myChart1", {
//   type: "bar",
//   data: {
//     labels: xValues,
//     datasets: [{
//       backgroundColor: barColors,
//       data: yValues
//     }]
//   },
//   options: {
//     legend: { display: false },
//     title: {
//       display: true,
//       text: ""
//     }
//   }
// });



var facts = [
  { fact: '"There are over 2,000 video game design schools worldwide"' },
  { fact: '"The first ever video game was created in 1958"' },
  { fact: '"The average age of a video game designer is between 30-40"' },
  { fact: '"The video game industry is worth over $100 billion"' },
  { fact: '"The first ever commercial video game wasn’t a hit"' },
  { fact: '"The best selling video game of all time is Minecraft"' },
  { fact: '"There are over 2,000 video game design schools worldwide"' },
  { fact: '"The first ever video game was created in 1958"' },
  { fact: '"The average age of a video game designer is between 30-40"' },
  { fact: '"The video game industry is worth over $100 billion"' },
  { fact: '"The first ever commercial video game wasn’t a hit"' },
  { fact: '"The best selling video game of all time is Minecraft"' },
  { fact: '"The first video game console was released in 1972"' },
  { fact: '"The highest-grossing video game franchise is Pokémon"' },
  { fact: '"The first video game character to have a balloon in the Macy\'s Thanksgiving Day Parade was Sonic the Hedgehog"' },
  { fact: '"The longest video game marathon lasted for 138 hours and 34 minutes"' },
  { fact: '"The first video game to feature a female protagonist was Ms. Pac-Man"' },
  { fact: '"The most expensive video game ever made is Grand Theft Auto V"' },
  { fact: '"The first video game to use motion capture technology was Prince of Persia: The Sands of Time"' },
  { fact: '"The first video game to have a movie adaptation was Super Mario Bros."' },
  { fact: '"The most popular video game genre is action/adventure"' },
  { fact: '"The first video game to feature a save system was The Legend of Zelda"' },
  { fact: '"The first video game to use 3D graphics was Virtua Racing"' },
  { fact: '"The first video game to have a multiplayer mode was Pong"' },
  { fact: '"The first video game to sell over one million copies was Pac-Man"' },
  { fact: '"The first video game to feature voice acting was Dragon\'s Lair"' }

];

let btn = document.querySelector("#button");
let fact = document.querySelector(".fact");

btn.addEventListener("click", function () {
  let random = Math.floor(Math.random() * facts.length);
  fact.innerHTML = facts[random].fact;
})






