Expression
	= init: Term more: ("+" Term)* {
    	// return init + more.filter(e => e !== '+').join('')
        return ([init].concat(more.flat().filter(e => e !== '+'))).flat(2);
    }

Term
	= Rep / Group / Dir / Word

Group
	= "(" expr: Expression ")" {
    	return expr.length > 1 ? expr.flat() : expr[0];
    }

Dir
	= word: Word '!' term: Term {
    	if (typeof term === 'string') {
        	return word + '/' + term
        } else {
        	return term.map(e => word + '/' + e)
        }
    }

Rep
	= term: (Group / Word) '^' num: [0-9]+ {
    	const rep = Number(num.join(''))
        const result = [];
        
        const repl = i => m => (i+[]).padStart(m.length, '0');
        
        for (let i = 1; i <= rep; i++) {
            if (typeof term === 'string') {
                result.push(term.replace(/\$+/g, repl(i)))
            } else {
                result.push(term.map(e => e.replace(/\$+/g, repl(i))))
            }
        	
        }
        return result
   	}

Word
	= stuff: [^+!^()]* {
	    return stuff.join('');
}