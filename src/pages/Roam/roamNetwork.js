// Roam waypoint network: which path each arrow leads to, and where each path sits on the map.
// Content (labels, descriptions, images) lives in the sheet — see data/roam-content.csv.
export const ROAM_NETWORK = {
  "A-to-Bhabua": {
    "mapEndpoints": {
      "from": "A",
      "to": "Bhabua"
    },
    "paths": {
      "down": "A-to-B",
      "left": "A-to-Chand"
    }
  },
  "A-to-Chand": {
    "mapEndpoints": {
      "from": "A",
      "to": "Chand"
    },
    "paths": {
      "down": "A-to-B",
      "right": "A-to-Bhabua"
    }
  },
  "A-to-B": {
    "mapEndpoints": {
      "from": "A",
      "to": "B"
    },
    "paths": {
      "up": "B-to-A",
      "down": "B-to-FF"
    }
  },
  "B-to-A": {
    "mapEndpoints": {
      "from": "B",
      "to": "A"
    },
    "paths": {
      "right": "A-to-Bhabua",
      "down": "B-to-FF",
      "left": "A-to-Chand"
    }
  },
  "B-to-FF": {
    "mapEndpoints": {
      "from": "B",
      "to": "FF"
    },
    "paths": {
      "down": "FF-to-EE",
      "up": "FF-to-B"
    }
  },
  "FF-to-B": {
    "mapEndpoints": {
      "from": "FF",
      "to": "B"
    },
    "paths": {
      "down": "FF-to-EE",
      "up": "B-to-A"
    }
  },
  "FF-to-EE": {
    "mapEndpoints": {
      "from": "FF",
      "to": "EE"
    },
    "paths": {
      "up": "FF-to-B",
      "down": "EE-to-C"
    }
  },
  "EE-to-FF": {
    "mapEndpoints": {
      "from": "EE",
      "to": "FF"
    },
    "paths": {
      "up": "FF-to-B",
      "down": "EE-to-C"
    }
  },
  "EE-to-C": {
    "mapEndpoints": {
      "from": "EE",
      "to": "C"
    },
    "paths": {
      "up": "C-to-EE",
      "down": "C-to-GG",
      "right": "C-to-V"
    }
  },
  "C-to-EE": {
    "mapEndpoints": {
      "from": "C",
      "to": "EE"
    },
    "paths": {
      "up": "EE-to-FF",
      "down": "C-to-GG",
      "right": "C-to-V"
    }
  },
  "C-to-V": {
    "mapEndpoints": {
      "from": "C",
      "to": "V"
    },
    "paths": {
      "down": "C-to-GG",
      "up": "C-to-EE"
    }
  },
  "C-to-GG": {
    "mapEndpoints": {
      "from": "C",
      "to": "GG"
    },
    "paths": {
      "up": "GG-to-C",
      "down": "GG-to-AA"
    }
  },
  "GG-to-C": {
    "mapEndpoints": {
      "from": "GG",
      "to": "C"
    },
    "paths": {
      "right": "C-to-V",
      "up": "C-to-EE",
      "down": "C-to-GG"
    }
  },
  "GG-to-AA": {
    "mapEndpoints": {
      "from": "GG",
      "to": "AA"
    },
    "paths": {
      "up": "AA-to-GG",
      "down": "AA-to-D",
      "left": "AA-to-BB"
    }
  },
  "AA-to-GG": {
    "mapEndpoints": {
      "from": "AA",
      "to": "GG"
    },
    "paths": {
      "up": "GG-to-C",
      "down": "GG-to-AA"
    }
  },
  "AA-to-D": {
    "mapEndpoints": {
      "from": "AA",
      "to": "D"
    },
    "paths": {
      "up": "D-to-AA",
      "left": "D-to-G",
      "down": "D-to-E"
    }
  },
  "D-to-AA": {
    "mapEndpoints": {
      "from": "D",
      "to": "AA"
    },
    "paths": {
      "left": "AA-to-BB",
      "up": "AA-to-GG",
      "down": "AA-to-D"
    }
  },
  "D-to-E": {
    "mapEndpoints": {
      "from": "D",
      "to": "E"
    },
    "paths": {
      "up": "E-to-D",
      "down": "E"
    }
  },
  "E-to-D": {
    "mapEndpoints": {
      "from": "E",
      "to": "D"
    },
    "paths": {
      "down": "D-to-E",
      "up": "D-to-AA",
      "left": "D-to-G"
    }
  },
  "E": {
    "mapEndpoints": {},
    "paths": {
      "up": "E-to-D"
    }
  },
  "D-to-G": {
    "mapEndpoints": {
      "from": "D",
      "to": "G"
    },
    "paths": {
      "right": "G-to-D",
      "left": "G-to-K"
    }
  },
  "G-to-D": {
    "mapEndpoints": {
      "from": "G",
      "to": "D"
    },
    "paths": {
      "up": "D-to-AA",
      "down": "D-to-E",
      "left": "D-to-G"
    }
  },
  "G-to-K": {
    "mapEndpoints": {
      "from": "G",
      "to": "K"
    },
    "paths": {
      "right": "K-to-G"
    }
  },
  "K-to-G": {
    "mapEndpoints": {
      "from": "K",
      "to": "G"
    },
    "paths": {
      "right": "G-to-D",
      "left": "G-to-K",
      "up": "G-to-M"
    }
  },
  "G-to-M": {
    "mapEndpoints": {
      "from": "G",
      "to": "M"
    },
    "paths": {
      "up": "M-to-N",
      "down": "M-to-G",
      "left": "M-to-L"
    }
  },
  "M-to-G": {
    "mapEndpoints": {
      "from": "M",
      "to": "G"
    },
    "paths": {
      "down": "G-to-D",
      "left": "G-to-K",
      "up": "G-to-M"
    }
  },
  "M-to-N": {
    "mapEndpoints": {
      "from": "M",
      "to": "N"
    },
    "paths": {}
  },
  "M-to-L": {
    "mapEndpoints": {
      "from": "M",
      "to": "L"
    },
    "paths": {}
  },
  "AA-to-BB": {
    "mapEndpoints": {
      "from": "AA",
      "to": "BB"
    },
    "paths": {
      "left": "BB-to-M",
      "right": "BB-to-AA"
    }
  },
  "BB-to-AA": {
    "mapEndpoints": {
      "from": "BB",
      "to": "AA"
    },
    "paths": {
      "up": "AA-to-GG",
      "down": "AA-to-D",
      "left": "AA-to-BB"
    }
  },
  "BB-to-M": {
    "mapEndpoints": {
      "from": "BB",
      "to": "M"
    },
    "paths": {
      "up": "M-to-N",
      "left": "M-to-L",
      "right": "M-to-BB"
    }
  },
  "M-to-BB": {
    "mapEndpoints": {
      "from": "M",
      "to": "BB"
    },
    "paths": {
      "left": "BB-to-M",
      "right": "BB-to-AA"
    }
  }
};
