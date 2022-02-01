const sample = document.getElementById('sample');
const sampInput = document.getElementById('sampInput');
const button = document.getElementById('putText');
const clear = document.getElementById('clear');
const testPattern = document.getElementById('expr');

button.addEventListener('click', e => { 
    e.preventDefault();
    sample.innerText = sampInput.value;
});

clear.addEventListener('click', e => {
    e.preventDefault();
    sample.innerText = '';
});

const returnsRegex = input => {
    try {
        const regex = new RegExp(input);
        return regex;
    } catch (SyntaxError) {
        console.log('invalid regexp')
        return null;
    }
}

// const highlightPattern = regex => {
    
//     let text = sample.textContent;
//     console.log(text)
//     const match = regex.exec(text);
//     console.log(match);
//     sample.innerHTML = text.slice(0, text.indexOf(match[0])) + '<span class="green">' +
//         text.slice(text.indexOf(match[0]), (text.indexOf(match[1]) + match[0].length)) + '</span>' +
//         text.slice(text.indexOf(match[1] + match[0].length));
// }

const highlightPattern = regex => {
    try {
        if (regex) {
            const text = sample.textContent;
            const match = text.match(regex);
            const start = match.index;
            const end = start + match[0].length;
            console.log(match, start, end)
            if (start == 0) {
                sample.innerHTML = '<span class="green">' + text.slice(start, end) + '</span>' + text.slice(end);
            } else {
                sample.innerHTML = text.slice(0, start) + '<span class="green">' + text.slice(start, end) + '</span>' + text.slice(end);
            }
        }
    } catch (TypeError) {
        console.log('not found')
    }
}


testPattern.addEventListener('keyup', e => {
    const regex = returnsRegex(testPattern.value);
    highlightPattern(regex);
})

/* 
pattern established
find index of pattern
set text to (begin to slice) + (slice wrapped in span) + slice to end
*/