// export function extractHtmlText(html: string): string {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');
//     return doc.body.textContent?.trim() ?? '';
// }

export function extractHtmlText(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent?.trim() ?? '';
 }
