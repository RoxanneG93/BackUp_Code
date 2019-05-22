
var momentFormat = 'DD.MM.YYYY';
var format = 'd.m.Y';
var altFormat = 'j. F Y';
var preparationDays = 2;
var disabledDays = [];
var i = 0;
var calendar = '';
var multipleClicks = 0;
var openNextPicker = 1;

$('.calender-btn').click( function() {
  calendar = $(this).children('input').attr('id');  
});



var enumerateDaysBetweenDates = function(startDate, endDate) {
    var dates = [];
    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');
    while(currDate.add(1, 'days').diff(lastDate) < 0) {
        var date = moment(currDate.clone().toDate());
        disabledDays.push(date.format(momentFormat));
        dates.push( {bookedStart: startDate.format(momentFormat), booked: date.format(momentFormat), bookedEnd: endDate.format(momentFormat)});
    }
    return dates;
};

// booked days
var booked = [{from: "24.07.2018",to: "28.07.2018"},{from: "06.08.2018",to: "09.08.2018"},{from: "09.08.2018",to: "12.08.2018"},{from: "16.08.2018",to: "19.08.2018"},{from: "19.08.2018",to: "31.08.2018"}];

var bookedDatesArr = [];
$.each(booked, function (i,v) {
  var from = moment(v.from,momentFormat);
  var to = moment(v.to,momentFormat);
  bookedDatesArr.push(enumerateDaysBetweenDates(from,to));
});
bookedDates = [].concat.apply([], bookedDatesArr);

config = {
  mode: "range",
  animate: true,
  altInput: true,
  altFormat: altFormat,
  dateFormat: format,
  firstDayOfWeek: 1,
  enableTime: true,
  rangeSeparator: ' -> ',
  locale: {
    firstDayOfWeek: 1,
    rangeSeparator: ' -> '
  },
  minDate: new Date().fp_incr(preparationDays),
 //maxDate: new Date().fp_incr(maxBookingDays),
  disable: disabledDays,
  onDayCreate: function(dObj, dStr, fp, dayElem) {
    // Utilize dayElem.dateObj, which is the corresponding Date
    var day = moment(dayElem.dateObj).format(momentFormat);
  
    $.each(bookedDates, function(i,v){
      if(day == v.bookedStart) {
        $(dayElem).addClass('bookedStart');   
      } 
      else if(day == v.booked) {
        $(dayElem).addClass('booked');   
      } 
      else if(day == v.bookedEnd) {
        $(dayElem).addClass('bookedEnd');   
      }
    });
  },
  onReady: function ( dateObj, dateStr, instance ) {
    $('.clear-calendar').on( 'click', () => {
      picker1.clear();
      picker2.clear();
      availability.clear();
      picker1.close();
    });
    $('.open-calendar').on( 'click', () => {
      picker1.open();
    });
  },
  onChange: function(selectedDates, dateStr, instance) {
    availability.setDate(selectedDates);
    //console.log(availability);
    var elem = instance.element;
    var calendar = $(elem).attr('id');
    var checkIn = '';
    var checkOut = '';
    if(selectedDates[0]) {
       checkIn = flatpickr.formatDate(selectedDates[0], altFormat);
    }
    if(selectedDates[1]) {
       checkOut = flatpickr.formatDate(selectedDates[1], altFormat);
    }
    instance.close();
    
    if(calendar == 'check-in') {
      $('#check-in').next().val(checkIn);
      picker2.setDate(selectedDates);
      if(checkOut == '') { 
        picker2.open();
      } else {
        $('#check-out').next().val(checkOut);
      }
      calendar == 'check-out';
    } 
    else if(calendar == 'check-out') {
      picker1.setDate(selectedDates);
      $('#check-out').next().val(checkOut);
      $('#check-in').next().val(checkIn);
      if(checkOut == '') {
         picker2.setDate(selectedDates);
         picker2.close();
         picker1.open();
      }
    }
    
      if(picker1.altInput.value == picker2.altInput.value) {
        //alert('Please choose differecnt star- and enddate!');           
        setTimeout( function() {
          picker1.setDate(selectedDates[0]);
          picker2.setDate(selectedDates[0]);
          picker2.open();         
        }, 300);
      }
    
  },
  onMonthChange: function(selectedDates, dateStr, instance) {
    var div = instance.calendarContainer;
    
    $(div).find('.flatpickr-innerContainer').addClass('animated fadeIn');
    setTimeout(function() {
      $(div).find('.flatpickr-innerContainer').removeClass('animated fadeIn');
    },400);
  }
};

