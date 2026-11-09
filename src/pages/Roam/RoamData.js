import ROAM_CONTENT from "./roamContent.generated.json";

export const POINT_DATA = {
  "Chand": {
    mapPosition: { top: 6.5, left: 50.1 }
  },
  // Off-map destination: the "to Jagariya" road heading north from the main road near A
  "Jagariya": {
    mapPosition: { top: 2.0, left: 69.4 }
  },
  "Bhabua": {
    mapPosition: { top: 6.5, left: 82.0 }
  },
  "Sherpur": {
    mapPosition: { top: 78.5, left: 66.0 }
  },
  "A": {
    mapPosition: { top: 6.5, left: 65 }
  },
  "B": {
    mapPosition:  { top: 37.0, left: 65.1 },
  },
  "FF": {
    mapPosition: { top: 51.0, left: 61.9 }
  },
  // "T": {
  //   mapPosition: { top: 1009, left: 941 }
  // },
  // "S": {
  //   mapPosition: { top: 989, left: 798 }
  // },
  "EE": {
    mapPosition: { top: 60.9, left: 62.0 }
  },
  "C": {
    mapPosition: { top: 63.3, left: 61.5 }
  },
  "GG": {
    mapPosition: { top: 68.0, left: 62.0 }
  },
  "AA": {
    mapPosition: { top: 73.1, left: 62.0 }
  },
  "D": {
    mapPosition: { top: 78.3, left: 61.5 }
  },
  "E": {
    mapPosition: { top: 84.4, left: 61.5 }
  },
  "V": {
    mapPosition: { top: 63.5, left: 73.1 }
  },
  // "W": {
  //   mapPosition: { top: 1261, left: 1305 }
  // },
  // "X": {
  //   mapPosition: { top: 1315, left: 1491 }
  // },
  // DD: from the labelled waypoint map (old 1712x2002 pixels 996, 1266), same scale as C/K/N
  "DD": {
    mapPosition: { top: 63.6, left: 58.0 }
  },
  // "Y": {
  //   mapPosition: { top: 1327, left: 979 }
  // },
  // "P": {
  //   mapPosition: { top: 1226, left: 887 }
  // },
  // "O": {
  //   mapPosition: { top: 1341, left: 844 }
  // },
  "N": {
    mapPosition: { top: 69.4, left: 49.0 }
  },
  "M": {
    mapPosition: { top: 74.4, left: 51.3 }
  },
  // "Q": {
  //   mapPosition: { top: 1226, left: 750 }
  // },
  // "R": {
  //   mapPosition: { top: 1266, left: 761 }
  // },
  "L": {
    mapPosition: { top: 74.2, left: 43.0 }
  },
  "BB": {
    mapPosition: { top: 74.4, left: 57.8 }
  },
  "K": {
    mapPosition:  { top: 81.6, left: 42.7 }
  },
  "G": {
    mapPosition: { top: 80.9, left: 50.5 }
  },
  // Off-map destination: the "to Naugrah" road, lower left
  "Naughara": {
    mapPosition: { top: 94.0, left: 3.0 }
  },
  // "UH": {
  //   mapPosition: { top: 1750, left: 876 }
  // },
  // "I": {
  //   mapPosition: { top: 1798, left: 712 }
  // },
  // "J": {
  //   mapPosition: { top: 1841, left: 621 }
  // },
}

export const HOTSPOT_TYPE_ICONS = {
  "street-view": "🚶",
  "side-view": "🍮",
};

export const DEFAULT_HOTSPOT_ICON = "📍";

// Roam content is generated from the content sheet (data/roam-content.csv or the
// Google Sheet) by `npm run roam:content`, merged with the waypoint network in
// roamNetwork.js. Don't edit roamContent.generated.json by hand.

export const ROAM_DATA = ROAM_CONTENT;
