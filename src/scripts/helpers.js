$(document).ready(() => {

  // Helpers
  updateHtml = (string, removeSelector="div#zolo-content", appendSelector="div#booking-system" ) => {
    $(removeSelector).remove();
    $(appendSelector).append(string)
  }

  formatDate = (date) => {
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 101).toString().substring(1);
    let day = (date.getDate() + 100).toString().substring(1);
    return year + "-" + month + "-" + day;
  }

  getEstimatedPrice = (isApple, deviceType, deviceModel, issueType) => {
    let devicePrice, issuePrice, ignoreModelPrice = undefined;
    let config = (isApple == 'true') 
      ? GlobalConfig['isApple'][deviceType] : GlobalConfig['notApple'][deviceType]
    for (device of config['models']) {
      if (Object.keys(device)[0] == deviceModel) {
        devicePrice = device[deviceModel]
        break;
      }
    }
    for (issue of config['issues']) {
      if (Object.keys(issue)[0] == issueType) {
        ignoreModelPrice = issue["ignoreModelPrice"]
        issuePrice = issue[issueType]
        break;
      }
    }
    let total = (ignoreModelPrice) 
      ? parseInt(issuePrice) 
      : (parseInt(devicePrice) + parseInt(issuePrice))
    return total
  }

  getCostDiagnosisTemplate = (isApple, deviceType, issueType) => {
    let config = (isApple == 'true') ? GlobalConfig['isApple'][deviceType] : GlobalConfig['notApple'][deviceType]
    let result = undefined;
    for (issue of config['issues']) {
      if (Object.keys(issue)[0] == issueType) {
        result = issue.template;
        break;
      } else {
        result = false;
      }
    }
    return result;
  }
});