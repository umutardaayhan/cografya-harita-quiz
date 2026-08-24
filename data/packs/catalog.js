/**
 * 🗂️ PAKET KATALOĞU — paylaşılan kayıt defteri
 *
 * OTOMATİK ÜRETİLDİ — elle düzenlemeyin: node tools/build_packs.js
 *
 * `categories` ve `subTypes` TÜM ÜLKELERCE paylaşılır: ileride eklenecek
 * Almanya paketi de dağlarını aynı `daglar` kovasına doldurur. Çalışma zamanı
 * anahtarları OPAK slug kabul edilir; `canonical` alanı Faz 2 SQLite şemasının
 * `categories.id` sütununa eşlenir.
 */
const GEO_CATALOG = {
  schemaVersion: 1,
  defaultLang: "tr",
  langs: ["tr", "en"],
  countries: {
    tr: {
      code: "TUR", center: [39.0, 35.0], zoom: 6, bbox: [[35.8, 25.6], [42.3, 45.0]],
      i18n: { tr: { name: "Türkiye" }, en: { name: "Türkiye (Turkey)" } }
    }
  },
  categories: {
    "daglar": {
      "canonical": "mountains",
      "icon": "🏔️",
      "color": "#e67e22",
      "i18n": {
        "tr": {
          "title": "Dağlar",
          "short": "Dağ"
        },
        "en": {
          "title": "Mountains",
          "short": "Mtn"
        }
      }
    },
    "ovalar": {
      "canonical": "plains",
      "icon": "🌾",
      "color": "#27ae60",
      "i18n": {
        "tr": {
          "title": "Ovalar",
          "short": "Ova"
        },
        "en": {
          "title": "Plains",
          "short": "Plain"
        }
      }
    },
    "platolar": {
      "canonical": "plateaus",
      "icon": "⛰️",
      "color": "#d35400",
      "i18n": {
        "tr": {
          "title": "Platolar",
          "short": "Plato"
        },
        "en": {
          "title": "Plateaus",
          "short": "Plateau"
        }
      }
    },
    "su_kaynaklari": {
      "canonical": "waters",
      "icon": "🌊",
      "color": "#2980b9",
      "i18n": {
        "tr": {
          "title": "Akarsu & Göller",
          "short": "Sular"
        },
        "en": {
          "title": "Rivers & Lakes",
          "short": "Water"
        }
      }
    },
    "gecitler": {
      "canonical": "passes",
      "icon": "🚪",
      "color": "#8e44ad",
      "i18n": {
        "tr": {
          "title": "Geçitler & Boğazlar",
          "short": "Geçit"
        },
        "en": {
          "title": "Passes & Straits",
          "short": "Pass"
        }
      }
    },
    "tarim": {
      "canonical": "agriculture",
      "icon": "🚜",
      "color": "#84cc16",
      "i18n": {
        "tr": {
          "title": "Tarım Ürünleri",
          "short": "Tarım"
        },
        "en": {
          "title": "Agriculture",
          "short": "Agri"
        }
      }
    },
    "hayvancilik": {
      "canonical": "livestock",
      "icon": "🐑",
      "color": "#10b981",
      "i18n": {
        "tr": {
          "title": "Hayvancılık Alanları",
          "short": "Hayvan"
        },
        "en": {
          "title": "Livestock",
          "short": "Stock"
        }
      }
    },
    "sanayi": {
      "canonical": "industry",
      "icon": "🏭",
      "color": "#64748b",
      "i18n": {
        "tr": {
          "title": "Sanayi & Tesisler",
          "short": "Sanayi"
        },
        "en": {
          "title": "Industry",
          "short": "Ind"
        }
      }
    },
    "iklim": {
      "canonical": "climate",
      "icon": "🌡️",
      "color": "#f59e0b",
      "i18n": {
        "tr": {
          "title": "İklim & Uç Değerler",
          "short": "İklim"
        },
        "en": {
          "title": "Climate & Extremes",
          "short": "Climate"
        }
      }
    },
    "orman": {
      "canonical": "vegetation",
      "icon": "🌲",
      "color": "#16a34a",
      "i18n": {
        "tr": {
          "title": "Orman & Bitki Örtüsü",
          "short": "Orman"
        },
        "en": {
          "title": "Forest & Vegetation",
          "short": "Flora"
        }
      }
    },
    "iliskili_cografya": {
      "canonical": "relations",
      "icon": "🔗",
      "color": "#ec4899",
      "i18n": {
        "tr": {
          "title": "İlişkili Eşleştirme",
          "short": "Eşleştir"
        },
        "en": {
          "title": "Relations",
          "short": "Match"
        }
      }
    },
    "toprak": {
      "canonical": "soils",
      "icon": "🟫",
      "color": "#a16207",
      "i18n": {
        "tr": {
          "title": "Toprak Tipleri",
          "short": "Toprak"
        },
        "en": {
          "title": "Soil Types",
          "short": "Soil"
        }
      }
    },
    "afet": {
      "canonical": "hazards",
      "icon": "⚠️",
      "color": "#dc2626",
      "i18n": {
        "tr": {
          "title": "Doğal Afet Bölgeleri",
          "short": "Afet"
        },
        "en": {
          "title": "Natural Hazard Zones",
          "short": "Hazard"
        }
      }
    },
    "fay": {
      "canonical": "tectonics",
      "icon": "💥",
      "color": "#f97316",
      "i18n": {
        "tr": {
          "title": "Fay Hatları & Tektonik",
          "short": "Fay"
        },
        "en": {
          "title": "Faults & Tectonics",
          "short": "Fault"
        }
      }
    },
    "madenler": {
      "canonical": "minerals",
      "icon": "⛏️",
      "color": "#78716c",
      "i18n": {
        "tr": {
          "title": "Madenler & Enerji",
          "short": "Maden"
        },
        "en": {
          "title": "Minerals & Energy",
          "short": "Mineral"
        }
      }
    },
    "nufus": {
      "canonical": "population",
      "icon": "👥",
      "color": "#0ea5e9",
      "i18n": {
        "tr": {
          "title": "Nüfus & Yerleşme",
          "short": "Nüfus"
        },
        "en": {
          "title": "Population & Settlement",
          "short": "Pop."
        }
      }
    },
    "bolgeler": {
      "canonical": "regions",
      "icon": "🗺️",
      "color": "#7c3aed",
      "i18n": {
        "tr": {
          "title": "Bölgeler & Bölümler",
          "short": "Bölge"
        },
        "en": {
          "title": "Regions & Subregions",
          "short": "Region"
        }
      }
    },
    "kiyilar": {
      "canonical": "coasts",
      "icon": "🏖️",
      "color": "#06b6d4",
      "i18n": {
        "tr": {
          "title": "Kıyılar, Adalar & Denizler",
          "short": "Kıyı"
        },
        "en": {
          "title": "Coasts, Islands & Seas",
          "short": "Coast"
        }
      }
    },
    "dis_kuvvetler": {
      "canonical": "exogenic",
      "icon": "🌬️",
      "color": "#14b8a6",
      "i18n": {
        "tr": {
          "title": "Dış Kuvvetler & Şekiller",
          "short": "Dış Kuv."
        },
        "en": {
          "title": "Exogenic Landforms",
          "short": "Exogenic"
        }
      }
    },
    "turizm": {
      "canonical": "tourism",
      "icon": "🏛️",
      "color": "#eab308",
      "i18n": {
        "tr": {
          "title": "Turizm & Kültür Mirası",
          "short": "Turizm"
        },
        "en": {
          "title": "Tourism & Heritage",
          "short": "Tourism"
        }
      }
    },
    "ulasim": {
      "canonical": "transport",
      "icon": "🚢",
      "color": "#3b82f6",
      "i18n": {
        "tr": {
          "title": "Ulaşım & Ticaret",
          "short": "Ulaşım"
        },
        "en": {
          "title": "Transport & Trade",
          "short": "Transport"
        }
      }
    },
    "sehirler": {
      "canonical": "provinces",
      "icon": "🏛️",
      "color": "#3b82f6",
      "i18n": {
        "tr": {
          "title": "Şehirler (81 İl)",
          "short": "İller"
        },
        "en": {
          "title": "Provinces & 81 Cities",
          "short": "Cities"
        }
      }
    }
  },
  subTypes: {
    "daglar": [
      {
        "id": "all",
        "icon": "🏔️",
        "i18n": {
          "tr": {
            "label": "Tüm Dağlar"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "volkanik",
        "icon": "🌋",
        "i18n": {
          "tr": {
            "label": "Volkanik Dağlar"
          },
          "en": {
            "label": "Volcanic Mountains"
          }
        }
      },
      {
        "id": "kirik",
        "icon": "⚡",
        "i18n": {
          "tr": {
            "label": "Kırık Dağlar (Horst)"
          },
          "en": {
            "label": "Fault Mountains (Horst)"
          }
        }
      },
      {
        "id": "kivrim",
        "icon": "⛰️",
        "i18n": {
          "tr": {
            "label": "Kıvrım Dağları"
          },
          "en": {
            "label": "Fold Mountains"
          }
        }
      }
    ],
    "ovalar": [
      {
        "id": "all",
        "icon": "🌾",
        "i18n": {
          "tr": {
            "label": "Tüm Ovalar"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "delta",
        "icon": "🏖️",
        "i18n": {
          "tr": {
            "label": "Delta Ovaları (Kıyı)"
          },
          "en": {
            "label": "Delta Plains"
          }
        }
      },
      {
        "id": "tektonik",
        "icon": "💥",
        "i18n": {
          "tr": {
            "label": "Tektonik / Çöküntü"
          },
          "en": {
            "label": "Tectonic Plains"
          }
        }
      },
      {
        "id": "karstik",
        "icon": "💧",
        "i18n": {
          "tr": {
            "label": "Karstik (Polye)"
          },
          "en": {
            "label": "Karstic Plains (Polje)"
          }
        }
      },
      {
        "id": "volkanik_ova",
        "icon": "🌋",
        "i18n": {
          "tr": {
            "label": "Volkanik Ovalar"
          },
          "en": {
            "label": "Volcanic Plains"
          }
        }
      }
    ],
    "platolar": [
      {
        "id": "all",
        "icon": "⛰️",
        "i18n": {
          "tr": {
            "label": "Tüm Platolar"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "volkanik",
        "icon": "🌋",
        "i18n": {
          "tr": {
            "label": "Volkanik (Lav) Platoları"
          },
          "en": {
            "label": "Volcanic Mountains"
          }
        }
      },
      {
        "id": "karstik",
        "icon": "💧",
        "i18n": {
          "tr": {
            "label": "Karstik Platolar"
          },
          "en": {
            "label": "Karstic Plains (Polje)"
          }
        }
      },
      {
        "id": "asinim",
        "icon": "📉",
        "i18n": {
          "tr": {
            "label": "Aşınım (Peneplen) Platoları"
          },
          "en": {
            "label": "Erosion (Peneplain) Plateaus"
          }
        }
      },
      {
        "id": "tabaka",
        "icon": "🥞",
        "i18n": {
          "tr": {
            "label": "Tabaka Düzlüğü Platoları"
          },
          "en": {
            "label": "Strata Plateaus"
          }
        }
      }
    ],
    "su_kaynaklari": [
      {
        "id": "all",
        "icon": "🌊",
        "i18n": {
          "tr": {
            "label": "Tüm Su Kaynakları"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "akarsular",
        "icon": "〰️",
        "i18n": {
          "tr": {
            "label": "Akarsular / Nehirler"
          },
          "en": {
            "label": "Rivers"
          }
        }
      },
      {
        "id": "goller",
        "icon": "🏞️",
        "i18n": {
          "tr": {
            "label": "Tüm Göller (30+)"
          },
          "en": {
            "label": "Lakes"
          }
        }
      },
      {
        "id": "tektonik_gol",
        "icon": "💥",
        "i18n": {
          "tr": {
            "label": "Tektonik Göller"
          },
          "en": {
            "label": "Tectonic Lakes"
          }
        }
      },
      {
        "id": "karstik_gol",
        "icon": "💧",
        "i18n": {
          "tr": {
            "label": "Karstik Göller"
          },
          "en": {
            "label": "Karstic Lakes"
          }
        }
      },
      {
        "id": "volkanik_gol",
        "icon": "🌋",
        "i18n": {
          "tr": {
            "label": "Volkanik & Set Gölleri"
          },
          "en": {
            "label": "Volcanic & Crater Lakes"
          }
        }
      },
      {
        "id": "heyelan_gol",
        "icon": "⛰️",
        "i18n": {
          "tr": {
            "label": "Heyelan Set Gölleri"
          },
          "en": {
            "label": "Landslide Barrier Lakes"
          }
        }
      },
      {
        "id": "kiyi_aluvyal_gol",
        "icon": "🏖️",
        "i18n": {
          "tr": {
            "label": "Kıyı Set (Lagün) & Alüvyal"
          },
          "en": {
            "label": "Lagoon & Alluvial Lakes"
          }
        }
      },
      {
        "id": "buzul_gol",
        "icon": "❄️",
        "i18n": {
          "tr": {
            "label": "Buzul (Sirk) Gölleri"
          },
          "en": {
            "label": "Glacial (Cirque) Lakes"
          }
        }
      }
    ],
    "gecitler": [
      {
        "id": "all",
        "icon": "🚪",
        "i18n": {
          "tr": {
            "label": "Tüm Geçit & Boğazlar"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "karadeniz",
        "icon": "🌲",
        "i18n": {
          "tr": {
            "label": "Karadeniz Geçitleri"
          },
          "en": {
            "label": "Black Sea Passes"
          }
        }
      },
      {
        "id": "akdeniz",
        "icon": "☀️",
        "i18n": {
          "tr": {
            "label": "Akdeniz Geçitleri"
          },
          "en": {
            "label": "Mediterranean Passes"
          }
        }
      },
      {
        "id": "bogazlar",
        "icon": "🌉",
        "i18n": {
          "tr": {
            "label": "Deniz Boğazları"
          },
          "en": {
            "label": "Sea Straits"
          }
        }
      }
    ],
    "tarim": [
      {
        "id": "all",
        "icon": "🚜",
        "i18n": {
          "tr": {
            "label": "Tüm Tarım Ürünleri"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "endustri",
        "icon": "🏭",
        "i18n": {
          "tr": {
            "label": "Endüstri & Yağ Bitkileri"
          },
          "en": {
            "label": "Industrial & Oil Crops"
          }
        }
      },
      {
        "id": "meyve",
        "icon": "🍑",
        "i18n": {
          "tr": {
            "label": "Meyvecilik"
          },
          "en": {
            "label": "Fruit Growing"
          }
        }
      },
      {
        "id": "tahil",
        "icon": "🌾",
        "i18n": {
          "tr": {
            "label": "Tahıl & Baklagil"
          },
          "en": {
            "label": "Grains & Legumes"
          }
        }
      },
      {
        "id": "ihrac",
        "icon": "🚢",
        "i18n": {
          "tr": {
            "label": "İhraç Ürünleri"
          },
          "en": {
            "label": "Export Crops"
          }
        }
      }
    ],
    "hayvancilik": [
      {
        "id": "all",
        "icon": "🐑",
        "i18n": {
          "tr": {
            "label": "Tüm Hayvancılık Türleri"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "buyukbas",
        "icon": "🐂",
        "i18n": {
          "tr": {
            "label": "Büyükbaş (Mera/Çayır)"
          },
          "en": {
            "label": "Cattle (Pasture)"
          }
        }
      },
      {
        "id": "kucukbas",
        "icon": "🐐",
        "i18n": {
          "tr": {
            "label": "Küçükbaş (Koyun/Keçi)"
          },
          "en": {
            "label": "Sheep & Goat"
          }
        }
      },
      {
        "id": "diger_hayvan",
        "icon": "🐝",
        "i18n": {
          "tr": {
            "label": "Arıcılık & Kümes & İpek"
          },
          "en": {
            "label": "Beekeeping, Poultry & Silk"
          }
        }
      }
    ],
    "sanayi": [
      {
        "id": "all",
        "icon": "🏭",
        "i18n": {
          "tr": {
            "label": "Tüm Sanayi Tesisleri"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "demir_celik",
        "icon": "⚙️",
        "i18n": {
          "tr": {
            "label": "Demir-Çelik"
          },
          "en": {
            "label": "Iron & Steel"
          }
        }
      },
      {
        "id": "rafineri",
        "icon": "🛢️",
        "i18n": {
          "tr": {
            "label": "Rafineri & Petrokimya"
          },
          "en": {
            "label": "Refinery & Petrochemical"
          }
        }
      },
      {
        "id": "imalat",
        "icon": "🧵",
        "i18n": {
          "tr": {
            "label": "Otomotiv & Dokuma & İmalat"
          },
          "en": {
            "label": "Automotive, Textile & Manufacturing"
          }
        }
      }
    ],
    "iklim": [
      {
        "id": "all",
        "icon": "🌡️",
        "i18n": {
          "tr": {
            "label": "Tüm İklim Konuları"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "kusaklar",
        "icon": "🗺️",
        "i18n": {
          "tr": {
            "label": "İklim Kuşakları"
          },
          "en": {
            "label": "Climate Belts"
          }
        }
      },
      {
        "id": "uc_degerler",
        "icon": "📈",
        "i18n": {
          "tr": {
            "label": "Uç Değerler & Rekorlar"
          },
          "en": {
            "label": "Extremes & Records"
          }
        }
      },
      {
        "id": "mikroklima",
        "icon": "🔍",
        "i18n": {
          "tr": {
            "label": "Mikroklima Alanları"
          },
          "en": {
            "label": "Microclimates"
          }
        }
      }
    ],
    "orman": [
      {
        "id": "all",
        "icon": "🌲",
        "i18n": {
          "tr": {
            "label": "Tüm Bitki Örtüsü"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "nemli",
        "icon": "🌳",
        "i18n": {
          "tr": {
            "label": "Nemli Ormanlar"
          },
          "en": {
            "label": "Humid Forests"
          }
        }
      },
      {
        "id": "igne",
        "icon": "🌲",
        "i18n": {
          "tr": {
            "label": "İğne Yapraklı Ormanlar"
          },
          "en": {
            "label": "Coniferous Forests"
          }
        }
      },
      {
        "id": "cali",
        "icon": "🌿",
        "i18n": {
          "tr": {
            "label": "Çalı Formasyonu (Maki)"
          },
          "en": {
            "label": "Shrubland (Maquis)"
          }
        }
      },
      {
        "id": "ot",
        "icon": "🌾",
        "i18n": {
          "tr": {
            "label": "Ot Formasyonu (Bozkır/Alpin)"
          },
          "en": {
            "label": "Grassland (Steppe / Alpine)"
          }
        }
      },
      {
        "id": "milli_park",
        "icon": "🏞️",
        "i18n": {
          "tr": {
            "label": "Milli Parklar"
          },
          "en": {
            "label": "National Parks"
          }
        }
      }
    ],
    "iliskili_cografya": [
      {
        "id": "all",
        "icon": "🔗",
        "i18n": {
          "tr": {
            "label": "Tüm Eşleştirmeler"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "akarsu_delta",
        "icon": "🏖️",
        "i18n": {
          "tr": {
            "label": "Akarsu ➡️ Delta"
          },
          "en": {
            "label": "River to Delta"
          }
        }
      },
      {
        "id": "dag_gecit",
        "icon": "🚪",
        "i18n": {
          "tr": {
            "label": "Dağ ➡️ Geçit"
          },
          "en": {
            "label": "Mountain to Pass"
          }
        }
      },
      {
        "id": "hayvan_bolge",
        "icon": "🐑",
        "i18n": {
          "tr": {
            "label": "Hayvancılık ➡️ Bölge"
          },
          "en": {
            "label": "Livestock to Region"
          }
        }
      }
    ],
    "toprak": [
      {
        "id": "all",
        "icon": "🟫",
        "i18n": {
          "tr": {
            "label": "Tüm Toprak Tipleri"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "zonal",
        "icon": "🌡️",
        "i18n": {
          "tr": {
            "label": "Zonal (İklim) Toprakları"
          },
          "en": {
            "label": "Zonal (İklim) Toprakları"
          }
        }
      },
      {
        "id": "azonal",
        "icon": "🌊",
        "i18n": {
          "tr": {
            "label": "Azonal (Taşınmış)"
          },
          "en": {
            "label": "Azonal (Taşınmış)"
          }
        }
      },
      {
        "id": "intrazonal",
        "icon": "🧂",
        "i18n": {
          "tr": {
            "label": "İntrazonal (Yerel)"
          },
          "en": {
            "label": "İntrazonal (Yerel)"
          }
        }
      }
    ],
    "afet": [
      {
        "id": "all",
        "icon": "⚠️",
        "i18n": {
          "tr": {
            "label": "Tüm Afet Bölgeleri"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "deprem",
        "icon": "🏚️",
        "i18n": {
          "tr": {
            "label": "Deprem Riski"
          },
          "en": {
            "label": "Deprem Riski"
          }
        }
      },
      {
        "id": "kutle",
        "icon": "⛰️",
        "i18n": {
          "tr": {
            "label": "Heyelan & Çığ"
          },
          "en": {
            "label": "Heyelan & Çığ"
          }
        }
      },
      {
        "id": "su_afet",
        "icon": "🌊",
        "i18n": {
          "tr": {
            "label": "Sel & Taşkın"
          },
          "en": {
            "label": "Sel & Taşkın"
          }
        }
      },
      {
        "id": "erozyon",
        "icon": "🕳️",
        "i18n": {
          "tr": {
            "label": "Erozyon & Obruk"
          },
          "en": {
            "label": "Erozyon & Obruk"
          }
        }
      },
      {
        "id": "yangin",
        "icon": "🔥",
        "i18n": {
          "tr": {
            "label": "Orman Yangını"
          },
          "en": {
            "label": "Orman Yangını"
          }
        }
      },
      {
        "id": "kuraklik",
        "icon": "🏜️",
        "i18n": {
          "tr": {
            "label": "Kuraklık & Don"
          },
          "en": {
            "label": "Kuraklık & Don"
          }
        }
      }
    ],
    "fay": [
      {
        "id": "all",
        "icon": "💥",
        "i18n": {
          "tr": {
            "label": "Tüm Tektonik Yapılar"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "fay_hatti",
        "icon": "⚡",
        "i18n": {
          "tr": {
            "label": "Fay Hatları"
          },
          "en": {
            "label": "Fay Hatları"
          }
        }
      },
      {
        "id": "graben",
        "icon": "🕳️",
        "i18n": {
          "tr": {
            "label": "Grabenler (Çöküntüler)"
          },
          "en": {
            "label": "Grabenler (Çöküntüler)"
          }
        }
      },
      {
        "id": "levha",
        "icon": "🌍",
        "i18n": {
          "tr": {
            "label": "Levhalar"
          },
          "en": {
            "label": "Levhalar"
          }
        }
      },
      {
        "id": "deprem_bolge",
        "icon": "🏚️",
        "i18n": {
          "tr": {
            "label": "Deprem Bölgeleri"
          },
          "en": {
            "label": "Deprem Bölgeleri"
          }
        }
      }
    ],
    "madenler": [
      {
        "id": "all",
        "icon": "⛏️",
        "i18n": {
          "tr": {
            "label": "Tüm Maden & Enerji"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "metal",
        "icon": "🔩",
        "i18n": {
          "tr": {
            "label": "Metalik Madenler"
          },
          "en": {
            "label": "Metalik Madenler"
          }
        }
      },
      {
        "id": "enerji_ham",
        "icon": "🛢️",
        "i18n": {
          "tr": {
            "label": "Enerji Hammaddeleri"
          },
          "en": {
            "label": "Enerji Hammaddeleri"
          }
        }
      },
      {
        "id": "endustriyel",
        "icon": "🧱",
        "i18n": {
          "tr": {
            "label": "Endüstriyel Hammadde"
          },
          "en": {
            "label": "Endüstriyel Hammadde"
          }
        }
      },
      {
        "id": "enerji_tesis",
        "icon": "⚡",
        "i18n": {
          "tr": {
            "label": "Enerji Santralleri"
          },
          "en": {
            "label": "Enerji Santralleri"
          }
        }
      }
    ],
    "nufus": [
      {
        "id": "all",
        "icon": "👥",
        "i18n": {
          "tr": {
            "label": "Tüm Nüfus Konuları"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "yogun",
        "icon": "🏙️",
        "i18n": {
          "tr": {
            "label": "Yoğun Nüfus Alanları"
          },
          "en": {
            "label": "Yoğun Nüfus Alanları"
          }
        }
      },
      {
        "id": "seyrek",
        "icon": "🏔️",
        "i18n": {
          "tr": {
            "label": "Seyrek Nüfus Alanları"
          },
          "en": {
            "label": "Seyrek Nüfus Alanları"
          }
        }
      },
      {
        "id": "goc",
        "icon": "🧳",
        "i18n": {
          "tr": {
            "label": "Göç Hareketleri"
          },
          "en": {
            "label": "Göç Hareketleri"
          }
        }
      },
      {
        "id": "yerlesme",
        "icon": "🏘️",
        "i18n": {
          "tr": {
            "label": "Yerleşme Dokusu"
          },
          "en": {
            "label": "Yerleşme Dokusu"
          }
        }
      }
    ],
    "bolgeler": [
      {
        "id": "all",
        "icon": "🗺️",
        "i18n": {
          "tr": {
            "label": "Tüm Bölge & Bölümler"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "ana_bolge",
        "icon": "🌐",
        "i18n": {
          "tr": {
            "label": "7 Coğrafi Bölge"
          },
          "en": {
            "label": "7 Coğrafi Bölge"
          }
        }
      },
      {
        "id": "bolum",
        "icon": "📍",
        "i18n": {
          "tr": {
            "label": "21 Coğrafi Bölüm"
          },
          "en": {
            "label": "21 Coğrafi Bölüm"
          }
        }
      }
    ],
    "kiyilar": [
      {
        "id": "all",
        "icon": "🏖️",
        "i18n": {
          "tr": {
            "label": "Tüm Kıyı Şekilleri"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "yarimada",
        "icon": "🗿",
        "i18n": {
          "tr": {
            "label": "Yarımadalar"
          },
          "en": {
            "label": "Yarımadalar"
          }
        }
      },
      {
        "id": "korfez",
        "icon": "🌊",
        "i18n": {
          "tr": {
            "label": "Körfezler"
          },
          "en": {
            "label": "Körfezler"
          }
        }
      },
      {
        "id": "burun",
        "icon": "📌",
        "i18n": {
          "tr": {
            "label": "Burunlar (Uç Noktalar)"
          },
          "en": {
            "label": "Burunlar (Uç Noktalar)"
          }
        }
      },
      {
        "id": "ada",
        "icon": "🏝️",
        "i18n": {
          "tr": {
            "label": "Adalar"
          },
          "en": {
            "label": "Adalar"
          }
        }
      },
      {
        "id": "kiyi_tipi",
        "icon": "〰️",
        "i18n": {
          "tr": {
            "label": "Kıyı Tipleri"
          },
          "en": {
            "label": "Kıyı Tipleri"
          }
        }
      },
      {
        "id": "deniz",
        "icon": "🌐",
        "i18n": {
          "tr": {
            "label": "Denizler"
          },
          "en": {
            "label": "Denizler"
          }
        }
      }
    ],
    "dis_kuvvetler": [
      {
        "id": "all",
        "icon": "🌬️",
        "i18n": {
          "tr": {
            "label": "Tüm Dış Kuvvet Şekilleri"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "karstik_dk",
        "icon": "💧",
        "i18n": {
          "tr": {
            "label": "Karstik Şekiller"
          },
          "en": {
            "label": "Karstik Şekiller"
          }
        }
      },
      {
        "id": "buzul_dk",
        "icon": "❄️",
        "i18n": {
          "tr": {
            "label": "Buzul Şekilleri"
          },
          "en": {
            "label": "Buzul Şekilleri"
          }
        }
      },
      {
        "id": "ruzgar_dk",
        "icon": "🌪️",
        "i18n": {
          "tr": {
            "label": "Rüzgâr Şekilleri"
          },
          "en": {
            "label": "Rüzgâr Şekilleri"
          }
        }
      },
      {
        "id": "akarsu_dk",
        "icon": "🏞️",
        "i18n": {
          "tr": {
            "label": "Akarsu Şekilleri"
          },
          "en": {
            "label": "Akarsu Şekilleri"
          }
        }
      },
      {
        "id": "dalga_dk",
        "icon": "🌊",
        "i18n": {
          "tr": {
            "label": "Dalga & Kıyı Şekilleri"
          },
          "en": {
            "label": "Dalga & Kıyı Şekilleri"
          }
        }
      }
    ],
    "turizm": [
      {
        "id": "all",
        "icon": "🏛️",
        "i18n": {
          "tr": {
            "label": "Tüm Turizm Merkezleri"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "tarihi",
        "icon": "🏺",
        "i18n": {
          "tr": {
            "label": "Tarihî & Kültürel"
          },
          "en": {
            "label": "Tarihî & Kültürel"
          }
        }
      },
      {
        "id": "unesco",
        "icon": "🏅",
        "i18n": {
          "tr": {
            "label": "UNESCO Dünya Mirası"
          },
          "en": {
            "label": "UNESCO Dünya Mirası"
          }
        }
      },
      {
        "id": "kis_tur",
        "icon": "⛷️",
        "i18n": {
          "tr": {
            "label": "Kış Turizmi"
          },
          "en": {
            "label": "Kış Turizmi"
          }
        }
      },
      {
        "id": "termal_tur",
        "icon": "♨️",
        "i18n": {
          "tr": {
            "label": "Termal Turizm"
          },
          "en": {
            "label": "Termal Turizm"
          }
        }
      },
      {
        "id": "kiyi_doga",
        "icon": "🏖️",
        "i18n": {
          "tr": {
            "label": "Kıyı & Doğa Turizmi"
          },
          "en": {
            "label": "Kıyı & Doğa Turizmi"
          }
        }
      }
    ],
    "ulasim": [
      {
        "id": "all",
        "icon": "🚢",
        "i18n": {
          "tr": {
            "label": "Tüm Ulaşım Yapıları"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "liman",
        "icon": "⚓",
        "i18n": {
          "tr": {
            "label": "Limanlar"
          },
          "en": {
            "label": "Limanlar"
          }
        }
      },
      {
        "id": "havalimani",
        "icon": "✈️",
        "i18n": {
          "tr": {
            "label": "Havalimanları"
          },
          "en": {
            "label": "Havalimanları"
          }
        }
      },
      {
        "id": "kopru_tunel",
        "icon": "🌉",
        "i18n": {
          "tr": {
            "label": "Köprüler & Tüneller"
          },
          "en": {
            "label": "Köprüler & Tüneller"
          }
        }
      },
      {
        "id": "boru_hatti",
        "icon": "🛢️",
        "i18n": {
          "tr": {
            "label": "Boru Hatları"
          },
          "en": {
            "label": "Boru Hatları"
          }
        }
      },
      {
        "id": "kara_demir",
        "icon": "🛣️",
        "i18n": {
          "tr": {
            "label": "Kara & Demiryolları"
          },
          "en": {
            "label": "Kara & Demiryolları"
          }
        }
      },
      {
        "id": "su_yolu",
        "icon": "🌉",
        "i18n": {
          "tr": {
            "label": "Su Yolları"
          },
          "en": {
            "label": "Su Yolları"
          }
        }
      }
    ],
    "sehirler": [
      {
        "id": "all",
        "icon": "🌍",
        "i18n": {
          "tr": {
            "label": "Tüm İller (81)"
          },
          "en": {
            "label": "All"
          }
        }
      },
      {
        "id": "marmara",
        "icon": "🏙️",
        "i18n": {
          "tr": {
            "label": "Marmara (11)"
          },
          "en": {
            "label": "Marmara (11)"
          }
        }
      },
      {
        "id": "ege",
        "icon": "🏖️",
        "i18n": {
          "tr": {
            "label": "Ege (8)"
          },
          "en": {
            "label": "Ege (8)"
          }
        }
      },
      {
        "id": "akdeniz_bolge",
        "icon": "☀️",
        "i18n": {
          "tr": {
            "label": "Akdeniz (8)"
          },
          "en": {
            "label": "Akdeniz (8)"
          }
        }
      },
      {
        "id": "icanadolu",
        "icon": "🌾",
        "i18n": {
          "tr": {
            "label": "İç Anadolu (13)"
          },
          "en": {
            "label": "İç Anadolu (13)"
          }
        }
      },
      {
        "id": "karadeniz_bolge",
        "icon": "🌲",
        "i18n": {
          "tr": {
            "label": "Karadeniz (18)"
          },
          "en": {
            "label": "Karadeniz (18)"
          }
        }
      },
      {
        "id": "doguanadolu",
        "icon": "🏔️",
        "i18n": {
          "tr": {
            "label": "Doğu Anadolu (14)"
          },
          "en": {
            "label": "Doğu Anadolu (14)"
          }
        }
      },
      {
        "id": "guneydogu",
        "icon": "🏛️",
        "i18n": {
          "tr": {
            "label": "Güneydoğu (9)"
          },
          "en": {
            "label": "Güneydoğu (9)"
          }
        }
      }
    ]
  },
  packs: [
    {
      "id": "tr.daglar",
      "country": "tr",
      "group": "fiziki",
      "version": 1,
      "icon": "🏔️",
      "color": "#e67e22",
      "file": "data/packs/pack.tr.daglar.js",
      "virtual": false,
      "categories": [
        "daglar"
      ],
      "tiers": {
        "1": 14,
        "2": 26,
        "3": 39
      },
      "sizeKb": {
        "1": 5,
        "2": 9,
        "3": 14
      },
      "unlocks": [
        "quiz",
        "geoguessr",
        "conqueror",
        "speedrun",
        "exam",
        "olusum",
        "boyama",
        "layer_topo",
        "layer_terrain"
      ],
      "recommends": [],
      "planRows": [
        {
          "cat": "daglar",
          "icon": "🏔️",
          "count": 20,
          "tr": "Dağ",
          "en": "Mountain"
        }
      ],
      "i18n": {
        "tr": {
          "title": "Dağlar & Sıradağlar",
          "desc": "Volkanik, kıvrım ve kırık dağlar; zirveler, sıradağlar ve yükselti rekorları."
        },
        "en": {
          "title": "Mountains & Ranges",
          "desc": "Volcanic, fold and fault mountains; peaks, ranges and elevation records."
        }
      }
    },
    {
      "id": "tr.sular",
      "country": "tr",
      "group": "fiziki",
      "version": 1,
      "icon": "🌊",
      "color": "#2980b9",
      "file": "data/packs/pack.tr.sular.js",
      "virtual": false,
      "categories": [
        "su_kaynaklari"
      ],
      "tiers": {
        "1": 35,
        "2": 55,
        "3": 79
      },
      "sizeKb": {
        "1": 15,
        "2": 23,
        "3": 32
      },
      "unlocks": [
        "quiz",
        "geoguessr",
        "conqueror",
        "speedrun",
        "exam",
        "olusum",
        "boyama"
      ],
      "recommends": [],
      "planRows": [
        {
          "cat": "su_kaynaklari",
          "icon": "🏞️",
          "count": 15,
          "tr": "Akarsu",
          "en": "River",
          "geom": "polyline"
        },
        {
          "cat": "su_kaynaklari",
          "icon": "💧",
          "count": 10,
          "tr": "Göl",
          "en": "Lake",
          "geom": "point"
        }
      ],
      "i18n": {
        "tr": {
          "title": "Akarsular & Göller",
          "desc": "Nehir hatları ve havzalar; tektonik, karstik, buzul ve set gölleri."
        },
        "en": {
          "title": "Rivers & Lakes",
          "desc": "River courses and basins; tectonic, karstic, glacial and barrier lakes."
        }
      }
    },
    {
      "id": "tr.ova_plato",
      "country": "tr",
      "group": "fiziki",
      "version": 1,
      "icon": "🌾",
      "color": "#27ae60",
      "file": "data/packs/pack.tr.ova_plato.js",
      "virtual": false,
      "categories": [
        "ovalar",
        "platolar"
      ],
      "tiers": {
        "1": 26,
        "2": 43,
        "3": 65
      },
      "sizeKb": {
        "1": 9,
        "2": 15,
        "3": 22
      },
      "unlocks": [
        "quiz",
        "geoguessr",
        "conqueror",
        "speedrun",
        "exam",
        "olusum",
        "boyama",
        "layer_topo"
      ],
      "recommends": [],
      "planRows": [
        {
          "cat": "ovalar",
          "icon": "🌾",
          "count": 12,
          "tr": "Ova",
          "en": "Plain"
        },
        {
          "cat": "platolar",
          "icon": "⛰️",
          "count": 10,
          "tr": "Plato",
          "en": "Plateau"
        }
      ],
      "i18n": {
        "tr": {
          "title": "Ovalar & Platolar",
          "desc": "Delta, tektonik ve karstik ovalar; tabaka, lav ve aşınım platoları."
        },
        "en": {
          "title": "Plains & Plateaus",
          "desc": "Delta, tectonic and karstic plains; strata, lava and erosion plateaus."
        }
      }
    },
    {
      "id": "tr.gecitler",
      "country": "tr",
      "group": "fiziki",
      "version": 1,
      "icon": "🚪",
      "color": "#8e44ad",
      "file": "data/packs/pack.tr.gecitler.js",
      "virtual": false,
      "categories": [
        "gecitler"
      ],
      "tiers": {
        "1": 6,
        "2": 10,
        "3": 12
      },
      "sizeKb": {
        "1": 2,
        "2": 3,
        "3": 4
      },
      "unlocks": [
        "quiz",
        "geoguessr",
        "conqueror",
        "speedrun",
        "exam"
      ],
      "recommends": [
        "tr.daglar"
      ],
      "planRows": [
        {
          "cat": "gecitler",
          "icon": "🚪",
          "count": 8,
          "tr": "Geçit",
          "en": "Pass"
        }
      ],
      "i18n": {
        "tr": {
          "title": "Geçitler & Boğazlar",
          "desc": "Dağ geçitleri, ulaşım koridorları ve deniz boğazları."
        },
        "en": {
          "title": "Passes & Straits",
          "desc": "Mountain passes, transport corridors and sea straits."
        }
      }
    },
    {
      "id": "tr.beseri",
      "country": "tr",
      "group": "ekonomik",
      "version": 1,
      "icon": "🚜",
      "color": "#84cc16",
      "file": "data/packs/pack.tr.beseri.js",
      "virtual": false,
      "categories": [
        "tarim",
        "hayvancilik",
        "sanayi"
      ],
      "tiers": {
        "1": 19,
        "2": 30,
        "3": 41
      },
      "sizeKb": {
        "1": 12,
        "2": 19,
        "3": 26
      },
      "unlocks": [
        "quiz",
        "conqueror",
        "speedrun",
        "exam"
      ],
      "recommends": [],
      "planRows": [
        {
          "cat": "tarim",
          "icon": "🚜",
          "count": 15,
          "tr": "Tarım",
          "en": "Agriculture"
        },
        {
          "cat": "hayvancilik",
          "icon": "🐑",
          "count": 6,
          "tr": "Hayvan",
          "en": "Livestock"
        },
        {
          "cat": "sanayi",
          "icon": "🏭",
          "count": 10,
          "tr": "Sanayi",
          "en": "Industry"
        }
      ],
      "i18n": {
        "tr": {
          "title": "Tarım, Hayvancılık & Sanayi",
          "desc": "Ürün yetişme alanları, hayvancılık kuşakları ve sanayi tesisleri."
        },
        "en": {
          "title": "Agriculture, Livestock & Industry",
          "desc": "Crop belts, livestock zones and industrial facilities."
        }
      }
    },
    {
      "id": "tr.iklim_orman",
      "country": "tr",
      "group": "fiziki",
      "version": 1,
      "icon": "🌡️",
      "color": "#f59e0b",
      "file": "data/packs/pack.tr.iklim_orman.js",
      "virtual": false,
      "categories": [
        "iklim",
        "orman"
      ],
      "tiers": {
        "1": 15,
        "2": 19,
        "3": 23
      },
      "sizeKb": {
        "1": 8,
        "2": 10,
        "3": 11
      },
      "unlocks": [
        "quiz",
        "conqueror",
        "speedrun",
        "exam"
      ],
      "recommends": [],
      "planRows": [
        {
          "cat": "iklim",
          "icon": "🌡️",
          "count": 10,
          "tr": "İklim",
          "en": "Climate"
        },
        {
          "cat": "orman",
          "icon": "🌲",
          "count": 10,
          "tr": "Orman",
          "en": "Forest"
        }
      ],
      "i18n": {
        "tr": {
          "title": "İklim & Bitki Örtüsü",
          "desc": "İklim kuşakları, uç değerler, mikroklima alanları ve orman formasyonları."
        },
        "en": {
          "title": "Climate & Vegetation",
          "desc": "Climate belts, extremes, microclimates and forest formations."
        }
      }
    },
    {
      "id": "tr.iliskiler",
      "country": "tr",
      "group": "beseri",
      "version": 1,
      "icon": "🔗",
      "color": "#ec4899",
      "file": "data/packs/pack.tr.iliskiler.js",
      "virtual": false,
      "categories": [
        "iliskili_cografya"
      ],
      "tiers": {
        "1": 11,
        "2": 14,
        "3": 16
      },
      "sizeKb": {
        "1": 6,
        "2": 8,
        "3": 8
      },
      "unlocks": [
        "quiz",
        "match"
      ],
      "recommends": [
        "tr.sular",
        "tr.daglar"
      ],
      "planRows": [],
      "i18n": {
        "tr": {
          "title": "İlişkili Eşleştirmeler",
          "desc": "Akarsu ➡️ Delta, Dağ ➡️ Geçit ve Hayvancılık ➡️ Bölge bağlantıları."
        },
        "en": {
          "title": "Geographic Relations",
          "desc": "River ➡️ Delta, Mountain ➡️ Pass and Livestock ➡️ Region links."
        }
      }
    },
    {
      "id": "tr.toprak",
      "country": "tr",
      "group": "fiziki",
      "version": 1,
      "icon": "🟫",
      "color": "#a16207",
      "file": "data/packs/pack.tr.toprak.js",
      "virtual": false,
      "categories": [
        "toprak"
      ],
      "tiers": {
        "1": 8,
        "2": 11,
        "3": 15
      },
      "sizeKb": {
        "1": 5,
        "2": 6,
        "3": 8
      },
      "unlocks": [
        "quiz",
        "conqueror",
        "speedrun",
        "exam"
      ],
      "recommends": [
        "tr.iklim_orman"
      ],
      "planRows": [
        {
          "cat": "toprak",
          "icon": "🟫",
          "count": 10,
          "tr": "Toprak",
          "en": "Soil"
        }
      ],
      "i18n": {
        "tr": {
          "title": "Toprak Tipleri",
          "desc": "Zonal, azonal ve intrazonal topraklar; çernezyomdan terra rossaya oluşum koşulları."
        },
        "en": {
          "title": "Soil Types",
          "desc": "Zonal, azonal and intrazonal soils; formation conditions from chernozem to terra rossa."
        }
      }
    },
    {
      "id": "tr.afet",
      "country": "tr",
      "group": "fiziki",
      "version": 1,
      "icon": "⚠️",
      "color": "#dc2626",
      "file": "data/packs/pack.tr.afet.js",
      "virtual": false,
      "categories": [
        "afet"
      ],
      "tiers": {
        "1": 10,
        "2": 13,
        "3": 18
      },
      "sizeKb": {
        "1": 6,
        "2": 7,
        "3": 10
      },
      "unlocks": [
        "quiz",
        "geoguessr",
        "conqueror",
        "speedrun",
        "exam"
      ],
      "recommends": [
        "tr.fay"
      ],
      "planRows": [
        {
          "cat": "afet",
          "icon": "⚠️",
          "count": 12,
          "tr": "Afet",
          "en": "Hazard"
        }
      ],
      "i18n": {
        "tr": {
          "title": "Doğal Afet Bölgeleri",
          "desc": "Deprem, heyelan, çığ, sel, erozyon, orman yangını ve kuraklık riski taşıyan alanlar."
        },
        "en": {
          "title": "Natural Hazard Zones",
          "desc": "Areas at risk of earthquake, landslide, avalanche, flood, erosion, wildfire and drought."
        }
      }
    },
    {
      "id": "tr.fay",
      "country": "tr",
      "group": "fiziki",
      "version": 1,
      "icon": "💥",
      "color": "#f97316",
      "file": "data/packs/pack.tr.fay.js",
      "virtual": false,
      "categories": [
        "fay"
      ],
      "tiers": {
        "1": 8,
        "2": 13,
        "3": 16
      },
      "sizeKb": {
        "1": 4,
        "2": 7,
        "3": 8
      },
      "unlocks": [
        "quiz",
        "geoguessr",
        "conqueror",
        "speedrun",
        "exam",
        "layer_terrain"
      ],
      "recommends": [
        "tr.afet"
      ],
      "planRows": [
        {
          "cat": "fay",
          "icon": "💥",
          "count": 10,
          "tr": "Fay",
          "en": "Fault"
        }
      ],
      "i18n": {
        "tr": {
          "title": "Fay Hatları & Tektonik Yapı",
          "desc": "KAF, DAF, Ege grabenleri, levha sınırları ve birinci derece deprem bölgeleri."
        },
        "en": {
          "title": "Faults & Tectonic Structure",
          "desc": "North and East Anatolian faults, Aegean grabens, plate boundaries and seismic zones."
        }
      }
    },
    {
      "id": "tr.madenler",
      "country": "tr",
      "group": "ekonomik",
      "version": 1,
      "icon": "⛏️",
      "color": "#78716c",
      "file": "data/packs/pack.tr.madenler.js",
      "virtual": false,
      "categories": [
        "madenler"
      ],
      "tiers": {
        "1": 23,
        "2": 43,
        "3": 65
      },
      "sizeKb": {
        "1": 10,
        "2": 19,
        "3": 28
      },
      "unlocks": [
        "quiz",
        "geoguessr",
        "conqueror",
        "speedrun",
        "exam"
      ],
      "recommends": [
        "tr.beseri"
      ],
      "planRows": [
        {
          "cat": "madenler",
          "icon": "⛏️",
          "count": 15,
          "tr": "Maden",
          "en": "Mineral"
        }
      ],
      "i18n": {
        "tr": {
          "title": "Madenler & Enerji Kaynakları",
          "desc": "Bor, krom, demir, linyit, petrol; barajlar, nükleer, jeotermal ve rüzgâr santralleri."
        },
        "en": {
          "title": "Minerals & Energy Resources",
          "desc": "Boron, chromium, iron, lignite, oil; dams, nuclear, geothermal and wind plants."
        }
      }
    },
    {
      "id": "tr.sehirler",
      "country": "tr",
      "group": "beseri",
      "version": 1,
      "icon": "🏛️",
      "color": "#3b82f6",
      "file": "data/packs/pack.tr.sehirler.js",
      "virtual": false,
      "categories": [
        "sehirler"
      ],
      "tiers": {
        "1": 28,
        "2": 52,
        "3": 81
      },
      "sizeKb": {
        "1": 15,
        "2": 27,
        "3": 42
      },
      "unlocks": [
        "quiz",
        "geoguessr",
        "conqueror",
        "speedrun",
        "exam"
      ],
      "recommends": [
        "tr.bolgeler",
        "tr.nufus"
      ],
      "planRows": [
        {
          "cat": "sehirler",
          "icon": "🏛️",
          "count": 18,
          "tr": "İl",
          "en": "City"
        }
      ],
      "i18n": {
        "tr": {
          "title": "Şehirler & 81 İl",
          "desc": "Türkiye'nin 81 ili, resmi il sınırları, plaka kodları, coğrafi bölgeleri ve KPSS özellikleri."
        },
        "en": {
          "title": "Provinces & 81 Cities",
          "desc": "Turkey's 81 provinces, official borders, license plates, geographic regions and facts."
        }
      }
    },
    {
      "id": "tr.nufus",
      "country": "tr",
      "group": "beseri",
      "version": 1,
      "icon": "👥",
      "color": "#0ea5e9",
      "file": "data/packs/pack.tr.nufus.js",
      "virtual": false,
      "categories": [
        "nufus"
      ],
      "tiers": {
        "1": 11,
        "2": 16,
        "3": 22
      },
      "sizeKb": {
        "1": 5,
        "2": 7,
        "3": 10
      },
      "unlocks": [
        "quiz",
        "geoguessr",
        "conqueror",
        "speedrun",
        "exam"
      ],
      "recommends": [
        "tr.bolgeler"
      ],
      "planRows": [
        {
          "cat": "nufus",
          "icon": "👥",
          "count": 12,
          "tr": "Nüfus",
          "en": "Pop."
        }
      ],
      "i18n": {
        "tr": {
          "title": "Nüfus & Yerleşme",
          "desc": "Yoğun ve seyrek nüfuslu alanlar, göç hareketleri, kır-kent ve idari merkezler."
        },
        "en": {
          "title": "Population & Settlement",
          "desc": "Densely and sparsely populated areas, migration, rural-urban and administrative centers."
        }
      }
    },
    {
      "id": "tr.bolgeler",
      "country": "tr",
      "group": "beseri",
      "version": 1,
      "icon": "🗺️",
      "color": "#10b981",
      "file": "data/packs/pack.tr.bolgeler.js",
      "virtual": false,
      "categories": [
        "bolgeler"
      ],
      "tiers": {
        "1": 10,
        "2": 18,
        "3": 28
      },
      "sizeKb": {
        "1": 5,
        "2": 9,
        "3": 12
      },
      "unlocks": [
        "quiz",
        "geoguessr",
        "conqueror",
        "speedrun",
        "exam"
      ],
      "recommends": [
        "tr.sehirler"
      ],
      "planRows": [
        {
          "cat": "bolgeler",
          "icon": "🗺️",
          "count": 14,
          "tr": "Bölge",
          "en": "Region"
        }
      ],
      "i18n": {
        "tr": {
          "title": "Coğrafi Bölgeler & Bölümler",
          "desc": "7 coğrafi bölge ve 21 coğrafi bölüm; sınırları, genel özellikleri ve kalkınma projeleri."
        },
        "en": {
          "title": "Regions & Subregions",
          "desc": "7 geographic regions and 21 subregions; boundaries, traits and development projects."
        }
      }
    },
    {
      "id": "tr.kiyilar",
      "country": "tr",
      "group": "fiziki",
      "version": 1,
      "icon": "🏖️",
      "color": "#0ea5e9",
      "file": "data/packs/pack.tr.kiyilar.js",
      "virtual": false,
      "categories": [
        "kiyilar"
      ],
      "tiers": {
        "1": 12,
        "2": 22,
        "3": 33
      },
      "sizeKb": {
        "1": 5,
        "2": 8,
        "3": 13
      },
      "unlocks": [
        "quiz",
        "geoguessr",
        "conqueror",
        "speedrun",
        "exam"
      ],
      "recommends": [
        "tr.sular"
      ],
      "planRows": [
        {
          "cat": "kiyilar",
          "icon": "🏖️",
          "count": 12,
          "tr": "Kıyı",
          "en": "Coast"
        }
      ],
      "i18n": {
        "tr": {
          "title": "Kıyılar, Adalar & Denizler",
          "desc": "Boyuna, enine, dalmaçya, ria ve limanlı kıyı tipleri; adalar, körfezler ve denizlerimiz."
        },
        "en": {
          "title": "Coasts, Islands & Seas",
          "desc": "Longitudinal, transverse, Dalmatian, ria and liman coast types; islands and gulfs."
        }
      }
    },
    {
      "id": "tr.dis_kuvvetler",
      "country": "tr",
      "group": "fiziki",
      "version": 1,
      "icon": "🌬️",
      "color": "#8b5cf6",
      "file": "data/packs/pack.tr.dis_kuvvetler.js",
      "virtual": false,
      "categories": [
        "dis_kuvvetler"
      ],
      "tiers": {
        "1": 10,
        "2": 18,
        "3": 26
      },
      "sizeKb": {
        "1": 4,
        "2": 8,
        "3": 11
      },
      "unlocks": [
        "quiz",
        "geoguessr",
        "conqueror",
        "speedrun",
        "exam"
      ],
      "recommends": [
        "tr.daglar"
      ],
      "planRows": [
        {
          "cat": "dis_kuvvetler",
          "icon": "🌬️",
          "count": 14,
          "tr": "Şekil",
          "en": "Landform"
        }
      ],
      "i18n": {
        "tr": {
          "title": "Dış Kuvvetler & Yer Şekilleri",
          "desc": "Karstik, buzul, rüzgâr, dalga-akıntı ve peri bacaları gibi aşınım ve birikim şekilleri."
        },
        "en": {
          "title": "Exogenic Landforms",
          "desc": "Karstic, glacial, aeolian, coastal and fairy chimney erosional/depositional landforms."
        }
      }
    },
    {
      "id": "tr.turizm",
      "country": "tr",
      "group": "ekonomik",
      "version": 1,
      "icon": "🏛️",
      "color": "#eab308",
      "file": "data/packs/pack.tr.turizm.js",
      "virtual": false,
      "categories": [
        "turizm"
      ],
      "tiers": {
        "1": 13,
        "2": 20,
        "3": 31
      },
      "sizeKb": {
        "1": 5,
        "2": 8,
        "3": 12
      },
      "unlocks": [
        "quiz",
        "geoguessr",
        "conqueror",
        "speedrun",
        "exam",
        "layer_satellite"
      ],
      "recommends": [],
      "planRows": [
        {
          "cat": "turizm",
          "icon": "🏛️",
          "count": 15,
          "tr": "Turizm",
          "en": "Tourism"
        }
      ],
      "i18n": {
        "tr": {
          "title": "Turizm & Kültür Mirası",
          "desc": "UNESCO alanları, antik kentler, kış ve termal merkezler, kıyı turizmi."
        },
        "en": {
          "title": "Tourism & Cultural Heritage",
          "desc": "UNESCO sites, ancient cities, ski and thermal resorts, coastal tourism."
        }
      }
    },
    {
      "id": "tr.ulasim",
      "country": "tr",
      "group": "ekonomik",
      "version": 1,
      "icon": "🚢",
      "color": "#3b82f6",
      "file": "data/packs/pack.tr.ulasim.js",
      "virtual": false,
      "categories": [
        "ulasim"
      ],
      "tiers": {
        "1": 10,
        "2": 18,
        "3": 26
      },
      "sizeKb": {
        "1": 4,
        "2": 7,
        "3": 11
      },
      "unlocks": [
        "quiz",
        "geoguessr",
        "conqueror",
        "speedrun",
        "exam"
      ],
      "recommends": [
        "tr.gecitler"
      ],
      "planRows": [
        {
          "cat": "ulasim",
          "icon": "🚢",
          "count": 12,
          "tr": "Ulaşım",
          "en": "Transport"
        }
      ],
      "i18n": {
        "tr": {
          "title": "Ulaşım & Ticaret Koridorları",
          "desc": "Limanlar, havalimanları, köprüler, tüneller, boru hatları ve Türk Boğazları."
        },
        "en": {
          "title": "Transport & Trade Corridors",
          "desc": "Ports, airports, bridges, tunnels, pipelines and the Turkish Straits."
        }
      }
    },
    {
      "id": "tr.mutlak_konum",
      "country": "tr",
      "group": "modul",
      "version": 1,
      "icon": "📐",
      "color": "#38bdf8",
      "file": null,
      "virtual": true,
      "categories": [],
      "tiers": {
        "1": 81,
        "2": 81,
        "3": 81
      },
      "sizeKb": {
        "1": 5,
        "2": 5,
        "3": 5
      },
      "unlocks": [
        "mk_sun",
        "mk_temp",
        "mk_daynight",
        "mk_coord",
        "mk_duel",
        "layer_dark"
      ],
      "recommends": [],
      "planRows": [],
      "i18n": {
        "tr": {
          "title": "Matematiksel Konum Laboratuvarı",
          "desc": "Güneş açısı, gölge boyu, yerel saat, gündüz süresi ve koordinat avı modülleri."
        },
        "en": {
          "title": "Absolute Location Lab",
          "desc": "Sun angle, shadow length, local time, daylight duration and coordinate hunting."
        }
      }
    }
  ]
};
