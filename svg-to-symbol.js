const fs = require('fs');
const cheerio = require('cheerio');

const path = './src/assets/optimized';


const svgs = fs.readdirSync(path).filter((fn) => {
    return !fn.includes('-symbols') && fn.endsWith('.svg');
});



// Replace specific hex colours with css variable names.
const hexReplace = {
    '#007b81': 'color-a',

    '#005f64': 'color-a',
    '#009fa6': 'color-a',

    '#00676c': 'color-a',
    '#00afb7': 'color-b',



    // Whites of the eyes
    '#fff': 'color-c',




    '#ffeccf': 'color-a'
};

svgs.forEach((fileName) => {
    const filePath = `${path}/${fileName}`;

    //console.log(filePath);

    var data = fs.readFileSync(filePath, 'utf-8');

    const parsed = cheerio.load(data, { xmlMode: true });

    // Move any transform styles from the group, to each symbol.
    parsed('[id^="group_"]').each((i, el) => {
        const group_el = parsed(el);
        const transformStyle = group_el.attr('transform');


        if(transformStyle) {
            //console.log(transformStyle);

            group_el.find('[id^="symbol_"]').each((i, el) => {
                const symbol_el = parsed(el);
                symbol_el.attr('transform', transformStyle);
            });
        }
    });

    const symbols = [];

    parsed('[id^="symbol_"]').each((i, el) => {
        const symbol_el = parsed(el);
        const symbol = parsed('<symbol></symbol>');
        const id = symbol_el.attr('id');

        symbol.attr('id', id.replace('symbol_', ''));
        symbol.attr('viewBox', '0 0 200 200');

        symbol_el.removeAttr('id');

        symbol_el.find('[style]').each((i, el) => {
            const styleEl = parsed(el);
            const style = styleEl.attr('style');

            const updatedStyle = style.replace(/fill\s*:\s*(#[a-f0-9]{3}|#[a-f0-9]{6})(?=\s|;|$)/i, (match, color) => {
                const cssVar = hexReplace[color.toLowerCase()];
                if (cssVar) {
                    return `fill:var(--${cssVar})`;
                }
                return match;
            });

            styleEl.attr('style', updatedStyle);
        });

        //symbol_el.removeAttr('style');

        symbol.append(symbol_el);

        symbols.push(symbol);
    });


    // Create new file
    const svgRoot = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">';
    const symbolSvg = cheerio.load(svgRoot, { xmlMode: true });

    const defs = symbolSvg('<defs></defs>');

    // Add the symbols
    symbols.forEach((symbol) => {
        //console.log(symbol);
        defs.append(symbol);
    });

    symbolSvg('svg').append(defs);

    //console.log(symbolSvg.xml());




    //

    const symbolFile = filePath.replace('.svg', '-symbols.svg');
    fs.writeFileSync(symbolFile, symbolSvg.xml(), 'utf-8');

});
