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

function getEarningsDifference(salary1, salary2, years) {
  var totalSalary1 = getLifetimeEarnings(salary1,years),
    totalSalary2 = getLifetimeEarnings(salary2,years);

    return accounting.formatMoney(totalSalary1 - totalSalary2); 
}

$('.same-job-ten-years .total-earnings').append(getEarningsDifference(45000,40000,10));

$('.same-job-different-salary .total-earnings').append(getEarningsDifference(45000,40000,42));

$('.changing-jobs .total-earnings').append(getEarningsDifferenceWithSwitches(45000, 40000, 42));

function getEarningsDifferenceWithSwitches(salary1, salary2, years, frequency, negotiatedPercentage) {
  var totalSalary1 = getLifetimeEarningsFromSwitching(salary1,years),
    totalSalary2 = getLifetimeEarningsFromSwitching(salary2,years);

    return accounting.formatMoney(totalSalary1 - totalSalary2); 
}

function getLifetimeEarningsFromSwitching(salary, years, frequency, negotiatedPercentage) {
  lifetimeEarnings = [salary];
  counter = 0;

  while (counter < years -1) {
    lastSalary = lifetimeEarnings[lifetimeEarnings.length-1];
    if (counter % 3 == 0) {
      var newJobSalary = lastSalary + lastSalary * .1;
      if (negotiatedPercentage) {
        newJobSalary = newJobSalary * negotiatedPercentage;
      }
      lifetimeEarnings.push(newJobSalary);
    }
    else {
      lifetimeEarnings.push(lastSalary + lastSalary * .03);
    }
    counter++;
    console.log(counter);
  }
  var totalLifetimeEarnings = _.reduce(lifetimeEarnings, function(memo, num){
    return memo + num;
  });
  console.log("lifetimeEarnings", totalLifetimeEarnings);

  return totalLifetimeEarnings;
}

function getLifetimeEarnings(salary, years) {
  lifetimeEarnings = [salary];
  counter = 0;

  while (counter < years -1) {
    lastSalary = lifetimeEarnings[lifetimeEarnings.length-1];
    lifetimeEarnings.push(lastSalary + lastSalary * .03);
    counter++;
    console.log(counter);
  }
  var totalLifetimeEarnings = _.reduce(lifetimeEarnings, function(memo, num){
    return memo + num;
  });
  console.log("lifetimeEarnings", totalLifetimeEarnings);

  return totalLifetimeEarnings;
}


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

function formatEarningsOverTime(salary, years) {
  return accounting.formatMoney(getLifetimeEarnings(salary, years));
}

function formatEarningsWithChangesOverTime(salary, years) {
  return accounting.formatMoney(getLifetimeEarningsFromSwitching(salary, years));
}

var msEarnings = {decade: formatEarningsOverTime(40000, 10),
                  lifetime: formatEarningsOverTime(40000, 42),
                  lifetimeChanges: formatEarningsWithChangesOverTime(40000, 42)};
var mrEarnings = {decade: formatEarningsOverTime(45000, 10),
                  lifetime: formatEarningsOverTime(45000, 42),
                  lifetimeChanges: formatEarningsWithChangesOverTime(45000, 42)};

console.log('ms: ', msEarnings.decade, 'mr: ', mrEarnings.decade);


function updateEarnings(employeeSelector, animationSelector, updatedEarnings) {
  $(employeeSelector).text(updatedEarnings);

  if (!$(employeeSelector).hasClass(animationSelector)) {
    $(employeeSelector).animateCSS('bounce')
                       .addClass(animationSelector)
                       .css('color', 'green');
  }
}

