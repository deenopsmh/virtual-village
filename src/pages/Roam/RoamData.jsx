// src/pages/Home/Roam/roamData.js
import imgD1 from '/src/assets/D to G.JPG';
import imgD2 from '/src/assets/D to AA.JPG';
import imgD3 from '/src/assets/D to Sherpur.JPG';

export const ROAM_DATA = {
  "point-D": {
    id: "point-D",
    name: "Chowk Bazaar (Point D)",
    description: "north of the temple · facing the bazaar",
    mapCoords: { top: 62.5, left: 62.6 }, 
    images: [
      { id: "d-1", src: imgD1, title: "Main View" },
      { id: "d-2", src: imgD2, title: "Alternate Angle" },
      { id: "d-3", src: imgD3, title: "Bazaar Entrance" },
    ],
    hotspots: [
      { id: "hd-1", label: "Walk to Hanuman Temple", top: 45, left: 35, targetNodeId: "point-G" },
      { id: "hd-2", label: "Ram Bahadur, 72", top: 55, left: 25, type: "interview" }
    ],
    paths: {
      left: "point-G",   
      up: "point-AA",    
      right: null,
      down: null
    },
    about: {
      text: "The lane runs north from the Hanuman temple toward the weekly bazaar. Cycle-rickshaws and goats pass under a tangle of electric wires that did not exist in 2004.",
      todo: ["Walk to the temple, tea shop, or a family home", "Listen to Ram Bahadur recall the lane in 2004"]
    },
    interview: {
      subject: "Ram Bahadur",
      role: "Farmer & village elder, 72",
      avatar: imgD3,
      quote: "When I was a child, there were only mud houses here. Much has changed — but our festivals remain the same."
    }
  },

  "point-AA": {
    id: "point-AA",
    name: "Bazaar Lane (Point AA)",
    description: "Central bazaar market corridor",
    mapCoords: { top: 54.0, left: 62.6 },
    images: [
      { id: "aa-1", src: imgD2, title: "Market Center" }
    ],
    hotspots: [],
    paths: {
      left: null,
      up: null,          // Can change to "point-BB" when that node asset is added
      right: null,
      down: "point-D"    // Returns south back to Chowk Bazaar
    },
    about: { 
      text: "A vibrant market row filled with local merchants. The traffic has grown steadily over the last decades.", 
      todo: ["Observe modern shop conversions", "Return South to the main square"] 
    },
    // interview: { 
    //   subject: "Bazaar Shopkeeper", 
    //   role: "Merchant", 
    //   quote: "The traffic has doubled here over the last decade." 
    // }
  },

  "point-G": {
    id: "point-G",
    name: "Daj Ganj Crossroads (Point G)",
    description: "Southern square near the village core",
    mapCoords: { top: 67.5, left: 50.5 },
    images: [
      { id: "g-1", src: imgD1, title: "Crossroads View" }
    ],
    hotspots: [],
    paths: {
      left: null,        
      up: "point-GG",
      right: "point-D",  // Paths eastward back to Chowk Bazaar
      down: null
    },
    about: { 
      text: "This node connects the lower residential quarters with the historic bazaar approach lanes.", 
      todo: ["Explore the branching residential footpaths", "Head East back to Point D"] 
    },
    interview: { 
      subject: "Elderly Resident", 
      role: "Weaver", 
      quote: "We used to walk through empty fields to get here." 
    }
  },

  
  "point-GG": {
    id: "point-GG",
    name: "Gola Gola (Point GG)",
    description: "Southern square near the village core",
    mapCoords: { top: 46.4, left: 68.8},
    images: [
      { id: "aa-1", src: imgD1, title: "GG View" }
    ],
    hotspots: [],
    paths: {
      left: null,        
      up: null,
      right: null,  // Paths eastward back to Chowk Bazaar
      down: "point-G"
    },
    about: { 
      text: "This node connects the lower residential quarters with the historic bazaar approach lanes.", 
      todo: ["Explore the branching residential footpaths", "Head East back to Point D"] 
    },
    interview: { 
      subject: "Elderly Resident", 
      role: "Weaver", 
      quote: "We used to walk through empty fields to get here." 
    }
  }
};