import { getGlobal } from 'reactn';
const monthMap = {
    "01": "Jan", 
    "1": "Jan", 
    "02": "Feb",
    "2": "Feb",
    "03": "Mar",
    "3": "Mar",
    "04": "Apr",
    "4": "Apr",
    "05": "May",
    "5": "May",
    "06": "Jun",
    "6": "Jun", 
    "07": "Jul",
    "7": "Jul", 
    "08": "Aug",
    "8": "Aug",
    "09": "Sep",
    "9": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec" 
}
let demo;
let chartColor;
let ctx;
let myChart;
let color;
export function initPickColor() {
    window.$('.pick-class-label').click(function() {
        var new_class = window.$(this).attr('new-class');
        var old_class = window.$('#display-buttons').attr('data-class');
        var display_div = window.$('#display-buttons');
        if (display_div.length) {
          var display_buttons = display_div.find('.btn');
          display_buttons.removeClass(old_class);
          display_buttons.addClass(new_class);
          display_div.attr('data-class', new_class);
        }
      });
}

export function initDocChart() {
    chartColor = "#FFFFFF";
  
      ctx = document.getElementById('chartHours').getContext("2d");
  
      myChart = new window.Chart(ctx, {
        type: 'line',
  
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
          datasets: [{
              borderColor: "#6bd098",
              backgroundColor: "#6bd098",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
            },
            {
              borderColor: "#f17e5d",
              backgroundColor: "#f17e5d",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
            },
            {
              borderColor: "#fcc468",
              backgroundColor: "#fcc468",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
  
          tooltips: {
            enabled: false
          },
  
          scales: {
            yAxes: [{
  
              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5,
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: 'rgba(255,255,255,0.05)'
              }
  
            }],
  
            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }]
          },
        }
      });
}

export function initChartsPages() {
    const lists = getGlobal().lists;
    const allContacts = lists.flatMap((item) => item.contacts)
    //Calculating the unique months contacts were added
    let monthAdded = allContacts.map((item) => monthMap[item.dateAdded.month]);
    let uniqueMonths = [...new Set(monthAdded)];
    console.log(uniqueMonths)
    //End unique months

    //Calculating number of contacts by month
    let contactCountArray = [];
    for (const month of uniqueMonths) {
        let currentMonthArray = allContacts.filter((item) => monthMap[item.dateAdded.month] === month);
        contactCountArray.push(currentMonthArray.length);
    }
    console.log(contactCountArray);

    chartColor = "#FFFFFF";
  
    ctx = document.getElementById('chartHours').getContext("2d");
    
    myChart = new window.Chart(ctx, {
      type: 'line',

      data: {
        labels: uniqueMonths,
        datasets: [{
            borderColor: "#6bd098",
            backgroundColor: "#6bd098",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: contactCountArray
          },
        //We can add additional data to the chart here

        //   {
        //     borderColor: "#f17e5d",
        //     backgroundColor: "#f17e5d",
        //     pointRadius: 0,
        //     pointHoverRadius: 0,
        //     borderWidth: 3,
        //     data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
        //   },
        //   {
        //     borderColor: "#fcc468",
        //     backgroundColor: "#fcc468",
        //     pointRadius: 0,
        //     pointHoverRadius: 0,
        //     borderWidth: 3,
        //     data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
        //   }
        ]
      },
      options: {
        legend: {
          display: false
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              //padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f"
            }
          }]
        },
      }
    });


    ctx = document.getElementById('chartEmail').getContext("2d");
    
    //Here we need to check on email statistics
    const emails = getGlobal().emails;
    const toStats = emails.flatMap((email) => email.to);
    const opens = toStats.filter((email) => email.opened).length;
    const read = toStats.filter((email) => email.opened).length;
    const clicks = toStats.filter((email) => email.clicked).length;

    myChart = new window.Chart(ctx, {
      type: 'pie',
      data: {
        labels: [1, 2, 3],
        datasets: [{
          label: "Emails",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: [
            '#e3e3e3',
            '#4acccd',
            '#fcc468',
          ],
          borderWidth: 0,
          data: [clicks, opens, read]
        }]
      },

      options: {

        legend: {
          display: false
        },

        pieceLabel: {
          render: 'percentage',
          fontColor: ['white'],
          precision: 2
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent"
            },
            ticks: {
              display: false,
            }
          }]
        },
      }
    });

    // var speedCanvas = document.getElementById("speedChart");

    // var dataFirst = {
    //   data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
    //   fill: false,
    //   borderColor: '#fbc658',
    //   backgroundColor: 'transparent',
    //   pointBorderColor: '#fbc658',
    //   pointRadius: 4,
    //   pointHoverRadius: 4,
    //   pointBorderWidth: 8,
    // };

    // var dataSecond = {
    //   data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
    //   fill: false,
    //   borderColor: '#51CACF',
    //   backgroundColor: 'transparent',
    //   pointBorderColor: '#51CACF',
    //   pointRadius: 4,
    //   pointHoverRadius: 4,
    //   pointBorderWidth: 8
    // };

    // var speedData = {
    //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    //   datasets: [dataFirst, dataSecond]
    // };

    // var chartOptions = {
    //   legend: {
    //     display: false,
    //     position: 'top'
    //   }
    // };

    // var lineChart = new window.Chart(speedCanvas, {
    //   type: 'line',
    //   hover: false,
    //   data: speedData,
    //   options: chartOptions
    // });
}
  
export function showNotification(from, align) {
    color = 'primary';
  
    window.$.notify({
      icon: "nc-icon nc-bell-55",
      message: "Welcome to <b>Paper Dashboard</b> - a beautiful bootstrap dashboard for every web developer."

    }, {
      type: color,
      timer: 8000,
      placement: {
        from: from,
        align: align
      }
    });
}