flatpickr.localize(flatpickr.l10ns.de);
var picker1 = $('#check-in').flatpickr(config);
var picker2 = $('#check-out').flatpickr(config);

/**************************/



configAvailability = {
  mode: "range",
  inline: true,
  animate: true,
  altInput: false,
  dateFormat: format,
  enableTime: true,
  firstDayOfWeek: 1,
  rangeSeparator: ' -> ',
  locale: {
    firstDayOfWeek: 1,
  },
  //showMonths: 3,
  //minDate: new Date().fp_incr(preparationDays),
 //maxDate: new Date().fp_incr(maxBookingDays),
  disable: disabledDays,
  onDayCreate: function(dObj, dStr, fp, dayElem) {
    // Utilize dayElem.dateObj, which is the corresponding Date
    var day = moment(dayElem.dateObj).format(momentFormat);
  
    $.each(bookedDates, function(i,v){
      if(day == v.bookedStart) {
        $(dayElem).addClass('bookedStart');   
      } 
      else if(day == v.booked) {
        $(dayElem).addClass('booked');   
      } 
      else if(day == v.bookedEnd) {
        $(dayElem).addClass('bookedEnd');   
      }
    });
  },
  onChange: function(selectedDates, dateStr, instance) {
    var elem = instance.element;
    picker1.setDate(selectedDates[0]);
    if(selectedDates[1]) {
      picker1.setDate(selectedDates);  
      picker2.setDate(selectedDates); 
      $('#check-in').next().val(flatpickr.formatDate(selectedDates[0], altFormat));
      $('#check-out').next().val(flatpickr.formatDate(selectedDates[1], altFormat)); 
      
//      console.log(picker1.altInput.value, 'picker1.altInput.value');
//      console.log(picker2.altInput.value, 'picker2.altInput.value');
      if(picker1.altInput.value == picker2.altInput.value) {
        alert('Please choose different startDate and endDate!');           
        setTimeout( function() {
          picker1.setDate(selectedDates[0]);
          picker2.setDate(selectedDates[0]);
          picker2.open();         
        }, 300);
      }
      
    } else {
      picker2.setDate('');  
    }



  },
  onMonthChange: function(selectedDates, dateStr, instance) {
    var elem = instance.calendarContainer;
    $(elem).find('.flatpickr-innerContainer').addClass('animated fadeIn');
    setTimeout(function() {
      $(elem).find('.flatpickr-innerContainer').removeClass('animated fadeIn');
    },400); 
  }
};

var availability;
//var numMonth = 3;
// Cache reference to our container
//var $container = $("body");

// A function for updating max-height
function updateAvailabilityCalNum () {
  var width = $('.container').width();
  var numMonth = Math.floor(width / 308);
  configAvailability.showMonths = numMonth;
  configAvailability.minDate = new Date().fp_incr(preparationDays);

//  availability.redraw();
  console.log(width, numMonth);
  availability = $('#availability').flatpickr(configAvailability)
}
updateAvailabilityCalNum ();

// Call updateMaxHeight when browser resize event fires
$(window).on("resize", updateAvailabilityCalNum);


//var availability2 = $('#availability2').flatpickr(configAvailability);
//availability2.changeMonth(1); 



