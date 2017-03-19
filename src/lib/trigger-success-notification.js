/**
 * Triggers the notification for a successful HTML cleanup.
 * This is currently a green dot in the bottom right corner
 * of the screen that fades out after a short time.
 * @return {undefined}
 */
const triggerSuccessNotification = () => {
  const notificationElement = document.querySelector('.clean-html-userscript-notification')
  notificationElement.classList.add('fade-out')
  notificationElement.addEventListener(
    'animationend',
    () => notificationElement.classList.remove('fade-out')
  )
}

export default triggerSuccessNotification
