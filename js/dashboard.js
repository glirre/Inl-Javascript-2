

(function($) {
  'use strict';
  $(function() {
    
    

    // Green boxerino

    $(function() {

      if($("#total-sales-amount").length) {
        var request = new XMLHttpRequest(); 
      
        request.onload = function () {
            if(this.readyState == 4 && this.status == 200) {
                var TotalSales = JSON.parse(this.response);
                let samount = TotalSales.amount;
                let scurrency = TotalSales.currency;
                let speriod = TotalSales.period;
                $("#total-sales-amount").text(samount + " " + scurrency);
                $("#total-sales-period").text(speriod);
  
                
  
            }
    
        };
        request.open("GET", "https://fe18.azurewebsites.net/api/totalsales");
        request.send();
      }
    });


    // Blue boxerino

      if($("#total-purchases-amount").length) {
        var request = new XMLHttpRequest(); 
      
        request.onload = function () {
            if(this.readyState == 4 && this.status == 200) {
                let TotalPurchases = JSON.parse(this.response);
                let pamount = TotalPurchases.amount;
                let pcurrency = TotalPurchases.currency;
                let pperiod = TotalPurchases.period;
                $("#total-purchases-amount").text(pamount + " " + pcurrency);
                $("#total-purchases-period").text(pperiod);
  
                
  
            }
    
        };
        request.open("GET", "https://fe18.azurewebsites.net/api/totalpurchases");
        request.send();
      }

      
// Red boxerino

if($("#total-orders-amount").length) {
  var request = new XMLHttpRequest(); 

  request.onload = function () {
      if(this.readyState == 4 && this.status == 200) {
          var TotalOrders = JSON.parse(this.response);
          let oamount = TotalOrders.amount;
          let ocurrency = TotalOrders.currency;
          let operiod = TotalOrders.period;
          $("#total-orders-amount").text(oamount + " " + ocurrency);
          $("#total-orders-period").text(operiod);

          

      }

  };
  request.open("GET", "https://fe18.azurewebsites.net/api/totalorders");
  request.send();
}

// Yellow boxerino

if($("#total-growth-amount").length) {
  var request = new XMLHttpRequest(); 

  request.onload = function () {
      if(this.readyState == 4 && this.status == 200) {
          var TotalGrowth = JSON.parse(this.response);
          let gamount = TotalGrowth.amount;
          let gcurrency = TotalGrowth.currency;
          let gperiod = TotalGrowth.period;
          $("#total-growth-amount").text(gamount + " " + gcurrency);
          $("#total-growth-period").text(gperiod);

          

      }

  };
  request.open("GET", "https://fe18.azurewebsites.net/api/totalgrowth");
  request.send();
}


 // Distri bror
 if ($("#distribution-chart").length) {
  var request = new XMLHttpRequest();
        let disChart;
        let disLabels;
        let disDataSets;
        let disCity;

  request.onload = function () {
      if(this.readyState == 4 && this.status == 200){

        disChart = JSON.parse(this.response);
         
        disLabels = disChart.labels;
        disDataSets = disChart.datasets[0].data;
        disCity = disChart.datasets[0].city;

        var areaData = {
          labels: disLabels,
          datasets: [{
              data: disDataSets,
              backgroundColor: [
                "#3da5f4", "#f1536e", "#fda006"
              ],
              borderColor: "rgba(0,0,0,0)"
            }
          ]
        };
        var areaOptions = {
          responsive: true,
          maintainAspectRatio: true,
          segmentShowStroke: false,
          cutoutPercentage: 72,
          elements: {
            arc: {
                borderWidth: 4
            }
          },      
          legend: {
            display: false
          },
          tooltips: {
            enabled: true
          },
          legendCallback: function(chart) {
            var text = [];
            text.push('<div class="distribution-chart">');
            let i = 0;
            disCity.forEach(element => {
              text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[i] + '"></div>');
              text.push(`<p>${element}</p>`);
              text.push('</div>');
              i++;
            });
            text.push('</div>');
            return text.join("");
          },
        }
        var distributionChartPlugins = {
          beforeDraw: function(chart) {
            var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;
       
            ctx.restore();
            var fontSize = .96;
            ctx.font = "600 " + fontSize + "em sans-serif";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000";
       
            var text = "70%",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
       
            ctx.fillText(text, textX, textY);
            ctx.save();
          }
        }
        var distributionChartCanvas = $("#distribution-chart").get(0).getContext("2d");
        var distributionChart = new Chart(distributionChartCanvas, {
          type: 'doughnut',
          data: areaData,
          options: areaOptions,
          plugins: distributionChartPlugins
        });
        document.getElementById('distribution-legend').innerHTML = distributionChart.generateLegend();
      }

      }
  };
      request.open("GET", "https://fe18.azurewebsites.net/api/distributionchart", true);
      request.send();

//total Sales Chart

    if ($("#total-sales-chart").length) {
        var request = new XMLHttpRequest(); 
      
        request.onload = function () {
            if(this.readyState == 4 && this.status == 200) {
                var TotalsalesChart  = JSON.parse(this.response);
                let revenue = TotalsalesChart.revenue;
                let returns = TotalsalesChart.returns;
                let queries = TotalsalesChart.queries;
                let invoices = TotalsalesChart.invoices;
                let days = TotalsalesChart.labels;
                let servicesdata = TotalsalesChart.datasets[0].data;
                let serviceslabel = TotalsalesChart.datasets[0].label;
                let productdata = TotalsalesChart.datasets[1].data;
                let productlabel = TotalsalesChart.datasets[1].label;

                $("#revenue").text(revenue);
                $("#returns").text(returns);
                $("#queries").text(queries);
                $("#invoices").text(invoices);



                var areaData = {
                  labels: days,
                  datasets: [
                    {
                      data: servicesdata,
                      backgroundColor: [
                        'rgba(61, 165, 244, .0)'
                      ],
                      borderColor: [
                        'rgb(61, 165, 244)'
                      ],
                      borderWidth: 2,
                      fill: 'origin',
                      label: serviceslabel
                    },
                    {
                      data: productdata,
                      backgroundColor: [
                        'rgba(241, 83, 110, .0)'
                      ],
                      borderColor: [
                        'rgb(241, 83, 110)'
                      ],
                      borderWidth: 2,
                      fill: 'origin',
                      label: productlabel
                    }
                  ]
                };
                var areaOptions = {
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    filler: {
                      propagate: false
                    }
                  },
                  scales: {
                    xAxes: [{
                      display: true,
                      ticks: {
                        display: true,
                        padding: 20,
                        fontColor:"#000",
                        fontSize: 14
                      },
                      gridLines: {
                        display: false,
                        drawBorder: false,
                        color: 'transparent',
                        zeroLineColor: '#eeeeee'
                      }
                    }],
                    yAxes: [{
                      display: true,
                      ticks: {
                        display: true,
                        autoSkip: false,
                        maxRotation: 0,
                        stepSize: 100,
                        fontColor: "#000",
                        fontSize: 14,
                        padding: 18,
                        stepSize: 100000,
                        callback: function(value) {
                          var ranges = [
                              { divider: 1e6, suffix: 'M' },
                              { divider: 1e3, suffix: 'k' }
                          ];
                          function formatNumber(n) {
                              for (var i = 0; i < ranges.length; i++) {
                                if (n >= ranges[i].divider) {
                                    return (n / ranges[i].divider).toString() + ranges[i].suffix;
                                }
                              }
                              return n;
                          }
                          return formatNumber(value);
                        }
                      },
                      gridLines: {
                        drawBorder: false
                      }
                    }]
                  },
                  legend: {
                    display: false
                  },
                  tooltips: {
                    enabled: true
                  },
                  elements: {
                    line: {
                      tension: .37
                    },
                    point: {
                      radius: 0
                    }
                  }
                }
                var revenueChartCanvas = $("#total-sales-chart").get(0).getContext("2d");
                var revenueChart = new Chart(revenueChartCanvas, {
                  type: 'line',
                  data: areaData,
                  options: areaOptions
                });
                
    
            }
    
        };
        request.open("GET", "https://fe18.azurewebsites.net/api/totalsaleschart");
        request.send();
      
    
      
    }
      var request = new XMLHttpRequest(); 
      if ($("#users-chart").length) {
      request.onload = function () {
          if(this.readyState == 4 && this.status == 200) {
              var userschart = JSON.parse(this.response);
              
              let users = userschart.users;
              let growth = userschart.growth;
              let labels = userschart.labels;
              let datasetdata = userschart.datasets[0].data;
              let datasetlabel = userschart.datasets[0].data;
            
              $("#userschart").text(users);
              $("#growthchart").text(growth);




              
                var areaData = {
                  labels: labels,
                  datasets: [{
                      data: datasetdata,
                      backgroundColor: [
                        '#e0fff4'
                      ],
                      borderWidth: 2,
                      borderColor: "#00c689",
                      fill: 'origin',
                      label: datasetlabel
                    }
                  ]
                };
                var areaOptions = {
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    filler: {
                      propagate: false
                    }
                  },
                  scales: {
                    xAxes: [{
                      display: false,
                      ticks: {
                        display: true
                      },
                      gridLines: {
                        display: false,
                        drawBorder: false,
                        color: 'transparent',
                        zeroLineColor: '#eeeeee'
                      }
                    }],
                    yAxes: [{
                      display: false,
                      ticks: {
                        display: true,
                        autoSkip: false,
                        maxRotation: 0,
                        stepSize: 100,
                        min: 0,
                        max: 300
                      },
                      gridLines: {
                        drawBorder: false
                      }
                    }]
                  },
                  legend: {
                    display: false
                  },
                  tooltips: {
                    enabled: true
                  },
                  elements: {
                    line: {
                      tension: .35
                    },
                    point: {
                      radius: 0
                    }
                  }
                }
                var salesChartCanvas = $("#users-chart").get(0).getContext("2d");
                var salesChart = new Chart(salesChartCanvas, {
                  type: 'line',
                  data: areaData,
                  options: areaOptions
                });
              
  
          }
  
      };
      request.open("GET", "https://fe18.azurewebsites.net/api/userschart");
      request.send();
    }
    

    if($("#total-sales-amount").length) {
      var request = new XMLHttpRequest(); 
    
      request.onload = function () {
          if(this.readyState == 4 && this.status == 200) {
              var projectchart = JSON.parse(this.response);
              
              let projectprocent = projectchart.procent;
              let projectgrowth = projectchart.growth;
              let labels = projectchart.labels;
              let datasetdata = projectchart.datasets[0].data;
              let datasetlabel = projectchart.datasets[0].data;
            
              $("#projectprocent").text(projectprocent);
              $("#projectgrowth").text(projectgrowth);
  
              if ($("#projects-chart").length) {
                var areaData = {
                  labels: labels,
                  datasets: [{
                      data: datasetdata,
                      backgroundColor: [
                        '#e5f2ff'
                      ],
                      borderWidth: 2,
                      borderColor: "#3da5f4",
                      fill: 'origin',
                      label: datasetlabel
                    }
                  ]
                };
                var areaOptions = {
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    filler: {
                      propagate: false
                    }
                  },
                  scales: {
                    xAxes: [{
                      display: false,
                      ticks: {
                        display: true
                      },
                      gridLines: {
                        display: false,
                        drawBorder: false,
                        color: 'transparent',
                        zeroLineColor: '#eeeeee'
                      }
                    }],
                    yAxes: [{
                      display: false,
                      ticks: {
                        display: true,
                        autoSkip: false,
                        maxRotation: 0,
                        stepSize: 100,
                        min: 0,
                        max: 300
                      },
                      gridLines: {
                        drawBorder: false
                      }
                    }]
                  },
                  legend: {
                    display: false
                  },
                  tooltips: {
                    enabled: true
                  },
                  elements: {
                    line: {
                      tension: .05
                    },
                    point: {
                      radius: 0
                    }
                  }
                }
                var salesChartCanvas = $("#projects-chart").get(0).getContext("2d");
                var salesChart = new Chart(salesChartCanvas, {
                  type: 'line',
                  data: areaData,
                  options: areaOptions
                });
              }
          
  
          }
      
      };

      
      request.open("GET", "https://fe18.azurewebsites.net/api/projectschart");
      request.send();
    }
  


    if($("#total-sales-amount").length) {
      var request = new XMLHttpRequest(); 
    
      request.onload = function () {
          if(this.readyState == 4 && this.status == 200) {
              var download = JSON.parse(this.response);
              
              let downloadoffline = download.offline;
              let downloadonline = download.online;

              $("#downloadoffline").text(downloadoffline);
              $("#downloadonline").text(downloadonline);

              if ($('#offlineProgress').length) {
                var bar = new ProgressBar.Circle(offlineProgress, {
                  color: '#000',
                  // This has to be the same size as the maximum width to
                  // prevent clipping
                  strokeWidth: 6,
                  trailWidth: 6,
                  easing: 'easeInOut',
                  duration: 1400,
                  text: {
                    autoStyleContainer: true,
                    style : {
                      color : "#fff",
                      position: 'absolute',
                      left: '40%',
                      top: '50%'
                    }
                  },
                  svgStyle: {
                    width: '90%'
                  },
                  from: {
                    color: '#f1536e',
                    width: 6
                  },
                  to: {
                    color: '#f1536e',
                    width: 6
                  },
                  // Set default step function for all animate calls
                  step: function(state, circle) {
                    circle.path.setAttribute('stroke', state.color);
                    circle.path.setAttribute('stroke-width', state.width);
            
                    var value = Math.round(circle.value() * 100);
                    if (value === 0) {
                      circle.setText('');
                    } else {
                      circle.setText(value);
                    }
            
                  }
                });
            
                bar.text.style.fontSize = '1rem';
                bar.animate(downloadoffline); // Number from 0.0 to 1.0
              }
          
              if ($('#onlineProgress').length) {
                var bar = new ProgressBar.Circle(onlineProgress, {
                  color: '#000',
                  // This has to be the same size as the maximum width to
                  // prevent clipping
                  strokeWidth: 6,
                  trailWidth: 6,
                  easing: 'easeInOut',
                  duration: 1400,
                  text: {
                    autoStyleContainer: true,
                    style : {
                      color : "#fff",
                      position: 'absolute',
                      left: '40%',
                      top: '50%'
                    }
                  },
                  svgStyle: {
                    width: '90%'
                  },
                  from: {
                    color: '#fda006',
                    width: 6
                  },
                  to: {
                    color: '#fda006',
                    width: 6
                  },
                  // Set default step function for all animate calls
                  step: function(state, circle) {
                    circle.path.setAttribute('stroke', state.color);
                    circle.path.setAttribute('stroke-width', state.width);
            
                    var value = Math.round(circle.value() * 100);
                    if (value === 0) {
                      circle.setText('');
                    } else {
                      circle.setText(value);
                    }
            
                  }
                });
            
                bar.text.style.fontSize = '1rem';
                bar.animate(downloadonline); // Number from 0.0 to 1.0
              }
              
  
          }
  
      };
      request.open("GET", "https://fe18.azurewebsites.net/api/downloads");
      request.send();
    }
  

    

    if ($("#revenue-chart").length) {
      var CurrentChartCanvas = $("#revenue-chart").get(0).getContext("2d");
      var CurrentChart = new Chart(CurrentChartCanvas, {
        type: 'bar',
        data: {
          labels: ["1982","","1993", "", "2003", "", "2013"],
          datasets: [{
              label: 'Europe',
              data: [280000, 90000, 150000, 200000, 50000, 150000, 260000, 150000, 260000],
              backgroundColor: '#405189'
            },
            {
              label: 'Africa',
              data: [250000, 230000, 130000, 160000, 110000, 230000, 50000, 230000, 50000],
              backgroundColor: '#3da5f4'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          },
          scales: {
            yAxes: [{
              display: true,
              gridLines: {
                drawBorder: false
              },
              ticks: {
                fontColor: "#000",
                display: true,
                fontStyle: 400,
                fontSize: 14,
                stepSize: 100000,
                callback: function(value) {
                  var ranges = [
                      { divider: 1e6, suffix: 'M' },
                      { divider: 1e3, suffix: 'k' }
                  ];
                  function formatNumber(n) {
                      for (var i = 0; i < ranges.length; i++) {
                        if (n >= ranges[i].divider) {
                            return (n / ranges[i].divider).toString() + ranges[i].suffix;
                        }
                      }
                      return n;
                  }
                  return formatNumber(value);
                }
              }
            }],
            xAxes: [{
              stacked: false,
              categoryPercentage: .5,
              barPercentage: 1,
              ticks: {
                beginAtZero: true,
                fontColor: "#000",
                display: true,
                fontSize: 14
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                display: true
              },
            }]
          },
          legend: {
            display: false
          },
          elements: {
            point: {
              radius: 0
            }
          }
        }
      });
    }

    
    if ($("#sale-report-chart").length) {


      if($("#total-sales-amount").length) {
        var request = new XMLHttpRequest(); 
      
        request.onload = function () {
            if(this.readyState == 4 && this.status == 200) {
                var SaleReport = JSON.parse(this.response);
                
              let months = SaleReport.labels;
              let place = SaleReport.datasets[0].label;
              let data = SaleReport.datasets[0].data;

                var CurrentChartCanvas = $("#sale-report-chart").get(0).getContext("2d");
      var CurrentChart = new Chart(CurrentChartCanvas, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [{
              label: place,
              data: data,
              backgroundColor: ["#3da5f4","#e0f2ff","#3da5f4","#e0f2ff","#3da5f4","#e0f2ff","#3da5f4","#e0f2ff","#3da5f4","#e0f2ff","#3da5f4"]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          },
          scales: {
            yAxes: [{
              display: true,
              gridLines: {
                drawBorder: false
              },
              ticks: {
                fontColor: "#000",
                display: true,
                padding: 20,
                fontSize: 14,
                stepSize: 10000,
                callback: function(value) {
                  var ranges = [
                      { divider: 1e6, suffix: 'M' },
                      { divider: 1e3, suffix: 'k' }
                  ];
                  function formatNumber(n) {
                      for (var i = 0; i < ranges.length; i++) {
                        if (n >= ranges[i].divider) {
                            return (n / ranges[i].divider).toString() + ranges[i].suffix;
                        }
                      }
                      return n;
                  }
                  return "$" + formatNumber(value);
                }
              }
            }],
            xAxes: [{
              stacked: false,
              categoryPercentage: .6,
              ticks: {
                beginAtZero: true,
                fontColor: "#000",
                display: true,
                padding: 20,
                fontSize: 14
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                display: true
              },
              barPercentage: .7
            }]
          },
          legend: {
            display: false
          },
          elements: {
            point: {
              radius: 0
            }
          }
        }
      });
    
                
    
            }
    
        };
        request.open("GET", "https://fe18.azurewebsites.net/api/salereportchart");
        request.send();
      }
    //Sale Report Overview

    if($("#download").length) {
      var request = new XMLHttpRequest(); 
    
      request.onload = function () {
          if(this.readyState == 4 && this.status == 200) {
              var salesreportow = JSON.parse(this.response);
              
              let download = salesreportow.downloads;
              let purchase = salesreportow.försäljning;
              let users = salesreportow.users;
              let growth = salesreportow.growth;
              $("#download").text(download);
              $("#purchase").text(purchase);
              $("#users").text(users);
              $("#growth").text(growth);

  
              
  
          }
  
      };
      request.open("GET", "https://fe18.azurewebsites.net/api/salesreportoverview");
      request.send();
    }

    if($("#total-sales-amount").length) {
      var request = new XMLHttpRequest(); 
    
      request.onload = function () {
          if(this.readyState == 4 && this.status == 200) {
              var updates = JSON.parse(this.response);
              let iUpdates = updates.updates;

            

              iUpdates.forEach(updates =>   {

                let UStatus = 
                `
                <li>
                      <h6> ${updates.title}</h6>
                      <p class="mt-2">${updates.description}</p>
                      <p class="text-muted mb-4">
                        <i class="mdi mdi-clock-outline"></i>
                        ${updates.time}
                      </p>
                    </li>
                    
                `

                $("#xrUpdates").append(UStatus);

              })
  
          }
  
      };
      request.open("GET", "https://fe18.azurewebsites.net/api/updates");
      request.send();
    }
  

      if($("#total-sales-amount").length) {
      var request = new XMLHttpRequest(); 
    
      request.onload = function () {
          if(this.readyState == 4 && this.status == 200) {
              var invoices = JSON.parse(this.response);
              let inList = invoices.invoices;



              inList.forEach(invoices =>    { 

                let CStatus;

                switch (invoices.status) {
                  case "Pågående":
                    CStatus = "success";
                    break;
                  case "Öppen":
                    CStatus = "warning";
                    break;
                  case "Tillfälligt stoppad":
                    CStatus = "danger";
                    break;
                }

                let updateCard = 
                      ` <tr>
                          <td>${invoices.invoicenumber}</td>
                          <td>${invoices.customer}</td>
                          <td>${invoices.shipping}</td>
                          <td class="font-weight-bold">${invoices.totalprice}</td>
                          <td>${invoices.customerprice}</td>
                          <td>
                            <div class="badge badge-${CStatus} badge-fw">${invoices.status}</div>
                          </td>
                        </tr> `
                  $("#InStatus").append(updateCard);


               });
              
              

              

              

  
              
  
          }
  
      };
      request.open("GET", "https://fe18.azurewebsites.net/api/openinvoices");
      request.send();
    }
  
    if($("#total-sales-amount").length) {
      var request = new XMLHttpRequest(); 
    
      request.onload = function () {
          if(this.readyState == 4 && this.status == 200) {
              var tickets = JSON.parse(this.response);
              let inList = invoices.invoices;



              inList.forEach(invoices =>    { 

                let CStatus;

                switch (invoices.status) {
                  case "Pågående":
                    CStatus = "success";
                    break;
                  case "Öppen":
                    CStatus = "warning";
                    break;
                  case "Tillfälligt stoppad":
                    CStatus = "danger";
                    break;
                }

                let updateCard = 
                      ` <tr>
                          <td>${invoices.invoicenumber}</td>
                          <td>${invoices.customer}</td>
                          <td>${invoices.shipping}</td>
                          <td class="font-weight-bold">${invoices.totalprice}</td>
                          <td>${invoices.customerprice}</td>
                          <td>
                            <div class="badge badge-${CStatus} badge-fw">${invoices.status}</div>
                          </td>
                        </tr> `
                  $("#InStatus").append(updateCard);


               });
              
              

              

              

  
              
  
          }
  
      };
      request.open("GET", "https://fe18.azurewebsites.net/api/openinvoices");
      request.send();
    }

    }
  });
})(jQuery);