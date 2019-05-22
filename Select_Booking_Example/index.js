$("document").ready(function() {

    var $child = 0,
        $adult = 2,
        $senior = 0;
    

    // setting the svg icons
    var $pbx_plus_icon = '<svg class="pbx-icons" aria-hidden="true" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>',
        $pbx_minus_icon = '<svg class="pbx-icons" aria-hidden="true" data-prefix="fas" data-icon="minus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>';
    
    $(".pbx-plus").append($pbx_plus_icon);
    $(".pbx-minus").append($pbx_minus_icon);
    
      $('.dropdown-menu').on('click', function(e) {
          if($(this).hasClass('pbx-prevent-close')) {
              e.stopPropagation();
          }
      });
    

    //   onClick function
    $(".pbx-math").on("click", function () {
    
        var $button = $(this),
            $option = '<option>0-1</option>',
            guest_label = [];
    
        // loop for child age option
        for (i = 2; i <= 17; i++)
            $option += '<option>' + i + '</option>';
        
        
        var oldValue = $button.parent().parent().find("label").find("#number").text();
        if ($button.hasClass('pbx-add-senior')) {
            var newVal = parseFloat(oldValue) + 1;
            $senior = newVal;
            $('#senior').val(newVal);
        } else if ($button.hasClass('pbx-decrese-senior')) {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
            $senior = newVal;
            $('#senior').val(newVal);
        } else if ($button.hasClass('pbx-add-adult')) {
            var newVal = parseFloat(oldValue) + 1;
            $adult = newVal;
            $('#adult').val(newVal);
        } else if ($button.hasClass('pbx-decrese-adult')) {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
            $adult = newVal;
            $('#adult').val(newVal);
        } else if ($button.hasClass('pbx-add-child')) {
            var newVal = parseFloat(oldValue) + 1;
            if(newVal == 1){
               $("#pbx-guest-form").append('<div class="dropdown-divider pbx-divider"></div>');
             }
            $("#pbx-guest-form").append(
                '<div class="form-group row" id="child-' + newVal + '">' +
                '<label for="inputPassword" class="col-7 col-form-label">Age of child ' + newVal + '</label>' +
                '<div class="col">' +
                '<select class="form-control" name="child[]">' +
                $option +
                '</select>' +
                '</div>' +
                '</div>'
            );
    
            $child = newVal;
        } else if ($button.hasClass('pbx-decrese-child')) {
            if (oldValue > 0) {
                $('#child-' + oldValue).remove()
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
            if(newVal == 0){
               $(".pbx-divider").remove();
             }
            $child = newVal;
        }    
      
        if ($adult > 1) {
            guest_label.push($adult + ' adults');
            $('#text-adult').text('adults');
        } else if($adult == 1){
            guest_label.push($adult + ' adult');
            $('#text-adult').text('adult');
        }
        if ($senior > 1) {
            guest_label.push($senior + ' seniors');
            $('#text-senior').text('seniors');
        } else if($senior == 1){
            guest_label.push($senior + ' senior');
            $('#text-senior').text('senior');
        }
        if ($child > 1) {
            guest_label.push($child + ' children'); 
            $('#text-child').text('children');
        } else if($child == 1){
            guest_label.push($child + ' child');
            $('#text-child').text('child');
        }
    
        $('#gest-label').text(guest_label.join(', '));
      
        $button.parent().parent().find("label").find("#number").text(newVal);
      });  
    });