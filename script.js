const output = document.querySelector('.input-area')

const keysEnglish = {
  'Backquote': ['`', '~'],
  'Digit1': ['1', '!'],
  'Digit2': ['2', '@'],
  'Digit3': ['3', '#'],
  'Digit4': ['4', '$'],
  'Digit5': ['5', '%'],
  'Digit6': ['6', '^'],
  'Digit7': ['7', '&'],
  'Digit8': ['8', '*'],
  'Digit9': ['9', '('],
  'Digit0': ['0', ')'],
  'Minus': ['-', '_'],
  'Equal': ['=', '+'],
  'Backspace': 'delete',
  'Tab': 'tab',
  'KeyQ': ['q', 'Q'],
  'KeyW': ['w', 'W'],
  'KeyE': ['e', 'E'],
  'KeyR': ['r', 'R'],
  'KeyT': ['t', 'T'],
  'KeyY': ['y', 'Y'],
  'KeyU': ['u', 'U'],
  'KeyI': ['i', 'I'],
  'KeyO': ['o', 'O'],
  'KeyP': ['p', 'P'],
  'BracketLeft': ['[', '{'],
  'BracketRight': [']', '}'],
  'Backslash': ['\\', '|'],
  'CapsLock': 'caps lock',
  'KeyA': ['a', 'A'],
  'KeyS': ['s', 'S'],
  'KeyD': ['d', 'D'],
  'KeyF': ['f', 'F'],
  'KeyG': ['g', 'G'],
  'KeyH': ['h', 'H'],
  'KeyJ': ['j', 'J'],
  'KeyK': ['k', 'K'],
  'KeyL': ['l', 'L'],
  'Semicolon': [';', ':'],
  'Quote': ["'", '"'],
  'Enter': 'enter',
  'ShiftLeft': 'shift',
  'KeyZ': ['z', 'Z'],
  'KeyX': ['x', 'X'],
  'KeyC': ['c', 'C'],
  'KeyV': ['v', 'V'],
  'KeyB': ['b', 'B'],
  'KeyN': ['n', 'N'],
  'KeyM': ['m', 'M'],
  'Comma': [',', '<'],
  'Period': ['.', '>'],
  'Slash': ['/', '?'],
  'ShiftRight': 'shift',
  'ControlLeft': 'ctrl',
  'LANG': 'en',
  'SOUND': '',
  'VOICE': '',
  'AltLeft': 'alt',
  'Space': ' ',
  'AltRight': 'alt',
  'ControlRight': 'ctrl',
  'ArrowLeft': '◀',
  'ArrowUp': '▲',
  'ArrowDown': '▼',
  'ArrowRight': '▶'
}

const keysRussian = {
  'Backquote': ['ё', 'Ё'],
  'Digit1': ['1', '!'],
  'Digit2': ['2', '"'],
  'Digit3': ['3', '№'],
  'Digit4': ['4', ';'],
  'Digit5': ['5', '%'],
  'Digit6': ['6', ':'],
  'Digit7': ['7', '?'],
  'Digit8': ['8', '*'],
  'Digit9': ['9', '('],
  'Digit0': ['0', ')'],
  'Minus': ['-', '_'],
  'Equal': ['=', '+'],
  'Backspace': 'delete',
  'Tab': 'tab',
  'KeyQ': ['й', 'Й'],
  'KeyW': ['ц', 'Ц'],
  'KeyE': ['у', 'У'],
  'KeyR': ['к', 'К'],
  'KeyT': ['е', 'Е'],
  'KeyY': ['н', 'Н'],
  'KeyU': ['г', 'Г'],
  'KeyI': ['ш', 'Ш'],
  'KeyO': ['щ', 'Щ'],
  'KeyP': ['з', 'З'],
  'BracketLeft': ['х', 'Х'],
  'BracketRight': ['ъ', 'Ъ'],
  'Backslash': ['/', '|'],
  'CapsLock': 'caps lock',
  'KeyA': ['ф', 'ф'],
  'KeyS': ['ы', 'Ы'],
  'KeyD': ['в', 'В'],
  'KeyF': ['а', 'А'],
  'KeyG': ['п', 'П'],
  'KeyH': ['р', 'Р'],
  'KeyJ': ['о', 'О'],
  'KeyK': ['л', 'Л'],
  'KeyL': ['д', 'Д'],
  'Semicolon': ['ж', 'Ж'],
  'Quote': ['э', 'Э'], 
  'Enter': 'enter',
  'ShiftLeft': 'shift',
  'KeyZ': ['я', 'Я'],
  'KeyX': ['ч', 'Ч'],
  'KeyC': ['с', 'С'],
  'KeyV': ['м', 'М'],
  'KeyB': ['и', 'И'],
  'KeyN': ['т', 'Т'],
  'KeyM': ['ь', 'Ь'],
  'Comma': ['б', 'Б'],
  'Period': ['ю', 'Ю'],
  'Slash': ['.', ','],
  'ShiftRight': 'shift',
  'ControlLeft': 'ctrl',
  'LANG': 'ru',
  'SOUND': '',
  'VOICE': '',
  'AltLeft': 'alt',
  'Space': ' ',
  'AltRight': 'alt',
  'ControlRight': 'ctrl',
  'ArrowLeft': '◀',
  'ArrowUp': '▲',
  'ArrowDown': '▼',
  'ArrowRight': '▶'
}

