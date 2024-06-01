export async function renderCode(content: string, noCode: boolean) {
    const codeRegex = /<pre><code class="hljs.*?">([\s\S]*?)<\/code><\/pre>/g;
    const matches = content.split(codeRegex);
    const renderedContent = [];

    for (let i = 0; i < matches?.length; i++) {
        const currentBlock = matches[i];

        if (i % 2 === 1) {
            if (!noCode) {
                renderedContent.push(`<pre class="hljs overflow-auto" ><code class="">${currentBlock}</code></pre>`);
            }
        } else {
            // renderedContent.push(`<p>${extractDescription(currentBlock)}</p>`);
            renderedContent.push(`<p>${currentBlock}</p>`);
        }
    }

    return renderedContent.join('');
}
