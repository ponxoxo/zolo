
$(document).ready(function() {

  var device, isApple, deviceModel, devicePrice, issuePrice,
  issueType, pickupDate, datetime = null;

  // Helpers
  function redisplayText(removeSelector, string, appendSelector='p#booking-popup-text') {
    $(removeSelector).remove();
    $(appendSelector).append(string)
  }

  function formatDate(date) {
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 101).toString().substring(1);
    var day = (date.getDate() + 100).toString().substring(1);
    return year + "-" + month + "-" + day;
  }

  function getEstimatedPrice(devicePrice, issuePrice) {
    var _devicePrice = parseInt(devicePrice)
    var _issuePrice = parseInt(issuePrice)
    var total = (_devicePrice + _issuePrice)
    console.log(`Total price: ${total}`)
    return total
  }

  /* Booking System */
  var initial = `
    <div class='grid-container'>
      <div class='grid-item-row'>
        <h3>Select your device</h3>
      </div>
      <div class="grid-item-row">
        <div class="grid-item-column-devices">
          <div class="grid-item-row-devices">
            <div class="card">
              <a id="device" data="phone">
                <img id="device-icon" src="https://static1.squarespace.com/static/5f649ec69d85e375950c27e6/t/5f7bb59a535e0c07d6d1d47c/1601942938053/Phone.png" />
                <h4>Phone</h4>
              </a>
            </div>
          </div>
          <div class="grid-item-row-devices">
            <div class="card">
              <a id="device" data="laptop">
                <img id="device-icon" src="https://static1.squarespace.com/static/5f649ec69d85e375950c27e6/t/5f7bb5918a0d711d1d5e2647/1601942929423/Laptop.png" />
                <h4>Laptop</h4>
              </a>
            </div>
          </div>
          <div class="grid-item-row-devices">
            <div class="card">
              <a id="device" data="tablet">
                <img id="device-icon" src="https://static1.squarespace.com/static/5f649ec69d85e375950c27e6/t/5f7bb59f60b8b025f16a243b/1601942943150/Tablet.png" />
                <h4>Tablet</h4>
              </a>
            </div>
          </div>
        </div>
      </div>
    <div>
  `
  var isAppleText = `
    <div class='grid-container'>
      <div class='grid-item-row'>
        <h3>Is it an Apple device?</h3>
      </div>
      <div class="grid-item-row">
        <div class="grid-item-column-apple">
          <a id="isApple" data="true">Yes! It's is an Apple Device</a>
          <a id="isApple" data="false">No! Not Apple</a>
        </div>
      </div>
    <div>
  `
  var thankYouText = `
    <div class="grid-container-thanks">
      <div class="grid-item-thanks">
        <h3>Thank you for choosing Zolo</h3>
      </div>
      <div class="grid-item-thanks">
        <h4>First things first...</h4>
      </div>
      <div class="grid-item-thanks">
        <p>Please ensure your device is password protected to protect your data & files.</p>
        <p>We'll let you know when we're 30 mins away from picking-up your device from </br>your preferred address.</p>
        <p>We will notify you when the repair is complete and when it is on it's way back to </br>your preferred address.</p>
        <p>If there are any changes or issues, please contact xyz.</p>
      </div>
    </div>
  `
  // Text generators
  function displayDeviceTypeIssue(deviceType, deviceVals, issueVals) {

    var deviceModelValueHtml = ``;
    var issueValueHtml = ``;
    
    for (device of deviceVals) {
      var _deviceType = Object.keys(device)[0]
      var _price = device[_deviceType]
      deviceModelValueHtml += `<option value='${_deviceType}' price="${_price}">${_deviceType}</option>`;
    };

    for (issue of issueVals) {
      var _issueType = Object.keys(issue)[0]
      var _price = issue[_issueType]
      var _template = issue['template']
      issueValueHtml += `<option value='${_issueType}' price='${_price}' template="${_template}">${_issueType}</option>`;
    };

    var deviceTypeIssueText = `
      <div class='grid-container'> 
        <div class='grid-item-row'>
          <h3>Now tell us, what's wrong?</p>
        </div>
        <div class='grid-item-row'>
          <div class="grid-item-column-device-issue">
            
              <select id="deviceModel" class="select-device-issue">
                <option value="default">Select Model</option>
                ${deviceModelValueHtml}
              </select>
            
              <select id="issueType" class="select-device-issue">
                <option value="default">Select Issue</option>
                ${issueValueHtml}
              </select>
              
          </div>
        </div>
      </div>
    `
    return deviceTypeIssueText;
  };

  function displaySummary(_template, issueType, estimatedCost, minDate) {

    function tranformIssueDescription(issueType) {
      var defaultDesc = `We will need to replace the ${issueType.toLowerCase()} </br>
      and we can turn this around within 24 </br>
      hours.`
      var templateDesc = GlobalConfig.issueDescription[`${_template}`]
      if (templateDesc != "" || templateDesc != undefined) {
        return templateDesc
      } else {
        return defaultDesc
      }
    }

    var issueDesc = tranformIssueDescription(issueType)

    var summaryText = `
      <div class="grid-container-col">
        <div class="grid-container-row-diag">
          <div class="grid-item-diag">
            <h3>Okay, so here's the</br>
            diagnosis:</h3>
          </div>
          <div class="grid-item-diag">
            <p>${issueDesc}</p>
          </div>
            <div class="grid-item-diag">
              <div class="spacer"></div>
            </div>
          <div class="grid-item-diag">
            <h3>It will cost:</br>      
            $${estimatedCost}</h3>
          </div>
        </div>
        <div class="grid-container-row-pickup">
          <div class="grid-item-pickup">
            <h3>Let's Zolo it!</br>
            Select Pick-up window</h3>
          </div>
          <div class="grid-item-pickup">
            <div class="grid-item-pickup-select">
              <div class="circle"></div>
              <p>Immediate Pick-up!</br>
              Zolo will be there within 2 hours</p>
              <div class="circle"></div>
              <p>Pick it up another day</p>
              <div></div>
              <div class="grid-container-pickup-datetime">
                <input type="date" id="pickupDate"
                  min=${minDate} placeholder="yyyy-mm-dd">
                <input type="time" id="datetime" placeholder="00:00">
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    `
    return summaryText;
  }

  function displaySubmission() {
    var submissionText = `
    <form id="submit-order" onsubmit="return false;">
      <div class="grid-container-col">
        <div class="grid-container-row-contact">
          <div class="grid-item-contact">
            <h3>We need your contact</br>
            details!</h3>
          </div>
          <div class="grid-item-contact">
              <div class="grid-container-contact-input">
                <div class="grid-item-contact-input">
                  <label for="name">Name</label>
                  <input type="text" id="name" name="name" required>
                </div>
                <div class="grid-item-contact-input">
                  <label>Address</label>
                  <input type="text" id="address" name="address" required>
                </div>
                <div class="grid-item-contact-input">
                  <label>Mobile Number</label>
                  <input type="tel" id="mobile" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="mobile" required>
                </div>
                <div class="grid-item-contact-input">
                  <label>Email</label>
                  <input type="email"id="email" name="email" required>
                </div>
              </div>
          </div>
          <div class="grid-item-contact">
            <div class="spacer"></div>
          </div>
          <div class="grid-item-contact">
            <div class="grid-container-contact-prefer">
              <div class="grid-item-contact-prefer">
                <h3>Preferred Contact?</h3>
              </div>
              <div class="grid-item-contact-prefer">
                <input type="radio" name="contact" value="email" checked><label>Email</label></br>
                <input type="radio" name="contact" value="mobile"><label>Mobile</label>
              </div>
            </div>
          </div>
        </div>
        <div class="grid-container-row-pay">
          <div class="grid-item-pay">
            <h3>Pay now</h3>
          </div>
          <div class="grid-item-pay">
            <div class="grid-container-pay-opts">
              <div class="grid-item-pay-opts">
                <a href="#">VISA/MC/AMEX</a>
              </div>
              <div class="grid-item-pay-opts">
                <a href="#">AfterPay</a>
              </div>
              <div class="grid-item-pay-opts">
                <a href="#">PayPal</a>
              </div>
            </div>
          </div>
          <div class="grid-item-pay">
            <div class="grid-container-pay-details">
              <div class="grid-item-pay-details">
                <label>Card Number</label>
                <input type="text" name="cardNumber" required>
              </div>
              <div class="grid-item-pay-details">
                <label>Expiry</label>
                <input type="date" name="expiryDate" required>
              </div>
              <div class="grid-item-pay-details">
                <label>CVC</label>
                <input type="password" name="CVC" required>
              </div>
            </div>
          </div>
          <div class="grid-item-pay">
            <div class="grid-container-button-pay">
              <input type="submit" id="book" form="submit-order" value="Book Now" >
            </div>
          </div>
        </div>
      </div>
      </form>
    `;
    return submissionText;
  }

  $("p#booking-popup-text").html(initial)
  

  // listner version Select Device
  $("p#booking-popup-text").on('click', "a#device", (function(event) {
    event.preventDefault();
    device = $(this).attr('data');
    console.log(`Device: ${device} selected`);
    redisplayText('div.grid-container', isAppleText)  
  }));

  // Is it an Apple Device
  $("p#booking-popup-text").on('click', "a#isApple", (function(event) {
    event.preventDefault();
    isApple = $(this).attr('data');
    console.log(`Apple Device: ${isApple}`);
    var config = (isApple == 'true') ? GlobalConfig['isApple'][device] : GlobalConfig['notApple'][device]
    redisplayText('div.grid-container', displayDeviceTypeIssue(device, config['models'], config['issues']))
  }));

  // Thank You
  $('p#booking-popup-text').on('click', 'input#book', (function(event) {
    $("form#submit-order").validate({
      rules: {
        name: "required",
        address: "required",
        mobile: {
          required: true,
          digits: true
        },
        email: {
          required: true,
          email: true
        },
      },
      // Specify validation error messages
      messages: {
        name: "Please enter your name",
        mobile: "Please enter a valid mobile number",
        email: "Please enter a valid email address"
      },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function(form) {
        $('div.modal-content').removeClass('summary-background');
        redisplayText('div.grid-container-col', thankYouText);
      }
    });
  }));

  // Listeners for selected list values
  $('p#booking-popup-text').on('change', 'select#deviceModel', function() {
    deviceModel = $(this).find(":selected").val()
    console.log(`Device Model: ${deviceModel}`)
  });

  $('p#booking-popup-text').on('change', 'select#issueType', function() {
    issueType = $(this).find(":selected").val()
    console.log(`Issue type: ${issueType}`)
  });

  $('p#booking-popup-text').on('change', 'select#deviceModel', function() {
    deviceModel = $(this).find(":selected").val()
    devicePrice = $(this).find(":selected").attr('price');
    var _template = $(this).find(":selected").attr('template');
    if (issueType == undefined || (issueType == 'default' || deviceModel == 'default')) return;
    var estPrice = getEstimatedPrice(devicePrice, issuePrice);
    redisplayText('.grid-container', displaySummary(_template, issueType, estPrice, formatDate(new Date())));
    $('div.modal-content').addClass('summary-background');
  });
  
  $('p#booking-popup-text').on('change', 'select#issueType', function() {
    issueType = $(this).find(":selected").val()
    issuePrice = $(this).find(":selected").attr('price');
    var _template = $(this).find(":selected").attr('template');
    if (deviceModel == undefined || (deviceModel == 'default' || issueType == 'default')) return; 
    var estPrice = getEstimatedPrice(devicePrice, issuePrice);
    redisplayText('.grid-container', displaySummary(_template, issueType, estPrice, formatDate(new Date())));
    $('div.modal-content').addClass('summary-background');
  });

  $('p#booking-popup-text').on('change', 'input#pickupDate', function() {
    pickupDate = $(this).val()
    console.log(pickupDate)
    if (datetime == undefined || (datetime == 'default' || pickupDate == 'default')) return;
    redisplayText('.grid-container-col', displaySubmission());
  });
  
  $('p#booking-popup-text').on('change', 'input#datetime', function() {
    datetime = $(this).find(":selected").val()
    if (pickupDate == undefined || (pickupDate == 'default' || datetime == 'default')) return; 
    redisplayText('.grid-container-col', displaySubmission());
  });

    /************************************************************************************************/
    /***************************************** Donate Popup *****************************************/
    /************************************************************************************************/
  
    /* Donation System */
  var donateDevice, donateDatetime, donatePickupDate = null; 

  var donateInitial = `
  <div class='grid-container'>
    <div class='grid-item-row'>
      <h3>Select the device you're donating</h3>
    </div>
    <div class="grid-item-row">
      <div class="grid-item-column-devices">
        <div class="grid-item-row-devices">
          <div class="card">
            <a id="donate-device" data="phone">
              <img id="device-icon" src="https://static1.squarespace.com/static/5f649ec69d85e375950c27e6/t/5f7bb59a535e0c07d6d1d47c/1601942938053/Phone.png" />
              <h4>Phone</h4>
            </a>
          </div>
        </div>
        <div class="grid-item-row-devices">
          <div class="card">
            <a id="donate-device" data="laptop">
              <img id="device-icon" src="https://static1.squarespace.com/static/5f649ec69d85e375950c27e6/t/5f7bb5918a0d711d1d5e2647/1601942929423/Laptop.png" />
              <h4>Laptop</h4>
            </a>
          </div>
        </div>
        <div class="grid-item-row-devices">
          <div class="card">
            <a id="donate-device" data="tablet">
              <img id="device-icon" src="https://static1.squarespace.com/static/5f649ec69d85e375950c27e6/t/5f7bb59f60b8b025f16a243b/1601942943150/Tablet.png" />
              <h4>Tablet</h4>
            </a>
          </div>
        </div>
      </div>
    </div>
  <div>
  `
  function displayDonatePickup(minDate) {
    var donatePickup = `
    <form id="submit-donation" onsubmit="return false;">
      <div class="grid-container-col">
        <div class="grid-container-row-contact">
          <div class="grid-item-contact">
            <h3>We need your contact</br>
            details!</h3>
          </div>
          <div class="grid-item-contact">
            <div class="grid-container-contact-input">
              <div class="grid-item-contact-input">
                <label>Name</label>
                <input type="text" id="name" name="name" required>
              </div>
              <div class="grid-item-contact-input">
                <label>Address</label>
                <input type="text" name="address" required>
              </div>
              <div class="grid-item-contact-input">
                <label>Mobile Number</label>
                <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="mobile" required>
              </div>
              <div class="grid-item-contact-input">
                <label>Email</label>
                <input type="email" name="email" required>
              </div>
            </div>
          </div>
          <div class="grid-item-contact">
            <div class="spacer"></div>
          </div>
          <div class="grid-item-contact">
            <div class="grid-container-contact-prefer">
              <div class="grid-item-contact-prefer">
                <h3>Preferred Contact?</h3>
              </div>
              <div class="grid-item-contact-prefer">
                <form action="">
                  <input type="radio" name="contact" value="email" checked><label>Email</label></br>
                  <input type="radio" name="contact" value="mobile"><label>Mobile</label>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="grid-container-row-pickup">
          <div class="grid-item-pickup">
            <h3>Select Pick-up window</h3>
          </div>
          <div class="grid-item-pickup">
            <div class="grid-item-pickup-select">
              <div class="circle"></div>
              <p>Immediate Pick-up!</br>
              Zolo will be there within 2 hours</p>
              <div class="circle"></div>
              <p>Pick it up another day</p>
              <div></div>
              <div class="grid-container-pickup-datetime">
                <input type="date" id="donatePickupDate"
                min=${minDate}>
                <input type="time" id="donateDatetime">
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    `
    return donatePickup
  }
 
  var donateThankyou = `
    <div class="donate-thank-you">
      <h2>We Appreciate your generosity</h2>
      <p>Together, we are helping young Australians<br>
      create their passion.</p>
    </div>
  `
  function formValidate() {
    $("form#submit-donation").validate({
      rules: {
        name: "required",
        address: "required",
        mobile: {
          required: true,
          digits: true
        },
        email: {
          required: true,
          email: true
        },
      },
      messages: {
        name: "Please enter your name",
        mobile: "Please enter a valid mobile number",
        email: "Please enter a valid email address"
      },
      submitHandler: function(form) {
        $('div.modal-content').removeClass('summary-background').addClass('thank-you-background');
        redisplayText('div.grid-container-col', donateThankyou, 'p#donate-popup-text');
      }
    });
  }

  $("p#donate-popup-text").html(donateInitial)
  
  $("p#donate-popup-text").on('click', "a#donate-device", (function(event) {
    event.preventDefault();
    donateDevice = $(this).attr('data');
    console.log(`Device: ${donateDevice} selected`);
    $('div.modal-content').addClass('summary-background');
    redisplayText('div.grid-container', displayDonatePickup(formatDate(new Date())), 'p#donate-popup-text');
  }));

  /* Listeners */
  $('p#donate-popup-text').on('change', 'input#donateDatetime', function() {
    donateDatetime = $(this).val()
    if (donatePickupDate == undefined || (donatePickupDate == 'default' || donateDatetime == 'default')) return; 
    console.log(`Time: ${donateDatetime}`);
    formValidate();
    $("form#submit-donation").submit()
  });

  $('p#donate-popup-text').on('change', 'input#donatePickupDate', function() {
    donatePickupDate = $(this).val()
    if (donateDatetime == undefined || (donateDatetime == 'default' || donatePickupDate == 'default')) return; 
    console.log(`Date: ${donatePickupDate}`);
    formValidate();
    $("form#submit-donation").submit()
  });

  /************************************************************************************************/
  /**************************************** New Phone Vibes ***************************************/
  /************************************************************************************************/
   /* New Phone Vibes Booking System */
   var vibesDeviceModel, vibesDeviceModelPrice, vibesIssuePrices, vibesUpgradeOption, vibesPickupDate, vibesDatetime = null;

   function vibesModelSelection(deviceVals) {
     var deviceModelValueHtml = ``;
     for (device of deviceVals) {
       var _deviceType = Object.keys(device)[0]
       var _price = device[_deviceType]
       deviceModelValueHtml += `<option value='${_deviceType}' price="${_price}">${_deviceType}</option>`;
     };
     var selectModel = `
       <div class='grid-container'>
         <div class='grid-container-model'>
           <h2 style="color: black !important;">What iPhone do you have?</h2>
           <select id="vibes-deviceModel" class="select-device-issue">
             <option value="default">Select Model</option>
             ${deviceModelValueHtml}
           </select>
         </div>
       <div>
     `
     return selectModel;
   };
   
   function displayUpgradeOptions(upgradeOptions) {

    var upgradeOptionsText = `
    <div class="grid-container">
      <h2 style="text-align: center; color: black !important;">Select upgrade option</h2>
      <div class="grid-container-upgrade-opts-col">
        <div class="upgrade-custom-button">
          <div class="sqs-block button-block sqs-block-button">
          <a id="upgrade-opt" href="#" data="battery" price="${upgradeOptions.battery}">Battery replacement</a>
          </div>
        </div>
        <div class="upgrade-custom-button">
          <div class="sqs-block button-block sqs-block-button">
          <a id="upgrade-opt" href="#" data="screen" price="${upgradeOptions.screen}">Screen replacement</a>
          </div>
        </div>
        <div class="upgrade-custom-button">
          <div class="sqs-block button-block sqs-block-button">
          <a id="upgrade-opt" href="#" data="housing" price="${upgradeOptions.housing}">Housing replacement</a>
          </div>
        </div>
        <div></div>
        <div class="upgrade-custom-button">
          <div class="sqs-block button-block sqs-block-button">
          <a id="upgrade-opt" href="#" data="all" price="${upgradeOptions.all}">All the above</a>
          </div>
        </div>
      </div>

    </div>
    `
    return upgradeOptionsText;
   }
   
   
   function vibeDisplayPickup(minDate, estimatedCost) {
     var vibeDisplayPickupText = `
       <div class="grid-container-col">
         <div class="grid-container-row-vibe-total">
             <h3>It will cost:</br>      
             $${estimatedCost}</h3>
         </div>
         <div class="grid-container-row-pickup">
           <div class="grid-item-pickup">
             <h3>Let's Zolo it!</br>
             Select Pick-up window</h3>
           </div>
           <div class="grid-item-pickup">
             <div class="grid-item-pickup-select">
               <div class="circle"></div>
               <p>Immediate Pick-up!</br>
               Zolo will be there within 2 hours</p>
               <div class="circle"></div>
               <p>Pick it up another day</p>
               <div></div>
               <div class="grid-container-pickup-datetime">
                 <input type="date" id="vibesPickupDate"
                 min=${minDate}>
                 <input type="time" id="vibesDatetime">
               </div>
             </div>
             </div>
           </div>
         </div>
       </div>
     `
     return vibeDisplayPickupText;
   }
   
   function displayVibesSubmission() {
     var submissionText = `
     <form id="vibes-submit-order" onsubmit="return false;">
       <div class="grid-container-col">
         <div class="grid-container-row-contact">
           <div class="grid-item-contact">
             <h3>We need your contact</br>
             details!</h3>
           </div>
           <div class="grid-item-contact">
             <div class="grid-container-contact-input">
               <div class="grid-item-contact-input">
                 <label>Name</label>
                 <input type="text" name="name" required>
               </div>
               <div class="grid-item-contact-input" required>
                 <label>Address</label>
                 <input type="text" name="address" required>
               </div>
               <div class="grid-item-contact-input" required>
                 <label>Mobile Number</label>
                 <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="mobile">
               </div>
               <div class="grid-item-contact-input" required>
                 <label>Email</label>
                 <input type="email" name="email" required>
               </div>
             </div>
           </div>
           <div class="grid-item-contact">
             <div class="spacer"></div>
           </div>
           <div class="grid-item-contact">
             <div class="grid-container-contact-prefer">
               <div class="grid-item-contact-prefer">
                 <h3>Preferred Contact?</h3>
               </div>
               <div class="grid-item-contact-prefer">
                 <form action="">
                   <input type="radio" name="contact" value="email" checked><label>Email</label></br>
                   <input type="radio" name="contact" value="mobile"><label>Mobile</label>
                 </form>
               </div>
             </div>
           </div>
         </div>
         <div class="grid-container-row-pay">
           <div class="grid-item-pay">
             <h3>Pay now</h3>
           </div>
           <div class="grid-item-pay">
             <div class="grid-container-pay-opts">
               <div class="grid-item-pay-opts">
                 <a href="#">VISA/MC/AMEX</a>
               </div>
               <div class="grid-item-pay-opts">
                 <a href="#">AfterPay</a>
               </div>
               <div class="grid-item-pay-opts">
                 <a href="#">PayPal</a>
               </div>
             </div>
           </div>
           <div class="grid-item-pay">
             <div class="grid-container-pay-details">
               <div class="grid-item-pay-details">
                 <label>Card Number</label>
                 <input type="text" name="cardNumber" required>
               </div>
               <div class="grid-item-pay-details">
                 <label>Expiry</label>
                 <input type="date" name="expiryDate" required>
               </div>
               <div class="grid-item-pay-details" required>
                 <label>CVC</label>
                 <input type="password" name="CVC" required>
               </div>
             </div>
           </div>
           <div class="grid-item-pay">
             <div class="grid-container-button-pay">
             <input type="submit" id="vibes-book" form="submit-order" value="Book Now" >
             </div>
           </div>
         </div>
       </div>
     </form>
     `;
     return submissionText;
   }
 
   var vibesThankYouText = `
     <div class="grid-container-thanks">
       <div class="grid-item-thanks">
         <h3>Thank you for choosing Zolo</h3>
       </div>
       <div class="grid-item-thanks">
         <h4>First things first...</h4>
       </div>
       <div class="grid-item-thanks">
         <p>Please ensure your device is password protected to protect your data & files.</p>
         <p>We'll let you know when we're 30 mins away from picking-up your device from </br>your preferred address.</p>
         <p>We will notify you when the repair is complete and when it is on it's way back to </br>your preferred address.</p>
         <p>If there are any changes or issues, please contact xyz.</p>
       </div>
     </div>
   `
   var iPhoneModels = GlobalConfig['isApple']['phone']['models']
   $("p#vibes-booking-popup-text").html(vibesModelSelection(iPhoneModels))
 
  // Is it an Apple Device
  $("p#vibes-booking-popup-text").on('click', "a#upgrade-opt", (function(event) {
    event.preventDefault();
    vibesUpgradeOption = $(this).attr('data');
    vibesIssuePrices = $(this).attr('price');
    console.log(`Upgrade option: ${vibesUpgradeOption}`);
    var estPrice = getEstimatedPrice(vibesDeviceModelPrice, vibesIssuePrices);
    redisplayText('div.grid-container', vibeDisplayPickup(formatDate(new Date()), estPrice), 'p#vibes-booking-popup-text')
    $('div.modal-content').addClass('summary-background');
  }));
 
   $('p#vibes-booking-popup-text').on('click', 'input#vibes-book', (function(event) {
     event.preventDefault();
     $("form#vibes-submit-order").validate({
       rules: {
         name: "required",
         address: "required",
         mobile: {
           required: true,
           digits: true
         },
         email: {
           required: true,
           email: true
         },
       },
       messages: {
         name: "Please enter your name",
         mobile: "Please enter a valid mobile number",
         email: "Please enter a valid email address"
       },
       submitHandler: function(form) {
         $('div.modal-content').removeClass('summary-background');
         redisplayText('div.grid-container-col', vibesThankYouText, 'p#vibes-booking-popup-text');
       }
     });
     $('#vibes-submit-order').submit()
   }));
 
   // Listeners for selected list values
   $('p#vibes-booking-popup-text').on('change', 'select#vibes-deviceModel', function(event) {
     event.preventDefault();
     vibesDeviceModel = $(this).find(":selected").val()
     vibesDeviceModelPrice = $(this).find(":selected").attr('price');
     console.log(`Device Model: ${vibesDeviceModel}`)
     redisplayText('div.grid-container', displayUpgradeOptions(GlobalConfig.newVibeUpgradeOptions), 'p#vibes-booking-popup-text')
   });
  
   $('p#vibes-booking-popup-text').on('change', 'input#vibesPickupDate', function(event) {
     vibesPickupDate = $(this).val()
     if (vibesDatetime == undefined || (vibesDatetime == 'default' || vibesPickupDate == 'default')) return;
     redisplayText('.grid-container-col', displayVibesSubmission(), 'p#vibes-booking-popup-text');
   });
   
   $('p#vibes-booking-popup-text').on('change', 'input#vibesDatetime', function(event) {
     vibesDatetime = $(this).val()
     if (vibesPickupDate == undefined || (vibesDatetime == 'default' || vibesDatetime == 'default')) return; 
     redisplayText('.grid-container-col', displayVibesSubmission(), 'p#vibes-booking-popup-text');
   });
   
  // MODAL
  var modal = document.getElementById("modal");
  var span = document.getElementsByClassName("close")[0];

  function exitCleanup() {
    modal.style.display = "none";
    $("p#booking-popup-text").html(initial);
    $("p#donate-popup-text").html(donateInitial);
    $("p#vibes-booking-popup-text").html(vibesModelSelection(GlobalConfig['isApple']['phone']['models']));
    $('div.modal-content').removeClass('summary-background'); // incase
    // reset vars
    device = isApple = deviceModel = issueType = pickupDate = datetime = devicePrice = issuePrice = null;
    donateDevice = donateDatetime = donatePickupDate = null;
    vibesDeviceModel = vibesDeviceModelPrice = vibesIssuePrices = vibesUpgradeOption = vibesPickupDate = vibesDatetime = null; 
  }


  $('a#open-modal').on('click', function(event) {
    event.preventDefault();
    modal.style.display = "block";
  })


  span.onclick = function() {
    exitCleanup();
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      exitCleanup();
    }
  }

});
