export default function archiveHelperFunction(event, filename) {
  const filters = []
  filters.apps = ['1.1', 'BEST_GAMES_17_LITE', 'E1000_mega_konon', 'GhostSensor_K500', 'ICQMobile', 'LIKE_PC_GAME_4_FULL', 'MOBGAMES_5', 'MoM4lite', 'NUMISMAT_40',
    'qipmobile_sie_a', 'rugame_mobi_mir_strategii_6', 'rugame_mobi_Vista', 'SlovoEd_Deluxe_Eng', 'the_best_novosti11', 'vvs_notepadRu'
  ]
  filters.games = ['!P', '3DMiniGolfWor_n95_bykriker', '160.jar', '240x320_se_k770_k800_s500_t650_w850_rus_paris', '365Bowling_s5230', '996280',
    'AlienQuarantine_SAMSUNG_GT_S5230_EN', 'apo_se_aino_en', 'Atudela_240', 'BeachBallCrabMayhem_w', 'BMW_Racing_nokia_62', 'bubble_pop', 'CallofDuty3_n623',
    'CBS240x320lg', 'Collapse_2010_SE_Satio', 'Circket 2016 24', 'daughter2_ru_nokia_240x320_s60', 'Dirty_D5', 'DragonMania_LG_KU', 'EarthwormJim_ru_s60',
    'everybodys_golf_nokia_n95', 'FerrariGT3_Nokia_N73', 'formularacingpro_nokia_240x320_s60', 'GangstarCity_Samsung_GT_S8', 'GM_PowerPuffGirlsSnowboarding_Nokia_176x208',
    'guitar_hero3_sp1_N7', 'holes_RU_Nok_360', 'iec_tophacker_f', 'JellyStar_SE_176', 'Kapsle_PL__Breakpoint_2009__k5', 'Legends_Of_Lore_Eposide1', 'loveriddle',
    'MegaBloks_Builder_se_k6', 'Mind_Habits_nok', 'Moto Racing 3D v1.2_3', 'navy_warK800', 'Nokia_Racing', 'OregonTrailAmericanSettler_Nokia_58', 'Phone_',
    'PocketGod_Samsung_S5', 'Puzzle_Pets', 'RealB', 'RN80', 'rugame_mobi_valentine_journey_81', 'SantaInTrouble240', 'shaolin_en_fr_it_de_es_pt_d5', 'smes',
    'SpaceInv_s60', 'STD_CakeMania4_SEU', 'Super_golf', 'TempleRush3D2_240x4', 'TheBigLebowskiBowling_s60_32', 'tmp_10180', 'tmp_19623-2012r', 'Tomb_Raider_Underworld_3D',
    'TRU240s6', 'uno2_nokia_e71', 'warriors_z', 'wpt-showdown.N95', 'zombiemobdefense', 'zumasrevenge_k'
  ]
  filters.cgames = ['0A', '240x320a', 'AYSJ', 'ChanKuo3_N3', 'd608', 'DPCQ2N73', 'E2.123', 'e2.313', 'e2.496', 'E2.666', 'E6.114', 'e6.302', 'e62.169', 'e62.306',
    'E62.459', 'e62.661', 'E62.789', 'e62.957', 'fcjdE2', 'guardianlegend_s4', 'guangjinN5', 'jxihab_n', 'k700.239', 'k700.583', 'K790.145', 'K790.298', 'K790.463',
    'K790.605', 'L6.2', 'LOK', 'MHQ', 'Myz', 'N73.215', 'n73.339', 'n73.472', 'n73.615', 'N73.787', 'n73.1007', 'n73.1208', 'n73.1332', 'n73.1470', 'N73.1633', 'n73.1817',
    'n73_bt.20', 'n97.110', 'n97.225', 'n97.356', 'n97.484', 'n97.613', 'N5500.90', 'N5800.42', 'N5800.168', 'N5800.283', 'N7370.1', 'n7370.204', 'N7370.399', 'n7370.642',
    'N7370.799', 'N7370.979', 'N7610.109', 'n7610.380', 'N6710.695', 'N7610.943', 'N7610.1132', 'NHDiaoyueMuzhu_v1.0.0_D6', 'PES2011_N76', 's40n7370.1', 'se_k700',
    'SJQYE2', 'Sword_H', 'TJSXC_no', 'V8.17', 'WLQJN7610', 'XLQYK', 'ylsgsN', 'ZSSFN73', 'ZZTKW'
  ]
  filters.sapps = ['0']
  filters.sgames = ['0']
  const cf = app.selectedDir
  const currentFilter = filters[cf]
  let magicNumber = 0
  filename = filename.toLowerCase()
  function advancedCompare(w1, w2) {
    for (let i = 0, l = w2.length; i < l; i++) {
      if (w1[i]) {
        if (w1[i] !== w2[i]) {
          if (isNaN(parseInt(w1[i])) && isNaN(parseInt(w2[i]))) {
            return w1[i] > w2[i]
          } else {
            if (!isNaN(parseInt(w1[i])) && !isNaN(parseInt(w2[i]))) {
              return parseInt(w1.slice(i)) > parseInt(w2.slice(i))
            } else {
              const who = !isNaN(parseInt(w1[i]))
              if (i > 0) {
                return who && !isNaN(parseInt(w1[i - 1]))
              } else {
                return w1[0] > w2[0]
              }
            }
          }
        }
      } else {
        return false
      }
    }
  }
  if (filename < '0' || filename[0] === '_' || (!filename.endsWith('.jar') && cf[0] !== 's') || filename < filters[0]) {
    if (cf !== 'games') {
      magicNumber = currentFilter.length
    } else {
      magicNumber = 1
    }
  } else {
    if (cf === 'games' && filename > 'zumarevenge_LG') {
      magicNumber = 1
    } else {
      let i = 0
      for (let fn of currentFilter) {
        fn = fn.toLowerCase()
        if (filename.startsWith(fn)) {
          event.preventDefault()
          return alert(cf[0] === 's' ? locale.arc0 + filename + ')' : locale.arc0 + filename + locale.arc1 + i + ', ' + (i + 1))
        }
        if (advancedCompare(filename, fn)) {
          i++
          magicNumber = i
        } else {
          break
        }
      }
    }
  }
  event.preventDefault()
  if (cf[0] !== 's') {
    alert(locale.arc0 + filename + locale.arc2 + magicNumber)
  } else {
    alert(locale.arc0 + filename + ')')
  }
}
