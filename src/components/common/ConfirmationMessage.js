import M from 'materialize-css'

const ConfirmationMessage = (message, callback) => {
  M.toast({ html: message, displayLength: 4000, classes: 'rounded teal lighten-1', completeCallback: callback })
}

export default ConfirmationMessage