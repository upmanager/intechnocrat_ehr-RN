import { Images } from "@assets";

export default [
    {
        id: 1,
        title: "Smart Wireless Glucometer",
        image: Images.glucometer,
        devices: [
            // {
            //   id: 1,
            //   title: "Align (BG1)",
            //   image: Images.align_bg1,
            //   device: 'BG1',
            // },
            {
                id: 2,
                title: "Gluco (BG5)",
                image: Images.gluco_bg5,
                device: 'BG5'
            },
            {
                id: 3,
                title: "Gluco+ (BG5S)",
                image: Images.gluco_bg5s,
                device: 'BG5S'
            },
        ]
    },
    {
        id: 2,
        title: "Track Wireless BP Monitor",
        image: Images.bp_monitor,
        devices: [
            {
                id: 1,
                title: "Ease (BP3L)",
                image: Images.ease_bp3l,
                device: 'BP3L',
                setup_guide: [
                    {
                        description: 'Make sure your device is fully charged',
                        image: Images.setup_bp3l,
                    }
                ]
            },
            {
                id: 2,
                title: "Feel (BP5)",
                image: Images.feel_bp5,
                device: 'BP5',
                setup_guide: [
                    {
                        description: `Press 'START' or 'M' button on the iHealth Neo to turn on the Bluetooth. The bluetooth LED will be flashing.`,
                        image: Images.setup_bp5,
                    }
                ]
            },
            {
                id: 3,
                title: "NEO (BP5S)",
                image: Images.neo_bp5s,
                device: 'BP5S',
                setup_guide: [
                    {
                        description: `Press 'START' or 'M' button on the iHealth Neo to turn on the Bluetooth. The bluetooth LED will be flashing.`,
                        image: Images.setup_bp5s,
                    }
                ]
            },
            {
                id: 4,
                title: "View (BP7S)",
                image: Images.view_bp7s,
                device: 'BP7S',
                hide: true
            }
        ]
    },
    {
        id: 3,
        title: "Wireless Body Composition Scale",
        image: Images.diagonal,
        devices: [
            {
                id: 1,
                title: "Lina (HS2)",
                image: Images.lina_hs2,
                device: 'HS2',
                setup_guide: [
                    {
                        description: `Install batteries.`,
                        image: Images.setup_hs2_1,
                    },
                    {
                        description: `Please tap the right bottom corner of your scale to turn it on. Make sure 0.0 appear on the scale`,
                        image: Images.setup_hs2_2,
                    }
                ]
            },
            {
                id: 2,
                title: "Lite (HS4S)",
                image: Images.lite_hs4s,
                device: 'HS4S',
                setup_guide: [
                    {
                        description: `Install batteries.`,
                        image: Images.setup_hs2_1,
                    }
                ]
            },
            {
                id: 3,
                title: "Fit/Nexus (HS2S)",
                image: Images.fit_nexus_hs2s,
                device: 'HS2S',
                setup_guide: [
                    {
                        description: `Install batteries.`,
                        image: Images.setup_hs2_1,
                    }
                ]
            },
            {
                id: 4,
                title: "Core (HS6)",
                image: Images.core_hs6,
                device: 'HS6', // no eixt
                hide: true,
                scanQRcode: true
            }
        ]
    },
    {
        id: 4,
        title: "Wave Wireless Activity Tracker",
        image: Images.wave,
        devices: [
            {
                id: 1,
                title: "Edge (AM3S)",
                image: Images.edge_am3s,
                device: 'AM3S'
            },
            {
                id: 2,
                title: "Wave (AM4)",
                image: Images.wave_am4,
                device: 'AM4'
            }
        ]
    },
];