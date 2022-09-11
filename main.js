function main() {
    let choices, right, wrong, left
    function selectMode() {
        let type, range, quan
        let types = document.querySelectorAll('#type div')
        let click = document.getElementById('click')
        for (let i = 0; i < types.length; i++) {
            if (types[i].className != 'head') {
                types[i].onclick = function() {
                    if (type) {
                        type.style.textDecoration = 'none'
                    }
                    type = types[i]
                    type.style.textDecoration = 'underline'
                    click.play()
                }
            }
        }
        let ranges = document.querySelectorAll('#range div')
        for (let i = 0; i < ranges.length; i++) {
            if (ranges[i].className != 'head') {
                ranges[i].onclick = function() {
                    if (range) {
                        range.style.textDecoration = 'none'
                    }
                    range = ranges[i]
                    range.style.textDecoration = 'underline'
                    click.play()
                }
            }
        }
        let quans = document.querySelectorAll('#quan div')
        for (let i = 0; i < quans.length; i++) {
            if (quans[i].className != 'head') {
                quans[i].onclick = function() {
                    if (quan) {
                        quan.style.textDecoration = 'none'
                    }
                    quan = quans[i]
                    quan.style.textDecoration = 'underline'
                    click.play()
                }
            }
        }
        let begin = document.querySelector('#begin button')
        begin.onclick = function() {
            if (type && range && quan) {
                results = [type.innerHTML, range.innerHTML, quan.innerHTML]
                console.log(results)
                document.querySelector('body').style.transform = 'translate(0px, 2000px)'
                choices = undefined
                choices = results
                startGame()
            }
        }
        document.onclick = function() {
            if (type && range && quan) {
                begin.style.color = 'black'
            } else {
                begin.style.color = 'gray'
            }
        }
    }

    selectMode()

    function getQuestion() {
        let range, symbol, equation, answer
        if (choices[1] == '1 to 5') {range = 5}
        if (choices[1] == '1 to 10') {range = 10}
        if (choices[1] == '1 to 24') {range = 24}
        if (choices[1] == '1 to 50') {range = 50}
        if (choices[1] == '1 to 100') {range = 100}
        firstnum = Math.floor(Math.random() * (range + 1))
        secondnum = Math.floor(Math.random() * (range + 1))
        if (choices[0] == 'addition') {symbol = '+'; answer = firstnum + secondnum}
        if (choices[0] == 'multiplication') {symbol = '*'; answer = firstnum * secondnum}
        if (choices[0] == 'subtraction') {symbol = '-'; answer = firstnum - secondnum}
        if (choices[0] == 'division') {symbol = '%'; answer = firstnum / secondnum}
        if (choices[0] == 'exponentiation') {symbol = '^'; answer = firstnum ** secondnum}
        equation = firstnum + ' ' + symbol + ' ' + secondnum
        return [equation, answer]
    }

    function round() {
        let invalidChars = ["+", "e",] 
        let form = document.querySelector('#game form input')
        let problem = document.getElementById('problem')
        let question = getQuestion()
        let response
        problem.innerHTML = question[0]
        form.onkeypress = function(e){
            if (!e) {e = window.event}
            if (invalidChars.includes(e.key)) {e.preventDefault()}
            if (e.key == 'Enter') {
                if (form.value == '') {return false}
                response = Number(form.value) 
                form.value = ''
                left -= 1
                if (response == question[1]) {
                    right += 1
                } else {
                    wrong += 1
                }
                document.getElementById('right').innerHTML = 'questions right: ' + right  
                document.getElementById('left').innerHTML = 'questions left: ' + left  
                document.getElementById('wrong').innerHTML = 'questions wrong: ' + wrong
                if (left == 0) {
                    endGame()
                }
                question = getQuestion()
                problem.innerHTML = question[0]
                return false
            }
        }
    }

    function endGame() {
        let left = document.getElementById('left')
        let problem = document.getElementById('problem')
        let menu = document.getElementById('menu')
        let ogleftmargin = left.style.marginTop
        let ogprobmargin = problem.style.marginTop
        left.style.marginTop = '1800px'
        problem.style.marginTop = '-2000px'
        left.innerHTML = 'questions completed: ' + choices[2]
        menu.style.display = 'block'
        document.activeElement.blur()
        menu.onclick = function() {
            left.style.marginTop = ogleftmargin
            problem.style.marginTop = ogprobmargin
            document.querySelector('body').style.transform = 'translate(0px, 0px)'
            menu.style.display = 'none'
        }
        
    }

    function startGame() {
        right = 0 
        wrong = 0
        left = Number(choices[2])
        document.getElementById('right').innerHTML = 'questions right: ' + right  
        document.getElementById('left').innerHTML = 'questions left: ' + left  
        document.getElementById('wrong').innerHTML = 'questions wrong: ' + wrong
        round()
    }
}

main()