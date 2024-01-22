// Only run code after browser has fully loaded
$(function () { 
  
  // Setting the current time in the header
  function currentTime() { 
    var currentTime = dayjs();

    $('#currentTime').text(currentTime.format('MMM D, YYYY [at] h:mm:ss a'));
  };

  function updateSlotColors() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var timeBlock = $(this);
      var timeBlockHour = parseInt(timeBlock.attr("id").split("-")[1]);
  
      if (currentHour > timeBlockHour) {
        // Past hour
        timeBlock.removeClass("past").addClass("past");
      } else if (currentHour === timeBlockHour) {
        // Present hour
        timeBlock.removeClass("past").addClass("present");
      } else {
        // Future hour
        timeBlock.removeClass("past").addClass("future");
      };
    });
  };

  function saveTimeslot() {
    var task = $(this).siblings(".description").val();
    var timeBlockID = $(this).parent().attr("id");
    console.log(task);
    console.log(timeBlockID);

    localStorage.setItem(timeBlockID, task);
  };

  var saveButtons = document.querySelectorAll(".saveBtn");
  saveButtons.forEach(function (button) {
    button.addEventListener("click", saveTimeslot);
  });

  function retrieveTimeslot() {
    var timeBlocks = document.querySelectorAll(".time-block");
    timeBlocks.forEach(function (timeBlock) {
      var timeBlockID = timeBlock.id;
      var savedDescription = localStorage.getItem(timeBlockID);

      // Set the text area value based on the saved input
      timeBlock.querySelector(".description").value = savedDescription;
    });
  };

  // Set refresh interval to 1 second and call currentTime
  setInterval(currentTime, 1000);
  currentTime();

  // Call updateSlotColors
  updateSlotColors();

  saveTimeslot(); 
  retrieveTimeslot();

});