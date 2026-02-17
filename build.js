const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const sectionsDir = path.join(srcDir, 'sections');
const templatePath = path.join(srcDir, 'template.html');
const outputPath = path.join(__dirname, 'index.html');

async function build() {
    try {
        let html = fs.readFileSync(templatePath, 'utf8');

        // Get all section files
        const files = fs.readdirSync(sectionsDir).filter(file => file.endsWith('.html'));

        // Sort files if needed, or rely on naming convention/markers
        // For now, we will replace markers in the template

        // Logic: specific markers in template <!-- SECTION: NAME -->
        // We will look for markers and replace them with file content if it matches.

        // List of expected sections and their markers
        const sections = [
            { marker: '<!-- SECTION: HEADER -->', file: 'header.html' },
            { marker: '<!-- SECTION: HERO -->', file: 'hero.html' },
            { marker: '<!-- SECTION: PARTNERS -->', file: 'partners.html' },
            { marker: '<!-- SECTION: STATS -->', file: 'stats.html' },
            { marker: '<!-- SECTION: ABOUT -->', file: 'about.html' },
            { marker: '<!-- SECTION: SOLUTIONS -->', file: 'solutions.html' },
            { marker: '<!-- SECTION: CTA -->', file: 'cta.html' },
            { marker: '<!-- SECTION: FOOTER -->', file: 'footer.html' }
        ];

        for (const section of sections) {
            const filePath = path.join(sectionsDir, section.file);
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf8');
                html = html.replace(section.marker, content);
            } else {
                console.warn(`Warning: Section file ${section.file} not found.`);
                // Remove marker if file not found to avoid comments in prod
                html = html.replace(section.marker, '');
            }
        }

        fs.writeFileSync(outputPath, html);
        console.log('Build successful! index.html generated.');

    } catch (err) {
        console.error('Build failed:', err);
    }
}

build();
