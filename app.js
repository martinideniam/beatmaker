class beatbox {
    constructor() {
        this.mute = document.querySelectorAll('.mute');
        this.nightMode = document.querySelector('.night-mode');
        this.range = document.querySelectorAll('.range');
        this.pads = document.querySelectorAll('.pad')
        this.play = document.querySelector('.play');
        this.selectSounds = document.querySelectorAll('.select-sounds')
        this.treatNightMode(this.nightMode);
        //when pressing mute
        this.treatMute(this.mute);
        //volumes & tempo
        this.treatRange(this.range);
        this.treatPads(this.pads);
        this.treatSelect(this.selectSounds);
        //that's the part that make this beatmaker work
        this.index = 0;
        this.kickVolume = 1;
        this.snareVolume = 1;
        this.hihatVolume = 1;
        this.interval = null;
        this.treatPlay(this.play);
    }

    //to mute kicks, snares & hihats
    treatMute(mute) {
        mute.forEach((muteElement) => {
            muteElement.addEventListener('click', function() {
                const classes = this.classList;
                //it can be simplified here
                if (classes.contains('mute-kick')) {
                    const kick = document.querySelector('.kick');
                    kick.classList.toggle('muted');
                    const kickVolumeRange = document.querySelector('#volume-kick')
                    const kickVolumeRangeLabel = document.querySelector('.volume-kick-label');
                    if (kick.classList.contains('muted')) {
                        this.kickVolume = 0;
                        kickVolumeRange.value = 0;
                        kickVolumeRangeLabel.innerText = '000%';
                    } else {
                        this.kickVolume = 1;
                        kickVolumeRange.value = 100;
                        kickVolumeRangeLabel.innerText = '100%';
                    }
                } 
                if (classes.contains('mute-snare')) {
                    const snare = document.querySelector('.snare');
                    snare.classList.toggle('muted');
                    const snareVolumeRange = document.querySelector('#volume-snare')
                    const snareVolumeRangeLabel = document.querySelector('.volume-snare-label');
                    if (snare.classList.contains('muted')) {
                        this.snareVolume = 0;
                        snareVolumeRange.value = 0;
                        snareVolumeRangeLabel.innerText = '000%';
                    } else {
                        this.snareVolume = 1;
                        snareVolumeRange.value = 100;
                        snareVolumeRangeLabel.innerText = '100%';
                    }
                }
                if (classes.contains('mute-hihat')) {
                    const hihat = document.querySelector('.hihat');
                    hihat.classList.toggle('muted');
                    const hihatVolumeRange = document.querySelector('#volume-hihat')
                    const hihatVolumeRangeLabel = document.querySelector('.volume-hihat-label');
                    if (hihat.classList.contains('muted')) {
                        this.hihatVolume = 0;
                        hihatVolumeRange.value = 0;
                        hihatVolumeRangeLabel.innerText = '000%';
                    } else {
                        this.hihatVolume = 1;
                        hihatVolumeRange.value = 100;
                        hihatVolumeRangeLabel.innerText = '100%';
                    }
                }
            }) 
        })
    }

    //to switch between day/night modes
    treatNightMode() {
        this.nightMode.addEventListener('click', function ()  {
            const classes = this.classList;
            classes.toggle('night'); 
            const nightMode = document.querySelector('.night-mode');
            const html = document.querySelector('html');
            const kickSnareHihat = document.querySelectorAll('.kick-snare-hihat');
            const selectSounds = document.querySelectorAll('.select-sounds');
            const pads = document.querySelectorAll('.pad');
            const buttonsContainer = document.querySelector('.buttons');
            const tempoDiv = document.querySelector('.tempo-div');
            const play = document.querySelector('.play');
            if (classes.contains('night')) {
                nightMode.innerText = 'Day';
                html.style.background = 'black';
                html.style.color = 'white';
                kickSnareHihat.forEach((element) => element.style.border = '1px solid white');
                selectSounds.forEach((element) => {
                    element.style.background = 'black';
                    element.style.color = 'white'
                    element.classList.remove('outline-day');
                });
                buttonsContainer.style.border = '1px solid white';
                tempoDiv.style.background = 'black';
                tempoDiv.style.color = 'white';
                nightMode.style.background = 'black';
                nightMode.style.color = 'white';
                play.style.background = 'black';
                play.style.color = 'white';
            } else {
                nightMode.innerText = 'Night';
                html.style.background = 'white';
                html.style.color = 'black';
                kickSnareHihat.forEach((element) => element.style.border = '1px solid grey');
                selectSounds.forEach((element) => {
                    element.style.background = 'white';
                    element.style.color = 'black'
                    element.classList.add('outline-day');
                });
                buttonsContainer.style.border = '1px solid grey';
                tempoDiv.style.background = 'white';
                tempoDiv.style.color = 'black';
                nightMode.style.background = 'white';
                nightMode.style.color = 'black';
                play.style.background = 'white';
                play.style.color = 'black';
            }
        })
    }

    treatRange(range) {
        range.forEach((rangeObject) => {
            rangeObject.addEventListener('input', (event) => {
                const name_of_label = `.${event.target.id}-label`;
                const label = document.querySelector(name_of_label);
                if (`.${event.target.id}-label` == '.tempo-label') {
                    //stole from stackoverflow to make three digits at all times
                    const zeroFilled = ('000' + event.target.valueAsNumber).substr(-3)
                    label.innerText = zeroFilled;
                    if (this.interval) {
                        clearInterval(this.interval);
                        this.counter(true);
                    }
                    
                }
                else {
                    const padsRow = event.target.parentNode.parentNode.parentNode;
                    if (event.target.valueAsNumber == 0) { 
                        if (!padsRow.classList.contains('muted')) {
                            padsRow.classList.add('muted');
                        }
                    } else {
                        if (padsRow.classList.contains('muted')) {
                            padsRow.classList.remove('muted');
                        };
                    };
                    const zeroFilled = ('000' + event.target.valueAsNumber).substr(-3)
                    label.innerText = `${zeroFilled}%`;
                }
            })
        })

    }

    treatPads(pads) {
        pads.forEach((pad) => {
            pad.addEventListener('click', (pad) => {
                pad.target.classList.toggle('selected-pad');
            });
        });
    }

    treatPlay(play) {
        play.addEventListener('click', (event) => {
            const playButton = event.target;
            event.target.classList.toggle('playing');
            if (playButton.classList.contains('playing')) {
                playButton.innerText = 'Stop';
                this.counter(true)
            } else {
                playButton.innerText = 'Start';
                this.counter(false)
                this.interval = null;
            }
        })
    }

    counter(startOrStop) {
        if (startOrStop == true) {
            const tempo = (60/Number(document.querySelector('.tempo-label').innerText))*1000;
            this.interval = setInterval(() => {;
                this.pads.forEach((pad) => {
                    const padNumber = this.index%8;
                    if (pad.classList.contains(`p${padNumber}`)) {
                        pad.style.animation = 'playingPad 0.1s alternate ease';
                        if (pad.classList.contains('selected-pad')) {
                            this.playSound(pad);
                        }  
                    } else {
                        pad.style.animation = '';
                    }  
                })
                this.index += 1;
            }, tempo)
        } else {
            clearInterval(this.interval);
            this.index = 0;
            this.pads.forEach((pad) => {
                pad.style.animation = '';
            })
        }
    }

    playSound(pad) {
        const typeOfSound = pad.classList[2].split('-')[0];
        const sound = document.querySelector(`.${typeOfSound}-audio`);
        const volume = document.querySelector(`.volume-${typeOfSound}-label`).innerText.split('%')[0]/100;
        sound.currentTime = 0;
        sound.volume = volume;
        sound.play();
    }

    treatSelect(select) {
        select.forEach((selectItem) => {
            selectItem.addEventListener('change', (event) => {
                const typeOfSound = event.target.id.split('-')[1]
                const value = event.target.value;
                const audio = document.querySelector(`.${typeOfSound}-audio`)
                audio.src = `./sound/${typeOfSound}/${value}.wav`
                console.log(audio.src)
            })
        })
    }
}

const newBeatBox = new beatbox();
