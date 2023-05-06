import { ROUTES_PATH } from '../constants/routes.js'
import { formatDate, formatStatus } from "../app/format.js"
import Logout from "./Logout.js"

export default class {
  constructor({ document, onNavigate, store, localStorage }) {
    this.document = document
    this.onNavigate = onNavigate
    this.store = store
    const buttonNewBill = document.querySelector(`button[data-testid="btn-new-bill"]`)
    if (buttonNewBill) buttonNewBill.addEventListener('click', this.handleClickNewBill)
    const iconEye = document.querySelectorAll(`div[data-testid="icon-eye"]`)
    /* istanbul ignore next */
    if (iconEye) iconEye.forEach(icon => {
      icon.addEventListener('click', () => this.handleClickIconEye(icon))
    })
    const iconDownload = document.querySelectorAll(`div[data-testid="icon-download"]`)
    /* istanbul ignore next */
    if (iconDownload) iconDownload.forEach(icon => {
      icon.addEventListener('click', () => this.handleClickIconDownload(icon))
    })

    const buttonMail = document.querySelector(`#layout-icon2[data-testid="icon-mail"]`)
    /* istanbul ignore next */
    if (buttonMail) buttonMail.addEventListener('click', this.handleClickNewBill)

    new Logout({ document, onNavigate, localStorage})
  }

  handleClickNewBill = () => {
    this.onNavigate(ROUTES_PATH['NewBill'])
  }

  handleClickIconEye = (icon) => {
    const billUrl = icon.getAttribute("data-bill-url")
    const imgWidth = Math.floor($('#modaleFile').width() * 0.5)
    $('#modaleFile').find(".modal-body").html(`<div style="text-align: center" class="bill-proof-container"><img width=${imgWidth} src=${billUrl} alt="Bill" /></div>`)
    $('#modaleFile').modal('show')
  }

  /* istanbul ignore next */
  handleClickIconDownload = (icon) => {
    const billUrl = icon.getAttribute("data-bill-url")
    const nameBill = icon.getAttribute("data-name")

    fetch(`${billUrl}`)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', nameBill);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(() => console.log('Ups, ...'));
  }

  getBills = () => {
    if (this.store) {
      return this.store
      .bills()
      .list()
      .then(snapshot => {
          const bills = snapshot
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map(doc => {
            try {
              return {
                ...doc,
                date: formatDate(doc.date),
                status: formatStatus(doc.status)
              }
            } catch(e) {
              // if for some reason, corrupted data was introduced, we manage here failing formatDate function
              // log the error and return unformatted date in that case
              console.log(e,'for',doc)
              return {
                ...doc,
                date: doc.date,
                status: formatStatus(doc.status)
              }
            }
          })
          console.log('length', bills.length)
          return bills
      })
    }
  }
}