$(window).bind('scroll', function() {
      // console.log("scrollTop: ", $(document).scrollTop());
      // console.log("image top:", $('img').first().offset().top);
      // console.log("starting salary top: ", $('.starting-salary').offset().top);

      var section = $('.intro-employees'),
          section2 = $('.starting-salary'),
          section3 = $('.man-negotiates'),
          section4 = $('.same-job-ten-years'),
          section5 = $('.same-job-different-salary'),
          section6 = $('.changing-jobs'),
          section7 = $('.question'),
          chartTime = $('.chart-time'),
          employees = $('img'),
          employeesPosition = employees.first().offset().top;

      // console.log("section2", section2.first().offset().top, "image", $('img').first().offset().top);

      console.log("3:", section3.first().offset().top, "employeesPosition", employeesPosition, "4:", section4.first().offset().top);

      if (employeesPosition > section.first().offset().top && employeesPosition < section2.first().offset().top) {
        $('section').css('visibility', 'hidden');
        section.css('visibility', 'visible');
      }

      else if (employeesPosition > section2.first().offset().top && employeesPosition < section3.first().offset().top) {
        $('section').css('visibility', 'hidden');
        section2.css('visibility', 'visible');
        $('.ms-salary').text('$40,000').css('color', 'black').removeClass('activated-animation-1 activated-animation-2 activated-animation-3');
        $('.mr-salary').text('$40,000').css('color', 'black').removeClass('activated-animation-1 activated-animation-2 activated-animation-3');
      }


      else if (employeesPosition > section3.first().offset().top && employeesPosition < section4.first().offset().top) {
        console.log("Man negotiates!");
        $('section').css('visibility', 'hidden');
        section3.css('visibility', 'visible');


        updateEarnings('.mr-salary', 'activated-animation-1', '$44,000');
      }


      else if (employeesPosition > section4.first().offset().top && employeesPosition < section5.first().offset().top) {
        console.log("starting1");
        $('section').css('visibility', 'hidden');
        section4.css('visibility', 'visible');

        updateEarnings('.mr-salary', 'activated-animation-2', mrEarnings.decade);
        updateEarnings('.ms-salary', 'activated-animation-2', msEarnings.decade);

        $('.mr-salary').text(mrEarnings.decade);

      }


      else if (employeesPosition > section5.first().offset().top && employeesPosition < section6.first().offset().top) {
        $('section').css('visibility', 'hidden');
        section5.css('visibility', 'visible');
        // $('.mr-salary').text('$40,000').css('color', 'black').removeClass('activated-animation');
        $('.mr-salary').text(mrEarnings.lifetime);

        updateEarnings('.mr-salary', 'activated-animation-3', mrEarnings.lifetime);
        updateEarnings('.ms-salary', 'activated-animation-3', msEarnings.lifetime);
      }

      else if (employeesPosition > section6.first().offset().top + 100 && employeesPosition < section7.first().offset().top) {
        console.log("starting");
        $('section').css('visibility', 'hidden');
        section6.css('visibility', 'visible');

        updateEarnings('.mr-salary', 'activated-animation-4', mrEarnings.lifetimeChanges);
        updateEarnings('.ms-salary', 'activated-animation-4', msEarnings.lifetimeChanges);
      }

      // else {
      //   $('.fixed-item').removeClass('fixed-item');
      //   $('.fixed-heading').removeClass('fixed-heading');
      // }
      





      // else if (employeesPosition > section4.first().offset().top && employeesPosition < sectionfirst().offset().top) {
      //   $('section').css('visibility', 'hidden');
      //   section4.css('visibility', 'visible');

      // }



      // if($(document).scrollTop() > 0 && $(document).scrollTop < $('.starting-salary').offset().top) {
      //   // $('section').hide();
      //   console.log("hide?");
      //   // $('body').hide();
      //   $('.intro-employees').css('visibility', 'visible');
      // } else if( $(document).scrollTop() > $('.starting-salary').offset().top  && $(document).scrollTop() < $('.man-negotiates').offset().top + 300) {
      //   console.log("starting salary visible");
      //   $('section').css('visibility', 'hidden');
      //   $('.starting-salary').css('visibility', 'visible');

      // } else {
      //     // $('section').hide();
      //     $('.starting-salary').css('visibility', 'hidden');
      //     $('.man-negotiates').css('visibility', 'visible');
      // }

        // if($(window).scrollTop() >= $('.intro-employees').offset().top + $('.intro-employees').outerHeight() - window.innerHeight) {
        //   $('.employees-container').removeClass('fixed-item', 500);
        //   console.log("remove fixed");
        // }

        // if($(window).scrollTop() <= $('.intro-employees').offset().top + $('.intro-employees').outerHeight() - window.innerHeight) {
        //   $('.employees-container').addClass('fixed-item', 500);
        // }


        if($(window).scrollTop() >= $('.question').offset().top + $('.question').outerHeight() - window.innerHeight) {
          // $('.employees-container').removeClass('fixed-item', 500);
        }

        if($(window).scrollTop() <= $('.question').offset().top + $('.question').outerHeight() - window.innerHeight) {
          // $('.employees-container').addClass('fixed-item', 500);
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