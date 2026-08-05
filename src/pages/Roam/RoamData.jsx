export const POINT_DATA = {
  "Chand": {
    mapPosition: { top: 6.5, left: 50.1 }
  },
  // "Jagariya": {
  //   mapPosition: { top: 48, left: 1196 }
  // },
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
  // "DD": {
  //   mapPosition: { top: 1266, left: 996 }
  // },
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


export const ROAM_DATA = {
  "A-to-Bhabua": {
    "label": "Road to Bhabua",
    "mapEndpoints": {
      "from": "A",
      "to": "Bhabua"
    },
    "paths": {
      // "right": "A-to-Bhabua",
      "down": "A-to-B",
      "left": "A-to-Chand"
    },
    "eras": {
      "2020s": {
        "description": "The road from Chand village continues on to the town of Bhabua, which Bhabua (or Kaimur) district headquarters. The road is an important area traffic artery. The crossroads with the main road from Chainpur serves as an essential bus stand.",
        "images": [
          {
            "src": "VV3 Images - Copy/A to Bhabua",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      },
      "2000s": {
        "description": "In 2000s, bottled water was not yet available in the shops around Chainpur.",
        "images": [
          {
            "src": "VV3 Images - Copy/A to Bhabua",
            "title": "Thana Road, 2004"
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "mitai-wala": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Mitai Wala",
            "description": "Similar to the many mitai wale (\"sweets sellers\") whose stores dot Chainpur's map of edibles, this one offers deserts of various kinds.",
            "images": [
              {
                "src": "VV3 Images - Copy/A to Bhabhua detail mitai wala",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "pakora": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Pakora and Gulab Jamun",
                "description": "As the mitai wala makes more sweets, he offers sugary delight gulab jamun (left) and fried samosas, which might be filled with peas or potatoes.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to Bhabhua detail mitai wala detail",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "utl-solar-store": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Store Selling Solar Technology",
            "description": "Lord Buddha Electronics offers solar panel installation among other products and services.",
            "images": [
              {
                "src": "VV3 Images - Copy/A UTL Solar store/A UTL Solar store enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "utl-solar-sign": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "UTL Solar Store Sign",
                "description": "\"When are you installing?\" asks the sign in Hindi advertising solar technology while also referencing Buddha in English and having an Indian national flag added.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A UTL Solar store/A UTL Solar store sign",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "water-tank": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "An Important Water Reservoir",
            "description": "Large \"tanks\" (\"reservoirs\") of water serve multiple purposes. The wide stairs leading down allow locals to bathe themselves and wash clothes and other items, while the tank also contains fish who are periodically harvested. A government initiative motivated many landowners to create tanks for aquaculture.",
            "images": [
              {
                "src": "VV3 Images - Copy/A to B tank/A to B tank ghat detail",
                "title": "",
                "focus_point": ""
              },
              {
                "src": "VV3 Images - Copy/A to B tank/A to B tank ghat distant",
                "title": "",
                "focus_point": ""
              },
              {
                "src": "VV3 Images - Copy/A to B tank/A to B tank oblong",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      }
    }
  },
  "A-to-Chand": {
    "label": "Thana to Chand village road",
    "mapEndpoints": {
      "from": "A",
      "to": "Chand"
    },
    "paths": {
      "down": "A-to-B",
      "right": "A-to-Bhabua"
    },
    "eras": {
      "2020s": {
        "description": "The road from the town of Bhabua to the village of Chand is an important area traffic artery. The crossroads with the main road from Chainpur serves as an essential bus stand.",
        "images": [
          {
            "src": "VV3 Images - Copy/A to Chand traffic photos/A to Chand",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "shyambabu-on-balcony": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Local Friend",
            "description": "A store owner greets a friend from his home's balcony.",
            "images": [
              {
                "src": "VV3 Images - Copy/A Shyambabu on balcony",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "detail-assortment": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Diversity of Traffic",
            "description": "The diversity of vehicles indicates the importance of this road for pedestrians, private vehicles, commercial vehicles, long-range buses, and short-range e-rickshaws.",
            "images": [
              {
                "src": "VV3 Images - Copy/A to Chand traffic photos/A to Chand traffic assortment",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "motorrickshaw": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "A Motor Rickshaw",
                "description": "Motor rickshaws run on either petrol or natural gas.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to Chand traffic photos/A to Chand traffic motorrickshaw",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "tata-nexon": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "A Tata Nexon",
                "description": "The Tata Nexon is among the newest vehicles evident in the area.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to Chand traffic photos/A to Chand traffic Tata Nexon",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "motorcycles": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "The Importance of Motorcycles",
                "description": "Motorcycles provide less expensive, rapid transport for many individuals and families, although accidents take their toll.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to Chand traffic photos/A to Chand traffic motorcycles",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "truck": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Agricultural Traffic",
                "description": "The importance of this road is also reflected with the presence of agricultural tractors serving local farmers and long-range trucks carrying harvested crops and other cargo.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to Chand traffic photos/A to Chand detail truck",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "kripa-vastraliya": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "The Vest Shop and Sari House",
            "description": "Enter a store for buying premade clothes, such as vests and saris",
            "images": [
              {
                "src": "VV3 Images - Copy/A Kripa Vastraliya and Sari House (place for vests)/A Kripa Vastraliya and Sari House",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "kripa-vastraliya-sign": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Vest Shop and Sari House",
                "description": "The sign reads 'Kripa Vest Shop and Sari House'",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A Kripa Vastraliya and Sari House sign",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "fashion-boy-shop": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Fashion Boy Clothing Shop",
            "description": "A ready-made clothing store stands behind a chai ('tea') stall.",
            "images": [
              {
                "src": "VV3 Images - Copy/A to Chand Fashion Boy shop enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "fashion-boy-sign": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "The Shop's Sign",
                "description": "In contrast with the clothing shop across the street, this one has a sign demonstrating how frequently English and the Roman script can be found in India, alongside other languages such as Hindi and Urdu and their scripts Devanagari and Nastaliq.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to Chand Fashion Boy shop detail",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "new-building-gym": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Gym under Construction",
            "description": "As perhaps the first gym to be created in Chainpur nears completion, its brick and concrete construction is apparent. Workers often use bamboo scaffolding during building construction and painting.",
            "images": [
              {
                "src": "VV3 Images - Copy/A new building gym/A new building gym oblong",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "ravidas-mandir": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Ravidas Mandir ('temple')",
            "description": "Ravidas represents an important religious figure for Chainpur's Dalit ('crushed' or low ritual status) communities. He lived in Benares (Varanasi) around the 14th century and is revered by many because he emphasized devotion to a formless deity without distinction of one's jati ('caste') or other social status.",
            "images": [
              {
                "src": "VV3 Images - Copy/A Ravidas mandir/A Ravidas mandir close",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "ravidas-mandir-context": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "The Context of the Temple",
                "description": "Religious architecture in Chainpur can emerge in almost any context, including along an important road like here.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A Ravidas mandir/A Ravidas mandir backside horizontal",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "ravidas-mandir-sign": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "A Sign for the Committee that Cares for the Mandir",
                "description": "The sign for the committee that cares for the mandir includes images of its members, Ravidas (as imagined by the artist), and Dr. B.R. Ambedkar.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A Ravidas mandir/A Ravidas mandir enter",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "ravidas-mandir-murti": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Murti ('Statue') of Ravidas",
                "description": "A murti of Ravidas stands central to the temple.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A Ravidas mandir/A Ravidas mandir murti",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "ravidas-mandir-ambedkar": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Images of Dr. B.R. Ambedkar",
                "description": "Dr. B.R. Ambedkar overcame the disadvantages of his Dalit background to become one of the most important leaders in India's 20th century independence movement, ultimately drafting the new country's constitution. He remains a hero for most Indians, but particularly Dalits.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A Ravidas mandir/A Ravidas mandir Ambedkar images",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      }
    }
  },
  "A-to-B": {
    "label": "A to B",
    "mapEndpoints": {
      "from": "A",
      "to": "B"
    },
    "paths": {
      "up": "B-to-A",
      "down": "B-to-FF",
      // "left": "A-to-Chand"
    },
    "eras": {
      "2020s": {
        "description": "School boys approach the bus stop in front of the thana (police station) as traffic flows along the main road to Chainpur.",
        "images": [
          {
            "src": "VV3 Images - Copy/A to B",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "fruit-shop": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Roadside Fruit Stand",
            "description": "Stands such as this are ubiquitous around Chainpur's bazaars and serve transient passengers and Chainpur's residents alike.",
            "images": [
              {
                "src": "VV3 Images - Copy/A to B fruit shop/A to B fruit shop enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "fruit-shop-detail": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Fruit",
                "description": "Kela ('bananas'), santara ('tangerines'), seb ('apples'), and anar ('pomegranate') are some of the fruits on sale today.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to B fruit shop/A to B fruit shop detail",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "line-of-e-scooters": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "E-Scooter",
            "description": "Electric rickshaws (E-scooters) became prevalent in Chainpur in the past decade, plying the way between the thana bus stop and Chowk, the center of Chainpur. They replaced labor-intensive bicycle rickshaws and more polluting motor rickshaws.",
            "images": [
              {
                "src": "VV3 Images - Copy/A to Bhabhua detail line of E-Scooters",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "plastic-package-store": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Sandeep Kirana Store",
            "description": "This store demonstrates the widescale use of plastic packaging for which Chainpur residents have little means of disposing when used. This represents a major change from twenty years ago.",
            "images": [
              {
                "src": "VV3 Images - Copy/A to B plastic package store/A to B plastic package store enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "sprite-stand": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Coca-Cola Product Stand",
            "description": "India protected its own soft drink market (such as some of the products here) from Coke until 1993. Glass bottles have given way to plastic ones and Coke products can be found even in villages such as Chainpur.",
            "images": [
              {
                "src": "VV3 Images - Copy/A to B Sprite stand",
                "title": "",
                "focus_point": { top: 28.4, left: 43.7 }
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "mahadev-mandir": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Sri Gauri Shankar Mahadev Mandir ('Temple')",
            "description": "Entrance to a temple dedicated to the goddess Gauri and the gods Shiv and Vishnu.",
            "images": [
              {
                "src": "VV3 Images - Copy/A to B Mahadev Mandir/A to B Sri Gauri Shankar Mahadev Mandir enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "mahadev-mandir-oblong": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Mandir",
                "description": "Like some other local temples, this temple has had additions and improvements included over time with funds that express the donors' devotion.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to B Mahadev Mandir/A to B Shankar Mahadev Mandir detail oblong",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "mahadev-mandir-sign": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Ramayan Epic Reading Advertisement",
                "description": "This advertisement posted on the temple grounds for the '25 Vān Shrī Rāmchit Mānas Mahādhiveshan' ('25th Annual Great Recitation of the Ramchitmanas'). The text is among the most popular religious texts in north India, describing the epic of Ram and his wife Sita in Hindi.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to B Mahadev Mandir/A to B Shankar Mahadev Mandir detail sign",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "mahadev-mandir-door": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Temple Entrance",
                "description": "A portico surrounds the mandir and includes images of various Hindu deities on its facade.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to B Mahadev Mandir/A to B Mahadev Mandir detail door",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "mahadev-mandir-facade-deities": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Hindu Deities on the Facade",
                "description": "The facade has images of the Hindu deities (clockwise from upper right) Ganesh; baby Ganesh with parents Shiv and Parvati; Durga; and Kali.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to B Mahadev Mandir/A to B Mahadev Mandir detail detail door vertical",
                    "title": "",
                    "focus_point": { top: 17.2, left: 53.4 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "mahadev-mandir-door-detail": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Mandir Door",
                "description": "The prevalence of swastikas in Hindu art and architecture often shocks Western visitors who do not understand that they are ancient symbols of auspiciousness.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to B Mahadev Mandir/A to B Mahadev Mandir detail detail door",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "fields": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Agricultural Fields",
            "description": "Villages are defined as much by the fields that surround them as by their habitations and other buildings. Crops like this of sarso (mustard) are the economic engine and a basic cultural reference point for most villages.",
            "images": [
              {
                "src": "VV3 Images - Copy/A to B fields",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "fields-thana-sunset": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "As the sun begins to set...",
                "description": "As the sun begins to set, a man drives his water buffalo out of the fields behind Chainpur's bus stand and the many buildings lining the Chand to Bhabua road.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/B to A fields to thana buildings BEST",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "cemetery": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Muslim Cemetery with Sufi Tombs",
            "description": "This Muslim cemetery includes two entrances: the one on the right leads to a burying ground for most Muslims while the one on the left leads to the tombs of two Sufis (revered Islamic figures).",
            "images": [
              {
                "src": "VV3 Images - Copy/A to B cemetery/A to B cemetery detail extra 2",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "cemetery-overview": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Cemetery",
                "description": "Muslims in South Asia bury their dead, usually in communal spaces. Sometimes, such as here, no gravestones mark the graves so as to no enable excessive mourning.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to B cemetery/A to B cemetery detail extra",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "cemetery-mazars": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Mazars ('Tombs') of Two Sufis",
                "description": "Devotees sometimes mark their devotion to a dead Sufi by adorning their mazar with a chadar ('sheet') covered in Islamic texts and/or images.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to B cemetery/A to B cemetery detail detail mazars",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {
              "cemetery-mazars-parallel": {
                "type": "side-view",
                "hotspotPosition": null,
                "eras": {
                  "2020s": {
                    "label": "Chadar Image Details",
                    "description": "Along with the special number '786' and the Islamic symbol of a star and the crescent moon, the images on these identical chadars ('sheets') show the Prophet's Mosque in Medina, one of the most popular pilgrimage sites for Muslims worldwide.",
                    "images": [
                      {
                        "src": "VV3 Images - Copy/A to B cemetery/A to B cemetery detail detail detail mazars parallel",
                        "title": "",
                        "focus_point": ""
                      }
                    ],
                    "interview": null
                  }
                },
                "activities": {}
              }
            }
          }
        }
      },
      "sadhu-on-bike": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Sadhu ('Hindu Ascetic')",
            "description": "Sadhus practice a life of detachment from the world. The degree of that detachment varies among them, with some earning a living through a profession and others living the life on a wanderer reliant on the generosity of others.",
            "images": [
              {
                "src": "VV3 Images - Copy/A to B saddhu on bike vertical",
                "title": "",
                "focus_point": { top: 18.7, left: 46.7 }
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      }
    }
  },
  "B-to-A": {
    "label": "B to A",
    "mapEndpoints": {
      "from": "B",
      "to": "A"
    },
    "paths": {
      "right": "A-to-Bhabua",
      "down": "B-to-FF",
      "left": "A-to-Chand"
    },
    "eras": {
      "2020s": {
        "description": "A view of the road leading from Chowk in Chainpur to the bus stand at the end. This is the northern edge of Chainpur's habitations and businesses.",
        "images": [
          {
            "src": "VV3 Images - Copy/A to B",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "fruit-shop": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Roadside Fruit Stand",
            "description": "Stands such as this are ubiquitous around Chainpur's bazaars and serve transient passengers and Chainpur's residents alike.",
            "images": [
              {
                "src": "VV3 Images - Copy/A to B fruit shop/A to B fruit shop enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "fruit-shop-detail": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Fruit",
                "description": "Kela ('bananas'), santara ('tangerines'), seb ('apples'), and anar ('pomegranate') are some of the fruits on sale today.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to B fruit shop/A to B fruit shop detail",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "line-of-e-scooters": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "E-Scooter",
            "description": "Electric rickshaws (E-scooters) became prevalent in Chainpur in the past decade, plying the way between the thana bus stop and Chowk, the center of Chainpur. They replaced labor-intensive bicycle rickshaws and more polluting motor rickshaws.",
            "images": [
              {
                "src": "VV3 Images - Copy/A to Bhabhua detail line of E-Scooters",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "plastic-package-store": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Sandeep Kirana Store",
            "description": "This store demonstrates the widescale use of plastic packaging for which Chainpur residents have little means of disposing when used. This represents a major change from twenty years ago.",
            "images": [
              {
                "src": "VV3 Images - Copy/A to B plastic package store/A to B plastic package store enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "sprite-stand": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Coca-Cola Product Stand",
            "description": "India protected its own soft drink market (such as some of the products here) from Coke until 1993. Glass bottles have given way to plastic ones and Coke products can be found even in villages such as Chainpur.",
            "images": [
              {
                "src": "VV3 Images - Copy/A to B Sprite stand",
                "title": "",
                "focus_point": { top: 28.4, left: 43.7 }
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "mahadev-mandir": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Sri Gauri Shankar Mahadev Mandir ('Temple')",
            "description": "Entrance to a temple dedicated to the goddess Gauri and the gods Shiv and Vishnu.",
            "images": [
              {
                "src": "VV3 Images - Copy/A to B Mahadev Mandir/A to B Sri Gauri Shankar Mahadev Mandir enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "mahadev-mandir-oblong": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Mandir",
                "description": "Like some other local temples, this temple has had additions and improvements included over time with funds that express the donors' devotion.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to B Mahadev Mandir/A to B Shankar Mahadev Mandir detail oblong",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "mahadev-mandir-sign": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Ramayan Epic Reading Advertisement",
                "description": "This advertisement posted on the temple grounds for the '25 Vān Shrī Rāmchit Mānas Mahādhiveshan' ('25th Annual Great Recitation of the Ramchitmanas'). The text is among the most popular religious texts in north India, describing the epic of Ram and his wife Sita in Hindi.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to B Mahadev Mandir/A to B Shankar Mahadev Mandir detail sign",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "mahadev-mandir-door": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Temple Entrance",
                "description": "A portico surrounds the mandir and includes images of various Hindu deities on its facade.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to B Mahadev Mandir/A to B Mahadev Mandir detail door",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "mahadev-mandir-facade-deities": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Hindu Deities on the Facade",
                "description": "The facade has images of the Hindu deities (clockwise from upper right) Ganesh; baby Ganesh with parents Shiv and Parvati; Durga; and Kali.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to B Mahadev Mandir/A to B Mahadev Mandir detail detail door vertical",
                    "title": "",
                    "focus_point": { top: 17.2, left: 53.4 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "mahadev-mandir-door-detail": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Mandir Door",
                "description": "The prevalence of swastikas in Hindu art and architecture often shocks Western visitors who do not understand that they are ancient symbols of auspiciousness.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to B Mahadev Mandir/A to B Mahadev Mandir detail detail door",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "fields": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Agricultural Fields",
            "description": "Villages are defined as much by the fields that surround them as by their habitations and other buildings. Crops like this of sarso (mustard) are the economic engine and a basic cultural reference point for most villages.",
            "images": [
              {
                "src": "VV3 Images - Copy/A to B fields",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "fields-thana-sunset": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Sun Setting",
                "description": "As the sun begins to set, a man drives his water buffalo out of the fields behind Chainpur's bus stand and the many buildings lining the Chand to Bhabua road.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/B to A fields to thana buildings BEST",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "cemetery": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Muslim Cemetery with Sufi Tombs",
            "description": "This Muslim cemetery includes two entrances: the one on the right leads to a burying ground for most Muslims while the one on the left leads to the tombs of two Sufis (revered Islamic figures).",
            "images": [
              {
                "src": "VV3 Images - Copy/A to B cemetery/A to B cemetery detail extra 2",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "cemetery-overview": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Cemetery",
                "description": "Muslims in South Asia bury their dead, usually in communal spaces. Sometimes, such as here, no gravestones mark the graves so as to no enable excessive mourning.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to B cemetery/A to B cemetery detail extra",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "cemetery-mazars": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Mazars ('Tombs') of Two Sufis",
                "description": "Devotees sometimes mark their devotion to a dead Sufi by adorning their mazar with a chadar ('sheet') covered in Islamic texts and/or images.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/A to B cemetery/A to B cemetery detail detail mazars",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {
              "cemetery-mazars-parallel": {
                "type": "side-view",
                "hotspotPosition": null,
                "eras": {
                  "2020s": {
                    "label": "Chadar Image Details",
                    "description": "Along with the special number '786' and the Islamic symbol of a star and the crescent moon, the images on these identical chadars ('sheets') show the Prophet's Mosque in Medina, one of the most popular pilgrimage sites for Muslims worldwide.",
                    "images": [
                      {
                        "src": "VV3 Images - Copy/A to B cemetery/A to B cemetery detail detail detail mazars parallel",
                        "title": "",
                        "focus_point": ""
                      }
                    ],
                    "interview": null
                  }
                },
                "activities": {}
              }
            }
          }
        }
      },
      "sadhu-on-bike": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Sadhu ('Hindu Ascetic')",
            "description": "Sadhus practice a life of detachment from the world. The degree of that detachment varies among them, with some earning a living through a profession and others living the life on a wanderer reliant on the generosity of others.",
            "images": [
              {
                "src": "VV3 Images - Copy/A to B saddhu on bike vertical",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      }
    }
  },
  "B-to-FF": {
    "label": "B to FF",
    "mapEndpoints": {
      "from": "B",
      "to": "FF"
    },
    "paths": {
            // "right": "A-to-Bhabua",
      "down": "FF-to-EE",
      "up": "FF-to-B",
      // "left": "A-to-Chand"
    },
    "eras": {
      "2020s": {
        "description": "A view of the road leading to Chowk in Chainpur from the bus stand. This is the northern edge of Chainpur's habitations and businesses.",
        "images": [
          {
            "src": "VV3 Images - Copy/B to FF 2",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "taj-on-door": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Islamic decorations",
            "description": "A clockface chalked on this store's door helps advertise the business of Golden Watch. The Islamic symbol of a crescent moon with star hangs above a similarly chalked image of the Taj Mahal in Agra. The artist includes a view of the garden in which this most iconic of Indian buildings stands. Meanwhile, the Arabic numbers above the door ('786') represent the Islamic system of abjad that assigns letters in words to numbers as a form of religious arithmetic. 786 is particularly auspicious.",
            "images": [
              {
                "src": "VV3 Images - Copy/B to FF (r) Taj on door",
                "title": "",
                "focus_point": { top: 38.6, left: 51.3 }
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "candidate-posters": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Posters on a Building",
            "description": "Multiple candidates have posted their advertisements here.",
            "images": [
              {
                "src": "VV3 Images - Copy/B to FF candidate posters",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "candidate-posters-inside": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Political Candidate's Poster",
                "description": "The poster by this political candidate for Chainpur's panchayat (village counsel) congratulates those celebrating the Hindu holidays of Dashara, Dhanteras, Diwali, and Dala Chat Puja.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/B to FF candidate posters inside",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "heritage-school-bus-partial": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Chainpur's expansion",
            "description": "Chainpur continues to grow, especially along the road between the thana and Chainpur Chowk. New homes and businesses emerge annually.",
            "images": [
              {
                "src": "VV3 Images - Copy/FF to B east Heritage Global School bus partial",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "heritage-school-bus": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Local Private School School Bus",
            "description": "Education is one of the fastest growing economic sectors in the Chainpur area, as well as in India as a whole. Parents have the choice of many more private schools and better government schools than two decades earlier.",
            "images": [
              {
                "src": "VV3 Images - Copy/FF to B east Heritage Global School bus",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "water-buffalo": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Water Buffalo",
            "description": "Water buffalo play a critical role in the agricultural economy. Not only do locals relish its milk - thicker and sweeter than a cow's - but also they take its dung, form it into patties mixed with straw, and dry it in the sun. The results are evident in the background and are used to fuel kitchen fires and fires to keep those guarding fields warm at night.",
            "images": [
              {
                "src": "VV3 Images - Copy/FF to B west buffalo best",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      }
    }
  },
  "FF-to-B": {
    "label": "FF to B",
    "mapEndpoints": {
      "from": "FF",
      "to": "B"
    },
    "paths": {
      "down": "FF-to-EE",
      "up": "B-to-A",
      // "left": "A-to-Chand"

    },
    "eras": {
      "2020s": {
        "description": "E-rickshaws and motorcycles pass one another along Chainpur's main road.",
        "images": [
          {
            "src": "VV3 Images - Copy/B to FF 2",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "taj-on-door": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Islamic Decorations",
            "description": "A clockface chalked on this store's door helps advertise the business of Golden Watch. The Islamic symbol of a crescent moon with star hangs above a similarly chalked image of the Taj Mahal in Agra. The artist includes a view of the garden in which this most iconic of Indian buildings stands. Meanwhile, the Arabic numbers above the door ('786') represent the Islamic system of abjad that assigns letters in words to numbers as a form of religious arithmetic. 786 is particularly auspicious.",
            "images": [
              {
                "src": "VV3 Images - Copy/B to FF (r) Taj on door",
                "title": "",
                "focus_point": { top: 38.6, left: 51.3 }
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "candidate-posters": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Posters on a Building",
            "description": "Multiple candidates have posted their advertisements here.",
            "images": [
              {
                "src": "VV3 Images - Copy/B to FF candidate posters",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "candidate-posters-inside": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Political Candidate's Poster",
                "description": "The poster by this political candidate for Chainpur's panchayat (village counsel) congratulates those celebrating the Hindu holidays of Dashara, Dhanteras, Diwali, and Dala Chat Puja.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/B to FF candidate posters inside",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "heritage-school-bus-partial": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Chainpur's Expansion",
            "description": "Chainpur continues to grow, especially along the road between the thana and Chainpur Chowk. New homes and businesses emerge annually.",
            "images": [
              {
                "src": "VV3 Images - Copy/FF to B east Heritage Global School bus partial",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "heritage-school-bus": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Local Private School School Bus",
            "description": "Education is one of the fastest growing economic sectors in the Chainpur area, as well as in India as a whole. Parents have the choice of many more private schools and better government schools than two decades earlier.",
            "images": [
              {
                "src": "VV3 Images - Copy/FF to B east Heritage Global School bus",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "water-buffalo": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Water Buffalo",
            "description": "Water buffalo play a critical role in the agricultural economy. Not only do locals relish its milk - thicker and sweeter than a cow's - but also they take its dung, form it into patties mixed with straw, and dry it in the sun. The results are evident in the background and are used to fuel kitchen fires and fires to keep those guarding fields warm at night.",
            "images": [
              {
                "src": "VV3 Images - Copy/FF to B west buffalo best",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      }
    }
  },
  "FF-to-EE": {
    "label": "FF to EE",
    "mapEndpoints": {
      "from": "FF",
      "to": "EE"
    },
    "paths": {
      "up": "FF-to-B",
      "down": "EE-to-C"
    },
    "eras": {
      "2020s": {
        "description": "A family, perhaps arriving from a bus journey, walks along Chainpur's main road.",
        "images": [
          {
            "src": "VV3 Images - Copy/FF to EE",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "agrawal-studio": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Family Store",
            "description": "The Agrawal family has run this shop for more than three decades. In the 1990s, it not only developed photographic film and made photocopies, but also had the first international telephone booth in Chainpur. Technological advances have made most of these services redundant.",
            "images": [
              {
                "src": "VV3 Images - Copy/EE to FF Agrawal Studio",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "oppo-shop": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Chainpur's First Franchise Store",
            "description": "Oppo opened the first franchise store to appear in Chainpur. The Chinese smartphone and electronics company has had its own retail stores in India only since 2017.",
            "images": [
              {
                "src": "VV3 Images - Copy/EE to FF Oppo shop",
                "title": "",
                "focus_point": { top: 36.6, left: 74.2 }
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "dried-gobar": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Dried gobar patties",
            "description": "These dried patties are a mixture of straw and gobar ('cow dung'). Although their smoke when burned in homes is unhealthy, they remain an inexpensive fuel source for those who cannot afford electricity or natural gas.",
            "images": [
              {
                "src": "VV3 Images - Copy/EE to FF west dried gobar",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "cool-creators-sign": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Cool Creators ad",
            "description": "Cool Creators advertises a wide variety of products, including 'fridges, standing closets, beds, sofas, blenders, irons, induction ovens, fans, coolers, and mobiles, etc.' Although written in Hindi and using some Hindi-origin terms, many of the words used on this ad derive from English terms taken up when the Western-originated technology was adopted by consumers.",
            "images": [
              {
                "src": "VV3 Images - Copy/EE to FF west sign EDIT",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      }
    }
  },
  "EE-to-FF": {
    "label": "EE to FF",
    "mapEndpoints": {
      "from": "EE",
      "to": "FF"
    },
    "paths": {
      "up": "FF-to-B",
      "down": "EE-to-C"
    },
    "eras": {
      "2020s": {
        "description": "An exceptionally durable road surface for Chainpur's main road was laid over the brick-paved and dirt road that had existed beforehand.  Metal shutters protect stores when closed for the night.",
        "images": [
          {
            "src": "VV3 Images - Copy/FF to EE",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "agrawal-studio": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Family Store",
            "description": "The Agrawal family has run this shop for more than three decades. In the 1990s, it not only developed photographic film and made photocopies, but also had the first international telephone booth in Chainpur. Technological advances have made most of these services redundant.",
            "images": [
              {
                "src": "VV3 Images - Copy/EE to FF Agrawal Studio",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "oppo-shop": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Chainpur's First Franchise Store",
            "description": "Oppo opened the first franchise store to appear in Chainpur. The Chinese smartphone and electronics company has had its own retail stores in India only since 2017.",
            "images": [
              {
                "src": "VV3 Images - Copy/EE to FF Oppo shop",
                "title": "",
                "focus_point": { top: 36.6, left: 74.2 }
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "dried-gobar": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Dried gobar patties",
            "description": "These dried patties are a mixture of straw and gobar ('cow dung'). Although their smoke when burned in homes is unhealthy, they remain an inexpensive fuel source for those who cannot afford electricity or natural gas.",
            "images": [
              {
                "src": "VV3 Images - Copy/EE to FF west dried gobar",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "cool-creators-sign": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Cool Creators ad",
            "description": "Cool Creators advertises a wide variety of products, including 'fridges, standing closets, beds, sofas, blenders, irons, induction ovens, fans, coolers, and mobiles, etc.' Although written in Hindi and using some Hindi-origin terms, many of the words used on this ad derive from English terms taken up when the Western-originated technology was adopted by consumers.",
            "images": [
              {
                "src": "VV3 Images - Copy/EE to FF west sign EDIT",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      }
    }
  },
  "EE-to-C": {
    "label": "EE to C",
    "mapEndpoints": {
      "from": "EE",
      "to": "C"
    },
    "paths": {
      "up": "C-to-EE",
      "down": "C-to-GG",
      "right": "C-to-V",

    },
    "eras": {
      "2020s": {
        "description": "The road to Chowk Bazaar passes a pair of Chainpur's many mandirs ('temples') and masjids ('mosques').",
        "images": [
          {
            "src": "VV3 Images - Copy/EE masjid/EE east 1",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "shiv-mandir": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Shiv mandir ('temple')",
            "description": "This small Shiv mandir stands nearly opposite a masjid and demonstrates common features to the area's temples.",
            "images": [
              {
                "src": "VV3 Images - Copy/EE mandir/EE to FF Shiv mandir enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "mandir-oblique": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Temple Architecture",
                "description": "Although small, this temple follows a common north Indian pattern of a porch-like entrance (mandapa) preceding the main, mountain-shaped garbhagriha in which the central deity resides.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/EE mandir/EE mandir oblique",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "mandir-entrance-mantra": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Mandir Entrance",
                "description": "A mantra above the mandir's entrance exclaims 'Salutation to you Sri Shiva.' The entrance gives the impression of entering a mountain.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/EE mandir/EE mandir Salutation to you Sri Shiva",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "mandir-garbagriha-entrance": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Entrance into Garbagriha",
                "description": "Leaves adorn the entrance into the garbagriha ('inner sanctuary'), which has a Shiv lingam and a murti of Nandi at center.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/EE mandir/EE temple entrance into garbagriha",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "mandir-garbagriha-detail": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Garbagriha Details",
                "description": "The Shiv lingam and the yoni in which it sits represent Shiv and Devi, and their union. Nandi the bull is Shiv's loyal devotee while on the wall opposite them an image of the goddess Durga - another expression of Devi - looks back at the visitor.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/EE mandir/EE temple garbagriha detail",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "masjid": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Chainpur's Busy Masjid",
            "description": "One of Chainpur's mosques can be found in the busy main bazaar. The posters on it reflect various elements of Muslim life in the area. The mosque is associated with the Deobandi movement.",
            "images": [
              {
                "src": "VV3 Images - Copy/EE masjid/EE east 2",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "masjid-shahadah": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Islamic Proclamation of Faith",
                "description": "Above the entrance to the mosque, the Islamic proclamation of faith - shahadah - declares La ilaha illah Allah, Muhammadur rasul Allah ('There is one God, and Muhammad is His Prophet').",
                "images": [
                  {
                    "src": "VV3 Images - Copy/EE masjid/EE east enter",
                    "title": "",
                    "focus_point": { top: 38.0, left: 49.9 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "masjid-posters-detail-1": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Ads for a girls' school, pilgrimage travel, and a celebration of the Prophet Muhammad's birthday",
                "description": "Although most Muslim women in Chainpur do not wear niqab (the covering of all of the head except for the face), this Urdu advertisement for a girls' school shows a student wearing it. To the left, a Hindi ad for Fatima Travels offers various prices for pilgrimage packages to hajj or umra. Above this, an ad in Hindi and Urdu for a conference and celebration to take place on the eve of the Prophet Muhammad's birthday.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/EE masjid/EE east detail 1 EDIT",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "masjid-posters-detail-2": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "An Ad for an Award Ceremony",
                "description": "This poster, mostly in Urdu, announces an event awarding ceremonial turbans to those involved in Islamic studies. Urdu's script derives from Arabic and Persian orthography and can be a highly developed art form.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/EE masjid/EE east detail 2 CLOSE",
                    "title": "",
                    "focus_point": { top: 34.7, left: 53.2 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      }
    }
  },
  "C-to-EE": {
    "label": "C to EE",
    "mapEndpoints": {
      "from": "C",
      "to": "EE"
    },
    "paths": {
      "up": "EE-to-FF",
      "down": "C-to-GG",
      "right": "C-to-V",
    },
    "eras": {
      "2020s": {
        "description": "In Chainpur, signs of agricultural activity are seldom far out of sight.  Goats feed while a motorcycle roars past.  An orange-painted mandir ('temple') stands across the street from a white-washed masjid ('mosque').",
        "images": [
          {
            "src": "VV3 Images - Copy/EE masjid/EE east 1",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "shiv-mandir": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Shiv Mandir ('temple')",
            "description": "This small Shiv mandir stands nearly opposite a masjid and demonstrates common features to the area's temples.",
            "images": [
              {
                "src": "VV3 Images - Copy/EE mandir/EE to FF Shiv mandir enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "mandir-oblique": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Temple Architecture",
                "description": "Although small, this temple follows a common north Indian pattern of a porch-like entrance (mandapa) preceding the main, mountain-shaped garbhagriha in which the central deity resides.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/EE mandir/EE mandir oblique",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "mandir-entrance-mantra": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Mandir Entrance",
                "description": "A mantra above the mandir's entrance exclaims 'Salutation to you Sri Shiva.' The entrance gives the impression of entering a mountain.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/EE mandir/EE mandir Salutation to you Sri Shiva",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "mandir-garbagriha-entrance": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Entrance into Garbagriha",
                "description": "Leaves adorn the entrance into the garbagriha ('inner sanctuary'), which has a Shiv lingam and a murti of Nandi at center.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/EE mandir/EE temple entrance into garbagriha",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "mandir-garbagriha-detail": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Garbagriha Details",
                "description": "The Shiv lingam and the yoni in which it sits represent Shiv and Devi, and their union. Nandi the bull is Shiv's loyal devotee while on the wall opposite them an image of the goddess Durga - another expression of Devi - looks back at the visitor.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/EE mandir/EE temple garbagriha detail",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "masjid": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Chainpurs' Busy Masjid",
            "description": "One of Chainpur's mosques can be found in the busy main bazaar. The posters on it reflect various elements of Muslim life in the area. The mosque is associated with the Deobandi movement.",
            "images": [
              {
                "src": "VV3 Images - Copy/EE masjid/EE east 2",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "masjid-shahadah": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "The Proclamation of Faith",
                "description": "Above the entrance to the mosque, the Islamic proclamation of faith - shahadah - declares La ilaha illah Allah, Muhammadur rasul Allah ('There is one God, and Muhammad is His Prophet').",
                "images": [
                  {
                    "src": "VV3 Images - Copy/EE masjid/EE east enter",
                    "title": "",
                    "focus_point": { top: 38.0, left: 49.9 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "masjid-posters-detail-1": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Ads for a girls' school, pilgrimage travel, and a celebration of the Prophet Muhammad's birthday",
                "description": "Although most Muslim women in Chainpur do not wear niqab (the covering of all of the head except for the face), this Urdu advertisement for a girls' school shows a student wearing it. To the left, a Hindi ad for Fatima Travels offers various prices for pilgrimage packages to hajj or umra. Above this, an ad in Hindi and Urdu for a conference and celebration to take place on the eve of the Prophet Muhammad's birthday.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/EE masjid/EE east detail 1 EDIT",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "masjid-posters-detail-2": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "An ad for an Award Ceremony",
                "description": "This poster, mostly in Urdu, announces an event awarding ceremonial turbans to those involved in Islamic studies. Urdu's script derives from Arabic and Persian orthography and can be a highly developed art form.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/EE masjid/EE east detail 2 CLOSE",
                    "title": "",
                    "focus_point": { top: 34.7, left: 53.2 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      }
    }
  },
  "C-to-V": {
    "label": "C to V",
    "mapEndpoints": {
      "from": "C",
      "to": "V"
    },
    "paths": {
      "down": "C-to-GG",
      "up": "C-to-EE"

    },
    "eras": {
      "2020s": {
        "description": "Heading east from this intersection leads one past an abandoned chai dukhan ('tea shop') and down this paved road to the muhalla ('neighborhood') of Sonahtiya.",
        "images": [
          {
            "src": "VV3 Images - Copy/C to V",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "plastic-pollution": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Pollution from Plastic Packaging",
            "description": "Discarded plastic packaging litters most village spaces not occupied by habitations, businesses, or cultivated fields. Without any regular trash collection service, the village has few options.",
            "images": [
              {
                "src": "VV3 Images - Copy/C to V north enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "pollution-details": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Details of pollution",
                "description": "Emptied plastic bags, plastic bottles, and plastic cups used for chai comprise some of the litter.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/C to V north detail best",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      }
    }
  },
  "C-to-GG": {
    "label": "C to GG",
    "mapEndpoints": {
      "from": "C",
      "to": "GG"
    },
    "paths": {
      "up": "GG-to-C",
      "down": "GG-to-AA",

    },
    "eras": {
      "2020s": {
        "description": "A man walks down the well-paved road to Chainpur's Chowk Bazaar wearing a long shalwar shirt and a lungi wrapped around his hips and reaching his ankles. The white scarf-like strip of cloth around his shoulders is a gamcha, the telltale piece of apparel that comes in various colors and indicates a Bihari man who works as a farmer.",
        "images": [
          {
            "src": "VV3 Images - Copy/C to GG",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "tripathi-home": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A purohit (ritual specialist) serving the Harsu Brahm mandir ('temple')",
            "description": "Ramesh Tripathi sits outside his family's home business, awaiting those who need his services at the village's most important mandir ('temple').",
            "images": [
              {
                "src": "VV3 Images - Copy/C to GG Tripathi home/C to GG left enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "pujari-advertisement": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "An advertisement for services offered by a family of pujaris (ritual specialists)",
                "description": "Below an invocation to Sri Harsu Brahm, the village's most popular resident deity, the advertisement identifies this place as 'Yellow House' and gives the names of the pujaris whose family was the 'Founder of Sri Harsu Brahm Trust and layer of the temple corner stone.' It then gives more names of the family's pujaris and their address in Chainpur. Pilgrims are offered a beautiful and clean place to stay. 'The cure of bodily, divine, material obstructions happens here.'",
                "images": [
                  {
                    "src": "VV3 Images - Copy/C to GG Tripathi home/C to GG left detail detail",
                    "title": "",
                    "focus_point": { top: 34.2, left: 43.6 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "ramesh-tripathi-leaving": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Ramesh Tripathi leaving for the Mandir",
                "description": "Ramesh Tripathi prepares to visit the mandir of Harsu Brahm to serve as pujari.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/C to GG Tripathi home/C to GG east Ramesh Tripathi",
                    "title": "",
                    "focus_point": { top: 25.5, left: 54.4 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "pujari-basket": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "The Pujari's Ritual Implements",
                "description": "In his basket, the pujari brings raisins for prasad (gifts to and from deities), a bell for drawing the deity's attention, a brass lota ('water vessel') for pouring libations, and red- and yellow-colored thread for tying protective rakshasutra bracelets around devotee wrists following the puja.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/C to GG Tripathi home/C to GG east Ramesh Tripathi basket with prasad",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      }
    }
  },
  "GG-to-C": {
    "label": "GG to C",
    "mapEndpoints": {
      "from": "GG",
      "to": "C"
    },
    "paths": {
      "right": "C-to-V",
      "up": "C-to-EE",
      "down": "C-to-GG",
    },
    "eras": {
      "2020s": {
        "description": "The closer to Chowk Bazaar, the denser the businesses become.  Stores for cloth, readymade clothing, paan, and home goods are all on display for those passing by.",
        "images": [
          {
            "src": "VV3 Images - Copy/C to GG",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "tripathi-home": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Purohit (ritual specialist) Serving the Harsu Brahm Mandir ('temple')",
            "description": "Ramesh Tripathi sits outside his family's home business, awaiting those who need his services at the village's most important mandir ('temple').",
            "images": [
              {
                "src": "VV3 Images - Copy/C to GG Tripathi home/C to GG left enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "pujari-advertisement": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "An advertisement for services offered by a family of pujaris (ritual specialists)",
                "description": "Below an invocation to Sri Harsu Brahm, the village's most popular resident deity, the advertisement identifies this place as 'Yellow House' and gives the names of the pujaris whose family was the 'Founder of Sri Harsu Brahm Trust and layer of the temple corner stone.' It then gives more names of the family's pujaris and their address in Chainpur. Pilgrims are offered a beautiful and clean place to stay. 'The cure of bodily, divine, material obstructions happens here.'",
                "images": [
                  {
                    "src": "VV3 Images - Copy/C to GG Tripathi home/C to GG left detail detail",
                    "title": "",
                    "focus_point": { top: 34.2, left: 43.6 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "ramesh-tripathi-leaving": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Ramesh Tripathi leaving for the Mandir",
                "description": "Ramesh Tripathi prepares to visit the mandir of Harsu Brahm to serve as pujari.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/C to GG Tripathi home/C to GG east Ramesh Tripathi",
                    "title": "",
                    "focus_point": { top: 25.5, left: 54.4 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "pujari-basket": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "The Pujari's Ritual Implements",
                "description": "In his basket, the pujari brings raisins for prasad (gifts to and from deities), a bell for drawing the deity's attention, a brass lota ('water vessel') for pouring libations, and red- and yellow-colored thread for tying protective rakshasutra bracelets around devotee wrists following the puja.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/C to GG Tripathi home/C to GG east Ramesh Tripathi basket with prasad",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      }
    }
  },
  "GG-to-AA": {
    "label": "GG to AA",
    "mapEndpoints": {
      "from": "GG",
      "to": "AA"
    },
    "paths": {
      "up": "AA-to-GG",
      "down": "AA-to-D",
      "left": "AA-to-BB",
    },
    "eras": {
      "2020s": {
        "description": "A school van brings children home at day's end, reflecting one of the Chainpur area's fastest growing sectors with increasing numbers of privately-run schools and improving government-run schools.",
        "images": [
          {
            "src": "VV3 Images - Copy/GG to AA",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "bicycle-repair": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Bicycle Repair Business",
            "description": "east Sitaram and Raju Paswan daily set up their bicycle repair business on the curbside in front of a vegetable store. Sitaram wears a shirt and lungi (long cloth worn around his waist) while Raju wears a T-shirt, shorts, and a gamcha, the cloth wrapped around the neck or slung on the shoulder that is pervasive among rural Bihari men.",
            "images": [
              {
                "src": "VV3 Images - Copy/GG to AA east Sitaram and Raju Paswan bicycle repairmen/GG to AA east Sitaram and Raju Paswan bicycle repairmen smile",
                "title": "",
                "focus_point": { top: 35.4, left: 63.2 }
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "paan-shop": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Paan Shop",
            "description": "Rajesh Kumar Chaurasiya has run his paan shop here for decades. He is surrounded by various plastic- and foil-wrapped treats but his speciality is preparing paan.",
            "images": [
              {
                "src": "VV3 Images - Copy/GG to AA Rajesh Kumar Chaurasiya paan dukhan/GG to AA Rajesh Kumar Chaurasiya paan dukhan detail",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "paan-wonders": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "The wonders of Paan",
                "description": "Consisting of betel nut wrapped in a leaf along with other ingredients, paan has been a delicacy in north India for centuries, once served in the courts of royalty. Betel causes a mild effect for the chewer while other ingredients - including coconut, tobacco, or cardamom - can be added. The shops of well-respected pan walas become destinations in their own right.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/GG to AA Rajesh Kumar Chaurasiya paan dukhan/GG to AA Rajesh Kumar Chaurasiya paan dukhan detail detail",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "paan-shop-sign": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Paan Shop Sign",
                "description": "The sign outside the shop reads 'Brother Ramji, paan wala.' 'Wala' means someone who does something.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/GG to AA Rajesh Kumar Chaurasiya paan dukhan/GG to AA Rajesh Kumar Chaurasiya paan dukhan enter",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      }
    }
  },
  "AA-to-GG": {
    "label": "AA to GG",
    "mapEndpoints": {
      "from": "AA",
      "to": "GG"
    },
    "paths": {
      "up": "GG-to-C",
      "down": "GG-to-AA",
    },
    "eras": {
      "2020s": {
        "description": "A Trees rarely find purchase in the crowded area around Chowk Bazaar where vegetables, snacks, and bags of rice are all sold, while others offer different services, such as bicycle repair.",
        "images": [
          {
            "src": "VV3 Images - Copy/GG to AA",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "bicycle-repair": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Bicycle Repair Business",
            "description": "east Sitaram and Raju Paswan daily set up their bicycle repair business on the curbside in front of a vegetable store. Sitaram wears a shirt and lungi (long cloth worn around his waist) while Raju wears a T-shirt, shorts, and a gamcha, the cloth wrapped around the neck or slung on the shoulder that is pervasive among rural Bihari men.",
            "images": [
              {
                "src": "VV3 Images - Copy/GG to AA east Sitaram and Raju Paswan bicycle repairmen/GG to AA east Sitaram and Raju Paswan bicycle repairmen smile",
                "title": "",
                "focus_point": { top: 35.4, left: 63.2 }
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "paan-shop": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Paan Shop",
            "description": "Rajesh Kumar Chaurasiya has run his paan shop here for decades. He is surrounded by various plastic- and foil-wrapped treats but his speciality is preparing paan.",
            "images": [
              {
                "src": "VV3 Images - Copy/GG to AA Rajesh Kumar Chaurasiya paan dukhan/GG to AA Rajesh Kumar Chaurasiya paan dukhan detail",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "paan-wonders": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "The Wonders of Paan",
                "description": "Consisting of betel nut wrapped in a leaf along with other ingredients, paan has been a delicacy in north India for centuries, once served in the courts of royalty. Betel causes a mild effect for the chewer while other ingredients - including coconut, tobacco, or cardamom - can be added. The shops of well-respected pan walas become destinations in their own right.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/GG to AA Rajesh Kumar Chaurasiya paan dukhan/GG to AA Rajesh Kumar Chaurasiya paan dukhan detail detail",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "paan-shop-sign": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Paan Shop Sign",
                "description": "The sign outside the shop reads 'Brother Ramji, paan wala.' 'Wala' means someone who does something.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/GG to AA Rajesh Kumar Chaurasiya paan dukhan/GG to AA Rajesh Kumar Chaurasiya paan dukhan enter",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      }
    }
  },
  "AA-to-D": {
    "label": "AA to D",
    "mapEndpoints": {
      "from": "AA",
      "to": "D"
    },
    "paths": {
      "up": "D-to-AA",
      "left": "D-to-G",
      "down": "D-to-E",
    },
    "eras": {
      "2020s": {
        "description": "The north-south road from the bus stand terminates in Chowk Bazaar. Chowk refers to a habitation's major intersection. In Chainpur, the road from the north intersects not only with the most important road leading east and west but also the entrance to the qila ('fort') where the busiest Hindu temple stands. That entrance begins under the large orange arch seen at the road's end.",
        "images": [
          {
            "src": "VV3 Images - Copy/AA TO D",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "shyam-babu-store": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Cloth Store and Social Place",
            "description": "The Chaurasiya family has run this clothing store for two generations.",
            "images": [
              {
                "src": "VV3 Images - Copy/AA to D Shyam Babu_s store/AA to D Shyam Babu_s store enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "chainpur-debate-society": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "The Store's Role as a Social Place",
                "description": "A group of friends - with diverse religious backgrounds, most of whom met in high school, and including a foreign ethnographer - have long made this store their social center.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/AA to D Shyam Babu_s store/AA to D Shyam Babu_s store Chainpur Debate Society",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "gestulations": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "An Argument",
                "description": "While the store owner folds material and his customer checks his phone, two friends argue with one another across the shop and an ideological divide.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/AA to D Shyam Babu_s store/AA to D Shyam Babu_s store gesticulations",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "ramzan-gear": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Muslim Men Prepare for Ramzan",
                "description": "Fahim and Mukhtar prepare to go to mosques for namaz ('regular prayer') during Ramzan (or Ramadan), the month when Muslims celebrate the first revelation of the Quran. Although Fahim regularly covers his head for Islamic reasons, Mukhtar only does for this month.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/AA to D Shyam Babu_s store/AA to D Shyam Babu_s store Ramzan gear",
                    "title": "",
                    "focus_point": { top: 35.7, left: 52.9 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "benarsi-bari-chai-dukhan": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Benarsi Bari's chai dukhan ('tea stall')",
            "description": "For patrons with the time, Benarsi Bari's chai dukhan offer tables and chairs inside. Others will hurriedly stop and enjoy their tea while briefly standing.",
            "images": [
              {
                "src": "VV3 Images - Copy/D to AA Benarsi Bari chai dukhan/D to AA Benarsi Bari chai dukhan enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "benarsi-bari-detail": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Visiting Benarsi Bari",
                "description": "Benarsi Bari doesn't own the tea shop but runs it, offering customers hot tea and fried snacks.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/D to AA Benarsi Bari chai dukhan/D to AA Benarsi Bari chai dukhan detail",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "benarsi-bari-sign": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Shivash Tea and Food Shop Sign",
                "description": "Shivash Tea and Food Shop.\nAddress: Sri Harsu Brahm Dham Road, Chainpur\nMakuni ['stuffed bread'], aloo chap ['potato fritters'], pakoras ['friend vegetables'], and channa ['chick peas'] can be found in our place.\nNote: Meals can also be had with an hour's notice.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/D to AA Benarsi Bari chai dukhan/D to AA Benarsi Bari chai dukhan sign",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "traffic-jam": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Traffic Jam",
            "description": "The growth in numbers of both Chainpur residents and pilgrims to Harsu Brahm's mandir ('temple') has made the chowk almost impassable from traffic at times.",
            "images": [
              {
                "src": "VV3 Images - Copy/D to AA traffic jam",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "two-wheeled-solutions": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Two-Wheeled Solutions",
            "description": "Two-wheeled transport offers an option that proves less expensive than cars, which most cannot afford, and better able to negotiate sometimes thick traffic and/or narrow roads.",
            "images": [
              {
                "src": "VV3 Images - Copy/D to AA east Asif cycle and motorcycle CROP",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      }
    }
  },
  "D-to-AA": {
    "label": "D to AA",
    "mapEndpoints": {
      "from": "D",
      "to": "AA"
    },
    "paths": {
      "left": "AA-to-BB",
      "up": "AA-to-GG",
      "down": "AA-to-D",
    },
    "eras": {
      "2020s": {
        "description": "Two women, one in an orange sari and one in a white sari, observe the street happenings with its traffic of children, adults, motor vehicles, and farm animals.",
        "images": [
          {
            "src": "VV3 Images - Copy/AA TO D",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "shyam-babu-store": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Cloth Store and Social Place",
            "description": "The Chaurasiya family has run this clothing store for two generations.",
            "images": [
              {
                "src": "VV3 Images - Copy/AA to D Shyam Babu_s store/AA to D Shyam Babu_s store enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "chainpur-debate-society": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "The Store's Role as a Social Place",
                "description": "A group of friends - with diverse religious backgrounds, most of whom met in high school, and including a foreign ethnographer - have long made this store their social center.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/AA to D Shyam Babu_s store/AA to D Shyam Babu_s store Chainpur Debate Society",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "gestulations": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "An argument",
                "description": "While the store owner folds material and his customer checks his phone, two friends argue with one another across the shop and an ideological divide.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/AA to D Shyam Babu_s store/AA to D Shyam Babu_s store gesticulations",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "ramzan-gear": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Muslim Men Prepare for Ramzan",
                "description": "Fahim and Mukhtar prepare to go to mosques for namaz ('regular prayer') during Ramzan (or Ramadan), the month when Muslims celebrate the first revelation of the Quran. Although Fahim regularly covers his head for Islamic reasons, Mukhtar only does for this month.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/AA to D Shyam Babu_s store/AA to D Shyam Babu_s store Ramzan gear",
                    "title": "",
                    "focus_point": { top: 35.7, left: 52.9 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "benarsi-bari-chai-dukhan": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Benarsi Bari's chai dukhan ('tea stall')",
            "description": "For patrons with the time, Benarsi Bari's chai dukhan offer tables and chairs inside. Others will hurriedly stop and enjoy their tea while briefly standing.",
            "images": [
              {
                "src": "VV3 Images - Copy/D to AA Benarsi Bari chai dukhan/D to AA Benarsi Bari chai dukhan enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "benarsi-bari-detail": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Visiting Benarsi Bari",
                "description": "Benarsi Bari doesn't own the tea shop but runs it, offering customers hot tea and fried snacks.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/D to AA Benarsi Bari chai dukhan/D to AA Benarsi Bari chai dukhan detail",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "benarsi-bari-sign": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Shivash Tea and Food Shop Sign",
                "description": "Shivash Tea and Food Shop.\nAddress: Sri Harsu Brahm Dham Road, Chainpur\nMakuni ['stuffed bread'], aloo chap ['potato fritters'], pakoras ['friend vegetables'], and channa ['chick peas'] can be found in our place.\nNote: Meals can also be had with an hour's notice.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/D to AA Benarsi Bari chai dukhan/D to AA Benarsi Bari chai dukhan sign",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "traffic-jam": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Traffic Jam",
            "description": "The growth in numbers of both Chainpur residents and pilgrims to Harsu Brahm's mandir ('temple') has made the chowk almost impassable from traffic at times.",
            "images": [
              {
                "src": "VV3 Images - Copy/D to AA traffic jam",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "two-wheeled-solutions": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Two-Wheeled Solutions",
            "description": "Two-wheeled transport offers an option that proves less expensive than cars, which most cannot afford, and better able to negotiate sometimes thick traffic and/or narrow roads.",
            "images": [
              {
                "src": "VV3 Images - Copy/D to AA east Asif cycle and motorcycle CROP",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      }
    }
  },
  "D-to-E": {
    "label": "D to E",
    "mapEndpoints": {
      "from": "D",
      "to": "E"
    },
    "paths": {
      "up": "E-to-D",
      "down": "E",
    },
    "eras": {
      "2020s": {
        "description": "The entrance to the qila ('fort') from which a raja ('ruler') is said to have reigned over the area until an injustice he committed against his Brahman vizier ('senior advisor') led the man to commit suicide. Harsu Pandey thus became Harsu Brahm, a vengeful ghost who destroyed the raja and most of his family.",
        "images": [
          {
            "src": "",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "qila-entrance": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Entering the Qila",
            "description": "A visitor, hunched with age, walks into the qila ('fort'), passing the bazaar serving devotees of Harsu Brahm with various ritual objects.",
            "images": [
              {
                "src": "VV3 Images - Copy/D to E actual",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "historic-arch": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "The Historic Arch",
            "description": "This arch has stood above the entrance to the qila for centuries. Locals believe that it represents the only surviving section of a wall that once surrounded the fort, which today is otherwise only evident from the large artificial mound on which the Harsu Brahm mandir ('temple') stands.",
            "images": [
              {
                "src": "VV3 Images - Copy/D to E arch",
                "title": "",
                "focus_point":  { top: 18.8, left: 66.0 }
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "midway-bazaar": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Stores sell items",
            "description": "Stores sell items serving not only the ritual needs of pilgrims and other devotees but also the desire of their family's children for toys.",
            "images": [
              {
                "src": "VV3 Images - Copy/D to E midway",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "brahm-murti-images": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "The Brahm's Photos for Sale",
                "description": "Besides various ritual implements, framed photos of Harsu Brahm's murti ('material manifestation') comprise part of this shop's merchandise.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/D to E shop detail with murti images",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "chappal-and-coconuts": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Ritual Items for Sale",
                "description": "Wooden sandals and coconuts, bound in colored cloth, represent important ritual offerings to Harsu Brahm.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/D to E shop with chappal and coconut offerings",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "bangles-shop": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Shop for bangles or toys",
                "description": "While visiting the mandir ('temple'), some devotees might shop for bangles or toys.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/D to E bangles shop",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "pilgrims-from-up": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Pilgrim's Car",
            "description": "The plates on this car suggest that it came Uttar Pradesh, the state neighboring Bihar to the west. This indicates how broadly devotion to Harsu Brahm has spread. Meanwhile, the poster behind advertises the services of a purohit (ritual specialist) who serves the brahm's mandir ('temple'). Toys and games stand alongside malas ('flower necklaces') and decorated cloths used as gifts to the deity propitiated by the devotee.",
            "images": [
              {
                "src": "VV3 Images - Copy/E detail pilgrims from UP EDIT",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "sufi-tomb": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Sufi's Tomb",
            "description": "The entrance to this Sufi's mazar ('tomb') is marked by two invocations of the Islamic name for god - 'Allah' - and the auspicious number 786.",
            "images": [
              {
                "src": "VV3 Images - Copy/D to E Sufi tomb/D to E Sufi tomb enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "sufi-tomb-detail": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Decorated Chadars",
                "description": "Devotees often cover Sufi mazars with decorated chadars ('coverings'). The chadar on the larger tomb has images of the Prophet's Mosque in Madina and the smaller one has images of the Kaba in Makkah, both in Saudi Arabia.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/D to E Sufi tomb/D to E Sufi tomb detail",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      }
    }
  },
  "E-to-D": {
    "label": "E to D",
    "mapEndpoints": {
      "from": "E",
      "to": "D"
    },
    "paths": {
      "down": "D-to-E",
      "up": "D-to-AA",
      "left": "D-to-G"

    },
    "eras": {
      "2020s": {
        "description": "These merchants make maximal use of their space, packing their wares densely on either side of the exit from the qila ('fort').",
        "images": [
          {
            "src": "",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "qila-entrance": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Entering the Qila",
            "description": "A visitor, hunched with age, walks into the qila ('fort'), passing the bazaar serving devotees of Harsu Brahm with various ritual objects.",
            "images": [
              {
                "src": "VV3 Images - Copy/D to E actual",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "historic-arch": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "The Historic Arch",
            "description": "This arch has stood above the entrance to the qila for centuries. Locals believe that it represents the only surviving section of a wall that once surrounded the fort, which today is otherwise only evident from the large artificial mound on which the Harsu Brahm mandir ('temple') stands.",
            "images": [
              {
                "src": "VV3 Images - Copy/D to E arch",
                "title": "",
                "focus_point":  { top: 18.8, left: 66.0 }
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "midway-bazaar": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Stores sell items",
            "description": "Stores sell items serving not only the ritual needs of pilgrims and other devotees but also the desire of their family's children for toys.",
            "images": [
              {
                "src": "VV3 Images - Copy/D to E midway",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "brahm-murti-images": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "The Brahm's Photos for Sale",
                "description": "Besides various ritual implements, framed photos of Harsu Brahm's murti ('material manifestation') comprise part of this shop's merchandise.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/D to E shop detail with murti images",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "chappal-and-coconuts": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Ritual Items for Sale",
                "description": "Wooden sandals and coconuts, bound in colored cloth, represent important ritual offerings to Harsu Brahm.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/D to E shop with chappal and coconut offerings",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "bangles-shop": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Shopping for Bangles or Toys",
                "description": "While visiting the mandir ('temple'), some devotees might shop for bangles or toys.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/D to E bangles shop",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "pilgrims-from-up": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Pilgrim's Car",
            "description": "The plates on this car suggest that it came Uttar Pradesh, the state neighboring Bihar to the west. This indicates how broadly devotion to Harsu Brahm has spread. Meanwhile, the poster behind advertises the services of a purohit (ritual specialist) who serves the brahm's mandir ('temple'). Toys and games stand alongside malas ('flower necklaces') and decorated cloths used as gifts to the deity propitiated by the devotee.",
            "images": [
              {
                "src": "VV3 Images - Copy/E detail pilgrims from UP EDIT",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "sufi-tomb": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Sufi's Tomb",
            "description": "The entrance to this Sufi's mazar ('tomb') is marked by two invocations of the Islamic name for god - 'Allah' - and the auspicious number 786.",
            "images": [
              {
                "src": "VV3 Images - Copy/D to E Sufi tomb/D to E Sufi tomb enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "sufi-tomb-detail": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Decorated Chadars",
                "description": "Devotees often cover Sufi mazars with decorated chadars ('coverings'). The chadar on the larger tomb has images of the Prophet's Mosque in Madina and the smaller one has images of the Kaba in Makkah, both in Saudi Arabia.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/D to E Sufi tomb/D to E Sufi tomb detail",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      }
    }
  },
  "E": {
    "label": "E",
    "mapEndpoints": {
    },
    "paths": {
      "up": "E-to-D"
    },
    "eras": {
      "2020s": {
        "description": "The Harsu Brahm Dham ('abode') dominates the top of the qila ('fort'), demonstrating the victory of a Brahman's vengeful ghost over a raja ('ruler') he once served as vizier ('advisor'). The building in front is for the havan ('fire sacrifice place').",
        "images": [
          {
            "src": "VV3 Images - Copy/E Harsu Brahm mandir over havan area",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "harsu-brahm-dham": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "T Harsu Brahm Dham ['Abode']",
            "description": "As some devotees exit carrying the platter with which they brought their offerings, others enter Harsu Brahm Dham by touching the threshold with their right hand before touching their head as a sign of respect.",
            "images": [
              {
                "src": "VV3 Images - Copy/E Harsu Brahm Dham 2026/E Harsu Brahm Dham BEST",
                "title": "",
                "focus_point": { top: 65.9, left: 55.6 }
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "devotees-sit": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Devotees Sitting",
                "description": "As some devotees make their way to receive darshan ('being seen') from Harsu Brahm, others spend more time in his presence, sitting in the courtyard facing his murti ('material form').",
                "images": [
                  {
                    "src": "VV3 Images - Copy/E Harsu Brahm Dham 2026/E Harsu Brahm Dham devotees sit",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "devotee-anjali": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "A Devotee's Anjali",
                "description": "Bowing his head, a devotee makes the reverential motion of an anjali mudra ('anjali hand position') toward the brahm's murti ('material form'), pressing his hands together.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/E Harsu Brahm Dham 2026/E Harsu Brahm Dham devotee anjali",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "murti-sthan": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Harsu Brahm's murti",
                "description": "Harsu Brahm's murti ('material form') is a stone. He took this form after his unjust death when he returned to Chainpur's qila as an angry Brahman ghost, or brahm.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/E Harsu Brahm Dham 2026/E Harsu Brahm Dham murti sthan",
                    "title": "",
                    "focus_point": { top: 35.7, left: 53.4 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "ceiling-design": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Ceiling Beautification",
                "description": "Over the decades, the dham has been expanded and beautified: even the mounts for the fans that prove so necessary in the summer months.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/E Harsu Brahm Dham 2026/E Harsu Brahm Dham ceiling design",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "havan-path": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Path towards the havan",
                "description": "These devotees exit toward the havan, a specially designed pit where brahmanic fire sacrifices are made. Vedic fire sacrifice dates to three thousand years ago.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/E Harsu Brahm Dham 2026/E Harsu Brahm Dham havan path BEST",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "stairs-up": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "The Stairs to Another Temple",
                "description": "A second and then a third floor were added to the dham ('abode') since 2000, with a temple to the goddess Durga as well.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/E Harsu Brahm Dham 2026/E Harsu Brahm Dham stairs up",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "chainpur-southern-edge": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "The Southern Edge of Chainpur",
            "description": "Chainpur's southern habitations effectively end at the fort with mostly its fields stretching beyond. In the dim distance is the start of the Kaimur Hills, which are part of the northern edge of India's central Deccan Plateau.",
            "images": [
              {
                "src": "VV3 Images - Copy/E to south",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "water-tank-scheme": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Water Tank Government Scheme",
                "description": "The state government created a scheme to increase access to fresh water that led to the construction of water towers here and elsewhere around the area.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/E to south water tank government scheme",
                    "title": "",
                    "focus_point": { top: 37.1, left: 50.1 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      }
    }
  },
  "D-to-G": {
    "label": "D to G",
    "mapEndpoints": {
      "from": "D",
      "to": "G"
    },
    "paths": {
      "right": "G-to-D",
      "left": "G-to-K"
    },
    "eras": {
      "2020s": {
        "description": "Children frequently run errands in the bazaar for their families. Perhaps a guest requires bottled water, if that's affordable to the family. Shops around Chainpur now carry bottled water. In the 1990s and 2000s this was not the case.",
        "images": [
          {
            "src": "VV3 Images - Copy/D to G",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "farm-tractor": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Farm Tractor with Grain",
            "description": "Tractors and their trailors are ubiquitous around Chainpur as farmers bring their harvests to mills and grain buyers located in and around this important area economic center.",
            "images": [
              {
                "src": "VV3 Images - Copy/unused main photos/farm tractor with trailer of grain vertical",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "buy-fish": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Buying fish",
            "description": "A fishmonger uses scales to weigh recently caught fish in preparation for selling them.",
            "images": [
              {
                "src": "VV3 Images - Copy/G to D right detail detail",
                "title": "",
                "focus_point": { top: 27.3, left: 61.1 }
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "buy-vegetables": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Buying vegetables",
            "description": "Various vegetables and melons are for sale.",
            "images": [
              {
                "src": "VV3 Images - Copy/G to D vegetables",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "top-in-town": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Food Cart",
            "description": "Top in Town offers various foods such as parathas, egg rolls, chicken rolls, and chicken egg rolls.",
            "images": [
              {
                "src": "VV3 Images - Copy/G to D Top in Town",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "chaurasiya-vastraliya": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Garment Shop Sign",
            "description": "The sign for this ready-made garment shop advertises 'Our place has saris, shirts, dress material, and ready-made vests at appropriate prices.' Notably, the models pictured all have very fair complexions. Many Chainpur residents - among many other Indians - equate beauty with fairer skin complexions.",
            "images": [
              {
                "src": "VV3 Images - Copy/unused main photos/G to D Chaurasiya vastraliya",
                "title": "",
                "focus_point": { top: 54.7, left: 58.1 }
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      }
    }
  },
  "G-to-D": {
    "label": "G to D",
    "mapEndpoints": {
      "from": "G",
      "to": "D"
    },
    "paths": {
      "up": "D-to-AA",
      "down": "D-to-E",
      "left": "D-to-G"

    },
    "eras": {
      "2020s": {
        "description": "A fish market takes advantage of an open stretch of ground on the side of the road leading from Chainpur to the village of Naughara.  Unfortunately, recent rains have left standing water that pedestrians must navigate.",
        "images": [
          {
            "src": "VV3 Images - Copy/D to G",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "farm-tractor": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Farm Tractor with Grain",
            "description": "Tractors and their trailors are ubiquitous around Chainpur as farmers bring their harvests to mills and grain buyers located in and around this important area economic center.",
            "images": [
              {
                "src": "VV3 Images - Copy/unused main photos/farm tractor with trailer of grain vertical",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "buy-fish": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Buying fish",
            "description": "A fishmonger uses scales to weigh recently caught fish in preparation for selling them.",
            "images": [
              {
                "src": "VV3 Images - Copy/G to D right detail detail",
                "title": "",
                "focus_point": { top: 27.3, left: 61.1 }
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "buy-vegetables": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Buying vegetables",
            "description": "Various vegetables and melons are for sale.",
            "images": [
              {
                "src": "VV3 Images - Copy/G to D vegetables",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "top-in-town": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Food Cart",
            "description": "Top in Town offers various foods such as parathas, egg rolls, chicken rolls, and chicken egg rolls.",
            "images": [
              {
                "src": "VV3 Images - Copy/G to D Top in Town",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "chaurasiya-vastraliya": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Garment Shop Sign",
            "description": "The sign for this ready-made garment shop advertises 'Our place has saris, shirts, dress material, and ready-made vests at appropriate prices.' Notably, the models pictured all have very fair complexions. Many Chainpur residents - among many other Indians - equate beauty with fairer skin complexions.",
            "images": [
              {
                "src": "VV3 Images - Copy/unused main photos/G to D Chaurasiya vastraliya",
                "title": "",
                "focus_point": { top: 54.7, left: 58.1 }
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      }
    }
  },
  "G-to-K": {
    "label": "G to K",
    "mapEndpoints": {
      "from": "G",
      "to": "K"
    },
    "paths": {
      "right": "K-to-G"
    },
    "eras": {
      "2020s": {
        "description": "A man and his wife travel on their motorcycle toward Naughara or Malik Sarai, two villages to the west of Chainpur.",
        "images": [
          {
            "src": "VV3 Images - Copy/G to K EDIT",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "jama-masjid": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Chainpur's Friday mosque",
            "description": "Although a Muslim community may use many mosques, most members will gather for the special Friday noon prayer at the Jama Masjid ('congregational mosque').",
            "images": [
              {
                "src": "VV3 Images - Copy/G to K and G to M Jama Masjid",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "jama-masjid-expand": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Jama Mosque Expansion",
                "description": "The Muslim community continues to expand the Jama Masjid, adding additional floors above and attachments alongside.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/G to M left detail 3",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "sufi-mazar": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Sufi Mazar alongside Jama Masjid",
            "description": "Chainpur Muslims have built a Sufi mazar ('tomb') alongside the Jama Masjid, which they continue to expand.",
            "images": [
              {
                "src": "VV3 Images - Copy/G to M Sufi mazar/G to M left detail 2",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "mazar-corner-view": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Corner View of the Mazar",
                "description": "The onion-dome represents one element of 'Islamicate' architecture. Not all buildings built by Muslims with such a dome are religious in design, but this architectural element stems from cultures deeply informed by Islamic influences.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/G to M Sufi mazar/G to M left enter",
                    "title": "",
                    "focus_point":  { top: 39.5, left: 58.3 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "sufi-tomb-inside": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Inside the Sufi's Tomb",
                "description": "With a gravestone at its head and a money box for donations at its foot, the tomb of the Sufi is covered in chadars and strings of flowers left by devotees.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/G to M Sufi mazar/G to M left detail horizontal",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "sufi-decorations": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "The Decorations Celebrating the Sufi",
                "description": "From an overhanging sheet, streamers of various sorts hang down in celebration of the Sufi.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/G to M Sufi mazar/G to M left detail vertical",
                    "title": "",
                    "focus_point": { top: 54.9, left: 59.4 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "hath-i-kua": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "The Elephant Well (or is it the Hand Well?)",
            "description": "Between the Jama Masjid and the road is a centuries-old stepwell. Some residents call it 'Hath Kua' and claim it is a 'hand well' for Muslims to do wudu ('ceremonial cleansing') before namaz ('regular prayers'). Others say that because the local raja built this to wash his elephant, its name is 'Hathi Kua.'",
            "images": [
              {
                "src": "VV3 Images - Copy/G to K Hath-i Kua",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "carved-lotus": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "A Carved Lotus",
                "description": "Although fallen leaves and plastic rubbish cover the stairs of the stepwell, some architectural flourishes, such as this stone-carved lotus - remain evident.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/G to K Hath(i) Kua arch lotus",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "nandlal-store": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Homeopathic Medicine",
            "description": "Although Nandlal's business - Sri Mahadev Medical Hall, as written above his head - focuses on homeopathic medicine, he also sells allopathic and ayurvedic medicines. Three generations of his family have run this shop.",
            "images": [
              {
                "src": "VV3 Images - Copy/G to K Nandlal's store",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "pappu-chai-dukhan": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Pappu's Chai Dukhan",
            "description": "Pappu and his brother Dhamendra have managed this chai dukhan ('tea shop') for decades. Some consider theirs the best tea and namkeen ('fried salty snacks') in Chainpur, while they also sell sweets like jalebis.",
            "images": [
              {
                "src": "VV3 Images - Copy/K to G Pappu and Dhamendra_s chai shop",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "watch-dharmendra": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Dharmendra Working",
                "description": "Dharmendra drops string beans into the fryer above an open flame.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/K to G Pappu and Dhamendra_s chai shop/K to G detail 1",
                    "title": "",
                    "focus_point": { top: 46.2, left: 57.5 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "try-namkeen": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Namkeen",
                "description": "Namkeen come in various sorts but are all fried salty snacks.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/K to G Pappu and Dhamendra_s chai shop/K to G detail detail 2",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "have-pakora": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Pakora",
                "description": "Pakoras are fried vegetables while triangular samosas may be stuffed with peas or potato, then fried.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/K to G Pappu and Dhamendra_s chai shop/K to G detail detail 1",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      }
    }
  },
  "K-to-G": {
    "label": "K to G",
    "mapEndpoints": {
      "from": "K",
      "to": "G"
    },
    "paths": {
      "right": "G-to-D",
      "left": "G-to-K",
      "up": "G-to-M"
    },
    "eras": {
      "2020s": {
        "description": "The bazaar extending to Chowk Bazaar from the westward road begins here.",
        "images": [
          {
            "src": "VV3 Images - Copy/G to K EDIT",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "jama-masjid": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Chainpur's Friday mosque",
            "description": "Although a Muslim community may use many mosques, most members will gather for the special Friday noon prayer at the Jama Masjid ('congregational mosque').",
            "images": [
              {
                "src": "VV3 Images - Copy/G to K and G to M Jama Masjid",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "jama-masjid-expand": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Jama Mosque Expansion",
                "description": "The Muslim community continues to expand the Jama Masjid, adding additional floors above and attachments alongside.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/G to M left detail 3",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "sufi-mazar": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Sufi Mazar alongside Jama Masjid",
            "description": "Chainpur Muslims have built a Sufi mazar ('tomb') alongside the Jama Masjid, which they continue to expand.",
            "images": [
              {
                "src": "VV3 Images - Copy/G to M Sufi mazar/G to M left detail 2",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "mazar-corner-view": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Corner View of the Mazar",
                "description": "The onion-dome represents one element of 'Islamicate' architecture. Not all buildings built by Muslims with such a dome are religious in design, but this architectural element stems from cultures deeply informed by Islamic influences.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/G to M Sufi mazar/G to M left enter",
                    "title": "",
                    "focus_point":  { top: 39.5, left: 58.3 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "sufi-tomb-inside": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Inside the Sufi's Tomb",
                "description": "With a gravestone at its head and a money box for donations at its foot, the tomb of the Sufi is covered in chadars and strings of flowers left by devotees.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/G to M Sufi mazar/G to M left detail horizontal",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "sufi-decorations": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "The Decorations Celebrating the Sufi",
                "description": "From an overhanging sheet, streamers of various sorts hang down in celebration of the Sufi.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/G to M Sufi mazar/G to M left detail vertical",
                    "title": "",
                    "focus_point": { top: 54.9, left: 59.4 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "hath-i-kua": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "The Elephant Well (or is it the Hand Well?)",
            "description": "Between the Jama Masjid and the road is a centuries-old stepwell. Some residents call it 'Hath Kua' and claim it is a 'hand well' for Muslims to do wudu ('ceremonial cleansing') before namaz ('regular prayers'). Others say that because the local raja built this to wash his elephant, its name is 'Hathi Kua.'",
            "images": [
              {
                "src": "VV3 Images - Copy/G to K Hath-i Kua",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "carved-lotus": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "A Carved Lotus",
                "description": "Although fallen leaves and plastic rubbish cover the stairs of the stepwell, some architectural flourishes, such as this stone-carved lotus - remain evident.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/G to K Hath(i) Kua arch lotus",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "nandlal-store": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Homeopathic Medicine",
            "description": "Although Nandlal's business - Sri Mahadev Medical Hall, as written above his head - focuses on homeopathic medicine, he also sells allopathic and ayurvedic medicines. Three generations of his family have run this shop.",
            "images": [
              {
                "src": "VV3 Images - Copy/G to K Nandlal's store",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      },
      "pappu-chai-dukhan": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Pappu's Chai Dukhan",
            "description": "Pappu and his brother Dhamendra have managed this chai dukhan ('tea shop') for decades. Some consider theirs the best tea and namkeen ('fried salty snacks') in Chainpur, while they also sell sweets like jalebis.",
            "images": [
              {
                "src": "VV3 Images - Copy/K to G Pappu and Dhamendra_s chai shop",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "watch-dharmendra": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Dharmendra Working",
                "description": "Dharmendra drops string beans into the fryer above an open flame.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/K to G Pappu and Dhamendra_s chai shop/K to G detail 1",
                    "title": "",
                    "focus_point": { top: 46.2, left: 57.5 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "try-namkeen": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Namkeen",
                "description": "Namkeen come in various sorts but are all fried salty snacks.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/K to G Pappu and Dhamendra_s chai shop/K to G detail detail 2",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "have-pakora": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Pakora",
                "description": "Pakoras are fried vegetables while triangular samosas may be stuffed with peas or potato, then fried.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/K to G Pappu and Dhamendra_s chai shop/K to G detail detail 1",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      }
    }
  },
  "G-to-M": {
    "label": "G to M",
    "mapEndpoints": {
      "from": "G",
      "to": "M"
    },
    "paths": {
      "up": "M-to-N",
      "down": "M-to-G",
      "left": "M-to-L"
    },
    "eras": {
      "2020s": {
        "description": "A devotee enters a Sufi mazar ('tomb') from this pathway.",
        "images": [
          {
            "src": "VV3 Images - Copy/G to M",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "jama-masjid": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Chainpur's Friday mosque",
            "description": "Although a Muslim community may use many mosques, most members will gather for the special Friday noon prayer at the Jama Masjid ('congregational mosque').",
            "images": [
              {
                "src": "VV3 Images - Copy/G to K and G to M Jama Masjid",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "jama-masjid-expand": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Jama Mosque Expansion",
                "description": "The Muslim community continues to expand the Jama Masjid, adding additional floors above and attachments alongside.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/G to M left detail 3",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "sufi-mazar": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Sufi Mazar alongside Jama Masjid",
            "description": "Chainpur Muslims have built a Sufi mazar ('tomb') alongside the Jama Masjid, which they continue to expand.",
            "images": [
              {
                "src": "VV3 Images - Copy/G to M Sufi mazar/G to M left detail 2",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "mazar-corner-view": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Corner View of the Mazar",
                "description": "The onion-dome represents one element of 'Islamicate' architecture. Not all buildings built by Muslims with such a dome are religious in design, but this architectural element stems from cultures deeply informed by Islamic influences.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/G to M Sufi mazar/G to M left enter",
                    "title": "",
                    "focus_point": { top: 39.5, left: 58.3 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "sufi-tomb-inside": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Inside the Sufi's Tomb",
                "description": "With a gravestone at its head and a money box for donations at its foot, the tomb of the Sufi is covered in chadars and strings of flowers left by devotees.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/G to M Sufi mazar/G to M left detail horizontal",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "sufi-decorations": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "The Decorations Celebrating the Sufi",
                "description": "From an overhanging sheet, streamers of various sorts hang down in celebration of the Sufi.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/G to M Sufi mazar/G to M left detail vertical",
                    "title": "",
                    "focus_point": { top: 54.9, left: 59.4 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      }
    }
  },
  "M-to-G": {
    "label": "M to G",
    "mapEndpoints": {
      "from": "M",
      "to": "G"
    },
    "paths": {
      "down": "G-to-D",
      "left": "G-to-K",
      "up": "G-to-M"
    },
    "eras": {
      "2020s": {
        "description": "This street passes in front of the very expensive house on the left, built by a family who had a member working overseas for two decades.",
        "images": [
          {
            "src": "VV3 Images - Copy/M to G",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "jama-masjid": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Chainpur's Friday mosque",
            "description": "Although a Muslim community may use many mosques, most members will gather for the special Friday noon prayer at the Jama Masjid ('congregational mosque').",
            "images": [
              {
                "src": "VV3 Images - Copy/G to K and G to M Jama Masjid",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "jama-masjid-expand": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Jama Mosque Expansion",
                "description": "The Muslim community continues to expand the Jama Masjid, adding additional floors above and attachments alongside.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/G to M left detail 3",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      },
      "sufi-mazar": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "Sufi Mazar alongside Jama Masjid",
            "description": "Chainpur Muslims have built a Sufi mazar ('tomb') alongside the Jama Masjid, which they continue to expand.",
            "images": [
              {
                "src": "VV3 Images - Copy/G to M Sufi mazar/G to M left detail 2",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {
          "mazar-corner-view": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Corner View of the Mazar",
                "description": "The onion-dome represents one element of 'Islamicate' architecture. Not all buildings built by Muslims with such a dome are religious in design, but this architectural element stems from cultures deeply informed by Islamic influences.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/G to M Sufi mazar/G to M left enter",
                    "title": "",
                    "focus_point": { top: 39.5, left: 58.3 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "sufi-tomb-inside": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "Inside the Sufi's Tomb",
                "description": "With a gravestone at its head and a money box for donations at its foot, the tomb of the Sufi is covered in chadars and strings of flowers left by devotees.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/G to M Sufi mazar/G to M left detail horizontal",
                    "title": "",
                    "focus_point": ""
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          },
          "sufi-decorations": {
            "type": "side-view",
            "hotspotPosition": null,
            "eras": {
              "2020s": {
                "label": "The Decorations Celebrating the Sufi",
                "description": "From an overhanging sheet, streamers of various sorts hang down in celebration of the Sufi.",
                "images": [
                  {
                    "src": "VV3 Images - Copy/G to M Sufi mazar/G to M left detail vertical",
                    "title": "",
                    "focus_point": { top: 54.9, left: 59.4 }
                  }
                ],
                "interview": null
              }
            },
            "activities": {}
          }
        }
      }
    }
  },
  "M-to-N": {
    "label": "M to N",
    "mapEndpoints": {
      "from": "M",
      "to": "N"
    },
    "paths": {
    },
    "eras": {
      "2020s": {
        "description": "This gali ('alley') leads to a neighborhood with three homes once owned by three brothers.",
        "images": [
          {
            "src": "VV3 Images - Copy/M to N",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {}
  },
  "M-to-L": {
    "label": "M to L DETAIL",
    "mapEndpoints": {
      "from": "M",
      "to": "L"
    },
    "paths": {},
    "eras": {
      "2020s": {
        "description": "This street leaves Jama Masjid and heads to Marai. Many homes pump water into large plastic water tanks on their roofs to ensure access to water in case of electrical outage, even though this usually only happens for a few hours daily.",
        "images": [
          {
            "src": "VV3 Images - Copy/M to L DETAIL",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {}
  },
  "AA-to-BB": {
    "label": "AA to BB",
    "mapEndpoints": {
      "from": "AA",
      "to": "BB"
    },
    "paths": {
      "left": "BB-to-M",
      "right": "BB-to-AA"
    },
    "eras": {
      "2020s": {
        "description": "A few businesses line the first few meters of this street leading from Chowk Bazaar before giving way to residences.",
        "images": [
          {
            "src": "VV3 Images - Copy/AA to BB",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "butchers-enter": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Butcher's Shop (note: graphic image)",
            "description": "Empty cages stand near a basket of beheaded chickens. Chainpur consumers of meat often see their meals at the first stage of their preparation.",
            "images": [
              {
                "src": "VV3 Images - Copy/AA to BB butchers/AA to BB butchers enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      }
    }
  },
  "BB-to-AA": {
    "label": "BB to AA",
    "mapEndpoints": {
      "from": "BB",
      "to": "AA"
    },
    "paths": {
      "up": "AA-to-GG",
      "down": "AA-to-D",
      "left": "AA-to-BB"
    },
    "eras": {
      "2020s": {
        "description": "This well-paved street with a deep run-off channel replaced the dirt street that existed thirty years ago. This makes passage much less muddy and challenging during the annual monsoon when rain barrages commonly fall.",
        "images": [
          {
            "src": "VV3 Images - Copy/BB to AA",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {
      "butchers-enter": {
        "type": "street-view",
        "hotspotPosition": null,
        "eras": {
          "2020s": {
            "label": "A Butcher's Shop (note: graphic image)",
            "description": "Empty cages stand near a basket of beheaded chickens. Chainpur consumers of meat often see their meals at the first stage of their preparation.",
            "images": [
              {
                "src": "VV3 Images - Copy/AA to BB butchers/AA to BB butchers enter",
                "title": "",
                "focus_point": ""
              }
            ],
            "interview": null
          }
        },
        "activities": {}
      }
    }
  },
  "BB-to-M": {
    "label": "BB to M",
    "mapEndpoints": {
      "from": "BB",
      "to": "M"
    },
    "paths": {
      "up": "M-to-N",
      "left": "M-to-L",
      "right": "M-to-BB"
    },
    "eras": {
      "2020s": {
        "description": "This road leads towards the muhalla ('neighborhood') of Marai in which a number of Muslim families live.",
        "images": [
          {
            "src": "VV3 Images - Copy/M to Marai",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {}
  },
  "M-to-BB": {
    "label": "M to BB",
    "mapEndpoints": {
      "from": "M",
      "to": "BB"
    },
    "paths": {
      "left": "BB-to-M",
      "right": "BB-to-AA",
    },
    "eras": {
      "2020s": {
        "description": "The road leads from muhallas ('neighborhoods') of Marai and Jama Masjid to Chowk Bazaar.",
        "images": [
          {
            "src": "VV3 Images - Copy/M to BB",
            "title": "",
            "focus_point": ""
          }
        ],
        "interview": null
      }
    },
    "activities": {}
  }
};
