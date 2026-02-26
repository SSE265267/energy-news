const fs = require('fs');

const files = [
    '2026-02-24.json',
    '2026-02-23.json',
    '2026-02-22.json',
    '2026-02-21.json',
    '2026-02-20.json',
    '2026-02-19.json'
];

const flagMap = {
    '🇪🇸': '西班牙',
    '🇮🇳': '印度',
    '🇪🇺': '歐洲',
    '🇦🇺': '澳洲',
    '🇨🇳': '中國',
    '🇩🇪': '德國',
    '🇺🇦': '烏克蘭',
    '🌍': '全球'
};

for (const file of files) {
    try {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        data.articles = data.articles.map(a => {
            // Find which flag is in the title
            for (const [flag, country] of Object.entries(flagMap)) {
                if (a.title.startsWith(flag)) {
                    const guaIdx = a.title.indexOf('》');
                    if (guaIdx > 0) {
                        const mainTitle = a.title.substring(guaIdx + 1);
                        a.title = mainTitle + ' (' + country + ')';
                        break;
                    }
                }
            }
            return a;
        });
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
        console.log('Updated', file);
    } catch(e) {
        console.error('Error:', file, e.message);
    }
}
