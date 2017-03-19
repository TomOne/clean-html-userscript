import css from '../assets/notification.css'
import markup from '../assets/notification.svg'

/**
 * Insert the CSS and the markup for the notification
 * @return {undefined}
 */
const prepareSuccessNotification = () => {
  document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`)
  document.body.insertAdjacentHTML('beforeend', markup)
}

export default prepareSuccessNotification
