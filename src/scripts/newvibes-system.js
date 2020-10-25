$(document).ready(() => {

  // Global Variables
  let newVibesDeviceModel, newVibesUpgradePrice = null;
  
  const newVibesContentDiv = "div#newvibes-system";

  // Device Model Selection
  newVibesDeviceModelHtml = (deviceOptions) => {
    let deviceOptionsHtml = ``;
    for (device of deviceOptions) {
      let _deviceType = Object.keys(device)[0]
      deviceOptionsHtml += `<option value='${_deviceType}'>${_deviceType}</option>`;
    };
    let html = `
      <div id="zolo-newvibes-content">
        <div class="device-model" style="text-align: center;">
          <h3>Which iPhone do you have?</h3>
          <div class='container-devicemodel'>
            <select class="btn-select" id="device-model">
              <option id="device-default" disabled selected="selected">Select Model</option>
              ${deviceOptionsHtml}
            </select>
          </div>
          <a class="modal-next-btn" id="newvibes-device-next"><h4>Next ></h4></a>
        </div>
      </div>
    `
    return html;
  };

  $(newVibesContentDiv).append(newVibesDeviceModelHtml(GlobalConfig['isApple']['phone']['models']));
  
  // Upgrade Selection
  newVibesUpgradeOptionsHtml = (upgradeOptions) => {
    const allPrice = parseInt(upgradeOptions.battery) + parseInt(upgradeOptions.screen) + parseInt(upgradeOptions.housing);
    let upgradeOptionsHtml = `
      <div id="zolo-newvibes-content">
        <h2 style="text-align: center; color: black !important;">Select upgrade option</h2>
        <div class="container-upgrades">
          <a id="upgrade-opt" class="btn-upgrade-options" href="#" data="battery" price="${upgradeOptions.battery}">Battery replacement</a>
          <a id="upgrade-opt" class="btn-upgrade-options" href="#" data="screen" price="${upgradeOptions.screen}">Screen replacement</a>
          <a id="upgrade-opt" class="btn-upgrade-options" href="#" data="housing" price="${upgradeOptions.housing}">Housing replacement</a>
          <!--<a id="upgrade-opt" class="btn-upgrade-options" href="#" data="all" price="${allPrice}">All the above</a>-->
        </div>
      </div>
    `
    return upgradeOptionsHtml;
  }

   $(newVibesContentDiv).on('click', 'a#newvibes-device-next', function(event) {
    event.preventDefault();
    if (!newVibesDeviceModel) return;
    console.log(`Device Model: ${newVibesDeviceModel}`)
    updateHtml(
      newVibesUpgradeOptionsHtml(
        GlobalConfig['newVibeUpgradeOptions']['issues']
      ), 
      removeSelector="div#zolo-newvibes-content", 
      appendSelector="div#newvibes-system" 
    );
  });

  // Listener for list options
  $(newVibesContentDiv).on('change', '.container-devicemodel > select', function() {
    newVibesDeviceModel = $(this).val();
  });

  // Estimated price
  estimatedCostHtml = (estimatedCost) => {
    let html = `
      <div id="zolo-newvibes-content">
        <div class="cost" style="text-align: center;"> 
          <div class="container-newvibes-cost">
            <h2>It will cost:</h2>      
            <h2>$${estimatedCost}</h2>
            <a class="modal-next-btn" id="newvibes-cost-next"><h4>Next ></h4></a>
          </div>
        </div>
      </div>
    `
    return html;
  }
  
  getEstimatePrice = (modelList, upgradePrice, upgradeType) => {
    let estPrice = undefined;
    for (model of modelList) {
      if (Object.keys(model)[0] == newVibesDeviceModel) {
        modelPrice = model[newVibesDeviceModel]
        break;
      }
    }
    if (upgradeType == 'all') {
      estPrice = ((parseInt(modelPrice) + parseInt(upgradePrice)) * 0.8);
    } else {
      estPrice = parseInt(modelPrice) + parseInt(upgradePrice);
    }
    return estPrice
  }
  $(newVibesContentDiv).on('click', 'a#upgrade-opt', function(event) {
    event.preventDefault();
    newVibesUpgradePrice = $(this).attr('price');
    const newVibesUpgradeType = $(this).attr('data');
    const estPrice = getEstimatePrice(
      GlobalConfig['newVibeUpgradeOptions']['models'], 
      newVibesUpgradePrice, 
      newVibesUpgradeType
    );
    console.log(`Upgrade Price: ${estPrice}`);
    $('div.featherlight-content').addClass('background-cost');
    updateHtml(
      estimatedCostHtml(estPrice),
      removeSelector="div#zolo-newvibes-content", 
      appendSelector="div#newvibes-system" 
    );
  });


  // Contact Information
  newVibesContactInformationHtml = (upgradePrice) => {
    let contactFormHtml = $(`
      <div id="zolo-newvibes-content">
        <div class="contact-information">
          <div class="form-wrapper" id="yui_3_17_2_1_1603587943426_90">
          <div class="form-inner-wrapper" id="yui_3_17_2_1_1603587943426_267">
            <form data-form-id="5f80566ae2129337fe5f699b" data-success-redirect="" autocomplete="on" method="POST" action="https://crocodile-asparagus-y2gp.squarespace.com" onsubmit="return (function (form) {
                Y.use('squarespace-form-submit', 'node', function usingFormSubmit(Y) {
                (new Y.Squarespace.FormSubmit(form)).submit({
                formId: '5f80566ae2129337fe5f699b',
                collectionId: '5f8053a21bd8945aecaf4d92',
                objectName: 'page-section-5f8054306cbf2c124e1ba865'
                });
                });
                return false;
                })(this);" id="yui_3_17_2_1_1603587943426_266">
                <div class="field-list clear" id="yui_3_17_2_1_1603587943426_265">
                  <fieldset id="name-yui_3_17_2_1_1602245896256_4735" class="form-item fields name required">
                      <legend class="title">
                        Name
                        <span class="required" aria-hidden="true">*</span>
                      </legend>
                      <div class="field first-name">
                        <label class="caption">
                        <input class="field-element field-control" name="fname" x-autocompletetype="given-name" type="text" spellcheck="false" maxlength="30" data-title="First" aria-required="true">
                        <span class="caption-text">First Name</span>
                        </label>
                      </div>
                      <div class="field last-name">
                        <label class="caption">
                        <input class="field-element field-control" name="lname" x-autocompletetype="surname" type="text" spellcheck="false" maxlength="30" data-title="Last" aria-required="true">
                        <span class="caption-text">Last Name</span>
                        </label>
                      </div>
                  </fieldset>
                  <div id="email-yui_3_17_2_1_1602245896256_4736" class="form-item field email required">
                      <label class="title" for="email-yui_3_17_2_1_1602245896256_4736-field">
                      Email
                      <span class="required" aria-hidden="true">*</span>
                      </label>
                      <input class="field-element" id="email-yui_3_17_2_1_1602245896256_4736-field" name="email" type="email" autocomplete="email" spellcheck="false" aria-required="true">
                  </div>
                  <div id="text-yui_3_17_2_1_1602247811846_31019" class="form-item field text required">
                      <label class="title" for="text-yui_3_17_2_1_1602247811846_31019-field">
                      Address
                      <span class="required" aria-hidden="true">*</span>
                      </label>
                      <input class="field-element text" type="text" id="text-yui_3_17_2_1_1602247811846_31019-field" aria-required="true">
                  </div>
                  <div id="number-yui_3_17_2_1_1603016307989_57371" class="form-item field number required">
                      <label class="title" for="number-yui_3_17_2_1_1603016307989_57371-field">
                      Phone
                      <span class="required" aria-hidden="true">*</span>
                      </label>
                      <input class="field-element" type="text" id="number-yui_3_17_2_1_1603016307989_57371-field" spellcheck="false" aria-required="true">
                  </div>
                  <fieldset id="radio-yui_3_17_2_1_1602247811846_11612" class="form-item field radio required" aria-required="true">
                      <legend class="title">
                        Preferred Contact
                        <span class="required" aria-hidden="true">*</span>
                      </legend>
                      <div class="option"><label><input type="radio" name="radio-yui_3_17_2_1_1602247811846_11612-field" value="Email"> Email</label></div>
                      <div class="option"><label><input type="radio" name="radio-yui_3_17_2_1_1602247811846_11612-field" value="Mobile"> Mobile</label></div>
                  </fieldset>
                  <fieldset id="radio-yui_3_17_2_1_1603016307989_203780" class="form-item field radio">
                      <legend class="title">
                        Select Pick-up Window
                      </legend>
                      <div class="option"><label><input id="asapPickup" type="radio" name="radio-yui_3_17_2_1_1603016307989_203780-field" value="Immediate pick-up (we’ll be there in two hours)"> Immediate pick-up (we’ll be there in two hours)</label></div>
                      <div class="option"><label><input id="selectedWindow" type="radio" name="radio-yui_3_17_2_1_1603016307989_203780-field" value="Select time and date"> Select time and date</label></div>
                  </fieldset>
                  <fieldset id="date-yui_3_17_2_1_1602289306229_91434" class="form-item fields date">
                      <legend class="title">
                        Pick-up Date
                      </legend>
                      <div class="field month two-digits">
                        <label class="caption">
                        <input class="field-element" type="text" maxlength="2" data-title="Month">
                        <span class="caption-text">MM</span>
                        </label>
                      </div>
                      <div class="field day two-digits">
                        <label class="caption">
                        <input class="field-element" type="text" maxlength="2" data-title="Day">
                        <span class="caption-text">DD</span>
                        </label>
                      </div>
                      <div class="field year four-digits">
                        <label class="caption">
                        <input class="field-element" type="text" maxlength="4" data-title="Year">
                        <span class="caption-text">YYYY</span>
                        </label>
                      </div>
                  </fieldset>
                  <fieldset id="time-yui_3_17_2_1_1602289306229_92089" class="form-item fields time">
                      <legend class="title">
                        Pick-up Time
                      </legend>
                      <div class="field hour two-digits">
                        <label class="caption">
                        <input class="field-element" type="text" maxlength="2" data-title="Hour">
                        <span class="caption-text">Hour</span>
                        </label>
                      </div>
                      <div class="field minute two-digits">
                        <label class="caption">
                        <input class="field-element" type="text" maxlength="2" data-title="Minute">
                        <span class="caption-text">Minute</span>
                        </label>
                      </div>
                      <div class="field second two-digits" style="display:none;">
                        <label class="caption">
                        <input id="newVibesSecondsValue" class="field-element" style="display:none;" type="text" maxlength="2" data-title="Second">
                        <span class="caption-text" style="display:none;">Second</span>
                        </label>
                      </div>
                      <div class="field ampm">
                        <select class="field-element" data-title="Ampm">
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                      </div>
                  </fieldset>
                  <fieldset style="display:none;" id="checkbox-yui_3_17_2_1_1603585132188_123440" class="form-item field checkbox required" aria-required="true">
                      <legend class="title">
                        Terms and Conditions
                        <span class="required" aria-hidden="true">*</span>
                      </legend>
                      <div class="option"><label><input type="checkbox" name="checkbox-yui_3_17_2_1_1603585132188_123440-field" value="I Agree to Terms" checked> I Agree to Terms</label></div>
                  </fieldset>
                  <input type="hidden" class="form-item field hidden" id="hidden-yui_3_17_2_1_1602289306229_90323" name="SQF_DEVICE_TYPE" value="">
                  <input type="hidden" class="form-item field hidden" id="hidden-yui_3_17_2_1_1602289306229_89145" name="SQF_ISAPPLE" value="true">
                  <input type="hidden" class="form-item field hidden" id="hidden-yui_3_17_2_1_1602289306229_88031" name="SQF_DEVICE_MODEL" value="${newVibesDeviceModel}">
                  <input type="hidden" class="form-item field hidden" id="hidden-yui_3_17_2_1_1602289306229_86936" name="SQF_ISSUE_TYPE" value="">
                  <input type="hidden" class="form-item field hidden" id="hidden-yui_3_17_2_1_1602289306229_85964" name="SQF_ESTIMATED_PRICE" value="${upgradePrice}">
                </div>
                <div class="
                  form-button-wrapper
                  form-button-wrapper--align-left
                  ">
                  <input class="contact-info-submit-btn" type="submit" value="Submit">
                </div>
                <div class="hidden form-submission-text">
                  <h2>Thank you for choosing Zolo</h2>
                  <h3>First things first...</h3>
                  <p>Please ensure your device is password protected to protect your data & files.</p>
                  <p>We'll let you know when we're 30 mins away from picking-up your device from your preferred address.</p>
                  <p>We will notify you when the repair is compelete and when it is on its way back to your preferred address.</p>
                  <p>You will receive an email from us to confirm the booking.</p>
                </div>
                <div class="hidden form-submission-html" data-submission-html=""></div>
            </form>
          </div>
      </div>
      </div>
    </div>
    `)
    return contactFormHtml;
  }

  // Listener for 'select pick up window' specific to input ids
  const asapPickup = "#asapPickup"
  const selectedWindow = "#selectedWindow"
  
  $(newVibesContentDiv).on('change', selectedWindow, function() {
    // unhide
    $("#date-yui_3_17_2_1_1602289306229_91434, #time-yui_3_17_2_1_1602289306229_92089").css('display','block');
    $("input#newVibesSecondsValue").val('00')
  });

  $(newVibesContentDiv).on('change', asapPickup, function() {
    // clean up
    $("#date-yui_3_17_2_1_1602289306229_91434, #time-yui_3_17_2_1_1602289306229_92089").css('display','none');
    $("input#newVibesSecondsValue").val('')
  });

  $(newVibesContentDiv).on('click', 'a#newvibes-cost-next', function(event) {
    event.preventDefault();
    $('div.featherlight-content').removeClass('background-cost');
    updateHtml(
      newVibesContactInformationHtml(newVibesUpgradePrice),
      removeSelector="div#zolo-newvibes-content", 
      appendSelector="div#newvibes-system" 
    );
  });


  // Feather Light Setup / Cleanup
  $('a[data-featherlight="#newvibes-system"]').click(function() {
    $.featherlight({
      beforeOpen: function(event){
        $('div.featherlight-content').removeClass('background-cost');
        $("body").addClass("modal-open");
        newVibesDeviceModel = newVibesUpgradePrice = null;
        $.scrollify.disable()
        updateHtml(
          newVibesDeviceModelHtml(GlobalConfig['newVibeUpgradeOptions']['models']),
          removeSelector="div#zolo-newvibes-content", 
          appendSelector="div#newvibes-system" 
        )
      }
    });
    $.featherlight.defaults.afterClose = () => {
      $("body").removeClass("modal-open");
      $.scrollify.enable()
    }
  });

});