moveSliderRight = () => {
    document.getElementById('MensagemSecundaria').classList.remove('MensagemSecundaria-moveHalfLeft');
    document.getElementById('MensagemSecundariaDeslizante').classList.remove('MensagemSecundariaDeslizante-moveHalfRight');
    document.getElementById('EntrarFormulario').classList.remove('MudarParaDireita');
  
    document.getElementById('MensagemSecundaria').classList.add('MensagemSecundaria-moveHalfRight');
    document.getElementById('MensagemSecundariaDeslizante').classList.add('MensagemSecundariaDeslizante-moveHalfLeft');
    document.getElementById('signUpForm').classList.add('shiftLeft');
  }
  moveSliderLeft = () => {
    document.getElementById('MensagemSecundaria').classList.remove('MensagemSecundaria-moveHalfRight');
    document.getElementById('MensagemSecundariaDeslizante').classList.remove('MensagemSecundariaDeslizante-moveHalfLeft');
    document.getElementById('signUpForm').classList.remove('shiftLeft');
  
    
    document.getElementById('MensagemSecundaria').classList.add('MensagemSecundaria-moveHalfLeft');
    document.getElementById('MensagemSecundariaDeslizante').classList.add('MensagemSecundariaDeslizante-moveHalfRight');
    document.getElementById('EntrarFormulario').classList.add('MudarParaDireita');
  }