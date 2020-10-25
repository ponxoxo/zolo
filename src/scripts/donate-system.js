$(document).ready(() => {
  
  // Global Variables
  let donateDeviceType = null;
  
  const donateContentDiv = "div#donate-system";

  let donateDeviceSelectionHtml = $(`
    <div id="zolo-donate-content">
      <div id="device-select" style="text-align: center;">
        <h3>Select the device you're donating</h3>
        <div class="container-devices">
          <a id="donate-device" data="phone">
            <img id="device-icon" src="https://static1.squarespace.com/static/5f649ec69d85e375950c27e6/t/5f7bb59a535e0c07d6d1d47c/1601942938053/Phone.png" />
            <h4>Phone</h4>
          </a>
          <a id="donate-device" data="laptop">
            <img id="device-icon" src="https://static1.squarespace.com/static/5f649ec69d85e375950c27e6/t/5f7bb5918a0d711d1d5e2647/1601942929423/Laptop.png" />
            <h4>Laptop</h4>
          </a>
          <a id="donate-device" data="tablet">
            <img id="device-icon" src="https://static1.squarespace.com/static/5f649ec69d85e375950c27e6/t/5f7bb59f60b8b025f16a243b/1601942943150/Tablet.png" />
            <h4>Tablet</h4>
          </a>
        </div>
      </div>
    </div>
  `)

  $(donateContentDiv).append(donateDeviceSelectionHtml)

  /* Donation - Contact information */

  donatorContactInformationHtml = () => {
    let contactFormHtml = $(`
      <div id="zolo-donate-content">
        <div class="form-wrapper" id="yui_3_17_2_1_1603020164938_158">
          <div class="form-title" id="yui_3_17_2_1_1603020164938_265" style="display:none;">Donate Device</div>
          <div class="form-inner-wrapper">
              <form
                  data-form-id="5f818d1c258d731d21330bd9"
                  data-success-redirect=""
                  autocomplete="on"
                  method="POST"
                  action="https://crocodile-asparagus-y2gp.squarespace.com"
                  onsubmit="return (function (form) {
        Y.use('squarespace-form-submit', 'node', function usingFormSubmit(Y) {
          (new Y.Squarespace.FormSubmit(form)).submit({
            formId: '5f818d1c258d731d21330bd9',
            collectionId: '5f8053a21bd8945aecaf4d92',
            objectName: 'page-section-5f8054306cbf2c124e1ba865'
          });
        });
        return false;
      })(this);"
              >
                  <div class="field-list clear">
                      <fieldset id="name-yui_3_17_2_1_1602325776743_5000" class="form-item fields name required">
                          <legend class="title">
                              Name

                              <span class="required" aria-hidden="true">*</span>
                          </legend>

                          <div class="field first-name">
                              <label class="caption">
                                  <input class="field-element field-control" name="fname" x-autocompletetype="given-name" type="text" spellcheck="false" maxlength="30" data-title="First" aria-required="true" />
                                  <span class="caption-text">First Name</span>
                              </label>
                          </div>
                          <div class="field last-name">
                              <label class="caption">
                                  <input class="field-element field-control" name="lname" x-autocompletetype="surname" type="text" spellcheck="false" maxlength="30" data-title="Last" aria-required="true" />
                                  <span class="caption-text">Last Name</span>
                              </label>
                          </div>
                      </fieldset>

                      <div id="email-yui_3_17_2_1_1602325776743_5001" class="form-item field email required">
                          <label class="title" for="email-yui_3_17_2_1_1602325776743_5001-field">
                              Email

                              <span class="required" aria-hidden="true">*</span>
                          </label>

                          <input class="field-element" id="email-yui_3_17_2_1_1602325776743_5001-field" name="email" type="email" autocomplete="email" spellcheck="false" aria-required="true" />
                      </div>

                      <div id="text-yui_3_17_2_1_1602325125659_11250" class="form-item field text required">
                          <label class="title" for="text-yui_3_17_2_1_1602325125659_11250-field">
                              Address

                              <span class="required" aria-hidden="true">*</span>
                          </label>

                          <input class="field-element text" type="text" id="text-yui_3_17_2_1_1602325125659_11250-field" aria-required="true" />
                      </div>

                      <div id="number-yui_3_17_2_1_1603016307989_74404" class="form-item field number required">
                          <label class="title" for="number-yui_3_17_2_1_1603016307989_74404-field">
                              Number

                              <span class="required" aria-hidden="true">*</span>
                          </label>

                          <input class="field-element" type="text" id="number-yui_3_17_2_1_1603016307989_74404-field" spellcheck="false" aria-required="true" />
                      </div>

                      <fieldset id="radio-yui_3_17_2_1_1603016307989_240197" class="form-item field radio required" aria-required="true">
                          <legend class="title">
                              Select Pick-up Window

                              <span class="required" aria-hidden="true">*</span>
                          </legend>

                          <div class="option">
                              <label><input type="radio" name="radio-yui_3_17_2_1_1603016307989_240197-field" id="asapPickup" value="Immediate pick-up (we’ll be there in two hours)" /> Immediate pick-up (we’ll be there in two hours)</label>
                          </div>

                          <div class="option">
                              <label><input type="radio" name="radio-yui_3_17_2_1_1603016307989_240197-field" id="selectDateTime" value="Select time and date" /> Select time and date</label>
                          </div>
                      </fieldset>

                      <fieldset id="date-yui_3_17_2_1_1602325125659_13942" class="form-item fields date">
                          <legend class="title">
                              Pick-up Date
                          </legend>

                          <div class="field month two-digits">
                              <label class="caption">
                                  <input class="field-element" type="text" maxlength="2" data-title="Month" />
                                  <span class="caption-text">MM</span>
                              </label>
                          </div>
                          <div class="field day two-digits">
                              <label class="caption">
                                  <input class="field-element" type="text" maxlength="2" data-title="Day" />
                                  <span class="caption-text">DD</span>
                              </label>
                          </div>
                          <div class="field year four-digits">
                              <label class="caption">
                                  <input class="field-element" type="text" maxlength="4" data-title="Year" />
                                  <span class="caption-text">YYYY</span>
                              </label>
                          </div>
                      </fieldset>

                      <fieldset id="time-yui_3_17_2_1_1602325125659_14618" class="form-item fields time">
                          <legend class="title">
                              Pick-up Time
                          </legend>

                          <div class="field hour two-digits">
                              <label class="caption">
                                  <input class="field-element" type="text" maxlength="2" data-title="Hour" />
                                  <span class="caption-text">Hour</span>
                              </label>
                          </div>
                          <div class="field minute two-digits">
                              <label class="caption">
                                  <input class="field-element" type="text" maxlength="2" data-title="Minute" />
                                  <span class="caption-text">Minute</span>
                              </label>
                          </div>
                          <div class="field second two-digits" style="display:none;">
                              <label class="caption">
                                  <input class="field-element" style="display:none;" type="text" maxlength="2" data-title="Second" />
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

                      <fieldset style="display:none;" id="checkbox-yui_3_17_2_1_1603016307989_73735" class="form-item field checkbox required" aria-required="true">
                          <legend class="title">
                              Terms and Conditions

                              <span class="required" aria-hidden="true">*</span>
                          </legend>

                          <div class="option">
                              <label><input type="checkbox" name="checkbox-yui_3_17_2_1_1603016307989_73735-field" value="I Agree to Terms" checked/> I Agree to Terms</label>
                          </div>
                      </fieldset>

                      <input type="hidden" class="form-item field hidden" id="hidden-yui_3_17_2_1_1602325125659_10591" name="SQF_DEVICE_TYPE" value="${donateDeviceType}" />
                  </div>

                  <div class="form-button-wrapper form-button-wrapper--align-left">
                      <input class="contact-info-submit-btn" type="submit" value="Submit" />
                  </div>

                  <div class="hidden form-submission-text">
                    <h2>We Appreciate your generosity</h2>
                    <h4>We will contact you when we’re 15 mins away from the pick-up location.</h4>
                  </div>
                  <div class="hidden form-submission-html" data-submission-html=""></div>
              </form>
          </div>
      </div>
    </div>
    `)
    return contactFormHtml;
  }

  // Listener for 'select pick up window' specific to input ids
  const asapPickup = "#asapPickup"
  const selectedWindow = "#selectDateTime"
  
  $(donateContentDiv).on('change', selectedWindow, function() {
    // unhide
    $("#date-yui_3_17_2_1_1602325125659_13942, #time-yui_3_17_2_1_1602325125659_14618").css('display','block');
  });

  $(donateContentDiv).on('change', asapPickup, function() {
    // clean up
    $("#date-yui_3_17_2_1_1602325125659_13942, #time-yui_3_17_2_1_1602325125659_14618").css('display','none');
  });
    

  $(donateContentDiv).on('click', "a#donate-device", (function (event) {
    event.preventDefault();
    donateDeviceType = $(this).attr('data');
    console.log(`Device Type: ${donateDeviceType} selected`);
    updateHtml(
      donatorContactInformationHtml, 
      removeSelector="div#zolo-donate-content", 
      appendSelector="div#donate-system" 
    )
  }));

  // Feather Light Setup / Cleanup
  $('a[data-featherlight="#donate-system"]').click(function() {
    $.featherlight({
      beforeOpen: function(event){
        donateDeviceType = null;
        updateHtml(
          donateDeviceSelectionHtml,
          removeSelector="div#zolo-donate-content", 
          appendSelector="div#donate-system" 
        )

      }
    });
  });

});