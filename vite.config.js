import { readFile } from 'fs/promises';
import { resolve, join } from 'path';
import { defineConfig } from 'vite';

/** you can make this more complex if you need to - or make automated */
function htmlPagesInputObject() {
    return {
        index: resolve(__dirname, 'index.html'),
     }
}

/** @see https://www.npmjs.com/package/vite-include-html-plugin I just made the tag <include-html /> instead. */
function includeHtml() {
    return {
        name: "vite-plugin-include-html",

        transformIndexHtml: {
            order: 'pre',
            async handler(html) {
                const includeTagRegex = /<include\-html\s+src="([^"]+)"><\/include\-html>/g;

                const replacedHtml = await Promise.all(
                    Array.from(html.matchAll(includeTagRegex), async ([match, src]) => {
                        const fullPath = join(__dirname, src); // this allows us to use paths that allow our IDE to find the files too
                        try {
                            const content = await readFile(fullPath, "utf-8");
                            return { match, content };
                        } catch (error) {
                            console.error(`Error reading ${fullPath}: ${error}`);
                            return { match, content: match }; // Return the original tag in case of an error
                        }
                    })
                );
        
                return replacedHtml.reduce((acc, { match, content }) => {
                    return acc.replace(match, content);
                }, html);
            },
        },
    };
}

function addTitle() {
    return {
        name: "vite-plugin-add-title",

        transformIndexHtml(html) {
            const titleTemplateRegex = /<template title>(.*?)<\/template>/;
            const match = html.match(titleTemplateRegex);
            let title = match ? match[1] : 'Convert Markdown to PDF with PHP';
            title += ' | Typesetter.io';

            return html.replace(
                /<title>(.*?)<\/title>/,
                `<title>${title}</title>`
            );
        }
    }
}

export default defineConfig({
    build: {
        rollupOptions: {
            input: htmlPagesInputObject()
        }
    },
    plugins: [
        includeHtml(),
        addTitle(),
    ]
});