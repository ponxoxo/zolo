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
        {"iPhone XS Max": "200"},
        {"iPhone SE": "200"},
        {"iPhone 11": "200"},
        {"iPhone 11 Pro": "200"},
        {"iPhone 11 Pro Max": "200"}
      ],
      issues: [ 
        {"Cracked Screen (front)": "10", "template": "screen"}, 
        {"Battery Service": "20", "template": "battery"},
        {"Back of phone is cracked": "300", "template": "water", "ignoreModelPrice": true},
        {"Screen or display quality (no screen cracks, just having issues with display)": "0"},
        {"Liquid and Water Damage": "0"},
        {"Camera not working": "0"},
        {"Unable to power on": "0"},
        {"Other": "0"}
      ]
    },
    laptop: {
      models: [ 
        {"MMacbook Pro 16”": "0"},
        {"Macbook Pro 15”": "0"},
        {"Macbook Pro 15”": "0"},
        {"Macbook": "0"},
        {"Macbook Air": "0"},
        {"iMac": "0"},
        {"iMac Pro": "0"}
      ],
      issues: [ 
        {"Cracked Screen (front)": "0"}, 
        {"Battery Service": "0"}, 
        {"Screen or display quality (no screen cracks, just having issues with display)": "0"},
        {"Liquid and Water Damage": "0"}, 
        {"Webcam": "0"}, 
        {"Unable to power on": "0"}, 
        {"Trackpad issues": "0"}, 
        {"Keyboard issues": "0"}, 
        {"Other": "0"}, 
      ]
    },
    tablet: {
      models: [
        {"iPad Air": "0"},
        {"iPad Mini": "0"}
      ],
      issues: [
        {"Cracked Screen (front)": "0", "template": "screen"}, 
        {"Battery Service": "0", "template": "battery"},
        {"Back of phone is cracked": "0", "template": "water", "ignoreModelPrice": true},
        {"Screen or display quality (no screen cracks, just having issues with display)": "0"},
        {"Liquid and Water Damage": "0"},
        {"Camera not working": "0"},
        {"Unable to power on": "0"},
        {"Other": "0"}
      ]
    }
  },
  notApple: {
    phone: {
      models: [
        {"Samsung Note 20 Ultra": "0"},
        {"Samsung Note 20": "0"},
        {"Samsung Galaxy S20+": "0"},
        {"Samsung Galaxy S20": "0"},
        {"Samsung Galaxy A21s": "0"},
        {"Samsung Galaxy A51": "0"},
        {"Samsung Galaxy A71": "0"},
        {"Samsung Galaxy S9+": "0"},
        {"Samsung Galaxy S9": "0"},
        {"Samsung Galaxy S8+": "0"},
        {"Samsung Galaxy S8": "0"},
        {"Samsung A50": "0"},
        {"Huawei P30 Pro": "0"},
        {"Huawei P30": "0"},
        {"Huawei P30 Lite": "0"},
        {"Huawei P40 Pro": "0"},
        {"Google Pixel 4 XL": "0"},
        {"Google Pixel 4": "0"},
        {"Google Pixel 3 XL": "0"},
        {"Google Pixel 3": "0"},
        {"Oppo Find X2 Pro": "0"},
        {"Oppo Find X2 Lite": "0"},
        {"Oppo A91": "0"}
      ],
      issues: [
        {"Cracked Screen (front)": "0", "template": "screen"}, 
        {"Battery Service": "0", "template": "battery"},
        {"Back of phone is cracked": "0", "template": "water", "ignoreModelPrice": true},
        {"Screen or display quality (no screen cracks, just having issues with display)": "0"},
        {"Liquid and Water Damage": "0"},
        {"Camera not working": "0"},
        {"Unable to power on": "0"},
        {"Other": "0"}
      ]
    },
    laptop: {
      models: [ 
        {"HP Laptop": "0"},
        {"Dell Laptop": "0"},
        {"Lenovo Laptop": "0"},
        {"Sony Laptop": "0"},
        {"Other": "0"},
        {"Desktop (all)": "0"}
      ],
      issues: [
        {"Cracked Screen (front)": "0", "template": "screen"}, 
        {"Battery Service": "0", "template": "battery"},
        {"Back of phone is cracked": "0", "template": "water", "ignoreModelPrice": true},
        {"Screen or display quality (no screen cracks, just having issues with display)": "0"},
        {"Liquid and Water Damage": "0"},
        {"Camera not working": "0"},
        {"Unable to power on": "0"},
        {"Other": "0"}
      ]
    },
    tablet: {
      models: [
        {"Samsung Tab S7": "0"},
        {"Samsung Tab S7+": "0"},
        {"Samsung Tab S6": "0"},
        {"Samsung Tab S4": "0"},
        {"Samsung Tab Pro 10.1": "0"},
        {"Samsung Tab Pro 8.4": "0"},
        {"Samsung Tab A 10.1": "0"},
        {"Samsung Tab A 8.0": "0"}
      ],
      issues: [
        {"Cracked Screen (front)": "0", "template": "screen"}, 
        {"Battery Service": "0", "template": "battery"},
        {"Back of phone is cracked": "0", "template": "water", "ignoreModelPrice": true},
        {"Screen or display quality (no screen cracks, just having issues with display)": "0"},
        {"Liquid and Water Damage": "0"},
        {"Camera not working": "0"},
        {"Unable to power on": "0"},
        {"Other": "0"}
      ]
    }
  },
  newVibeUpgradeOptions: {
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
    issues: {
    "battery": "40",
    "screen": "50",
    "housing": "50"
    }
  },
  issueDescription: {
    "screen": "We will need to replace the screen <br>and we can turn this around within 24 <br>hours.",
    "battery": "issa broken.",
    "water": "put it in rice."
  }
}

