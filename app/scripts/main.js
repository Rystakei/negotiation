console.log('\'Allo \'Allo!');

$('.employee-type').append("Male");


var data = {
  // A labels array that can contain any sort of values
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  // Our series array that contains series objects or in this case series data arrays
  series: [
    [1, 2, 3, 4, 5]
  ]
};

var negotiationChart;

// function fakeData() {
// 	var salaries = [];
// 	var startingAge = Number($('.start-age input').val());
// 	var retirementAge = Number($('.retirement-age input').val()); 
// 	var workingYears = retirementAge - startingAge;
// 	var startingSalary = Number($('.starting-salary input').val()),
//     jobChangeRate = Number($('.change-rate input').val()),
// 		negotiatedIncrease = Number($('.negotiation-percentage input').val())/100,
// 		costOfLivingIncrease =  0.03,
//     currentSalary;

// 	for (var i = 0; i < workingYears; i++) {
// 		if (i === 0) {
// 			currentSalary = startingSalary;
// 		} 
// 		else if (i % jobChangeRate === 0) {
// 			console.log("Whoo hoo new job");
// 			currentSalary = currentSalary + currentSalary * negotiatedIncrease;
// 		} 
// 		else {
// 			currentSalary = currentSalary + currentSalary * costOfLivingIncrease;
// 		}
// 		console.log("currentSalary", currentSalary);
// 		if (i === 0 || i % 5) {		
// 			salaries.push(currentSalary);
// 		}
// 	}
// 	console.log(salaries, salaries.length);
// 	return salaries;
// }

// function fakeFlatData() {
// 	var salaries = [];
// 	var startingAge = 22;
// 	var retirementAge = 65; 
// 	var workingYears = retirementAge - startingAge;
// 	var startingSalary = 50000;
// 	var years = 10,
// 		negotiatedIncrease = 0.15,
// 		costOfLivingIncrease = 0.03;

// 	for (i = 0; i < workingYears; i++) {
// 		if (i === 0) {
// 			currentSalary = startingSalary;
// 		} 
// 		else {
// 			currentSalary = currentSalary + currentSalary * costOfLivingIncrease;
// 		}
// 		console.log("currentSalary", currentSalary);
// 		if (i === 0 || i % 5) {		
// 			salaries.push(currentSalary);
// 		}
// 	}
// 	console.log(salaries, salaries.length);
// 	return salaries;

// }
// var series = fakeData();
// var flatSeries = fakeFlatData();

// var data = {
//   // A labels array that can contain any sort of values
//   // Our series array that contains series objects or in this case series data arrays
//   series: [series]
// };

var femaleSeries = createData(30000).salaries,
    maleSeries = createData(35000).salaries,
    labels = createData(300000).labels;

function createData(startingSalary) {
  var workingYears = 65 - 22,
      currentSalary = startingSalary,
      salaries = [],
      labels = [];

  for (i = 0; i < workingYears; i++) {
    currentSalary = currentSalary * 1.03;
    if (i % 10 === 0) {
      labels.push(22 + i);
      salaries.push(currentSalary);
    }
  }
  var salaryData = {labels: labels, salaries: salaries};
  return salaryData;
}


function addChart() {

  options = {
    showLine: true,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return value;
      }
    },
    plugins: [
      Chartist.plugins.tooltip({currency: undefined})
    ]
  };


  responsiveOptions = [
    ['screen and (min-width: 640px)', {
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 10 === 0 ? value : null;
        },
        showGrid: false,
        showLabel: false
      }
    }],
    ['screen and (max-width: 640px)', {
        axisX: {
          labelInterpolationFnc: function (value) {
          	return index % 30 === 0 ? value : null;
          },
          showGrid: false,
          showLabel: false
        }
      }
    ]
  ];

  negotiationChart = new Chartist.Line('.ct-chart', {
  labels: labels,
  series: [
    femaleSeries,
    maleSeries
  ]
}, {
  fullWidth: true,
  // As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
  axisY: {
    onlyInteger: true,
    offset: 20
  }
});
}

addChart();


$(window).bind('scroll', function() {
      console.log("scrollTop: ", $(document).scrollTop());

      if($(document).scrollTop() > 100){
        $('.intro-employees').show();
        $('.starting-salary').hide();
    
      } else {
          $('.intro-employees').hide();
          $('.starting-salary').show();
      }

        if($(window).scrollTop() >= $('.intro-employees').offset().top + $('.intro-employees').outerHeight() - window.innerHeight) {
          $('.employees-container').removeClass('fixed-item', 500);
          console.log("remove fixed");
        }

        if($(window).scrollTop() <= $('.intro-employees').offset().top + $('.intro-employees').outerHeight() - window.innerHeight) {
          $('.employees-container').addClass('fixed-item', 500);
        }


        if($(window).scrollTop() >= $('.question').offset().top + $('.question').outerHeight() - window.innerHeight) {
          $('.employees-container').removeClass('fixed-item', 500);
        }

        if($(window).scrollTop() <= $('.question').offset().top + $('.question').outerHeight() - window.innerHeight) {
          $('.employees-container').addClass('fixed-item', 500);
        }
});



$('input').on('keyup', function() {
  var that = this,
      modifiedSeries= fakeData();


      var data = {
  // A labels array that can contain any sort of values
  // Our series array that contains series objects or in this case series data arrays
  labels: modifiedSeries,
  series: [modifiedSeries]
};
  console.log("updating..");
  negotiationChart.update({labels: modifiedSeries, series: [modifiedSeries]});
});