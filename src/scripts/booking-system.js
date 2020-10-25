$(document).ready(() => {

  // Global Variables
  let deviceType, deviceModel,
  issueType, isApple = null;

  const contentDiv = "div#booking-system";
  
 /*
  *  Booking System
  */

  // Device Selection
  let deviceSelectionHtml = $(`
    <div id="zolo-content">
      <div id="device-select" style="text-align: center;">
        <h3>Select your device</h3>
        <div class="container-devices">
          <a id="device" data="phone">
            <img id="device-icon" src="https://static1.squarespace.com/static/5f649ec69d85e375950c27e6/t/5f7bb59a535e0c07d6d1d47c/1601942938053/Phone.png" />
            <h4>Phone</h4>
          </a>
          <a id="device" data="laptop">
            <img id="device-icon" src="https://static1.squarespace.com/static/5f649ec69d85e375950c27e6/t/5f7bb5918a0d711d1d5e2647/1601942929423/Laptop.png" />
            <h4>Laptop</h4>
          </a>
          <a id="device" data="tablet">
            <img id="device-icon" src="https://static1.squarespace.com/static/5f649ec69d85e375950c27e6/t/5f7bb59f60b8b025f16a243b/1601942943150/Tablet.png" />
            <h4>Tablet</h4>
          </a>
        </div>
      </div>
    </div>
  `)

  $(contentDiv).append(deviceSelectionHtml)

  // isApple
  var isAppleHtml = $(`
    <div id="zolo-content">
      <div class="isapple" style="text-align: center;">
        <h3>Is it an Apple device?</h3>
        <div class='container-isapple'>
          <button class="modal-btn" id="isApple" data="true">Yes! It's is an Apple Device</button>
          <button class="modal-btn" id="isApple" data="false">No! Not Apple</button>
        </div>
      </div>
    </div>
  `)

  $(contentDiv).on('click', "a#device", (function (event) {
    event.preventDefault();
    deviceType = $(this).attr('data');
    console.log(`Device Type: ${deviceType} selected`);
    updateHtml(isAppleHtml)  
  }));

  // Device Issue
  deviceIssueHtml = (deviceOptions, issueOptions) => {
    let deviceOptionsHtml = ``;
    let issueOptionsHtml = ``;
    for (device of deviceOptions) {
      let _deviceType = Object.keys(device)[0]
      deviceOptionsHtml += `<option value='${_deviceType}'>${_deviceType}</option>`;
    };
    for (issue of issueOptions) {
      let _issueType = Object.keys(issue)[0]
      let _template = issue['template']
      issueOptionsHtml += `<option value='${_issueType}' template="${_template}">${_issueType}</option>`;
    };

    let html = `
      <div id="zolo-content">
        <div class="device-issue" style="text-align: center;">
          <h3>Now tell us, what's wrong?</h3>
          <div class='container-deviceissue'>
            <select class="btn-select" id="device-model">
              <option id="device-default" disabled selected="selected">Select Model</option>
              ${deviceOptionsHtml}
            </select>
            <select class="btn-select" id="issue-type">
              <option id="issue-default" disabled selected="selected">Select Issue</option>
              ${issueOptionsHtml}
            </select>
          </div>
          <a class="modal-next-btn" id="device-issue-next"><h4>Next ></h4></a>
        </div>
      </div>
    `
    return html;
  };

  $(contentDiv).on('click', "button#isApple", (function(event) {
    event.preventDefault();
    isApple = $(this).attr('data');
    console.log(`Apple Device: ${isApple}`);
    let config = (isApple == 'true') ? GlobalConfig['isApple'][deviceType] : GlobalConfig['notApple'][deviceType]
    updateHtml(
      deviceIssueHtml(config['models'], config['issues'])
    )
  }));
  
  // Temp remove until pricing data is sorted for price estimation
  // Cost
  // estimatedCostHtml = (templateToDisplay, issueType, estimatedCost) => {

  //   transformDescription = (templateToDisplay, issueType) => {
  //     let defaultDesc = `We will need to replace the ${issueType.toLowerCase()} </br>
  //     and we can turn this around within 24 </br>
  //     hours.`
  //     let templateDesc = GlobalConfig.issueDescription[`${templateToDisplay}`]
  //     if (templateDesc != undefined) {
  //       return templateDesc
  //     } else {
  //       return defaultDesc
  //     }
  //   }

  //   let issueDesc = transformDescription(templateToDisplay, issueType)

  //   let html = `
  //     <div id="zolo-content">
  //       <div class="cost" style="text-align: right;"> 
  //         <div class="container-cost">
  //           <h3>Okay, so here's the <br>diagnosis:</h3>
  //           <p>${issueDesc}</p>
  //           <div class="spacer"></div>
  //           <h3>It will cost:</br>      
  //           $${estimatedCost}</h3>
  //           <a class="modal-next-btn" id="cost-next"><h4>Next ></h4></a>
  //         </div>
  //       </div>
  //     </div>
  //   `
  //   return html;
  // }

  // $(contentDiv).on('click', 'a#device-issue-next', function() {
  //   if (issueType == undefined || (issueType == 'default' 
  //     || deviceModel == 'default' || deviceModel == undefined)) return;
  //   let template = getCostDiagnosisTemplate(isApple, deviceType, issueType);
  //   let estPrice = getEstimatedPrice(isApple, deviceType, deviceModel, issueType)
  //   updateHtml(
  //     estimatedCostHtml(template, issueType, estPrice)
  //   );
  //   $('div.featherlight-content').addClass('background-cost');
  // });

  // Listener for list options
  $(contentDiv).on('change', '.container-deviceissue > select', function() {
    selectType = $(this).attr('id')
    if (selectType == 'device-model') {
      deviceModel = $(this).val();
    } else {
      issueType = $(this).val();
    }
  });

  // Contact Infomation
  contactInformationHtml = () => {
    let estPrice = getEstimatedPrice(isApple, deviceType, deviceModel, issueType)
    let contactFormHtml = $(`
      <div id="zolo-content">
        <div class="contact-information">
          <div class="form-wrapper" id="yui_3_17_2_1_1603587943426_281">
          <div class="form-title"><h3>Please complete the below</h3></div>
          <div class="form-inner-wrapper" id="yui_3_17_2_1_1603587943426_385">
            <form data-form-id="5f80566ae2129337fe5f699b" data-success-redirect="" autocomplete="on" method="POST" action="https://crocodile-asparagus-y2gp.squarespace.com" onsubmit="return (function (form) {
                Y.use('squarespace-form-submit', 'node', function usingFormSubmit(Y) {
                (new Y.Squarespace.FormSubmit(form)).submit({
                formId: '5f80566ae2129337fe5f699b',
                collectionId: '5f8053a21bd8945aecaf4d92',
                objectName: 'page-section-5f8054306cbf2c124e1ba865'
                });
                });
                return false;
                })(this);" id="yui_3_17_2_1_1603587943426_384">
                <div class="field-list clear" id="yui_3_17_2_1_1603587943426_383">
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
                      <div class="option"><label><input type="radio" name="radio-yui_3_17_2_1_1603016307989_203780-field" value="Immediate pick-up (we’ll be there in two hours)"> Immediate pick-up (we’ll be there in two hours)</label></div>
                      <div class="option"><label><input type="radio" name="radio-yui_3_17_2_1_1603016307989_203780-field" value="Select time and date"> Select time and date</label></div>
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
                        <input class="field-element" style="display:none;" type="text" maxlength="2" data-title="Second">
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
                  <fieldset id="checkbox-yui_3_17_2_1_1603585132188_123440" class="form-item field checkbox required" aria-required="true">
                      <legend class="title">
                        Terms and Conditions
                        <span class="required" aria-hidden="true">*</span>
                      </legend>
                      <div class="option"><label><input type="checkbox" name="checkbox-yui_3_17_2_1_1603585132188_123440-field" value="I Agree to Terms"> I Agree to Terms</label></div>
                  </fieldset>
                  <input type="hidden" class="form-item field hidden" id="hidden-yui_3_17_2_1_1602289306229_90323" name="SQF_DEVICE_TYPE" value="${deviceType}">
                  <input type="hidden" class="form-item field hidden" id="hidden-yui_3_17_2_1_1602289306229_89145" name="SQF_ISAPPLE" value="${isApple}">
                  <input type="hidden" class="form-item field hidden" id="hidden-yui_3_17_2_1_1602289306229_88031" name="SQF_DEVICE_MODEL" value="${deviceModel}">
                  <input type="hidden" class="form-item field hidden" id="hidden-yui_3_17_2_1_1602289306229_86936" name="SQF_ISSUE_TYPE" value="${issueType}">
                  <input type="hidden" class="form-item field hidden" id="hidden-yui_3_17_2_1_1602289306229_85964" name="SQF_ESTIMATED_PRICE" value="${estPrice}">
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
                  <p>We’ll be in touch in 5 mins to provide a diagnosis.</p>
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
  const asapPickup = "#yui_3_17_2_1_1603017358193_267"
  const selectedWindow = "#yui_3_17_2_1_1603017358193_282"
  
  $(contentDiv).on('change', selectedWindow, function() {
    // unhide
    $("#date-yui_3_17_2_1_1602289306229_91434, #time-yui_3_17_2_1_1602289306229_92089").css('display','block');
  });

  $(contentDiv).on('change', asapPickup, function() {
    // clean up
    $("#date-yui_3_17_2_1_1602289306229_91434, #time-yui_3_17_2_1_1602289306229_92089").css('display','none');
  });

  $(contentDiv).on('click', 'a#device-issue-next', function() {
    if (issueType == undefined || (issueType == 'default' 
      || deviceModel == 'default' || deviceModel == undefined)) return;
      updateHtml(
        contactInformationHtml()
      );
  });
  
  // $(contentDiv).on('click', 'a#cost-next', function() {
  //   updateHtml(
  //     contactInformationHtml(),
  //     'div.cost'
  //   );
  //   $('div.featherlight-content').removeClass('background-cost');
  // });

  // Feather Light Setup / Cleanup
  cleanupAndSetup = () => {
    deviceType = deviceModel = null;
    issueType = isApple = null;
    updateHtml(deviceSelectionHtml)
  }

  let configuration = ({
    beforeOpen: function(event){
      cleanupAndSetup();
    }
  });
  
  $('a[data-featherlight="#booking-system"]').click(function() {
    $.featherlight(configuration);
  });
});