let keys = keysEnglish

const Keyboard = {
  elements: {
    keyBtns: []
  },

  properties: {
    value: '',
  },

  init() {
    this.countSelect = 0
    this.selectStartPos = 0
    this.selectEndPos = 0
    this.select = false

    this.capsBtn = false
    this.shiftBtn = false
    this.soundBtn = false
    this.voiceBtn = false
    this.language = this.loadStorage()
    keys = this.language === 'en' ? keysEnglish : keysRussian

    this.keyboard = document.createElement('div')
    this.keyboard.classList.add('keyboard')

    let buttonCodes = Object.keys(keys)
    this.keyboard.appendChild(this.createRowButtons(buttonCodes.slice(0, 14)))
    this.keyboard.appendChild(this.createRowButtons(buttonCodes.slice(14, 28)))
    this.keyboard.appendChild(this.createRowButtons(buttonCodes.slice(28, 41)))
    this.keyboard.appendChild(this.createRowButtons(buttonCodes.slice(41, 53)))
    this.keyboard.appendChild(this.createRowButtons(buttonCodes.slice(53, buttonCodes.length)))
    document.body.appendChild(this.keyboard)

    this.elements.keyBtns = document.querySelectorAll('.keyboard__key')
  },

  createRowButtons(arr) {
    let rowKeys = document.createElement('div')
    rowKeys.classList.add('keyboard__row')

    arr.forEach(item => {
      let button = document.createElement('button')
      button.classList.add('keyboard__key')

      if (Array.isArray(keys[item])) {
        if (keys[item][0].match(/[a-zа-яё]/)) {
          button.textContent = keys[item][0]
        } else {
          let up = document.createElement('div')
          up.classList.add('disable')
          up.textContent = keys[item][1]
          button.appendChild(up)
          let down = document.createElement('div')
          down.textContent =  keys[item][0]
          button.appendChild(down)
          button.classList.add('keyboard__key_double')
        }
      } else {
        if (keys[item].match(/delete|tab|CapsLock|enter|shift| /)) {
          button.classList.add('keyboard__key_wide')
        }

        if (item === 'VOICE') {
          button.innerHTML = '<span class="material-icons">mic_off</span>'
        } else if (item === 'SOUND') {
          button.innerHTML = '<span class="material-icons">volume_off</span>'
        } else {
          button.textContent = keys[item]
        }
      }
      
      button.dataset.code = item
      rowKeys.appendChild(button)
    })
    return rowKeys
  },

  clickButtonHandler(e) {
    e.stopPropagation();
    const keyDiv = e.target.closest('.keyboard__key');
    if (!keyDiv) return;
    const { dataset: { code } } = keyDiv;

    switch (code) {
      case 'CapsLock' :
        this.capsBtn = !this.capsBtn
        this.switchCaps()
        break
      case 'ShiftLeft' :
      case 'ShiftRight' :
        this.shiftBtn = !this.shiftBtn
        this.switchShift()
        break
      case 'LANG' :
        this.switchLanguage()
        break
      case 'SOUND' :
        this.switchSound()
        break 
      case 'VOICE' :
        this.switchVoice()
        break
      default :
        this.outputSymbol(code)
    }
  },

  outputSymbol(code) {
    let symbol = ''

    if (Array.isArray(keys[code])) {
      
      if (this.shiftBtn) {
        symbol = keys[code][1]
      } else if (this.capsBtn) {
        
        if (keys[code][0].match(/[a-zа-яё]/)) {
          symbol = keys[code][1]
        } else {
          symbol = keys[code][0]
        }
      } else {
        symbol = keys[code][0]
      }
    }

    output.focus()

    let selStart = output.selectionStart
    let selEnd = output.selectionEnd

    const left = output.value.slice(0, selStart)
    const right = output.value.slice(selEnd)

    const textHandlers = {
      'Backspace': () => {
        if (this.shiftBtn && selStart !== selEnd) {
          output.value = `${left}${right}`
          selEnd = selStart
        } else {
          output.value = `${left.slice(0, -1)}${right}`
          selStart -= 1
          selEnd = selStart
        }
      },
      'Tab': () => {
        output.value = `${left}\t${right}`
        selStart += 1
        if (!this.shiftBtn) {
          selEnd = selStart
        }
      },
      'Enter': () => {
        output.value = `${left}\n${right}`
        selStart += 1
        if (!this.shiftBtn) {
          selEnd = selStart
        }
      },
      'Space': () => {
        output.value = `${left} ${right}`
        selStart += 1
        if (!this.shiftBtn) {
          selEnd = selStart
        }
      },
      'ArrowLeft': () => {
        selStart = selStart - 1 >= 0 ? selStart - 1 : 0
        if (!this.shiftBtn) {
          selEnd = selStart
        }
      },
      'ArrowRight': () => {
        selEnd += 1
        if (!this.shiftBtn) {
          selStart = selEnd
        }
      },
      'ArrowUp': () => {
        const positionFromLeft = output.value.slice(0, selStart).match(/(\n).*$(?!\1)/g) || [[1]]
        selStart -= positionFromLeft[0].length
        if (!this.shiftBtn) {
          selEnd = selStart
        }
      },
      'ArrowDown': () => {
        const positionFromLeft = output.value.slice(selStart).match(/^.*(\n).*(?!\1)/) || [[1]]
        selStart += positionFromLeft[0].length
        if (!this.shiftBtn) {
          selEnd = selStart
        }
      },
      'Alt': () => {},
      'ControlRight' : () => {},
      'ControlLeft' : () => {},
    }
      
    if (textHandlers[code]) {
      textHandlers[code]() 
    } else {
      selEnd = ++selStart
      output.value = `${left}${symbol || ''}${right}`
    }

    output.setSelectionRange(selStart, selEnd)
  },

  switchCaps() {
    if (this.capsBtn) {
      document.querySelector('button[data-code="CapsLock"]').classList.add('keyboard__key_pressed')
      this.elements.keyBtns.forEach(btn => {
        const { dataset: { code } } = btn
        
        if (Array.isArray(keys[code])) {
          if (keys[code][0].match(/[a-zа-яё]/)) {
            btn.textContent = keys[code][1]
          }
        }
      })
    } else {
      document.querySelector('button[data-code="CapsLock"]').classList.remove('keyboard__key_pressed')
      this.elements.keyBtns.forEach(btn => {
        const { dataset: { code } } = btn
        
        if (Array.isArray(keys[code])) {
          if (keys[code][0].match(/[a-zа-яё]/)) {
            btn.textContent = keys[code][0]
          } 
        }
      })
    }
  },

  switchShift() {
    if (this.shiftBtn) {
      document.querySelector('button[data-code="ShiftLeft"]').classList.add('keyboard__key_pressed')
      document.querySelector('button[data-code="ShiftRight"]').classList.add('keyboard__key_pressed')
      this.elements.keyBtns.forEach(btn => {
        const { dataset: { code } } = btn
        
        if (Array.isArray(keys[code])) {
          if (keys[code][0].match(/[a-zа-яё]/)) {
            btn.textContent = keys[code][1]
          } else {
            btn.children[0].classList.remove('disable')
            btn.children[1].classList.add('disable')
          }
        }
      })
    } else {
      document.querySelector('button[data-code="ShiftLeft"]').classList.remove('keyboard__key_pressed')
      document.querySelector('button[data-code="ShiftRight"]').classList.remove('keyboard__key_pressed')
      this.elements.keyBtns.forEach(btn => {
        const { dataset: { code } } = btn
        
        if (Array.isArray(keys[code])) {
          if (keys[code][0].match(/[a-zа-яё]/)) {
            btn.textContent = keys[code][0]
          } else {
            btn.children[0].classList.add('disable')
            btn.children[1].classList.remove('disable')
          } 
        }
      })
    }

    if (this.capsBtn) this.switchCaps()
  },

  switchLanguage() {
    this.language = this.language === 'en' ? 'ru' : 'en'
    keys = this.language === 'en' ? keysEnglish : keysRussian

    this.elements.keyBtns.forEach(btn => {
      const { dataset: { code } } = btn

      if (Array.isArray(keys[code])) {
        btn.classList = 'keyboard__key'
        btn.innerHTML = ''
        
        if (keys[code][0].match(/[a-zа-яё]/)) {
          btn.textContent = keys[code][0]
        } else {
          let up = document.createElement('div')
          up.classList.add('disable')
          up.textContent = keys[code][1]
          btn.appendChild(up)
          let down = document.createElement('div')
          down.textContent =  keys[code][0]
          btn.appendChild(down)
          btn.classList.add('keyboard__key_double')
        }
      } else {
        if (keys[code].match(/ru|en/)) {
          btn.textContent = keys[code]
        }
      }
    })

    if (this.capsBtn) this.switchCaps()
    if (this.shiftBtn) this.switchShift()

    this.saveStorage()
  },

  switchSound() {
    this.soundBtn = !this.soundBtn
    let btn = document.querySelector('button[data-code="SOUND"]')

    if (this.soundBtn) {
      btn.innerHTML = '<span class="material-icons">volume_up</span>'
    } else {
      btn.innerHTML = '<span class="material-icons">volume_off</span>'
    }
  },

  switchVoice() {
    this.voiceBtn = !this.voiceBtn
    let btn = document.querySelector('button[data-code="VOICE"]')

    if (this.voiceBtn) {
      btn.innerHTML = '<span class="material-icons">mic</span>'
      if (this.language === 'en') {
        SpeechRecord.record(true, 'en-US')
      } else {
        SpeechRecord.record(true, 'ru-RU')
      }
    } else {
      btn.innerHTML = '<span class="material-icons">mic_off</span>'
      SpeechRecord.record(false)
    }
  },

  loadStorage() {
    let lang = localStorage.getItem('language')
    return lang ? lang : 'en'
  },

  saveStorage() {
    localStorage.setItem('language', this.language)
  }
}

