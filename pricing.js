var GlobalConfig = {
  isApple: {
    phone: {
      models: [ 
        {"iPhone 5": "0"}, 
        {"iPhone 5s": "0"},
        {"iPhone 6": "20"},
        {"iPhone 6 Plus": "20"},
        {"iPhone 6s": "30"},
        {"iPhone 6s Plus": "30"},
        {"iPhone 7": "50"},
        {"iPhone 7 Plus": "70"},
        {"iPhone 8": "80"},
        {"iPhone 8 Plus": "90"},
        {"iPhone X": "110"},
        {"iPhone XS": "110"},
        {"iPhone XS Max": "200"}
      ],
      issues: [ 
        {"Screen": "10", "template": "screen"}, 
        {"Battery": "20", "template": "battery"},
        {"Water Damage": "300", "template": "water", "ignoreModelPrice": true}
      ]
    },
    laptop: {
      models: [ 
        {"Macbook Pro": "100"}
      ],
      issues: [ 
        {"Hard Drive": "50"}, 
        {"Screen": "30"}, 
        {"Keyboard": "100"}
      ]
    },
    tablet: {
      models: [
        {"iPad Pro": "100"}
      ],
      issues: [
        {"Screen": "50"}, 
        {"Battery": "50"}
      ]
    }
  },
  notApple: {
    phone: {
      models: [
        {"Samsung S20": "100"}
      ],
      issues: [
        {"Screen": "20"}, 
        {"Battery": "100"}
      ]
    },
    laptop: {
      models: [ 
        {"Acer Laptop": "100"}
      ],
      issues: [
        {"Hard Drive": "50"}, 
        {"Screen": "100"}, 
        {"Keyboard": "100"}
      ]
    },
    tablet: {
      models: [
        {"Samsung Tablet": "50"}
      ],
      issues: [
        {"Screen": "100"}, 
        {"Battery": "50"}
      ]
    }
  },
  newVibeUpgradeOptions: {
    "battery": "40",
    "screen": "50",
    "housing": "50",
    "all": "50"
  },
  issueDescription: {
    "screen": "We will need to replace the screen <br>and we can turn this around within 24 <br>hours.",
    "battery": "issa broken.",
    "water": "put it in rice."
  }
}

