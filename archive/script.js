$(document).ready(function() {

    var device, isApple, deviceModel, issueType = null;

    var initial = `
      <div class='select-device'>
        <p style='text-align:center;white-space:pre-wrap'>Select Your Device</p>
        <div class="row">
          <div class="column-device">
            <div class="card">
              <a id="device" data="phone">
                {Icon}
                <!-- <img id="device-icon" src="" /> -->
              </a>
            </div>
          </div>
          <div class="column-device">
            <div class="card">
              <a id="device" data="laptop">
                {Icon}
                <!-- <img id="device-icon" src="" /> -->
              </a>
            </div>
          </div>
          <div class="column-device">
            <div class="card">
              <a id="device" data="tablet">
                {Icon}
                <!-- <img id="device-icon" src="" /> -->
              </a>
            </div>
          </div>
        </div>
      <div>
    `

    var isAppleText = `
      <div class='isApple-device'>
        <p style='text-align:center;white-space:pre-wrap'>Is it an Apple device?</p>
        <div class="row">
          <div class="column-isApple">
            <div class="card">
              <a id="isApple" data="true">Yes, it is an Apple device</a>
            </div>
          </div>
          <div class="row">
          <div class="column-isApple">
            <div class="card">
              <a id="isApple" data="false">No, it's not Apple</a>
            </div>
          </div>
        </div>
      <div>
    `

    // Text generators
    function displayDeviceTypeIssue(deviceType, deviceVals, issueVals) {

      var deviceModelValueHtml = ``;
      var issueValueHtml = ``;
      
      for (device of deviceVals) {
        deviceModelValueHtml += `<option value='${device}'>${device}</option>`;
      };

      for (issue of issueVals) {
        issueValueHtml += `<option value='${issue}'>${issue}</option>`;
      };

      var deviceTypeIssueText = `
        <div id='select-device-issue'> 
          <p style='text-align:center;white-space:pre-wrap'>Now tell us what's wrong?</p>
          <div class="row">
            <div class="column-deviceIssue">
              <div class="card">
                <p>What ${deviceType} do you have?</p>
                <select id="deviceModel">
                  <option value="model" selected>Model</option>
                  ${deviceModelValueHtml}
                </select>
              </div>
            </div>
            <div class="row">
            <div class="column-deviceIssue">
              <div class="card">
                <p>Now tell us, what's wrong?</p>
                <select id="issueType">
                  <option value="issue" selected>Issue</option>
                  ${issueValueHtml}
                </select>
              </div>
            </div>
              <div class="custom-button-center">
                <a href="#" id="deviceTypeIssue">Next</a>
              </div>
          </div>
        </div>
      `
      return deviceTypeIssueText;
    };

    function displaySummary(estimatedCost) {
      var summaryText = `
      <div id="booking-summary">
      <p style='text-align:center;white-space:pre-wrap'>Diagnosis Summary (Checkout)</p>
        <div class="grid-container">
          <div class="grid-item">
            <div class="summary-heading">Estimated Cost</div>
            <p>$150.00</p>
            <div class="summary-heading">Select Pick-up window</div>
          </div>
          <div class="grid-item">
            <div class="summary-heading">Contact Info</div>
            <label>Full Name:</label><input type="text" id="name" name="name"></br>
            <label>Address:</label><input type="text" id="address" name="address"></br>
            <label>Mobile:</label><input type="text" id="mobile" name="mobile"></br>
            <label>Prefered Contact:</label><input type="text" id="prefer" name="prefer"></br>
            <div class="summary-heading">Pay Now</div>
          </div>
        </div>
        <div style="text-align:center">
          <a href="#" id="summaryConfirm">Confirm</a>
        </div>
      </div>
      `
      return summaryText;
    }

    // Helpers
    function redisplayText(removeSelector, string) {
      $(removeSelector).remove();
      $("p#booking-popup-text").append(string)
    }

    $("p#booking-popup-text").html(initial)

    // Select Device Type
    $("a#device").on('click',(function(event) {
      device = $(this).attr('data');
      console.log(`Device: ${device} selected`);
      redisplayText('.select-device', isAppleText)
    }));

    // Is it an Apple Device
    $("p#booking-popup-text").on('click', "a#isApple", (function(event) {
      isApple = $(this).attr('data');
      console.log(`Apple Device: ${isApple}`);
      redisplayText('.isApple-device', displayDeviceTypeIssue(device, ["device-one", "device-two"], ["issue-one", "issue-two"]))
    }));

    // Device Model and Issue
    $('p#booking-popup-text').on('click', 'a#deviceTypeIssue', (function(event) {
      console.log(`Device Model: ${deviceModel}`);
      console.log(`Issue Type: ${issueType}`)
      redisplayText('div#select-device-issue', displaySummary('$150.00'));
    }));

    // Summary
    $('p#booking-popup-text').on('click', 'a#summarySubmit', (function(event) {
      redisplayText('div#booking-summary', 'Confirmation Page');
    }));

    // Listeners for selected list values
    $('p#booking-popup-text').on('change', 'select#deviceModel', function() {
      deviceModel = $(this).find(":selected").val()
    });
    $('p#booking-popup-text').on('change', 'select#issueType', function() {
      issueType = $(this).find(":selected").val()
    });

    
  });