function playSound() {
      if (Keyboard.language === 'en') {
        new Audio('./assets/sound/sound-default.mp3').play()
      } else {
        new Audio('./assets/sound/sound-default.mp3').play()
      }
}

function keyHandlerDown(e) {
  document.querySelector(`button[data-code="${e.code}"]`).classList.add('keyboard__key_pressed')
}

function keyHandlerUp(e) {
  document.querySelector(`button[data-code="${e.code}"]`).classList.remove('keyboard__key_pressed')
  if (Keyboard.soundBtn) playSound(e.code)
}

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init()
  output.focus()
});

window.addEventListener('click', e => {
  Keyboard.clickButtonHandler(e);
  
  if (Keyboard.soundBtn) {
    const keyDiv = e.target.closest('.keyboard__key');
    if (!keyDiv) return;
    const { dataset: { code } } = keyDiv;
    playSound(code)  
  } 
});

window.addEventListener('keydown', e => {
  e.preventDefault()
  if (Object.keys(keys).includes(e.code)) {
    
    if (e.code === 'CapsLock') {
      Keyboard.capsBtn = !Keyboard.capsBtn
      Keyboard.switchCaps()
      playSound(e.code)
      return
    }

    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      if (Keyboard.shiftBtn) return
      Keyboard.shiftBtn = true
      Keyboard.switchShift()
    }
    
    keyHandlerDown(e)
    Keyboard.outputSymbol(e.code)
  } 
})

