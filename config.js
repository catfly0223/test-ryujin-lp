// 共通のCR別LINE URL定義（全LPで使用）
const COMMON_LINE_URLS = [
    "https://sq0y3fdr.autosns.app/addfriend/s/TMsBbLSIGK/@242vlyzl", // CR01
    "https://sq0y3fdr.autosns.app/addfriend/s/Z6NMokPU7d/@242vlyzl", // CR02
    "https://sq0y3fdr.autosns.app/addfriend/s/d7EdcojAi3/@242vlyzl", // CR03
    "https://sq0y3fdr.autosns.app/addfriend/s/VHZzsbuNL1/@242vlyzl", // CR04
    "https://sq0y3fdr.autosns.app/addfriend/s/NhZQ5mk9ov/@242vlyzl", // CR05
    "https://sq0y3fdr.autosns.app/addfriend/s/NCXOwJr3Fg/@242vlyzl", // CR06
    "https://sq0y3fdr.autosns.app/addfriend/s/y7oRBSlf6u/@242vlyzl", // CR07
    "https://sq0y3fdr.autosns.app/addfriend/s/tS5p7abGji/@242vlyzl", // CR08
    "https://sq0y3fdr.autosns.app/addfriend/s/V5NLmjo6Cf/@242vlyzl", // CR09
    "https://sq0y3fdr.autosns.app/addfriend/s/vuC2OAPewd/@242vlyzl", // CR10
    "https://sq0y3fdr.autosns.app/addfriend/s/C5j4Rx1neS/@242vlyzl", // CR11
    "https://sq0y3fdr.autosns.app/addfriend/s/fUA8WeRoKq/@242vlyzl", // CR12
    "https://sq0y3fdr.autosns.app/addfriend/s/SuU5jxf6Ds/@242vlyzl", // CR13
    "https://sq0y3fdr.autosns.app/addfriend/s/ja2riIE7ex/@242vlyzl", // CR14
    "https://sq0y3fdr.autosns.app/addfriend/s/NK5w8xP1dY/@242vlyzl"  // CR15
];

// LP設定（全LPが共通のLINE URLセットを参照）
const LP_CONFIGS = {
    // 全LPが共通のLINE URLセットを使用
    lp01: { lineUrls: COMMON_LINE_URLS },
    lp02: { lineUrls: COMMON_LINE_URLS },
    lp03: { lineUrls: COMMON_LINE_URLS },
    lp05: { lineUrls: COMMON_LINE_URLS },
    lp06: { lineUrls: COMMON_LINE_URLS },
    lp07: { lineUrls: COMMON_LINE_URLS }
};

// 共通ユーティリティ関数
const LP_UTILS = {
    // LP名からconfig取得
    getConfig: function(lpName) {
        return LP_CONFIGS[lpName.toLowerCase()];
    },
    
    // 現在のページのLP名を自動検出
    getCurrentLpName: function() {
        const path = window.location.pathname;
        const match = path.match(/\/(lp\d+)\//);
        return match ? match[1] : null;
    },
    
    // URLパラメータからCR番号を取得
    getCurrentCrNumber: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const crParam = urlParams.get('cr');
        return crParam ? parseInt(crParam) : 1;
    },
    
    // referrer（前のページ）からCR番号を取得（サンクスページ用）
    getCrNumberFromReferrer: function() {
        if (!document.referrer) return 1;
        try {
            const referrerUrl = new URL(document.referrer);
            const referrerParams = new URLSearchParams(referrerUrl.search);
            const crNumber = referrerParams.get('cr');
            return crNumber ? parseInt(crNumber) : 1;
        } catch (e) {
            console.log('referrer URL parsing failed:', e);
            return 1;
        }
    },
    
    // 指定LPのCR番号に対応するLINE URLを取得
    getLineUrl: function(lpName, crNumber) {
        const config = this.getConfig(lpName);
        if (!config || !config.lineUrls) return null;
        
        if (crNumber >= 1 && crNumber <= config.lineUrls.length) {
            return config.lineUrls[crNumber - 1];
        }
        return config.lineUrls[0]; // デフォルトはCR01
    },
    
    // 現在のページの現在のCRに対応するLINE URLを取得
    getCurrentLineUrl: function() {
        const lpName = this.getCurrentLpName();
        const crNumber = this.getCurrentCrNumber();
        return this.getLineUrl(lpName, crNumber);
    },
    
    // サンクスページ用：referrerからLINE URLを取得
    getLineUrlFromReferrer: function() {
        const lpName = this.getCurrentLpName();
        const crNumber = this.getCrNumberFromReferrer();
        return this.getLineUrl(lpName, crNumber);
    }
};

// 後方互換性のため、LP05用の旧API形式も維持
const LP_CONFIG = {
    lineUrls: LP_CONFIGS.lp05.lineUrls,
    defaultLineUrl: LP_CONFIGS.lp05.lineUrls[0],
    getLineUrl: function(crNumber) {
        return LP_UTILS.getLineUrl('lp05', crNumber);
    },
    getCurrentCrNumber: function() {
        return LP_UTILS.getCurrentCrNumber();
    },
    getCurrentLineUrl: function() {
        return LP_UTILS.getLineUrl('lp05', LP_UTILS.getCurrentCrNumber());
    }
};