window.addEventListener('keyup', e => {
  e.preventDefault()
  if (Object.keys(keys).includes(e.code)) {

    if (e.code === 'CapsLock') {
      return
    }

    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      Keyboard.shiftBtn = false
      Keyboard.switchShift()
    }

    keyHandlerUp(e)
  }
})

document.addEventListener("visibilitychange", () => {
  Keyboard.elements.keyBtns.forEach(btn => {
    if (btn.classList.contains('keyboard__key_pressed') && !btn.dataset.code.match(/CapsLock|ShiftLeft|ShiftRight/)) {
      btn.classList.remove('keyboard__key_pressed')
    }
  })
})

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const SpeechRecord = {
  init() {
    this.recognition = new SpeechRecognition()
    this.recognition.interimResults = true
    this.recognition.lang = 'en-US'
    this.isRecord = false

    this.recognition.addEventListener('result', e => {
      const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

        if (e.results[0].isFinal) {
          output.value += ' ' + transcript
        }
    })
  },

  record(record = false, lang = 'en-US') {
    this.isRecord = record
    this.recognition.lang = lang
    
    if (this.isRecord) {
      this.recognition.start()
      this.recognition.addEventListener('end', () => {
        if (this.isRecord) this.recognition.start()
        else {
          this.recognition.abort()
        } 
      })
    } else {
      this.recognition.abort()
    }
  },
}

SpeechRecord.init()
